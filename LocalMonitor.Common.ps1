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
