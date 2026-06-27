# ============================================================
# Dashboard auto-push - called after every refresh (manual or scheduled).
#
# Two robustness rules baked in (both were the cause of the "live board went
# stale for 3 days" failures, 2026-06-26):
#
#  1. RECONCILE BEFORE PUSH. origin/main has TWO writers: this local 06:00 refresh
#     (phases/waves/date) AND the cloud GitHub Actions bots (billing/card sync).
#     They diverge daily, so a bare `git push` is rejected non-fast-forward and the
#     commit strands locally. We fetch + rebase onto origin/main first so the push
#     fast-forwards, then FAIL LOUDLY (exit 1) if anything is still rejected.
#
#  2. STDERR-SAFE GIT. Under $ErrorActionPreference="Stop", PS 5.1 turns a native
#     command's *benign* stderr (git's "From github.com..." progress, written even
#     on success) into a TERMINATING error when it is merged via `2>&1 | ...`. That
#     killed the script mid-run before the push could happen. Invoke-Git flips EAP
#     to Continue locally, captures all output as plain strings, and trusts only
#     $LASTEXITCODE for the result.
#
# Also runs the pre-push GUARD: data.js phase numbering must match the
# owner-maintained PHASE-STATUS.md ledger, or the push is refused.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

# Run git without letting its benign stderr become a terminating error.
# Returns git's real exit code; echoes combined output to the host (the parent
# refresh script captures the host stream into the refresh log).
function Invoke-Git {
    $eap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    $out  = & git @args 2>&1 | ForEach-Object { "$_" }
    $code = $LASTEXITCODE
    $ErrorActionPreference = $eap
    if ($out) { $out | ForEach-Object { Write-Host $_ } }
    return $code
}

# --- Pre-push guard ---------------------------------------------------------
$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) { $python = (Get-Command py -ErrorAction SilentlyContinue).Source }

if ($python) {
    & $python "$PSScriptRoot\validate_dashboard.py"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Pre-push validation FAILED - refusing to push. Fix the errors above (data.js phase numbering vs the ledger)." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "WARNING: python not found; skipping pre-push validation." -ForegroundColor Yellow
}

# --- Commit any refreshed data ----------------------------------------------
Invoke-Git add data.js graph-metrics.js | Out-Null

$staged = & git diff --cached --name-only
if ($staged) {
    if ((Invoke-Git commit -m "dashboard refresh $timestamp") -ne 0) {
        Write-Host "ERROR: git commit failed - nothing pushed." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "No new data to commit." -ForegroundColor DarkGray
}

# --- Reconcile with remote (origin/main has two writers: this refresh + the cloud
#     bots, so always fetch + rebase before deciding whether to push) -----------
if ((Invoke-Git fetch origin main) -ne 0) {
    Write-Host "ERROR: git fetch failed - not pushing." -ForegroundColor Red
    exit 1
}

# --autostash so stray working-tree churn (e.g. strategy.js / graph-metrics.js not
# staged by this push) never blocks the rebase; it is restored automatically after.
if ((Invoke-Git rebase --autostash origin/main) -ne 0) {
    Write-Host "ERROR: rebase onto origin/main conflicted - aborting, nothing pushed." -ForegroundColor Red
    Invoke-Git rebase --abort | Out-Null
    exit 1
}

# --- Push whatever is ahead of origin (catches stranded commits from prior runs,
#     not just today's). No-op cleanly when already in sync. --------------------
$ahead = "$(& git rev-list --count origin/main..HEAD)".Trim()
if ($ahead -eq "0") {
    Write-Host "Already in sync with origin - nothing to push." -ForegroundColor DarkGray
    exit 0
}

if ((Invoke-Git push origin main) -ne 0) {
    Write-Host "ERROR: git push REJECTED - live dashboard NOT updated; commits stacked locally. Reconcile manually." -ForegroundColor Red
    exit 1
}

Write-Host "Pushed dashboard data ($timestamp) - $ahead commit(s)." -ForegroundColor Green
