# Local Dashboard Monitor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a local live-reload dashboard monitor — a static server plus a disk-only refresh loop — so the dashboard can be watched updating roughly every 2 minutes, without touching the daily push/deploy pipeline.

**Architecture:** A shared PowerShell helper module (`LocalMonitor.Common.ps1`) wraps the existing deterministic sync scripts into one refresh cycle and writes their output straight to disk. `Start-LocalMonitor.ps1` runs that cycle once immediately, then every 120s in a loop, while `npx live-server` serves the folder and auto-reloads any open browser tab when the cycle actually changes a file. A PID-based lock file (`_backups\monitor.lock`) prevents double-launching and lets `Stop-LocalMonitor.ps1` cleanly stop both the loop and its `live-server` child from any window. `Run-LocalRefreshOnce.ps1` exposes the same cycle without the server/loop, for a manual one-off refresh.

**Tech Stack:** PowerShell 5.1 (Windows), Node.js (`npx live-server`; existing `agents_sync.mjs` / `usage_sync.mjs`), Python (existing `sync_ledgers.py` / `sync_activity.py` / `phase_dag.py` / `networkx_impact.py`), vanilla JS (`index.html` inline script).

This implements `docs/superpowers/specs/2026-07-04-local-dashboard-monitor-design.md` — read that first if anything below seems under-motivated.

## Global Constraints

- **Never `git add`/`commit`/`push`** from any script in this plan. Git history and the public Cloudflare Pages deploy stay owned exclusively by `Refresh-Dashboard.ps1`, run from the separate `Dashboard-auto` clone on its own daily 6am schedule.
- **Port 8080** is this monitor's `live-server` port. **Port 3333** stays reserved for Claude Code's own `.claude/launch.json` preview config — never reuse it, never edit that file.
- Refresh interval is **120 seconds** (a named constant, not a magic number scattered around), run once immediately on start, then every 120s thereafter.
- New runtime files (`monitor-log.txt`, `monitor.lock`) live under `_backups\`, which is already gitignored.
- Only `sync_ledgers.py` failing is **STRICT** (logged as `ERROR`); `sync_activity.py`, `phase_dag.py`, `networkx_impact.py`, `agents_sync.mjs --no-push`, and `usage_sync.mjs --no-push` are **lenient** (logged as `WARN`, cycle continues).
- Do **not** add `sync_dashboard.py` (LLM prose bot), `github_actions_sync.mjs` (depends on a manually-downloaded CSV), `codebase_sync.mjs`, or `strategy_cowork_sync.mjs` to the refresh cycle — explicitly out of scope per the spec's Non-goals.
- No auto-restart of a crashed `live-server` or crashed loop. Restarting is always an explicit user action (`Start-LocalMonitor.ps1`, optionally after `Stop-LocalMonitor.ps1`).
- PowerShell **5.1**-compatible syntax only (matches `Refresh-Dashboard.ps1`'s documented constraint) — no ternary (`?:`), no null-coalescing (`??`).
- This codebase has no automated test framework for its PowerShell/Python/Node tooling (confirmed: no `tests/` directory anywhere under `Dashboard\`). Verification in this plan is concrete manual commands with exact expected output, matching how `Refresh-Dashboard.ps1` and its sibling scripts are already validated — not a fabricated unit-test suite.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `LocalMonitor.Common.ps1` | Create | `Invoke-Logged`, `Get-PythonExe`, `Invoke-RefreshCycle` — the one place the six-script cycle and its strict/lenient rules are defined. |
| `Run-LocalRefreshOnce.ps1` | Create | Manual one-shot refresh: no server, no loop. |
| `Start-LocalMonitor.ps1` | Create | Starts `live-server` + the 120s refresh loop; owns the lock file. |
| `Stop-LocalMonitor.ps1` | Create | Stops whatever `Start-LocalMonitor.ps1` started, from any window. |
| `index.html` | Modify (~line 980-981) | Footer caption becomes environment-aware (localhost vs public deploy). |

`LocalMonitor.Common.ps1` exists because `Run-LocalRefreshOnce.ps1` and `Start-LocalMonitor.ps1` must run the *identical* six-script cycle in the *identical* order/strictness — duplicating that logic across two files would let them drift out of sync the first time someone tunes the script list.

---

### Task 1: Shared Refresh-Cycle Helpers

**Files:**
- Create: `F:\AI-Dev\Dashboard\LocalMonitor.Common.ps1`

**Interfaces:**
- Consumes: nothing (foundational).
- Produces (for Tasks 2 and 3):
  - `Invoke-Logged([string]$Exe, [string[]]$Arguments) -> int` (exit code; appends combined output to the caller's `$log`)
  - `Get-PythonExe() -> string` (path to `python` or `py`, empty/`$null` if neither found)
  - `Invoke-RefreshCycle([string]$PythonExe) -> bool` (`$true` unless `sync_ledgers.py` failed; requires the caller to have already set `$log` before dot-sourcing this file)

- [ ] **Step 1: Write `LocalMonitor.Common.ps1`**

```powershell
# ============================================================
# Shared helpers for the local dashboard monitor (Start-LocalMonitor.ps1 /
# Run-LocalRefreshOnce.ps1). Dot-source this file; it expects the caller to
# have already set $log (path to the monitor's log file) before dot-sourcing.
#
# LOCAL-ONLY CONTRACT: nothing in this file may call git add/commit/push.
# All six scripts below write straight to disk. Git history is owned
# exclusively by Refresh-Dashboard.ps1 (Dashboard-auto) - do not add
# pushing here. See docs/superpowers/specs/2026-07-04-local-dashboard-monitor-design.md.
# ============================================================

