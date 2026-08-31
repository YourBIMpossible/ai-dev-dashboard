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
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

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
    def _run(self, current_phases, ledger_rows, allow_defaults=False):
        return sl.build_progress({"phases": current_phases}, ledger_rows,
                                 allow_defaults=allow_defaults)["phases"]

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

    def test_new_phase_absent_from_data_js_is_seeded(self):
        # a ledger row with NO record in data.js is genuinely new: safe defaults, no error.
        out = self._run([], [_ledger("4", "X", "ACTIVE")])[0]
        self.assertEqual(out["id"], "P4")
        self.assertEqual(out["bucket"], "active")
        self.assertEqual(out["weight"], 1)

    def test_defaults_seeded_when_absent_under_migration_flag(self):
        # pre-migration records (present, but never carried the schema) get safe defaults
        # ONLY under the explicit opt-in; the default path refuses - see FieldLossIsFatal.
        out = self._run([{"name": "P4 X", "pct": 96}], [_ledger("4", "X")],
                        allow_defaults=True)[0]
        self.assertEqual(out["id"], "P4")
        self.assertEqual(out["bucket"], "active")
        self.assertEqual(out["weight"], 1)
        self.assertEqual(out["pct"], 96)

    def test_unknown_bucket_defaults_to_active_under_migration_flag(self):
        out = self._run([{"id": "P4", "bucket": "bogus", "name": "P4 X", "pct": 1}],
                        [_ledger("4", "X")], allow_defaults=True)[0]
        self.assertEqual(out["bucket"], "active")

    def test_all_valid_buckets_preserved(self):
        for b in sl.VALID_BUCKETS:
            out = self._run([{"id": "P4", "bucket": b, "weight": 1,
                              "name": "P4 X", "pct": 1}], [_ledger("4", "X")])[0]
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
        out = self._run(cur, [_ledger("0-2", "Foundation")], allow_defaults=True)[0]
        self.assertEqual(out["id"], "P0-2")
        self.assertEqual(out["pct"], 100)
        self.assertTrue(out["tasks"])

    def test_optional_metadata_absent_stays_absent(self):
        # Only genuinely per-phase optional keys belong here. `baselineCohorts` is a
        # PROJECT-level registry, never a phase field — its ownership/survival is covered
        # positively by ProjectLevelRegistriesSurviveRender below, not by a trivial
        # per-phase absence check that would pass vacuously.
        out = self._run([{"id": "P4", "bucket": "active", "weight": 1,
                          "name": "P4 X", "pct": 1}], [_ledger("4", "X")])[0]
        for k in ("ratifiedAt", "evidenceUpdatedAt", "scoreBasis"):
            self.assertNotIn(k, out)

    def test_bad_curated_weight_repaired_under_migration_flag(self):
        out = self._run([{"id": "P4", "bucket": "active", "weight": 0,
                          "name": "P4 X", "pct": 1}],
                        [_ledger("4", "X")], allow_defaults=True)[0]
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


