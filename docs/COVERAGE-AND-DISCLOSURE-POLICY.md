# Dashboard coverage, closure and disclosure policy

Recorded 2026-10-06 (closeout pass). Governs `/dashboard-update` and the scheduled refresh.
The dashboard is a renderer: it reports what canonical records say, it never decides them.

## 1. Closure accounting

A finding is in exactly one of four states. Each has one home in the data model:

| State | Meaning | Where it is counted |
|---|---|---|
| **Open** | No fix is implemented anywhere. | `counts`, `openCounts`, `open[]`, `publishedCounts` (all strictly open) |
| **Implemented, awaiting integration** | A fix exists but is not on the canonical branch. | `awaitingIntegrationCounts` only |
| **Verified closed** | The fix is verified on the canonical branch, in the relevant report/cycle. | `resolvedCounts`, `closedLastRun` |
| **Unknown** | Status could not be determined. | `unknownCounts`, kept separate from all of the above |

- **Canonical branch** = the repo's designated branch: its default branch at the remote, or the
  local default branch for remote-less repos. Branch-only, worktree-only or committed-but-unmerged
  fixes are never counted in `resolvedCounts` or `closedLastRun`.
- **"implemented, awaiting integration"** is the exact label for the second state. Those findings
  are unresolved: they are not in `open[]`, not in `resolvedCounts`, not in `closedLastRun`. They
  are recorded as the aggregate field `awaitingIntegrationCounts`, a severity histogram shaped
  like `rawCounts`.
- **Arithmetic invariant** for the report a card's `rawCounts` describes:
  `rawCounts = openCounts + awaitingIntegrationCounts + resolvedCounts + unknownCounts`.
  `counts` equals `openCounts`, and `counts` must equal the composition of `open[]`.
- **A fix count is not a finding count.** Never equate commits or fixes with findings; one commit
  can close several findings and one finding can need several commits.
- Never merge or push a branch for the purpose of improving a dashboard count.
- Applies to: every audit ingest. Worked examples (2026-10-06):
  - **ai-brain-data**: 44 findings = 2 open + 42 implemented-awaiting-integration + 0 verified-closed.
  - **aiserver**, 2026-09-13 report: 9 findings = 4 open + 5 verified-closed. A separate
    2026-10-05 routing review has 8 findings, all implemented-awaiting-integration (own histogram;
    it is a different report, so it is not added into the 9).
- **Contract note for `reconcile_audit.py`.** Its `resolvedCounts` docstring ("closed by valid,
  implementation-backed closure evidence") must be read as **verified closed on the canonical
  branch**. Implementation-backed evidence on a non-canonical branch does not qualify.

## 2. Public-disclosure rules (the board is public)

- **Retain** harmless public configuration identifiers that are documented product surface
  (for example the `BIMPOSSIBLE_*` / `INFERENCE_*` configuration-name families) when they help a
  reader understand a card.
- **Redact** anything that gives operational leverage: hostnames, IPs, ports of internal services,
  secret/credential/token names, key material, absolute paths into client or evidence data,
  filenames of unfixed exploitable findings, client or consultant names (including anything read
  from Revit-Ops).
- Unfixed exploitable findings are scoped to impact class in the public `title`; detail lives in
  the gitignored `Dashboard/local/`.
- **Impact-class wording is the public standard, not implementation topology.** Say what class of
  harm a finding has (for example "unauthenticated access to an internal service"), never how the
  system is wired: no ports, bridge or firewall rules, admin pipes, or unfixed-exploit detail.
  Private detail lives in the gitignored `Dashboard/local/` and in the closeout report.
- When unsure whether an identifier is "harmless config" or "operational detail", redact.

### How privacy is enforced

- `local/` is listed in `.gitignore`, so its contents are never committed. Every pipeline that
  commits dashboard output stages explicit paths (`Refresh-Dashboard.ps1`, `Refresh-GitStaging.ps1`,
  `setup-github.ps1`, and the two workflows), never a blanket `git add`.
- The only deploy path is `.github/workflows/deploy.yml`: it runs `actions/checkout@v4` on a CI
  runner and then `pages deploy .` of that checkout, so only tracked files exist to upload.
  Ignored files such as `local/` are never uploaded. `push-dashboard.ps1` only delegates to
  `Refresh-Dashboard.ps1`, which pushes `main` and does not deploy.
- Consequence: never run a manual `wrangler pages deploy` from a working tree. A local working tree
  contains `local/`, and that path would bypass this guarantee.

## 3. Discovery dispositions (top-level folders found during the 2026-10-06 sweep)

Excluded from cards, with reasons. Re-card only if the stated condition changes.

| Folder | Disposition | Reason |
|---|---|---|
| AI-Models Local | excluded | Model blob/manifest store plus a practice folder; infrastructure data, no git, idle since 2026-09-06. |
| BIMpossible-Prompts | excluded | Static reference markdown, no state, idle since 2026-05-23. |
| BIMpossible-RuntimeQuarantine | excluded | Dated data-parking folder (2026-09-24); no code. |
| Brother | excluded | Third-party personal scaffold, idle since 2026-08-06. Re-card only if work resumes. |
| Claude-Tools-recovery | excluded | Parked git bundles of Claude-Tools; covered by the claude-tools card. |
| Coding Data, _support | excluded | Empty folders. |
| LinkPDF-Fixtures | excluded | Add-Ins test fixtures; covered by the addins card. |
| w4a | excluded | Finished scratch/verification logs; transient evidence. |
| **Evidence-Archive** | **classified: Evidence Compiler data, not a product** | Remote-less data stores (EC-MEASURE, EC-CAPTURE) for the Evidence Compiler measurement program; tracked via the evidence-compiler card, never its own card. |

## 4. Paused projects

- **bimpossible-ocr (Revit-OCR evaluation): intentionally excluded, paused pending owner
  governance sign-off.** No card. No git, no remote, no changes since 2026-08-24.
- The disposition and the reactivation conditions are recorded privately, not on this public
  board. Owner sign-off lifts the hold; the dashboard then adds a card.

## 5. Ownership of derived signals

- `git.latestCommit` on single-repo cards: written by `sync_activity.py` (`sync_latest_commit`).
- Phase `pct` on the bimpossible card: owned by the Workspace phase ledger's PCT block when the
  block is present (`sync_ledgers.py`); otherwise the dashboard's own `pct` in `data.js` is
  preserved. A hand-edit of `data.js` `pct` for a listed phase is overwritten on the next refresh.
  Contract, supported ids and failure behaviour: `REFRESH-SPEC.md`, "Phase pct ownership".
- The Codebase "trend metrics last recorded" reminder reflects `graph-metrics.js` (appended only by
  the manual `Update-Graph.ps1`). It is **not** a graph-rebuild signal; rebuild health is
  `graphify-health.js` and the weekly refresh.
