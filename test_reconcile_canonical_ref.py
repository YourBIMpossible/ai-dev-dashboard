"""Regression tests for canonical-ref attribution in reconcile_audit.py (review F-1).

The defect: git_cited_findings() scanned the commits of the CHECKED-OUT branch (HEAD),
so a fix that existed only on an unmerged/local branch -- or on whatever branch
happened to be checked out -- was counted as a verified closure on the canonical
branch. The fix: attribution inspects commits reachable from the repo's CANONICAL ref
(explicit override > documented per-project policy > origin/HEAD > the sole remote's
HEAD), never HEAD; a fix reachable only from other refs is "implemented, awaiting
integration" (awaitingIntegrationCounts), not resolved and not open.

These tests build REAL temporary git repos with subprocess (local only, a bare repo on
disk stands in for the remote -- no network). Run: python -m pytest -q test_reconcile_canonical_ref.py
"""
from __future__ import annotations

import subprocess
from pathlib import Path

import pytest

import reconcile_audit as ra

NOW = "2026-10-06 00:00:00"
SINCE = "2020-01-01"


# --------------------------------------------------------------------------- #
# Temporary-repo helpers
# --------------------------------------------------------------------------- #
def git(repo: Path, *args: str) -> str:
    return subprocess.run(
        ["git", "-C", str(repo), "-c", "user.name=t", "-c", "user.email=t@example.com",
         "-c", "commit.gpgsign=false", "-c", "core.autocrlf=false", *args],
        check=True, capture_output=True, encoding="utf-8",
    ).stdout.strip()


def commit(repo: Path, path: str, content: str, message: str) -> str:
    f = repo / path
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(content, encoding="utf-8", newline="\n")
    git(repo, "add", "--", path)
    git(repo, "commit", "-m", message)
    return git(repo, "rev-parse", "HEAD")


def make_repo(tmp_path: Path, name: str = "proj", *, remote: bool = True,
              branch: str = "main") -> Path:
    """A repo with one baseline commit on `branch`. With remote=True a local bare repo
    is its `origin`, the branch is pushed, and origin/HEAD is set (offline)."""
    repo = tmp_path / name
    repo.mkdir()
    git(repo, "init", "-q", "-b", branch)
    commit(repo, "README.md", "baseline\n", "chore: baseline")
    if remote:
        bare = tmp_path / f"{name}-remote.git"
        subprocess.run(["git", "init", "-q", "--bare", "-b", branch, str(bare)], check=True,
                       capture_output=True)
        git(repo, "remote", "add", "origin", str(bare))
        git(repo, "push", "-q", "-u", "origin", branch)
        git(repo, "remote", "set-head", "origin", branch)
    return repo


def fix_commit(repo: Path, fid: str, path: str = "src/app.py") -> str:
    return commit(repo, path, f"# {fid}\n", f"fix: resolve {fid}")


def finding(fid: str, sev: str = "medium", **kw) -> dict:
    return {"id": fid, "sev": sev, "title": fid, "where": "x", **kw}


def run(repo, raw, **kw):
    return ra.reconcile("p", raw, SINCE, repos=[repo], now=NOW, **kw)


def ids(findings) -> list[str]:
    return sorted(f["id"] for f in findings)


def snapshot(r: ra.ReconcileResult) -> dict:
    """Everything a rerun must reproduce byte-for-byte."""
    return {"fields": r.to_dict(), "evidence": r.evidence_payload()}


# --------------------------------------------------------------------------- #
# (a) checkout independence  -- THE core defect
# --------------------------------------------------------------------------- #
def test_result_is_independent_of_checked_out_branch(tmp_path):
    repo = make_repo(tmp_path)
    fix_commit(repo, "FIX-A-1")                       # on main (canonical)
    git(repo, "push", "-q", "origin", "main")
    git(repo, "checkout", "-q", "-b", "feature/x")
    fix_commit(repo, "FIX-B-1", "src/b.py")           # feature branch only
    raw = [finding("FIX-A-1"), finding("FIX-B-1"), finding("FIX-C-1")]

    on_feature = run(repo, raw)                     # HEAD = feature/x
    # The defect: FIX-B-1 (branch-only) was counted resolved because HEAD had it.
    assert ids(on_feature.resolved) == ["FIX-A-1"]

    git(repo, "checkout", "-q", "main")
    on_main = run(repo, raw)                        # HEAD = main
    assert ids(on_main.resolved) == ["FIX-A-1"]
    assert snapshot(on_feature) == snapshot(on_main)
    assert ids(on_main.awaiting) == ["FIX-B-1"]
    assert ids(on_main.open) == ["FIX-C-1"]


