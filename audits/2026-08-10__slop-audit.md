# Slop audit — Dashboard

- **Date:** 2026-08-10
- **Window:** INCREMENTAL — no prior `audits/*__slop-audit*.md`, so commits since 2026-08-03 (28 commits, `2172820`..`5d6ece8`).
- **Scope:** silent-catch census, counter-integrity, tested-but-dead. Read-only, findings only.
- **In-window code touched:** `graph_signals.py` (new), `sync_dashboard.py`, `test_sync_dashboard.py`, dashboard render JS (`graphify-health.js`, `networkx_impact.js`, `phase_dag.js`, `audit-freshness.js`, `github_actions.js`, `bimwatch.js`, `codebase-meta.js`).

## Verdict

Clean. No CRITICAL/HIGH/MEDIUM. One LOW hypothesis.

`graph_signals.py` is careful, well-documented code: every `except` is a narrow, documented safe-degrade with an explicit fallback (PageRank→degree at `graph_signals.py:248`, git-unavailable→`{}` at `graph_signals.py:197`/`285`). `sync_dashboard.node_check` checks `returncode` and prints stderr honestly (`sync_dashboard.py:150`). No `.js` swallow sites in the window (the only JS `catch` is in `functions/api/bimwatch-chat.js`, out of window, and returns a proper 400).

### Check 1 — silent-catch census

See appendix. All in-window catches are *justified-and-logged* or *justified-safe-degrade*.

### Check 2 — counter-integrity

No "N succeeded / all clean" batch counters were introduced in the window. `graph_signals` returns ranked lists and computed integers (cycles, root-causes, blast-radius rows), not success tallies. `save_baseline` freezes counts honestly. No miscount surface.

### Check 3 — tested-but-dead

`test_sync_dashboard.py` exercises `sync_dashboard` functions that are the shipped refresh path (`Refresh-Dashboard.ps1` → `sync_dashboard.py`). No dead-twin test introduced. `graph_signals.py` has no dedicated test in the window, but it is consumed live by the dashboard render JS — not tested-but-dead, just untested (out of this audit's scope).

## Findings

### LOW-1 — `graph_signals` blanks the panel silently on unreadable `graph.json` — HYPOTHESIS

- **Where:** `graph_signals.py:44-47` (`load_graph` → `return None, None`) and `graph_signals.py:300-304` (`load_baseline` → `return {}`).
- **Claim:** a corrupt or truncated `backend/graphify-out/graph.json` (or baseline file) is swallowed and the codebase-risk panel renders empty/degraded with no operator-visible signal that the *input* failed, versus a genuinely healthy graph. Reads as "nothing to report" when the truth is "couldn't read the data".
- **Severity rationale:** LOW — dashboard cosmetic; no data corruption, no wrong action gated on it. But it is the house pattern (silent absence looks like success).
- **Verification step:** feed `load_graph` a deliberately truncated `graph.json` and confirm the caller (the JS-consumed output) shows no distinguishable error state vs. an empty-but-valid graph. If the caller already stamps a staleness/error badge, downgrade to non-finding.

## Appendix — silent-catch census (in-window)

| File:line | Pattern | Classification |
|---|---|---|
| `graph_signals.py:46` | `except Exception → None,None` | justified-safe-degrade (LOW-1) |
| `graph_signals.py:50` | `except TypeError` (nx version compat) | justified-and-handled |
| `graph_signals.py:197` | `except (OSError, SubprocessError) → {}` | justified (git optional) |
| `graph_signals.py:248` | `except Exception → {}` (PageRank→degree fallback) | justified, documented |
| `graph_signals.py:285` | `except (OSError, SubprocessError) → ""` | justified (git optional) |
| `graph_signals.py:303` | `except Exception → {}` (no baseline yet) | justified-safe-degrade (LOW-1) |
| `graph_signals.py:82` | `except (SyntaxError, OSError) → set()` | justified (permissive AST, documented under-flag) |
| `sync_dashboard.py:154-160` | `try/finally` around `node --check`, returncode checked | not a swallow — honest |
