#!/usr/bin/env python3
"""Mechanical staleness check for the HAND-MAINTAINED narrative fields, the
counterpart to check_audit_freshness.py.

The scheduled refresh owns progress/activity/lastActivity/dates and keeps them
true to git. It does NOT own phase/focus/nextActions/recent/pendingDecisions/
reminders - those only drift, and a partial /dashboard-update that touches some
cards but not others leaves the rest silently a month stale (exactly the failure
that prompted this check).

The precise, un-foolable signal: each card's `recent[0]` is a hand-written
highlight feed with a leading YYYY-MM-DD (or YYYY-MM) date; `lastActivity.date`
is auto-derived from real git activity. If real activity has run AHEAD of the
narrative feed by more than STALE_DAYS, the narrative for that card was not
refreshed this pass. Deliberately date-only - no prose parsing - so a bad parse
can never look more authoritative than honest staleness.

Writes narrative-freshness.js (for an optional badge, mirroring
audit-freshness.js); never touches data.js. Prints a STALE/OK summary. A
non-empty STALE list means /dashboard-update is not "done" - the flagged cards
still need their narrative fields swept.
"""
import json
import pathlib
import re
import subprocess
import sys
from datetime import date, datetime

HERE = pathlib.Path(__file__).parent
DATA_JS = HERE / "data.js"
OUT = HERE / "narrative-freshness.js"

# Real git activity may run this many days ahead of the narrative feed before we
# call it stale. Covers a normal same-week refresh lag; a month-old feed on an
# active card blows straight past it.
STALE_DAYS = 14

DATE_RE = re.compile(r"(\d{4})-(\d{2})(?:-(\d{2}))?")

_DUMP_JS = (
    "global.window={};"
    f"require({json.dumps(str(DATA_JS))});"
    "console.log(JSON.stringify(window.DASHBOARD_DATA.projects.map(p=>("
    "{id:p.id,name:p.name,status:p.status,"
    "lastActivity:p.lastActivity||null,recent:p.recent||[]}))));"
)


def load_projects():
    result = subprocess.run(["node", "-e", _DUMP_JS], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR: could not load data.js via node - {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    return json.loads(result.stdout)


def parse_date(text):
    """Leading YYYY-MM-DD or YYYY-MM out of a string -> date (month-only -> day 1)."""
    if not isinstance(text, str):
        return None
    m = DATE_RE.match(text.strip())
    if not m:
        return None
    y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3) or 1)
    try:
        return date(y, mo, d)
    except ValueError:
        return None


def newest_recent_date(recent):
    """Max parseable date across the recent feed (don't assume it's sorted)."""
    dates = [parse_date(x if isinstance(x, str) else x.get("text", "")) for x in recent]
    dates = [d for d in dates if d]
    return max(dates) if dates else None


def main():
    projects = load_projects()
    results = {}
    stale_ids = []
    for p in projects:
        la = (p.get("lastActivity") or {}).get("date")
        la_date = parse_date(la) if la else None
        recent = p.get("recent") or []
        rec_date = newest_recent_date(recent)

        lag = None
        is_stale = False
        reason = None
        if la_date and rec_date:
            lag = (la_date - rec_date).days
            if lag > STALE_DAYS:
                is_stale = True
                reason = (f"git activity ({la_date}) is {lag} days ahead of the "
                          f"newest recent[] entry ({rec_date})")
        elif la_date and not rec_date:
            is_stale = True
            reason = "no parseable date in the recent[] feed"

        results[p["id"]] = {
            "name": p["name"],
            "status": p.get("status"),
            "lastActivity": la,
            "newestRecent": rec_date.isoformat() if rec_date else None,
            "lagDays": lag,
            "stale": is_stale,
            "reason": reason,
        }
        if is_stale:
            stale_ids.append(p["id"])

    payload = {
        "checked": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "staleDays": STALE_DAYS,
        "projects": results,
    }
    OUT.write_text(
        "window.NARRATIVE_FRESHNESS = " + json.dumps(payload, indent=2) + ";\n",
        encoding="utf-8",
    )

    if stale_ids:
        print(f"[narrative-freshness] {len(stale_ids)} card(s) have git activity "
              f">{STALE_DAYS}d ahead of their narrative feed: {', '.join(stale_ids)}")
        for pid in stale_ids:
            print(f"[narrative-freshness]   {pid}: {results[pid]['reason']}")
        print("[narrative-freshness] these cards' hand-maintained fields "
              "(phase/focus/nextActions/recent/pendingDecisions/reminders) need a "
              "sweep before /dashboard-update is done.")
        return 1
    print(f"[narrative-freshness] checked {len(results)} card(s); "
          f"all narrative feeds current within {STALE_DAYS} days of git activity")
    return 0


if __name__ == "__main__":
    sys.exit(main())
