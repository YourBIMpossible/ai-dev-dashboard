"""parse_pct_block() contract + build_progress() pct precedence (review findings F-5/F-6/F-7).

Contract (also documented in REFRESH-SPEC.md):
  * no PCT-BEGIN anywhere            -> {} (data.js pct preserved)
  * exactly one BEGIN ... END block  -> {id: int}; `<id>: <int>` + optional `# comment`,
                                        blank lines ok, CRLF ok
  * HARD FAILURE (SystemExit naming the file and the problem) for: unparseable line,
    value > 100 (negative is unparseable), duplicate id, id not in known_ids,
    PCT-BEGIN with no PCT-END (it may never borrow a LATER block's terminator),
    more than one block, a stray PCT-END.

Everything runs on temp files / in-memory dicts: the real ledger and data.js are only
READ by the integration test, and that test skips cleanly when they are absent.
"""
import contextlib
import io
import sys
import tempfile
import unittest
import warnings
from pathlib import Path

import sync_ledgers as sl

KNOWN = {"P0-2", "P3", "P9", "P13"}


def _write(tmp: Path, text: str, newline: str = "\n") -> Path:
    p = tmp / "PHASE-STATUS.md"
    p.write_bytes(text.replace("\n", newline).encode("utf-8"))
    return p


class ParsePctBlock(unittest.TestCase):
    def setUp(self):
        self._td = tempfile.TemporaryDirectory()
        self.tmp = Path(self._td.name)
        self.addCleanup(self._td.cleanup)

    def parse(self, text, known=KNOWN, newline="\n"):
        return sl.parse_pct_block(_write(self.tmp, text, newline), known)

    def fails(self, text, *needles, known=KNOWN):
        with self.assertRaises(SystemExit) as cm:
            self.parse(text, known)
        msg = str(cm.exception.code)
        self.assertIn("PHASE-STATUS.md", msg)
        for n in needles:
            self.assertIn(n, msg)

    # ---- happy path -------------------------------------------------------- #
    def test_absent_block_returns_empty(self):
        self.assertEqual(self.parse("# ledger\n| a | b |\n"), {})

    def test_valid_block_comments_blank_lines_and_boundaries(self):
        text = ("intro\n<!-- PCT-BEGIN\nP0-2: 100\n\nP3: 0  # parked\nP9: 35\nPCT-END -->\ntail\n")
        self.assertEqual(self.parse(text), {"P0-2": 100, "P3": 0, "P9": 35})

    def test_crlf_input(self):
        text = "<!-- PCT-BEGIN\nP9: 35\nP13: 48 # x\nPCT-END -->\n"
        self.assertEqual(self.parse(text, newline="\r\n"), {"P9": 35, "P13": 48})

    def test_known_ids_none_skips_membership_check(self):
        p = _write(self.tmp, "<!-- PCT-BEGIN\nP99: 1\nPCT-END -->\n")
        self.assertEqual(sl.parse_pct_block(p, None), {"P99": 1})

    # ---- hard failures ----------------------------------------------------- #
    def test_unparseable_line_fails(self):
        self.fails("<!-- PCT-BEGIN\nP9 = 35\nPCT-END -->\n", "unparseable", "P9 = 35")

    def test_negative_value_is_unparseable(self):
        self.fails("<!-- PCT-BEGIN\nP9: -5\nPCT-END -->\n", "unparseable")

    def test_value_over_100_fails(self):
        self.fails("<!-- PCT-BEGIN\nP9: 101\nPCT-END -->\n", "P9", "101")

    def test_100_and_0_are_allowed(self):
        self.assertEqual(self.parse("<!-- PCT-BEGIN\nP9: 100\nP3: 0\nPCT-END -->\n"),
                         {"P9": 100, "P3": 0})

    def test_duplicate_id_fails(self):
        self.fails("<!-- PCT-BEGIN\nP9: 35\nP9: 40\nPCT-END -->\n", "P9", "twice")

    def test_unknown_id_fails(self):
        self.fails("<!-- PCT-BEGIN\nP77: 5\nPCT-END -->\n", "P77")

    def test_missing_pct_end_fails(self):
        self.fails("<!-- PCT-BEGIN\nP9: 35\n\nno terminator here\n", "PCT-END")

    def test_unterminated_block_never_borrows_a_later_blocks_terminator(self):
        # Regression (the non-greedy `.*?` used to span from the unterminated first
        # BEGIN to the SECOND block's PCT-END and silently misparse / mis-report).
        text = ("<!-- PCT-BEGIN\nP9: 35\n\nprose\n\n"
                "<!-- PCT-BEGIN\nP13: 48\nPCT-END -->\n")
        self.fails(text, "no PCT-END before the next PCT-BEGIN")

    def test_two_terminated_blocks_fail(self):
        text = ("<!-- PCT-BEGIN\nP9: 35\nPCT-END -->\n"
                "<!-- PCT-BEGIN\nP13: 48\nPCT-END -->\n")
        self.fails(text, "more than one")

    def test_stray_pct_end_without_begin_fails(self):
        self.fails("P9: 35\nPCT-END -->\n", "PCT-END")

    def test_stray_pct_end_after_a_good_block_fails(self):
        self.fails("<!-- PCT-BEGIN\nP9: 35\nPCT-END -->\nPCT-END -->\n", "PCT-END")

    def test_end_before_begin_fails(self):
        self.fails("PCT-END -->\n<!-- PCT-BEGIN\nP9: 35\n", "PCT-")

    # ---- --check / main(): malformed block is loud, nonzero, writes nothing - #
    def test_main_check_and_default_modes_fail_loudly_and_write_nothing(self):
        data = self.tmp / "data.js"
        ledger = _write(self.tmp, "<!-- PCT-BEGIN\nP9: 35\n")  # unterminated
        wave = self.tmp / "WAVE.md"
        wave.write_text("x\n", encoding="utf-8")
        data.write_text("// sentinel\n", encoding="utf-8")
        for extra in (["--check"], []):
            err = io.StringIO()
            argv = ["sync_ledgers.py", "--data", str(data), "--phase-ledger", str(ledger),
                    "--wave-ledger", str(wave), *extra]
            with contextlib.redirect_stderr(err):
                with self.assertRaises(SystemExit) as cm:
                    old, sys.argv = sys.argv, argv
                    try:
                        sl.main()
                    finally:
                        sys.argv = old
            self.assertNotIn(cm.exception.code, (0, None))
            self.assertEqual(data.read_text(encoding="utf-8"), "// sentinel\n")


