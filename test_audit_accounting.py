"""audit_accounting_problems() contract (docs/COVERAGE-AND-DISCLOSURE-POLICY.md section 1).

Rules under test (all hard failures in validate_dashboard.py):
  * every *Counts field is a severity histogram of non-negative ints;
  * rawCounts == open + awaitingIntegration + resolved + unknown, per severity;
  * counts == openCounts == the composition of open[];
  * closedLastRun <= resolved + carriedClosed (cards with rawCounts);
  * trend token in the vocabulary; `improving` needs verified closure when findings are
    awaiting integration (awaiting is not closure);
  * ingestStatus in the vocabulary; ingestDetail required for awaiting / partial / failed /
    unverified.

Pure in-memory cases, plus one integration test that the real data.js is clean (skips when
data.js or node is unavailable).
"""
import copy
import unittest
from pathlib import Path

import validate_dashboard as vd
from sync_ledgers import load_current

DATA_JS = Path(__file__).resolve().parent / "data.js"


def H(critical=0, high=0, medium=0, low=0, info=0):
    return {"critical": critical, "high": high, "medium": medium, "low": low, "info": info}


def card(**over):
    """A consistent card: raw 5 = 1 open + 2 awaiting + 1 resolved + 1 unknown (all low)."""
    a = {
        "counts": H(low=1),
        "openCounts": H(low=1),
        "rawCounts": H(low=5),
        "awaitingIntegrationCounts": H(low=2),
        "resolvedCounts": H(low=1),
        "unknownCounts": H(low=1),
        "carriedClosedCounts": H(low=3),
        "closedLastRun": 4,
        "trend": "improving",
        "ingestStatus": "success",
        "ingestDetail": "reconciled against origin/main abc1234.",
        "open": [{"id": "X1", "severity": "low", "title": "t"}],
    }
    a.update(over)
    return a


def problems(audit, pid="p"):
    return vd.audit_accounting_problems([{"id": pid, "audit": audit}])


class ConsistentCard(unittest.TestCase):
    def test_clean(self):
        self.assertEqual(problems(card()), [])

    def test_project_without_audit_is_skipped(self):
        self.assertEqual(vd.audit_accounting_problems([{"id": "p"}, {"id": "q", "audit": None}]), [])

    def test_message_names_the_project(self):
        msgs = problems(card(rawCounts=H(low=9)), pid="zed")
        self.assertTrue(msgs and all(m.startswith("[zed] audit:") for m in msgs))


class Histograms(unittest.TestCase):
    def test_negative(self):
        self.assertTrue(any("severity histogram" in m for m in problems(card(resolvedCounts=H(low=-1)))))

    def test_non_int(self):
        self.assertTrue(any("severity histogram" in m for m in problems(card(unknownCounts={"low": "1"}))))

    def test_bool_is_not_a_count(self):
        self.assertTrue(any("severity histogram" in m for m in problems(card(unknownCounts={"low": True}))))

    def test_unknown_severity_key(self):
        self.assertTrue(any("severity histogram" in m for m in problems(card(unknownCounts={"severe": 1}))))


class RawIdentity(unittest.TestCase):
    def test_raw_too_big(self):
        self.assertTrue(any("rawCounts.low=6" in m for m in problems(card(rawCounts=H(low=6)))))

    def test_raw_too_small(self):
        self.assertTrue(any("rawCounts.low=4" in m for m in problems(card(rawCounts=H(low=4)))))

    def test_per_severity(self):
        # totals match (5) but the severity split does not
        msgs = problems(card(rawCounts=H(medium=1, low=4)))
        self.assertTrue(any("rawCounts.medium=1" in m for m in msgs))

    def test_absent_histograms_count_as_zero(self):
        a = card()
        for k in ("awaitingIntegrationCounts", "carriedClosedCounts"):
            del a[k]
        a["rawCounts"] = H(low=3)  # 1 open + 1 resolved + 1 unknown
        a["closedLastRun"] = 1
        self.assertEqual(problems(a), [])

    def test_site_shape_raw_zero_with_carried_closure(self):
        a = card(rawCounts=H(), awaitingIntegrationCounts=H(), resolvedCounts=H(), unknownCounts=H(),
                 counts=H(), openCounts=H(), carriedClosedCounts=H(low=1), closedLastRun=1, open=[])
        self.assertEqual(problems(a), [])

    def test_legacy_card_without_raw_is_not_subject_to_identity(self):
        self.assertEqual(problems({"counts": H(low=1), "open": [{"severity": "low"}], "trend": "improving"}), [])


