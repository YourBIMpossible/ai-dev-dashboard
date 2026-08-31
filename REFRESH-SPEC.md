# Dashboard Refresh Spec (schema v3)

Instructions for any Claude session (scheduled or on-demand "refresh dashboard") that updates
`F:\AI-Dashboard\Dashboard\data.js`. The HTML shell (`index.html`) never needs touching on a refresh.

## Automation architecture (read first — 2026-06-23)

`data.js` has THREE writers, split by field so they cannot fight:

1. **`sync_ledgers.py` — phases + waves (deterministic, NO model).** Renders
   `progress.phases[]` (name + status note) and the `waves` block straight from the
   owner-maintained ledgers (`BIMpossible_PHASE-STATUS.md`, `BIMpossible_WAVE-STATUS.md`).
   Preserves curated `pct` + `tasks`. This is the anti-drift core: phase numbering can
   only come from the ledger. Idempotent; run it any time.
2. **`sync_dashboard.py` — soft prose only (GitHub Models, on source-repo push).** Updates
   `oneLiner` / `focus` / `recent` / `reminders` etc. **Hard-blocked from `progress` and
   `waves`** (`PROTECTED_FIELDS`) — a weak model re-deriving phase numbers from prose is
   what caused the historical "P7 = Model QA" drift, so it physically cannot touch them.
3. **A human / Claude on-demand refresh** — the fuller scan (activity arrays, git state,
   audit, links) per the per-project sources below.

**Guard:** `validate_dashboard.py` runs inside `Refresh-Dashboard.ps1` before EVERY commit
(`push-dashboard.ps1` is now just a thin delegate to that script, not a separate caller).
It blocks the push if any phase number contradicts the ledger (e.g. P7 named "Model QA",
P6 named "content authoring"). Wrong phase numbering can no longer reach the live site.

**Schedule:** Windows Task "BIMpossible Dashboard Daily Refresh" runs `Refresh-Dashboard.ps1`
from the dedicated automation clone `F:\AI-Dashboard\Dashboard-auto` (NOT the editing clone) daily at
06:00 — ledger render → activity → date stamp → guard → push. No model calls. To change names on
the dashboard, edit the **ledger** (single source of truth), not `data.js`. NOTE: the prose bot
(sync_dashboard.py) has no trigger on the code repos, so prose fields are refreshed on-demand only.

## Rules

