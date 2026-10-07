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
  6. the commit is REACHABLE FROM THE REPO'S CANONICAL REF (see below) — never
     merely from whatever branch happens to be checked out (HEAD)

Canonical-ref attribution (review F-1)
--------------------------------------
"Resolved" means verified closed ON THE CANONICAL BRANCH. Attribution therefore scans
commits reachable from the repo's canonical ref and NEVER from HEAD, so the result is
identical whichever branch (or detached commit) is checked out. The canonical ref is
resolved by resolve_canonical_ref(), first match wins:

  1. explicit override     reconcile(canonical_ref=...) / CLI --canonical-ref
                           (a string for every repo, or {repo-name: ref})
  2. documented policy     CANONICAL_REF_POLICY[repo-dir-name] — used for remote-less
                           repos whose canonical branch is a documented LOCAL branch
  3. the remote's default  refs/remotes/<remote>/HEAD (origin, else the only remote);
                           read offline from the local ref — `git remote set-head
                           <remote> -a` refreshes it. NOT every repo is origin/main
                           (Claude-Profile / Evidence Compiler / Local Intel are master).
  4. otherwise UNVERIFIED  -> the repo is un-inspectable (fail-closed contract below),
                           findings are never counted resolved; HEAD is never a fallback.
                           A bad explicit override raises ReconcileError instead.

A finding whose valid closure evidence (same rules 1-5 above) exists ONLY on other
local/remote branches — reachable from refs but not from the canonical ref — is
"implemented, awaiting integration": reported in awaitingIntegrationCounts, counted
neither OPEN nor RESOLVED, never in closedLastRun (docs/COVERAGE-AND-DISCLOSURE-POLICY.md
section 1). Every finding lands in exactly one of open / awaiting / resolved / unknown,
so rawCounts = openCounts + awaitingIntegrationCounts + resolvedCounts + unknownCounts;
reconcile() asserts it. Integration evidence is only what the commit text cites: a
squash/rebase commit on the canonical ref that cites the finding IDs closes them; one
that carries only a PR number leaves the finding awaiting (a PR ref is never guessed
into closure). The canonical ref name + SHA used are recorded in ingestDetail, in
reconciliationHeads[].head (the canonical SHA) and in the local-only evidence file.

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
A repo whose canonical ref cannot be resolved is un-inspectable in exactly this sense.

Baseline protection: write_back() refuses (ReconcileError) to let a report OLDER than
the audit block's recorded run, or a same-day report with FEWER raw/awaiting findings
than the recorded consolidated baseline, silently supersede it. Pass
replace_baseline=True / CLI --replace-baseline to override deliberately.

This is a library + thin CLI. It reuses the splice/serialize machinery in
sync_dashboard.py; it never freehand-edits data.js.

CLI:
    python reconcile_audit.py --project bimpossible \
        --report "<path to dated report>" \
        --findings raw-findings.json          # [{id,sev,title,where[,scope]}, ...]
        [--canonical-ref REF | --canonical-ref REPO=REF ...]   # override resolution
        [--write]                              # patch data.js only if status != failed
        [--replace-baseline]                   # allow an older/smaller report to replace
                                               # the recorded baseline (default: refuse)

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
from typing import NamedTuple

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

# Documented per-repo canonical ref, keyed by lower-cased repo DIRECTORY name. Only for
# repos that cannot be resolved from a remote: a remote-less repo's canonical branch is
# its documented LOCAL default branch (docs/COVERAGE-AND-DISCLOSURE-POLICY.md section 1;
# AI-Brain-Data's card records "master (local-only, no remote)"). A remote-less repo not
# listed here (and given no override) is UNVERIFIED, never "whatever is checked out".
# Values are branch names or remote-tracking names ("origin/release"). Verified
# read-only 2026-10-06: F:\AI-Brain-Data and F:\Revit-Ops have no remote and `master`.
CANONICAL_REF_POLICY: dict[str, str] = {
    "ai-brain-data": "master",
    "revit-ops": "master",
}

