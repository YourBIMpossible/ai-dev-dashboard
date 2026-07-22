@echo off
setlocal
title Refresh Dashboard Now
rem Runs the SAME script the "BIMpossible Dashboard Daily Refresh" scheduled
rem task runs, from the SAME automation clone, so the button and the 6am
rem schedule cannot drift apart. Targeting Dashboard-auto is deliberate: this
rem clone is the editing clone, and its pre-commit hook rejects the
rem CI/automation-owned files (graph-metrics.js) that a refresh must write.
set "AUTO=F:\AI-Dev\Dashboard-auto"
echo ============================================================
echo  Refreshing dashboard on demand
echo    - phases/waves from the ledgers
echo    - per-project dates + activity from REAL git history (GitHub)
echo    - backend knowledge graph metrics
echo    - validate, reconcile with remote, push (auto-deploys)
echo ============================================================
echo.
if not exist "%AUTO%\Refresh-Dashboard.ps1" (
  echo ERROR: automation clone not found at %AUTO%
  echo Expected the same path the daily scheduled task uses.
  goto :done
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%AUTO%\Refresh-Dashboard.ps1"
set "RC=%ERRORLEVEL%"
echo.
echo --------------------- last refresh log ---------------------
powershell.exe -NoProfile -Command "Get-Content -Path '%AUTO%\_backups\refresh-log.txt' -Tail 16"
echo ------------------------------------------------------------
echo.
if "%RC%"=="0" (
  echo RESULT: SUCCESS - dashboard is current and pushed.
) else (
  echo RESULT: FAILED ^(exit %RC%^) - see the log above / %AUTO%\_backups\refresh-log.txt
)
:done
echo.
echo Press any key to close...
pause >nul
endlocal
