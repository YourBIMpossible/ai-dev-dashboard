# BIM-Watch — design

**Date:** 2026-07-25
**Status:** approved (approach B), implementation in progress
**Owner:** Zeriah

## Problem

Staying current on Autodesk and the wider BIM world is a standing, unbounded chore.
It is done irregularly, by hand, and the cost of missing something is asymmetric: a
deprecated Revit API or a changed version-support matrix quietly breaks add-in work
months later.

BIM-Watch automates the reading and the triage. It does four jobs:

1. **Weekly 5-minute briefing** — what happened, ranked by relevance, condensed.
2. **Alerts** — interrupt only for things that touch the actual work: Revit version
   and API changes, deprecations, breaking changes, SDK/platform news.
3. **Learning queue** — a growing backlog of things worth an afternoon of study.
4. **Searchable archive** — "when did Autodesk announce X?" answerable later.

These are not four systems. The archive is the substrate; alerts and the learning
queue are classifications over it; the briefing is a weekly render of it.

## Non-goals

- Not a general-purpose news reader or RSS client.
- Not a replacement for reading Autodesk University sessions or release notes in full.
- No mobile app. The dashboard is responsive; that is the mobile story.
- No attempt to be real-time. Daily collection is enough for this domain.

## Architecture

BIM-Watch is a batch pipeline whose runtime is a scheduled GitHub Action, plus a
read/chat surface on the existing dashboard.

```
 (scheduled GH Action, daily 06:00 UTC)
   sources.json
        |
        v
   collect.py ---> feedparse.py      fetch + normalize (conditional GET)
        |
        v
    store.py                         dedupe by canonical-URL hash, append, prune
        |
        v
   classify.py  --> Claude API       tier + relevance + why-it-matters
        |
        +--> digest.py (Mondays)     compose the weekly briefing
        |
        v
   render.py ---> bimwatch.js        window.DASHBOARD_BIMWATCH
        |
        v
   git commit ---> deploy.yml ---> Cloudflare Pages
                                        |
                     dashboard panel <--+--> functions/api/bimwatch-chat.js
```

The scheduled-Action-writes-a-`.js`-file-and-commits pattern is not new here; it is
exactly how `github-actions-live.yml` already maintains `github_actions.js`. BIM-Watch
follows that convention rather than inventing a second one.

### Why a GitHub Action rather than a local scheduled task

The workstation is not always on, and the dashboard is meant to be readable from
anywhere. Collection must not depend on White-Z being awake. This differs deliberately
from PC-Monitor, whose whole subject is the local machine.

## Components

Each unit has one job, a narrow interface, and can be tested alone.

| Unit | Responsibility | Depends on | Tested |
|---|---|---|---|
| `bimwatch/sources.json` | Source registry. Data, not code. | — | schema-checked |
| `bimwatch/feedparse.py` | Bytes → normalized `Item[]`. RSS 2.0, Atom, RDF. Pure. | stdlib only | yes, fixtures |
| `bimwatch/collect.py` | HTTP fetch, conditional GET, per-source health. | `requests`, feedparse | yes, fake transport |
| `bimwatch/store.py` | Dedupe, append, prune, JSON I/O. | — | yes |
| `bimwatch/classify.py` | Batch-classify via Claude. Degrades to `unsorted`. | Anthropic API | yes, stub client |
| `bimwatch/digest.py` | Classified items → weekly briefing. Pure. | — | yes |
| `bimwatch/render.py` | Archive + digest → `bimwatch.js`. | — | yes |
| `functions/api/bimwatch-chat.js` | Retrieval over archive + Claude call. | CF secret | logic unit-tested |
| dashboard panel (`index.html`) | Briefing, alerts, learning queue, search, chat. | `bimwatch.js` | browser-verified |

**No dependency on `feedparser`.** `feedparse.py` uses `xml.etree` and handles the
three feed dialects the verified sources actually emit. This keeps the Action fast,
removes a supply-chain surface from a public repo, and makes parsing testable offline
against captured fixtures.

## Data model

```jsonc
{
  "id": "sha256(canonical_url)[:16]",
  "title": "...",
  "url": "https://...",
  "source": "aps-blog",             // key into sources.json
  "published": "2026-07-21T14:03:00Z",
  "summary": "...",                 // raw feed summary, stripped, capped at 1200 chars
  "fetched_at": "2026-07-25T06:00:11Z",
  "classification": {
    "tier": "alert",                // alert | learn | fyi | noise | unsorted
    "relevance": 88,                // 0-100, against profile.md
    "why": "One sentence: why this matters to your work specifically.",
    "topics": ["revit-api", "deprecation"],
    "model": "claude-haiku-4-5-20251001",
    "classified_at": "2026-07-25T06:01:02Z"
  }
}
```

**Tiers.** `alert` = touches the work (API, version support, deprecation, breaking
change, licensing). `learn` = worth studying, no deadline. `fyi` = context, industry
movement. `noise` = archived but hidden from all views except search. `unsorted` =
classification did not run; still fully searchable.