# Run a native command (python / node) without letting its benign stderr
# terminate the script. Logs combined output; returns the real exit code via
# $LASTEXITCODE. Mirrors Refresh-Dashboard.ps1's Invoke-Logged exactly.
function Invoke-Logged {
    param([Parameter(Mandatory)][string]$Exe, [string[]]$Arguments = @())
    $eap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    $out  = & $Exe @Arguments 2>&1 | ForEach-Object { "$_" }
    $code = $LASTEXITCODE
    $ErrorActionPreference = $eap
    if ($out) { $out | Add-Content -Path $log -Encoding utf8 }
    return $code
}

function Get-PythonExe {
    $py = (Get-Command python -ErrorAction SilentlyContinue).Source
    if (-not $py) { $py = (Get-Command py -ErrorAction SilentlyContinue).Source }
    return $py
}

# Runs the six local/deterministic refresh scripts once, in the same order
# and strictness Refresh-Dashboard.ps1 uses for the daily pipeline, minus
# anything that touches git. Returns $true if the strict stage
# (sync_ledgers.py) succeeded, $false if the whole cycle should be
# considered failed.
function Invoke-RefreshCycle {
    param([Parameter(Mandatory)][string]$PythonExe)

    $cycleStart = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "--- refresh cycle $cycleStart ---" | Add-Content -Path $log -Encoding utf8

    if ((Invoke-Logged $PythonExe @("$PSScriptRoot\sync_ledgers.py")) -ne 0) {
        "ERROR: sync_ledgers.py failed - phases/waves not refreshed this cycle." | Add-Content -Path $log -Encoding utf8
        return $false
    }

    if ((Invoke-Logged $PythonExe @("$PSScriptRoot\sync_activity.py")) -ne 0) {
        "WARN: sync_activity.py failed - activity/dates not refreshed this cycle." | Add-Content -Path $log -Encoding utf8
    }
    if ((Invoke-Logged $PythonExe @("$PSScriptRoot\phase_dag.py")) -ne 0) {
        "WARN: phase_dag.py failed - phase DAG not refreshed this cycle." | Add-Content -Path $log -Encoding utf8
    }
    if ((Invoke-Logged $PythonExe @("$PSScriptRoot\networkx_impact.py")) -ne 0) {
        "WARN: networkx_impact.py failed - impact data not refreshed this cycle." | Add-Content -Path $log -Encoding utf8
    }
    if ((Invoke-Logged "node" @("$PSScriptRoot\agents_sync.mjs","--no-push")) -ne 0) {
        "WARN: agents_sync.mjs failed - agents/health tabs not refreshed this cycle." | Add-Content -Path $log -Encoding utf8
    }
    if ((Invoke-Logged "node" @("$PSScriptRoot\usage_sync.mjs","--no-push")) -ne 0) {
        "WARN: usage_sync.mjs failed - usage tab not refreshed this cycle." | Add-Content -Path $log -Encoding utf8
    }

    "--- refresh cycle done ---" | Add-Content -Path $log -Encoding utf8
    return $true
}
```

- [ ] **Step 2: Verify the helpers work in isolation**

Run:
```powershell
cd F:\AI-Dev\Dashboard
if (-not (Test-Path "_backups")) { New-Item -ItemType Directory -Path "_backups" -Force | Out-Null }
$log = Join-Path (Get-Location) "_backups\test-common-log.txt"
Remove-Item $log -Force -ErrorAction SilentlyContinue
. .\LocalMonitor.Common.ps1
Invoke-Logged "cmd.exe" @("/c","echo hello-from-invoke-logged") | Out-Null
Get-Content $log
$py = Get-PythonExe
Write-Host "python resolved to: [$py]"
Remove-Item $log -Force
```

Expected:
- `Get-Content $log` prints a line containing `hello-from-invoke-logged`.
- `python resolved to: [...]` shows a non-empty path (this machine already runs `Refresh-Dashboard.ps1` successfully, so `python`/`py` is on PATH).

- [ ] **Step 3: Commit**

```bash
git add LocalMonitor.Common.ps1
git commit -m "feat: add shared refresh-cycle helpers for local dashboard monitor"
```

---

### Task 2: One-Shot Manual Refresh

**Files:**
- Create: `F:\AI-Dev\Dashboard\Run-LocalRefreshOnce.ps1`

**Interfaces:**
- Consumes: `LocalMonitor.Common.ps1`'s `Get-PythonExe`, `Invoke-RefreshCycle` (Task 1).
- Produces: nothing further consumes this file; it's a standalone manual entry point.

- [ ] **Step 1: Write `Run-LocalRefreshOnce.ps1`**

```powershell
# ============================================================
# Runs the same six-script local refresh cycle once, with no server and no
# loop - for a manual "refresh now" without starting the whole monitor.
# Safe to run even while Start-LocalMonitor.ps1's loop is active elsewhere
# (both are idempotent renders over the same source ledgers).
#
# Usage: powershell -File Run-LocalRefreshOnce.ps1
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$backups = Join-Path $PSScriptRoot "_backups"
if (-not (Test-Path $backups)) { New-Item -ItemType Directory -Path $backups -Force | Out-Null }
$log     = Join-Path $backups "monitor-log.txt"

