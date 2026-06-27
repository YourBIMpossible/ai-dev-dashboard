# ============================================================
# Daily DETERMINISTIC dashboard refresh (no language model). Run by Task Scheduler.
#
#   1. Re-render progress.phases + waves straight from the owner-maintained ledgers
#      (BIMpossible_PHASE-STATUS.md / WAVE-STATUS.md) via sync_ledgers.py.
#   2. Stamp the `generated` date so the board never looks abandoned.
#   3. Hand off to push-dashboard.ps1, which VALIDATES phase numbering, then
#      fetch + rebase + pushes (failing loudly if the push is rejected).
#
# STDERR-SAFE: every native call (python, the child push script) runs through
# Invoke-Logged, which flips $ErrorActionPreference to Continue locally and trusts
# $LASTEXITCODE. Under EAP="Stop", PS 5.1 turns a native command's benign stderr
# into a TERMINATING error when merged via `2>&1 | ...` -- that aborted this script
# mid-run (LastTaskResult 0x1) and was a recurring cause of the board going stale.
#
# The soft prose fields (oneLiner / focus / recent) are still updated event-driven
# by the GitHub-Models bot when a source repo is pushed (sync_dashboard.py, which is
# hard-blocked from progress/waves). So phases + waves + freshness are correct every
# day with zero model calls, and prose stays live on push.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$log      = Join-Path $PSScriptRoot "_backups\refresh-log.txt"
$failFlag = Join-Path $PSScriptRoot "_backups\REFRESH-FAILED.flag"
$ts       = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"=== $ts  daily refresh start ===" | Add-Content -Path $log -Encoding utf8

# Ping the desktop (interactive task) AND drop a durable flag when the refresh
# fails, so a backend failure surfaces the same morning instead of waiting for the
# 3-day staleness banner. Both the popup and the flag are best-effort: guarded so
# the alert mechanism itself can never crash or abort the run.
function Alert-Failure {
    param([string]$Reason)
    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "ALERT: $Reason" | Add-Content -Path $log -Encoding utf8
    try {
        "Dashboard daily refresh FAILED at $stamp`r`n$Reason`r`nLive board may be stale. See _backups\refresh-log.txt" |
            Set-Content -Path $failFlag -Encoding utf8
    } catch {}
    try {
        $eap = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
        & msg.exe '*' "Dashboard refresh FAILED ($stamp): $Reason - live board may be stale. See refresh-log.txt" 2>$null
        $ErrorActionPreference = $eap
    } catch {}
}

function Clear-Alert {
    if (Test-Path $failFlag) { Remove-Item $failFlag -Force -ErrorAction SilentlyContinue }
}

# Run a native command (python / powershell child) without letting its benign
# stderr become a terminating error. Logs combined output; returns the exit code.
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

$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) { $python = (Get-Command py -ErrorAction SilentlyContinue).Source }
if (-not $python) {
    Alert-Failure "python not found on PATH - cannot refresh."
    exit 1
}

# 1. Render phases + waves from the ledgers.
if ((Invoke-Logged $python @("$PSScriptRoot\sync_ledgers.py")) -ne 0) {
    Alert-Failure "sync_ledgers.py failed - aborting (nothing pushed)."
    exit 1
}

# 2. Stamp the generated date (UTF-8, no BOM via .NET; only two lines change).
$today = Get-Date -Format "yyyy-MM-dd"
$path  = Join-Path $PSScriptRoot "data.js"
$text  = [System.IO.File]::ReadAllText($path)
$text  = [regex]::Replace($text, 'generated: "\d{4}-\d{2}-\d{2}"', "generated: `"$today`"")
$text  = [regex]::Replace($text, 'generatedBy: "[^"]*"', 'generatedBy: "scheduled refresh"')
[System.IO.File]::WriteAllText($path, $text)

# 3. Validate + commit + rebase + push (run as an isolated child process so its
#    stderr cannot trip this script; exit code tells us if the push landed).
$pushCode = Invoke-Logged "powershell.exe" @("-NoProfile","-ExecutionPolicy","Bypass","-File","$PSScriptRoot\push-dashboard.ps1")
if ($pushCode -ne 0) {
    Alert-Failure "push-dashboard.ps1 exited $pushCode - live dashboard may be STALE."
} else {
    Clear-Alert
}

"=== $ts  daily refresh done (push exit $pushCode) ===" | Add-Content -Path $log -Encoding utf8
exit $pushCode
