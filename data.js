// F:\AI-Dev project dashboard data (schema v4 - tasks added to phases)
// AUTO (daily 06:00 refresh from the Dashboard-auto clone): phases+waves from the BIMpossible
//   ledgers (sync_ledgers.py, no LLM); activity+lastActivity from git (sync_activity.py).
// MANUAL / on-demand: prose fields (phase, focus, oneLiner, recent, nextActions, branch, audit).
//   The GitHub-Models prose bot has no trigger on the code repos, so prose only moves on an
//   on-demand "refresh dashboard" pass and goes stale between passes. See REFRESH-SPEC.md.
window.DASHBOARD_DATA = {
  generated: "2026-08-22",
  generatedBy: "scheduled refresh",
  activitySince: "2026-08-09",
  projects: [
    /* PROJECT:bimpossible:START */
    {
      id: "bimpossible",
      name: "BIMpossible Platform",
      icon: "layers",
      oneLiner: "Discipline-neutral BIM data platform above Autodesk's tools (reads ACC, custom interface, write-back later).",
      status: "active",
      phase: "main at 751155f, 0 ahead of origin. Phase 3.10a (Cross-Model Room Join) is now fully unconditional — the rollout flag deleted (#244) — while 3.10b (Doors) advances fast: D0's two-pass probe against real electrical models found zero ambiguous cases (#250), then D1 shipped boundary-element resolution so doors resolve to the room PAIR they separate, not a single room (#253). Phase 13 (Write Engine) cleared its first real gate: Increment 1 (typed values) shipped backend+Add-Ins lockstep and passed live Revit smoke 8/8 (see focus) — Increment 2 is now unblocked. The three long-parked draft PRs from mid-July finally merged 07-21/22: #186 (Phase 7 sync-token + DA4R scaffold, plus the first real Phase 13 backend code), #187 (SyncWithCentral re-enable), #189 (Phase 8 elevated-consent token). An owner-authorized overnight run then merged on green CI: admin/member roles (#243), firm-key admin gating + personal-key tier (#245), account-link headers (#246), backend access logs + /whoami (#247) — all live-verified after a container rebuild. The same evening, just outside that run's own scope: C-1 key-management unification (#249, previously misreported as not-done), the firm-parameter neutrality doc (#248), a redis 8.1.0 bump (#237), and #244 above. Ledger note: PHASE-STATUS.md hasn't moved to reflect the 07-21/22 merges of #186/#187/#189 — now running ~2 weeks stale on that owner-maintained doc.",
      focus: "2026-08-17 weekly full audit -- 77 findings at audit time (10 High / 39 Medium / 24 Low / 4 Info). Reconciled 2026-08-22 against implementation-backed closure evidence in the covered repos: 32 findings resolved with a matching post-report code change, 45 remain active (4 High / 25 Medium / 13 Low / 3 Info). 15 items previously recorded as resolved in the manual reconciliation were restored to active status -- their prior closure records lacked implementation-backed evidence (no commit citation, audit-bookkeeping-only, or audit-artifact-only); this is a records correction, not a new regression. Open Highs: HYG-1/HYG-2/HYG-4 (audit-run and scheduled-task assurance) and HYG-3 (stale scheduled-task mirror source).",
      progress: {
        label: "Program phases",
        phases: [
          {
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
            name: "P7 Model Write-back — DA4R + Revit Link (two engines)",
            pct: 42,
            note: "ON HOLD — Co-equal engines, ship together. Revit Link sync re-enable (step-2): CODE-COMPLETE + MERGED both repos 2026-07-22, flag OFF ([#187](https://github.com/YourBIMpossible/BIMpossible/pull/187) `2936c32f` + [AddIns #11](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/11) `be4d6a8f`, lockstep: backend confirm→mint→single-use-token path — `POST /revit/sync_token` + `POST /revit/sync_with_central_confirmed` behind default-OFF `BIMPOSSIBLE_REVIT_LINK_SYNC_ENABLED`; C# force/CONFIRMATION_REQUIRED guard removed, local ribbon TaskDialog kept; decision-log `2026-07-16__phase7-revit-link-sync-reenable-step2.md`). Prod byte-identical until the owner's supervised first sync (test model: flag on → modal → verify synced+audited+token-no-replay → flag off → log GitHubWorkflow §11). DA4R correction 2026-07-16 (\"reserved name, NO code\") superseded 2026-07-21: an INERT scaffold now exists (#186: unregistered `da4r_adapter.py` satisfying the WriteEngine Protocol + `da4r_tokens.py` two-token module + fourth default-off flag `BIMPOSSIBLE_DA4R_ENABLED`; G2 spike hand-run PR #191 open) — unreachable, NOT registered in `get_engine()`, still gated on owner G1/G2. The one-write-spine contract now exists (`revit_link/engines.py` `29e96da`: WriteEngine Protocol + engine enum + gated seam; da4r plugs into THIS when built — see `design-docs/write-spine-convergence_target_2026-07-15.md`). Owner gates: (1) add BIMpossible-AddIns repo, (2) \"go\" to re-enable sync — still ON HOLD by owner-gate policy, independent of the audit-gate item below. See proposal 2026-06-23 (§2 DoD) for exact acceptance criteria. Audit gate (hard — from `2026-06-21__AuditAndHistory_Pattern.md`): ✅ SATISFIED 2026-07-02 (`0055dd1`) — `edit_log` + `revit_link_request_log` migrations applied and the adapter writes to both on every call (write-ahead as of the 2026-07-10 WIZ-7 fix); `GET /admin/audit/edits` endpoint + XLSX export live; `query_edit_log` assistant tool registered (firm-scoped as of AST-1, `376e180`). This row described the gate as still-pending through 2026-07-08's audit — stale, fixed today (DOC-2).",
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
            name: "P8 Project Setup Wizard",
            pct: 65,
            note: "LIVE — deployed on main 2026-07-22 — The product's FIRST live write to Autodesk — PROVEN 2026-07-22: a real ACC project was created + cloned from a firm project-template (folders + settings + central Revit model) through the Forma-native create-from-template path (`construction/admin/v1/accounts/{id}/projects`, 202→poll-active). UI: building-type dropdown (Autodesk's list), ACC project-template picker by NAME. 2026-07-22 simplification ([#207](https://github.com/YourBIMpossible/BIMpossible/pull/207), squash-merged): the redundant local-RVT *upload* step + its Model-template/Model-destination pickers were DROPPED once the template clone was confirmed to carry the central model — that upload was the only thing marking otherwise-successful runs `failed` (broken signeds3upload). A provision is now exactly create-from-template → reports clean `complete`. (Superseded PR #204, folder-picker fix, closed — its endpoint was deleted here.) Model-rename to `<number> - <name>` is HELD on an Autodesk C4R app-whitelist grant (the template's central model is a Collaboration-for-Revit cloud model; `PATCH items` → 403 \"client_id not whitelisted for schema items:autodesk.bim360:C4RModel\"); request doc `02_Reference/Phase8_C4R_API_Access_Request.md`; deliberately OUT of the critical path (founder 2026-07-22). Audit gate: ✅ `provisioning_jobs_status_history` present (`0055dd1`). Both founder-driven closeout items done 2026-07-23: (1) supervised run witnessed `complete` — `provisioning_jobs` row `46aff137…`, clean `planning → provisioning → complete` transition, zero error, verified directly against the prod DB; (2) the ZZZ / Testy Testington / Chrome Test / SMOKE 2026-07-23 test projects are archived in the ACC web UI. ~~Phase 8 has nothing outstanding.~~ Correction 2026-07-27 (PLACED, not ratified): that line no longer holds — two real open items, surfaced while scoping multi-firm distribution. (1) Hub-activation onboarding runbook — `BIMpossible_OpenQuestions.md` #5 names the actual steps a new external firm/consultant needs today (activate AEC Data Model in Forma settings; get the hub's Account Admin to add BIMpossible's APS client ID under ACC Custom Integrations; upload a new version of each model, since activation is forward-only; note C4R files aren't supported, regular Forma Docs uploads only) and none of it is written up for a non-technical hub admin to follow — this is the literal mechanism for \"the hub owner grants access to anyone,\" so it needs to be a real documented (ideally in-product) flow, not tribal knowledge. (2) APS app publishing/production-review cap — unverified. Open question: does BIMpossible's single APS app registration scale to any number of hubs/companies once each hub's Account Admin adds it via Custom Integrations, or does Autodesk impose a review/publishing-stage cap on authorized end users below \"production\" app status? Directly determines whether the multi-firm distribution model works at scale as-is; not yet checked against the APS console/docs or ADN support.",
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
            name: "P11 Model QA & Health (incl. Coordination & Health Report)",
            pct: 64,
            note: "ACTIVE — core shipped + LIVE in prod; reopened for further development — `BIMPOSSIBLE_QA_ENABLED=1` set by owner; Q1 live smokes ALL PASS on pilot `ISI-SB-SL-EL.rvt` via prod path (health 89/100 on 47k elements, `.ids` import evaluated 10053/10053, panel renders, 401/403 leak checks hold, Q2 fixes live-verified incl. 422 on broken imported-rule override). Full log: GitHubWorkflow §11 2026-07-01. Read-only QA rules + `.ids` import; was unnumbered (\"Phase 7-ish\"). Row-merge 2026-08-17: the former standalone row 11.1 — Coordination & Health Report is folded in here. 11.1 was a packaging/reporting layer built entirely on 11's own findings (same graph substrate, same QA output — presentation, not new analysis), the only case in the ledger where such a layer was promoted to its own peer row instead of a sub-note the way Phase 3's sub-phases live. It shipped LIVE 2026-07-02 via [PR #172](https://github.com/YourBIMpossible/BIMpossible/pull/172) (squash, CI-green), deployed + live-smoked same day on `ISI-SB-SL-EL.rvt` (JSON 200/1.7s warm; .doc download 172KB, branded+dated, severity-ranked, 5 plain-language critical hubs, island+unconnected traces; unauth 401 ×4 + non-allowlisted 403 ×2 hold); both smoke findings fixed same evening (`83384da`) — report runs the resolved project rule set (panel↔report parity live: 90.2==90.2, 89.11==89.11), `model_name` threaded UI→API. Coordination & Health Report acceptance criteria AC1–AC7 now live under 11 (see §Phase 11 — Coordination & Health Report below); AC1–AC6 verified live, AND `ACTIVE` status reopens 11 for further QA/health development. ⚠️ ONE OPEN ITEM CARRIED FORWARD IN THE MERGE: AC7 (per-model report-history table) was explicitly deferred and never built — needs versioned snapshots; it is 11's outstanding work, not lost in the merge.",
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
            name: "P13 Augmentation & Write-back Layer (incl. Write Engine — Typed Values + Type Params)",
            pct: 18,
            note: "ACTIVE — RATIFIED ACTIVE 2026-07-16 (owner). Frozen direction line: `2026-07-16 — Phase 13 (Domain A + promotion gate) → ACTIVE. Direction: A-first, no overhaul. Preserve existing discipline schedule views, Element Preview, and assistant; introduce Change Sets as the staged-change primitive; add Review + Push Center; and rewire EditParameterDialog/assistant from \"write to Revit now\" to \"stage,\" so engines and the promotion gate meet in the middle once Domain A reaches approved-state.` Build plan: `design-docs/change-set_build-plan_2026-07-16.md` (Domain A Stage 1, A-first, TDD, internal-DB only). Direction docs: `design-docs/UX_Research_ChangeLifecycle_Direction_2026-07-16.md` (owner-reviewed) + `DataInput_Interface_Gap_Analysis_2026-07-16.md`. Phase 13 = the augmentation/edit/review/promotion layer on top of the Phase 7 write-back engines (System α drives System β); Phase 7 remains the canonical engine layer — not absorbed. Build detail: `2026-06-24__Phase13_ProductizedDataEditing_Review_Pushback_PhaseDefinition_PROPOSAL.md` + package Docs 1–4. Companion WAVE-STATUS row (Wave 23) still unplaced. T0–T3 MERGED + PROD-DEPLOYED + LIVE-VERIFIED 2026-07-25 via [PR #214](https://github.com/YourBIMpossible/BIMpossible/pull/214) (`0f17003`), migration `a13cd5e70f24` applied and confirmed at head. Live evidence: T0 legacy Sync-with-Central / Check-Conflicts hidden; T1 Save wrote change set `4251f228…` status `approved`, `created_by=KAKJ5MM3JMXTNCPY`, `model_id` = the DM item URN, with a `staged_change` row (`Centered-Normal` → `Centered-Normal-SMOKE13`, `staged_old_value` captured for T4's drift check) and full `draft→in_review→approved` history (reason `self-approval`) in ONE transaction; T2 pill read \"Saved changes: 1 · 1 to apply\"; the edit affordance works with Revit closed, proving the offline path. Test data deleted afterwards (queue back to 0). T3's apply endpoint is built but NOT exercised live (`applied_by`/`applied_at` still null — that is T4's job). ⚠️ The first live Save 403'd — `require_active_membership` is strict while the rest of the app env-falls-back, and `user_firm_memberships` had been empty since launch because `link_user_on_login()` was never wired to any live path. Unblocked by hand-seeding one membership row (`KAKJ5MM3JMXTNCPY` → firm `c0757b61…`, the same static firm every existing row already uses); the permanent fix is [PR #227](https://github.com/YourBIMpossible/BIMpossible/pull/227). T4 UNPARKED same day (both ADR gates satisfied) and its ADD-IN HALF is MERGED 2026-07-25: Add-Ins [PR #38](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/38) (`cfb4cc1`) — PaneSessionProvider (single paired-session channel, ADR §3.1-E/F), pure ApplyPlanner drift logic, change-set client methods, and the \"Apply BIMpossible Changes\" ribbon command. Landed only after two independent review passes recorded on the PR: the first was BLOCKING (4 criticals — worst: change sets promoted to terminal `pushed` with nothing written to the model) and all were fixed + regression-tested (1428 tests, both TFMs); the second returned SAFE TO MERGE and its 3 pre-live-run findings (discarded write-path diagnostics; a provably-false \"re-run to catch up\" recovery instruction; a dead 409 branch documented as live) were also fixed pre-merge. Plan of record: `design-docs/2026-07-25__phase13-T4_apply-bimpossible-changes_PLAN.md`. T4 LIVE-VERIFIED 2026-07-25 (agent-driven, owner-authorized). `cfb4cc1` deployed to all 4 slots; live Apply on `SAMPLE-C-ELEC-R26.rvt` applied the happy-path edit (`S&L_FEEDER TAG 1753AL → 1753AL-T4`, read back in Revit; set → `pushed` w/ `applied_by`), and the drift re-run correctly skipped and preserved a hand-edit while promoting nothing. Both predicted failure modes reproduced exactly: the web `name` column is a pseudo-column (`LookupParameter(\"name\")` → null) so it skips forever and its set stays `approved`; the review's #1 representation-mismatch risk did NOT materialize for text shared params. Full results + verbatim dialogs: `01_BuildLog/2026-07-25__T4-live-smoke_RESULTS.md`. T4 IS COMPLETE — Task 6 shipped + live-verified 2026-07-25. `edit_log` is now written by T4 at actual-apply time per the ADR. `POST /data/change-sets/{id}/edit-log` (BIMpossible PR #229, `b19674c`) is deliberately decoupled from `/apply`: an all-skipped run makes zero `/apply` calls, so a body on `/apply` would have silently lost every skip. Identity is 100% server-derived (user/firm/model/element/parameter/new_value); the client sends only status + the live value it observed. Closed 11-value vocabulary incl. `applied_record_failed` for the model-wrote-but-record-failed divergence. Migration `b24de6f81c35` adds `edit_log.change_set_id` (nullable, indexed, no FK — audit rows must outlive their set). Client half: AddIns PR #39 (`faf9475`), `EditLogStatus.For` mapping + one advisory POST per set per run, apply decision logic untouched. Live proof on SAMPLE-C (add-in built from main+`feat/glass-alerts` so Glass was preserved): a mixed run wrote `applied` (`1004AL`→`1004AL-T6`, set → `pushed`) and `skip_drift` (observed `1753AL-HANDEDIT` vs staged `1753AL`, hand-edit preserved, set stayed `approved`) as two rows in ONE batch — the skip row proving the decoupling was necessary. All 10 legacy Phase-0 rows untouched. Backend endpoint + migration each passed their mandatory review gate; local CI green (3137 backend), add-in suite 1443. Still un-run live: the refusal tests (local `.rvt`, expired pairing) — code-gated only. New 2026-07-27 (proposed T5, next in sequence after T4/Task 6; PLACED not ratified) — cross-firm change-set approval: extend the existing draft → in_review → approved lifecycle to be role/firm-aware, so a change proposed by one firm's user (e.g. a subcontractor) can be routed to and approved by a different firm's user (e.g. the architect or GC) on the same project, instead of assuming proposer and approver share an org. This is what makes the write-back safety model (the differentiator per `FG-P5`) work across company lines, not just within one firm. Depends on Phase 6's proposed Client-Mgmt F (multi-firm tenancy) — can't route an approval to \"the architect's user\" until the data model knows which users belong to which firm on which project. New 2026-07-27 (proposed T6 — this label collides with the existing \"Task 6\" edit-log item; same number space, different thing, reconcile the name not the intent): an optional reason/criteria tag captured at change-set approval — *why* this value, not just what it changed to. Deliberately free-text/loose now, not a designed schema — the eventual shape a generative-design system needs isn't known yet, and a wrong schema costs more to unwind than a missing one. First concrete step toward the long-horizon \"design with a prompt\" direction (2026-07-27 discussion): every approved change becomes a labeled (decision, rationale) pair grounded in a real project, compounding for free as normal Phase 13 usage continues. T6 RATIFIED 2026-08-18 — build it. Deliberately loose free-text tag per the 2026-07-27 placement; the label collision with the existing \"Task 6\" edit-log item is reconciled at build time (rename the label, keep the intent). Row-merge 2026-08-17 (owner decision): the former standalone row 13.1 — Write Engine — Typed Values + Type Params is folded in here. By the P3-vs-P11 line the 11/11.1 merge applied (a single staged sub-build does not warrant its own peer row), 13.1 is Phase 13's write-engine increment, not a peer phase. Full build detail preserved verbatim in §Phase 13 — Write Engine — Typed Values + Type Params below. Open items carried forward (not lost in the merge): Increment 1 (non-string, instance-scoped) SHIPPED + live-smoked 8/8 2026-08-04; Increment 2 (type-param targeting, String-only) entry-gate CLEARED 2026-08-04 but UNBUILT; Increment 3 unbuilt; Increment 4 (ElementId) owner-ruled deliberately unimplemented; two open non-blocking owner decisions — #1 (staged-`unit` veto guard) and #3 (BuildSummary bucket-exhaustiveness) — to decide before/with Increment 2.",
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
            name: "P15 In-Revit BIMpossible Assistant Pane",
            pct: 30,
            note: "ACTIVE — Native WPF dockable pane inside Revit that pairs to a BIMpossible web session with a single-use code and streams the existing `/assistant/chat` — same assistant + tools, docked in Revit. 15a (pair → pick project → chat): MERGED to main + STAGE A LIVE-PROVEN 2026-07-25. Backend merged via [PR #221](https://github.com/YourBIMpossible/BIMpossible/pull/221) (`a427a2e`); the Pair-Revit-card flag gating via [PR #226](https://github.com/YourBIMpossible/BIMpossible/pull/226) (`ab0d183`, superseded #217 — GitHub auto-closed it when #221's `--delete-branch` removed its base branch). Stage A proven in Revit 2026 on the real cloud model `SAMPLE-C-ELEC-R26.rvt`: A1 paired session authenticated end-to-end (DPAPI token survived a Revit restart); A2.1 project + model dropdowns auto-populated with no manual selection; A2.2 — asked \"What am I looking at?\" and the pane answered with the live model, the active view `POWER PLAN - LEVEL 1 - PARENT`, and `1 Electrical Fixture selected (element ID 1805159)`, an exact match to the independently-read Revit selection. Add-in side: PR #30 MERGED 2026-07-25 (`3457c65`) — Phase 15A is merged in BOTH repos, the prod backend deploy carrying `a427a2e` went live 2026-07-25 with `BIMPOSSIBLE_REVIT_PANE_ENABLED=1`, and `main@3457c65` is built + deployed to all four `%APPDATA%` Revit slots (byte-verified). T4's entry condition A is fully satisfied; condition B (cloud-only) was already locked → T4 is UNPARKED, plan of record `design-docs/2026-07-25__phase13-T4_apply-bimpossible-changes_PLAN.md` (its Task 4 PaneSessionProvider lift now lands on Add-Ins main as T4's first commit, since #30 merged without it). Runtime-slot coordination ledger: `Add-Ins/decision-log/2026-07-25__runtime-slot-handoff.md` (3-session pile-up resolved; slot handed to the glass lane for the one-build pane+glass deploy). Structural finding for future merge criteria: Stage A can never be run through the production web UI pre-merge — both `PairRevitCard.tsx` and `/auth/pane/pair` are branch-only, so \"verified in prod UI\" is unachievable before merge by construction. Later slices: 15b external-doc ingestion · 15c Revit-context injection · 15d model writes + confirm UI. Per `design-docs/write-spine-convergence_target_2026-07-15.md`, the pane is transport over the existing write spine, never a new write path — 15d must produce standard proposals through the shared adapter. ⚠️ No PhaseDefinition PROPOSAL doc exists for Phase 15 — unlike 13/14 it entered build without the ratification artifact; row placed 2026-07-15 from the built reality (`Add-Ins/BIMpossible.RevitLink/Assistant/README-Phase15a.md`) so the ledger stops under-reporting active work. 15a re-proven in production use 2026-07-25: the paired pane session carried the entire Phase 13 T4 live smoke as the sole auth channel (ADR §3.1-E single-session rule held — no fallback path was needed or available), and the DPAPI token survived two Revit restarts without re-pairing. Operational trap found the same day: the pane resolves `BIMPOSSIBLE_PANE_BACKEND_URL` from the environment of the process that launched Revit, so a stale value silently misroutes the pane and everything riding its session; `%APPDATA%\\BIMpossible\\RevitLink\\pane\\config.json` does not exist as a backstop. Verify via the `[AssistantPane] controller ready; backend=…` line in `%APPDATA%\\BIMpossible\\RevitLink\\log.txt`. Moved out 2026-08-17 → Phase 17 — App Integrations. The Slack / Teams chat-assistant gateways (proposed here as \"15e\" on 2026-07-27, built dark and merged — Slack [#262](https://github.com/YourBIMpossible/BIMpossible/pull/262) 2026-08-07, Teams [#276](https://github.com/YourBIMpossible/BIMpossible/pull/276) 2026-08-08, both flag-gated off) are now their own top-level phase (17a / 17b). Full history — the 2026-07-27 proposal, the 2026-08-07 MCP-vs-gateway correction, the platform digest asymmetry, and the retired-unused numbering saga — is preserved verbatim in §Phase 17 below. Retained here because it still binds Phase 15's write slices too: Hard line, no exception — a write requested via any chat platform creates a Phase 13 change-set and goes through the exact same draft → in_review → approved lifecycle as every other write in this product; a chat message can *propose* a change, never commit one, regardless of platform. ⏸ 2026-08-08: Phase 15c's T5 (E2E smoke) is PAUSED pending the BIMpossible hub cutover / tenancy test gate; unrelated to and does not affect 15a above (or the chat gateways now at Phase 17), which remain as stated. Pointer (moved 2026-08-17): the \"Phase 15c — hub cutover / tenancy test gate\" content was never about the Revit pane — its subject is multi-tenant infrastructure (canonical firm identity, hub binding, read-only evidence windows, firm↔hub verification). It only got filed under 15 because it gated one Revit-pane test (T5). It has been relocated to Phase 6, where Client-Mgmt F / multi-firm tenancy already lives — see §Phase 6 — hub-cutover / tenancy test gate. The T5 *test* stays a Phase 15 gate; the tenancy *work* it waits on is Phase 6. 15f — Open-in-Revit desktop handoff (numbered 2026-08-17, was unnumbered): web→`bimpossible://`→local opener→Revit opens the correct cloud model; read-only by design; functionally complete + live-verified 2026-07-24 (see §Open-in-Revit below). Filed under 15 because it is the same web-to-desktop-Revit-bridge concern as the pane — *not* Phase 7, which is specifically about writing data back into models. Its distribution lane (end-user installer, code-signing cert) was separately parked by owner ruling — a business-timing decision, kept distinct from 15f's \"functionally complete\" engineering status so the two aren't conflated.",
            tasks: [
              { label: "15a — pair to web session, pick project, chat", status: "active", note: "BUILT on two unmerged branches; 47 Assistant tests green, both TFMs clean. Owed: live pair+chat e2e in Revit, then merge" },
              { label: "15a live e2e (human): pair with an 8-char code, pick project, stream a reply, verify token survives a Revit restart", status: "pending", note: "The one remaining step per README-Phase15a.md; needs flags on + a fresh Revit launch" },
              { label: "Write a Phase 15 definition doc", status: "pending", note: "Phases 13/14 have PhaseDefinition PROPOSALs; Phase 15 entered build with none" },
              { label: "15b — external-doc ingestion", status: "pending" },
              { label: "15c — Revit-context injection", status: "pending" },
              { label: "15d — model writes + confirm UI", status: "blocked", note: "Gated on Phase 7. Must ride the shared write spine (standard proposal → shared adapter), never a new write path; a write approval-request is politely declined in 15a" }
            ]
          },
          { name: "P16 Desktop Orchestration Hub — MCP-First, Gated GUI Exception Path", pct: 10, note: "CONDITIONAL — Persistent local orchestration hub for cross-tool workflows (Revit, BIMpossible Site, filesystem/git, reporting) via explicit, scoped MCP servers as the default path; GUI/desktop automation admitted only as a named, allowlisted exception for apps with no workable API — under explicit consent, sandboxing, and audit logging, never a general \"control my desktop\" mode. Full rationale, architecture, and the 3-condition go/no-go ratification test: `2026-07-23__Phase16_DesktopOrchestrationHub_PhaseDefinition_PROPOSAL.md`. PROPOSAL — not ratified, not scheduled; placed at the end of the ledger deliberately." },
          { name: "P17 App Integrations (governed third-party app surfaces — chat gateways + collaboration / CDE / reporting apps over a shared control plane)", pct: 50, note: "PARTIAL — Promoted to a standalone phase 2026-08-17 (owner decision) — the Slack/Teams gateways move out of Phase 15's \"15e\" into their own top-level phase. Supersedes, transparently per the freeze-numbers rule, both the 2026-08-07 \"Phase 17 retired-unused\" ruling and this session's own earlier withdrawal of the move; 17 was only ever coined in code comments, never claimed by a shipped phase, so promoting it is a placement decision, not a silent reassignment. Ordering holds 16 < 17 < 18. 17.0 Integration Control Plane — PLANNED foundation (registry, OAuth/credential vault, external-identity binding, fail-closed context routing, policy enforcement, adapter contract, Phase-13 change-set bridge, audit/observability, governed MCP + public/webhook API surface). 17a Slack BUILT (dark), merged [#262](https://github.com/YourBIMpossible/BIMpossible/pull/262) 2026-08-07, flag `BIMPOSSIBLE_SLACK_ENABLED` OFF. 17b Teams BUILT (dark), merged [#276](https://github.com/YourBIMpossible/BIMpossible/pull/276) 2026-08-08, flag `BIMPOSSIBLE_TEAMS_ENABLED` OFF. 17c onward — future integrations (Bluebeam, Telegram, Google Chat, Buzz, …): open, charter-gated backlog, not pre-lettered. Nine phase-wide invariants + per-integration admission charter + verbatim 15e build history in §Phase 17 below. Scope/architecture/governance: `2026-08-17__Phase17_App_Integrations_Strategy_and_Governance.md`; migration mechanics + candidate landscape: `2026-08-17__Phase17_AppIntegrations_Migration_PLAN_PROPOSAL.md` / `2026-08-17__Phase17_Integration_Landscape_RESEARCH.md`." },
          { name: "P18 Client Knowledge Assistant (3 pillars)", pct: 50, note: "ACTIVE — Added as its own top-level row 2026-08-17. Previously invisible in this ledger despite being a fully-scoped, owner-authorized, multi-session program — the ledger↔engineering-store blind spot (its state lived only in `.tools/state/queue.yaml` + an anchor doc). Given 18, not 17, at creation (history): when this row was placed, Phase 17 was retired-unused per the 2026-08-07 ruling, so 18 was simply the next free integer after 16. That ruling was superseded the same day: 17 was promoted to Phase 17 — App Integrations (2026-08-17, see row 17). CKA stays 18 — unchanged — because it is a distinct product surface, not an app integration; the two now coexist and ordering holds 16 < 17 < 18. Not nested under 14 or 15: Pillar 1's search resembles 14's retrieval in spirit, but CKA is its own product surface (client documents + model explainability + product help), not local inference and not the Revit pane. Anchor / source of truth: `00_Strategy/2026-08-09__CKA-completion-program__ANCHOR.md` (locked mission, locked decisions A–E, stop conditions, internal Phase 0–4 plan, checkpoint log) + `2026-08-09__CKA-product-spec.md`. Three pillars (status verbatim from `queue.yaml`): Pillar 1 — Product help (BM25 help ranker + how-to corpus, waves 1–4) = live (`CKA-PILLAR1-HELP-CORPUS`; 41 help `.md` articles at tip, deployed-container search verified 2026-08-17). Pillar 2 — Per-firm documents (Private/Project/Multi-project/Firm-Library access model, RBAC + classification, upload/extraction/BM25 retrieval, assistant tool) = landed, not yet confirmed live (`CKA-PILLAR2-FIRM-DOCS`, PR #327; tenant-isolation-sensitive — flagged for a live firm_id-scoping + cross-firm-leak probe before external clients). Pillar 3 — Model explainability (14 gap-fills + Groups read parity, change sets, help handoff, model-health remedies, alert next-steps) = landed, not yet confirmed live (`CKA-PILLAR3-EXPLAINABILITY`, PR #326; CI-green is the only evidence — visual verification blocked on local sign-in). Internal Phase 0–4 stages are sub-phase notes (below), not top-level rows — launched under the corrected convention from day one to avoid the 11/11.1-style cleanup later. Hard boundaries per the anchor (do not cross without a fresh owner turn): no prod deploy/config/migration/data access, isolated/dev infra only, no new assistant-initiated write authority." },
          { name: "P19 BIMpossible Workbench (desktop task-prep & closure workspace for Claude Code)", pct: 0, note: "PROPOSAL — Added 2026-08-21, from a phase plan submitted outside this ledger session and placed here on request. Native WPF/.NET desktop app, local-first and provider-agnostic (Ollama default, Claude/OpenAI/Gemini/Grok as optional adapters): work-item queue (`Inbox → Prepared → Active → Review → Closed`, plus `Blocked`/`Unverified`/`Parked`/`Reverted`) that captures a task (Revit selection, issue, family batch, code bug, test failure, design note), deterministically collects evidence (Git status/diff, targeted source search, test/build logs, read-only Revit context), uses a local model to draft a structured task contract (goal/evidence/constraints/scope/acceptance criteria — never silently proposing completed code changes), and generates a bounded Claude Code handoff; Claude Code implements and validates, Workbench records the closeout (changed files, validation evidence, risks, next action). Durable artifacts are project-local Markdown/JSON under `.ai/` (tasks/work/handoffs/decisions/prompts), not transient chat history. Not a Claude Code replacement, not a generic chat client, not an agent runtime/sandbox/terminal/browser-automation platform, and not an autonomous mutation engine — mutation is fail-closed by default (inspect/read-only; Revit and source-tree writes require explicit dry-run → review → apply). Closest ledger neighbor is Phase 16 (Desktop Orchestration Hub) — both are local/desktop, both explicitly gate nothing on the main product line, both are PROPOSAL/CONDITIONAL rather than scheduled — but they are distinct programs (16 = cross-tool MCP orchestration with a gated GUI-exception path; 19 = task-prep-and-closure workbench with its own evidence/local-AI/handoff pipeline) and should stay separate rows. Open decisions before any build work, per the plan's own gate list: product name confirmation; artifact-policy scope (repo-local `.ai/` only vs. app workspace + export); single- vs. multi-workspace v1 support; initial local model(s) + context/performance target; first Claude Code integration level (clipboard/file handoff only vs. controlled process launch); the first real (non-demo) vertical-slice task; secret/path exclusion policy before evidence collection is enabled. Full plan: `2026-08-21__Phase19_BIMpossibleWorkbench_PhaseDefinition_PROPOSAL.md`. PROPOSAL — not ratified, not scheduled; placed at the end of the ledger deliberately, per the freeze-numbers rule (ordering holds 16 < 17 < 18 < 19)." }
        ]
      },
      activity: [7,0,2,0,2,5,10,48,44,9,3,12,17,15],
      lastActivity: {
        date: "2026-08-22",
        summary: "docs(census): close out doc 19 — Batch B executed, no further action (#82) (e9b559a)"
      },
      branch: "main at 751155f; 0 ahead of origin",
      git: {
        warn: "Many merged feature branches still on origin (audit/*, refactor/data-tab-*, wip/phase5-*); prune retired remotes. Local fix/perp-audit-* may also be stale (content merged via PR)."
      },
      nextActions: [
        "Triage the 15 findings restored to active status: land an implementation-backed fix, or record an explicit accepted-deferred decision, so the next reconciliation can close them on evidence rather than a manual note",
        "Close the open Highs -- HYG-1/HYG-2/HYG-4 (prove the scheduled weekly-audit run fired; restore the Slop lens definition and .env deny coverage) and HYG-3 (re-point the stale scheduled-task mirror source)",
        "Schedule the accepted-deferred debt when its trigger arrives: RE-2 pipe-instance cap and the ARCH-NEW-2 aec/router.py domain split on the next major touch",
        "Reconcile the Add-Ins pairing findings (SEC-PAIR-2, RE-PAIR-1, CQ-TEST-PAIR-1, FE-PAIR-2) against the pairing-hardening work and update the next audit's open set",
        "Decide the Auto-Fix Pass's fate: retire the write-enabled stage from the weekly scheduled task after 5 straight cycles at zero applied fixes"
      ],
      pendingDecisions: ["Phase 3.10b Ducts/Pipes: output shape (list vs. from/to pair) — still undecided; the categories are explicitly excluded in _PHASE3_10_IN_SCOPE_CATEGORIES until it lands","Schedule-push: staleness cadence, classifier rules, fidelity degradation list, SPF ship location (scoped as a write-spine ORIGIN, direction only — no code yet)","Wave 16 Interiors: build dedicated shapers for Ceilings/Flooring now or batch with Wave 15 Civil?","Phase B admin auth: Google OAuth client + env (AUTH_GOOGLE_ID == backend GOOGLE_CLIENT_ID); B0 unify legacy admin routes onto require_admin (Option A chosen)","Phase 13 ledger ratification (flip PLANNED → ACTIVE) — Q1/Q2 scoping was decided 2026-07-16 and the code merged 2026-07-21 (#186), but the ledger status itself still hasn't moved, now ~2 weeks stale; Phase 14 promotion and a Phase 15 definition doc are still owed too","D-4: break-glass admin secret mechanism — design not yet made","D-5: provider routing for local LLM inference — gates C-2/C-3, not yet decided","D-8: where the audit hash-chain tip anchors outside the DB — dormant until a B-6 trigger fires (none has: single-operator deployment, no client/contract/insurer record on file)"],
      blockers: [],
      reminders: ["Branch protection has enforce_admins=false and no required-PR-review, and Push-And-Verify.ps1 pushes direct to main as admin — required checks are a SIGNAL, not a gate, on the real push path.","The weekly audit report is point-in-time and has now twice been superseded within hours by a same-day fix PR (07-27 #231, 08-04 #239) — always check the repo's git log before trusting its counts.","Add-Ins test-count baseline is an attribute count (~904: Fact + Theory), NOT the ~1473 dotnet-test prints — Theories expand across InlineData rows; conflating them caused a false '634 vs 895' scare.","reportlab not installed → aec/exports.py PDF routes inert (CSV works); add before Phase C /account/export/*.pdf"],
      links: [
        { label: "STATE doc (canonical, 06-12)", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_STATE_2026-06-12.md" },
        { label: "True-prod deploy runbook (06-12)", path: "F:\\BIMpossible-Workspace\\02_Reference\\2026-06-12__true-prod-deploy-runbook.md" },
        { label: "Wave 4.10 spec libs (backend)", path: "F:\\BIMpossible\\backend\\spec_sections" },
        { label: "Waves 10-19 closeout (06-13)", path: "F:\\BIMpossible-Workspace\\00_Strategy\\2026-06-13__Waves10-19_CloseOut_Status_and_Remaining_Work.md" },
        { label: "Build log", path: "F:\\BIMpossible-Workspace\\01_BuildLog" },
        { label: "Code", path: "F:\\BIMpossible" }
      ],
      recent: ["2026-08-05 - Doors D0/D1 shipped: a two-pass probe against real electrical models found zero ambiguous cases (#250, 4590c77), then boundary-element resolution shipped for real — doors now resolve to the room PAIR they separate, not a single room (#253, 751155f)","2026-08-04 - Write Engine Increment 1 (typed values) shipped lockstep across both repos and cleared its live-smoke gate 8/8, incl. a unit-conversion proof at a ×10,763.91 factor — backend #232 (0e8dd03) + Add-Ins #49 (0f3d318)","2026-08-04 - Owner-authorized overnight run merged on green CI: admin/member roles (#243), firm-key admin-gating + personal-key tier + audit log (#245), account-link headers (#246), backend access logs + /whoami (#247) — all live-verified after the container rebuild (DB migration head corrected to 13014695175a); C-1 key-management unification (#249) and the firm-parameter neutrality doc (#248) landed the same evening just outside the report's own scope, plus a redis 8.1.0 bump (#237) and Phase 3.10a's rollout flag deletion (#244)","2026-07-21/22 - The three long-parked draft PRs finally merged: #186 (Phase 7 sync-token + DA4R scaffold + Phase 13 Change Set backend Stage 1), #187 (SyncWithCentral re-enable behind a one-time token), #189 (Phase 8 provision-time elevated consent)","2026-07-21 - docs(strategy): land the 2026-07-21 ProjectRecipe set (decision brief v2, direction summary, gap analysis, panel synthesis)","2026-07-20 - Weekly audit: WSR8 fully resolved + 4 conditional gaps closed alongside it; RE-1 (EventDispatcher queue-drain in the Revit add-in) surfaces as the new High, traced end-to-end for the first time","2026-07-20 - feat(open-in-revit): cloud-ids endpoint + R-button wiring merged via #188 (d2264eb) — first main-branch commit since the WriteEngine contract 4 days earlier","2026-07-16/20 - 3 substantial draft PRs opened, all still unmerged: #186 (Phase 7 sync-token + DA4R scaffold, plus Phase 13 Change Set backend Domain A Stage 1 — real code for a phase the ledger lists at 0%), #187 (stacked on #186 — full SyncWithCentral re-enable behind a one-time token), #189 (Phase 8's provision-time elevated-consent token, closing its last documented gap)","2026-07-16 - Write-spine convergence items 1+2 DONE, both merged same day: WriteEngine contract (29e96da — Protocol + engine enum + gated seam) and gate unification (df7add1 — live-write auth unified on the fail-closed check_firm_model_editor, the two hand-mirrored gate functions merged)","2026-07-15 - Phase 3.10a PROVEN LIVE: first-ever warm + join against a real cloud project (a4ecece) after the externalElementId↔native-id bridge fix (c2d5756); AC-1 closed via the real endpoint, AC-3 FAIL→PASS with p50 215ms→18ms via room-pool cache + bbox pre-filter (7f8735f/413adf8) — the blocker two audits called the #1 issue","2026-07-15 - WSR8 step 2 wired: fail-closed check_firm_model_editor role (92738b3) → gated LLM→live-Revit parameter write (9713356, flag OFF); marked BUILT+SHIPPED (8114f8e)","2026-07-15 - Phase 3.8 restarted: owner ratified the minimal wedge (b0369de); slice 1 ACC role-sync columns + is_draft landed inert (48c4826); is_draft moved to user_firm_memberships for per-user draft mode (d5cee40)","2026-07-15 - Write-spine convergence target RATIFIED (9eccdc6): one proposal contract + one permission gate + one audit trail; pluggable origins (spreadsheet, AI, in-Revit pane, batch) and engines (Revit Link, DA4R). Schedule-Push's designed gate-bypass overturned by banner","2026-07-15 - Day-2 Phase 3 audit (5 evidence agents) — written 18:40, then overtaken by its own findings' fixes the same evening; ProgramPlan Wave-22 cross-refs corrected (7be8f6a)","2026-07-14 - Phase 3 production-readiness audit + same-day fixes: Alembic single-head CI guard (1e07550), Dockerfile Phase 3.10a flag ARG/ENV (a2a4a23), frontend per-row status + flag-on crash guard (87ca90c), PHASE-STATUS.md + WAVE-STATUS.md corrected (f07ebb9)","2026-07-13/14 - Prod outage root-caused + fixed: 351 backend container restarts from two migrations landing with no backend-migrate run","2026-07-13 - Weekly full audit + same-day closeout: WSR8 (assistant Revit-write auth gate) + 16 other findings — 11 shipped in code/config, 6 accepted owner decisions, zero dangling (c4194c5, b6bb96f)","2026-07-12/13 - Phase 3.10a Cross-Model Room Join merged + migrated to prod (dd5adb1); warm-time writer gap found+fixed next day (c72f647/09cb66b); Phase 3.10b Furniture slice shipped (4bb6497); dynamic firm resolution P3-8-DYN shipped (72e88f8)","2026-06-28 - PRs #153–#157 merged: Embedded Assistant Phase 4c (conversation persistence + stop-and-edit) + Phase 4d project-context grounding; NetworkX graph-topology tools + Model Health graph checks (#157) + permission-flow graph tool; report-only security-scan + BIM semgrep + prose-flag hook; trivy CI pin (main 80d3407)","2026-06-23 - PR #142 merged (9f6f55c): P11 Model QA rules engine + P8 Wizard committed to main; expr-eval prototype-pollution CVE removed; relay frame guard + multi-tenant auth scoping + aec edge cases (audit remediation)"],
      audit: {
        lastRun: "2026-08-17",
        runType: "Weekly full audit 2026-08-17 (0/10/38/22/4, 74 open), reconciled 2026-08-21 against merged resolution work. 47 of the 74 findings are closed in code across 52 PRs (#393-#443) -- every one of the 9 open Highs fixed: SEC-WIZ-HUB-1 (#397 firm-scoped wizard hub gate), SEC-PAIR-1 (#402 paired-account identity on redeem), FE-CSS-1 (#398), ARCH-PROJGATE-INVARIANT-1 + SLOP-1 (#397 route-level project-access invariant), RE-RESOLVE-SCAN-1 (#400 bounded resolve scan), HYG-1/2/4. 30 remain open (1 High HYG-3, 19 Medium, 8 Low, 2 Info) -- predominantly accepted-deferred (RE-2 single-pipe concurrency, ARCH-NEW-2 router size, ARCH-WIDENED-SCOPE-1 record-only), doc/process hygiene (HYG-7/10-17/19/20), and Add-Ins-side pairing/dist items (SEC-PAIR-2, RE-PAIR-1, CQ-TEST-PAIR-1) not yet cited as closed. Resolved set verified by finding-ID citation in merged fix commits via git log --since=2026-08-17, not the report summary; the 30 open are conservatively retained (uncited != confirmed-open). No open Critical or Security-High remains on the live web app.",
        cadence: "weekly Sun 11:45pm + incremental Sun/Tue + on-demand",
        counts: {
          critical: 0,
          high: 4,
          medium: 25,
          low: 13,
          info: 3
        },
        closedLastRun: 32,
        trend: "improving",
        reportPath: "F:\\BIMpossible-Workspace\\02_Reference\\Audit and Scan Info\\weekly-full-audit_2026-08-17.md",
        reportFile: "bimpossible/weekly-full-audit_2026-08-17.md",
        ledgerPath: "F:\\BIMpossible-Workspace\\02_Reference\\_audit-runs.md",
        open: [
          {
            id: "HYG-1",
            sev: "high",
            title: "No artifact proves the 2026-08-10 scheduled weekly-audit run actually fired vs. never ran",
            where: "system/scheduled-tasks"
          },
          {
            id: "HYG-2",
            sev: "high",
            title: "The Slop lens is missing from the scheduled task's own LENS DEFINITIONS block though the matrix marks it required weekly",
            where: "task SKILL.md"
          },
          {
            id: "HYG-3",
            sev: "high",
            title: "The \"authoritative\" scheduled-task mirror is 2 months stale and points at a dead source path",
            where: "BIMpossible_Workspace/system/scheduled-tasks/_live/"
          },
          {
            id: "HYG-4",
            sev: "high",
            title: ".env protection is prose-only across 4 restatements; no Edit/Write deny entry actually enforces it in a pipeline with a write-enabled stage",
            where: "BIMpossible/.claude/settings.json:3-16"
          },
          {
            id: "SEC-AUTHZLOG-RETENTION-1",
            sev: "medium",
            title: "No load test yet measures authz_decision_log insert rate / p99 latency before any SHADOW-mode fleet flip",
            where: "backend/db/models.py; audit_stream_worker.py"
          },
          {
            id: "SEC-PAIR-2",
            sev: "medium",
            title: "Claimed-file lifecycle has no terminal orphaned state and no sweeper; claimed->deleted is best-effort only",
            where: "Add-Ins pairing file lifecycle"
          },
          {
            id: "SEC-DIST-1",
            sev: "medium",
            title: "Distribution/installer security item carried from prior cycle, unchanged",
            where: "installer"
          },
          {
            id: "RE-PAIR-1",
            sev: "medium",
            title: "Watcher liveness has no failure transition — alive to dead happens via an unsubscribed Error event with no detection or recovery",
            where: "Add-Ins pairing watcher"
          },
          {
            id: "RE-2",
            sev: "medium",
            title: "Single pipe instance vs. a 4-worker relay thread pool caps Revit-link throughput to one operation at a time by design (carried, accepted scope)",
            where: "PipeServer.cs:82,97 - revit-relay/relay.py:107"
          },
          {
            id: "ARCH-CI-ADDINS-1",
            sev: "medium",
            title: "Add-Ins CI gap item, carried from prior cycle",
            where: "Add-Ins CI config"
          },
          {
            id: "ARCH-DIST-2",
            sev: "medium",
            title: "Two AppIds share one installer payload with no refcount; installed(suite)+uninstall(opener) can reach a broken, unmodeled state",
            where: "installer"
          },
          {
            id: "ARCH-WIDENED-SCOPE-1",
            sev: "medium",
            title: "Enrollment grant->scope->enroll->revoke lifecycle is fully implemented and read live but structurally unreachable while its flag is OFF",
            where: "backend enrollment"
          },
          {
            id: "ARCH-NEW-2",
            sev: "medium",
            title: "aec/router.py last measured at 2,828 lines — maintainability drag, no regression (carried)",
            where: "backend/aec/router.py"
          },
          {
            id: "CQ-TEST-PAIR-1",
            sev: "medium",
            title: "PendingPairWatcher.cs has no test coverage for concurrent CheckNow, malformed JSON, TTL-exceeded, duplicate-nonce, or delete-failure paths",
            where: "Add-Ins PendingPairWatcher.cs"
          },
          {
            id: "FE-SHARE-VIRT-1",
            sev: "medium",
            title: "Share-list virtualization gap",
            where: "frontend share components"
          },
          {
            id: "FE-SHARE-DS-1",
            sev: "medium",
            title: "Share design-system inconsistency",
            where: "frontend share components"
          },
          {
            id: "FE-3",
            sev: "medium",
            title: "model/page.tsx god-component last measured at ~3,458 LOC (carried, deferred to the 5k-element benchmark trigger)",
            where: "frontend/app/project/[id]/model/page.tsx"
          },
          {
            id: "HYG-5",
            sev: "medium",
            title: "Docs-budget ratchet reads red, but 32 of 43 new docs are the shipped client-facing help corpus, not real debt",
            where: "BIMpossible/docs-budget.json:19"
          },
          {
            id: "HYG-6",
            sev: "medium",
            title: "Reference validator red with 4 new dangling refs to backend/guard.py, deleted 2026-08-16, still cited by 10+ live docs/agents",
            where: "docs + .claude/agents/*.md + system/REINSTALL-RECOVERY-PROMPT.md"
          },
          {
            id: "HYG-7",
            sev: "medium",
            title: "_backups/ is simultaneously declared retired and mandated by two directly contradicting rules",
            where: ".claude/commands/audit-resolution.md Step 0 vs task SKILL.md:42,44,55"
          },
          {
            id: "HYG-8",
            sev: "medium",
            title: "\"Automatic agent gates\" table claims gates run every time; nothing invokes them — no hook, no CI matcher",
            where: "BIMpossible/CLAUDE.md:72-82; .claude/settings.json:18-26"
          },
          {
            id: "HYG-9",
            sev: "medium",
            title: "PROJECT_CONSTITUTION.md restates the superseded direct-push-to-main / WIP regime as current",
            where: "docs/PROJECT_CONSTITUTION.md:63-64"
          },
          {
            id: "HYG-10",
            sev: "medium",
            title: "Audit skill's own lens catalog omits the Hygiene lens despite claiming \"seven lenses\"",
            where: "bimpossible-audit-skill/SKILL.md:15,81,113-126"
          },
          {
            id: "HYG-11",
            sev: "medium",
            title: "No Checklist routing rule exists for HYG- findings; a Medium Hygiene finding is written once and tracked nowhere",
            where: "task SKILL.md:42; BIMpossible_Verification_Checklist.md"
          },
          {
            id: "HYG-12",
            sev: "medium",
            title: "Doc-hygiene mechanical checks cover the code repo only; the 1.5M-word Workspace and Add-Ins have no reference validator or budget",
            where: "BIMpossible/scripts/*.mjs"
          },
          {
            id: "HYG-13",
            sev: "medium",
            title: "docs-hygiene CI job is non-gating and both its checks are currently FAIL with nobody acting on the tracking issue",
            where: ".github/workflows/security-scan.yml:249-300"
          },
          {
            id: "HYG-14",
            sev: "medium",
            title: "Verification Checklist growing with no ceiling and no archive rule (~178 KB/mo trajectory)",
            where: "02_Reference/Audit and Scan Info/BIMpossible_Verification_Checklist.md"
          },
          {
            id: "HYG-15",
            sev: "medium",
            title: "Add-Ins Definition-of-Done and the 355px ToolTipImage limit remain unenforced by any check",
            where: "Add-Ins/CLAUDE.md:136-144"
          },
          {
            id: "HYG-16",
            sev: "medium",
            title: "A live slash command cites a strategy-ledger file that does not exist and fails on run",
            where: "Workspace/.claude/commands/promote-approved.md"
          },
          {
            id: "SEC-CI-ADDINS-2",
            sev: "low",
            title: "Add-Ins CI security-gate gap, carried from prior cycle",
            where: "Add-Ins CI config"
          },
          {
            id: "ARCH-WRITE-1",
            sev: "low",
            title: "Write planner should refuse an ElementType target with IsTypeParam=false rather than silently applying",
            where: "Add-Ins planner/command"
          },
          {
            id: "CQ-SCHED-CADENCE-1",
            sev: "low",
            title: "Synthetic-audit scheduling ownership remains an unresolved two-writer state, now described contradictorily in two docs",
            where: "scheduling docs"
          },
          {
            id: "FE-PAIR-2",
            sev: "low",
            title: "Pairing UI gap (secondary, Low)",
            where: "frontend pairing UI"
          },
          {
            id: "FE-1",
            sev: "low",
            title: "useScheduleFetch still calls pollUntilWarm<any>(...) (carried, accepted debt)",
            where: "frontend/app/hooks/useScheduleFetch.ts:123-126"
          },
          {
            id: "FE-2",
            sev: "low",
            title: "Legacy filter/sort/grouping schema-migration any types remain in the normalizer (carried)",
            where: "frontend/app/lib/filters/normalize.ts:33,44,45,57,63,64,76"
          },
          {
            id: "HYG-17",
            sev: "low",
            title: "references/fix-phase.md cited as a lens file; the actual file is auto-fix.md",
            where: "00_Strategy/Add-AutoFix-To-Weekly-Audit_Cowork-Setup.md"
          },
          {
            id: "HYG-18",
            sev: "low",
            title: "last_verified frontmatter is required to exist but never age-checked; 11 of 41 help articles are 67 days old",
            where: "backend/tests/test_help_corpus_guard.py:25"
          },
          {
            id: "HYG-19",
            sev: "low",
            title: "3 verification claims are past 90 days old, one now factually wrong",
            where: "Add-Ins/setup.md:84; Workspace/.claude/memory/add-ins-state.md:16; .claude/memory/workspace_structure.md:12"
          },
          {
            id: "HYG-20",
            sev: "low",
            title: "Duplicate/superseded doc families across archive and migrated-memory directories",
            where: "system/scheduled-tasks/*; migrated_from_dot_claude/*"
          },
          {
            id: "HYG-21",
            sev: "low",
            title: "4 docs have no inbound link from any tracked doc or code file, incl. an unreachable runbook",
            where: "docs/PROJECT-ENROLLMENT-RUNBOOK.md; docs/ai/ADOPTION.md"
          },
          {
            id: "HYG-22",
            sev: "low",
            title: "_db-backups/logs/ has no retention rule — 169 log files, 634 MB, unpruned since 2026-07-09",
            where: "BIMpossible/Backup-Db.ps1:284-290"
          },
          {
            id: "SLOP-DIST-3",
            sev: "low",
            title: "Per-year Revit installer outcome is never reported; a failed year is silently skipped",
            where: "Add-Ins installer/BIMpossibleRevitTools.iss:53-86,102-105,122-132"
          },
          {
            id: "SEC-cloud-1",
            sev: "info",
            title: "EMEA region inferred from URN convention; unrecognized region returns None rather than guessing (carried, unexercised)",
            where: "backend/aps/cloud_ids.py:18-33,64-77"
          },
          {
            id: "HYG-23",
            sev: "info",
            title: "Automation output-consumer census: two parallel decision-log roots, several report-only outputs with no confirmed reader",
            where: "flag-prose.mjs; decision-log/ + docs/decision-log/INDEX.md"
          },
          {
            id: "INFO-GRAPHIFY-1",
            sev: "info",
            title: "Stale graphify-out artifacts still display the retired X-Admin-Secret admin-auth path; documentation drift only, not reachable in the running app (carried, not reassessed this cycle)",
            where: "backend/graphify-out/**"
          }
        ],
        history: [
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
        updated: "2026-08-17",
        source: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md",
        summary: { done: 30, built: 4, inFlight: 1, ahead: 4 },
        current: [
          { id: "15", title: "Civil schedules", status: "PARTIAL", date: "2026-06-13", note: "Civil probe-config + model-discovery work merged (`cf3b8ee` Merge feat/wave15-civil-probe-config; model-discovery (local merge c7ac2d5; feat 9145f88)). Adds `b…" },
          { id: "26", title: "Phase 3.10a Cross-Model Room Join", status: "BUILT", date: "2026-07-13", note: "Code merged `dd5adb1` (2026-07-12); warm-time writer gap found+fixed `c72f647`/`09cb66b` (2026-07-13); migration genuinely applied to prod (confirmed live). No…" },
          { id: "28", title: "Phase 3.10b Furniture slice", status: "BUILT", date: "2026-07-12", note: "`4bb6497`, reuses 3.10a's algorithm unchanged. Inherits Wave 26's never-executed-pipeline gap — same caveat applies." },
          { id: "29", title: "WSR8 write-primitive cluster (assistant-Revit-write auth gate + reliability hardening)", status: "BUILT", date: "2026-07-13", note: "`c4194c5`, real GitHub Actions CI green. `execute_proposal` has zero production callers, enforced by a real AST-based test in the required CI gate — correctly,…" },
          { id: "30", title: "Phase 17 (17a Slack + 17b Teams) chat assistant gateways", status: "BUILT", date: "2026-08-08", note: "Slack `dd89889` (#262, merged 2026-08-07), Teams `879e857` (#276, merged 2026-08-08). Read-only Q&A against a bound project + model from a channel, fronting `a…" },
          { id: "8", title: "Revit Link Phase 1 multi-user pass", status: "PLANNED" }
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
      oneLiner: "Revit ribbon add-ins: BIMpossible.RevitLink (all 6 discipline QA add-ins + RevitLink ship as one smoke-tested set) + Family Fixer (ribbon merged) + a Glossy Glass UI theme, owner-ratified — now also the Add-Ins half of the cross-repo Write Engine (typed instance-parameter writes, live-smoke verified) and a new Project Conformance Engine (Revit-free core + collector adapters).",
      status: "active",
      phase: "main at 7bdfa68, synced with origin — 8 PRs merged since 07-26. RE-1 (EventDispatcher abandoned-request execution), the audit's carried High, closed for real with a secret-scan gate added alongside it (#46). The Assistant pane (Phase 15a) got three fixes 08-04: a docked header + compact pairing panel (#45), a corrected root-cause fix for broken project loads silently rendering as empty — a 200 OK with an unreadable HTML body, not a missed status code (#50) — and a new tell for which backend it's talking to (#51, paired with backend's /whoami #247). Two bigger items landed the same day: the Project Conformance Engine's first real code, a Revit-free core + collector adapters against the 06-28 design spec (#10), and Write Engine Increment 1's Add-Ins half — ApplyOne now writes typed Integer + unit-aware Double on instance parameters (#49), merged lockstep with backend #232 and clearing live-Revit smoke 8/8 (see focus). Closed out with the firm-parameter neutrality doc (#52) and an Assistant user guide wired to F1 (#53). The 07-25 runtime-clobber incident (glass build briefly overwritten in the shared %APPDATA% deploy slot, hash-verified restored) is resolved and downgraded to a standing deploy-hygiene reminder. Last periodic code audit remains 07-14 — the 07-25 doc is a session postmortem, not a scored /audit report, by its own filing note.",
      focus: "Write Engine Increment 1 (Add-Ins half) SHIPPED: PR #49 (0f3d318) merged lockstep with backend #232 the same evening, both green. ApplyOne now writes Integer and unit-aware Double on instance-only parameters; the joint build cleared live-Revit smoke 8/8, including the highest-risk unit-conversion case at a ×10,763.91 factor. Increment 2 (type-param targeting) is unblocked. Two items are still unverified live: Family Fixer's ribbon button is merged but not yet click-tested, and go_single_panel — its one destructive operation — has never been exercised live. The Project Conformance Engine's INSPECT+EVALUATE core merged (#10) but nothing drives it yet — no firm-standard data file has been authored (the engine's STANDARD stage). Hash-verify the %APPDATA% deploy slot against current HEAD (7bdfa68): the full ship set was redeployed and byte-verified after A-2 (#50), but that predates #51/#52/#53. Confirm the abandoned phase15a-pane rebase line (38 disk-only commits, no surviving branch except not-for-merge backup PR #42) is still safe to lose — unchanged since 07-25.",
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
      activity: [0,0,0,0,0,0,0,2,6,3,1,1,3,7],
      lastActivity: {
        date: "2026-08-22",
        summary: "feat(batch-rename): Phase 1 continuous-use upgrade + AddIns path repointing (#90) (c84e64a)"
      },
      branch: "main at 7bdfa68; synced with origin",
      git: null,
      nextActions: ["Family Fixer: live-Revit click-through + icon sign-off + one live go_single_panel execution — the one destructive op never yet run live","Hash-verify the %APPDATA% deploy slot against current HEAD (7bdfa68) — the full ship set was redeployed + byte-verified after A-2 merged (#50, e0ea397), but that predates #51/#52/#53","Port wire_nested_params — the one remaining unported Family Fixer backend op","Ribbon icon/tooltip polish pass: wire ToolTipImage for 20/37 buttons, fix Place Callout Sheets' placeholder icon","Author the first firm-standard data file for the Conformance Engine (STANDARD stage) — INSPECT+EVALUATE now exist (#10) but nothing drives them yet"],
      pendingDecisions: ["Confirm the abandoned feat/phase15a-revit-pane rebased line (38 commits, no surviving branch except not-for-merge backup PR #42) is safe to lose"],
      blockers: ["POWER_SYSTEM deletion-list ruling (PR #33) — still an open owner decision, carried over"],
      reminders: ["Deploy-Local.ps1 writes to a SHARED %APPDATA% Revit Addins folder — hash-check before deploying, never deploy while Revit is open (the 07-25 forensic audit found this exact guard skipped once)","\"Backed up to origin\" is not \"safe to overwrite at runtime\" — the 07-25 postmortem's core lesson; a clean worktree means committed, not complete","Core.dll co-loads in one Revit process: redeploy ALL add-ins together when Core changes"],
      links: [
        { label: "Runtime slot ledger", path: "F:\\BIMpossible-AddIns\\decision-log\\2026-07-25__runtime-slot-handoff.md" },
        { label: "2026-07-25 forensic audit (clobber + cleanup)", path: "F:\\BIMpossible-AddIns\\audits\\2026-07-25__session-audit-cleanup-stream.md" },
        { label: "T4 live-smoke results", path: "F:\\BIMpossible-Workspace\\01_BuildLog\\2026-07-25__T4-live-smoke_RESULTS.md" },
        { label: "Tool backlog", path: "F:\\BIMpossible-AddIns\\TOOL_BACKLOG.md" }
      ],
      recent: ["2026-08-05 - feat(a5): Assistant user guide authored + wired to F1, pairing copy fixed (#53, 7bdfa68) — closes out the overnight-run backlog","2026-08-04 - Firm-parameter neutrality rule documented with an exhaustive exception list (#52, 9ce43c9), paired with backend's same-day doc (#248)","2026-08-04 - Overnight-run trio merged on green CI: broken project loads no longer silently render as empty (#50, e0ea397 — root cause was a 200 OK with an unreadable HTML body, not a missed status code); pairing screen now shows which backend it's connecting to (#51, e38648e, paired with backend /whoami #247); Assistant pane header docked + pairing panel compacted (#45, d1040b7)","2026-08-04 - Write Engine Increment 1 (Add-Ins half) shipped: ApplyOne writes typed Integer + unit-aware Double on instance parameters, merged lockstep with backend #232 and cleared live-Revit smoke 8/8 incl. a ×10,763.91 unit-conversion case (#49, 0f3d318)","2026-08-04 - feat(conformance): Project Conformance Engine lands its first real code — Revit-free core + collector adapters, against the 06-28 design spec (#10, 94b21ab)","2026-07-27 - fix(revitlink): RE-1 closed — the audit's carried High (EventDispatcher abandoned-request execution) fixed for real, plus a secret-scan gate added (#46, 19cd5dd)","2026-07-26 - fix(revitlink): \"Passes 1-4\" — functionality + Glass theme + honest controls + definition-of-done + ship-set deploy fix, live-verified in Revit 2026 (#40, 13f1a45); docs restored for the post-audit UI workflow (#44, 1366569)","2026-07-25 - feat(t4-task6): per-edit apply outcomes posted to edit_log, closing an idempotency race (#39, faf9475)","2026-07-20 - feat(open-in-revit): bimpossible:// protocol handler (new BIMpossible.OpenInRevit project) + RevitLink PendingOpenWatcher (a661924) — pairs with BIMpossible's cloud-ids endpoint (#188) so the web app's 'Open in Revit' button actually launches the model","2026-07-15 - CI gap CLOSED (d292a38): CI now compiles RevitLink on both TFMs (net48 + net8.0-windows) — the real lesson C-01 pointed at, even though C-01 itself was a false positive. Same commit fixed 3 latent twins of audit findings M-21/M-10/M-28","2026-07-15 - Panel schedules: grid-aligned rows across columns, copy ALL start-sheet detail items (not just the legend), clear key-plan/level/north-arrow, propagate Sheet Collection (48dde6f/864a672)","2026-07-15 - Duplicate tool UX: nothing pre-checked by default + shift-click range-select, Check-all/Uncheck-all act on the full dataset (not just visible filter results), naming-collision perf fix (c40ac1c/9fd4791/65dfa51)","2026-07-15 - Progress popup for every long-running loop across the suite (cc07730/3368097); Place Callout Sheets popups follow the real Revit theme (23f9d45); Section Clip derives datum from section geometry (3ab69fb)","2026-07-14 - 2026-07-12 audit CLOSED: C-01 disproven (clean net48 build), all 10 highs fixed, Check Conflicts wired, 2 dead tools retired (audits/2026-07-12__audit-resolution.md)","2026-07-14 - feat(revitlink): Replicate Levels tab, Duplicate UX, panel-schedule packing + legend fixes (98c515b)","2026-07-14 - fix(retag-rooms): orphaned '?' tags were silently skipped and never reported — owner-caught bug (95c0ba4)","2026-07-14 - fix(ribbon): tooltip images were 5x over Revit's 355px limit — stripped 16 oversized images + fixed the capture recipe (6a5a48f)","2026-07-14 - fix(theme): last two theme-blind popups (Room Data, Electrical Param Sync) now follow Revit's Light/Dark (e6e936c)","2026-07-14 - feat(duplicate): view-rename autofill detects ALL disciplines in a mixed selection, one Find row each (d97339f)"],
      audit: {
        lastRun: "2026-08-08",
        runType: "No full /audit-format report exists for Add-Ins since 2026-07-12. Two newer artifacts exist in audits/ but neither is a scored code-findings report: 2026-07-25__session-audit-cleanup-stream.md is an explicit session forensic postmortem (its own filing note: not from the /audit pipeline, not indexed in _audit-runs.md, zero code findings); 2026-08-08__tdd-exclusion-census.md is a narrow deterministic test-coverage measurement (ADDINS-TDD-CENSUS), also explicitly not a findings audit ('No fixes in this pass... No target percentage is set'). counts and open[] below are carried BYTE-FOR-BYTE unchanged from the 2026-07-14 resolution of the 2026-07-12 full audit -- no new findings, no closures assumed. lastRun is bumped to 2026-08-08 only to point at the newest dated artifact in the folder; treat this card as running on a real freshness debt (27 days since the last full code audit) rather than as recently re-verified. git log --since=2026-07-12 on Add-Ins shows 103 commits on main since that audit, none individually checked against a specific carried finding ID in this pass.",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 4, low: 6, info: 1 },
        closedLastRun: 0,
        trend: "flat -- no re-audit has run since 2026-07-12; nothing to compare (previously read \"improving\", which overstated freshness)",
        reportPath: "F:\\BIMpossible-AddIns\\audits\\2026-08-08__tdd-exclusion-census.md",
        reportFile: "addins/2026-08-08__tdd-exclusion-census.md",
        ledgerPath: "F:\\BIMpossible-AddIns\\audits",
        open: [
          { id: "M-14", sev: "medium", title: "LevelSheetTitle.Build's split-level continuation marker needs a signature-level redesign, not a patch — deferred, not scheduled, explicitly not 'fixed'.", where: "Shared/Sheets/LevelSheetAllocator.cs (LevelSheetTitle.Build)" },
          { id: "MI-17", sev: "medium", title: "SortSheetsCommand's 'fix' is a documented mirror, not a real extraction — the pure sort logic stays private inside a Revit-bound class and the test hand-copies the algorithm. A real fix needs an H-03-style extraction.", where: "Commands/SortSheetsCommand.cs:167-180" },
          { id: "MI-19", sev: "medium", title: "Stale worktrees under .claude/worktrees/ — 3 fully merged/identical to main (safe to remove), 1 detached orphaned HEAD needing inspection before touching. No behavioral impact; deferred as destructive git hygiene.", where: ".claude/worktrees/*" },
          { id: "MI-20", sev: "medium", title: "5 branches carry real unmerged work, legitimately gated on explicit owner sign-off, but all fork from an aging main and independently touch files main has since changed repeatedly — merge-conflict cost grows the longer sign-off is deferred.", where: "docs/conformance-*, feat/conformance-* branches" },
          { id: "M-30", sev: "low", title: "Reclassified from a safety finding to screenshot debt: Trim Out-of-Scope Sheets' guide text and toggle warning are correct and complete, but 3 images are stale/missing (captured before the destructive toggle existed). Errs safe — under-shows the danger, not over.", where: "How to Guides/.../Trim Out-of-Scope Sheets/assets/*" },
          { id: "M-33", sev: "low", title: "Place Callout Sheets ships with a placeholder icon, reusing Create Callout Views' icon pixel-for-pixel (self-admitted in a code comment). Ribbon icon/tooltip-image polish (also: 20/37 buttons missing ToolTipImage) postponed to a dedicated pass, owner decision 2026-07-14.", where: "App.cs (Place Callout Sheets Icon=)" },
          { id: "L-03", sev: "low", title: "Zero 16px icon variants exist anywhere in Resources (all 56 icons are 32×32) — corrected severity 2026-07-14: this is a Quick Access Toolbar edge case only (Revit downscales cleanly inside the ribbon panel itself), not the 'affects the majority of the ribbon' issue originally claimed.", where: "Resources/*.png" },
          { id: "L-13", sev: "low", title: "Set Up Project still shows 4 sequential modal dialogs (Tool1, Tool2, Tool3, then the orchestrator's own) instead of one consolidated report — a UX redesign, needs a human call.", where: "SetupProjectOrchestratorCommand.cs:72,202,206,212" },
          { id: "L-19", sev: "low", title: "secrets.DASHBOARD_PAT's actual token scope is still unconfirmable from any file visible to static inspection.", where: ".github/workflows/dashboard-sync.yml:37" },
          { id: "L-21", sev: "low", title: "RevitAPI NuGet still pinned to 2026.*-* across RevitLink and all 6 discipline add-ins for a net8 target CLAUDE.md describes as spanning Revit 2025/26/27 — a cross-version API difference would only surface via manual multi-version testing; needs a human policy call.", where: "e.g. BIMpossible.Structural/BIMpossible.Structural.csproj:24" },
          { id: "I-08", sev: "info", title: "Dead decision-log citation (decision-log/2026-05-25__revit-link-remediation.md, which doesn't exist) lives in .cs comments — out of scope for the 2026-07-14 docs-only reconciliation pass.", where: "Commands/SyncWithCentralCommand.cs:28,49 · SyncWithCentralRibbonCommand.cs:49" }
        ],
        history: [
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
      phase: "M3 LIVE: yourbimpossible.com deployed on Cloudflare Pages. All 2026-06-09 audit findings cleared. LinkedIn Company Page live (linkedin.com/company/bimpossible). WAF rate rule, 5-hash CSP, Turnstile on /contact, 13.7KB font subset, 405 Allow, dead font fixed — all deployed 06-09/10. Next milestone: M4 (structured data, broken-link sweep).",
      focus: "Business infra (email aliases, social handles, LLC) and product imagery (real screenshots on Leaders/BIM Managers pages) are the two remaining pre-launch gaps — M4 SEO is done. M5-M6 (pricing + commercial launch) not started.",
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
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-07-10",
        summary: "fix(site): close CONTACT-RL, TURNSTILE-HOST, CSP-STYLE from the 2026-07-10 audit (0594e6e)"
      },
      branch: null, git: { latestCommit: "709f352" },
      nextActions: ["Email routing aliases: hello@/support@/legal@/billing@/zeriah@ → Gmail (recipe in IP-Lockdown-Checklist.md Phase 1.5)","Product screenshots: get real app screenshots into Leaders + BIM Managers pages","Dashboard auth: fix Cloudflare Zero Trust login — add GitHub OAuth IDP (OAuth App at github.com/settings/applications → callback: https://flat-queen-a958.cloudflareaccess.com/cdn-cgi/access/callback)"],
      pendingDecisions: [
        "Dashboard Zero Trust auth: GitHub OAuth IDP setup in progress — needs OAuth App created in GitHub, client ID + secret added to Zero Trust login methods"
      ],
      blockers: [],
      reminders: [
        "Dashboard LIVE at ai-dev-dashboard.pages.dev / progress.yourbimpossible.com (Cloudflare Zero Trust auth pending — OTP email delivery issue; GitHub OAuth IDP setup in progress)",
        "Product screenshots needed on Leaders + BIM Managers pages before M4 can be considered complete",
        "Email aliases recipe ready in IP-Lockdown-Checklist.md — Phase 1.5 task, not yet executed"
      ],
      links: [
        { label: "Roadmap index", path: "F:\\BIMpossible-Site\\00_README.md" },
        { label: "IP lockdown checklist", path: "F:\\BIMpossible-Site\\IP-Lockdown-Checklist.md" },
        { label: "Build log", path: "F:\\BIMpossible-Site\\01_BuildLog" },
        { label: "Site code", path: "F:\\BIMpossible-Site\\site" }
      ],
      recent: [
        "2026-06-27 - Header logo visibility fix + theme toggle collapsed to single cycling button (709f352)",
        "2026-06-13 - M1/M2/M3 + L2/L3/L6/L8 closed from the 2026-06-13 full audit (404f9a0)",
        "2026-06-11 - LinkedIn Company Page published (linkedin.com/company/bimpossible); launch post live",
        "2026-06-10 - WAF rate rule deployed; re-verified live: 5-hash CSP, 405 Allow, Turnstile on /contact, dead font 404 fixed, 13.7KB font subset",
        "2026-06-09/10 - All audit findings cleared + deployed; Lighthouse 100/100/100/100 across all 6 pages",
        "2026-06-09 - Triple audit (perf/architecture/code-review); contact form Turnstile + Web3Forms live; 13 e2e tests"
      ],
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
      phase: "Dormant since 2026-06-01 (confirmed: HEAD 705609b, no commits/branches/reflog activity since; site still responds live). The 06-01 snapshot itself under-described the state — auth, scoring, and deploy were already substantially done by then, not \"in progress.\"",
      focus: "Owner call: resume before NFL preseason (August) or park explicitly. If resuming, the app is much closer to done than the old card suggested — the main gap is running it through a live event, not building remaining features.",
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
      nextActions: ["Owner call: resume for NFL preseason (August) or park explicitly — most core functionality (auth, scoring, deploy) is already built and live"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["Idle since 2026-06-01 (52 days as of 07-23) — confirm dormant status; NFL preseason deadline approaching (August)","Hard real-world deadline: NFL preseason (August)"],
      links: [
        { label: "PRD", path: "F:\\AI-Dev\\Preseason Pick'em\\PRD.md" },
        { label: "Workspace index", path: "F:\\AI-Dev\\Preseason Pick'em\\WORKSPACE_INDEX.md" },
        { label: "App", path: "F:\\AI-Dev\\Preseason Pick'em\\PreseasonPickem-app" }
      ],
      recent: [
        "2026-06-01 - rankings + scoring engine/leaderboard libs added"
      ]
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
      phase: "Spans two repos per ROADMAP.md: Families-by-BIMpossible (\"brain\" — Python planner/verifier/harness) + BIMpossible-AddIns (\"hands\" — BIMpossible.RevitLink). Roadmap committed 2026-07-23 (d3dd3de) after nearly being lost unwritten — the doc's own words. Both repos in sync with origin. See progress.phases[] for real status; this field intentionally stays short now that ROADMAP.md is the detailed source of truth.",
      focus: "Phase 1's live rehearsal ran 07-22 (Revit 2026, via revitlink_pipe_adapter): probe_family, add_shared_params, and add_family_params all verified; go_single_panel — the one destructive op — was NOT exercised, which the roadmap itself now calls \"the real remaining Phase 1 risk.\" The ribbon button MERGED (Add-Ins PR #25, 07-25) — no longer awaiting a window. Phase 3 gained real Autodesk-platform findings (Revit Public MCP Server Tech Preview + in-product Assistant GA) that narrow its scope to family-editing + the safety model specifically, and surface a new dependency: reconcile with BIMpossible_Workspace's own \"Phase 16 — Desktop Orchestration Hub\" ledger proposal before scoping further — two related MCP initiatives now exist in two repos.",
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
      activity: [0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      lastActivity: {
        date: "2026-08-22",
        summary: "chore(paths): Batch B5 — tool scripts + How-To -> F:\\BIMpossible-Families (#9) (473351e)"
      },
      branch: "main",
      nextActions: ["Run a live go_single_panel execution against a real family — the one destructive Phase 1 op never yet exercised live","Port wire_nested_params to close Phase 1 fully","Reconcile Phase 3's scope with BIMpossible_Workspace's Phase 16 (Desktop Orchestration Hub) proposal before scoping further","Settle ROADMAP.md's open questions (who writes Phase 2's C#, sequencing) before Phase 2 can start"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["ROADMAP.md (repo root) is the single source of truth for this whole multi-repo effort — update its status lines whenever a phase moves, in whichever repo/session does the moving","Multiple sessions/worktrees can work this roadmap in parallel for source edits, but Deploy-Local.ps1 writes to a SHARED %APPDATA% Revit Addins folder, last-writer-wins — only one session may hold the deploy target (mid-rehearsal/mid-deploy) at a time"],
      links: [
        { label: "Roadmap (single source of truth)", path: "F:\\BIMpossible-Families\\ROADMAP.md" },
        { label: "Tool README", path: "F:\\BIMpossible-Families\\README.md" }
      ],
      recent: [
        "2026-07-25 - button merged, rehearsal partially run (aa41e62)",
        "2026-06-28 - NetworkX remediation-order DAG: blast-radius + clusters + topo sort (7fd2e48)",
        "2026-06-27 - Device verifier + phase-1 handoff checklist + ideas backlog (7891090); XFMR_PROFILE expanded 5→12 params + 4 new shared params (b0d5f0b)",
        "2026-06-13 - device-class param profiles (CB/MTR/DISC) + 1:1 device param map (4a52fc2); per-type equipment profiles + display-recipe framework (a9fb7f0)",
        "2026-06-12 - session postmortem + approach decision (Approach B locked)"
      ]
    },
    /* PROJECT:families:END */
    /* PROJECT:aiserver:START */
    {
      id: "aiserver",
      name: "AI-Server",
      icon: "cube",
      oneLiner: "Portable, fully-local LLM inference + automation platform. Dev on the RTX 5080 now; relocates to a dedicated RTX 3090 box by one .env line (OLLAMA_HOST).",
      status: "active",
      phase: "Repo live + private (YourBIMpossible/AI-Server); main at 413bdc9, 3 commits ahead of origin (unpushed docs) + uncommitted PROGRAM_PLAN.md/README.md edits — an active session, not stale. New since 07-12: a \"pickup_checker\" tool built on a separate unmerged branch/worktree (worktree-pickup-checker) — see progress.phases[] below. WP-A/B/C/F/D1 all merged and stable; no regressions found.",
      focus: "pickup_checker's Milestone-1 code is done (14/14 tasks, 67/67 tests) but its own spec's ship-gate — 4/4 golden-set gates passing on real labeled data — is unmet, and the code isn't even merged to main yet. WP-E (ops/serving hardening) remains untouched; WP-G is mostly untouched too, with one exception — a local coding agent (opencode + qwen3-coder) verified working 07-25, see progress below.",
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
      activity: [0,0,0,0,0,0,0,0,0,1,0,0,0,4],
      lastActivity: {
        date: "2026-08-22",
        summary: "chore(rag): rag_sources Workspace root → F:\\BIMpossible-Workspace (census 19 B8) (6ff31ad)"
      },
      branch: "main at f37d165",
      nextActions: ["Label a real GoldenSet v1.0 for pickup_checker and run its 4 ship gates against real data","Merge worktree-pickup-checker to main once the golden-set gate is met","Merge or continue the worktree-harness branch (7/8 tasks done, WP-G2-adjacent)","Commit + push the opencode/local-coding-agent doc updates (PROGRAM_PLAN.md + README.md) — currently uncommitted edits on main","WP-D3: land the owner's G:-hosted SKILL.md cutover — last open WP-D item"],
      pendingDecisions: [
        "3090 box OS (Ubuntu Server vs Windows) + runtime (Ollama now vs vLLM later) - see build plan"
      ],
      blockers: [],
      reminders: ["3090 box not assembled yet — dev on the 5080; relocates via one .env line (OLLAMA_HOST)","Full code-audit PR #9 (06-18) findings are closed; the 07-12 incremental audit is also fully closed, suite at 131 passed"],
      links: [
        { label: "Program plan", path: "F:\\AI-Dev\\AI-Server\\PROGRAM_PLAN.md" },
        { label: "Handoffs (WP-A..G)", path: "F:\\AI-Dev\\AI-Server\\handoffs" },
        { label: "Build/hardware plan", path: "F:\\AI-Dev\\AI-Brain-Data\\_status\\AI-Server_Build_and_Integration_Plan.md" },
        { label: "GitHub repo", path: "https://github.com/YourBIMpossible/AI-Server" }
      ],
      recent: [
        "2026-06-23 - docs: add 2026-06-18 full code-audit report (#9) (6b057ac)",
        "2026-06-17 - 4 commits: WP-D scope adjustments (D3 local-LLM revert + aim docs + owed-task list)",
        "2026-06-16 - WP-A core aiserver library; smoke-test + daily_digest refactored onto it; CI + branch protection; repo created"
      ],
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
      phase: "Local-only git repo (no GitHub remote). HEAD still 8e8b564 (2026-06-28), but the vault has kept accumulating daily context-log/copy-state/raw-log churn since — now 123 uncommitted files (up from 84 on 07-14), none committed in over three weeks. Post-graphify baseline shipped: 70 notes enriched, 12 MOCs created. The vault feeds AI-Server WP-B (RAG over AI-Brain-Data docs).",
      focus: "Commit the accumulated daily context-log churn (123 files, growing) before it's unmanageable to review; keep Revit-AI context current; feed AI-Server WP-B (sqlite-vec RAG index) when that work package starts.",
      progress: {
        label: "Workstreams",
        phases: [
          { name: "Vault foundation", pct: 95, note: "Obsidian vault live; 12 MOCs + decision-log + standards-and-refs populated (post-graphify baseline, 8e8b564, 06-28). revit-snippets/ folder exists but is empty — 0 files, never populated despite earlier claims." },
          { name: "Revit-AI context pipeline", pct: 80, note: "Capture + parsing + daily/weekly summarization fully automated and running (raw-logs through 07-22; last processed run 07-18, 42 sessions, 0 issues). Collector rewritten to fix an overwrite/data-loss bug (collect_revit_journals.py, uncommitted). Ingestion into AI-Server still not built — blocked upstream: AI-Server hardware not yet assembled." }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      lastActivity: {
        date: "2026-08-22",
        summary: "Revit-AI pipeline data through 2026-08-23 (raw-logs, processed, daily-summaries, context) — pre AI-Dev extraction (7d1b22b)"
      },
      branch: "master (local-only, no remote)",
      git: { warn: "No GitHub remote — local-only git. Confirm whether this should stay private or get a private remote for backup." },
      nextActions: [
        "Commit the accumulated context-log/copy-state/raw-log churn (123 uncommitted files as of 2026-07-21, spanning Revit-AI/context, processed/by-day, processed/by-file, daily-summaries, raw-logs/*)",
        "Start AI-Server WP-B RAG index build when WP-B work package begins"
      ],
      pendingDecisions: [
        "Should AI-Brain-Data get a private GitHub remote for offsite backup?"
      ],
      blockers: [],
      reminders: [
        "123 uncommitted files as of 2026-07-21 (up from 3 on 06-28, 84 on 07-14) — daily Revit-AI context/copy-state/raw-log churn has gone 3+ weeks without a commit"
      ],
      links: [
        { label: "Local vault", path: "F:\\AI-Dev\\AI-Brain-Data" },
        { label: "Revit-AI context", path: "F:\\AI-Dev\\AI-Brain-Data\\Revit-AI\\context" }
      ],
      recent: [
        "2026-06-28 — normalize line endings (8e8b564)",
        "2026-06-28 — remove Zai-brain embedded repo, add to gitignore (1129bd6)",
        "2026-06-28 — post-graphify baseline — 70 notes enriched, 12 MOCs created (be1cdae)"
      ]
    },
    /* PROJECT:ai-brain-data:END */

    /* PROJECT:bimpossible-workspace:START */
    {
      id: "bimpossible-workspace",
      name: "BIMpossible Workspace",
      icon: "folder",
      oneLiner: "Strategy docs, build logs, prompts, and diagrams that support the BIMpossible platform repo. Phase status ledgers, wave logs, Claude startup prompts, and design proposals all live here.",
      status: "active",
      phase: "main branch, synced with origin except 1 unpushed local commit (`1cd954a`, active session). ~50 commits 07-24->07-26: ecosystem-research findings ratified into decision ledgers (eco-3/4/7/5); a structure-sprawl audit closed at zero, independently re-verified; a 2026-07-25 session forensic audit filed after a runtime clobber during Add-Ins/Families cleanup (now resolved — see the addins card); prod auth verified working 07-25; Phase 13 T4 + Phase 15a rows corrected to merged+live in the ledger. Key sources of truth unchanged: 00_Strategy/BIMpossible_PHASE-STATUS.md, WAVE-STATUS.md, STATE-LIVE.md.",
      focus: "Ratify eco-5 (Phase 10 portfolio guardrail) — still \"researching\" despite a completed Speckle competitive comparison. Confirm the abandoned feat/phase15a-revit-pane rebased line (38 commits, no surviving branch) is safe to lose — cross-referenced from the addins card's forensic audit. Land the active, uncommitted Task 6 edit-log-contract design doc once finalized.",
      progress: {
        label: "Content areas",
        phases: [
          { name: "Strategy + ledgers", pct: 90, note: "Ecosystem research harvested into decision ledgers: eco-3 (generic-PM exclusion) ratified; eco-4 (annotation automation) denied, moved to reopenable Watchlist FG-R3; eco-5 (Phase 10 portfolio guardrail) extended w/ a Speckle competitive comparison, still \"researching\"; eco-7 (MCP scope) corrected researching→approved (f5c7a5a, 1cd954a — latter unpushed, active session). PHASE-STATUS/STATE-LIVE hand-updated same day for Phase 13 T4 + Phase 15." },
          { name: "Repo hygiene + workflow guardrails", pct: 92, note: "Structure-sprawl audit closed \"sprawl reaches ZERO,\" independently re-verified in a second pass that also found+cleaned 6 stale remote refs (5f27190, 8061e1a, 7604960, 20d505d, cde8c5b, all 07-24). 2026-07-25 session forensic audit filed after a runtime clobber during Add-Ins/Families cleanup — glass build briefly overwritten by main, hash-verified restore, since fully reconciled (see the addins card). Prod auth verified working 07-25 + a 3-minute regression recipe written (5c63239)." },
          { name: "Design proposals + architecture", pct: 88, note: "design-docs/ grew 13→16 files: Phase 13 T4 \"Apply BIMpossible Changes\" plan + reality-check + self-contained handoff doc (2bea7ec, cd19fc5, b835120); a new Task 6 edit-log-contract plan (untracked, active session). Write-engine type-param design brief added (1cd954a). Open-in-Revit cross-browser UX plan explicitly PARKED, not to be implemented (f3d6fd4)." },
          { name: "Prompts + skills", pct: 85, note: "Unchanged this window — zero .claude/ commits since 07-22. Flagging rather than silently correcting: on-disk today shows 3 skills / 5 agents / 7 commands, not the 6 skills this note previously claimed — that discrepancy's origin is unverified." }
        ]
      },
      activity: [0,0,0,0,1,2,9,14,13,3,0,9,8,7],
      lastActivity: {
        date: "2026-08-22",
        summary: "docs(census): close out doc 19 — Batch B executed, no further action (#82) (e9b559a)"
      },
      branch: "main at ae4b7af; synced with origin",
      git: null,
      nextActions: ["Land the active Task 6 edit-log-contract design doc (currently untracked) once finalized","Push the unpushed local commit (1cd954a) once this session's eco-research work is ready to share","Ratify eco-5 (Phase 10 portfolio guardrail) — Speckle comparison done, still marked \"researching\""],
      pendingDecisions: ["Ratify eco-5 (Phase 10 portfolio guardrail) — Speckle comparison done, still marked \"researching\"","Confirm the abandoned feat/phase15a-revit-pane rebased line (38 commits, no surviving branch) is safe to lose — cross-referenced from Add-Ins' 07-25 forensic audit"],
      blockers: [],
      reminders: ["2026-07-25 session forensic audit (`02_Reference/Audit Reports/2026-07-25__session-audit-addins-cleanup-runtime-clobber.md`) is a process/custody postmortem, not a code-quality `/audit` report — it won't appear in `_audit-runs.md` and its findings live in narrative fields on the addins/families cards, not in any audit finding-count","Decision ledger for ecosystem research: 00_Strategy/Dashboard/strategy_decisions_ledger.md (eco-N items)"],
      links: [
        { label: "Local workspace", path: "F:\\BIMpossible-Workspace" },
        { label: "Phase status", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_PHASE-STATUS.md" },
        { label: "Wave status", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md" },
        { label: "GitHub", path: "https://github.com/YourBIMpossible/BIMpossible_Workspace" }
      ],
      recent: [
        "2026-07-16 — docs(write-spine): items 1/3/4/5 recorded; PHASE-STATUS Phase-7/3 rows corrected; WAVE-STATUS Wave 29 updated (ae4b7af)",
        "2026-07-16 — docs(wsr8): step-2 write-wiring marked BUILT+SHIPPED (8114f8e); docs(phase15-A2) ops-note correction (ab822ca)",
        "2026-07-14 — docs(phase3): 2026-07-14 production-readiness audit report + PHASE-STATUS/WAVE-STATUS corrections (f07ebb9)"
      ]
    },
    /* PROJECT:bimpossible-workspace:END */

    /* PROJECT:dashboard-auto:START */
    {
      id: "dashboard-auto",
      name: "Dashboard (Auto Clone)",
      icon: "refresh",
      oneLiner: "Automation-dedicated clone of the ai-dev-dashboard repo. The scheduled refresh pipeline (sync_*.py scripts, GitHub Actions sync) commits directly here; F:\\AI-Dev\\Dashboard is the human-edit copy.",
      status: "active",
      phase: "main branch, same remote as Dashboard (YourBIMpossible/ai-dev-dashboard) — both clones now in sync with origin (confirmed 2026-07-23, HEAD a571627). The 2026-06-28 10-commit fast-forward lag is long resolved; the scheduler runs the 06:00 daily refresh from THIS clone via Task Scheduler, confirmed landing pushes 07-19 through 07-23. The local dashboard monitor (:8081 live-server + 2min loop) was REMOVED 2026-07-21 (e1aae72) after repeatedly dying into a silently-stale orphan state — refresh is now scheduled-or-on-demand only (Refresh-Now.cmd).",
      focus: "CI/CD write target for automated data refreshes; do not hand-edit here — manual changes go in F:\\AI-Dev\\Dashboard. Both known deploy targets are live and independently verified: Cloudflare Pages (deploy.yml → wrangler, the deliberate pipeline) and a parallel, unconfigured default GitHub Pages auto-build (no workflow file drives it — just a side effect of the repo being public). They currently serve identical content; worth deciding which one is canonical if that ever matters.",
      progress: {
        label: "Automation pipeline",
        phases: [
          { name: "Sync scripts", pct: 90, note: "sync_activity.py, sync_ledgers.py, sync_dashboard.py, usage_sync.mjs, codebase_sync.mjs, agents_sync.mjs, github_actions_sync.mjs, graph-metrics.js all present and running daily. codebase_sync.mjs joined the scheduled run 2026-07-21 (c9ffc30), ending a 6-week-frozen Codebase tab; graph-metrics.js became ledger-self-owned the same day (9e6f7e6)." },
          { name: "GitHub Actions deploy", pct: 90, note: "deploy.yml → Cloudflare Pages confirmed live (ai-dev-dashboard.pages.dev, HTTP 200, run logs green 2026-07-23) + github-actions-live.yml billing sync. A second, unconfigured GitHub Pages auto-build also serves the same content in parallel (yourbimpossible.github.io/ai-dev-dashboard) — nobody deliberately set this up." },
          { name: "Refresh model", pct: 100, note: "Local :8081 monitor (120s loop, live-server) REMOVED 2026-07-21 (e1aae72) after repeatedly dying into a silently-stale orphan. Now scheduled-only (Task Scheduler daily 06:00 → Dashboard-auto) + on-demand (Refresh-Now.cmd); 5/5 daily pushes confirmed landing 07-19..07-23." }
        ]
      },
      activity: [2,5,2,3,3,4,3,6,8,3,3,3,8,9],
      lastActivity: {
        date: "2026-08-22",
        summary: "dashboard refresh 2026-08-22 21:29 (46be99e)"
      },
      branch: "main at a571627; both Dashboard and Dashboard-auto in sync with origin",
      git: null,
      nextActions: ["Decide whether the incidental GitHub Pages mirror (yourbimpossible.github.io/ai-dev-dashboard) should be disabled in repo Settings to avoid two divergeable live copies, or left as a free redundant mirror"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["Two independently-live copies of this dashboard exist: Cloudflare Pages (deliberate, deploy.yml) and GitHub Pages (incidental, unconfigured default for a public repo) — both served identical content as of 2026-07-23"],
      links: [
        { label: "Auto clone folder", path: "F:\\AI-Dev\\Dashboard-auto" },
        { label: "GitHub repo", path: "https://github.com/YourBIMpossible/ai-dev-dashboard" }
      ],
      recent: [
        "2026-06-28 — fix(refresh): harden automation-clone refresh (e575b63)",
        "2026-06-28 — dashboard refresh 2026-06-28 09:56 (0707957)",
        "2026-06-28 — auto-sync: families card (0fcc1cc)"
      ]
    },
    /* PROJECT:dashboard-auto:END */

    /* PROJECT:pc-monitor:START */
    {
      id: "pc-monitor",
      name: "PC Monitor",
      icon: "monitor",
      oneLiner: "Fully-local workstation monitoring stack for the Ryzen 9 9950X3D + RTX 5080 rig. Python collector → SQLite; zero-dependency web dashboard with live view + historical scrubbing. No cloud, no telemetry.",
      status: "active",
      phase: "Git-initialized as of 2026-07-12 (3 commits, dd1bb9d baseline → bb97b0c) — the \"no git\" era ended. Python collector (collector.py) + Flask web app (app.py) + SQLite (db.py). Actively logging: metrics.db-shm mtime 2026-07-22. Packaged as a Windows-native install (install-task.ps1 → Task Scheduler; desktop shortcut at http://127.0.0.1:8787).",
      focus: "Tool is operational and actively logging. AI-Server WP-D2 (Ollama GPU/inference profiling) is built and enabled (config.json ollama.enabled=true), not just planned.",
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
      nextActions: [
        "Confirm PyInstaller build is current and PC-Monitor-app.zip is up to date",
        "Wire GPU/inference profile into AI-Server WP-D when that work package starts"
      ],
      pendingDecisions: [
        "Should PC-Monitor be git-initialized and pushed to a private repo for version history?"
      ],
      blockers: [],
      reminders: ["Git now exists (since 07-12, 3 commits) — update any doc/dashboard text still saying \"no git\"","No dist/build/zip package currently in the repo despite PC-Monitor.spec being present — confirm before claiming a packaged build exists"],
      links: [
        { label: "Local app", path: "F:\\AI-Dev\\PC-Monitor" },
        { label: "Live dashboard", path: "http://127.0.0.1:8787" },
        { label: "README", path: "F:\\AI-Dev\\PC-Monitor\\README.md" }
      ],
      recent: [
        "2026-06-25 — last local modification (no git log available)"
      ],
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