Canonical URL = scheme+host+path, lowercased host, query and fragment dropped except
where a source needs a query param for identity. Dropping `utm_*` is the main win.

### The relevance profile

`bimwatch/profile.md` is a short, human-edited description of the work: Revit add-in
development in C#, the Revit API, BIMpossible, family authoring, sheet/view/viewport
automation, pyRevit. It is fed to the classifier verbatim.

This file is the system's single tuning knob. If the briefing surfaces the wrong
things, the fix is to edit prose, not code. That is deliberate — it keeps tuning in
the owner's hands.

## Source registry

12 feeds, each verified live on 2026-07-25 (HTTP 200, parseable, non-empty).

**Autodesk first-party:** Revit product blog · Autodesk News · **Autodesk Platform
Services** (`aps.autodesk.com/rss.xml` — the developer/API feed, the single best
alert-tier source).

**Revit development:** pyRevit releases · RevitLookup releases · RevitTemplates
releases · Revit Add-ons.

**Industry and practice:** AEC Magazine · BIM Corner · Revit Pure · Graphisoft
(competitor watch) · speckle-sharp releases (openBIM/interop).

### Sources that are dead, and why that matters

Verification found **The Building Coder** — long the definitive Revit API blog — is
gone: its Typepad domain now resolves to a registrar parking page. Autodesk's own
forum RSS has moved behind sign-in. AUGI and buildingSMART return 403 to
non-browser clients.

The lesson is designed into the system: **a source can die silently, and silence
looks exactly like "a quiet week."** Therefore `collect.py` records per-source health
(last success, consecutive failures, last item date) and the dashboard renders a
**stale-source badge** when a source has produced nothing in 3× its normal interval or
has failed 3 runs straight. Losing a source becomes visible instead of invisible.

## Security

The dashboard repo is **public**. Three consequences, all designed for:

1. **No secrets in the repo, ever.** `ANTHROPIC_API_KEY` lives only as a Cloudflare
   Pages secret (for chat) and a GitHub Actions secret (for classification).
2. **The chat endpoint is a public URL.** An unguarded LLM proxy is an open invitation
   to spend someone else's money. `/api/*` is protected by **Cloudflare Access**
   (Google login, owner's address only), plus a server-side cap: max input size,
   max output tokens, and a per-IP rate limit in the Function itself. Access is the
   real gate; the caps are the blast radius if it is ever misconfigured.
3. **The archive is public.** This is acceptable — it is public industry news plus
   generated commentary. The `profile.md` is deliberately about professional focus
   areas, not personal detail, for the same reason.

**GitHub Pages cannot run Functions.** On `yourbimpossible.github.io` the digest,
alerts, learning queue and search all work; the chat box detects the absence of the
endpoint and renders a disabled state pointing at the Cloudflare URL. This is a
known, accepted split, not a bug.

## Failure modes

| Failure | Behaviour |
|---|---|
| A feed 404s or times out | Logged, source health decremented, run continues. Stale badge after 3 consecutive failures. |
| A feed returns malformed XML | Parse error isolated to that source; other sources unaffected. |
| `ANTHROPIC_API_KEY` absent | Items stored with `tier: "unsorted"`. Digest renders with a banner saying classification did not run. Nothing is lost. |
| Claude API error/rate limit | Retry with backoff, then leave that batch `unsorted` for the next run to pick up. |
| The whole Action fails | `bimwatch.js` keeps the last good data; the panel shows a "last updated N days ago" age warning. |
| Archive grows unbounded | Pruned to 18 months / 5000 items, whichever is smaller, at write time. |

The through-line: **degrade to stale-but-honest, never to silently-wrong.** Every
view carries its own freshness stamp.

## Cost

Classification is Haiku over ~30–60 items/day at roughly 500 tokens each: cents per
week. The weekly digest is one larger call. Chat is Sonnet, a few cents per
conversation, and gated to one user. Expected total well under $1/month; the Function's
token caps bound the worst case.

## Testing

`pytest`, matching the repo's existing `test_sync_dashboard.py` convention.

- `feedparse` — fixtures captured from the 12 real feeds, covering RSS 2.0, Atom and
  the GitHub releases dialect; plus malformed-XML and empty-feed cases.
- `store` — dedupe on canonical URL, `utm_` stripping, prune boundaries, idempotent
  re-runs.
- `digest` — tier grouping, ranking, empty-week and all-noise-week cases.
- `classify` — stub client; asserts graceful degradation with no key and on API error.
- Panel — verified in a real browser against seeded data.

Network is never touched in tests.

## Open questions for the owner

1. **Sources** — anything missing? Notably absent: a working Revit *release notes*
   feed (Autodesk publishes no RSS for it; an HTML poll is possible but brittle).
2. **Cadence** — daily collect, Monday briefing. Reasonable, or different day?
3. **Alert delivery** — alerts currently surface on the dashboard only. A push to
   phone or email is a later, separate decision.
