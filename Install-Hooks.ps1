<#
.SYNOPSIS
    Point this clone's git hooks at the tracked .githooks\ directory.

.DESCRIPTION
    The pre-commit guard (blocks hand-committing the automation-owned
    github_actions.js / graph-metrics.js) is tracked in .githooks\ so it survives
    a re-clone. Activating it still needs one local step, because core.hooksPath
    is per-clone config that git does not carry in the repo:

        .\Install-Hooks.ps1

    Safe to run in ANY clone, including the automation clone (Dashboard-auto):
    Refresh-Dashboard.ps1 sets DASHBOARD_REFRESH=1 around its commit and the hook
    stands down for it, so enabling hooks there cannot block the refresh.

    Idempotent. Re-running just re-points core.hooksPath.

.PARAMETER Uninstall
    Unset core.hooksPath, reverting this clone to .git\hooks\ (usually inert).
#>
[CmdletBinding()]
param([switch]$Uninstall)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not (Test-Path (Join-Path $PSScriptRoot '.git'))) {
    Write-Host "Not a git clone root: $PSScriptRoot" -ForegroundColor Red; exit 1
}

if ($Uninstall) {
    & git config --unset core.hooksPath 2>$null
    Write-Host "core.hooksPath unset - hooks reverted to .git\hooks\" -ForegroundColor Yellow
    exit 0
}

$hook = Join-Path $PSScriptRoot '.githooks\pre-commit'
if (-not (Test-Path $hook)) {
    Write-Host "Missing .githooks\pre-commit - is this clone up to date with origin/main?" -ForegroundColor Red; exit 1
}

& git config core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) { Write-Host "git config failed (exit $LASTEXITCODE)." -ForegroundColor Red; exit 1 }

# A stale copy in .git\hooks\ is now shadowed and can only drift out of sync with
# the tracked one. Flag it rather than delete it - .git\hooks\ may hold other hooks.
$legacy = Join-Path $PSScriptRoot '.git\hooks\pre-commit'
if (Test-Path $legacy) {
    Write-Host "NOTE: .git\hooks\pre-commit still exists and is now SHADOWED by .githooks\." -ForegroundColor Yellow
    Write-Host "      Delete it so the two copies cannot drift:  Remove-Item '$legacy'" -ForegroundColor Yellow
}

Write-Host "OK: core.hooksPath = .githooks  (pre-commit guard active in this clone)" -ForegroundColor Green