# Finding `scope` values that permit closure through a documentation change.
DOC_SCOPES = {"documentation", "docs", "doc", "process", "process-doc"}


class ReconcileError(Exception):
    """Raised for an unrecoverable input problem (unparseable report, bad findings)."""


class CanonicalRefError(ReconcileError):
    """The repo's canonical ref could not be established. `explicit` is True when the
    caller NAMED the ref (override/policy) and it is unusable — a caller error that
    propagates; otherwise the repo is merely UNVERIFIED (un-inspectable, fail closed)."""

    def __init__(self, message: str, *, explicit: bool = False):
        super().__init__(message)
        self.explicit = explicit


class CanonicalRef(NamedTuple):
    name: str     # as recorded as evidence, e.g. "origin/main" or "master"
    ref: str      # full refname, e.g. "refs/remotes/origin/main"
    sha: str      # full commit sha the ref pointed at when resolved
    source: str   # override | policy | origin/HEAD | <remote>/HEAD


# HEAD-like names are checkout-dependent: refusing them is what keeps attribution from
# ever falling back to the checked-out branch, even by explicit request.
_HEAD_LIKE_RE = re.compile(r"^(?:HEAD|@|FETCH_HEAD|ORIG_HEAD|MERGE_HEAD)(?:[~^@{].*)?$",
                           re.IGNORECASE)


def _git(repo: Path, *args: str) -> str | None:
    """stdout (stripped) of a read-only git command, or None if it failed."""
    try:
        proc = subprocess.run(["git", "-C", str(repo), *args], capture_output=True,
                              encoding="utf-8", check=True)
    except (subprocess.CalledProcessError, FileNotFoundError, UnicodeDecodeError):
        return None
    return proc.stdout.strip()


def _resolve_named_ref(repo: Path, name: str, source: str) -> CanonicalRef:
    """Resolve a branch-ish `name` to an existing commit, preferring the
    remote-tracking ref (`origin/main`) over a local branch of that spelling. Raises an
    explicit CanonicalRefError — never substitutes another ref."""
    name = name.strip()
    if not name or _HEAD_LIKE_RE.match(name):
        raise CanonicalRefError(
            f"{repo.name}: canonical ref {name!r} ({source}) is not a named branch — HEAD-like "
            f"refs depend on the checkout and are never accepted", explicit=True)
    candidates = [name] if name.startswith("refs/") else [f"refs/remotes/{name}", f"refs/heads/{name}"]
    for full in candidates:
        sha = _git(repo, "rev-parse", "--verify", "--quiet", f"{full}^{{commit}}")
        if sha:
            return CanonicalRef(name, full, sha, source)
    raise CanonicalRefError(
        f"{repo.name}: canonical ref {name!r} ({source}) does not exist in this repository",
        explicit=True)


def resolve_canonical_ref(repo: Path, override: str | None = None) -> CanonicalRef:
    """The ref attribution must inspect for `repo` — never HEAD. Precedence:
    explicit `override`, CANONICAL_REF_POLICY[repo dir name], then the remote's default
    branch (refs/remotes/origin/HEAD, or the sole remote's HEAD). Anything else raises
    CanonicalRefError(explicit=False): the repo is UNVERIFIED and findings are not
    counted resolved. Reads only local refs (no network)."""
    repo = Path(repo)
    if override:
        return _resolve_named_ref(repo, override, "override")
    policy = CANONICAL_REF_POLICY.get(repo.name.lower())
    if policy:
        return _resolve_named_ref(repo, policy, "policy")

    remotes_out = _git(repo, "remote")
    if remotes_out is None:
        raise CanonicalRefError(f"{repo.name}: not a readable git repository")
    remotes = [r for r in remotes_out.splitlines() if r.strip()]
    if not remotes:
        raise CanonicalRefError(
            f"{repo.name}: no remote and no documented local canonical branch — canonical ref "
            f"unverified; add the repo to CANONICAL_REF_POLICY or pass --canonical-ref")
    if "origin" in remotes:
        remote = "origin"
    elif len(remotes) == 1:
        remote = remotes[0]
    else:
        raise CanonicalRefError(
            f"{repo.name}: {len(remotes)} remotes ({', '.join(sorted(remotes))}) and no 'origin' "
            f"— canonical ref ambiguous; pass --canonical-ref")
    head_ref = f"refs/remotes/{remote}/HEAD"
    target = _git(repo, "symbolic-ref", "--quiet", head_ref)
    sha = _git(repo, "rev-parse", "--verify", "--quiet", f"{target}^{{commit}}") if target else None
    if not target or not sha:
        raise CanonicalRefError(
            f"{repo.name}: {remote}/HEAD is not set or does not resolve — canonical ref "
            f"unverified; run `git remote set-head {remote} -a` or pass --canonical-ref")
    prefix = "refs/remotes/"
    name = target[len(prefix):] if target.startswith(prefix) else target
    return CanonicalRef(name, target, sha, f"{remote}/HEAD")


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
# Attribution is from the CANONICAL ref (resolve_canonical_ref), never from HEAD.
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


