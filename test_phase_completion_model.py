"""Refresh-preservation regression tests for the Phase Completion Model v1 schema.

`sync_ledgers.build_progress()` rebuilds every bimpossible phase from the ledger on
each nightly refresh. Historically it preserved only `pct` and `tasks`; the completion
model adds `id`, `bucket`, `weight` (and optional `ratifiedAt`/`evidenceUpdatedAt`/
`scoreBasis`/`baselineCohorts`) that MUST also survive the rebuild — otherwise the
refresh silently wipes the whole scope model and the headline reverts to a flat average.

These tests guard that contract. Run: python test_phase_completion_model.py
(stdlib only, also pytest-compatible).
"""
import math
import unittest

import sync_ledgers as sl


def _ledger(key, name="Name", status="ACTIVE", note=""):
    """One parsed-ledger row, as parse_phase_ledger() would emit."""
    return {"num": key, "key": key, "name": name, "status": status, "note": note}


class WeightNormalization(unittest.TestCase):
    def test_valid_positive_kept(self):
        self.assertEqual(sl._normalize_weight(1), 1)
        self.assertEqual(sl._normalize_weight(2.5), 2.5)
        self.assertEqual(sl._normalize_weight(10), 10)

    def test_invalid_falls_back_to_one(self):
        for bad in (0, -1, -0.5, "3", None, True, False, [], {},
                    float("nan"), float("inf"), float("-inf")):
            self.assertEqual(sl._normalize_weight(bad), 1, f"weight {bad!r} -> 1")


class BuildProgressPreservation(unittest.TestCase):
    def _run(self, current_phases, ledger_rows):
        return sl.build_progress({"phases": current_phases}, ledger_rows)["phases"]

    def test_new_schema_fields_survive_rebuild(self):
        cur = [{
            "id": "P7", "bucket": "active", "weight": 3,
            "name": "P7 Old Name", "pct": 68, "note": "old note",
            "ratifiedAt": "2026-08-18", "evidenceUpdatedAt": "2026-08-30",
            "scoreBasis": "merged-evidence",
            "tasks": [{"label": "t", "status": "done"}],
        }]
        out = self._run(cur, [_ledger("7", "New Ledger Name", "ACTIVE", "fresh note")])[0]
        # curated completion-model fields survive verbatim
        self.assertEqual(out["id"], "P7")
        self.assertEqual(out["bucket"], "active")
        self.assertEqual(out["weight"], 3)
        self.assertEqual(out["pct"], 68)
        self.assertEqual(out["ratifiedAt"], "2026-08-18")
        self.assertEqual(out["evidenceUpdatedAt"], "2026-08-30")
        self.assertEqual(out["scoreBasis"], "merged-evidence")
        self.assertEqual(out["tasks"], [{"label": "t", "status": "done"}])
        # name + note are re-derived from the ledger (the fields sync OWNS)
        self.assertEqual(out["name"], "P7 New Ledger Name")
        self.assertIn("fresh note", out["note"])

    def test_defaults_seeded_when_absent(self):
        # a phase with no completion-model fields (pre-migration) gets safe defaults
        out = self._run([{"name": "P4 X", "pct": 96}], [_ledger("4", "X")])[0]
        self.assertEqual(out["id"], "P4")
        self.assertEqual(out["bucket"], "active")
        self.assertEqual(out["weight"], 1)
        self.assertEqual(out["pct"], 96)

    def test_unknown_bucket_defaults_to_active(self):
        out = self._run([{"id": "P4", "bucket": "bogus", "name": "P4 X", "pct": 1}],
                        [_ledger("4", "X")])[0]
        self.assertEqual(out["bucket"], "active")

    def test_all_valid_buckets_preserved(self):
        for b in sl.VALID_BUCKETS:
            out = self._run([{"id": "P4", "bucket": b, "name": "P4 X", "pct": 1}],
                            [_ledger("4", "X")])[0]
            self.assertEqual(out["bucket"], b)

    def test_id_is_primary_join_key(self):
        # id wins over number-parse: the curated pct is found via id even if the
        # ledger row's number differs from a stale/re-used name.
        cur = [{"id": "P7", "bucket": "held", "weight": 2,
                "name": "P7 whatever", "pct": 42}]
        out = self._run(cur, [_ledger("7", "Writeback")])[0]
        self.assertEqual(out["pct"], 42)
        self.assertEqual(out["bucket"], "held")
        self.assertEqual(out["weight"], 2)

    def test_number_fallback_when_no_id(self):
        # migration path: curated pct/tasks join by parsed number before ids exist
        cur = [{"name": "P0-2 Foundation", "pct": 100,
                "tasks": [{"label": "a", "status": "done"}]}]
        out = self._run(cur, [_ledger("0-2", "Foundation")])[0]
        self.assertEqual(out["id"], "P0-2")
        self.assertEqual(out["pct"], 100)
        self.assertTrue(out["tasks"])

    def test_optional_metadata_absent_stays_absent(self):
        out = self._run([{"id": "P4", "name": "P4 X", "pct": 1}], [_ledger("4", "X")])[0]
        for k in ("ratifiedAt", "evidenceUpdatedAt", "scoreBasis", "baselineCohorts"):
            self.assertNotIn(k, out)

    def test_bad_curated_weight_repaired_on_rebuild(self):
        out = self._run([{"id": "P4", "weight": 0, "name": "P4 X", "pct": 1}],
                        [_ledger("4", "X")])[0]
        self.assertEqual(out["weight"], 1)

    def test_build_progress_is_idempotent(self):
        # feeding build_progress's own output back in must be a fixed point (the
        # two-pass refresh-drift invariant, at the unit level).
        rows = [_ledger("0-2", "Foundation", "CLOSED"),
                _ledger("5", "Hold", "ON HOLD"),
                _ledger("11", "QA", "SHIPPED")]
        cur = [
            {"id": "P0-2", "bucket": "active", "weight": 1, "name": "P0-2 Foundation",
             "pct": 100, "note": "CLOSED"},
            {"id": "P5", "bucket": "held", "weight": 1, "name": "P5 Hold",
             "pct": 15, "note": "ON HOLD"},
            {"id": "P11", "bucket": "active", "weight": 1, "name": "P11 QA",
             "pct": 88, "note": "SHIPPED"},
        ]
        first = sl.build_progress({"phases": cur}, rows)
        second = sl.build_progress(first, rows)
        self.assertEqual(first, second)


if __name__ == "__main__":
    unittest.main(verbosity=2)
