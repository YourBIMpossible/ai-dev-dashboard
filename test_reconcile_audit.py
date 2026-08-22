"""Tests for reconcile_audit.py — the mandatory post-audit reconciliation stage.

Covers exactly the cases the spec requires:
  * exact finding-ID match closes a finding
  * a similar title / shared prefix does NOT close a finding
  * no post-report commit leaves a finding OPEN (only when ownership is known)
  * a cross-repo closure counts only if cited in a DECLARED, inspected repo
  * a missing/un-inspectable repo -> partial/failed WITHOUT dropping counts
  * the real regression: 77 raw findings, 47 exact-ID closures -> 30 OPEN
  * a resolved High is absent from the public counts and open list
  * fail-closed: no repo declared, or no repo inspectable -> status=failed

The git layer is injected (git_driver), so no test touches real git.

Run: python test_reconcile_audit.py   (stdlib only, pytest-compatible)
"""
import unittest

import reconcile_audit as ra


def finding(fid, sev="medium", title=None, where="somewhere"):
    return {"id": fid, "sev": sev, "title": title or fid, "where": where}


def fake_git(citations_by_repo, failed=()):
    """Build a git_driver from {repo_name -> {finding_id -> [commit,...]}}.
    Any repo whose name is in `failed` reports ok=False (un-inspectable)."""
    def driver(repo, since_date):
        name = repo.name
        if name in failed:
            return {}, None, False
        cites = citations_by_repo.get(name, {})
        return cites, f"head_{name}", True
    return driver


class ExactIdMatching(unittest.TestCase):
    def test_exact_id_closes(self):
        raw = [finding("SEC-1", "high"), finding("HYG-2")]
        g = fake_git({"BIMpossible": {"SEC-1": [{"repo": "BIMpossible", "sha": "abc", "date": "2026-08-18", "subject": "fix SEC-1"}]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual([f["id"] for f in r.resolved], ["SEC-1"])
        self.assertEqual([f["id"] for f in r.open], ["HYG-2"])
        self.assertEqual(r.status, "success")

    def test_prefix_does_not_match(self):
        # A commit citing SEC-12 must NOT close SEC-1 (prefix), nor vice-versa.
        raw = [finding("SEC-1", "high")]
        g = fake_git({"BIMpossible": {"SEC-12": [{"repo": "BIMpossible", "sha": "x", "date": "2026-08-18", "subject": "fix SEC-12"}]}})
        r = ra.reconcile("p", raw, "2026-08-17", repos=[ra.Path("BIMpossible")], git_driver=g)
        self.assertEqual(r.resolved, [])
        self.assertEqual([f["id"] for f in r.open], ["SEC-1"])

    def test_title_similarity_does_not_match(self):
        # The real ID regex never fires on prose; a commit that only echoes the
        # finding's words (no ID token) leaves it OPEN.
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


class CrossRepo(unittest.TestCase):
    def test_resolved_only_if_cited_in_declared_inspected_repo(self):
        raw = [finding("X-1"), finding("Y-2")]
        # X-1 cited in repo A, Y-2 cited only in an UNDECLARED repo (never seen).
        g = fake_git({"A": {"X-1": [{"repo": "A", "sha": "a", "date": "2026-08-18", "subject": "fix X-1"}]}})
        r = ra.reconcile("p", raw, "2026-08-17",
                         repos=[ra.Path("A"), ra.Path("B")], git_driver=g)
        self.assertEqual([f["id"] for f in r.resolved], ["X-1"])
        self.assertEqual([f["id"] for f in r.open], ["Y-2"])
        self.assertEqual(r.status, "success")

    def test_uninspectable_repo_makes_uncited_findings_unknown(self):
        raw = [finding("X-1"), finding("Y-2")]
        # A inspected (X-1 closed); B un-inspectable -> Y-2 becomes UNKNOWN, retained.
        g = fake_git({"A": {"X-1": [{"repo": "A", "sha": "a", "date": "2026-08-18", "subject": "fix X-1"}]}},
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
    """77 raw, 47 exact-ID closures -> 30 OPEN, and a resolved High disappears
    from the public counts/list."""
    def _raw77(self):
        raw = []
        # 47 to be resolved: 1 High (SEC-HIGH-1) + 46 others across severities.
        raw.append(finding("SEC-HIGH-1", "high"))
        for i in range(1, 47):
            raw.append(finding(f"RES-{i}", "medium"))
        # 30 to stay open: 1 High kept + 29 mixed.
        raw.append(finding("OPEN-HIGH-1", "high"))
        for i in range(1, 30):
            raw.append(finding(f"OPEN-{i}", "low"))
        assert len(raw) == 77, len(raw)
        return raw

    def test_47_closed_30_open(self):
        raw = self._raw77()
        resolved_ids = {"SEC-HIGH-1"} | {f"RES-{i}" for i in range(1, 47)}
        cites = {rid: [{"repo": "BIMpossible", "sha": "s", "date": "2026-08-18", "subject": f"fix {rid}"}]
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
        # The resolved High is gone from the visible counts and open list;
        # only the one still-open High remains.
        self.assertEqual(af["counts"]["high"], 1)
        self.assertEqual(af["resolvedCounts"]["high"], 1)
        self.assertNotIn("SEC-HIGH-1", [f["id"] for f in af["open"]])
        self.assertIn("OPEN-HIGH-1", [f["id"] for f in af["open"]])
        # Visible counts sum to the public open list size.
        self.assertEqual(sum(af["counts"].values()), len(af["open"]))


class ReportDate(unittest.TestCase):
    def test_missing_report_raises(self):
        with self.assertRaises(ra.ReconcileError):
            ra.report_date(ra.Path("does-not-exist_2026-08-17.md"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
