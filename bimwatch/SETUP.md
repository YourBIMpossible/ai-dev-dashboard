# BIM-Watch — setup

Everything here is built and tested. Two steps need your account access, and until
they are done the system runs in a reduced but honest mode: it collects and archives
normally, marks items `unsorted`, and says so on the dashboard.

---

## What works right now, with no setup

```bash
python -m bimwatch.run --no-classify
```

Collects all 12 sources, archives and dedupes, regenerates `bimwatch.js` and
`bimwatch-archive.json`. The dashboard's **BIM Watch** tab then shows the archive,
search, and source health. Only triage and chat need keys.

---

## Step 1 — Triage (GitHub Actions secret)

Lets the daily run tier items into alert / learn / fyi / noise and write the
"why this matters to you" line.

1. Get a key at **platform.claude.com → API keys**.
2. Go to **github.com/YourBIMpossible/ai-dev-dashboard → Settings → Secrets and
   variables → Actions → New repository secret**.
3. Name: `ANTHROPIC_API_KEY`. Value: the key.

Cost: triage uses Haiku on roughly 30–60 new items a day, which is cents per week.

To confirm: **Actions → BIM-Watch → Run workflow**. The dashboard's classification
warning disappears once it succeeds.

---

## Step 2 — Chat (Cloudflare secret + Access policy)

**Both parts are required. The secret without the policy leaves a public endpoint
that spends your API credits for anyone who finds it.**

### 2a. The secret

Cloudflare dashboard → **Workers & Pages → ai-dev-dashboard → Settings →
Environment variables → Add variable**:

- Name `ANTHROPIC_API_KEY`, value the same key, and **click Encrypt**.
- Add it to the **Production** environment.

Optional: `BIMWATCH_MODEL` to override the chat model (defaults to `claude-sonnet-5`).

### 2b. The gate — do not skip

Cloudflare dashboard → **Zero Trust → Access → Applications → Add an application →
Self-hosted**:

- Application name: `BIM-Watch chat`
- Domain: your Pages domain, path `api/*`
- Policy: **Allow**, rule type **Emails**, value `zeriah.t@gmail.com`
- Identity provider: One-time PIN, or Google

You will log in once in the browser; the cookie persists. The chat box then works
from any device, including your phone.

Free tier covers up to 50 users, so this costs nothing.

### What is in place already as backstop

Independent of Access, the Function itself enforces: 600-character question cap,
30-item context cap, 900-token output cap, and 10 requests/minute/IP. These bound
the damage if the policy is ever misconfigured — they are not a substitute for it.

---

## Known limitation: GitHub Pages has no chat

The dashboard is published twice:

| URL | Briefing / archive / search | Chat |
|---|---|---|
| Cloudflare Pages | yes | **yes** |
| `yourbimpossible.github.io/ai-dev-dashboard/` | yes | no |

GitHub Pages serves static files only and cannot execute Functions. The panel detects
this and shows an explanatory disabled state rather than a broken box. Use the
Cloudflare URL when you want to ask questions.

---

## Tuning it

**`bimwatch/profile.md`** is the knob. It is fed verbatim to the classifier and
describes what counts as an alert, what is worth learning, and what is noise *for
you*. If the briefing surfaces the wrong things, edit that prose — no code changes.

**`bimwatch/sources.json`** is the source list. Add or remove feeds, set `enabled:
false` to mute one without losing its history, and adjust `weight` to make a source
louder or quieter in the briefing.

After editing either, re-run `python -m bimwatch.run` to see the effect.

---

## Operational notes

- **Schedule:** daily 06:00 UTC collection, Monday 07:00 UTC briefing.
- **Retention:** 18 months or 5000 items, whichever bites first.
- **Stale sources:** a feed that fails 3 runs straight, or stops publishing for 3× its
  normal cadence, gets badged on the dashboard. This is deliberate — a dead feed and a
  quiet week look identical otherwise, which is how The Building Coder's disappearance
  went unnoticed.
- **Re-runs are safe.** Ingest is idempotent; running twice in a day adds nothing.
- **A failed run is not silent.** `bimwatch.js` keeps the last good data and the panel
  shows its age.

## Tests

Run from the **worktree root** (`…\worktrees\bim-watch`), not from inside `bimwatch/` —
the package is imported as `bimwatch.*`, so the parent directory must be the working
directory. The argument is a path (`bimwatch/tests`), not a module (`bimwatch.tests`).

```bash
python -m pytest bimwatch/tests -q
```

PowerShell note: this shell is PowerShell 5.1, which has no `&&`. Chain with `;`.

145 tests, no network access required. CI runs them before every collection, so a
broken parser fails the workflow instead of publishing a mangled archive.

---

## Verification checklist

Local proof and cloud proof are different claims. Do not let one stand in for the
other — everything above the line has been demonstrated on this machine; everything
below it cannot be tested until the owner-only secrets exist.

### Proven locally (2026-07-25)

- [x] **Pipeline runs end to end** — `python -m bimwatch.run --no-classify`, all 12
      sources fetched, 295 items archived across 12 distinct sources.
- [x] **Tests pass** — 145, no network.
- [x] **Branch and commit exist** — `feat/bim-watch`, commit `34ecc34`, 31 files.
- [x] **Dashboard panel renders** — verified in a real browser: all 8 tabs render,
      search returns hits, no console errors.
- [x] **Degraded mode is honest** — with no key, items stay `unsorted` and the panel
      says triage did not run rather than implying a quiet week.
- [x] **Stale detection works** — flagged Revit Add-ons (dormant 288 days) and
      speckle-sharp (archived) on the first run.

### NOT yet proven — requires the owner's credentials

- [ ] **GitHub Action succeeds** — needs `ANTHROPIC_API_KEY` in repo secrets.
      Verify: Actions → BIM-Watch → Run workflow → green, and a `bimwatch:` commit lands.
- [ ] **Triage produces sensible tiers** — verify the briefing's alert/learn/noise
      split matches your judgement, then tune `profile.md` if not.
- [ ] **Cloudflare deploy carries the new files** — verify `bimwatch.js` and
      `bimwatch-archive.json` are served from the Pages URL.
- [ ] **Chat endpoint answers** — needs the Cloudflare secret.
- [ ] **Access policy actually blocks** — the one that matters. Verify by opening
      `/api/bimwatch-chat` in a private window: it must challenge for login, not answer.
      Until this is confirmed, the endpoint is a public spend endpoint with guardrails,
      not a protected one.
