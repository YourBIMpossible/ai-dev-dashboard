"""Feed bytes -> normalized items. Stdlib only, no network, no I/O.

Handles the three dialects the verified BIM-Watch sources actually emit:

  * RSS 2.0        <rss><channel><item>          (Autodesk blogs, AEC Magazine, ...)
  * Atom           <feed><entry>                 (GitHub releases, Blogspot)
  * RSS 1.0 / RDF  <rdf:RDF><item>               (rare, but cheap to support)

We deliberately do not depend on `feedparser`. The dialect surface we need is small
and well covered by fixtures captured from the real sources, and keeping the parse
step dependency-free means the scheduled Action has no supply-chain surface and the
tests run entirely offline.

Items come out of here WITHOUT an `id`. Identity is the store's job -- see
``store.canonical_url`` -- because dedupe rules belong with the thing that dedupes.

Security note -- we parse untrusted bytes from third-party servers inside a CI job
that can write to a public repo, so the XML threat model got checked rather than
assumed (verified on CPython 3.14 / expat 2.7.5):

  * XXE / external entities are NOT reachable. ElementTree never resolves them; a
    SYSTEM entity raises "undefined entity". No file read, no SSRF.
  * Internal entity expansion IS performed, so billion-laughs amplification is a
    real class even with expat's built-in protection.

We therefore reject any DOCTYPE outright (``_reject_doctype``). No legitimate feed
carries a DTD, and refusing one eliminates the whole entity-expansion class at the
door. That is strictly stronger than defusedxml's default posture and keeps the
parse step dependency-free, which was the point of not using feedparser either.
Size is bounded upstream by the collector's download cap.
"""

from __future__ import annotations

import html
import re
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

ATOM = "{http://www.w3.org/2005/Atom}"
RDF = "{http://www.w3.org/1999/02/22-rdf-syntax-ns#}"
DC = "{http://purl.org/dc/elements/1.1/}"
CONTENT = "{http://purl.org/rss/1.0/modules/content/}"
RSS1 = "{http://purl.org/rss/1.0/}"

SUMMARY_CAP = 1200

_TAG_RE = re.compile(r"<[^>]+>")
_WS_RE = re.compile(r"\s+")
# Matches a DOCTYPE declaration in the prolog, tolerating leading BOM/whitespace and
# comments. Deliberately broad: we would rather reject an odd-but-valid feed than
# hand attacker-controlled entity definitions to expat.
_DOCTYPE_RE = re.compile(rb"<!DOCTYPE", re.IGNORECASE)

# Control bytes that XML 1.0 forbids outright (everything under 0x20 except tab, LF,
# CR). Real feeds do emit these: AEC Magazine ships 0x1F bytes mid-word where an "ff"
# ligature was mangled upstream, which makes the whole document unparseable. Dropping
# three stray bytes is plainly better than dropping the entire source, so we strip
# them rather than reject. This is a repair, not a security control -- the DOCTYPE
# refusal above is the security control.
_ILLEGAL_XML_BYTES = re.compile(rb"[\x00-\x08\x0b\x0c\x0e-\x1f]")


class FeedParseError(ValueError):
    """The bytes were not a feed we can read. Isolated per-source by the collector."""


def parse_feed(data: bytes, source_key: str) -> list[dict]:
    """Parse feed bytes into a list of normalized item dicts.

    Raises FeedParseError on malformed XML or an unrecognized root element. Individual
    malformed *items* are skipped rather than failing the whole feed -- one bad entry
    should not cost us the other nine.
    """
    if not data or not data.strip():
        raise FeedParseError(f"{source_key}: empty response")

    _reject_doctype(data, source_key)
    data = _ILLEGAL_XML_BYTES.sub(b"", data)

    try:
        root = ET.fromstring(data)
    except ET.ParseError as exc:
        raise FeedParseError(f"{source_key}: malformed XML: {exc}") from exc

    tag = _localname(root.tag)
    if tag == "rss":
        channel = root.find("channel")
        raw_items = channel.findall("item") if channel is not None else []
        extract = _extract_rss
    elif tag == "feed":
        raw_items = root.findall(f"{ATOM}entry")
        extract = _extract_atom
    elif tag == "RDF":
        raw_items = root.findall(f"{RSS1}item") or root.findall("item")
        extract = _extract_rss
    else:
        raise FeedParseError(f"{source_key}: unrecognized feed root <{tag}>")

    items = []
    for raw in raw_items:
        try:
            item = extract(raw, source_key)
        except Exception:  # a single bad entry must not sink the feed
            continue
        if item and item.get("url") and item.get("title"):
            items.append(item)
    return items


