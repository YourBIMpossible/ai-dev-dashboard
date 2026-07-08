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
