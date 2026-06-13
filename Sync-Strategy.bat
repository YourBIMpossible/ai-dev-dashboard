@echo off
REM ===================================================================
REM  Sync-Strategy.bat
REM  Double-click this AFTER clicking "-> Cowork" on the dashboard
REM  Strategy tab. It merges strategy_decisions.json into the durable
REM  ledger at  BIMpossible_Workspace\00_Strategy\strategy_decisions_ledger.md
REM  (merge-by-id: appends new, updates existing, never loses history).
REM ===================================================================
cd /d "%~dp0"
echo.
echo  Merging Strategy decisions into the 00_Strategy ledger...
echo.
node strategy_cowork_sync.mjs
echo.
echo  -------------------------------------------------------------
echo  Done. Close this window.  (Cowork reads the ledger as its source of truth.)
echo.
pause
