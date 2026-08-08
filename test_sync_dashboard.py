"""Tests for sync_dashboard.py's splice/patch machinery.

The prompt-budget suite that used to live here guarded the GitHub Models CLI
flow (413 tokens_limit_reached regression class); GitHub retired GitHub Models
on 2026-07-30 and that code was removed, so those tests went with it. What
remains covers the shared apply_patch path still used by sync_ledgers.py,
sync_activity.py, and the dashboard-update skill.

Run: python test_sync_dashboard.py   (stdlib only, also pytest-compatible)
"""
import unittest

import sync_dashboard as sd


def make_block(fields: dict) -> str:
    """Render a data.js-style project block: 6-space-indented top-level keys,
    matching _TOPKEY_RE's `^( {6})(\\w+):` shape."""
    lines = ["{"]
    for k, v in fields.items():
        lines.append(f"      {k}: {sd.to_js(v, 6)},")
    lines.append("    }")
    return "\n".join(lines)


BIG = "x" * 20_000
PROTECTED_BULK = ["item " + str(i) for i in range(600)]


class ApplyPatch(unittest.TestCase):
    def _card(self):
        return make_block({
            "phase": "Phase 7",
            "focus": "short focus line",
            "progress": PROTECTED_BULK,
            "waves": {"w1": "done"},
            "audit": BIG,
            "nextActions": ["a", "b"],
        })

    def test_untouched_fields_survive_byte_for_byte(self):
        card = self._card()
        patched = sd.apply_patch(card, {"phase": "Phase 8"})
        self.assertIn(BIG, patched)
        self.assertIn("item 599", patched)
        self.assertIn("Phase 8", patched)
        self.assertNotIn("Phase 7", patched)

    def test_unknown_key_is_skipped(self):
        card = self._card()
        patched = sd.apply_patch(card, {"invented": "value"})
        self.assertEqual(patched, card)

    def test_roundtrip_through_extract_block(self):
        card = self._card()
        data_js = ("/* PROJECT:p:START */\n    " + card +
                   ",\n    /* PROJECT:p:END */")
        i, j, block = sd.extract_block(data_js, "p")
        self.assertEqual(block, card)
        patched = sd.apply_patch(block, {"focus": "new focus"})
        self.assertIn("new focus", patched)
        self.assertIn(BIG, patched)


if __name__ == "__main__":
    unittest.main(verbosity=2)
