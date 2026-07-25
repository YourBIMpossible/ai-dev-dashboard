"""Parser tests. Fixtures are real bytes captured from the live sources on 2026-07-25.

Using real fixtures rather than hand-written XML is the point: hand-written samples
encode what we *think* the feeds look like, which is exactly the assumption most
likely to be wrong.
"""

from __future__ import annotations

import os
import pytest

from bimwatch.feedparse import (
    FeedParseError,
    clean_text,
    parse_date,
    parse_feed,
)

FIXTURES = os.path.join(os.path.dirname(__file__), "fixtures")

REAL_FEEDS = [
    ("rss2_revit_blog.xml", "revit-blog"),
    ("rss2_aps.xml", "aps-blog"),
    ("atom_pyrevit.xml", "pyrevit-releases"),
    ("atom_blogspot.xml", "revit-addons"),
]


def read_fixture(name: str) -> bytes:
    with open(os.path.join(FIXTURES, name), "rb") as handle:
        return handle.read()


@pytest.mark.parametrize("filename,source_key", REAL_FEEDS)
def test_real_feeds_yield_usable_items(filename, source_key):
    items = parse_feed(read_fixture(filename), source_key)

    assert items, f"{filename} produced no items"
    for item in items:
        assert item["title"].strip(), f"{filename}: empty title"
        assert item["url"].startswith("http"), f"{filename}: bad url {item['url']!r}"
        assert item["source"] == source_key
        # A date is optional by design, but if present it must be normalised UTC.
        if item["published"]:
            assert item["published"].endswith("Z"), item["published"]


@pytest.mark.parametrize("filename,source_key", REAL_FEEDS)
def test_summaries_are_plain_text(filename, source_key):
    """Feed bodies are HTML; the archive stores readable text."""
    for item in parse_feed(read_fixture(filename), source_key):
        assert "<script" not in item["summary"].lower()
        assert "<p>" not in item["summary"].lower()
        assert len(item["summary"]) <= 1201  # cap + ellipsis


def test_atom_prefers_alternate_link_over_self():
    """GitHub release entries carry both; we want the human-readable release page."""
    items = parse_feed(read_fixture("atom_pyrevit.xml"), "pyrevit-releases")
    assert all("/releases/tag/" in i["url"] for i in items), [i["url"] for i in items]


def test_rss_without_link_falls_back_to_absolute_guid():
    xml = b"""<?xml version="1.0"?><rss version="2.0"><channel>
      <item><title>No link here</title>
        <guid isPermaLink="true">https://example.com/post/1</guid></item>
    </channel></rss>"""
    (item,) = parse_feed(xml, "test")
    assert item["url"] == "https://example.com/post/1"


def test_item_missing_title_is_skipped_not_fatal():
    xml = b"""<?xml version="1.0"?><rss version="2.0"><channel>
      <item><link>https://example.com/a</link></item>
      <item><title>Good</title><link>https://example.com/b</link></item>
    </channel></rss>"""
    items = parse_feed(xml, "test")
    assert [i["title"] for i in items] == ["Good"]


def test_malformed_xml_raises_feedparse_error():
    with pytest.raises(FeedParseError, match="malformed XML"):
        parse_feed(b"<rss><channel><item>unclosed", "test")


def test_empty_response_raises():
    with pytest.raises(FeedParseError, match="empty response"):
        parse_feed(b"   ", "test")


def test_html_page_is_rejected_not_silently_empty():
    """A parked domain serving HTML must fail loudly -- this is how a dead source
    gets noticed. The Building Coder died exactly this way."""
    html_page = b"<!DOCTYPE HTML><html><head><title>Domain parked</title></head></html>"
    with pytest.raises(FeedParseError):
        parse_feed(html_page, "thebuildingcoder")


class TestDoctypeRejection:
    """See the security note in feedparse: DTDs are refused outright."""

    def test_billion_laughs_is_refused_before_parsing(self):
        bomb = b"""<?xml version="1.0"?><!DOCTYPE r [
          <!ENTITY a "AAAAAAAAAA"><!ENTITY b "&a;&a;&a;&a;&a;&a;&a;&a;&a;&a;">
        ]><rss version="2.0"><channel><item><title>&b;</title>
        <link>https://x.test/1</link></item></channel></rss>"""
        with pytest.raises(FeedParseError, match="DOCTYPE"):
            parse_feed(bomb, "hostile")

    def test_external_entity_is_refused_before_parsing(self):
        xxe = (
            b'<?xml version="1.0"?><!DOCTYPE r [<!ENTITY x SYSTEM '
            b'"file:///C:/Windows/win.ini">]><rss version="2.0"><channel>'
            b"<item><title>&x;</title><link>https://x.test/1</link></item>"
            b"</channel></rss>"
        )
        with pytest.raises(FeedParseError, match="DOCTYPE"):
            parse_feed(xxe, "hostile")

    def test_doctype_inside_escaped_body_is_not_a_false_positive(self):
        """A post *about* HTML must still parse, and keep its title intact."""
        xml = b"""<?xml version="1.0"?><rss version="2.0"><channel>
          <item><title>Writing &lt;!DOCTYPE html&gt; correctly</title>
          <link>https://example.com/doctype</link>
          <description>Start every page with &lt;!DOCTYPE html&gt;.</description>
          </item></channel></rss>"""
        (item,) = parse_feed(xml, "test")
        assert item["title"] == "Writing <!DOCTYPE html> correctly"


