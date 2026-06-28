# ============================================================
# Legacy entry point. The canonical refresh+push logic now lives in
# Refresh-Dashboard.ps1, which fetches the live state first, renders onto it, and
# pushes with a retry loop (conflict-free by construction). This wrapper just
# delegates so any older caller / muscle-memory `push-dashboard.ps1` still does the
# right, robust thing instead of a bare commit+push.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

& "$PSScriptRoot\Refresh-Dashboard.ps1"
exit $LASTEXITCODE
