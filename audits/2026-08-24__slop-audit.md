# Slop audit — AI Dashboard

- **Date:** 2026-08-24
- **Repo:** `F:\AI-Dashboard\Dashboard` (live editing clone)
- **Mode:** INCREMENTAL
- **Window:** commits since the previous report `audits/2026-08-17__slop-audit.md` → 28 commits (`1872b6b`..`7c72e59`), 21 changed code files
- **Checks:** silent-catch census, counter-integrity, tested-but-dead
- Read-only. Findings only — nothing was fixed.

> **Path note.** The scheduled task names `F:\AI-Dev\Dashboard` as the target. That root is a
> **frozen rollback copy** (`_FROZEN-ROLLBACK-ROOT.md` present, files read-only, retained until
> the 2026-09-06 tooling burn-in ends). Auditing it would produce findings against code that
> cannot be changed. This audit therefore ran against the live root `F:\AI-Dashboard\Dashboard`
> per `F:\AI-Dev\CLAUDE.md`'s live-roots table. The scheduled-task file should be repointed.

## Summary

| Severity | Count |
|---|---|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 2 |
| LOW | 0 |

`Refresh-Dashboard.ps1` is the most defended file in the window — every native call goes
through `Invoke-Logged`, which restores `$ErrorActionPreference` and returns the real
`$LASTEXITCODE`, and each non-fatal step logs an explicit `WARN:` line. Both findings are
about what the *published board* says after a partially-failed run, not about unlogged
failures.

---

## MEDIUM-1 — a partially-failed refresh still stamps today's date and clears the failure alert

- **File:** `Refresh-Dashboard.ps1:198`–`:241`, `:243`–`:248`, `:286`
- **Status:** FIXED 2026-08-24 — `$degraded` counter per attempt, partial marker stamped into
  `generatedBy` and rendered in the sidefoot, `Clear-Alert` gated on `$degraded -eq 0`.
- **Check:** counter-integrity

Steps 1b–1f are non-fatal by design, and that design is documented in-file: `sync_activity.py`,
`phase_dag.py`, `networkx_impact.py`, `check_audit_freshness.py`, `codebase_sync.mjs`, and the
graph-metrics render each log `WARN: ... not refreshed this attempt` and continue. Only
`sync_ledgers.py` and `validate_dashboard.py` are fatal.

Step 2 then runs unconditionally:

