"""summarize_changes(): the --check verdict must name the lagging ledger-derived field.

Regression for the 2026-09-02 closeout: `sync_ledgers.py --check` reported only
"(field-level changes in progress/waves)" when the sole difference was one phase's
ledger-derived `note` (PHASE-STATUS row edited after the morning refresh). The vague
verdict was indistinguishable from corruption without a manual render+diff.
"""
import unittest

import sync_ledgers as sl


def _phase(pid, name, note, pct=50, **extra):
    return {"id": pid, "bucket": "active", "weight": 1, "name": name, "note": note,
            "pct": pct, **extra}


class SummarizeChanges(unittest.TestCase):
    def _old(self, phases, waves=None):
        return {"progress": {"phases": phases},
                "waves": waves or {"summary": {"done": 1}, "updated": "2026-08-27"}}

    def test_identical_render_yields_no_changes(self):
        ph = [_phase("P4", "P4 Assistant", "CLOSED — a")]
        out = sl.summarize_changes(self._old(ph), {"phases": [dict(p) for p in ph]},
                                   {"summary": {"done": 1}, "updated": "2026-08-27"})
        self.assertEqual(out, [])

    def test_note_only_drift_is_named_by_phase(self):
        old = [_phase("P4", "P4 Assistant", "CLOSED — old")]
        new = [_phase("P4", "P4 Assistant", "CLOSED — new")]
        out = sl.summarize_changes(self._old(old), {"phases": new},
                                   {"summary": {"done": 1}, "updated": "2026-08-27"})
        self.assertEqual(out, ["phase P4: note changed"])

    def test_curated_fields_never_appear(self):
        # bucket/weight/ratifiedAt differ, but they are curated -> not ledger drift.
        old = [_phase("P4", "P4 Assistant", "n", bucket="active", weight=1, ratifiedAt="x")]
        new = [_phase("P4", "P4 Assistant", "n", bucket="held", weight=3, ratifiedAt="y")]
        out = sl.summarize_changes(self._old(old), {"phases": new},
                                   {"summary": {"done": 1}, "updated": "2026-08-27"})
        self.assertEqual(out, [])

    def test_rename_count_and_wave_fields(self):
        old = [_phase("P1", "P1 Old", "n"), _phase("P2", "P2 B", "n")]
        new = [_phase("P1", "P1 New", "n")]
        out = sl.summarize_changes(
            self._old(old, {"summary": {"done": 1}, "updated": "2026-08-27", "drift": []}),
            {"phases": new},
            {"summary": {"done": 2}, "updated": "2026-09-02", "drift": ["w1"]})
        self.assertEqual(out, [
            "phase name: 'P1 Old' -> 'P1 New'",
            "phase count: 2 -> 1",
            "wave summary: {'done': 1} -> {'done': 2}",
            "wave ledger date: 2026-08-27 -> 2026-09-02",
            "wave drift changed",
        ])


if __name__ == "__main__":
    unittest.main()
