"""BIM-Watch pipeline entry point.

    python -m bimwatch.run              # collect, classify, render
    python -m bimwatch.run --no-classify   # collect and render only (no API spend)
    python -m bimwatch.run --dry-run       # collect and report, write nothing

Exit codes: 0 success (including "classification unavailable"), 1 unexpected failure.
A run where every source failed still exits 0 and writes the artefacts -- the
dashboard's freshness stamp is what tells the story, and a non-zero exit would just
turn a visible problem into a red CI badge nobody reads.
"""

from __future__ import annotations

import argparse
import os
import sys
from datetime import datetime, timezone

from . import classify, collect, digest, render, store

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(HERE)

SOURCES_PATH = os.path.join(HERE, "sources.json")
PROFILE_PATH = os.path.join(HERE, "profile.md")
STATE_PATH = os.path.join(HERE, "state", "state.json")
ARCHIVE_PATH = os.path.join(HERE, "state", "archive.json")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="bimwatch.run")
    parser.add_argument("--no-classify", action="store_true",
                        help="skip the Claude classification pass")
    parser.add_argument("--dry-run", action="store_true",
                        help="fetch and report, but write nothing")
    parser.add_argument("--out", default=REPO_ROOT,
                        help="directory to write bimwatch.js into (default: repo root)")
    parser.add_argument("--window", type=int, default=7,
                        help="briefing window in days (default: 7)")
    args = parser.parse_args(argv)

    now = datetime.now(timezone.utc)
    print(f"BIM-Watch run {now.isoformat()}")

    sources = collect.load_sources(SOURCES_PATH)
    state = collect.load_state(STATE_PATH)
    archive = store.load(ARCHIVE_PATH)
    print(f"  {len(sources)} sources, {len(archive)} items already archived\n")

    items, state = collect.collect_all(sources, state, now=now)
    summary = store.ingest(archive, items, now=now)
    archive = store.prune(archive, now=now)
    print(f"\n  fetched {len(items)}, new {summary['added']}, "
          f"updated {summary['updated']}, archive now {len(archive)}")

    if args.no_classify:
        print("  classification skipped (--no-classify)")
        classification = {"available": False, "reason": "skipped"}
    else:
        profile = classify.load_profile(PROFILE_PATH)
        classification = classify.classify_items(archive, profile, now=now)
        print(f"  classified {classification['classified']}, "
              f"failed {classification['failed']}")

    briefing = digest.compose(archive, sources, now=now, window_days=args.window)
    briefing["classification_available"] = classification.get("available", False)
    stale = digest.stale_sources(sources, state)

    print(f"\n  {briefing['headline']}")
    print(f"  alerts {len(briefing['alerts'])} · learning {len(briefing['learning'])} "
          f"· fyi {len(briefing['fyi'])} · unsorted {briefing['unsorted_count']}")
    if stale:
        print(f"\n  {len(stale)} STALE source(s):")
        for entry in stale:
            print(f"    - {entry['name']}: {entry['reason']}")

    if args.dry_run:
        print("\n  dry run -- nothing written")
        return 0

    store.save(ARCHIVE_PATH, archive, health=state, now=now)
    collect.save_state(STATE_PATH, state)
    sizes = render.write_all(args.out, archive, briefing, sources, state, stale, now=now)

    print("\n  wrote:")
    for name, size in sizes.items():
        print(f"    {name:24} {size / 1024:8.1f} KB")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # noqa: BLE001 - top level guard
        print(f"BIM-Watch failed: {type(exc).__name__}: {exc}", file=sys.stderr)
        sys.exit(1)
