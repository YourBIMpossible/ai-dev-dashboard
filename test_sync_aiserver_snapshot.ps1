# Regression harness for Sync-AiServerSnapshot in Refresh-Dashboard.ps1 (WP-D1 live snapshot).
# Run: powershell -NoProfile -File test_sync_aiserver_snapshot.ps1
# Exit code 0 = all assertions passed. PS 5.1, no test framework.
#
# The function is lifted VERBATIM out of Refresh-Dashboard.ps1 via the parser AST (the script
# itself runs a refresh loop on load and cannot be dot-sourced), so what is exercised here is
# the exact code the scheduler executes. What matters (REFRESH-SPEC.md rule 6): the helper
# degrades cleanly - a failed helper or a down endpoint surfaces a reminder and keeps previous
# card data, never accumulating lines across re-runs and never failing the refresh.
#
# This file is deliberately pure ASCII: PS 5.1 reads a no-BOM script in the ANSI codepage, so a
# literal middot/em-dash here would be mojibake'd and never match. The two glyphs are built at
# runtime via [char] instead.

$ErrorActionPreference = 'Stop'
$MID  = [char]0x00B7   # U+00B7 middot, as written into the "Endpoint up ... models:" line
$DASH = [char]0x2014   # U+2014 em dash, as written into the "Digest <date> ... <summary>" line
$script:fails = 0
$script:passed = 0
function Assert-True { param([bool]$Cond, [string]$Name)
    if ($Cond) { $script:passed++; Write-Host "  ok - $Name" }
    else { $script:fails++; Write-Host "FAIL - $Name" -ForegroundColor Red }
}

$scriptPath = Join-Path $PSScriptRoot 'Refresh-Dashboard.ps1'
$tokens = $null; $errors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile($scriptPath, [ref]$tokens, [ref]$errors)
Assert-True ($errors.Count -eq 0) 'Refresh-Dashboard.ps1 parses clean'

$fnAst = $ast.Find({ param($n)
    $n -is [System.Management.Automation.Language.FunctionDefinitionAst] -and
    $n.Name -eq 'Sync-AiServerSnapshot' }, $true)
Assert-True ($null -ne $fnAst) 'Sync-AiServerSnapshot is defined in Refresh-Dashboard.ps1'
Invoke-Expression $fnAst.Extent.Text

# Minimal data.js fixture: the aiserver block between its PROJECT markers, with a neighbour
# project on each side so the marker-scoped edits are proven not to leak outside the block.
$fixture = @'
window.DATA = { projects: [
    /* PROJECT:before:START */
    { id: "before", recent: ["keep me"], reminders: ["before reminder"], lastActivity: { date: "2026-01-01", summary: "before" } },
    /* PROJECT:before:END */
    /* PROJECT:aiserver:START */
    {
      id: "aiserver",
      lastActivity: {
        date: "2026-09-13",
        summary: "Merge pull request #18 (6f9bad0)"
      },
      reminders: [
        "3090 box powered on"
      ],
      links: [
        { label: "repo", path: "x" }
      ],
      recent: [
        "2026-09-12 - Box powered on",
        "2026-09-11 - North star LOCKED"
      ]
    },
    /* PROJECT:aiserver:END */
    /* PROJECT:after:START */
    { id: "after", recent: ["after recent"], reminders: [], lastActivity: { date: "2026-02-02", summary: "after" } }
    /* PROJECT:after:END */
] };
'@

