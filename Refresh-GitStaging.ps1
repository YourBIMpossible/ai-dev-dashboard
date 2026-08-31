# ============================================================
# Staging step for Refresh-Dashboard.ps1, split out so it can be exercised by
# test_refresh_git_staging.ps1 against a throwaway repo.
#
# WHY THIS IS ITS OWN FUNCTION: `git add` is all-or-nothing. One pathspec that
# matches nothing makes git abort the WHOLE add (exit 128) and stage none of the
# paths that did match - which leaves an empty index, exactly what "nothing
# changed" looks like. The refresh used to discard the add's exit code and read
# the empty index as "already current", clear the failure alert and exit 0: a
# total no-op reported as success (2026-08-31 slop audit, MEDIUM-1). Staging
# status is therefore returned explicitly and never inferred from the index.
#
# Runs git in the CURRENT working directory - Refresh-Dashboard.ps1 has already
# done Set-Location $PSScriptRoot.
# ============================================================

function Invoke-GitStage {
    <#
    .SYNOPSIS
      Stage $Paths and report what actually happened.
    .OUTPUTS
      PSCustomObject: Ok (bool), ExitCode (int), Staged (string[] - null unless Ok), Reason (string - null when Ok)
    #>
    param(
        [Parameter(Mandatory)][string[]]$Paths,
        # Log sink for git's own output. Default discards; the refresh passes its logger.
        [scriptblock]$Log = { param($Message) }
    )

    # Same stderr guard Invoke-Logged uses: under EAP=Stop, PS 5.1 turns git's
    # benign stderr into a TERMINATING error when merged via 2>&1.
    $eap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $addOut = & git add @Paths 2>&1 | ForEach-Object { "$_" }
        $addRc  = $LASTEXITCODE
        foreach ($line in $addOut) { & $Log $line }
        if ($addRc -ne 0) {
            return [pscustomobject]@{
                Ok = $false; ExitCode = $addRc; Staged = $null
                Reason = "git add failed (exit $addRc) - nothing was staged"
            }
        }

        # Only meaningful once the add is known to have succeeded.
        $diffOut = & git diff --cached --name-only 2>&1 | ForEach-Object { "$_" }
        $diffRc  = $LASTEXITCODE
        if ($diffRc -ne 0) {
            foreach ($line in $diffOut) { & $Log $line }
            return [pscustomobject]@{
                Ok = $false; ExitCode = $diffRc; Staged = $null
                Reason = "git diff --cached failed (exit $diffRc) - staged set unknown"
            }
        }

        $staged = @($diffOut | Where-Object { $_.Trim() })
        return [pscustomobject]@{ Ok = $true; ExitCode = 0; Staged = $staged; Reason = $null }
    }
    finally { $ErrorActionPreference = $eap }
}
