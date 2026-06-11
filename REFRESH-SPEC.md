# Dashboard Refresh Spec (schema v3)

Instructions for any Claude session (scheduled or on-demand "refresh dashboard") that updates
`F:\AI-Dev\Dashboard\data.js`. The HTML shell (`index.html`) never needs touching on a refresh.

## Rules

1. **Only rewrite `data.js`.** Do not modify `index.html` or this file during a routine refresh.
2. Update `generated` (YYYY-MM-DD) and `generatedBy` ("scheduled refresh" or "on-demand refresh").
3. Read-only refresh: scan sources; do NOT modify project files, or create files outside `Dashboard\`.
4. **After writing data.js**, run `powershell -File "F:\AI-Dev\Dashboard\push-dashboard.ps1"` to commit and push to GitHub. This is the only permitted git mutation during a refresh.
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

## Per-project sources

### bimpossible - BIMpossible Platform
- `git -C F:\AI-Dev\BIMpossible log --oneline --all --since="7 days ago"` + branches + unpushed check (rule 9)
- `F:\AI-Dev\BIMpossible_Workspace\00_Strategy\` - newest dated docs (`YYYY-MM-DD__*.md`) by filename date AND the newest `BIMpossible_STATE_*.md`. If the STATE doc trails the newest dated doc by >5 days, flag it in `reminders`.
- `F:\AI-Dev\BIMpossible_Workspace\01_BuildLog\` - newest 3 files
- Workspace memory: `project_bimpossible-state.md`, `project_followups-queue.md`, `open-questions.md`
- Graph metrics: `F:\AI-Dev\Dashboard\graph-metrics.js` (`window.GRAPH_METRICS`, last entry) - read-only staleness check per rule 10. Produced by `Update-Graph.ps1` on push/wave; never written by the refresh.

### addins - Add-Ins / RevitLink
- `git -C F:\AI-Dev\Add-Ins log -5` + branch + unpushed check
- `F:\AI-Dev\Add-Ins\TOOL_BACKLOG.md` - BOTH tables: RevitLink backlog (status column drives RevitLink `progress.phases` pct) and Trade QA Scanners
- `F:\AI-Dev\Add-Ins\BIMpossible.RevitLink\DEV-NOTES.md` + its CLAUDE.md "Open items"
- **ZIM Tools (RevitAddin_Z) is RETIRED (2026-05) - do NOT include it.** Never add a ZIM Tools phase, reminder, or mention to the addins entry, regardless of what `add-ins-state.md` or `Add-Ins/CLAUDE.md` still say about it.

### site - BIMpossible Site
- `F:\AI-Dev\BIMpossible Site\01_BuildLog\` newest files; `00_README.md`; `IP-Lockdown-Checklist.md` (checked items drive progress)

### pickem - Preseason Pick'em
- `F:\AI-Dev\Preseason Pick'em\01_BuildLog\` + `WORKSPACE_INDEX.md`; app folder mtimes as fallback

### laundry - Laundry Gig
- No state doc yet (flagged). Folder mtimes; check `docs\`.

### families - Families by AI
- `F:\AI-Dev\Families by AI\tool\README.md` + folder mtimes

## Audit ingestion (every refresh - daily, Monday, and on-demand)

Each project may carry an `audit` block. BIMpossible is audited weekly (the report is written Monday
morning); ANY project can be audited on demand, and every run writes a report file. The refresh does
NOT run the audit tool - it READS the newest report each project has produced and extracts the OPEN
findings. Because the daily refresh runs at ~6 AM, Monday's report is surfaced that morning; on-demand
reports for any project are picked up by the next refresh (say "refresh dashboard" after running one).

For each project, find the newest audit report, then populate its `audit` block:
- **bimpossible** - newest audit across BOTH locations (the audit archive was reorganized 2026-06-10):
  (a) `F:\AI-Dev\BIMpossible_Workspace\02_Reference\Audit Reports\` - the 2026-06-10-onward archive: full = `YYYY-MM-DD__audit-report-full.md`, incremental = `YYYY-MM-DD__audit-report.md`, same-day reruns append `-2`/`-3`. On a same-date tie prefer `-full`, else the highest numeric suffix.
  (b) legacy `F:\AI-Dev\BIMpossible_Workspace\02_Reference\` root - pre-2026-06-10 reports (`YYYY-MM-DD_BIMpossible_Weekly_Foundation_Audit.md`, FullProject / PerpAudit runs).
  **Recurse into `Audit Reports\`** and **match `audit` case-insensitively** (the new files are lowercase `audit-report`, which the old `*Audit*.md` glob silently skipped). Pick the newest by filename date across both. **Do NOT** ingest `02_Reference\Audit and Scan Info\` - that folder is security reviews + the living Verification Checklist (a working hub), NOT periodic audits. Ledger: `02_Reference\_audit-runs.md`.
- **addins** - newest `F:\AI-Dev\Add-Ins\audits\*.md`.
- **site** - newest `F:\AI-Dev\BIMpossible Site\01_BuildLog\*audit*.md`; ledger `_site-audit-runs.md`.
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
truth is the ledger `F:\AI-Dev\BIMpossible_Workspace\00_Strategy\BIMpossible_WAVE-STATUS.md` (one row per
wave). It is **push-independent** — read it EVERY refresh and populate the `waves` block. NEVER write it.
This is what stops wave completions slipping when builds land without a fresh build-log or push.

1. Parse the ledger table `Wave | Title | Status | Date | Note`. Status vocabulary:
   `PLANNED | PENDING | ACTIVE | PARTIAL | BUILT | SHIPPED | CLOSED` (+ `SCOPE-LOCK`). BUILT = code shipped,
   hardening owed; CLOSED = formal close-out doc.
2. `summary` buckets: `done` = SHIPPED+CLOSED; `built` = BUILT; `inFlight` = ACTIVE+PARTIAL; `ahead` = PLANNED+PENDING+SCOPE-LOCK.
3. `current` = every ACTIVE/PARTIAL/BUILT row + the next 1-2 SCOPE-LOCK/PLANNED, terse `{ id, title, status, date?, note? }`, cap ~6.
4. `lastCompleted` = newest SHIPPED/CLOSED row by Date. `updated` = the ledger's **Updated:** line. `source` = the ledger path.
5. **Drift cross-check (catches delayed pushes) -> `waves.drift`, mirror the worst into `reminders`:**
   - `git -C F:\AI-Dev\BIMpossible tag --list 'wave-*-complete'` (read-only).
     - If ZERO such tags exist (the tagging ritual isn't in use - current reality), emit ONE note "no wave-*-complete tags; ledger is the sole completion signal" and **skip** per-wave tag drift (do NOT flag every done wave - that's noise, not signal).
     - If tags DO exist: a tag with no CLOSED/SHIPPED ledger row -> "Wave N tagged complete in git, ledger still says X - update ledger"; a CLOSED/SHIPPED ledger row with no matching tag -> "Wave N done in ledger, not yet tagged/pushed" (the unpushed-completion signal, the point of this check).
   - newest `01_BuildLog\*closeout*.md` for a wave the ledger doesn't show CLOSED -> flag it.
   - NEVER run `Complete-Wave.ps1` or create tags - read only.
6. Ledger missing -> keep the previous `waves` block, add a reminder.

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
      phases: [{ name, pct, note?,
                 tasks?: [{ label, status, note? }] }]  // status in done|active|pending|blocked.
                                       // pct 0-100 per phase; shell averages for the overall donut.
                                       // PRESERVE existing tasks across refreshes; flip statuses as work lands.
    },
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
