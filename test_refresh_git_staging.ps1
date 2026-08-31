# Tests for Invoke-GitStage (Refresh-GitStaging.ps1).
#
# The regression that matters: `git add` aborts entirely on one unmatched
# pathspec, so a FAILED add leaves the same empty index a genuinely unchanged
# tree does. Refresh-Dashboard.ps1 used to read that as "Already current",
# clear the failure alert and exit 0 (2026-08-31 slop audit, MEDIUM-1).
#
# Runs against a throwaway repo under $env:TEMP - never the dashboard repo, and
# never the real generated-artifact list.
#
# Run: powershell -NoProfile -File .\test_refresh_git_staging.ps1

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "Refresh-GitStaging.ps1")

$failures = 0
function Assert-True {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { "  PASS  $Message" } else { $script:failures++; "  FAIL  $Message" }
}

$repo = Join-Path $env:TEMP ("dashboard-staging-test-" + [System.Diagnostics.Process]::GetCurrentProcess().Id)
if (Test-Path $repo) { Remove-Item $repo -Recurse -Force }
New-Item -ItemType Directory -Path $repo -Force | Out-Null
$origin = Get-Location
try {
    Set-Location $repo
    & git init --quiet 2>&1 | Out-Null
    & git config user.email "test@example.invalid" 2>&1 | Out-Null
    & git config user.name  "staging test" 2>&1 | Out-Null
    "one"   | Set-Content -Path (Join-Path $repo "tracked.txt") -Encoding utf8
    "two"   | Set-Content -Path (Join-Path $repo "other.txt")   -Encoding utf8

    "case 1: both pathspecs exist -> staged"
    $r = Invoke-GitStage -Paths @("tracked.txt", "other.txt")
    Assert-True ($r.Ok -eq $true)            "Ok is true"
    Assert-True ($r.ExitCode -eq 0)          "ExitCode is 0"
    Assert-True ($r.Staged.Count -eq 2)      "both files reported staged"
    Assert-True ($null -eq $r.Reason)        "no failure reason"

    & git commit -m "base" --quiet 2>&1 | Out-Null

    "case 2: nothing changed -> success with an empty staged set"
    $r = Invoke-GitStage -Paths @("tracked.txt", "other.txt")
    Assert-True ($r.Ok -eq $true)            "Ok is true (add succeeded)"
    Assert-True ($r.Staged.Count -eq 0)      "staged set is empty"
    # This is the ONLY state in which the caller may say 'Already current'.

    "case 3: one missing pathspec -> whole add fails, staged set is NOT reported"
    "three" | Set-Content -Path (Join-Path $repo "tracked.txt") -Encoding utf8
    $logged = New-Object System.Collections.ArrayList
    $r = Invoke-GitStage -Paths @("tracked.txt", "does-not-exist.js") -Log { param($Message) [void]$logged.Add($Message) }
    Assert-True ($r.Ok -eq $false)                       "Ok is false"
    Assert-True ($r.ExitCode -ne 0)                      "ExitCode is non-zero (git add exit $($r.ExitCode))"
    Assert-True ($null -eq $r.Staged)                    "Staged is null - callers cannot infer 'already current'"
    Assert-True ($r.Reason -like "*git add failed*")     "Reason names git add"
    Assert-True (($logged -join "`n") -like "*does-not-exist.js*") "git's own error reached the log sink"

    # And prove git really staged nothing, so the old `git diff --cached` probe
    # would have returned empty for a modified working tree.
    $index = @(& git diff --cached --name-only | Where-Object { $_.Trim() })
    Assert-True ($index.Count -eq 0) "index is empty after the failed add (the false-'already current' trap)"
}
finally {
    Set-Location $origin
    if (Test-Path $repo) { Remove-Item $repo -Recurse -Force -ErrorAction SilentlyContinue }
}

if ($failures) { "`n$failures assertion(s) FAILED"; exit 1 }
"`nall assertions passed"
exit 0
