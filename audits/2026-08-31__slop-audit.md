# Slop audit — F:\AI-Dashboard\Dashboard

**Run:** 2026-08-31 (scheduled weekly, incremental)
**Window:** commits since the previous report `audits/2026-08-24__slop-audit.md` — 49 commits
(the large majority are automated `data.js` / `graph-metrics.js` refresh commits; the executable
surface that actually changed is listed below).
**Scope:** the three checks over changed code only.
**Read-only.** Findings, no fixes.

## Changed executable surface in the window

| File | Change |
|---|---|
| `Refresh-Dashboard.ps1` | `$degraded` counter + partial-refresh stamping (prior-audit fix) |
| `export-audit-findings.js` | new (224 lines) |
| `check_narrative_freshness.py` | new (139 lines) |
| `index.html` | partial-marker rendering |

This repo is the highest-risk one in the estate for the house defect: it is an unattended
scheduled pipeline whose only observer is its own success message.

---

## MEDIUM-1 — a failed `git add` renders as "Already current - nothing to push" and clears the failure alert

**Status: VERIFIED (mechanism)**
`Refresh-Dashboard.ps1:288`

```powershell
Invoke-Logged "git" @("add","data.js","graph-metrics.js","phase_dag.js","networkx_impact.js",
                      "audit-freshness.js","narrative-freshness.js","graphify-health.js","codebase") | Out-Null
$staged = (& git diff --cached --name-only) -join "<newline>"
if (-not $staged.Trim()) { "Already current - nothing to push." | Add-Content -Path $log -Encoding utf8; $result = 2; break }
```

The staging exit code is piped to `Out-Null` and never branched on. The very next line infers
"nothing changed" from an empty index — but an empty index is also exactly what a *failed* add
produces, because **git aborts the entire staging operation if any one pathspec is bad**; it does
not partially stage the paths that did match.

Verified in a throwaway repo (scratchpad, not this repo):

```
git add good.txt missing.txt
fatal: pathspec 'missing.txt' did not match any files
add exit=128
staged: []      <- good.txt was NOT staged
```

Eight of the nine pathspecs are generated artifacts. If any generator step degrades such that its
output file is absent (`narrative-freshness.js` and `graphify-health.js` are the newest and least
load-bearing), the add returns 128, nothing is staged, and the script takes the success path:
`$result = 2` → treated as success → `Clear-Alert` removes the failure flag → scheduler sees exit 0.
The live board silently stops updating while every signal says healthy.

The `$degraded` work in this window is a genuinely good counter-integrity fix — every non-fatal
WARN branch increments it, and `$stampBy` renders `scheduled refresh (partial: N step(s) failed)`,
which `index.html:1479` actually surfaces (`const partial=/partial:/.test(D.generatedBy||'')`).
`Clear-Alert` correctly requires `$degraded -eq 0`. This finding is the one path that bypasses all
of it, because it never increments anything — it exits through the *success* door.

**Proposed fix (not applied):** capture the add's exit code and treat non-zero as fatal
(`$result = 1` + `Alert-Failure "git add failed (exit $code)"`), and/or `Test-Path` each artifact
before staging.

---

## MEDIUM-2 — `export-audit-findings.js` asserts "All cards in sync with disk" when its freshness input never loaded

**Status: VERIFIED**
`export-audit-findings.js` — inputs are loaded through a `loadGlobal()` helper that returns `null`
when the file is missing or unparseable, and `FRESH` then falls back to `{ projects: {} }`. With an
empty projects map every card's `stale` computes to `null`, `staleProjects` is empty, and both the
console summary and the written report state the all-clear.

Verified by copying `export-audit-findings.js` and `data.js` into the scratchpad **without**
`audit-freshness.js` and running it:

```
Audit findings: 0 open (0C / 0H / 0M / 0L / 0I), 86 closed last cycle.
✅ All cards in sync with disk.
Report written: r.md
9:> ✅ All cards are in sync with the newest report on disk.
```

Exit 0, no warning that the staleness check never ran. "In sync with disk" is precisely the claim
the missing file makes uncheckable, and it is the claim that gets printed.

**Proposed fix (not applied):** if `loadGlobal('audit-freshness.js')` returns null, print
`STALENESS UNKNOWN — audit-freshness.js not loaded` and exit non-zero rather than rendering an
all-clear.

---

## LOW-1 — `check_narrative_freshness.py` counts cards it never evaluated

