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
3. Asks the model for a **JSON patch**: only the TOP-LEVEL fields the docs show
   have changed, each with its complete new value. Returning just the delta (not
   the whole object) keeps the response far under GitHub Models' 4000-output-token
   free-tier cap — the old "echo the entire block" contract broke the moment a card
   grew past ~4000 tokens, which is exactly how the bimpossible card started failing.
4. Applies that patch deterministically in Python: each changed top-level field's
   value-span is replaced in place; every untouched field stays byte-for-byte. The
   spliced file is then validated with `node --check`. If the result is not valid
   JS, it exits non-zero WITHOUT writing — a bad model response can never ship a
   broken dashboard.

Only the block for --project is ever touched, and within it only the fields the
model reports as changed, so a push to one repo can never clobber another card.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

# Fields the LLM bot is NEVER allowed to write, because a deterministic source owns
# each one (one writer per field => nothing fights):
#   - progress / waves      : sync_ledgers.py renders these from the PHASE-STATUS /
#                             WAVE-STATUS ledgers. A weak free-tier model re-deriving
#                             phase numbering from prose produced the historical
#                             "P7 = Model QA" drift, so it is hard-blocked, not merely
#                             discouraged in the prompt.
#   - activity / lastActivity: sync_activity.py fills these from real git history
#                             (gh api). The model must not invent or stale-overwrite
#                             the freshness signal. (Added 2026-06-27 with the activity
#                             scan, which fixed cards sitting ~2 weeks stale.)
# See REFRESH-SPEC.md "Phase status ingestion".
PROTECTED_FIELDS = {"progress", "waves", "activity", "lastActivity"}

BASE_URL = os.environ.get("GITHUB_MODELS_BASE_URL", "https://models.github.ai/inference")
MODEL = os.environ.get("GITHUB_MODEL", "openai/gpt-4o")
# gpt-4o has a 128k input context window on GitHub Models; gpt-4o-mini's 8k cap
# was exceeded once the bimpossible card + docs + git log grew past ~8000 tokens.
# OUTPUT_TOKEN_CAP guards the response side (patches are small, but belt+suspenders).
MAX_DOC_CHARS = 6000   # total chars across all docs (~2000 tokens)
PER_FILE_CHARS = 4000  # cap any single doc so one big file can't eat the budget
OUTPUT_TOKEN_CAP = 4000

SYSTEM_INSTRUCTION = (
    "You maintain one project's card on a status dashboard. You are given that "
    "project's CURRENT object (as a JS object literal) and the latest status docs. "
    "Decide which TOP-LEVEL fields the docs show have changed, and return a JSON "
    "object containing ONLY those changed top-level fields, each mapped to its "
    "COMPLETE new value (a full replacement of that field, never a fragment). Omit "
    "every field that has not changed.\n"
    "Hard rules:\n"
    "- Output exactly one JSON object and nothing else (no prose, no markdown fences).\n"
    "- Never include id, name, or icon.\n"
    "- Each returned value MUST match the existing schema and nesting of that field "
    "exactly (same structure, same types). Inside a returned field, copy any "
    "sub-values you are not changing verbatim.\n"
    "- NEVER return 'progress' or 'waves'. Those two fields are owned by a separate "
    "deterministic ledger sync and are stripped from your output if present. Do not "
    "touch phase names, phase numbering, phase percentages, tasks, or wave status.\n"
    "- Be conservative: if the docs do not clearly show a field changed, omit it. "
    "Do not invent data."
)


def order_docs(paths: list[str]) -> list[str]:
    """Compact ledgers/READMEs first, then the single newest STATE doc.

    The wave ledger is short and authoritative, so it must survive the budget;
    the STATE doc is narrative and only its head (latest status) is needed.
    """
    state = sorted(p for p in paths if "STATE_" in os.path.basename(p))
    others = [p for p in paths if "STATE_" not in os.path.basename(p)]
    keep = list(dict.fromkeys(others))  # de-dupe, preserve order
    if state:
        keep.append(state[-1])  # newest STATE doc, last
    return keep


def read_docs(globs: list[str]) -> str:
    found: list[str] = []
    for g in globs:
        found.extend(sorted(glob.glob(g, recursive=True)))
    found = order_docs(found)

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
        chunk = text[:min(PER_FILE_CHARS, budget)]
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


