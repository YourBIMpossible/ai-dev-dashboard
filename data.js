// F:\AI-Dev project dashboard data (schema v4 - tasks added to phases)
// phases + waves: rendered from the BIMpossible ledgers by sync_ledgers.py (no LLM).
// prose fields: updated on source-repo push by sync_dashboard.py (fenced off phases/waves).
// daily 06:00 scheduled refresh + pre-push phase-numbering guard. See REFRESH-SPEC.md.
window.DASHBOARD_DATA = {
  generated: "2026-06-26",
  generatedBy: "scheduled refresh",
  activitySince: "2026-06-10",
  projects: [
    /* PROJECT:bimpossible:START */
    {
      id: "bimpossible",
      name: "BIMpossible Platform",
      icon: "layers",
      oneLiner: "Discipline-neutral BIM data platform above Autodesk's tools (reads ACC, custom interface, write-back later).",
      status: "active",
      phase: "PR #142 merged 2026-06-23 (9f6f55c): P11 Model QA rules engine + P8 Wizard committed to main; expr-eval CVE removed; audit remediation wave (relay frame guard, multi-tenant auth scoping). P6 true-prod deploy pending (4 Phase A migrations → head s1t2u3v4w5x6). P7 Revit Link write_instance_parameter live (single-user, flag=ON in pilot); DA4R co-equal engine proposed 2026-06-23. P11 QA engine live; P8 Wizard flag-gated. main at 9f6f55c; 1756 DB + 1223 pure BE tests.",
      focus: "True-prod deploy (runbook 06-12): alembic upgrade head (Phase A migrations → head s1t2u3v4w5x6), BIMPOSSIBLE_ADMIN_ENABLED/SECRET, prewarm DB cleanup → smoke Wave 4.10 + 4.9 + admin/My-Account. Then: DA4R vs Revit Link sequencing decision for P7.",
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
            note: "ACTIVE — Permanent, never-closing data substrate",
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
            pct: 93,
            note: "SHIPPED — 4a read-only + 4b HITL action assistant",
            tasks: [
              { label: "B2 rate-limit hardening", status: "done" },
              { label: "B2 byte-cap + deadline handling", status: "done" },
              { label: "B2 write-allowlist + injection guard", status: "done" },
              { label: "Assistant markdown + pill chrome", status: "done", note: "06-07" },
              { label: "Wave 4.8 close-out: D1-D7 ratification", status: "done", note: "Ratified 06-10" },
              { label: "Phase 4b action-enabled assistant (HITL)", status: "done", note: "06-11/12 — HITL approval SSE + /assistant/resume; smoke PASSED" },
              { label: "Schedule-push: staleness cadence, classifier rules, SPF ship location", status: "pending" }
            ]
          },
          {
            name: "P5 Views / Sheets / 3D / Workspace Coherence",
            pct: 15,
            note: "ON HOLD — Bonus, not a need (owner 2026-06-24). Pre-pilot/early wiring only (5.1/5.2 ViewPreset/Markups); 5.3/5.4 unconfirmed pending re-scan. Wave 9 (Forma) only affects how 5.1/5.3/5.5 viewer slices are hosted at resume. 5.5 Navisworks planned; Sheets gated OFF",
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
            note: "SHIPPED — Access tiers, usage metering, BYO keys; Client-Mgmt A/B/C/D; shipped via Wave 20 / PR #112",
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
            note: "ON HOLD — Co-equal engines, ship together. Revit Link live-except-sync; DA4R backend scaffolded (off). Owner gates: (1) add BIMpossible-AddIns repo, (2) \"go\" to re-enable sync. See proposal 2026-06-23 (§2 DoD) for exact acceptance criteria. Audit gate (hard — from `2026-06-21__AuditAndHistory_Pattern.md`): `edit_log` + `revit_link_request_log` migrations applied AND adapter writes to both tables on every call before Phase 7 can ship.",
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
            note: "BUILT (gated OFF) — First Autodesk-write feature; `aps_write.py` stubs. Audit gate: `provisioning_jobs_status_history` table present (per Audit & History Pattern §4) before going live.",
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
            pct: 60,
            note: "BUILT — flag-gated OFF — `qa_router` gated by `BIMPOSSIBLE_QA_ENABLED` (default OFF). Read-only QA rules + `.ids` import; was unnumbered (\"Phase 7-ish\")",
            tasks: [
              { label: "Rules engine (declarative Rule: applicability + requirement + IDS cardinality over a predicate library)", status: "done", note: "06-14 — backend/aec/qa/engine.py; pure, dependency-free" },
              { label: "4 starter rules (completeness / identity / correctness / classification families)", status: "done", note: "06-14 — adding a rule = a registry entry, no engine code" },
              { label: "Endpoints: GET /data/qa/rules + GET /data/qa/model-health (severity-weighted score, per-rule compliance, findings)", status: "done", note: "06-14 — 20 pure + 3 router tests; full suite green" },
              { label: "Commit + deploy the starter slice", status: "done", note: "PR #142 2026-06-23 — merged to main (9f6f55c)" },
              { label: "Frontend health panel + check_model_health assistant tool", status: "done", note: "PR #142 2026-06-23 — ModelHealth launcher/panel + client" },
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
          }
        ]
      },
      activity: [4,29,22,26,8,0,4,3,0,0,0,0,0,5],
      lastActivity: {
        date: "2026-06-23",
        summary: "PR #142 merged (9f6f55c): P11 Model QA rules engine + P8 Wizard + expr-eval CVE removal + audit remediation (relay frame guard, multi-tenant project_id scoping, auth logged warnings, aec edge cases)"
      },
      branch: "main at 9f6f55c; 0 ahead of origin",
      git: {
        warn: "Many merged feature branches still on origin (audit/*, refactor/data-tab-*, wip/phase5-*); prune retired remotes. Local fix/perp-audit-* may also be stale (content merged via PR)."
      },
      nextActions: [
        "True-prod deploy (runbook 06-12): alembic upgrade head (Phase A migrations → head s1t2u3v4w5x6), set BIMPOSSIBLE_ADMIN_ENABLED=1 + BIMPOSSIBLE_ADMIN_SECRET, DELETE stale done-rows in relationship_prewarm_jobs per model",
        "Post-deploy smokes: Wave 4.10 (Spec Draft launcher → modal + downloads); Wave 4.9 (ScheduleClassificationBar + ✦ badge); admin/My-Account KPI strip + firm onboard",
        "P7 DA4R + Revit Link sequencing: review 2026-06-23 Phase7_Writeback_TwoOptions_PROPOSAL.md, decide which engine to build first",
        "Drop _saved_views_snapshot_2026_05_24 — deadline TODAY 2026-06-23",
        "Add WAVE-STATUS.md rows for Waves 4.9 + 4.10 (shipped in git, missing from ledger)",
        "Commit + push P6 /account test branch: FE admin/account UI tests missing (AdminShell, FirmEditDrawer, ConfirmDialog, My Account)",
        "Install reportlab (requirements.txt) — PDF exports inert until added (CSV works)"
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
        "2026-06-23 - PR #142 merged (9f6f55c): P11 Model QA rules engine + P8 Wizard committed to main; expr-eval prototype-pollution CVE removed; relay frame guard + multi-tenant auth scoping + aec edge cases (audit remediation)",
        "2026-06-17 - Audit remediation batch: conftest pure-lane collect_ignore fix; FederatedViewer + annotations/viewPresets hardening (3 commits)",
        "2026-06-16 - Weekly audit batch (4 commits): relay hardening, auth_router/account_router silent-except fix, assistant multi-tenant firm-default race fix",
        "2026-06-13 - Client-Management UIs shipped (0e0242f): Admin Portal v2 (alert bar, KPI strip, firm list, triage panel, onboard wizard) + My Account dashboard (budget, BYO-key, cost-by-model); CI green.",
        "2026-06-12 - Client-Management Phase A backend (e749918): 8 tables / 4 migrations; Wave 4.10 spec library COMPLETE (32 JSONs, 3cf91a0); Wave 4.9 classification enrichment shipped (f207d41).",
        "2026-06-12 - Wave 7 all 3 smokes PASSED. Waves 16/20/21 shipped. Waves 11-14/17 discipline-schedule smokes all PASSED.",
        "2026-06-11 - Waves 5/6/6.5 shipped: XLSX export (PR #109), thin permissions (PR #110), HITL assistant (PR #111). Post-audit prod smokes: CORE-1 + SCHED-2 live PASS."
      ],
      audit: {
        lastRun: "2026-06-22",
        runType: "Weekly automated (Mon 6am); PR #142 2026-06-23 addressed findings (expr-eval CVE removed, relay hardened, auth scoped)",
        cadence: "weekly Mon 6am + on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 5,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\Audit Reports\\2026-06-16__code-audit.md",
        ledgerPath: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\_audit-runs.md",
        open: []
      },
      waves: {
        updated: "2026-06-25",
        source: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md",
        summary: { done: 26, built: 0, inFlight: 2, ahead: 4 },
        current: [
          { id: "1", title: "Foundation consolidation", status: "PARTIAL", date: "2026-05-28", note: "Open: confirm audit branches merged, apply Phase 3.5 migration to live DB, generate Alembic baseline (HIGH-8)" },
          { id: "15", title: "Civil schedules", status: "PARTIAL", date: "2026-06-13", note: "Civil probe-config + model-discovery work merged (`cf3b8ee` Merge feat/wave15-civil-probe-config; model-discovery (local merge c7ac2d5; feat 9145f88)). Adds `b…" },
          { id: "8", title: "Revit Link Phase 1 multi-user pass", status: "PLANNED" },
          { id: "9", title: "APS Forma embed evaluation", status: "PLANNED" }
        ],
        lastCompleted: { id: "22", title: "Panel workflow — per-circuit phase + load-type columns", date: "2026-06-25" },
        drift: []
      }
    },
    /* PROJECT:bimpossible:END */
    /* PROJECT:addins:START */
    {
      id: "addins",
      name: "Add-Ins / RevitLink",
      icon: "wrench",
      oneLiner: "Revit ribbon add-ins: BIMpossible.RevitLink (9/13 shipped + 8 BIM manager tools built) + Trade QA Scanner suite (6 trades deployed).",
      status: "active",
      phase: "06-12/13: setup-scaffold pass (zLink casing, LinkWorksetService, Tool 2 window rewrite, PR #3), SPF location consolidated to a single Project Info param, dashboard auto-sync workflow added; Tool 18 Batch Rename Views hardened 06-13 (strict preflight preview, atomic commit, case toggle, manifest). Current work on branch feat/model-audit-consolidation-2026-06-12. Earlier: Tools 10-13 shipped + Tools 14-21 built via TDD; all merged to main.",
      focus: "Tool 7 Phase 1 smoke test in Revit; then Definition of Done sweep (icons/guides/tooltips) for Tools 10-21",
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
      activity: [34,17,9,3,14,0,39,0,0,0,0,0,0,1],
      lastActivity: {
        date: "2026-06-23",
        summary: "refactor(revitlink): remove Anti-Worksets auto-stamp updater; bundle Duplicate Collection revisions (fddcaaf)"
      },
      branch: "overnight/tool-revisions-2026-06-16 (57 ahead of main)",
      git: {
        warn: "Branch overnight/tool-revisions-2026-06-16 is 57 commits ahead of main — large unmerged batch. Review before merging."
      },
      nextActions: [
        "Tool 7 Phase 1 (sheets) smoke test; Phase 2 = view placement",
        "Definition of Done sweep: icons + How-To guides + tooltip/F1 wiring for Tools 10-21",
        "QA Scanners: live smoke Architectural (4 tools, 21 tests); live spikes for E/M/P/FP/S collectors",
        "git init BIMpossible.RevitLink",
        "Update TOOL_BACKLOG.md: add Tools 14-21 to numbered backlog table with status",
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
        "Deferred: Deploy-Local.ps1 PS 5.1-safe; Revit dev-mode hot-reload"
      ],
      links: [
        { label: "Tool backlog", path: "F:\\AI-Dev\\Add-Ins\\TOOL_BACKLOG.md" },
        { label: "ModelQA consolidation decision (06-10)", path: "F:\\AI-Dev\\Add-Ins\\decision-log\\2026-06-10__modelqa-consolidation.md" },
        { label: "Audit fix pass (06-09)", path: "F:\\AI-Dev\\Add-Ins\\decision-log\\2026-06-09__audit-fix-pass.md" },
        { label: "Dev notes", path: "F:\\AI-Dev\\Add-Ins\\BIMpossible.RevitLink\\DEV-NOTES.md" }
      ],
      recent: [
        "2026-06-23 - refactor(revitlink): remove Anti-Worksets auto-stamp updater; bundle Duplicate Collection revisions (fddcaaf)",
        "2026-06-16 - overnight/tool-revisions batch shipped (39 commits): major tool-revisions wave on branch",
        "2026-06-13 - Tool 18 Batch Rename Views hardened (032b877): strict preflight preview, atomic commit, case toggle, manifest",
        "2026-06-12 - setup-scaffold pass (PR #3): zLink casing, LinkWorksetService, Tool 2 window rewrite; SPF param consolidated; dashboard auto-sync workflow added",
        "2026-06-11 - Tools 14-21 built + ribbon-wired (Warning Scanner, In-Place Families, Workset Audit, Element ID Finder, Batch Rename Views, VT Audit, Scope Box Manager, Batch PDF Export)"
      ],
      audit: {
        lastRun: "2026-06-09",
        runType: "google / perp / perf (on-demand)",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 9,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\Add-Ins\\audits\\2026-06-09__perp-audit.md",
        open: []
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
      activity: [1,1,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-11", summary: "LinkedIn Company Page published (linkedin.com/company/bimpossible); launch post live with link preview" },
      branch: null, git: null,
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
        "2026-06-11 - LinkedIn Company Page published (linkedin.com/company/bimpossible); launch post live",
        "2026-06-10 - WAF rate rule deployed; re-verified live: 5-hash CSP, 405 Allow, Turnstile on /contact, dead font 404 fixed, 13.7KB font subset",
        "2026-06-09/10 - All audit findings cleared + deployed; Lighthouse 100/100/100/100 across all 6 pages",
        "2026-06-09 - Triple audit (perf/architecture/code-review); contact form Turnstile + Web3Forms live; 13 e2e tests"
      ],
      audit: {
        lastRun: "2026-06-10",
        runType: "Full triple audit (perf + architecture + code-review) + re-verify 06-10",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        closedLastRun: 30,
        trend: "stable",
        reportPath: "F:\\AI-Dev\\BIMpossible Site\\01_BuildLog\\_site-audit-runs.md",
        open: []
      },
      git: {
        latestCommit: "55d2b61"
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
        "Idle since 2026-06-01 (12 days) - confirm dormant status; NFL preseason deadline approaching (August)",
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
      oneLiner: "Next.js demo app (Lazy Demo) with docker-compose + start/stop scripts.",
      status: "dormant",
      phase: "Unknown - no state doc exists",
      focus: "Capture a status note so this becomes trackable",
      progress: null,
      activity: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-04", summary: "CLAUDE-CODE-PROMPT.md added (06-04); app scaffold (package/prisma/scripts) touched 06-01" },
      branch: null, git: null,
      nextActions: [ "Write a status note - dashboard can't track this project until one exists" ],
      pendingDecisions: [],
      blockers: [],
      reminders: ["No state doc - tracking is folder-mtime only"],
      links: [
        { label: "README", path: "F:\\AI-Dev\\Laundry Gig\\README.md" },
        { label: "Docs", path: "F:\\AI-Dev\\Laundry Gig\\docs" }
      ],
      recent: []
    },
    /* PROJECT:laundry:END */
    /* PROJECT:families:START */
    {
      id: "families",
      name: "Families by BIMpossible",
      icon: "cube",
      oneLiner: "Revit family audit + standardize tool (Family Fixer). Python auditor actively built; focus on S&L One-Line electrical symbol families. Folder renamed from 'Families by AI'.",
      status: "paused",
      phase: "Now a git repo on GitHub (Families-by-BIMpossible). Active build 06-11/12/13. 06-12: 'Approach B locked' postmortem decision. 06-13: per-type equipment profiles + display-recipe framework added, XFMR standardized. main 1 commit ahead of origin (unpushed).",
      focus: "Run the auditor against a real .rfa repo to validate output; push the unpushed main commit",
      progress: { label: "Two-path plan", phases: [
        { name: "Path A auditor build", pct: 70, note: "Actively built 06-11/12/13; per-type equipment profiles + display-recipe framework + tests",
          tasks: [
            { label: "Tool scaffold + README", status: "done", note: "05-28" },
            { label: "Core auditor logic", status: "active", note: "Per-type equipment profiles + display-recipe framework added 06-13; XFMR standardized" }
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
      activity: [0,23,7,2,0,0,0,0,0,0,0,0,0,0],
      lastActivity: { date: "2026-06-13", summary: "per-type equipment profiles + display-recipe framework (a9fb7f0); device-class param profiles (CB/MTR/DISC) + 1:1 device param map (4a52fc2)" },
      branch: "main", git: { warn: "main 2 commits ahead of origin/main (unpushed) - repo is Families-by-BIMpossible on GitHub" },
      nextActions: [ "Run the auditor against a real family repo to validate output; push the unpushed main commit; green-light Path B only after validation" ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Folder renamed 'Families by AI' to 'Families by BIMpossible' - update stale links/specs (REFRESH-SPEC still references 'Families by AI')",
        "Heavy activity 06-11/12/13 (31 commits) but status held 'paused' per no-auto-promote rule - confirm promotion to active"
      ],
      links: [ { label: "Tool README", path: "F:\\AI-Dev\\Families by BIMpossible\\README.md" } ],
      recent: [
        "2026-06-13 - device-class param profiles (CB/MTR/DISC) + 1:1 device param map (4a52fc2); per-type equipment profiles + display-recipe framework (a9fb7f0); XFMR standardized",
        "2026-06-12 - session postmortem + approach decision (Approach B locked); dashboard auto-sync workflow",
        "2026-06-11 - git repo scaffolded (code-only, no .rfa binaries); 23 commits; Developmental/One Line Symbols folder updated"
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
      activity: [0,0,0,0,0,0,8,4,0,0,0,0,0,1],
      lastActivity: { date: "2026-06-23", summary: "docs: add 2026-06-18 full code-audit report (#9) (6b057ac)" },
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
      ]
    }
    /* PROJECT:aiserver:END */
  ]
};