def test_detached_head_does_not_change_result(tmp_path):
    repo = make_repo(tmp_path)
    fix_commit(repo, "FIX-A-1")
    git(repo, "push", "-q", "origin", "main")
    expected = snapshot(run(repo, [finding("FIX-A-1")]))
    git(repo, "checkout", "-q", "--detach", "HEAD~1")
    assert snapshot(run(repo, [finding("FIX-A-1")])) == expected


# --------------------------------------------------------------------------- #
# (b) branch-only fix -> awaiting, not resolved, not open, not closedLastRun
# (c) canonical-branch fix -> resolved
# --------------------------------------------------------------------------- #
def test_branch_only_fix_is_awaiting_not_resolved(tmp_path):
    repo = make_repo(tmp_path)
    git(repo, "checkout", "-q", "-b", "feature/y")
    fix_commit(repo, "SEC-9", "src/sec.py")
    r = run(repo, [finding("SEC-9", "high")])
    assert r.resolved == []
    assert r.open == []
    assert ids(r.awaiting) == ["SEC-9"]
    af = r.audit_fields()
    assert af["closedLastRun"] == 0
    assert sum(af["resolvedCounts"].values()) == 0
    assert sum(af["counts"].values()) == 0 and af["open"] == []
    assert af["awaitingIntegrationCounts"]["high"] == 1
    assert af["rawCounts"]["high"] == 1
    # evidence is kept local-only with the refs that carry the fix
    aw = r.awaiting_evidence["SEC-9"][0]
    assert "feature/y" in aw["refs"]


def test_unpushed_local_commit_on_canonical_branch_name_is_awaiting(tmp_path):
    # local main is AHEAD of origin/main: the canonical ref is origin/main, so the
    # unpushed fix is not verified-closed.
    repo = make_repo(tmp_path)
    fix_commit(repo, "FIX-L-1")
    r = run(repo, [finding("FIX-L-1")])
    assert r.resolved == [] and ids(r.awaiting) == ["FIX-L-1"]


def test_canonical_branch_fix_is_resolved(tmp_path):
    repo = make_repo(tmp_path)
    git(repo, "checkout", "-q", "-b", "feature/z")
    fix_commit(repo, "FIX-M-1", "src/m.py")
    git(repo, "checkout", "-q", "main")
    git(repo, "merge", "-q", "--no-ff", "-m", "merge feature/z", "feature/z")
    git(repo, "push", "-q", "origin", "main")
    r = run(repo, [finding("FIX-M-1")])
    assert ids(r.resolved) == ["FIX-M-1"]
    assert r.awaiting == []
    assert r.audit_fields()["closedLastRun"] == 1
    assert r.evidence["FIX-M-1"][0]["subject"] == "fix: resolve FIX-M-1"


def test_branch_only_commit_without_implementation_evidence_is_open(tmp_path):
    # Reachability is not proof: the same evidence rules apply to non-canonical refs.
    repo = make_repo(tmp_path)
    git(repo, "checkout", "-q", "-b", "feature/docs")
    commit(repo, "docs/note.md", "x\n", "docs: resolve FIX-D-1")           # doc only
    commit(repo, "audits/log.md", "x\n", "docs(audit): FIX-E-1 resolved")  # bookkeeping
    r = run(repo, [finding("FIX-D-1"), finding("FIX-E-1")])
    assert ids(r.open) == ["FIX-D-1", "FIX-E-1"]
    assert r.awaiting == [] and r.resolved == []


# --------------------------------------------------------------------------- #
# (d) missing / unresolvable canonical ref: diagnostic or unverified, NEVER HEAD
# --------------------------------------------------------------------------- #
def test_unresolvable_canonical_ref_never_falls_back_to_head(tmp_path):
    repo = make_repo(tmp_path)
    git(repo, "checkout", "-q", "-b", "feature/h")
    fix_commit(repo, "FIX-H-1")                       # only on the checked-out branch
    git(repo, "remote", "set-head", "origin", "-d")  # origin/HEAD no longer resolvable
    r = run(repo, [finding("FIX-H-1")])
    assert r.status == "failed"                      # unverified -> fail closed
    assert r.resolved == [] and r.awaiting == []
    assert "canonical" in r.detail and "proj" in r.detail
    with pytest.raises(ra.ReconcileError):
        ra.write_back(r)


