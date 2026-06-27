# ============================================================
# Dashboard auto-push - called after every refresh (manual or scheduled).
# Runs the pre-push GUARD first: data.js phase numbering must match the
# owner-maintained PHASE-STATUS.md ledger. A failing guard ABORTS the push,
# so a card with wrong phase numbering (the historical "P7 = Model QA" drift)
# can never reach the live dashboard again.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

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

# --- Commit -----------------------------------------------------------------
git add data.js graph-metrics.js 2>$null

$staged = git diff --cached --name-only
if (-not $staged) {
    Write-Host "Nothing changed - skipping push" -ForegroundColor DarkGray
    exit 0
}

git commit -m "dashboard refresh $timestamp"

# --- Reconcile with remote BEFORE pushing -----------------------------------
# The live site is served from origin/main, which ALSO receives commits from the
# cloud GitHub Actions bots (billing sync / card auto-sync). If we don't rebase
# onto those first, our push is rejected non-fast-forward and the local commit
# strands silently -- git push failure does NOT trip $ErrorActionPreference, so
# the refresh logs "done" while the live board freezes (the original 3-day-stale
# bug, 2026-06-26). Fetch + rebase keeps history linear and the push fast-forwardable.
git fetch origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: git fetch failed - not pushing." -ForegroundColor Red
    exit 1
}

git rebase origin/main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: rebase onto origin/main hit a conflict - aborting, nothing pushed." -ForegroundColor Red
    git rebase --abort
    exit 1
}

# --- Push (fail LOUDLY if rejected) -----------------------------------------
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: git push REJECTED - live dashboard NOT updated; commits stacked locally. Reconcile manually." -ForegroundColor Red
    exit 1
}
Write-Host "Pushed dashboard data ($timestamp)" -ForegroundColor Green
