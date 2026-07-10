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
$PORT             = 8081
$INTERVAL_SECONDS = 120

. "$PSScriptRoot\LocalMonitor.Common.ps1"

# --- Lock check: refuse to double-launch. ---
if (Test-Path $lockPath) {
    $existing = $null
    $parseOk = $true
    try {
        $existing = Get-Content $lockPath -Raw | ConvertFrom-Json
    } catch {
        $parseOk = $false
    }
    if ($parseOk -and $existing -and $existing.monitorPid) {
        $stillRunning = Get-Process -Id $existing.monitorPid -ErrorAction SilentlyContinue
        if ($stillRunning) {
            Write-Host "Local monitor already running (PID $($existing.monitorPid)). Use Stop-LocalMonitor.ps1 to stop it first."
            exit 1
        } else {
            "Stale lock file found (PID $($existing.monitorPid) not running) - overwriting." | Add-Content -Path $log -Encoding utf8
        }
    } else {
        "Corrupt/unreadable lock file - treating as stale and overwriting." | Add-Content -Path $log -Encoding utf8
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

        if (-not (Get-Process -Id $liveServerProc.Id -ErrorAction SilentlyContinue)) {
            "ERROR: live-server (PID $($liveServerProc.Id)) is no longer running - stopping monitor. Re-run Start-LocalMonitor.ps1 to restart." | Add-Content -Path $log -Encoding utf8
            break
        }

        Start-Sleep -Seconds $INTERVAL_SECONDS
    }
} catch {
    "ERROR: monitor loop crashed - $($_.Exception.Message)" | Add-Content -Path $log -Encoding utf8
} finally {
    "=== monitor stopping - cleaning up live-server (PID $($liveServerProc.Id)) ===" | Add-Content -Path $log -Encoding utf8
    try { & taskkill /PID $liveServerProc.Id /T /F 2>$null | Out-Null } catch {}
    Remove-Item $lockPath -Force -ErrorAction SilentlyContinue
}