. "$PSScriptRoot\LocalMonitor.Common.ps1"

$python = Get-PythonExe
if (-not $python) { Write-Host "python not found on PATH - cannot refresh."; exit 1 }

$ok = Invoke-RefreshCycle -PythonExe $python
if ($ok) {
    Write-Host "Refresh cycle complete. See $log for details."
    exit 0
} else {
    Write-Host "Refresh cycle FAILED (sync_ledgers.py). See $log for details."
    exit 1
}
```

- [ ] **Step 2: Run it for real and inspect the log**

Run:
```powershell
cd F:\AI-Dev\Dashboard
powershell -File .\Run-LocalRefreshOnce.ps1
Write-Host "Exit code: $LASTEXITCODE"
Get-Content .\_backups\monitor-log.txt -Tail 15
```

Expected:
- `Exit code: 0`
- Log tail shows a `--- refresh cycle ... ---` start line and a `--- refresh cycle done ---` line, with no `ERROR:` line in between (`WARN:` lines are acceptable — they just mean a lenient script had nothing new to do or hit a non-fatal hiccup).

- [ ] **Step 3: Commit**

```bash
git add Run-LocalRefreshOnce.ps1
git commit -m "feat: add one-shot manual refresh script for local dashboard monitor"
```

---

### Task 3: Live-Reload Monitor Loop

**Files:**
- Create: `F:\AI-Dev\Dashboard\Start-LocalMonitor.ps1`

**Interfaces:**
- Consumes: `LocalMonitor.Common.ps1`'s `Get-PythonExe`, `Invoke-RefreshCycle` (Task 1).
- Produces (for Task 4): `_backups\monitor.lock`, a JSON file `{"monitorPid": <int>, "liveServerPid": <int>}`.

- [ ] **Step 1: Write `Start-LocalMonitor.ps1`**

```powershell
# ============================================================
# Local dashboard monitor: live-reload static server + disk-only refresh
# loop. For watching the dashboard update in near-real-time while working.
#
# LOCAL-ONLY CONTRACT: this script must NEVER git add/commit/push. It only
# reruns the deterministic renderers and writes their output to disk.
# Git history + the public Cloudflare Pages deploy are owned exclusively by
# Refresh-Dashboard.ps1, run from the separate Dashboard-auto clone on its
# own daily 6am schedule. Do not add push logic here - see
# docs/superpowers/specs/2026-07-04-local-dashboard-monitor-design.md.
#
# Usage: powershell -File Start-LocalMonitor.ps1
# Stop with Ctrl+C, or from another window: powershell -File Stop-LocalMonitor.ps1
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$backups          = Join-Path $PSScriptRoot "_backups"
if (-not (Test-Path $backups)) { New-Item -ItemType Directory -Path $backups -Force | Out-Null }
$log              = Join-Path $backups "monitor-log.txt"
$lockPath         = Join-Path $backups "monitor.lock"
$PORT             = 8080
$INTERVAL_SECONDS = 120

