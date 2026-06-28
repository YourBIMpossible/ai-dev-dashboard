# ============================================================
# Dashboard refresh (deterministic, no language model). Scheduler + Refresh-Now.cmd.
#
# DESIGN: fetch the live state FIRST, render onto it, THEN push. The dashboard data is
# RENDERED (phases/waves from ledgers, dates/activity from git), never hand-authored,
# so re-rendering on top of the latest origin is conflict-free by construction. This
# replaced the old "render -> commit -> rebase" flow, which conflicted whenever the
# cloud prose bot touched the same card our activity scan did (2026-06-27).
#
# NON-DESTRUCTIVE: uses `git reset origin/main` (MIXED) to base our commit on the live
# tip - mixed reset moves only HEAD + index and LEAVES every working file untouched, so
# unrelated WIP (strategy.js, edited scripts, anything) is never harmed. Only data.js is
# deliberately refreshed from origin (it is regenerated anyway). An earlier version used
# `reset --hard` and wiped uncommitted files - never do that here.
#
# Each attempt:  fetch -> reset (mixed) origin/main -> checkout origin's data.js
#                -> render (ledgers, activity, date) -> validate -> commit -> push.
# A push rejected because the cloud bot advanced origin mid-render just loops onto the
# new tip and re-renders. No rebase, so no merge conflicts ever.
#
# STDERR-SAFE: native calls go through Invoke-Logged (flips $ErrorActionPreference to
# Continue locally, trusts $LASTEXITCODE) - under EAP=Stop, PS 5.1 turns git's benign
# stderr into a TERMINATING error when merged via 2>&1, which used to abort the run.
#
# Field ownership (one writer each, nothing fights): sync_ledgers->phases/waves,
# sync_activity->dates/activity, the GitHub-Models bot->prose only (fenced off the rest).
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$log      = Join-Path $PSScriptRoot "_backups\refresh-log.txt"
$failFlag = Join-Path $PSScriptRoot "_backups\REFRESH-FAILED.flag"
$ts       = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$stampTs  = Get-Date -Format "yyyy-MM-dd HH:mm"
$today    = Get-Date -Format "yyyy-MM-dd"
$MAX_ATTEMPTS = 5
"=== $ts  refresh start ===" | Add-Content -Path $log -Encoding utf8

# Desktop ping + durable flag on failure, so a backend failure surfaces immediately
# instead of waiting for the 3-day staleness banner. Best-effort + guarded.
function Alert-Failure {
    param([string]$Reason)
    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "ALERT: $Reason" | Add-Content -Path $log -Encoding utf8
    try {
        "Dashboard refresh FAILED at $stamp`r`n$Reason`r`nLive board may be stale. See _backups\refresh-log.txt" |
            Set-Content -Path $failFlag -Encoding utf8
    } catch {}
    try {
        $eap = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
        & msg.exe '*' "Dashboard refresh FAILED ($stamp): $Reason - live board may be stale." 2>$null
        $ErrorActionPreference = $eap
    } catch {}
}
function Clear-Alert { if (Test-Path $failFlag) { Remove-Item $failFlag -Force -ErrorAction SilentlyContinue } }

# Run a native command (git / python) without letting its benign stderr terminate the
# script. Logs combined output; returns the real exit code via $LASTEXITCODE.
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
if (-not $python) { Alert-Failure "python not found on PATH - cannot refresh."; exit 1 }

$result = 1   # 0 = pushed, 2 = already current (nothing to push), 1 = failed

for ($attempt = 1; $attempt -le $MAX_ATTEMPTS; $attempt++) {
    "--- attempt $attempt/$MAX_ATTEMPTS ---" | Add-Content -Path $log -Encoding utf8

    # 0. Base our work on the live tip WITHOUT touching the working tree (mixed reset),
    #    then refresh ONLY data.js from origin so the render starts from the bot's latest.
    if ((Invoke-Logged "git" @("fetch","origin","main")) -ne 0) { Alert-Failure "git fetch failed."; $result = 1; break }
    if ((Invoke-Logged "git" @("reset","origin/main")) -ne 0)   { Alert-Failure "git reset origin/main failed."; $result = 1; break }
    if ((Invoke-Logged "git" @("checkout","origin/main","--","data.js")) -ne 0) { Alert-Failure "git checkout data.js failed."; $result = 1; break }

    # 1. Render phases + waves from the ledgers (fatal on failure).
    if ((Invoke-Logged $python @("$PSScriptRoot\sync_ledgers.py")) -ne 0) { Alert-Failure "sync_ledgers.py failed."; $result = 1; break }

    # 1b. Refresh dates + activity from real git history (non-fatal: phases/waves/date
    #     still ship; dates catch up next run).
    if ((Invoke-Logged $python @("$PSScriptRoot\sync_activity.py")) -ne 0) {
        "WARN: sync_activity.py failed - activity/dates not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    }

    # 2. Stamp the generated date (UTF-8 no BOM via .NET; only two lines change).
    $path = Join-Path $PSScriptRoot "data.js"
    $text = [System.IO.File]::ReadAllText($path)
    $text = [regex]::Replace($text, 'generated: "\d{4}-\d{2}-\d{2}"', "generated: `"$today`"")
    $text = [regex]::Replace($text, 'generatedBy: "[^"]*"', 'generatedBy: "scheduled refresh"')
    [System.IO.File]::WriteAllText($path, $text)

    # 3. Guard: phase numbering in data.js must match the ledger, or refuse to ship.
    if ((Invoke-Logged $python @("$PSScriptRoot\validate_dashboard.py")) -ne 0) { Alert-Failure "validate_dashboard.py failed - phase numbering vs ledger."; $result = 1; break }

    # 4. Stage only the dashboard data + metrics. Nothing staged => already current.
    Invoke-Logged "git" @("add","data.js","graph-metrics.js") | Out-Null
    $staged = (& git diff --cached --name-only) -join "`n"
    if (-not $staged.Trim()) { "Already current - nothing to push." | Add-Content -Path $log -Encoding utf8; $result = 2; break }

    # 5. Commit (parent = origin/main) + push. Fast-forward unless the bot advanced
    #    origin during our render; on rejection, loop onto the new tip and re-render.
    if ((Invoke-Logged "git" @("commit","-m","dashboard refresh $stampTs")) -ne 0) { Alert-Failure "git commit failed."; $result = 1; break }
    if ((Invoke-Logged "git" @("push","origin","main")) -eq 0) {
        "Pushed dashboard data ($stampTs) on attempt $attempt." | Add-Content -Path $log -Encoding utf8
        $result = 0; break
    }
    "Push rejected (origin advanced mid-render) - retrying on the new tip." | Add-Content -Path $log -Encoding utf8
    if ($attempt -eq $MAX_ATTEMPTS) { Alert-Failure "push still rejected after $MAX_ATTEMPTS attempts - live dashboard may be STALE." }
}

if ($result -eq 0 -or $result -eq 2) { Clear-Alert }
"=== $ts  refresh done (result $result) ===" | Add-Content -Path $log -Encoding utf8
# 0 pushed, 2 already-current both mean success to the scheduler.
if ($result -eq 1) { exit 1 } else { exit 0 }
