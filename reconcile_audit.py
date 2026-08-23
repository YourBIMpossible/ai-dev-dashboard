#!/usr/bin/env python3
"""
Mandatory post-audit reconciliation stage for the dashboard's audit-ingest.

Why this exists
---------------
An audit report is a POINT-IN-TIME snapshot. Publishing its raw findings as the
dashboard's *current open backlog* is wrong the moment any of them is fixed after
the report was written. On 2026-08-21 the bimpossible card published a 2026-08-17
report verbatim (77 open) when many of those findings were already closed in code —
the owner rightly read it as "you're showing me stuff I already resolved."

This module makes that failure structurally impossible. Between "raw findings
extracted from the report" and "open list rendered to data.js", every ingest MUST
run reconcile(): it inspects the project's declared repositories for merged fixes
made AFTER the report timestamp, and classifies each finding OPEN / RESOLVED /
UNKNOWN. Only OPEN (and, conservatively, UNKNOWN) findings are published; RESOLVED
findings drop to the history/evidence record. Exact commit/PR evidence is local-only.

Closure evidence contract (why a bare ID mention is not enough)
---------------------------------------------------------------
The first cut counted any commit that cited a finding-ID and said "fixed/resolved".
That over-closed: the audit's OWN bookkeeping commits (docs(audit) resolution logs,
chore(hygiene) audit records, verification checklists) cite every finding ID next
to the word "closed" — they are the audit talking about itself, not proof the code
landed. A finding is classified RESOLVED only when ALL of these hold for at least
one commit after the report timestamp, in one of the finding's declared repos:

  1. commit date is after the audit report timestamp   (git --since)
  2. the commit text contains the finding's EXACT id    (FINDING_ID_RE, no prefix/
                                                          title matching)
  3. the commit text expresses resolution intent        (RESOLUTION_CUE_RE)
  4. the commit is NOT audit/report/checklist/history/ledger/bookkeeping work
     (classify_commit(): structured — subject type + changed-file categories)
  5. the commit changes at least one IMPLEMENTATION-relevant file in that repo
     (classify_path(): a code/config file, not a doc/audit/ledger/generated one)

A finding whose `scope` metadata explicitly declares it documentation/process
scoped may instead close through a DOCUMENTATION change (any non-audit-artifact
doc file) — but still never through a pure audit-bookkeeping commit. Every
insufficient-evidence citation is retained OPEN (never RESOLVED) and its reason is
recorded in the LOCAL-ONLY evidence file (`rejectedEvidence`).

Fail-closed contract
--------------------
If reconciliation cannot run — no repo declared, or NO declared repo is
git-inspectable — reconcile() returns ingestStatus="failed" and the caller MUST NOT
overwrite the existing audit block. If SOME declared repos are inspectable and some
are not, status is "partial": findings not proven RESOLVED in an inspected repo are
held as UNKNOWN (retained in the public open list) — a fix might live in the repo we
could not read. Insufficient closure evidence never downgrades a finding to
RESOLVED; it stays OPEN (ownership known) or UNKNOWN (a declared repo was unreadable).

This is a library + thin CLI. It reuses the splice/serialize machinery in
sync_dashboard.py; it never freehand-edits data.js.

CLI:
    python reconcile_audit.py --project bimpossible \
        --report "<path to dated report>" \
        --findings raw-findings.json          # [{id,sev,title,where[,scope]}, ...]
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
# local/ is gitignored — exact per-finding fix evidence (commit SHAs, PRs) and the
# rejected-evidence log live here and are NEVER published to the public data.js.
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
# Structured non-implementation (bookkeeping) classifier.
#
# Two independent signals decide whether a commit is closure-EVIDENCE or merely
# the audit describing itself: (a) the commit SUBJECT/type, and (b) the categories
# of the FILES it changed. Neither hardcodes a specific commit hash, PR number, or
# observed subject — they are general rules over conventional-commit types and path
# shape, so a future audit-bookkeeping commit is caught the same way.
# --------------------------------------------------------------------------- #

# (a) Subject-level: conventional-commit types/scopes and phrases that mark a
# commit as audit/report/bookkeeping work rather than a code change. A commit whose
# SUBJECT matches this is never closure evidence (for any finding), even if it
# happens to touch a source file in passing.
BOOKKEEPING_SUBJECT_RE = re.compile(
    r"^\s*(?:docs|chore)\s*\(\s*"
    r"(?:audit|audits|audit-runs|hygiene|hyg|reconcile|reconciliation|"
    r"ledger|history|changelog|closeout|verification)\s*\)"
    r"|resolution[ _-]?log"
    r"|audit[ _-]?(?:report|record|run|runs|log|block|closeout|matrix)"
    r"|verification[ _-]?checklist"
    r"|reconcile[ _-]?audit"
    r"|breach[ _-]?chains?"
    r"|history[ _-]?only",
    re.IGNORECASE,
)

# (b) Path-level. Implementation is a POSITIVE allowlist of source/config
# extensions (plus a few code basenames): only these prove a code fix landed.
# Everything unrecognized defaults to a NON-implementation category, because on a
# security board the safe error is to leave a finding OPEN, never to mark it
# RESOLVED on an ambiguous file.
_CODE_EXTS = {
    ".py", ".pyi", ".ipynb",
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".cs", ".fs", ".vb",
    ".sql", ".go", ".rs", ".java", ".kt", ".kts", ".rb", ".php",
    ".c", ".cc", ".cpp", ".cxx", ".h", ".hh", ".hpp",
    ".css", ".scss", ".sass", ".less", ".vue", ".svelte", ".html", ".htm",
    ".sh", ".bash", ".zsh", ".ps1", ".psm1", ".psd1", ".bat",
    ".yaml", ".yml", ".toml", ".ini", ".cfg", ".conf", ".env",
    ".xml", ".csproj", ".props", ".targets", ".sln", ".gradle", ".tf",
}
_CODE_BASENAMES = {
    "dockerfile", "makefile", "package.json", "package-lock.json",
    "pnpm-lock.yaml", "yarn.lock", "tsconfig.json", "pyproject.toml",
    "requirements.txt", "setup.py", "setup.cfg", "appsettings.json",
    "web.config", "go.mod", "go.sum", "cargo.toml", "cargo.lock",
}
_DOC_EXTS = {".md", ".markdown", ".rst", ".txt", ".adoc"}

# Audit-artifact / ledger / generated markers: files that describe or record the
# audit, or are machine-generated dashboard artifacts. Touching ONLY these is never
# proof a fix landed, for ANY finding — including a documentation-scoped one.
_AUDIT_KW = (
    "audit", "resolution-log", "resolution_log", "audit-resolution",
    "verification-checklist", "verification_checklist",
    "breach-chain", "breach_chain", "_audit-runs", "audit-runs",
)
_LEDGER_KW = ("ledger", "phase-status", "wave-status", "changelog", "history")
_GENERATED_BASENAMES = {"data.js", "audit-freshness.js"}


def classify_path(path: str) -> str:
    """Classify a changed file as 'impl', 'doc', or 'audit'.

      impl  - source/config: proof a code fix could have landed here.
      doc   - general documentation (a doc-scoped finding may close through this).
      audit - audit record / resolution log / verification checklist / ledger /
              history / generated dashboard artifact: never closure evidence.

    Unknown/data extensions (.json data, .csv, ...) fall through to 'doc' rather
    than 'impl': the conservative direction on a security board."""
    p = path.replace("\\", "/").strip().lower()
    if not p:                       # merge commit / empty entry
        return "audit"
    base = p.rsplit("/", 1)[-1]
    dot = base.rfind(".")
    ext = base[dot:] if dot > 0 else ""

    if base in _GENERATED_BASENAMES:
        return "audit"
    is_code = base in _CODE_BASENAMES or ext in _CODE_EXTS
    # Audit / ledger / history keywords only mark a NON-code file as a bookkeeping
    # artifact; a source file that happens to implement an audit or history feature
    # (e.g. history_service.py) stays 'impl'.
    if not is_code and any(k in p for k in _LEDGER_KW):
        return "audit"
    if not is_code and any(k in p for k in _AUDIT_KW):
        return "audit"
    if is_code:
        return "impl"
    if ext in _DOC_EXTS or "/docs/" in "/" + p:
        return "doc"
    return "doc"


def classify_commit(subject: str, files: list[str]) -> dict:
    """Structured evidence about one commit, independent of any finding:

      bookkeeping    : subject is an audit/report/bookkeeping type/phrase.
      hasImpl        : changed >=1 implementation-relevant file.
      hasDoc         : changed >=1 general documentation file.
      auditOnly      : every changed file is an audit/ledger/generated artifact.
      categories     : sorted unique {'impl','doc','audit'} present.

    Used by reconcile() to decide, per finding scope, whether the commit is real
    closure evidence."""
    cats = [classify_path(f) for f in files]
    catset = set(cats)
    return {
        "bookkeeping": bool(BOOKKEEPING_SUBJECT_RE.search(subject or "")),
        "hasImpl": "impl" in catset,
        "hasDoc": "doc" in catset,
        "auditOnly": bool(cats) and catset == {"audit"},
        "categories": sorted(catset),
    }


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
BIM_REPO = Path(os.environ.get("BIMPOSSIBLE_REPO", r"F:\BIMpossible"))
WS_REPO = Path(os.environ.get("BIMPOSSIBLE_WORKSPACE", r"F:\BIMpossible-Workspace"))
ADDINS_REPO = Path(os.environ.get("BIMPOSSIBLE_ADDINS_REPO", r"F:\BIMpossible-AddIns"))

PROJECT_RECON_REPOS: dict[str, list[Path]] = {
    "bimpossible": [BIM_REPO, WS_REPO],
    "addins":      [ADDINS_REPO],
}

# Finding `scope` values that permit closure through a documentation change.
DOC_SCOPES = {"documentation", "docs", "doc", "process", "process-doc"}


class ReconcileError(Exception):
    """Raised for an unrecoverable input problem (unparseable report, bad findings)."""


def _is_doc_scoped(finding: dict) -> bool:
    """A finding may close through documentation ONLY when its metadata explicitly
    declares it doc/process scoped — never inferred from severity or title."""
    scope = str(finding.get("scope", "")).strip().lower()
    return finding.get("docScoped") is True or scope in DOC_SCOPES


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
# Git driver: which finding-IDs are cited as fixed after the report, and where,
# WITH the structured commit evidence needed to reject bookkeeping-only closures.
# --------------------------------------------------------------------------- #
def _changed_files(repo: Path, shas: list[str]) -> dict[str, list[str]]:
    """Map each sha -> its changed file paths (repo-relative, forward-slash) via a
    single `git show`. Merge commits list no files by default -> empty list, which
    classify_commit treats as no implementation evidence (fail-safe)."""
    if not shas:
        return {}
    try:
        out = subprocess.run(
            ["git", "-C", str(repo), "show", "--name-only", "--format=%x1e%H", *shas],
            capture_output=True, encoding="utf-8", check=True,
        ).stdout
    except (subprocess.CalledProcessError, FileNotFoundError, UnicodeDecodeError):
        return {}
    files_by_sha: dict[str, list[str]] = {}
    for chunk in out.split("\x1e"):
        lines = [ln for ln in chunk.splitlines() if ln.strip()]
        if not lines:
            continue
        files_by_sha[lines[0].strip()] = lines[1:]
    return files_by_sha


def git_cited_findings(repo: Path, since_date: str):
    """Scan `repo`'s commits from `since_date` (inclusive) through HEAD and return
    (citations, head_sha, ok):

      citations : {finding_id -> [ evidence, ... ]}, where each evidence is
                  {repo, sha, date, subject, files, bookkeeping, hasImpl, hasDoc,
                   auditOnly, categories}
      head_sha  : the HEAD sha the scan reconciled against (str) or None
      ok        : False if the repo is missing / git is unreachable / the log could
                  not be read — the caller treats a non-ok repo as "un-inspectable"
                  and fails closed / degrades to UNKNOWN.

    Matching is by EXACT finding-ID token only (FINDING_ID_RE over subject+body) and
    only commits expressing resolution intent (RESOLUTION_CUE_RE) become candidates.
    The changed-file set is attached so reconcile() can require an implementation
    file and reject audit-bookkeeping commits — this driver does NOT itself decide
    closure, it supplies structured evidence."""
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

    # Pass 1: candidate commits (cite >=1 id AND express resolution intent).
    candidates: dict[str, dict] = {}   # full_sha -> {date, subject, ids}
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
        if not RESOLUTION_CUE_RE.search(text):
            continue
        candidates[sha] = {"date": date_iso[:10], "subject": subject.strip(), "ids": ids}

    # Pass 2: attach changed files + structured classification to each candidate.
    files_by_sha = _changed_files(repo, list(candidates))
    citations: dict[str, list[dict]] = {}
    for sha, meta in candidates.items():
        files = files_by_sha.get(sha, [])
        cls = classify_commit(meta["subject"], files)
        evidence = {
            "repo": repo.name,
            "sha": sha[:10],
            "date": meta["date"],
            "subject": meta["subject"],
            "files": files,
            "bookkeeping": cls["bookkeeping"],
            "hasImpl": cls["hasImpl"],
            "hasDoc": cls["hasDoc"],
            "auditOnly": cls["auditOnly"],
            "categories": cls["categories"],
        }
        for fid in meta["ids"]:
            citations.setdefault(fid, []).append(evidence)
    return citations, head, True


# --------------------------------------------------------------------------- #
# Closure decision: does a single citation actually close this finding?
# --------------------------------------------------------------------------- #
def closure_reason(finding: dict, ev: dict) -> str | None:
    """Return None if `ev` is valid closure evidence for `finding`; otherwise a
    short kebab reason it was REJECTED (recorded local-only). Encodes evidence
    conditions 4 & 5 (conditions 1-3 are already enforced by the git driver:
    date window, exact id, resolution cue)."""
    if ev.get("bookkeeping"):
        return "audit-bookkeeping-subject"
    if ev.get("auditOnly"):
        return "audit-artifact-only-files"
    if _is_doc_scoped(finding):
        # A doc/process-scoped finding may close through any non-audit file
        # (documentation or implementation), but not through a pure audit artifact.
        if ev.get("hasDoc") or ev.get("hasImpl"):
            return None
        return "no-doc-or-impl-file-change"
    # Default (code/security/reliability finding): require an implementation file.
    if ev.get("hasImpl"):
        return None
    return "no-implementation-file-change"


# --------------------------------------------------------------------------- #
# The reconciliation itself
# --------------------------------------------------------------------------- #
def _counts(findings) -> dict:
    c = Counter(f.get("sev", "").lower() for f in findings)
    return {s: c.get(s, 0) for s in SEVERITIES}


class ReconcileResult:
    def __init__(self, *, project, report_date, reconciled_at, heads, raw,
                 open_findings, unknown_findings, resolved_findings,
                 evidence, rejected, status, detail):
        self.project = project
        self.report_date = report_date
        self.reconciled_at = reconciled_at
        self.heads = heads                      # [{repo, head, inspected}]
        self.raw = raw
        self.open = open_findings
        self.unknown = unknown_findings
        self.resolved = resolved_findings
        self.evidence = evidence                # id -> [accepted commit dicts]  (LOCAL)
        self.rejected = rejected                # id -> [{...ev, rejectReason}]  (LOCAL)
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
          openCounts      - strictly-OPEN (no valid closure, ownership known)
          unknownCounts   - retained-but-unproven (a declared repo was unreadable)
          resolvedCounts  - closed by valid, implementation-backed closure evidence
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
        d["rejectedIds"] = sorted(self.rejected)
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
            # Insufficient-evidence citations that did NOT close a finding, with the
            # reason each was rejected (e.g. audit-bookkeeping-subject). Local-only.
            "rejectedEvidence": self.rejected,
        }


def reconcile(project: str, raw_findings: list, report_date_str: str,
              repos=None, *, git_driver=git_cited_findings,
              now: str | None = None) -> ReconcileResult:
    """Classify each raw finding OPEN / RESOLVED / UNKNOWN against merged fixes made
    after `report_date_str` in the project's declared repos.

    - RESOLVED : a commit after the report cites the finding's EXACT id, expresses
                 resolution intent, is NOT audit/bookkeeping work, and changes an
                 implementation file (or, for a doc-scoped finding, a documentation
                 file) in an INSPECTED repo.
    - OPEN     : no VALID closure evidence, and every declared repo was inspected OK
                 (ownership known). A finding cited only by bookkeeping/insufficient
                 commits stays OPEN — the rejection reason is recorded local-only.
    - UNKNOWN  : no valid closure, but at least one declared repo could not be
                 inspected — a fix might live there, so it is conservatively retained.

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
            resolved_findings=[], evidence={}, rejected={}, status="failed", detail=detail,
        )

    open_f, unknown_f, resolved_f = [], [], []
    evidence: dict[str, list[dict]] = {}
    rejected: dict[str, list[dict]] = {}
    have_failed = bool(failed_repos)
    for f in raw_findings:
        fid = f["id"]
        evs = cited.get(fid, [])
        accepted, rej = [], []
        for ev in evs:
            reason = closure_reason(f, ev)
            if reason is None:
                accepted.append(ev)
            else:
                rej.append({**ev, "rejectReason": reason})
        if rej:
            rejected[fid] = rej
        if accepted:
            resolved_f.append(f)
            evidence[fid] = accepted
        elif have_failed:
            # No VALID closure here, but a declared repo was unreadable: the real
            # fix might be there -> retain conservatively as UNKNOWN, never RESOLVED.
            unknown_f.append(f)
        else:
            # Ownership known, no valid closure (bookkeeping-only citations included)
            # -> stays OPEN.
            open_f.append(f)

    n_rejected = sum(len(v) for v in rejected.values())
    if have_failed:
        status = "partial"
        detail = (f"reconciled against {', '.join(h['repo'] for h in heads if h['inspected'])}; "
                  f"{len(failed_repos)} repo(s) un-inspectable ({', '.join(failed_repos)}) — "
                  f"{len(resolved_f)} resolved, {len(unknown_f)} held UNKNOWN, "
                  f"{n_rejected} insufficient-evidence citation(s) rejected")
    else:
        status = "success"
        detail = (f"reconciled against {', '.join(h['repo'] for h in heads)}; "
                  f"{len(resolved_f)} of {len(raw_findings)} closed by implementation-backed "
                  f"finding-ID evidence, {len(open_f)} open "
                  f"({n_rejected} insufficient-evidence citation(s) rejected)")

    return ReconcileResult(
        project=project, report_date=report_date_str, reconciled_at=reconciled_at,
        heads=heads, raw=raw_findings, open_findings=open_f,
        unknown_findings=unknown_f, resolved_findings=resolved_f,
        evidence=evidence, rejected=rejected, status=status, detail=detail,
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
                    help="JSON file: [{id, sev, title, where[, scope]}, ...] raw findings")
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