def test_unresolvable_canonical_ref_holds_findings_unknown_when_partial(tmp_path):
    good = make_repo(tmp_path, "good")
    fix_commit(good, "FIX-G-1")
    git(good, "push", "-q", "origin", "main")
    bad = make_repo(tmp_path, "bad")
    git(bad, "remote", "set-head", "origin", "-d")
    r = ra.reconcile("p", [finding("FIX-G-1"), finding("FIX-Q-1")], SINCE,
                     repos=[good, bad], now=NOW)
    assert r.status == "partial"
    assert ids(r.resolved) == ["FIX-G-1"]
    assert ids(r.unknown) == ["FIX-Q-1"]               # a canonical fix might live in `bad`


@pytest.mark.parametrize("bad_ref", ["HEAD", "@", "HEAD~1", "no-such-branch"])
def test_bad_explicit_override_raises(tmp_path, bad_ref):
    repo = make_repo(tmp_path)
    with pytest.raises(ra.ReconcileError):
        run(repo, [finding("FIX-1")], canonical_ref=bad_ref)


def test_resolve_canonical_ref_diagnostics_are_actionable(tmp_path):
    repo = make_repo(tmp_path, remote=False)
    with pytest.raises(ra.CanonicalRefError) as ei:
        ra.resolve_canonical_ref(repo)
    msg = str(ei.value)
    assert "no remote" in msg and "--canonical-ref" in msg and "CANONICAL_REF_POLICY" in msg


# --------------------------------------------------------------------------- #
# (e) remote-less repo: documented local canonical branch only
# --------------------------------------------------------------------------- #
def test_remoteless_repo_uses_documented_local_branch(tmp_path, monkeypatch):
    repo = make_repo(tmp_path, "brain", remote=False, branch="master")
    fix_commit(repo, "FIX-R-1")                       # on master
    git(repo, "checkout", "-q", "-b", "claude/integration")
    fix_commit(repo, "FIX-R-2", "src/r2.py")          # branch only
    raw = [finding("FIX-R-1"), finding("FIX-R-2"), finding("FIX-R-3")]

    # No policy entry and no override -> unverified, never HEAD.
    assert run(repo, raw).status == "failed"

    monkeypatch.setitem(ra.CANONICAL_REF_POLICY, "brain", "master")
    r = run(repo, raw)
    assert r.status == "success"
    assert ids(r.resolved) == ["FIX-R-1"]
    assert ids(r.awaiting) == ["FIX-R-2"]
    assert ids(r.open) == ["FIX-R-3"]
    git(repo, "checkout", "-q", "master")
    assert snapshot(run(repo, raw)) == snapshot(r)   # still checkout independent


def test_remoteless_repo_with_explicit_override(tmp_path):
    repo = make_repo(tmp_path, "brain2", remote=False, branch="trunk")
    fix_commit(repo, "FIX-T-1")
    r = run(repo, [finding("FIX-T-1")], canonical_ref="trunk")
    assert ids(r.resolved) == ["FIX-T-1"]


def test_shipped_policy_documents_remoteless_local_branches():
    assert ra.CANONICAL_REF_POLICY.get("ai-brain-data") == "master"


# --------------------------------------------------------------------------- #
# Resolver precedence
# --------------------------------------------------------------------------- #
def test_resolver_precedence(tmp_path, monkeypatch):
    repo = make_repo(tmp_path)
    git(repo, "branch", "release")
    git(repo, "push", "-q", "origin", "release")

    c = ra.resolve_canonical_ref(repo)                       # origin/HEAD
    assert (c.name, c.source) == ("origin/main", "origin/HEAD")
    assert c.sha == git(repo, "rev-parse", "origin/main")

    monkeypatch.setitem(ra.CANONICAL_REF_POLICY, "proj", "origin/release")
    assert ra.resolve_canonical_ref(repo).source == "policy"        # policy > origin/HEAD
    assert ra.resolve_canonical_ref(repo).name == "origin/release"

    c = ra.resolve_canonical_ref(repo, "main")                      # override > policy
    assert (c.name, c.source) == ("main", "override")
    assert c.ref == "refs/heads/main"


