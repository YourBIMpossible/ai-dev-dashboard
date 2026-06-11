# ============================================================
# Dashboard → GitHub one-time setup
# Run this ONCE from PowerShell in F:\AI-Dev\Dashboard
# before running it, create the repo on GitHub:
#   https://github.com/organizations/YourBIMpossible/repositories/new
#   Name: ai-dev-dashboard  |  Private  |  No README / .gitignore / license
# ============================================================

$ErrorActionPreference = "Stop"
$dashDir = $PSScriptRoot   # F:\AI-Dev\Dashboard

Set-Location $dashDir

# Init
git init
git config user.name  "Zeriah"
git config user.email "zeria@bimpossible.dev"
git branch -M main

# .gitignore
@"
_backups/
"@ | Set-Content .gitignore -Encoding UTF8

# Stage files
git add index.html data.js graph-metrics.js .gitignore

git commit -m "Initial dashboard commit"

# Wire remote — update the URL if the repo name differs
git remote add origin https://github.com/YourBIMpossible/ai-dev-dashboard.git  # already wired

# Push (will prompt for GitHub credentials once; Windows will cache them)
git push -u origin main

Write-Host ""
Write-Host "Done. Now go to:" -ForegroundColor Green
Write-Host "  https://github.com/YourBIMpossible/ai-dev-dashboard/settings/pages" -ForegroundColor Cyan
Write-Host "  Source: Deploy from branch  |  Branch: main  |  Folder: / (root)" -ForegroundColor Cyan
Write-Host "  Save — your URL will be: https://yourbimpossible.github.io/ai-dev-dashboard/" -ForegroundColor Green
