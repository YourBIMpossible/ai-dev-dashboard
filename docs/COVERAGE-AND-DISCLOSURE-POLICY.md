# Dashboard coverage, closure and disclosure policy

Recorded 2026-10-06 (closeout pass). Governs `/dashboard-update` and the scheduled refresh.
The dashboard is a renderer: it reports what canonical records say, it never decides them.

## 1. Closure accounting

- **Closed = verified on the repo's designated canonical branch** (its default branch at the
  remote, or the local default branch for remote-less repos). Nothing else is counted as closed.
- A fix that exists only on a feature/worktree branch, or is committed but unmerged, is shown as
  **"implemented, awaiting integration"** and stays in `open[]`; it is not added to `closedLastRun`.
- Never merge or push a branch for the purpose of improving a dashboard count.
- `counts` must equal the composition of `open[]`; `closedLastRun` counts closures new to the cycle.
- Applies to: ai-brain-data fix batch, aiserver routing fixes, and any future audit ingest.

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
- When unsure whether an identifier is "harmless config" or "operational detail", redact.

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

- **bimpossible-ocr (Revit-OCR evaluation): intentionally excluded, paused since 2026-08-24.**
  No card. Reason: owner put the effort on hold after a governance review hard-stopped it on
  client-data handling; no git, no remote, no changes since.
- **Reactivation condition (all required):** (1) hardcoded input paths in all five scripts repointed
  away from the external client-drawing folder; (2) a written basis, or a synthetic/de-identified
  substitute, for using real client documents as evaluation fixtures; (3) `trust_remote_code` model
  load vendored+reviewed or run sandboxed/network-isolated; (4) repo confirmed to have no remote
  (or a private one with no client-data push history); (5) dependency lockfile for the pinned stack.
  Owner sign-off lifts the hold; the dashboard then adds a card (draft retained in
  `research/_deferred-new-bimpossible-ocr.json`).

## 5. Ownership of derived signals

- `git.latestCommit` on single-repo cards: written by `sync_activity.py` (`sync_latest_commit`).
- The Codebase "trend metrics last recorded" reminder reflects `graph-metrics.js` (appended only by
  the manual `Update-Graph.ps1`). It is **not** a graph-rebuild signal; rebuild health is
  `graphify-health.js` and the weekly refresh.