```powershell
$text = [regex]::Replace($text, 'generated: "\d{4}-\d{2}-\d{2}"', "generated: `"$today`"")
$text = [regex]::Replace($text, 'generatedBy: "[^"]*"', 'generatedBy: "scheduled refresh"')
```

So a run in which four of six renderers failed still publishes `generated: <today>` with no
degradation marker anywhere on the page. The board asserts a freshness that only the date
stamp actually earned; the WARN lines live in `_backups\refresh-log.txt`, which nobody reads
unless already suspicious.

Compounding it, `:286`:

```powershell
if ($result -eq 0 -or $result -eq 2) { Clear-Alert }
```

`$result` is 0/2 for any run that reached commit+push, regardless of how many non-fatal steps
failed. A genuine failure alert raised yesterday is therefore **cleared** by today's
mostly-failed run — the durable `REFRESH-FAILED.flag` that exists specifically so a backend
failure surfaces before the 3-day staleness banner gets erased by a run that also failed.

This is the house defect in its counter form: the success signal excludes the failures it
was supposed to carry.

**Verification step:** temporarily rename `phase_dag.py` and `networkx_impact.py`, drop a
`REFRESH-FAILED.flag`, run `Refresh-Dashboard.ps1`, and confirm (a) `data.js` carries today's
`generated` date, (b) the flag is gone, (c) nothing on the rendered page indicates partial
data.

**Fix direction (not applied):** track a `$degraded` counter incremented at each WARN branch;
stamp `generatedBy: "scheduled refresh (partial: N step(s) failed)"` when non-zero, surface it
as a small banner, and make `Clear-Alert` conditional on `$degraded -eq 0`.

---

## MEDIUM-2 — `Invoke-Logged` discards stderr-only failures that exit 0

- **File:** `Refresh-Dashboard.ps1:65`–`:74`
- **Status:** REFUTED 2026-08-24 — ran the stated verification: `networkx_impact.py:300`–`:305`
  wraps `build()` and `sys.exit(1)`s on any exception; every other renderer's entry point is
  `raise SystemExit(main())` / `sys.exit(main())`. No stderr-but-exit-0 path exists. No change.
- **Check:** silent-catch census

`Invoke-Logged` merges stderr into stdout (`2>&1`), appends everything to the log, and returns
`$LASTEXITCODE` alone. That is the correct fix for the documented PS 5.1 trap (git's benign
stderr becoming terminating under `EAP=Stop`) and should not be reverted. The residual gap is
narrow: a renderer that writes a Python traceback to stderr but still exits 0 — e.g. an
exception caught at top level with a `print` and no `sys.exit(1)` — is indistinguishable from
a clean run. `networkx_impact.py:303` (`except Exception as exc:`) is the closest candidate
in the window.

**Verification step:** trace `networkx_impact.py`'s top-level handler to its `sys.exit` call.
If any caught-exception path falls through to an implicit `return None`/exit 0, confirmed;
if every handler exits non-zero, this is REFUTED.

---

## Check 2 — counter-integrity (other files)

`check_audit_freshness.py` is a positive example and passes: `load_projects` checks
`result.returncode != 0` and exits 1 with the captured stderr (`:44`–`:47`); the `continue`
sites at `:64`/`:67`/`:81` are filters over projects with no audit block, and `stale_ids`
accumulates every stale project so the badge count matches the detected set. The in-file
comment correctly documents the detect-only posture (a newer report on disk never
auto-ingests).

`sync_ledgers.py` and `sync_activity.py` are fatal-on-failure to the caller (their non-zero
exit is read at `:196`/`:200`), so their internal `continue` sites cannot inflate a success
total that the orchestrator trusts.

## Check 3 — tested-but-dead

No violations. `test_reconcile_audit.py` changed in the window and exercises
`reconcile_audit.py`, which has a confirmed production caller — the `/dashboard-update` audit
ingest path, and `reconcile_audit` is the gate the `788c064` / `ae1a338` commits made
mandatory before publishing an open backlog. Not a dead twin.

---

## Appendix — silent-catch census (window)

| File:line | Pattern | Classification |
|---|---|---|
| `Refresh-Dashboard.ps1:54` | `catch {}` around fail-flag write | justified-but-silent — alert path is best-effort by design |
| `Refresh-Dashboard.ps1:59` | `catch {}` around `msg.exe` desktop ping | justified-but-silent |
| `Refresh-Dashboard.ps1:98` | `catch {}` around per-line `ConvertFrom-Json` | justified-but-silent — malformed ledger lines skipped without a count |
| `Refresh-Dashboard.ps1:159` | `catch {}` around existing-series parse | justified — failure yields `$existingPushes = -1`, documented as "no prior series to protect" |
| `Refresh-Dashboard.ps1:61,275` | `Remove-Item -EA SilentlyContinue` | justified — absence is the expected case |
| `Refresh-Dashboard.ps1:174,175,180` | `Get-Command -EA SilentlyContinue` | justified — both branches handled (`python` fatal, `node` WARN) |
| `Refresh-Dashboard.ps1:65`–`74` | `Invoke-Logged` stderr merge | justified-and-logged; narrow gap → MEDIUM-2 |
| `check_audit_freshness.py:44` | `subprocess.run` | justified-and-logged — return code checked, exits 1 |
| `reconcile_audit.py:297,338` | `except (CalledProcessError, FileNotFoundError, UnicodeDecodeError)` | justified — specific types, git-absence tolerated |
| `reconcile_audit.py:659` | `except (AttributeError, ValueError): pass` | justified-but-silent — field-shape tolerance |
| `sync_activity.py:87,122` | same specific-type tuple, bound as `exc` | justified-and-logged |
| `sync_activity.py:99` | `except json.JSONDecodeError: continue` | justified-but-silent |
| `sync_ledgers.py:290,318,389` | `except ValueError` / git tuple / `(AttributeError, ValueError): pass` | justified-but-silent |
| `networkx_impact.py:43,55` | `except Exception:` | justified-but-silent |
| `networkx_impact.py:114` | `except ImportError:` | justified — networkx is an optional dependency, documented non-fatal |
| `networkx_impact.py:303` | `except Exception as exc:` | **unresolved** — see MEDIUM-2 verification step |
