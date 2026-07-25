"""Fetch every enabled source, isolate failures, and track per-source health.

Two design rules drive this module:

1. **One bad source must never cost us the run.** Every fetch is wrapped; a 404, a
   timeout, a TLS error or a parked domain serving HTML degrades that source only.

2. **A dead source must become visible.** Silence from a feed looks exactly like a
   quiet week in the industry, which is how The Building Coder's disappearance went
   unnoticed for a long time. We record last-success, consecutive failures and
   last-item age so the dashboard can badge a source as stale.

The HTTP transport is injected so the tests never touch the network.
"""

from __future__ import annotations

import json
import os
import re
from datetime import datetime, timedelta, timezone

from .feedparse import FeedParseError, parse_feed

# GitHub's releases.atom titles entries with the bare tag -- "2027.0.0", "v4.8.1".
# On its own that is meaningless in a briefing, in a search result, and to the
# classifier. Where the title carries no words, we qualify it with the source name.
_BARE_VERSION = re.compile(r"^v?\d+(\.\d+)*[a-z0-9.\-+]*$", re.IGNORECASE)

# A plain browser User-Agent, deliberately with no bot-identifying suffix.
#
# Measured 2026-07-25 against blogs.autodesk.com: appending "BIMWatch/1.0 (+url)" --
# the polite, self-identifying form -- gets a hard 403 from Autodesk's WAF, while the
# identical UA without the suffix returns 200. Politeness is not an option the server
# offers. We stay well-behaved in the ways that actually matter instead: conditional
# GET so unchanged feeds cost a 304, one pass per day, and a hard size cap.
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)
TIMEOUT_SECONDS = 25
# Bounds the XML we hand to the parser. The largest real feed measured was ~490 KB.
MAX_BYTES = 8 * 1024 * 1024
STALE_FAILURE_STREAK = 3


class HttpError(RuntimeError):
    """Transport-level failure for one source."""


def requests_transport(url: str, headers: dict) -> tuple[int, bytes, dict]:
    """Default transport. Imported lazily so tests need no `requests` at all."""
    import requests

    response = requests.get(
        url, headers=headers, timeout=TIMEOUT_SECONDS, stream=True
    )
    body = b""
    for chunk in response.iter_content(64 * 1024):
        body += chunk
        if len(body) > MAX_BYTES:
            raise HttpError(f"response exceeded {MAX_BYTES} bytes")
    return response.status_code, body, dict(response.headers)


def load_sources(path: str) -> list[dict]:
    with open(path, "r", encoding="utf-8") as handle:
        data = json.load(handle)
    return [s for s in data.get("sources", []) if s.get("enabled", True)]


def load_state(path: str) -> dict:
    if not os.path.exists(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as handle:
            return json.load(handle)
    except (json.JSONDecodeError, OSError):
        return {}


def save_state(path: str, state: dict) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(state, handle, indent=1, sort_keys=True)


def fetch_source(source: dict, prior: dict, *, transport=requests_transport,
                 now: datetime | None = None) -> tuple[list[dict], dict]:
    """Fetch and parse one source. Never raises; returns (items, health).

    Conditional GET is used when we have an ETag or Last-Modified from last time.
    A 304 is a success with zero items, not a failure -- it means nothing changed.
    """
    now = now or datetime.now(timezone.utc)
    key = source["key"]
    health = dict(prior) if prior else {}

    headers = {"User-Agent": USER_AGENT, "Accept": "application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8"}
    if health.get("etag"):
        headers["If-None-Match"] = health["etag"]
    if health.get("last_modified"):
        headers["If-Modified-Since"] = health["last_modified"]

    try:
        status, body, response_headers = transport(source["url"], headers)
    except Exception as exc:
        return [], _record_failure(health, now, f"{type(exc).__name__}: {exc}"[:200])

    if status == 304:
        return [], _record_success(health, now, items=0, status=304)

    if status != 200:
        return [], _record_failure(health, now, f"HTTP {status}")

    try:
        items = parse_feed(body, key)
    except FeedParseError as exc:
        return [], _record_failure(health, now, str(exc)[:200])

    lowered = {k.lower(): v for k, v in (response_headers or {}).items()}
    if lowered.get("etag"):
        health["etag"] = lowered["etag"]
    if lowered.get("last-modified"):
        health["last_modified"] = lowered["last-modified"]

    for entry in items:
        entry["title"] = qualify_title(entry.get("title", ""), source)

    health = _record_success(health, now, items=len(items), status=200)
    newest = max((i["published"] for i in items if i.get("published")), default=None)
    if newest and newest > (health.get("last_item_published") or ""):
        health["last_item_published"] = newest
    return items, health


def qualify_title(title: str, source: dict) -> str:
    """Give bare version-number titles enough context to stand alone.

    "2027.0.0" -> "Revit add-in templates 2027.0.0". Without this, a release shows up
    in the briefing, in search results and in the classifier's input as a naked number,
    which is unreadable in the first two and unjudgeable in the third.
    """
    stripped = (title or "").strip()
    if not stripped or not _BARE_VERSION.match(stripped):
        return stripped
    name = source.get("name") or source.get("key", "")
    return f"{name} {stripped}".strip() if name else stripped


def _record_success(health: dict, now: datetime, *, items: int, status: int) -> dict:
    health["last_success"] = _iso(now)
    health["consecutive_failures"] = 0
    health["last_status"] = status
    health["last_item_count"] = items
    health.pop("last_error", None)
    return health


def _record_failure(health: dict, now: datetime, error: str) -> dict:
    health["consecutive_failures"] = health.get("consecutive_failures", 0) + 1
    health["last_error"] = error
    health["last_failure"] = _iso(now)
    return health


def is_stale(source: dict, health: dict, *, now: datetime | None = None) -> tuple[bool, str]:
    """Should the dashboard badge this source as stale, and why?

    Two independent signals: the fetch keeps failing, or the fetch succeeds but the
    source has stopped publishing well past its normal cadence. The second is the
    subtle one -- a feed can return 200 forever while its blog is abandoned.
    """
    now = now or datetime.now(timezone.utc)

    failures = health.get("consecutive_failures", 0)
    if failures >= STALE_FAILURE_STREAK:
        return True, f"{failures} consecutive failures: {health.get('last_error', 'unknown')}"

    last_item = health.get("last_item_published")
    expect_days = source.get("expect_days")
    if last_item and expect_days:
        try:
            published = datetime.fromisoformat(last_item.replace("Z", "+00:00"))
        except ValueError:
            return False, ""
        silent_days = (now - published).days
        if silent_days > expect_days * 3:
            return True, f"no new items in {silent_days} days (expects ~{expect_days})"

    return False, ""


def collect_all(sources: list[dict], state: dict, *, transport=requests_transport,
                now: datetime | None = None, log=print) -> tuple[list[dict], dict]:
    """Fetch every source. Returns (all_items, updated_state)."""
    now = now or datetime.now(timezone.utc)
    all_items: list[dict] = []
    updated: dict = dict(state)

    for source in sources:
        key = source["key"]
        items, health = fetch_source(source, state.get(key, {}), transport=transport, now=now)
        updated[key] = health

        stale, reason = is_stale(source, health, now=now)
        health["stale"] = stale
        health["stale_reason"] = reason

        if health.get("last_error"):
            log(f"  [FAIL] {key:26} {health['last_error']}")
        else:
            log(f"  [ ok ] {key:26} {len(items):3} items"
                + (f"  (STALE: {reason})" if stale else ""))
        all_items.extend(items)

    return all_items, updated


def _iso(moment: datetime) -> str:
    return moment.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