def test_resolver_ignores_checkout(tmp_path):
    repo = make_repo(tmp_path)
    before = ra.resolve_canonical_ref(repo)
    git(repo, "checkout", "-q", "-b", "other")
    assert ra.resolve_canonical_ref(repo) == before


def test_canonical_ref_mapping_override(tmp_path):
    a, b = make_repo(tmp_path, "a"), make_repo(tmp_path, "b")
    fix_commit(a, "FIX-A-1")
    r = ra.reconcile("p", [finding("FIX-A-1")], SINCE, repos=[a, b], now=NOW,
                     canonical_ref={"a": "main"})            # local main, includes unpushed
    assert ids(r.resolved) == ["FIX-A-1"]
    assert "a@main" in r.detail and "b@origin/main" in r.detail


# --------------------------------------------------------------------------- #
# (f) squash-style integration evidence
# --------------------------------------------------------------------------- #
def test_squash_commit_citing_ids_counts_on_canonical(tmp_path):
    repo = make_repo(tmp_path)
    git(repo, "checkout", "-q", "-b", "feature/sq")
    fix_commit(repo, "FIX-S-1", "src/s1.py")
    fix_commit(repo, "FIX-S-2", "src/s2.py")
    git(repo, "checkout", "-q", "main")
    # squash merge: new commit on main, the branch commits stay unreachable from main
    git(repo, "merge", "-q", "--squash", "feature/sq")
    git(repo, "commit", "-m", "feat: harden app (#12)\n\nFixes FIX-S-1, FIX-S-2.")
    git(repo, "push", "-q", "origin", "main")
    r = run(repo, [finding("FIX-S-1"), finding("FIX-S-2")])
    assert ids(r.resolved) == ["FIX-S-1", "FIX-S-2"]
    assert r.awaiting == []                         # resolved wins over the stale branch


def test_squash_commit_without_ids_is_not_guessed_closed(tmp_path):
    repo = make_repo(tmp_path)
    git(repo, "checkout", "-q", "-b", "feature/sq2")
    fix_commit(repo, "FIX-S-3", "src/s3.py")
    git(repo, "checkout", "-q", "main")
    git(repo, "merge", "-q", "--squash", "feature/sq2")
    git(repo, "commit", "-m", "feat: harden app (#13)")      # PR ref only, no finding IDs
    git(repo, "push", "-q", "origin", "main")
    r = run(repo, [finding("FIX-S-3")])
    assert r.resolved == []                         # a PR number alone proves nothing
    assert ids(r.awaiting) == ["FIX-S-3"]


# --------------------------------------------------------------------------- #
# (g) rawCounts invariant
# --------------------------------------------------------------------------- #
def _mixed_result(tmp_path):
    repo = make_repo(tmp_path)
    fix_commit(repo, "FIX-1")
    git(repo, "push", "-q", "origin", "main")
    git(repo, "checkout", "-q", "-b", "feature/m")
    fix_commit(repo, "FIX-2", "src/two.py")
    raw = [finding("FIX-1", "high"), finding("FIX-2", "high"), finding("FIX-3", "low"),
           finding("FIX-4", "medium")]
    return run(repo, raw)


def test_rawcounts_equals_open_awaiting_resolved_unknown(tmp_path):
    af = _mixed_result(tmp_path).audit_fields()
    for sev in ra.SEVERITIES:
        assert af["rawCounts"][sev] == (af["openCounts"][sev] + af["awaitingIntegrationCounts"][sev]
                                        + af["resolvedCounts"][sev] + af["unknownCounts"][sev])
    assert sum(af["rawCounts"].values()) == 4
    assert af["counts"] == af["openCounts"]
    assert af["closedLastRun"] == 1


def test_partition_violation_is_rejected(tmp_path):
    r = _mixed_result(tmp_path)
    r.awaiting = r.awaiting + r.awaiting            # a finding counted twice
    with pytest.raises(ra.ReconcileError, match="partition"):
        r.audit_fields()


# --------------------------------------------------------------------------- #
# (h) idempotence
# --------------------------------------------------------------------------- #
def test_rerun_is_idempotent(tmp_path):
    repo = make_repo(tmp_path)
    fix_commit(repo, "FIX-1")
    git(repo, "push", "-q", "origin", "main")
    git(repo, "checkout", "-q", "-b", "feature/i")
    fix_commit(repo, "FIX-2", "src/two.py")
    raw = [finding("FIX-1"), finding("FIX-2"), finding("FIX-3")]
    assert snapshot(run(repo, raw)) == snapshot(run(repo, raw))


