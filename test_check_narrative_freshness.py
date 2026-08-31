"""Tests for check_narrative_freshness.py.

The regression that matters (2026-08-31 slop audit, LOW-1): a card whose
lastActivity.date was absent or unparseable was silently treated as "not stale",
counted in "checked N card(s); all narrative feeds current" and the script exited
0. An input that could not be measured must never render as a clean measurement.

Covered:
  * valid + current      -> evaluated, not stale, exit 0
  * valid + stale        -> evaluated, stale, exit 1
  * missing date         -> UNEVALUATED, named, exit 2
  * malformed date       -> UNEVALUATED, raw value shown, exit 2
  * stale + unevaluated  -> unknown dominates: exit 2, both reported
  * load failure         -> exit 2 and the previous output file is NOT overwritten
  * the payload separates cards / evaluated / unevaluated

The loader and the output path are injected, so no test runs node, reads the
real data.js, or touches the repo's narrative-freshness.js.

Run: python test_check_narrative_freshness.py   (stdlib only, pytest-compatible)
"""
import contextlib
import io
import json
import pathlib
import tempfile
import unittest

import check_narrative_freshness as nf


def project(pid, last_activity="2026-08-30", recent=("2026-08-29 did a thing",),
            name=None, status="active"):
    """A card as load_projects() yields it. last_activity=None -> no date at all."""
    la = {"date": last_activity} if last_activity is not None else None
    return {"id": pid, "name": name or pid.title(), "status": status,
            "lastActivity": la, "recent": list(recent)}


class RunResult:
    def __init__(self, code, stdout, stderr, out_path):
        self.code = code
        self.stdout = stdout
        self.stderr = stderr
        self.out_path = out_path

    @property
    def payload(self):
        text = self.out_path.read_text(encoding="utf-8")
        return json.loads(text.split("=", 1)[1].rstrip().rstrip(";"))


class NarrativeFreshnessTest(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self._tmp.cleanup)
        self.out = pathlib.Path(self._tmp.name) / "narrative-freshness.js"

    def run_main(self, projects=None, load=None):
        if load is None:
            def load():
                return projects
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            code = nf.main(load=load, out_path=self.out)
        return RunResult(code, out.getvalue(), err.getvalue(), self.out)

    # ---------------------------------------------------------- evaluated cards

    def test_valid_and_current_exits_zero(self):
        r = self.run_main([project("alpha", "2026-08-30", ["2026-08-29 note"])])
        self.assertEqual(r.code, 0)
        self.assertIn("checked 1 card(s); all narrative feeds current", r.stdout)
        self.assertEqual(r.payload["evaluated"], 1)
        self.assertEqual(r.payload["unevaluated"], [])
        self.assertTrue(r.payload["projects"]["alpha"]["evaluated"])
        self.assertFalse(r.payload["projects"]["alpha"]["stale"])

    def test_valid_and_stale_exits_one(self):
        r = self.run_main([project("alpha", "2026-08-30", ["2026-06-01 note"])])
        self.assertEqual(r.code, 1)
        self.assertIn("alpha", r.stdout)
        self.assertTrue(r.payload["projects"]["alpha"]["evaluated"])
        self.assertTrue(r.payload["projects"]["alpha"]["stale"])
        self.assertEqual(r.payload["evaluated"], 1)
        self.assertNotIn("all narrative feeds current", r.stdout)

    # -------------------------------------------------------- unevaluated cards

    def test_missing_last_activity_is_unevaluated_not_clean(self):
        r = self.run_main([project("alpha", None, ["2026-08-29 note"])])
        self.assertEqual(r.code, 2)
        self.assertIn("could NOT be evaluated", r.stderr)
        self.assertIn("alpha", r.stderr)
        self.assertFalse(r.payload["projects"]["alpha"]["evaluated"])
        self.assertEqual(r.payload["evaluated"], 0)
        self.assertEqual(r.payload["unevaluated"], ["alpha"])
        # The whole point: it must not be reported as a checked, current card.
        self.assertNotIn("all narrative feeds current", r.stdout)

    def test_malformed_last_activity_reports_the_raw_value(self):
        r = self.run_main([project("alpha", "last Tuesday", ["2026-08-29 note"])])
        self.assertEqual(r.code, 2)
        self.assertIn("last Tuesday", r.stderr)
        self.assertIn("no parseable lastActivity.date",
                      r.payload["projects"]["alpha"]["reason"])
        self.assertFalse(r.payload["projects"]["alpha"]["evaluated"])

    def test_unknown_dominates_stale(self):
        r = self.run_main([
            project("alpha", "2026-08-30", ["2026-06-01 note"]),   # stale
            project("beta", None, ["2026-08-29 note"]),            # unevaluated
            project("gamma", "2026-08-30", ["2026-08-29 note"]),   # current
        ])
        self.assertEqual(r.code, 2, "an unmeasurable card outranks a stale one")
        self.assertIn("alpha", r.stdout)          # stale still reported
        self.assertIn("beta", r.stderr)           # and so is the unknown
        self.assertEqual(r.payload["cards"], 3)
        self.assertEqual(r.payload["evaluated"], 2)
        self.assertEqual(r.payload["unevaluated"], ["beta"])

    def test_empty_recent_feed_is_stale_not_unevaluated(self):
        # A card with a git date but no dated narrative IS measurable: the
        # narrative is missing, which is precisely what stale means here.
        r = self.run_main([project("alpha", "2026-08-30", [])])
        self.assertEqual(r.code, 1)
        self.assertTrue(r.payload["projects"]["alpha"]["evaluated"])
        self.assertTrue(r.payload["projects"]["alpha"]["stale"])

    # ------------------------------------------------------------ load failures

    def test_load_failure_exits_two_and_preserves_previous_output(self):
        self.out.write_text("window.NARRATIVE_FRESHNESS = {};\n", encoding="utf-8")

        def load():
            raise nf.InputError("could not load data.js via node - boom")

        r = self.run_main(load=load)
        self.assertEqual(r.code, 2)
        self.assertIn("UNKNOWN", r.stderr)
        self.assertEqual(self.out.read_text(encoding="utf-8"),
                         "window.NARRATIVE_FRESHNESS = {};\n")

    def test_no_projects_reports_zero_not_success_language(self):
        r = self.run_main([])
        self.assertEqual(r.code, 0)
        self.assertEqual(r.payload["cards"], 0)
        self.assertEqual(r.payload["evaluated"], 0)


if __name__ == "__main__":
    unittest.main(verbosity=2)