def _reject_doctype(data: bytes, source_key: str) -> None:
    """Refuse feeds carrying a DTD -- see the security note in the module docstring.

    Only the prolog is inspected: a literal "<!DOCTYPE" inside an escaped HTML body
    (common in feeds that syndicate tutorials about HTML) is harmless and must not
    trigger a false rejection.
    """
    prolog = data[:2048]
    match = _DOCTYPE_RE.search(prolog)
    if match and match.start() < _first_element_offset(prolog):
        raise FeedParseError(
            f"{source_key}: feed declares a DOCTYPE; refused (entity-expansion risk)"
        )


def _first_element_offset(prolog: bytes) -> int:
    """Offset of the first real element start-tag, ignoring the XML declaration."""
    for i in range(len(prolog) - 1):
        if prolog[i : i + 1] == b"<" and prolog[i + 1 : i + 2] not in (b"?", b"!"):
            return i
    return len(prolog)


def _localname(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def _extract_rss(node: ET.Element, source_key: str) -> dict | None:
    title = _text(node.find("title"))
    link = _text(node.find("link"))
    if not link:
        # Some RSS feeds only carry an absolute guid.
        guid = _text(node.find("guid"))
        link = guid if guid.startswith("http") else ""

    body = _first_text(node, [f"{CONTENT}encoded", "description", f"{RSS1}description"])
    published = _first_text(node, ["pubDate", f"{DC}date", "date"])

    return {
        "title": clean_text(title, strip_markup=False),
        "url": link.strip(),
        "source": source_key,
        "published": parse_date(published),
        "summary": clean_text(body, cap=SUMMARY_CAP),
    }


def _extract_atom(node: ET.Element, source_key: str) -> dict | None:
    title_el = node.find(f"{ATOM}title")
    title = _text(title_el)
    # Atom titles may declare type="html"/"xhtml", in which case markup really is
    # markup and should be stripped. The default, type="text", is content.
    title_is_markup = (title_el is not None) and title_el.get("type") in ("html", "xhtml")

    link = _atom_link(node)
    body = _first_text(node, [f"{ATOM}summary", f"{ATOM}content"])
    published = _first_text(node, [f"{ATOM}published", f"{ATOM}updated"])

    return {
        "title": clean_text(title, strip_markup=title_is_markup),
        "url": link,
        "source": source_key,
        "published": parse_date(published),
        "summary": clean_text(body, cap=SUMMARY_CAP),
    }


def _atom_link(node: ET.Element) -> str:
    """Prefer rel="alternate" (the human page) over enclosures and self links."""
    fallback = ""
    for link in node.findall(f"{ATOM}link"):
        rel = link.get("rel", "alternate")
        href = (link.get("href") or "").strip()
        if not href:
            continue
        if rel == "alternate":
            return href
        if not fallback and rel not in ("self", "enclosure", "edit"):
            fallback = href
    if fallback:
        return fallback
    node_id = _text(node.find(f"{ATOM}id"))
    return node_id if node_id.startswith("http") else ""


def _text(node: ET.Element | None) -> str:
    if node is None:
        return ""
    return "".join(node.itertext())


def _first_text(node: ET.Element, paths: list[str]) -> str:
    for path in paths:
        found = node.find(path)
        if found is not None:
            text = _text(found)
            if text.strip():
                return text
    return ""


def clean_text(raw: str, cap: int | None = None, *, strip_markup: bool = True) -> str:
    """Collapse whitespace, optionally strip markup, optionally truncate on a word.

    ``strip_markup`` must be False for titles. ElementTree has already unescaped the
    XML by the time we see the string, so an author who wrote ``&lt;!DOCTYPE html&gt;``
    in a title hands us a literal ``<!DOCTYPE html>`` -- indistinguishable from a real
    tag by regex. Both RSS and Atom define titles as plain text, so the correct
    reading is "this is content", and stripping it would silently eat code snippets.
    That is not hypothetical here: Revit API blogs post escaped markup constantly.

    Bodies are the opposite case -- they really are HTML -- so summaries strip.
    """
    if not raw:
        return ""
    text = _TAG_RE.sub(" ", raw) if strip_markup else raw
    text = html.unescape(text)
    text = _WS_RE.sub(" ", text).strip()
    if cap and len(text) > cap:
        text = text[:cap].rsplit(" ", 1)[0] + "…"
    return text


def parse_date(raw: str) -> str | None:
    """Parse RFC 822 or ISO 8601 into a UTC ISO string. Returns None if unparseable.

    None is a legitimate outcome, not an error: some feeds omit dates, and an item
    with an unknown date is still worth archiving. Callers sort None last.
    """
    raw = (raw or "").strip()
    if not raw:
        return None

    for parser in (_parse_rfc822, _parse_iso):
        try:
            dt = parser(raw)
        except Exception:
            continue
        if dt is None:
            continue
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    return None


def _parse_rfc822(raw: str) -> datetime | None:
    if "," not in raw:  # cheap guard; RFC822 always has the weekday comma in practice
        return None
    return parsedate_to_datetime(raw)


def _parse_iso(raw: str) -> datetime | None:
    return datetime.fromisoformat(raw.replace("Z", "+00:00"))
