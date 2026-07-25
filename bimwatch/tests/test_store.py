"""Store tests: identity, idempotent ingest, retention, durable writes."""

from __future__ import annotations

import json
import os
from datetime import datetime, timedelta, timezone

import pytest

from bimwatch import store

NOW = datetime(2026, 7, 25, 6, 0, tzinfo=timezone.utc)


def item(url: str, title: str = "T", published: str | None = "2026-07-20T00:00:00Z",
         summary: str = "s") -> dict:
    return {"title": title, "url": url, "source": "test",
            "published": published, "summary": summary}


class TestCanonicalUrl:
    def test_strips_utm_and_other_tracking(self):
        got = store.canonical_url(
            "https://blogs.autodesk.com/revit/post?utm_source=x&utm_medium=y&fbclid=z"
        )
        assert got == "https://blogs.autodesk.com/revit/post"

    def test_keeps_meaningful_query_params(self):
        got = store.canonical_url("https://example.com/index.php?p=482")
        assert got == "https://example.com/index.php?p=482"

    def test_sorts_query_params_so_order_is_not_identity(self):
        a = store.canonical_url("https://e.com/x?b=2&a=1")
        b = store.canonical_url("https://e.com/x?a=1&b=2")
        assert a == b

    def test_normalises_scheme_host_www_and_trailing_slash(self):
        variants = [
            "http://www.Example.com/Post/",
            "https://example.com/Post",
            "https://WWW.example.com/Post/#section",
        ]
        assert len({store.canonical_url(v) for v in variants}) == 1

    def test_path_case_is_preserved(self):
        """Hosts are case-insensitive; paths are not."""
        assert store.canonical_url("https://e.com/AbC") != store.canonical_url("https://e.com/abc")

    def test_empty_url(self):
        assert store.canonical_url("") == ""


class TestIngest:
    def test_adds_new_items_with_id_and_default_classification(self):
        archive = []
        result = store.ingest(archive, [item("https://e.com/a")], now=NOW)

        assert result["added"] == 1
        assert len(archive) == 1
        assert archive[0]["id"] == store.item_id("https://e.com/a")
        assert archive[0]["classification"] == {"tier": "unsorted"}
        assert archive[0]["fetched_at"] == "2026-07-25T06:00:00Z"

    def test_reingesting_same_item_adds_nothing(self):
        archive = []
        store.ingest(archive, [item("https://e.com/a")], now=NOW)
        result = store.ingest(archive, [item("https://e.com/a")], now=NOW)

        assert result["added"] == 0
        assert len(archive) == 1

    def test_tracking_variants_are_the_same_item(self):
        archive = []
        store.ingest(archive, [item("https://e.com/a")], now=NOW)
        store.ingest(archive, [item("https://e.com/a?utm_source=twitter")], now=NOW)
        assert len(archive) == 1

    def test_existing_classification_survives_reingest(self):
        """The whole point: a re-served feed item must not lose its analysis."""
        archive = []
        store.ingest(archive, [item("https://e.com/a")], now=NOW)
        archive[0]["classification"] = {"tier": "alert", "relevance": 90}

        store.ingest(archive, [item("https://e.com/a", title="Edited title")], now=NOW)

        assert archive[0]["classification"] == {"tier": "alert", "relevance": 90}
        assert archive[0]["title"] == "Edited title"

    def test_backfills_a_summary_that_was_empty_on_first_publish(self):
        archive = []
        store.ingest(archive, [item("https://e.com/a", summary="")], now=NOW)
        store.ingest(archive, [item("https://e.com/a", summary="now written")], now=NOW)
        assert archive[0]["summary"] == "now written"

    def test_does_not_overwrite_a_good_summary_with_a_shorter_one(self):
        archive = []
        store.ingest(archive, [item("https://e.com/a", summary="full text")], now=NOW)
        store.ingest(archive, [item("https://e.com/a", summary="teaser")], now=NOW)
        assert archive[0]["summary"] == "full text"

    def test_items_without_url_are_dropped(self):
        archive = []
        result = store.ingest(archive, [item("")], now=NOW)
        assert result["added"] == 0 and archive == []


