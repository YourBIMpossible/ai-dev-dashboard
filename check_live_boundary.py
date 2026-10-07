#!/usr/bin/env python3
"""Live deploy-boundary check for https://ai-dev-dashboard.pages.dev (run AFTER a deploy).

Why this is not a plain "status != 200" test: the Pages project serves an SPA-style
fallback, so an unknown path can answer 200 with index.html. A path is therefore judged
by CONTENT, never by status alone:

  excluded path (must NOT be public)
    404/other non-200 ................................ PASS
    200 + body == index.html body (SPA fallback) ..... PASS (fallback, not the file)
    200 + body == the repo/disk file's bytes ......... FAIL (the file is published)
    200 + any other body ............................. FAIL (unexplained content; inspect)
  positive control (must be public)
    200 + body == the file's exact bytes ............. PASS, anything else FAIL
    (a control that only returned index.html means the check itself is untrustworthy)

Requests carry a cache-busting query string and no-cache headers.

Excluded set (default, all of which a clean-checkout deploy must not serve as themselves):
  * every file found under local/ on this machine (gitignored; compared against disk bytes)
  * Wrangler's own skipped control files that exist in the repo (_headers, functions/**)
  * .git/config and .env probes (no repo bytes to compare; any non-fallback 200 fails)
  * anything added with --exclude PATH (compared against git HEAD bytes, else disk)
Positive controls (default): index.html, data.js (compared against git HEAD bytes).

Usage:
  python check_live_boundary.py                       # live check; exit 0 = holds, 1 = violation, 2 = unreachable (unverified)
  python check_live_boundary.py --manifest-out m.json # also write the simulated upload set
  python check_live_boundary.py --manifest-only       # no network; print the upload manifest
  python check_live_boundary.py --exclude audits/2026-08-10__slop-audit.md --positive bimwatch.js
  python check_live_boundary.py --base-url http://127.0.0.1:8123   # self-test target

Read-only: only HTTP GETs against --base-url, and git/disk reads. No secrets are used.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path

REPO = Path(__file__).resolve().parent
DEFAULT_BASE = "https://ai-dev-dashboard.pages.dev"

# Mirror of wrangler 4.110.0 `pages deploy` validate() IGNORE_LIST (same as test_deploy_boundary.py).
WRANGLER_IGNORED_TOP = {"_worker.js", "_redirects", "_headers", "_routes.json", "functions", ".wrangler"}
WRANGLER_IGNORED_ANYWHERE = {".DS_Store", "node_modules", ".git"}

# Paths with no repo bytes to compare: any 200 that is not the SPA fallback is a failure.
PROBE_ONLY = [".git/config", ".env"]


class NetworkError(RuntimeError):
    pass


def sha256(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def wrangler_would_skip(rel: str) -> bool:
    parts = rel.replace("\\", "/").split("/")
    return parts[0] in WRANGLER_IGNORED_TOP or any(p in WRANGLER_IGNORED_ANYWHERE for p in parts)


def git_bytes(root: Path, rel: str, ref: str = "HEAD") -> bytes | None:
    res = subprocess.run(["git", "-C", str(root), "show", f"{ref}:{rel}"], capture_output=True)
    return res.stdout if res.returncode == 0 else None


def upload_manifest(root: Path, ref: str = "HEAD") -> list[dict]:
    """Simulated upload set of a clean-checkout `wrangler pages deploy .` at `ref`."""
    res = subprocess.run(["git", "-C", str(root), "ls-tree", "-r", "--name-only", ref],
                         capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        raise SystemExit(f"git ls-tree {ref} failed: {res.stderr.strip()}")
    out = []
    for rel in sorted(r for r in res.stdout.splitlines() if r.strip()):
        if wrangler_would_skip(rel):
            continue
        data = git_bytes(root, rel, ref) or b""
        out.append({"path": rel, "bytes": len(data), "sha256": sha256(data)})
    return out


def local_dir_files(root: Path) -> list[str]:
    d = root / "local"
    if not d.is_dir():
        return []
    return sorted(p.relative_to(root).as_posix() for p in d.rglob("*") if p.is_file())


@dataclass
class Result:
    path: str
    kind: str          # "excluded" | "positive"
    ok: bool
    detail: str


def fetch(base: str, rel: str, timeout: float = 20.0) -> tuple[int, bytes]:
    # percent-encode the path: '#', '%', '?', spaces and non-ASCII must reach the server as part of the path
    quoted = urllib.parse.quote(rel.lstrip('/'), safe='/')
    url = f"{base.rstrip('/')}/{quoted}?cb={int(time.time() * 1000)}"
    req = urllib.request.Request(url, headers={"Cache-Control": "no-cache", "Pragma": "no-cache",
                                               "User-Agent": "dashboard-boundary-check/1"})
    last: Exception | None = None
    for _ in range(2):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            return e.code, e.read() or b""
        except (urllib.error.URLError, OSError) as e:  # network failure is "unverified", never a pass
            last = e
    raise NetworkError(f"cannot reach {url}: {last}")


ABSENT_STATUSES = (404, 410)


def judge_excluded(rel: str, status: int, body: bytes, index_sha: str, own_sha: str | None) -> Result:
    if status in ABSENT_STATUSES:
        return Result(rel, "excluded", True, f"HTTP {status}")
    if status != 200:
        # 429 / 5xx / 401 / 403 / redirects say nothing about whether the file is published
        raise NetworkError(f"HTTP {status} for excluded path {rel}: cannot verify absence")
    b = sha256(body)
    if own_sha is not None and b == own_sha:
        return Result(rel, "excluded", False, "PUBLISHED: body equals the file's own bytes")
    if b == index_sha:
        return Result(rel, "excluded", True, "200 is the SPA fallback (== index.html), not the file")
    return Result(rel, "excluded", False, f"200 with unexplained body sha256={b[:12]}; inspect manually")


def judge_positive(rel: str, status: int, body: bytes, index_sha: str, own_sha: str | None) -> Result:
    if status != 200:
        return Result(rel, "positive", False, f"HTTP {status}, expected 200")
    b = sha256(body)
    if own_sha is None:
        return Result(rel, "positive", False, "no reference bytes in git HEAD for this control")
    if b == own_sha:
        return Result(rel, "positive", True, "exact bytes served")
    if b == index_sha and rel != "index.html":
        return Result(rel, "positive", False, "got index.html fallback instead of the file")
    return Result(rel, "positive", False, f"served bytes differ (live {b[:12]} vs repo {own_sha[:12]}); stale deploy or CRLF/transform")


def run_live(base: str, excluded: list[str], positives: list[str], root: Path, ref: str = "HEAD") -> list[Result]:
    istatus, ibody = fetch(base, "index.html")
    if istatus != 200:
        return [Result("index.html", "positive", False, f"HTTP {istatus}: cannot establish the fallback baseline")]
    index_sha = sha256(ibody)
    # SPA fallback baseline: an unknown path's body (some hosts serve "/" differently from "/index.html").
    _, nbody = fetch(base, f"__no_such_path_{int(time.time())}")
    fallback_shas = {index_sha, sha256(nbody)}
    results: list[Result] = []
    for rel in positives:
        st, body = fetch(base, rel)
        ref_bytes = git_bytes(root, rel, ref)
        results.append(judge_positive(rel, st, body, index_sha, sha256(ref_bytes) if ref_bytes is not None else None))
    for rel in excluded:
        st, body = fetch(base, rel)
        own = git_bytes(root, rel, ref)
        if own is None:
            disk = root / rel
            own = disk.read_bytes() if disk.is_file() else None
        r = judge_excluded(rel, st, body, index_sha, sha256(own) if own is not None else None)
        if not r.ok and st == 200 and sha256(body) in fallback_shas:
            r = Result(rel, "excluded", True, "200 is the SPA fallback body")
        results.append(r)
    return results


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--base-url", default=DEFAULT_BASE)
    ap.add_argument("--ref", default="HEAD", help="git ref whose bytes are the expected deployed content")
    ap.add_argument("--exclude", action="append", default=[], help="extra path that must NOT be public (repeatable)")
    ap.add_argument("--positive", action="append", default=[], help="extra path that MUST be public (repeatable)")
    ap.add_argument("--no-local-scan", action="store_true", help="do not add files found under local/ to the excluded set")
    ap.add_argument("--manifest-out", help="write the simulated upload manifest (JSON) to this file")
    ap.add_argument("--manifest-only", action="store_true", help="print manifest summary and exit (no network)")
    args = ap.parse_args(argv)

    manifest = upload_manifest(REPO, args.ref)
    tracked_n = len(subprocess.run(["git", "-C", str(REPO), "ls-tree", "-r", "--name-only", args.ref],
                                   capture_output=True, text=True).stdout.split())
    summary = {"ref": args.ref, "tracked": tracked_n, "uploaded": len(manifest),
               "skipped_by_wrangler": tracked_n - len(manifest),
               "under_local": [m["path"] for m in manifest if m["path"].startswith("local/")]}
    if args.manifest_out:
        Path(args.manifest_out).write_text(json.dumps({"summary": summary, "files": manifest}, indent=1), encoding="utf-8")
    print(f"upload manifest @{args.ref}: {summary['uploaded']} of {summary['tracked']} tracked files "
          f"({summary['skipped_by_wrangler']} skipped by wrangler); {len(summary['under_local'])} under local/")
    if summary["under_local"]:
        print("FAIL: tracked files under local/ would be uploaded:", ", ".join(summary["under_local"]))
        return 1
    if args.manifest_only:
        return 0

    excluded = list(dict.fromkeys(
        ([] if args.no_local_scan else local_dir_files(REPO))
        + ["_headers", "functions/api/bimwatch-chat.js"] + PROBE_ONLY + args.exclude))
    positives = list(dict.fromkeys(["index.html", "data.js"] + args.positive))

    try:
        results = run_live(args.base_url, excluded, positives, REPO, args.ref)
    except NetworkError as e:
        print(f"UNVERIFIED: {e}")
        return 2
    bad = [r for r in results if not r.ok]
    for r in results:
        print(f"{'PASS' if r.ok else 'FAIL'}  [{r.kind:8}] {r.path}  -- {r.detail}")
    print(f"{len(results) - len(bad)}/{len(results)} checks passed against {args.base_url}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
