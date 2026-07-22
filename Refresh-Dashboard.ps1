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
# tip - mixed reset moves only HEAD + index and LEAVES every working file untouched. This
# script runs in the DEDICATED automation clone (Dashboard-auto), not the editing clone, so
# there is no human WIP to protect; data.js and the CI-owned files (github_actions.js,
# graph-metrics.js) are refreshed from origin (all regenerated anyway). An earlier version
# used `reset --hard` and wiped uncommitted files - never do that here.
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

$backups  = Join-Path $PSScriptRoot "_backups"
# _backups is runtime-only (not tracked), so a fresh clone won't have it. Create it
# before the first log write, or Add-Content throws DirectoryNotFound and aborts the run.
if (-not (Test-Path $backups)) { New-Item -ItemType Directory -Path $backups -Force | Out-Null }
$log      = Join-Path $backups "refresh-log.txt"
$failFlag = Join-Path $backups "REFRESH-FAILED.flag"
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

# Render graph-metrics.js from the tracked BIMpossible ledger. This refresh is the
# file's OWNER (since 2026-07-21): BIMpossible\Update-Graph.ps1 appends snapshots to
# the ledger and no longer writes the rendering; this function is the only writer.
# Invariant carried over from the retired Update-Graph guard: never silently replace
# the series with a shorter one -- a short ledger read (wrong checkout, truncated
# file) must skip the write, not destroy history. Returns a hashtable, never throws.
# PS 5.1 traps honoured: ConvertFrom-Json output is assigned before @() counts it,
# and no native call is piped into Select-Object -First (forces $LASTEXITCODE -1).
function Update-GraphMetricsFromLedger {
    param([Parameter(Mandatory)][string]$LedgerPath, [Parameter(Mandatory)][string]$OutPath)

    if (-not (Test-Path $LedgerPath)) { return @{ ok = $false; reason = "ledger not found at $LedgerPath" } }

    $entries = @()
    foreach ($line in (Get-Content $LedgerPath -Encoding UTF8)) {
        $t = $line.Trim()
        if ($t -match '^{') {
            try {
                $obj = $t | ConvertFrom-Json
                # Entries written before 2026-07-21 carry graphify display caps
                # (cycles pinned at top_n=20, godNodes a fixed leaderboard); the
                # ledger keeps them as an append-only record, the rendering drops them.
                foreach ($dead in 'cycles', 'godNodes') { $obj.PSObject.Properties.Remove($dead) }
                $entries += $obj
            } catch {}
        }
    }
    if (-not $entries.Count) { return @{ ok = $false; reason = "ledger parsed to 0 entries" } }

    $existing = -1   # -1 = no prior series to protect (missing/unparseable file)
    if (Test-Path $OutPath) {
        try {
            $text  = [System.IO.File]::ReadAllText($OutPath)
            $start = $text.IndexOf('['); $end = $text.LastIndexOf(']')
            if ($start -ge 0 -and $end -gt $start) {
                $arr = ConvertFrom-Json -InputObject $text.Substring($start, $end - $start + 1)
                $existing = @($arr).Count
            }
        } catch {}
    }
    if ($existing -ge 0 -and $entries.Count -lt $existing) {
        return @{ ok = $false; reason = "rendered $($entries.Count) entries < existing $existing - refusing to shrink the series" }
    }

    # PS 5.1-safe array serialisation: per-element -Compress, joined -- same shape the
    # retired Update-Graph renderer produced, so re-renders over an unchanged ledger
    # are byte-stable and step 4 stages nothing.
    $parts = foreach ($e in $entries) { ConvertTo-Json -InputObject $e -Depth 4 -Compress }
    $json  = '[' + ($parts -join ',') + ']'
    [System.IO.File]::WriteAllText($OutPath, "window.GRAPH_METRICS = $json;", [System.Text.Encoding]::UTF8)
    return @{ ok = $true; reason = "rendered $($entries.Count) entries$(if ($existing -ge 0) { " (file had $existing)" })" }
}

$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) { $python = (Get-Command py -ErrorAction SilentlyContinue).Source }
if (-not $python) { Alert-Failure "python not found on PATH - cannot refresh."; exit 1 }

# node drives codebase_sync.mjs only (the graphify bundle). Missing node is NOT fatal:
# the data refresh is the job, the codebase/ bundle is a bonus that keeps last run's copy.
$node = (Get-Command node -ErrorAction SilentlyContinue).Source

$result = 1   # 0 = pushed, 2 = already current (nothing to push), 1 = failed