class FieldLossIsFatal(unittest.TestCase):
    """Regression for the 2026-08-31 completion-model wipe.

    The scheduled refresh ran a stale sync_ledgers.py that emitted no completion-model
    fields, and every later run would have happily rebuilt those stripped phases with
    `bucket: "active", weight: 1` — turning one bad generation into a permanently
    all-active scope model (P5 held, P10/P16 conditional, P12 placeholder, P19 proposed
    all silently promoted). Losing curated fields must ABORT the render, not default.
    """

    def _build(self, current_phases, ledger_rows, **kw):
        return sl.build_progress({"phases": current_phases}, ledger_rows, **kw)

    def test_stripped_phases_abort_the_render(self):
        # exactly the shape the 2026-08-31 refresh produced: name/pct/note only.
        cur = [{"name": "P5 Hold", "pct": 15, "note": "ON HOLD"},
               {"name": "P12 Placeholder", "pct": 0, "note": "TBD"}]
        rows = [_ledger("5", "Hold", "ON HOLD"), _ledger("12", "Placeholder", "TBD")]
        with self.assertRaises(sl.CuratedFieldLoss) as ctx:
            self._build(cur, rows)
        msg = str(ctx.exception)
        # every affected phase is named, and the operator is told how to recover
        for pid in ("P5", "P12"):
            self.assertIn(pid, msg)
        self.assertIn("bucket", msg)
        self.assertIn("weight", msg)
        self.assertIn("data.js", msg)

    def test_missing_bucket_alone_is_fatal(self):
        with self.assertRaises(sl.CuratedFieldLoss):
            self._build([{"id": "P4", "weight": 1, "name": "P4 X", "pct": 1}],
                        [_ledger("4", "X")])

    def test_missing_weight_alone_is_fatal(self):
        with self.assertRaises(sl.CuratedFieldLoss):
            self._build([{"id": "P4", "bucket": "held", "name": "P4 X", "pct": 1}],
                        [_ledger("4", "X")])

    def test_invalid_bucket_is_fatal(self):
        # silently rewriting an unknown bucket to "active" is the same class of loss:
        # the validator downstream would then see a legitimate-looking "active".
        with self.assertRaises(sl.CuratedFieldLoss):
            self._build([{"id": "P4", "bucket": "bogus", "weight": 1,
                          "name": "P4 X", "pct": 1}], [_ledger("4", "X")])

    def test_invalid_weight_is_fatal(self):
        # bool is the trap: `True == 1`, so a naive numeric check would accept it.
        for bad in (0, -1, "3", None, True, float("nan"), float("inf")):
            with self.subTest(weight=bad):
                with self.assertRaises(sl.CuratedFieldLoss):
                    self._build([{"id": "P4", "bucket": "active", "weight": bad,
                                  "name": "P4 X", "pct": 1}], [_ledger("4", "X")])

    def test_healthy_phases_still_rebuild(self):
        # the guard must not fire on well-formed input (no false positives).
        out = self._build([{"id": "P4", "bucket": "conditional", "weight": 1,
                            "name": "P4 X", "pct": 30}], [_ledger("4", "X")])["phases"][0]
        self.assertEqual(out["bucket"], "conditional")

    def test_cli_refuses_to_write_a_stripped_data_js(self):
        """End-to-end on the ACTUAL regeneration path: `python sync_ledgers.py --data ...`
        against a stripped data.js must exit 1 with a clean message and leave the file
        byte-identical, rather than re-rendering the loss into place."""
        data = Path(sl.DEFAULT_DATA)
        ledgers = (Path(sl.DEFAULT_PHASE_LEDGER), Path(sl.DEFAULT_WAVE_LEDGER))
        if not all(p.is_file() for p in (data, *ledgers)):
            self.skipTest("ledger inputs not present in this environment")

        src = data.read_text(encoding="utf-8")
        # Strip the curated tokens wherever they sit — phases render both as multi-line
        # blocks and as single-line objects, so match the token, not the line.
        stripped, n_b = re.subn(r'\s*bucket: "[a-z]+",', "", src)
        stripped, n_w = re.subn(r"\s*weight: [0-9.]+,", "", stripped)
        self.assertGreater(n_b, 0, "test setup: no bucket fields found to strip")
        self.assertGreater(n_w, 0, "test setup: no weight fields found to strip")

        with tempfile.TemporaryDirectory() as d:
            data_path = Path(d) / "data.js"
            data_path.write_text(stripped, encoding="utf-8")
            proc = subprocess.run(
                [sys.executable, "sync_ledgers.py", "--data", str(data_path)],
                capture_output=True, text=True, encoding="utf-8",
                cwd=str(Path(__file__).parent),
            )
            after = data_path.read_text(encoding="utf-8")

        out = (proc.stdout or "") + (proc.stderr or "")
        self.assertEqual(proc.returncode, 1, f"expected clean failure exit 1, got:\n{out}")
        self.assertNotIn("Traceback", out, f"sync crashed instead of failing cleanly:\n{out}")
        self.assertIn("refusing to render", out)
        self.assertIn("P5", out)          # a held phase, named in the failure
        self.assertEqual(after, stripped, "sync wrote to data.js despite refusing")


