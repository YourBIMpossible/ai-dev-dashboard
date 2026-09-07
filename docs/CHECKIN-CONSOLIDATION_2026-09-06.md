# Daily Check-in Consolidation — acceptance note

**Branch:** `claude/checkin-consolidation` · **Date:** 2026-09-06 · **One PR, end-to-end.**

Scope: one bounded consolidation pass making the already-shipped dashboard cohere into a
trustworthy daily personal command center. Refinements to existing machinery — **not** new
systems, not a metric rewrite, not new data ingestion. Preserve BIMpossible's 92% delivery
cohort / 63% active scope, the ripe/parked triage, the delta feed, and all deep views.

## Before → after daily workflow

**Before:** Opening the dashboard drops you on whatever tab you last viewed (`dash.tab` in
localStorage is restored on every load), so a daily check-in can silently bypass Today. Two
surfaces (Today + Overview) both lead with a "needs you" queue, so there's no unambiguous
start. "Needs you" shows ripe items but doesn't distinguish what's *new since you last looked*
from standing backlog. Source freshness is only visible by drilling into each deep view; Today
has no single data-health readout. Portfolio state on Today is a "Movement" list without a
per-project action count.

**After:**
1. A normal daily open lands on **Today** (the daily home). Same-session/same-day reloads still
   restore your view; an explicit `#view` deep link still wins. A stale historical tab can no
   longer bypass Today.
2. "Needs you" puts **new-since-last-check-in** items first with a `new` marker, standing
   backlog second (dimmer). Nothing is hidden — counts reconcile (header = all ripe; "N new" is
   a subset). Parked items still fold, never drop. Fail-safe (owner asks) still always visible.
3. Today carries a **portfolio pulse**: one summary line + per-project action-need counts on the
   movement rows. BIMpossible's two headline numbers are untouched.
4. Today carries **one data-health line**: every ingested source (Facts, Usage, Agents/Claude,
   GitHub Actions, BIM Watch, Graphify) shows its real source timestamp + a stale/unknown flag,
   reusing the existing `freshTag`/`FRESH` artifacts. No new ingestion invented.
5. **Today is the sole daily home.** Overview is relabeled **Portfolio** (reference), carries a
   "daily check-in lives in Today →" pointer, and keeps its unique per-project detail. Nav order
   and copy make Today the obvious morning start.

## Count-reconciliation rule (Outcome 2, documented)

The "Needs you" header count is `ripe.length` — every ripe blocker/decision, unchanged. The
`N new` sublabel is the subset whose item-key was absent from the previous check-in day's desk
snapshot (`dash.deskBaseline`). `new + older === ripe` always; both are rendered. "New" means
*not present on your desk at your previous check-in* — a real last-visit comparison, never an
invented freshness claim. First-ever visit marks nothing new (no baseline to compare).

## Landing decision (Outcome 1, documented)

`pickInitialView({hash, sessionTab, sessionSameDay, validIds})`, pure and tested:
1. valid `location.hash` → that view (deep link wins);
2. else same-session **and** same-calendar-day stored tab → restore it;
3. else → `today`.

Same-session state lives in `sessionStorage` (`dash.tab` = `{day,id}`), so a fresh browser
session or a next-day reload of a left-open tab both land on Today. The old localStorage
`dash.tab` landing key is retired (it was the bypass bug).

## Validation

- `node test_renderer.js` · `node test_disclosure.js` · `node test_phase_metrics.js` — green.
- New deterministic tests (this PR): `pickInitialView` (stored-tab / fresh / same-session /
  deep-link / overnight / invalid-hash) and `deskBaseline`/`deskDeltaKeys` (new-first split,
  count reconciliation, first-visit) in `test_checkin_consolidation.js`.
- `python validate_dashboard.py` — green (no data.js / phase-numbering / cohort changes).
- Browser validation at 375 / 768 / 1425px on Today + Portfolio; console clean; keyboard +
  disclosure on changed paths.

## Non-goals / untouched

data.js content, completion-model scores/buckets/cohorts, the scheduled refresh, Cloudflare
config, deep-view internals, BIMpossible repo. No files under `F:\AI-Dashboard\Dashboard`.
