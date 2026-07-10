# ============================================================
# Local dashboard monitor: live-reload static server + disk-only refresh
# loop. For watching the dashboard update in near-real-time while working.
# Also serves a loopback-only GET /refresh endpoint (port $REFRESH_PORT)
# that the site's "Refresh now" button calls to force an immediate cycle
# on demand, instead of waiting for the next 2-minute tick.
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
$REFRESH_PORT     = 8082
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

$lockData = @{ monitorPid = $PID; liveServerPid = $liveServerProc.Id; refreshPort = $REFRESH_PORT } | ConvertTo-Json
Set-Content -Path $lockPath -Value $lockData -Encoding utf8

# --- On-demand refresh listener: loopback-only (no netsh/admin needed since
#     the prefix is "localhost", not "+"/"*"). If it fails to bind, the
#     2-minute loop still runs - only the button's instant refresh is lost. ---
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$REFRESH_PORT/")
try {
    $listener.Start()
} catch {
    "WARN: could not bind refresh listener on port $REFRESH_PORT - $($_.Exception.Message). On-demand refresh disabled; the $INTERVAL_SECONDS-second loop still runs." | Add-Content -Path $log -Encoding utf8
    $listener = $null
}

function Send-RefreshResponse {
    param([Parameter(Mandatory)]$Context, [Parameter(Mandatory)][int]$StatusCode, [Parameter(Mandatory)][string]$Json)
    $resp = $Context.Response
    $resp.StatusCode = $StatusCode
    $resp.ContentType = "application/json"
    $resp.Headers.Add("Access-Control-Allow-Origin", "*")
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($Json)
    $resp.ContentLength64 = $buffer.Length
    $resp.OutputStream.Write($buffer, 0, $buffer.Length)
    $resp.OutputStream.Close()
}

Write-Host "Local dashboard monitor running: http://localhost:$PORT"
if ($listener) { Write-Host "On-demand refresh: http://localhost:$REFRESH_PORT/refresh" }
Write-Host "Background cycle every $INTERVAL_SECONDS seconds. Log: $log"
Write-Host "Press Ctrl+C to stop."

$pendingCtx = if ($listener) { $listener.BeginGetContext($null, $null) } else { $null }
$nextCycleAt = Get-Date

try {
    while ($true) {
        if (-not (Get-Process -Id $liveServerProc.Id -ErrorAction SilentlyContinue)) {
            "ERROR: live-server (PID $($liveServerProc.Id)) is no longer running - stopping monitor. Re-run Start-LocalMonitor.ps1 to restart." | Add-Content -Path $log -Encoding utf8
            break
        }

        if ((Get-Date) -ge $nextCycleAt) {
            Invoke-RefreshCycle -PythonExe $python | Out-Null
            $nextCycleAt = (Get-Date).AddSeconds($INTERVAL_SECONDS)
        }

        if ($pendingCtx) {
            if ($pendingCtx.AsyncWaitHandle.WaitOne(1000)) {
                $context = $listener.EndGetContext($pendingCtx)
                if ($context.Request.HttpMethod -eq "GET" -and $context.Request.Url.AbsolutePath -eq "/refresh") {
                    "--- on-demand refresh requested ---" | Add-Content -Path $log -Encoding utf8
                    Invoke-RefreshCycle -PythonExe $python | Out-Null
                    $nextCycleAt = (Get-Date).AddSeconds($INTERVAL_SECONDS)
                    Send-RefreshResponse -Context $context -StatusCode 200 -Json (@{ ok = $true; generated = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") } | ConvertTo-Json -Compress)
                } else {
                    Send-RefreshResponse -Context $context -StatusCode 404 -Json '{"ok":false,"error":"not found"}'
                }
                $pendingCtx = $listener.BeginGetContext($null, $null)
            }
        } else {
            Start-Sleep -Seconds 1
        }
    }
} catch {
    "ERROR: monitor loop crashed - $($_.Exception.Message)" | Add-Content -Path $log -Encoding utf8
} finally {
    "=== monitor stopping - cleaning up live-server (PID $($liveServerProc.Id)) ===" | Add-Content -Path $log -Encoding utf8
    try { & taskkill /PID $liveServerProc.Id /T /F 2>$null | Out-Null } catch {}
    if ($listener) { try { $listener.Stop(); $listener.Close() } catch {} }
    Remove-Item $lockPath -Force -ErrorAction SilentlyContinue
}
