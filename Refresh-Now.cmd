@echo off
setlocal
title Refresh Dashboard Now
echo ============================================================
echo  Refreshing dashboard on demand
echo    - phases/waves from the ledgers
echo    - per-project dates + activity from REAL git history (GitHub)
echo    - validate, reconcile with remote, push (auto-deploys)
echo ============================================================
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Refresh-Dashboard.ps1"
set "RC=%ERRORLEVEL%"
echo.
echo --------------------- last refresh log ---------------------
powershell.exe -NoProfile -Command "Get-Content -Path '%~dp0_backups\refresh-log.txt' -Tail 16"
echo ------------------------------------------------------------
echo.
if "%RC%"=="0" (
  echo RESULT: SUCCESS - dashboard is current and pushed.
) else (
  echo RESULT: FAILED ^(exit %RC%^) - see the log above / _backups\refresh-log.txt
)
echo.
echo Press any key to close...
pause >nul
endlocal