class TestTitleMarkupFidelity:
    """Titles are plain text per spec; escaped code in them must survive.

    Regression guard: ElementTree unescapes before we see the string, so a naive
    tag-stripper silently eats snippets. Revit API blogs post those constantly.
    """

    def test_rss_title_keeps_escaped_code_snippet(self):
        xml = b"""<?xml version="1.0"?><rss version="2.0"><channel>
          <item><title>Using &lt;Reference&gt; in the Revit API</title>
          <link>https://example.com/api</link></item></channel></rss>"""
        (item,) = parse_feed(xml, "test")
        assert item["title"] == "Using <Reference> in the Revit API"

    def test_atom_text_title_keeps_snippet(self):
        xml = b"""<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
          <entry><title>Filter with &lt;ElementId&gt;</title>
          <link rel="alternate" href="https://example.com/e"/></entry></feed>"""
        (item,) = parse_feed(xml, "test")
        assert item["title"] == "Filter with <ElementId>"

    def test_atom_html_typed_title_strips_markup(self):
        """type="html" means the markup really is markup."""
        xml = b"""<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
          <entry><title type="html">&lt;b&gt;Bold&lt;/b&gt; release</title>
          <link rel="alternate" href="https://example.com/e"/></entry></feed>"""
        (item,) = parse_feed(xml, "test")
        assert item["title"] == "Bold release"

    def test_body_still_strips_real_html(self):
        xml = b"""<?xml version="1.0"?><rss version="2.0"><channel>
          <item><title>Post</title><link>https://example.com/p</link>
          <description>&lt;p&gt;Hello &lt;a href="#"&gt;there&lt;/a&gt;&lt;/p&gt;</description>
          </item></channel></rss>"""
        (item,) = parse_feed(xml, "test")
        assert item["summary"] == "Hello there"


class TestIllegalControlCharacters:
    """Real feeds ship bytes XML 1.0 forbids. Repair beats losing the source.

    Observed live on 2026-07-25: AEC Magazine emits 0x1F mid-word ("the di<0x1F>erence")
    where an "ff" ligature was mangled upstream, making the document unparseable.
    """

    def test_stray_control_byte_does_not_kill_the_feed(self):
        xml = (
            b'<?xml version="1.0"?><rss version="2.0"><channel>'
            b"<item><title>the di\x1ference is negligible</title>"
            b"<link>https://e.com/a</link></item></channel></rss>"
        )
        (item,) = parse_feed(xml, "aec-magazine")
        assert item["title"] == "the dierence is negligible"

    def test_tab_newline_and_cr_are_preserved(self):
        xml = (
            b'<?xml version="1.0"?><rss version="2.0"><channel>'
            b"<item><title>a\tb</title><link>https://e.com/a</link>"
            b"<description>line1\nline2</description></item></channel></rss>"
        )
        (item,) = parse_feed(xml, "test")
        assert item["title"] == "a b"          # tab survives parse, collapses in cleanup
        assert item["summary"] == "line1 line2"

    def test_repair_does_not_mask_genuinely_broken_xml(self):
        with pytest.raises(FeedParseError, match="malformed XML"):
            parse_feed(b"<rss><channel><item>\x1funclosed", "test")


class TestParseDate:
    def test_rfc822_with_offset(self):
        assert parse_date("Mon, 21 Jul 2026 14:03:00 +0200") == "2026-07-21T12:03:00Z"

    def test_rfc822_gmt(self):
        assert parse_date("Tue, 22 Jul 2026 06:00:00 GMT") == "2026-07-22T06:00:00Z"

    def test_iso_with_z(self):
        assert parse_date("2026-07-21T14:03:00Z") == "2026-07-21T14:03:00Z"

    def test_iso_with_offset(self):
        assert parse_date("2026-07-21T14:03:00-05:00") == "2026-07-21T19:03:00Z"

    def test_naive_datetime_assumed_utc(self):
        assert parse_date("2026-07-21T14:03:00") == "2026-07-21T14:03:00Z"

    def test_unparseable_returns_none_rather_than_raising(self):
        assert parse_date("last Tuesday-ish") is None

    def test_empty_returns_none(self):
        assert parse_date("") is None
        assert parse_date(None) is None


class TestCleanText:
    def test_strips_tags_and_unescapes(self):
        assert clean_text("<p>Revit &amp; Forma</p>") == "Revit & Forma"

    def test_collapses_whitespace(self):
        assert clean_text("a\n\n   b\t c") == "a b c"

    def test_truncates_on_word_boundary_with_ellipsis(self):
        out = clean_text("alpha beta gamma delta", cap=12)
        assert out.endswith("…") and " " in out
        assert len(out) <= 13

    def test_empty_input(self):
        assert clean_text("") == ""