_LOG_FORMAT = "--format=%H%x1f%cI%x1f%s%x1f%b%x1e"


def _candidate_commits(repo: Path, since_date: str, rev_args: list[str]) -> dict[str, dict]:
    """Pass 1 over `git log <rev_args>`: commits that cite >=1 finding id AND express
    resolution intent -> {full_sha: {date, subject, ids}}. Raises CalledProcessError /
    FileNotFoundError / UnicodeDecodeError if the log cannot be read."""
    out = subprocess.run(
        ["git", "-C", str(repo), "log", f"--since={since_date}T00:00:00", _LOG_FORMAT, *rev_args],
        capture_output=True, encoding="utf-8", check=True,
    ).stdout
    candidates: dict[str, dict] = {}
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
    return candidates


def _citations_with_evidence(repo: Path, candidates: dict[str, dict],
                             *, with_refs: bool = False) -> dict[str, list[dict]]:
    """Pass 2: attach changed files + structured classification to each candidate and
    index by finding id. `with_refs` also records which local/remote branches carry the
    commit (non-canonical evidence only; local-only, explains WHERE the fix lives)."""
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
        if with_refs:
            refs_out = _git(repo, "for-each-ref", "--contains", sha,
                            "--format=%(refname:short)", "refs/heads", "refs/remotes") or ""
            evidence["refs"] = sorted(r for r in refs_out.splitlines() if r.strip())[:8]
        for fid in meta["ids"]:
            citations.setdefault(fid, []).append(evidence)
    return citations


