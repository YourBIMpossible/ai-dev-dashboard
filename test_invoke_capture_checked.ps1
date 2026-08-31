# Regression harness for Invoke-CaptureChecked and the fail-closed step-0b drift gate in
# Refresh-Dashboard.ps1. Run: powershell -NoProfile -File test_invoke_capture_checked.ps1
# Exit code 0 = all assertions passed. PS 5.1, no test framework.
#
# The function under test is lifted VERBATIM out of Refresh-Dashboard.ps1 via the parser AST
# (the script itself cannot be dot-sourced - it runs a refresh loop on load), so what is
# exercised here is the exact code the scheduler executes.

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
    $n.Name -eq 'Invoke-CaptureChecked' }, $true)
Assert-True ($null -ne $fnAst) 'Invoke-CaptureChecked is defined in Refresh-Dashboard.ps1'
Invoke-Expression $fnAst.Extent.Text

# --- behaviour of the capture itself ---------------------------------------------------------

# 1. Success, no output: Ok, empty answer.
$r = Invoke-CaptureChecked 'cmd.exe' @('/c', 'exit 0')
Assert-True ($r.Ok -and $r.Code -eq 0 -and $r.Out.Count -eq 0) 'exit 0, silent: Ok with empty Out'

# 2. Success with stdout: Ok, answer lines captured in order.
$r = Invoke-CaptureChecked 'cmd.exe' @('/c', 'echo alpha&& echo beta')
Assert-True ($r.Ok -and $r.Out.Count -eq 2 -and $r.Out[0].Trim() -eq 'alpha' -and $r.Out[1].Trim() -eq 'beta') 'exit 0 with stdout: lines captured'

# 3. Success with benign stderr chatter: still Ok, chatter kept OUT of the answer.
$r = Invoke-CaptureChecked 'cmd.exe' @('/c', 'echo warning: LF will be replaced 1>&2&& echo real-answer&& exit 0')
Assert-True ($r.Ok) 'benign stderr does not fail the query'
Assert-True ($r.Out.Count -eq 1 -and $r.Out[0].Trim() -eq 'real-answer') 'stderr chatter never pollutes Out'
Assert-True ($r.Err.Count -eq 1 -and $r.Err[0] -match 'LF will be replaced') 'stderr is retained for diagnostics'

# 4. Nonzero exit: NOT Ok, code and stderr surfaced, no answer treated as "no drift".
$r = Invoke-CaptureChecked 'cmd.exe' @('/c', 'echo boom 1>&2&& exit 3')
Assert-True ((-not $r.Ok) -and $r.Code -eq 3) 'nonzero exit reports Ok=$false with the real code'
Assert-True ($r.Err.Count -eq 1 -and $r.Err[0] -match 'boom') 'failure stderr is captured for the alert'

# 5. The real failure shape: git run where the query cannot succeed (not a repository).
$tmp = Join-Path $env:TEMP ("icc-norepo-" + [guid]::NewGuid().ToString('n'))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
    Push-Location $tmp
    $r = Invoke-CaptureChecked 'git' @('diff', '--name-only', 'origin/main')
    Pop-Location
    Assert-True ((-not $r.Ok) -and $r.Code -ne 0) 'git diff in a non-repo is a FAILURE, not "no drift"'
    Assert-True ($r.Out.Count -eq 0 -and $r.Err.Count -ge 1) 'the failed query carries diagnostics, not an answer'
} finally { Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue }

# 6. A successful drift query in THIS repo: Ok either way, and any answer lines are paths.
$r = Invoke-CaptureChecked 'git' @('-C', $PSScriptRoot, 'diff', '--name-only', 'HEAD')
Assert-True ($r.Ok) 'a real git diff query succeeds with Ok=$true'

# --- the gate wiring: step 0b must consume Ok before trusting the answer ---------------------

$src = Get-Content $scriptPath -Raw
Assert-True ($src -notmatch '(?m)^\s*function Invoke-Capture\s') 'the unchecked Invoke-Capture is gone'
$driftCalls = [regex]::Matches($src, 'Invoke-CaptureChecked "git" @\("diff","--name-only","origin/main"')
Assert-True ($driftCalls.Count -eq 2) 'both drift queries use the checked capture'
Assert-True ($src -match '-not \$driftQ\.Ok') 'pre-restore drift query fails closed'
Assert-True ($src -match '-not \$residualQ\.Ok') 'post-restore verification fails closed'
Assert-True ($src -match '\$driftQ\.Code' -and $src -match '\$driftQ\.Err') 'failure alert carries exit code and stderr context'

# --- step 0c: untracked shadow-capable classifier -------------------------------------------

$shadowFn = $ast.Find({ param($n)
    $n -is [System.Management.Automation.Language.FunctionDefinitionAst] -and
    $n.Name -eq 'Select-ShadowCapable' }, $true)
Assert-True ($null -ne $shadowFn) 'Select-ShadowCapable is defined in Refresh-Dashboard.ps1'
Invoke-Expression $shadowFn.Extent.Text

$r = Select-ShadowCapable -Paths @()
Assert-True ($r.Count -eq 0) 'empty untracked list yields no shadow candidates'

$r = Select-ShadowCapable -Paths @('codebase/stray.html', 'codebase/sub/x.txt')
Assert-True ($r.Count -eq 2) 'ANY untracked file under codebase/ is shadow-capable (git add codebase publishes it)'

$r = Select-ShadowCapable -Paths @('yaml.py', 'bimwatch/helper.py', 'extra_sync.mjs')
Assert-True ($r.Count -eq 3) 'untracked .py/.mjs anywhere shadows the import surface'

$r = Select-ShadowCapable -Paths @('notes.md', 'scratch.txt', 'report copy.html', 'test.ps1')
Assert-True ($r.Count -eq 0) 'benign untracked files (no import/publish surface) are not flagged'

$r = Select-ShadowCapable -Paths @('notes.md', 'codebase/evil.js', 'sync_ledgers_backup.py')
Assert-True ($r.Count -eq 2 -and ($r -contains 'codebase/evil.js') -and ($r -contains 'sync_ledgers_backup.py')) 'mixed list: only the shadow-capable paths are returned'

# Gate wiring: 0c queries untracked files fail-closed and never deletes anything.
Assert-True ($src -match 'Invoke-CaptureChecked "git" @\("ls-files","--others","--exclude-standard"\)') 'step 0c lists untracked files via the checked capture'
Assert-True ($src -match '-not \$untrackedQ\.Ok') 'untracked-file query fails closed'
Assert-True ($src -match 'Select-ShadowCapable -Paths \$untrackedQ\.Out') 'the classifier gates the render'
Assert-True ($src -notmatch '@\("clean"' -and $src -notmatch '& git clean' -and $src -notmatch '"clean",') 'the script never invokes git clean'

Write-Host ""
if ($script:fails) { Write-Host "$($script:fails) FAILED, $($script:passed) passed" -ForegroundColor Red; exit 1 }
Write-Host "$($script:passed) passed"
exit 0
