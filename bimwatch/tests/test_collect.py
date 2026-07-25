"""Collector tests. A fake transport stands in for the network -- nothing here
touches the internet, so the suite runs identically offline and in CI."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

import pytest

from bimwatch import collect

NOW = datetime(2026, 7, 25, 6, 0, tzinfo=timezone.utc)

GOOD_FEED = b"""<?xml version="1.0"?><rss version="2.0"><channel>
  <item><title>Revit 2027 API changes</title><link>https://e.com/a</link>
    <pubDate>Mon, 21 Jul 2026 14:03:00 +0000</pubDate></item>
  <item><title>Second post</title><link>https://e.com/b</link>
    <pubDate>Tue, 22 Jul 2026 09:00:00 +0000</pubDate></item>
</channel></rss>"""

SOURCE = {"key": "test-src", "url": "https://feed.test/rss", "expect_days": 10}


def transport_returning(status, body=b"", headers=None, captured=None):
    def transport(url, request_headers):
        if captured is not None:
            captured.append((url, request_headers))
        return status, body, headers or {}
    return transport


def transport_raising(exc):
    def transport(url, headers):
        raise exc
    return transport


class TestFetchSource:
    def test_parses_items_and_records_success(self):
        items, health = collect.fetch_source(
            SOURCE, {}, transport=transport_returning(200, GOOD_FEED), now=NOW
        )

        assert [i["title"] for i in items] == ["Revit 2027 API changes", "Second post"]
        assert health["consecutive_failures"] == 0
        assert health["last_success"] == "2026-07-25T06:00:00Z"
        assert health["last_item_published"] == "2026-07-22T09:00:00Z"

    def test_stores_etag_and_last_modified_for_next_run(self):
        _, health = collect.fetch_source(
            SOURCE, {},
            transport=transport_returning(
                200, GOOD_FEED, {"ETag": '"abc123"', "Last-Modified": "Wed, 23 Jul 2026 00:00:00 GMT"}
            ),
            now=NOW,
        )
        assert health["etag"] == '"abc123"'
        assert health["last_modified"] == "Wed, 23 Jul 2026 00:00:00 GMT"

    def test_sends_conditional_headers_when_known(self):
        captured = []
        collect.fetch_source(
            SOURCE,
            {"etag": '"abc123"', "last_modified": "Wed, 23 Jul 2026 00:00:00 GMT"},
            transport=transport_returning(304, captured=captured),
            now=NOW,
        )
        _, headers = captured[0]
        assert headers["If-None-Match"] == '"abc123"'
        assert headers["If-Modified-Since"] == "Wed, 23 Jul 2026 00:00:00 GMT"

    def test_304_is_success_not_failure(self):
        """Nothing changed is a good outcome; it must not trip the stale badge."""
        items, health = collect.fetch_source(
            SOURCE, {"consecutive_failures": 0},
            transport=transport_returning(304), now=NOW,
        )
        assert items == []
        assert health["consecutive_failures"] == 0
        assert health["last_status"] == 304

    def test_http_error_records_failure_without_raising(self):
        items, health = collect.fetch_source(
            SOURCE, {}, transport=transport_returning(404), now=NOW
        )
        assert items == []
        assert health["consecutive_failures"] == 1
        assert "HTTP 404" in health["last_error"]

    def test_transport_exception_is_contained(self):
        items, health = collect.fetch_source(
            SOURCE, {}, transport=transport_raising(TimeoutError("timed out")), now=NOW
        )
        assert items == []
        assert health["consecutive_failures"] == 1
        assert "TimeoutError" in health["last_error"]

    def test_parked_domain_serving_html_is_a_failure_not_an_empty_feed(self):
        """This is exactly how The Building Coder died. It must register as broken."""
        html = b"<!DOCTYPE HTML><html><title>Domain parked</title></html>"
        items, health = collect.fetch_source(
            SOURCE, {}, transport=transport_returning(200, html), now=NOW
        )
        assert items == []
        assert health["consecutive_failures"] == 1

    def test_failures_accumulate_across_runs(self):
        health = {"consecutive_failures": 2}
        _, health = collect.fetch_source(
            SOURCE, health, transport=transport_returning(500), now=NOW
        )
        assert health["consecutive_failures"] == 3

    def test_success_clears_a_failure_streak(self):
        health = {"consecutive_failures": 5, "last_error": "HTTP 500"}
        _, health = collect.fetch_source(
            SOURCE, health, transport=transport_returning(200, GOOD_FEED), now=NOW
        )
        assert health["consecutive_failures"] == 0
        assert "last_error" not in health

    def test_last_item_published_does_not_go_backwards(self):
        """A feed that drops its newest entry must not rewind our staleness clock."""
        health = {"last_item_published": "2026-07-24T00:00:00Z"}
        _, health = collect.fetch_source(
            SOURCE, health, transport=transport_returning(200, GOOD_FEED), now=NOW
        )
        assert health["last_item_published"] == "2026-07-24T00:00:00Z"


class TestQualifyTitle:
    """GitHub release feeds title entries with the bare tag; that is unusable alone."""

    SOURCE = {"key": "revit-templates-releases", "name": "Revit add-in templates"}

    @pytest.mark.parametrize("bare", ["2027.0.0", "v4.8.1", "1.0", "2026.0.1-beta"])
    def test_bare_versions_gain_the_source_name(self, bare):
        assert collect.qualify_title(bare, self.SOURCE) == f"Revit add-in templates {bare}"

    @pytest.mark.parametrize("real", [
        "Revit 2027 API changes",
        "pyRevit 5.0 — what's new",
        "Release 2027.0.0 is out",
    ])
    def test_titles_containing_words_are_left_alone(self, real):
        assert collect.qualify_title(real, self.SOURCE) == real

    def test_falls_back_to_key_when_no_name(self):
        assert collect.qualify_title("2.0", {"key": "some-src"}) == "some-src 2.0"

    def test_empty_title_stays_empty(self):
        assert collect.qualify_title("", self.SOURCE) == ""

    def test_applied_during_fetch(self):
        feed = b"""<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
          <entry><title>2027.0.0</title>
          <link rel="alternate" href="https://github.com/x/releases/tag/2027.0.0"/>
          <updated>2026-07-20T00:00:00Z</updated></entry></feed>"""
        source = dict(self.SOURCE, url="https://github.test/releases.atom", expect_days=60)

        items, _ = collect.fetch_source(
            source, {}, transport=transport_returning(200, feed), now=NOW
        )
        assert items[0]["title"] == "Revit add-in templates 2027.0.0"


class TestIsStale:
    def test_not_stale_when_healthy_and_recent(self):
        health = {"consecutive_failures": 0, "last_item_published": "2026-07-22T00:00:00Z"}
        stale, reason = collect.is_stale(SOURCE, health, now=NOW)
        assert stale is False and reason == ""

    def test_stale_after_three_consecutive_failures(self):
        stale, reason = collect.is_stale(
            SOURCE, {"consecutive_failures": 3, "last_error": "HTTP 404"}, now=NOW
        )
        assert stale is True
        assert "3 consecutive failures" in reason

    def test_two_failures_is_not_yet_stale(self):
        stale, _ = collect.is_stale(SOURCE, {"consecutive_failures": 2}, now=NOW)
        assert stale is False

    def test_stale_when_fetch_succeeds_but_source_stopped_publishing(self):
        """The subtle death: HTTP 200 forever, but the blog is abandoned."""
        long_ago = (NOW - timedelta(days=40)).isoformat().replace("+00:00", "Z")
        stale, reason = collect.is_stale(
            SOURCE, {"consecutive_failures": 0, "last_item_published": long_ago}, now=NOW
        )
        assert stale is True
        assert "no new items in 40 days" in reason

    def test_quiet_but_within_tolerance_is_not_stale(self):
        recent = (NOW - timedelta(days=25)).isoformat().replace("+00:00", "Z")
        stale, _ = collect.is_stale(
            SOURCE, {"last_item_published": recent}, now=NOW
        )
        assert stale is False  # 25 days < 3 x 10

    def test_source_without_expect_days_is_never_time_stale(self):
        source = {"key": "k", "url": "u"}
        long_ago = (NOW - timedelta(days=400)).isoformat().replace("+00:00", "Z")
        stale, _ = collect.is_stale(source, {"last_item_published": long_ago}, now=NOW)
        assert stale is False


class TestCollectAll:
    def test_one_broken_source_does_not_stop_the_others(self):
        sources = [
            {"key": "good", "url": "https://good.test/rss", "expect_days": 10},
            {"key": "broken", "url": "https://broken.test/rss", "expect_days": 10},
        ]

        def transport(url, headers):
            if "broken" in url:
                raise ConnectionError("dns failure")
            return 200, GOOD_FEED, {}

        items, state = collect.collect_all(
            sources, {}, transport=transport, now=NOW, log=lambda *a: None
        )

        assert len(items) == 2  # the good source still delivered
        assert state["good"]["consecutive_failures"] == 0
        assert state["broken"]["consecutive_failures"] == 1

    def test_state_carries_stale_flag_for_the_dashboard(self):
        sources = [{"key": "dead", "url": "https://dead.test/rss", "expect_days": 10}]
        state = {"dead": {"consecutive_failures": 2}}

        _, updated = collect.collect_all(
            sources, state, transport=transport_returning(404), now=NOW, log=lambda *a: None
        )

        assert updated["dead"]["stale"] is True
        assert "consecutive failures" in updated["dead"]["stale_reason"]


class TestLoadSources:
    def test_disabled_sources_are_skipped(self, tmp_path):
        path = tmp_path / "sources.json"
        path.write_text(
            '{"sources": [{"key": "a", "url": "u", "enabled": true},'
            ' {"key": "b", "url": "u", "enabled": false}]}',
            encoding="utf-8",
        )
        assert [s["key"] for s in collect.load_sources(str(path))] == ["a"]

    def test_the_real_registry_is_valid_and_every_source_is_well_formed(self):
        """Guards the shipped sources.json against typos."""
        import os
        registry = os.path.join(os.path.dirname(__file__), "..", "sources.json")
        sources = collect.load_sources(registry)

        assert len(sources) >= 10
        keys = [s["key"] for s in sources]
        assert len(keys) == len(set(keys)), "duplicate source keys"
        for source in sources:
            assert source["url"].startswith("https://"), source["key"]
            assert source.get("expect_days", 0) > 0, source["key"]
            assert 0.1 <= source.get("weight", 1.0) <= 2.0, source["key"]


class TestStatePersistence:
    def test_round_trip(self, tmp_path):
        path = str(tmp_path / "state.json")
        collect.save_state(path, {"a": {"etag": "x"}})
        assert collect.load_state(path) == {"a": {"etag": "x"}}

    def test_missing_state_is_empty(self, tmp_path):
        assert collect.load_state(str(tmp_path / "nope.json")) == {}

    def test_corrupt_state_is_empty_rather_than_fatal(self, tmp_path):
        path = tmp_path / "state.json"
        path.write_text("not json", encoding="utf-8")
        assert collect.load_state(str(path)) == {}
