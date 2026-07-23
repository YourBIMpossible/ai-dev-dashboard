#!/usr/bin/env python3
"""sync_activity.py - deterministic per-project activity refresh (NO model).

Reads each project's REAL commit history - from GitHub via the `gh` CLI (using the
machine's existing gh auth - no tokens to manage) for repos that have a GitHub
remote, or straight from `git log` for local-only repos that don't - and writes the
two FACTUAL fields that tell you whether a project is alive:

  - activity      : 14-int array, commits/day over the rolling 14-day window
  - lastActivity  : { date, summary } of the newest commit across the project's repos

plus the top-level `activitySince` (window start = today-13d) that the heat grid and
area chart index from.

Why this exists
---------------
Card freshness used to depend on a per-repo GitHub Actions model bot that (a) did not
exist on the main code repo, (b) only fired on strategy-doc changes, (c) never keyed
off commits - so real pushes never moved the dates (Site card sat 16 days stale while
the repo was pushed daily). This makes freshness deterministic and runs inside the
06:00 refresh, covering every repo - including ones not cloned locally.

Field ownership (one writer per field, so nothing fights)
---------------------------------------------------------
  progress, waves            -> sync_ledgers.py   (the ledgers)
  activity, lastActivity     -> THIS script        (git truth; fenced out of the bot)
  oneLiner / focus / recent  -> sync_dashboard.py  (model bot, prose only)

Reuses sync_dashboard.py's splice/validate machinery (extract_block / apply_patch /
to_js / node_check) so a bad write can never ship an invalid data.js.
"""
from __future__ import annotations

import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import sync_dashboard as sd  # reuse extract_block / apply_patch / to_js / node_check

WINDOW_DAYS = 14

# Local-only repos (git-initialized, no GitHub remote) that PROJECT_REPOS points at
# directly instead of an "owner/repo" slug. Env var overrides let another machine
# relocate a clone without editing source - same pattern as sync_ledgers.py's WS/BIM_REPO.
AI_BRAIN_DATA_REPO = Path(os.environ.get("AI_BRAIN_DATA_REPO", r"F:\AI-Dev\AI-Brain-Data"))
PC_MONITOR_REPO = Path(os.environ.get("PC_MONITOR_REPO", r"F:\AI-Dev\PC-Monitor"))

# project id (data.js marker) -> source repo(s). A project may span repos (the
# platform card counts both the code repo and the strategy workspace). Each entry is
# either a GitHub "owner/repo" slug (fetched via `gh api`) or a Path to a local
# git-initialized repo with no GitHub remote (read straight from `git log` - see
# fetch_commits/local_commits below). pickem is intentionally absent: no repo under
# this account (owner decision 2026-06-27).
PROJECT_REPOS = {
    "bimpossible": ["YourBIMpossible/BIMpossible", "YourBIMpossible/BIMpossible_Workspace"],
    "addins":      ["YourBIMpossible/BIMpossible-AddIns"],
    "site":        ["YourBIMpossible/bimpossible-site"],
    "aiserver":    ["YourBIMpossible/AI-Server"],
    "families":    ["YourBIMpossible/Families-by-BIMpossible"],
    "laundry":     ["YourBIMpossible/lazy-laundry-app"],
    "bimpossible-workspace": ["YourBIMpossible/BIMpossible_Workspace"],
    "dashboard-auto":        ["YourBIMpossible/ai-dev-dashboard"],
    "ai-brain-data": [AI_BRAIN_DATA_REPO],
    "pc-monitor":    [PC_MONITOR_REPO],
}


def gh_commits(repo: str, since_iso: str):
    """Commits on the default branch since `since_iso` (UTC ISO8601). Returns a list of
    {date: aware-datetime(local), subject: str, sha: str}, or None if the gh call
    errored (so a single unreachable repo never false-zeroes a card)."""
    try:
        out = subprocess.run(
            ["gh", "api", "--paginate", f"repos/{repo}/commits",
             "-X", "GET", "-f", f"since={since_iso}",
             "--jq", ".[] | {date: .commit.committer.date, msg: .commit.message, sha: .sha}"],
            # gh always writes UTF-8 to stdout regardless of the Windows console
            # codepage; without an explicit encoding, text mode falls back to
            # locale.getpreferredencoding() (cp1252 on this machine) and silently
            # mangles any non-ASCII commit message (em dashes, curly quotes, ...).
            capture_output=True, encoding="utf-8", check=True,
        ).stdout
    except (subprocess.CalledProcessError, FileNotFoundError, UnicodeDecodeError) as exc:
        detail = getattr(exc, "stderr", "") or str(exc)
        print(f"  (warn) gh api failed for {repo}: {detail.strip()[:200]}", file=sys.stderr)
        return None

    commits = []
    for line in out.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            o = json.loads(line)
        except json.JSONDecodeError:
            continue
        when = dt.datetime.fromisoformat(o["date"].replace("Z", "+00:00")).astimezone()
        subject = (o["msg"] or "").splitlines()[0].strip()
        commits.append({"date": when, "subject": subject, "sha": o["sha"][:7]})
    return commits


