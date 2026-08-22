"""Tests for reconcile_audit.py — the mandatory post-audit reconciliation stage.

Covers exactly the cases the spec requires:
  * exact finding-ID match closes a finding (with an implementation-file change)
  * a similar title / shared prefix does NOT close a finding
  * no post-report commit leaves a finding OPEN (only when ownership is known)
  * a cross-repo closure counts only if cited in a DECLARED, inspected repo
  * a missing/un-inspectable repo -> partial/failed WITHOUT dropping counts
  * the real regression: 77 raw findings, 47 impl-backed closures -> 30 OPEN
  * a resolved High is absent from the public counts and open list
  * fail-closed: no repo declared, or no repo inspectable -> status=failed

Closure-evidence strengthening (the reason this file grew):
  * exact id + "resolved" in a docs(audit) commit does NOT close
  * exact id + "resolved" in a resolution-log/checklist commit does NOT close
  * exact id + cue + implementation-file change DOES close
  * exact id + cue + only generated/ledger/history files does NOT close
  * a documentation-scoped finding closes through its declared doc artifact,
    while a code/security finding (same commit) does not

The git layer is injected (git_driver), so no test touches real git. Injected
citations carry the SAME structured shape the real driver produces (bookkeeping /
hasImpl / hasDoc / auditOnly), so the closure decision is exercised end-to-end.

Run: python test_reconcile_audit.py   (stdlib only, pytest-compatible)
"""
import unittest

import reconcile_audit as ra


def finding(fid, sev="medium", title=None, where="somewhere", scope=None):
    f = {"id": fid, "sev": sev, "title": title or fid, "where": where}
    if scope is not None:
        f["scope"] = scope
    return f


def cite(repo, sha, subject, *, files=None, impl=False, doc=False,
         bookkeeping=False, audit_only=False, date="2026-08-18"):
    """Build one citation evidence dict matching the real driver's schema. Either
    pass explicit `files` (and let classify decide) or set the category booleans
    directly for a focused unit test."""
    if files is not None:
        cls = ra.classify_commit(subject, files)
        impl, doc = cls["hasImpl"], cls["hasDoc"]
        bookkeeping, audit_only = cls["bookkeeping"], cls["auditOnly"]
    return {
        "repo": repo, "sha": sha, "date": date, "subject": subject,
        "files": files or [], "bookkeeping": bookkeeping,
        "hasImpl": impl, "hasDoc": doc, "auditOnly": audit_only,
        "categories": [],
    }


def fake_git(citations_by_repo, failed=()):
    """Build a git_driver from {repo_name -> {finding_id -> [citation,...]}}.
    Any repo whose name is in `failed` reports ok=False (un-inspectable)."""
    def driver(repo, since_date):
        name = repo.name
        if name in failed:
            return {}, None, False
        cites = citations_by_repo.get(name, {})
        return cites, f"head_{name}", True
    return driver


# --------------------------------------------------------------------------- #
# classify_path / classify_commit — the structured evidence primitives
# --------------------------------------------------------------------------- #
class Classify(unittest.TestCase):
    def test_impl_vs_doc_vs_audit_paths(self):
        self.assertEqual(ra.classify_path("backend/app/security/wizard.py"), "impl")
        self.assertEqual(ra.classify_path("src/components/Pair.tsx"), "impl")
        self.assertEqual(ra.classify_path("Add-Ins/Commands/WriteBack.cs"), "impl")
        self.assertEqual(ra.classify_path("README.md"), "doc")
        self.assertEqual(ra.classify_path("00_Strategy/notes.md"), "doc")
        self.assertEqual(ra.classify_path(
            "02_Reference/Audit and Scan Info/audit-resolution-plan_2026-08-17.md"), "audit")
        self.assertEqual(ra.classify_path("01_BuildLog/2026-08-17__weekly-full-audit-run.md"), "audit")
        self.assertEqual(ra.classify_path("data.js"), "audit")
        self.assertEqual(ra.classify_path("BIMpossible_PHASE-STATUS.md"), "audit")
        # unknown/data extensions default to the non-impl side (conservative)
        self.assertEqual(ra.classify_path("doc-reference-baseline.json"), "doc")

    def test_bookkeeping_subject_detection(self):
        for subj in ("docs(audit): anchor resolution log — P1a + P2 closed",
                     "chore(audit): publish authoritative 2026-08-17 audit record",
                     "chore(hygiene): audit 2026-08-17 P7 Workspace half",
                     "docs: update verification checklist for SEC-1"):
            self.assertTrue(ra.classify_commit(subj, [])["bookkeeping"], subj)
        for subj in ("fix(auth): resolve SEC-1 cross-tenant hub gap",
                     "feat(pairing): remediate SEC-PAIR-1"):
            self.assertFalse(ra.classify_commit(subj, [])["bookkeeping"], subj)


