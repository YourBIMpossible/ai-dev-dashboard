"""Renderer tests: valid JS, bounded payload, and honest freshness."""

from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone

from bimwatch import render

NOW = datetime(2026, 7, 25, 6, 0, tzinfo=timezone.utc)
SOURCES = [{"key": "aps-blog", "name": "APS", "home": "https://aps.test", "category": "autodesk"}]
BRIEFING = {"headline": "One thing needs your attention", "alerts": [], "learning": [],
            "fyi": [], "counts": {}, "unsorted_count": 0}


def item(iid, tier="alert"):
    return {
        "id": iid, "title": f"Item {iid}", "url": f"https://e.com/{iid}",
        "source": "aps-blog", "published": "2026-07-24T00:00:00Z",
        "summary": "x" * 500,
        "classification": {"tier": tier, "relevance": 80, "why": "w", "topics": ["revit-api"]},
    }


def payload_from_js(js: str) -> dict:
    """Extract the assigned object so tests assert on data, not string formatting."""
    match = re.search(r"window\.DASHBOARD_BIMWATCH = (\{.*\});\s*$", js, re.S)
    assert match, "generated file does not assign window.DASHBOARD_BIMWATCH"
    return json.loads(match.group(1))


class TestRenderJs:
    def test_assigns_the_expected_global_and_is_valid_json(self):
        payload = payload_from_js(
            render.render_js([item("a")], BRIEFING, SOURCES, {}, [], now=NOW)
        )
        assert payload["generated_at"] == "2026-07-25T06:00:00Z"
        assert payload["briefing"]["headline"] == "One thing needs your attention"

    def test_banner_tells_the_reader_it_is_generated(self):
        js = render.render_js([], BRIEFING, SOURCES, {}, [], now=NOW)
        assert js.startswith("// bimwatch.js -- GENERATED")
        assert "Do not edit by hand" in js

    def test_recent_window_is_bounded(self, monkeypatch):
        monkeypatch.setattr(render, "RECENT_WINDOW", 10)
        archive = [item(str(n)) for n in range(50)]

        payload = payload_from_js(render.render_js(archive, BRIEFING, SOURCES, {}, [], now=NOW))

        assert len(payload["recent"]) == 10
        assert payload["archive_count"] == 50  # full count still reported honestly

    def test_summaries_are_truncated_in_the_browser_payload(self):
        payload = payload_from_js(render.render_js([item("a")], BRIEFING, SOURCES, {}, [], now=NOW))
        assert len(payload["recent"][0]["x"]) == 280

    def test_source_health_is_exposed_for_stale_badges(self):
        health = {"aps-blog": {"stale": True, "last_error": "HTTP 404",
                               "last_success": "2026-07-01T00:00:00Z"}}
        payload = payload_from_js(
            render.render_js([], BRIEFING, SOURCES, health, [], now=NOW)
        )
        source = payload["sources"][0]
        assert source["stale"] is True
        assert source["last_error"] == "HTTP 404"

    def test_missing_health_entry_renders_as_not_stale(self):
        payload = payload_from_js(render.render_js([], BRIEFING, SOURCES, {}, [], now=NOW))
        assert payload["sources"][0]["stale"] is False

    def test_unicode_survives_rendering(self):
        weird = dict(item("u"), title="Révit — naïve façade 建築")
        payload = payload_from_js(render.render_js([weird], BRIEFING, SOURCES, {}, [], now=NOW))
        assert payload["recent"][0]["t"] == "Révit — naïve façade 建築"


class TestSlimForBrowser:
    def test_uses_short_keys_and_drops_unused_fields(self):
        slim = render.slim_for_browser(item("a"))
        assert set(slim) == {"id", "t", "u", "s", "d", "x", "tier", "rel", "why", "tags"}

    def test_unclassified_item_renders_as_unsorted(self):
        bare = {"id": "a", "title": "T", "url": "u", "source": "s", "published": None}
        slim = render.slim_for_browser(bare)
        assert slim["tier"] == "unsorted" and slim["rel"] == 0

    def test_missing_summary_becomes_empty_string(self):
        slim = render.slim_for_browser({"id": "a", "title": "T", "url": "u"})
        assert slim["x"] == ""


class TestWriteAll:
    def test_writes_both_artefacts(self, tmp_path):
        sizes = render.write_all(
            str(tmp_path), [item("a")], BRIEFING, SOURCES, {}, [], now=NOW
        )
        assert set(sizes) == {"bimwatch.js", "bimwatch-archive.json"}
        assert os.path.exists(tmp_path / "bimwatch.js")
        assert os.path.exists(tmp_path / "bimwatch-archive.json")

    def test_archive_json_holds_everything_not_just_the_recent_window(self, tmp_path, monkeypatch):
        monkeypatch.setattr(render, "RECENT_WINDOW", 5)
        archive = [item(str(n)) for n in range(40)]

        render.write_all(str(tmp_path), archive, BRIEFING, SOURCES, {}, [], now=NOW)
        data = json.loads((tmp_path / "bimwatch-archive.json").read_text(encoding="utf-8"))

        assert data["count"] == 40 and len(data["items"]) == 40

    def test_creates_the_output_directory_if_absent(self, tmp_path):
        target = tmp_path / "nested" / "out"
        render.write_all(str(target), [], BRIEFING, SOURCES, {}, [], now=NOW)
        assert (target / "bimwatch.js").exists()