class PctPrecedence(unittest.TestCase):
    PHASES = [
        {"key": "4", "name": "Assistant", "status": "CLOSED", "note": "n4", "num": "4"},
        {"key": "9", "name": "Ingest", "status": "ACTIVE", "note": "n9", "num": "9"},
    ]

    def _current(self, p4=96, p9=10):
        return {"label": "L", "phases": [
            {"id": "P4", "bucket": "active", "weight": 1, "name": "P4 Assistant",
             "pct": p4, "note": "x"},
            {"id": "P9", "bucket": "active", "weight": 1, "name": "P9 Ingest",
             "pct": p9, "note": "x"},
        ]}

    def _pcts(self, prog):
        return {p["id"]: p["pct"] for p in prog["phases"]}

    def test_override_wins_over_data_pct(self):
        out = sl.build_progress(self._current(), self.PHASES, pct_overrides={"P9": 35})
        self.assertEqual(self._pcts(out), {"P4": 96, "P9": 35})

    def test_phase_not_in_block_keeps_data_pct(self):
        out = sl.build_progress(self._current(), self.PHASES, pct_overrides={"P9": 35})
        self.assertEqual(self._pcts(out)["P4"], 96)

    def test_no_block_keeps_data_pct(self):
        for ov in (None, {}):
            out = sl.build_progress(self._current(), self.PHASES, pct_overrides=ov)
            self.assertEqual(self._pcts(out), {"P4": 96, "P9": 10})

    def test_override_of_zero_is_honoured(self):
        out = sl.build_progress(self._current(), self.PHASES, pct_overrides={"P9": 0})
        self.assertEqual(self._pcts(out)["P9"], 0)

    def test_repeated_run_is_a_fixed_point(self):
        for ov in ({"P9": 35}, {}, None):
            once = sl.build_progress(self._current(), self.PHASES, pct_overrides=ov)
            twice = sl.build_progress(once, self.PHASES, pct_overrides=ov)
            self.assertEqual(once, twice)


class RealLedgerIntegration(unittest.TestCase):
    """READ-ONLY: the committed PCT block must parse against the dashboard's ACTUAL
    phase-key set (P0-2, P3..P19 - not an assumed contiguous range)."""

    def test_committed_block_parses_with_real_phase_ids_and_covers_every_phase(self):
        ledger = sl.DEFAULT_PHASE_LEDGER
        if not ledger.is_file():
            self.skipTest(f"real phase ledger not present: {ledger}")
        phases = sl.parse_phase_ledger(ledger)
        ids = {f"P{ph['key']}" for ph in phases}
        block = sl.parse_pct_block(ledger, ids)
        if "PCT-BEGIN" not in ledger.read_text(encoding="utf-8"):
            self.skipTest("ledger carries no PCT block yet")
        missing = sorted(ids - set(block))
        self.assertEqual(missing, [], f"phases in the ledger table with no PCT entry: {missing}")
        self.assertLessEqual(set(block), ids)
        for pid, val in block.items():
            self.assertTrue(0 <= val <= 100, f"{pid}={val}")

        # Drift vs data.js is REPORTED, never failed (the nightly sync reconciles it).
        data = sl.DEFAULT_DATA
        if not data.is_file():
            return
        try:
            current = sl.load_current(data)
        except SystemExit:  # node unavailable / unparsable: not this test's concern
            return
        bim = next((p for p in current["projects"] if p["id"] == "bimpossible"), None)
        drift = []
        for ph in ((bim or {}).get("progress") or {}).get("phases", []):
            pid = ph.get("id")
            if pid in block and ph.get("pct") != block[pid]:
                drift.append(f"{pid}: data.js={ph.get('pct')} ledger={block[pid]}")
        if drift:
            warnings.warn("PCT drift (data.js vs ledger block): " + "; ".join(drift))


if __name__ == "__main__":
    unittest.main()
