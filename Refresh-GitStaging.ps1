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
            # The Reason is what Alert-Failure surfaces, so it has to be actionable on
            # its own: the exact command, the exit code, and git's own words (which
            # name the offending pathspec). Without them the alert says only that
            # "staging failed" and the operator still has to reproduce it by hand.
            $why = @($addOut | Where-Object { $_ -and $_.Trim() }) -join ' | '
            return [pscustomobject]@{
                Ok = $false; ExitCode = $addRc; Staged = $null
                Reason = "git add $($Paths -join ' ') failed (exit $addRc) in '$((Get-Location).Path)' - nothing was staged" +
                         $(if ($why) { ": $why" } else { "" })
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

function Get-StagingDisposition {
    <#
    .SYNOPSIS
      Map an Invoke-GitStage result onto the one action the refresh may take.
    .DESCRIPTION
      The whole MEDIUM-1 defect was a caller collapsing two different states into
      one. Keeping the mapping here - ordered, total, and testable - means the
      refresh cannot reach 'nochange' on a failed add no matter how its branches
      are later edited.
    .OUTPUTS
      'fail'     staging did not run to completion; the staged set is unknown.
      'nochange' staging succeeded and the index is genuinely empty.
      'commit'   staging succeeded with paths staged.
    #>
    param([Parameter(Mandatory)][AllowNull()][psobject]$Stage)

    if ($null -eq $Stage -or -not $Stage.Ok) { return 'fail' }
    if ($null -eq $Stage.Staged)             { return 'fail' }   # Ok without a staged set is not a state we trust
    if (@($Stage.Staged).Count -eq 0)        { return 'nochange' }
    return 'commit'
}