def build_client():
    # Imported lazily so the patch/apply logic can be unit-tested without the SDK.
    from openai import OpenAI

    token = os.environ.get("GH_MODELS_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not token:
        sys.exit(
            "ERROR: No token. In Actions, pass GITHUB_TOKEN; locally export a PAT "
            "with the 'Models' permission as GITHUB_TOKEN."
        )
    return OpenAI(base_url=BASE_URL, api_key=token)


def call_model(client, messages: list[dict]):
    """Call GitHub Models, preferring JSON mode but degrading gracefully if the
    gateway rejects response_format (older proxies / models)."""
    kwargs = dict(model=MODEL, temperature=0, max_tokens=OUTPUT_TOKEN_CAP, messages=messages)
    try:
        return client.chat.completions.create(
            response_format={"type": "json_object"}, **kwargs
        )
    except Exception as exc:  # noqa: BLE001 - any gateway rejection, fall back
        print(
            f"  (note) JSON mode unavailable ({exc.__class__.__name__}); retrying without it",
            file=sys.stderr,
        )
        return client.chat.completions.create(**kwargs)


def parse_patch(text: str) -> dict:
    """Parse the model's reply into a {field: new_value} dict. Tolerates stray
    markdown fences even though we ask for raw JSON."""
    text = text.strip()
    text = re.sub(r"^```[a-zA-Z]*\n?", "", text)
    text = re.sub(r"\n?```$", "", text.rstrip())
    first, last = text.find("{"), text.rfind("}")
    if first == -1 or last == -1:
        sys.exit("ERROR: model response contained no JSON object")
    try:
        obj = json.loads(text[first:last + 1])
    except json.JSONDecodeError as exc:
        sys.exit(f"ERROR: model response was not valid JSON: {exc}")
    if not isinstance(obj, dict):
        sys.exit("ERROR: model response JSON was not an object")
    return obj


def _is_ident(key: str) -> bool:
    return bool(re.match(r"^[A-Za-z_]\w*$", key))


def to_js(value, indent: int) -> str:
    """Serialize a JSON value to a JS literal with UNQUOTED identifier keys, matching
    data.js style closely enough to pass `node --check`. `indent` is the column the
    value's closing bracket sits at; children indent two further."""
    pad = " " * indent
    child = " " * (indent + 2)
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, bool) or value is None:
        return json.dumps(value)
    if isinstance(value, (int, float)):
        return json.dumps(value)
    if isinstance(value, list):
        if not value:
            return "[]"
        # Inline pure-number arrays (e.g. activity: [31,45,...]); everything else
        # goes multi-line to match the curated string/object arrays.
        if all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in value):
            return "[" + ",".join(json.dumps(x) for x in value) + "]"
        items = [child + to_js(x, indent + 2) for x in value]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    if isinstance(value, dict):
        if not value:
            return "{}"
        parts = []
        for key, val in value.items():
            jskey = key if _is_ident(key) else json.dumps(key)
            parts.append(f"{child}{jskey}: {to_js(val, indent + 2)}")
        return "{\n" + ",\n".join(parts) + "\n" + pad + "}"
    return json.dumps(value, ensure_ascii=False)


_TOPKEY_RE = re.compile(r"(?m)^( {6})(\w+):")
_VALUE_RE = re.compile(r"(?s)^(\s*)(.*?)(,?)(\s*)$")


def apply_patch(block: str, patch: dict, serialize=to_js) -> str:
    """Replace the values of changed top-level fields in `block` (a JS object literal
    `{ ... }`) with serialized values from `patch`. Untouched fields are preserved
    byte-for-byte. Keys the model invents (not already in the block) are skipped.

    `serialize(value, indent)` controls JS rendering; defaults to the verbose `to_js`.
    The deterministic ledger sync passes a compact serializer to keep diffs small."""
    open_i = block.index("{")
    close_i = block.rfind("}")
    body = block[open_i + 1:close_i]

    matches = list(_TOPKEY_RE.finditer(body))
    if not matches:
        sys.exit("ERROR: no top-level fields found in project block")
    known = {m.group(2) for m in matches}
    for key in patch:
        if key not in known:
            print(f"  (skip) model returned unknown top-level field: {key}", file=sys.stderr)

    out, cursor = [], 0
    for idx, m in enumerate(matches):
        key = m.group(2)
        val_start = m.end()
        val_end = matches[idx + 1].start() if idx + 1 < len(matches) else len(body)
        out.append(body[cursor:val_start])        # leading ws + "key:"
        raw = body[val_start:val_end]             # " value,\n      " (incl. comma/ws)
        if key in patch:
            vm = _VALUE_RE.match(raw)
            lead, _old, comma, trail = vm.group(1), vm.group(2), vm.group(3), vm.group(4)
            out.append(lead + serialize(patch[key], 6) + comma + trail)
        else:
            out.append(raw)
        cursor = val_end

    return block[:open_i + 1] + "".join(out) + block[close_i:]


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
        f"CURRENT PROJECT OBJECT (return a JSON patch of changed top-level fields only):\n"
        f"{current_block}"
    )

    client = build_client()
    print(f"Calling GitHub Models ({MODEL}) for project '{args.project}'...")
    resp = call_model(
        client,
        messages=[
            {"role": "system", "content": SYSTEM_INSTRUCTION},
            {"role": "user", "content": user_msg},
        ],
    )

    choice = resp.choices[0]
    if getattr(choice, "finish_reason", None) == "length":
        sys.exit(
            f"ERROR: model output hit the token cap (finish_reason=length) — the patch "
            f"was truncated. The set of changed fields is too large for one request "
            f"(GitHub Models free tier caps output at {OUTPUT_TOKEN_CAP} tokens). "
            f"Narrow the docs window or update fewer fields per run."
        )

    patch = parse_patch(choice.message.content or "")

    # Hard fence (the actual guarantee, independent of the prompt): drop any protected
    # field the model returned. `progress` and `waves` are owned by sync_ledgers.py;
    # a stray one here can never reach data.js. This lives in the bot's flow, not in
    # apply_patch, so the deterministic ledger sync can still write those fields.
    for key in sorted(PROTECTED_FIELDS & patch.keys()):
        print(f"  (BLOCKED) refusing model write to protected field '{key}' "
              f"(owned by sync_ledgers.py)", file=sys.stderr)
        patch.pop(key)

    if not patch:
        print("No changed fields reported — data.js already current.")
        return 0
    print(f"Patch fields: {', '.join(patch)}")

    new_block = apply_patch(current_block, patch)
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