class ExactIdMatching(unittest.TestCase):
    def test_exact_id_closes_with_impl_file(self):
        raw = [finding("SEC-1", "high"), finding("HYG-2")]
        g = fake_git({"BIMpossible": {"SEC-1": [
            cite("BIMpossible", "abc", "fix: resolve SEC-1",
                 files=["backend/app/security/wizard.py"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual([f["id"] for f in r.resolved], ["SEC-1"])
        self.assertEqual([f["id"] for f in r.open], ["HYG-2"])
        self.assertEqual(r.status, "success")

    def test_prefix_does_not_match(self):
        # A commit citing SEC-12 must NOT close SEC-1 (prefix), nor vice-versa.
        raw = [finding("SEC-1", "high")]
        g = fake_git({"BIMpossible": {"SEC-12": [
            cite("BIMpossible", "x", "fix: resolve SEC-12", files=["src/x.ts"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.open], ["SEC-1"])

    def test_title_similarity_does_not_match(self):
        # A commit that only echoes the finding's words (no ID token) leaves it OPEN.
        raw = [finding("SEC-1", "high", title="cross-tenant hub authorization gap")]
        g = fake_git({"BIMpossible": {}})  # no ID citations at all
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual([f["id"] for f in r.open], ["SEC-1"])
        self.assertEqual(r.resolved, [])

    def test_no_post_report_commit_leaves_open_when_ownership_known(self):
        raw = [finding("A-1"), finding("B-2")]
        g = fake_git({"BIMpossible": {}})  # inspected OK, nothing cited
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual({f["id"] for f in r.open}, {"A-1", "B-2"})
        self.assertEqual(r.unknown, [])
        self.assertEqual(r.status, "success")


# --------------------------------------------------------------------------- #
# Closure evidence strengthening — the six spec-required scenarios
# --------------------------------------------------------------------------- #
class ClosureEvidence(unittest.TestCase):
    def test_1_docs_audit_commit_does_not_close(self):
        # Exact id + "resolved" but the commit is a docs(audit) bookkeeping commit.
        raw = [finding("SEC-PAIR-2", "medium")]
        g = fake_git({"Workspace": {"SEC-PAIR-2": [
            cite("Workspace", "e8b4787",
                 "docs(audit): anchor resolution log — P1a + P2 closed",
                 files=["02_Reference/Audit and Scan Info/audit-resolution-plan_2026-08-17.md"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("Workspace")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.open], ["SEC-PAIR-2"])
        # rejection reason recorded local-only
        self.assertIn("SEC-PAIR-2", r.rejected)
        self.assertEqual(r.rejected["SEC-PAIR-2"][0]["rejectReason"], "audit-bookkeeping-subject")

    def test_2_resolution_log_commit_does_not_close(self):
        # Non-bookkeeping SUBJECT, but the only changed file is the resolution log
        # (an audit artifact) -> auditOnly -> rejected.
        raw = [finding("ARCH-DIST-2", "medium")]
        g = fake_git({"Workspace": {"ARCH-DIST-2": [
            cite("Workspace", "d00d",
                 "update tracker: ARCH-DIST-2 resolved",
                 files=["03_Audits/2026-08-17__resolution-log.md"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("Workspace")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.open], ["ARCH-DIST-2"])
        self.assertEqual(r.rejected["ARCH-DIST-2"][0]["rejectReason"], "audit-artifact-only-files")

    def test_3_impl_file_change_closes(self):
        raw = [finding("SEC-1", "high")]
        g = fake_git({"BIMpossible": {"SEC-1": [
            cite("BIMpossible", "c0de",
                 "fix(auth): resolve SEC-1 cross-tenant hub authorization",
                 files=["backend/app/security/hub.py", "tests/test_hub.py"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual([f["id"] for f in r.resolved], ["SEC-1"])
        self.assertEqual(r.open, [])
        self.assertNotIn("SEC-1", r.rejected)

    def test_4_generated_ledger_history_only_does_not_close(self):
        # Non-bookkeeping subject, resolution cue, exact id — but every changed file
        # is a generated/ledger/history artifact -> no implementation evidence.
        raw = [finding("CQ-1", "medium")]
        g = fake_git({"BIMpossible": {"CQ-1": [
            cite("BIMpossible", "beef",
                 "chore: mark CQ-1 fixed in tracker",
                 files=["data.js", "BIMpossible_PHASE-STATUS.md", "CHANGELOG.md"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.open], ["CQ-1"])
        self.assertEqual(r.rejected["CQ-1"][0]["rejectReason"], "audit-artifact-only-files")

    def test_5_doc_scope_closes_via_doc_but_code_finding_does_not(self):
        # Same documentation commit; a doc-scoped finding closes, a code finding does not.
        commit = cite("Workspace", "d0c5",
                      "docs: resolve HYG-30 and SEC-30 — document retention policy",
                      files=["02_Reference/retention-policy.md"])
        # doc-scoped finding -> closes through the declared documentation artifact
        raw_doc = [finding("HYG-30", "low", scope="documentation")]
        g_doc = fake_git({"Workspace": {"HYG-30": [commit]}})
        r_doc = ra.reconcile("p", raw_doc, "2026-08-17", repos=[ra.Path("Workspace")], git_driver=g_doc)
        self.assertEqual([f["id"] for f in r_doc.resolved], ["HYG-30"])

        # code/security finding cited by the SAME doc-only commit -> stays OPEN
        raw_code = [finding("SEC-30", "high")]
        g_code = fake_git({"Workspace": {"SEC-30": [commit]}})
        r_code = ra.reconcile("p", raw_code, "2026-08-17", repos=[ra.Path("Workspace")], git_driver=g_code)
        self.assertEqual(r_code.resolved, [])
        self.assertEqual([f["id"] for f in r_code.open], ["SEC-30"])
        self.assertEqual(r_code.rejected["SEC-30"][0]["rejectReason"], "no-implementation-file-change")

    def test_5b_doc_scoped_finding_still_rejects_pure_audit_commit(self):
        # A doc-scoped finding must NOT close through an audit-bookkeeping commit.
        raw = [finding("HYG-11", "low", scope="documentation")]
        g = fake_git({"Workspace": {"HYG-11": [
            cite("Workspace", "67e3148",
                 "chore(hygiene): audit 2026-08-17 P7 Workspace half",
                 files=["02_Reference/Audit and Scan Info/BIMpossible_Verification_Checklist.md"])]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("Workspace")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.open], ["HYG-11"])
        self.assertEqual(r.rejected["HYG-11"][0]["rejectReason"], "audit-bookkeeping-subject")


class CrossRepo(unittest.TestCase):
    def test_resolved_only_if_cited_in_declared_inspected_repo(self):
        raw = [finding("X-1"), finding("Y-2")]
        # X-1 cited (impl) in repo A; Y-2 cited only in an UNDECLARED repo (never seen).
        g = fake_git({"A": {"X-1": [cite("A", "a", "fix: resolve X-1", files=["a/x.py"])]}})
        r = ra.reconcile("p", raw, "2026-08-17",
                         repos=[ra.Path("A"), ra.Path("B")], git_driver=g)
        self.assertEqual([f["id"] for f in r.resolved], ["X-1"])
        self.assertEqual([f["id"] for f in r.open], ["Y-2"])
        self.assertEqual(r.status, "success")

    def test_uninspectable_repo_makes_uncited_findings_unknown(self):
        raw = [finding("X-1"), finding("Y-2")]
        # A inspected (X-1 closed); B un-inspectable -> Y-2 becomes UNKNOWN, retained.
        g = fake_git({"A": {"X-1": [cite("A", "a", "fix: resolve X-1", files=["a/x.py"])]}},
                     failed=("B",))
        r = ra.reconcile("p", raw, "2026-08-17",
                         repos=[ra.Path("A"), ra.Path("B")], git_driver=g)
        self.assertEqual([f["id"] for f in r.resolved], ["X-1"])
        self.assertEqual([f["id"] for f in r.unknown], ["Y-2"])
        self.assertEqual(r.open, [])
        self.assertEqual(r.status, "partial")
        # UNKNOWN is retained + labeled separately, never folded into `open`.
        af = r.audit_fields()
        self.assertEqual([f["id"] for f in r.published], ["Y-2"])
        self.assertEqual(af["open"], [])                       # strictly-open only
        self.assertEqual([f["id"] for f in af["unknown"]], ["Y-2"])
        self.assertEqual(sum(af["counts"].values()), 0)        # counts == strictly-open
        self.assertEqual(sum(af["unknownCounts"].values()), 1)
        self.assertEqual(sum(af["publishedCounts"].values()), 1)  # open + unknown

    def test_bookkeeping_citation_with_failed_repo_stays_unknown_not_resolved(self):
        # Cited only by a bookkeeping commit in A, while B is un-inspectable:
        # must NOT resolve; held UNKNOWN because a real fix could live in B.
        raw = [finding("Z-9")]
        g = fake_git({"A": {"Z-9": [
            cite("A", "bk", "docs(audit): Z-9 closed",
                 files=["03_Audits/resolution-log.md"])]}}, failed=("B",))
        r = ra.reconcile("p", raw, "2026-08-17",
                         repos=[ra.Path("A"), ra.Path("B")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.unknown], ["Z-9"])
        self.assertIn("Z-9", r.rejected)


class FailClosed(unittest.TestCase):
    def test_no_repo_declared_fails_closed(self):
        raw = [finding("A-1")]
        r = ra.reconcile("p", raw, "2026-08-17", repos=[], git_driver=fake_git({}))
        self.assertEqual(r.status, "failed")
        self.assertEqual(r.published, [])   # caller must not overwrite anyway

    def test_all_repos_uninspectable_fails_closed(self):
        raw = [finding("A-1"), finding("B-2")]
        g = fake_git({}, failed=("A", "B"))
        r = ra.reconcile("p", raw, "2026-08-17",
                         repos=[ra.Path("A"), ra.Path("B")], git_driver=g)
        self.assertEqual(r.status, "failed")

    def test_write_back_refuses_on_failed(self):
        raw = [finding("A-1")]
        r = ra.reconcile("p", raw, "2026-08-17", repos=[], git_driver=fake_git({}))
        with self.assertRaises(ra.ReconcileError):
            ra.write_back(r)


class RealRegression(unittest.TestCase):
    """77 raw, 47 impl-backed closures -> 30 OPEN, and a resolved High disappears
    from the public counts/list."""
    def _raw77(self):
        raw = []
        raw.append(finding("SEC-HIGH-1", "high"))
        for i in range(1, 47):
            raw.append(finding(f"RES-{i}", "medium"))
        raw.append(finding("OPEN-HIGH-1", "high"))
        for i in range(1, 30):
            raw.append(finding(f"OPEN-{i}", "low"))
        assert len(raw) == 77, len(raw)
        return raw

    def test_47_closed_30_open(self):
        raw = self._raw77()
        resolved_ids = {"SEC-HIGH-1"} | {f"RES-{i}" for i in range(1, 47)}
        cites = {rid: [cite("BIMpossible", "s", f"fix: resolve {rid}",
                            files=[f"backend/app/{rid.lower()}.py"])]
                 for rid in resolved_ids}
        g = fake_git({"BIMpossible": cites})
        r = ra.reconcile("bimpossible", raw, "2026-08-17",
                         repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual(len(r.resolved), 47)
        self.assertEqual(len(r.published), 30)
        self.assertEqual(r.status, "success")

        af = r.audit_fields()
        self.assertEqual(af["closedLastRun"], 47)
        self.assertEqual(af["rawCounts"]["high"], 2)
        self.assertEqual(af["counts"]["high"], 1)
        self.assertEqual(af["resolvedCounts"]["high"], 1)
        self.assertNotIn("SEC-HIGH-1", [f["id"] for f in af["open"]])
        self.assertIn("OPEN-HIGH-1", [f["id"] for f in af["open"]])
        self.assertEqual(sum(af["counts"].values()), len(af["open"]))


class ReportDate(unittest.TestCase):
    def test_missing_report_raises(self):
        with self.assertRaises(ra.ReconcileError):
            ra.report_date(ra.Path("does-not-exist_2026-08-17.md"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