def git_cited_findings(repo: Path, since_date: str, canonical_ref: str | None = None):
    """Scan `repo` from `since_date` (inclusive) and return
    (citations, canonical_sha, ok, info):

      citations     : {finding_id -> [ evidence, ... ]} for commits REACHABLE FROM THE
                      CANONICAL REF (never HEAD); each evidence is
                      {repo, sha, date, subject, files, bookkeeping, hasImpl, hasDoc,
                       auditOnly, categories}
      canonical_sha : the canonical ref's commit sha the scan reconciled against, or None
      ok            : False if the canonical ref is unresolvable (UNVERIFIED), the repo is
                      missing / git is unreachable / the log could not be read — the
                      caller treats a non-ok repo as "un-inspectable" and fails closed /
                      degrades to UNKNOWN. HEAD is never used as a fallback.
      info          : {ref, sha, source, awaiting, error}. `awaiting` is the same
                      {finding_id -> [evidence+refs]} shape for commits reachable from
                      other local/remote branches but NOT from the canonical ref
                      ("implemented, awaiting integration"); `error` is a path-free
                      diagnostic when ok is False.

    `canonical_ref` is the explicit override (see resolve_canonical_ref for the full
    precedence). A bad EXPLICIT override/policy raises CanonicalRefError.

    Matching is by EXACT finding-ID token only (FINDING_ID_RE over subject+body) and
    only commits expressing resolution intent (RESOLUTION_CUE_RE) become candidates.
    The changed-file set is attached so reconcile() can require an implementation
    file and reject audit-bookkeeping commits — this driver does NOT itself decide
    closure, it supplies structured evidence."""
    repo = Path(repo)
    if not (repo / ".git").exists() and not repo.is_dir():
        return {}, None, False, {"error": f"{repo.name}: repository not found"}
    try:
        canon = resolve_canonical_ref(repo, canonical_ref)
    except CanonicalRefError as exc:
        if exc.explicit:
            raise
        return {}, None, False, {"error": str(exc)}
    try:
        # Commits reachable from the canonical SHA only: independent of HEAD.
        canonical_cands = _candidate_commits(repo, since_date, [canon.sha])
        # Commits reachable from any other local/remote branch but NOT from canonical.
        # (--branches/--remotes, not --all/HEAD: detached or stashed work is not a fix
        # "implemented on a branch", and it keeps the result checkout-independent.)
        awaiting_cands = _candidate_commits(
            repo, since_date, ["--branches", "--remotes", "--not", canon.sha])
    except (subprocess.CalledProcessError, FileNotFoundError, UnicodeDecodeError):
        return {}, None, False, {"error": f"{repo.name}: git log failed against {canon.name}"}

    citations = _citations_with_evidence(repo, canonical_cands)
    awaiting = _citations_with_evidence(repo, awaiting_cands, with_refs=True)
    info = {"ref": canon.name, "sha": canon.sha, "source": canon.source,
            "awaiting": awaiting, "error": None}
    return citations, canon.sha, True, info


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
                 evidence, rejected, status, detail,
                 awaiting_findings=None, awaiting_evidence=None, canonical=None):
        self.project = project
        self.report_date = report_date
        self.reconciled_at = reconciled_at
        self.heads = heads                      # [{repo, head, inspected}]
        self.raw = raw
        self.open = open_findings
        self.unknown = unknown_findings
        self.resolved = resolved_findings
        # implemented, awaiting integration: valid fix evidence only on non-canonical refs
        self.awaiting = awaiting_findings if awaiting_findings is not None else []
        self.evidence = evidence                # id -> [accepted commit dicts]  (LOCAL)
        self.awaiting_evidence = awaiting_evidence or {}   # id -> [non-canonical commits] (LOCAL)
        self.canonical = canonical or []        # [{repo, ref, sha, source}] evidence (LOCAL)
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
          resolvedCounts  - findings verified CLOSED ON THE REPO'S CANONICAL BRANCH by
                            valid, implementation-backed closure evidence. A fix that
                            exists only on a feature/unmerged branch is NOT resolved.
          awaitingIntegrationCounts
                          - findings whose valid fix evidence exists only on a
                            non-canonical branch (reachable from other refs, not from
                            the canonical ref), awaiting merge. They are counted in
                            neither openCounts nor resolvedCounts nor closedLastRun.
                            The partition (asserted, see assert_partition) is:
                            rawCounts = openCounts + awaitingIntegrationCounts
                                        + resolvedCounts + unknownCounts
          publishedCounts - openCounts + unknownCounts (everything still shown).
                            The ONLY combined number, and it is NOT called 'open'.
          counts          - alias of openCounts, kept so the existing severity badge
                            (sum(counts) == len(open)) stays honest: strictly-open.
        List contract: `open` is strictly-OPEN; `unknown` is its own labeled list."""
        self.assert_partition()
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
            "awaitingIntegrationCounts": _counts(self.awaiting),
            "publishedCounts": published_counts,
            "ingestStatus": self.status,
            "ingestDetail": self.detail,
            "counts": open_counts,              # existing badge == strictly-open only
            "closedLastRun": len(self.resolved),
            "open": self.open,                  # strictly-open; never mixed with UNKNOWN
            "unknown": self.unknown,            # retained + labeled, counted separately
        }

    def assert_partition(self) -> None:
        """Every raw finding is in exactly one of open / awaiting / resolved / unknown, so
        rawCounts = openCounts + awaitingIntegrationCounts + resolvedCounts + unknownCounts.
        Raises ReconcileError on a violation. A failed result classifies nothing (and its
        audit block is never written), so it is exempt."""
        if self.status == "failed":
            return
        buckets = {"open": self.open, "awaiting": self.awaiting,
                   "resolved": self.resolved, "unknown": self.unknown}
        total = sum(len(v) for v in buckets.values())
        summed = {s: sum(_counts(v)[s] for v in buckets.values()) for s in SEVERITIES}
        if total != len(self.raw) or summed != _counts(self.raw):
            raise ReconcileError(
                "rawCounts partition violated: raw=" + str(len(self.raw)) + " but "
                + ", ".join(f"{k}={len(v)}" for k, v in buckets.items())
                + " (every finding must be in exactly one bucket)")

    def to_dict(self) -> dict:
        d = self.audit_fields()
        d["project"] = self.project
        d["resolvedIds"] = sorted(f["id"] for f in self.resolved)
        d["awaitingIds"] = sorted(f["id"] for f in self.awaiting)
        d["unknownIds"] = sorted(f["id"] for f in self.unknown)
        d["rejectedIds"] = sorted(self.rejected)
        return d

    def evidence_payload(self) -> dict:
        return {
            "project": self.project,
            "reportDate": self.report_date,
            "reconciledAt": self.reconciled_at,
            "reconciliationHeads": self.heads,
            # The canonical ref name + commit each repo was attributed against (F-1).
            "canonicalRefs": self.canonical,
            "ingestStatus": self.status,
            "resolved": {
                f["id"]: self.evidence.get(f["id"], []) for f in self.resolved
            },
            # Valid fix evidence found ONLY on non-canonical refs ("awaiting integration").
            "awaitingIntegration": {
                f["id"]: self.awaiting_evidence.get(f["id"], []) for f in self.awaiting
            },
            # Insufficient-evidence citations that did NOT close a finding, with the
            # reason each was rejected (e.g. audit-bookkeeping-subject). Local-only.
            "rejectedEvidence": self.rejected,
        }


def _override_for(canonical_ref, repo: Path) -> str | None:
    """The explicit canonical-ref override for `repo`: a plain string applies to every
    repo; a mapping is keyed by repo directory name (case-insensitive)."""
    if canonical_ref is None:
        return None
    if isinstance(canonical_ref, str):
        return canonical_ref or None
    lowered = {str(k).lower(): v for k, v in canonical_ref.items()}
    return lowered.get(repo.name.lower())


def reconcile(project: str, raw_findings: list, report_date_str: str,
              repos=None, *, git_driver=None, now: str | None = None,
              canonical_ref=None) -> ReconcileResult:
    """Classify each raw finding OPEN / AWAITING / RESOLVED / UNKNOWN against fixes made
    after `report_date_str` in the project's declared repos.

    - RESOLVED : a commit REACHABLE FROM THE CANONICAL REF after the report cites the
                 finding's EXACT id, expresses resolution intent, is NOT audit/
                 bookkeeping work, and changes an implementation file (or, for a
                 doc-scoped finding, a documentation file) in an INSPECTED repo.
    - AWAITING : the same evidence exists, but ONLY on non-canonical refs ("implemented,
                 awaiting integration"). Not open, not resolved, not in closedLastRun.
    - OPEN     : no VALID closure evidence anywhere, and every declared repo was
                 inspected OK (ownership known). A finding cited only by bookkeeping/
                 insufficient commits stays OPEN - the rejection reason is recorded
                 local-only.
    - UNKNOWN  : no valid closure, but at least one declared repo could not be
                 inspected (including: its canonical ref is unresolvable) - a fix
                 might live there, so it is conservatively retained.

    ingestStatus:
    - failed  : no repo declared, or NO declared repo was inspectable -> the caller
                MUST NOT overwrite the existing audit block (fail closed).
    - partial : some declared repos inspected, some not (UNKNOWNs present).
    - success : every declared repo inspected OK.

    `canonical_ref` overrides canonical-ref resolution (str for all repos, or
    {repo-dir-name: ref}); see resolve_canonical_ref. A bad override raises
    ReconcileError. HEAD is never consulted.

    `git_driver(repo, since_date) -> (citations, head, ok[, info])` is injectable for
    tests; `info` (optional) may carry {ref, sha, source, awaiting, error}. A custom
    driver owns canonical-ref resolution, so `canonical_ref` is ignored for it.
    """
    if repos is None:
        repos = PROJECT_RECON_REPOS.get(project, [])
    reconciled_at = now or datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for f in raw_findings:
        if "id" not in f or "sev" not in f:
            raise ReconcileError(f"raw finding missing id/sev: {f!r}")

    def default_driver(repo, since_date):
        return git_cited_findings(repo, since_date,
                                  canonical_ref=_override_for(canonical_ref, repo))
    driver = git_driver or default_driver

    cited: dict[str, list[dict]] = {}
    awaiting_cited: dict[str, list[dict]] = {}
    heads: list[dict] = []
    canonical: list[dict] = []
    inspected_any = False
    failed_repos: list[str] = []
    failure_notes: list[str] = []
    for repo in repos:
        repo = Path(repo)
        scan = driver(repo, report_date_str)
        citations, head, ok = scan[0], scan[1], scan[2]
        info = scan[3] if len(scan) > 3 and scan[3] else {}
        heads.append({"repo": repo.name, "head": (head or "")[:10], "inspected": ok})
        if ok:
            inspected_any = True
            for fid, evs in citations.items():
                cited.setdefault(fid, []).extend(evs)
            for fid, evs in (info.get("awaiting") or {}).items():
                awaiting_cited.setdefault(fid, []).extend(evs)
            if info.get("ref"):
                canonical.append({"repo": repo.name, "ref": info["ref"],
                                  "sha": info.get("sha") or head,
                                  "source": info.get("source")})
        else:
            failed_repos.append(repo.name)
            if info.get("error"):
                failure_notes.append(info["error"])

    def scanned_label(items) -> str:
        """`repo@ref (sha10)` when the driver reported the canonical ref, else `repo`."""
        by_repo = {c["repo"]: c for c in canonical}
        out = []
        for h in items:
            c = by_repo.get(h["repo"])
            out.append(f"{h['repo']}@{c['ref']} ({c['sha'][:10]})" if c else h["repo"])
        return ", ".join(out)

    # Fail closed: nothing to reconcile against.
    if not repos or not inspected_any:
        if not repos:
            detail = f"no repository declared for project '{project}' - cannot reconcile (fail closed)"
        else:
            why = "; ".join(failure_notes) or ", ".join(failed_repos)
            detail = ("no declared repository was git-inspectable at its canonical ref "
                      f"({why}) - cannot reconcile (fail closed)")
        return ReconcileResult(
            project=project, report_date=report_date_str, reconciled_at=reconciled_at,
            heads=heads, raw=raw_findings, open_findings=[], unknown_findings=[],
            resolved_findings=[], evidence={}, rejected={}, status="failed", detail=detail,
            canonical=canonical,
        )

    open_f, unknown_f, resolved_f, awaiting_f = [], [], [], []
    evidence: dict[str, list[dict]] = {}
    awaiting_evidence: dict[str, list[dict]] = {}
    rejected: dict[str, list[dict]] = {}
    have_failed = bool(failed_repos)
    for f in raw_findings:
        fid = f["id"]
        accepted, rej = [], []
        for ev in cited.get(fid, []):
            reason = closure_reason(f, ev)
            if reason is None:
                accepted.append(ev)
            else:
                rej.append({**ev, "rejectReason": reason})
        # Same evidence rules for fixes that exist only on non-canonical refs.
        accepted_aw = []
        for ev in awaiting_cited.get(fid, []):
            reason = closure_reason(f, ev)
            if reason is None:
                accepted_aw.append(ev)
            else:
                rej.append({**ev, "rejectReason": reason, "canonicalRef": False})
        if rej:
            rejected[fid] = rej
        if accepted:
            resolved_f.append(f)
            evidence[fid] = accepted
        elif accepted_aw:
            # Implemented, but not on the canonical ref: neither open nor resolved.
            awaiting_f.append(f)
            awaiting_evidence[fid] = accepted_aw
        elif have_failed:
            # No VALID closure here, but a declared repo was unreadable: the real
            # fix might be there -> retain conservatively as UNKNOWN, never RESOLVED.
            unknown_f.append(f)
        else:
            # Ownership known, no valid closure (bookkeeping-only citations included)
            # -> stays OPEN.
            open_f.append(f)

    n_rejected = sum(len(v) for v in rejected.values())
    inspected_heads = [h for h in heads if h["inspected"]]
    if have_failed:
        status = "partial"
        detail = (f"reconciled against {scanned_label(inspected_heads)}; "
                  f"{len(failed_repos)} repo(s) un-inspectable ({'; '.join(failure_notes) or ', '.join(failed_repos)}) - "
                  f"{len(resolved_f)} resolved, {len(awaiting_f)} awaiting integration, "
                  f"{len(unknown_f)} held UNKNOWN, "
                  f"{n_rejected} insufficient-evidence citation(s) rejected")
    else:
        status = "success"
        detail = (f"reconciled against {scanned_label(heads)}; "
                  f"{len(resolved_f)} of {len(raw_findings)} closed on the canonical ref by "
                  f"implementation-backed finding-ID evidence, {len(awaiting_f)} implemented "
                  f"awaiting integration, {len(open_f)} open "
                  f"({n_rejected} insufficient-evidence citation(s) rejected)")

    result = ReconcileResult(
        project=project, report_date=report_date_str, reconciled_at=reconciled_at,
        heads=heads, raw=raw_findings, open_findings=open_f,
        unknown_findings=unknown_f, resolved_findings=resolved_f,
        evidence=evidence, rejected=rejected, status=status, detail=detail,
        awaiting_findings=awaiting_f, awaiting_evidence=awaiting_evidence,
        canonical=canonical,
    )
    result.assert_partition()
    return result


# --------------------------------------------------------------------------- #
# Writing back (only on non-failed status)
# --------------------------------------------------------------------------- #
def _check_baseline(existing_audit: dict, result: ReconcileResult,
                    replace_baseline: bool = False) -> None:
    """Refuse a write that would clobber a newer / more consolidated stored baseline.

    - an OLDER report than the stored reportDate/lastRun never supersedes it;
    - a same-day rerun may not shrink the stored per-severity rawCounts, nor drop
      stored awaitingIntegrationCounts that are not accounted for as awaiting or
      resolved now (evidence silently lost).
    `replace_baseline=True` (CLI --replace-baseline) is the explicit opt-in override.
    """
    if replace_baseline:
        return
    stored = max((str(existing_audit.get(k) or "")
                  for k in ("reportDate", "lastRun")), default="")
    if not stored:
        return
    hint = "pass --replace-baseline to override deliberately"
    if result.report_date < stored:
        raise ReconcileError(
            f"refusing to write: report {result.report_date} is older than the stored "
            f"baseline {stored} - an older report must not supersede it ({hint})")
    if result.report_date != stored:
        return
    new_raw = _counts(result.raw)
    new_aw = _counts(result.awaiting)
    new_res = _counts(result.resolved)
    for sev in SEVERITIES:
        old = int((existing_audit.get("rawCounts") or {}).get(sev, 0) or 0)
        if old > new_raw.get(sev, 0):
            raise ReconcileError(
                f"refusing to write: same-day rerun would shrink the consolidated "
                f"baseline rawCounts.{sev} {old} -> {new_raw.get(sev, 0)} ({hint})")
        old_aw = int((existing_audit.get("awaitingIntegrationCounts") or {}).get(sev, 0) or 0)
        if old_aw > new_aw.get(sev, 0) + new_res.get(sev, 0):
            raise ReconcileError(
                f"refusing to write: same-day rerun drops baseline "
                f"awaitingIntegrationCounts.{sev} ({old_aw} stored, "
                f"{new_aw.get(sev, 0)} awaiting + {new_res.get(sev, 0)} resolved now) ({hint})")


def write_back(result: ReconcileResult, data_path: Path = DATA_JS,
               replace_baseline: bool = False) -> None:
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
    _check_baseline(audit, result, replace_baseline)
    audit.update(result.audit_fields())

    new_block = apply_patch(block, {"audit": audit}, serialize=to_js)
    spliced = data_js[:i] + "\n    " + new_block + ",\n    " + data_js[j:]
    if not node_check(spliced):
        raise ReconcileError("reconciled data.js failed `node --check` — refusing to write")
    data_path.write_text(spliced, encoding="utf-8", newline="")

    LOCAL_DIR.mkdir(exist_ok=True)
    ev_path = LOCAL_DIR / f"audit-evidence-{result.project}.json"
    ev_path.write_text(json.dumps(result.evidence_payload(), indent=2), encoding="utf-8")


def _parse_canonical_refs(values):
    """--canonical-ref values -> None | 'REF' (all repos) | {repo-dir-name: ref}.
    Plain REF and REPO=REF forms cannot be mixed."""
    if not values:
        return None
    named = [v for v in values if "=" in v]
    plain = [v for v in values if "=" not in v]
    if named and plain:
        raise ReconcileError("--canonical-ref: cannot mix REF and REPO=REF forms")
    if plain:
        if len(plain) > 1:
            raise ReconcileError("--canonical-ref: give one REF, or REPO=REF per repo")
        return plain[0]
    out = {}
    for v in named:
        repo, _, ref = v.partition("=")
        if not repo.strip() or not ref.strip():
            raise ReconcileError(f"--canonical-ref: malformed REPO=REF value {v!r}")
        out[repo.strip()] = ref.strip()
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Reconcile an audit report against merged fixes.")
    ap.add_argument("--project", required=True)
    ap.add_argument("--report", required=True, help="path to the dated audit report")
    ap.add_argument("--findings", required=True,
                    help="JSON file: [{id, sev, title, where[, scope]}, ...] raw findings")
    ap.add_argument("--write", action="store_true",
                    help="patch data.js (and write local evidence) if status != failed")
    ap.add_argument("--canonical-ref", action="append", metavar="REF|REPO=REF",
                    help="override the canonical ref (repeatable as REPO=REF, repo dir "
                         "name). Default: CANONICAL_REF_POLICY, else origin/HEAD. HEAD is "
                         "never used.")
    ap.add_argument("--replace-baseline", action="store_true",
                    help="allow --write to replace a newer/more consolidated stored "
                         "baseline (older report, or same-day shrink)")
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

    try:
        canonical_ref = _parse_canonical_refs(args.canonical_ref)
        result = reconcile(args.project, raw, rd, canonical_ref=canonical_ref)
    except ReconcileError as exc:
        print(f"[reconcile] ERROR: {exc}", file=sys.stderr)
        return 2
    for c in result.canonical:
        print(f"[reconcile] canonical ref {c['repo']}@{c['ref']} ({c['sha'][:10]}) "
              f"via {c.get('source')}", file=sys.stderr)
    print(json.dumps(result.to_dict(), indent=2))
    print(f"\n[reconcile] {args.project}: status={result.status} — {result.detail}",
          file=sys.stderr)

    if args.write:
        if result.status == "failed":
            print("[reconcile] FAILED — data.js left untouched (fail closed).", file=sys.stderr)
            return 1
        try:
            write_back(result, replace_baseline=args.replace_baseline)
        except ReconcileError as exc:
            print(f"[reconcile] REFUSED: {exc}", file=sys.stderr)
            return 1
        print(f"[reconcile] wrote data.js + local/audit-evidence-{args.project}.json",
              file=sys.stderr)
    return 0 if result.status != "failed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
