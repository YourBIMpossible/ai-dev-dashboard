// F:\AI-Dev project dashboard data (schema v4 - tasks added to phases)
// AUTO (daily 06:00 refresh from the Dashboard-auto clone): phases+waves from the BIMpossible
//   ledgers (sync_ledgers.py, no LLM); activity+lastActivity from git (sync_activity.py).
// MANUAL / on-demand: prose fields (phase, focus, oneLiner, recent, nextActions, branch, audit).
//   The GitHub-Models prose bot has no trigger on the code repos, so prose only moves on an
//   on-demand "refresh dashboard" pass and goes stale between passes. See REFRESH-SPEC.md.
window.DASHBOARD_DATA = {
  generated: "2026-10-06",
  generatedBy: "scheduled refresh",
  activitySince: "2026-09-23",
  projects: [
    /* PROJECT:bimpossible:START */
    {
      id: "bimpossible",
      name: "BIMpossible Platform",
      icon: "layers",
      oneLiner: "Discipline-neutral BIM data platform above Autodesk's tools (reads ACC, custom interface, write-back later).",
      status: "active",
      phase: "main synced with origin (tip 943af02c, 2026-09-26). 09-23..09-26 landed ~60 PRs (#697-#768): Phase 13 Review + Push Center train (review controls #715, project Push Center #721, review ops #725, history/outcomes #731/#732, Change Intelligence #743, transactional lifecycle outbox #735/#740, server-derived apply_readiness #762 + post-merge fixes #764/#765) rolled out on the local stack at 52a4a907 and browser-smoked -> PHASE-STATUS P13 40% -> 48% (CONTROLLED VALIDATION, no production claim); Phase 17 code-complete and dormant (config contract #716-#719, admin readiness #733/#739, dormant Slack/Teams dispatch seam #738, closeout #750); env contract registry + drift check (#724); Phase 9 element-centric cutsheet bindings + review page + flag-gated ingest trigger (#713/#745/#748; P9 10% -> 35%); deploy-evidence + one-command Revit verification tooling (#714/#720/#758/#759/#767) and Phase E clean backend rebuild at 52a4a907 (deploy evidence CURRENT, rollback anchors pinned). Workflow reset #768 restores solo-owner delivery authority + risk-proportionate verification; control-gaps plan and ctl/p1 merge-gate stack open as drafts (#751/#753/#755/#760/#763). No new weekly audit since WFA 09-21; Revit end-user verification not yet run. WAVE-STATUS unchanged since 09-21 (waves 37-39 still BUILT).",
      focus: "Move the 09-23..09-25 trains from 'deployed on the local stack + browser-smoked' to 'end-user verified': clear the deploy-evidence gate (an untracked review folder in the deploy checkout holds it at exit 3), decide which installed add-in build to certify, then run the attended Revit verification incl. Phase 13 Apply through the new Push Center surfaces. In parallel: Phase 13 step 3 waits on the Task 8 reconciliation + owner apply-contract rows; Phase 17 stays dormant pending owner policy decisions and external pilot prerequisites; delivery-control direction (#768 solo-owner reset vs the draft ctl/p1 merge-interception stack) needs an owner call.",
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
            note: "ACTIVE — Permanent, never-closing data substrate. Phase 3.10 Cross-Model Joins: IN PROGRESS — 3.10a FUNCTIONALLY PROVEN 2026-07-15 (warm pipeline ran for real: 1,239 footprints + 14,873 origins from 0; join resolves real rooms through the real endpoint; AC-1/2/3 ALL PASS after the p50 perf fix, 215→18ms; backend flag `BIMPOSSIBLE_PHASE3_10_ENABLED` REMOVED 2026-08-04 (join now unconditional for in-scope instance-grain categories, self-limited by room-cache warmth), frontend display flag `NEXT_PUBLIC_BIMPOSSIBLE_PHASE3_10_ENABLED` still OFF (strips the columns), room cache = 0 rows as of 2026-09-04 so the feature is inert in practice; user-facing display still needs a fresh supervised warm run (re-confirm AC-1/2/3) + the frontend flag flip, see §sub-phase notes); 3.10b Furniture slice SHIPPED (`4bb6497`); Doors SHIPPED as a 3.10b slice 2026-08-04 (pair-resolver `resolve_linked_rooms_for_doors`; door-schedule endpoint `get_architectural_door_schedule`) — inert in practice like the rest of 3.10; single-room doors render \"(no second room)\" since [#611](https://github.com/YourBIMpossible/BIMpossible/pull/611) `408af85b`, frontend deployed 2026-09-07 per [#612](https://github.com/YourBIMpossible/BIMpossible/pull/612); Ducts/Pipes awaits a product decision. Phase 3.8: minimal wedge DECIDED 2026-07-15, slice 1 shipped + prod-migrated (is_draft = membership-scoped per owner); slices 2-3 updated 2026-09-04 — slice 2 SHIPPED (is_draft now read via `membership_visible_clause`, PR #499 — slice 1 no longer inert); slice 3 endpoint BUILT but flag-gated + unexercised (`BIMPOSSIBLE_ACC_ROLE_SYNC_ENABLED`; needs a real ACC admin token) — see §sub-phase notes. Phase 3.12 (RATIFIED 2026-08-18): tenancy call for multi-firm project sharing = extend row-level isolation — keep per-row `firm_id` scoping and add a project-membership join for shared projects; no move to a separate ACL store. Closes the `BIMpossible_OpenQuestions.md` #4 revisit. The \"full onboarding documentation\" half of #5 remains open (see Phase 8 runbook item). Unblocks Client-Mgmt F (Phase 6).",
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
            note: "CLOSED — 4a read-only + 4b HITL action assistant; live-smoked 2026-07-01 (4a: EL+STR, 4b: confirm+cancel verified, audit rows ok+denied/cancelled). Model routing: 1A #537 (b2a24b00) compiled registry + resolver + single request builder replace the SONNET_MODEL/HAIKU_MODEL literals, bad model requests denied, unusable BYOK fails closed; per-kind defaults #542 (90cea91f) — both LIVE 2026-09-02; 1B usage ledger #548 merged 8cad22b5 2026-09-02 (migration `3aa734cda334` applied, LIVE 2026-09-02 16:08Z): one `usage_events` row per provider call with model/route/kind/cost attribution, `model_denial_events`, conversation `last_*` columns; 1C (PR #550 MERGED 2026-09-02 -> e3ce9120, LIVE, no migration): Opus 5 registered BYOK-only for chat + chat_resume (platform route denies, never downgrades), refusal category surfaced on the `final` SSE event (refusal never hops), one stateless fallback hop (title/Slack/Teams, Sonnet 5 → Haiku 4.5) on narrow model-not-found 404 only — 529/5xx never hop — disclosed on the ledger row; `ASSISTANT_PLATFORM_TIERS` is a spend ceiling; slice 2 (PR #556 MERGED 2026-09-02 -> 9605199d, LIVE, migration `a4c123b1612d` applied): firm-scoped model policy (`firm_model_policy` table — admin-set default + member allowlist), `GET /assistant/models` server-authoritative list scoped to the firm's live credential route, `GET`/`PUT /account/model-policy` admin endpoints (D-2 tier) wired into `aec/assistant.py`'s resume/stream paths, admin `ModelPolicyCard` UI + composer model selector; the PUT endpoint's `_check_model_id` also enforces the platform-tier ceiling at save time (422, mirrors `_gate`'s `within_platform_ceiling`) so a future tier narrowing can't silently override or deny a saved policy at serve time. slice 3 (branch `feat/ai-model-routing-slice3` @ 2dfb878f — PR #557 (draft), NOT MERGED, NOT LIVE; migration `b5d234c2723e` (firms.billing_timezone, additive, NULL=UTC) NOT YET APPLIED): platform cost controls — per-plan tier entitlement (Starter fast / Professional + Business fast+balanced / Advanced firm-BYOK-only) and independent firm-month + user-month USD budgets rolled up live from the 1B `usage_events` ledger (no new counter table), calendar month in the firm's own billing timezone; soft warning at 80% of either scope; at exhaustion an explicit, announced downgrade to the lowest request-kind-compatible model — `selection_code=budget_exhausted` with `requested_model_id`/`effective_model_id`/`fallback_reason` on the resolution, the `model_routed` SSE opener and the usage row — never a pause and never a silent quality substitution (no safe lower tier -> deny, as the platform path already does); firm BYOK is exempt at the source (rollup filters `credential_route='platform'`) and again at the decision. Concurrency stays ledger-derived: the measured overshoot is bounded by in-flight turns x per-turn cost and converges on the next read (`backend/tests/test_model_budget_rollup.py`), so no atomic reservation was added. UI: one budget banner in the assistant panel + a per-message footnote on a downgraded answer. Behavior change to call out at merge: an `advanced` firm now gets PLAN_BYOK_ONLY on the platform route. This annotation must be finalized with the merge sha when it lands (PR #557). Status CLOSED (100%) — slice 3 is additive, no pct change",
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
            note: "ON HOLD — Bonus, not a need (owner 2026-06-24). Re-entry re-scope ratified 2026-08-20 — Option 1 (re-scope in place, no renumbering); full plan: `design-docs/2026-08-20__Phase5_ReEntry_StrategicRemap_Memo.md`. 5.1 delivered baseline: ViewPreset persistence is live and unconditional; remaining Phase 5 work is naming/UX separation from Phase 3.5 data-filter \"saved views.\" 5.2 delivered baseline: PDF-first sheet viewing and BIMpossible sheet annotations are live and unconditional; remaining scope is ACC-context integration, not a parallel document-control subsystem. 5.3/5.4 unconfirmed pending re-scan. Wave 9 (Forma) only affects how 5.1/5.3/5.5 viewer slices are hosted at resume. 5.5 Navisworks planned. 5.6 Visual Model Graph — read-only node-link view (select element → trace/load-tree highlight); frontend-only on the live `get_relationships_graph` endpoint; PARKED, ready-to-build, zero remaining technical dependency (sequencing-only gate — see re-entry memo §7C-1) (see `design-docs/visual-model-graph_design-doc_2026-06-28.md`). 5.7 (proposed, unratified) Element Visual Preview — family-in-context PNG on element select; read-only Viewer-screenshot slice, no DA4R/Q6 dep; reuses existing ACC SVF/SVF2 — no APS translation jobs or new DA4R/server-rendering compute; 2 feasibility spikes gate build; brief: `design-docs/2026-08-08__Phase5_ElementVisualPreview_DesignBrief.md` (2026-08-08). 5.2 re-scan (2026-08-18): reuse ACC Build's Sheets/Transmittals APIs, don't rebuild version control — Transmittals reachability CONFIRMED live (200, proven under BIMpossible's APS app reg); Sheets API blocked only by Build-entitlement on the tested project (403, not an app-reg gap); client-hub Build-entitlement still open. `design-docs/2026-08-18__Phase5_ExternalToolingResearch_SheetsAndRevitAddins.md` Update 2026-09-29: [#711](https://github.com/YourBIMpossible/BIMpossible/pull/711) `b3223784` adds stage attribution for viewer→PDF fallback (observability) + a recovery decision packet; sheets flags stay default OFF; stays ON HOLD.",
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
            note: "PARTIAL — original scope shipped + live; Client-Mgmt E: RATIFIED 2026-09-04, implemented + landed, verified-nonprod, ops-ready pending owner launch (NOT live — both flags off in prod); Client-Mgmt F open (PLACED not ratified) — Access tiers, usage metering, BYO keys; Client-Mgmt A/B/C/D; shipped via Wave 20 / PR #112; live-smoked 2026-07-01 (usage_logger wired e97fa1f, admin dashboard: 241 queries / $4.04 MTD / 58.3k output tokens confirmed). Client-Mgmt E re-score 2026-09-04: self-serve firm onboarding (authenticated claim → DNS-TXT domain verification → firm activation → bootstrap admin; flag `BIMPOSSIBLE_CLIENT_ONBOARDING_ENABLED`, anti-discovery mount) landed #566 + Next rewrite fix #570 + trusted-proxy client-IP primitive/durable flag mechanism/runbook (#574, merge sha 7a29dcb9). Verified-nonprod: full on/on lifecycle + negatives (collision, rotate, expiry, provider failure, authz, cross-firm) through a disposable edge → Next → backend topology, four flag states, migration replay. Status ladder used here: implemented/landed ✓ → verified-nonprod ✓ → ops-ready pending launch ✓ → production live ✗ (owner-only enablement; residual steps in the WBS §Residual). Evidence: code-repo `docs/ops/2026-09-04-p6-clientmgmt-e-launch-readiness.md`; WBS `2026-09-04__Phase6_ClientMgmtE_WorkBreakdown_and_ImplementationPlan.md`. The 2026-07-27 \"PLACED not ratified\" wording no longer applies to E. Status corrected CLOSED → PARTIAL 2026-08-17 — the original-scope work is closed, but the note has described two real unbuilt sub-items (E, F) since 2026-07-27, so the CLOSED column was misleading a status-only reader. New 2026-07-27, following the existing Client-Mgmt A/B/C/D lettered pattern (letters avoid the integer-collision risk the Canonical Guide flags for this phase): Client-Mgmt E — Self-serve onboarding (absorbs watchlist `FG-G4`) — provision a BIMpossible org/tenant for a firm BIMpossible has never seen, without a hand-seeded DB row, closing the same class of gap PR #227 closed for known firms. Client-Mgmt F — Multi-firm / project-level tenancy (absorbs the account-model half of watchlist `FG-C8`) — a project can have participants from more than one BIMpossible org, each with its own billing/BYOK identity, with shared-project visibility scoped by whoever administers the project; likely a small extension of the existing `org_id`-scoped, three-path billing schema (2026-06-23 inference-billing research) rather than new schema. Depends on Phase 3's 3.12 tenancy re-decision (RATIFIED 2026-08-18 — extend row-level isolation; F is now unblocked on this axis). ⚠️ Re-check F's remaining scope against live tenancy work before writing a build plan (2026-08-17): the firm→hub binding + project-enrollment + hub-isolation infrastructure shipped and went live 2026-08-14/16 (`firm_allowed_hubs`, `FirmAllowedProject`, `aec/hub_tenancy.py`; retired the old `ALLOWED_PROJECT_IDS` rail). That is real, live, and adjacent — but it does NOT deliver a large chunk of F. Verified against the shipped schema: it scopes one firm's access into one hub's projects (`access_scope` all/selected + enrollment rows), i.e. \"can Firm X reach Project Y.\" Client-Mgmt F is a different axis — multiple firms as differently-scoped participants on the same project with admin-scoped visibility (\"can Firms X and Z both have participants on Project Y\"). Nothing shipped associates more than one firm with a single project. So the tenancy shipment does not reduce F's remaining scope; still re-read F against it before speccing, but don't assume it's mostly done. Phase 13's proposed cross-firm-approval T5 explicitly depends on F and is itself still unbuilt. The hub-cutover / tenancy test-gate content formerly filed under \"Phase 15c\" now lives here (moved 2026-08-17) — see §Phase 6 — hub-cutover / tenancy test gate below.",
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
            note: "LIVE — Revit Link engine only; supervised cutover PASS 2026-08-25 (audit row id=28, decision-log 2026-08-25); `BIMPOSSIBLE_REVIT_LINK_*` flags ON in .env. DA4R is NOT live: inert scaffold, `BIMPOSSIBLE_DA4R_ENABLED` absent/off by owner decision 2026-09-23 (env contract: supported-inactive) — Co-equal engines, ship together. Status scope note (2026-08-25): LIVE = the Revit Link remote-sync engine; DA4R remains the inert scaffold below. Revit Link sync re-enable (step-2): CODE-COMPLETE + MERGED both repos 2026-07-22, flag OFF ([#187](https://github.com/YourBIMpossible/BIMpossible/pull/187) `2936c32f` + [AddIns #11](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/11) `be4d6a8f`, lockstep: backend confirm→mint→single-use-token path — `POST /revit/sync_token` + `POST /revit/sync_with_central_confirmed` behind default-OFF `BIMPOSSIBLE_REVIT_LINK_SYNC_ENABLED`; C# force/CONFIRMATION_REQUIRED guard removed, local ribbon TaskDialog kept; decision-log `2026-07-16__phase7-revit-link-sync-reenable-step2.md`). Prod byte-identical until the owner's supervised first sync (test model: flag on → modal → verify synced+audited+token-no-replay → flag off → log GitHubWorkflow §11). DA4R correction 2026-07-16 (\"reserved name, NO code\") superseded 2026-07-21: an INERT scaffold now exists (#186: unregistered `da4r_adapter.py` satisfying the WriteEngine Protocol + `da4r_tokens.py` two-token module + fourth default-off flag `BIMPOSSIBLE_DA4R_ENABLED`; G2 spike hand-run PR [#191](https://github.com/YourBIMpossible/BIMpossible/pull/191) MERGED 2026-07-23) — unreachable, NOT registered in `get_engine()`, still gated on owner G1/G2. The one-write-spine contract now exists (`revit_link/engines.py` `29e96da`: WriteEngine Protocol + engine enum + gated seam; da4r plugs into THIS when built — see `design-docs/write-spine-convergence_target_2026-07-15.md`). Owner gates: (1) add BIMpossible-AddIns repo, (2) \"go\" to re-enable sync — still ON HOLD by owner-gate policy, independent of the audit-gate item below. See proposal 2026-06-23 (§2 DoD) for exact acceptance criteria. Audit gate (hard — from `2026-06-21__AuditAndHistory_Pattern.md`): ✅ SATISFIED 2026-07-02 (`0055dd1`) — `edit_log` + `revit_link_request_log` migrations applied and the adapter writes to both on every call (write-ahead as of the 2026-07-10 WIZ-7 fix); `GET /admin/audit/edits` endpoint + XLSX export live; `query_edit_log` assistant tool registered (firm-scoped as of AST-1, `376e180`). This row described the gate as still-pending through 2026-07-08's audit — stale, fixed today (DOC-2). Runtime note (2026-08-23, no action required today): Autodesk moves APS's production Automation Engine for Revit to Revit 2026.5 / .NET 10 on 2026-09-21 ([APS blog](https://aps.autodesk.com/blog/revit-automation-engine-upgrading-revit-20265-and-net-10-september-21-2026)). No BIMpossible AppBundle exists yet (DA4R is still the inert scaffold above), so nothing needs validating before that date — but whoever resumes G2/G4 should target engine `Autodesk.Revit+2026.5` and vet third-party .NET deps against .NET 10 first. Full note: `design-docs/DA4R_APS_Strategy_ExecutionPlan_2026-07-16.md` gates table.",
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
            note: "ACTIVE — Re-scored 2026-09-24: 10% → 35% (curated). Backend and review UI are merged and deployed on the local dev stack with the flag OFF. They are not live, and no ingest writer exists yet. [#713](https://github.com/YourBIMpossible/BIMpossible/pull/713) `715fc28c`: element-keyed firm-owned bindings, the product-records registry with ingestion provenance and exact-replay identity, the production extractor 0.6.1, per-firm review decisions and the review/bindings API. Seven migrations reach head `e6b2d8f1a9c3`. Workspace #160/#161 retire `product_type_bindings`. [#745](https://github.com/YourBIMpossible/BIMpossible/pull/745) `2dc55668`: the product review page `/project/[id]/products`, with queue, evidence, decisions, bulk actions and help. The migration ran on local dev 2026-09-24. The frontend is refreshed and flag-off checks V1–V5, V13 and V14 pass (runbook `docs/ops/2026-09-24-phase9-activation-runbook.md` §11, [#746](https://github.com/YourBIMpossible/BIMpossible/pull/746)). Open: (a) The owner sets `BIMPOSSIBLE_PRODUCT_INGESTION_ENABLED=1`, then A6/A7. (b) No production caller writes `product_records` (`store_ingestion_result` has no caller outside tests), so the queue stays empty until an ingest trigger ships. That is an owner call. (c) The flag-on smoke and live UI are unverified. The older \"Nothing wired into backend\" line below is superseded. Supersedes Phase 3.X Manufacturer Data Ingestion. Reopened ACTIVE 2026-08-17 (owner) — not a pivot, a scope growth. Original scope (manufacturer cutsheet extraction, frozen at parser 0.3.2 as the reference implementation) is retained unchanged. Scope grown 2026-08-17 to include linking extracted cutsheet data to specific things inside a project — not just extracting spec values in isolation. Link-target RULED 2026-09-24 (owner, final; first raised in chat 2026-08-17): a cutsheet links to an individual Revit element, keyed by the element's stable identity (AEC-DM `unique_id`, never `ElementId`) for sync/upsert. The element's family type is the configuration/grouping anchor — retained as context for defaults, grouping and audit — not the cutsheet's ownership identity. Consequence for §4 of `Phase9_BuildSpec.md`: `product_type_bindings` keyed on `type_unique_id` is superseded by an element-keyed binding carrying `type_unique_id` as context; schedule joins resolve element-first, type-defaults second. Missing/deleted elements keep their binding flagged, never silently dropped. Audit gate: all 5 new tables have `created_at`/`updated_at`; `product_type_binding_status_history` + `extraction_review_queue_status_history` tables present (per Audit & History Pattern §4). Spike status (2026-07-21): v1.0.1 label spot-check SIGNED OFF (8/8 blessed); GoldenSet v1.1 generalization corpus ASSEMBLED (30 fresh docs, 10 unregistered brands, 17-doc model population, owner-authorized web sourcing) + labeled; cold run 1 (0.3.1) NOT clean — one failure category: invalid values committed @ 0.95 for want of a validation layer (prose-as-manufacturer, accessory-codes-as-model ×3, prose-as-voltage). Owner-directed fix same day → parser 0.3.2 (single validation layer: candidate → validate → surface; invalid = forced abstain): all 4 wrong-value commits eliminated, model precision 1.00/fp 0.00, 45/45 spike tests, v1.0 golden regression numerically identical PASS. Run 2 (0.3.2) = CLEAN run #1; owner then ruled JC-1 (labels v1.1.1: COR1/COR2 → `Cooper Lighting Solutions`) + blessed JC-2…7, and run 3 (0.3.2 on v1.1.1) = CLEAN run #2 → STOP RULE SATISFIED 2026-07-21: manufacturer AND model precision 1.00 / fp 0.00 — zero wrong-value commits on a corpus where 22/30 docs are brands the registry has never seen. Raw table still FAILs f1/abstain by construction (correct abstains on unregistered brands; pre-registered reading: `_inbox/phase9-cutsheets/v1.1/GoldenSet_v1.1_labels_evidence.md`). Run 4 (confirmatory parity, zero code+label delta) established a frozen-labels clean pair (3+4), closing the run-2/3 relabel caveat. Gate reading — the raw f1/abstain FAIL is a PASS by construction (22/30 docs are unregistered brands where abstain IS truth); the criteria that decide it are stated explicitly as A1–A4 in `GoldenSet_v1.1_Plan.md` §\"What release-gate quality MEANS\": zero wrong-value commits on either field across both corpora ✓, zero false-accepts on unregistered brands (0/22) ✓, all registered brands present detected (6/6) ✓, two consecutive clean runs ✓. 🔒 SPIKE FROZEN at parser 0.3.2 (terminal state, owner decision 2026-07-21) — `extract.py` is now the reference implementation + acceptance tests, closed to further development; all future extractor work goes into the production reimplementation gated by the v1.0+v1.1 acceptance harness, with measured recall headroom enumerated as tickets P9-R1…R5 (each carrying a no-fp-regression constraint). Wiring still gated: Phase 7 + 6 owner decisions. Nothing wired into backend. New 2026-07-27 (PLACED not ratified) — a second `SourceParser` target, distinct from `PdfCutsheetParser` and from `FG-C14`'s manufacturer-parameter reader: ingest a firm's *own* design-standards/criteria documents (the `spec_library`/`spec_docs` material already sitting in the workspace) using the same stable, frozen extraction pipeline. This is the first concrete step toward the long-horizon \"design with a prompt\" direction discussed 2026-07-27 — capturing a firm's actual design decisions and standards in structured, queryable form, since that data has no retroactive substitute and only compounds if capture starts now. Not urgent, not blocking anything — genuinely small, same caveat as the frozen spike itself: production work waits on real demand. Update 2026-09-29 (ledger catch-up): ingest trigger [#748](https://github.com/YourBIMpossible/BIMpossible/pull/748) `93e7efaa` merged 2026-09-25 (firm-docs upload → ingest job → review queue, migration c3f5a8d1e7b2, flag OFF by default); this narrows open item (b) in code, but no deployment or flag-on proof exists — status unchanged, NOT deployed/live. Wave 44.",
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
            note: "ACTIVE — RATIFIED ACTIVE 2026-07-16 (owner). Frozen direction line: `2026-07-16 — Phase 13 (Domain A + promotion gate) → ACTIVE. Direction: A-first, no overhaul. Preserve existing discipline schedule views, Element Preview, and assistant; introduce Change Sets as the staged-change primitive; add Review + Push Center; and rewire EditParameterDialog/assistant from \"write to Revit now\" to \"stage,\" so engines and the promotion gate meet in the middle once Domain A reaches approved-state.` Build plan: `design-docs/change-set_build-plan_2026-07-16.md` (Domain A Stage 1, A-first, TDD, internal-DB only). Direction docs: `design-docs/UX_Research_ChangeLifecycle_Direction_2026-07-16.md` (owner-reviewed) + `DataInput_Interface_Gap_Analysis_2026-07-16.md`. Phase 13 = the augmentation/edit/review/promotion layer on top of the Phase 7 write-back engines (System α drives System β); Phase 7 remains the canonical engine layer — not absorbed. Build detail: `2026-06-24__Phase13_ProductizedDataEditing_Review_Pushback_PhaseDefinition_PROPOSAL.md` + package Docs 1–4. Companion WAVE-STATUS row (Wave 23) still unplaced. T0–T3 MERGED + PROD-DEPLOYED + LIVE-VERIFIED 2026-07-25 via [PR #214](https://github.com/YourBIMpossible/BIMpossible/pull/214) (`0f17003`), migration `a13cd5e70f24` applied and confirmed at head. Live evidence: T0 legacy Sync-with-Central / Check-Conflicts hidden; T1 Save wrote change set `4251f228…` status `approved`, `created_by=KAKJ5MM3JMXTNCPY`, `model_id` = the DM item URN, with a `staged_change` row (`Centered-Normal` → `Centered-Normal-SMOKE13`, `staged_old_value` captured for T4's drift check) and full `draft→in_review→approved` history (reason `self-approval`) in ONE transaction; T2 pill read \"Saved changes: 1 · 1 to apply\"; the edit affordance works with Revit closed, proving the offline path. Test data deleted afterwards (queue back to 0). T3's apply endpoint is built but NOT exercised live (`applied_by`/`applied_at` still null — that is T4's job). ⚠️ The first live Save 403'd — `require_active_membership` is strict while the rest of the app env-falls-back, and `user_firm_memberships` had been empty since launch because `link_user_on_login()` was never wired to any live path. Unblocked by hand-seeding one membership row (`KAKJ5MM3JMXTNCPY` → firm `c0757b61…`, the same static firm every existing row already uses); the permanent fix is [PR #227](https://github.com/YourBIMpossible/BIMpossible/pull/227). T4 UNPARKED same day (both ADR gates satisfied) and its ADD-IN HALF is MERGED 2026-07-25: Add-Ins [PR #38](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/38) (`cfb4cc1`) — PaneSessionProvider (single paired-session channel, ADR §3.1-E/F), pure ApplyPlanner drift logic, change-set client methods, and the \"Apply BIMpossible Changes\" ribbon command. Landed only after two independent review passes recorded on the PR: the first was BLOCKING (4 criticals — worst: change sets promoted to terminal `pushed` with nothing written to the model) and all were fixed + regression-tested (1428 tests, both TFMs); the second returned SAFE TO MERGE and its 3 pre-live-run findings (discarded write-path diagnostics; a provably-false \"re-run to catch up\" recovery instruction; a dead 409 branch documented as live) were also fixed pre-merge. Plan of record: `design-docs/2026-07-25__phase13-T4_apply-bimpossible-changes_PLAN.md`. T4 LIVE-VERIFIED 2026-07-25 (agent-driven, owner-authorized). `cfb4cc1` deployed to all 4 slots; live Apply on `SAMPLE-C-ELEC-R26.rvt` applied the happy-path edit (`S&L_FEEDER TAG 1753AL → 1753AL-T4`, read back in Revit; set → `pushed` w/ `applied_by`), and the drift re-run correctly skipped and preserved a hand-edit while promoting nothing. Both predicted failure modes reproduced exactly: the web `name` column is a pseudo-column (`LookupParameter(\"name\")` → null) so it skips forever and its set stays `approved`; the review's #1 representation-mismatch risk did NOT materialize for text shared params. Full results + verbatim dialogs: `01_BuildLog/2026-07-25__T4-live-smoke_RESULTS.md`. T4 IS COMPLETE — Task 6 shipped + live-verified 2026-07-25. `edit_log` is now written by T4 at actual-apply time per the ADR. `POST /data/change-sets/{id}/edit-log` (BIMpossible PR #229, `b19674c`) is deliberately decoupled from `/apply`: an all-skipped run makes zero `/apply` calls, so a body on `/apply` would have silently lost every skip. Identity is 100% server-derived (user/firm/model/element/parameter/new_value); the client sends only status + the live value it observed. Closed 11-value vocabulary incl. `applied_record_failed` for the model-wrote-but-record-failed divergence. Migration `b24de6f81c35` adds `edit_log.change_set_id` (nullable, indexed, no FK — audit rows must outlive their set). Client half: AddIns PR #39 (`faf9475`), `EditLogStatus.For` mapping + one advisory POST per set per run, apply decision logic untouched. Live proof on SAMPLE-C (add-in built from main+`feat/glass-alerts` so Glass was preserved): a mixed run wrote `applied` (`1004AL`→`1004AL-T6`, set → `pushed`) and `skip_drift` (observed `1753AL-HANDEDIT` vs staged `1753AL`, hand-edit preserved, set stayed `approved`) as two rows in ONE batch — the skip row proving the decoupling was necessary. All 10 legacy Phase-0 rows untouched. Backend endpoint + migration each passed their mandatory review gate; local CI green (3137 backend), add-in suite 1443. Still un-run live: the refusal tests (local `.rvt`, expired pairing) — code-gated only. New 2026-07-27 (proposed T5, next in sequence after T4/Task 6; PLACED not ratified) — cross-firm change-set approval: extend the existing draft → in_review → approved lifecycle to be role/firm-aware, so a change proposed by one firm's user (e.g. a subcontractor) can be routed to and approved by a different firm's user (e.g. the architect or GC) on the same project, instead of assuming proposer and approver share an org. This is what makes the write-back safety model (the differentiator per `FG-P5`) work across company lines, not just within one firm. Depends on Phase 6's proposed Client-Mgmt F (multi-firm tenancy) — can't route an approval to \"the architect's user\" until the data model knows which users belong to which firm on which project. New 2026-07-27 (proposed T6 — this label collides with the existing \"Task 6\" edit-log item; same number space, different thing, reconcile the name not the intent): an optional reason/criteria tag captured at change-set approval — *why* this value, not just what it changed to. Deliberately free-text/loose now, not a designed schema — the eventual shape a generative-design system needs isn't known yet, and a wrong schema costs more to unwind than a missing one. First concrete step toward the long-horizon \"design with a prompt\" direction (2026-07-27 discussion): every approved change becomes a labeled (decision, rationale) pair grounded in a real project, compounding for free as normal Phase 13 usage continues. T6 RATIFIED 2026-08-18 — build it. Deliberately loose free-text tag per the 2026-07-27 placement; the label collision with the existing \"Task 6\" edit-log item is reconciled at build time (rename the label, keep the intent). Row-merge 2026-08-17 (owner decision): the former standalone row 13.1 — Write Engine — Typed Values + Type Params is folded in here. By the P3-vs-P11 line the 11/11.1 merge applied (a single staged sub-build does not warrant its own peer row), 13.1 is Phase 13's write-engine increment, not a peer phase. Full build detail preserved verbatim in §Phase 13 — Write Engine — Typed Values + Type Params below. Open items carried forward (not lost in the merge): Increment 1 (non-string, instance-scoped) SHIPPED + live-smoked 8/8 2026-08-04; Increment 2 (type-param targeting, String-only) BUILT + DEPLOYED — backend [PR #273](https://github.com/YourBIMpossible/BIMpossible/pull/273) `06f04da2` + Add-Ins [PR #54](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/54) `1a61342c`, both merged 2026-08-18; migration `c4e7a2b91d38` applied in the running DB, add-in half in the installed pane build; per-type outcome attribution fix + router regression suite merged 2026-09-02 ([PR #544](https://github.com/YourBIMpossible/BIMpossible/pull/544) `ce831f42`). Task 8 live APS write smoke remains OWNER-GATED, so Increment 2 is not live-verified; Increment 3 unbuilt; Increment 4 (ElementId) owner-ruled deliberately unimplemented; two open non-blocking owner decisions — #1 (staged-`unit` veto guard) and #3 (BuildSummary bucket-exhaustiveness) — to decide before/with Increment 2. 2026-09-24 — Review + Push Center landed on `main` (re-scored 32% → 40%): Stage 1 review controls [#715](https://github.com/YourBIMpossible/BIMpossible/pull/715) `3cd06f19` (submit / approve / reject from the model page; separate-approver rule behind `BIMPOSSIBLE_CHANGE_SET_REQUIRE_SEPARATE_APPROVER`), Push Center [#721](https://github.com/YourBIMpossible/BIMpossible/pull/721) `13ff242a` (`/project/[id]/changes`: change-set list with model/status filters, detail drill-down, apply outcomes, draft-only discard; backend `project_id` filter + `staged_count`; read-only shares resolved server-side via `useSharedProject`, never from the `?shared=1` hint alone), mutation hardening [#722](https://github.com/YourBIMpossible/BIMpossible/pull/722) `3b03d4ec` (36 DB-lane tests incl. real-Postgres race pins). `/review-all` 2026-09-24: 7 findings, all remediated pre-merge ([#723](https://github.com/YourBIMpossible/BIMpossible/pull/723) carries the report + handoff). Local dev stack rebuilt at `3cd06f19` + browser smoke same day (#723 handoff §6a: 8 checks PASS, 3 not verifiable from one account with the separate-approver flag on). No production or live claim. Promotion gate and Increment 3 unchanged (Inc 2 Task 8 record conflict still unreconciled). 2026-09-25 — Push Center train rolled out and live browser-smoked (re-scored 40% → 48%): merged since the 40% score: review operations [#725](https://github.com/YourBIMpossible/BIMpossible/pull/725), history endpoint [#731](https://github.com/YourBIMpossible/BIMpossible/pull/731), server-derived Apply outcome summary [#732](https://github.com/YourBIMpossible/BIMpossible/pull/732), shared read decoders [#741](https://github.com/YourBIMpossible/BIMpossible/pull/741), Stage 3 Apply read-coherence tests [#742](https://github.com/YourBIMpossible/BIMpossible/pull/742), Change Intelligence panel [#743](https://github.com/YourBIMpossible/BIMpossible/pull/743), governed-Apply boundary contract tests [#728](https://github.com/YourBIMpossible/BIMpossible/pull/728), transactional lifecycle outbox [#735](https://github.com/YourBIMpossible/BIMpossible/pull/735) + outbox contract guard [#740](https://github.com/YourBIMpossible/BIMpossible/pull/740). Local dev rolled out at `52a4a907` (backend restart + `Refresh-Frontend.ps1`, no migration); green full-VLC receipt for that SHA. Live smoke on app.yourbimpossible.com: list/filters/sort/search, Load outcomes, readiness + outcome chips, history incl. an Apply run, empty-submit 422, model-page pill parity, reject-with-reason — PASS (BIMpossible handoff `reviews/2026-09-24__phase13-overnight-handoff.md` §18, `ddd8c70d`). Not verified live: approve/self-approval refusal this pass, separate-reviewer path, session expiry, Revit Apply through the new surfaces. No production claim; promotion gate and Increment 3 unchanged. Update 2026-09-29 (ledger catch-up): post-rollout [#762](https://github.com/YourBIMpossible/BIMpossible/pull/762) `93ac4b95`, [#764](https://github.com/YourBIMpossible/BIMpossible/pull/764) `9efada16`, [#765](https://github.com/YourBIMpossible/BIMpossible/pull/765) `bdf26b6c` (apply-readiness, honest wording, 409 on changed edit-log, race/lock follow-ups) merged 2026-09-26 with no migration, no deploy, no re-score; not yet on the owner stack per any recorded evidence. Wave 45.",
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
            note: "ACTIVE — Native WPF dockable pane inside Revit that pairs to a BIMpossible web session with a single-use code and streams the existing `/assistant/chat` — same assistant + tools, docked in Revit. 15a (pair → pick project → chat): MERGED to main + STAGE A LIVE-PROVEN 2026-07-25. Backend merged via [PR #221](https://github.com/YourBIMpossible/BIMpossible/pull/221) (`a427a2e`); the Pair-Revit-card flag gating via [PR #226](https://github.com/YourBIMpossible/BIMpossible/pull/226) (`ab0d183`, superseded #217 — GitHub auto-closed it when #221's `--delete-branch` removed its base branch). Stage A proven in Revit 2026 on the real cloud model `SAMPLE-C-ELEC-R26.rvt`: A1 paired session authenticated end-to-end (DPAPI token survived a Revit restart); A2.1 project + model dropdowns auto-populated with no manual selection; A2.2 — asked \"What am I looking at?\" and the pane answered with the live model, the active view `POWER PLAN - LEVEL 1 - PARENT`, and `1 Electrical Fixture selected (element ID 1805159)`, an exact match to the independently-read Revit selection. Add-in side: PR #30 MERGED 2026-07-25 (`3457c65`) — Phase 15A is merged in BOTH repos, the prod backend deploy carrying `a427a2e` went live 2026-07-25 with `BIMPOSSIBLE_REVIT_PANE_ENABLED=1`, and `main@3457c65` is built + deployed to all four `%APPDATA%` Revit slots (byte-verified). T4's entry condition A is fully satisfied; condition B (cloud-only) was already locked → T4 is UNPARKED, plan of record `design-docs/2026-07-25__phase13-T4_apply-bimpossible-changes_PLAN.md` (its Task 4 PaneSessionProvider lift now lands on Add-Ins main as T4's first commit, since #30 merged without it). Runtime-slot coordination ledger: `Add-Ins/decision-log/2026-07-25__runtime-slot-handoff.md` (3-session pile-up resolved; slot handed to the glass lane for the one-build pane+glass deploy). Structural finding for future merge criteria: Stage A can never be run through the production web UI pre-merge — both `PairRevitCard.tsx` and `/auth/pane/pair` are branch-only, so \"verified in prod UI\" is unachievable before merge by construction. Later slices: 15b firm-document retrieval in the pane (MERGED + LIVE-SMOKE-VERIFIED 2026-08-31 — server side pre-existed via Phase 18 Pillar 2 (#327): per-firm BM25 index + fail-closed `search_firm_docs` tool with firm scope derived server-side from the paired session's membership; the 2026-08-31 build session added the pane's `Sources:` citation row (AddIns [PR #113](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/113), merged `d09204e0`) and adversarial-args / closed-schema tenant test pins (backend [PR #510](https://github.com/YourBIMpossible/BIMpossible/pull/510), merged `007f7148`). Live smoke (owner-authorized, 2026-08-31): pane DLL from AddIns main `d09204e0` deployed to all 4 local Revit slots (byte-verified; backups in `F:\\Claude-Tools\\reports\\p15-15b-smoke\\dll-backup-2026-08-31\\`); a harmless fake test doc uploaded on the dev firm, indexed, retrieved via BM25, and the pane showed the grounded answer with the `Sources: electrical-standard-TEST.md — … Receptacles > Spacing` row — owner-confirmed on screen. The smoke surfaced and fixed two production defects: the Documents page was unreachable through the Next proxy (missing `firm-docs` rewrite group — [PR #515](https://github.com/YourBIMpossible/BIMpossible/pull/515), merged `47fec305`) and first upload 500'd on the root-owned firm-docs volume (entrypoint chown fix — [PR #516](https://github.com/YourBIMpossible/BIMpossible/pull/516), merged `a55a4eb8`). Known residual: a failed upload commits a stranded DB row (non-atomic; queued as follow-up, not shipped)) · 15c Revit-context injection · 15d model writes + confirm UI. Per `design-docs/write-spine-convergence_target_2026-07-15.md`, the pane is transport over the existing write spine, never a new write path — 15d must produce standard proposals through the shared adapter. ⚠️ No PhaseDefinition PROPOSAL doc exists for Phase 15 — unlike 13/14 it entered build without the ratification artifact; row placed 2026-07-15 from the built reality (`Add-Ins/BIMpossible.RevitLink/Assistant/README-Phase15a.md`) so the ledger stops under-reporting active work. 15a re-proven in production use 2026-07-25: the paired pane session carried the entire Phase 13 T4 live smoke as the sole auth channel (ADR §3.1-E single-session rule held — no fallback path was needed or available), and the DPAPI token survived two Revit restarts without re-pairing. Operational trap found the same day: the pane resolves `BIMPOSSIBLE_PANE_BACKEND_URL` from the environment of the process that launched Revit, so a stale value silently misroutes the pane and everything riding its session; `%APPDATA%\\BIMpossible\\RevitLink\\pane\\config.json` does not exist as a backstop. Verify via the `[AssistantPane] controller ready; backend=…` line in `%APPDATA%\\BIMpossible\\RevitLink\\log.txt`. Moved out 2026-08-17 → Phase 17 — App Integrations. The Slack / Teams chat-assistant gateways (proposed here as \"15e\" on 2026-07-27, built dark and merged — Slack [#262](https://github.com/YourBIMpossible/BIMpossible/pull/262) 2026-08-07, Teams [#276](https://github.com/YourBIMpossible/BIMpossible/pull/276) 2026-08-08, both flag-gated off) are now their own top-level phase (17a / 17b). Full history — the 2026-07-27 proposal, the 2026-08-07 MCP-vs-gateway correction, the platform digest asymmetry, and the retired-unused numbering saga — is preserved verbatim in §Phase 17 below. Retained here because it still binds Phase 15's write slices too: Hard line, no exception — a write requested via any chat platform creates a Phase 13 change-set and goes through the exact same draft → in_review → approved lifecycle as every other write in this product; a chat message can *propose* a change, never commit one, regardless of platform. ⏸ 2026-08-08: Phase 15c's T5 (E2E smoke) is PAUSED pending the BIMpossible hub cutover / tenancy test gate; unrelated to and does not affect 15a above (or the chat gateways now at Phase 17), which remain as stated. Pointer (moved 2026-08-17): the \"Phase 15c — hub cutover / tenancy test gate\" content was never about the Revit pane — its subject is multi-tenant infrastructure (canonical firm identity, hub binding, read-only evidence windows, firm↔hub verification). It only got filed under 15 because it gated one Revit-pane test (T5). It has been relocated to Phase 6, where Client-Mgmt F / multi-firm tenancy already lives — see §Phase 6 — hub-cutover / tenancy test gate. The T5 *test* stays a Phase 15 gate; the tenancy *work* it waits on is Phase 6. 15f — Open-in-Revit desktop handoff (numbered 2026-08-17, was unnumbered): web→`bimpossible://`→local opener→Revit opens the correct cloud model; read-only by design; functionally complete + live-verified 2026-07-24 (see §Open-in-Revit below). Filed under 15 because it is the same web-to-desktop-Revit-bridge concern as the pane — *not* Phase 7, which is specifically about writing data back into models. Its distribution lane (end-user installer, code-signing cert) was separately parked by owner ruling — a business-timing decision, kept distinct from 15f's \"functionally complete\" engineering status so the two aren't conflated.",
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
          { id: "P17", bucket: "active", weight: 1, name: "P17 App Integrations (governed third-party app surfaces — chat gateways + collaboration / CDE / reporting apps over a shared control plane)", pct: 50, note: "PARTIAL — Promoted to a standalone phase 2026-08-17 (owner decision) — the Slack/Teams gateways move out of Phase 15's \"15e\" into their own top-level phase. Supersedes, transparently per the freeze-numbers rule, both the 2026-08-07 \"Phase 17 retired-unused\" ruling and this session's own earlier withdrawal of the move; 17 was only ever coined in code comments, never claimed by a shipped phase, so promoting it is a placement decision, not a silent reassignment. Ordering holds 16 < 17 < 18. 17.0 Integration Control Plane — PLANNED foundation (registry, OAuth/credential vault, external-identity binding, fail-closed context routing, policy enforcement, adapter contract, Phase-13 change-set bridge, audit/observability, governed MCP + public/webhook API surface). 17a Slack BUILT (dark), merged [#262](https://github.com/YourBIMpossible/BIMpossible/pull/262) 2026-08-07, flag `BIMPOSSIBLE_SLACK_ENABLED` OFF. 17b Teams BUILT (dark), merged [#276](https://github.com/YourBIMpossible/BIMpossible/pull/276) 2026-08-08, flag `BIMPOSSIBLE_TEAMS_ENABLED` OFF. 17c onward — future integrations (Bluebeam, Telegram, Google Chat, Buzz, …): open, charter-gated backlog, not pre-lettered. Nine phase-wide invariants + per-integration admission charter + verbatim 15e build history in §Phase 17 below. Scope/architecture/governance: `2026-08-17__Phase17_App_Integrations_Strategy_and_Governance.md`; migration mechanics + candidate landscape: `2026-08-17__Phase17_AppIntegrations_Migration_PLAN_PROPOSAL.md` / `2026-08-17__Phase17_Integration_Landscape_RESEARCH.md`. Update 2026-09-29 (ledger catch-up): 17.0 groundwork merged dark 2026-09-24..25 — config contract/readiness [#716](https://github.com/YourBIMpossible/BIMpossible/pull/716) `8da51da7`, [#719](https://github.com/YourBIMpossible/BIMpossible/pull/719) `3ae48c20`, admin readiness endpoint+view [#733](https://github.com/YourBIMpossible/BIMpossible/pull/733) `39a678e6`, [#739](https://github.com/YourBIMpossible/BIMpossible/pull/739) `6a3d0dcc` (behind `BIMPOSSIBLE_ADMIN_ENABLED`; not live pending backend restart), dormant dispatch seam [#738](https://github.com/YourBIMpossible/BIMpossible/pull/738) `1b226803`. No flag enabled; status unchanged. Wave 46." },
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
      activity: [20,34,12,12,0,2,38,1,2,0,0,0,49,3],
      lastActivity: {
        date: "2026-10-06",
        summary: "docs(decisions): record the closed Docs Architecture mission; retire the North Star draft (#809) (317e827)"
      },
      branch: "main at 943af02c; 0 ahead of origin",
      git: { warn: "21 worktrees, 233 local branches, ~200 local-only commits -- mostly squash residue of merged PRs (p13-*, env-variables-cleanup, phase-e-prep, deploy-evidence-inert). Genuinely local-only: AU 2026 competitive analysis (4 commits), arch/config familiarization map, control-gaps plan comparison; untracked env-candidates review folder in the main checkout (blocks deploy evidence). 48 origin branches incl. the draft ctl/* stack." },
      nextActions: ["Revit end-user verification (owner-only, queue REVIT-END-USER-WORKFLOW-VERIFY): resolve the untracked env-candidates review folder in the deploy checkout (deploy evidence exit 3 -> 0), decide which add-in build to certify (installed DLL comes from unmerged AddIns claude/glass-linkpdf-deploy), then run Invoke-RevitLiveVerification on a Revit 2026/2027 cloud model","Phase 13: refresh the frontend for #762/#764/#765 (running frontend image still labelled 52a4a907), run the attended Apply live matrix (L1/L4/L7/L10/L12/L13 feasible; L6/L8 need an invite + read share), write the Increment 2 Task 8 reconciliation, then open Increment 3","Env contract (#724) owner step: review the secretless env candidates, run the owner-only live-env migration script (not yet run; live environment unchanged), then remove the candidates folder from the deploy checkout","Phase 17 (code-complete, dormant): owner closes the closeout C.1 policy decisions, runs the one-sitting operational gate (backup, migrate outbox/delivery tables, readiness check all DISABLED), then Slack-then-Teams pilot once the pilot firm/workspace/tenant exist","Phase 9: flag-on activation of product ingestion (A6/A7 + flag-on smoke) now that the flag-gated ingest trigger exists (#748); P9 ledger row still says no ingest writer","Autodesk-first rollout: complete the per-user authority model, wire FE canDownload control-hiding, then enable BIMPOSSIBLE_AUTODESK_FIRST_ACCESS (no movement since 09-16; w5/p1f4 worktree still holds 6 uncommitted cache files)","Delivery control: decide the draft stack #755 (receipt v3) -> #760 (PR readiness tool) -> #763 (gh pr merge interception) and plan #751 / audits #753 against #768's proportionate-verification reset; land or close #769","Ledger catch-up (owner-maintained): WAVE-STATUS unchanged since 09-21 -- waves 37-39 deployed + infrastructure-verified but still BUILT, and no wave rows for the Phase 13/17/9 trains","Owner git hygiene: 21 worktrees, 233 local branches, ~200 local-only commits (mostly squash residue of merged PRs); keep/push/discard the genuinely local-only docs (AU 2026 competitive analysis, arch/config familiarization map, control-gaps plan comparison) and the four Waves 1-9 follow-up lanes","Carried owner-gated: P6 Client-Mgmt E launch (flag-dark, verified non-prod); Phase 15c live-read broker flip after T5 under AUTH-INH; AUTHZ-AUDIT-ROW-SIGNING scheme; P14-14g residency/redaction ratification"],
      pendingDecisions: ["Phase 13 apply contract (decisions/2026-09-26__phase13-apply-contract-PROPOSED.md): owner rows 3a, 10b, 11a, 12a, 13a, 15a, 16a, 20a-c unratified; draft/in-review Apply refusal kept as current policy pending an owner call; Increment 3 stays closed until the Increment 2 Task 8 record conflict is reconciled in writing.","Phase 17 policy set (closeout C.1): outbox/delivery-ledger retention, composite change_set FK, kill-switch scope beyond the answer path, newer-schema outbox rows (hold vs close out), dispatch lock/send timeouts, deep-link host, backfill on enable, pilot-evidence model, notification routing, and key-management deprecation/vault/rotation ownership (encryption-domain packet).","Which installed add-in build the Revit end-user verification certifies: today's DLL is from the unmerged AddIns claude/glass-linkpdf-deploy branch, not a clean pipe-on build of AddIns main (decision belongs to the AddIns/Glass lane).","Delivery-control direction: #768 restored solo-owner merge authority + risk-proportionate verification; the draft control-gaps stack (#751 plan, #755/#760/#763 merge-readiness interception) and #753's 3c proposal (ratify a Status: live|closed doc marker) need keep/revise/close calls.","Waves 1-9 closeout open owner actions (decisions/2026-09-26__waves1-9-closeout-open-owner-actions.md): keep/merge/discard four local-only follow-up lanes, adopt strict truthiness for the 17 sensitive gates or keep the permissive design, branch/worktree pruning.","Schedule-push: staleness cadence, classifier rules, fidelity-degradation list, SPF ship location -- still direction-only, no code. The write-spine role SPF anticipated is now filled by the Phase 13 Write Engine; re-scope SPF against it before building.","Ceilings/Flooring dedicated shapers (Wave 16 placeholders) vs. Wave 15 Civil shapers (also pending) -- build now or batch them? Neither built; no demand signal forcing it. Furniture shaper already shipped.","D-5 (AKP): provider routing for local LLM inference -- gated on C-2 (provider runtime abstraction). Model routing 1A (#537) now gives a compiled registry + resolver, but only 'anthropic' is runtime_supported; re-check whether C-2 is now partially satisfied before deciding.","D-8 (AKP): where the audit hash-chain tip anchors outside the DB -- dormant until a B-6 STEP-0 trigger fires (2nd DB-writer, or a client/contract/insurer record on file). None has: single-operator deployment.","Phase 15 has no PhaseDefinition / ratification doc -- unlike Phase 13 (ACTIVE 2026-07-16) and Phase 14 (ACTIVE 2026-08-17), it entered build with no proposal; the PHASE-STATUS row carries its own flag. Owner still owes the definition doc.","Owner architecture calls on the 4 deferred 09-11 audit items: single tenancy-enforcement idiom (ARCH-1A), URN-keyed hub resolution helper (ARCH-2A), persisted write-approval record (ARCH-3A), failed-provisioning rollback (RE-2A)","Autodesk-first authority model (D1): ratify the target model before the auth swarm builds B4+ and the flag is enabled"],
      blockers: [],
      reminders: ["main branch protection now has enforce_admins=true + strict required checks (backend pytest, frontend vitest+tsc, security-scan-summary) + force-push disabled -- checks gate admins too, including Push-And-Verify.ps1. Residual gap: no required PR review (required_pull_request_reviews=null).","The weekly audit report is point-in-time and has twice been superseded within hours by a same-day fix PR (07-27 #231, 08-04 #239) -- always check the repo's git log before trusting its counts.","Add-Ins test-count baseline is an attribute count (~904: Fact + Theory), NOT the ~1473 dotnet-test prints -- Theories expand across InlineData rows; conflating them caused a false '634 vs 895' scare.","D-N ID collision: the AKP decision series (AKP-D4/D5/D8, from Account_Key_Pairing_Remediation_Plan §4.2) and the PDP series (PDP-D1..D8, Production-Data-Protection-Plan) reuse the same D-numbers for different decisions -- always namespace by plan when citing a D-item.","Status ladder is merged -> deployed on the local stack -> browser-smoked -> end-user (Revit) verified; the 09-23..09-26 Phase 13/17/9 work sits at the first three rungs only -- no production or end-user claim until the attended Revit run.","The backend serves source bind-mounted from the F:\\BIMpossible main checkout: anything untracked or dirty there fails deploy evidence (exit 3), and pulling main changes what the backend runs on its next restart.","Docs budget (G4) ceiling is 335,000 counted words and main sits at the line -- PRs relieve it by moving resolved reviews into reviews/_archive with ARCHIVED headers; the ceiling itself is not raised.","Codebase graph stale - newest graphify snapshot 2026-09-25 (11d old); push or run a wave to refresh"],
      links: [
        { label: "STATE doc (canonical, 06-12, archived)", path: "F:\\BIMpossible-Workspace\\99_Archive\\00_Strategy\\state-snapshots\\BIMpossible_STATE_2026-06-12.md" },
        { label: "True-prod deploy runbook (06-12)", path: "F:\\BIMpossible-Workspace\\02_Reference\\2026-06-12__true-prod-deploy-runbook.md" },
        { label: "Wave 4.10 spec libs (backend)", path: "F:\\BIMpossible\\backend\\aec\\spec_data" },
        { label: "Waves 10-19 closeout (06-13)", path: "F:\\BIMpossible-Workspace\\00_Strategy\\2026-06-13__Waves10-19_CloseOut_Status_and_Remaining_Work.md" },
        { label: "Build log", path: "F:\\BIMpossible-Workspace\\01_BuildLog" },
        { label: "Code", path: "F:\\BIMpossible" }
      ],
      recent: ["2026-09-26 - Delivery workflow reset: solo-owner delivery authority + risk-proportionate verification restored (#768); deploy tooling refuses frontend rollback from unknown/-dirty images and treats unlabeled images as UNPROVEN (#759, #767); control-gaps merge-gate stack open as drafts (#751, #753, #755, #760, #763)","2026-09-26 - Phase 13 post-merge hardening: stable status/edit-log snapshot on change-set detail, list refresh can no longer revert a newer row status, lock-before-gate ordering (#764, #765); pre-Revit distribution baseline recorded, Revit verification not yet run","2026-09-25 - Phase 13 step 2: server-derived apply_readiness, honest review/apply wording, changed-payload 409 (#762); Push Center train rolled out on the local stack at 52a4a907 and live browser-smoked -> P13 re-scored 40% -> 48%","2026-09-25 - Phase 17 code-complete and dormant: Phase 13 transactional lifecycle outbox (#735), dormant Slack/Teams notification dispatch seam (#738), outbox event-contract refusal (#740), admin readiness UI (#739); env contract registry + drift check + owner migration script (#724, #734)","2026-09-25 - Phase E clean backend rebuild at 52a4a907 (deploy evidence CURRENT, rollback anchors pinned); Phase 9 ingest trigger routes firm-docs uploads to the review queue, flag-gated (#748)","2026-09-24 - Phase 13 Push Center train: review operations (#725), change-set history + Apply outcome summary (#731, #732), Change Intelligence panel (#743), shared runtime decoders + Apply-boundary contract tests (#741, #742, #728)","2026-09-24 - Phase 9 element-centric cutsheet bindings (#713) + product review page with queue, evidence, decisions and bulk actions (#745), flag OFF on local dev -> P9 re-scored 10% -> 35%","2026-09-24 - Phase 17.0 typed config contract + redacted readiness (#716, #717, #719) + platform-admin readiness API (#733); launch-readiness deploy-evidence check + one-command Revit verification (#714, #720)","2026-09-24 - Phase 13 Stage 1 review controls: submit/approve/reject (#715), project-wide Push Center /project/[id]/changes (#721), mutation hardening incl. real-Postgres race pins (#722)","2026-09-23 - Admin Console hardening: firm-access focus/refetch reconciliation, token-refresh state preserved, admin-host root redirect; sheet-export failures now named instead of silently skipped (#696-#709, #697)","2026-09-23 - R18 sharing: recipient discovery scoped + grantee names carried on owner shares; R18 owner-sharing review archived as resolved (#701)","2026-09-22 - Waves 1-9 consolidation release merged to main (#685) + hygiene/evidence package (#687); closeout verification GO, all wave PRs closed as superseded"],
      audit: {
        lastRun: "2026-09-26",
        runType: "Post-closeout review cycle 2026-09-23..09-26 -- no new scheduled audit since the WFA 2026-09-21 run (terminalized on 09-22; next weekly due Sun 2026-09-27). Covers PR-scoped /review-all passes on the Phase 13, Phase 17, env-contract and deploy-tooling PRs, two post-merge reviews on main (#762, #764) whose 9 follow-ups were fixed in #764/#765, three deploy-tooling rollback-provenance defects fixed in #759/#767, and an independent read-only distribution & deploy-verification retrospective (2026-09-26). Nothing Critical/High reached main. The 4 architecture/reliability items from 09-11 remain deferred as owner architecture decisions.",
        cadence: "weekly Sun 11:45pm + incremental Sun/Tue + on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 4, info: 0 },
        closedLastRun: 12,
        trend: "stable -- no new audit run since WFA 09-21; the post-closeout cycle found 0 Critical/High on main and closed all 12 post-merge findings (5 + 4 review follow-ups, 3 deploy-tooling defects) within the cycle, with 60+ further pre-merge findings resolved before merge. Only the 4 owner-deferred architecture items remain open.",
        reportPath: "F:\\BIMpossible\\reviews\\_archive\\2026-09-26__distribution-verification-retrospective.md",
        reportFile: "bimpossible/2026-09-26__distribution-verification-retrospective.md",
        ledgerPath: "F:\\BIMpossible-Workspace\\02_Reference\\_audit-runs.md",
        open: [
          { id: "ARCH-1A", severity: "low", title: "two competing tenancy-enforcement idioms coexist across routers -- most routes use declarative dependency injection, a few implement the check by hand; owner architecture decision pending, carried open", source: "weekly-full-audit_2026-09-11.md (deferred 2026-09-13, owner architecture decision)" },
          { id: "ARCH-2A", severity: "low", title: "no URN-keyed project-hub resolution helper exists yet -- current resolution path is project-ID-only; owner architecture decision pending, carried open", source: "weekly-full-audit_2026-09-11.md (deferred 2026-09-13, owner architecture decision)" },
          { id: "ARCH-3A", severity: "low", title: "write-approval lifecycle has no persisted approval record -- currently implicit; owner architecture decision pending, carried open", source: "weekly-full-audit_2026-09-11.md (deferred 2026-09-13, owner architecture decision)" },
          { id: "RE-2A", severity: "low", title: "a failed provisioning attempt marks state but never rolls it back; owner architecture decision pending, carried open", source: "weekly-full-audit_2026-09-11.md (deferred 2026-09-13, owner architecture decision)" }
        ],
        history: [
          { date: "2026-09-26", type: "Post-closeout review cycle (no scheduled audit run): PR-scoped /review-all passes, two post-merge reviews, and an independent read-only distribution & deploy-verification retrospective.", scope: "BIMpossible main 2026-09-23..09-26 (#711-#768): Phase 13 change sets / Push Center, Phase 17 integrations, env contract, deploy-evidence and Revit-verification tooling.", result: "0 Critical / 0 High reached main. Post-merge: #762 review 5 follow-ups (1 Medium: row lock held across an outbound authorization call) fixed in #764; #764 review 4 follow-ups fixed in #765; 3 rollback-provenance defects in deploy tooling fixed (#759, #767). 60+ pre-merge findings resolved before their PRs merged. Credential-bearing backend images voided and replaced by a clean rebuild after key revocation. Retrospective: no Revit end-user verification has run yet. Control-gaps read-only audits open as a draft PR. The 4 deferred 09-11 architecture items unchanged.", report: "2026-09-26__distribution-verification-retrospective.md" },
          { date: "2026-09-22", type: "Closure execution for the WFA 2026-09-21 run -- immutable closeout certificate.", scope: "F:\\BIMpossible, F:\\BIMpossible-Workspace, F:\\BIMpossible-AddIns.", result: "45/45 findings terminal: 13 resolved, 4 disproven, 2 closed (owner-action boundary: FE download-control hiding reframed as product delivery; add-in deploy proof done), 26 accepted-by-design. Fixed add-in build deployed to Revit 2024-2027, Revit 2025 cold start clean. Autodesk-first flag verified OFF and fail-closed at boot.", report: "FINAL-CLOSEOUT_2026-09-22.md" },
          { date: "2026-09-21", type: "Weekly full audit (non-degraded) + breach-chain overlay.", scope: "Code, AddIns, Workspace; change windows since the 09-14 run.", result: "0 Critical / 0 High / 8 Medium / 25 Low / 12 Info. Top items: installed add-in build not from main, latent authorization gaps in the default-off Autodesk-first access path, carried AI-context policy scoping, AI hold/resume reliability. ctxcheck 74/0/0. The 09-14 Critical + both Highs confirmed fixed.", report: "weekly-full-audit_2026-09-21.md" },
          { date: "2026-09-16", type: "Incremental audit (AI server + AddIns since 08-08).", scope: "~19 backend AI files + AddIns #139-#151.", result: "1 High (AIS-RE-1: confirmed AI action lost on resume failure) -- re-rated Medium 09-21 and resolved in the 09-21 closure.", report: "2026-09-16__audit-report.md" },
          { date: "2026-09-14", type: "Weekly full audit (non-degraded).", scope: "F:\\BIMpossible, F:\\BIMpossible-Workspace, F:\\BIMpossible-AddIns.", result: "1 Critical (Revit startup out-of-memory), 2 High, 7 Medium, 21 Low, 8 Info; 26 closed by #669/#670/#672 + AddIns #153/#155 before the 09-21 run.", report: "weekly-full-audit_2026-09-14.md" },
          { date: "2026-09-12", type: "Confirmatory final verification run (non-degraded) -- resolved every net-new finding inline.", scope: "Full cross-repo re-check (code, Workspace) following the 09-11 remediation wave.", result: "6 net-new (0C/0H/3M/3L) + 1 post-review hardening item, all resolved (905895de Auto-Fix Pass; c0bb6995 post-review hardening). 5 advisory/accepted items (hypothesis or pre-existing, not counted open). 4 architecture/reliability items from 09-11 (ARCH-1A/2A/3A, RE-2A) remain owner-scoped, carried open. Verify-Local-CI green on both receipts; ctxcheck 70/10/0.", report: "audit-resolution_2026-09-12__confirmatory-run.md" },
          { date: "2026-09-11", type: "Weekly full audit (non-degraded, seven lenses + breach-chain re-score) -- confirmed the 09-07 DEGRADED run's findings fully remediated and surfaced new architecture/reliability findings.", scope: "F:\\BIMpossible, F:\\BIMpossible-Workspace, F:\\BIMpossible-AddIns.", result: "09-07's 12 High findings + carried items: ledger fully adjudicated, 0 open of 92 (code #644-650, AddIns #139/140, Workspace #149/150; CHAIN-1 retired 2026-09-10 as a PR-review policy change, not a code fix). New this run: ARCH-1A/2A/3A, RE-2A (architecture/reliability, owner-decision-pending). Breach chains re-scored against widened evidence: the unsigned-add-in-delivery chain (tracked as CHAIN-2 through 09-07, carried on the addins card) renamed CHAIN-3 as its precondition widened from the owner's own account to any local account; a new CHAIN-2 (relay secret written in plaintext to a machine-wide registry key) was found and fixed the same day.", report: "weekly-full-audit_2026-09-11.md" },
          { date: "2026-09-07", type: "Weekly full audit -- RUN DEGRADED (Track A's direct-scope parent agent for backend/database/docker never delivered a final report; per standing rule, a lens that did not run produced no evidence, not a pass).", scope: "Tracks B/C, a 7-way Slop lens, and a first 6-sub-lens Hygiene lens all ran to completion across all three repo roots; Track A's direct scope (outside its two nested children) is a permanent gap for this run.", result: "0 Critical / 12 High / 15 Medium / 10 Low / 3 Info across all lenses. Top findings: CHAIN-1 (unreviewed merge onto either repo's main, composed with two CI gate blind spots), HYG-2/3/4 (APS-write-approval and firm-literal/raw-SQL CI gates have blind spots), SLOP-RL-1/2 (AddIns RevitLink write-integrity: discarded commit status, unconditional success dialog). All confirmed fully remediated by the 09-11 re-run.", report: "weekly-full-audit_2026-09-07.md" },
          { date: "2026-08-31", type: "Weekly full audit (seven lenses + slop fold + breach-chain overlay) -- evening re-run superseding the 08:37 morning pass; closeout the same evening, final delivery 2026-09-01.", scope: "F:\\BIMpossible, F:\\BIMpossible-Workspace, F:\\BIMpossible-AddIns -- all three roots reachable, full lens coverage, no RUN DEGRADED banner.", result: "0 Critical / 1 High / 6 Medium / 10 Low as originally rated -> 0 open. 17 closures new to this cycle (16 fixed with proving tests across BIMpossible #514/#518/#522/#523, AddIns #116, Workspace c71aa12; RE-1/CQ-4 confirmed already fixed), RE-2 (relay) accepted as designed, WSR17/SEC-WIZ-HUB-1 reconciled as a stale carry-forward (CHAIN-1 retired). Breach chains: 0/0/0/1 Low (CHAIN-2, code-signing on hold by owner decision).", report: "weekly-full-audit_2026-08-31.md" },
          { date: "2026-08-26", type: "Final closure record -- M-30 (the last held finding, tracked on the AddIns card) retired via a genuine live-Revit capture merge; supersedes the 2026-08-25 resolution record for the estate as a whole.", scope: "Cross-repo 56-finding estate (2026-08-17 weekly full-audit + carried items). No BIMpossible-web code changed this pass -- closure was AddIns-side (PR #107).", result: "Estate-wide 56 -> 0 open. BIMpossible-web card itself was already 0 open as of 2026-08-25; this entry records the estate reaching full closure. Full record: audit-closure-COMPLETE_2026-08-26.md.", report: "audit-closure-COMPLETE_2026-08-26.md" },
          { date: "2026-08-24", type: "Repo-scoped supplemental audit (Security/Reliability/Architecture/Code-quality/Frontend, standard-practice lenses -- not the persona-lens baseline) -- read-only, resolved same-day.", scope: "F:\\BIMpossible only; F:\\BIMpossible-Workspace and F:\\BIMpossible-AddIns were inaccessible this run -- no Hygiene/Slop lens, no AddIns coverage, no diff against the 2026-08-17 baseline. Does NOT continue that baseline's finding-ID numbering; its 4 High / 25 Medium / 13 Low / 3 Info (45 total) remain open and untouched by this run.", result: "0 Critical / 0 High / 2 Medium / 9 Low / 14 Info (11 substantive findings, all in new standard-lens ID space: SEC-1..3, RE-1..3, ARCH-1..2, CQ-1..3, FE-1). Resolved same-day: 9 (SEC-1, SEC-3, RE-1, RE-2, RE-3, ARCH-1, CQ-1, CQ-2, CQ-3), each verified by Verify-Local-CI.ps1 -BaseRef origin/main (backend 5123 passed, vitest 1950 passed, eslint/tsc/next build clean) plus typescript-api-reviewer PASS on the frontend edit. SEC-2 retained by design (nonce-scoped static bootstrap, non-exploitable). ARCH-2 inspected, document-only (one of two extraction candidates not behavior-preserving; queued for next schedule-consolidation pass). FE-1 verified, no change (sub-agent's original claim of zero aria attributes was false on verification; downgraded Medium->Low, existing aria-sort/aria-expanded coverage sufficient).", report: "audit-resolution_2026-08-24.md" },
          { date: "2026-08-17", type: "Weekly full audit (Security/Reliability/Architecture/Code-quality/Frontend + first-run Hygiene & Slop) -- read-only. Reconciled 2026-08-22 on implementation-backed closure evidence: 32 of 77 findings resolved with a matching post-report code change; 45 active. 15 items previously recorded resolved without closure evidence were restored to active status (records correction, not new regressions).", scope: "Main repo HEAD (24 further commits since, through PR #445). First cycle running the Hygiene and Slop lenses end-to-end alongside the standard Security/Reliability/Architecture/Code-quality/Frontend sweep -- companion doc ops-followups_2026-08-17.md covers 6 separate OPERATIONAL follow-up flags (not code findings), all closed per its own final addendum (PRs #409/#410/#411/#70/#60 merged, a live Cowork task amendment applied, _backups/postgres deleted, scheduler drift confirmed matching).", result: "0 Critical / 10 High / 39 Medium / 24 Low / 4 Info at audit time (77 total). RECONCILED 2026-08-22: 32 of 77 findings closed with implementation-backed evidence -- each verified by an exact finding-ID citation in a post-report commit that changed at least one implementation file in a covered repo (6 High, 14 Medium, 11 Low, 1 Info). 45 remain active (4 High / 25 Medium / 13 Low / 3 Info). 15 findings previously marked resolved in the manual reconciliation were restored to active status after reconciliation found their closure records lacked implementation-backed evidence (no citation, audit-bookkeeping-only, or audit-artifact-only); this corrects the record and is not a new regression. Resolved Highs retained: SEC-WIZ-HUB-1, SEC-PAIR-1.", report: "weekly-full-audit_2026-08-17.md" },
          { date: "2026-08-08", type: "Incremental audit (six focused cluster sub-agents, #256->#312 window) + same-window resolution", scope: "~150 changed files across ~40 commits (#256->#312) plus 2 uncommitted items; ~95 files deep-read in six clusters (gateways / firm-tenancy sweep / auth-admin-allowlist / firm-alias+schedules+cross-model-join / backup PowerShell / migrations+models). The window's security-critical work -- the firm-wide require_active_membership sweep (#264), APS hub isolation (#265/#267), upstream-error sanitization (#266), personal-listing firm-scoping (#312/#278/#287/#290), the D-4 admin-secret retirement, and Slack/Teams crypto+signature -- was verified sound.", result: "0 Critical / 3 High / 10 Medium / 14 Low + ~10 NIT / 1 INFO. All 3 High were in NEW surfaces: H-1 Slack pairing collapsed identity-less sessions onto one shared UUID (twin of a prior Teams bug -- fixed with require_identity()); H-2 an unbounded docker-exec in Backup-Db reopened the exact backup-hang the pipeline exists to close (routed through Invoke-BoundedCommand); H-3 the restore drill greened on a partially-restored dump (added --exit-on-error). All 10 Medium and all 14 Low were fixed or accepted-documented: 24 implemented + L-2 already-fixed on baseline (b19e377) + L-7 owner-decided (firm-first alias precedence stays; documented in CLAUDE.md + clientRules.ts). The resolution doc was authored uncommitted on a review worktree ('nothing committed/pushed'), but the fixes have SINCE landed -- verified present on origin/main 2026-08-16 (require_identity, Invoke-BoundedCommand, --exit-on-error, _MAX_BODY_BYTES). Verify-Local-CI green: backend Docker pytest incl. 12 new regression tests, frontend 1726+6 vitest / tsc / next build (model route 198 KB < 207 KB ceiling). Excluded from remediation by instruction: the ~10 NIT, the 1 INFO (stale graphify X-Admin-Secret artifacts -- still on disk, incl. a 2026-08-10 graph), and the OPS-C*/CANON-C* harness-layer candidates (one flags that the repo's 'never touch .env/guard.py' rule is instruction-not-control -- recorded, not actioned).", report: "audit-resolution_2026-08-08.md" },
          { date: "2026-08-04", type: "Weekly full audit (scheduled, autonomous, 3 lens sub-agents) — then a same-day close-out of everything it raised", scope: "Main repo HEAD ff42ac3 (exactly one commit past last week's audited tree — that commit being last week's own 12-item close-out). Add-Ins origin/main 19c5ddd. The consolidating pass caught and corrected one of its own sub-agents, which had read RE-1's status off a stale unmerged local branch (cc4adc3, not an ancestor of origin/main) and reported it still open.", result: "**RE-1 RESOLVED — the carried High for 4 consecutive cycles, and the first High-free cycle in this report format.** Verified by direct diff read, not commit message: Add-Ins PR #46 (19c5ddd, merged 07-27) moved the queue lifecycle into a new Revit-free PendingRequestQueue.cs with a 3-state CAS (Pending/Abandoned/Dispatching) so abandon-vs-dispatch has exactly one winner, and PipeServer now abandons on timeout and in the generic catch too — broader than the original finding, which named only the EVENT_REJECTED path. Backed by 9 new tests, red-green verified (reverting the drain fails 5 of 9) — the first coverage EventDispatcher/PipeServer have ever had. The audit also re-verified all 9 of last week's BIMpossible-repo closures against current file content, and confirmed the detection gap that let two items sit unfixed for two cycles (a source-scan test with a blind spot) was itself closed. It then raised 6 genuinely new findings, all Low/Medium — and ALL SIX were resolved the same day by PR #239 (68bb596, 11:22), hours after the report was written: a code-enforced BIMPOSSIBLE_ALLOW_SYNTHETIC_SEED opt-in guard on the perf-seeding scripts (the run's headline new risk), transient-HTTP retry parity between the wizard's two sibling poll loops, a non-loopback refusal in the load-test harness, three more open-on-demand modals moved to dynamic import, and the untracked-script/scheduling-cadence pair resolved by tracking the wrapper and removing its Task-Scheduler registration path. PR #240 followed with two dependency-advisory bumps. Auto-Fix Pass: BLOCKED for a 4th consecutive cycle (preflight found no PowerShell/Docker) — but this run did land the process fix that had been flagged as undoable from a working session: the live scheduled-task prompt was patched via the scheduled-tasks tools to run the preflight explicitly and to check the Add-Ins repo's origin/main rather than whatever branch is checked out locally.", report: "weekly-full-audit_2026-08-04.md" },
          { date: "2026-07-27", type: "Weekly full audit (scheduled, autonomous, 3 lens sub-agents) — then a same-day resolution pass from a Windows/Docker-capable session", scope: "Main repo HEAD 569bcb8 at audit time (47 commits since 2026-07-20). Add-Ins HEAD cc4adc3 (an unmerged PR #45 tip, confirmed byte-identical to main on the audited files). Resolution work branched from origin/main in a worktree, verified with Verify-Local-CI.ps1 (Docker 29.6.1 + MSBuild available) rather than asserted.", result: "Audit found Critical 0 / High 1 (RE-1, carried) / Medium 8 / Low 8 / Info 6, essentially flat vs 07-20, with one sub-agent finding (SEC-WIZ-APPROVAL-1) checked and DISPROVEN by the consolidating pass. Same day, a Windows/Docker session resolved 12 of the queued 12 Human-Review items — the first time in 3 consecutive cycles (07-13/07-20/07-27) this sandbox-CI-verification gap didn't block every fix. RE-1 (the carried High): the audit's own suggested test wasn't buildable as described (BIMpossible.RevitLink.Tests has no Revit package refs) — real fix extracted the queue lifecycle into a new Revit-free PendingRequestQueue.cs with a 3-state CAS ownership handoff (abandon vs. dispatch has exactly one winner), producing EventDispatcher/PipeServer's first-ever test coverage (9 new tests, red-green verified) and closing 2 more instances of the same defect the audit didn't catch (TIMEOUT/EXECUTION_ERROR paths, not just EVENT_REJECTED). SEC-MEMBERSHIP-1 required an owner design decision, taken same day: bind the static-firm fallback to single-tenancy (no-op below 2 registered firms, denies past that). SEC-NPMALERT-1's own acceptance test (0 open HIGH Dependabot alerts) only passed after merging to the default branch, then was re-run live to confirm, not inferred. 2 more Info items independently closed: FE-BASELINE-1 (a Checklist claim was found FALSE when re-checked — corrected, not just re-asserted) and ARCH-ADDINS-TEST-COUNT (last week's '634 vs 895' scare reconciled: the audit counted a stale PR branch, not main; 904 attribute-count is the real baseline, distinct from the 1473 dotnet-test prints). CQ-WIZ-LEGACY-1 formally deferred with its unblock precondition now written down. Both PRs merged (BIMpossible #231 -> ff42ac3e, Add-Ins #46 -> 19c5ddde), post-merge CI green on both, 0 open Dependabot alerts re-confirmed live after merge. Structural finding: the recurring 3-cycle Auto-Fix stall's real root cause is that the SCHEDULED audit prompt itself is hosted outside every reachable dev-session surface (not in .claude/skills, not in CronList/list_scheduled_tasks) — genuinely unpatchable from here. A reachable sibling automation (bimpossible-audit-loop.js) had the identical fail-open defect and was fixed this pass (now fails closed with an explicit preflight verdict); the remote routine itself remains the one item only the owner can act on.", report: "audit-resolution_2026-07-27.md" },
          { date: "2026-07-20", type: "Weekly full audit (scheduled, autonomous, 3 lens sub-agents) — read-only, no same-day remediation", scope: "HEAD 29e96da, 21 commits since the 2026-07-13 run. Largest new surface: WSR8 write-gate unification + convergence work (92738b3/9713356/df7add1/29e96da), continued Phase 3.10a/3.10b performance work, and the new Alembic single-head CI guard.", result: "5 resolved, independently re-verified (not just claimed): WSR8 (the write-gate bypass — now one shared check_firm_model_editor predicate used identically by both call shapes, proven by a source-scan test), plus the 4 conditional day-two gaps that shipped alongside WSR8 step 2 rather than after it (RE-NEW-4 CAS guard on finalize, RE-NEW-5 reclaim sweep, ARCH-NEW-1 365-day retention, CQ-NEW-1 dormant-status test). Net severity is flat, not down: the prior High (WSR8) resolved, but a DIFFERENT previously-carried High (RE-1 — EventDispatcher's queue-drain bug) surfaces as this cycle's headline, traced end-to-end for the first time (was always open, just not previously the loudest finding). 4 new low/medium items are foreseeable loose ends after a big refactor (stale docstrings, an engine-factory bypass on a read-only path, a supply-chain gap in the newly-split Add-Ins repo, a test-count delta needing reconciliation) — not signs of regression. Auto-Fix Pass ran but applied zero fixes: the scheduled runner's sandbox has no Docker/PowerShell, so every candidate (including the trivial docstring fix) was routed to human-review rather than applied unverified.", report: "weekly-full-audit_2026-07-20.md" },
          { date: "2026-07-15", type: "Phase 3 production-readiness / roadmap-truth audit (day-2, 5 evidence agents) — then overtaken by same-evening work", scope: "Both repos, re-verifying every prior claim against live code/git/docker/GitHub-API state rather than trusting yesterday's audit or this morning's owner decisions. Pure audit — no files modified.", result: "⚠️ POINT-IN-TIME: the report was written 18:40 and most of its headline findings were resolved within 3 hours, by work done the same evening. Its #1 blocker — 'the Phase 3.10a warm pipeline has produced exactly zero rows on every dimension since it was built, 0 room_join_geometry jobs ever even ENQUEUED, re-confirmed live today 2×' — was closed at 19:18 by a4ecece: the FIRST-EVER live warm + join proof against a real cloud project (the id-bridge fix c2d5756 that unblocked it had landed at 18:33, 7 minutes before the report was written). AC-1 then closed via the real endpoint and AC-3 went from FAIL to PASS (p50 215ms → 18ms) via a per-(project, arch-version) room-pool cache + bbox pre-filter (7f8735f/413adf8/c169f61/3b2fa93) during a supervised flag-flip. Finding #4 (ProgramPlan's 3 stale 'Wave 22' cross-refs surviving two correction passes) fixed at 19:22 (7be8f6a). Finding #9 ('two owner decisions landed today with zero code behind them') is obsolete: Phase 3.8's minimal-wedge slice 1 landed 19:14 (48c4826) and WSR8 step 2 went from the check_firm_model_editor role (19:31, 92738b3) to fully wired gated LLM→live-Revit parameter write (21:30, 9713356, flag OFF), marked BUILT+SHIPPED in the docs repo at 04:40 the next morning. Finding #2 (an uncommitted worktree 'BIMpossible-warm-idbridge' with live edits to exactly the files implicated in the 0-rows bug, status unknown, flagged to the owner) resolved itself — the worktree is gone from disk and its fix c2d5756 is on main. Finding #6 was self-corrected inside the report: the 'Phase 15 branch contains no WPF/C# code' alarm was a scoping error — the pane lives in a THIRD repo (Add-Ins), which no agent was pointed at; it is genuinely built (1124/1124 tests, both TFMs). GENUINELY STILL OPEN: branch protection has enforce_admins=false so required checks are a signal not a gate on the direct-to-main push path; two rival unmerged shared-parameters branches (both confirmed still present); WSR8's doc trail stranded off main; and the live revit_link READ flag has no default-value regression test.", report: "2026-07-15__phase3-production-readiness-audit.md" },
          { date: "2026-07-14", type: "Phase 3 production-readiness audit (ground-truth verification, 4 evidence passes) + same-day partial remediation", scope: "Every Phase 3 feature, sub-phase, spec, plan, migration, flag, endpoint, worker, and runbook, cross-checked against live prod DB rows, real CI status, and git history — not the ledgers' own claims.", result: "Headline: the project's own status ledgers disagreed with each other and with the running system on nearly every point that mattered. Found (and same-day fixed): no automated guard against Alembic multi-head migration collisions — this exact risk class caused a real prod outage the night before (351 backend container restarts, two migrations landed with no backend-migrate run); fixed via a new CI guard (1e07550). Also found+fixed: frontend/Dockerfile had no ARG/ENV line for the Phase 3.10a flag at all, silently no-opping the documented 'flip it on locally to test' path (a2a4a23). Corrected same-day, citing this audit: PHASE-STATUS.md (Phase 3.10a's warm-time pipeline is code-complete, migrated to prod, CI-green — but has NEVER executed against real data, 0 rows in room_footprint_cache/level_band_cache/element_cache.origin_x, confirmed live; the prior 'owed a live-test verification' framing was wrong the day it was written; added the missing Phase 3.8 entry) and WAVE-STATUS.md (was 13 days stale despite 4 real waves shipping; backfilled waves 26-29 for 3.10a/3.10b-Furniture/P3-8-DYN/WSR8). Still genuinely open: ProgramPlan.md (1,574 lines) was explicitly NOT corrected — still gates Commercial Launch on the Phase 3.8 custom-role-matrix design abandoned 2026-07-12, and has zero mentions of 3.10/3.10a/3.10b/WSR8 anywhere; Phase 3.10a's flag-ON path has no ErrorBoundary/malformed-row guard (the flag-OFF path does) — turning the flag on, the literal next planned step, risks a whole-page crash; and a broader silent-empty-state sweep found 3 spots where a genuine failure and genuine emptiness render identically (category-vanish-on-0-elements, Circuits timeout-vs-404, ElementPreviewPanel's Related section with no error state at all).", report: "2026-07-14__phase3-production-readiness-audit.md" },
          { date: "2026-07-13", type: "Weekly full audit (3 parallel lens sub-agents) + same-day closeout", scope: "HEAD 85f27e2, 47 commits since the 07-06 run; largest new surface is the assistant live Revit-parameter-write execution primitive (9891132). Every Medium+ carryover re-verified by direct code read, not commit-message trust.", result: "0 crit / 1 high / ~7 medium / ~14 low / ~4 info — then EVERY finding closed (11 shipped in code/config + 6 accepted, documented owner decisions), zero dangling. Headline WSR8 (High): the new assistant Revit-write primitive bypassed revit_link/router's flag+role gate stack — re-routed through a single-source assert_write_authorized() (c4194c5, on main + pushed, remote CI green); it stays dormant/unwired. Remaining fixes (RE-NEW-4/5/6 CAS + reclaim sweep + batching, FE a11y/types, ARCH-NEW-1 365-day retention, docker resource caps, RE-NEW-3 backup-failure webhook, SEC-NEW-1 fails-closed tripwire) landed in b6bb96f, now merged to main + pushed. Accepted-deferred (tracked, not dangling): SEC-3 + SEC-NEW-1 open-mode fallback close at multi-user; ARCH-NEW-2 router god-file split at next major touch. Prior run's Critical (07-06 uncommitted git merge) confirmed resolved.", report: "weekly-full-audit_2026-07-13.md" },
          { date: "2026-07-11", type: "Incremental verification (6 agents) + same-day TDD resolution (7 agents) + 1 follow-up fix", scope: "53 findings carried in from 07-08 (6 Critical/High + 47 Medium/backlog), independently re-derived from live code/tests/gh api/semgrep rather than trusted; everything still open after that was then fixed same-day, including the one item tracked outside the batch", result: "Verification pass: 41 of 47 confirmed genuinely fixed; 4 medium open (1 new bug introduced by the WIZ-5 fix, 2 reclassified from 'fixed' to partial after live semgrep/code-path checks, 1 known live gap needing a GitHub settings change) + 5 low partials, each with a real narrow open half. Resolution pass, same day: all 9 fixed via strict TDD (failing test first, minimal fix, full-suite regression) by 7 agents on disjoint files, caught and fixed one incidental cross-test logging-isolation bug along the way, finished with backend 2784+1933+4 passed / frontend 1648/1648+build clean — LOCAL CI GREEN. CI-2's settings half (dependabot-automerge past a red security scan) closed same day too: code-side GitHub-issue notification added and verified (12/12 mocked assertions), then the owner wired security-scan-summary into branch-protection required checks, confirmed live via gh api. Final item, task_645d4dde (the rated_pressure_pa unit-conversion bug adjacent to SCH-M5, deliberately tracked outside this batch): fixed same day too (f07fb3e) — added an exact PSI→Pa constant mirroring the existing flow-rate pattern, test asserts against an independently hand-computed literal so a wrong constant would still fail, full pure-lane suite verified (1903 passed, 0 failed). Zero Critical/High/Medium/Low open — only the pre-existing 8 info/cosmetic residuals remain. Operational note: 2 unpushed-but-verified-correct commits (711b8a5 + merge bdfba8a) found on local main earlier — unrelated maintenance, not an audit item", report: "2026-07-11__audit-report.md" },
          { date: "2026-07-10", type: "Code-level re-verification (not a full audit re-run)", scope: "All 5 open Critical/High from the 07-08 report, checked against current source + live system state (Task Scheduler, Docker container restart times, live Postgres migration)", result: "All 5 confirmed FIXED with live verification, not just source: OPS-1 (efbbbea, LastTaskResult 0 + fresh dump today), WIZ-6 (21013bb, running in restarted container), AST-1 (376e180, migration d3e4f5a6b7c8 applied to live DB), WIZ-1/WIZ-2 (2d36353, fix for WIZ-2 actually lives in wizard/executor.py not aps_write.py as originally logged). Medium/Low/Info backlog (44/28/14) not re-checked this pass.", report: "2026-07-08__audit-report.md" },
          { date: "2026-07-08", type: "Incremental (5 agents)", scope: "22 commits / 117 files since bd472b0: remediation batches 07-01→07-07 + wizard APS write client + Coordination Report 11.1 + shared-parameters registry", result: "OPS-1 (Critical, live): nightly DB backup silently failing since 07-06 repoint; +4 HIGH on the write-back perimeter (WIZ-6 live write endpoint no authz, AST-1 unscoped edit-log tool, WIZ-1/2 latent audit-trail integrity). All 30 prior closures verified genuine", report: "2026-07-08__audit-report.md" },
          { date: "2026-07-06", type: "Weekly full (3 agents)", scope: "Whole tree @ 83384da — 39 commits since 06-29", result: "OPS-CRIT-1 (Critical): main in unresolved uncommitted merge (~856 files) — resolved same-day. 0 High; SEC-10/11/12, OPS-2, FE-16/18 verified closed; wizard write surface judged best-gated in codebase. 11 findings resolved via fe7720c + 07-07 follow-up closed the remainder", report: "weekly-full-audit_2026-07-06.md" },
          { date: "2026-07-01", type: "Full (run 2, deep — 7 agents)", scope: "Whole tree @ bd472b0 — adversarial bug-hunt", result: "9 HIGH the same-day survey missed: SCH-H1 empty schedule endpoints, SCH-H2 missing auth gate, AST-H1 fail-open crypto, AST-H2 denial-of-wallet, FE-H1/H2, OPS-H1 backup-verify-can't-fail, OPS-H2 lying CI watcher, OPS-H3 dead automerge — 8 fixed same-day + wave-2 (#173)", report: "2026-07-01__audit-report-full-2.md" },
          { date: "2026-07-01", type: "Full (run 1, survey — 5 agents)", scope: "Completeness survey @ bd472b0; carry-forward re-verify (all 6 confirmed fixed)", result: "'Clean sprint' verdict SUPERSEDED — the same-day deep re-run found 9 HIGH this survey missed", report: "2026-07-01__audit-report-full.md" },
          { date: "2026-06-30", type: "Full", scope: "Assistant subsystem, prewarm worker, Sheets OAuth, FieldCombobox, graph topology, CI, semgrep", result: "GRAPH-1 (High, carry-forward): O(n²) _load_served still unaddressed — fixed 07-01 with O(V+E) rewrite + regression test", report: "2026-06-30__audit-report-full.md" },
          { date: "2026-06-29", type: "Incremental", scope: "~50 files / 30 commits: Phase 4d Levers 1–4, NetworkX topology, security CI hardening, backup fix", result: "DIGEST-1 (High): useDigest never re-fetches after 'preparing' — digest spinner never resolves during model warming", report: "2026-06-29__audit-report.md" },
          { date: "2026-06-22", type: "Weekly full", scope: "Whole tree", result: "All clear — 0 open · 5 closed (expr-eval CVE removed, relay frame guard, multi-tenant auth scoping via #142)", report: "2026-06-16__code-audit.md" },
          { date: "2026-06-16", type: "Weekly full + verification", scope: "Whole tree @ 04b5d8d", result: "0 Critical / 0 live-exploitable · new SEC-9 backend CSV formula-injection (Medium); SEC-8 PUT /ref 500s", report: "weekly-full-audit_2026-06-16.md" },
          { date: "2026-06-15", type: "Weekly full", scope: "Whole tree + QA/wizard WIP", result: "0 Critical · OPS-1 (High, process): new QA/wizard surface CI-unverified while Actions billing-blocked", report: "weekly-full-audit_2026-06-15.md" },
          { date: "2026-06-14", type: "Full (backend + frontend)", scope: "Phase 3 F-1…F-28, Phase 4a/5, expr-eval removal", result: "NM-1 (Medium): list_views checks project allowlist before auth — probe via differing error codes", report: "2026-06-14__audit-report-full.md" },
          { date: "2026-06-13", type: "Full", scope: "Whole tree @ 58fd53c (W10-17 merges)", result: "FEA-4 (Medium): 15 new Wave 10-17 schedule views ship with zero unit tests", report: "2026-06-13__audit-report-full.md" },
          { date: "2026-06-10", type: "Full (7 agents)", scope: "Whole tree @ 277e6d2 · re-verified 68 perp-audit fixes", result: "CORE-1 (High): refresh never invalidates the durable category cache → stale sidebar on republish", report: "2026-06-10__audit-report-full.md" }
        ]
      },
      waves: {
        updated: "2026-09-29",
        source: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md",
        summary: { done: 31, built: 21, inFlight: 1, ahead: 3 },
        current: [
          { id: "15", title: "Civil schedules", status: "PARTIAL", date: "2026-06-13", note: "Civil probe-config + model-discovery work merged (`cf3b8ee` Merge feat/wave15-civil-probe-config; model-discovery (local merge c7ac2d5; feat 9145f88)). Adds `b…" },
          { id: "26", title: "Phase 3.10a Cross-Model Room Join", status: "BUILT", date: "2026-07-13", note: "Code merged `dd5adb1` (2026-07-12); warm-time writer gap found+fixed `c72f647`/`09cb66b` (2026-07-13); migration genuinely applied to prod (confirmed live). No…" },
          { id: "28", title: "Phase 3.10b Furniture slice", status: "BUILT", date: "2026-07-12", note: "`4bb6497`, reuses 3.10a's algorithm unchanged. Inherits Wave 26's never-executed-pipeline gap — same caveat applies." },
          { id: "29", title: "WSR8 write-primitive cluster (assistant-Revit-write auth gate + reliability hardening)", status: "BUILT", date: "2026-07-13", note: "`c4194c5`, real GitHub Actions CI green. `execute_proposal` has zero production callers, enforced by a real AST-based test in the required CI gate — correctly,…" },
          { id: "30", title: "Phase 17 (17a Slack + 17b Teams) chat assistant gateways", status: "BUILT", date: "2026-08-08", note: "Slack `dd89889` (#262, merged 2026-08-07), Teams `879e857` (#276, merged 2026-08-08). Read-only Q&A against a bound project + model from a channel, fronting `a…" },
          { id: "31", title: "Phase 15c — In-Revit Assistant Pane, Revit-context injection", status: "BUILT", date: "2026-08-18", note: "Add-Ins [PR #74](https://github.com/YourBIMpossible/BIMpossible-AddIns/pull/74) \"feat(15c): live document reads in the Assistant pane\", merged 2026-08-18. Buil…" }
        ],
        lastCompleted: { id: "33", title: "Per-window exactly-once release gate for the scheduled synthetic-concurrency audit", date: "2026-09-07" },
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
      phase: "origin/main at a815ee1 (#163, 09-26). Since 09-23 the owner merged #152 (Glass tactical-cockpit theme + startup-OOM fix, review R1-R5 closed), #157/#158 (Link-PDF placement/reconcile hardening, after the 09-25 live smoke) and #162/#163 (installer artifact verification + commit-stamped build provenance: ProductVersion 1.x+sha, manifest commit check, startup identity log). A 09-26 /review-all of the merged Link-PDF stack found 2 blockers + 21 follow-ups on main; remediation PR #164 (pushed, unmerged) fixes all 23 and passed its Phase R live run (R.1-R.9, R.11 PASS; R.10 partial). Shared Revit deploy slot last held #164 @36f9e0c (non-main, 09-26); no restore-to-main recorded after it. Local main checkout ed27835 is clean, 2 behind; the 09-26 lane-alignment closeout pruned 3 merged worktrees. Open PRs: #164, drafts #146/#147/#148.",
      focus: "Merge PR #164 (Link-PDF review-all remediation: 2 High blockers + 21 follow-ups, live-verified in Phase R) so main stops carrying the tamper-check fail-open and migration-after-rollback defects, then redeploy main to the shared Revit slot. Residual live gaps: legacy v2 append (R.10), F11 cancel path, A5.6/H.2 unit-only, installer lane. CHAIN-3 add-in folder trust stays owner-gated (signer-pinned verification now in place via #162/#163).",
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
      activity: [3,0,3,2,0,0,2,1,0,0,0,0,10,1],
      lastActivity: {
        date: "2026-10-06",
        summary: "docs-hygiene(G4): sync scope-guard hardening from BIMpossible 4cd76111 (#807) (#179) (472f671)"
      },
      branch: "main at ed27835 (clean, 2 behind origin/main a815ee1)",
      git: null,
      nextActions: ["Owner merge PR #164 (Phase R R.1-R.9/R.11 PASS live, R.10 partial; refresh its stale 'PENDING LIVE' PR body first), then redeploy main from a clean detached worktree and hash-verify the shared Revit slot (last deploy was #164 @36f9e0c)","Prune local-only lanes (HYG-C3): drop claude/linkpdf-candidate (53 commits ahead but tree identical to ed27835 -- squash-merge artifact) and superseded claude/glass-linkpdf-deploy; remove orphan worktree folders and merged remote lane branches; decide claude/glass-mispick-runlog-seam (4 patch-unique commits); fast-forward local main (2 behind)","Link-PDF residual live coverage: legacy v2 append (R.10), F11 corner-mismatch Cancel path, installer lane; WORKLOG calls on Ctrl+Z orphan image types and the stale B1.2 warning","Decide draft PRs #146/#147/#148 (B1/B2 no-implicit-scaling policy, Feature E north-star, B2 packing HOLD)","CHAIN-3: remove non-admin write on the add-in directory and buy the Authenticode certificate (signer-pinned installer verification from #162/#163 is ready)","First supervised live ACCC Key Plan Apply (ADDINS-KEYPLAN-LIVE-WRITE); forward queue: RE-C1 deploy-guard hardening"],
      pendingDecisions: ["PR #164 Link-PDF review-all remediation: merge now on the Phase R live pass (R.10 legacy-v2 append and installer lane unexercised)?","PR #146 B1/B2 no-implicit-scaling policy and #147 Feature E (image insertion) north-star -- drafts, human decision required","PR #148 B2 packing foundation -- HOLD pending canonical roadmap activation","Local-only branches (21 commits): drop linkpdf-candidate + glass-linkpdf-deploy (both superseded by main); revive or drop glass-mispick-runlog-seam; wip/gemini-paste-residue parked, do not merge"],
      blockers: [],
      reminders: ["Deploy-Local.ps1 writes to a SHARED %APPDATA% Revit Addins folder — hash-check before deploying, never deploy while Revit is open (the 07-25 forensic audit found this exact guard skipped once)","\"Backed up to origin\" is not \"safe to overwrite at runtime\" — the 07-25 postmortem's core lesson; a clean worktree means committed, not complete","Core.dll co-loads in one Revit process: redeploy ALL add-ins together when Core changes"],
      links: [
        { label: "Runtime slot ledger", path: "F:\\BIMpossible-AddIns\\decision-log\\2026-07-25__runtime-slot-handoff.md" },
        { label: "2026-07-25 forensic audit (clobber + cleanup)", path: "F:\\BIMpossible-AddIns\\audits\\2026-07-25__session-audit-cleanup-stream.md" },
        { label: "T4 live-smoke results", path: "F:\\BIMpossible-Workspace\\01_BuildLog\\2026-07-25__T4-live-smoke_RESULTS.md" },
        { label: "Tool backlog", path: "F:\\BIMpossible-AddIns\\TOOL_BACKLOG.md" }
      ],
      recent: ["2026-09-26 - PR #164 Link-PDF review-all remediation (B1/B2 + F1-F21, RA-1..5; tests 2453->2584) live-verified in Phase R: R.1-R.9 and R.11 PASS (Viewport Aligner drawing-area fix 63d1341), R.10 partial; F11 both corners owner-ratified; awaiting owner merge","2026-09-26 - /review-all of the merged Link-PDF stack (#157/#158): 2 High blockers (tamper check fails open on mixed/unparseable jobs; migration commits after placement rollback) + 21 follow-ups","2026-09-26 - #162/#163 installer artifact verification (hashes, names, signer pin, pipe-OFF payload) + commit-stamped build provenance and startup identity log merged","2026-09-25 - #152 Glass tactical-cockpit + OOM (R1-R5 closed), #157 and #158 Link-PDF hardening merged after live smoke (D.6 reconcile fix, region-overflow refusal, cancel rollback, append resume by page identity); main ed27835 deployed pipe-ON and verified; lane-alignment closeout pruned merged worktrees","2026-09-23 - #159/#160/#161 cross-repo doc-reference qualification + docref collision-scanner hardening; PR #157/#158 Link-PDF placement/reconcile hardening opened (owner live-smoke required)","2026-09-22 - 2026-09-21 weekly-audit closeout: clean origin/main build deployed to Revit 2024-2027 and cold-start verified (HYG-C1 closed); all AddIns findings terminal","2026-09-21 - #145 LINKPDF A/C1/D acceptance review + owner live-smoke runbook; #156 panel-schedules sheet-index architecture audit","2026-09-16 - #153 Revit-startup OOM hotfix (caption tracking idempotence + ThemeHookGuard) and #155 WFA-0914 reliability fixes (RE-4/5, SEC-5, CQ-2, HYG-3, RE-7, FE-7) + Deploy-Local tree guard","2026-09-13 - #144/#150/#151 Glass UI layer: RevitLink alerts + binary confirms on Glass, Cancel-safe policy, cockpit theme repair","2026-09-13 - #142/#143 panel-schedules height-aware sheet ordering + pre-dialog timing telemetry","2026-09-12 - #139 WFA 2026-09-11 AddIns remediation (SEC-1C, CQ-1C..4C, ARCH-1C/2C/6C, slop RL/KP/TRD)","2026-09-11 - #115 Tool 20 Key Plan rebuild merged (sector-mapping dialog + hardened live Apply); #138 Revit-free ElementType UniqueId apply gate; CI cut to one lean secret-scan"],
      audit: {
        lastRun: "2026-09-26",
        runType: "/review-all of the merged Link-PDF hardening stack (#157/#158) 2026-09-26, with remediation PR #164 live-verified the same day (Phase R R.1-R.9/R.11 PASS, R.10 partial) but not yet merged. Latest weekly full audit remains 2026-09-21 (closed 2026-09-22); none since.",
        cadence: "weekly (unattended bimpossible-weekly-full-audit, cross-repo) + on-demand /revit-functionality-audit",
        counts: { critical: 0, high: 4, medium: 10, low: 16, info: 1 },
        closedLastRun: 0,
        trend: "worsening on main, one merge from recovery -- the 09-26 review found 4 High data-integrity defects in the Link-PDF stack merged 09-25; all 23 findings are fixed and live-verified on PR #164 awaiting owner merge. Weekly-audit residue unchanged (CHAIN-3 Medium owner-gated, accepted Lows).",
        reportPath: "F:\\Claude-Tools\\reports\\2026-09-26__linkpdf-stack-review-all.md",
        reportFile: "addins/2026-09-26__linkpdf-stack-review-all.md",
        ledgerPath: "F:\\BIMpossible-AddIns\\reviews",
        open: [
          { id: "LP-B1", severity: "high", title: "Link-PDF reconcile tamper check fails open for mixed-size or unparseable job records, so a hand-moved tool-owned placement can be deleted and recreated on reflow -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-B2", severity: "high", title: "Link-PDF import-to-link migration still commits after the placement group rolled back; a failed run changes the model while reporting it unchanged -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F1", severity: "high", title: "Link-PDF placement records store a job ordinal that Reconcile reads as a PDF page number, giving wrong page/slot on non-contiguous selections -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F2", severity: "high", title: "Link-PDF append matching is keyed on the current UI corner, so legacy or corner-flipped jobs start a duplicate overlapping job instead of appending -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "CHAIN-3", severity: "medium", title: "unsigned add-in in a machine-wide, user-writable directory allows in-process inheritance of a live Revit session -- carried 4 runs; directory write-access removal and code-signing certificate are owner-only", source: "breach-chains_2026-09-21.md" },
          { id: "LP-F3", severity: "medium", title: "Link-PDF append rewrites the job page count to the current selection size -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F4", severity: "medium", title: "Link-PDF job records the effective start sheet but append matches on the requested one -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F5", severity: "medium", title: "Link-PDF in-place source reload is committed before the placement outcome is known -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F6", severity: "medium", title: "Link-PDF cancel paths ignore the cleanup result and can report nothing changed when a reload was not reverted -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F7", severity: "medium", title: "Link-PDF reuses a tool-owned import without checking the source fingerprint -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F8", severity: "medium", title: "Link-PDF fit slack changes grid capacity for every layout version, including legacy v2 and region mode -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F9", severity: "medium", title: "Link-PDF grid rebuilt from a rounded signature can flip exact-fit capacity -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F10", severity: "medium", title: "Link-PDF region conflict scan treats notes, detail lines, filled regions and tags as free space -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F11", severity: "medium", title: "Link-PDF layout default and persisted start corner shipped outside the PR's stated scope (owner ratified both corners 2026-09-26; docs on PR #164) -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "RE-2", severity: "low", title: "relay pipe.close() swallow at close time -- accepted-as-designed 2026-08-31, carried open", source: "weekly-full-audit_2026-08-31.md" },
          { id: "RE-C1", severity: "low", title: "deploy tree guard can be bypassed in preview/offline modes (accepted, forward-only queue)", source: "weekly-full-audit_2026-09-21.md" },
          { id: "CQ-C2", severity: "low", title: "several regression pins are source-string matches a comment could satisfy (accepted)", source: "weekly-full-audit_2026-09-21.md" },
          { id: "SLOP-C1", severity: "low", title: "theme font extraction silently returns null; a partial font file is never repaired (accepted, carried from ADD-SLOP-1)", source: "weekly-full-audit_2026-09-21.md" },
          { id: "SLOP-C2", severity: "low", title: "panel-schedules diagnostic writer bare catch swallows errors (accepted)", source: "weekly-full-audit_2026-09-21.md" },
          { id: "HYG-C3", severity: "low", title: "repo hygiene: superseded local-only branches/worktrees (a 53-commit integration candidate whose tree equals main, a superseded combined deploy branch), orphan worktree folders, gone-upstream and merged remote lane branches (accepted, owner git calls; PR #152 since merged)", source: "weekly-full-audit_2026-09-21.md" },
          { id: "LP-F12", severity: "low", title: "Link-PDF planner default layout policy diverges from the current policy version -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F13", severity: "low", title: "Link-PDF tamper check compares only the top-left anchor, so a resize goes undetected -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F14", severity: "low", title: "Link-PDF transaction commit/assimilate statuses are unchecked -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F15", severity: "low", title: "Link-PDF zero-placed run still keeps the created sheets and manifest -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F16", severity: "low", title: "Link-PDF reconcile Missing-delete orphans the page's imported image type -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F17", severity: "low", title: "shared sheet drawing-area rule changed without consumer verification (Viewport Aligner used the whole-sheet area) -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F18", severity: "low", title: "Link-PDF live test matrix overstated live coverage -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F19", severity: "low", title: "merged WORKLOG carried pre-merge status -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F20", severity: "low", title: "Link-PDF invisible-line test depends on a localized line-style name -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "LP-F21", severity: "low", title: "Link-PDF silent catch with no diagnostic line -- fixed on unmerged PR #164 (live-verified), still present on main", source: "2026-09-26__linkpdf-stack-review-all.md" },
          { id: "SEC-C1", severity: "info", title: "debug-build-only local path check bypassable (accepted, info)", source: "weekly-full-audit_2026-09-21.md" }
        ],
        history: [
          { date: "2026-09-26", type: "/review-all of the merged Link-PDF hardening stack (#157 + #158, ce5019f..ed27835) -- 5 blind lenses (code-review, security-diff, revit-lifecycle, BIM standards, BIM spec), orchestrator-verified against ed27835; plus remediation PR #164 and its Phase R live run.", scope: "Link PDF to Sheets + Reconcile PDF Job (placement identity, append, tamper check, run transaction groups, region conflict scan, source reuse/migration) and the shared sheet drawing-area rule; 42 files, +2192/-261.", result: "2 BLOCKER HIGH + 21 follow-ups (2 HIGH, 9 MEDIUM, 10 LOW), all confirmed present on main. PR #164 (claude/linkpdf-review-remediation) fixes 23/23 plus RA-1..RA-5 from a second /review-all; RevitLink tests 2453 -> 2584; VCI -Full -IncludeSecurityLane GREEN @0ea7fdc. Phase R live (Revit 2026, local unsynced test model): R.1-R.9 and R.11 PASS (R.11 exposed a Viewport Aligner drawing-area FAIL, fixed in 63d1341 and re-passed @36f9e0c), R.10 PARTIAL (legacy v2 append not exercised); installer lane not run; F11 both corners owner-ratified. PR unmerged, so all 23 carried open on main. No weekly full audit ran after 2026-09-21; the 09-21 accepted items and CHAIN-3 carry unchanged.", report: "2026-09-26__linkpdf-stack-review-all.md" },
          { date: "2026-09-22", type: "Closure -- 2026-09-21 weekly audit final closeout (all 45 cross-repo findings terminal).", scope: "AddIns track C: installed-DLL provenance, Glass/theme WIP, deploy guard, tests, slop sweep; breach-chain overlay.", result: "HYG-C1 Medium closed (clean origin/main #153 build deployed to Revit 2024-2027, DLL markers/hashes verified, Revit 2025 cold-start clean); HYG-C2 and CQ-C1 disproven; RE-C1, CQ-C2, SLOP-C1, SLOP-C2, HYG-C3, SEC-C1 accepted; CHAIN-3 (add-in folder trust) carried Medium; relay-secret chain not composing (retired from this card).", report: "remediation_2026-09-21/FINAL-CLOSEOUT_2026-09-22.md" },
          { date: "2026-09-21", type: "Cross-repo weekly full audit (non-degraded) incl. AddIns incremental functionality census + slop sweep.", scope: "AddIns 482a2be..baa9efe; RevitLink.Tests 2345/2345.", result: "No Critical/High survived; 09-14 Critical RE-1 (Revit startup OOM) and High RE-2 fixed by #153/#155. New AddIns: HYG-C1 Medium, RE-C1/CQ-C2/SLOP-C2/HYG-C2 Low, CQ-C1/SEC-C1 Info.", report: "weekly-full-audit_2026-09-21.md" },
          { date: "2026-09-16", type: "Closure -- #153 (a7f25f7) + #155 (baa9efe) closed 2026-09-14 AddIns findings.", scope: "BimTheme caption tracking, ThemeHookGuard, SetupRunLog, Glass confirm policy, Deploy-Local.", result: "RE-1 Critical, RE-2 High, RE-4, RE-5, SEC-5, CQ-2, HYG-3, RE-7, FE-7 closed.", report: "weekly-full-audit_2026-09-14.md" },
          { date: "2026-09-14", type: "Cross-repo weekly full audit.", scope: "AddIns Glass/theme layer + breach-chain overlay.", result: "RE-1 Critical (Revit startup OOM from non-idempotent caption tracking), RE-2 High (unguarded theme hooks) plus Mediums/Lows; CHAIN-3 add-in folder trust carried.", report: "weekly-full-audit_2026-09-14.md" },
          { date: "2026-09-12", type: "Cross-repo confirmatory/final-verification run -- breach-chain residuals restated under corrected numbering; no new AddIns-specific findings.", scope: "revit-relay/*, breach-chain overlay (cross-repo).", result: "CHAIN-2 (unsigned add-in, owner-gated) and CHAIN-3 (relay secret DPAPI-LocalMachine, owner Packet 1) both carried open, low severity. 0 closures this cycle.", report: "weekly-full-audit_2026-09-12.md" },
          { date: "2026-09-11", type: "Cross-repo weekly full audit -- breach-chain re-score only, no new AddIns findings.", scope: "Breach-chain overlay re-run against widened evidence (44 manifest dirs + 11 third-party assembly dirs confirmed BUILTIN\\Users:Write, inherited).", result: "The unsigned-add-in-delivery chain's precondition widened from the owner's own account to any local account; renumbered CHAIN-2 -> CHAIN-3 (a new, unrelated CHAIN-2 -- a relay-secret registry finding -- was introduced this run and tracked/fixed on the bimpossible card, not this one). Disposition unchanged: owner-gated (ACL removal + code-signing).", report: "breach-chains_2026-09-11.md" },
          { date: "2026-09-01", type: "Closure -- PR #116 (ba4c3fa) closed RE-01, RE-02, RE-04, CQ-03, CQ-05, ARCH-CI-1 from the 2026-08-31 weekly audit; CHAIN-2 hardened (signtool verify + manifest + runbook) but carried open pending the owner-only certificate.", scope: "RecordMispickCommand, SetupRunLog(+Reader), SetupPrefillIo, new Shared/Setup/AtomicFileIo.cs, Tool2/Tool3/SetupProjectOrchestrator commands, Build-Installer.ps1, Verify-AddIns-CI.ps1, installer-build.yml, docs/ops-dist-signing-runbook.md; 7 new tests", result: "Merged 2026-09-01T17:01Z; 2048/2048 RevitLink tests; Verify-AddIns-CI -Full, -IncludeSecurityLane, -IncludeInstaller all green. CHAIN-2 residual (cert purchase) owner-only.", report: "weekly-full-audit_2026-08-31.md" },
          { date: "2026-08-31", type: "Cross-repo weekly full audit (Workspace-hosted) -- first scored findings against AddIns since 07-14", scope: "F:\\BIMpossible-AddIns C# read (EventDispatcher non-sync handlers, SetupPrefillResolver/Diff internals, WPF windows, Inno [Code] sections out of budget) + relay + CI", result: "AddIns: RE-01 High, RE-02 Medium, CHAIN-2 Medium (breach-chain, score 4/12), CQ-03 / CQ-05 / RE-04 / ARCH-CI-1 Low, RE-2(relay) Low accepted. Morning pass's AddIns-clean verdict superseded as a depth artifact.", report: "weekly-full-audit_2026-08-31.md" },
          { date: "2026-08-26", type: "Final closure -- M-30 (last held finding) retired with 3 genuine live-Revit Place Callout Sheets captures.", scope: "Place Callout Sheets guide only: guide HTML, CAPTURE-LIST.md, 3 PNGs. No DLL, no code.", result: "PR #107 squash-merged fe94288e (2026-08-26T17:31:08Z), required checks green (firm-literals, test, gitleaks, nuget-vulns). Card 0 open (already reflected); estate-wide 56 -> 0. Full record: BIMpossible-Workspace/02_Reference/Audit and Scan Info/audit-closure-COMPLETE_2026-08-26.md.", report: "audit-closure-COMPLETE_2026-08-26.md" },
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
      phase: "M3 LIVE: yourbimpossible.com on Cloudflare Pages; M4 SEO hardening COMPLETE (structured data, OG/Twitter cards, sitemap, CI broken-link check; Lighthouse Perf/BP/SEO/A11y 100 across all 6 pages after the 07-10 a11y remediation). All 2026-06-09 + 07-10 audit findings cleared; 2026-08-31 slop-audit MEDIUM-1 (contact form treated a provider 200/success:false as delivered) fixed same day (1dbbd72); 2026-09-07 LOW-1 (garbled provider body counted as delivered) fixed 2026-09-21 (9c6f7dc), 09-21 slop-audit CLEAN. LinkedIn Company Page live (linkedin.com/company/bimpossible). Remaining pre-launch gaps: business infra (email aliases, social handles, LLC) and real product imagery on interior pages; M5-M6 (pricing + commercial launch) not started. HEAD 44b159b (2026-09-22).",
      focus: "Post-launch hardening + policy/compliance publishing - closing audit findings and shipping legal/data-policy pages. No active feature front.",
      progress: {
        label: "Milestones",
        phases: [
          { name: "M0-M3 Foundation + live deploy", pct: 100, note: "Unchanged -- repo clean, HEAD 44b159b (2026-09-22), deploy intact." },
          { name: "Business infra + presence", pct: 55, note: "Domain + Cloudflare live; LinkedIn live; email aliases + social handles still open (IP-Lockdown-Checklist.md unchanged since 05-27)." },
          { name: "Content + product imagery", pct: 30, note: "Copy live; interior pages still reuse the shared Hero.png backdrop — screenshot-review/*.gif captured 06-11 but never wired into product/bim-managers/leaders pages." },
          { name: "M4 SEO hardening", pct: 100, note: "Structured data (5ab26cf), OG/Twitter cards + sitemap (08aed1e/94fb4fe/25060d4), CI broken-link check (43c192c); Lighthouse Perf/BP/SEO/A11y 100 across all 6 pages after the 07-10 audit's a11y remediation (4bbe591, 0594e6e)." },
          { name: "M5-M6 Pricing + commercial launch", pct: 0, note: "No pricing/waitlist/signup page exists in site/src/pages." }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-09-22",
        summary: "docs(audit): close 2026-09-21 audit (44b159b)"
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
      recent: ["2026-09-22 - docs(audit): close 2026-09-21 slop-audit -- CLEAN, 0 findings (44b159b)","2026-09-21 - fix(contact): fail closed on a truncated/unparseable provider body (closes 09-07 LOW-1; 9c6f7dc)","2026-09-07 - Weekly slop-audit: 0C/0H/0M, 1 LOW hypothesis (malformed provider body)","2026-08-31 - fix(contact): treat provider 2xx with failure body as undelivered (slop-audit MEDIUM-1; +7 tests, 27/27)","2026-08-31 - First weekly slop-audit report published (audits/2026-08-31__slop-audit.md): 1 MEDIUM, 0 other","2026-08-27 - Correct planning-docs path (AI-Dev -> BIMpossible-Site)","2026-08-25 - Publish /data-policy: ratified Data Residency & Retention Policy","2026-08-25 - Close 2026-07-10 audit residuals (CONTACT-RL, TURNSTILE-HOST, CSP-STYLE) + restore nav/theme contrast"],
      audit: {
        lastRun: "2026-09-21",
        runType: "Slop-audit (cross-repo 2026-09-21 zero-residual closeout) over the one code commit in window, 9c6f7dc, which closed the 09-07 LOW-1 hypothesis: an object-shaped but unparseable provider body now fails closed (502) instead of counting as delivered; plain non-JSON webhook acks unaffected. Verdict CLEAN, 0 findings; tested-but-dead refuted (both directions asserted); npm test green.",
        cadence: "weekly slop-audit (scheduled) + full code audit on demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        trend: "improving",
        reportPath: "F:\\BIMpossible-Site\\site\\audits\\2026-09-21__slop-audit.md",
        reportFile: "site/2026-09-21__slop-audit.md",
        ledgerPath: "F:\\BIMpossible-Site\\audits",
        closedLastRun: 1,
        open: [],
        reportDate: "2026-09-21",
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "site", head: "44b159b", inspected: true }
        ],
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 1, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "success",
        ingestDetail: "reconciled against site at 44b159b; 0 findings; 09-07 LOW-1 (malformed provider body treated as delivered) closed by 9c6f7dc. 0 open.",
        unknown: [],
        history: [
          { date: "2026-09-21", type: "Slop-audit -- cross-repo zero-residual closeout pass.", scope: "functions/api/contact.ts, tests/contact.test.mjs (commit 9c6f7dc).", result: "CLEAN, 0 findings. 09-07 LOW-1 closed by 9c6f7dc (object-shaped unparseable body fails closed). npm test green.", report: "2026-09-21__slop-audit.md" },
          { date: "2026-09-07", type: "Weekly slop-audit -- second scheduled pass, scoped to the 2 files touched since 08-31.", scope: "site/functions/api/contact.ts, site/tests/contact.test.mjs.", result: "0C/0H/0M. 1 LOW (LOW-1, HYPOTHESIS): providerRejection may treat a malformed/truncated provider body as delivered -- documented tradeoff, dismissable if once-per-day scope is acceptable. 08-31 MEDIUM-1 fix reconfirmed holding. npm test 27/27.", report: "2026-09-07__slop-audit.md" },
          { date: "2026-08-31", type: "Weekly slop-audit -- first scheduled pass over site/.", scope: "site/ (Astro pages, functions/api/contact.ts, tests).", result: "1 MEDIUM (MEDIUM-1 provider 200 with failure body reported as delivered) -> fixed same day, 1dbbd72, +7 tests. 0 open.", report: "2026-08-31__slop-audit.md" },
          { date: "2026-07-10", type: "Full code audit -- top-to-bottom re-read of site/ + live Lighthouse across all 6 pages.", scope: "site/ + Lighthouse.", result: "All 13 findings from 2026-06-13 verified closed; a11y regression from 709f352 caught and fixed same day. 0 open.", report: "2026-07-10__audit-report-full.md" }
        ]
      }
    },
    /* PROJECT:site:END */
    /* PROJECT:pickem:START */
    {
      id: "pickem",
      personal: true,
      name: "Preseason Pick'em",
      icon: "trophy",
      oneLiner: "Next.js pick'em app (PreseasonPickem-app) at www.preseason-pickem.com. Auth (magic-link + passkeys), scoring, leaderboard, draft-kit and perf/audit2 hardening all shipped on main 2026-06-01; one scoring-reconciliation fix waits in open PR #1 (08-06). Dormant.",
      status: "dormant",
      phase: "Shipped Next.js pick'em app (preseason-pickem.com; 26thLetter/preseason-pickem). All feature/perf/audit2 work landed on main in one 2026-06-01 batch (passkeys, perf phases 1-4, audit2 phases 1-4, draft-kit stats); main has not moved since. One post-launch fix (self-healing scoring, 8a5fcdc, 2026-08-04) sits on branch fix/scoring-reconciliation as PR #1, OPEN since 2026-08-06 - never merged. 2026 NFL preseason cycle is over.",
      focus: "Off-season. Only open item: merge-or-close PR #1 (scoring reconciliation fix, open since 2026-08-06) so the self-healing scoring path is actually deployed before the 2027 cycle.",
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
      nextActions: [
        "Merge or close PR #1 (fix/scoring-reconciliation, 8a5fcdc) - the self-healing scoring fix is not on main/prod",
        "Decide whether to commit audits/2026-08-10__slop-audit.md (untracked in the app repo)",
        "Off-season otherwise; revisit before the 2027 preseason (season auto-year already handled)"
      ],
      pendingDecisions: ["PR #1 (scoring self-heal): merge to main or close - open 7 weeks with no review"],
      blockers: [],
      reminders: [
        "2026 preseason is over; confirm the app was used and whether prod still lacks the PR #1 scoring fix. Prior card dates (07/08 for perf/passkeys/audit2) were wrong - all landed 2026-06-01.",
        "Legacy / location-pending: PRD.md, WORKSPACE_INDEX.md and the PreseasonPickem-app previously lived under F:\\AI-Dev\\Preseason Pick'em (now a preserved rollback/archive root). No canonical relocation assigned yet - path links intentionally removed so nothing resolves into the retired AI-Dev root."
      ],
      links: [],
      recent: [
        "2026-08-10 - Slop audit of the app (audits/2026-08-10__slop-audit.md): clean, one LOW hypothesis (sync.ts upserted counter over-counts on onConflictDoNothing) - file untracked",
        "2026-08-06 - PR #1 opened: self-healing scoring (reconcile unscored picks) - still OPEN, not merged",
        "2026-08-04 - fix(scoring): reconcile unscored picks so a failed scoring pass self-heals (8a5fcdc, branch fix/scoring-reconciliation)",
        "2026-06-01 - audit2 hardening phases 1-4 + draft-kit last-season stats + passkeys/WebAuthn + perf phases 1-4 (da2d48b..705609b, 70ddeb1, a90af18..dd2b824) - all on main"
      ]
    },
    /* PROJECT:pickem:END */
    /* PROJECT:laundry:START */
    {
      id: "laundry",
      personal: true,
      name: "Laundry Gig",
      icon: "box",
      oneLiner: "Next.js demo app 'Lazy' (laundry-finder): Leaflet WasherMap (OSM pins + route), commute-corridor matching, one-click demo launcher.",
      status: "dormant",
      phase: "Lazy laundry-finder demo: WasherMap (Leaflet/OSM) + matchAlongRoute commute-corridor + map-aware /dashboard/washers + one-click launcher scripts. Name locked 'Lazy' (FreshSpin scrubbed) 06-03. Local git (master) in sync with origin YourBIMpossible/lazy-laundry-app, no PRs. No commits since 06-03; only node_modules/package-lock touched 06-30 (reinstall, tree clean). Idle 3 months.",
      focus: "Decide: resume the Lazy demo or park it explicitly. No state doc yet — git + folder only.",
      progress: null,
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-04", summary: "CLAUDE-CODE-PROMPT.md added (06-04); app scaffold (package/prisma/scripts) touched 06-01" },
      branch: null, git: null,
      nextActions: [ "Write a status note for Lazy (laundry-finder); decide resume vs explicit park" ],
      pendingDecisions: [
        "Resume vs explicit park - idle since 2026-06-03 with no status note"
      ],
      blockers: [],
      reminders: [
        "No state doc yet — tracked via git (master) + folder mtime. Real app exists (Lazy laundry-finder); write a status note to track it properly.",
        "Legacy / location-pending: README.md and docs/ previously lived under F:\\AI-Dev\\Laundry Gig (now a preserved rollback/archive root). No canonical relocation assigned yet - path links intentionally removed so nothing resolves into the retired AI-Dev root."
      ],
      links: [],
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
      phase: "Multi-repo AI-assisted Revit family workflow: Families-by-BIMpossible (Python 'brain' - planner/verifier/harness) + BIMpossible.RevitLink (C# 'hands'). Phase 1 (family-editing pipe ops) ~90%: the Family Fixer ribbon button shipped (AddIns #25, 2026-07-25, additive-only v1). Phases 2 (family-creation geometry, Option B) and 3 (wrap RevitLink as an MCP server, Option C) not started. ROADMAP.md (repo root) is the source of truth; last roadmap move 2026-09-10 (#15): Power-System deletion-list ruling closed, option 1 -- list stays hardcoded in prep_to_standard.py.",
      focus: "No active family-workflow dev front - commits since late July are cross-repo path modernization and Evidence Compiler hook hardening (#11 launcher migration, #12 degraded-hook stderr notice from slop-audit LOW-1), not phase-moving. The live frontier when work resumes is closing Phase 1: port wire_nested_params and live-rehearse go_single_panel (the one destructive op never run against a real .rfa).",
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
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-09-10",
        summary: "docs: close Power-System deletion-list ruling (option 1 — stays hardcoded) (#15) (97847ae)"
      },
      branch: "main",
      nextActions: ["Close Phase 1: port wire_nested_params; live-rehearse go_single_panel","Resolve the 5 ROADMAP open questions gating Phase 2/3 start","Reconcile the two overlapping MCP efforts (this roadmap's Phase 3 vs the AddIns Desktop Orchestration Hub proposal) before ratifying either"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["ROADMAP.md (repo root) is the single source of truth for this whole multi-repo effort — update its status lines whenever a phase moves, in whichever repo/session does the moving","Multiple sessions/worktrees can work this roadmap in parallel for source edits, but Deploy-Local.ps1 writes to a SHARED %APPDATA% Revit Addins folder, last-writer-wins — only one session may hold the deploy target (mid-rehearsal/mid-deploy) at a time",".claude/scripts/evidence_hook.py must stay byte-identical with F:\\BIMpossible-Workspace's copy (md5 af8996536aa8b442fa2093023a99567a as of #12) — fix one, fix both","The F:\\BIMpossible-Families main checkout is parked on already-merged branch claude/close-power-system-deletion-list-ruling (6f39c1c, behind origin/main 97847ae) with audits/2026-09-07__slop-audit.md untracked -- switch to main and commit the report before new work."],
      links: [
        { label: "Roadmap (single source of truth)", path: "F:\\BIMpossible-Families\\ROADMAP.md" },
        { label: "Tool README", path: "F:\\BIMpossible-Families\\README.md" }
      ],
      recent: ["2026-09-10 - docs: close Power-System deletion-list ruling -- option 1, stays hardcoded (#15, 97847ae)","2026-09-07 - Weekly slop-audit: 0C/0H/0M, 1 LOW hypothesis (once-per-day notice throttle); report untracked on disk","2026-09-06 - evidence-compiler: raise git/ripgrep timeouts to 600/1500 ms (#14, 57b63e6)","2026-08-31 - audit: publish 2026-08-31 weekly slop-audit report (#13): 1 LOW, fixed by #12","2026-08-31 - fix(evidence-hook): degraded hook now prints a once-per-day stderr notice, still fail-open (#12, slop-audit LOW-1; 10 tests)","2026-08-24 - Migrate Evidence Compiler hook to a Python-native hardened launcher (#11)","2026-08-24 - fix(tool): --promote exits non-zero when nothing was promoted (#10)","2026-08-22 - chore(paths): batch B5 + final-root cutover, anchor to F:\\BIMpossible* (#9)"],
      audit: {
        lastRun: "2026-09-07",
        runType: "Weekly slop-audit -- scoped to the one commit (9e0a23d, fix#12 evidence-hook visibility) touching audited files since 08-31. Zero Critical/High/Medium findings. One LOW (HYPOTHESIS): the stderr degraded-notice throttle is per-repo-per-UTC-day, so only the first session of a day sees it -- an intentional documented tradeoff (the docstring justifies once-per-day to avoid spam from a month-long outage), not a confirmed defect; the report says to dismiss it if once-per-day is acceptable. No REAL (swallows-a-real-failure) sites found; fail-open posture intact.",
        cadence: "weekly slop-audit (scheduled)",
        trend: "stable",
        reportPath: "F:\\BIMpossible-Families\\audits\\2026-09-07__slop-audit.md",
        reportFile: "families/2026-09-07__slop-audit.md",
        ledgerPath: "F:\\BIMpossible-Families\\audits",
        history: [
          {
            date: "2026-09-07",
            type: "Weekly slop-audit -- scoped to the single commit touching audited files since 08-31.",
            scope: ".claude/scripts/evidence_hook.py, tool/tests/test_evidence_hook.py (commit 9e0a23d only).",
            result: "0C/0H/0M. 1 LOW (LOW-1, HYPOTHESIS): degraded-notice throttle is per-repo-per-UTC-day, not per-session -- documented tradeoff, dismissable if once-per-day is acceptable. No REAL swallow sites found.",
            report: "2026-09-07__slop-audit.md"
          },
          {
            date: "2026-08-31",
            type: "Weekly slop-audit (published by PR #13).",
            scope: ".claude/settings.json, .claude/scripts/evidence_hook.py, tools/.",
            result: "1 LOW (LOW-1) -> fixed by PR #12 9e0a23d. 0 open.",
            report: "2026-08-31__slop-audit.md"
          },
          {
            date: "2026-08-24",
            type: "Weekly slop-audit (first pass).",
            scope: "Repo-wide.",
            result: "Report on disk (audits/2026-08-24__slop-audit.md); findings folded into the 08-31 pass.",
            report: "2026-08-24__slop-audit.md"
          }
        ],
        reportDate: "2026-09-07",
        reconciledAt: "2026-09-13 11:49:14",
        reconciliationHeads: [
          {
            repo: "BIMpossible-Families",
            head: "6f39c1cf03",
            inspected: true
          }
        ],
        rawCounts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 1,
          info: 0
        },
        openCounts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
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
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        publishedCounts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        ingestStatus: "success",
        ingestDetail: "reconciled against BIMpossible-Families; LOW-1 is a documented HYPOTHESIS-status tradeoff (not a confirmed defect, no fix required per the report's own dismissal criterion) -- not counted resolved or open. 0 open.",
        counts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
    },
    /* PROJECT:families:END */
    /* PROJECT:aiserver:START */
    {
      id: "aiserver",
      name: "AI-Server",
      icon: "cube",
      oneLiner: "Portable, headless, always-on OpenAI-compatible local inference endpoint (clients know only INFERENCE_BASE_URL/API_KEY/MODEL), now live on the dedicated RTX 3090 Ubuntu box -- Ollama + gemma4:26b chosen by bakeoff/eval evidence, fronted by three chat UIs under the MyBuddy personal plan.",
      status: "active",
      phase: "North star MET. NORTHSTAR (locked 2026-09-11: one measurable, headless, always-on OpenAI-compatible endpoint; clients know only INFERENCE_BASE_URL/API_KEY/MODEL) closed out 2026-09-13 with all 5 criteria met (PR #20): headless Ubuntu 3090 box up, survives reboot, served over Tailscale; Phase 0 re-measured on the box; WP-H bakeoff found Ollama and llama.cpp tied on speed and quality, so Ollama kept as the deployment runner (not a permanent verdict); model pick gemma4:26b-a4b-it-q4_K_M (27/27 WP-F) is a config line. WP-I repo scout + GPU interlock merged (#19). Since 09-16 the box runs the adopted MyBuddy personal plan (the 09-21 AI-server plan): steps 1-5 done (3 chat UIs pinned to gemma4, qwen3.5:9b scored and rejected, status script + Windows one-click launcher, LibreChat UFW rule, 'pilot' paths renamed, box WORKSPACE set). main at cc22569 (2026-09-22).",
      focus: "MyBuddy personal plan step 6: use the three chat UIs (Open WebUI, AnythingLLM, LibreChat) day-to-day on the pinned gemma4 model and choose a daily one; step 7 (CPU supporting role) after. The endpoint mission itself is met; WORKLOG has no open 'Needs your call' items.",
      progress: {
        label: "Work packages",
        phases: [
          {
            name: "Foundation",
            pct: 100,
            note: "Repo + CI (pytest 3.10-3.12 green) + branch protection (PR+CI gate) + portable scaffold + smoke + first automation."
          },
          {
            name: "WP-A Core library (aiserver)",
            pct: 100,
            note: "Merged PR #1 (06-17); hardened (CLIENT-2, CONFIG-1/2) in f37d165 (07-12); covered by the 131-pass suite."
          },
          {
            name: "WP-B RAG / knowledge",
            pct: 100,
            note: "Merged PR #2 (06-17); ingest/query/drift/store/chunk shipped; hardened (RAG-1,2,4,5,6) in f37d165."
          },
          {
            name: "WP-C Automation suite",
            pct: 100,
            note: "Merged PR #3 (06-17); framework + daily_digest + weekly_rollup + decision_drift + Windows task registration shipped; hardened (AUTO-2,6) in f37d165."
          },
          {
            name: "WP-D Dashboard + integration",
            pct: 90,
            note: "D1 live (this card, merged PR #5, 06-17). D2 built + enabled in PC-Monitor. D3 --engine flag built in AI-Brain-Data; only the owner's G:-hosted SKILL.md cutover remains."
          },
          {
            name: "WP-F Eval harness",
            pct: 100,
            note: "Merged PR #4 (06-16); cases/run/report/baseline/scoring shipped; hardened (EVAL-1..5) in f37d165. Feeds WP-H: Phase 0 re-runs on the box to score runners."
          },
          {
            name: "Client contract decoupled from runner",
            pct: 100,
            note: "156a0a7 (09-11): application code/config/automations know only INFERENCE_BASE_URL / INFERENCE_API_KEY / INFERENCE_MODEL -- no runner name anywhere. Locked by the north star."
          },
          {
            name: "Dictation-cleanup proxy",
            pct: 90,
            note: "OpenWhispr dictation-cleanup proxy shipped (3c4d4e6) and hardened (DP-1..7 in f37d165). No activity since 07-10."
          },
          {
            name: "PDF pickup checker (merged, ship-gate unmet)",
            pct: 60,
            note: "Automates \"did every redline get addressed\" QA on reissued drawing sets -- compares only markup-anchored regions (not full-sheet diffing), and only ever claims a region changed/unchanged, never that a redline was \"addressed\" (a human judgment) -- enforced structurally via a MaxClaim field. M1 detection core: 14/14 planned tasks built, 67/67 tests pass, CLI works end-to-end. MERGED to main via PR #13 (2026-09-07). BUT the spec's own ship gate (4/4 golden-set gates on real labeled data, Â§13) is still unmet -- golden_set/ holds only a README, 3/4 gates report \"no data.\""
          },
          {
            name: "3090 box relocation",
            pct: 35,
            note: "Box powered on for the first time (2026-09-10), OS install imminent; headless Ubuntu chosen. Ubuntu install-USB writer/verifier (scripts/make-install-usb.ps1) + a Tailscale box-setup step + a compose healthcheck fix all shipped 09-11/09-12 (PR #15). Runner not yet chosen (WP-H). Every 5080 failure -- 66% residency, 56-75s cold loads, missed latency gate -- is a shared-Windows-desktop failure a dedicated headless box fixes structurally."
          },
          {
            name: "WP-E/G Ops, advanced",
            pct: 20,
            note: "advanced/ still absent on main; no Caddy / Tailscale-as-service / docker healthcheck running as a service yet (compose healthcheck fixed, Tailscale install step added). The worktree-harness agent loop is now MERGED (PR #12, 2026-09-07). WP-G's local-coding-agent landed earlier (07-25): opencode wired to this box's Ollama endpoint, verified end-to-end on qwen3-coder:30b-a3b. Standalone tool (host/model hard-coded, not .env-driven); manual start/stop, no autostart -- owes a rework onto the INFERENCE_* contract."
          },
          {
            name: "AI-Server UI",
            pct: 0,
            note: "No dedicated status widget yet -- only this generic phase-progress row exists. Needs an aiserver.js panel + card in index.html, sourced via data.js per REFRESH-SPEC.md's pattern, backed by the already-merged F:\\AI-Server\\scripts\\aiserver_status.py (PR #5, a7c8724). Endpoint up/down, loaded models, last digest/rollup/drift summaries. Confirmed 2026-09-13: no work in flight."
          }
        ]
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-09-22",
        summary: "WORKLOG: box WORKSPACE set to a real path (#29) (cc22569)"
      },
      branch: "main at cc22569",
      nextActions: ["MyBuddy plan step 6: run the three UIs in real use and pick a daily one (the 09-21 AI-server plan)","Land or drop 16ad24f (RAG data-scope WORKLOG note, 2026-09-26): it was pushed to claude/box-workspace-path after that branch merged as #29, so it is on no open PR and not on main","Finish plan step 1 cleanup: a 2026-09-24 read-only disposition review (kept in AI-Brain-Data) recommends preserving the linux-installation-setup worktree's untracked 2026-09-13 box work order and its 5-commit branch as history, then removing the worktree; the wonderful-agnesi-d062de worktree and claude/box-state-2026-09-16 (closed-unmerged PR #21 history) are still pending","Decide the 5 local-only commits on claude/linux-installation-setup-017d5a (Lian Li LCD/fan notes, 2nd-GPU roadmap, box-handoff prompt, Needs-your-call parking) and 6 more unique ones on claude/wonderful-agnesi-d062de (2026 tooling research, Personal-OCR spinout note) -- push/PR or discard; loss risk","Close WP-I follow-ups F1 (scout process-group kill on timeout) and F5 (GPU-lock PID reuse)","Populate the pickup-checker golden set and run run_golden_eval.py against the spec gates (golden_set/ still holds only a README)","Write RAG source governance (approved roots, exclusions, citation rule, re-index/delete) before any first index run -- WORKLOG roadmap item, facts gathered 09-26","Optional: install a persistent timer for daily-digest (closeout criterion 3 caveat); put digest source roots on the box (jobs still report workspace-roots-not-found)"],
      pendingDecisions: ["Which chat UI becomes the daily MyBuddy front-end (plan step 6).","Second GPU + Lian Li fan/LCD control (GPU-temp-on-LCD) -- notes sit only on local-only branches, not decided."],
      blockers: [],
      reminders: [
        "Runner = Ollama is a deployment choice (WP-H tie), not a permanent verdict; reversal triggers are in decisions/2026-09-13__runner-and-model-pick.md. A client-side guard covers Ollama's silent >32k prompt truncation.",
        "Raw :11434 answers without a key on LAN/tailnet by accepted decision (--enforce off for the private setup); revisit on the plan's listed triggers.",
        "LibreChat->Ollama UFW rule is bound to the Docker bridge name -- if Docker recreates app_default, re-add the rule.",
        "Rig .env INFERENCE_BASE_URL still uses the LAN address (home-only); switch to the tailnet address for away-from-home use.",
        "11 unique local-only commits across 2 branches, plus 8 intentionally-unmerged PR #21 commits -- loss risk until pushed or discarded.",
        "Open WebUI on the box now carries an admin-only project-truth Pipe (BDC-001, owned by AI-Brain-Data, live 2026-09-26), and that deployment requires the admin account's Memory setting to stay off -- so memory is also off in that account's gemma4 chats. Factor this into the step-6 daily-UI choice.",
        "The linux-installation-setup worktree is reused across sessions by switching branches (now on the merged claude/box-workspace-path) and holds one untracked file found in no commit (a 2026-09-13 box work order)."
      ],
      links: [
        { label: "Program plan", path: "F:\\AI-Server\\PROGRAM_PLAN.md" },
        { label: "Handoffs (WP-A..G)", path: "F:\\AI-Server\\handoffs" },
        { label: "Build/hardware plan", path: "F:\\AI-Brain-Data\\_status\\AI-Server_Build_and_Integration_Plan.md" },
        { label: "GitHub repo", path: "https://github.com/YourBIMpossible/AI-Server" }
      ],
      recent: [
        "Endpoint up · models: gemma4:26b-a4b-it-q4_K_M (snapshot 06:00)",
        "2026-09-26 - WORKLOG: RAG data-scope facts recorded, no decision (rag/ ingests .md only, so roughly 800 of ~1,150 non-md AI-Brain-Data files are skipped; two unused ~954GB drives on the box). Pushed on the already-merged #29 branch, not on main (16ad24f)",
        "2026-09-22 - Box WORKSPACE set to a real path (#29); Open WebUI 0.11.4 + 'pilot' naming removed from box paths (#27); OpenCode-setup, MyBuddy strategy and reconciliation-plan reviews merged (#25/#26/#28)",
        "2026-09-21 - MyBuddy personal plan adopted; steps 2-5 done: 3 UIs pinned to gemma4, status script + Windows launcher, qwen3.5:9b scored 26/27 and rejected (#22/#23); LibreChat UFW rule (#24)",
        "2026-09-16 - Box state check + owner MyBuddy handoff validated against the box",
        "2026-09-13 - NORTHSTAR closeout: all 5 criteria met (#20); WP-H bakeoff tie -> keep Ollama; model pick gemma4:26b 27/27; box Phase 0 re-measured (#16-#18)",
        "2026-09-13 - WP-I repo scout + GPU interlock merged (#19) after /review-all: 3 blockers fixed pre-merge (a2b9c4d), 288 tests passed",
        "2026-09-12 - Box powered on; Tailscale install step (9cd0c7a) + Ubuntu install-USB writer/verifier make-install-usb.ps1 (1ceddf0) shipped; PR #15 (Linux install setup) merged (d7e5140). Lian Li LCD/fan + 2nd-GPU roadmap notes local-only (4 commits, unpushed)",
        "2026-09-11 - North star LOCKED: mission reframed to one measurable OpenAI-compatible endpoint; client contract decoupled from Ollama (INFERENCE_BASE_URL/API_KEY/MODEL, 156a0a7); compose healthcheck fixed (f6b01ab)",
        "2026-09-10 - Box-build reassessed against 3 months of evidence (decisions/2026-09-10__box-build-reassessment.md); headless Linux box chosen to fix the 5080's residency/cold-load failures structurally; box powered on for the first time",
        "2026-09-07 - worktree-pickup-checker (PR #13) and worktree-harness (PR #12) both MERGED to main; .claude/worktrees/ gitignored (PR #14)"
      ],
      audit: {
        lastRun: "2026-09-13",
        runType: "/review-all (4 blind lenses: code-review, security-diff, concurrency/robustness, test-coverage) over WP-I repo scout + GPU interlock (30 files, +2751) before merge. 3 BLOCKERs (command execution from an inspected repo's own config, non-atomic GPU lock, denied-file content leaking through diffs) fixed pre-merge in a2b9c4d with proving regression tests, plus follow-ups F3/F6; 288 passed / 1 skipped. F1/F2/F4/F5 carried open as tracked follow-ups.",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 2, low: 2, info: 0 },
        closedLastRun: 5,
        trend: "stable",
        reportPath: "F:\\AI-Server\\reviews\\2026-09-13__review-all_WP-I_repo-scout.md",
        reportFile: "aiserver/2026-09-13__review-all_WP-I_repo-scout.md",
        ledgerPath: "F:\\AI-Server\\reviews",
        open: [
          { id: "F1", severity: "medium", title: "repo-scout check/git timeouts kill only the direct child -- a grandchild can keep the pipe open, hang the scout past its timeout and leave a stray process", source: "2026-09-13__review-all_WP-I_repo-scout.md" },
          { id: "F5", severity: "medium", title: "GPU-lock stale detection misses same-host PID reuse -- a crashed exclusive job can block GPU work until the 6h age cutoff or a forced clear", source: "2026-09-13__review-all_WP-I_repo-scout.md" },
          { id: "F2", severity: "low", title: "scout final-answer parser misreads a correct nested JSON report wrapped in brace-bearing prose -> empty report (fallback rescues the common case)", source: "2026-09-13__review-all_WP-I_repo-scout.md" },
          { id: "F4", severity: "low", title: "remaining test-coverage gaps on scout security-boundary and lock-recovery branches", source: "2026-09-13__review-all_WP-I_repo-scout.md" }
        ],
        history: [
          { date: "2026-09-13", type: "/review-all pre-merge review of WP-I (repo scout + GPU interlock), + blocker-fix pass", scope: "claude/repo-scout vs main (base 6f9bad0), 30 files; merged as PR #19 (c135da1)", result: "3 blockers + F3/F6 fixed in a2b9c4d (5 closed); 288 passed / 1 skipped. 4 follow-ups open (2 medium, 2 low). No scout/gpulock commits since.", report: "2026-09-13__review-all_WP-I_repo-scout.md" },
          { date: "2026-07-12", type: "Incremental (regression-check on the 4 claimed high fixes + fresh review of the new dictation-proxy subsystem) + same-day remediation", scope: "2 commits since the 2026-06-18 cutoff — c82c674 (high-fix) + 3c4d4e6 (new OpenWhispr dictation-cleanup proxy); the report was committed as 7c8a09c, then all 11 findings it raised were fixed in f37d165 the same session", result: "Raised 11 (0 crit / 0 high / 5 medium / 4 low / 2 nit), all remediated same-day in f37d165 — now HEAD, pushed, tree clean; suite green at 131 passed (up from 83). Regression check first confirmed CLIENT-1/RAG-1/XC-1 genuinely fixed (PCMON-1 fixed in the separate PC-Monitor repo). Then the fix pass closed everything this run raised: EVAL-3-REG (rubric term → the full 'ZeroDivisionError'), DP-1 (answer-detection now requires the text to have shed the input's own vocabulary, not a bare substring), DP-2 (except OSError → _fallback_response, + _forward_raw), DP-TESTS (proxy tests 17→33), CLIENT-2 (json.load wrapped ValueError→LLMError), plus the low/nit tail — EVAL-EMPTY empty-term guard, DP-3 port-bind probe, DP-4 Authorization forwarded, DP-6 DICTATION_PROXY_PORT in .env, DP-7 daemon_threads.", report: "2026-07-12__audit-report.md" },
          { date: "2026-06-18", type: "Full (11 reviewers + adversarial verification, 105 agents)", scope: "AI-Server full codebase + PC-Monitor/AI-Brain-Data WP-D touchpoints — ~45 source/test files + 8 strategy/handoff docs across 3 repos", result: "Silent-wrong-output on error/misconfig edges (0 critical / 5 high): PCMON-1 topproc() reports the wrong process and can suppress GPU-VRAM alerts; XC-1 README's primary onboarding step installs a scheduled task that produces no digest; CLIENT-1 HTTP client masks real server errors behind a misleading endpoint-unreachable message", report: "2026-06-18__audit-report-full.md" }
        ],
        reportDate: "2026-09-13",
        rawCounts: { critical: 0, high: 3, medium: 2, low: 4, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 2, low: 2, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 3, medium: 0, low: 2, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 2, low: 2, info: 0 },
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "AI-Server", head: "cc22569", inspected: true }
        ],
        ingestStatus: "success",
        ingestDetail: "reconciled against AI-Server main cc22569; B1-B3,F3,F6 fixed in a2b9c4d (pre-merge, PR #19); F1,F2,F4,F5 open per the blocker-fix companion's section 6; no later commits to scout/ or the gpulock module.",
        unknown: []
      }
    },
    /* PROJECT:aiserver:END */

    /* PROJECT:ai-brain-data:START */
    {
      id: "ai-brain-data",
      personal: true,
      name: "AI Brain Data",
      icon: "brain",
      oneLiner: "Personal knowledge base and context store for AI/BIM work -- Obsidian vault, Revit-AI journal pipeline, decision records, the library preservation program, and BDC-001: a citation-backed BIMpossible decisions corpus now served read-only into Open WebUI on the private MyBuddy box.",
      status: "active",
      phase: "Local-only git repo (no GitHub remote), branch master. HEAD 8c0ed9c (2026-09-26), 46 commits since b7744a1. 09-23: preservation batches B-8..B-12 and a long-run window (overnight reports committed, full-repo DR bundles with restore drills, last @d145d73; off-machine lift assembled but not executed) and Revit-AI telemetry automated as a scheduled task. 09-24: BDC-001 BIMpossible Decisions Corpus 001 built (92 records, Lab retrieval pilot, frozen release r1, gateway + connectors for Open WebUI/AnythingLLM/LibreChat); the first box sitting was rolled back after an egress failure. 09-25/26: owner-present sitting -- release mounted and adapter acceptance 22/22, the Tool+preset mode failed and was contained, then a Pipe connector was hardened through /review-all (9 follow-ups) and a security review (3) to 4.0.0-rc3 and cut over live, admin-only (8c0ed9c). Working tree: Revit-AI pipeline outputs for 09-24..26 uncommitted.",
      focus: "BDC-001 multi-UI rollout: Open WebUI is live (Pipe rc3, admin-only). Next is parity gate A, then the AnythingLLM and LibreChat sittings (owner-run). Personal track: Pilot Corpus 001 runs Lab-only in the separate non-git Brain Data Lab folder with 1 admitted personal record (eval 17/17 + 10/10 PASS, 09-24) and waits on the owner to name more records; offsite transfer and the B-7 private root also wait on owner decisions.",
      progress: {
        label: "Workstreams",
        phases: [
          { name: "Vault foundation", pct: 95, note: "Obsidian vault live; 12 MOCs + decision-log + standards-and-refs populated (post-graphify baseline, 8e8b564, 06-28). revit-snippets/ folder exists but is empty — 0 files, never populated despite earlier claims." },
          { name: "Revit-AI context pipeline", pct: 85, note: "Capture + parse + daily/weekly summaries now run as a scheduled local task (automated 8b201c5, 09-23; hardened 72b108e, 09-24, closing a /review-all of 8b201c5). Raw-logs/processed committed through 2026-09-23; the pipeline's 09-24..09-26 outputs are in the working tree, uncommitted. Ingestion into AI-Server still not built (the box now exists, so hardware no longer blocks it)." },
          { name: "BDC-001 project truth across 3 chat UIs", pct: 33, note: "BIMpossible Decisions Corpus 001 (92 records, citation-backed, read-only release r1) served through one gateway. 1 of 3 UIs live: Open WebUI Project Truth Pipe 4.0.0-rc3, admin-only, cut over 2026-09-26 (8c0ed9c). AnythingLLM and LibreChat connectors built offline, not deployed." }
        ]
      },
      activity: [18,13,11,7,0,0,0,0,0,0,0,0,9,0],
      lastActivity: {
        date: "2026-10-05",
        summary: "Review fixes: partial Revit runs, proof validator, filing conflicts (d88a267)"
      },
      branch: "master (local-only, no remote)",
      git: { warn: "No GitHub remote — local-only git. Confirm whether this should stay private or get a private remote for backup." },
      nextActions: ["BDC-001 multi-UI rollout: confirm parity gate A on Open WebUI, then run the AnythingLLM sitting, then LibreChat + parity gate B (NEXT-OWNER-PRESENT-SITTING.md phases 4-6; every box step owner-run)","Open WebUI cleanup R1: remove the inactive old preset and the still-installed old Tool (a user can still attach it by hand in a normal chat)","Commit (or decide to auto-commit) the Revit-AI pipeline outputs for 2026-09-24..26 now sitting uncommitted in the working tree","Refresh the full-repo DR bundle -- the last one (@d145d73, 2026-09-23) is 34 commits behind HEAD 8c0ed9c","Pilot Corpus 001 overlay v2: owner names up to 9 more approved-personal records (v1 admits 1, cap 10) using pilot-001/OVERLAY-V2-WORKSHEET.md; Claude then runs the mechanical admission checks and re-runs the Lab eval (last: 17/17 + 10/10 PASS, 2026-09-24)","Owner decisions queued by the 09-23/09-24 closeouts: off-machine transfer (destination, encryption, key custody), held-record treatment for r2, B-7 private-root permanence","Retire the frozen rollback copy at F:\\AI-Dev\\AI-Brain-Data once tooling burn-in is over (evidence dir: F:\\BIMpossible-Workspace\\01_BuildLog\\migration-2026-08\\_evidence-ai-dev-extract\\)"],
      pendingDecisions: ["Offsite backup: private GitHub remote, or run the assembled B-12 off-machine lift (destination, encryption method, key custody)? Nothing is offsite yet.","Pilot Corpus 001: which further approved-personal records to admit via overlay v2 (1 admitted 09-24, at most 10 total). Anything beyond Lab-only scope (MyBuddy access, promotion to the box) is a separate decision the overlay cannot grant.","B-7 private root on the box (OS volume, unencrypted): permanent, or move to the planned data drive? The B-6R ledger still names the other location.","Held-record treatment for BDC-001 r2 (9 held records; accept-all or per-record lines on the owner decision page)."],
      blockers: [],
      reminders: ["Revit-AI telemetry pipeline runs as a scheduled local task and writes outputs but does not commit them: 09-24..26 outputs (7 modified, 8 untracked files) are in the working tree.","Still local-only (no remote). Newest verified full-repo DR bundle is @d145d73 (2026-09-23) on a second local drive -- same site, not offsite, 34 commits behind.","The Open WebUI Pipe needs the admin account Memory setting off; turning it back on makes the Pipe refuse every question (and memory is off in that account's gemma4 chats too). Rollback source 3.0.0-rc1 is kept; after a rollback, plain preflight fails until expected_live_version is reset.","multi-ui-connectors/ROLLOUT.md still says 'plan only; nothing is deployed' -- stale since the 09-26 cut-over; HARDENING-2026-09-25.md and CLOSURE-F1-F9.md hold the live state.","Preservation/Brain Database batches are read-only by default; each migration step needs explicit owner approval (B-7 recorded it).","Two full copies on disk: live F:\\AI-Brain-Data and frozen F:\\AI-Dev\\AI-Brain-Data (same HEAD, read-only, rollback only). Do not edit the frozen one; AI-Server rag_sources / any tooling must point at F:\\AI-Brain-Data."],
      links: [
        { label: "Local vault", path: "F:\\AI-Brain-Data" },
        { label: "Revit-AI context", path: "F:\\AI-Brain-Data\\Revit-AI\\context" }
      ],
      recent: ["2026-09-26 - Open WebUI Project Truth Pipe 4.0.0-rc3 cut over live, admin-only (attempt 2, no rollback; attempt 1 stopped at C2 and was fully restored); F1-F9 all closed, preflight pinned to rc3 (ec5e7af, 7dbee10, 8c0ed9c)","2026-09-26 - Pipe rc2 -> rc3: security-engineer review found no blocker and 3 follow-ups, all fixed in rc3; F1-F9 closure table + cut-over plan (1733d63, 691510b)","2026-09-25 - /review-all of the Pipe + harness: 0 blockers, 9 follow-ups (4 MED / 5 LOW); fixes shipped as rc1/rc2 with pins + executable preflight (9433bc6, 0da5f96, 20ebe80, c0a2d4e)","2026-09-25 - Owner-present box sitting 1: offline remediation, release install, mount and 22/22 adapter acceptance PASS; Tool+preset mode FAILED (model rewrote tool output) and was contained; Pipe trial 1 failed (built-in tool injection), trial 2 PASSED admin-only (abe3c93, 8cc5847, cf5cc9b)","2026-09-24 - BDC-001 BIMpossible Decisions Corpus 001: Lab retrieval pilot (92 records), release package, deployment kit and multi-UI connectors built offline; first box sitting passed acceptance but failed the egress check and was rolled back (b95a466, 773d222, 036aba0, 21c29c0)","2026-09-24 - Pilot Corpus 001 (Brain Data Lab): first owner-approved personal record admitted via versioned overlay v1; Lab eval 17/17 cases + 10/10 safety mechanics PASS (no leaks, no writes, delete/rebuild and withdrawal proven) (336b415, 0c581c8; Lab reports/pilot-001/eval-report.md)","2026-09-24 - fix(revit-ai): harden telemetry automation, closing a /review-all of 8b201c5 (72b108e); read-only AI-Server worktree disposition review (adfa7a2)","2026-09-23 - Preservation B-8..B-12 + long-run window: overnight reports committed (405bec1), full-repo DR bundles with restore drills (last @d145d73), off-machine lift assembled but not executed (fe928ae); Revit-AI telemetry pipeline automated (8b201c5)","2026-09-23 - fix(revit-ai): restore journal telemetry continuity -- raw-logs/processed through 2026-09-23 (b7744a1)","2026-09-23 - B-7 first private-library migration to the MyBuddy box: 15 files, hashes verified, stopped for owner review (117cca3); B-6S box storage audit (0edea1b)","2026-09-22 - Library Preservation & Reconciliation: Phase 1, 2A/2B/2C, consolidated plan, batches B-3 (verified git bundles) through B-6R -- read-only reports (b027e9f..c859327)","2026-09-22 - Brain Database: intake + OpenWhispr execution spec, governance manifests; single-record OpenWhispr intake pilot completed (14e85bf, ba1d95f, 29e594f)"]
    },
    /* PROJECT:ai-brain-data:END */

    /* PROJECT:bimpossible-workspace:START */
    {
      id: "bimpossible-workspace",
      name: "BIMpossible Workspace",
      icon: "folder",
      oneLiner: "Strategy docs, build logs, prompts, diagrams, and the cross-repo /next state store that drive and reconcile the BIMpossible platform build.",
      status: "active",
      phase: "origin/main at 859d363 (2026-09-25 18:56, Phase 13 re-score); local main in sync, clean; 1 worktree (.claude/worktrees/ctl-p1-receipt on ctl/p1-receipt-v3, pushed, draft PR #162). 09-23..09-25 was ledger-heavy: Phase 13 re-scored 32% -> 40% -> 48% (dc40087, 859d363), Phase 9 link-target ruling recorded (#160: cutsheet binds to the individual element) with amendment #6 retiring product_type_bindings for element_product_bindings (#161), Phase 9 re-scored 10% -> 35% (09c101b), Phase 7 corrected to 'DA4R is not live' (328d770). 09-02..09-23: four weekly full-audit cycles filed and closed (WFA 09-21 COMPLETE CLOSURE, 0 unresolved in-scope findings), remediation ledger + strict-YAML ledger validation (#145, #148), SEC-3C triage drained (#149), CI cut to one lean secret-scan (#147), North Star + Gate A memo canonicalized (#154; Gate A approved 09-12, not started), AI-Dev migration register (#151, #153), state mirror through #159. Solo-owner posture since 09-10 (direct owner commits to main, warn-only gates). Sources of truth: 00_Strategy/BIMpossible_PHASE-STATUS.md (updated 2026-09-25), WAVE-STATUS.md, STATE-LIVE.md, .tools/state/QUEUE.md (generated 2026-09-24).",
      focus: "Keeping PHASE-STATUS in step with BIMpossible shipping (Phase 9 backend #713 + review UI #745; Phase 13 Push Center train at 52a4a907) and the 2026-09-25 engineering-control-gaps plan: receipt schema 3 + Merge Evidence block in draft PR #162, paired with BIMpossible #755. Gate A approved, not started. PR #111 (scope-control remediation) still open.",
      progress: {
        label: "Content areas",
        phases: [
          { name: "Strategy + ledgers", pct: 90, note: "Ecosystem research harvested into decision ledgers: eco-3 (generic-PM exclusion) ratified; eco-4 (annotation automation) denied, moved to reopenable Watchlist FG-R3; eco-5 (Phase 10 portfolio guardrail) extended w/ a Speckle competitive comparison, still \"researching\"; eco-7 (MCP scope) corrected researching→approved (f5c7a5a, 1cd954a — latter unpushed, active session). PHASE-STATUS/STATE-LIVE hand-updated same day for Phase 13 T4 + Phase 15." },
          { name: "Repo hygiene + workflow guardrails", pct: 92, note: "Structure-sprawl audit closed \"sprawl reaches ZERO,\" independently re-verified in a second pass that also found+cleaned 6 stale remote refs (5f27190, 8061e1a, 7604960, 20d505d, cde8c5b, all 07-24). 2026-07-25 session forensic audit filed after a runtime clobber during Add-Ins/Families cleanup — glass build briefly overwritten by main, hash-verified restore, since fully reconciled (see the addins card). Prod auth verified working 07-25 + a 3-minute regression recipe written (5c63239)." },
          { name: "Design proposals + architecture", pct: 88, note: "design-docs/ grew 13→16 files: Phase 13 T4 \"Apply BIMpossible Changes\" plan + reality-check + self-contained handoff doc (2bea7ec, cd19fc5, b835120); a new Task 6 edit-log-contract plan (untracked, active session). Write-engine type-param design brief added (1cd954a). Open-in-Revit cross-browser UX plan explicitly PARKED, not to be implemented (f3d6fd4)." },
          { name: "Prompts + skills", pct: 85, note: "Unchanged this window — zero .claude/ commits since 07-22. Flagging rather than silently correcting: on-disk today shows 3 skills / 5 agents / 7 commands, not the 6 skills this note previously claimed — that discrepancy's origin is unverified." }
        ]
      },
      activity: [8,4,1,1,0,2,29,1,1,0,0,0,31,1],
      lastActivity: {
        date: "2026-10-06",
        summary: "docs-hygiene(G4): sync scope-guard hardening from BIMpossible 4cd76111 (#807) (#192) (76e1009)"
      },
      branch: "main at 859d363 on origin; local main in sync, clean; worktree ctl-p1-receipt (ctl/p1-receipt-v3, pushed, draft PR #162); local-only commit 5312cfd on docs/review-all-gatea-canonical-filing",
      git: null,
      nextActions: ["Land the receipt-schema-3 pair back to back: Workspace draft PR #162 (ctl/p1-receipt-v3, Merge Evidence block) and BIMpossible draft PR #755 -- per decisions/2026-09-25__engineering-control-gaps-plan.md","Merge or close PR #111 (scope-control remediation: dormancy enforcement + commit-index fix + record integrity); still OPEN","Owner rotation review of the live temp_clone_token redacted from breach-chain evidence JSON (ecd6072; 658018d records it as contained) -- no later closure found","Decide the review-artifact-gatea lane: unpushed commit 5312cfd (review report for merged #154) now sits only on local branch docs/review-all-gatea-canonical-filing (its worktree is gone) -- push + PR, or drop","Resolve OPS-1-ADDINS-AUDIT-GAP (Add-Ins audit card stuck stale: newer report lacks a severity/ID scheme) -- still in Blocked-on-you","ADDINS-KEYPLAN-LIVE-WRITE: owner flags A-C then first supervised Key Plan write (still owner-gated)","Run /next workspace sync: QUEUE.md (generated 09-24) still carries DECIDE-WS-STALE-MIRROR-PUBLISH-PR146 and DECIDE-WS-MIRROR-PR-146-STALE although PR #146 closed 2026-09-11"],
      pendingDecisions: ["Ratify eco-5 (Phase 10 portfolio guardrail) -- Speckle comparison done 2026-07-25, the ledger still marks it \"researching\"; awaiting owner ratification.","FAMILIES-DORMANT-REASSESS: Families project still dormant (probes SUSPENDED in QUEUE.md); owner to decide when/whether to reassess.","Gate A: approved 2026-09-12 but NOT STARTED -- owner to call the start (00_Strategy/2026-09-12__GateA_ApprovalMemo_and_BindingAddendum_TargetReidentified.md).","CHAT-GATEWAY-291-OWNER-DECISIONS: three sign-offs pending on issue #291 (binding lifecycle after denial, persisted identity bridge, cross-firm alerting threshold)."],
      blockers: [],
      reminders: [
        "2026-07-25 session forensic audit (`02_Reference/Audit Reports/2026-07-25__session-audit-addins-cleanup-runtime-clobber.md`) is a process/custody postmortem, not a code-quality `/audit` report — it won't appear in `_audit-runs.md` and its findings live in narrative fields on the addins/families cards, not in any audit finding-count",
        "Decision ledger for ecosystem research: 00_Strategy/Dashboard/strategy_decisions_ledger.md (eco-N items)",
        ".tools/state/QUEUE.md is GENERATED (canonical producer F:\\Claude-Profile\\skills\\next; regenerate via render_queue.py from queue.yaml) -- never hand-edit; a stale-base clobber already dropped 5 items once (c1bdc55, restored in 4734bd4)"
      ],
      links: [
        { label: "Local workspace", path: "F:\\BIMpossible-Workspace" },
        { label: "Phase status", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_PHASE-STATUS.md" },
        { label: "Wave status", path: "F:\\BIMpossible-Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md" },
        { label: "GitHub", path: "https://github.com/YourBIMpossible/BIMpossible_Workspace" }
      ],
      recent: ["2026-09-25 - Phase 13 re-scored 40% -> 48%: Push Center train rolled out at 52a4a907 and live browser-smoked (859d363); receipt schema 3 + Merge Evidence block opened as draft PR #162 (Workspace half, paired with BIMpossible #755) under the 09-25 engineering-control-gaps plan","2026-09-24 - Phase 9 link-target ruling: a cutsheet binds to the individual element, family type is grouping context (#160); product_type_bindings retired for element_product_bindings, amendment #6 (#161); Phase 9 re-scored 10% -> 35% for backend #713 + review UI #745 on local dev, flag off (09c101b); Phase 13 local rebuild + browser smoke recorded (b7e3773, f464513)","2026-09-23 - Option C doc reconciled to #706 admin-host 307 redirect (#158); G3 cross-repo path fixes (#157); state mirror catch-up (#159); Phase 13 re-scored 32% -> 40% for review controls, Push Center and hardening (dc40087); Phase 7 status corrected to 'DA4R is not live' (328d770)","2026-09-22 - WFA 2026-09-21 COMPLETE CLOSURE: preflight (#155), all 7 conditions MET, /review-all verdict on the cert, 0 unresolved findings (c31de98, 21e1722); Phase 19 Workbench discussion preserved (7e201c0)","2026-09-21 - Weekly full audit 2026-09-21 + breach chains + remediation ledger (60b1de1); queue and canonical ledgers reconciled; PHASE-STATUS reconciled for #618-#678 with no pct changes","2026-09-14 - Weekly full audit 2026-09-14 filed (report, breach chains, ledger, Checklist WSR64/65) (735c779)","2026-09-13 - Queue burst for BIMpossible #661 (NL-filter fail-closed policy, live-validated) and #663 shared-model hub_id fix live; AUTHZ-SHADOW-ACTIVATE contradiction resolved","2026-09-12 - North Star + Gate A memo canonicalized (#154), Gate A owner-approved/not started; WFA 09-12 confirmatory run 0 open; SEC-3C triage queue drained (#149); AI-Dev migration register (#151, #153)","2026-09-11 - Remediation ledger + HYG-1/7/8/9/12/16 landed (#148); strict-YAML ledger validation (#145); CI reduced to one secret-scan (#147); WFA 2026-09-11 filed","2026-09-10 - Solo-owner posture: main accepts direct owner integration; pre-push and delivery gates warn-only; wiki skill moved into repo","2026-09-07 - WFA 2026-09-07 filed + post-migration hygiene closeout handoff; R12 harness review fixes (#142); 2026-05..07 checklist rows archived","2026-09-02 - PHASE-STATUS: Phase 4 re-scored for model routing 1A/#542 (live) + 1B #548 (merged, deploy pending); queue watermark bimpossible 2cc7bdf8/PR#548 (c433b87, 8359606)"]
    },
    /* PROJECT:bimpossible-workspace:END */

    /* PROJECT:dashboard-auto:START */
    {
      id: "dashboard-auto",
      name: "Dashboard (Auto Clone)",
      icon: "refresh",
      oneLiner: "Automation-dedicated clone of the ai-dev-dashboard repo. The scheduled refresh pipeline (sync_*.py scripts, GitHub Actions sync) commits directly here; F:\\AI-Dashboard\\Dashboard is the human-edit copy.",
      status: "active",
      phase: "main branch, same remote as Dashboard (YourBIMpossible/ai-dev-dashboard). Automation clone at 8557e4c (2026-09-26 13:31 refresh), in sync with origin, clean. Since 09-23 only routine commits (06:00 refresh 09-24/25/26 plus an extra 09-26 13:29 run, bimwatch, billing sync) and the 09-23 full sweep (4add351: all 12 cards refreshed, 7 live repos added). The Codebase-tab gap is closed: Claude-Tools 5fb8141 (09-24) moved the real graphify refresh targets into a gitignored local config, the weekly refresh succeeded 09-24 and 09-25, and the 09-25/09-26 refreshes rebuilt codebase-meta.js. Open data gap: curated phase pct in data.js lags the BIMpossible ledger (P9 10 vs 35, P13 32 vs 48) because pct is set only in data.js and re-scores were left uncommitted in the human clone (see stray_writer_diagnosis).",
      focus: "Daily 06:00 refresh + billing/bimwatch syncs on cadence. Open item is phase-pct ownership: BIMpossible shipping sessions re-score pct in the human clone's data.js and never commit it, so the live board under-reports P9 and P13.",
      progress: {
        label: "Automation pipeline",
        phases: [
          { name: "Sync scripts", pct: 90, note: "sync_activity.py, sync_ledgers.py, sync_dashboard.py, usage_sync.mjs, codebase_sync.mjs, agents_sync.mjs, github_actions_sync.mjs, graph-metrics.js all present and running daily. codebase_sync.mjs joined the scheduled run 2026-07-21 (c9ffc30), ending a 6-week-frozen Codebase tab; graph-metrics.js became ledger-self-owned the same day (9e6f7e6)." },
          { name: "GitHub Actions deploy", pct: 90, note: "deploy.yml → Cloudflare Pages confirmed live (ai-dev-dashboard.pages.dev, HTTP 200, run logs green 2026-07-23) + github-actions-live.yml billing sync. A second, unconfigured GitHub Pages auto-build also serves the same content in parallel (yourbimpossible.github.io/ai-dev-dashboard) — nobody deliberately set this up." },
          { name: "Refresh model", pct: 100, note: "Local :8081 monitor (120s loop, live-server) REMOVED 2026-07-21 (e1aae72) after repeatedly dying into a silently-stale orphan. Now scheduled-only (Task Scheduler daily 06:00 → Dashboard-auto) + on-demand (Refresh-Now.cmd); 5/5 daily pushes confirmed landing 07-19..07-23." }
        ]
      },
      activity: [5,3,3,6,3,4,3,3,3,3,2,4,4,1],
      lastActivity: {
        date: "2026-10-06",
        summary: "chore: live billing sync 2026-10-06 (58b057f)"
      },
      branch: "main at 8557e4c; Dashboard-auto in sync with origin, clean; human clone Dashboard in sync and clean, with one stash (stash@{0}: superseded P13 pct 32->40 + audit-freshness.js, 09-24)",
      git: null,
      nextActions: ["Commit P9 pct 35 and P13 pct 48 to origin data.js (BIMpossible ledger re-scored them in Workspace 09c101b and 859d363; live board still shows 10 and 32), then review and drop stash@{0} in F:\\AI-Dashboard\\Dashboard","Fix pct ownership so ledger re-scores reach the board: give PHASE-STATUS.md a machine-readable pct that sync_ledgers.py renders (preferred), or change BIMpossible DELIVERY.md's re-score step to commit and push the dashboard repo instead of editing the human clone"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["Two live copies: Cloudflare Pages (canonical, deploy.yml) and GitHub Pages (incidental) - recorded in docs by PR #6 (d656a44, 08-31)","Curated phase pct lives only in data.js: sync_ledgers.py renders phase name and note from PHASE-STATUS.md but preserves pct, tasks and bucket/weight, so a ledger re-score reaches the board only when someone commits data.js","The refresh runs only from Dashboard-auto; edits left uncommitted in the human clone F:\\AI-Dashboard\\Dashboard never reach the live site","Graphify: the Mon 05:15 'Graphify Weekly Graph Refresh' task rebuilds graphs from the gitignored graphify.local.json (Claude-Tools); the daily 05:45 'Graphify Health Check' only checks, status=ok since 2026-09-24"],
      links: [
        { label: "Auto clone folder", path: "F:\\AI-Dashboard\\Dashboard-auto" },
        { label: "GitHub repo", path: "https://github.com/YourBIMpossible/ai-dev-dashboard" }
      ],
      recent: ["2026-09-26 - Daily 06:00 refresh plus an extra 13:29 run (8557e4c); human clone fast-forwarded to origin and clean","2026-09-25 - Codebase tab rebuilt from a fresh graphify snapshot after the weekly refresh succeeded 09-24 and 09-25 (0 failed); daily refresh on cadence","2026-09-24 - Graphify refresh restored upstream: Claude-Tools 5fb8141 loads the real targets from a gitignored local config (fail-closed f916c23, tests d0d9c23); health check back to status=ok","2026-09-23 - Full sweep (4add351): all 12 cards refreshed and 7 live repos added; daily 06:00 refresh plus an extra 20:12 run","2026-09-14 - Last Codebase tab graph update (from the 09-13 graphify snapshot); weekly graphify refresh fails from here (placeholder targets)","2026-09-13 - AI-Server card live snapshot wired into the refresh (#24); 09-07/09-11/09-12 audit reports ingested; stale POWER_SYSTEM blocker cleared on addins card","2026-09-10 - Personal-project flag protected across refreshes; personal projects excluded from the Today desk feed","2026-09-07 - usage/agents/github_actions syncs wired into the daily refresh, ccusage pinned, graph-staleness reminder auto-synced; anti-slop audit LOW-1..3 fixed (#23)","2026-09-07 - Daily check-in consolidated into one home: reliable landing, delta triage, pulse, data-health (#22)","2026-09-06 - AI-Server paths repointed to F:\\AI-Server; retired AI-Dev links dropped from project data","2026-09-02 - Check-in/Today rework (#16-#19), fail-closed staging/freshness/audit-export inputs (#20); PR #12 restored curated completion-model fields; PR #13 ingested the 08-31 weekly audit","2026-08-31 - PRs #8/#9/#10/#11: automation clone now runs origin's code, commits PHASE_DAG.md, refuses to default away curated fields or render over untracked shadow files"]
    },
    /* PROJECT:dashboard-auto:END */

    /* PROJECT:pc-monitor:START */
    {
      id: "pc-monitor",
      personal: true,
      name: "PC Monitor",
      icon: "monitor",
      oneLiner: "Fully-local workstation monitoring stack for the Ryzen 9 9950X3D + RTX 5080 rig. Python collector → SQLite; zero-dependency web dashboard with live view + historical scrubbing. No cloud, no telemetry.",
      status: "dormant",
      phase: "Python collector + Flask dashboard + SQLite, packaged as a Windows-native build at F:\\PC-Monitor (PC-Monitor.exe, 2026-06-17 build; no git in that folder - source repo with 3 commits through bb97b0c lives only in the legacy archive). Collector resumed after the 08-19 gap and logged 2026-09-12..09-14 (metrics.db last write 09-14 08:28); both Task Scheduler tasks (Collector, Dashboard) are now DISABLED, so nothing is logging.",
      focus: "Idle. Logging stopped again 2026-09-14 and both scheduled tasks are disabled - decide whether to re-enable them or leave the monitor off.",
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
      nextActions: ["Re-enable the 'PC-Monitor Collector' / 'PC-Monitor Dashboard' scheduled tasks (both Disabled; last metrics write 2026-09-14) - or confirm they were turned off on purpose","Rebuild the packaged .exe from post-audit source - the running F:\\PC-Monitor build (2026-06-17) predates all 3 audit-fix commits","Give the source repo a canonical non-legacy home (F:\\PC-Monitor holds only the packaged build, no git)"],
      pendingDecisions: ["Keep PC-Monitor running (re-enable scheduled tasks) or retire it - tasks disabled, last data 2026-09-14","Source git (3 commits) has no remote and no canonical home outside the legacy archive"],
      blockers: [],
      reminders: ["F:\\PC-Monitor is the packaged 2026-06-17 build, NOT the source repo - it has no .git; audit fixes (d3938b9) are not in the running exe.","metrics.db (~116 MB) in F:\\PC-Monitor\\data; last write 2026-09-14.","Legacy / location-pending: the source README.md and the audit/ ledger + 2026-07-12 report exist only under the preserved F:\\AI-Dev\\PC-Monitor archive copy; there is no canonical home at the live F:\\PC-Monitor app root, so those path links were removed. The 'Local app' link now points at the live F:\\PC-Monitor build."],
      links: [
        { label: "Local app", path: "F:\\PC-Monitor" },
        { label: "Live dashboard", path: "http://127.0.0.1:8787" }
      ],
      recent: ["2026-09-14 - Collector stopped again (last metrics.db write 08:28); Collector + Dashboard scheduled tasks now Disabled","2026-09-12 - Collector resumed logging after the 2026-08-19 gap (logs 09-12..09-14; _internal refreshed 09-13)","2026-08-19 - Collector stopped writing metrics (gap until 09-12)","2026-07-12 - Git-initialized (3 commits): baseline + resolve all HIGH/MEDIUM/LOW findings from the 2026-07-12 audit + record resolution","2026-06-25 - Last pre-git local modification"],
      audit: {
        lastRun: "2026-07-12",
        runType: "Incremental (mtime-scoped since 2026-06-17; /audit skill, senior reviewer persona) + same-day remediation",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 6,
        trend: "improving",
        reportPath: "",
        reportFile: "pc-monitor/2026-07-12__audit-report.md",
        ledgerPath: "",
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
      personal: true,
      name: "BIMpossible Tests",
      icon: "check",
      oneLiner: "Personal testing vault (Obsidian) for manually walking through BIMpossible phase/wave smoke tests. Human-executed verification checklist organized per project and phase.",
      status: "dormant",
      phase: "No git - local Obsidian vault (8 files: 3 project notes under Projects/, _Dashboard, _Start-Here, _Phase-Test-Template, Projects/_README, _scripts/refresh-tests.py). One note per project with ## Phase headings and checkbox steps; _Dashboard.md surfaces only unchecked next steps via the Tasks plugin. Notes last modified 2026-06-24; refresh-tests.py touched 2026-08-22.",
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
      nextActions: [
        "Refresh test notes against current shipped work: P8 Wizard, P11 QA, P11.1 Coordination Report, M-30 audit closeout - vault has zero coverage (grep P11|Wizard|Coordination Report finds nothing)",
        "Decide what refresh-tests.py (edited 2026-08-22) is now for - _Start-Here still calls it superseded"
      ],
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
      recent: ["2026-08-22 - _scripts/refresh-tests.py modified (docstring: generates the Web-App note from the Verification Checklist, preserves check marks by item ID)","2026-08-21 - Vault folders (.obsidian, Projects, _scripts) re-touched - likely a copy/move; note contents unchanged","2026-06-24 - Last modification of the vault notes (_Dashboard, _Start-Here, Projects/*)"]
    },
    /* PROJECT:bimpossible-tests:END */

    /* PROJECT:claude-next-state:START */
    {
      id: "claude-next-state",
      name: "/next State Store",
      icon: "check",
      oneLiner: "Backing store for the /next skill: project registry, two-tier work-item queue (active + immutable archive), deterministic QUEUE.md renderer and validator.",
      status: "active",
      phase: "Operational; updated near-daily by /next sync sweeps across the portfolio (198 commits).",
      focus: "Recording the BIMpossible Phase 9 reopened scope (#713, not merged/deployed) and the separate end-user Revit workflow verification gate; 09-25 reconcile registered Claude-Tools and Evidence Compiler items.",
      progress: {
        label: "Store",
        phases: [
          { name: "Two-tier queue (active/archive)", pct: 100, note: "Migrated 2026-08-17; archive is the dedup index." }
        ]
      },
      nextActions: ["Continue /next sync sweeps; keep queue_store.py validation green after hand edits"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["queue.yaml status must be a closed-vocabulary token or the renderer rejects the file","QUEUE.md is generated by render_queue.py - never hand-edit","Never delete archive records"],
      links: [
        { label: "README", path: "F:\\Claude-Tools\\state\\README.md" },
        { label: "Queue", path: "F:\\Claude-Tools\\state\\QUEUE.md" }
      ],
      recent: ["2026-09-25 - queue: #693 owner-path live-verified on all 5 download routes; #697 deployed flag-dark, unit-tested only","2026-09-25 - queue: fold distribution-verification retrospective into REVIT-END-USER-WORKFLOW-VERIFY","2026-09-25 - state: reconcile claude-tools project + CT/EC items; add BIMP-SESSIONS-MOUNTPOINT (parked setup maintenance)","2026-09-23 - state: PHASE9-REOPENED-SCOPE ruling, router slice and security-review fixes recorded (BIMpossible#713, not merged/deployed)","2026-09-23 - state: normalize 09-23 deploy records to deployed+infra-verified; end-user Revit verification pending","2026-09-23 - state: bimpossible sync through #710 - fold #698/#700/#705 into admin-focus verification","2026-09-23 - queue: adopt stale-path and lane-conflict records","2026-09-23 - state: closure sweep - parked future-verification records","2026-09-23 - state: download/sheet sweep - #693 4/5 routes live","2026-09-23 - state: verification inventory - correct #694/#693/#697 deploy+verify records","2026-09-23 - queue: #706 review follow-up live (#709, ws#158)","2026-09-23 - queue: review-remediation lane cleanup done"],
      audit: {
        lastRun: null,
        runType: "none on record",
        cadence: "none",
        trend: "unknown",
        reportPath: null,
        reportFile: null,
        ledgerPath: "F:\\Claude-Tools\\state",
        history: [],
        reportDate: null,
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "none",
        ingestDetail: "No audit on record; validated by queue_store.py and render_queue.py --check.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {
        date: "2026-09-25",
        summary: "queue: #693 owner-path live-verified on all 5 download routes; #697 deployed flag-dark, unit-tested only (03e32bd)"
      },
      activity: [18,0,4,0,0,0,0,0,0,0,0,0,0,0]
    },
    /* PROJECT:claude-next-state:END */

    /* PROJECT:claude-profile:START */
    {
      id: "claude-profile",
      name: "Claude Profile",
      icon: "folder",
      oneLiner: "Canonical multi-machine Claude Code configuration: global CLAUDE.md, skills, hooks, settings template, and a bootstrap that installs it on any machine. GitHub is authoritative.",
      status: "active",
      phase: "Operational. Bootstrap + skills junction in daily use; latest work is solo-owner workflow rules (2026-09-26: specificity precedence, transient reports outside governed repos, 2-3 build lanes) and the evidence_evacuate Stop/SessionEnd hook for Evidence Compiler measurement (2026-09-25).",
      focus: "Workflow-rule precedence (more specific repo/task instruction wins; no ask-first on conflicts) and the EC packet-evacuation hook; settings.template.json has drifted behind the live hooks.",
      progress: {
        label: "Profile",
        phases: [
          { name: "Multi-machine bootstrap", pct: 100, note: "bootstrap.ps1 + settings template live." },
          { name: "Context audit (Phase 2B)", pct: 100, note: "Application pass closed 2026-09-21." }
        ]
      },
      nextActions: ["Reconcile settings.template.json with the live settings in one change - template carries only the SessionStart hook while live settings carry 7 hook entries incl. evidence_evacuate","Remove the merged ec-live-evacuate worktree (662cde2 is on master)","Work the needs_owner_decision resolution ledger","Keep weekly slop-audit green"],
      pendingDecisions: ["Consolidate Revit skill homes (AddIns project skills vs Revit-Ops plugin) - open call"],
      blockers: [],
      reminders: ["Global CLAUDE.md stop-list is canonical here; repo copies that narrow it are stale","Transient deliverables (reviews, analyses, audit output) now go to the Claude-Tools reports folder; only governing records are committed into repos (2026-09-26)","Do not run bootstrap.ps1 until the settings template is reconciled - it would silently drop the live hooks, including evidence_evacuate","Bootstrap replaces live config files (backs each up first)"],
      links: [
        { label: "README", path: "F:\\Claude-Profile\\README.md" },
        { label: "Audits", path: "F:\\Claude-Profile\\audits" }
      ],
      recent: ["2026-09-26 - SYSTEM-RULES: subfolder-rule conflicts follow the specificity precedence rule","2026-09-26 - docs(profile): WORKING-STYLE precedence - specific instruction wins, no ask-first","2026-09-26 - docs(profile): solo-owner workflow recovery - precedence line, transient reports out of governed repos, 2-3 build lanes","2026-09-25 - feat(hooks): evidence_evacuate Stop/SessionEnd hook archives EC packets to EC-LIVE","2026-09-25 - docs(graphify): 0.9.67 skill version + lane closeout notes","2026-09-22 - docs: Revit-Assistant renamed to Revit-Ops","2026-09-21 - docs(audits): add pending 2026-09-13 and 2026-09-21 slop-audit reports","2026-09-21 - docs(context): close context-audit Phase 2B application pass","2026-09-21 - feat(graphify): selective automatic eligibility, drop explicit-only rule","2026-09-21 - docs(context): add read-only needs_owner_decision resolution ledger","2026-09-21 - docs(context): close BIMpossible memory consolidation pass","2026-09-21 - fix(context): correct profile memory scenario membership"],
      audit: {
        lastRun: "2026-09-21",
        runType: "Weekly slop-audit. Verdict CLEAN - 0 findings; counter-integrity correct (incomplete measurements report INCOMPLETE, never CLEAN); two benign broad catches on optional paths.",
        cadence: "weekly slop-audit (scheduled)",
        trend: "stable",
        reportPath: "F:\\Claude-Profile\\audits\\2026-09-21__slop-audit.md",
        reportFile: "claude-profile/2026-09-21__slop-audit.md",
        ledgerPath: "F:\\Claude-Profile\\audits",
        history: [
          { date: "2026-09-21", type: "Weekly slop-audit", scope: "Repo-wide", result: "CLEAN - 0 findings.", report: "2026-09-21__slop-audit.md" },
          { date: "2026-09-13", type: "Weekly slop-audit", scope: "Repo-wide", result: "Report on disk.", report: "2026-09-13__slop-audit.md" },
          { date: "2026-09-07", type: "Weekly slop-audit", scope: "Repo-wide", result: "Report on disk.", report: "2026-09-07__slop-audit.md" }
        ],
        reportDate: "2026-09-21",
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "claude-profile", head: "ab30c51", inspected: true }
        ],
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "success",
        ingestDetail: "0 findings. 0 open.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {
        date: "2026-10-05",
        summary: "docs(guidance): align durable-handoff rule across harness, closure audit, slop-audit (#28) (84b701c)"
      },
      activity: [0,0,2,3,0,0,11,4,0,0,0,0,6,0]
    },
    /* PROJECT:claude-profile:END */

    /* PROJECT:claude-tools:START */
    {
      id: "claude-tools",
      name: "Claude-Tools",
      icon: "wrench",
      oneLiner: "Local-first toolbelt for Claude Code on large repos: ctxcheck (doc reality-check), ctxdex (FTS recall), graphify (code graphs), skillspector (skill drift), local-audit, and Evidence Compiler measurement tooling (relevance replay, packet evacuation, episode/footprint/twin/capture harnesses). Public repo.",
      status: "active",
      phase: "Maintenance on main (graphify local-config fail-closed #9, dry-run packet evacuation #10, Dependabot action bumps #2/#3). Evidence Compiler measurement tooling built on local-only branches: claude/evidence-episodes (episode builder, Footprints v1, blind sheets, Twin A/B harness; 11 commits) and claude/evidence-capture (prospective capture steps 1-4 + boundary pinning; 6 commits). Nothing pushed - the EC measurement anchor holds pushes until the owner asks.",
      focus: "Evidence Compiler measurement harnesses (2026-09-25/26): deterministic episode builder, Footprints v1, Twin A/B replay with Lab controls, prospective capture start/end hooks built and dry-run measured but not registered (C5 held for owner).",
      progress: {
        label: "Toolbelt",
        phases: [
          { name: "Publication hygiene", pct: 100, note: "42 findings across 18 files remediated to 0; 3 line-scoped exceptions (PR #7, merged 2026-09-23)." },
          { name: "evidence-relevance harness", pct: 80, note: "Per-file replay harness + fail-closed packet loading shipped 09-16/09-21; used to tune Evidence Compiler ranking." },
          { name: "EC measurement tooling", pct: 70, note: "evidence-episodes, Footprints v1, Twin A/B harness and prospective-capture steps 1-4 built on local branches (17 commits, unpushed); capture hooks not registered." }
        ]
      },
      nextActions: ["Run tools/pre_publish_check.py over the new evidence-* tool dirs before any push - repo is public","Remove 3 stale worktrees: two detached at 4f92b5b and one on merged feat/evidence-packet-evacuate","Keep weekly slop-audit green; cover new tools with the publication-path checker"],
      pendingDecisions: ["When to push/PR the 17 local-only measurement commits (claude/evidence-episodes, claude/evidence-capture) - EC anchor says nothing is pushed unless the owner asks","C5: register the capture start/end hooks and begin natural capture (owner-only)"],
      blockers: [],
      reminders: ["Repo is public: no workstation paths, private repo names, or user-home paths in tracked files (enforced by the publication checker)","Tool configs live in each tool's own folder; target repos are never modified","Measurement tools ship generic code only - raw packets, prompts and transcripts stay in the local, remote-less Evidence-Archive stores","Contains the nested /next state clone (state/) - a separate repo with its own card"],
      links: [
        { label: "README", path: "F:\\Claude-Tools\\README.md" },
        { label: "Audits", path: "F:\\Claude-Tools\\audits" }
      ],
      recent: ["2026-09-26 - evidence-capture: steps 1-4 (start snapshot + manifest v2, start-only clone builder with P1-P10 proofs, review/expiry/seals, hook pipeline + dry mode), expiry backstop and executable-pinned boundary - local branch, hooks not registered","2026-09-26 - evidence-twin: supersede two Lab controls whose design blocked their question","2026-09-25 - evidence-twin: A/B replay harness with five Lab controls, isolated CLI environment, plugin-drift pinning, attempt-keyed ledger","2026-09-25 - evidence-footprints: Footprints v1 (retrieval + observed use), blind labeling sheets and label seal","2026-09-25 - evidence-episodes: deterministic packet-to-transcript episode builder","2026-09-25 - evidence-archive: dry-run-default packet evacuation before worktree cleanup (#10)","2026-09-24 - fix(graphify): load refresh targets from gitignored local config; fail-closed config, deduped alerts (#9)","2026-09-24 - ci: bump actions/checkout 7.0.1 and actions/setup-python 7.0.0 (Dependabot #3, #2)","2026-09-23 - fix(publication): enforce repository-safe path boundaries (#7, #8)","2026-09-23 - fix(audits): remove local paths and private internals from slop-audit reports (#6)","2026-09-23 - test(graphify): pin Refresh-Graphs stats-failure terminal path (#5)","2026-09-22 - docs(audit): close 2026-09-21 audit findings"],
      audit: {
        lastRun: "2026-09-23",
        runType: "Publication-hygiene closeout (full tracked-tree inventory) on top of the 2026-09-21 weekly slop-audit. Slop-audit verdict CLEAN after LOW-1 (uncounted malformed-line skip) and two robustness notes were fixed and validated 09-21/09-22; publication pass took 42 findings to 0 with 3 scoped exceptions.",
        cadence: "weekly slop-audit (scheduled) + ad-hoc publication review",
        trend: "stable",
        reportPath: "F:\\Claude-Tools\\audits\\2026-09-23__publication-hygiene-closeout.md",
        reportFile: "claude-tools/2026-09-23__publication-hygiene-closeout.md",
        ledgerPath: "F:\\Claude-Tools\\audits",
        history: [
          { date: "2026-09-23", type: "Publication-hygiene closeout", scope: "Every tracked file", result: "42 findings -> 0; 3 scoped exceptions. Merged as 6582fda.", report: "2026-09-23__publication-hygiene-closeout.md" },
          { date: "2026-09-21", type: "Weekly slop-audit", scope: "Repo-wide", result: "1 LOW + 2 robustness notes -> all fixed 09-21/09-22. CLEAN.", report: "2026-09-21__slop-audit.md" },
          { date: "2026-09-13", type: "Weekly slop-audit", scope: "Repo-wide", result: "Report on disk.", report: "2026-09-13__slop-audit.md" }
        ],
        reportDate: "2026-09-23",
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "claude-tools", head: "5e548a5", inspected: true }
        ],
        rawCounts: { critical: 0, high: 0, medium: 0, low: 1, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 1, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "success",
        ingestDetail: "All findings closed in-repo (acac51e, 6582fda). 0 open.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {
        date: "2026-10-05",
        summary: "fix(graphify): funnel measures only timed latency and reports unread inputs (#17) (56b109c)"
      },
      activity: [4,9,2,0,0,0,6,2,0,0,0,0,1,0]
    },
    /* PROJECT:claude-tools:END */

    /* PROJECT:evidence-compiler:START */
    {
      id: "evidence-compiler",
      name: "Evidence Compiler",
      icon: "layers",
      oneLiner: "Deterministic evidence packets for Claude Code turns: gathers git state and ripgrep symbol/filename evidence under strict budgets and injects a ranked packet via hook. Public repo, dogfooded in four BIMpossible repos.",
      status: "active",
      phase: "Phase 1A shipped; core frozen at 479571e / v0.3.1 while an owner-approved measurement program (Stages 0-1, 2026-09-25) runs: packet evacuation live, episode builder gate PASS, Footprints v1 done, Twin A/B harness built. The historical single-prompt replay was blocked at pre-seal verification (prereg rev 4), so prospective capture was planned (rev 3 baseline) and steps C1-C4 built; C5 hook registration held. Plan/anchor docs are 28 local-only commits on a worktree branch.",
      focus: "Measurement, not ranking: prove whether packets help via blind owner labels, Footprints and Twin counterfactuals. Waiting on owner stops (S1.2 sitting + D5 seal, C5 capture registration, historical population). Twin spend 3,047,439 tokens, 0 on historical prompts.",
      progress: {
        label: "NORTHSTAR.md",
        phases: [
          { name: "Phase 1A - core packet", pct: 100, note: "Audited; F-1..F-5 fixed and regression-tested." },
          { name: "Dogfood windows", pct: 60, note: "W2 closed 09-06; W3 running on v0.3.x." },
          { name: "Phase 1B - evidence quality", pct: 10, note: "Draft only (uncommitted)." },
          { name: "Measurement Stages 0-1", pct: 55, note: "Anchor phases 0-4 and capture C0-C4 done; S1.2 blind sitting, prereg seal, 60-run pilot, G1 and C5 capture registration pending." }
        ]
      },
      nextActions: ["Owner: S1.2 blind labeling sitting (10 episodes, ~45 min) together with the D5 prereg seal","Owner: decide whether to push the 28 local-only plan/anchor commits (and the paired Claude-Tools branches) - the anchor holds them local until asked","Owner: Window 3 audit - label 10 packets from the prepared worksheet (EC-DOGFOOD-2)","Decide which of the four uncommitted *.draft.md plans to adopt"],
      pendingDecisions: ["C5: register the prospective-capture start/end hooks and start natural capture (owner-only; dry-run start p50 ~0.5 s)","Historical Twin population: none eligible after the rev-4 pre-seal failure - adopt prospective capture as the path","WORKLOG collision disposition: archive old local file (chosen) vs merge under ## Archive"],
      blockers: [],
      reminders: ["Core is frozen at 479571e / 0.3.1 during measurement; Gate 7 stays closed","Raw packets, prompts and transcripts stay on this machine (EC-LIVE / EC-MEASURE stores have no remote)","STATUS.md last updated 2026-08-23 - WORKLOG.md and the measurement execution anchor are the fresher status sources","NORTHSTAR.md is human-only"],
      links: [
        { label: "North Star", path: "F:\\Evidence Compiler\\NORTHSTAR.md" },
        { label: "Worklog", path: "F:\\Evidence Compiler\\WORKLOG.md" }
      ],
      recent: ["2026-09-26 - Prospective capture steps C1-C4 done (Claude-Tools claude/evidence-capture, all tests green); C5 hook registration held for owner","2026-09-26 - Prospective-capture implementation plan rev 3 approved as the baseline for steps 1-4","2026-09-26 - S1.3 prereg rev 4: single-prompt historical check blocked at pre-seal verification (context rule + clone leak); nothing sealed or run","2026-09-26 - S1.3 prereg rev 3: Twin dry run + Lab controls, P verifier checked, spend measured (3.05M tokens)","2026-09-25 - S0.3 episode builder gate PASS (388/29/123 reproduced) and S1.1 Footprints v1 done","2026-09-25 - Measurement Stages 0-1 approved; S0.1 packet evacuation live (EC-LIVE seeded, daily sweep scheduled)","2026-09-25 - Measurement consensus decision and implementation plan (five reviews synthesized)","2026-09-21 - fix(ripgrep): filename-stem lookup respects the collector deadline (#20)","2026-09-16 - feat(ranking): equal-score tie-break for budget selection (#19)","2026-09-16 - feat(ripgrep): exact filename-stem evidence outside the content caps (#19)","2026-09-16 - fix(ripgrep): batch symbol search into one rg process per match mode (#18)"],
      audit: {
        lastRun: "2026-09-06",
        runType: "/review-all on the Window 3 pass; last full audit 2026-09-01 (Phase 1A, F-1..F-5 fixed).",
        cadence: "ad-hoc (/review-all per PR)",
        trend: "stable",
        reportPath: "F:\\Evidence Compiler\\docs\\reviews\\2026-09-06__review-all__w3-pass.md",
        reportFile: "evidence-compiler/2026-09-06__review-all__w3-pass.md",
        ledgerPath: "F:\\Evidence Compiler\\docs",
        history: [
          { date: "2026-09-06", type: "/review-all", scope: "Window 3 pass", result: "Findings addressed in W3 follow-through.", report: "2026-09-06__review-all__w3-pass.md" },
          { date: "2026-09-01", type: "Full audit", scope: "Phase 1A", result: "5 confirmed findings F-1..F-5 fixed and regression-tested.", report: "2026-09-01__audit-report.md" }
        ],
        reportDate: "2026-09-06",
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "evidence-compiler", head: "479571e", inspected: true }
        ],
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "success",
        ingestDetail: "No open findings recorded in WORKLOG. 0 open.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {
        date: "2026-09-21",
        summary: "Merge pull request #20 from YourBIMpossible/fix/stem-respect-deadline (479571e)"
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    /* PROJECT:evidence-compiler:END */

    /* PROJECT:local-intel:START */
    {
      id: "local-intel",
      name: "Local Intel",
      icon: "brain",
      oneLiner: "Pre-registered experiment: does local-model (Ollama) triage of test logs add measurable value to the Claude Code loop beyond deterministic log compression?",
      status: "gated",
      phase: "Phase 0 smoke test run and re-measured with flash attention on; outcome DEFER (revised to warm-session-only). Phase 1a prepared (readiness assessment + build spec) but not admitted.",
      focus: "Idle since 2026-09-06, waiting on the owner's Phase 1a admission decision.",
      progress: {
        label: "Protocol v3",
        phases: [
          { name: "Phase 0 - smoke test", pct: 100, note: "Decision recorded 2026-09-06: DEFER, warm-session-only." },
          { name: "Phase 1a - offline artifact quality", pct: 5, note: "Readiness/gap assessment done; harness not built (not admitted)." },
          { name: "Phase 1b - live paired eval", pct: 0, note: "Gated on 1a." }
        ]
      },
      nextActions: ["Owner: dated, versioned Phase 1a admission decision naming admitted model config(s)","Owner: ratify the measured-batch keep-alive policy","Source 30-50 real redacted fixture logs (only 5 synthetic exist)"],
      pendingDecisions: ["Phase 1a admission (30B eligible; 14B needs cache-controlled rerun; 9B needs protocol amendment)","Whether/how real redacted fixtures may be sourced","Reopen the local-model path with new/smaller candidates?"],
      blockers: ["No Phase 1a admission decision - protocol forbids building the full harness without it"],
      reminders: ["No phase skipping; no autonomous promotion between states","Kill thresholds and generation parameters are pre-committed - change only via a dated protocol amendment before the phase","F:\\local-intel-fixtures (5 synthetic logs, no commits) is a sub-part of this project"],
      links: [
        { label: "North Star", path: "F:\\Local Intel\\NORTHSTAR.md" },
        { label: "Worklog", path: "F:\\Local Intel\\WORKLOG.md" },
        { label: "Phase 1a readiness", path: "F:\\Local Intel\\reviews\\2026-09-06-phase1a-preparation-readiness.md" }
      ],
      recent: ["2026-09-06 - chore(drafts): disposition four untracked drafts; clean both worktrees (#5)","2026-09-06 - docs(phase1a): record readiness/gap assessment and admission gate (#4)","2026-09-06 - fix(diagnostic): preserve failure status and retry safety (#3)","2026-09-06 - DEFER revised to warm-session-only (human ruling)","2026-09-06 - Evidence-and-decision PR merged (#1, #2)"],
      audit: {
        lastRun: "2026-09-06",
        runType: "/review-all standard + follow-up review on the diagnostic-reliability fix.",
        cadence: "ad-hoc (/review-all per PR)",
        trend: "stable",
        reportPath: "F:\\Local Intel\\reviews\\2026-09-06-review-all-standard-followup.md",
        reportFile: "local-intel/2026-09-06-review-all-standard-followup.md",
        ledgerPath: "F:\\Local Intel\\reviews",
        history: [
          { date: "2026-09-06", type: "/review-all follow-up", scope: "Diagnostic reliability fix", result: "Addressed in #3.", report: "2026-09-06-review-all-standard-followup.md" },
          { date: "2026-09-06", type: "/review-all standard", scope: "Evidence-and-decision PR", result: "Corrective commit applied.", report: "2026-09-06-review-all-standard.md" }
        ],
        reportDate: "2026-09-06",
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "local-intel", head: "1d3ce46", inspected: true }
        ],
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "success",
        ingestDetail: "Findings addressed in #3 and corrective commits. 0 open.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {date: "2026-09-07", summary: "Merge pull request #5 from YourBIMpossible/chore/draft-disposition-cleanup (1d3ce46)"},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    /* PROJECT:local-intel:END */

    /* PROJECT:personal-ocr:START */
    {
      id: "personal-ocr",
      name: "Personal OCR",
      icon: "box",
      oneLiner: "Local-only OCR pipeline for documents the operator is authorized to handle: rasterizes PDFs and sends pages only to a local model endpoint, fail-closed on any non-local endpoint.",
      status: "paused",
      phase: "Scaffold built 2026-09-13: endpoint-only pipeline, pre-flight GPU gate, local-only policy enforcement, PDF support, run manifest, git guard. All 10 /review-all findings fixed. No commits since.",
      focus: "None active since 2026-09-13.",
      progress: {
        label: "North star",
        phases: [
          { name: "Scaffold + policy enforcement", pct: 100, note: "Local-only endpoint check, PDF rasterize, manifest, git guard." },
          { name: "Real-document runs", pct: 0, note: "Not started." }
        ]
      },
      nextActions: ["First end-to-end run on real documents with the production local model"],
      pendingDecisions: [],
      blockers: [],
      reminders: ["Nothing derived from a document may leave the machine or enter git"],
      links: [
        { label: "North Star", path: "F:\\Personal-OCR\\NORTHSTAR.personal-ocr.md" },
        { label: "Review", path: "F:\\Personal-OCR\\reviews\\2026-09-13__review-all.md" }
      ],
      recent: ["2026-09-13 - Add .gitattributes to normalize text to LF","2026-09-13 - Enforce local-only OCR policy; add PDF support, run manifest, and git guard","2026-09-13 - Activate north star","2026-09-13 - Fix all 10 review findings (F1-F9, N1)","2026-09-13 - Add /review-all report for the scaffold commit","2026-09-13 - Build endpoint-only OCR pipeline scaffold with pre-flight gate"],
      audit: {
        lastRun: "2026-09-13",
        runType: "/review-all on the scaffold commit; all 10 retained findings (F1-F9, N1) fixed same day.",
        cadence: "ad-hoc (/review-all)",
        trend: "stable",
        reportPath: "F:\\Personal-OCR\\reviews\\2026-09-13__review-all.md",
        reportFile: "personal-ocr/2026-09-13__review-all.md",
        ledgerPath: "F:\\Personal-OCR\\reviews",
        history: [
          { date: "2026-09-13", type: "/review-all", scope: "Scaffold commit", result: "10 findings -> fixed (ab22238).", report: "2026-09-13__review-all.md" }
        ],
        reportDate: "2026-09-13",
        reconciledAt: "2026-09-23 00:00:00",
        reconciliationHeads: [
          { repo: "Personal-OCR", head: "c3cbe9c", inspected: true }
        ],
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "success",
        ingestDetail: "All findings fixed in ab22238. 0 open.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {
        date: "2026-09-13",
        summary: "Add .gitattributes to normalize text to LF (c3cbe9c)"
      },
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    /* PROJECT:personal-ocr:END */

    /* PROJECT:revit-ops:START */
    {
      id: "revit-ops",
      name: "Revit-Ops",
      icon: "wrench",
      oneLiner: "Local Claude Code plugin marketplace + knowledge base for live Revit model work via mcp-server-for-revit: cleanup, audits, fixes, and a worklog postmortem archive. Separate from the BIMpossible Revit Assistant product.",
      status: "active",
      phase: "In active use against a live project model: one skill shipped (revit-safe-duplicate-cleanup); worklogs capture each pass (view/sheet renames, title-block swaps, duplicate and performance scans).",
      focus: "Model cleanup passes on a live project (2026-09-21 to 09-25): discipline rename, view-suffix alignment, title-block swap, north-arrow and duplicate cleanup, then sheet status and sheet sort/index ordering.",
      progress: {
        label: "Plugin",
        phases: [
          { name: "Skills", pct: 20, note: "1 skill (safe duplicate cleanup); more expected." },
          { name: "Worklog archive", pct: 100, note: "Per-pass reports committed." }
        ]
      },
      nextActions: ["Add a private git remote and push - all 19 commits are local-only","Promote repeated worklog procedures into skills"],
      pendingDecisions: ["Consolidate with the Revit skills in the AddIns repo, or keep two homes"],
      blockers: [],
      reminders: ["Enable the plugin only in Revit-model sessions so skills do not load in coding repos","Worklogs describe client model content - keep the repo private"],
      links: [
        { label: "README", path: "F:\\Revit-Ops\\README.md" },
        { label: "Worklogs", path: "F:\\Revit-Ops\\worklogs" }
      ],
      recent: ["2026-09-25 - worklogs: sort-order review candidates list (review only)","2026-09-25 - worklogs: sector sheets sort value update","2026-09-25 - worklogs: index sort synced from the sheet sort-order parameter (937 sheets)","2026-09-24 - worklogs: sheet set issue status to 100% CD + sheet order","2026-09-23 - worklogs: north arrows off, T.I. details/legend fix, duplicate list","2026-09-23 - worklogs: title block swap (112 sheets) + slowness scan","2026-09-23 - worklogs: sheet prefix vs view suffix scan (report only)","2026-09-23 - worklogs: suffix-mismatch views renamed to match parameter (53)","2026-09-23 - worklogs: detail discipline rename","2026-09-23 - worklogs: T.I. cleanup pass 2 + discipline removal, suffix scan","2026-09-22 - worklogs: title-on-sheet blank fix","2026-09-21 - worklogs: stacked duplicates review + deletion manifest"],
      audit: {
        lastRun: null,
        runType: "none on record",
        cadence: "none",
        trend: "unknown",
        reportPath: null,
        reportFile: null,
        ledgerPath: "F:\\Revit-Ops",
        history: [],
        reportDate: null,
        rawCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        openCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        unknownCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        resolvedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        publishedCounts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        ingestStatus: "none",
        ingestDetail: "No audit on record.",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 0,
        open: [],
        unknown: []
      },
      lastActivity: {
        date: "2026-09-29",
        summary: "worklogs: TI sector viewports re-placed at saved positions (472) (3168e16)"
      },
      activity: [9,1,3,0,0,0,2,0,0,0,0,0,0,0]
    },
    /* PROJECT:revit-ops:END */
  ]
};