for ($attempt = 1; $attempt -le $MAX_ATTEMPTS; $attempt++) {
    "--- attempt $attempt/$MAX_ATTEMPTS ---" | Add-Content -Path $log -Encoding utf8

    # 0. Base our work on the live tip WITHOUT touching the working tree (mixed reset),
    #    then refresh data.js + the CI-owned files from origin so the render starts fresh.
    if ((Invoke-Logged "git" @("fetch","origin","main")) -ne 0) { Alert-Failure "git fetch failed."; $result = 1; break }
    if ((Invoke-Logged "git" @("reset","origin/main")) -ne 0)   { Alert-Failure "git reset origin/main failed."; $result = 1; break }
    # Sync CI-owned working-tree files from origin so this automation clone never drifts
    # from the CI bot's latest (mixed reset leaves working tree untouched).
    if ((Invoke-Logged "git" @("checkout","origin/main","--","data.js","github_actions.js","graph-metrics.js")) -ne 0) { Alert-Failure "git checkout data.js failed."; $result = 1; break }

    # 1. Render phases + waves from the ledgers (fatal on failure).
    if ((Invoke-Logged $python @("$PSScriptRoot\sync_ledgers.py")) -ne 0) { Alert-Failure "sync_ledgers.py failed."; $result = 1; break }

    # 1b. Refresh dates + activity from real git history (non-fatal: phases/waves/date
    #     still ship; dates catch up next run).
    if ((Invoke-Logged $python @("$PSScriptRoot\sync_activity.py")) -ne 0) {
        "WARN: sync_activity.py failed - activity/dates not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    }

    # 1c. Build the phase-dependency DAG from the ledger's gate column (non-fatal:
    #     needs networkx; a parse/import hiccup must not block the data refresh, and
    #     the committed phase_dag.js stays valid until the next successful run).
    if ((Invoke-Logged $python @("$PSScriptRoot\phase_dag.py")) -ne 0) {
        "WARN: phase_dag.py failed - phase DAG not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    }
    if ((Invoke-Logged $python @("$PSScriptRoot\networkx_impact.py")) -ne 0) {
        "WARN: networkx_impact.py failed - impact data not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    }
    if ((Invoke-Logged $python @("$PSScriptRoot\check_audit_freshness.py")) -ne 0) {
        "WARN: check_audit_freshness.py failed - audit staleness badge not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    }

    # 1e. Re-bundle the graphify artifacts the Codebase tab iframes (GRAPH_REPORT.md,
    #     graph-dashboard.html, graph-network.html, codebase-meta.js). --no-push so this
    #     script's fetch->reset->commit->push owns the git side; the sync only writes files.
    #     Non-fatal by design: it reads graphify-out from the BIMpossible working tree, which
    #     is a DIFFERENT repo that may be mid-checkout, absent, or on a branch that never ran
    #     Update-Graph.ps1. None of that should block the dashboard data refresh - the last
    #     good bundle stays committed and we retry tomorrow.
    if (-not $node) {
        "WARN: node not on PATH - codebase/ graphify bundle not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    } elseif ((Invoke-Logged $node @("$PSScriptRoot\codebase_sync.mjs","--no-push")) -ne 0) {
        "WARN: codebase_sync.mjs failed - codebase/ graphify bundle not refreshed this attempt." | Add-Content -Path $log -Encoding utf8
    }

    # 1f. Render graph-metrics.js from the tracked BIMpossible ledger (see the
    #     function header for ownership + the no-shrink invariant). Non-fatal like 1e:
    #     the ledger lives in a DIFFERENT repo's working tree; if it is absent or short,
    #     origin's copy (restored by step 0's checkout) ships unchanged and we retry
    #     tomorrow. Runs after 1e so a codebase_sync failure cannot skip it.
    $ledger = if ($env:BIMPOSSIBLE_LEDGER) { $env:BIMPOSSIBLE_LEDGER } else { "F:\AI-Dev\BIMpossible\backend\graphify-out\metrics-history.jsonl" }
    $gm = Update-GraphMetricsFromLedger -LedgerPath $ledger -OutPath (Join-Path $PSScriptRoot "graph-metrics.js")
    if ($gm.ok) {
        "graph-metrics.js: $($gm.reason)" | Add-Content -Path $log -Encoding utf8
    } else {
        "WARN: graph-metrics.js not rendered - $($gm.reason) - keeping origin's copy this attempt." | Add-Content -Path $log -Encoding utf8
    }

    # 2. Stamp the generated date (UTF-8 no BOM via .NET; only two lines change).
    $path = Join-Path $PSScriptRoot "data.js"
    $text = [System.IO.File]::ReadAllText($path)
    $text = [regex]::Replace($text, 'generated: "\d{4}-\d{2}-\d{2}"', "generated: `"$today`"")
    $text = [regex]::Replace($text, 'generatedBy: "[^"]*"', 'generatedBy: "scheduled refresh"')
    [System.IO.File]::WriteAllText($path, $text)

    # 3. Guard: phase numbering in data.js must match the ledger, or refuse to ship.
    if ((Invoke-Logged $python @("$PSScriptRoot\validate_dashboard.py")) -ne 0) { Alert-Failure "validate_dashboard.py failed - phase numbering vs ledger."; $result = 1; break }

    # 4. Stage only the dashboard data + metrics + the graphify bundle from 1e. Nothing
    #    staged => already current. `codebase` is a directory: git add stages whatever
    #    codebase_sync.mjs rewrote, and stages nothing when the backend graph is unchanged.
    Invoke-Logged "git" @("add","data.js","graph-metrics.js","phase_dag.js","networkx_impact.js","audit-freshness.js","codebase") | Out-Null
    $staged = (& git diff --cached --name-only) -join "`n"
    if (-not $staged.Trim()) { "Already current - nothing to push." | Add-Content -Path $log -Encoding utf8; $result = 2; break }

    # 5. Commit (parent = origin/main) + push. Fast-forward unless the bot advanced
    #    origin during our render; on rejection, loop onto the new tip and re-render.
    #    DASHBOARD_REFRESH declares "this commit IS the authorized writer" to the
    #    tracked .githooks\pre-commit guard, which otherwise blocks commits of
    #    graph-metrics.js / github_actions.js. Without it, enabling hooks in this
    #    clone would block the refresh's own commit and re-freeze the series the way
    #    the 2026-06-28 hook did. Scoped to the commit and cleared straight after so
    #    it cannot leak into anything else this process spawns.
    $env:DASHBOARD_REFRESH = '1'
    try {
        $commitRc = Invoke-Logged "git" @("commit","-m","dashboard refresh $stampTs")
    } finally {
        Remove-Item Env:\DASHBOARD_REFRESH -ErrorAction SilentlyContinue
    }
    if ($commitRc -ne 0) { Alert-Failure "git commit failed."; $result = 1; break }
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