class ValidatorFailsCleanlyOnBadCohortPct(unittest.TestCase):
    """Regression for the review finding: a cohort member without a valid numeric pct
    must produce a clean, actionable validation failure (naming project/cohort/phase and
    exit code 1) — never a KeyError traceback from `ph["pct"]`."""

    def test_missing_cohort_member_pct_is_clean_failure(self):
        src = Path(sl.DEFAULT_DATA).read_text(encoding="utf-8")
        # Drop the pct line of P0-2, a july-2026 cohort member (non-greedy: the first
        # `pct: N,` after the P0-2 id is P0-2's own).
        broken, n = re.subn(r'(id: "P0-2",[\s\S]*?)\n\s*pct: \d+,', r"\1", src, count=1)
        self.assertEqual(n, 1, "test setup: expected to remove exactly one P0-2 pct line")

        with tempfile.TemporaryDirectory() as d:
            data_path = Path(d) / "data.js"
            data_path.write_text(broken, encoding="utf-8")
            proc = subprocess.run(
                [sys.executable, "validate_dashboard.py", "--data", str(data_path)],
                capture_output=True, text=True, encoding="utf-8",
                cwd=str(Path(__file__).parent),
            )

        out = (proc.stdout or "") + (proc.stderr or "")
        self.assertEqual(proc.returncode, 1, f"expected clean failure exit 1, got:\n{out}")
        self.assertNotIn("Traceback", out, f"validator crashed instead of failing cleanly:\n{out}")
        self.assertNotIn("KeyError", out)
        self.assertIn("bimpossible", out)   # project named
        self.assertIn("july-2026", out)     # cohort named
        self.assertIn("P0-2", out)          # phase named


class ProjectLevelRegistriesSurviveRender(unittest.TestCase):
    """Regression for the review finding: the project-level baseline-cohort and phase-alias
    registries are NOT in `_PRESERVE_OPTIONAL` (that tuple is per-phase). They survive the
    nightly refresh only because render() splices in a rewritten `progress`/`waves` and
    leaves every other byte — the registries included — untouched. Guard both facts:
      1. render() is idempotent across two passes (the two-run refresh-drift invariant).
      2. After a full render, the bimpossible project still carries baselineCohorts +
         phaseAliases with their exact ids/members.
    """

    def setUp(self):
        self.data = Path(sl.DEFAULT_DATA)
        self.phase_ledger = Path(sl.DEFAULT_PHASE_LEDGER)
        self.wave_ledger = Path(sl.DEFAULT_WAVE_LEDGER)
        if not all(p.is_file() for p in (self.data, self.phase_ledger, self.wave_ledger)):
            self.skipTest("ledger inputs not present in this environment")

    def test_baselineCohorts_is_not_in_preserve_optional(self):
        # It is project-level; adding it to the per-phase tuple would be dead config.
        self.assertNotIn("baselineCohorts", sl._PRESERVE_OPTIONAL)
        self.assertNotIn("phaseAliases", sl._PRESERVE_OPTIONAL)

    def test_two_pass_render_is_idempotent_and_preserves_registries(self):
        _, spliced1, _ = sl.render(self.data, self.phase_ledger, self.wave_ledger)

        with tempfile.TemporaryDirectory() as d:
            data2 = Path(d) / "data.js"
            data2.write_text(spliced1, encoding="utf-8")

            # (1) idempotence: rendering the rendered output changes nothing.
            _, spliced2, _ = sl.render(data2, self.phase_ledger, self.wave_ledger)
            self.assertEqual(spliced1, spliced2, "render() is not a fixed point (drift)")

            # (2) the project-level registries survive the rebuild intact.
            parsed = sl.load_current(data2)
            bim = next(p for p in parsed["projects"] if p["id"] == "bimpossible")

            cohorts = bim.get("baselineCohorts")
            self.assertTrue(cohorts, "baselineCohorts wiped by refresh")
            july = next((c for c in cohorts if c.get("id") == "july-2026"), None)
            self.assertIsNotNone(july, "july-2026 cohort lost")
            self.assertEqual(july["phaseIds"],
                             ["P0-2", "P3", "P4", "P6", "P8", "P11", "P11.1"])
            self.assertEqual(bim.get("phaseAliases"), {"P11.1": "P11"})


if __name__ == "__main__":
    unittest.main(verbosity=2)
