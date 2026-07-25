"""The archive: identity, dedupe, retention, and JSON persistence.

The store owns *what counts as the same item*, because that is the rule dedupe turns
on. Feeds republish the same post with tracking parameters, protocol changes, and
trailing-slash drift; canonicalisation is what stops the archive filling with
near-duplicates of the same Autodesk announcement.

Ingest is idempotent by construction: running the collector twice in one morning adds
nothing the second time. That matters because a retried GitHub Action is a normal
event, not an exceptional one.
"""

from __future__ import annotations

import hashlib
import json
import os
import tempfile
from datetime import datetime, timedelta, timezone
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

# Retention: whichever bound bites first. 18 months keeps "when did Autodesk announce
# X?" answerable across a couple of release cycles; the item cap keeps the JSON that
# the browser downloads from growing without limit.
MAX_AGE_DAYS = 548
MAX_ITEMS = 5000

# Tracking parameters carry no identity and differ per referrer.
_JUNK_PARAM_PREFIXES = ("utm_",)
_JUNK_PARAMS = {
    "fbclid", "gclid", "mc_cid", "mc_eid", "ref", "ref_src", "s", "share",
    "__hstc", "__hssc", "_hsenc", "_hsmi", "igshid", "spm",
}


def canonical_url(url: str) -> str:
    """Reduce a URL to its identity.

    Lowercase scheme/host, drop the fragment, strip tracking parameters, normalise a
    trailing slash, and upgrade http->https (feeds are inconsistent about protocol for
    what is the same page). Remaining query parameters are kept and sorted: some
    sources genuinely need them (?p=123, ?format=rss).
    """
    if not url:
        return ""
    parts = urlsplit(url.strip())

    scheme = "https" if parts.scheme in ("http", "https", "") else parts.scheme.lower()
    netloc = parts.netloc.lower()
    if netloc.startswith("www."):
        netloc = netloc[4:]

    keep = [
        (k, v)
        for k, v in parse_qsl(parts.query, keep_blank_values=False)
        if k.lower() not in _JUNK_PARAMS
        and not k.lower().startswith(_JUNK_PARAM_PREFIXES)
    ]
    query = urlencode(sorted(keep))

    path = parts.path or "/"
    if len(path) > 1 and path.endswith("/"):
        path = path.rstrip("/")

    return urlunsplit((scheme, netloc, path, query, ""))


def item_id(url: str) -> str:
    """Stable 16-hex identity for an item, derived from its canonical URL."""
    return hashlib.sha256(canonical_url(url).encode("utf-8")).hexdigest()[:16]


def ingest(archive: list[dict], incoming: list[dict], *, now: datetime | None = None) -> dict:
    """Merge newly fetched items into the archive in place-ish; returns a summary.

    Existing items win: an item already classified must not be reset to unsorted just
    because its feed re-served it. We refresh only fields that can legitimately
    improve -- a title correction, a summary that was empty on first publish.
    """
    now = now or datetime.now(timezone.utc)
    by_id = {item["id"]: item for item in archive if item.get("id")}

    added, updated = 0, 0
    for raw in incoming:
        url = raw.get("url", "")
        if not url:
            continue
        iid = item_id(url)
        existing = by_id.get(iid)

        if existing is None:
            item = dict(raw)
            item["id"] = iid
            item["url"] = url
            item["fetched_at"] = now.isoformat().replace("+00:00", "Z")
            item.setdefault("classification", {"tier": "unsorted"})
            by_id[iid] = item
            archive.append(item)
            added += 1
            continue

        changed = False
        if raw.get("title") and raw["title"] != existing.get("title"):
            existing["title"] = raw["title"]
            changed = True
        if raw.get("summary") and not existing.get("summary"):
            existing["summary"] = raw["summary"]
            changed = True
        if raw.get("published") and not existing.get("published"):
            existing["published"] = raw["published"]
            changed = True
        updated += changed

    return {"added": added, "updated": updated, "total": len(archive)}


def prune(archive: list[dict], *, now: datetime | None = None) -> list[dict]:
    """Apply retention. Newest first; undated items sort last but are not privileged."""
    now = now or datetime.now(timezone.utc)
    cutoff = now - timedelta(days=MAX_AGE_DAYS)

    kept = [item for item in archive if _within(item, cutoff)]
    dated = sorted(
        (i for i in kept if i.get("published")),
        key=lambda i: i["published"],
        reverse=True,
    )
    undated = [i for i in kept if not i.get("published")]
    return (dated + undated)[:MAX_ITEMS]


def _within(item: dict, cutoff: datetime) -> bool:
    published = item.get("published")
    if not published:
        return True  # undated items are kept until the item cap evicts them
    try:
        return datetime.fromisoformat(published.replace("Z", "+00:00")) >= cutoff
    except ValueError:
        return True


def load(path: str) -> list[dict]:
    """Read the archive. A missing or corrupt file yields an empty archive.

    Corruption must not be fatal: a half-written archive should cost us history, not
    the next run. The caller logs it; the backup on disk is the previous commit.
    """
    if not os.path.exists(path):
        return []
    try:
        with open(path, "r", encoding="utf-8") as handle:
            data = json.load(handle)
    except (json.JSONDecodeError, OSError):
        return []
    return data.get("items", []) if isinstance(data, dict) else data


def save(path: str, archive: list[dict], *, health: dict | None = None,
         now: datetime | None = None) -> None:
    """Write the archive atomically, so an interrupted run cannot truncate it."""
    now = now or datetime.now(timezone.utc)
    payload = {
        "generated_at": now.isoformat().replace("+00:00", "Z"),
        "count": len(archive),
        "health": health or {},
        "items": archive,
    }
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    handle = tempfile.NamedTemporaryFile(
        "w", encoding="utf-8", dir=os.path.dirname(path) or ".",
        prefix=".archive-", suffix=".tmp", delete=False,
    )
    try:
        with handle:
            json.dump(payload, handle, ensure_ascii=False, indent=1, sort_keys=False)
        os.replace(handle.name, path)
    except Exception:
        try:
            os.unlink(handle.name)
        except OSError:
            pass
        raise
