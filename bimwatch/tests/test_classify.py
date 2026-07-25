"""Classifier tests -- every failure path exercised with a stub client, no network.

The dominant risk here is not a wrong tier, it is an item silently disappearing
because classification broke. These tests mostly assert that nothing is ever lost.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone

import pytest

from bimwatch import classify

NOW = datetime(2026, 7, 25, 6, 0, tzinfo=timezone.utc)
PROFILE = "A Revit add-in developer."


def item(iid: str, tier: str | None = None) -> dict:
    entry = {"id": iid, "title": f"Title {iid}", "summary": "s", "source": "aps-blog"}
    if tier:
        entry["classification"] = {"tier": tier}
    return entry


class StubBlock:
    def __init__(self, text):
        self.type, self.text = "text", text


class StubResponse:
    def __init__(self, text):
        self.content = [StubBlock(text)]


class StubClient:
    """Minimal stand-in for the Anthropic client."""

    def __init__(self, response_text=None, error=None):
        self._text, self._error = response_text, error
        self.calls = []
        self.messages = self

    def create(self, **kwargs):
        self.calls.append(kwargs)
        if self._error:
            raise self._error
        return StubResponse(self._text)


def verdict_json(ids, tier="learn", relevance=60):
    return json.dumps([
        {"id": i, "tier": tier, "relevance": relevance, "why": "because", "topics": ["revit-api"]}
        for i in ids
    ])


class TestHappyPath:
    def test_classifies_and_stamps_provenance(self):
        items = [item("a"), item("b")]
        client = StubClient(verdict_json(["a", "b"], tier="alert", relevance=88))

        result = classify.classify_items(items, PROFILE, client=client, now=NOW)

        assert result == {"classified": 2, "skipped": 0, "failed": 0, "available": True}
        assert items[0]["classification"]["tier"] == "alert"
        assert items[0]["classification"]["relevance"] == 88
        assert items[0]["classification"]["model"] == classify.MODEL
        assert items[0]["classification"]["classified_at"] == "2026-07-25T06:00:00Z"

    def test_already_classified_items_are_not_reclassified(self):
        """Keeps the daily run cheap and stops verdicts churning."""
        items = [item("a", tier="alert"), item("b")]
        client = StubClient(verdict_json(["b"]))

        result = classify.classify_items(items, PROFILE, client=client, now=NOW)

        assert result["classified"] == 1 and result["skipped"] == 1
        assert items[0]["classification"] == {"tier": "alert"}

    def test_profile_is_injected_into_the_system_prompt(self):
        client = StubClient(verdict_json(["a"]))
        classify.classify_items([item("a")], "PROFILE-SENTINEL", client=client, now=NOW)
        assert "PROFILE-SENTINEL" in client.calls[0]["system"]

    def test_batches_large_input(self, monkeypatch):
        monkeypatch.setattr(classify, "BATCH_SIZE", 2)
        items = [item(str(n)) for n in range(5)]
        client = StubClient(verdict_json([str(n) for n in range(5)]))

        classify.classify_items(items, PROFILE, client=client, now=NOW)

        assert len(client.calls) == 3  # 2 + 2 + 1


class TestDegradation:
    """Nothing may be lost. Unsorted items are retried on the next run."""

    def test_no_api_key_leaves_items_unsorted_and_reports_unavailable(self, monkeypatch):
        monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
        items = [item("a")]

        result = classify.classify_items(items, PROFILE, now=NOW, log=lambda *a: None)

        assert result["available"] is False
        assert result["reason"] == "no api key"
        assert classify.needs_classification(items[0])

    def test_api_error_leaves_that_batch_unsorted(self):
        items = [item("a")]
        client = StubClient(error=RuntimeError("rate limited"))

        result = classify.classify_items(items, PROFILE, client=client, now=NOW,
                                         log=lambda *a: None)

        assert result["failed"] == 1 and result["classified"] == 0
        assert classify.needs_classification(items[0])

    def test_one_failing_batch_does_not_stop_later_batches(self, monkeypatch):
        monkeypatch.setattr(classify, "BATCH_SIZE", 1)

        class FlakyClient(StubClient):
            def create(self, **kwargs):
                self.calls.append(kwargs)
                if len(self.calls) <= classify.MAX_RETRIES:
                    raise RuntimeError("boom")
                return StubResponse(verdict_json(["b"]))

        items = [item("a"), item("b")]
        classify.classify_items(items, PROFILE, client=FlakyClient(), now=NOW,
                                log=lambda *a: None)

        assert classify.needs_classification(items[0])          # first batch lost
        assert items[1]["classification"]["tier"] == "learn"    # second recovered

    def test_retries_before_giving_up(self):
        client = StubClient(error=RuntimeError("transient"))
        classify.classify_items([item("a")], PROFILE, client=client, now=NOW,
                                log=lambda *a: None)
        assert len(client.calls) == classify.MAX_RETRIES

    def test_missing_verdict_for_an_item_leaves_only_that_item_unsorted(self):
        items = [item("a"), item("b")]
        client = StubClient(verdict_json(["a"]))  # model forgot "b"

        result = classify.classify_items(items, PROFILE, client=client, now=NOW)

        assert result["classified"] == 1 and result["failed"] == 1
        assert items[0]["classification"]["tier"] == "learn"
        assert classify.needs_classification(items[1])


class TestVerdictParsing:
    def test_tolerates_a_markdown_fence(self):
        client = StubClient("```json\n" + verdict_json(["a"]) + "\n```")
        items = [item("a")]
        classify.classify_items(items, PROFILE, client=client, now=NOW)
        assert items[0]["classification"]["tier"] == "learn"

    def test_tolerates_prose_around_the_array(self):
        client = StubClient("Here you go:\n" + verdict_json(["a"]) + "\nHope that helps!")
        items = [item("a")]
        classify.classify_items(items, PROFILE, client=client, now=NOW)
        assert items[0]["classification"]["tier"] == "learn"

    def test_invalid_tier_is_rejected_not_trusted(self):
        """A bad tier would silently distort the briefing; unsorted retries instead."""
        client = StubClient(json.dumps([{"id": "a", "tier": "URGENT!!", "relevance": 90}]))
        items = [item("a")]
        classify.classify_items(items, PROFILE, client=client, now=NOW)
        assert classify.needs_classification(items[0])

    def test_relevance_is_clamped_to_range(self):
        client = StubClient(json.dumps(
            [{"id": "a", "tier": "alert", "relevance": 900, "why": "w", "topics": []}]
        ))
        items = [item("a")]
        classify.classify_items(items, PROFILE, client=client, now=NOW)
        assert items[0]["classification"]["relevance"] == 100

    def test_non_numeric_relevance_is_rejected(self):
        client = StubClient(json.dumps(
            [{"id": "a", "tier": "alert", "relevance": "very high"}]
        ))
        items = [item("a")]
        classify.classify_items(items, PROFILE, client=client, now=NOW)
        assert classify.needs_classification(items[0])

    def test_topics_are_capped(self):
        client = StubClient(json.dumps([{
            "id": "a", "tier": "fyi", "relevance": 10, "why": "w",
            "topics": ["a", "b", "c", "d", "e"],
        }]))
        items = [item("a")]
        classify.classify_items(items, PROFILE, client=client, now=NOW)
        assert len(items[0]["classification"]["topics"]) == 3

    def test_garbage_response_leaves_items_unsorted(self):
        client = StubClient("I'm sorry, I can't help with that.")
        items = [item("a")]
        result = classify.classify_items(items, PROFILE, client=client, now=NOW,
                                         log=lambda *a: None)
        assert result["failed"] == 1
        assert classify.needs_classification(items[0])


class TestNeedsClassification:
    @pytest.mark.parametrize("existing,expected", [
        (None, True), ("unsorted", True), ("", True),
        ("alert", False), ("noise", False),
    ])
    def test_detects_pending_items(self, existing, expected):
        entry = item("a")
        if existing is not None:
            entry["classification"] = {"tier": existing}
        assert classify.needs_classification(entry) is expected