1. **Only rewrite `data.js`.** Do not modify `index.html` or this file during a routine refresh.
2. Update `generated` (YYYY-MM-DD) and `generatedBy` ("scheduled refresh" or "on-demand refresh").
3. Read-only refresh: scan sources; do NOT modify project files, or create files outside `Dashboard\`.
4. **After writing data.js**, run `powershell -File "F:\AI-Dashboard\Dashboard\push-dashboard.ps1"` to commit and push to GitHub. This is the only permitted git mutation during a refresh.
5. Keep entries terse - one line each. Glance surface, not documentation.
6. Missing source: keep previous data, note it in that project's `reminders`.
7. New project folder at F:\AI-Dev root: add a tab, note "auto-added - confirm tracking" in its `reminders`.
8. Dates absolute. `status` in: active | gated | paused | dormant. Auto-demote to dormant only after 21+ idle days AND no blockers; never auto-promote.
9. **ClickUp automation is NOT a project.** Removed 2026-06. Never re-add it.
10. **Git scanning:** read-only commands only (`log`, `branch`, `rev-list`). Compute unpushed work via
   `git rev-list origin/<branch>..<branch> --count` per local branch. **NEVER report dirty-file counts
   from `git status` run through the Linux mount** - line-ending artifacts make ~300 files look modified.
   Put real findings (unpushed tips, orphan branches, repos with no remote) in `git.warn`.
11. **Graph-metrics staleness (read-only - NEVER run graphify).** The BIMpossible codebase knowledge
    graph is refreshed by the Windows push/wave hook (`Update-Graph.ps1`, wired into `Push-And-Verify.ps1`
    / `Complete-Wave.ps1`), one snapshot per pushed commit. `graphify` is a Windows-only local binary, is
    NOT on PyPI, and is NOT runnable from a refresh session - never attempt to run it or write
    `graph-metrics.js`. On each refresh, read the LAST entry of `window.GRAPH_METRICS` in
    `Dashboard\graph-metrics.js` and compare its `ts` (date part) to `generated`. If the newest snapshot is
    **>7 days old** (or the file is missing/empty), add ONE reminder to the `bimpossible` project:
    `Codebase graph stale - newest graphify snapshot <YYYY-MM-DD> (<N>d old); push or run a wave to refresh`.
    If <=7 days, add no reminder. Surfaces a lagging graph as a normal `reminders[]` entry without ever
    writing `graph-metrics.js`.
    **Implementation status (2026-07-10):** this comparison is not yet coded into
    `Refresh-Dashboard.ps1` — confirmed by reading it end to end, it only checks out and stages
    `graph-metrics.js`, no age check. Today the Codebase tab's own command bar carries a
    `freshTag()` staleness badge instead (`index.html`, `FRESH.live` threshold). This rule
    remains the spec for a human/Claude on-demand pass (§ rule 3) until/unless someone wires
    the reminder-generation behavior into the scripted pipeline too.

## Per-project sources

### bimpossible - BIMpossible Platform
- `git -C F:\BIMpossible log --oneline --all --since="7 days ago"` + branches + unpushed check (rule 9)
- `F:\BIMpossible-Workspace\00_Strategy\` - newest dated docs (`YYYY-MM-DD__*.md`) by filename date AND the newest `BIMpossible_STATE_*.md`. If the STATE doc trails the newest dated doc by >5 days, flag it in `reminders`.
- `F:\BIMpossible-Workspace\01_BuildLog\` - newest 3 files
- Workspace memory: `project_bimpossible-state.md`, `project_followups-queue.md`, `open-questions.md`
- Graph metrics: `F:\AI-Dashboard\Dashboard\graph-metrics.js` (`window.GRAPH_METRICS`, last entry) - read-only staleness check per rule 10. Produced by `Update-Graph.ps1` on push/wave; never written by the refresh.

### addins - Add-Ins / RevitLink
- `git -C F:\BIMpossible-AddIns log -5` + branch + unpushed check
- `F:\BIMpossible-AddIns\TOOL_BACKLOG.md` - BOTH tables: RevitLink backlog (status column drives RevitLink `progress.phases` pct) and Trade QA Scanners
- `F:\BIMpossible-AddIns\BIMpossible.RevitLink\DEV-NOTES.md` + its CLAUDE.md "Open items"
- **ZIM Tools (RevitAddin_Z) is RETIRED (2026-05) - do NOT include it.** Never add a ZIM Tools phase, reminder, or mention to the addins entry, regardless of what `add-ins-state.md` or `Add-Ins/CLAUDE.md` still say about it.

### site - BIMpossible Site
- `F:\BIMpossible-Site\01_BuildLog\` newest files; `00_README.md`; `IP-Lockdown-Checklist.md` (checked items drive progress)

### pickem - Preseason Pick'em
- `F:\AI-Dev\Preseason Pick'em\01_BuildLog\` + `WORKSPACE_INDEX.md`; app folder mtimes as fallback