# --------------------------------------------------------------------------- #
# Evidence recorded: ref name + SHA
# --------------------------------------------------------------------------- #
def test_ref_and_sha_recorded_as_evidence(tmp_path):
    repo = make_repo(tmp_path)
    fix_commit(repo, "FIX-1")
    git(repo, "push", "-q", "origin", "main")
    sha = git(repo, "rev-parse", "origin/main")
    r = run(repo, [finding("FIX-1")])
    assert f"proj@origin/main ({sha[:10]})" in r.detail
    assert r.heads == [{"repo": "proj", "head": sha[:10], "inspected": True}]
    ev = r.evidence_payload()["canonicalRefs"][0]
    assert (ev["repo"], ev["ref"], ev["sha"], ev["source"]) == (
        "proj", "origin/main", sha, "origin/HEAD")
    # the public audit fields gain NO new keys beyond awaitingIntegrationCounts
    assert set(r.audit_fields()) == {
        "reportDate", "reconciledAt", "reconciliationHeads", "rawCounts", "openCounts",
        "unknownCounts", "resolvedCounts", "awaitingIntegrationCounts", "publishedCounts",
        "ingestStatus", "ingestDetail", "counts", "closedLastRun", "open", "unknown"}


# --------------------------------------------------------------------------- #
# Baseline protection for write_back + CLI parsing
# --------------------------------------------------------------------------- #
def _result_for_baseline(tmp_path, report_date="2026-10-05"):
    repo = make_repo(tmp_path)
    return ra.reconcile("p", [finding("FIX-1", "high")], report_date, repos=[repo], now=NOW)


def test_older_report_cannot_supersede_newer_baseline(tmp_path):
    r = _result_for_baseline(tmp_path, "2026-09-13")
    with pytest.raises(ra.ReconcileError, match="baseline"):
        ra._check_baseline({"lastRun": "2026-10-05"}, r)
    ra._check_baseline({"lastRun": "2026-10-05"}, r, replace_baseline=True)   # explicit opt-in


def test_same_day_rerun_cannot_shrink_consolidated_baseline(tmp_path):
    r = _result_for_baseline(tmp_path)                       # 1 raw finding, 0 awaiting
    consolidated = {"lastRun": "2026-10-05",
                    "rawCounts": {"critical": 0, "high": 5, "medium": 0, "low": 0, "info": 0}}
    with pytest.raises(ra.ReconcileError, match="baseline"):
        ra._check_baseline(consolidated, r)
    awaiting = {"lastRun": "2026-10-05",
                "awaitingIntegrationCounts": {"critical": 0, "high": 1, "medium": 0, "low": 0, "info": 0}}
    with pytest.raises(ra.ReconcileError, match="baseline"):
        ra._check_baseline(awaiting, r)


def test_newer_report_and_identical_rerun_are_accepted(tmp_path):
    r = _result_for_baseline(tmp_path)
    ra._check_baseline({}, r)                                                    # first ingest
    ra._check_baseline({"lastRun": "2026-09-01", "rawCounts": {"high": 50}}, r)  # newer report
    same = {"lastRun": "2026-10-05", "reportDate": "2026-10-05",
            "rawCounts": ra._counts(r.raw),
            "awaitingIntegrationCounts": ra._counts([])}
    ra._check_baseline(same, r)                                                  # same-day rerun


def test_parse_canonical_ref_args():
    assert ra._parse_canonical_refs(None) is None
    assert ra._parse_canonical_refs(["origin/main"]) == "origin/main"
    assert ra._parse_canonical_refs(["a=main", "b=origin/dev"]) == {"a": "main", "b": "origin/dev"}
    with pytest.raises(ra.ReconcileError):
        ra._parse_canonical_refs(["origin/main", "a=main"])   # cannot mix global and per-repo


def test_cli_help_mentions_canonical_ref():
    out = subprocess.run(["python", str(Path(ra.__file__)), "--help"], check=True,
                         capture_output=True, encoding="utf-8").stdout
    assert "--canonical-ref" in out and "--replace-baseline" in out
