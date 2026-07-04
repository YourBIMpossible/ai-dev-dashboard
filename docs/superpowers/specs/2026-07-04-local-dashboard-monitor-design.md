# Local Dashboard Monitor — Design Spec

## Problem

The dashboard is a static site refreshed once a day at 6am (via `Refresh-Dashboard.ps1`, run from the
dedicated `Dashboard-auto` clone) and deployed via git push to Cloudflare Pages. Day-to-day monitoring
means viewing a URL that lags reality by up to 24 hours, or waiting through a full push+deploy cycle to
see anything change. There's no way to just watch the dashboard update live while working.

## Goals

- A local server serving the dashboard from this editing clone (`F:\AI-Dev\Dashboard`), reachable at
  `http://localhost:8080`.
- A local refresh loop that recomputes the data files (phases/waves, activity, phase DAG, impact,
  agents, usage) every ~2 minutes, writing straight to disk.
- The open browser tab auto-reloads shortly after any of those files actually change — no manual
  refresh.
- One command to start, one command to stop.

## Non-goals

- Replacing the public Cloudflare Pages deploy or its daily 6am refresh/push pipeline
  (`Refresh-Dashboard.ps1` in `Dashboard-auto`) — that continues completely unchanged.
- Adding git commits or pushes to the fast loop, ever — this would violate the standing "never push
  mid-session" rule. All writes from this loop are disk-only.
- Refreshing the GitHub-Models prose bot (`sync_dashboard.py`) on a timer — it stays
  on-demand/push-triggered, to avoid putting LLM calls on a schedule.
- Refreshing `github_actions_sync.mjs` (depends on a manually-downloaded CSV from `~/Downloads`),
  `codebase_sync.mjs`, or `strategy_cowork_sync.mjs` (the one-click manual "→ Cowork" merge tool) — none
  of these are timer-appropriate.
- Editing `.claude/launch.json` — that's Claude Code's own ephemeral `preview_start` config (port 3333),
  unrelated to this persistent user-facing monitor (port 8080).
- State-preserving (partial) reload — v1 accepts full-page reload; revisit only if it proves genuinely
  annoying in daily use.

## Architecture

Two cooperating pieces, started together by one script, `Start-LocalMonitor.ps1`:

1. **`live-server`** (`npx live-server --port=8080`, run from the Dashboard directory) — serves the
   static files and handles file-watch + WebSocket reload + auto-reconnect out of the box. Port 8080 is
   deliberately different from port 3333, which `.claude/launch.json` already reserves for Claude Code's
   own `preview_start` tool, so the two can never collide.
2. **A refresh loop**, in the same PS1, that runs once immediately on startup and then every 120 seconds
   (a constant, easy to tune), executing the existing deterministic scripts in the same order and
   fatal/non-fatal split already established by `Refresh-Dashboard.ps1`:

   | Script | On failure |
   |---|---|
   | `sync_ledgers.py` | **ERROR**, log loudly (matches its "strict" role in the existing daily pipeline) |
   | `sync_activity.py` | WARN, continue |
   | `phase_dag.py` | WARN, continue |
   | `networkx_impact.py` | WARN, continue |
   | `node agents_sync.mjs --no-push` | WARN, continue |
   | `node usage_sync.mjs --no-push` | WARN, continue |

   Because the loop is a single sequential `while` (not independent timer-fired invocations), no cycle
   can ever overlap with itself — single-flight is structural, not a bolted-on lock.

`live-server`'s own file watcher notices whichever files the cycle actually rewrote and pushes the
reload — the refresh loop rewriting disk *is* the reload trigger; nothing new has to be wired between
the two halves.

Explicitly excluded from the loop: `validate_dashboard.py` (a push-time gate; irrelevant with no push),
and any `git add`/`commit`/`push` (none, ever, in this script).

## Components

- **`Start-LocalMonitor.ps1`** (new) — the single entry point.
  - Checks `_backups\monitor.lock` for a live PID; if one is already running, prints that and exits
    (refuses to double-launch). A stale PID (process no longer alive) is treated as leftover, not a real
    lock.
  - Starts `npx live-server --port=8080` from the Dashboard directory (default `live-server` behavior
    auto-opens a browser tab; trivial one-line flag to suppress later if that gets annoying).
  - Runs one refresh cycle immediately, then loops every 120s.
  - Reuses the same `Invoke-Logged` stderr-safety wrapper and `python`/`py` resolution already in
    `Refresh-Dashboard.ps1` (small, copied — not extracted into a shared module two independently-run
    scripts would depend on).
  - Logs to `_backups\monitor-log.txt`, with a banner stating the no-push contract.
  - Header comment states explicitly: **this script must never commit or push**; that logic belongs
    only in `Refresh-Dashboard.ps1` / `Dashboard-auto`.
