// F:\AI-Dev project dashboard data (schema v4 - tasks added to phases)
// AUTO (daily 06:00 refresh from the Dashboard-auto clone): phases+waves from the BIMpossible
//   ledgers (sync_ledgers.py, no LLM); activity+lastActivity from git (sync_activity.py).
// MANUAL / on-demand: prose fields (phase, focus, oneLiner, recent, nextActions, branch, audit).
//   The GitHub-Models prose bot has no trigger on the code repos, so prose only moves on an
//   on-demand "refresh dashboard" pass and goes stale between passes. See REFRESH-SPEC.md.
window.DASHBOARD_DATA = {
  generated: "2026-08-31",
  generatedBy: "scheduled refresh",
  activitySince: "2026-08-18",
  projects: [
    /* PROJECT:bimpossible:START */
    {
      id: "bimpossible",
      name: "BIMpossible Platform",
      icon: "layers",
      oneLiner: "Discipline-neutral BIM data platform above Autodesk's tools (reads ACC, custom interface, write-back later).",
      status: "active",
      phase: "main synced with origin (tip ~#505; HEAD 9682546b, #503). The 56-finding cross-repo audit estate is CLOSED (56->0, 2026-08-26) -- no open Critical or live-exploitable High. Active fronts since: Phase 17 -- App Integrations moved from planned to first code, with the Integration Control Plane foundation landed (#500) and its registry status values constrained (#503, P17-0.1); Slack/Teams (17a/17b) remain built-dark, flags off. Phase 15d shipped its first local Revit write slice -- before/after approval, typed result, revert (#495) -- then unblocked writes past row 500 and on unset parameters (#498); these are the product's first AI-assisted local Revit writes through the pane, supervised and gated. Phase 3.8 slice-2 reader gating landed (#499, owner-only is_draft reads), closing the enforcement gap the 08-27 closeout ledger flagged. Also live: P6 Client-Mgmt F (multi-firm tenancy, verified by a 2026-08-30 synthetic two-firm smoke), the firm-alias backend, RESOLVE-BIND-1 durable model_guid->project binding (#496), and a run of PDP performance hardening (#502/#504/#505).",
      focus: "Audit estate CLOSED (56->0, 2026-08-26) -- 0 open, no Critical or live-exploitable High; that work is done. Current active development is Phase 17.0 (Integration Control Plane foundation, #500/#503) and Phase 15d's first supervised local Revit writes through the pane (#495: before/after approval + revert; #498: writes past row 500 / unset params). P6 Client-Mgmt F went live on a 2026-08-30 two-firm smoke; P3.8 slice-2 owner-only draft reads shipped (#499). Remaining forward work is largely owner-gated -- see nextActions.",
      progress: {
        label: "Program phases",
        phases: [
          {
            id: "P0-2",
            bucket: "active",
            weight: 1,
            name: "P0-2 Foundation — Env Setup / Skeleton / Auth",
            pct: 100,
            note: "CLOSED — Original BuildChecklist axis",
            tasks: [
              { label: "Core auth + user model", status: "done" },
              { label: "Database schema + migrations", status: "done" },
              { label: "API gateway + routing", status: "done" },
              { label: "Revit data bridge (ACC read)", status: "done" },
              { label: "Docker/compose dev setup", status: "done" }
            ]
          },
          {
            id: "P3",
            bucket: "active",
            weight: 1,
            name: "P3 Read-Only Data Dashboard (+ 3.x family)",
            pct: 93,
            note: "ACTIVE — Permanent, never-closing data substrate. Phase 3.10 Cross-Model Joins: IN PROGRESS — 3.10a FUNCTIONALLY PROVEN 2026-07-15 (warm pipeline ran for real: 1,239 footprints + 14,873 origins from 0; join resolves real rooms through the real endpoint; AC-1/2/3 ALL PASS after the p50 perf fix, 215→18ms; flags still OFF — only the owner go-live flip remains, see §sub-phase notes); 3.10b Furniture slice SHIPPED (`4bb6497`); Doors design validated + now unblocked, not built; Ducts/Pipes awaits a product decision. Phase 3.8: minimal wedge DECIDED 2026-07-15, slice 1 shipped + prod-migrated (is_draft = membership-scoped per owner); slices 2-3 pending — see §sub-phase notes. Phase 3.12 (RATIFIED 2026-08-18): tenancy call for multi-firm project sharing = extend row-level isolation — keep per-row `firm_id` scoping and add a project-membership join for shared projects; no move to a separate ACL store. Closes the `BIMpossible_OpenQuestions.md` #4 revisit. The \"full onboarding documentation\" half of #5 remains open (see Phase 8 runbook item). Unblocks Client-Mgmt F (Phase 6).",
            tasks: [
              { label: "Electrical schedules - 7 Tier-1 shipped", status: "done", note: "All 7 deployed 06-05" },
              { label: "Schedule quick-access bar (auto-width, drag-resize, persist)", status: "done", note: "06-07" },
              { label: "Federated viewer Wave 1", status: "done", note: "06-05" },
              { label: "3.9 architecture tail (Wave 7)", status: "done", note: "06-12 — calc-field 5k gate, share-by-link, stale-cache banner; all 3 smokes PASSED" },
              { label: "Wave 5 XLSX export", status: "done", note: "PR #109 06-11 — GET /data/elements/xlsx + Sheet button; 50k row cap" },
              { label: "Wave 4.9 Classification Enrichment (OmniClass + CSI)", status: "done", note: "f207d41 06-12 — 17 schedule endpoints; ScheduleClassificationBar + ✦ badge; live smoke owed at prod deploy" },
              { label: "Wave 4.10 Spec Draft Generation", status: "done", note: "3cf91a0 06-12 — spec library (32 JSONs, 277 tests); rule engine + Markdown/Word/PDF renderers + SpecDraftLauncher/Modal; live smoke owed at prod deploy" },
              { label: "CSP hardened (viewer fonts 55→0 violations)", status: "done", note: "PR #79 06-10" },
              { label: "Waves 10/11/12/13/14/17 discipline-schedule shapers (Elec/Mech/Plumbing/Structural/FP/ICT)", status: "done", note: "All 6 waves: code shipped + live smokes PASSED 06-11/12 — 169 Air Terminals, 1510 Plumbing fixtures, Framing/Foundation/Column, 268 FP pendents, 180 ICT devices (TIA-606)" },
              { label: "Wave 16 Interiors schedule bar config", status: "done", note: "PR #114; 23/23 vitest green; dedicated Ceilings/Flooring shapers still pending; live smoke owed" },
              { label: "Wave 20 billing cost view + multi-provider BYO keys", status: "done", note: "PR #116; admin smokes PASSED; cost-view UI smoke owed" },
              { label: "Wave 21 click-to-sort all schedule tables", status: "done", note: "PR #115; 8 tests green" },
              { label: "Remaining discipline waves: 15 Civil / 18 Landscape / 19 Commissioning", status: "pending", note: "Scope-lock + BuildSpec drafts written 06-13; not built" }
            ]
          },
          {
            id: "P4",
            bucket: "active",
            weight: 1,
            name: "P4 Embedded Intelligent Assistant (4a/4b)",
            pct: 96,
            note: "CLOSED — 4a read-only + 4b HITL action assistant; live-smoked 2026-07-01 (4a: EL+STR, 4b: confirm+cancel verified, audit rows ok+denied/cancelled)",
            tasks: [
              { label: "B2 rate-limit hardening", status: "done" },
              { label: "B2 byte-cap + deadline handling", status: "done" },
              { label: "B2 write-allowlist + injection guard", status: "done" },
              { label: "Assistant markdown + pill chrome", status: "done", note: "06-07" },
              { label: "Wave 4.8 close-out: D1-D7 ratification", status: "done", note: "Ratified 06-10" },
              { label: "Phase 4b action-enabled assistant (HITL)", status: "done", note: "06-11/12 — HITL approval SSE + /assistant/resume; smoke PASSED" },
              { label: "Phase 4c conversation persistence + in-panel history", status: "done", note: "06-28 PR #153" },
              { label: "Phase 4c stop-and-edit", status: "done", note: "06-28 PR #154" },
              { label: "Phase 4d project-context grounding (auto-derived briefing)", status: "done", note: "06-28 PR #155 — runtime-wired project context into chat" },
              { label: "Schedule-push: staleness cadence, classifier rules, SPF ship location", status: "pending" }
            ]
          },
          {
            id: "P5",
            bucket: "held",
            weight: 1,
            name: "P5 Views / Sheets / 3D / Workspace Coherence",
            pct: 15,
            note: "ON HOLD — Bonus, not a need (owner 2026-06-24). Re-entry re-scope ratified 2026-08-20 — Option 1 (re-scope in place, no renumbering); full plan: `design-docs/2026-08-20__Phase5_ReEntry_StrategicRemap_Memo.md`. 5.1 delivered baseline: ViewPreset persistence is live and unconditional; remaining Phase 5 work is naming/UX separation from Phase 3.5 data-filter \"saved views.\" 5.2 delivered baseline: PDF-first sheet viewing and BIMpossible sheet annotations are live and unconditional; remaining scope is ACC-context integration, not a parallel document-control subsystem. 5.3/5.4 unconfirmed pending re-scan. Wave 9 (Forma) only affects how 5.1/5.3/5.5 viewer slices are hosted at resume. 5.5 Navisworks planned. 5.6 Visual Model Graph — read-only node-link view (select element → trace/load-tree highlight); frontend-only on the live `get_relationships_graph` endpoint; PARKED, ready-to-build, zero remaining technical dependency (sequencing-only gate — see re-entry memo §7C-1) (see `design-docs/visual-model-graph_design-doc_2026-06-28.md`). 5.7 (proposed, unratified) Element Visual Preview — family-in-context PNG on element select; read-only Viewer-screenshot slice, no DA4R/Q6 dep; reuses existing ACC SVF/SVF2 — no APS translation jobs or new DA4R/server-rendering compute; 2 feasibility spikes gate build; brief: `design-docs/2026-08-08__Phase5_ElementVisualPreview_DesignBrief.md` (2026-08-08). 5.2 re-scan (2026-08-18): reuse ACC Build's Sheets/Transmittals APIs, don't rebuild version control — Transmittals reachability CONFIRMED live (200, proven under BIMpossible's APS app reg); Sheets API blocked only by Build-entitlement on the tested project (403, not an app-reg gap); client-hub Build-entitlement still open. `design-docs/2026-08-18__Phase5_ExternalToolingResearch_SheetsAndRevitAddins.md`",
            tasks: [
              { label: "5.1/5.2 early wiring: ViewPresetSidebar + MarkupsList", status: "done", note: "Shipped 39c326b" },
              { label: "5.2 PDF-first sheet rendering decision locked", status: "done", note: "06-04 — PDF as canonical artifact; PyMuPDF/AGPL removed; SVF2/APS Viewer deferred to later wave" },
              { label: "Federated viewer Wave 1 smoke (GA-H12)", status: "done" },
              { label: "Phase 5 re-scan (required before full activation)", status: "pending", note: "Re-evaluate all 4 slices against product state; Wave 9 / Forma decision gates 5.1 + 5.3 scope" },
              { label: "5.1 View Management (view presets, multi-view layout, state persistence)", status: "pending" },
              { label: "5.2 Sheets & Document Assembly (markup, RFI flagging, permit-set annotation, PDF compose)", status: "pending" },
              { label: "5.3 3D Navigation (viewport controls, camera presets, clipping planes)", status: "pending" },
              { label: "5.4 Workspace Coherence (unified sidebar/toolbar, persistent layout, quick switcher)", status: "pending" }
            ]
          },
          {
            id: "P6",
            bucket: "active",
            weight: 1,
            name: "P6 Platform / Billing + Client-Management",
            pct: 88,
            note: "PARTIAL — original scope shipped + live; Client-Mgmt E and F open (reopened 2026-07-27, PLACED not ratified) — Access tiers, usage metering, BYO keys; Client-Mgmt A/B/C/D; shipped via Wave 20 / PR #112; live-smoked 2026-07-01 (usage_logger wired e97fa1f, admin dashboard: 241 queries / $4.04 MTD / 58.3k output tokens confirmed). Status corrected CLOSED → PARTIAL 2026-08-17 — the original-scope work is closed, but the note has described two real unbuilt sub-items (E, F) since 2026-07-27, so the CLOSED column was misleading a status-only reader. New 2026-07-27, following the existing Client-Mgmt A/B/C/D lettered pattern (letters avoid the integer-collision risk the Canonical Guide flags for this phase): Client-Mgmt E — Self-serve onboarding (absorbs watchlist `FG-G4`) — provision a BIMpossible org/tenant for a firm BIMpossible has never seen, without a hand-seeded DB row, closing the same class of gap PR #227 closed for known firms. Client-Mgmt F — Multi-firm / project-level tenancy (absorbs the account-model half of watchlist `FG-C8`) — a project can have participants from more than one BIMpossible org, each with its own billing/BYOK identity, with shared-project visibility scoped by whoever administers the project; likely a small extension of the existing `org_id`-scoped, three-path billing schema (2026-06-23 inference-billing research) rather than new schema. Depends on Phase 3's 3.12 tenancy re-decision (RATIFIED 2026-08-18 — extend row-level isolation; F is now unblocked on this axis). ⚠️ Re-check F's remaining scope against live tenancy work before writing a build plan (2026-08-17): the firm→hub binding + project-enrollment + hub-isolation infrastructure shipped and went live 2026-08-14/16 (`firm_allowed_hubs`, `FirmAllowedProject`, `aec/hub_tenancy.py`; retired the old `ALLOWED_PROJECT_IDS` rail). That is real, live, and adjacent — but it does NOT deliver a large chunk of F. Verified against the shipped schema: it scopes one firm's access into one hub's projects (`access_scope` all/selected + enrollment rows), i.e. \"can Firm X reach Project Y.\" Client-Mgmt F is a different axis — multiple firms as differently-scoped participants on the same project with admin-scoped visibility (\"can Firms X and Z both have participants on Project Y\"). Nothing shipped associates more than one firm with a single project. So the tenancy shipment does not reduce F's remaining scope; still re-read F against it before speccing, but don't assume it's mostly done. Phase 13's proposed cross-firm-approval T5 explicitly depends on F and is itself still unbuilt. The hub-cutover / tenancy test-gate content formerly filed under \"Phase 15c\" now lives here (moved 2026-08-17) — see §Phase 6 — hub-cutover / tenancy test gate below.",
            tasks: [
              { label: "Wave 6 thin permissions (SEC-M4 + identity coverage)", status: "done", note: "PR #110 06-11" },
              { label: "Phase 6 access tiers + billing guardrails", status: "done", note: "PR #112 06-12; client_keys Fernet-encrypted" },
              { label: "usage_logger.py wired into assistant SSE path", status: "done", note: "06-12 — verified already-wired; UsageEvent row per model call (tokens/tools/latency), non-blocking" },
              { label: "Client-Mgmt Phase A backend (firms, memberships, DB-backed cost, alerts, enrichment, admin CRUD)", status: "done", note: "06-12 e749918 — 8 tables/4 migrations; /account membership-gated; cost.py raises on unmatched model" },
              { label: "Admin Portal v2 + My Account dashboards", status: "done", note: "06-12/13 (0e0242f) — alert bar/KPI strip/firm list/triage/onboard wizard; My Account budget+BYO-key; next.config proxy fix" },
              { label: "Tests for /account/budget + /account/api-key + admin-portal UI", status: "active", note: "Partial — backend /account tests done & green (uncommitted branch); FE admin/account UI tests missing: AdminShell, FirmEditDrawer, ConfirmDialog, signin, AdminSessionProvider, My Account." },
              { label: "True-prod deploy: upgrade to head s1t2u3v4w5x6 via #131 decoupled path", status: "pending", note: "Unblocked 06-23 — #131 migration-decouple MERGED to main (code tip 0b3a680). Decoupled path now live: one-shot backend-migrate service applies migrations, backend then verifies head via ensure_schema_ready() (db/migrate.py). Remaining: run the true-prod deploy itself per Runbook 2026-06-12 true-prod-deploy. Old one-shot Phase-A-only path still deprecated at this head." }
            ]
          },
          {
            id: "P7",
            bucket: "active",
            weight: 1,
            name: "P7 Model Write-back — DA4R + Revit Link (two engines)",
            pct: 68,
            note: "LIVE — supervised cutover PASS 2026-08-25 (audit row id=28, decision-log 2026-08-25); flag ON in .env — Co-equal engines, ship together. Status scope note (2026-08-25): LIVE = the Revit Link remote-sync engine; DA4R remains the inert scaffold below. Revit Link sync re-enable (step-2): CODE-COMPLETE + MERGED both repos 2026-07-22, flag OFF ([#187](https://github.com/YourBIMpossible/BIMpossible/pull/187) `2936c32f` + [AddIns #11](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/11) `be4d6a8f`, lockstep: backend confirm→mint→single-use-token path — `POST /revit/sync_token` + `POST /revit/sync_with_central_confirmed` behind default-OFF `BIMPOSSIBLE_REVIT_LINK_SYNC_ENABLED`; C# force/CONFIRMATION_REQUIRED guard removed, local ribbon TaskDialog kept; decision-log `2026-07-16__phase7-revit-link-sync-reenable-step2.md`). Prod byte-identical until the owner's supervised first sync (test model: flag on → modal → verify synced+audited+token-no-replay → flag off → log GitHubWorkflow §11). DA4R correction 2026-07-16 (\"reserved name, NO code\") superseded 2026-07-21: an INERT scaffold now exists (#186: unregistered `da4r_adapter.py` satisfying the WriteEngine Protocol + `da4r_tokens.py` two-token module + fourth default-off flag `BIMPOSSIBLE_DA4R_ENABLED`; G2 spike hand-run PR [#191](https://github.com/YourBIMpossible/BIMpossible/pull/191) MERGED 2026-07-23) — unreachable, NOT registered in `get_engine()`, still gated on owner G1/G2. The one-write-spine contract now exists (`revit_link/engines.py` `29e96da`: WriteEngine Protocol + engine enum + gated seam; da4r plugs into THIS when built — see `design-docs/write-spine-convergence_target_2026-07-15.md`). Owner gates: (1) add BIMpossible-AddIns repo, (2) \"go\" to re-enable sync — still ON HOLD by owner-gate policy, independent of the audit-gate item below. See proposal 2026-06-23 (§2 DoD) for exact acceptance criteria. Audit gate (hard — from `2026-06-21__AuditAndHistory_Pattern.md`): ✅ SATISFIED 2026-07-02 (`0055dd1`) — `edit_log` + `revit_link_request_log` migrations applied and the adapter writes to both on every call (write-ahead as of the 2026-07-10 WIZ-7 fix); `GET /admin/audit/edits` endpoint + XLSX export live; `query_edit_log` assistant tool registered (firm-scoped as of AST-1, `376e180`). This row described the gate as still-pending through 2026-07-08's audit — stale, fixed today (DOC-2). Runtime note (2026-08-23, no action required today): Autodesk moves APS's production Automation Engine for Revit to Revit 2026.5 / .NET 10 on 2026-09-21 ([APS blog](https://aps.autodesk.com/blog/revit-automation-engine-upgrading-revit-20265-and-net-10-september-21-2026)). No BIMpossible AppBundle exists yet (DA4R is still the inert scaffold above), so nothing needs validating before that date — but whoever resumes G2/G4 should target engine `Autodesk.Revit+2026.5` and vet third-party .NET deps against .NET 10 first. Full note: `design-docs/DA4R_APS_Strategy_ExecutionPlan_2026-07-16.md` gates table.",
            evidenceUpdatedAt: "2026-08-30",
            scoreBasis: "Revit Link write-back engine merged and flag-enabled: BIMpossible PRs #186 (sync-token + inert DA4R scaffold), #187 (SyncWithCentral re-enable behind confirmation + one-time token), #191 (G2 spike), and AddIns #11 all merged to main; BIMPOSSIBLE_REVIT_LINK_SYNC_ENABLED=1 in backend .env; WriteEngine seam (29e96da) and write-back audit-gate infra (0055dd1) on main. Supervised prod cutover recorded 2026-08-25 (ledger + phase-completion-reconciliation_2026-08-30.md). DA4R half legitimately inert: get_engine(DA4R) raises NotImplementedError (revit_link/engines.py) behind default-off BIMPOSSIBLE_DA4R_ENABLED. Sub-100 reflects remaining scope: DA4R cloud engine (owner gates G1/G2), multi-worker token/Redis gate, live two-user exercise.",
            tasks: [
              { label: "write_instance_parameter endpoint live (single-user, flag=ON in prod)", status: "done", note: "revit_link/native_adapter.py lines 261-412; relay live; BIMPOSSIBLE_REVIT_LINK_ENABLED=1 in pilot" },
              { label: "Frontend UX: useRevitLink hook + EditParameterDialog + SyncConflictModal", status: "done", note: "Shipped in prior build" },
              { label: "Relay transport hardened (SEC-L2/L5/L8; frame guard + length-prefix)", status: "done", note: "9f6f55c 06-23 — length-prefixed frame guard (MAX_FRAME_BYTES, signed-int32) mirroring C# PipeServer" },
              { label: "WriteEngine contract (both engines register into one law, not beside it)", status: "done", note: "29e96da 07-16 — EngineKind enum, get_engine() factory, gated execute_parameter_write() seam" },
              { label: "Sync-token primitive + DA4R engine scaffold", status: "active", note: "PR #186 (DRAFT, unmerged) — sync_token.py + Da4rAdapter (satisfies the Protocol, NOT registered in get_engine()); 43 tests, backend CI green" },
              { label: "Re-enable sync_with_central behind confirmation + one-time token", status: "active", note: "PR #187 (DRAFT, stacked on #186) — mint/confirm endpoints + SyncConfirmModal; flag OFF, old endpoint still 501 forever; 21 more tests, 2041 pure-lane pass. Owed: frontend image rebuild, owner .env (SYNC_TOKEN_SECRET), a supervised first run" },
              { label: "Resolve multi-user tripwire (PipeServer.maxNumberOfServerInstances=1 + single shared RELAY_SECRET)", status: "pending", note: "PR #187 flags this as a multi-worker gate: move the consumed-jti set to Redis before any WEB_CONCURRENCY>1 flip" },
              { label: "DA4R (cloud) execution", status: "blocked", note: "Gates G1/G2 still owner steps — Automation API entitlement + the SSA↔cloud-open spike; adapter exists but is inert by construction" },
              { label: "Exercise against a real two-user scenario", status: "pending", note: "Gate before Phase 9: write-back shipped + exercised; sync re-enable UX approved" }
            ]
          },
          {
            id: "P8",
            bucket: "active",
            weight: 1,
            name: "P8 Project Setup Wizard",
            pct: 85,
            note: "LIVE — deployed on main 2026-07-22 — The product's FIRST live write to Autodesk — PROVEN 2026-07-22: a real ACC project was created + cloned from a firm project-template (folders + settings + central Revit model) through the Forma-native create-from-template path (`construction/admin/v1/accounts/{id}/projects`, 202→poll-active). UI: building-type dropdown (Autodesk's list), ACC project-template picker by NAME. 2026-07-22 simplification ([#207](https://github.com/YourBIMpossible/BIMpossible/pull/207), squash-merged): the redundant local-RVT *upload* step + its Model-template/Model-destination pickers were DROPPED once the template clone was confirmed to carry the central model — that upload was the only thing marking otherwise-successful runs `failed` (broken signeds3upload). A provision is now exactly create-from-template → reports clean `complete`. (Superseded PR #204, folder-picker fix, closed — its endpoint was deleted here.) Model-rename to `<number> - <name>` is HELD on an Autodesk C4R app-whitelist grant (the template's central model is a Collaboration-for-Revit cloud model; `PATCH items` → 403 \"client_id not whitelisted for schema items:autodesk.bim360:C4RModel\"); request doc `02_Reference/Phase8_C4R_API_Access_Request.md`; deliberately OUT of the critical path (founder 2026-07-22). Audit gate: ✅ `provisioning_jobs_status_history` present (`0055dd1`). Both founder-driven closeout items done 2026-07-23: (1) supervised run witnessed `complete` — `provisioning_jobs` row `46aff137…`, clean `planning → provisioning → complete` transition, zero error, verified directly against the prod DB; (2) the ZZZ / Testy Testington / Chrome Test / SMOKE 2026-07-23 test projects are archived in the ACC web UI. ~~Phase 8 has nothing outstanding.~~ Correction 2026-07-27 (PLACED, not ratified): that line no longer holds — two real open items, surfaced while scoping multi-firm distribution. (1) Hub-activation onboarding runbook — `BIMpossible_OpenQuestions.md` #5 names the actual steps a new external firm/consultant needs today (activate AEC Data Model in Forma settings; get the hub's Account Admin to add BIMpossible's APS client ID under ACC Custom Integrations; upload a new version of each model, since activation is forward-only; note C4R files aren't supported, regular Forma Docs uploads only) and none of it is written up for a non-technical hub admin to follow — this is the literal mechanism for \"the hub owner grants access to anyone,\" so it needs to be a real documented (ideally in-product) flow, not tribal knowledge. (2) APS app publishing/production-review cap — unverified. Open question: does BIMpossible's single APS app registration scale to any number of hubs/companies once each hub's Account Admin adds it via Custom Integrations, or does Autodesk impose a review/publishing-stage cap on authorized end users below \"production\" app status? Directly determines whether the multi-firm distribution model works at scale as-is; not yet checked against the APS console/docs or ADN support.",
            evidenceUpdatedAt: "2026-08-30",
            scoreBasis: "Create-from-template provisioning merged and flag-enabled: BIMpossible PRs #207 (drop redundant local-RVT upload; provision reports clean 'complete') and #189 (provision-time consent + one-time write token) merged to main; superseded #204 closed; BIMPOSSIBLE_WIZARD_ENABLED=1 in backend .env; provisioning audit infra (0055dd1) on main. First live Autodesk write recorded prod-proven 2026-07-22/23 (phase-completion-reconciliation_2026-08-30.md). Sub-100 reflects remaining scope, all off critical path per owner: C4R model-rename blocked on Autodesk items:C4RModel whitelist grant (403), external-hub onboarding runbook, APS multi-hub publishing-cap question, template baseline and broader supervised runs.",
            tasks: [
              { label: "No-write planning core (planner + reverse-order rollback walker + default-closed gate)", status: "done", note: "06-14 — pure stdlib, not wired into main.py; 18 tests green" },
              { label: "ProvisioningJob DB model + Alembic migration (t2u3v4w5x6y7)", status: "done", note: "06-14 — verified via isolated local-CI lane; alembic check clean" },
              { label: "Router: POST /wizard/plan + GET /wizard/templates (planning only, flag-gated)", status: "done", note: "06-14 — behind BIMPOSSIBLE_WIZARD_ENABLED (off by default); 23 wizard tests green" },
              { label: "Frontend /wizard (Details → Template → Review → Provision; provision step inert)", status: "done", note: "06-14 — local CI green; /wizard route 3.24kB; honest 'dry run, nothing created' contract" },
              { label: "Provision-time elevated-consent write token (spec §9)", status: "active", note: "PR #189 (DRAFT, unmerged) — new /wizard/provision/{job_id}/consent redirects through the existing APS_CALLBACK_URL; wizard/consent.py holds pending-state + one-time-use token stores. 15 new tests (10 pure + 5 integration), 118 passed locally; DB-lane needs CI's Postgres to confirm" },
              { label: "Template baseline (firm RVT template + real view-template / sheet list)", status: "pending", note: "PR #189 notes upload_file still errors on the generic baseline until a real source_path exists" },
              { label: "Supervised first live run against real Autodesk creds", status: "pending", note: "Owed once .env (ALLOWED_PROVISIONING_HUBS, PROJECT_WIZARD_ENABLED) is set and a real template exists" }
            ]
          },
          {
            id: "P9",
            bucket: "active",
            weight: 1,
            name: "P9 Product Data Ingestion",
            pct: 10,
            note: "ACTIVE — Supersedes Phase 3.X Manufacturer Data Ingestion. Reopened ACTIVE 2026-08-17 (owner) — not a pivot, a scope growth. Original scope (manufacturer cutsheet extraction, frozen at parser 0.3.2 as the reference implementation) is retained unchanged. Scope grown 2026-08-17 to include linking extracted cutsheet data to specific things inside a project — not just extracting spec values in isolation. Open design question to settle first thing in the reopened phase (flagged, not decided): what does a cutsheet link *to* — individual elements, a category, a named deliverable, a schedule row? That answer sets the data model, so nail it down before build starts. Audit gate: all 5 new tables have `created_at`/`updated_at`; `product_type_binding_status_history` + `extraction_review_queue_status_history` tables present (per Audit & History Pattern §4). Spike status (2026-07-21): v1.0.1 label spot-check SIGNED OFF (8/8 blessed); GoldenSet v1.1 generalization corpus ASSEMBLED (30 fresh docs, 10 unregistered brands, 17-doc model population, owner-authorized web sourcing) + labeled; cold run 1 (0.3.1) NOT clean — one failure category: invalid values committed @ 0.95 for want of a validation layer (prose-as-manufacturer, accessory-codes-as-model ×3, prose-as-voltage). Owner-directed fix same day → parser 0.3.2 (single validation layer: candidate → validate → surface; invalid = forced abstain): all 4 wrong-value commits eliminated, model precision 1.00/fp 0.00, 45/45 spike tests, v1.0 golden regression numerically identical PASS. Run 2 (0.3.2) = CLEAN run #1; owner then ruled JC-1 (labels v1.1.1: COR1/COR2 → `Cooper Lighting Solutions`) + blessed JC-2…7, and run 3 (0.3.2 on v1.1.1) = CLEAN run #2 → STOP RULE SATISFIED 2026-07-21: manufacturer AND model precision 1.00 / fp 0.00 — zero wrong-value commits on a corpus where 22/30 docs are brands the registry has never seen. Raw table still FAILs f1/abstain by construction (correct abstains on unregistered brands; pre-registered reading: `_inbox/phase9-cutsheets/v1.1/GoldenSet_v1.1_labels_evidence.md`). Run 4 (confirmatory parity, zero code+label delta) established a frozen-labels clean pair (3+4), closing the run-2/3 relabel caveat. Gate reading — the raw f1/abstain FAIL is a PASS by construction (22/30 docs are unregistered brands where abstain IS truth); the criteria that decide it are stated explicitly as A1–A4 in `GoldenSet_v1.1_Plan.md` §\"What release-gate quality MEANS\": zero wrong-value commits on either field across both corpora ✓, zero false-accepts on unregistered brands (0/22) ✓, all registered brands present detected (6/6) ✓, two consecutive clean runs ✓. 🔒 SPIKE FROZEN at parser 0.3.2 (terminal state, owner decision 2026-07-21) — `extract.py` is now the reference implementation + acceptance tests, closed to further development; all future extractor work goes into the production reimplementation gated by the v1.0+v1.1 acceptance harness, with measured recall headroom enumerated as tickets P9-R1…R5 (each carrying a no-fp-regression constraint). Wiring still gated: Phase 7 + 6 owner decisions. Nothing wired into backend. New 2026-07-27 (PLACED not ratified) — a second `SourceParser` target, distinct from `PdfCutsheetParser` and from `FG-C14`'s manufacturer-parameter reader: ingest a firm's *own* design-standards/criteria documents (the `spec_library`/`spec_docs` material already sitting in the workspace) using the same stable, frozen extraction pipeline. This is the first concrete step toward the long-horizon \"design with a prompt\" direction discussed 2026-07-27 — capturing a firm's actual design decisions and standards in structured, queryable form, since that data has no retroactive substitute and only compounds if capture starts now. Not urgent, not blocking anything — genuinely small, same caveat as the frozen spike itself: production work waits on real demand.",
            tasks: [
              { label: "Build spec: full-product foundation (SourceParser + ExtractionProfile registries; 5-table schema)", status: "done", note: "06-14 — Phase9_BuildSpec.md; discipline-neutral, write-back first-class (no MVP framing)" },
              { label: "Parser spike: pdfplumber extractor w/ per-field provenance + confidence + eval harness", status: "done", note: "06-14 — isolated venv, 17 tests green; pdfplumber (MIT) chosen over PyMuPDF (AGPL)" },
              { label: "GoldenSet v1.0: collect + label 25–50 real cutsheets", status: "pending", note: "The one real blocker; labeling runbook written (delegable). SHIP-GATE: read-path may not enter backend until gates met" },
              { label: "Read-path backend build (ingest + schema + review queue + schedule enrichment)", status: "pending", note: "Behind PRODUCT_INGESTION_ENABLED (off); blocked on golden-set gates" },
              { label: "Revit type-parameter write-back on sync via RevitLink", status: "blocked", note: "Gated on Phase 7 (Revit Link write-back) live + hardened" },
              { label: "Human-review queue for low-confidence extractions", status: "pending", note: "Mandatory before any prod writeback — no auto-discard; low-confidence → review only" }
            ]
          },
          {
            id: "P10",
            bucket: "conditional",
            weight: 1,
            name: "P10 Cost Intelligence / Estimating",
            pct: 0,
            note: "CONDITIONAL — Supersedes Phase 3.X Cost & Procurement",
            tasks: [
              { label: "Phase 9 active with pricing fields in scope", status: "blocked", note: "Hard gate — P10 is blocked if Phase 9 ships spec-only without pricing" },
              { label: "Cost rollup engine (quantities × product pricing)", status: "pending" },
              { label: "Budget tracking (designed vs. actual per category/discipline)", status: "pending" },
              { label: "Submittal validation (proposed vs. specified product, spec diff)", status: "pending" },
              { label: "Discontinued/obsolete product alerts", status: "pending" },
              { label: "Design-milestone cost views (SD/DD/CD/CA)", status: "pending" }
            ]
          },
          {
            id: "P11",
            bucket: "active",
            weight: 1,
            name: "P11 Model QA & Health (incl. Coordination & Health Report)",
            pct: 88,
            note: "ACTIVE — core shipped + LIVE in prod; reopened for further development — `BIMPOSSIBLE_QA_ENABLED=1` set by owner; Q1 live smokes ALL PASS on pilot `ISI-SB-SL-EL.rvt` via prod path (health 89/100 on 47k elements, `.ids` import evaluated 10053/10053, panel renders, 401/403 leak checks hold, Q2 fixes live-verified incl. 422 on broken imported-rule override). Full log: GitHubWorkflow §11 2026-07-01. Read-only QA rules + `.ids` import; was unnumbered (\"Phase 7-ish\"). Row-merge 2026-08-17: the former standalone row 11.1 — Coordination & Health Report is folded in here. 11.1 was a packaging/reporting layer built entirely on 11's own findings (same graph substrate, same QA output — presentation, not new analysis), the only case in the ledger where such a layer was promoted to its own peer row instead of a sub-note the way Phase 3's sub-phases live. It shipped LIVE 2026-07-02 via [PR #172](https://github.com/YourBIMpossible/BIMpossible/pull/172) (squash, CI-green), deployed + live-smoked same day on `ISI-SB-SL-EL.rvt` (JSON 200/1.7s warm; .doc download 172KB, branded+dated, severity-ranked, 5 plain-language critical hubs, island+unconnected traces; unauth 401 ×4 + non-allowlisted 403 ×2 hold); both smoke findings fixed same evening (`83384da`) — report runs the resolved project rule set (panel↔report parity live: 90.2==90.2, 89.11==89.11), `model_name` threaded UI→API. Coordination & Health Report acceptance criteria AC1–AC7 now live under 11 (see §Phase 11 — Coordination & Health Report below); AC1–AC6 verified live, AND `ACTIVE` status reopens 11 for further QA/health development. ⚠️ ONE OPEN ITEM CARRIED FORWARD IN THE MERGE: AC7 (per-model report-history table) was explicitly deferred and never built — needs versioned snapshots; it is 11's outstanding work, not lost in the merge. → DELIVERED 2026-08-24: PR #476 (foundation) + PR #478 (capture-everywhere, lifecycle purge, UI states) — see the §Coordination & Health Report Status line.",
            evidenceUpdatedAt: "2026-08-30",
            scoreBasis: "Model QA and Health core merged and flag-enabled: BIMpossible PRs #142 (rules engine + model-health endpoints + panel; merge commit 9f5ebe3), #157 (NetworkX topology checks), #172 (Coordination and Health Report, absorbing former row 11.1) merged to main, plus live-fix 83384da on main; BIMPOSSIBLE_QA_ENABLED=1 in backend .env. The one carried-forward open item AC7 (per-model report-history) delivered via #476 + #478, both merged. Sub-100 reflects ACTIVE status = intentional further QA/health development (more rules, per-project overrides, disposition workflow, run persistence/trends) per the ledger roadmap.",
            tasks: [
              { label: "Rules engine (declarative Rule: applicability + requirement + IDS cardinality over a predicate library)", status: "done", note: "06-14 — backend/aec/qa/engine.py; pure, dependency-free" },
              { label: "4 starter rules (completeness / identity / correctness / classification families)", status: "done", note: "06-14 — adding a rule = a registry entry, no engine code" },
              { label: "Endpoints: GET /data/qa/rules + GET /data/qa/model-health (severity-weighted score, per-rule compliance, findings)", status: "done", note: "06-14 — 20 pure + 3 router tests; full suite green" },
              { label: "Commit + deploy the starter slice", status: "done", note: "PR #142 2026-06-23 — merged to main (9f6f55c)" },
              { label: "Frontend health panel + check_model_health assistant tool", status: "done", note: "PR #142 2026-06-23 — ModelHealth launcher/panel + client" },
              { label: "NetworkX graph-topology tools + Model Health graph checks", status: "done", note: "06-28 PR #157 — permission-flow graph + topology checks" },
              { label: "More rules (config-only), per-project overrides, .ids import, disposition workflow, run persistence/trends", status: "pending", note: "Roadmap increments from the build spec" }
            ]
          },
          {
            id: "P12",
            bucket: "placeholder",
            weight: 1,
            name: "P12 Content Authoring",
            pct: 0,
            note: "PLACEHOLDER (unbuilt) — Specs → placed model content; was Phase 6. Phase 5 removed as a gate (owner 2026-06-24)",
            tasks: [
              { label: "Phase 4 (Embedded Assistant) substantially complete", status: "done", note: "Phase 4a + 4b merged to main" },
              { label: "Phase 5.2 (Sheets & Document Assembly) shipped", status: "pending", note: "Gate — needed for permit-set / handover deliverable support" },
              { label: "Write-back runtime decision (DA4R cloud / self-hosted Revit worker / hybrid)", status: "pending" },
              { label: "Spec + scoping", status: "pending" }
            ]
          },
          {
            id: "P13",
            bucket: "active",
            weight: 1,
            name: "P13 Augmentation & Write-back Layer (incl. Write Engine — Typed Values + Type Params)",
            pct: 32,
            note: "ACTIVE — RATIFIED ACTIVE 2026-07-16 (owner). Frozen direction line: `2026-07-16 — Phase 13 (Domain A + promotion gate) → ACTIVE. Direction: A-first, no overhaul. Preserve existing discipline schedule views, Element Preview, and assistant; introduce Change Sets as the staged-change primitive; add Review + Push Center; and rewire EditParameterDialog/assistant from \"write to Revit now\" to \"stage,\" so engines and the promotion gate meet in the middle once Domain A reaches approved-state.` Build plan: `design-docs/change-set_build-plan_2026-07-16.md` (Domain A Stage 1, A-first, TDD, internal-DB only). Direction docs: `design-docs/UX_Research_ChangeLifecycle_Direction_2026-07-16.md` (owner-reviewed) + `DataInput_Interface_Gap_Analysis_2026-07-16.md`. Phase 13 = the augmentation/edit/review/promotion layer on top of the Phase 7 write-back engines (System α drives System β); Phase 7 remains the canonical engine layer — not absorbed. Build detail: `2026-06-24__Phase13_ProductizedDataEditing_Review_Pushback_PhaseDefinition_PROPOSAL.md` + package Docs 1–4. Companion WAVE-STATUS row (Wave 23) still unplaced. T0–T3 MERGED + PROD-DEPLOYED + LIVE-VERIFIED 2026-07-25 via [PR #214](https://github.com/YourBIMpossible/BIMpossible/pull/214) (`0f17003`), migration `a13cd5e70f24` applied and confirmed at head. Live evidence: T0 legacy Sync-with-Central / Check-Conflicts hidden; T1 Save wrote change set `4251f228…` status `approved`, `created_by=KAKJ5MM3JMXTNCPY`, `model_id` = the DM item URN, with a `staged_change` row (`Centered-Normal` → `Centered-Normal-SMOKE13`, `staged_old_value` captured for T4's drift check) and full `draft→in_review→approved` history (reason `self-approval`) in ONE transaction; T2 pill read \"Saved changes: 1 · 1 to apply\"; the edit affordance works with Revit closed, proving the offline path. Test data deleted afterwards (queue back to 0). T3's apply endpoint is built but NOT exercised live (`applied_by`/`applied_at` still null — that is T4's job). ⚠️ The first live Save 403'd — `require_active_membership` is strict while the rest of the app env-falls-back, and `user_firm_memberships` had been empty since launch because `link_user_on_login()` was never wired to any live path. Unblocked by hand-seeding one membership row (`KAKJ5MM3JMXTNCPY` → firm `c0757b61…`, the same static firm every existing row already uses); the permanent fix is [PR #227](https://github.com/YourBIMpossible/BIMpossible/pull/227). T4 UNPARKED same day (both ADR gates satisfied) and its ADD-IN HALF is MERGED 2026-07-25: Add-Ins [PR #38](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/38) (`cfb4cc1`) — PaneSessionProvider (single paired-session channel, ADR §3.1-E/F), pure ApplyPlanner drift logic, change-set client methods, and the \"Apply BIMpossible Changes\" ribbon command. Landed only after two independent review passes recorded on the PR: the first was BLOCKING (4 criticals — worst: change sets promoted to terminal `pushed` with nothing written to the model) and all were fixed + regression-tested (1428 tests, both TFMs); the second returned SAFE TO MERGE and its 3 pre-live-run findings (discarded write-path diagnostics; a provably-false \"re-run to catch up\" recovery instruction; a dead 409 branch documented as live) were also fixed pre-merge. Plan of record: `design-docs/2026-07-25__phase13-T4_apply-bimpossible-changes_PLAN.md`. T4 LIVE-VERIFIED 2026-07-25 (agent-driven, owner-authorized). `cfb4cc1` deployed to all 4 slots; live Apply on `SAMPLE-C-ELEC-R26.rvt` applied the happy-path edit (`S&L_FEEDER TAG 1753AL → 1753AL-T4`, read back in Revit; set → `pushed` w/ `applied_by`), and the drift re-run correctly skipped and preserved a hand-edit while promoting nothing. Both predicted failure modes reproduced exactly: the web `name` column is a pseudo-column (`LookupParameter(\"name\")` → null) so it skips forever and its set stays `approved`; the review's #1 representation-mismatch risk did NOT materialize for text shared params. Full results + verbatim dialogs: `01_BuildLog/2026-07-25__T4-live-smoke_RESULTS.md`. T4 IS COMPLETE — Task 6 shipped + live-verified 2026-07-25. `edit_log` is now written by T4 at actual-apply time per the ADR. `POST /data/change-sets/{id}/edit-log` (BIMpossible PR #229, `b19674c`) is deliberately decoupled from `/apply`: an all-skipped run makes zero `/apply` calls, so a body on `/apply` would have silently lost every skip. Identity is 100% server-derived (user/firm/model/element/parameter/new_value); the client sends only status + the live value it observed. Closed 11-value vocabulary incl. `applied_record_failed` for the model-wrote-but-record-failed divergence. Migration `b24de6f81c35` adds `edit_log.change_set_id` (nullable, indexed, no FK — audit rows must outlive their set). Client half: AddIns PR #39 (`faf9475`), `EditLogStatus.For` mapping + one advisory POST per set per run, apply decision logic untouched. Live proof on SAMPLE-C (add-in built from main+`feat/glass-alerts` so Glass was preserved): a mixed run wrote `applied` (`1004AL`→`1004AL-T6`, set → `pushed`) and `skip_drift` (observed `1753AL-HANDEDIT` vs staged `1753AL`, hand-edit preserved, set stayed `approved`) as two rows in ONE batch — the skip row proving the decoupling was necessary. All 10 legacy Phase-0 rows untouched. Backend endpoint + migration each passed their mandatory review gate; local CI green (3137 backend), add-in suite 1443. Still un-run live: the refusal tests (local `.rvt`, expired pairing) — code-gated only. New 2026-07-27 (proposed T5, next in sequence after T4/Task 6; PLACED not ratified) — cross-firm change-set approval: extend the existing draft → in_review → approved lifecycle to be role/firm-aware, so a change proposed by one firm's user (e.g. a subcontractor) can be routed to and approved by a different firm's user (e.g. the architect or GC) on the same project, instead of assuming proposer and approver share an org. This is what makes the write-back safety model (the differentiator per `FG-P5`) work across company lines, not just within one firm. Depends on Phase 6's proposed Client-Mgmt F (multi-firm tenancy) — can't route an approval to \"the architect's user\" until the data model knows which users belong to which firm on which project. New 2026-07-27 (proposed T6 — this label collides with the existing \"Task 6\" edit-log item; same number space, different thing, reconcile the name not the intent): an optional reason/criteria tag captured at change-set approval — *why* this value, not just what it changed to. Deliberately free-text/loose now, not a designed schema — the eventual shape a generative-design system needs isn't known yet, and a wrong schema costs more to unwind than a missing one. First concrete step toward the long-horizon \"design with a prompt\" direction (2026-07-27 discussion): every approved change becomes a labeled (decision, rationale) pair grounded in a real project, compounding for free as normal Phase 13 usage continues. T6 RATIFIED 2026-08-18 — build it. Deliberately loose free-text tag per the 2026-07-27 placement; the label collision with the existing \"Task 6\" edit-log item is reconciled at build time (rename the label, keep the intent). Row-merge 2026-08-17 (owner decision): the former standalone row 13.1 — Write Engine — Typed Values + Type Params is folded in here. By the P3-vs-P11 line the 11/11.1 merge applied (a single staged sub-build does not warrant its own peer row), 13.1 is Phase 13's write-engine increment, not a peer phase. Full build detail preserved verbatim in §Phase 13 — Write Engine — Typed Values + Type Params below. Open items carried forward (not lost in the merge): Increment 1 (non-string, instance-scoped) SHIPPED + live-smoked 8/8 2026-08-04; Increment 2 (type-param targeting, String-only) entry-gate CLEARED 2026-08-04 but UNBUILT; Increment 3 unbuilt; Increment 4 (ElementId) owner-ruled deliberately unimplemented; two open non-blocking owner decisions — #1 (staged-`unit` veto guard) and #3 (BuildSummary bucket-exhaustiveness) — to decide before/with Increment 2.",
            evidenceUpdatedAt: "2026-08-30",
            scoreBasis: "Domain-A staged-change spine merged and prod-deployed end-to-end: BIMpossible PRs #214 (T0-T3 Save-to-change-set; migration a13cd5e70f24), #227 (membership fix), #229 (T4 Task-6 edit-log endpoint; migration b24de6f81c35), and AddIns #38 (Apply command, cfb4cc1), #39 (edit-log client, faf9475) all merged to main; Write Engine Increment 1 via #232 + AddIns #49 merged. Ratified ACTIVE 2026-07-16 (owner, ledger). T4 live-verify recorded 2026-07-25 (01_BuildLog/2026-07-25__T4-live-smoke_RESULTS.md). Low pct reflects large remaining scope: Write Engine Increments 2-4, promotion orchestration 23D (blocked on the Phase 7 owner gate), 23E/23F, proposed T5/T6; refusal tests code-gated but un-run live.",
            tasks: [
              { label: "Owner ratification — flip PLANNED → ACTIVE on go", status: "pending", note: "Scoping decisions made 2026-07-16 (Q1 narrow-first, Q2 self-approval); the ledger status flip itself has not happened" },
              { label: "Place the companion Wave 23 row in WAVE-STATUS.md", status: "pending", note: "Drafted paste-ready 2026-06-26 §2 alongside the phase row; still unplaced" },
              { label: "23A data substrate + inspect/edit (Domain A Stage 1, narrow)", status: "active", note: "PR #186 (DRAFT, unmerged) — change_set.py + 3 ORM models + migration; the six-scope full system deferred by owner decision until usage proves it necessary" },
              { label: "23B review system", status: "active", note: "Review/approval state lives in the same Stage-1 build (approve/reject transitions, self-approval flag)" },
              { label: "23C audit retrofit — *_status_history siblings", status: "active", note: "ChangeSetStatusHistory ships as part of Stage 1; edit_log/revit_link_request_log were already migrated (wb-7)" },
              { label: "23D promotion orchestration (consumes Phase 7 engines)", status: "blocked", note: "Stage 2 — push to Revit through the existing write spine. Depends on Phase 7 write-back (ON HOLD by owner gate)" },
              { label: "23E conflict / failure / reconciliation", status: "pending" },
              { label: "23F operator UX", status: "pending" }
            ]
          },
          {
            id: "P14",
            bucket: "active",
            weight: 1,
            name: "P14 Local AI Inference — On-Device RAG + Revit Context (Optional)",
            pct: 10,
            note: "ACTIVE — Marked ACTIVE 2026-08-17 (owner) — real work relates to it; stays in place, not moved. Three pieces of prior art / built reality confirmed against the repo this date: (1) Prior art for slices 14a–c: `00_Strategy/2026-06-14__LocalHelpIntelligence_Phase1_BuildSpec.md` (+ companion `..._Conversation_Log.md`) — an R&D track whose own header reads verbatim \"R&D — active exploration, not a committed product feature,\" opened 2026-06-14, eleven days *before* the formal Phase 14 proposal (2026-06-25). It explores the same on-device retrieval + read-only Revit-context mechanism (BM25 over loose `.md` docs, `RevitContextExtractor`, WPF dockable pane) that Phase 14 later formalized as 14a–14c; the Phase 14 proposal's §2.1 already cites it. This is the origin story for that half of Phase 14. (2) BYOK / provider-key registry is further along than \"just an idea\": `backend/aec/providers.py` registers 9 providers (anthropic, openai, deepseek, gemini, ollama, perplexity, mistral, xai, openrouter), shipped + merged — though only `anthropic` is `runtime_supported=True` today; the other 8 are key-storage-only, chat routing not yet wired. 14g's \"whose account processes the call (BYOK) — already built, just needs wiring\" reading is accurate. (3) `inference_geo` residency parameter — stays \"documented but unwired\" (checked 2026-08-17): a repo-wide grep found ZERO occurrences in code (not in `frontend/app/project/[id]/model/page.tsx`, not in `backend/tests/test_key_service.py`, nowhere); it exists only as a design-doc reference in the Phase 14 proposal. A draft correction claiming it was already present in code was rejected as inaccurate. Opt-in capability track: a local LLM with retrieval-augmented generation over BIMpossible docs, plus deterministic read-only Revit context injection, running inside the Revit add-in. Owner ruling 2026-06-25: scope = the full original vision (chosen over the narrower BYO/MCP-only recommendation); the analyst's risk caveats are carried as explicit gates/risks (§8–§9 of the proposal), not dropped. Definition: `2026-06-25__Phase14_LocalAIInference_RAG_RevitContext_PhaseDefinition_PROPOSAL.md` — still PROPOSAL / propose-only; this ledger row is the promotion step that doc called \"the separate human-reviewed step,\" placed 2026-07-15. Related local-inference R&D lives in the AI-Server project. Re-scoped 2026-07-27 (PLACED not ratified — the source proposal doc's own §6 staged table has not yet been revised to match; reconcile before treating this as final): owner judgment that local models (14d, Ollama) will not land with real clients or their hardware — 14d stays on the ledger as deferred-with-trigger (a named air-gapped customer could still surface) but is now explicitly *not* the mechanism for \"security levels,\" and its priority stays last/demand-gated, unchanged in practice. What \"security levels\" actually means is reframed as per-firm policy flags, not a fixed tier system — proposed 14g — Data-handling policy flags, running alongside/ahead of 14c rather than after it: (1) whose account processes the call — BYOK, already built (Phase 6 `client_api_keys`, Fernet), no new work, just needs wiring into 14c's generation path; (2) data residency — the `inference_geo:\"us\"` Anthropic API parameter the 2026-06-23 inference-billing research already flagged as needing a price-map entry, never wired in; zero hardware; (3) redaction / retrieval-context minimization — what's allowed into a prompt at all, hung off the existing Retrieval/Context-vs-Generation seam in the proposal's own §5.1–5.3 architecture, independent of which engine (14c or 14d) processes it downstream; (4) retention / no-training terms — contractual, surfaced as a Client-Mgmt flag (Phase 6). Action-approval strictness (the fifth lever) needs no new work — it's Phase 13's existing draft→in_review→approved lifecycle. Any \"Safe/Balanced/Open\"-style labeling, if ever wanted for sales conversations, would be a named preset over these flags, not new architecture. Depends on Phase 6 for where the flags live and Phase 13 for the approval lever; touches Phase 14's own §5 architecture but not its retrieval/context build (14a/14b unaffected). New 2026-07-27 (PLACED not ratified): once 14a ships and Phase 9's new firm-standards `SourceParser` (above) has something to feed it, 14a's retrieval scope extends to the firm's own captured design-criteria docs, not just BIMpossible's product help docs — a config change to what 14a indexes, not new retrieval engineering.",
            tasks: [
              { label: "Owner ratification — still propose-only", status: "pending", note: "Proposed 2026-06-25; the doc explicitly withheld ledger promotion pending a human-reviewed step" },
              { label: "Retrieval over BIMpossible docs (BM25 first; ONNX embeddings only if quality demands)", status: "pending" },
              { label: "Read-only Revit context injection (doc, active view, categories, linked-model names)", status: "pending", note: "Never a write; never a full-model serialization" },
              { label: "Local LLM runtime inside the Revit add-in", status: "pending", note: "Owner chose the full local-inference vision over the narrower BYO/MCP-only option" },
              { label: "Risk gates §8–§9 carried from the analyst review", status: "pending", note: "Carried as explicit gates rather than dropped" }
            ]
          },
          {
            id: "P15",
            bucket: "active",
            weight: 1,
            name: "P15 In-Revit BIMpossible Assistant Pane",
            pct: 30,
            note: "ACTIVE — Native WPF dockable pane inside Revit that pairs to a BIMpossible web session with a single-use code and streams the existing `/assistant/chat` — same assistant + tools, docked in Revit. 15a (pair → pick project → chat): MERGED to main + STAGE A LIVE-PROVEN 2026-07-25. Backend merged via [PR #221](https://github.com/YourBIMpossible/BIMpossible/pull/221) (`a427a2e`); the Pair-Revit-card flag gating via [PR #226](https://github.com/YourBIMpossible/BIMpossible/pull/226) (`ab0d183`, superseded #217 — GitHub auto-closed it when #221's `--delete-branch` removed its base branch). Stage A proven in Revit 2026 on the real cloud model `SAMPLE-C-ELEC-R26.rvt`: A1 paired session authenticated end-to-end (DPAPI token survived a Revit restart); A2.1 project + model dropdowns auto-populated with no manual selection; A2.2 — asked \"What am I looking at?\" and the pane answered with the live model, the active view `POWER PLAN - LEVEL 1 - PARENT`, and `1 Electrical Fixture selected (element ID 1805159)`, an exact match to the independently-read Revit selection. Add-in side: PR #30 MERGED 2026-07-25 (`3457c65`) — Phase 15A is merged in BOTH repos, the prod backend deploy carrying `a427a2e` went live 2026-07-25 with `BIMPOSSIBLE_REVIT_PANE_ENABLED=1`, and `main@3457c65` is built + deployed to all four `%APPDATA%` Revit slots (byte-verified). T4's entry condition A is fully satisfied; condition B (cloud-only) was already locked → T4 is UNPARKED, plan of record `design-docs/2026-07-25__phase13-T4_apply-bimpossible-changes_PLAN.md` (its Task 4 PaneSessionProvider lift now lands on Add-Ins main as T4's first commit, since #30 merged without it). Runtime-slot coordination ledger: `Add-Ins/decision-log/2026-07-25__runtime-slot-handoff.md` (3-session pile-up resolved; slot handed to the glass lane for the one-build pane+glass deploy). Structural finding for future merge criteria: Stage A can never be run through the production web UI pre-merge — both `PairRevitCard.tsx` and `/auth/pane/pair` are branch-only, so \"verified in prod UI\" is unachievable before merge by construction. Later slices: 15b firm-document retrieval in the pane (BUILT, review-ready 2026-08-31 — server side pre-existed via Phase 18 Pillar 2 (#327): per-firm BM25 index + fail-closed `search_firm_docs` tool with firm scope derived server-side from the paired session's membership; the 2026-08-31 build session added the pane's `Sources:` citation row (AddIns [PR #113](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/113)) and adversarial-args / closed-schema tenant test pins (backend [PR #510](https://github.com/YourBIMpossible/BIMpossible/pull/510)); both PRs OPEN, not merged; live smoke with a real uploaded doc is owner-gated) · 15c Revit-context injection · 15d model writes + confirm UI. Per `design-docs/write-spine-convergence_target_2026-07-15.md`, the pane is transport over the existing write spine, never a new write path — 15d must produce standard proposals through the shared adapter. ⚠️ No PhaseDefinition PROPOSAL doc exists for Phase 15 — unlike 13/14 it entered build without the ratification artifact; row placed 2026-07-15 from the built reality (`Add-Ins/BIMpossible.RevitLink/Assistant/README-Phase15a.md`) so the ledger stops under-reporting active work. 15a re-proven in production use 2026-07-25: the paired pane session carried the entire Phase 13 T4 live smoke as the sole auth channel (ADR §3.1-E single-session rule held — no fallback path was needed or available), and the DPAPI token survived two Revit restarts without re-pairing. Operational trap found the same day: the pane resolves `BIMPOSSIBLE_PANE_BACKEND_URL` from the environment of the process that launched Revit, so a stale value silently misroutes the pane and everything riding its session; `%APPDATA%\\BIMpossible\\RevitLink\\pane\\config.json` does not exist as a backstop. Verify via the `[AssistantPane] controller ready; backend=…` line in `%APPDATA%\\BIMpossible\\RevitLink\\log.txt`. Moved out 2026-08-17 → Phase 17 — App Integrations. The Slack / Teams chat-assistant gateways (proposed here as \"15e\" on 2026-07-27, built dark and merged — Slack [#262](https://github.com/YourBIMpossible/BIMpossible/pull/262) 2026-08-07, Teams [#276](https://github.com/YourBIMpossible/BIMpossible/pull/276) 2026-08-08, both flag-gated off) are now their own top-level phase (17a / 17b). Full history — the 2026-07-27 proposal, the 2026-08-07 MCP-vs-gateway correction, the platform digest asymmetry, and the retired-unused numbering saga — is preserved verbatim in §Phase 17 below. Retained here because it still binds Phase 15's write slices too: Hard line, no exception — a write requested via any chat platform creates a Phase 13 change-set and goes through the exact same draft → in_review → approved lifecycle as every other write in this product; a chat message can *propose* a change, never commit one, regardless of platform. ⏸ 2026-08-08: Phase 15c's T5 (E2E smoke) is PAUSED pending the BIMpossible hub cutover / tenancy test gate; unrelated to and does not affect 15a above (or the chat gateways now at Phase 17), which remain as stated. Pointer (moved 2026-08-17): the \"Phase 15c — hub cutover / tenancy test gate\" content was never about the Revit pane — its subject is multi-tenant infrastructure (canonical firm identity, hub binding, read-only evidence windows, firm↔hub verification). It only got filed under 15 because it gated one Revit-pane test (T5). It has been relocated to Phase 6, where Client-Mgmt F / multi-firm tenancy already lives — see §Phase 6 — hub-cutover / tenancy test gate. The T5 *test* stays a Phase 15 gate; the tenancy *work* it waits on is Phase 6. 15f — Open-in-Revit desktop handoff (numbered 2026-08-17, was unnumbered): web→`bimpossible://`→local opener→Revit opens the correct cloud model; read-only by design; functionally complete + live-verified 2026-07-24 (see §Open-in-Revit below). Filed under 15 because it is the same web-to-desktop-Revit-bridge concern as the pane — *not* Phase 7, which is specifically about writing data back into models. Its distribution lane (end-user installer, code-signing cert) was separately parked by owner ruling — a business-timing decision, kept distinct from 15f's \"functionally complete\" engineering status so the two aren't conflated.",
            tasks: [
              { label: "15a — pair to web session, pick project, chat", status: "active", note: "BUILT on two unmerged branches; 47 Assistant tests green, both TFMs clean. Owed: live pair+chat e2e in Revit, then merge" },
              { label: "15a live e2e (human): pair with an 8-char code, pick project, stream a reply, verify token survives a Revit restart", status: "pending", note: "The one remaining step per README-Phase15a.md; needs flags on + a fresh Revit launch" },
              { label: "Write a Phase 15 definition doc", status: "pending", note: "Phases 13/14 have PhaseDefinition PROPOSALs; Phase 15 entered build with none" },
              { label: "15b — external-doc ingestion", status: "pending" },
              { label: "15c — Revit-context injection", status: "pending" },
              { label: "15d — model writes + confirm UI", status: "blocked", note: "Gated on Phase 7. Must ride the shared write spine (standard proposal → shared adapter), never a new write path; a write approval-request is politely declined in 15a" }
            ]
          },
          { id: "P16", bucket: "conditional", weight: 1, name: "P16 Desktop Orchestration Hub — MCP-First, Gated GUI Exception Path", pct: 10, note: "CONDITIONAL — Persistent local orchestration hub for cross-tool workflows (Revit, BIMpossible Site, filesystem/git, reporting) via explicit, scoped MCP servers as the default path; GUI/desktop automation admitted only as a named, allowlisted exception for apps with no workable API — under explicit consent, sandboxing, and audit logging, never a general \"control my desktop\" mode. Full rationale, architecture, and the 3-condition go/no-go ratification test: `2026-07-23__Phase16_DesktopOrchestrationHub_PhaseDefinition_PROPOSAL.md`. PROPOSAL — not ratified, not scheduled; placed at the end of the ledger deliberately." },
          { id: "P17", bucket: "active", weight: 1, name: "P17 App Integrations (governed third-party app surfaces — chat gateways + collaboration / CDE / reporting apps over a shared control plane)", pct: 50, note: "PARTIAL — Promoted to a standalone phase 2026-08-17 (owner decision) — the Slack/Teams gateways move out of Phase 15's \"15e\" into their own top-level phase. Supersedes, transparently per the freeze-numbers rule, both the 2026-08-07 \"Phase 17 retired-unused\" ruling and this session's own earlier withdrawal of the move; 17 was only ever coined in code comments, never claimed by a shipped phase, so promoting it is a placement decision, not a silent reassignment. Ordering holds 16 < 17 < 18. 17.0 Integration Control Plane — PLANNED foundation (registry, OAuth/credential vault, external-identity binding, fail-closed context routing, policy enforcement, adapter contract, Phase-13 change-set bridge, audit/observability, governed MCP + public/webhook API surface). 17a Slack BUILT (dark), merged [#262](https://github.com/YourBIMpossible/BIMpossible/pull/262) 2026-08-07, flag `BIMPOSSIBLE_SLACK_ENABLED` OFF. 17b Teams BUILT (dark), merged [#276](https://github.com/YourBIMpossible/BIMpossible/pull/276) 2026-08-08, flag `BIMPOSSIBLE_TEAMS_ENABLED` OFF. 17c onward — future integrations (Bluebeam, Telegram, Google Chat, Buzz, …): open, charter-gated backlog, not pre-lettered. Nine phase-wide invariants + per-integration admission charter + verbatim 15e build history in §Phase 17 below. Scope/architecture/governance: `2026-08-17__Phase17_App_Integrations_Strategy_and_Governance.md`; migration mechanics + candidate landscape: `2026-08-17__Phase17_AppIntegrations_Migration_PLAN_PROPOSAL.md` / `2026-08-17__Phase17_Integration_Landscape_RESEARCH.md`." },
          { id: "P18", bucket: "active", weight: 1, name: "P18 Client Knowledge Assistant (3 pillars)", pct: 70, note: "ACTIVE — Added as its own top-level row 2026-08-17. Previously invisible in this ledger despite being a fully-scoped, owner-authorized, multi-session program — the ledger↔engineering-store blind spot (its state lived only in `.tools/state/queue.yaml` + an anchor doc). Given 18, not 17, at creation (history): when this row was placed, Phase 17 was retired-unused per the 2026-08-07 ruling, so 18 was simply the next free integer after 16. That ruling was superseded the same day: 17 was promoted to Phase 17 — App Integrations (2026-08-17, see row 17). CKA stays 18 — unchanged — because it is a distinct product surface, not an app integration; the two now coexist and ordering holds 16 < 17 < 18. Not nested under 14 or 15: Pillar 1's search resembles 14's retrieval in spirit, but CKA is its own product surface (client documents + model explainability + product help), not local inference and not the Revit pane. Anchor / source of truth: `00_Strategy/2026-08-09__CKA-completion-program__ANCHOR.md` (locked mission, locked decisions A–E, stop conditions, internal Phase 0–4 plan, checkpoint log) + `2026-08-09__CKA-product-spec.md`. Three pillars (status verbatim from `queue.yaml`): Pillar 1 — Product help (BM25 help ranker + how-to corpus, waves 1–4) = live (`CKA-PILLAR1-HELP-CORPUS`; 41 help `.md` articles at tip, deployed-container search verified 2026-08-17). Pillar 2 — Per-firm documents (Private/Project/Multi-project/Firm-Library access model, RBAC + classification, upload/extraction/BM25 retrieval, assistant tool) = landed, not yet confirmed live (`CKA-PILLAR2-FIRM-DOCS`, PR #327; tenant-isolation-sensitive — flagged for a live firm_id-scoping + cross-firm-leak probe before external clients). Pillar 3 — Model explainability (14 gap-fills + Groups read parity, change sets, help handoff, model-health remedies, alert next-steps) = landed, not yet confirmed live (`CKA-PILLAR3-EXPLAINABILITY`, PR #326; CI-green is the only evidence — visual verification blocked on local sign-in). Internal Phase 0–4 stages are sub-phase notes (below), not top-level rows — launched under the corrected convention from day one to avoid the 11/11.1-style cleanup later. Hard boundaries per the anchor (do not cross without a fresh owner turn): no prod deploy/config/migration/data access, isolated/dev infra only, no new assistant-initiated write authority." },
          { id: "P19", bucket: "proposed", weight: 1, name: "P19 BIMpossible Workbench (desktop task-prep & closure workspace for Claude Code)", pct: 0, note: "PROPOSAL — Added 2026-08-21, from a phase plan submitted outside this ledger session and placed here on request. Native WPF/.NET desktop app, local-first and provider-agnostic (Ollama default, Claude/OpenAI/Gemini/Grok as optional adapters): work-item queue (`Inbox → Prepared → Active → Review → Closed`, plus `Blocked`/`Unverified`/`Parked`/`Reverted`) that captures a task (Revit selection, issue, family batch, code bug, test failure, design note), deterministically collects evidence (Git status/diff, targeted source search, test/build logs, read-only Revit context), uses a local model to draft a structured task contract (goal/evidence/constraints/scope/acceptance criteria — never silently proposing completed code changes), and generates a bounded Claude Code handoff; Claude Code implements and validates, Workbench records the closeout (changed files, validation evidence, risks, next action). Durable artifacts are project-local Markdown/JSON under `.ai/` (tasks/work/handoffs/decisions/prompts), not transient chat history. Not a Claude Code replacement, not a generic chat client, not an agent runtime/sandbox/terminal/browser-automation platform, and not an autonomous mutation engine — mutation is fail-closed by default (inspect/read-only; Revit and source-tree writes require explicit dry-run → review → apply). Closest ledger neighbor is Phase 16 (Desktop Orchestration Hub) — both are local/desktop, both explicitly gate nothing on the main product line, both are PROPOSAL/CONDITIONAL rather than scheduled — but they are distinct programs (16 = cross-tool MCP orchestration with a gated GUI-exception path; 19 = task-prep-and-closure workbench with its own evidence/local-AI/handoff pipeline) and should stay separate rows. Open decisions before any build work, per the plan's own gate list: product name confirmation; artifact-policy scope (repo-local `.ai/` only vs. app workspace + export); single- vs. multi-workspace v1 support; initial local model(s) + context/performance target; first Claude Code integration level (clipboard/file handoff only vs. controlled process launch); the first real (non-demo) vertical-slice task; secret/path exclusion policy before evidence collection is enabled. Full plan: `2026-08-21__Phase19_BIMpossibleWorkbench_PhaseDefinition_PROPOSAL.md`. PROPOSAL — not ratified, not scheduled; placed at the end of the ledger deliberately, per the freeze-numbers rule (ordering holds 16 < 17 < 18 < 19)." }
        ]
      },
      baselineCohorts: [
        {
          id: "july-2026",
          label: "July 2026 delivery baseline",
          frozenAt: "2026-07-13",
          sourceCommit: "adec7d8",
          approvedBy: "owner",
          approvedAt: "2026-08-30",
          rationale: "Original active/ratified delivery cohort at ledger commit adec7d8 (2026-07-12) — the phases in scope for the ~85% July headline. Membership is FROZEN; completion is recomputed from each phase's CURRENT pct, so 'is the original July commitment done now?' stays legible independent of scope growth. P11.1 is retained as historical membership and resolved to P11 via phaseAliases, then de-duplicated.",
          phaseIds: ["P0-2", "P3", "P4", "P6", "P8", "P11", "P11.1"]
        }
      ],
      phaseAliases: { "P11.1": "P11" },
      activity: [9,3,12,17,18,18,30,12,5,6,0,0,31,13],
      lastActivity: {
        date: "2026-08-31",
        summary: "fix(security-scan): run docs-hygiene at PR time and size its ceilings to match (#513) (efe78a2)"
      },
      branch: "main at 751155f; 0 ahead of origin",
      git: {
        warn: "Many merged feature branches still on origin (audit/*, refactor/data-tab-*, wip/phase5-*); prune retired remotes. Local fix/perp-audit-* may also be stale (content merged via PR)."
      },
      nextActions: ["Phase 15d: continue AI-assisted local-write slices past the first (#495/#498), each under the supervised before->approve->apply gate; APS/cloud writes stay hard-gated on explicit owner approval","AUTHZ-AUDIT-ROW-SIGNING (owner-gated): owner picks the signing scheme (server-held key, sign at record time), then build tamper-evident authz audit rows to match the syncAuth attestation leg","P13 Write Engine: build Increment 2 (type-param targeting, String-only) -- entry-gate cleared but unbuilt -- then Increment 3","P14-14g (owner-gated): owner reconciles the proposal §6 staged table + ratifies, then wire data-residency + redaction policy flags","P6 Client-Mgmt E: build self-serve client onboarding (provision a never-seen firm without a hand-seeded DB row)"],
      pendingDecisions: ["Schedule-push: staleness cadence, classifier rules, fidelity-degradation list, SPF ship location -- still direction-only, no code. The write-spine role SPF anticipated is now filled by the Phase 13 Write Engine; re-scope SPF against it before building.","Ceilings/Flooring dedicated shapers (Wave 16 placeholders) vs. Wave 15 Civil shapers (also pending) -- build now or batch them? Neither built; no demand signal forcing it. Furniture shaper already shipped.","D-5 (AKP): provider routing for local LLM inference -- gated on C-2 (provider runtime abstraction), which is not built (only 'anthropic' is runtime_supported). Cannot be decided until C-2 lands.","D-8 (AKP): where the audit hash-chain tip anchors outside the DB -- dormant until a B-6 STEP-0 trigger fires (2nd DB-writer, or a client/contract/insurer record on file). None has: single-operator deployment.","Phase 15 has no PhaseDefinition / ratification doc -- unlike Phase 13 (ACTIVE 2026-07-16) and Phase 14 (ACTIVE 2026-08-17), it entered build with no proposal; the PHASE-STATUS row carries its own flag. Owner still owes the definition doc."],
      blockers: [],
      reminders: ["main branch protection now has enforce_admins=true + strict required checks (backend pytest, frontend vitest+tsc, security-scan-summary) + force-push disabled -- checks gate admins too, including Push-And-Verify.ps1. Residual gap: no required PR review (required_pull_request_reviews=null).","The weekly audit report is point-in-time and has twice been superseded within hours by a same-day fix PR (07-27 #231, 08-04 #239) -- always check the repo's git log before trusting its counts.","Add-Ins test-count baseline is an attribute count (~904: Fact + Theory), NOT the ~1473 dotnet-test prints -- Theories expand across InlineData rows; conflating them caused a false '634 vs 895' scare.","D-N ID collision: the AKP decision series (AKP-D4/D5/D8, from Account_Key_Pairing_Remediation_Plan §4.2) and the PDP series (PDP-D1..D8, Production-Data-Protection-Plan) reuse the same D-numbers for different decisions -- always namespace by plan when citing a D-item."],
      links: [
        { label: "STATE doc (canonical, 06-12, archived)", path: "F:\\BIMpossible-Workspace\\99_Archive\\00_Strategy\\state-snapshots\\BIMpossible_STATE_2026-06-12.md" },
        { label: "True-prod deploy runbook (06-12)", path: "F:\\BIMpossible-Workspace\\02_Reference\\2026-06-12__true-prod-deploy-runbook.md" },
        { label: "Wave 4.10 spec libs (backend)", path: "F:\\BIMpossible\\backend\\aec\\spec_data" },
        { label: "Waves 10-19 closeout (06-13)", path: "F:\\BIMpossible-Workspace\\00_Strategy\\2026-06-13__Waves10-19_CloseOut_Status_and_Remaining_Work.md" },
        { label: "Build log", path: "F:\\BIMpossible-Workspace\\01_BuildLog" },
        { label: "Code", path: "F:\\BIMpossible" }
      ],
      recent: ["2026-08-30 - Phase 17 integration control-plane foundation landed: a governed registry for third-party app integrations with constrained status values (#500, #503)","2026-08-30 - Phase 15d first local Revit write slice: before/after approval, typed result, revert; writes unblocked past row 500 and on unset parameters (#495, #498)","2026-08-30 - Durable model_guid->project binding for /model/resolve; owner-only gating of draft-membership reads (#496, #499)","2026-08-25 - Phase 7 Revit Link supervised sync cutover PASSED and went live (flag ON) - remote sync_with_central is now the live write engine","2026-08-25 - Phase 7 relay hardening: session lifecycle (versioned health, DPAPI secret file, parent-PID watch) + typed relay errors (#486, #487)","2026-08-24 - Model History & QA Regression Intelligence foundation (P11 AC7): universal history capture, tombstone purge, honest history UI states (#476, #478)","2026-08-24 - Search integrity: tombstone reconcile demotes stale/deleted/renamed APS lineages so /search/models stops surfacing gone models (#466, #474)","2026-08-22 - Multi-tenant hardening + cross-firm read-only sharing (Client-Mgmt F, flag OFF): existence-oracle closed, inactive-firm bootstrap blocked, PDP G1 proxy staged (#447-#456)"],
      audit: {
        lastRun: "2026-08-26",
        runType: "FINAL reconciliation + publication (2026-08-25). Of the original 45-item BIMpossible-web backlog, all 45 are now dispositioned+closed — 0 remain open. The final 6 (accept-as-designed) were formally ratified under the owner's 2026-08-25 publication mandate (durable rationale + reconsideration triggers in audit-acceptance-records_2026-08-25.md); no undone engineering work. Phase 5 closed 10 beyond the Phase-1 pass: HYG-6 (dead guard.py refs fixed, 0 residual cites), HYG-13 (docs-hygiene fixed upstream via #483; PR-non-gating is a documented deliberate ratchet), HYG-16 (promote-approved.md self-flags DORMANT-by-design), HYG-8 (hook DOES fire — core premise refuted), HYG-19 (no factually-wrong claim survives), HYG-3 (false-authoritative core fixed; snapshot frozen by owner decision D6), HYG-1 (historical gap, forward-prevention shipped), SEC-DIST-1 (FIXED: installer signing is now a hard-gate — an unsigned build errors unless -AllowUnsigned is explicit and stamps -UNSIGNED into the setup filename; Build-Installer.ps1:62-67, AddIns d0ce4e9/#69 — the prior 'unactionable' label was wrong, the finding named Build-Installer.ps1 concretely), CQ-TEST-PAIR-1 (delete-failure retry test added, AddIns 81c06f8), and SEC-AUTHZLOG-RETENTION-1/WSR22 (finding-prover red->green: the request path opens NO DB session — structurally supersedes the p99 load test; waiver ratified with evidence; .env SHADOW->ENFORCE is a SEPARATE owner rollout gate, not this finding). Closed in the 2026-08-25 publication run: HYG-12 (AddIns doc-reference + docs-budget gate subsystem activated on merge of PR #106, c03ef5c), and HYG-2 + HYG-7 (SKILL.amended-candidate.md applied over the live G:\\ weekly-audit task — dead F:\\AI-Dev root corrected to the live F:\\BIMpossible / F:\\BIMpossible-Workspace roots; Slop + Hygiene lenses and _backups retirement confirmed already present since 2026-08-17). Accept-as-designed formally ratified 2026-08-25 (now closed, off the board): RE-2, ARCH-NEW-2, FE-3, FE-1, FE-2, SEC-cloud-1 — each with a durable rationale + reconsideration trigger in audit-acceptance-records_2026-08-25.md. Correction pass (post-Phase-5, evidence-verified): SEC-PAIR-2 + RE-PAIR-1 were already FIXED in AddIns PR #68 (fcfa484 — DeleteClaimedWithRetry + SweepOrphanedClaims startup sweep; OnWatcherError dispose/restart + 10s liveness poll on both watchers; PendingPairWatcherTests), so the prior 'owner scope' label was wrong and both are off the board. HYG-23 canonical decision-log root is owner-ratified in committed governance docs (docs/decision-log/INDEX.md:24, decision-log/README.md) with the frozen R1 archive kept valid by design; its folded I-08 cross-repo cite is requalified (AddIns 44585d5) — resolved, off the board. No open Critical or live-exploitable Security-High. Full record: audit-closure-FINAL_2026-08-25.md; per-finding evidence: audit-findings-validation_2026-08-25.md.",
        cadence: "weekly Sun 11:45pm + incremental Sun/Tue + on-demand",
        counts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        closedLastRun: 45,
        trend: "improving",
        reportPath: "F:\\BIMpossible-Workspace\\02_Reference\\Audit and Scan Info\\audit-closure-COMPLETE_2026-08-26.md",
        reportFile: "bimpossible/audit-closure-COMPLETE_2026-08-26.md",
        ledgerPath: "F:\\BIMpossible-Workspace\\02_Reference\\_audit-runs.md",
        open: [],
        history: [
          {
            date: "2026-08-26",
            type: "Final closure record -- M-30 (the last held finding, tracked on the AddIns card) retired via a genuine live-Revit capture merge; supersedes the 2026-08-25 resolution record for the estate as a whole.",
            scope: "Cross-repo 56-finding estate (2026-08-17 weekly full-audit + carried items). No BIMpossible-web code changed this pass -- closure was AddIns-side (PR #107).",
            result: "Estate-wide 56 -> 0 open. BIMpossible-web card itself was already 0 open as of 2026-08-25; this entry records the estate reaching full closure. Full record: audit-closure-COMPLETE_2026-08-26.md.",
            report: "audit-closure-COMPLETE_2026-08-26.md"
          },
          {
            date: "2026-08-24",
            type: "Repo-scoped supplemental audit (Security/Reliability/Architecture/Code-quality/Frontend, standard-practice lenses -- not the persona-lens baseline) -- read-only, resolved same-day.",
            scope: "F:\\BIMpossible only; F:\\BIMpossible-Workspace and F:\\BIMpossible-AddIns were inaccessible this run -- no Hygiene/Slop lens, no AddIns coverage, no diff against the 2026-08-17 baseline. Does NOT continue that baseline's finding-ID numbering; its 4 High / 25 Medium / 13 Low / 3 Info (45 total) remain open and untouched by this run.",
            result: "0 Critical / 0 High / 2 Medium / 9 Low / 14 Info (11 substantive findings, all in new standard-lens ID space: SEC-1..3, RE-1..3, ARCH-1..2, CQ-1..3, FE-1). Resolved same-day: 9 (SEC-1, SEC-3, RE-1, RE-2, RE-3, ARCH-1, CQ-1, CQ-2, CQ-3), each verified by Verify-Local-CI.ps1 -BaseRef origin/main (backend 5123 passed, vitest 1950 passed, eslint/tsc/next build clean) plus typescript-api-reviewer PASS on the frontend edit. SEC-2 retained by design (nonce-scoped static bootstrap, non-exploitable). ARCH-2 inspected, document-only (one of two extraction candidates not behavior-preserving; queued for next schedule-consolidation pass). FE-1 verified, no change (sub-agent's original claim of zero aria attributes was false on verification; downgraded Medium->Low, existing aria-sort/aria-expanded coverage sufficient).",
            report: "audit-resolution_2026-08-24.md"
          },
          {
            date: "2026-08-17",
            type: "Weekly full audit (Security/Reliability/Architecture/Code-quality/Frontend + first-run Hygiene & Slop) -- read-only. Reconciled 2026-08-22 on implementation-backed closure evidence: 32 of 77 findings resolved with a matching post-report code change; 45 active. 15 items previously recorded resolved without closure evidence were restored to active status (records correction, not new regressions).",
            scope: "Main repo HEAD (24 further commits since, through PR #445). First cycle running the Hygiene and Slop lenses end-to-end alongside the standard Security/Reliability/Architecture/Code-quality/Frontend sweep -- companion doc ops-followups_2026-08-17.md covers 6 separate OPERATIONAL follow-up flags (not code findings), all closed per its own final addendum (PRs #409/#410/#411/#70/#60 merged, a live Cowork task amendment applied, _backups/postgres deleted, scheduler drift confirmed matching).",
            result: "0 Critical / 10 High / 39 Medium / 24 Low / 4 Info at audit time (77 total). RECONCILED 2026-08-22: 32 of 77 findings closed with implementation-backed evidence -- each verified by an exact finding-ID citation in a post-report commit that changed at least one implementation file in a covered repo (6 High, 14 Medium, 11 Low, 1 Info). 45 remain active (4 High / 25 Medium / 13 Low / 3 Info). 15 findings previously marked resolved in the manual reconciliation were restored to active status after reconciliation found their closure records lacked implementation-backed evidence (no citation, audit-bookkeeping-only, or audit-artifact-only); this corrects the record and is not a new regression. Resolved Highs retained: SEC-WIZ-HUB-1, SEC-PAIR-1.",
            report: "weekly-full-audit_2026-08-17.md"
          },
          {
            date: "2026-08-08",
            type: "Incremental audit (six focused cluster sub-agents, #256->#312 window) + same-window resolution",
            scope: "~150 changed files across ~40 commits (#256->#312) plus 2 uncommitted items; ~95 files deep-read in six clusters (gateways / firm-tenancy sweep / auth-admin-allowlist / firm-alias+schedules+cross-model-join / backup PowerShell / migrations+models). The window's security-critical work -- the firm-wide require_active_membership sweep (#264), APS hub isolation (#265/#267), upstream-error sanitization (#266), personal-listing firm-scoping (#312/#278/#287/#290), the D-4 admin-secret retirement, and Slack/Teams crypto+signature -- was verified sound.",
            result: "0 Critical / 3 High / 10 Medium / 14 Low + ~10 NIT / 1 INFO. All 3 High were in NEW surfaces: H-1 Slack pairing collapsed identity-less sessions onto one shared UUID (twin of a prior Teams bug -- fixed with require_identity()); H-2 an unbounded docker-exec in Backup-Db reopened the exact backup-hang the pipeline exists to close (routed through Invoke-BoundedCommand); H-3 the restore drill greened on a partially-restored dump (added --exit-on-error). All 10 Medium and all 14 Low were fixed or accepted-documented: 24 implemented + L-2 already-fixed on baseline (b19e377) + L-7 owner-decided (firm-first alias precedence stays; documented in CLAUDE.md + clientRules.ts). The resolution doc was authored uncommitted on a review worktree ('nothing committed/pushed'), but the fixes have SINCE landed -- verified present on origin/main 2026-08-16 (require_identity, Invoke-BoundedCommand, --exit-on-error, _MAX_BODY_BYTES). Verify-Local-CI green: backend Docker pytest incl. 12 new regression tests, frontend 1726+6 vitest / tsc / next build (model route 198 KB < 207 KB ceiling). Excluded from remediation by instruction: the ~10 NIT, the 1 INFO (stale graphify X-Admin-Secret artifacts -- still on disk, incl. a 2026-08-10 graph), and the OPS-C*/CANON-C* harness-layer candidates (one flags that the repo's 'never touch .env/guard.py' rule is instruction-not-control -- recorded, not actioned).",
            report: "audit-resolution_2026-08-08.md"
          },
          {
            date: "2026-08-04",
            type: "Weekly full audit (scheduled, autonomous, 3 lens sub-agents) — then a same-day close-out of everything it raised",
            scope: "Main repo HEAD ff42ac3 (exactly one commit past last week's audited tree — that commit being last week's own 12-item close-out). Add-Ins origin/main 19c5ddd. The consolidating pass caught and corrected one of its own sub-agents, which had read RE-1's status off a stale unmerged local branch (cc4adc3, not an ancestor of origin/main) and reported it still open.",
            result: "**RE-1 RESOLVED — the carried High for 4 consecutive cycles, and the first High-free cycle in this report format.** Verified by direct diff read, not commit message: Add-Ins PR #46 (19c5ddd, merged 07-27) moved the queue lifecycle into a new Revit-free PendingRequestQueue.cs with a 3-state CAS (Pending/Abandoned/Dispatching) so abandon-vs-dispatch has exactly one winner, and PipeServer now abandons on timeout and in the generic catch too — broader than the original finding, which named only the EVENT_REJECTED path. Backed by 9 new tests, red-green verified (reverting the drain fails 5 of 9) — the first coverage EventDispatcher/PipeServer have ever had. The audit also re-verified all 9 of last week's BIMpossible-repo closures against current file content, and confirmed the detection gap that let two items sit unfixed for two cycles (a source-scan test with a blind spot) was itself closed. It then raised 6 genuinely new findings, all Low/Medium — and ALL SIX were resolved the same day by PR #239 (68bb596, 11:22), hours after the report was written: a code-enforced BIMPOSSIBLE_ALLOW_SYNTHETIC_SEED opt-in guard on the perf-seeding scripts (the run's headline new risk), transient-HTTP retry parity between the wizard's two sibling poll loops, a non-loopback refusal in the load-test harness, three more open-on-demand modals moved to dynamic import, and the untracked-script/scheduling-cadence pair resolved by tracking the wrapper and removing its Task-Scheduler registration path. PR #240 followed with two dependency-advisory bumps. Auto-Fix Pass: BLOCKED for a 4th consecutive cycle (preflight found no PowerShell/Docker) — but this run did land the process fix that had been flagged as undoable from a working session: the live scheduled-task prompt was patched via the scheduled-tasks tools to run the preflight explicitly and to check the Add-Ins repo's origin/main rather than whatever branch is checked out locally.",
            report: "weekly-full-audit_2026-08-04.md"
          },
          {
            date: "2026-07-27",
            type: "Weekly full audit (scheduled, autonomous, 3 lens sub-agents) — then a same-day resolution pass from a Windows/Docker-capable session",
            scope: "Main repo HEAD 569bcb8 at audit time (47 commits since 2026-07-20). Add-Ins HEAD cc4adc3 (an unmerged PR #45 tip, confirmed byte-identical to main on the audited files). Resolution work branched from origin/main in a worktree, verified with Verify-Local-CI.ps1 (Docker 29.6.1 + MSBuild available) rather than asserted.",
            result: "Audit found Critical 0 / High 1 (RE-1, carried) / Medium 8 / Low 8 / Info 6, essentially flat vs 07-20, with one sub-agent finding (SEC-WIZ-APPROVAL-1) checked and DISPROVEN by the consolidating pass. Same day, a Windows/Docker session resolved 12 of the queued 12 Human-Review items — the first time in 3 consecutive cycles (07-13/07-20/07-27) this sandbox-CI-verification gap didn't block every fix. RE-1 (the carried High): the audit's own suggested test wasn't buildable as described (BIMpossible.RevitLink.Tests has no Revit package refs) — real fix extracted the queue lifecycle into a new Revit-free PendingRequestQueue.cs with a 3-state CAS ownership handoff (abandon vs. dispatch has exactly one winner), producing EventDispatcher/PipeServer's first-ever test coverage (9 new tests, red-green verified) and closing 2 more instances of the same defect the audit didn't catch (TIMEOUT/EXECUTION_ERROR paths, not just EVENT_REJECTED). SEC-MEMBERSHIP-1 required an owner design decision, taken same day: bind the static-firm fallback to single-tenancy (no-op below 2 registered firms, denies past that). SEC-NPMALERT-1's own acceptance test (0 open HIGH Dependabot alerts) only passed after merging to the default branch, then was re-run live to confirm, not inferred. 2 more Info items independently closed: FE-BASELINE-1 (a Checklist claim was found FALSE when re-checked — corrected, not just re-asserted) and ARCH-ADDINS-TEST-COUNT (last week's '634 vs 895' scare reconciled: the audit counted a stale PR branch, not main; 904 attribute-count is the real baseline, distinct from the 1473 dotnet-test prints). CQ-WIZ-LEGACY-1 formally deferred with its unblock precondition now written down. Both PRs merged (BIMpossible #231 -> ff42ac3e, Add-Ins #46 -> 19c5ddde), post-merge CI green on both, 0 open Dependabot alerts re-confirmed live after merge. Structural finding: the recurring 3-cycle Auto-Fix stall's real root cause is that the SCHEDULED audit prompt itself is hosted outside every reachable dev-session surface (not in .claude/skills, not in CronList/list_scheduled_tasks) — genuinely unpatchable from here. A reachable sibling automation (bimpossible-audit-loop.js) had the identical fail-open defect and was fixed this pass (now fails closed with an explicit preflight verdict); the remote routine itself remains the one item only the owner can act on.",
            report: "audit-resolution_2026-07-27.md"
          },
          {
            date: "2026-07-20",
            type: "Weekly full audit (scheduled, autonomous, 3 lens sub-agents) — read-only, no same-day remediation",
            scope: "HEAD 29e96da, 21 commits since the 2026-07-13 run. Largest new surface: WSR8 write-gate unification + convergence work (92738b3/9713356/df7add1/29e96da), continued Phase 3.10a/3.10b performance work, and the new Alembic single-head CI guard.",
            result: "5 resolved, independently re-verified (not just claimed): WSR8 (the write-gate bypass — now one shared check_firm_model_editor predicate used identically by both call shapes, proven by a source-scan test), plus the 4 conditional day-two gaps that shipped alongside WSR8 step 2 rather than after it (RE-NEW-4 CAS guard on finalize, RE-NEW-5 reclaim sweep, ARCH-NEW-1 365-day retention, CQ-NEW-1 dormant-status test). Net severity is flat, not down: the prior High (WSR8) resolved, but a DIFFERENT previously-carried High (RE-1 — EventDispatcher's queue-drain bug) surfaces as this cycle's headline, traced end-to-end for the first time (was always open, just not previously the loudest finding). 4 new low/medium items are foreseeable loose ends after a big refactor (stale docstrings, an engine-factory bypass on a read-only path, a supply-chain gap in the newly-split Add-Ins repo, a test-count delta needing reconciliation) — not signs of regression. Auto-Fix Pass ran but applied zero fixes: the scheduled runner's sandbox has no Docker/PowerShell, so every candidate (including the trivial docstring fix) was routed to human-review rather than applied unverified.",
            report: "weekly-full-audit_2026-07-20.md"
          },
          {
            date: "2026-07-15",
            type: "Phase 3 production-readiness / roadmap-truth audit (day-2, 5 evidence agents) — then overtaken by same-evening work",
            scope: "Both repos, re-verifying every prior claim against live code/git/docker/GitHub-API state rather than trusting yesterday's audit or this morning's owner decisions. Pure audit — no files modified.",
            result: "⚠️ POINT-IN-TIME: the report was written 18:40 and most of its headline findings were resolved within 3 hours, by work done the same evening. Its #1 blocker — 'the Phase 3.10a warm pipeline has produced exactly zero rows on every dimension since it was built, 0 room_join_geometry jobs ever even ENQUEUED, re-confirmed live today 2×' — was closed at 19:18 by a4ecece: the FIRST-EVER live warm + join proof against a real cloud project (the id-bridge fix c2d5756 that unblocked it had landed at 18:33, 7 minutes before the report was written). AC-1 then closed via the real endpoint and AC-3 went from FAIL to PASS (p50 215ms → 18ms) via a per-(project, arch-version) room-pool cache + bbox pre-filter (7f8735f/413adf8/c169f61/3b2fa93) during a supervised flag-flip. Finding #4 (ProgramPlan's 3 stale 'Wave 22' cross-refs surviving two correction passes) fixed at 19:22 (7be8f6a). Finding #9 ('two owner decisions landed today with zero code behind them') is obsolete: Phase 3.8's minimal-wedge slice 1 landed 19:14 (48c4826) and WSR8 step 2 went from the check_firm_model_editor role (19:31, 92738b3) to fully wired gated LLM→live-Revit parameter write (21:30, 9713356, flag OFF), marked BUILT+SHIPPED in the docs repo at 04:40 the next morning. Finding #2 (an uncommitted worktree 'BIMpossible-warm-idbridge' with live edits to exactly the files implicated in the 0-rows bug, status unknown, flagged to the owner) resolved itself — the worktree is gone from disk and its fix c2d5756 is on main. Finding #6 was self-corrected inside the report: the 'Phase 15 branch contains no WPF/C# code' alarm was a scoping error — the pane lives in a THIRD repo (Add-Ins), which no agent was pointed at; it is genuinely built (1124/1124 tests, both TFMs). GENUINELY STILL OPEN: branch protection has enforce_admins=false so required checks are a signal not a gate on the direct-to-main push path; two rival unmerged shared-parameters branches (both confirmed still present); WSR8's doc trail stranded off main; and the live revit_link READ flag has no default-value regression test.",
            report: "2026-07-15__phase3-production-readiness-audit.md"
          },
          {
            date: "2026-07-14",
            type: "Phase 3 production-readiness audit (ground-truth verification, 4 evidence passes) + same-day partial remediation",
            scope: "Every Phase 3 feature, sub-phase, spec, plan, migration, flag, endpoint, worker, and runbook, cross-checked against live prod DB rows, real CI status, and git history — not the ledgers' own claims.",
            result: "Headline: the project's own status ledgers disagreed with each other and with the running system on nearly every point that mattered. Found (and same-day fixed): no automated guard against Alembic multi-head migration collisions — this exact risk class caused a real prod outage the night before (351 backend container restarts, two migrations landed with no backend-migrate run); fixed via a new CI guard (1e07550). Also found+fixed: frontend/Dockerfile had no ARG/ENV line for the Phase 3.10a flag at all, silently no-opping the documented 'flip it on locally to test' path (a2a4a23). Corrected same-day, citing this audit: PHASE-STATUS.md (Phase 3.10a's warm-time pipeline is code-complete, migrated to prod, CI-green — but has NEVER executed against real data, 0 rows in room_footprint_cache/level_band_cache/element_cache.origin_x, confirmed live; the prior 'owed a live-test verification' framing was wrong the day it was written; added the missing Phase 3.8 entry) and WAVE-STATUS.md (was 13 days stale despite 4 real waves shipping; backfilled waves 26-29 for 3.10a/3.10b-Furniture/P3-8-DYN/WSR8). Still genuinely open: ProgramPlan.md (1,574 lines) was explicitly NOT corrected — still gates Commercial Launch on the Phase 3.8 custom-role-matrix design abandoned 2026-07-12, and has zero mentions of 3.10/3.10a/3.10b/WSR8 anywhere; Phase 3.10a's flag-ON path has no ErrorBoundary/malformed-row guard (the flag-OFF path does) — turning the flag on, the literal next planned step, risks a whole-page crash; and a broader silent-empty-state sweep found 3 spots where a genuine failure and genuine emptiness render identically (category-vanish-on-0-elements, Circuits timeout-vs-404, ElementPreviewPanel's Related section with no error state at all).",
            report: "2026-07-14__phase3-production-readiness-audit.md"
          },
          {
            date: "2026-07-13",
            type: "Weekly full audit (3 parallel lens sub-agents) + same-day closeout",
            scope: "HEAD 85f27e2, 47 commits since the 07-06 run; largest new surface is the assistant live Revit-parameter-write execution primitive (9891132). Every Medium+ carryover re-verified by direct code read, not commit-message trust.",
            result: "0 crit / 1 high / ~7 medium / ~14 low / ~4 info — then EVERY finding closed (11 shipped in code/config + 6 accepted, documented owner decisions), zero dangling. Headline WSR8 (High): the new assistant Revit-write primitive bypassed revit_link/router's flag+role gate stack — re-routed through a single-source assert_write_authorized() (c4194c5, on main + pushed, remote CI green); it stays dormant/unwired. Remaining fixes (RE-NEW-4/5/6 CAS + reclaim sweep + batching, FE a11y/types, ARCH-NEW-1 365-day retention, docker resource caps, RE-NEW-3 backup-failure webhook, SEC-NEW-1 fails-closed tripwire) landed in b6bb96f, now merged to main + pushed. Accepted-deferred (tracked, not dangling): SEC-3 + SEC-NEW-1 open-mode fallback close at multi-user; ARCH-NEW-2 router god-file split at next major touch. Prior run's Critical (07-06 uncommitted git merge) confirmed resolved.",
            report: "weekly-full-audit_2026-07-13.md"
          },
          {
            date: "2026-07-11",
            type: "Incremental verification (6 agents) + same-day TDD resolution (7 agents) + 1 follow-up fix",
            scope: "53 findings carried in from 07-08 (6 Critical/High + 47 Medium/backlog), independently re-derived from live code/tests/gh api/semgrep rather than trusted; everything still open after that was then fixed same-day, including the one item tracked outside the batch",
            result: "Verification pass: 41 of 47 confirmed genuinely fixed; 4 medium open (1 new bug introduced by the WIZ-5 fix, 2 reclassified from 'fixed' to partial after live semgrep/code-path checks, 1 known live gap needing a GitHub settings change) + 5 low partials, each with a real narrow open half. Resolution pass, same day: all 9 fixed via strict TDD (failing test first, minimal fix, full-suite regression) by 7 agents on disjoint files, caught and fixed one incidental cross-test logging-isolation bug along the way, finished with backend 2784+1933+4 passed / frontend 1648/1648+build clean — LOCAL CI GREEN. CI-2's settings half (dependabot-automerge past a red security scan) closed same day too: code-side GitHub-issue notification added and verified (12/12 mocked assertions), then the owner wired security-scan-summary into branch-protection required checks, confirmed live via gh api. Final item, task_645d4dde (the rated_pressure_pa unit-conversion bug adjacent to SCH-M5, deliberately tracked outside this batch): fixed same day too (f07fb3e) — added an exact PSI→Pa constant mirroring the existing flow-rate pattern, test asserts against an independently hand-computed literal so a wrong constant would still fail, full pure-lane suite verified (1903 passed, 0 failed). Zero Critical/High/Medium/Low open — only the pre-existing 8 info/cosmetic residuals remain. Operational note: 2 unpushed-but-verified-correct commits (711b8a5 + merge bdfba8a) found on local main earlier — unrelated maintenance, not an audit item",
            report: "2026-07-11__audit-report.md"
          },
          {
            date: "2026-07-10",
            type: "Code-level re-verification (not a full audit re-run)",
            scope: "All 5 open Critical/High from the 07-08 report, checked against current source + live system state (Task Scheduler, Docker container restart times, live Postgres migration)",
            result: "All 5 confirmed FIXED with live verification, not just source: OPS-1 (efbbbea, LastTaskResult 0 + fresh dump today), WIZ-6 (21013bb, running in restarted container), AST-1 (376e180, migration d3e4f5a6b7c8 applied to live DB), WIZ-1/WIZ-2 (2d36353, fix for WIZ-2 actually lives in wizard/executor.py not aps_write.py as originally logged). Medium/Low/Info backlog (44/28/14) not re-checked this pass.",
            report: "2026-07-08__audit-report.md"
          },
          {
            date: "2026-07-08",
            type: "Incremental (5 agents)",
            scope: "22 commits / 117 files since bd472b0: remediation batches 07-01→07-07 + wizard APS write client + Coordination Report 11.1 + shared-parameters registry",
            result: "OPS-1 (Critical, live): nightly DB backup silently failing since 07-06 repoint; +4 HIGH on the write-back perimeter (WIZ-6 live write endpoint no authz, AST-1 unscoped edit-log tool, WIZ-1/2 latent audit-trail integrity). All 30 prior closures verified genuine",
            report: "2026-07-08__audit-report.md"
          },
          {
            date: "2026-07-06",
            type: "Weekly full (3 agents)",
            scope: "Whole tree @ 83384da — 39 commits since 06-29",
            result: "OPS-CRIT-1 (Critical): main in unresolved uncommitted merge (~856 files) — resolved same-day. 0 High; SEC-10/11/12, OPS-2, FE-16/18 verified closed; wizard write surface judged best-gated in codebase. 11 findings resolved via fe7720c + 07-07 follow-up closed the remainder",
            report: "weekly-full-audit_2026-07-06.md"
          },
          {
            date: "2026-07-01",
            type: "Full (run 2, deep — 7 agents)",
            scope: "Whole tree @ bd472b0 — adversarial bug-hunt",
            result: "9 HIGH the same-day survey missed: SCH-H1 empty schedule endpoints, SCH-H2 missing auth gate, AST-H1 fail-open crypto, AST-H2 denial-of-wallet, FE-H1/H2, OPS-H1 backup-verify-can't-fail, OPS-H2 lying CI watcher, OPS-H3 dead automerge — 8 fixed same-day + wave-2 (#173)",
            report: "2026-07-01__audit-report-full-2.md"
          },
          {
            date: "2026-07-01",
            type: "Full (run 1, survey — 5 agents)",
            scope: "Completeness survey @ bd472b0; carry-forward re-verify (all 6 confirmed fixed)",
            result: "'Clean sprint' verdict SUPERSEDED — the same-day deep re-run found 9 HIGH this survey missed",
            report: "2026-07-01__audit-report-full.md"
          },
          {
            date: "2026-06-30",
            type: "Full",
            scope: "Assistant subsystem, prewarm worker, Sheets OAuth, FieldCombobox, graph topology, CI, semgrep",
            result: "GRAPH-1 (High, carry-forward): O(n²) _load_served still unaddressed — fixed 07-01 with O(V+E) rewrite + regression test",
            report: "2026-06-30__audit-report-full.md"
          },
          {
            date: "2026-06-29",
            type: "Incremental",
            scope: "~50 files / 30 commits: Phase 4d Levers 1–4, NetworkX topology, security CI hardening, backup fix",
            result: "DIGEST-1 (High): useDigest never re-fetches after 'preparing' — digest spinner never resolves during model warming",
            report: "2026-06-29__audit-report.md"
          },
          {
            date: "2026-06-22",
            type: "Weekly full",
            scope: "Whole tree",
            result: "All clear — 0 open · 5 closed (expr-eval CVE removed, relay frame guard, multi-tenant auth scoping via #142)",
            report: "2026-06-16__code-audit.md"
          },
          {
            date: "2026-06-16",
            type: "Weekly full + verification",
            scope: "Whole tree @ 04b5d8d",
            result: "0 Critical / 0 live-exploitable · new SEC-9 backend CSV formula-injection (Medium); SEC-8 PUT /ref 500s",
            report: "weekly-full-audit_2026-06-16.md"
          },
          {
            date: "2026-06-15",
            type: "Weekly full",
            scope: "Whole tree + QA/wizard WIP",
            result: "0 Critical · OPS-1 (High, process): new QA/wizard surface CI-unverified while Actions billing-blocked",
            report: "weekly-full-audit_2026-06-15.md"
          },
          {
            date: "2026-06-14",
            type: "Full (backend + frontend)",
            scope: "Phase 3 F-1…F-28, Phase 4a/5, expr-eval removal",
            result: "NM-1 (Medium): list_views checks project allowlist before auth — probe via differing error codes",
            report: "2026-06-14__audit-report-full.md"
          },
          {
            date: "2026-06-13",
            type: "Full",
            scope: "Whole tree @ 58fd53c (W10-17 merges)",
            result: "FEA-4 (Medium): 15 new Wave 10-17 schedule views ship with zero unit tests",
            report: "2026-06-13__audit-report-full.md"
          },
          {
            date: "2026-06-10",
            type: "Full (7 agents)",
            scope: "Whole tree @ 277e6d2 · re-verified 68 perp-audit fixes",
            result: "CORE-1 (High): refresh never invalidates the durable category cache → stale sidebar on republish",
            report: "2026-06-10__audit-report-full.md"
          }
        ],
        reportDate: "2026-08-17",
        reconciledAt: "2026-08-22 01:23:04",
        reconciliationHeads: [
          {
            repo: "BIMpossible",
            head: "de7901375c",
            inspected: true
          },
          {
            repo: "BIMpossible_Workspace",
            head: "0c9bcb2abc",
            inspected: true
          }
        ],
        rawCounts: {
          critical: 0,
          high: 10,
          medium: 39,
          low: 24,
          info: 4
        },
        openCounts: {
          critical: 0,
          high: 4,
          medium: 25,
          low: 13,
          info: 3
        },
        unknownCounts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        resolvedCounts: {
          critical: 0,
          high: 6,
          medium: 14,
          low: 11,
          info: 1
        },
        publishedCounts: {
          critical: 0,
          high: 4,
          medium: 25,
          low: 13,
          info: 3
        },
        ingestStatus: "success",
        ingestDetail: "reconciled against BIMpossible, BIMpossible_Workspace; 32 of 77 closed by implementation-backed finding-ID evidence, 45 open (32 insufficient-evidence citation(s) rejected)",
        unknown: []
      },
      waves: {
        updated: "2026-08-26",
        source: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md",
        summary: { done: 30, built: 6, inFlight: 1, ahead: 3 },
        current: [
          { id: "15", title: "Civil schedules", status: "PARTIAL", date: "2026-06-13", note: "Civil probe-config + model-discovery work merged (`cf3b8ee` Merge feat/wave15-civil-probe-config; model-discovery (local merge c7ac2d5; feat 9145f88)). Adds `b…" },
          { id: "26", title: "Phase 3.10a Cross-Model Room Join", status: "BUILT", date: "2026-07-13", note: "Code merged `dd5adb1` (2026-07-12); warm-time writer gap found+fixed `c72f647`/`09cb66b` (2026-07-13); migration genuinely applied to prod (confirmed live). No…" },
          { id: "28", title: "Phase 3.10b Furniture slice", status: "BUILT", date: "2026-07-12", note: "`4bb6497`, reuses 3.10a's algorithm unchanged. Inherits Wave 26's never-executed-pipeline gap — same caveat applies." },
          { id: "29", title: "WSR8 write-primitive cluster (assistant-Revit-write auth gate + reliability hardening)", status: "BUILT", date: "2026-07-13", note: "`c4194c5`, real GitHub Actions CI green. `execute_proposal` has zero production callers, enforced by a real AST-based test in the required CI gate — correctly,…" },
          { id: "30", title: "Phase 17 (17a Slack + 17b Teams) chat assistant gateways", status: "BUILT", date: "2026-08-08", note: "Slack `dd89889` (#262, merged 2026-08-07), Teams `879e857` (#276, merged 2026-08-08). Read-only Q&A against a bound project + model from a channel, fronting `a…" },
          { id: "31", title: "Phase 15c — In-Revit Assistant Pane, Revit-context injection", status: "BUILT", date: "2026-08-18", note: "Add-Ins [PR #74](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/74) \"feat(15c): live document reads in the Assistant pane\", merged 2026-08-18. Buil…" }
        ],
        lastCompleted: { id: "13.1", title: "Phase 13 Increment 1 — Write Engine Typed Values (INSTANCE-scoped) + unit-aware Double", date: "2026-08-04" },
        drift: []
      }
    },
    /* PROJECT:bimpossible:END */
    /* PROJECT:addins:START */
    {
      id: "addins",
      name: "Add-Ins / RevitLink",
      icon: "wrench",
      oneLiner: "Revit ribbon add-ins - BIMpossible.RevitLink (default-shipped: Family Fixer + pairing/relay + sheet/callout/Key-Plan tools); the 6 discipline QA add-ins are built but parked (RevitLink ships alone by default).",
      status: "active",
      phase: "origin/main at 60ebeb1 (#111); the local F:\\BIMpossible-AddIns checkout is 9 commits behind origin (dashboard reads origin). ARCH-BIMP-PARAMSET landed (#111) -- BIMP_IsDeliverable v1 parameter setup + diagnostics. Key Plan (Tool 20) shipped its composite resolver + dry-run preview + freeze fix (#110); its live write is owner-gated (flags A-C, then a first supervised write). M-30 -- the last held audit finding across the whole estate -- closed for real (#107) with genuine live-Revit Place Callout Sheets captures, and the remaining AddIns audit residuals closed alongside (#106: HYG-12 CI subsystem, M-33, L-21, CQ-TEST-PAIR-1, ...). Relay hardening advanced: add-in-owned relay session lifecycle (#105, P7-RELAY-SESSION-LIFECYCLE) and file-backed DPAPI JTI replay persistence (#104). Build-output hygiene: _cc_build_check snapshot untracked + policy doc (#108). Last scored /audit remains the 07-14 baseline (its findings now fully closed via the cross-repo estate); the 08-22 Link-PDF phase-0 review is narrative-only and un-scored -- see the audit card.",
      focus: "ARCH-BIMP-PARAMSET (#111) and Key Plan Tool 20 (#110) are the freshest landings; Key Plan's live write is owner-gated -- flags A-C then a first supervised write (ADDINS-KEYPLAN-LIVE-WRITE). Audit estate fully closed (M-30 retired via genuine live-Revit captures #107; residuals #106). Still owed live: Family Fixer's ribbon click-through + go_single_panel (its one destructive op, never run live), and the first-use DPAPI pre-warm to kill cold-start attestation latency (ADDINS-DPAPI-PREWARM). Note: the local main checkout is 9 behind origin/main (#111).",
      progress: {
        label: "Tracks",
        phases: [
          { name: "RevitLink tools (9 SHIP, 2 retired, 1 future)", pct: 84, note: "PR #40 (\"Passes 1-4\", 07-26) live-verified in Revit 2026 against a live discipline model — found+fixed 3 silent-failure defects (Cancelled-after-commit data loss, Tool 1 self-deleting worksets, decorative Cancel button) and a Deploy-Local.ps1 bug that was silently deploying nothing (wrong x64 path, exit 0)." },
          { name: "Family Fixer (ribbon merged, Glass-themed)", pct: 78, note: "Ribbon button merged (PR #25, 07-23) and Glass-themed (6c9a139); dialogs migrated to GlassAlert (PR #40). Live-Revit click-through, icon sign-off, and one live go_single_panel execution — the one destructive op — are still not done, now unchanged across two consecutive windows. 4/5 backend pipe ops in production; only wire_nested_params remains unported." },
          { name: "Duplicate Collection / Replicate Levels", pct: 80, note: "No activity this window either — unchanged since 07-21 (now 2 windows stale)." },
          { name: "QA scanners (7/7 deployed)", pct: 88, note: "All 6 discipline QA add-ins + RevitLink now ship and deploy as one smoke-tested set (PR #40, 07-26) — the 7th scanner (Civil) question is answered by inclusion, not a standalone Trade-7 build. Deep per-discipline QA scanning itself still deferred." },
          { name: "Glossy Glass UI", pct: 92, note: "Owner-ratified theme + GlassAlert layer merged to main (PR #35, ebfdcc8, 07-25) after reconciling with 2 fixes that had landed on main during the theme's development (PR #26 collection-name, PR #29 room-tag disclosure) — confirmed via merge-base ancestor check, not just trusted. All 4 Revit-year deploy slots hash-verified matching." },
          { name: "Phase 13 T4 — Apply BIMpossible Changes", pct: 93, note: "Merged (PR #38, cfb4cc1, 07-25) and LIVE-VERIFIED same day (BIMpossible_Workspace/01_BuildLog/2026-07-25__T4-live-smoke_RESULTS.md). Task 6 (PR #39, faf9475, 07-26) — idempotency race fix + per-edit apply outcomes posted to edit_log — also merged and live-verified end-to-end. The same apply-changes path advanced again 08-04: Write Engine Increment 1 shipped (PR #49, 0f3d318) — ApplyOne now writes typed Integer + unit-aware Double on instance parameters, merged lockstep with backend PR #232 and clearing live-Revit smoke 8/8 (incl. a ×10,763.91 unit-conversion case). Increment 2 (type-param targeting) is unblocked next." },
          { name: "Phase 15a Revit pane", pct: 94, note: "Merged (PR #30, 3457c65, 07-25) and live e2e passed (Stage A) same day; backend halves merged in BIMpossible (PR #221/#226). Three more fixes landed 08-04: docked header + compact pairing panel (#45, d1040b7); the broken-project-loads bug's root cause corrected mid-investigation — not a missed status code but a 200 OK carrying an unreadable HTML body, silently rendered as an empty list (#50, e0ea397, new PaneProtocolException); the pairing screen now shows which backend it's connecting to (#51, e38648e, paired with backend's /whoami #247). The abandoned phase15a-pane 38-commit rebase line (no surviving branch except not-for-merge backup PR #42) is unchanged since 07-25 — still needs an owner call." },
          { name: "Project Conformance Engine (new, #10)", pct: 55, note: "Revit-free core + collector adapters merged 08-04 (94b21ab) — the first landing against the 06-28 design spec's 4-part spine (STANDARD data → INSPECT → EVALUATE → APPLY/REPORT); INSPECT+EVALUATE are the new work here, APPLY/REPORT reuse existing ModelQA.Core/setup-service pieces. No firm-standard data file authored yet. pct is a first-cut estimate against the spec's stages, not ledger-derived." }
        ]
      },
      activity: [3,1,1,3,7,15,1,4,2,1,0,0,3,0],
      lastActivity: {
        date: "2026-08-30",
        summary: "feat(pane): P15-15B firm-document source citations in the Assistant Pane (#113) (d09204e)"
      },
      branch: "main at 7bdfa68; synced with origin",
      git: null,
      nextActions: ["Key Plan (Tool 20) live write: owner sets flags A-C, then run the first supervised write (ADDINS-KEYPLAN-LIVE-WRITE)","Family Fixer: live-Revit click-through + icon sign-off + one live go_single_panel execution -- the one destructive op never yet run live","ADDINS-DPAPI-PREWARM: first-use DPAPI pre-warm in the verifier to remove first-attestation cold-start latency after Revit launch","Fast-forward the local F:\\BIMpossible-AddIns checkout to origin/main (#111) -- it is 9 commits behind","Write Engine Increment 2 (type-param targeting) Add-Ins half, lockstep with backend, when Increment 2 starts"],
      pendingDecisions: [],
      blockers: ["POWER_SYSTEM deletion-list ruling (prep_to_standard.py, decision-log 2026-07-24) - open owner sign-off, but its own decision doc says it blocks nothing else; soft, non-gating."],
      reminders: ["Deploy-Local.ps1 writes to a SHARED %APPDATA% Revit Addins folder — hash-check before deploying, never deploy while Revit is open (the 07-25 forensic audit found this exact guard skipped once)","\"Backed up to origin\" is not \"safe to overwrite at runtime\" — the 07-25 postmortem's core lesson; a clean worktree means committed, not complete","Core.dll co-loads in one Revit process: redeploy ALL add-ins together when Core changes"],
      links: [
        { label: "Runtime slot ledger", path: "F:\\BIMpossible-AddIns\\decision-log\\2026-07-25__runtime-slot-handoff.md" },
        { label: "2026-07-25 forensic audit (clobber + cleanup)", path: "F:\\BIMpossible-AddIns\\audits\\2026-07-25__session-audit-cleanup-stream.md" },
        { label: "T4 live-smoke results", path: "F:\\BIMpossible-Workspace\\01_BuildLog\\2026-07-25__T4-live-smoke_RESULTS.md" },
        { label: "Tool backlog", path: "F:\\BIMpossible-AddIns\\TOOL_BACKLOG.md" }
      ],
      recent: ["2026-08-30 - #111 ARCH-BIMP-PARAMSET: BIMP_IsDeliverable v1 setup + diagnostics","2026-08-30 - #110 Key Plan (Tool 20): composite resolver, dry-run preview, freeze fix","2026-08-28 - #109 ci: advisory Wave-Status PR-body check","2026-08-26 - #108 untrack _cc_build_check build-output snapshot; ignore + policy doc","2026-08-26 - #107 M-30 closed with genuine live-Revit Place Callout Sheets captures","2026-08-26 - #106 close AddIns audit residuals (HYG-12 CI subsystem, M-33, L-21, CQ-TEST-PAIR-1, ...)","2026-08-26 - #105 add-in-owned relay session lifecycle (P7-RELAY-SESSION-LIFECYCLE)","2026-08-25 - #104 file-backed DPAPI JTI replay persistence"],
      audit: {
        lastRun: "2026-08-26",
        runType: "2026-08-25 audit-closure Phase-5 build-lane pass (branch claude/audit-closure, 6 commits; push + PR + merge HELD for owner go). Closed 4 carried findings in real code: M-14 (LevelSheetTitle red->green span fix, 81c06f8), MI-17 (SheetSortKey real extraction + test replacing the documented-mirror, 81c06f8), M-33 (dedicated Place Callout Sheets ribbon icon replacing the placeholder, 1d37070), I-08 (dead decision-log cite requalified + rerouted to the HYG-23 decision-log-root owner policy, 44585d5). Also shipped, tracked elsewhere: CQ-TEST-PAIR-1 delete-failure retry test (81c06f8, carried on the BIMpossible-web card) and HYG-12 doc-reference + docs-budget gate port (0b39bcf) -- a NEW CI subsystem shipped dormant; merging the branch activates it, owner go/no-go. M-30 PARTIAL: guide steps 1+2 render byte-stable (45d04bd), step 3 (built sheets in Project Browser) routed to a documented manual live-Revit capture in CAPTURE-LIST.md -- HELD, explicitly not fabricated. Residual 1: M-30 only (held live-Revit capture; no live instance reachable this session, NOT fabricated). L-03 / L-13 / L-19 / L-21 formally ratified accept-as-designed 2026-08-25 (closed, off the board; rationale + reconsideration triggers in audit-acceptance-records_2026-08-25.md). Prior 2026-08-25 reconciliation (MI-20 + MI-19 closed) stands. Freshness debt persists: no full /audit report since 2026-07-12 -- 100+ un-re-audited commits on main.",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 11,
        trend: "CLOSED -- all 11 carried findings now closed; M-30 retired 2026-08-26 with 3 genuine live-Revit Place Callout Sheets captures merged to AddIns origin/main (PR #107 -> squash fe94288e); 0 open. Full re-audit still owed since 2026-07-12",
        reportPath: "F:\\BIMpossible-AddIns\\audits\\2026-08-22__link-pdf-to-sheets-phase0-audit.md",
        reportFile: "addins/2026-08-22__link-pdf-to-sheets-phase0-audit.md",
        ledgerPath: "F:\\BIMpossible-AddIns\\audits",
        open: [],
        history: [
          {
            date: "2026-08-26",
            type: "Final closure -- M-30 (last held finding) retired with 3 genuine live-Revit Place Callout Sheets captures.",
            scope: "Place Callout Sheets guide only: guide HTML, CAPTURE-LIST.md, 3 PNGs. No DLL, no code.",
            result: "PR #107 squash-merged fe94288e (2026-08-26T17:31:08Z), required checks green (firm-literals, test, gitleaks, nuget-vulns). Card 0 open (already reflected); estate-wide 56 -> 0. Full record: BIMpossible-Workspace/02_Reference/Audit and Scan Info/audit-closure-COMPLETE_2026-08-26.md.",
            report: "audit-closure-COMPLETE_2026-08-26.md"
          },
          { date: "2026-08-22", type: "Non-audit artifact -- Link PDF to Sheets Phase 0 current-state audit, a single-feature narrative engineering review with NO severity/ID scheme; NOT a scored /audit findings report", scope: "BIMpossible.RevitLink's Link-PDF-to-Sheets command only (drawing-area detection, grid packing, slot order, sheet targeting, ownership/persistence, rerun behavior) -- current-code + current-behavior read, no behavior changes made. Does not touch or re-examine any RevitLink command outside this one feature.", result: "6 gaps documented in prose (no IDs, no High/Med/Low tags): drawing-area detection can still misread internal geometry as an edge within its 0.40 ft cap; the grid packer is a reused generic panel/level packer with no PDF-specific engine; slot order is column-major top-to-bottom left-to-right, the exact opposite of the plan's required top-right-anchored right-to-left order; sheet targeting's reuse test is purely geometric with no ownership concept; there is zero persisted placement identity (no Extensible Storage schema, no owner tag) so the tool cannot tell its own prior placements from unrelated content; and a traced rerun scenario confirms silent duplication-by-overlap at the start sheet. Because none of this maps to the card's severity-scored ID scheme, it cannot be added to open[] or reflected in counts without inventing numbers that were never assigned -- see Strategy Decisions Ledger entry ops-1. lastRun points at this as the newest artifact on disk; the 2026-07-12 baseline's carried open[] findings (unchanged since 2026-07-14) remain untouched and still represent real freshness debt (41+ days since the last full scored code audit).", report: "2026-08-22__link-pdf-to-sheets-phase0-audit.md" },
          { date: "2026-08-08", type: "Non-audit artifact — TDD-exclusion census (ADDINS-TDD-CENSUS), a narrow deterministic test-coverage metric, NOT a findings-style /audit report", scope: "Measured `/tdd`'s red-green practical reach across all non-test .cs on main (2026-08-08 @ 5160510): 38,339 non-test LOC total. Zero code findings produced; not a re-audit and does not close or add to the open[] list below.", result: "58% Revit-bound + 11% WPF/UI = ~70% of the codebase sits outside /tdd's practical reach by design. Of the 29% that is Revit-free logic, 86% (9,773/11,399 LOC) is already wired into test assemblies -- extraction is practiced, not aspirational. The 1,626 LOC uncovered remainder has two named files worth a look: RevitLink/Commands/FamilyFixerViewModel.cs (341 LOC, largest unwired extractable file) and RevitLink/Assistant/DpapiPaneTokenStore.cs (160 LOC, pairing-token persistence -- security-relevant code with no test wiring, the census's own words: 'the least defensible entry here'). Explicitly non-actionable: 'No fixes in this pass... No target percentage is set.'", report: "2026-08-08__tdd-exclusion-census.md" },
          { date: "2026-07-25", type: "Session forensic reconstruction (NOT a /audit code report -- no scored findings)", scope: "Add-Ins + Families cleanup-stream session (2026-07-24 22:30 -> 07-25 00:10). By its own filing note this is not from the /audit pipeline and is not indexed in _audit-runs.md; it introduced zero code findings.", result: "Reconstructs a session that optimized for closure and briefly overwrote the deployed add-in with a 'main' build lacking the active glass work. Central failure: the shared single-slot %APPDATA% Revit-Addins deploy target was overwritten from 'main' for ~12 min (glass -> main -> glass), hash-verified restored (SHA-256 byte-identical); the documented hash-check-before-deploy safeguard had been skipped. Reusable lesson: 'backed up to origin' != 'safe to overwrite at runtime', and a clean worktree != complete work. No code-finding counts changed -- carried from the 2026-07-14 resolution. Canonical archived copy: BIMpossible_Workspace/02_Reference/Audit Reports/2026-07-25__session-audit-addins-cleanup-runtime-clobber.md.", report: "2026-07-25__session-audit-cleanup-stream.md" },
          { date: "2026-07-14", type: "Resolution — 8 fix commits + owner-decision pass", scope: "Every one of the 106 findings from the 2026-07-12 audit got a real decision: fixed in code (~85), disproven as a false positive (3, including the sole CRITICAL), won't-fix as verified-safe (2), deferred design (2), gated on destructive git ops (2), or postponed pending dedicated owner/polish time (~10).", result: "C-01 (the only CRITICAL) was FALSE — Revit 2024's net48 API has both ElementId.Value and ElementId(long); the audit never ran the build that would have disproven it. All 10 HIGHs genuinely fixed and code-verified (not just commit-message-claimed): H-01/H-02 (Section Clip one-shot expiry, Room Data binding refuse), H-03/H-09/H-10 (testable extraction, rollback unit-test, 18-file dead-code sweep), H-04 (SetUniqueViewName sanitizes + reports), H-05/H-06 (ScopeBox collision fix + ranked substring match — both confirmed in code with explicit 'H-05'/'H-06' comments), H-07 (ViewRenamePreview literal-mode $ escaping), H-08 (PdfPageCounter returns null, never a false 1, on ambiguous PDFs). Two false-positive side-findings: M-30 (guide is accurate, only 3 screenshots stale) and MI-12-part (2 of 4 'unwired' commands are wired on the Trades > Electrical panel, which the audit's RevitLink-only search missed). Also fixed same-day, outside the audit: Retag All Rooms orphan-tag bug (owner-caught), oversized ribbon tooltips (owner-caught), 2 theme-blind popups. What the audit did NOT catch: 'reports success, quietly did nothing' surfaced 3 more times the same day (panel-schedule legend cell, Section Clip selection path, Retag All Rooms) — the pattern the audit itself named is still live in the codebase.", report: "2026-07-12__audit-resolution.md" },
          { date: "2026-07-12", type: "Full (7 parallel review agents)", scope: "Complete top-to-bottom re-read of all active projects — RevitLink (Commands + ModelHealth + Scaffold + Shared) + ModelQA.Core + 6 discipline add-ins + 7 test suites + docs/CI; 114 commits since the 2026-06-14 baseline, ~90% of them in RevitLink.", result: "1 CRITICAL + 10 HIGH + 53 MEDIUM + 24 LOW + 18 INFO. Headline C-01: the net48 (Revit 2024) build is very likely broken (net8-only ElementId APIs unguarded in ReloadLinksCommand) and CI never builds the shipping add-in for either TFM. Recurring themes: silent-failure-reported-as-success, tested-but-dead code (3 files still certified green while unreachable in production), spec/doc-vs-code drift. Prior audit: 13 of the 2026-06-14 findings verified genuinely fixed (H-02/H-04/M-11/M-12/M-17/M-18/M-20-23 et al.). NOTE: the dashboard's earlier '2026-06-14 all-clear' was itself wrong — those findings were open then too and never ingested. Audit tab surfaces C-01 + the 10 highs as cards; the 53 medium / 24 low / 18 info are in the full report (local monitor expands them per-severity).", report: "2026-07-12__audit-report-full.md" },
          { date: "2026-07-10", type: "Code-level re-verification (not a full audit re-run)", scope: "C-01, checked against current source + build output", result: "FIXED — was actually fixed same-day back on 2026-06-14 (commit aa9e65e, Directory.Build.props sets AssemblyVersion 1.1.0.0, confirmed in build output), but the dashboard never got updated to reflect it until now. Caveat carried from the fix itself: diagnostic only (assembly isn't strong-named, so a stale DLL still isn't load-time BLOCKED, just detectable) — real mitigation is coordinated add-in redeploy, tracked separately as M-19, still open", report: "2026-06-14__audit-report-full.md" },
          { date: "2026-06-14", type: "Full (3 agents)", scope: "29 ribbon commands + ModelQA.Core + 6 discipline add-ins + 74 tests", result: "C-01 (Critical): no AssemblyVersion in Core.csproj — stale co-loaded DLL risks silent rating corruption", report: "2026-06-14__audit-report-full.md" },
          { date: "2026-06-13", type: "Tools 8-33 sweep", scope: "Tools 8-33 + punchlist", result: "Punchlist sweep across the tool suite", report: "2026-06-13__tools-8-33-audit-sweep.md" },
          { date: "2026-06-09", type: "Triple audit (google / perf / perp)", scope: "Add-Ins repo", result: "9 findings closed in remediation — CSV-injection guards ×7, culture-invariant formatting, rolling log", report: "2026-06-09__perp-audit.md" }
        ]
      }
    },
    /* PROJECT:addins:END */
    /* PROJECT:site:START */
    {
      id: "site",
      name: "BIMpossible Site",
      icon: "globe",
      oneLiner: "yourbimpossible.com — LIVE at M3. Astro 4 + Cloudflare Pages + Tailwind. Lighthouse 100/100/100/100 across all 6 pages.",
      status: "active",
      phase: "M3 LIVE: yourbimpossible.com on Cloudflare Pages; M4 SEO hardening COMPLETE (structured data, OG/Twitter cards, sitemap, CI broken-link check; Lighthouse Perf/BP/SEO/A11y 100 across all 6 pages after the 07-10 a11y remediation). All 2026-06-09 + 07-10 audit findings cleared. LinkedIn Company Page live (linkedin.com/company/bimpossible). Remaining pre-launch gaps: business infra (email aliases, social handles, LLC) and real product imagery on interior pages; M5-M6 (pricing + commercial launch) not started. HEAD 335c210 (2026-08-27).",
      focus: "Post-launch hardening + policy/compliance publishing - closing audit findings and shipping legal/data-policy pages. No active feature front.",
      progress: {
        label: "Milestones",
        phases: [
          { name: "M0-M3 Foundation + live deploy", pct: 100, note: "Unchanged — repo clean, HEAD 0594e6e (2026-07-10), deploy intact." },
          { name: "Business infra + presence", pct: 55, note: "Domain + Cloudflare live; LinkedIn live; email aliases + social handles still open (IP-Lockdown-Checklist.md unchanged since 05-27)." },
          { name: "Content + product imagery", pct: 30, note: "Copy live; interior pages still reuse the shared Hero.png backdrop — screenshot-review/*.gif captured 06-11 but never wired into product/bim-managers/leaders pages." },
          { name: "M4 SEO hardening", pct: 100, note: "Structured data (5ab26cf), OG/Twitter cards + sitemap (08aed1e/94fb4fe/25060d4), CI broken-link check (43c192c); Lighthouse Perf/BP/SEO/A11y 100 across all 6 pages after the 07-10 audit's a11y remediation (4bbe591, 0594e6e)." },
          { name: "M5-M6 Pricing + commercial launch", pct: 0, note: "No pricing/waitlist/signup page exists in site/src/pages." }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,2,0,0,0,0],
      lastActivity: {
        date: "2026-08-27",
        summary: "docs(site): correct planning-docs path AI-Dev -> F:\\BIMpossible-Site (335c210)"
      },
      branch: null, git: { latestCommit: "709f352" },
      nextActions: ["Email routing aliases: hello@/support@/legal@/billing@/zeriah@ -> Gmail (recipe in IP-Lockdown-Checklist.md Phase 1.5)","Product screenshots: get real app screenshots into Leaders + BIM Managers pages"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["Dashboard auth IDP = Google via Cloudflare Access, owner's address only (zeriah.t@gmail.com; owner-confirmed 2026-08-30, verified live in bimwatch/SETUP.md). The earlier GitHub-OAuth / OTP-email attempt was abandoned.","Product screenshots still needed on the Leaders + BIM Managers pages before M4 is fully complete -- both currently import only Hero.png, no product imagery."],
      links: [
        { label: "Roadmap index", path: "F:\\BIMpossible-Site\\00_README.md" },
        { label: "IP lockdown checklist", path: "F:\\BIMpossible-Site\\IP-Lockdown-Checklist.md" },
        { label: "Build log", path: "F:\\BIMpossible-Site\\01_BuildLog" },
        { label: "Site code", path: "F:\\BIMpossible-Site\\site" }
      ],
      recent: ["2026-08-27 - Correct planning-docs path (AI-Dev -> BIMpossible-Site)","2026-08-25 - Publish /data-policy: ratified Data Residency & Retention Policy","2026-08-25 - Close 2026-07-10 audit residuals (CONTACT-RL, TURNSTILE-HOST, CSP-STYLE) + restore nav/theme contrast","2026-06-13 - Close M1/M2/M3 + L2/L3/L6/L8 from the 2026-06-13 full site audit"],
      audit: {
        lastRun: "2026-07-10",
        runType: "Full code audit (marketing site, /audit complete) — top-to-bottom re-read of site/ + live Lighthouse across all 6 pages; verified all 13 findings from 2026-06-13 closed, then caught and same-day-fixed an a11y regression (100→95/96) from the 709f352 theme-toggle/logo change",
        cadence: "on-demand",
        counts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        trend: "stable",
        reportPath: "F:\\BIMpossible-Site\\01_BuildLog\\2026-07-10__audit-report-full.md",
        reportFile: "site/2026-07-10__audit-report-full.md",
        ledgerPath: "F:\\BIMpossible-Site\\01_BuildLog",
        closedLastRun: 13,
        open: []
      }
    },
    /* PROJECT:site:END */
    /* PROJECT:pickem:START */
    {
      id: "pickem",
      name: "Preseason Pick'em",
      icon: "trophy",
      oneLiner: "Next.js pick'em app (PreseasonPickem-app), deployed to www.preseason-pickem.com. Auth (magic-link + passkeys), scoring, and leaderboard all shipped as of 06-01 — dormant since, not \"just started.\"",
      status: "dormant",
      phase: "Shipped Next.js pick'em app (preseason-pickem.com; 26thLetter/preseason-pickem). Post-launch: audit2 hardening complete through 2026-08-04; the 2026 NFL preseason cycle has wound down. Season auto-year handling is in place for the next cycle. (Prior card text 'Dormant since 2026-06-01' was wrong - 25+ commits June->Aug.)",
      focus: "Reliability/perf polish on a shipped app (self-healing scoring, rate-limited passkey routes, font/render perf). No open feature front as of the last commit (2026-08-04); now off-season.",
      progress: {
        label: "Build",
        phases: [
          { name: "P0 Bootstrap + stack", pct: 100, note: "Unchanged." },
          { name: "P1 Auth", pct: 100, note: "Magic-link shipped + E2E-tested 05-24 (35e0fde/92edb66); 90-day session + cross-domain cookie fix + passkey/WebAuthn support added 06-01 (269deae, 62ee47e, 70ddeb1)." },
          { name: "Picks + scoring MVP", pct: 95, note: "Scoring engine, picks UI, leaderboard, draft order, and auto-lock all shipped together 05-24 (c07ed6b); manual-tiebreak, member-choice draft slots, and a bonus Draft Kit (rankings/ADP) added by 06-01. Code-complete; not yet run through a live preseason." },
          { name: "Deploy", pct: 80, note: "Vercel auto-deploys live; custom domain www.preseason-pickem.com confirmed responding (HTTP 200, re-checked 07-23). One prod build break already hit + fixed (05-31). Prod env vars / cron execution unverifiable from local files alone." }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-01", summary: "rankings (sleeper/stats/sync) + scoring (engine/leaderboard/manual-tiebreak) libs added" },
      branch: null, git: null,
      nextActions: ["Off-season maintenance only; prep for the 2027 preseason cycle (season auto-year already handled)","No work in flight - revisit before the next NFL preseason"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["NFL-preseason deadline now reached (end of Aug); the app was actively built through 2026-08-04 (draft-kit stats, audit2, self-healing scoring fix) -- confirm whether it shipped / was used for the 2026 preseason and can now go dormant."],
      links: [
        { label: "PRD", path: "F:\\AI-Dev\\Preseason Pick'em\\PRD.md" },
        { label: "Workspace index", path: "F:\\AI-Dev\\Preseason Pick'em\\WORKSPACE_INDEX.md" },
        { label: "App", path: "F:\\AI-Dev\\Preseason Pick'em\\PreseasonPickem-app" }
      ],
      recent: ["2026-08-04 - Self-healing scoring: reconcile unscored picks so a failed scoring pass recovers","2026-08-04 - audit2 hardening (phases 1-4): single Sleeper fetch + cache, rate-limited passkey routes, dead-code purge, font/render perf","2026-08-04 - Draft-kit: last-season stats in the player popup","2026-07 - Passkeys / WebAuthn login (Face ID / Touch ID / Windows Hello)","2026-07 - Perf phases 1-4: DB indexes, N+1 batching, virtualized draft-kit list"]
    },
    /* PROJECT:pickem:END */
    /* PROJECT:laundry:START */
    {
      id: "laundry",
      name: "Laundry Gig",
      icon: "box",
      oneLiner: "Next.js demo app 'Lazy' (laundry-finder): Leaflet WasherMap (OSM pins + route), commute-corridor matching, one-click demo launcher.",
      status: "dormant",
      phase: "Lazy laundry-finder demo: WasherMap (Leaflet/OSM) + matchAlongRoute commute-corridor + map-aware /dashboard/washers + one-click launcher scripts. Name locked 'Lazy' (FreshSpin scrubbed) 06-03. Local git (master), in sync with origin. Idle since 06-03.",
      focus: "Decide: resume the Lazy demo or park it explicitly. No state doc yet — git + folder only.",
      progress: null,
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-04", summary: "CLAUDE-CODE-PROMPT.md added (06-04); app scaffold (package/prisma/scripts) touched 06-01" },
      branch: null, git: null,
      nextActions: [ "Write a status note for Lazy (laundry-finder); decide resume vs explicit park" ],
      pendingDecisions: [],
      blockers: [],
      reminders: ["No state doc yet — tracked via git (master) + folder mtime. Real app exists (Lazy laundry-finder); write a status note to track it properly."],
      links: [
        { label: "README", path: "F:\\AI-Dev\\Laundry Gig\\README.md" },
        { label: "Docs", path: "F:\\AI-Dev\\Laundry Gig\\docs" }
      ],
      recent: [
        "2026-06-03 - Locked 'Lazy' as the real name (FreshSpin placeholder scrubbed); one-click demo launcher scripts (9a8defd)",
        "2026-06-01 - Map-aware /dashboard/washers with commute filter; Leaflet WasherMap (OSM pins + route line); matchAlongRoute corridor matching"
      ]
    },
    /* PROJECT:laundry:END */
    /* PROJECT:families:START */
    {
      id: "families",
      name: "Families by BIMpossible",
      icon: "cube",
      oneLiner: "AI-assisted Revit family workflow (multi-repo: Families-by-BIMpossible \"brain\" + BIMpossible-AddIns \"hands\"). Single source of truth is ROADMAP.md: 3 numbered phases (close the RevitLink gap / family-creation geometry primitives / MCP copilot) + a 4th ribbon-button thread + the independent per-family rollout.",
      status: "active",
      phase: "Multi-repo AI-assisted Revit family workflow: Families-by-BIMpossible (Python 'brain' - planner/verifier/harness) + BIMpossible.RevitLink (C# 'hands'). Phase 1 (family-editing pipe ops) ~90%: the Family Fixer ribbon button shipped (AddIns #25, 2026-07-25, additive-only v1). Phases 2 (family-creation geometry, Option B) and 3 (wrap RevitLink as an MCP server, Option C) not started. ROADMAP.md (repo root) is the source of truth; last substantive roadmap move ~2026-07-26.",
      focus: "No active family-workflow dev front right now - commits since late July are cross-repo path modernization (anchoring to F:\\BIMpossible*), not phase-moving. The live frontier when work resumes is closing Phase 1: port wire_nested_params and live-rehearse go_single_panel (the one destructive op never run against a real .rfa).",
      progress: {
        label: "Roadmap (ROADMAP.md)",
        phases: [
          { name: "Phase 1 — close the RevitLink method gap", pct: 90, note: "Live rehearsal ran 07-22 against Revit 2026: probe_family ✅, add_shared_params ✅ (byte-identical wire contract), add_family_params ✅ (stamp+verify clean). go_single_panel — the one destructive op — NOT exercised; the roadmap calls this the real remaining risk, not wire_nested_params (still unported, but additive/low-risk by comparison). Judgment model corrected: gold-master comparison retired for a user-authored family-standard.json (verify_standard.py + dependents realigned, PR #7)." },
          { name: "Phase 2 — family-creation geometry primitives", pct: 0, note: "NOT STARTED — zero methods built, no schema written, no prototype run. Blocked on open questions in ROADMAP.md: who writes the C#, and sequencing against Phase 1/the button thread." },
          { name: "Phase 3 — wrap RevitLink as an MCP server (live copilot)", pct: 0, note: "NOT STARTED. Gained real findings (07-26): Autodesk's own Revit Public MCP Server (Tech Preview) + in-product Assistant GA (Revit 2027.2) are read-only today but pointed at writes, and notably don't cover family editing — narrows this phase's scope to family-editing + the safety model specifically. New dependency: reconcile with BIMpossible_Workspace's separate \"Phase 16 — Desktop Orchestration Hub\" ledger proposal (same MCP-first direction, different repo) before scoping further." },
          { name: "Fourth thread — Revit ribbon button (not one of the 3 phases)", pct: 95, note: "MERGED (Add-Ins PR #25, 2026-07-25) — flipped from \"code-complete pending Gate B\" to shipped. Glass-themed same window (Add-Ins 6c9a139). Live-Revit click-through and icon sign-off are still owed but non-blocking." },
          { name: "Family Fixer per-family rollout (independent of the 3 phases)", pct: 20, note: "Unchanged this window — PHASE1_FAMILY_CHECKLIST.md untouched since before 07-24. PANEL done (gold master); CB/MTR/DISC SW/XFMR+ALT1 mid-flight; MV CB blocked on a scope decision; ~40 annotation-only symbols queued for batch rename." }
        ]
      },
      activity: [1,0,0,0,1,0,2,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-08-24",
        summary: "Migrate Evidence Compiler hook to Python-native hardened launcher (#11) (72e53d5)"
      },
      branch: "main",
      nextActions: ["Close Phase 1: port wire_nested_params; live-rehearse go_single_panel","Resolve the 5 ROADMAP open questions gating Phase 2/3 start","Reconcile the two overlapping MCP efforts (this roadmap's Phase 3 vs the AddIns Desktop Orchestration Hub proposal) before ratifying either","Owner sign-off on the prep_to_standard.py Power-System deletion list (shared with the addins card)"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["ROADMAP.md (repo root) is the single source of truth for this whole multi-repo effort — update its status lines whenever a phase moves, in whichever repo/session does the moving","Multiple sessions/worktrees can work this roadmap in parallel for source edits, but Deploy-Local.ps1 writes to a SHARED %APPDATA% Revit Addins folder, last-writer-wins — only one session may hold the deploy target (mid-rehearsal/mid-deploy) at a time"],
      links: [
        { label: "Roadmap (single source of truth)", path: "F:\\BIMpossible-Families\\ROADMAP.md" },
        { label: "Tool README", path: "F:\\BIMpossible-Families\\README.md" }
      ],
      recent: ["2026-08-24 - Migrate Evidence Compiler hook to a Python-native hardened launcher","2026-08-22 - chore(paths): batch B5 - tool scripts + Family-Fixer How-To -> F:\\BIMpossible-Families","2026-08-22 - chore(paths): final-root cutover, anchor to F:\\BIMpossible* (Phase D)","2026-07-26 - docs(roadmap): add Autodesk MCP/Assistant platform findings to Phase 3","2026-07-25 - Family Fixer ribbon button merged (AddIns #25); rehearsal partial"]
    },
    /* PROJECT:families:END */
    /* PROJECT:aiserver:START */
    {
      id: "aiserver",
      name: "AI-Server",
      icon: "cube",
      oneLiner: "Portable, fully-local LLM inference + automation platform. Dev on the RTX 5080 now; relocates to a dedicated RTX 3090 box by one .env line (OLLAMA_HOST).",
      status: "active",
      phase: "Platform build past scaffold: Waves 1-3 landed (WP-A core lib, WP-B RAG/sqlite-vec, WP-C automation suite, WP-D1 status helper, WP-F eval harness; PRs #1-#9). Repo live + private (YourBIMpossible/AI-Server); main at 6ff31ad (2026-08-22). Now a config/docs-tuning phase - no new subsystem code since June; recent commits are spec + config only. Dev on the RTX 5080; WP-E serving/ops + WP-G advanced deferred to the 3090-box relocation.",
      focus: "PDF pickup checker (Milestone 1) - design spec + implementation plan written 2026-07-25, not yet built. RAG source roots repointed at F:\\BIMpossible-Workspace.",
      progress: {
        label: "Work packages",
        phases: [
          { name: "Foundation", pct: 100, note: "Repo + CI (pytest 3.10-3.12 green) + branch protection (PR+CI gate) + portable scaffold + smoke + first automation." },
          { name: "WP-A Core library (aiserver)", pct: 100, note: "Merged PR #1 (06-17); hardened (CLIENT-2, CONFIG-1/2) in f37d165 (07-12); covered by the 131-pass suite." },
          { name: "WP-B RAG / knowledge", pct: 100, note: "Merged PR #2 (06-17); ingest/query/drift/store/chunk shipped; hardened (RAG-1,2,4,5,6) in f37d165." },
          { name: "WP-C Automation suite", pct: 100, note: "Merged PR #3 (06-17); framework + daily_digest + weekly_rollup + decision_drift + Windows task registration shipped; hardened (AUTO-2,6) in f37d165." },
          { name: "WP-D Dashboard + integration", pct: 90, note: "D1 live (this card, merged PR #5, 06-17). D2 built + enabled in PC-Monitor. D3 --engine flag built in AI-Brain-Data; only the owner's G:-hosted SKILL.md cutover remains." },
          { name: "WP-F Eval harness", pct: 100, note: "Merged PR #4 (06-16); cases/run/report/baseline/scoring shipped; hardened (EVAL-1..5) in f37d165." },
          { name: "Dictation-cleanup proxy", pct: 90, note: "OpenWhispr dictation-cleanup proxy shipped (3c4d4e6) and hardened (DP-1..7 in f37d165). No activity since 07-10." },
          { name: "PDF pickup checker (new, unmerged)", pct: 60, note: "Automates \"did every redline get addressed\" QA on reissued drawing sets — compares only markup-anchored regions (not full-sheet diffing), and only ever claims a region changed/unchanged, never that a redline was \"addressed\" (a human judgment) — enforced structurally via a MaxClaim field. M1 detection core: 14/14 planned tasks built, 67/67 tests pass, CLI works end-to-end for annotation-form markups. BUT the spec's own ship gate (4/4 golden-set gates pass on real labeled data, §13) is unmet — zero labeled golden-set jobs exist, 3/4 gates report \"no data.\" Code sits on an unmerged worktree-pickup-checker branch, not main." },
          { name: "WP-E/G Ops, advanced", pct: 15, note: "No Caddy/tailscale/docker-healthcheck yet; advanced/ absent on main. A separate worktree-harness branch (7/8 WP-G2-adjacent tasks done) remains unmerged, unchanged since 07-12. WP-G's local-coding-agent line item landed for real (07-25, docs still uncommitted on main): opencode wired to this box's Ollama endpoint, verified end-to-end (Glob->Read->Edit, file change hash-confirmed on disk) on qwen3-coder:30b-a3b — qwen2.5-coder:14b can't drive an agent loop (returns tool calls as text, tool_calls stays empty). Standalone tool outside the aiserver/ package (host/model hard-coded, not .env-driven); manual desktop-shortcut start/stop only, no autostart." }
        ]
      },
      activity: [1,0,0,0,4,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-08-22",
        summary: "chore(rag): rag_sources Workspace root → F:\\BIMpossible-Workspace (census 19 B8) (6ff31ad)"
      },
      branch: "main at f37d165",
      nextActions: ["Build the PDF pickup checker M1 (spec + plan committed 2026-07-25)","WP-E serving/ops + WP-G advanced - deferred to the 3090-box relocation","Rework the opencode launcher onto the .env contract (hard-coded host/model breaks the portability contract) before relocating"],
      pendingDecisions: ["3090 box OS (Ubuntu Server vs Windows) still undecided; runtime-now settled on Ollama (validated), vLLM deferred. Box unassembled -- gated on WP-A/B/C validating on the 5080."],
      blockers: [],
      reminders: ["3090 box not assembled yet -- dev on the 5080; relocates via one .env line (OLLAMA_HOST).","Full code-audit PR #9 (06-18) findings closed; the 07-12 incremental audit is also fully closed, suite green (07-12 committed report: 83 passed; count higher now, not re-pinned in a committed report)."],
      links: [
        { label: "Program plan", path: "F:\\AI-Dev\\AI-Server\\PROGRAM_PLAN.md" },
        { label: "Handoffs (WP-A..G)", path: "F:\\AI-Dev\\AI-Server\\handoffs" },
        { label: "Build/hardware plan", path: "F:\\AI-Brain-Data\\_status\\AI-Server_Build_and_Integration_Plan.md" },
        { label: "GitHub repo", path: "https://github.com/YourBIMpossible/AI-Server" }
      ],
      recent: ["2026-08-22 - RAG rag_sources.txt root repointed to F:\\BIMpossible-Workspace","2026-08-18 - Gate PR CI on draft status for cost control (#10)","2026-08-08 - Document the opencode local coding-agent (WP-G piece)","2026-07-25 - PDF pickup checker: design spec + implementation plan","2026-07-12 - Resolve the 2026-07-12 audit findings + carried mediums (suite green)","2026-07-10 - OpenWhispr dictation-cleanup reliability proxy"],
      audit: {
        lastRun: "2026-07-12",
        runType: "Incremental (regression-check on the four claimed high fixes + fresh review of the new OpenWhispr dictation-cleanup proxy) then same-day remediation — the 11 findings it raised were all fixed in f37d165; pytest 131 passed post-fix",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 11,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\AI-Server\\audits\\2026-07-12__audit-report.md",
        reportFile: "aiserver/2026-07-12__audit-report.md",
        ledgerPath: "F:\\AI-Dev\\AI-Server\\audits",
        open: [],
        history: [
          {
            date: "2026-07-12",
            type: "Incremental (regression-check on the 4 claimed high fixes + fresh review of the new dictation-proxy subsystem) + same-day remediation",
            scope: "2 commits since the 2026-06-18 cutoff — c82c674 (high-fix) + 3c4d4e6 (new OpenWhispr dictation-cleanup proxy); the report was committed as 7c8a09c, then all 11 findings it raised were fixed in f37d165 the same session",
            result: "Raised 11 (0 crit / 0 high / 5 medium / 4 low / 2 nit), all remediated same-day in f37d165 — now HEAD, pushed, tree clean; suite green at 131 passed (up from 83). Regression check first confirmed CLIENT-1/RAG-1/XC-1 genuinely fixed (PCMON-1 fixed in the separate PC-Monitor repo). Then the fix pass closed everything this run raised: EVAL-3-REG (rubric term → the full 'ZeroDivisionError'), DP-1 (answer-detection now requires the text to have shed the input's own vocabulary, not a bare substring), DP-2 (except OSError → _fallback_response, + _forward_raw), DP-TESTS (proxy tests 17→33), CLIENT-2 (json.load wrapped ValueError→LLMError), plus the low/nit tail — EVAL-EMPTY empty-term guard, DP-3 port-bind probe, DP-4 Authorization forwarded, DP-6 DICTATION_PROXY_PORT in .env, DP-7 daemon_threads.",
            report: "2026-07-12__audit-report.md"
          },
          {
            date: "2026-06-18",
            type: "Full (11 reviewers + adversarial verification, 105 agents)",
            scope: "AI-Server full codebase + PC-Monitor/AI-Brain-Data WP-D touchpoints — ~45 source/test files + 8 strategy/handoff docs across 3 repos",
            result: "Silent-wrong-output on error/misconfig edges (0 critical / 5 high): PCMON-1 topproc() reports the wrong process and can suppress GPU-VRAM alerts; XC-1 README's primary onboarding step installs a scheduled task that produces no digest; CLIENT-1 HTTP client masks real server errors behind a misleading endpoint-unreachable message",
            report: "2026-06-18__audit-report-full.md"
          }
        ]
      }
    },
    /* PROJECT:aiserver:END */

    /* PROJECT:ai-brain-data:START */
    {
      id: "ai-brain-data",
      name: "AI Brain Data",
      icon: "brain",
      oneLiner: "Personal knowledge base and context store for AI/BIM work — Obsidian vault, Revit-AI context logs, decision records, and the source corpus for AI-Server's RAG pipeline.",
      status: "active",
      phase: "Local-only git repo (no GitHub remote). HEAD advanced 8e8b564 -> 7d1b22b (2026-08-22): first Revit-AI journal-pipeline data commit - raw journals, processed daily/weekly summaries, context store, plus collect_revit_journals.py. Working tree dirty (untracked raw-logs through 2026-08-29).",
      focus: "Revit-AI journal pipeline: automated journal collection -> daily/weekly summaries -> context store, staged 'pre AI-Dev extraction' before moving into the AI-Dev estate.",
      progress: {
        label: "Workstreams",
        phases: [
          { name: "Vault foundation", pct: 95, note: "Obsidian vault live; 12 MOCs + decision-log + standards-and-refs populated (post-graphify baseline, 8e8b564, 06-28). revit-snippets/ folder exists but is empty — 0 files, never populated despite earlier claims." },
          { name: "Revit-AI context pipeline", pct: 80, note: "Capture + parsing + daily/weekly summarization fully automated and running (raw-logs through 07-22; last processed run 07-18, 42 sessions, 0 issues). Collector rewritten to fix an overwrite/data-loss bug (collect_revit_journals.py, uncommitted). Ingestion into AI-Server still not built — blocked upstream: AI-Server hardware not yet assembled." }
        ]
      },
      activity: [0,0,0,0,1,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-08-22",
        summary: "Revit-AI pipeline data through 2026-08-23 (raw-logs, processed, daily-summaries, context) — pre AI-Dev extraction (7d1b22b)"
      },
      branch: "master (local-only, no remote)",
      git: { warn: "No GitHub remote — local-only git. Confirm whether this should stay private or get a private remote for backup." },
      nextActions: ["Extract the Revit-AI pipeline out into AI-Dev (the intended next move per the commit message)","Commit or clear the dirty tree (untracked 2026-08-29 raw-logs)","Decide remote posture - still no GitHub remote / no offsite backup"],
      pendingDecisions: [
        "Should AI-Brain-Data get a private GitHub remote for offsite backup?"
      ],
      blockers: [],
      reminders: ["Churn resolved -- committed 2026-08-22 (data through 08-23), only ~4 files uncommitted now. The live risk is now that the repo is still local-only (no remote); the offsite-backup gap in the pending decision is the real exposure."],
      links: [
        { label: "Local vault", path: "F:\\AI-Brain-Data" },
        { label: "Revit-AI context", path: "F:\\AI-Brain-Data\\Revit-AI\\context" }
      ],
      recent: ["2026-08-22 - Revit-AI pipeline data through 2026-08-23 (raw-logs, processed, daily-summaries, context); adds collect_revit_journals.py","2026-06-28 - Normalize line endings","2026-06-28 - Remove Zai-brain embedded repo, add to gitignore","2026-06-28 - Post-graphify baseline: 70 notes enriched, 12 MOCs created"]
    },
    /* PROJECT:ai-brain-data:END */

    /* PROJECT:bimpossible-workspace:START */
    {
      id: "bimpossible-workspace",
      name: "BIMpossible Workspace",
      icon: "folder",
      oneLiner: "Strategy docs, build logs, prompts, diagrams, and the cross-repo /next state store that drive and reconcile the BIMpossible platform build.",
      status: "active",
      phase: "main synced with origin (through PR #104, e6b0684, 2026-08-30). Recent work is audit-estate closeout and ops records, not feature code: the 56-finding cross-repo estate closed 56->0 (audit-closure-COMPLETE + closeout evidence ledger, 2026-08-26/27), the authz-enforcement rollout recorded COMPLETE, out-of-estate closeout COMPLETE, and continuous /next queue reconciliation (watermarks bimpossible #498, addins #111). Several 2026-08-26 audit/decision docs sit untracked in 03_Audits / 01_BuildLog pending an intentional commit. Sources of truth unchanged: 00_Strategy/BIMpossible_PHASE-STATUS.md, WAVE-STATUS.md, STATE-LIVE.md.",
      focus: "Cross-repo /next state store as source of truth: reconciling the queue against BIMpossible + Add-Ins landings, promoting items landed->live with runtime evidence, and closing the estate-56 audit arc. Heavy state-sync + audit-record cadence.",
      progress: {
        label: "Content areas",
        phases: [
          { name: "Strategy + ledgers", pct: 90, note: "Ecosystem research harvested into decision ledgers: eco-3 (generic-PM exclusion) ratified; eco-4 (annotation automation) denied, moved to reopenable Watchlist FG-R3; eco-5 (Phase 10 portfolio guardrail) extended w/ a Speckle competitive comparison, still \"researching\"; eco-7 (MCP scope) corrected researching→approved (f5c7a5a, 1cd954a — latter unpushed, active session). PHASE-STATUS/STATE-LIVE hand-updated same day for Phase 13 T4 + Phase 15." },
          { name: "Repo hygiene + workflow guardrails", pct: 92, note: "Structure-sprawl audit closed \"sprawl reaches ZERO,\" independently re-verified in a second pass that also found+cleaned 6 stale remote refs (5f27190, 8061e1a, 7604960, 20d505d, cde8c5b, all 07-24). 2026-07-25 session forensic audit filed after a runtime clobber during Add-Ins/Families cleanup — glass build briefly overwritten by main, hash-verified restore, since fully reconciled (see the addins card). Prod auth verified working 07-25 + a 3-minute regression recipe written (5c63239)." },
          { name: "Design proposals + architecture", pct: 88, note: "design-docs/ grew 13→16 files: Phase 13 T4 \"Apply BIMpossible Changes\" plan + reality-check + self-contained handoff doc (2bea7ec, cd19fc5, b835120); a new Task 6 edit-log-contract plan (untracked, active session). Write-engine type-param design brief added (1cd954a). Open-in-Revit cross-browser UX plan explicitly PARKED, not to be implemented (f3d6fd4)." },
          { name: "Prompts + skills", pct: 85, note: "Unchanged this window — zero .claude/ commits since 07-22. Flagging rather than silently correcting: on-disk today shows 3 skills / 5 agents / 7 commands, not the 6 skills this note previously claimed — that discrepancy's origin is unverified." }
        ]
      },
      activity: [3,0,9,8,7,5,13,5,2,5,0,0,15,10],
      lastActivity: {
        date: "2026-08-31",
        summary: "state(queue): queue the two gitleaks findings surfaced by the 2026-08-31 mirror push (dff02ea)"
      },
      branch: "main at ae4b7af; synced with origin",
      git: null,
      nextActions: ["Work the queue items surfaced 2026-08-30: KEYPLAN-LIVE-WRITE, CI-LOCALFIRST, CCBUILD-UNTRACK","Commit/settle the ~8 untracked authz-enforcement + out-of-estate closeout docs in 01_BuildLog/ and 03_Audits/ (incl. one .draft.md)","Deploy the Wave-Status PR-body-check handoff (advisory-only, deploy pending)","Resolve the flagged Add-Ins/RevitLink audit-reconciliation gap (ops-1)"],
      pendingDecisions: ["Ratify eco-5 (Phase 10 portfolio guardrail) -- Speckle comparison done 2026-07-25, the ledger still marks it \"researching\"; awaiting owner ratification."],
      blockers: [],
      reminders: ["2026-07-25 session forensic audit (`02_Reference/Audit Reports/2026-07-25__session-audit-addins-cleanup-runtime-clobber.md`) is a process/custody postmortem, not a code-quality `/audit` report — it won't appear in `_audit-runs.md` and its findings live in narrative fields on the addins/families cards, not in any audit finding-count","Decision ledger for ecosystem research: 00_Strategy/Dashboard/strategy_decisions_ledger.md (eco-N items)"],
      links: [
        { label: "Local workspace", path: "F:\\BIMpossible-Workspace" },
        { label: "Phase status", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_PHASE-STATUS.md" },
        { label: "Wave status", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md" },
        { label: "GitHub", path: "https://github.com/YourBIMpossible/BIMpossible_Workspace" }
      ],
      recent: ["2026-08-30 - Add-Ins sync: PARAMSET landed (#111 -> 60ebeb1); watermark bump + 3 new queue items","2026-08-30 - Queue promotions to live: FIRM-ALIAS-BACKEND, P6-CLIENTMGMT-F (two-firm synthetic smoke), RESOLVE-BIND-1","2026-08-30 - P15D live-write demo closeout (#103)","2026-08-27 - Audit closeout: app.yourbimpossible.com availability resolved (#98/#100)","2026-08-26 - M-30 closed, estate 56->0, final closure COMPLETE (#96)","2026-08-25 - Phase 7 row -> LIVE (supervised cutover PASS)","2026-08-24 - Evidence Compiler hook migrated to a Python-native launcher (#90)"]
    },
    /* PROJECT:bimpossible-workspace:END */

    /* PROJECT:dashboard-auto:START */
    {
      id: "dashboard-auto",
      name: "Dashboard (Auto Clone)",
      icon: "refresh",
      oneLiner: "Automation-dedicated clone of the ai-dev-dashboard repo. The scheduled refresh pipeline (sync_*.py scripts, GitHub Actions sync) commits directly here; F:\\AI-Dashboard\\Dashboard is the human-edit copy.",
      status: "active",
      phase: "main branch, same remote as Dashboard (YourBIMpossible/ai-dev-dashboard) — both clones now in sync with origin (confirmed 2026-07-23, HEAD a571627). The 2026-06-28 10-commit fast-forward lag is long resolved; the scheduler runs the 06:00 daily refresh from THIS clone via Task Scheduler, confirmed landing pushes 07-19 through 07-23. The local dashboard monitor (:8081 live-server + 2min loop) was REMOVED 2026-07-21 (e1aae72) after repeatedly dying into a silently-stale orphan state — refresh is now scheduled-or-on-demand only (Refresh-Now.cmd).",
      focus: "Running the scheduled dashboard refresh + live billing sync + bimwatch daily collection on cadence.",
      progress: {
        label: "Automation pipeline",
        phases: [
          { name: "Sync scripts", pct: 90, note: "sync_activity.py, sync_ledgers.py, sync_dashboard.py, usage_sync.mjs, codebase_sync.mjs, agents_sync.mjs, github_actions_sync.mjs, graph-metrics.js all present and running daily. codebase_sync.mjs joined the scheduled run 2026-07-21 (c9ffc30), ending a 6-week-frozen Codebase tab; graph-metrics.js became ledger-self-owned the same day (9e6f7e6)." },
          { name: "GitHub Actions deploy", pct: 90, note: "deploy.yml → Cloudflare Pages confirmed live (ai-dev-dashboard.pages.dev, HTTP 200, run logs green 2026-07-23) + github-actions-live.yml billing sync. A second, unconfigured GitHub Pages auto-build also serves the same content in parallel (yourbimpossible.github.io/ai-dev-dashboard) — nobody deliberately set this up." },
          { name: "Refresh model", pct: 100, note: "Local :8081 monitor (120s loop, live-server) REMOVED 2026-07-21 (e1aae72) after repeatedly dying into a silently-stale orphan. Now scheduled-only (Task Scheduler daily 06:00 → Dashboard-auto) + on-demand (Refresh-Now.cmd); 5/5 daily pushes confirmed landing 07-19..07-23." }
        ]
      },
      activity: [3,3,3,8,11,4,5,20,6,3,4,3,17,7],
      lastActivity: {
        date: "2026-08-31",
        summary: "fix(refresh): commit PHASE_DAG.md, the second phase_dag.py output (#9) (0e8a658)"
      },
      branch: "main at a571627; both Dashboard and Dashboard-auto in sync with origin",
      git: null,
      nextActions: ["None manual - automation self-drives; uncommitted changes fold into the next scheduled commit"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["Two independently-live copies of this dashboard exist: Cloudflare Pages (deliberate, deploy.yml) and GitHub Pages (incidental, unconfigured default for a public repo) — both served identical content as of 2026-07-23"],
      links: [
        { label: "Auto clone folder", path: "F:\\AI-Dashboard\\Dashboard-auto" },
        { label: "GitHub repo", path: "https://github.com/YourBIMpossible/ai-dev-dashboard" }
      ],
      recent: ["2026-08-30 - Scheduled refresh ran twice (06:00 + 17:15) + live billing sync + bimwatch collection","2026-08-26 - M-30 audit milestone closed on the board (estate 56->0, add-ins 1->0 open)","2026-08-25 - Phase-7 acceptance ratified on the board","2026-06-28 - Harden the automation refresh path"]
    },
    /* PROJECT:dashboard-auto:END */

    /* PROJECT:pc-monitor:START */
    {
      id: "pc-monitor",
      name: "PC Monitor",
      icon: "monitor",
      oneLiner: "Fully-local workstation monitoring stack for the Ryzen 9 9950X3D + RTX 5080 rig. Python collector → SQLite; zero-dependency web dashboard with live view + historical scrubbing. No cloud, no telemetry.",
      status: "dormant",
      phase: "Git-initialized as of 2026-07-12 (3 commits, dd1bb9d baseline → bb97b0c) — the \"no git\" era ended. Python collector (collector.py) + Flask web app (app.py) + SQLite (db.py). Actively logging: metrics.db-shm mtime 2026-07-22. Packaged as a Windows-native install (install-task.ps1 → Task Scheduler; desktop shortcut at http://127.0.0.1:8787).",
      focus: "Idle since audit-resolution. No active thread; last work closed the 2026-07-12 audit.",
      progress: {
        label: "Features",
        phases: [
          { name: "Core monitoring", pct: 95, note: "Operational; audited 2026-07-12 (3 proven HIGH bugs fixed + live-smoke-verified, not just mocked); 29 automated tests pass; collector confirmed actively logging through 2026-07-22." },
          { name: "Packaging", pct: 35, note: "PC-Monitor.spec (PyInstaller config) present, but no dist/build/zip exists anywhere in the repo as of 2026-07-23 — the earlier packaged zip is gone since the 07-12 audit; portable install currently unverifiable." },
          { name: "AI-Server integration", pct: 60, note: "sources/ollama.py (Ollama HTTP-API polling: model+VRAM, endpoint up/down, unload tracking) built, README-documented, unit-tested, and enabled=true in config.json — actively collecting on this rig now. Not yet deployed to a standalone 3090 AI-Server box (hardware not assembled)." }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-07-12",
        summary: "Record resolution of the 2026-07-12 audit findings in the report itself (bb97b0c)"
      },
      branch: "main",
      git: { latestCommit: "bb97b0c" },
      nextActions: ["Rebuild the packaged .exe/.zip from post-audit source - current artifacts (2026-06-17) predate all 3 commits","No open code work otherwise"],
      pendingDecisions: ["PC-Monitor git-init is done (3 commits); pushing to a private remote is not -- no remote configured."],
      blockers: [],
      reminders: ["Git exists (since 07-12, 3 commits) -- update any doc/dashboard text still saying \"no git\".","A packaged build now exists but lives OUTSIDE the repo (F:\\PC-Monitor\\PC-Monitor.exe + _internal\\, and F:\\PC-Monitor-app.zip) -- not committed or tracked in the source repo."],
      links: [
        { label: "Local app", path: "F:\\AI-Dev\\PC-Monitor" },
        { label: "Live dashboard", path: "http://127.0.0.1:8787" },
        { label: "README", path: "F:\\AI-Dev\\PC-Monitor\\README.md" }
      ],
      recent: ["2026-07-12 - Git-initialized (3 commits): baseline + resolve all HIGH/MEDIUM/LOW findings from the 2026-07-12 audit + record resolution","2026-06-25 - Last pre-git local modification"],
      audit: {
        lastRun: "2026-07-12",
        runType: "Incremental (mtime-scoped since 2026-06-17; /audit skill, senior reviewer persona) + same-day remediation",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 6,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\PC-Monitor\\audit\\2026-07-12__audit-report.md",
        reportFile: "pc-monitor/2026-07-12__audit-report.md",
        ledgerPath: "F:\\AI-Dev\\PC-Monitor\\audit",
        open: [],
        history: [
          {
            date: "2026-07-12",
            type: "Incremental (mtime-scoped; senior reviewer persona) + same-day remediation",
            scope: "Files changed since 2026-06-17 by mtime (repo had no git history; a dd1bb9d baseline was committed first as a rollback point). Reviewed app.py/collector.py/server.py/notifier.py + the new Ollama & OpenWhispr telemetry sources and their first-ever tests; cross-checked unchanged db.py/sensors.py/events.py",
            result: "Raised 3 high / 2 medium / 2 low, then remediated all of them same-day in d3938b9: a proven ConnectionAbortedError crash on client disconnect (server.py — an in-repo crash dump was the evidence), duplicate hot-hardware alerts after the seen-set clears (now a FIFO-capped OrderedDict), and the series() DB-connection leak on the 6s-polled /api/series. 29 tests pass (11 new); server live-smoke-tested including the path-traversal guard via curl --path-as-is. MED-5 (OpenWhispr '!= completed' error assumption) was investigated and dismissed — the real transcriptions.db holds only completed/failed with no in-flight status, so the original code was already correct. Zero open after this cycle.",
            report: "2026-07-12__audit-report.md"
          },
          {
            date: "2026-07-10",
            type: "Code-level re-verification (not a full audit re-run)",
            scope: "All 10 open findings, checked against current source; H-01 additionally verified empirically against real path-traversal attack strings",
            result: "8 of 10 FIXED: all 4 Criticals (C-01 routes sensor data through the existing extra JSON column; C-02 now uses persistent _data_root; C-03's methods are now @staticmethod; C-04 has an import guard), plus H-01 (path traversal — confirmed fixed via realpath+prefix-check, tested against 7 attack strings including drive-absolute and encoded traversal, all correctly rejected), H-02 (settings race — module-level lock added), H-04 (unbounded set — capped at 5000). H-05 fixed too, but the SAME refactor that fixed it introduced a NEW bug in the same function (see AI-Server's PCMON-1 finding — topproc()'s comparison got dedented out of the loop, so it now reports the wrong process and can UnboundLocalError on an empty sample). H-03 and H-06 are genuinely partial, not closed — downgraded from Critical/6-High to reflect only what's actually still open",
            report: "2026-06-17__audit-report-full.md"
          },
          {
            date: "2026-06-17",
            type: "Full (/audit skill, senior reviewer persona)",
            scope: "Whole codebase — sensors.py, collector.py, db.py, server.py, notifier.py, app.js; no test suite exists",
            result: "Three Criticals silently discard data — fan/voltage readings never reach the DB (C-01), settings writes land in the PyInstaller temp dir and vanish on restart when frozen (C-02), and build_summary() passes None as self (C-03) — plus a 4th where an unconditional ollama import can crash the collector (C-04) and a HIGH path-traversal hole in the static file handler (H-01)",
            report: "2026-06-17__audit-report-full.md"
          }
        ]
      }
    },
    /* PROJECT:pc-monitor:END */

    /* PROJECT:bimpossible-tests:START */
    {
      id: "bimpossible-tests",
      name: "BIMpossible Tests",
      icon: "check",
      oneLiner: "Personal testing vault (Obsidian) for manually walking through BIMpossible phase/wave smoke tests. Human-executed verification checklist organized per project and phase.",
      status: "dormant",
      phase: "No git — local Obsidian vault (~12 files). One note per project under Projects/, each with ## Phase headings and checkbox steps. Dashboard view (_Dashboard.md) surfaces only unchecked next steps. Last modified 2026-06-24.",
      focus: "Run manual smoke tests after each BIMpossible deployment. Refresh vault by re-reading per-repo runbooks after any major merge.",
      progress: {
        label: "Coverage",
        phases: [
          { name: "Vault setup", pct: 100, note: "Unchanged — Obsidian vault, Tasks plugin, _Dashboard, _Phase-Test-Template intact." },
          { name: "Active test coverage", pct: 10, note: "0/51 checkboxes ever checked across all three project notes (Web App 0/25, Families 0/15, Add-Ins 0/11); zero files touched in 29 days (no git). Notes are frozen at a 2026-06-24 snapshot predating P7's 42%, P8 Wizard going LIVE (07-22), and P11/P11.1 shipping LIVE — none of that is reflected here." }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-06-24",
        summary: "Local modification (no git)"
      },
      branch: "N/A — local only, no git",
      git: null,
      nextActions: ["Refresh test notes against current shipped work: P8 Wizard (LIVE 07-22), P11 QA (SHIPPED LIVE), P11.1 Coordination Report (SHIPPED LIVE, 95%) — vault has zero coverage of any of these"],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Open vault in Obsidian with Tasks plugin enabled for _Dashboard to work",
        "refresh-tests.py is superseded — re-read per-repo runbooks manually instead"
      ],
      links: [
        { label: "Test vault", path: "F:\\BIMpossible-Tests" },
        { label: "Dashboard view", path: "F:\\BIMpossible-Tests\\_Dashboard.md" }
      ],
      recent: [
        "2026-06-24 — last local modification"
      ]
    },
    /* PROJECT:bimpossible-tests:END */
  ]
};
