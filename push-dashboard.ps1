# ============================================================
# Dashboard auto-push — called by Claude after every refresh
# Commits data.js (and graph-metrics.js if changed) and pushes.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add data.js graph-metrics.js 2>$null

# Only commit + push if there's something staged
$staged = git diff --cached --name-only
if ($staged) {
    git commit -m "dashboard refresh $timestamp"
    git push origin main
    Write-Host "Pushed dashboard data ($timestamp)" -ForegroundColor Green
} else {
    Write-Host "Nothing changed — skipping push" -ForegroundColor DarkGray
}
