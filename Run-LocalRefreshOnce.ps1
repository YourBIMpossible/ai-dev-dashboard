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
