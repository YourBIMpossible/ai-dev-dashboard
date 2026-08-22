#!/usr/bin/env python3
"""
Mandatory post-audit reconciliation stage for the dashboard's audit-ingest.

Why this exists
---------------
An audit report is a POINT-IN-TIME snapshot. Publishing its raw findings as the
dashboard's *current open backlog* is wrong the moment any of them is fixed after
the report was written. On 2026-08-21 the bimpossible card published a 2026-08-17
report verbatim (77 open) when 47 of those findings were already closed in code —
the owner rightly read it as "you're showing me stuff I already resolved."

This module makes that failure structurally impossible. Between "raw findings
extracted from the report" and "open list rendered to data.js", every ingest MUST
run reconcile(): it inspects the project's declared repositories for merged fixes
made AFTER the report timestamp, matches each finding by its EXACT finding-ID
citation in a commit (no title similarity, no prefix matching, no commit-title
guessing), and classifies each finding OPEN / RESOLVED / UNKNOWN. Only OPEN (and,
conservatively, UNKNOWN) findings are published; RESOLVED findings drop to the
history/evidence record. Exact commit/PR evidence is written local-only.

Fail-closed contract
--------------------
If the reconciliation cannot actually run — no repo declared, or NO declared repo
is git-inspectable — reconcile() returns ingestStatus="failed" and the caller MUST
NOT overwrite the existing audit block. We never silently fall back to the raw
findings. If SOME declared repos are inspectable and some are not, status is
"partial": findings not proven RESOLVED in an inspected repo are held as UNKNOWN
(retained in the public open list) rather than dropped, because a fix might live in
the repo we couldn't read.

This is a library + thin CLI. It reuses the splice/serialize machinery in
sync_dashboard.py; it never freehand-edits data.js.

CLI:
    python reconcile_audit.py --project bimpossible \
        --report "<path to dated report>" \
        --findings raw-findings.json          # [{id,sev,title,where}, ...]
        [--write]                              # patch data.js only if status != failed

Without --write it prints the reconciliation result (JSON) and writes nothing.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

from sync_dashboard import apply_patch, extract_block, node_check, to_js

HERE = Path(__file__).resolve().parent
DATA_JS = HERE / "data.js"
# local/ is gitignored — exact per-finding fix evidence (commit SHAs, PRs) lives
# here and is NEVER published to the public data.js.
LOCAL_DIR = HERE / "local"

SEVERITIES = ("critical", "high", "medium", "low", "info")

# A finding ID is an uppercase, hyphen-joined token that ENDS in a number:
#   SEC-WIZ-HUB-1  HYG-3  FE-CSS-1  ARCH-PROJGATE-INVARIANT-1  SLOP-FE-2
# Anchored on word boundaries so a bare "-1" or a lowercase word never matches.
FINDING_ID_RE = re.compile(r"\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d+\b")

DATE_RE = re.compile(r"(\d{4}-\d{2}-\d{2})")

# A cited finding-ID only counts as a CLOSURE when its commit also expresses
# resolution intent — otherwise a commit that merely mentions an ID ("follow-up to
# RE-2", "test asserts SEC-PAIR-1 shape") would silently mark a still-open finding
# fixed and hide it from the dashboard. Hiding a real open finding is the dangerous
# failure on a security board, so we fail safe: a bare mention leaves the finding
# OPEN. This is NOT commit-title guessing — the exact finding-ID must still appear;
# the verb only distinguishes a fix commit from a passing reference.
RESOLUTION_CUE_RE = re.compile(
    r"\b(fix(?:e[sd])?|resolv(?:e[sd]?|ing)|clos(?:e[sd]?|ing)|"
    r"address(?:e[sd])?|remediat\w*|patch(?:e[sd])?)\b",
    re.IGNORECASE,
)

# --------------------------------------------------------------------------- #
# Per-project repository declaration.
#
# Reconciliation needs LOCAL git clones to `git log` commit bodies for finding-ID
# citations. sync_activity.py already declares each project's repos as GitHub
# "owner/repo" slugs (for `gh api`); those can't be git-logged for bodies quickly,
# so this is the local-clone view of the same declaration, keyed by the same
# project ids and using the SAME env-var override pattern as sync_ledgers.py /
# sync_activity.py so another machine can relocate a clone without editing source.
# A project with no entry here has NO declared repo -> reconciliation fails closed.
# --------------------------------------------------------------------------- #
BIM_REPO = Path(os.environ.get("BIMPOSSIBLE_REPO", r"F:\AI-Dev\BIMpossible"))
WS_REPO = Path(os.environ.get("BIMPOSSIBLE_WORKSPACE", r"F:\AI-Dev\BIMpossible_Workspace"))
ADDINS_REPO = Path(os.environ.get("BIMPOSSIBLE_ADDINS_REPO", r"F:\AI-Dev\Add-Ins"))

PROJECT_RECON_REPOS: dict[str, list[Path]] = {
    "bimpossible": [BIM_REPO, WS_REPO],
    "addins":      [ADDINS_REPO],
}


class ReconcileError(Exception):
    """Raised for an unrecoverable input problem (unparseable report, bad findings)."""


# --------------------------------------------------------------------------- #
# Report timestamp
# --------------------------------------------------------------------------- #
def report_date(report_path: Path) -> str:
    """The report's date (YYYY-MM-DD), taken from the filename's date stamp — the
    convention every audit report in this system already follows
    (weekly-full-audit_2026-08-17.md). Raise if the report is missing or carries no
    parseable date, so an unparseable report FAILS the ingest rather than silently
    reconciling against the wrong window."""
    if not report_path.is_file():
        raise ReconcileError(f"report not found: {report_path}")
    m = DATE_RE.search(report_path.name)
    if not m:
        # Fall back to a leading dated line inside the file, else fail.
        m = DATE_RE.search(report_path.read_text(encoding="utf-8", errors="replace")[:2000])
    if not m:
        raise ReconcileError(f"no parseable date in report: {report_path.name}")
    return m.group(1)


# --------------------------------------------------------------------------- #
# Git driver: which finding-IDs are cited as fixed after the report, and where.
# --------------------------------------------------------------------------- #
def git_cited_findings(repo: Path, since_date: str):
    """Scan `repo`'s commits from `since_date` (inclusive) through HEAD and return
    (citations, head_sha, ok):

      citations : {finding_id -> [ {repo, sha, date, subject}, ... ]}
      head_sha  : the HEAD sha the scan reconciled against (str) or None
      ok        : False if the repo is missing / git is unreachable / the log
                  could not be read — the caller treats a non-ok repo as
                  "un-inspectable" and fails closed / degrades to UNKNOWN.

    Matching is by EXACT finding-ID token only (FINDING_ID_RE over subject+body).
    A commit that merely resembles a finding title, or shares an ID PREFIX, is
    never counted — only a literal ID occurrence is."""
    repo = Path(repo)
    if not (repo / ".git").exists() and not repo.is_dir():
        return {}, None, False
    try:
        head = subprocess.run(
            ["git", "-C", str(repo), "rev-parse", "HEAD"],
            capture_output=True, encoding="utf-8", check=True,
        ).stdout.strip()
        out = subprocess.run(
            ["git", "-C", str(repo), "log", f"--since={since_date}T00:00:00",
             "--format=%H%x1f%cI%x1f%s%x1f%b%x1e"],
            capture_output=True, encoding="utf-8", check=True,
        ).stdout
    except (subprocess.CalledProcessError, FileNotFoundError, UnicodeDecodeError):
        return {}, None, False

    citations: dict[str, list[dict]] = {}
    for record in out.split("\x1e"):
        record = record.strip("\n")
        if not record:
            continue
        parts = record.split("\x1f")
        if len(parts) < 4:
            continue
        sha, date_iso, subject, body = parts[0], parts[1], parts[2], parts[3]
        text = f"{subject}\n{body}"
        ids = set(FINDING_ID_RE.findall(text))
        if not ids:
            continue
        # Only a commit that expresses resolution intent closes the IDs it cites.
        if not RESOLUTION_CUE_RE.search(text):
            continue
        evidence = {
            "repo": repo.name,
            "sha": sha[:10],
            "date": date_iso[:10],
            "subject": subject.strip(),
        }
        for fid in ids:
            citations.setdefault(fid, []).append(evidence)
    return citations, head, True


# --------------------------------------------------------------------------- #
# The reconciliation itself
# --------------------------------------------------------------------------- #
def _counts(findings) -> dict:
    c = Counter(f.get("sev", "").lower() for f in findings)
    return {s: c.get(s, 0) for s in SEVERITIES}


class ReconcileResult:
    def __init__(self, *, project, report_date, reconciled_at, heads, raw,
                 open_findings, unknown_findings, resolved_findings,
                 evidence, status, detail):
        self.project = project
        self.report_date = report_date
        self.reconciled_at = reconciled_at
        self.heads = heads                      # [{repo, head, inspected}]
        self.raw = raw
        self.open = open_findings
        self.unknown = unknown_findings
        self.resolved = resolved_findings
        self.evidence = evidence                # id -> [commit dicts]  (LOCAL ONLY)
        self.status = status                    # success | partial | failed
        self.detail = detail

    @property
    def published(self) -> list:
        """Everything the card keeps VISIBLE: strictly-OPEN plus conservatively-
        retained UNKNOWN. RESOLVED findings never appear here. This is NOT the
        `open` field — `open` is strictly-open; UNKNOWN is exposed separately so a
        combined value is never mislabeled 'open'."""
        return self.open + self.unknown

    def audit_fields(self) -> dict:
        """The reconciliation fields to splice into the audit block. Contains NO
        exact fix evidence (that is local-only); only aggregate provenance.

        Count contract:
          rawCounts       - severity histogram of ALL report findings
          openCounts      - strictly-OPEN (cited nowhere, ownership known)
          unknownCounts   - retained-but-unproven (a declared repo was unreadable)
          resolvedCounts  - closed by exact finding-ID citation
          publishedCounts - openCounts + unknownCounts (everything still shown).
                            The ONLY combined number, and it is NOT called 'open'.
          counts          - alias of openCounts, kept so the existing severity badge
                            (sum(counts) == len(open)) stays honest: strictly-open.
        List contract: `open` is strictly-OPEN; `unknown` is its own labeled list."""
        open_counts = _counts(self.open)
        unknown_counts = _counts(self.unknown)
        published_counts = {s: open_counts[s] + unknown_counts[s] for s in SEVERITIES}
        return {
            "reportDate": self.report_date,
            "reconciledAt": self.reconciled_at,
            "reconciliationHeads": self.heads,
            "rawCounts": _counts(self.raw),
            "openCounts": open_counts,
            "unknownCounts": unknown_counts,
            "resolvedCounts": _counts(self.resolved),
            "publishedCounts": published_counts,
            "ingestStatus": self.status,
            "ingestDetail": self.detail,
            "counts": open_counts,              # existing badge == strictly-open only
            "closedLastRun": len(self.resolved),
            "open": self.open,                  # strictly-open; never mixed with UNKNOWN
            "unknown": self.unknown,            # retained + labeled, counted separately
        }

    def to_dict(self) -> dict:
        d = self.audit_fields()
        d["project"] = self.project
        d["resolvedIds"] = sorted(f["id"] for f in self.resolved)
        d["unknownIds"] = sorted(f["id"] for f in self.unknown)
        return d

    def evidence_payload(self) -> dict:
        return {
            "project": self.project,
            "reportDate": self.report_date,
            "reconciledAt": self.reconciled_at,
            "reconciliationHeads": self.heads,
            "ingestStatus": self.status,
            "resolved": {
                f["id"]: self.evidence.get(f["id"], []) for f in self.resolved
            },
        }


def reconcile(project: str, raw_findings: list, report_date_str: str,
              repos=None, *, git_driver=git_cited_findings,
              now: str | None = None) -> ReconcileResult:
    """Classify each raw finding OPEN / RESOLVED / UNKNOWN against merged fixes made
    after `report_date_str` in the project's declared repos.

    - RESOLVED : the finding's EXACT id is cited in a commit (after the report) in
                 an INSPECTED repo.
    - OPEN     : not cited anywhere, and every declared repo was inspected OK
                 (ownership known, no closure found).
    - UNKNOWN  : not cited, but at least one declared repo could not be inspected —
                 a fix might live there, so it is conservatively retained.

    ingestStatus:
    - failed  : no repo declared, or NO declared repo was inspectable -> the caller
                MUST NOT overwrite the existing audit block (fail closed).
    - partial : some declared repos inspected, some not (UNKNOWNs present).
    - success : every declared repo inspected OK.

    `git_driver(repo, since_date) -> (citations, head, ok)` is injectable for tests.
    """
    if repos is None:
        repos = PROJECT_RECON_REPOS.get(project, [])
    reconciled_at = now or datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for f in raw_findings:
        if "id" not in f or "sev" not in f:
            raise ReconcileError(f"raw finding missing id/sev: {f!r}")

    cited: dict[str, list[dict]] = {}
    heads: list[dict] = []
    inspected_any = False
    failed_repos: list[str] = []
    for repo in repos:
        repo = Path(repo)
        citations, head, ok = git_driver(repo, report_date_str)
        heads.append({"repo": repo.name, "head": (head or "")[:10], "inspected": ok})
        if ok:
            inspected_any = True
            for fid, evs in citations.items():
                cited.setdefault(fid, []).extend(evs)
        else:
            failed_repos.append(repo.name)

    # Fail closed: nothing to reconcile against.
    if not repos or not inspected_any:
        if not repos:
            detail = f"no repository declared for project '{project}' — cannot reconcile (fail closed)"
        else:
            detail = ("no declared repository was git-inspectable "
                      f"({', '.join(failed_repos)}) — cannot reconcile (fail closed)")
        return ReconcileResult(
            project=project, report_date=report_date_str, reconciled_at=reconciled_at,
            heads=heads, raw=raw_findings, open_findings=[], unknown_findings=[],
            resolved_findings=[], evidence={}, status="failed", detail=detail,
        )

    open_f, unknown_f, resolved_f = [], [], []
    evidence: dict[str, list[dict]] = {}
    have_failed = bool(failed_repos)
    for f in raw_findings:
        fid = f["id"]
        if fid in cited:
            resolved_f.append(f)
            evidence[fid] = cited[fid]
        elif have_failed:
            unknown_f.append(f)
        else:
            open_f.append(f)

    if have_failed:
        status = "partial"
        detail = (f"reconciled against {', '.join(h['repo'] for h in heads if h['inspected'])}; "
                  f"{len(failed_repos)} repo(s) un-inspectable ({', '.join(failed_repos)}) — "
                  f"{len(unknown_f)} finding(s) held UNKNOWN and retained in the open list")
    else:
        status = "success"
        detail = (f"reconciled against {', '.join(h['repo'] for h in heads)}; "
                  f"{len(resolved_f)} of {len(raw_findings)} closed by exact finding-ID "
                  f"citation, {len(open_f)} open")

    return ReconcileResult(
        project=project, report_date=report_date_str, reconciled_at=reconciled_at,
        heads=heads, raw=raw_findings, open_findings=open_f,
        unknown_findings=unknown_f, resolved_findings=resolved_f,
        evidence=evidence, status=status, detail=detail,
    )


# --------------------------------------------------------------------------- #
# Writing back (only on non-failed status)
# --------------------------------------------------------------------------- #
def write_back(result: ReconcileResult, data_path: Path = DATA_JS) -> None:
    """Splice the reconciliation fields into the project's audit block and write the
    local-only evidence file. Refuses on ingestStatus=failed (fail closed)."""
    if result.status == "failed":
        raise ReconcileError(
            f"refusing to write data.js: reconciliation failed — {result.detail}")

    data_js = data_path.read_text(encoding="utf-8")
    i, j, block = extract_block(data_js, result.project)

    # Merge reconciliation fields into the existing audit object so untouched audit
    # sub-fields (reportPath, cadence, trend, history, ...) survive.
    dump_js = (
        "global.window={};"
        f"require({json.dumps(str(data_path.resolve()).replace(chr(92), '/'))});"
        f"const p=window.DASHBOARD_DATA.projects.find(x=>x.id==={json.dumps(result.project)});"
        "process.stdout.write(JSON.stringify(p.audit||{}));"
    )
    proc = subprocess.run(["node", "-e", dump_js], capture_output=True,
                          encoding="utf-8")
    if proc.returncode != 0:
        raise ReconcileError(f"could not read existing audit block via node: {proc.stderr.strip()}")
    audit = json.loads(proc.stdout)
    audit.update(result.audit_fields())

    new_block = apply_patch(block, {"audit": audit}, serialize=to_js)
    spliced = data_js[:i] + "\n    " + new_block + ",\n    " + data_js[j:]
    if not node_check(spliced):
        raise ReconcileError("reconciled data.js failed `node --check` — refusing to write")
    data_path.write_text(spliced, encoding="utf-8", newline="")

    LOCAL_DIR.mkdir(exist_ok=True)
    ev_path = LOCAL_DIR / f"audit-evidence-{result.project}.json"
    ev_path.write_text(json.dumps(result.evidence_payload(), indent=2), encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Reconcile an audit report against merged fixes.")
    ap.add_argument("--project", required=True)
    ap.add_argument("--report", required=True, help="path to the dated audit report")
    ap.add_argument("--findings", required=True,
                    help="JSON file: [{id, sev, title, where}, ...] raw findings from the report")
    ap.add_argument("--write", action="store_true",
                    help="patch data.js (and write local evidence) if status != failed")
    args = ap.parse_args()

    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass

    rd = report_date(Path(args.report))
    raw = json.loads(Path(args.findings).read_text(encoding="utf-8"))
    if isinstance(raw, dict):  # tolerate {"open":[...]} or {"findings":[...]}
        raw = raw.get("findings") or raw.get("open") or []

    result = reconcile(args.project, raw, rd)
    print(json.dumps(result.to_dict(), indent=2))
    print(f"\n[reconcile] {args.project}: status={result.status} — {result.detail}",
          file=sys.stderr)

    if args.write:
        if result.status == "failed":
            print("[reconcile] FAILED — data.js left untouched (fail closed).", file=sys.stderr)
            return 1
        write_back(result)
        print(f"[reconcile] wrote data.js + local/audit-evidence-{args.project}.json",
              file=sys.stderr)
    return 0 if result.status != "failed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