### laundry - Laundry Gig
- No state doc yet (flagged). Folder mtimes; check `docs\`.

### families - Families by BIMpossible
- `F:\BIMpossible-Families\README.md` + folder mtimes (repo: YourBIMpossible/Families-by-BIMpossible)

### aiserver - AI-Server (local LLM + automation)
- `git -C F:\AI-Dev\AI-Server log --oneline --all --since="7 days ago"` + branches + unpushed check (rule 9). Repo: `YourBIMpossible/AI-Server` (private, branch-protected: PR + CI gate).
- `F:\AI-Dev\AI-Server\PROGRAM_PLAN.md` - the work-package map (Foundation + WP-A..G); drives `progress.phases`. `handoffs\WP-*.md` - one per work package; when a WP's PR merges (CI green), flip its phase tasks to `done` and raise the phase pct.
- Build/hardware plan: `F:\AI-Brain-Data\_status\AI-Server_Build_and_Integration_Plan.md` (the dedicated 3090 box). Keep its open OS/runtime choices in `pendingDecisions` until locked.
- CI: GitHub Actions `ci.yml` (pytest matrix 3.10-3.12). If the newest run is failing, add a `reminders` line. Minutes show in the Actions panel (AI-Server is in `github_actions_sync.mjs` REPOS).
- **Live status snapshot (WP-D1) — run the helper, read-only LAN poll:**
  `python F:\AI-Dev\AI-Server\scripts\aiserver_status.py` prints JSON with `endpoint`
  (`up`, `host`, `models_available` from `/api/tags`, `models_loaded` from `/api/ps`) and
  `jobs` (newest **digest / weekly-rollup / decision-drift**, each `{file, modified, summary}`
  or `null`). The dashboard is a static site, so this is a point-in-time snapshot captured at
  refresh, not browser-live. Surface it on the aiserver card **via `data.js` only — never edit
  `index.html`** (rule 1):
  - `recent`: one terse line per non-null job (e.g. `Digest 2026-06-16 — <summary>`,
    `Rollup …`, `Drift …`), plus a line
    `Endpoint up · models: qwen2.5-coder:14b, nomic-embed-text (snapshot HH:MM)` —
    or `Endpoint down (snapshot HH:MM)` when `endpoint.up` is false.
  - `lastActivity`: the newest job's `{date from modified, summary}`.
  - Helper unavailable / endpoint unreachable at refresh: add a `reminders` line
    `inference endpoint unreachable at refresh (HH:MM)` and keep previous data (rule 6) —
    do NOT fail the refresh.
- Relocation flag: while `.env` `OLLAMA_HOST` still targets localhost (the 5080), keep a `reminders` note that inference hasn't moved to the 3090 box yet.

## Audit ingestion (every refresh - daily, Monday, and on-demand)

Each project may carry an `audit` block. BIMpossible is audited weekly (the report is written Monday
morning); ANY project can be audited on demand, and every run writes a report file. The refresh does
NOT run the audit tool - it READS the newest report each project has produced and extracts the OPEN
findings. Because the daily refresh runs at ~6 AM, Monday's report is surfaced that morning; on-demand
reports for any project are picked up by the next refresh (say "refresh dashboard" after running one).

For each project, find the newest audit report, then populate its `audit` block:
- **bimpossible** - newest audit across BOTH locations (the audit archive was reorganized 2026-06-10):
  (a) `F:\BIMpossible-Workspace\02_Reference\Audit Reports\` - the 2026-06-10-onward archive: full = `YYYY-MM-DD__audit-report-full.md`, incremental = `YYYY-MM-DD__audit-report.md`, same-day reruns append `-2`/`-3`. On a same-date tie prefer `-full`, else the highest numeric suffix.
  (b) legacy `F:\BIMpossible-Workspace\02_Reference\` root - pre-2026-06-10 reports (`YYYY-MM-DD_BIMpossible_Weekly_Foundation_Audit.md`, FullProject / PerpAudit runs).
  **Recurse into `Audit Reports\`** and **match `audit` case-insensitively** (the new files are lowercase `audit-report`, which the old `*Audit*.md` glob silently skipped). Pick the newest by filename date across both. **Do NOT** ingest `02_Reference\Audit and Scan Info\` - that folder is security reviews + the living Verification Checklist (a working hub), NOT periodic audits. Ledger: `02_Reference\_audit-runs.md`.
- **addins** - newest `F:\BIMpossible-AddIns\audits\*.md`.
- **site** - newest `F:\BIMpossible-Site\01_BuildLog\*audit*.md`; ledger `_site-audit-runs.md`.
- other projects - only if an audit report exists; otherwise omit the `audit` block (they show under "Not yet audited").

Extraction rules:
- List only **OPEN** findings (resolved/closed ones drop off - they feed `closedLastRun` + `trend`, not `open`).
- Map each finding's severity to one of: `critical | high | medium | low | info` (Critical/High/Medium/Low tiers; "owed smoke / docs / nice-to-have" -> `info`). Fill `counts` with the open tally per severity.
- `closedLastRun` = how many findings the latest run resolved vs the prior run (from the report's "resolved"/"change since last run" section). `trend` = improving | flat | worsening.
- `lastRun` = report date; `runType` = the report's kind; `cadence` = "weekly Mon 6am + on-demand" for bimpossible, "on-demand" otherwise.
- Keep each finding one line: `{ id, sev, title, where? }`. Cap `open` at ~12; if more, keep the worst by severity and note the overflow in the project's `reminders`.
- If the newest report says everything is closed, set all counts to 0 and `open: []` (the UI shows "all clear").

## Wave status ingestion (bimpossible only)

Waves are a BIMpossible concept; this applies to the `bimpossible` project only. The single source of
truth is the ledger `F:\BIMpossible-Workspace\00_Strategy\BIMpossible_WAVE-STATUS.md` (one row per
wave). It is **push-independent** — read it EVERY refresh and populate the `waves` block. NEVER write it.
This is what stops wave completions slipping when builds land without a fresh build-log or push.

1. Parse the ledger table `Wave | Title | Status | Date | Note`. Status vocabulary:
   `PLANNED | PENDING | ACTIVE | PARTIAL | BUILT | SHIPPED | CLOSED` (+ `SCOPE-LOCK`). BUILT = code shipped,
   hardening owed; CLOSED = formal close-out doc.
2. `summary` buckets: `done` = SHIPPED+CLOSED; `built` = BUILT; `inFlight` = ACTIVE+PARTIAL; `ahead` = PLANNED+PENDING+SCOPE-LOCK.
3. `current` = every ACTIVE/PARTIAL/BUILT row + the next 1-2 SCOPE-LOCK/PLANNED, terse `{ id, title, status, date?, note? }`, cap ~6.
4. `lastCompleted` = newest SHIPPED/CLOSED row by Date. `updated` = the ledger's **Updated:** line. `source` = the ledger path.
5. **Drift cross-check (catches delayed pushes) -> `waves.drift`, mirror the worst into `reminders`:**
   - `git -C F:\BIMpossible tag --list 'wave-*-complete'` (read-only).
     - If ZERO such tags exist (the tagging ritual isn't in use - current reality), emit ONE note "no wave-*-complete tags; ledger is the sole completion signal" and **skip** per-wave tag drift (do NOT flag every done wave - that's noise, not signal).
     - If tags DO exist: a tag with no CLOSED/SHIPPED ledger row -> "Wave N tagged complete in git, ledger still says X - update ledger"; a CLOSED/SHIPPED ledger row with no matching tag -> "Wave N done in ledger, not yet tagged/pushed" (the unpushed-completion signal, the point of this check).
   - newest `01_BuildLog\*closeout*.md` for a wave the ledger doesn't show CLOSED -> flag it.
   - NEVER run `Complete-Wave.ps1` or create tags - read only.
6. Ledger missing -> keep the previous `waves` block, add a reminder.

## Phase status ingestion (bimpossible only)

Phases (the product arc) are a BIMpossible concept; this applies to the `bimpossible` project only. The
single source of truth is the ledger `F:\BIMpossible-Workspace\00_Strategy\BIMpossible_PHASE-STATUS.md`
(one row per PRODUCT phase). Like the wave ledger it is **push-independent** — read it EVERY refresh and
populate `progress.phases[]`; NEVER write it. This is what stops phase definitions drifting when an owner
renumber lands without a fresh hand-edit (the historical cause of dashboard phase rot).

1. **Phase ≠ Wave.** "Phase" = product arc; "Wave" = execution ledger — different axes (Phase 7 Write-back = Wave 8). Do NOT put a Wave bucket inside `progress.phases[]`; wave status comes only from the wave ledger (previous section).
2. Parse the ledger table `Phase | Name | Status | Gate/depends on | Note`. Use **Name** verbatim for `progress.phases[].name`, and **Status**/**Note** for the phase `note`. Canonical numbering (never renumber a phase to match a wave): 6 = Platform/Billing + Client-Mgmt; 7 = Revit Link Write-back; 11 = Model QA & Health; 12 = Content Authoring. "Phase 6 = content authoring" and "Phase 7 = Model QA" are DEPRECATED/VOID — never emit them.
3. `pct` per phase follows the Progress rules below (100 only on evidence; BUILT/not-hardened = 60–90).
4. Full definitions, history, and the old→new mapping live in `00_Strategy\2026-06-23__Phase_Canonical_Guide_and_HardRules_v2-Reviewed.md` — consult it if a row is ambiguous; never re-derive phase meanings from prose docs (that is what caused the drift).
5. Ledger missing -> keep the previous `progress.phases` block, add a reminder.

## data.js schema (v4)

```js
window.DASHBOARD_DATA = {
  generated: "YYYY-MM-DD",
  generatedBy: "scheduled refresh" | "on-demand refresh",
  activitySince: "YYYY-MM-DD",        // first day of the activity window (14 days, rolling)
  projects: [{
    id, name, icon,                    // icon: layers|wrench|globe|trophy|box|cube (shell's set)
    oneLiner,
    status: "active"|"gated"|"paused"|"dormant",
    phase,                             // one line: where we are
    focus,                             // THE one thing to do next (single sentence)
    progress: {                        // null if unknowable
      label,                           // what the bars measure ("Program phases", "Tracks", ...)
      phases: [{ id, bucket, weight,   // Phase Completion Model v1 — see the section below.
                 name, pct, note?,     //   id: stable phase id ("P6", "P11"); bucket: active|proposed|
                                       //   held|conditional|placeholder; weight: >0 number (v1 always 1).
                 tasks?: [{ label, status, note? }] }]  // status in done|active|pending|blocked.
                                       // pct 0-100 per phase; shell averages ACTIVE phases for the donut.
                                       // PRESERVE existing tasks across refreshes; flip statuses as work lands.
    },
    baselineCohorts?: [{ id, label, frozenAt, sourceCommit,   // bimpossible only (v1). A frozen set of
        approvedBy, approvedAt, rationale, phaseIds: [] }],    // phase ids whose CURRENT pct averages into
                                                              // a delivery baseline. OMIT for other projects.
    phaseAliases?: { "<oldId>": "<canonicalId>" },  // historical id -> current id, applied to cohort members.
    activity: [n x14],                 // commits (or doc-changes) per day over the window; zeros ok
    lastActivity: { date, summary },
    branch, git: { warn } | null,
    nextActions: [], pendingDecisions: [], blockers: [], reminders: [],
    links: [{ label, path }], recent: [],
    audit: {                             // OMIT entirely if the project has never been audited
      lastRun, runType, cadence,         // report date, kind, "weekly Mon 6am + on-demand" | "on-demand"
      counts: { critical, high, medium, low, info },  // OPEN tally per severity
      closedLastRun, trend,              // resolved-since-prior count; improving|flat|worsening
      reportPath, ledgerPath?,           // Windows paths to the newest report + run ledger
      open: [{ id, sev, title, where? }] // OPEN findings only; [] when all clear
    },
    waves: {                             // bimpossible ONLY; from BIMpossible_WAVE-STATUS.md (OMIT for other projects)
      updated, source,                   // ledger Updated: date + ledger path
      summary: { done, built, inFlight, ahead },   // wave counts per collapsed bucket
      current: [{ id, title, status, date?, note? }],  // in-flight/unhardened + next up (cap ~6)
      lastCompleted: { id, title, date },
      drift: []                          // delayed-push / mismatch warnings; [] when ledger and git agree
    }
  }]
};
```

Progress rules: phases are *plan phases*, with an honest percent each.
- 100 only on evidence (close-out doc, SHIP status, checked checklist).
- A shipped-but-not-hardened/ratified phase is NOT 100 (e.g. shipped + hardening owed = 60-90).
- Activity series: `git log --all --since=<window> --format=%ad --date=short | sort | uniq -c`
  per repo; for doc-only projects use build-log file dates. Update `activitySince` so the window
  ends today (14 entries).

---

## Phase Completion Model v1

Before this model, "in scope" was inferred at render time from a phase's note prefix
(`/^(on hold|conditional|placeholder)/i`). That was fragile — a reworded note
silently moved a phase in or out of the headline. v1 replaces inference with three explicit,
refresh-safe fields per phase (`id`, `bucket`, `weight`) plus an optional project-level
baseline registry. The renderer math lives in [`phase_metrics.js`](phase_metrics.js) and is
shared verbatim by the browser and the Node tests; the Python build/validator enforce the
same rules at write time (`sync_ledgers.py`, `validate_dashboard.py`).

### Buckets (what counts toward the headline)

Every phase declares exactly one `bucket`:

| bucket        | meaning                                                              | in headline? |
|---------------|---------------------------------------------------------------------|:------------:|
| `active`      | ratified, in the committed delivery scope                           | **yes**      |
| `proposed`    | floated, not yet ratified into scope                                | no           |
| `held`        | ratified once but paused / on hold                                  | no           |
| `conditional` | in scope only if an external condition is met                       | no           |
| `placeholder` | a reserved slot with no committed work yet                          | no           |

- The **headline donut** = flat mean of the `pct` of `active` phases only (`Math.round` at
  display). Non-active phases are tracked in the **scope inventory** (a count per bucket) but
  never dilute the headline.
- A phase with **no bucket defaults to `active`** — so every project that has not opted into
  the model (all but bimpossible today) behaves exactly as before. This default is
  headline-neutral by construction.
- An unknown bucket string is a **build-time error** (`validate_dashboard.py`); the renderer
  still fails safe by treating anything unrecognized as `active`.

### Rescoring & transitions

Changing scope = changing a phase's `bucket`, and nothing else:

- Ratify a proposal → `proposed` → `active` (it now enters the headline).
- Pause active work → `active` → `held` (drops out of the headline; pct is preserved).
- Resolve a condition → `conditional` → `active`; drop it → leave `conditional` or `held`.

Never encode scope in the note text again. The note is prose; the bucket is the source of truth.
Because `sync_ledgers.py` preserves curated `bucket`/`weight`/`id` across every refresh (see
"Sync preservation" below), a rescore survives the next ledger sync untouched.

### Weights (stored, not yet used)

Every phase carries a `weight` (a finite number > 0; v1 writes `1` everywhere). The headline
uses the **flat** mean today. `phase_metrics.js` also implements a weighted mean
(`Σ(w·pct)/Σ(w)`), and with all weights = 1 it is identical to the flat mean — so activating
weighting later is a one-line renderer switch, not a data migration. **v1 does not activate
weighting and the headline is not "weighted."** Populating real weights is a deferred owner
scoring pass; until then `weight: 1` is the honest value.

### Baseline cohorts (delivery baselines)

A `baselineCohorts[]` entry freezes a *membership* — a list of phase `id`s that constituted a
past delivery — and reports that cohort's completion from the members' **current** pct. It is
a fixed cohort with a moving score, not a hardcoded number:

- `phaseIds` are resolved through `phaseAliases` (e.g. `"P11.1" → "P11"`), then **de-duplicated**,
  then matched to live phases by `id`. A member that resolves to no phase is reported as
  `missing` (surfaced by the validator), never silently dropped from the denominator count.
- The July 2026 baseline cohort (`july-2026`) is the original ratified delivery set at ledger
  commit `adec7d8`: `P0-2, P3, P4, P6, P8, P11` (with `P11.1` retained as historical membership,
  aliased to `P11`, then folded). Its value is **computed**, not stored — `validate_dashboard.py`
  prints it on every run.
- `frozenAt` / `sourceCommit` / `approvedBy` / `approvedAt` / `rationale` are provenance for the
  freeze; they are curated fields and are preserved across refreshes.

### Sync preservation guarantee

`sync_ledgers.py build_progress()` rebuilds `progress.phases` from the ledger on every refresh.
It **preserves** the curated *phase-level* model fields by joining old→new on phase `id` first
(then phase number as a fallback): `id`, `bucket`, `weight`, and any optional per-phase metadata
(`ratifiedAt`, `evidenceUpdatedAt`, `scoreBasis`) carry through (this is the `_PRESERVE_OPTIONAL`
tuple, applied per phase). The project-level registries `baselineCohorts` / `phaseAliases` are
**not** in that tuple and are **not** protected by it — they live outside the `progress`/`waves`
value-spans the splice rewrites, so the splice leaves them byte-identical and a sync never touches
them. The refresh-drift gate (run twice; output must be
byte-identical and `node --check` clean) proves a refresh does not perturb the model.

### Validation

`validate_dashboard.py` (run before every push) enforces, for any project that opts in
(declares `baselineCohorts` or tags any phase with a `bucket`): `id` present + unique; `bucket`
in the enum; `weight` a finite number > 0; `pct` in `[0,100]`; at least one `active` phase; and
cohort integrity — every `phaseIds` member resolves (after alias + dedupe) to a real phase, with
alias cycles rejected. All other projects are skipped and keep the default-active behavior.