. "$PSScriptRoot\LocalMonitor.Common.ps1"

# --- Lock check: refuse to double-launch. ---
if (Test-Path $lockPath) {
    $existing = Get-Content $lockPath -Raw | ConvertFrom-Json
    $stillRunning = Get-Process -Id $existing.monitorPid -ErrorAction SilentlyContinue
    if ($stillRunning) {
        Write-Host "Local monitor already running (PID $($existing.monitorPid)). Use Stop-LocalMonitor.ps1 to stop it first."
        exit 1
    } else {
        "Stale lock file found (PID $($existing.monitorPid) not running) - overwriting." | Add-Content -Path $log -Encoding utf8
    }
}

$python = Get-PythonExe
if (-not $python) { Write-Host "python not found on PATH - cannot refresh."; exit 1 }

$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"=== $ts monitor start (port $PORT, interval ${INTERVAL_SECONDS}s) - LOCAL ONLY, NEVER PUSHES ===" | Add-Content -Path $log -Encoding utf8

# --- Start live-server as a child process. Routed through cmd.exe so
#     npx.cmd resolves the same way it would from an interactive prompt,
#     and --yes so a not-yet-cached live-server install can't block on an
#     interactive confirmation prompt inside a hidden window. ---
$liveServerProc = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "npx --yes live-server --port=$PORT" `
    -WorkingDirectory $PSScriptRoot `
    -WindowStyle Hidden `
    -PassThru

# Cheap best-effort check for the most common failure (port already bound):
# if live-server's process has already exited a couple seconds after
# launch, don't silently proceed as if it's healthy.
Start-Sleep -Seconds 2
if (-not (Get-Process -Id $liveServerProc.Id -ErrorAction SilentlyContinue)) {
    "ERROR: live-server exited immediately after starting - port $PORT may already be in use." | Add-Content -Path $log -Encoding utf8
    Write-Host "live-server failed to start - port $PORT may already be in use. See $log."
    exit 1
}

$lockData = @{ monitorPid = $PID; liveServerPid = $liveServerProc.Id } | ConvertTo-Json
Set-Content -Path $lockPath -Value $lockData -Encoding utf8

Write-Host "Local dashboard monitor running: http://localhost:$PORT"
Write-Host "Refreshing every $INTERVAL_SECONDS seconds. Log: $log"
Write-Host "Press Ctrl+C to stop."

try {
    while ($true) {
        Invoke-RefreshCycle -PythonExe $python | Out-Null
        Start-Sleep -Seconds $INTERVAL_SECONDS
    }
} finally {
    "=== monitor stopping - cleaning up live-server (PID $($liveServerProc.Id)) ===" | Add-Content -Path $log -Encoding utf8
    try { & taskkill /PID $liveServerProc.Id /T /F 2>$null | Out-Null } catch {}
    Remove-Item $lockPath -Force -ErrorAction SilentlyContinue
}
```

