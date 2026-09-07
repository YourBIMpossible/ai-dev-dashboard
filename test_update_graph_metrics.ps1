# Regression harness for Update-GraphMetricsFromLedger in Refresh-Dashboard.ps1.
# Run: powershell -NoProfile -File test_update_graph_metrics.ps1
# Exit code 0 = all assertions passed. PS 5.1, no test framework.
#
# The function under test is lifted VERBATIM out of Refresh-Dashboard.ps1 via the parser AST
# (the script itself cannot be dot-sourced - it runs a refresh loop on load), so what is
# exercised here is the exact code the scheduler executes.
#
# What matters (2026-09-07 slop audit LOW-1): the no-shrink invariant must never be bypassed
# silently. An ABSENT prior file is "nothing to protect" (render). A PRESENT file that cannot
# be parsed is an anomaly the guard cannot verify (refuse, name the reason, leave the file).

$ErrorActionPreference = 'Stop'
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
    $n.Name -eq 'Update-GraphMetricsFromLedger' }, $true)
Assert-True ($null -ne $fnAst) 'Update-GraphMetricsFromLedger is defined in Refresh-Dashboard.ps1'
Invoke-Expression $fnAst.Extent.Text

$tmp = Join-Path $env:TEMP ("ugm-" + [guid]::NewGuid().ToString('n'))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
    # Three raw pushes; the last two measure the same shape and collapse into one point.
    $ledger = Join-Path $tmp 'metrics-history.jsonl'
    @(
        '{"ts":"2026-09-01T00:00:00Z","sha":"a1","nodes":10,"edges":20,"communities":2}',
        '{"ts":"2026-09-02T00:00:00Z","sha":"b2","nodes":11,"edges":22,"communities":2}',
        '{"ts":"2026-09-03T00:00:00Z","sha":"c3","nodes":11,"edges":22,"communities":2}'
    ) | Set-Content -Path $ledger -Encoding UTF8
    $out = Join-Path $tmp 'graph-metrics.js'

    # 1. No prior file: render, 2 points representing 3 pushes.
    $r = Update-GraphMetricsFromLedger -LedgerPath $ledger -OutPath $out
    Assert-True ($r.ok) 'absent prior file: renders'
    Assert-True ($r.reason -match '2 point\(s\) / 3 push\(es\)$') "absent prior file: reason names the collapse ($($r.reason))"
    Assert-True ((Get-Content $out -Raw) -match '^window\.GRAPH_METRICS = \[.*\];$') 'output has the window.GRAPH_METRICS shape'

    # 2. Same ledger over its own output: byte-stable, guard reports the prior count.
    $before = Get-Content $out -Raw
    $r = Update-GraphMetricsFromLedger -LedgerPath $ledger -OutPath $out
    Assert-True ($r.ok -and $r.reason -match 'existing represented 3') 'unchanged ledger: renders, guard saw 3 prior pushes'
    Assert-True ((Get-Content $out -Raw) -eq $before) 'unchanged ledger: byte-stable re-render'

    # 3. Shorter ledger (wrong checkout / truncated): refuse, file untouched.
    $short = Join-Path $tmp 'short.jsonl'
    '{"ts":"2026-09-01T00:00:00Z","sha":"a1","nodes":10,"edges":20,"communities":2}' | Set-Content -Path $short -Encoding UTF8
    $r = Update-GraphMetricsFromLedger -LedgerPath $short -OutPath $out
    Assert-True ((-not $r.ok) -and $r.reason -match 'refusing to shrink') 'shorter ledger: refuses to shrink'
    Assert-True ((Get-Content $out -Raw) -eq $before) 'shorter ledger: existing file left as-is'

    # 4. Pre-2026-07-21 file with no `pushes` field: each entry counts as one push.
    [System.IO.File]::WriteAllText($out, 'window.GRAPH_METRICS = [{"ts":"x","sha":"1","nodes":1,"edges":1,"communities":1},{"ts":"y","sha":"2","nodes":2,"edges":2,"communities":1}];')
    $r = Update-GraphMetricsFromLedger -LedgerPath $ledger -OutPath $out
    Assert-True ($r.ok -and $r.reason -match 'existing represented 2') 'legacy file without pushes: implicit 1 push per entry'

    # 5. PRESENT but unparseable prior file (ConvertFrom-Json throws): refuse loudly,
    #    do NOT render over it.
    $garbage = 'window.GRAPH_METRICS = [garbage];'
    [System.IO.File]::WriteAllText($out, $garbage)
    $r = Update-GraphMetricsFromLedger -LedgerPath $ledger -OutPath $out
    Assert-True ((-not $r.ok)) 'unparseable prior file: NOT ok (guard bypass is no longer silent)'
    Assert-True ($r.reason -match 'unreadable or unparseable') "unparseable prior file: reason names the anomaly ($($r.reason))"
    Assert-True ((Get-Content $out -Raw) -eq $garbage) 'unparseable prior file: left in place for a human'

    # 6. Present but not even array-shaped (the audit's `[garbage` partial write): same refusal.
    [System.IO.File]::WriteAllText($out, 'window.GRAPH_METRICS = [garbage')
    $r = Update-GraphMetricsFromLedger -LedgerPath $ledger -OutPath $out
    Assert-True ((-not $r.ok) -and $r.reason -match 'no JSON array') 'partially written prior file: refused with the parse reason'

    # 7. Missing ledger: refuse with the path.
    $r = Update-GraphMetricsFromLedger -LedgerPath (Join-Path $tmp 'nope.jsonl') -OutPath (Join-Path $tmp 'fresh.js')
    Assert-True ((-not $r.ok) -and $r.reason -match 'ledger not found') 'missing ledger: refused'
} finally { Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue }

# --- the wiring: step 1f must log the reason and count a refusal as degraded ------------------
$src = Get-Content $scriptPath -Raw
Assert-True ($src -match 'if \(\$gm\.ok\)') 'step 1f consumes the ok flag'
Assert-True ($src -match 'WARN: graph-metrics\.js not rendered - \$\(\$gm\.reason\)[^\r\n]*\r?\n\s*\$degraded\+\+') 'a refusal is logged with its reason and counted degraded'

Write-Host ""
Write-Host "$script:passed passed, $script:fails failed"
if ($script:fails) { exit 1 }
exit 0