- **`Stop-LocalMonitor.ps1`** (new) — reads the lock file's PID(s), stops the loop and the `live-server`
  process, removes the lock. No auto-restart of anything — stopping/restarting is always an explicit
  user action.
- **`Run-LocalRefreshOnce.ps1`** (new) — runs the same six-script cycle a single time, no server, no
  loop, for a manual "refresh now" without starting the whole monitor. Does not check the lock file —
  running it while the monitor loop is also active is harmless (both are idempotent renders over the
  same source ledgers) if slightly redundant.
- **`index.html`** (edit, ~line 981) — the sidebar footer's cadence caption becomes environment-aware:
  `localhost`/`127.0.0.1` shows "Local monitor: facts refresh ~2 min · prose on demand"; anywhere else
  keeps today's "Facts refresh daily 6am · prose on demand". Nothing else on the page changes — this is
  the only edit to a file that's also part of the public deploy.
- **`_backups\monitor.lock`, `_backups\monitor-log.txt`** (new, runtime-only) — `_backups/` is already
  gitignored, so nothing new to exclude.

## Data flow

1. User runs `Start-LocalMonitor.ps1`.
2. Lock check → `live-server` starts on 8080 → browser tab opens automatically.
3. Immediate refresh cycle runs (six scripts, strict/lenient per the table above) → rewrites `data.js` /
   `phase_dag.js` / `networkx_impact.js` / `agents.js` / `usage.js` on disk as applicable.
4. `live-server` notices the changed files, pushes a reload over its WebSocket, the open tab reloads.
5. Loop sleeps 120s, repeats steps 3-4 indefinitely.
6. User stops with Ctrl+C or `Stop-LocalMonitor.ps1`.
7. Entirely separate and unchanged: the daily 6am Task Scheduler entry still runs
   `Refresh-Dashboard.ps1` from `Dashboard-auto`, which still commits, pushes, and updates the public
   Cloudflare Pages URL. `sync_dashboard.py` still only runs on-demand/on source-repo push.

## Error handling

- `sync_ledgers.py` failing logs ERROR; that cycle's ledger-derived data (phases/waves) stays at its
  last good state (the script doesn't partial-write), and the other five scripts in that cycle still
  run.
- The other five scripts failing log WARN and are skipped for that cycle only; the next cycle tries
  again.
- `live-server` failing to start (e.g., port 8080 already bound) prints clearly and the script exits —
  no silent retry on a different port.
- A crashed `live-server` or crashed loop mid-session is logged clearly; nothing auto-respawns it.
  Restarting is always an explicit re-run of `Start-LocalMonitor.ps1` (or `Stop` then `Start`) — never a
  silent background restart.
- Double-launch is refused via the lock file, not silently allowed to spawn a duplicate.

## Testing / validation

- Start the monitor; confirm `http://localhost:8080` loads the dashboard.
- Edit/touch a ledger (or just wait one cycle); confirm the relevant `.js` file changes on disk and the
  open tab reloads within one ~2min cycle.
- Confirm `git status` shows no new commits from the monitor — only the same generated-file
  working-tree changes these scripts already produce today.
- Attempt to launch a second `Start-LocalMonitor.ps1` while one is running; confirm it refuses instead
  of spawning a duplicate.
- Confirm the daily Task Scheduler job / `Dashboard-auto` pipeline is untouched (different directory,
  different script, not modified by this work).
- Confirm the footer caption reads the local-monitor text at `localhost:8080` and the original
  daily-6am text when viewed at the public deployed URL.

## Known trade-offs (accepted for v1, not being solved now)

- Full-page reload on every cycle that changes something — may lose scroll position / open panel
  state. Revisit with state-preserving reload only if this proves genuinely annoying in daily use.
- The refresh loop runs in the same working tree you actively edit in (per your choice of the editing
  clone over `Dashboard-auto`) — the six scripts only ever touch their own generated output files, so
  this should be low-risk, but it's worth keeping in mind if you're ever mid-edit on one of those exact
  files when a cycle fires. `graph-metrics.js` itself is never written by this loop (per
  `REFRESH-SPEC.md` rule 11, it's produced only by `Update-Graph.ps1` on BIMpossible pushes), so today's
  uncommitted change to it is safe from this loop specifically.