- [ ] **Step 2: Start it, confirm it serves and refreshes, then clean up manually**

`Stop-LocalMonitor.ps1` doesn't exist until Task 4, so this step cleans up by hand using the same lock file it will later read.

Run:
```powershell
cd F:\AI-Dev\Dashboard
Start-Process powershell -ArgumentList "-ExecutionPolicy","Bypass","-File","Start-LocalMonitor.ps1" -WorkingDirectory (Get-Location) -WindowStyle Hidden

$ok = $false
for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 3
    try {
        $resp = Invoke-WebRequest "http://localhost:8080" -UseBasicParsing -TimeoutSec 5
        if ($resp.StatusCode -eq 200) { $ok = $true; break }
    } catch {}
}
Write-Host "Server reachable: $ok"
Get-Content .\_backups\monitor-log.txt -Tail 10
$lock = Get-Content .\_backups\monitor.lock -Raw | ConvertFrom-Json
Write-Host "monitorPid=$($lock.monitorPid) liveServerPid=$($lock.liveServerPid)"
Get-Process -Id $lock.monitorPid,$lock.liveServerPid | Format-Table Id,ProcessName

# Manual cleanup (Stop-LocalMonitor.ps1 doesn't exist until Task 4)
taskkill /PID $lock.monitorPid /T /F 2>$null
taskkill /PID $lock.liveServerPid /T /F 2>$null
Remove-Item .\_backups\monitor.lock -Force -ErrorAction SilentlyContinue
```

Expected:
- `Server reachable: True` (allow up to ~60s on the very first run, since `npx --yes live-server` may need to download the package).
- Log tail shows at least one completed `--- refresh cycle ... ---` / `--- refresh cycle done ---` pair.
- `monitorPid=...  liveServerPid=...` both print non-empty integers.
- `Get-Process` lists both PIDs as running (one `powershell`, one `cmd`) before cleanup.

- [ ] **Step 3: Commit**

```bash
git add Start-LocalMonitor.ps1
git commit -m "feat: add live-reload monitor loop for local dashboard viewing"
```

---

### Task 4: Stop Script

**Files:**
- Create: `F:\AI-Dev\Dashboard\Stop-LocalMonitor.ps1`

**Interfaces:**
- Consumes: the `_backups\monitor.lock` JSON schema `{monitorPid, liveServerPid}` produced by Task 3.
- Produces: nothing further consumes this file.

- [ ] **Step 1: Write `Stop-LocalMonitor.ps1`**

```powershell
# ============================================================
# Stops a running Start-LocalMonitor.ps1 (the refresh loop + its
# live-server child), from any window - not just the one it started in.
#
# Usage: powershell -File Stop-LocalMonitor.ps1
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$backups  = Join-Path $PSScriptRoot "_backups"
$log      = Join-Path $backups "monitor-log.txt"
$lockPath = Join-Path $backups "monitor.lock"

if (-not (Test-Path $lockPath)) {
    Write-Host "No monitor.lock found - nothing appears to be running."
    exit 0
}

$existing = Get-Content $lockPath -Raw | ConvertFrom-Json
$stopped = $false

foreach ($procId in @($existing.monitorPid, $existing.liveServerPid)) {
    $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
    if ($proc) {
        & taskkill /PID $procId /T /F 2>$null | Out-Null
        $stopped = $true
    }
}

Remove-Item $lockPath -Force -ErrorAction SilentlyContinue

if (Test-Path $backups) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "=== $ts monitor stopped via Stop-LocalMonitor.ps1 ===" | Add-Content -Path $log -Encoding utf8
}

if ($stopped) {
    Write-Host "Local dashboard monitor stopped."
} else {
    Write-Host "Lock file found but no matching process was running - removed stale lock."
}
```

- [ ] **Step 2: Start the monitor, then stop it with this script, and confirm it actually stopped**