$tmp = Join-Path $env:TEMP ("sas-" + [guid]::NewGuid().ToString('n'))
New-Item -ItemType Directory -Path $tmp | Out-Null
$data = Join-Path $tmp 'data.js'
try {
    $upNoJobs = '{ "endpoint": { "up": true, "models_available": ["a","b"], "models_loaded": ["qwen2.5-coder:14b"], "models_loaded_supported": true }, "jobs": { "daily-digest": null, "weekly-rollup": null, "decision-drift": null } }'

    # 1. Endpoint up, all jobs null: endpoint line prepended to recent[], lastActivity untouched.
    [System.IO.File]::WriteAllText($data, $fixture)
    $r = Sync-AiServerSnapshot -DataPath $data -StatusJson $upNoJobs -SnapshotHHMM '09:30'
    $t = [System.IO.File]::ReadAllText($data)
    Assert-True ($r.ok) 'up/no-jobs: ok'
    Assert-True ($t -match "Endpoint up $MID models: qwen2.5-coder:14b \(snapshot 09:30\)") 'up/no-jobs: endpoint line present with loaded model'
    Assert-True ($t -match '"2026-09-12 - Box powered on"') 'up/no-jobs: existing recent prose kept'
    Assert-True ($t -match 'summary: "Merge pull request #18 \(6f9bad0\)"') 'up/no-jobs: lastActivity left intact (all jobs null)'
    Assert-True ($t -notmatch 'inference endpoint unreachable') 'up/no-jobs: no unreachable reminder'
    Assert-True ($t -match '"keep me"' -and $t -match '"after recent"') 'up/no-jobs: neighbour blocks untouched'

    # 2. Idempotency: re-run over its own output must not stack a second endpoint line.
    $r2 = Sync-AiServerSnapshot -DataPath $data -StatusJson $upNoJobs -SnapshotHHMM '10:45'
    $t2 = [System.IO.File]::ReadAllText($data)
    Assert-True (([regex]::Matches($t2, "Endpoint up $MID models")).Count -eq 1) 're-run: exactly one endpoint line (no stacking)'
    Assert-True ($t2 -match 'snapshot 10:45' -and $t2 -notmatch 'snapshot 09:30') 're-run: endpoint line refreshed to newest snapshot time'

    # 3. Endpoint down: recent gets a down line AND reminders gets the unreachable line.
    [System.IO.File]::WriteAllText($data, $fixture)
    $down = '{ "endpoint": { "up": false, "models_available": [], "models_loaded": [], "models_loaded_supported": false }, "jobs": { "daily-digest": null, "weekly-rollup": null, "decision-drift": null } }'
    $r = Sync-AiServerSnapshot -DataPath $data -StatusJson $down -SnapshotHHMM '11:00'
    $t = [System.IO.File]::ReadAllText($data)
    Assert-True ($r.ok) 'down: ok (down is a reminder, not a pipeline fault)'
    Assert-True ($t -match '"Endpoint down \(snapshot 11:00\)"') 'down: recent down line present'
    Assert-True ($t -match '"inference endpoint unreachable at refresh \(11:00\)"') 'down: reminder present'

    # 4. Recovery: an up poll after a down one clears the stale unreachable reminder.
    $r = Sync-AiServerSnapshot -DataPath $data -StatusJson $upNoJobs -SnapshotHHMM '11:30'
    $t = [System.IO.File]::ReadAllText($data)
    Assert-True ($t -notmatch 'inference endpoint unreachable') 'recovery: unreachable reminder cleared'
    Assert-True ($t -notmatch 'Endpoint down') 'recovery: down line replaced by up line'

    # 5. Helper failure (null JSON): reminder added, recent/lastActivity kept, ok=false (degrades).
    [System.IO.File]::WriteAllText($data, $fixture)
    $r = Sync-AiServerSnapshot -DataPath $data -StatusJson $null -SnapshotHHMM '12:00'
    $t = [System.IO.File]::ReadAllText($data)
    Assert-True (-not $r.ok) 'helper-fail: ok=false so the step degrades the attempt'
    Assert-True ($t -match '"inference endpoint unreachable at refresh \(12:00\)"') 'helper-fail: reminder added'
    Assert-True ($t -match '"2026-09-12 - Box powered on"' -and $t -notmatch 'Endpoint up') 'helper-fail: previous recent kept, no snapshot line'

    # 6. Jobs present: newest job drives lastActivity and prepends a job line to recent[].
    [System.IO.File]::WriteAllText($data, $fixture)
    $withJobs = '{ "endpoint": { "up": true, "models_available": ["a"], "models_loaded": ["m"], "models_loaded_supported": true }, "jobs": { "daily-digest": { "file": "digest-2026-06-16.md", "modified": "2026-06-16T08:00:00", "summary": "Daily digest" }, "weekly-rollup": null, "decision-drift": { "file": "drift-2026-06-17.md", "modified": "2026-06-17T09:00:00", "summary": "Drift check" } } }'
    $r = Sync-AiServerSnapshot -DataPath $data -StatusJson $withJobs -SnapshotHHMM '13:15'
    $t = [System.IO.File]::ReadAllText($data)
    Assert-True ($t -match "`"Digest 2026-06-16 $DASH Daily digest`"") 'jobs: digest line present'
    Assert-True ($t -match "`"Drift 2026-06-17 $DASH Drift check`"") 'jobs: drift line present'
    Assert-True ($t -match 'date: "2026-06-17"' -and $t -match 'summary: "Drift check"') 'jobs: lastActivity set from newest job (drift 06-17)'

    # 6b. Re-run with jobs must not stack job lines either.
    $r = Sync-AiServerSnapshot -DataPath $data -StatusJson $withJobs -SnapshotHHMM '13:20'
    $t = [System.IO.File]::ReadAllText($data)
    Assert-True (([regex]::Matches($t, 'Digest 2026-06-16')).Count -eq 1) 'jobs re-run: no job-line stacking'

    # 7. Missing block: reported, not thrown, and file untouched.
    $noBlock = Join-Path $tmp 'noblock.js'
    [System.IO.File]::WriteAllText($noBlock, 'window.DATA = {};')
    $r = Sync-AiServerSnapshot -DataPath $noBlock -StatusJson $upNoJobs -SnapshotHHMM '14:00'
    Assert-True ((-not $r.ok) -and $r.reason -match 'block not found') 'missing block: reported, not thrown'
} finally {
    Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "$script:passed passed, $script:fails failed"
if ($script:fails -gt 0) { exit 1 } else { exit 0 }