class OpenComposition(unittest.TestCase):
    def test_counts_must_equal_open_counts(self):
        self.assertTrue(any("must equal openCounts" in m for m in problems(card(counts=H(low=2)))))

    def test_open_list_length(self):
        self.assertTrue(any("open[] has 2 item(s)" in m for m in problems(card(open=[{}, {}]))))

    def test_open_list_severity_composition(self):
        msgs = problems(card(open=[{"id": "X1", "severity": "medium"}]))
        self.assertTrue(any("open[] has 1 medium" in m for m in msgs))

    def test_open_items_without_severity_checked_by_length_only(self):
        self.assertEqual(problems(card(open=[{"id": "X1"}])), [])


class ClosedLastRun(unittest.TestCase):
    def test_exceeds_evidenced_closures(self):
        # resolved 1 + carried 3 = 4 evidenced
        self.assertTrue(any("closedLastRun=5" in m for m in problems(card(closedLastRun=5))))

    def test_equal_to_evidenced_is_ok(self):
        self.assertEqual(problems(card(closedLastRun=4)), [])

    def test_may_be_below_cumulative_resolved(self):
        self.assertEqual(problems(card(closedLastRun=0, trend="stable")), [])

    def test_must_be_a_non_negative_int(self):
        self.assertTrue(any("closedLastRun must be" in m for m in problems(card(closedLastRun=-1))))
        self.assertTrue(any("closedLastRun must be" in m for m in problems(card(closedLastRun="4"))))

    def test_legacy_card_not_bounded(self):
        self.assertEqual(problems({"counts": H(), "open": [], "closedLastRun": 12, "trend": "improving"}), [])


class Trend(unittest.TestCase):
    def test_vocabulary(self):
        for t in ("improving", "flat", "worsening", "stable", "unknown", "recovered"):
            self.assertEqual(problems(card(trend=t)), [], t)

    def test_free_text_with_valid_leading_token(self):
        self.assertEqual(problems(card(trend="improving -- 0 Critical for the fourth consecutive run")), [])

    def test_invalid_token(self):
        self.assertTrue(any("trend" in m for m in problems(card(trend="soaring"))))

    def test_improving_with_only_awaiting_integration_is_rejected(self):
        a = card(rawCounts=H(low=3), resolvedCounts=H(), unknownCounts=H(), carriedClosedCounts=H(),
                 closedLastRun=0, trend="improving")
        self.assertTrue(any("no verified closure" in m for m in problems(a)))

    def test_unknown_is_the_honest_state_for_the_same_card(self):
        a = card(rawCounts=H(low=3), resolvedCounts=H(), unknownCounts=H(), carriedClosedCounts=H(),
                 closedLastRun=0, trend="unknown")
        self.assertEqual(problems(a), [])

    def test_improving_is_allowed_with_a_verified_closure(self):
        self.assertEqual(problems(card(trend="improving")), [])


class Ingest(unittest.TestCase):
    def test_status_vocabulary(self):
        for s in ("success", "partial", "failed", "none", "unverified"):
            self.assertEqual(problems(card(ingestStatus=s)), [], s)
        self.assertTrue(any("ingestStatus" in m for m in problems(card(ingestStatus="shipped"))))

    def test_detail_required_with_awaiting(self):
        a = card()
        del a["ingestDetail"]
        self.assertTrue(any("awaiting" in m for m in problems(a)))

    def test_detail_required_for_unverified(self):
        a = card(ingestStatus="unverified", awaitingIntegrationCounts=H(), rawCounts=H(low=3),
                 trend="unknown", ingestDetail="  ")
        self.assertTrue(any("'unverified'" in m for m in problems(a)))

    def test_detail_not_required_for_clean_success(self):
        a = card(awaitingIntegrationCounts=H(), rawCounts=H(low=3))
        del a["ingestDetail"]
        self.assertEqual(problems(a), [])


class RealData(unittest.TestCase):
    def test_current_data_js_is_clean(self):
        if not DATA_JS.exists():
            self.skipTest("data.js not present")
        try:
            current = load_current(DATA_JS)
        except Exception as exc:  # node missing or unparseable -> not this test's concern
            self.skipTest(f"cannot load data.js: {exc}")
        self.assertEqual(vd.audit_accounting_problems(current.get("projects", [])), [])

    def test_inputs_are_not_mutated(self):
        a = card()
        before = copy.deepcopy(a)
        problems(a)
        self.assertEqual(a, before)


if __name__ == "__main__":
    unittest.main()
