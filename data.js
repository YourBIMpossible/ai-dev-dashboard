// F:\AI-Dev project dashboard data (schema v4 - tasks added to phases)
// AUTO (daily 06:00 refresh from the Dashboard-auto clone): phases+waves from the BIMpossible
//   ledgers (sync_ledgers.py, no LLM); activity+lastActivity from git (sync_activity.py).
// MANUAL / on-demand: prose fields (phase, focus, oneLiner, recent, nextActions, branch, audit).
//   The GitHub-Models prose bot has no trigger on the code repos, so prose only moves on an
//   on-demand "refresh dashboard" pass and goes stale between passes. See REFRESH-SPEC.md.
window.DASHBOARD_DATA = {
  generated: "2026-07-13",
  generatedBy: "scheduled refresh",
  activitySince: "2026-06-30",
  projects: [
    /* PROJECT:bimpossible:START */
    {
      id: "bimpossible",
      name: "BIMpossible Platform",
      icon: "layers",
      oneLiner: "Discipline-neutral BIM data platform above Autodesk's tools (reads ACC, custom interface, write-back later).",
      status: "active",
      phase: "main at bd472b0 (2026-07-01), 0 ahead of origin. Since #170 (07-01) the Embedded Assistant advanced hard: Phase 4c conversation persistence (#153) + stop-and-edit (#154), Phase 4d project-context grounding (#155), NetworkX graph-topology tools + Model Health graph checks (#157), permission-flow graph tool. Infra/hardening: Wave C-1 Redis shared-state multi-worker foundation (#152); QA predicate-normalization refactors (#150/#151); report-only security-scan + BIM semgrep rules + prose-flag hook + trivy CI pin. Program gates unchanged: P11 Model QA + P8 Wizard built but flag-gated OFF; P6 true-prod deploy still owed (alembic → head s1t2u3v4w5x6); P7 write-back ON HOLD (Revit Link single-user live, DA4R parked); P5 ON HOLD.",
      focus: "True-prod deploy still owed (runbook 06-12): alembic upgrade → head s1t2u3v4w5x6, set BIMPOSSIBLE_ADMIN_ENABLED/SECRET, prewarm DB cleanup → then smoke Wave 4.10 + 4.9 + admin/My-Account. The 06-25→28 assistant Phase 4c/4d + Model Health graph work (#150–157) is merged but unsmoked on prod. The 06-30 full-audit remediation (#150–157) is merged but unsmoked on prod. Then: P7 DA4R-vs-Revit Link sequencing decision.",
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
            note: "ACTIVE — Permanent, never-closing data substrate. Phase 3.10 Cross-Model Joins: IN PROGRESS — Phase 11 QA gate cleared 2026-07-01; first increment 3.10a (Cross-Model Room Join) SHIPPED 2026-07-12 (`dd5adb1`); general join framework (3.10b) not yet built. See §Phase 3 sub-phase notes below.",
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
            note: "ON HOLD — Bonus, not a need (owner 2026-06-24). Pre-pilot/early wiring only (5.1/5.2 ViewPreset/Markups); 5.3/5.4 unconfirmed pending re-scan. Wave 9 (Forma) only affects how 5.1/5.3/5.5 viewer slices are hosted at resume. 5.5 Navisworks planned; Sheets gated OFF. 5.6 Visual Model Graph — read-only node-link view (select element → trace/load-tree highlight); frontend-only on the live `get_relationships_graph` endpoint; PARKED, ready-to-build (see `design-docs/visual-model-graph_design-doc_2026-06-28.md`)",
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
            note: "CLOSED — Access tiers, usage metering, BYO keys; Client-Mgmt A/B/C/D; shipped via Wave 20 / PR #112; live-smoked 2026-07-01 (usage_logger wired e97fa1f, admin dashboard: 241 queries / $4.04 MTD / 58.3k output tokens confirmed)",
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
            pct: 35,
            note: "ON HOLD — Co-equal engines, ship together. Revit Link live-except-sync; DA4R backend scaffolded (off). Owner gates: (1) add BIMpossible-AddIns repo, (2) \"go\" to re-enable sync — still ON HOLD by owner-gate policy, independent of the audit-gate item below. See proposal 2026-06-23 (§2 DoD) for exact acceptance criteria. Audit gate (hard — from `2026-06-21__AuditAndHistory_Pattern.md`): ✅ SATISFIED 2026-07-02 (`0055dd1`) — `edit_log` + `revit_link_request_log` migrations applied and the adapter writes to both on every call (write-ahead as of the 2026-07-10 WIZ-7 fix); `GET /admin/audit/edits` endpoint + XLSX export live; `query_edit_log` assistant tool registered (firm-scoped as of AST-1, `376e180`). This row described the gate as still-pending through 2026-07-08's audit — stale, fixed today (DOC-2).",
            tasks: [
              { label: "write_instance_parameter endpoint live (single-user, flag=ON in prod)", status: "done", note: "revit_link/native_adapter.py lines 261-412; relay live; BIMPOSSIBLE_REVIT_LINK_ENABLED=1 in pilot" },
              { label: "Frontend UX: useRevitLink hook + EditParameterDialog + SyncConflictModal", status: "done", note: "Shipped in prior build" },
              { label: "Relay transport hardened (SEC-L2/L5/L8; frame guard + length-prefix)", status: "done", note: "9f6f55c 06-23 — length-prefixed frame guard (MAX_FRAME_BYTES, signed-int32) mirroring C# PipeServer" },
              { label: "DA4R (cloud) path: design + proposal complete", status: "active", note: "2026-06-23 Phase7_Writeback_TwoOptions_PROPOSAL.md at 00_Strategy/ — DA4R not yet built" },
              { label: "Resolve multi-user tripwire (PipeServer.maxNumberOfServerInstances=1 + single shared RELAY_SECRET)", status: "pending", note: "Hard blocker for Phase 1 re-enable" },
              { label: "Re-enable sync_with_central (currently 2-layer disabled: HTTP 501 + C# force=true guard)", status: "pending", note: "Gated on confirmation UX + short-lived token + frontend modal" },
              { label: "Auth/session refactor stable for multi-user (Authlib + starsessions)", status: "pending" },
              { label: "Exercise against a real two-user scenario", status: "pending", note: "Gate before Phase 9: write-back shipped + exercised; sync re-enable UX approved" }
            ]
          },
          {
            name: "P8 Project Setup Wizard",
            pct: 60,
            note: "BUILT (gated OFF) — First Autodesk-write feature; `wizard/aps_write.py` is a real, implemented ~500-line client (⚠️ owed live verification against real Autodesk creds — untestable without a supervised run) — this row called it \"stubs\" through 2026-07-08's audit, fixed today (DOC-2). Audit gate: `provisioning_jobs_status_history` table present (per Audit & History Pattern §4) before going live — ✅ present since `0055dd1`.",
            tasks: [
              { label: "No-write planning core (planner + reverse-order rollback walker + default-closed gate)", status: "done", note: "06-14 — pure stdlib, not wired into main.py; 18 tests green" },
              { label: "ProvisioningJob DB model + Alembic migration (t2u3v4w5x6y7)", status: "done", note: "06-14 — verified via isolated local-CI lane; alembic check clean" },
              { label: "Router: POST /wizard/plan + GET /wizard/templates (planning only, flag-gated)", status: "done", note: "06-14 — behind BIMPOSSIBLE_WIZARD_ENABLED (off by default); 23 wizard tests green" },
              { label: "Frontend /wizard (Details → Template → Review → Provision; provision step inert)", status: "done", note: "06-14 — local CI green; /wizard route 3.24kB; honest 'dry run, nothing created' contract" },
              { label: "APS write executor + provision-time elevated consent (data:write / data:create)", status: "blocked", note: "Gated on founder write-approval. Consent decided: least-privilege, provision-time-only, discarded after run" },
              { label: "Template baseline (firm RVT template + real view-template / sheet list)", status: "pending", note: "Owner input — until then the planner flags every defaulted value" }
            ]
          },
          {
            name: "P9 Product Data Ingestion",
            pct: 10,
            note: "CONDITIONAL — Supersedes Phase 3.X Manufacturer Data Ingestion. Audit gate: all 5 new tables have `created_at`/`updated_at`; `product_type_binding_status_history` + `extraction_review_queue_status_history` tables present (per Audit & History Pattern §4).",
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
            name: "P11 Model QA & Health",
            pct: 64,
            note: "SHIPPED — LIVE in prod — `BIMPOSSIBLE_QA_ENABLED=1` set by owner; Q1 live smokes ALL PASS on pilot `ISI-SB-SL-EL.rvt` via prod path (health 89/100 on 47k elements, `.ids` import evaluated 10053/10053, panel renders, 401/403 leak checks hold, Q2 fixes live-verified incl. 422 on broken imported-rule override). Full log: GitHubWorkflow §11 2026-07-01. Read-only QA rules + `.ids` import; was unnumbered (\"Phase 7-ish\")",
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
          { name: "P11.1 Coordination & Health Report", pct: 95, note: "SHIPPED — LIVE in prod — Merged via [PR #172](https://github.com/YourBIMpossible/BIMpossible/pull/172) (squash, CI-green); deployed + live-smoked same day on pilot `ISI-SB-SL-EL.rvt` (JSON 200/1.7s warm; .doc download 172KB, branded+dated, severity-ranked, 5 plain-language critical hubs, island+unconnected traces; preparing→warm cycle exercised post-restart; unauth 401 ×4 + non-allowlisted 403 ×2 hold). Both smoke findings FIXED same evening (`83384da`, CI green ×3, live re-verified): (1) report now runs the resolved project rule set (shipped + imported `.ids` + overrides) — panel↔report parity proven live (90.2 == 90.2 with an imported rule; 89.11 == 89.11 after cleanup); (2) `model_name` threaded UI→API — the .doc header shows the model's filename, zero URN occurrences. AC1–AC6 verified live; AC7 (report history) deferred. Read-only, no new QA rules. See §Phase 11.1 below." },
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
          }
        ]
      },
      activity: [13,18,19,0,0,0,5,8,0,3,20,16,15,0],
      lastActivity: {
        date: "2026-07-12",
        summary: "fix(assistant-revit-write): rechain migration onto a1b2c3d4e5f6, resolve multi-head (85f27e2)"
      },
      branch: "main at bd472b0; 0 ahead of origin",
      git: {
        warn: "Many merged feature branches still on origin (audit/*, refactor/data-tab-*, wip/phase5-*); prune retired remotes. Local fix/perp-audit-* may also be stale (content merged via PR)."
      },
      nextActions: [
        "True-prod deploy (runbook 06-12): alembic upgrade head (→ s1t2u3v4w5x6), set BIMPOSSIBLE_ADMIN_ENABLED=1 + BIMPOSSIBLE_ADMIN_SECRET, DELETE stale done-rows in relationship_prewarm_jobs per model",
        "Post-deploy smokes: Wave 4.10 (Spec Draft launcher → modal + downloads); Wave 4.9 (ScheduleClassificationBar + ✦ badge); admin/My-Account KPI strip + firm onboard",
        "Smoke the 06-25→28 assistant work on prod: Phase 4c conversation persistence + stop-and-edit, Phase 4d project-context grounding, Model Health graph checks (#150–157)",
        "Smoke the 06-30 full-audit remediation on prod: GRAPH-1 diamond-DAG `_load_served`, GS-1, OWN-1, DIGEST-3, PREWARM-1",
        "P7 DA4R + Revit Link sequencing: review 2026-06-23 Phase7_Writeback_TwoOptions_PROPOSAL.md, decide which engine to build first",
        "Add WAVE-STATUS.md rows for Waves 4.9 + 4.10 (shipped in git, missing from ledger)",
        "Commit + push P6 /account FE test branch: AdminShell, FirmEditDrawer, ConfirmDialog, My Account UI tests missing",
        "Drop _saved_views_snapshot_2026_05_24 (OVERDUE since 06-23); install reportlab so PDF exports work (CSV-only until added)"
      ],
      pendingDecisions: [
        "Schedule-push: staleness cadence, classifier rules, fidelity degradation list, SPF ship location",
        "Wave 16 Interiors: build dedicated shapers for Ceilings/Flooring now or batch with Wave 15 Civil?",
        "Phase B admin auth: Google OAuth client + env (AUTH_GOOGLE_ID == backend GOOGLE_CLIENT_ID); B0 unify legacy admin routes onto require_admin (Option A chosen)"
      ],
      blockers: [],
      reminders: [
        "True-prod deploy owed: alembic upgrade head (Phase A 4 migrations → head s1t2u3v4w5x6) + 2 env vars + prewarm DB cleanup — gates Wave 4.9/4.10/admin/My-Account live smokes",
        "WAVE-STATUS.md ledger missing rows for Waves 4.9 + 4.10 (both shipped in git) — add them so summary counts are authoritative",
        "P7 two-engine proposal: 2026-06-23 Phase7_Writeback_TwoOptions_PROPOSAL.md — DA4R (cloud) + Revit Link (app-sync) co-equal Phase 7 engines; DA4R not yet built",
        "reportlab not installed → aec/exports.py PDF routes inert (CSV works); add before Phase C /account/export/*.pdf",
        "My Account shows graceful 'not linked' state until founder's Autodesk user gets an active user_firm_memberships row",
        "Drop _saved_views_snapshot_2026_05_24 — deadline TODAY 2026-06-23"
      ],
      links: [
        { label: "STATE doc (canonical, 06-12)", path: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_STATE_2026-06-12.md" },
        { label: "True-prod deploy runbook (06-12)", path: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\2026-06-12__true-prod-deploy-runbook.md" },
        { label: "Wave 4.10 spec libs (backend)", path: "F:\\AI-Dev\\BIMpossible\\backend\\spec_sections" },
        { label: "Waves 10-19 closeout (06-13)", path: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\2026-06-13__Waves10-19_CloseOut_Status_and_Remaining_Work.md" },
        { label: "Build log", path: "F:\\AI-Dev\\BIMpossible_Workspace\\01_BuildLog" },
        { label: "Code", path: "F:\\AI-Dev\\BIMpossible" }
      ],
      recent: [
        "2026-06-28 - PRs #153–#157 merged: Embedded Assistant Phase 4c (conversation persistence + stop-and-edit) + Phase 4d project-context grounding; NetworkX graph-topology tools + Model Health graph checks (#157) + permission-flow graph tool; report-only security-scan + BIM semgrep + prose-flag hook; trivy CI pin (main 80d3407)",
        "2026-06-27 - Wave C-1 (#152): shared-state on Redis — multi-worker foundation",
        "2026-06-25 - QA refactors (#150/#151): extract _norm/_blank helpers + fold non_empty into not _blank (DRY predicate normalization)",
        "2026-06-23 - PR #142 merged (9f6f55c): P11 Model QA rules engine + P8 Wizard committed to main; expr-eval prototype-pollution CVE removed; relay frame guard + multi-tenant auth scoping + aec edge cases (audit remediation)",
        "2026-06-17 - Audit remediation batch: conftest pure-lane collect_ignore fix; FederatedViewer + annotations/viewPresets hardening (3 commits)",
        "2026-06-13 - Client-Management UIs shipped (0e0242f): Admin Portal v2 + My Account dashboard (budget, BYO-key, cost-by-model); CI green",
        "2026-06-12 - Client-Management Phase A backend (e749918): 8 tables / 4 migrations; Wave 4.10 spec library COMPLETE (3cf91a0); Wave 4.9 classification enrichment (f207d41)"
      ],
      audit: {
        lastRun: "2026-07-13",
        runType: "Weekly full audit (3 parallel lens sub-agents: backend/data/ops, frontend, relay/CI + ops/tests) followed by same-day closeout — every finding shipped as a code/config fix or an accepted, documented owner decision.",
        cadence: "weekly Mon 6am + on-demand",
        counts: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        closedLastRun: 17,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\Audit and Scan Info\\weekly-full-audit_2026-07-13.md",
        reportFile: "bimpossible/weekly-full-audit_2026-07-13.md",
        ledgerPath: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\_audit-runs.md",
        open: [],
        history: [
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
        ]
      },
      waves: {
        updated: "2026-07-01",
        source: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md",
        summary: { done: 28, built: 0, inFlight: 1, ahead: 4 },
        current: [
          { id: "15", title: "Civil schedules", status: "PARTIAL", date: "2026-06-13", note: "Civil probe-config + model-discovery work merged (`cf3b8ee` Merge feat/wave15-civil-probe-config; model-discovery (local merge c7ac2d5; feat 9145f88)). Adds `b…" },
          { id: "8", title: "Revit Link Phase 1 multi-user pass", status: "PLANNED" },
          { id: "9", title: "APS Forma embed evaluation", status: "PLANNED" }
        ],
        lastCompleted: { id: "20", title: "Access control, usage metering & admin", date: "2026-07-01" },
        drift: []
      }
    },
    /* PROJECT:bimpossible:END */
    /* PROJECT:addins:START */
    {
      id: "addins",
      name: "Add-Ins / RevitLink",
      icon: "wrench",
      oneLiner: "Revit ribbon add-ins: BIMpossible.RevitLink (15/15 shipped + 21 tools built) + Trade QA Scanner suite (6 trades deployed).",
      status: "active",
      phase: "06-27: Duplicate Collection refine on branch feat/dupcollection-refine (3 ahead of origin, unpushed) — template remap store + view-family name minter + UI overhaul (c34f022); Model Health per-view workset breakdown + plain-English metric descriptions (070b4be); working specs committed (26f1e1f). Earlier: 3D section-box tightening + Reference Callout collapsible section (06-16); Tool 18 hardened (06-13); Tools 10-13 shipped + 14-21 built via TDD on main. RevitLink 9/13 shipped + 8 BIM-manager tools.",
      focus: "Push the feat/dupcollection-refine branch (3 unpushed); Tool 7 Phase 1 smoke in Revit; update TOOL_BACKLOG.md with Tools 14-21; then Definition of Done sweep (icons/guides/tooltips) for Tools 10-21; add Tools 14-21 to backlog table; update Tool 7 Phase 1 status to SHIP.",
      progress: { label: "Tracks", phases: [
        { name: "RevitLink tools (9/13 shipped)", pct: 72,
          tasks: [
            { label: "Tools 1–6 shipped", status: "done" },
            { label: "Tool 7 (Build Sheet Set from Arch Link)", status: "active", note: "Phase 1 built; smoke test owed in Revit" },
            { label: "Tools 8–9", status: "pending", note: "IDEA stage" },
            { label: "Tools 10–13 shipped", status: "done", note: "06-10: Fix Title Blocks, Retag Rooms, Push View Templates, Trim Sheets" }
          ]
        },
        { name: "BIM Manager Tools (14-21 built)", pct: 42, note: "TDD green; Tool 18 hardened 06-13; not yet in SHIP state; Definition of Done owed",
          tasks: [
            { label: "Tool 14 Warning Scanner", status: "done", note: "WarningScannerCommand + 6 tests" },
            { label: "Tool 15 In-Place Family Finder", status: "done", note: "TDD green" },
            { label: "Tool 16 Workset Audit", status: "done", note: "WorksetAuditEntry + 5 tests" },
            { label: "Tool 17 Element ID Finder", status: "done", note: "WPF dialog + clipboard copy" },
            { label: "Tool 18 Batch Rename Views", status: "done", note: "Hardened 06-13: strict preflight preview, atomic commit, case toggle, manifest" },
            { label: "Tool 19 View Template Audit", status: "done", note: "HTML+CSV report, TDD green" },
            { label: "Tool 20 Scope Box Manager", status: "done", note: "TDD green" },
            { label: "Tool 21 Batch PDF Export", status: "done", note: "SheetExportSpec + PdfExportGrouper + 4 tests" },
            { label: "Definition of Done (icons, guides, tooltips) for 14-21", status: "pending" },
            { label: "TOOL_BACKLOG.md numbered table updated with 14-21", status: "pending" }
          ]
        },
        { name: "Tool 7 sheet set", pct: 60, note: "Phase 1 built; smoke owed",
          tasks: [
            { label: "Phase 1 (sheets) — built", status: "done" },
            { label: "Phase 1 smoke test in Revit", status: "active", note: "Next action — run it" },
            { label: "Phase 2 (view placement)", status: "pending" }
          ]
        },
        { name: "QA scanners (6/7 deployed)", pct: 72, note: "Core consolidated + audit-hardened; live smokes owed",
          tasks: [
            { label: "6 trades deployed", status: "done" },
            { label: "ModelQA.Core consolidated (816 tests green)", status: "done", note: "06-10 — 17 files × ~100 copies → one netstandard2.0 lib" },
            { label: "Audit-hardened pass", status: "done", note: "06-09 — CSV injection guard x7, culture-invariant, rolling log" },
            { label: "Architectural live smoke (4 tools, 21 tests)", status: "active" },
            { label: "E / M / P / FP / S live spikes", status: "pending" },
            { label: "Civil scanner (Trade 7)", status: "pending", note: "Scope decision parked — unanswered" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,2,15,2,18,12,15,0,0],
      lastActivity: {
        date: "2026-07-11",
        summary: "Merge branch 'worktree-dupcollection-execution-wrapping' (6389484)"
      },
      branch: "feat/dupcollection-refine (3 ahead of origin, unpushed)",
      git: {
        warn: "On feat/dupcollection-refine, 3 commits ahead of origin (06-27 dupcollection/model-health work, unpushed). Push or merge before it drifts."
      },
      nextActions: [
        "Tool 7 Phase 1 (sheets) smoke test; Phase 2 = view placement",
        "Definition of Done sweep: icons + How-To guides + tooltip/F1 wiring for Tools 10-21",
        "QA Scanners: live smoke Architectural (4 tools, 21 tests); live spikes for E/M/P/FP/S collectors",
        "Update TOOL_BACKLOG.md: add Tools 14-21 to numbered backlog table with status; update Tool 7 Phase 1 to SHIP",
        "Merge/close feat/model-audit-consolidation-2026-06-12 when consolidation lands"
      ],
      pendingDecisions: [
        "Civil Shared-Coordinate Audit scanner - scope unanswered (PARKED)"
      ],
      blockers: [],
      reminders: [
        "Core.dll co-loads in one Revit process: redeploy ALL add-ins together when Core changes",
        "Tools 14-21 committed to main but not yet in TOOL_BACKLOG.md numbered table — update table + assign status",
        "Definition of Done (icons, guides, tooltips) owed for all recently shipped/built tools (10-21)",
        "Deferred: Deploy-Local.ps1 PS 5.1-safe; Revit dev-mode hot-reload",
        "Tool 7 Phase 1 status updated to SHIP in TOOL_BACKLOG.md"
      ],
      links: [
        {
          label: "Tool backlog",
          path: "F:\\AI-Dev\\Add-Ins\\TOOL_BACKLOG.md"
        },
        {
          label: "ModelQA consolidation decision (06-10)",
          path: "F:\\AI-Dev\\Add-Ins\\decision-log\\2026-06-10__modelqa-consolidation.md"
        },
        {
          label: "Audit fix pass (06-09)",
          path: "F:\\AI-Dev\\Add-Ins\\decision-log\\2026-06-09__audit-fix-pass.md"
        },
        {
          label: "Dev notes",
          path: "F:\\AI-Dev\\Add-Ins\\BIMpossible.RevitLink\\DEV-NOTES.md"
        }
      ],
      recent: [
        "2026-06-27 - Duplicate Collection refine (feat/dupcollection-refine, 3 ahead of origin): template remap store + view-family name minter + UI overhaul (c34f022); Model Health per-view workset breakdown + plain-English metric descriptions (070b4be)",
        "2026-06-23 - refactor(revitlink): remove Anti-Worksets auto-stamp updater; bundle Duplicate Collection revisions (fddcaaf)",
        "2026-06-16 - 3D section-box tightening + datum clutter hidden; Reference Callout Views collapsible section (716f9e8/85932bd)",
        "2026-06-13 - Tool 18 Batch Rename Views hardened (032b877): strict preflight preview, atomic commit, case toggle, manifest",
        "2026-06-11 - Tools 14-21 built + ribbon-wired (Warning Scanner, In-Place Families, Workset Audit, Element ID Finder, Batch Rename Views, VT Audit, Scope Box Manager, Batch PDF Export)"
      ],
      audit: {
        lastRun: "2026-07-12",
        runType: "Full (complete top-to-bottom, 7 parallel review agents — RevitLink + ModelQA.Core + 6 discipline add-ins + all 7 test suites + docs/CI). Static review; C-01 and other build/live items flagged 'could not verify' still need a real net48 build + Revit session to confirm.",
        cadence: "on-demand",
        counts: { critical: 1, high: 10, medium: 53, low: 24, info: 18 },
        closedLastRun: 13,
        trend: "worsening",
        reportPath: "F:\\AI-Dev\\Add-Ins\\audits\\2026-07-12__audit-report-full.md",
        reportFile: "addins/2026-07-12__audit-report-full.md",
        ledgerPath: "F:\\AI-Dev\\Add-Ins\\audits",
        open: [
          { id: "C-01", sev: "critical", title: "net48 (Revit 2024 production) build almost certainly fails to compile — ReloadLinksCommand.cs uses net8-only ElementId APIs (.Value, new ElementId(long)) at 4 sites with no #if NET8_0_OR_GREATER guard, and CI never builds the shipping RevitLink add-in for either TFM, so nothing would catch it.", where: "Commands/ReloadLinksCommand.cs:125,211,273,307 · ci.yml:29-35" },
          { id: "H-01", sev: "high", title: "Section Clip's PendingPlacement flag has no expiry — cancel (Escape) after Apply leaves it true; the next section anyone draws in any document gets silently cropped with stale Above/Below/Depth (empty catch, no log).", where: "Commands/SectionClipCommand.cs:129,166,171,196,225" },
          { id: "H-02", sev: "high", title: "Room Data 'adopt existing parameter' can silently convert a client's TYPE-bound parameter to INSTANCE binding — EnsureBinding builds a new InstanceBinding regardless of the original kind, with no warning.", where: "RoomData/SharedParameterReconciler.cs:292-323" },
          { id: "H-03", sev: "high", title: "WriteInstanceParameterCommand (the repo's own 'core write engine, do not modify lightly') has zero test coverage — flagged 2026-06-09, never remediated; a future edit could ship silent optimistic-lock corruption.", where: "Commands/WriteInstanceParameterCommand.cs:115-161 (no test)" },
          { id: "H-04", sev: "high", title: "SetUniqueViewName silently gives up after 59 failed renames with no error signal (an illegal char in Find/Replace) — the view keeps its auto name while the run reports success; duplicated in two copies.", where: "Scaffold/CollectionDuplicator.cs:703-712 · LevelReplicator.cs:317-322" },
          { id: "H-05", sev: "high", title: "ScopeBoxNameNormalizer strips all non-alphanumerics, so 'Zone A-1' and 'Zone A1' both normalize to 'ZONEA1' and silently map to the same key-plan parameter.", where: "Shared/TitleBlock/ScopeBoxNameNormalizer.cs:12 · ScopeBoxToParamMapper.cs:28" },
          { id: "H-06", sev: "high", title: "ScopeBoxToParamMapper's substring fallback has no min-length or best-match ranking — a single-letter zone 'A'/'N' spuriously matches 'ALPHA'/'NORTH WING', wiring the sheet's key-plan highlight to an unrelated parameter.", where: "Shared/TitleBlock/ScopeBoxToParamMapper.cs:31-36" },
          { id: "H-07", sev: "high", title: "ViewRenamePreview.Apply leaks Regex.Replace substitution syntax into literal (non-regex) Batch Rename mode — '$$' drops to '$', '$&' becomes the matched text, '${name}' throws; ReplaceText is never validated.", where: "Shared/Views/ViewRenamePreview.cs:26-27" },
          { id: "H-08", sev: "high", title: "PdfPageCounter.FromText silently returns 1 for object-stream-compressed PDFs (PDF 1.5+), indistinguishable from a real 1-page file — only page 1 gets placed and it's misread as user error.", where: "Shared/Sheets/PdfPageCounter.cs:36 · LinkPdfToSheetsCommand.cs:271" },
          { id: "H-09", sev: "high", title: "Duplicate Collection's rollback/atomicity gate (this sprint's headline feature) has zero regression test — verified only by a one-time manual Revit session; a future operator/RollBack() change ships green.", where: "Scaffold/CollectionDuplicator.cs:156-171,188-202,255-270,314-329" },
          { id: "H-10", sev: "high", title: "Tests certify code paths that no longer run in production (3 confirmed): DuplicateCollection orphans, WorksetAuditor (dead since 2026-06-13), RetagAllRoomsPlanner — edit the tested-but-dead copy, tests stay green, nothing ships.", where: "Shared/DuplicateCollection/* · Shared/Worksets/WorksetAuditor.cs · Shared/Rooms/RetagAllRoomsPlanner.cs" }
        ],
        history: [
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
      focus: "M4 hardening — JSON-LD schema.org structured data, broken-link sweep; email routing aliases; product screenshots on interior pages",
      progress: { label: "Milestones", phases: [
        { name: "M0-M3 Foundation + live deploy", pct: 100,
          tasks: [
            { label: "Astro site scaffold (6 pages + global.css)", status: "done", note: "06-04" },
            { label: "Triple audit cleared (perf/architecture/code-review)", status: "done", note: "06-09 — all H/M/L findings fixed" },
            { label: "Cloudflare Pages deploy + custom domain yourbimpossible.com", status: "done" },
            { label: "Contact form (Turnstile + Web3Forms + 10s/15s timeouts)", status: "done", note: "13 e2e tests passing" },
            { label: "WAF rate rule + 5-hash CSP + 405 Allow header", status: "done", note: "06-09/10" },
            { label: "13.7KB font subset (dead font 404 fixed)", status: "done", note: "06-09" }
          ]
        },
        { name: "Business infra + presence", pct: 55, note: "Domain + Cloudflare live; LinkedIn live; email aliases + handles still open",
          tasks: [
            { label: "Domain registered + Cloudflare DNS live", status: "done" },
            { label: "LinkedIn Company Page live", status: "done", note: "linkedin.com/company/bimpossible (ID 131823928); launch post published" },
            { label: "Email routing aliases (hello@/support@/legal@/billing@/zeriah@)", status: "pending", note: "Recipe in IP-Lockdown-Checklist.md Phase 1.5 — not started" },
            { label: "Personal LinkedIn profile share of company page", status: "pending" },
            { label: "LLC formation", status: "pending" },
            { label: "Social handles (X, Instagram, GitHub org)", status: "pending" }
          ]
        },
        { name: "Content + product imagery", pct: 30, note: "Copy live; interior page screenshots still text-only placeholders",
          tasks: [
            { label: "6-page copy live", status: "done" },
            { label: "Leaders page — real product screenshots", status: "pending", note: "Needs live app screenshots" },
            { label: "BIM Managers page — real product screenshots", status: "pending" },
            { label: "Dashboard private sub-page (dashboard.yourbimpossible.com)", status: "pending", note: "Separate Cloudflare Pages project + Zero Trust Access gated to zeriah.t@gmail.com" }
          ]
        },
        { name: "M4 SEO hardening", pct: 0,
          tasks: [
            { label: "JSON-LD schema.org structured data (Organization, WebPage types)", status: "pending" },
            { label: "Broken-link sweep", status: "pending" },
            { label: "Open Graph / Twitter card meta per page", status: "pending" }
          ]
        },
        { name: "M5-M6 Pricing + commercial launch", pct: 0,
          tasks: [
            { label: "Pricing / waitlist page", status: "pending" },
            { label: "Commercial launch content", status: "pending" }
          ]
        }
      ]},
      activity: [0,1,0,0,0,0,0,0,0,0,2,0,0,0],
      lastActivity: {
        date: "2026-07-10",
        summary: "fix(site): close CONTACT-RL, TURNSTILE-HOST, CSP-STYLE from the 2026-07-10 audit (0594e6e)"
      },
      branch: null, git: { latestCommit: "709f352" },
      nextActions: [
        "M4: Add JSON-LD schema.org structured data (Organization + WebPage types) to all 6 pages",
        "M4: Broken-link sweep across all pages",
        "Email routing aliases: hello@/support@/legal@/billing@/zeriah@ → Gmail (recipe in IP-Lockdown-Checklist.md Phase 1.5)",
        "Product screenshots: get real app screenshots into Leaders + BIM Managers pages",
        "Dashboard auth: fix Cloudflare Zero Trust login — add GitHub OAuth IDP (OAuth App at github.com/settings/applications → callback: https://flat-queen-a958.cloudflareaccess.com/cdn-cgi/access/callback)"
      ],
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
        { label: "Roadmap index", path: "F:\\AI-Dev\\BIMpossible Site\\00_README.md" },
        { label: "IP lockdown checklist", path: "F:\\AI-Dev\\BIMpossible Site\\IP-Lockdown-Checklist.md" },
        { label: "Build log", path: "F:\\AI-Dev\\BIMpossible Site\\01_BuildLog" },
        { label: "Site code", path: "F:\\AI-Dev\\BIMpossible Site\\site" }
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
        reportPath: "F:\\AI-Dev\\BIMpossible Site\\01_BuildLog\\2026-07-10__audit-report-full.md",
        reportFile: "site/2026-07-10__audit-report-full.md",
        ledgerPath: "F:\\AI-Dev\\BIMpossible Site\\01_BuildLog",
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
      oneLiner: "Next.js pick'em app (PreseasonPickem-app). Stack locked, Phase 1 auth started.",
      status: "dormant",
      phase: "Phase 1 auth + scoring/rankings libs added 06-01 (status still flagged dormant pending human call)",
      focus: "Decide: resume before NFL preseason or park explicitly",
      progress: { label: "Build", phases: [
        { name: "P0 Bootstrap + stack", pct: 100,
          tasks: [
            { label: "Next.js + stack setup", status: "done" },
            { label: "Docker compose + scripts", status: "done" }
          ]
        },
        { name: "P1 Auth", pct: 25,
          tasks: [
            { label: "Auth lib scaffolded", status: "done" },
            { label: "User sessions + flows", status: "active", note: "Ref: 03_ChatExports/2026-05-24__phase1-auth.md" }
          ]
        },
        { name: "Picks + scoring MVP", pct: 30, note: "scoring engine/leaderboard + rankings sync libs in (06-01)",
          tasks: [
            { label: "Scoring engine lib", status: "done", note: "06-01" },
            { label: "Leaderboard lib", status: "done", note: "06-01" },
            { label: "Rankings sync (Sleeper / stats)", status: "done", note: "06-01" },
            { label: "Wire libs into app", status: "pending" },
            { label: "Pick submission UI", status: "pending" }
          ]
        },
        { name: "Deploy", pct: 0,
          tasks: [
            { label: "Hosting setup", status: "pending" },
            { label: "Production deploy", status: "pending", note: "Hard deadline: NFL preseason (August)" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-01", summary: "rankings (sleeper/stats/sync) + scoring (engine/leaderboard/manual-tiebreak) libs added" },
      branch: null, git: null,
      nextActions: [ "Resume Phase 1 auth per 03_ChatExports/2026-05-24__phase1-auth.md; wire the new scoring/rankings libs into the app" ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Idle since 2026-06-01 (27 days) - confirm dormant status; NFL preseason deadline approaching (August)",
        "Hard real-world deadline: NFL preseason (August)"
      ],
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
      oneLiner: "Revit family audit + standardize tool (Family Fixer). Python auditor actively built; focus on S&L One-Line electrical symbol families. Folder renamed from 'Families by AI' to 'Families by BIMpossible'.",
      status: "active",
      phase: "Git repo on GitHub (Families-by-BIMpossible), main in sync with origin. Continuous build through 06-28: per-type equipment profiles + display-recipe framework + XFMR standardized (06-13); XFMR_PROFILE expanded 5→12 params + 4 new shared params (06-27); device verifier + phase-1 handoff checklist (06-27); NetworkX remediation-order DAG — blast-radius + clusters + topo sort (06-28, 7fd2e48).",
      focus: "Run the auditor against a real .rfa repo to validate output; green-light Path B (live automation) only after validation passes.",
      progress: { label: "Two-path plan", phases: [
        { name: "Path A auditor build", pct: 78, note: "Actively built through 06-28; per-type equipment profiles, XFMR 5→12 params, device verifier, remediation-order DAG",
          tasks: [
            { label: "Tool scaffold + README", status: "done", note: "05-28" },
            { label: "Core auditor logic", status: "active", note: "Per-type profiles + display-recipe (06-13); XFMR 5→12 params (06-27); remediation-order DAG (06-28)" }
          ]
        },
        { name: "Path A validation", pct: 0,
          tasks: [
            { label: "Run against a real .rfa repo", status: "pending", note: "Must pass before Path B starts" }
          ]
        },
        { name: "Path B live automation", pct: 0,
          tasks: [
            { label: "revit-mcp integration design", status: "pending", note: "Not started - blocked on Path A validation" },
            { label: "Live automation build", status: "pending" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-06-28",
        summary: "feat(tool): NetworkX remediation-order DAG (blast-radius + clusters + topo) (7fd2e48)"
      },
      branch: "main",
      nextActions: [
        "Run the auditor against a real family repo to validate output; green-light Path B only after validation"
      ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Folder renamed 'Families by AI' to 'Families by BIMpossible' - REFRESH-SPEC families section updated 06-28; check any other stale links/specs",
        "Promoted paused→active 06-28: continuous build through 06-28 (NetworkX DAG, XFMR expansion, device verifier)"
      ],
      links: [
        {
          label: "Tool README",
          path: "F:\\AI-Dev\\Families by BIMpossible\\README.md"
        }
      ],
      recent: [
        "2026-06-28 - NetworkX remediation-order DAG: blast-radius + clusters + topo sort (7fd2e48)",
        "2026-06-27 - Device verifier + phase-1 handoff checklist + ideas backlog (7891090); XFMR_PROFILE expanded 5→12 params + 4 new shared params (b0d5f0b)",
        "2026-06-13 - device-class param profiles (CB/MTR/DISC) + 1:1 device param map (4a52fc2); per-type equipment profiles + display-recipe framework (a9fb7f0)",
        "2026-06-12 - session postmortem + approach decision (Approach B locked)",
        "2026-06-11 - git repo scaffolded (code-only, no .rfa binaries); 23 commits"
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
      phase: "Repo live + private (YourBIMpossible/AI-Server), CI green (pytest 3.10-3.12), branch-protected (PR + CI gate). Scaffold + Ollama setup + daily-digest automation shipped; WP-A core `aiserver` library landed (smoke-test + daily_digest refactored onto it). Next: finish WP-A via PR, then WP-B (RAG) + WP-C (automation suite) in parallel.",
      focus: "Run the Wave-1 Claude Code session: land WP-A via PR, then WP-B (RAG over AI-Brain-Data) + WP-C (automation suite) on parallel branches.",
      progress: { label: "Work packages", phases: [
        { name: "Foundation", pct: 100, note: "Repo + CI (pytest 3.10-3.12 green) + branch protection (PR+CI gate) + portable scaffold + smoke + first automation",
          tasks: [
            { label: "Repo + .gitignore/.gitattributes", status: "done", note: "06-16" },
            { label: "Ollama setup (Windows + Linux) + smoke test", status: "done" },
            { label: "daily_digest automation + Windows scheduler", status: "done" },
            { label: "GitHub Actions CI (pytest matrix)", status: "done" },
            { label: "Branch protection (PR + CI gate)", status: "done" }
          ]
        },
        { name: "WP-A Core library (aiserver)", pct: 80, note: "config + OpenAI-compatible client (chat+embed) + prompts + log + tests (5/5); scripts refactored onto it; PR-merge + final acceptance owed",
          tasks: [
            { label: "aiserver package + pyproject + tests", status: "done" },
            { label: "Refactor smoke-test + daily_digest onto aiserver", status: "done", note: "06-16" },
            { label: "Land via PR + final acceptance", status: "active" }
          ]
        },
        { name: "WP-B RAG / knowledge", pct: 0, note: "sqlite-vec index over AI-Brain-Data + BIMpossible docs; query CLI with citations; doc-drift detector",
          tasks: [
            { label: "Ingest + embed + incremental index", status: "pending" },
            { label: "Query CLI + drift report", status: "pending" }
          ]
        },
        { name: "WP-C Automation suite", pct: 10, note: "Job framework + weekly rollup + decision-drift; productionize digest",
          tasks: [
            { label: "daily_digest prototype", status: "done" },
            { label: "Job framework + weekly rollup + drift", status: "pending" }
          ]
        },
        { name: "WP-D Dashboard + integration", pct: 20, note: "This dashboard tab (D1) added 06-16; PC-Monitor GPU profile (D2) + offload weekly Revit-log task (D3) pending",
          tasks: [
            { label: "Dashboard AI-Server tab (D1)", status: "active", note: "added 06-16" },
            { label: "PC-Monitor GPU/inference profile (D2)", status: "pending" },
            { label: "Offload revit-log weekly task to local (D3)", status: "pending" }
          ]
        },
        { name: "WP-E/F/G Ops, eval, advanced", pct: 0, note: "Serving/ops hardening; eval-vs-Claude harness; advanced (Whisper meeting-notes, local coding-agent, QLoRA fine-tune)",
          tasks: [
            { label: "WP-E serving/ops hardening", status: "pending" },
            { label: "WP-F eval harness", status: "pending" },
            { label: "WP-G advanced (Whisper / coder / QLoRA)", status: "pending" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,2,0,2,0],
      lastActivity: {
        date: "2026-07-12",
        summary: "fix: resolve findings from the 2026-07-12 audit + carried-over mediums (f37d165)"
      },
      branch: "main at 6b057ac", git: null,
      nextActions: [
        "Run Wave-1 Claude Code session (handoffs/WAVE-1_kickoff.md): finish WP-A, then WP-B + WP-C in parallel PRs",
        "Merge WP-A via a CI-gated PR"
      ],
      pendingDecisions: [
        "3090 box OS (Ubuntu Server vs Windows) + runtime (Ollama now vs vLLM later) - see build plan"
      ],
      blockers: [],
      reminders: [
        "WP-A refactor: land via a CI-gated PR (main is PR-gated)",
        "Full code-audit report added 06-18 via PR #9 — review findings and action items",
        "3090 box not assembled yet - dev on the 5080; relocate via one .env line (OLLAMA_HOST)"
      ],
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
      phase: "Local-only git repo (no GitHub remote). Active daily — context logs + Revit-AI copy state committed on 2026-06-28. Post-graphify baseline shipped: 70 notes enriched, 12 MOCs created. Currently has 3 uncommitted files (copy-log.txt, copy-state.json, and a raw-logs folder for 2026-06-28). The vault feeds AI-Server WP-B (RAG over AI-Brain-Data docs).",
      focus: "Keep Revit-AI context current; feed AI-Server WP-B (sqlite-vec RAG index) when that work package starts.",
      progress: { label: "Workstreams", phases: [
        { name: "Vault foundation", pct: 100, note: "Obsidian vault live; MOCs, decision-log, standards-and-refs, revit-snippets all structured",
          tasks: [
            { label: "Initial vault structure + gitignore", status: "done" },
            { label: "Post-graphify enrichment (70 notes, 12 MOCs)", status: "done", note: "2026-06-28" }
          ]
        },
        { name: "Revit-AI context pipeline", pct: 60, note: "Copy-log + copy-state in place; raw-log capture running; ingestion into AI-Server not yet built",
          tasks: [
            { label: "copy-log.txt + copy-state.json pipeline", status: "active", note: "Updating daily" },
            { label: "Feed into AI-Server WP-B RAG index", status: "pending", note: "Blocked on AI-Server WP-B" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      lastActivity: {
        date: "2026-06-28",
        summary: "normalize line endings; remove Zai-brain embedded repo; post-graphify baseline (8e8b564)"
      },
      branch: "master (local-only, no remote)",
      git: { warn: "No GitHub remote — local-only git. Confirm whether this should stay private or get a private remote for backup." },
      nextActions: [
        "Commit 3 pending files: Revit-AI/context/copy-log.txt, copy-state.json, Revit-AI/raw-logs/2026-06-28/",
        "Start AI-Server WP-B RAG index build when WP-B work package begins"
      ],
      pendingDecisions: [
        "Should AI-Brain-Data get a private GitHub remote for offsite backup?"
      ],
      blockers: [],
      reminders: [
        "3 uncommitted files as of 2026-06-28: copy-log.txt, copy-state.json, raw-logs/2026-06-28/"
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
      phase: "main branch, synced with origin (YourBIMpossible/BIMpossible_Workspace). Last commit 2026-06-28. 73 uncommitted files — primarily _gstack-activation scratch, archived backups, and security-review queue digests. Key sources of truth: 00_Strategy/BIMpossible_PHASE-STATUS.md, WAVE-STATUS.md, STATE-LIVE.md.",
      focus: "Keep strategy ledgers (PHASE-STATUS, WAVE-STATUS, STATE-LIVE) current after each BIMpossible merge. Commit pending _gstack-activation + security-review digest files.",
      progress: { label: "Content areas", phases: [
        { name: "Strategy + ledgers", pct: 90, note: "PHASE-STATUS, WAVE-STATUS, STATE-LIVE live and updated regularly; Canonical Guide v2 reviewed 2026-06-23",
          tasks: [
            { label: "Phase status ledger (PHASE-STATUS.md)", status: "active" },
            { label: "Wave status ledger (WAVE-STATUS.md)", status: "active" },
            { label: "Auto-generated state (STATE-LIVE.md)", status: "active" },
            { label: "Commit pending security-review + gstack-activation files", status: "active", note: "73 files uncommitted as of 2026-06-28" }
          ]
        },
        { name: "Prompts + skills", pct: 80, note: "CLAUDE_CODE_STARTUP_PROMPT.md + PROJECT_CONTEXT.md + DEBUG_3_STAGE skill in place",
          tasks: [
            { label: "Claude Code startup prompt", status: "done" },
            { label: "Project context doc", status: "done" },
            { label: "DEBUG_3_STAGE skill", status: "done" }
          ]
        },
        { name: "Design proposals + architecture", pct: 70, note: "Phase 7 writeback proposal, Phase 5 visual-model-graph design doc in 00_Strategy/",
          tasks: [
            { label: "Phase 7 writeback two-options proposal", status: "done", note: "2026-06-23" },
            { label: "Visual model graph design doc", status: "done", note: "2026-06-28" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      lastActivity: {
        date: "2026-06-28",
        summary: "chore(memory): commit security-review-queue digest (scan 2026-06-28-093508) (51ef857)"
      },
      branch: "main at 51ef857; synced with origin",
      git: null,
      nextActions: [
        "Commit the 73 pending files (security-review queue digests, _gstack-activation scratch)",
        "Update PHASE-STATUS + WAVE-STATUS after next BIMpossible merge"
      ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "73 uncommitted files as of 2026-06-28 — mostly _gstack-activation and security-review artifacts"
      ],
      links: [
        { label: "Local workspace", path: "F:\\AI-Dev\\BIMpossible_Workspace" },
        { label: "Phase status", path: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_PHASE-STATUS.md" },
        { label: "Wave status", path: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md" },
        { label: "GitHub", path: "https://github.com/YourBIMpossible/BIMpossible_Workspace" }
      ],
      recent: [
        "2026-06-28 — chore(memory): commit security-review-queue digest (51ef857)",
        "2026-06-28 — chore: gitignore gstack activation scratch + archive tracked backups (2282a8e)",
        "2026-06-28 — chore(security): commit unattended scanner, ignore _triage-logs (f67c42b)"
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
      phase: "main branch, same remote as Dashboard (YourBIMpossible/ai-dev-dashboard). Waves 1–6 design system + strategy priority pass pushed to origin on 2026-06-28 (8dffb54). Auto clone needs fast-forward to pick up those 10 commits. 34 uncommitted files in auto-clone (expected between syncs).",
      focus: "CI/CD write target for automated data refreshes. Do not hand-edit — manual changes go in F:\\AI-Dev\\Dashboard instead. Fast-forward auto clone to origin/main to resolve the 10-commit lag from Waves 1–6 push.",
      progress: { label: "Automation pipeline", phases: [
        { name: "Sync scripts", pct: 85, note: "sync_activity.py, sync_ledgers.py, sync_dashboard.py, usage_sync.mjs, codebase_sync.mjs, agents_sync.mjs, github_actions_sync.mjs all present",
          tasks: [
            { label: "Activity sync (git log → data.js)", status: "done" },
            { label: "Ledger sync (PHASE-STATUS + WAVE-STATUS → data.js)", status: "done" },
            { label: "Usage sync", status: "active" },
            { label: "Hardened automation-clone refresh logic", status: "done", note: "2026-06-28 (e575b63)" }
          ]
        },
        { name: "GitHub Actions deploy", pct: 80, note: "deploy.yml + github-actions-live.yml present; Cloudflare Pages deploy pipeline",
          tasks: [
            { label: "Automated deploy on push", status: "done" },
            { label: "Live GitHub Actions sync", status: "active" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      lastActivity: {
        date: "2026-06-28",
        summary: "fix(refresh): harden automation-clone refresh (e575b63)"
      },
      branch: "main at e575b63; origin/main at 8dffb54 (10 commits ahead — fast-forward needed)",
      git: { warn: "Same remote as working Dashboard. 34 files uncommitted in auto clone. Do not hand-edit. Fast-forward to origin/main (8dffb54) to pick up Waves 1–6 + priority pass." },
      nextActions: [
        "Fast-forward auto clone: git -C F:\\AI-Dev\\Dashboard-auto pull --ff-only origin main",
        "Confirm scheduler still points to Dashboard-auto after fast-forward"
      ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Auto clone is 10 commits behind origin — fast-forward before next scheduled refresh or it will push stale data.js"
      ],
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
      phase: "No git — local-only (~404 files). Python collector (collector.py) + Flask web app (app.py) + SQLite (db.py). Last modified 2026-06-25. Packaged as a Windows-native install (install-task.ps1 → Task Scheduler; desktop shortcut at http://127.0.0.1:8787). Deep-capture mode (deepcapture.py) available.",
      focus: "Tool is operational. Integration with AI-Server WP-D (GPU/inference profile) is a pending work item.",
      progress: { label: "Features", phases: [
        { name: "Core monitoring", pct: 90, note: "Collector + SQLite + web dashboard + Windows auto-start installer all present and operational",
          tasks: [
            { label: "Python collector (~10s sample rate)", status: "done" },
            { label: "SQLite persistence (db.py)", status: "done" },
            { label: "Live + historical web dashboard (port 8787)", status: "done" },
            { label: "Windows Task Scheduler install (install-task.ps1)", status: "done" },
            { label: "Deep-capture mode (deepcapture.py)", status: "done" }
          ]
        },
        { name: "Packaging", pct: 50, note: "PyInstaller spec present; packaged zip exists; full portable install not confirmed working",
          tasks: [
            { label: "PyInstaller build (PC-Monitor.spec)", status: "active", note: "Spec + dist/ present; confirm build is current" },
            { label: "PC-Monitor-app portable package", status: "active", note: "Folder exists with 299 files" }
          ]
        },
        { name: "AI-Server integration", pct: 0, note: "GPU/inference profiling for AI-Server WP-D planned but not built",
          tasks: [
            { label: "GPU + inference profile for AI-Server WP-D", status: "pending", note: "Depends on AI-Server WP-D" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-06-25",
        summary: "Local file modification (no git history)"
      },
      branch: "N/A — local only, no git",
      git: null,
      nextActions: [
        "Confirm PyInstaller build is current and PC-Monitor-app.zip is up to date",
        "Wire GPU/inference profile into AI-Server WP-D when that work package starts"
      ],
      pendingDecisions: [
        "Should PC-Monitor be git-initialized and pushed to a private repo for version history?"
      ],
      blockers: [],
      reminders: [
        "No git — changes are not version-controlled; consider initializing a local repo",
        "PC-Monitor-app/ (299 files) may be a stale build artifact — confirm it's current before sharing"
      ],
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
      status: "active",
      phase: "No git — local Obsidian vault (~12 files). One note per project under Projects/, each with ## Phase headings and checkbox steps. Dashboard view (_Dashboard.md) surfaces only unchecked next steps. Last modified 2026-06-24.",
      focus: "Run manual smoke tests after each BIMpossible deployment. Refresh vault by re-reading per-repo runbooks after any major merge.",
      progress: { label: "Coverage", phases: [
        { name: "Vault setup", pct: 100, note: "Obsidian vault live; Tasks plugin; _Dashboard view; _Phase-Test-Template ready",
          tasks: [
            { label: "Obsidian vault + Tasks plugin", status: "done" },
            { label: "Dashboard + template", status: "done" }
          ]
        },
        { name: "Active test coverage", pct: 50, note: "Manually maintained; needs refresh after each BIMpossible deploy",
          tasks: [
            { label: "Refresh tests post true-prod deploy", status: "pending", note: "P6 true-prod deploy owed" },
            { label: "Add Phase 4c/4d smoke steps (conversation persistence, project-context grounding)", status: "pending" },
            { label: "Add Wave 4.9 / 4.10 smoke steps", status: "pending" }
          ]
        }
      ]},
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: {
        date: "2026-06-24",
        summary: "Local modification (no git)"
      },
      branch: "N/A — local only, no git",
      git: null,
      nextActions: [
        "Refresh test notes after true-prod deploy for P6 + smokes for Wave 4.9/4.10 + Phase 4c/4d"
      ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Open vault in Obsidian with Tasks plugin enabled for _Dashboard to work",
        "refresh-tests.py is superseded — re-read per-repo runbooks manually instead"
      ],
      links: [
        { label: "Test vault", path: "F:\\AI-Dev\\BIMpossible-Tests" },
        { label: "Dashboard view", path: "F:\\AI-Dev\\BIMpossible-Tests\\_Dashboard.md" }
      ],
      recent: [
        "2026-06-24 — last local modification"
      ]
    }
    /* PROJECT:bimpossible-tests:END */
  ]
};