class TestPrune:
    def test_drops_items_older_than_retention(self):
        old = (NOW - timedelta(days=store.MAX_AGE_DAYS + 10)).isoformat().replace("+00:00", "Z")
        recent = (NOW - timedelta(days=5)).isoformat().replace("+00:00", "Z")
        archive = [item("https://e.com/old", published=old),
                   item("https://e.com/new", published=recent)]

        kept = store.prune(archive, now=NOW)

        assert [i["url"] for i in kept] == ["https://e.com/new"]

    def test_sorts_newest_first(self):
        archive = [
            item("https://e.com/1", published="2026-01-01T00:00:00Z"),
            item("https://e.com/3", published="2026-07-01T00:00:00Z"),
            item("https://e.com/2", published="2026-04-01T00:00:00Z"),
        ]
        kept = store.prune(archive, now=NOW)
        assert [i["url"] for i in kept] == [
            "https://e.com/3", "https://e.com/2", "https://e.com/1",
        ]

    def test_undated_items_are_kept_but_sort_last(self):
        archive = [item("https://e.com/undated", published=None),
                   item("https://e.com/dated", published="2026-07-01T00:00:00Z")]
        kept = store.prune(archive, now=NOW)
        assert [i["url"] for i in kept] == ["https://e.com/dated", "https://e.com/undated"]

    def test_enforces_item_cap(self, monkeypatch):
        monkeypatch.setattr(store, "MAX_ITEMS", 3)
        archive = [
            item(f"https://e.com/{n}", published=f"2026-07-{n:02d}T00:00:00Z")
            for n in range(1, 11)
        ]
        assert len(store.prune(archive, now=NOW)) == 3

    def test_unparseable_date_is_kept_rather_than_silently_dropped(self):
        archive = [item("https://e.com/x", published="not-a-date")]
        assert len(store.prune(archive, now=NOW)) == 1


class TestPersistence:
    def test_round_trip(self, tmp_path):
        path = str(tmp_path / "archive.json")
        archive = [dict(item("https://e.com/a"), id="abc")]

        store.save(path, archive, health={"test": {"ok": True}}, now=NOW)
        loaded = store.load(path)

        assert loaded == archive

    def test_saved_file_carries_freshness_and_health(self, tmp_path):
        path = str(tmp_path / "archive.json")
        store.save(path, [], health={"revit-blog": {"consecutive_failures": 2}}, now=NOW)

        payload = json.loads((tmp_path / "archive.json").read_text(encoding="utf-8"))

        assert payload["generated_at"] == "2026-07-25T06:00:00Z"
        assert payload["health"]["revit-blog"]["consecutive_failures"] == 2
        assert payload["count"] == 0

    def test_missing_file_loads_as_empty(self, tmp_path):
        assert store.load(str(tmp_path / "nope.json")) == []

    def test_corrupt_file_loads_as_empty_rather_than_raising(self, tmp_path):
        """A half-written archive costs history, not the next run."""
        path = tmp_path / "archive.json"
        path.write_text("{ this is not json", encoding="utf-8")
        assert store.load(str(path)) == []

    def test_save_leaves_no_temp_files_behind(self, tmp_path):
        path = str(tmp_path / "archive.json")
        store.save(path, [dict(item("https://e.com/a"), id="x")], now=NOW)
        leftovers = [p for p in os.listdir(tmp_path) if p.startswith(".archive-")]
        assert leftovers == []

    def test_existing_archive_survives_a_failed_write(self, tmp_path, monkeypatch):
        """Atomic replace: an exception mid-write must not truncate the good file."""
        path = str(tmp_path / "archive.json")
        store.save(path, [dict(item("https://e.com/good"), id="g")], now=NOW)

        def boom(*args, **kwargs):
            raise OSError("disk full")

        monkeypatch.setattr(store.os, "replace", boom)
        with pytest.raises(OSError):
            store.save(path, [dict(item("https://e.com/new"), id="n")], now=NOW)

        assert [i["url"] for i in store.load(path)] == ["https://e.com/good"]
