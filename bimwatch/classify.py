"""Tier and score items against the owner's profile, using Claude.

Design commitments:

* **Never lose an item to a classification failure.** No key, an API outage, a rate
  limit, a malformed model response -- all degrade to ``tier: "unsorted"``. Unsorted
  items are still archived, still searchable, and get retried on the next run. The
  archive is the asset; the analysis is an enrichment of it.

* **Only classify what is new.** Items already carrying a classification are skipped,
  so a daily run costs a handful of items, not the whole archive.

* **The profile is the prompt.** `profile.md` is injected verbatim. Tuning relevance
  is editing prose, not code -- see the design spec.

The Anthropic client is injected, so the tests exercise every failure path without a
key and without network.
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone

MODEL = "claude-haiku-4-5-20251001"
BATCH_SIZE = 20
MAX_RETRIES = 3

VALID_TIERS = ("alert", "learn", "fyi", "noise")

SYSTEM_PROMPT = """You triage BIM and Autodesk industry news for one specific reader.

The reader's profile follows. Judge every item against THIS reader, not a general \
audience. A story that would headline an industry magazine may be noise for them, and \
an obscure API footnote may be their most important item of the week.

<reader_profile>
{profile}
</reader_profile>

For each item you receive, decide:

- tier: one of "alert", "learn", "fyi", "noise" -- defined in the profile above.
- relevance: 0-100. How much this matters to THIS reader. Be spread out: most items \
are 10-40, a genuinely important one is 80+. Do not cluster everything at 50.
- why: ONE sentence, max 25 words, addressed to the reader, saying why it matters to \
their work. For noise, say briefly why it is noise. Never restate the headline.
- topics: 1-3 short lowercase slugs, e.g. ["revit-api", "deprecation"].

Judge only from the title and summary given. Do not invent detail that is not there. \
If a summary is too thin to judge, use tier "fyi" and a low relevance rather than \
guessing high.

Return ONLY a JSON array, one object per item, in the same order, each shaped:
{{"id": "<the id given>", "tier": "...", "relevance": 0, "why": "...", "topics": []}}
No prose, no markdown fence."""


class ClassificationUnavailable(RuntimeError):
    """Raised internally when a batch cannot be classified; callers degrade."""


def load_profile(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as handle:
            return handle.read().strip()
    except OSError:
        return "(no profile provided -- judge relevance for a Revit add-in developer)"


def needs_classification(item: dict) -> bool:
    tier = (item.get("classification") or {}).get("tier")
    return tier in (None, "", "unsorted")


def anthropic_client(api_key: str):
    """Default client factory. Imported lazily so the module works with no SDK."""
    from anthropic import Anthropic

    return Anthropic(api_key=api_key)


def classify_items(items: list[dict], profile: str, *, client=None,
                   api_key: str | None = None, model: str = MODEL,
                   now: datetime | None = None, log=print) -> dict:
    """Classify every item needing it, in place. Returns a run summary.

    Absence of a key is an expected operating mode, not an error -- the collector
    still runs, the archive still grows, and the dashboard says classification is
    pending. This is what makes the system safe to deploy before secrets are wired.
    """
    now = now or datetime.now(timezone.utc)
    pending = [i for i in items if needs_classification(i)]
    if not pending:
        return {"classified": 0, "skipped": len(items), "failed": 0, "available": True}

    if client is None:
        api_key = api_key or os.environ.get("ANTHROPIC_API_KEY", "")
        if not api_key:
            log(f"  no ANTHROPIC_API_KEY -- leaving {len(pending)} items unsorted")
            return {"classified": 0, "skipped": 0, "failed": len(pending),
                    "available": False, "reason": "no api key"}
        try:
            client = anthropic_client(api_key)
        except ImportError:
            log("  anthropic SDK not installed -- leaving items unsorted")
            return {"classified": 0, "skipped": 0, "failed": len(pending),
                    "available": False, "reason": "sdk missing"}

    classified = failed = 0
    for start in range(0, len(pending), BATCH_SIZE):
        batch = pending[start:start + BATCH_SIZE]
        try:
            verdicts = _classify_batch(batch, profile, client, model)
        except Exception as exc:
            log(f"  batch {start // BATCH_SIZE + 1} failed ({type(exc).__name__}: {exc}); "
                "items stay unsorted and retry next run")
            failed += len(batch)
            continue

        for item in batch:
            verdict = verdicts.get(item["id"])
            if verdict is None:
                failed += 1
                continue
            item["classification"] = {
                **verdict,
                "model": model,
                "classified_at": now.isoformat().replace("+00:00", "Z"),
            }
            classified += 1

    return {"classified": classified, "skipped": len(items) - len(pending),
            "failed": failed, "available": True}


def _classify_batch(batch: list[dict], profile: str, client, model: str) -> dict:
    payload = [
        {
            "id": item["id"],
            "source": item.get("source", ""),
            "title": item.get("title", ""),
            "summary": (item.get("summary") or "")[:700],
        }
        for item in batch
    ]

    last_error: Exception | None = None
    for attempt in range(MAX_RETRIES):
        try:
            response = client.messages.create(
                model=model,
                max_tokens=4000,
                system=SYSTEM_PROMPT.format(profile=profile),
                messages=[{"role": "user", "content": json.dumps(payload, ensure_ascii=False)}],
            )
            text = "".join(
                block.text for block in response.content if getattr(block, "type", "") == "text"
            )
            return _parse_verdicts(text)
        except Exception as exc:  # network, rate limit, or unparseable response
            last_error = exc
            if attempt == MAX_RETRIES - 1:
                break
    raise ClassificationUnavailable(str(last_error))


def _parse_verdicts(text: str) -> dict:
    """Parse the model's JSON array, tolerating a stray fence, and validate hard.

    A malformed or out-of-range verdict is dropped rather than trusted: an item left
    unsorted is retried tomorrow, whereas a bad tier silently distorts the briefing.
    """
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[-1].rsplit("```", 1)[0]
    start, end = cleaned.find("["), cleaned.rfind("]")
    if start == -1 or end == -1:
        raise ValueError("no JSON array in response")

    parsed = json.loads(cleaned[start:end + 1])
    verdicts = {}
    for entry in parsed:
        if not isinstance(entry, dict) or not entry.get("id"):
            continue
        tier = entry.get("tier")
        if tier not in VALID_TIERS:
            continue
        try:
            relevance = int(entry.get("relevance", 0))
        except (TypeError, ValueError):
            continue
        verdicts[entry["id"]] = {
            "tier": tier,
            "relevance": max(0, min(100, relevance)),
            "why": str(entry.get("why", ""))[:300],
            "topics": [str(t)[:40] for t in (entry.get("topics") or [])][:3],
        }
    return verdicts
