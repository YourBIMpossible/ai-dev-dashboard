# Anti-slop code audit — AI-Dashboard/Dashboard — 2026-09-07

Read-only. Findings only, no fixes, no commits.

## Window

Commits since the previous report `audits/2026-08-31__slop-audit.md`, i.e. everything after
the 2026-08-31 audit up to current `HEAD` (`baad06f`). First in-window commit:
`072afa3` (2026-08-31 15:50, PR #8); last code-bearing PRs in window: #8–#21 plus the daily
refresh/bimwatch/billing automation commits.

### Files actually audited (logic-bearing, changed in window)

| File | In-window change | Verdict |
|---|---|---|
| `Refresh-Dashboard.ps1` | #8, #9, #10, #11, #20 | 1 LOW |
| `Refresh-GitStaging.ps1` | #20 (new file) | clean |
| `sync_ledgers.py` | #8, #21 | clean |
| `check_narrative_freshness.py` | #20 | 1 LOW (hypothesis) |
| `export-audit-findings.js` | #20 | clean |
| `bimwatch-panel.js` | #7 (CSS-only) | 1 LOW (pre-existing, out of window) |
| `index.html` check-in classifier | #7, #16–#19 | clean |
| test files (8) | #7, #19, #20, #21 | clean (all target shipped code) |

### Files listed in the task that are GENERATED DATA (not source) — skipped

`audit-freshness.js`, `narrative-freshness.js`, `github_actions.js`, `bimwatch.js`,
`phase_dag.js`, `networkx_impact.js`, `codebase/codebase-meta.js`, `graphify-health.js`,
`data.js` — every one is a `window.X = {…}` payload emitted by a generator (headers say
"GENERATED"/"Auto-generated"). Their generators (`check_audit_freshness.py`, `phase_dag.py`,
`networkx_impact.py`, `bimwatch/run.py`, `github_actions_sync.mjs`) did **not** change in
this window, so there is no in-window source to audit behind them. `codebase/codebase-meta.js`
and `graphify-health.js` did not change in the window at all.

---

## Summary

This repo is unusually well-hardened: nearly every in-window commit is itself a remediation of
a prior slop audit (MEDIUM-1 staging, MEDIUM-2/LOW-1/LOW-2 export-freshness, the 2026-08-31
completion-model wipe, the check-in "hiding work" defect). The three checks turned up **no
CRITICAL, HIGH, or MEDIUM findings**. Three LOW items, two of them low-probability hypotheses
and one pre-existing/out-of-window, are recorded below.

Severity counts: CRITICAL 0 · HIGH 0 · MEDIUM 0 · LOW 3.

---

## Findings

### LOW-1 — `Refresh-Dashboard.ps1:188-209` — corrupt existing `graph-metrics.js` silently disables the no-shrink invariant — HYPOTHESIS

`Update-GraphMetricsFromLedger` protects the metrics series with a "never ship fewer pushes
than the file already represents" guard. The existing count is read inside a `try {…} catch {}`
(L189-208); on any read/parse failure `$existingPushes` stays `-1`, and the guard at L210
(`if ($existingPushes -ge 0 -and $incomingPushes -lt $existingPushes)`) is then skipped
entirely. So a corrupt or partially-written `graph-metrics.js` causes the shrink guard to be
**silently bypassed** rather than to warn — the render proceeds and may overwrite a longer good
series with a shorter one. The empty `catch {}` writes nothing to the log, and the function's
`reason` string on success does not distinguish "guard ran" from "guard disabled because the
prior file was unreadable".

Mitigating: the file is machine-written by this same function in a byte-stable format, so a
parse failure is unlikely in practice, and "no readable prior series" is arguably "nothing to
protect." Impact is confined to the graphify metrics chart, not phase/wave/audit verdicts.

- Verification step: temporarily point `-OutPath` at a file containing `window.GRAPH_METRICS = [garbage`;
  confirm the function returns `ok=$true` and rewrites it (guard bypassed) with no log line naming
  the bypass. Fix would be to log when the existing-series read fails so a bypass is visible.

### LOW-2 — `check_narrative_freshness.py:91` — `newest_recent_date` assumes each `recent[]` entry is a str or dict — HYPOTHESIS

`[parse_date(x if isinstance(x, str) else x.get("text", "")) for x in recent]` calls `.get` on
any non-string entry. A `recent[]` element that is a number, list, or `None` would raise
`AttributeError` and abort the whole freshness check. This is **not** a silent swallow — the
crash propagates, `main()` exits non-zero, and `Refresh-Dashboard.ps1:353` treats an exit code
that is neither 0 nor 1 as "narrative freshness UNKNOWN" and increments `$degraded`, so the
failure is surfaced (partial-run marker on the board). It is a robustness gap, not an
integrity gap.

- Verification step: run `check_narrative_freshness.py` against a fixture whose `recent` contains
  `[123]`; confirm it raises rather than skipping the bad entry. Fix: guard with
  `isinstance(x, dict)` before `.get`.

### LOW-3 — `bimwatch-panel.js:219-234` — deep-archive fetch failure is swallowed into a silent fallback — PRE-EXISTING (out of window)

`loadArchive` catches a failed `fetch`/parse and stores `state.archiveError`, but `searchTab`
never renders `state.archiveError`. On failure the loading spinner clears and search silently
falls back to the smaller `bw.recent` pool; the "N results" count reflects that smaller pool
with no indication the "Search all N" request failed. This is a genuine swallow-a-real-failure
at the UX layer (a dead archive reads as a thin archive).

**Out of window:** the only in-window change to `bimwatch-panel.js` (PR #7) was CSS
contrast/hit-target fixes; this code path was not touched this window. Recorded for completeness
because the file is in the audited set.

- Verification step: block `bimwatch-archive.json` (e.g. rename it), click "Search all N →",
  observe the spinner clear with no error surfaced and results computed over `recent` only.

---

## Check 2 — Counter-integrity (no findings)

Every "all clean / in sync / all fresh / done" total was traced to its exclusions; none
over-counts:

- `export-audit-findings.js` — all severity columns are derived from the canonical `open[]`
  via `countBySev`, and `totals()` sums the same buckets plus `open.length`, so columns always
  reconcile to the open total (unclassified severities land in their own bucket, never dropped).
  The "✅ All cards … in sync with disk" line prints only when both `staleProjects` and
  `unknownFreshness` are empty; cards absent from `audit-freshness.js` force `stale===null` →
  `unknownFreshness` → blocks all-clear; cards with no `audit` block are counted and named
  separately (`cardsWithoutAudit`). A missing required input exits 2 with no report (#20).
- `check_narrative_freshness.py` — `evaluated_count = len(results) - len(unevaluated_ids)`;
  unevaluated cards force exit 2 and are never folded into the "checked N; all current" line,
  which is reachable only on the final `return 0` (no stale, no unevaluated).
- `sync_ledgers.py` — `build_waves` tallies (done/built/inFlight/ahead) are independent
  status filters, not success/skip counters; `summarize_changes` zips old/new phases and
  appends an explicit `phase count:` line when lengths differ, so a dropped/added phase can't
  hide.
- `Refresh-Dashboard.ps1` — the `$degraded` counter is incremented on every non-fatal WARN
  branch, reaches the `generatedBy` "(partial: N step(s) failed)" stamp, and gates
  `Clear-Alert` (flag cleared only on `result∈{0,2}` AND `$degraded -eq 0`). `narrativeRc==1`
  (stale detected) is correctly excluded from `$degraded`; `narrativeRc∉{0,1}` (unmeasured)
  correctly degrades — the exact LOW-1 fix from the prior report.
- `index.html` `tvPartition`/`deskRipe` — the ripe/parked split *partitions a list rendered in
  full* (parked items fold, never drop), fails safe to RIPE/visible on any unrecognised cue,
  and the owner-ask override (`DESK_ASK`) keeps owner-directed work visible even beside a
  done/park cue. This is the #19 "stop hiding unfinished/owner work" contract and it holds:
  `ripe ∪ parked == desk` by construction.

## Check 3 — Tested-but-dead (no findings)

Every in-window test exercises the **shipped** code path, not a copy:

- `test_invoke_capture_checked.ps1` — AST-extracts `Invoke-CaptureChecked` and
  `Select-ShadowCapable` verbatim from `Refresh-Dashboard.ps1` and additionally asserts the
  call-site wiring in the script source. Both functions have live callers (steps 0b/0c).
- `test_refresh_git_staging.ps1` — dot-sources the real `Refresh-GitStaging.ps1`
  (`Invoke-GitStage`/`Get-StagingDisposition`), called by Refresh step 4.
- `test_renderer.js` / `test_disclosure.js` — `vm`-extract the actual `deskSegments`,
  `deskRipe`, `tvPartition`, `tvHumanize`, `tvDesk`, `cohortHeadlinePct` (and consts) out of
  `index.html`; all are called by the live `todayView()` renderer.
- `test_sync_ledgers_changes.py` — `import sync_ledgers`; `summarize_changes` is called in
  `render()`.
- `test_phase_completion_model.py` — imports `sync_ledgers`; `build_progress` is called in
  `render()`.
- `test_check_narrative_freshness.py` — `import check_narrative_freshness`; `main`/`evaluate`
  are called by Refresh step 1d.
- `test_export_audit_findings.mjs` — `spawnSync`s the real `export-audit-findings.js`.

---

## Appendix — Silent-catch census (audited logic files)

| File:line | Site | Classification | Note |
|---|---|---|---|
| `Refresh-Dashboard.ps1:58` | `catch {}` around `Set-Content $failFlag` | justified-but-silent | Best-effort durable flag; the alert reason is already logged at L54. |
| `Refresh-Dashboard.ps1:63` | `catch {}` around `msg.exe` desktop alert | justified-but-silent | Best-effort toast; reason already in log + flag. |
| `Refresh-Dashboard.ps1:65` | `Remove-Item -ErrorAction SilentlyContinue` (Clear-Alert) | justified-and-logged | Removing a flag that may not exist; success/failure surfaced by the flag's next presence. |
| `Refresh-Dashboard.ps1:147` | `catch {}` per-line `ConvertFrom-Json` (ledger) | justified | Skips non-JSON lines in append-only JSONL; wholesale failure caught by the `$raw.Count==0` guard (L150). |
| `Refresh-Dashboard.ps1:189-208` | `catch {}` reading existing series for no-shrink guard | swallows-a-real-failure (LOW-1) | Corrupt prior file silently disables the shrink invariant; no log line. |
| `Refresh-Dashboard.ps1:69-107` | `Invoke-Logged` / `Invoke-CaptureChecked` | justified-and-logged | Deliberate `$LASTEXITCODE` capture under EAP=Continue; fail-closed (`Ok`) design, not a swallow. |
| `Refresh-GitStaging.ps1` (whole) | explicit `$LASTEXITCODE` checks after every git call | justified-and-logged | No swallow; the whole point of the split is to stop inferring status from the index. |
| `sync_ledgers.py:419` | `except (CalledProcessError, FileNotFoundError)` (`_wave_drift`) | justified-and-logged | Returns a surfaced drift note ("wave tag check unavailable"). |
| `sync_ledgers.py:524` | `except (AttributeError, ValueError): pass` (`stream.reconfigure`) | justified | Best-effort stdout/stderr UTF-8 reconfigure; failure is inert. |
| `check_narrative_freshness.py:84-86` | `except ValueError: return None` (`parse_date`) | justified | Invalid date → None → routed to unevaluated/stale, never a clean default. |
| `export-audit-findings.js:80-83` | `try/catch` in `loadGlobal` | justified-and-logged | Returns `{ok:false,reason}`; callers exit 1/2 with the reason (the #20 fix). |
| `bimwatch-panel.js:90-92` | `catch(err) return '#'` (`safeUrl`) | justified | Fail-closed URL sanitiser. |
| `bimwatch-panel.js:228-233` | `catch(err)` in `loadArchive` | swallows-a-real-failure (LOW-3) | `state.archiveError` set but never rendered; silent fallback to `recent[]`. Pre-existing/out of window. |
| `bimwatch-panel.js:283-285` | `catch(err)` in `sendChat` | justified-and-logged | Error pushed into the chat log and shown to the user. |
