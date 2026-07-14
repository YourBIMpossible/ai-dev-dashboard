#!/usr/bin/env python3
"""Mechanical staleness check for the Audit tab: compares each project's
data.js `audit.reportPath` against the newest date-stamped report file
actually sitting in that report's own directory. Deliberately does NOT
parse finding counts/severity out of report prose - date comparison only,
so a bad parse can never look more authoritative than honest staleness.
Writes audit-freshness.js; never touches data.js.
"""
import json
import pathlib
import re
import subprocess
import sys
from datetime import datetime

HERE = pathlib.Path(__file__).parent
DATA_JS = HERE / "data.js"
OUT = HERE / "audit-freshness.js"

DATE_RE = re.compile(r"(\d{4}-\d{2}-\d{2})")

# Some projects file periodic audits in MORE than the single directory their
# data.js `reportPath` points at. BIMpossible's *weekly* full audits land in
# "Audit and Scan Info/" (e.g. weekly-full-audit_2026-07-13.md), NOT the
# "Audit Reports/" archive its reportPath references - so a fresh weekly audit
# went undetected on the dashboard until 2026-07-13. List every extra
# audit-report root here, keyed by project id; each is scanned alongside
# reportPath.parent so the newest report across ALL of them drives staleness.
EXTRA_SCAN_ROOTS = {
    "bimpossible": [
        pathlib.Path(r"F:\AI-Dev\BIMpossible_Workspace\02_Reference\Audit and Scan Info"),
    ],
}

_DUMP_JS = (
    "global.window={};"
    f"require({json.dumps(str(DATA_JS))});"
    "console.log(JSON.stringify(window.DASHBOARD_DATA.projects.map(p=>"
    "({id:p.id,name:p.name,audit:p.audit?{lastRun:p.audit.lastRun,reportPath:p.audit.reportPath}:null}))));"
)


def load_projects():
    result = subprocess.run(["node", "-e", _DUMP_JS], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR: could not load data.js via node - {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    return json.loads(result.stdout)


def newest_report_date(directories):
    # Report directories are not audit-exclusive - e.g. BIMpossible Site's
    # 01_BuildLog/ also holds dated non-audit entries like "2026-05-28__design-
    # wishlist-parked.md". Every real report filename across the tracked
    # directories contains "audit" (verified 2026-07-10); require it so an
    # unrelated dated file can never masquerade as a newer report. Scans every
    # directory given (reportPath.parent + any EXTRA_SCAN_ROOTS for the project)
    # and returns the single newest date across all of them. Non-recursive by
    # design, so it won't descend into _backups/ subfolders.
    newest = None
    for directory in directories:
        directory = pathlib.Path(directory)
        if not directory.is_dir():
            continue
        for f in directory.iterdir():
            if not f.is_file() or "audit" not in f.name.lower():
                continue
            m = DATE_RE.search(f.name)
            if m and (newest is None or m.group(1) > newest):
                newest = m.group(1)
    return newest


def main():
    projects = load_projects()
    results = {}
    stale_ids = []
    for p in projects:
        audit = p.get("audit")
        if not audit or not audit.get("reportPath"):
            continue
        scan_dirs = [pathlib.Path(audit["reportPath"]).parent] + EXTRA_SCAN_ROOTS.get(p["id"], [])
        newest = newest_report_date(scan_dirs)
        is_stale = bool(newest and newest > audit["lastRun"])
        results[p["id"]] = {
            "name": p["name"],
            "lastRun": audit["lastRun"],
            "newestOnDisk": newest,
            "stale": is_stale,
        }
        if is_stale:
            stale_ids.append(p["id"])

    payload = {
        "checked": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "projects": results,
    }
    OUT.write_text(
        "window.AUDIT_FRESHNESS = " + json.dumps(payload, indent=2) + ";\n",
        encoding="utf-8",
    )

    if stale_ids:
        print(f"[audit-freshness] {len(stale_ids)} project(s) have a newer report on disk than data.js reflects: {', '.join(stale_ids)}")
    else:
        print(f"[audit-freshness] checked {len(results)} audited project(s); all current with disk")
    return 0


if __name__ == "__main__":
    sys.exit(main())