Run:
```powershell
cd F:\AI-Dev\Dashboard
Start-Process powershell -ArgumentList "-ExecutionPolicy","Bypass","-File","Start-LocalMonitor.ps1" -WorkingDirectory (Get-Location) -WindowStyle Hidden
Start-Sleep -Seconds 8
Write-Host "Lock present before stop: $(Test-Path .\_backups\monitor.lock)"

powershell -File .\Stop-LocalMonitor.ps1

Start-Sleep -Seconds 2
Write-Host "Lock present after stop: $(Test-Path .\_backups\monitor.lock)"
try {
    Invoke-WebRequest "http://localhost:8080" -UseBasicParsing -TimeoutSec 3 | Out-Null
    Write-Host "ERROR: server still responding"
} catch {
    Write-Host "Confirmed: server no longer responding"
}
```

Expected:
- `Lock present before stop: True`
- `Lock present after stop: False`
- `Confirmed: server no longer responding`

- [ ] **Step 3: Commit**

```bash
git add Stop-LocalMonitor.ps1
git commit -m "feat: add stop script for local dashboard monitor"
```

---

### Task 5: Environment-Aware Footer Caption

**Files:**
- Modify: `F:\AI-Dev\Dashboard\index.html:980-981`

**Interfaces:**
- Consumes: nothing from Tasks 1-4 (this is independent — `location.hostname` is `localhost` whether the page is served by the existing `.claude/launch.json` preview config on port 3333 or the new monitor on port 8080).
- Produces: nothing further consumes this.

- [ ] **Step 1: Edit the two lines**

Current (`index.html:980-981`):
```js
  const n=daysAgo(D.generated);
  h+=`<div class="side-foot">Data: ${D.generated} (${n<=0?'today':n+'d ago'})${n>=3?'<br><span class="warn">⚠ stale — say "refresh dashboard"</span>':''}<br>Facts refresh daily 6am · prose on demand</div>`;
```

Replace with:
```js
  const n=daysAgo(D.generated);
  const _liveLocal=/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const _cadence=_liveLocal?'Local monitor: facts refresh ~2 min · prose on demand':'Facts refresh daily 6am · prose on demand';
  h+=`<div class="side-foot">Data: ${D.generated} (${n<=0?'today':n+'d ago'})${n>=3?'<br><span class="warn">⚠ stale — say "refresh dashboard"</span>':''}<br>${_cadence}</div>`;
```

- [ ] **Step 2: Verify the regex logic and the edit landed correctly**

Run:
```powershell
cd F:\AI-Dev\Dashboard
Select-String -Path index.html -Pattern "_liveLocal|_cadence"
node -e "const hn='localhost'; console.log(/^(localhost|127\.0\.0\.1)$/.test(hn))"
node -e "const hn='127.0.0.1'; console.log(/^(localhost|127\.0\.0\.1)$/.test(hn))"
node -e "const hn='dashboard-example.pages.dev'; console.log(/^(localhost|127\.0\.0\.1)$/.test(hn))"
```

Expected:
- `Select-String` shows both new lines (`_liveLocal` and `_cadence`) inside `index.html`.
- First two `node -e` calls print `true`.
- Third `node -e` call prints `false`.

Note (not a gating step, since not every executor may have a browser available): to see it rendered, start any local server against this folder — the pre-existing `.claude/launch.json` "dashboard" config (`npx serve` on port 3333) works fine for this, no need to wait for Task 3 — and open it; the sidebar footer should read "Local monitor: facts refresh ~2 min · prose on demand" instead of the daily-6am text.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: make dashboard footer caption environment-aware for local monitor"
```

---

## Post-Plan Manual Check (not a task — just confirm before considering this done)

- Run `git log --oneline -6` and confirm five new commits, one per task, with no unrelated files swept in.
- Confirm `_backups\monitor.lock` and `_backups\monitor-log.txt` do **not** show up in `git status` (they shouldn't — `_backups/` is already gitignored).
- Confirm the daily Task Scheduler entry ("BIMpossible Dashboard Daily Refresh") and `F:\AI-Dev\Dashboard-auto` are completely untouched by this work (different directory, no file in this plan lives there).
