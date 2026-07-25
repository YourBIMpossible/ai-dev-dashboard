"""Digest tests: ranking, caps, and telling the truth about empty or untriaged weeks."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

from bimwatch import digest

NOW = datetime(2026, 7, 25, 12, 0, tzinfo=timezone.utc)
SOURCES = [
    {"key": "aps-blog", "name": "APS", "weight": 1.5, "home": "https://aps.test"},
    {"key": "aec-magazine", "name": "AEC Mag", "weight": 0.9, "home": "https://aec.test"},
]


def item(iid, tier="fyi", relevance=50, days_ago=1, source="aps-blog", title=None):
    published = (NOW - timedelta(days=days_ago)).isoformat().replace("+00:00", "Z")
    return {
        "id": iid,
        "title": title or f"Item {iid}",
        "url": f"https://e.com/{iid}",
        "source": source,
        "published": published,
        "classification": {"tier": tier, "relevance": relevance,
                           "why": "matters", "topics": ["revit-api"]},
    }


class TestSectioning:
    def test_splits_items_by_tier(self):
        items = [item("a", "alert"), item("b", "learn"), item("c", "fyi"), item("d", "noise")]
        result = digest.compose(items, SOURCES, now=NOW)

        assert [i["id"] for i in result["alerts"]] == ["a"]
        assert [i["id"] for i in result["learning"]] == ["b"]
        assert [i["id"] for i in result["fyi"]] == ["c"]

    def test_noise_is_counted_but_never_rendered(self):
        items = [item("n", "noise") for _ in range(5)]
        result = digest.compose(items, SOURCES, now=NOW)

        assert result["counts"]["noise"] == 5
        assert result["alerts"] == [] and result["learning"] == [] and result["fyi"] == []

    def test_respects_per_section_caps(self, monkeypatch):
        monkeypatch.setattr(digest, "MAX_ALERTS", 2)
        items = [item(str(n), "alert", relevance=90 - n) for n in range(6)]
        result = digest.compose(items, SOURCES, now=NOW)
        assert len(result["alerts"]) == 2

    def test_slimmed_items_carry_only_what_renders(self):
        result = digest.compose([item("a", "alert")], SOURCES, now=NOW)
        assert set(result["alerts"][0]) == {
            "id", "title", "url", "source", "published", "why", "relevance", "topics"
        }


class TestWindow:
    def test_excludes_items_older_than_the_window(self):
        items = [item("recent", days_ago=2), item("old", days_ago=30)]
        result = digest.compose(items, SOURCES, now=NOW, window_days=7)
        assert [i["id"] for i in result["fyi"]] == ["recent"]

    def test_undated_items_never_crowd_the_weekly_briefing(self):
        undated = dict(item("u"), published=None)
        result = digest.compose([undated], SOURCES, now=NOW)
        assert result["counts"]["total"] == 0

    def test_unparseable_date_is_excluded_rather_than_crashing(self):
        broken = dict(item("b"), published="whenever")
        result = digest.compose([broken], SOURCES, now=NOW)
        assert result["counts"]["total"] == 0


class TestRanking:
    def test_higher_relevance_ranks_first(self):
        items = [item("low", "alert", relevance=20), item("high", "alert", relevance=95)]
        result = digest.compose(items, SOURCES, now=NOW)
        assert [i["id"] for i in result["alerts"]] == ["high", "low"]

    def test_source_weight_breaks_a_relevance_tie(self):
        items = [
            item("mag", "alert", relevance=60, source="aec-magazine"),
            item("aps", "alert", relevance=60, source="aps-blog"),
        ]
        result = digest.compose(items, SOURCES, now=NOW)
        assert [i["id"] for i in result["alerts"]] == ["aps", "mag"]

    def test_relevance_outweighs_recency(self):
        """A Monday deprecation must beat a Friday puff piece."""
        items = [
            item("important", "alert", relevance=95, days_ago=6),
            item("fresh", "alert", relevance=30, days_ago=0),
        ]
        result = digest.compose(items, SOURCES, now=NOW)
        assert [i["id"] for i in result["alerts"]] == ["important", "fresh"]

    def test_unknown_source_does_not_crash_scoring(self):
        items = [item("x", "alert", source="never-heard-of-it")]
        result = digest.compose(items, SOURCES, now=NOW)
        assert len(result["alerts"]) == 1


class TestHeadline:
    def test_quiet_week_mentions_the_stale_source_possibility(self):
        result = digest.compose([], SOURCES, now=NOW)
        assert "Nothing new" in result["headline"]
        assert "stale" in result["headline"]

    def test_single_alert_is_named_in_the_headline(self):
        items = [item("a", "alert", title="Revit 2027 drops .NET 8")]
        result = digest.compose(items, SOURCES, now=NOW)
        assert "Revit 2027 drops .NET 8" in result["headline"]

    def test_multiple_alerts_are_counted(self):
        items = [item(str(n), "alert") for n in range(3)]
        result = digest.compose(items, SOURCES, now=NOW)
        assert "3 items need your attention" in result["headline"]

    def test_no_alerts_says_so_plainly(self):
        result = digest.compose([item("a", "fyi")], SOURCES, now=NOW)
        assert "nothing that touches your work" in result["headline"]

    def test_fully_untriaged_week_admits_classification_did_not_run(self):
        """Never present unsorted items as though they were judged and found dull."""
        items = [dict(item(str(n)), classification={"tier": "unsorted"}) for n in range(4)]
        result = digest.compose(items, SOURCES, now=NOW)

        assert "classification did not run" in result["headline"]
        assert result["unsorted_count"] == 4


class TestStaleSources:
    def test_reports_stale_sources_with_reasons(self):
        health = {
            "aps-blog": {"stale": False},
            "aec-magazine": {"stale": True, "stale_reason": "3 consecutive failures: HTTP 404"},
        }
        stale = digest.stale_sources(SOURCES, health)

        assert len(stale) == 1
        assert stale[0]["name"] == "AEC Mag"
        assert "HTTP 404" in stale[0]["reason"]

    def test_healthy_registry_reports_nothing(self):
        assert digest.stale_sources(SOURCES, {"aps-blog": {"stale": False}}) == []

    def test_source_absent_from_health_is_not_stale(self):
        assert digest.stale_sources(SOURCES, {}) == []
