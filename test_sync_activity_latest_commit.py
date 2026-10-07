"""sync_activity.sync_latest_commit(): position-independent refresh of git.latestCommit
(review finding F-7).

Defect: the old regex only matched when `latestCommit` was the FIRST key inside `git: {`,
so a card written `git: { branch: "main", latestCommit: "abc1234" }` silently went stale.
No real git: head_sha is monkeypatched.
"""
import unittest
from unittest import mock

import sync_activity as sa

OLD = "44b159b"
NEW = "abcdef1"


def card(git_body: str, extra: str = "") -> str:
    return ('{\n  id: "x",\n  oneLiner: "hello",\n  ' + extra +
            f'branch: null, git: {{ {git_body} }},\n  nextActions: ["a"]\n}}')


class SyncLatestCommit(unittest.TestCase):
    def run_sync(self, block, repos=("o/r",), sha=NEW):
        with mock.patch.object(sa, "head_sha", return_value=sha) as m:
            out = sa.sync_latest_commit(block, list(repos))
        return out, m

    def assert_only_sha_changed(self, before, after):
        self.assertEqual(before.replace(OLD, NEW), after)
        self.assertNotIn(OLD, after)
        self.assertEqual(len(before), len(after))

    def test_first_key(self):
        b = card(f'latestCommit: "{OLD}", branch: "main"')
        out, _ = self.run_sync(b)
        self.assert_only_sha_changed(b, out)

    def test_middle_key(self):
        b = card(f'branch: "main", latestCommit: "{OLD}", dirty: false')
        out, _ = self.run_sync(b)
        self.assert_only_sha_changed(b, out)

    def test_last_key(self):
        b = card(f'branch: "main", dirty: false, latestCommit: "{OLD}"')
        out, _ = self.run_sync(b)
        self.assert_only_sha_changed(b, out)

    def test_only_key_matches_real_card_shape(self):
        b = card(f'latestCommit: "{OLD}"')
        out, _ = self.run_sync(b)
        self.assert_only_sha_changed(b, out)

    def test_quoted_key_is_tolerated(self):
        b = card(f'"branch": "main", "latestCommit": "{OLD}"')
        out, _ = self.run_sync(b)
        self.assert_only_sha_changed(b, out)

    def test_other_keys_with_braces_and_strings(self):
        git = (f'note: "has }} brace and {{ and \\"latestCommit\\": \\"{OLD}\\" inside", '
               f'meta: {{ latestCommit: "deadbee", n: 1 }}, tags: ["a}}", "b"], '
               f'latestCommit: "{OLD}"')
        b = card(git)
        out, _ = self.run_sync(b)
        # only the DIRECT child latestCommit changes; the nested object and the strings do not
        self.assertEqual(out.count(NEW), 1)
        self.assertIn('meta: { latestCommit: "deadbee", n: 1 }', out)
        self.assertIn(f'\\"latestCommit\\": \\"{OLD}\\" inside', out)
        self.assertIn(f'latestCommit: "{NEW}" }}', out)

    def test_latestcommit_outside_git_object_is_untouched(self):
        b = ('{\n  oneLiner: "was latestCommit: \\"' + OLD + '\\" before",\n'
             '  latestCommit: "' + OLD + '",\n'
             f'  branch: "main", git: {{ branch: "main", latestCommit: "{OLD}" }}\n}}')
        out, _ = self.run_sync(b)
        self.assertEqual(out.count(NEW), 1)
        self.assertEqual(out.count(OLD), 2)
        self.assertIn(f'git: {{ branch: "main", latestCommit: "{NEW}" }}', out)

    def test_git_word_inside_a_string_is_not_the_git_object(self):
        b = ('{\n  oneLiner: "see git: { latestCommit: \\"' + OLD + '\\" } docs",\n'
             f'  git: {{ latestCommit: "{OLD}" }}\n}}')
        out, _ = self.run_sync(b)
        self.assertEqual(out.count(NEW), 1)
        self.assertIn(f'git: {{ latestCommit: "{NEW}" }}', out)
        self.assertIn('see git: { latestCommit: \\"' + OLD + '\\" } docs', out)

    def test_comments_are_ignored(self):
        b = card(f'/* git: {{ latestCommit: "{OLD}" }} */ branch: "m", // latestCommit: "{OLD}"\n'
                 f'latestCommit: "{OLD}"')
        out, _ = self.run_sync(b)
        self.assertEqual(out.count(NEW), 1)
        self.assertEqual(out.count(OLD), 2)  # both inside comments

    def test_absent_latestcommit_is_unchanged_and_head_not_needed(self):
        b = card('branch: "main"')
        out, _ = self.run_sync(b)
        self.assertEqual(out, b)

    def test_no_git_object_is_unchanged(self):
        b = '{ id: "x", latestCommit: "' + OLD + '" }'
        out, _ = self.run_sync(b)
        self.assertEqual(out, b)

    def test_multi_repo_card_is_skipped_without_lookup(self):
        b = card(f'latestCommit: "{OLD}"')
        out, m = self.run_sync(b, repos=("o/a", "o/b"))
        self.assertEqual(out, b)
        m.assert_not_called()

    def test_zero_repos_is_skipped(self):
        b = card(f'latestCommit: "{OLD}"')
        out, m = self.run_sync(b, repos=())
        self.assertEqual(out, b)
        m.assert_not_called()

    def test_head_sha_failure_keeps_block_unchanged(self):
        for falsy in (None, ""):
            b = card(f'branch: "main", latestCommit: "{OLD}"')
            out, _ = self.run_sync(b, sha=falsy)
            self.assertEqual(out, b)

    def test_non_sha_value_is_left_alone(self):
        b = card('branch: "main", latestCommit: null')
        out, _ = self.run_sync(b)
        self.assertEqual(out, b)

    def test_idempotent(self):
        b = card(f'branch: "main", latestCommit: "{OLD}"')
        once, _ = self.run_sync(b)
        twice, _ = self.run_sync(once)
        self.assertEqual(once, twice)

    def test_longer_existing_sha_is_replaced_whole(self):
        long_sha = "44b159b" + "0" * 33
        b = card(f'latestCommit: "{long_sha}"')
        out, _ = self.run_sync(b)
        self.assertEqual(out, card(f'latestCommit: "{NEW}"'))

    def test_unterminated_string_fails_safe(self):
        b = '{ git: { latestCommit: "' + OLD + '", note: "oops } }'
        out, _ = self.run_sync(b)
        self.assertEqual(out, b)


if __name__ == "__main__":
    unittest.main()