**Status: VERIFIED (code-traced); latent on current data**
`check_narrative_freshness.py` — a card whose `lastActivity.date` is missing or unparseable yields
`la_date = None`, which falls through every staleness branch: it is not stale, it produces no
reason, and no skip counter is incremented. It is nonetheless included in the denominator of the
final message.

The result is `checked N card(s); all narrative feeds current within 14 days` where some of those
N were never actually checked — the house defect verbatim.

**Live run (this audit):** `checked 12 card(s); all narrative feeds current within 14 days`, exit 0,
and 0 of 12 cards are currently unevaluated. So the hole is latent, not producing a wrong answer
today.

**Proposed fix (not applied):** count unevaluated cards separately and render
`checked N (M unevaluated — no parseable lastActivity.date)`.

---

## LOW-2 — `export-audit-findings.js` totals mix two sources, and silently drops cards without an audit block

**Status: HYPOTHESIS**
Two smaller counter-integrity issues in the same file:

1. The Totals sentence takes its severity breakdown from each card's *declared* `a.counts` but the
   open total from `r.open.length` — two independently maintained numbers presented as one fact. If
   a card's declared counts drift from its actual open list, the sentence is internally
   inconsistent and nothing flags it. **Currently consistent:** cards where
   `sum(counts) != len(open)` → `[]` (all zeros today), so this is unfalsified rather than
   disproven.
2. `if (!p.audit) continue;` drops any project without an audit block, and the report never says
   how many were dropped. Only 5 of 12 projects carry audit data; a reader of the report sees an
   estate-wide all-clear derived from fewer than half the cards.

**Verification step:** hand-edit a scratchpad copy of `data.js` so one card's `counts` disagrees
with its `open` array, and confirm the Totals line renders both numbers without complaint.

**Proposed fix (not applied):** derive severity counts from `open` rather than `counts` (or assert
they agree), and append `— K of N cards carry no audit data` to the report.

---

## Check 2 — counter-integrity elsewhere: PASS

`Refresh-Dashboard.ps1`'s `$degraded` counter reaches the output for every non-fatal branch, the
`(partial: ...)` marker is rendered by `index.html:1479`, and `Clear-Alert` is gated on
`($result -eq 0 -or $result -eq 2) -and $degraded -eq 0`. `check_narrative_freshness.py`'s exit 1
deliberately does not increment `$degraded` and the script documents why. MEDIUM-1 is the single
route around this machinery.

## Check 3 — tested-but-dead: N/A

This repo carries no test suite; both new scripts are invoked directly by `Refresh-Dashboard.ps1`
(verified present in its step list). No dead twin, and no test coverage to be misled by.

---

## Appendix — silent-catch census (changed files in window)

| Site | Pattern | Classification |
|---|---|---|
| `Refresh-Dashboard.ps1:288` | `git add` exit code piped to `Out-Null` | **swallows a real failure** — MEDIUM-1 |
| `Refresh-Dashboard.ps1:~54` | `try { failFlag write } catch {}` | justified-but-silent (best-effort alert flag; the msg.exe path also fires) |
| `Refresh-Dashboard.ps1:~59` | `try { & msg.exe ... } catch {}` | justified-but-silent (toast is best-effort; flag file is the durable signal) |
| `Refresh-Dashboard.ps1:~98` | `Clear-Alert` → `Remove-Item -EA SilentlyContinue` | justified-and-logged (absent flag is the desired state) |
| `Refresh-Dashboard.ps1:~159` | per-line `ConvertFrom-Json` in `catch {}` (graph-metrics ledger) | justified-but-silent — **defended downstream** by the zero-entry guard (`ok = false; reason = "ledger parsed to 0 entries"`) and the refusing-to-shrink check |
| `Refresh-Dashboard.ps1` existing-pushes parse | `catch {}` | justified-but-silent (same shrink guard covers it) |
| `Invoke-Logged` | sets `$ErrorActionPreference='Continue'`, captures `2>&1`, returns `$LASTEXITCODE` | justified-and-logged — the helper is correct; MEDIUM-1 is a *caller* discarding its return |
| `export-audit-findings.js` `loadGlobal` | returns `null` on missing/unparseable input | **swallows a real failure** — MEDIUM-2 |
| `export-audit-findings.js` `if (!p.audit) continue` | silent skip, no counter | **swallows a real failure** — LOW-2 |
| `check_narrative_freshness.py` `la_date is None` | falls through all branches, still counted | **swallows a real failure** — LOW-1 |

## Severity summary

| Severity | Count |
|---|---|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 2 |
| LOW | 2 |
