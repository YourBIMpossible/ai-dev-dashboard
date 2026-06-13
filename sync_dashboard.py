#!/usr/bin/env python3
"""
Update one project's card in the AI-Dev dashboard's data.js using **GitHub Models**.

No Anthropic API key, no billing. GitHub Models is authenticated with the built-in
GITHUB_TOKEN that Actions injects into every run (locally: a fine-grained PAT with
the "Models" permission, exported as GITHUB_TOKEN). The endpoint speaks the OpenAI
Chat Completions protocol, so we drive it with the `openai` SDK pointed at
https://models.github.ai/inference.

How it works
------------
1. Reads the source repo's key docs (newest STATE doc, wave ledger, READMEs, ...).
2. Pulls the CURRENT project block out of data.js using the managed markers
       /* PROJECT:<id>:START */  ...  /* PROJECT:<id>:END */
3. Asks the model to return the SAME block with only the state-derived fields
   refreshed (commit hash, test counts, phase %s, recent[], waves, etc.).
4. Splices the new block back between the markers and validates the whole file
   with `node --check`. If the result is not valid JS, it exits non-zero WITHOUT
   writing — a bad model response can never ship a broken dashboard.

Only the block for --project is ever touched, so a push to one repo can never
clobber another project's card.
"""

from __future__ import annotations

import argparse
import glob
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from openai import OpenAI

BASE_URL = os.environ.get("GITHUB_MODELS_BASE_URL", "https://models.github.ai/inference")
MODEL = os.environ.get("GITHUB_MODEL", "openai/gpt-4o-mini")
MAX_DOC_CHARS = 16000

SYSTEM_INSTRUCTION = (
    "You maintain a JavaScript dashboard data file. You are given ONE project's "
    "object literal (a JS object, no surrounding array) and the latest project "
    "status docs. Return the SAME object with only the fields that the docs show "
    "have changed, updated. Preserve every other field, key order, and the exact "
    "schema. Rules: output ONLY the JS object literal starting with '{' and ending "
    "with '}', no trailing comma, no markdown fences, no commentary. Keep string "
    "escaping valid (Windows paths use double backslashes). Do not invent data — "
    "if the docs don't mention something, leave it as-is."
)


def newest_first(paths: list[str]) -> list[str]:
    """STATE_YYYY-MM-DD docs: keep only the newest. Others: keep all."""
    state = sorted(p for p in paths if "STATE_" in os.path.basename(p))
    others = [p for p in paths if "STATE_" not in os.path.basename(p)]
    keep = others
    if state:
        keep = [state[-1]] + others
    return keep


def read_docs(globs: list[str]) -> str:
    found: list[str] = []
    for g in globs:
        found.extend(sorted(glob.glob(g, recursive=True)))
    found = newest_first(found)

    sections, budget = [], MAX_DOC_CHARS
    seen = set()
    for path in found:
        if path in seen or not os.path.isfile(path) or budget <= 0:
            continue
        seen.add(path)
        try:
            text = Path(path).read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        chunk = text[:budget]
        sections.append(f"=== {path} ===\n{chunk}")
        budget -= len(chunk)
    return "\n\n".join(sections) if sections else "(no docs found)"


def git_short_sha() -> str:
    try:
        return subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
    except subprocess.CalledProcessError:
        return "unknown"


def git_recent_log(n: int = 15) -> str:
    try:
        return subprocess.run(
            ["git", "log", "--oneline", f"-{n}"],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
    except subprocess.CalledProcessError:
        return ""


def extract_block(data_js: str, project_id: str) -> tuple[int, int, str]:
    start = f"/* PROJECT:{project_id}:START */"
    end = f"/* PROJECT:{project_id}:END */"
    if start not in data_js or end not in data_js:
        sys.exit(f"ERROR: markers for project '{project_id}' not found in data.js")
    i = data_js.index(start) + len(start)
    j = data_js.index(end)
    return i, j, data_js[i:j].strip().rstrip(",").strip()


def build_client() -> OpenAI:
    token = os.environ.get("GH_MODELS_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not token:
        sys.exit(
            "ERROR: No token. In Actions, pass GITHUB_TOKEN; locally export a PAT "
            "with the 'Models' permission as GITHUB_TOKEN."
        )
    return OpenAI(base_url=BASE_URL, api_key=token)


def clean_object(text: str) -> str:
    text = text.strip()
    text = re.sub(r"^```[a-zA-Z]*\n?", "", text)
    text = re.sub(r"\n?```$", "", text.rstrip())
    # Trim anything before the first { and after the last }
    first, last = text.find("{"), text.rfind("}")
    if first == -1 or last == -1:
        sys.exit("ERROR: model response contained no JS object literal")
    return text[first:last + 1].strip()


def node_check(data_js: str) -> bool:
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as fh:
        fh.write(data_js)
        tmp = fh.name
    try:
        result = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
        if result.returncode != 0:
            print(result.stderr.strip(), file=sys.stderr)
        return result.returncode == 0
    finally:
        os.unlink(tmp)


def main() -> int:
    ap = argparse.ArgumentParser(description="Sync one dashboard project via GitHub Models.")
    ap.add_argument("--project", required=True, help="Project id (e.g. bimpossible).")
    ap.add_argument("--data", required=True, help="Path to the dashboard data.js.")
    ap.add_argument("--docs", nargs="+", required=True, help="Doc globs to feed the model.")
    args = ap.parse_args()

    data_path = Path(args.data)
    data_js = data_path.read_text(encoding="utf-8")
    i, j, current_block = extract_block(data_js, args.project)

    docs = read_docs(args.docs)
    sha = git_short_sha()
    log = git_recent_log()

    user_msg = (
        f"PROJECT ID: {args.project}\n"
        f"LATEST COMMIT (short sha): {sha}\n"
        f"RECENT COMMITS:\n{log}\n\n"
        f"LATEST STATUS DOCS:\n{docs}\n\n"
        f"CURRENT PROJECT OBJECT (update in place, same schema):\n{current_block}"
    )

    client = build_client()
    print(f"Calling GitHub Models ({MODEL}) for project '{args.project}'...")
    resp = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        max_tokens=8000,
        messages=[
            {"role": "system", "content": SYSTEM_INSTRUCTION},
            {"role": "user", "content": user_msg},
        ],
    )
    new_block = clean_object(resp.choices[0].message.content or "")

    spliced = data_js[:i] + "\n    " + new_block + ",\n    " + data_js[j:]

    if not node_check(spliced):
        sys.exit("ERROR: spliced data.js failed `node --check` — refusing to write.")

    if spliced == data_js:
        print("No change after sync — data.js already current.")
        return 0

    data_path.write_text(spliced, encoding="utf-8")
    print(f"Updated project '{args.project}' in {data_path} ({sha}).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
