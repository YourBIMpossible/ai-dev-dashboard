# ============================================================
# Daily DETERMINISTIC dashboard refresh (no language model). Run by Task Scheduler.
#
#   1. Re-render progress.phases + waves straight from the owner-maintained ledgers
#      (BIMpossible_PHASE-STATUS.md / WAVE-STATUS.md) via sync_ledgers.py.
#   2. Stamp the `generated` date so the board never looks abandoned.
#   3. Hand off to push-dashboard.ps1, which VALIDATES phase numbering and only
#      then commits + pushes.
#
# The soft prose fields (oneLiner / focus / recent) are still updated event-driven
# by the GitHub-Models bot when a source repo is pushed (sync_dashboard.py, which is
# now hard-blocked from progress/waves). So: phases + waves + freshness are correct
# every single day with zero model calls, and prose stays live on push.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$log = Join-Path $PSScriptRoot "_backups\refresh-log.txt"
$ts  = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"=== $ts  daily refresh start ===" | Add-Content -Path $log -Encoding utf8

$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) { $python = (Get-Command py -ErrorAction SilentlyContinue).Source }
if (-not $python) {
    "ERROR: python not found on PATH — cannot refresh." | Add-Content -Path $log -Encoding utf8
    exit 1
}

# 1. Render phases + waves from the ledgers.
& $python "$PSScriptRoot\sync_ledgers.py" 2>&1 | Add-Content -Path $log -Encoding utf8
if ($LASTEXITCODE -ne 0) {
    "ERROR: sync_ledgers.py failed — aborting (nothing pushed)." | Add-Content -Path $log -Encoding utf8
    exit 1
}

# 2. Stamp the generated date (UTF-8, no BOM via .NET; only two lines change).
$today = Get-Date -Format "yyyy-MM-dd"
$path  = Join-Path $PSScriptRoot "data.js"
$text  = [System.IO.File]::ReadAllText($path)
$text  = [regex]::Replace($text, 'generated: "\d{4}-\d{2}-\d{2}"', "generated: `"$today`"")
$text  = [regex]::Replace($text, 'generatedBy: "[^"]*"', 'generatedBy: "scheduled refresh"')
[System.IO.File]::WriteAllText($path, $text)

# 3. Validate + commit + push (push-dashboard.ps1 runs the guard and aborts on failure).
& "$PSScriptRoot\push-dashboard.ps1" 2>&1 | Add-Content -Path $log -Encoding utf8

"=== $ts  daily refresh done ===" | Add-Content -Path $log -Encoding utf8
