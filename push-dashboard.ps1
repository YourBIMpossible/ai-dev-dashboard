# ============================================================
# Dashboard auto-push — called after every refresh (manual or scheduled).
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
        Write-Host "Pre-push validation FAILED — refusing to push. Fix the errors above (data.js phase numbering vs the ledger)." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "WARNING: python not found; skipping pre-push validation." -ForegroundColor Yellow
}

# --- Commit + push ----------------------------------------------------------
git add data.js graph-metrics.js 2>$null

$staged = git diff --cached --name-only
if ($staged) {
    git commit -m "dashboard refresh $timestamp"
    git push origin main
    Write-Host "Pushed dashboard data ($timestamp)" -ForegroundColor Green
} else {
    Write-Host "Nothing changed - skipping push" -ForegroundColor DarkGray
}
