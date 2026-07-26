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

## Step 2 — Chat (Cloudflare secret + Access, both live)

### 2a. The secret

Cloudflare dashboard → **Workers & Pages → ai-dev-dashboard → Settings →
Environment variables → Add variable**:

- Name `ANTHROPIC_API_KEY`, value the same key, and **click Encrypt**.
- Add it to the **Production** environment.

Optional: `BIMWATCH_MODEL` to override the chat model (defaults to `claude-sonnet-5`).

### 2b. The gate — done, via the API (2026-07-25)

The dashboard UI ("Zero Trust → Access → Applications → Add application →
Self-hosted") could not create this app: it rejected every attempt with
`use_clientless_isolation_app_launcher_url can only be enabled for apps with
private destinations`, including against a fresh policy with that setting
confirmed off. Cause never identified; worked around instead of fixed.

**The working path was the API, not the dashboard.** A scoped, one-time API
token (Account → Access: Apps and Policies → Edit) plus one `POST` created it
cleanly:

```powershell
$headers = @{ Authorization = "Bearer $token" }
$body = @{
  type = "self_hosted"
  name = "BIM-Watch chat"
  session_duration = "24h"
  destinations = @(@{ type = "public"; uri = "ai-dev-dashboard.pages.dev/api/*" })
  policies = @("<existing-policy-id>")
} | ConvertTo-Json -Depth 6

Invoke-RestMethod -Method Post `
  -Uri "https://api.cloudflare.com/client/v4/accounts/93935ceacb9b794dd034df02c223a3d3/access/apps" `
  -Headers $headers -ContentType "application/json" -Body $body
```

Two things worth keeping in mind if this is ever rebuilt:

- **`destinations` (array), not `domain` (string).** This account's Access setup
  is on the newer schema; the legacy flat `domain` field is what triggered the
  rejection in earlier attempts, not the isolation flag itself.
- **Use `Invoke-RestMethod`, not `curl.exe`, for the request.** PowerShell's own
  quote-escaping into a native exe's argv mangled a JSON body full of `\"` and
  `[...]` on the first attempt — a genuinely unreliable combination on Windows,
  independent of anything Cloudflare-side.

App ID: `51d20ce7-5c9c-4e82-94c2-901768df078a`. Policy: the existing `me only`
policy, restricting access to `zeriah.t@gmail.com`.

**Verified live** (private browser session, no cookies): `GET
/api/bimwatch-chat` redirects to `flat-queen-a958.cloudflareaccess.com` and
shows a Cloudflare login prompt — no JSON, nothing leaked.

**Backstop, regardless of Access:** the Function itself still enforces a
600-character question cap, 30-item context cap, 900-token output cap, and
10 requests/minute per visitor.

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

**Verdicts are sticky.** An item keeps its classification once judged, so a daily run
only costs a handful of items. That means editing `profile.md` changes nothing for
already-judged items until you reset them:

```bash
python -m bimwatch.run --retriage --window 30
```

`--retriage` clears every verdict and re-classifies from scratch under the new
profile. It touches only the verdicts — URLs, dedupe identity and fetch history are
preserved, so nothing is re-downloaded. Use `--window 30` while tuning: a 7-day
window is too thin a sample to judge a classifier on.

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
- [x] **Access policy actually blocks** — verified 2026-07-25 in a private
      browser session: `/api/bimwatch-chat` redirects to Cloudflare's login
      page, no JSON leaked. See "The gate — done, via the API" above.
- [ ] **Chat endpoint answers** — Access is confirmed blocking; still needs
      `ANTHROPIC_API_KEY` set as a Cloudflare Pages environment variable
      before it does anything beyond challenge for login.
