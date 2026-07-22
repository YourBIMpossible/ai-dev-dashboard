"""Tests for sync_dashboard.py's prompt-size budget.

Regression suite for the 413 tokens_limit_reached failure class (GitHub Models
free tier caps EVERY request at ~8000 input tokens, regardless of the model's
context window — the 2026-06-30 gpt-4o switch did not lift it).

History of this failure class, so nobody "fixes" it a fifth time by capping one
contributor: 06-12 capped the docs; 06-23 capped the output; 06-30 switched
model (wrong premise) then stubbed the four protected fields. Each fix capped
the currently-largest contributor; none capped the TOTAL, so the next-largest
field (audit, 17k chars by 07-16) grew into the gap and the Workspace sync
failed again. The invariant tested here is the class fix: the assembled user
message NEVER exceeds INPUT_CHAR_BUDGET, whatever grows next.

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


BIG = "x" * 20_000          # a 20k-char field value (the "audit" scenario)
MED = "y" * 3_000
PROTECTED_BULK = ["item " + str(i) for i in range(600)]  # bulky progress-like list


class BuildPromptBudget(unittest.TestCase):
    def _card(self):
        return make_block({
            "phase": "Phase 7",
            "focus": "short focus line",
            "progress": PROTECTED_BULK,       # protected
            "waves": {"w1": "done"},          # protected
            "audit": BIG,                     # NOT protected — the 07-16 killer
            "recent": MED,
            "nextActions": ["a", "b"],
        })

    def test_user_msg_fits_budget_with_giant_unprotected_field(self):
        user_msg, blocked = sd.build_prompt(
            self._card(), docs="d" * sd.MAX_DOC_CHARS, sha="abc1234",
            log="\n".join(f"abc123{i} commit {i}" for i in range(15)),
            project="bimpossible",
        )
        self.assertLessEqual(
            len(user_msg), sd.INPUT_CHAR_BUDGET,
            f"user_msg is {len(user_msg)} chars; budget {sd.INPUT_CHAR_BUDGET}",
        )

    def test_protected_fields_always_stubbed(self):
        user_msg, _ = sd.build_prompt(self._card(), "docs", "abc", "log", "p")
        self.assertNotIn("item 599", user_msg)          # progress bulk gone
        self.assertIn("progress", user_msg)             # key still visible

    def test_giant_field_stubbed_and_fenced_when_over_budget(self):
        # Docs at their cap + giant card = the exact 2026-07-16 failure shape.
        # Stubbing is need-based: with small docs the same card fits and audit
        # stays fully visible (and writable) — test_small_card covers that side.
        user_msg, blocked = sd.build_prompt(
            self._card(), docs="d" * sd.MAX_DOC_CHARS, sha="abc",
            log="l" * 800, project="p")
        self.assertNotIn(BIG, user_msg)                 # bulk not sent
        self.assertIn("audit", blocked)                 # and fenced from writes

    def test_small_fields_survive_untouched(self):
        user_msg, blocked = sd.build_prompt(self._card(), "docs", "abc", "log", "p")
        self.assertIn("short focus line", user_msg)
        self.assertNotIn("focus", blocked)
        self.assertNotIn("phase", blocked)

    def test_small_card_needs_no_extra_stubbing(self):
        small = make_block({"phase": "P1", "focus": "f", "progress": ["a"],
                            "audit": "tiny"})
        user_msg, blocked = sd.build_prompt(small, "docs", "abc", "log", "p")
        self.assertEqual(blocked - sd.PROTECTED_FIELDS, set(),
                         "no non-protected field should be stubbed on a small card")
        self.assertIn("tiny", user_msg)

    def test_write_path_uses_original_block_not_stubs(self):
        """Stubs must exist only in the model's view; apply_patch runs against the
        original block, so unchanged big fields survive byte-for-byte."""
        card = self._card()
        patched = sd.apply_patch(card, {"phase": "Phase 8"})
        self.assertIn(BIG, patched)
        self.assertIn("Phase 8", patched)


class FenceIntegration(unittest.TestCase):
    def test_stubbed_field_dropped_like_protected(self):
        """A patch touching a stubbed field must be dropped by the same fence that
        guards PROTECTED_FIELDS (the model only saw a stub — a 'complete new
        value' from it would silently destroy the field's real content)."""
        card = make_block({"phase": "P", "audit": BIG * 2, "progress": ["a"]})
        _, blocked = sd.build_prompt(card, docs="d" * sd.MAX_DOC_CHARS,
                                     sha="abc", log="log", project="p")
        patch = {"phase": "P2", "audit": "rewritten-from-stub", "progress": "x"}
        kept = sd.fence_patch(patch, blocked)
        self.assertEqual(set(kept), {"phase"})


if __name__ == "__main__":
    unittest.main(verbosity=2)
