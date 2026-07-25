"""Compose the weekly briefing from classified items. Pure -- no I/O, no network.

The briefing has a budget: five minutes of reading. That constraint is the whole
design. Ranking exists to decide what gets cut, not to decorate the list.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

# Per-section caps. Alerts are generous because missing one is the expensive failure;
# FYI is tight because that is where a briefing turns into a newsletter nobody reads.
MAX_ALERTS = 8
MAX_LEARNING = 6
MAX_FYI = 5


def compose(items: list[dict], sources: list[dict], *, now: datetime | None = None,
            window_days: int = 7) -> dict:
    """Build the weekly briefing over the trailing `window_days`."""
    now = now or datetime.now(timezone.utc)
    cutoff = now - timedelta(days=window_days)
    weights = {s["key"]: s.get("weight", 1.0) for s in sources}

    recent = [i for i in items if _in_window(i, cutoff)]
    ranked = sorted(recent, key=lambda i: _score(i, weights), reverse=True)

    alerts = [i for i in ranked if _tier(i) == "alert"][:MAX_ALERTS]
    learning = [i for i in ranked if _tier(i) == "learn"][:MAX_LEARNING]
    fyi = [i for i in ranked if _tier(i) == "fyi"][:MAX_FYI]
    unsorted = [i for i in ranked if _tier(i) == "unsorted"]

    return {
        "generated_at": now.isoformat().replace("+00:00", "Z"),
        "window_days": window_days,
        "window_start": cutoff.isoformat().replace("+00:00", "Z"),
        "counts": {
            "total": len(recent),
            "alert": sum(1 for i in recent if _tier(i) == "alert"),
            "learn": sum(1 for i in recent if _tier(i) == "learn"),
            "fyi": sum(1 for i in recent if _tier(i) == "fyi"),
            "noise": sum(1 for i in recent if _tier(i) == "noise"),
            "unsorted": len(unsorted),
        },
        "headline": _headline(recent, alerts, unsorted),
        "alerts": [_slim(i) for i in alerts],
        "learning": [_slim(i) for i in learning],
        "fyi": [_slim(i) for i in fyi],
        "unsorted_count": len(unsorted),
    }


def _headline(recent: list[dict], alerts: list[dict], unsorted: list[dict]) -> str:
    """One line that tells the truth about the week, including a boring one."""
    if not recent:
        return "Nothing new this week. Either the industry is quiet or a source has died — check for stale badges."
    if unsorted and not alerts and len(unsorted) == len(recent):
        return f"{len(recent)} new items, none triaged yet — classification did not run."
    if not alerts:
        return f"{len(recent)} new items, nothing that touches your work directly."
    if len(alerts) == 1:
        return f"One thing needs your attention: {alerts[0]['title']}"
    return f"{len(alerts)} items need your attention this week."


def _slim(item: dict) -> dict:
    """Only what the briefing renders. Keeps bimwatch.js small."""
    classification = item.get("classification") or {}
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "url": item.get("url"),
        "source": item.get("source"),
        "published": item.get("published"),
        "why": classification.get("why", ""),
        "relevance": classification.get("relevance", 0),
        "topics": classification.get("topics", []),
    }


def _tier(item: dict) -> str:
    return (item.get("classification") or {}).get("tier") or "unsorted"


def _score(item: dict, weights: dict) -> float:
    """Relevance, nudged by source weight and freshness.

    Recency is a mild tiebreaker, not a driver: a Monday API deprecation should still
    outrank a Friday puff piece.
    """
    classification = item.get("classification") or {}
    relevance = float(classification.get("relevance") or 0)
    weight = weights.get(item.get("source"), 1.0)
    return relevance * weight + _recency_bonus(item)


def _recency_bonus(item: dict) -> float:
    published = item.get("published")
    if not published:
        return 0.0
    try:
        moment = datetime.fromisoformat(published.replace("Z", "+00:00"))
    except ValueError:
        return 0.0
    age_days = (datetime.now(timezone.utc) - moment).days
    return max(0.0, 5.0 - age_days * 0.5)


def _in_window(item: dict, cutoff: datetime) -> bool:
    published = item.get("published")
    if not published:
        return False  # undated items never crowd a dated weekly briefing
    try:
        return datetime.fromisoformat(published.replace("Z", "+00:00")) >= cutoff
    except ValueError:
        return False


def stale_sources(sources: list[dict], health: dict) -> list[dict]:
    """Sources the dashboard should badge. Surfaced in the briefing on purpose:
    a dead source is news about your news."""
    out = []
    for source in sources:
        entry = health.get(source["key"], {})
        if entry.get("stale"):
            out.append({
                "key": source["key"],
                "name": source.get("name", source["key"]),
                "home": source.get("home", ""),
                "reason": entry.get("stale_reason", ""),
            })
    return out