def local_commits(repo_path: Path, since_iso: str):
    """Commits on HEAD of a local repo with no GitHub remote, since `since_iso` (UTC
    ISO8601) - read straight from `git log`, no `gh` involved. Same return shape as
    gh_commits: a list of {date: aware-datetime(local), subject: str, sha: str}, or
    None if the repo couldn't be read (so one bad local path never false-zeroes a
    card)."""
    try:
        out = subprocess.run(
            ["git", "-C", str(repo_path), "log", f"--since={since_iso}",
             "--format=%H%x1f%cI%x1f%s"],
            # See the matching comment in gh_commits: force UTF-8 explicitly rather
            # than the locale-dependent text-mode default, or non-ASCII commit
            # subjects get silently mangled on Windows.
            capture_output=True, encoding="utf-8", check=True,
        ).stdout
    except (subprocess.CalledProcessError, FileNotFoundError, UnicodeDecodeError) as exc:
        detail = getattr(exc, "stderr", "") or str(exc)
        print(f"  (warn) git log failed for {repo_path}: {detail.strip()[:200]}", file=sys.stderr)
        return None

    commits = []
    for line in out.splitlines():
        line = line.strip()
        if not line:
            continue
        sha, date_iso, subject = line.split("\x1f", 2)
        when = dt.datetime.fromisoformat(date_iso).astimezone()
        commits.append({"date": when, "subject": subject.strip(), "sha": sha[:7]})
    return commits


def fetch_commits(source, since_iso: str):
    """Dispatch one PROJECT_REPOS entry to its fetcher: a "owner/repo" string goes
    to the GitHub API; a Path (a local git-initialized repo with no GitHub remote)
    is read directly via `git log`."""
    if isinstance(source, Path):
        return local_commits(source, since_iso)
    return gh_commits(source, since_iso)


def build_patch(repos, window_start, today):
    """Return ({activity, lastActivity?}, ncommits) for one project, or (None, 0) if
    every repo's fetch errored (leave the card untouched rather than false-zero it)."""
    # Reach back one extra UTC day so a local-midnight-adjacent commit is never missed;
    # we bucket precisely by local date below.
    since_iso = dt.datetime.combine(
        window_start - dt.timedelta(days=1), dt.time.min, dt.timezone.utc
    ).isoformat()

    all_commits, any_ok = [], False
    for repo in repos:
        cs = fetch_commits(repo, since_iso)
        if cs is None:
            continue
        any_ok = True
        all_commits.extend(cs)
    if not any_ok:
        return None, 0

    counts = {}
    for c in all_commits:
        counts[c["date"].date()] = counts.get(c["date"].date(), 0) + 1
    activity = [counts.get(window_start + dt.timedelta(days=i), 0) for i in range(WINDOW_DAYS)]

    patch = {"activity": activity}
    in_window = [c for c in all_commits if window_start <= c["date"].date() <= today]
    if in_window:
        latest = max(in_window, key=lambda c: c["date"])
        summary = latest["subject"] or "(no message)"
        if latest["sha"] not in summary:
            summary = f"{summary} ({latest['sha']})"
        patch["lastActivity"] = {"date": latest["date"].date().isoformat(), "summary": summary}
    # No in-window commits -> update the sparkline to zeros but leave lastActivity as the
    # last real (older-than-window) activity.
    return patch, len(in_window)


def main() -> int:
    data_path = Path(__file__).with_name("data.js")
    data_js = data_path.read_text(encoding="utf-8")

    today = dt.date.today()
    window_start = today - dt.timedelta(days=WINDOW_DAYS - 1)

    changed = 0
    for pid, repos in PROJECT_REPOS.items():
        if f"/* PROJECT:{pid}:START */" not in data_js:
            print(f"  (skip) no marker for project '{pid}'", file=sys.stderr)
            continue
        patch, ncommits = build_patch(repos, window_start, today)
        if patch is None:
            print(f"  (skip) {pid}: all repo fetches errored - left untouched", file=sys.stderr)
            continue
        i, j, block = sd.extract_block(data_js, pid)
        spliced = data_js[:i] + "\n    " + sd.apply_patch(block, patch) + ",\n    " + data_js[j:]
        if spliced != data_js:
            data_js = spliced
            changed += 1
        la = patch.get("lastActivity", {}).get("date", "unchanged")
        print(f"  {pid}: {ncommits} commit(s) in window, last={la}")

    # Roll the 14-day window start (top-level field the renderer indexes from).
    data_js, _ = re.subn(r'activitySince: "\d{4}-\d{2}-\d{2}"',
                         f'activitySince: "{window_start.isoformat()}"', data_js, count=1)

    if not sd.node_check(data_js):
        sys.exit("ERROR: sync_activity produced invalid data.js - refusing to write.")
    data_path.write_text(data_js, encoding="utf-8")
    print(f"Activity sync: updated {changed} card(s); window {window_start}..{today}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
