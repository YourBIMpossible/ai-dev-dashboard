// F:\AI-Dev project dashboard data (schema v4 - tasks added to phases)
// AUTO (daily 06:00 refresh from the Dashboard-auto clone): phases+waves from the BIMpossible
//   ledgers (sync_ledgers.py, no LLM); activity+lastActivity from git (sync_activity.py).
// MANUAL / on-demand: prose fields (phase, focus, oneLiner, recent, nextActions, branch, audit).
//   The GitHub-Models prose bot has no trigger on the code repos, so prose only moves on an
//   on-demand "refresh dashboard" pass and goes stale between passes. See REFRESH-SPEC.md.
window.DASHBOARD_DATA = {
  generated: "2026-07-23",
  generatedBy: "scheduled refresh",
  activitySince: "2026-07-10",
  projects: [
    /* PROJECT:bimpossible:START */
    {
      id: "bimpossible",
      name: "BIMpossible Platform",
      icon: "layers",
      oneLiner: "Discipline-neutral BIM data platform above Autodesk's tools (reads ACC, custom interface, write-back later).",
      status: "active",
      phase: "main at d2264eb (2026-07-20), 0 ahead of origin — but a QUIET week on main itself: only 2 commits landed since 07-16 (the WriteEngine contract 29e96da, then a cloud-ids/open-in-Revit feature d2264eb via #188). The real activity is on THREE unmerged draft PRs the ledger/main don't show: #186 (Phase 7 sync-token + DA4R scaffold, PLUS Phase 13 Change Set backend Domain A Stage 1 — real code for a phase the ledger still lists at 0%), #187 (stacked on #186 — the full SyncWithCentral re-enable behind a one-time token), #189 (Phase 8's last documented gap, provision-time elevated consent). All three: backend CI green, nothing merged, all Autodesk-write-adjacent paths shipped flag-OFF. The write-spine convergence plan (ratified 07-15) is now 2 of 5 items done (contract + gate unification, both merged 07-16); item 3 (Schedule Push re-spec) has a documented direction, not code; items 4/5 (audit boundary, doc reconciliation) recorded as decisions. The 07-20 autonomous weekly audit found the codebase's own trajectory positive — WSR8 fully closed — but surfaced a genuinely-new-urgency High: EventDispatcher.Execute() (Add-Ins) drains its whole request queue FIFO, so a rejected write can execute for real, unattended, on a later unrelated raise.",
      focus: "RE-1 (High, this week's audit headline): EventDispatcher.Execute() needs cancellation or ID-matched removal when Raise() is rejected — today an abandoned request (including a parameter write) silently executes later with nobody awaiting the result. Separately, get the three open draft PRs reviewed and merged in dependency order (#186 first — both #187 and the Phase 13 Change Set work stack on it) rather than letting them accumulate merge-conflict risk against a main that keeps moving. Close the branch-protection gap (enforce_admins=false — every required check, including the new Alembic guard, is a signal not a gate on the direct-to-main path). True-prod deploy still owed (runbook 06-12); Phase 15a's live pair+chat e2e in Revit is still the one owed human step there.",
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
            note: "ACTIVE — Permanent, never-closing data substrate. Phase 3.10 Cross-Model Joins: IN PROGRESS — 3.10a FUNCTIONALLY PROVEN 2026-07-15 (warm pipeline ran for real: 1,239 footprints + 14,873 origins from 0; join resolves real rooms through the real endpoint; AC-1/2/3 ALL PASS after the p50 perf fix, 215→18ms; flags still OFF — only the owner go-live flip remains, see §sub-phase notes); 3.10b Furniture slice SHIPPED (`4bb6497`); Doors design validated + now unblocked, not built; Ducts/Pipes awaits a product decision. Phase 3.8: minimal wedge DECIDED 2026-07-15, slice 1 shipped + prod-migrated (is_draft = membership-scoped per owner); slices 2-3 pending — see §sub-phase notes.",
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
            note: "LIVE — deployed on main 2026-07-22 — The product's FIRST live write to Autodesk — PROVEN 2026-07-22: a real ACC project was created + cloned from a firm project-template (folders + settings + central Revit model) through the Forma-native create-from-template path (`construction/admin/v1/accounts/{id}/projects`, 202→poll-active). UI: building-type dropdown (Autodesk's list), ACC project-template picker by NAME. 2026-07-22 simplification ([#207](https://github.com/YourBIMpossible/BIMpossible/pull/207), squash-merged): the redundant local-RVT *upload* step + its Model-template/Model-destination pickers were DROPPED once the template clone was confirmed to carry the central model — that upload was the only thing marking otherwise-successful runs `failed` (broken signeds3upload). A provision is now exactly create-from-template → reports clean `complete`. (Superseded PR #204, folder-picker fix, closed — its endpoint was deleted here.) Model-rename to `<number> - <name>` is HELD on an Autodesk C4R app-whitelist grant (the template's central model is a Collaboration-for-Revit cloud model; `PATCH items` → 403 \"client_id not whitelisted for schema items:autodesk.bim360:C4RModel\"); request doc `02_Reference/Phase8_C4R_API_Access_Request.md`; deliberately OUT of the critical path (founder 2026-07-22). Audit gate: ✅ `provisioning_jobs_status_history` present (`0055dd1`). Owed — founder-driven, physical-world only: (1) one supervised run witnessed as `complete` on the main deploy (needs the founder's Autodesk login + write-consent — cannot be automated); (2) archive the ZZZ/Testy/Chrome test projects in the ACC web UI (no public delete API).",
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
            note: "CONDITIONAL — Supersedes Phase 3.X Manufacturer Data Ingestion. Audit gate: all 5 new tables have `created_at`/`updated_at`; `product_type_binding_status_history` + `extraction_review_queue_status_history` tables present (per Audit & History Pattern §4). Spike status (2026-07-21): v1.0.1 label spot-check SIGNED OFF (8/8 blessed); GoldenSet v1.1 generalization corpus ASSEMBLED (30 fresh docs, 10 unregistered brands, 17-doc model population, owner-authorized web sourcing) + labeled; cold run 1 (0.3.1) NOT clean — one failure category: invalid values committed @ 0.95 for want of a validation layer (prose-as-manufacturer, accessory-codes-as-model ×3, prose-as-voltage). Owner-directed fix same day → parser 0.3.2 (single validation layer: candidate → validate → surface; invalid = forced abstain): all 4 wrong-value commits eliminated, model precision 1.00/fp 0.00, 45/45 spike tests, v1.0 golden regression numerically identical PASS. Run 2 (0.3.2) = CLEAN run #1; owner then ruled JC-1 (labels v1.1.1: COR1/COR2 → `Cooper Lighting Solutions`) + blessed JC-2…7, and run 3 (0.3.2 on v1.1.1) = CLEAN run #2 → STOP RULE SATISFIED 2026-07-21: manufacturer AND model precision 1.00 / fp 0.00 — zero wrong-value commits on a corpus where 22/30 docs are brands the registry has never seen. Raw table still FAILs f1/abstain by construction (correct abstains on unregistered brands; pre-registered reading: `_inbox/phase9-cutsheets/v1.1/GoldenSet_v1.1_labels_evidence.md`). Run 4 (confirmatory parity, zero code+label delta) established a frozen-labels clean pair (3+4), closing the run-2/3 relabel caveat. Gate reading — the raw f1/abstain FAIL is a PASS by construction (22/30 docs are unregistered brands where abstain IS truth); the criteria that decide it are stated explicitly as A1–A4 in `GoldenSet_v1.1_Plan.md` §\"What release-gate quality MEANS\": zero wrong-value commits on either field across both corpora ✓, zero false-accepts on unregistered brands (0/22) ✓, all registered brands present detected (6/6) ✓, two consecutive clean runs ✓. 🔒 SPIKE FROZEN at parser 0.3.2 (terminal state, owner decision 2026-07-21) — `extract.py` is now the reference implementation + acceptance tests, closed to further development; all future extractor work goes into the production reimplementation gated by the v1.0+v1.1 acceptance harness, with measured recall headroom enumerated as tickets P9-R1…R5 (each carrying a no-fp-regression constraint). Wiring still gated: Phase 7 + 6 owner decisions. Nothing wired into backend.",
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
          },
          {
            name: "P13 Augmentation & Write-back Layer",
            pct: 18,
            note: "ACTIVE — RATIFIED ACTIVE 2026-07-16 (owner). Frozen direction line: `2026-07-16 — Phase 13 (Domain A + promotion gate) → ACTIVE. Direction: A-first, no overhaul. Preserve existing discipline schedule views, Element Preview, and assistant; introduce Change Sets as the staged-change primitive; add Review + Push Center; and rewire EditParameterDialog/assistant from \"write to Revit now\" to \"stage,\" so engines and the promotion gate meet in the middle once Domain A reaches approved-state.` Build plan: `design-docs/change-set_build-plan_2026-07-16.md` (Domain A Stage 1, A-first, TDD, internal-DB only). Direction docs: `design-docs/UX_Research_ChangeLifecycle_Direction_2026-07-16.md` (owner-reviewed) + `DataInput_Interface_Gap_Analysis_2026-07-16.md`. Phase 13 = the augmentation/edit/review/promotion layer on top of the Phase 7 write-back engines (System α drives System β); Phase 7 remains the canonical engine layer — not absorbed. Build detail: `2026-06-24__Phase13_ProductizedDataEditing_Review_Pushback_PhaseDefinition_PROPOSAL.md` + package Docs 1–4. Companion WAVE-STATUS row (Wave 23) still unplaced.",
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
            note: "CONDITIONAL — Opt-in capability track: a local LLM with retrieval-augmented generation over BIMpossible docs, plus deterministic read-only Revit context injection, running inside the Revit add-in. Owner ruling 2026-06-25: scope = the full original vision (chosen over the narrower BYO/MCP-only recommendation); the analyst's risk caveats are carried as explicit gates/risks (§8–§9 of the proposal), not dropped. Definition: `2026-06-25__Phase14_LocalAIInference_RAG_RevitContext_PhaseDefinition_PROPOSAL.md` — still PROPOSAL / propose-only; this ledger row is the promotion step that doc called \"the separate human-reviewed step,\" placed 2026-07-15. Related local-inference R&D lives in the AI-Server project.",
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
            note: "ACTIVE — Native WPF dockable pane inside Revit that pairs to a BIMpossible web session with a single-use code and streams the existing `/assistant/chat` — same assistant + tools, docked in Revit. 15a (pair → pick project → chat): BUILT, not merged — backend `feat/phase15a-pane-pairing` (worktree `BIMpossible-phase15a-pairing`) + add-in `feat/phase15a-revit-pane` (worktree `Add-Ins-phase15a-pane`); 47 Assistant tests green, both TFMs clean, one owed human step = live pair+chat e2e in Revit. Later slices: 15b external-doc ingestion · 15c Revit-context injection · 15d model writes + confirm UI. Per `design-docs/write-spine-convergence_target_2026-07-15.md`, the pane is transport over the existing write spine, never a new write path — 15d must produce standard proposals through the shared adapter. ⚠️ No PhaseDefinition PROPOSAL doc exists for Phase 15 — unlike 13/14 it entered build without the ratification artifact; row placed 2026-07-15 from the built reality (`Add-Ins/BIMpossible.RevitLink/Assistant/README-Phase15a.md`) so the ledger stops under-reporting active work.",
            tasks: [
              { label: "15a — pair to web session, pick project, chat", status: "active", note: "BUILT on two unmerged branches; 47 Assistant tests green, both TFMs clean. Owed: live pair+chat e2e in Revit, then merge" },
              { label: "15a live e2e (human): pair with an 8-char code, pick project, stream a reply, verify token survives a Revit restart", status: "pending", note: "The one remaining step per README-Phase15a.md; needs flags on + a fresh Revit launch" },
              { label: "Write a Phase 15 definition doc", status: "pending", note: "Phases 13/14 have PhaseDefinition PROPOSALs; Phase 15 entered build with none" },
              { label: "15b — external-doc ingestion", status: "pending" },
              { label: "15c — Revit-context injection", status: "pending" },
              { label: "15d — model writes + confirm UI", status: "blocked", note: "Gated on Phase 7. Must ride the shared write spine (standard proposal → shared adapter), never a new write path; a write approval-request is politely declined in 15a" }
            ]
          },
          { name: "P16 Desktop Orchestration Hub — MCP-First, Gated GUI Exception Path", pct: 10, note: "CONDITIONAL — Persistent local orchestration hub for cross-tool workflows (Revit, BIMpossible Site, filesystem/git, reporting) via explicit, scoped MCP servers as the default path; GUI/desktop automation admitted only as a named, allowlisted exception for apps with no workable API — under explicit consent, sandboxing, and audit logging, never a general \"control my desktop\" mode. Full rationale, architecture, and the 3-condition go/no-go ratification test: `2026-07-23__Phase16_DesktopOrchestrationHub_PhaseDefinition_PROPOSAL.md`. PROPOSAL — not ratified, not scheduled; placed at the end of the ledger deliberately." }
        ]
      },
      activity: [20,16,15,3,10,16,5,0,0,0,2,36,9,0],
      lastActivity: {
        date: "2026-07-22",
        summary: "docs(phase8): decision-log â€” wizard go-live, drop model-upload step, C4R rename held (#209) (d0bd995)"
      },
      branch: "main at a7a434c; 0 ahead of origin",
      git: {
        warn: "Many merged feature branches still on origin (audit/*, refactor/data-tab-*, wip/phase5-*); prune retired remotes. Local fix/perp-audit-* may also be stale (content merged via PR)."
      },
      nextActions: [
        "Fix RE-1 (High, this week's audit): EventDispatcher.Execute() needs cancellation or ID-matched removal when Raise() is rejected — an abandoned request (incl. a parameter write) otherwise executes for real, unattended, on a later unrelated raise. Add the proving test first (force a reject, then a second raise, assert the first never dispatches)",
        "Merge the 3 open draft PRs in dependency order before main drifts further from them: #186 (Phase 7 sync-token/DA4R scaffold + Phase 13 Change Set backend) first, then #187 (stacks on #186 — full SyncWithCentral re-enable), then #189 (Phase 8 elevated-consent token, independent)",
        "Close the branch-protection gap: enforce_admins=false + no required-PR-review means the Alembic multi-head guard and every other required check is a signal, not a gate, on the direct-to-main path Push-And-Verify.ps1 actually uses",
        "Add a dependabot.yml to the split-off Add-Ins repo — its NuGet deps get no automated CVE/update PRs today",
        "Reconcile the two rival unmerged shared-parameters branches (phase9-cloud-ids 'PARKED, do not ship' vs. the newer Revit-2026-verified registry) before a third attempt gets built",
        "True-prod deploy (runbook 06-12): alembic upgrade head, set BIMPOSSIBLE_ADMIN_ENABLED=1 + BIMPOSSIBLE_ADMIN_SECRET, DELETE stale done-rows in relationship_prewarm_jobs per model"
      ],
      pendingDecisions: [
        "Phase 3.10b Ducts/Pipes: output shape (list vs. from/to pair) — still undecided; the categories are explicitly excluded in _PHASE3_10_IN_SCOPE_CATEGORIES until it lands",
        "Schedule-push: staleness cadence, classifier rules, fidelity degradation list, SPF ship location (scoped as a write-spine ORIGIN, direction only — no code yet)",
        "Wave 16 Interiors: build dedicated shapers for Ceilings/Flooring now or batch with Wave 15 Civil?",
        "Phase B admin auth: Google OAuth client + env (AUTH_GOOGLE_ID == backend GOOGLE_CLIENT_ID); B0 unify legacy admin routes onto require_admin (Option A chosen)",
        "Phase 13 ledger ratification (flip PLANNED → ACTIVE) — Q1/Q2 scoping WAS decided 2026-07-16 and code exists on a draft PR, but the ledger status itself hasn't moved; Phase 14 promotion and a Phase 15 definition doc are still owed too"
      ],
      blockers: [],
      reminders: [
        "Branch protection has enforce_admins=false and no required-PR-review, and Push-And-Verify.ps1 pushes direct to main as admin — required checks (incl. the Alembic single-head guard) are a SIGNAL, not a gate, on the real push path.",
        "Write-spine convergence (ratified 2026-07-15): 2 of 5 items done and merged (contract 29e96da, gate unification df7add1, both 07-16). Item 3 (Schedule Push re-spec) has a direction, no code; items 4/5 recorded as decisions. DA4R now has a scaffold (Da4rAdapter satisfies the Protocol) but stays deliberately unregistered/unreachable — still no real execution path.",
        "3 draft PRs open and stacking (#186 → #187) against a main that keeps moving — the longer they sit unmerged the more conflict risk accumulates, same pattern flagged for the shared-parameters branches",
        "Phase 3.10a's _most_common_phase is single-phase-only by design (self-documented); needs real per-element Phase data or an explicit picker before multi-phase projects rely on it",
        "True-prod deploy owed: alembic upgrade head + 2 env vars + prewarm DB cleanup — gates Wave 4.9/4.10/admin/My-Account live smokes",
        "reportlab not installed → aec/exports.py PDF routes inert (CSV works); add before Phase C /account/export/*.pdf",
        "My Account shows graceful 'not linked' state until founder's Autodesk user gets an active user_firm_memberships row"
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
        "2026-07-21 - docs(strategy): land the 2026-07-21 ProjectRecipe set (decision brief v2, direction summary, gap analysis, panel synthesis)",
        "2026-07-20 - Weekly audit: WSR8 fully resolved + 4 conditional gaps closed alongside it; RE-1 (EventDispatcher queue-drain in the Revit add-in) surfaces as the new High, traced end-to-end for the first time",
        "2026-07-20 - feat(open-in-revit): cloud-ids endpoint + R-button wiring merged via #188 (d2264eb) — first main-branch commit since the WriteEngine contract 4 days earlier",
        "2026-07-16/20 - 3 substantial draft PRs opened, all still unmerged: #186 (Phase 7 sync-token + DA4R scaffold, plus Phase 13 Change Set backend Domain A Stage 1 — real code for a phase the ledger lists at 0%), #187 (stacked on #186 — full SyncWithCentral re-enable behind a one-time token), #189 (Phase 8's provision-time elevated-consent token, closing its last documented gap)",
        "2026-07-16 - Write-spine convergence items 1+2 DONE, both merged same day: WriteEngine contract (29e96da — Protocol + engine enum + gated seam) and gate unification (df7add1 — live-write auth unified on the fail-closed check_firm_model_editor, the two hand-mirrored gate functions merged)",
        "2026-07-15 - Phase 3.10a PROVEN LIVE: first-ever warm + join against a real cloud project (a4ecece) after the externalElementId↔native-id bridge fix (c2d5756); AC-1 closed via the real endpoint, AC-3 FAIL→PASS with p50 215ms→18ms via room-pool cache + bbox pre-filter (7f8735f/413adf8) — the blocker two audits called the #1 issue",
        "2026-07-15 - WSR8 step 2 wired: fail-closed check_firm_model_editor role (92738b3) → gated LLM→live-Revit parameter write (9713356, flag OFF); marked BUILT+SHIPPED (8114f8e)",
        "2026-07-15 - Phase 3.8 restarted: owner ratified the minimal wedge (b0369de); slice 1 ACC role-sync columns + is_draft landed inert (48c4826); is_draft moved to user_firm_memberships for per-user draft mode (d5cee40)",
        "2026-07-15 - Write-spine convergence target RATIFIED (9eccdc6): one proposal contract + one permission gate + one audit trail; pluggable origins (spreadsheet, AI, in-Revit pane, batch) and engines (Revit Link, DA4R). Schedule-Push's designed gate-bypass overturned by banner",
        "2026-07-15 - Day-2 Phase 3 audit (5 evidence agents) — written 18:40, then overtaken by its own findings' fixes the same evening; ProgramPlan Wave-22 cross-refs corrected (7be8f6a)",
        "2026-07-14 - Phase 3 production-readiness audit + same-day fixes: Alembic single-head CI guard (1e07550), Dockerfile Phase 3.10a flag ARG/ENV (a2a4a23), frontend per-row status + flag-on crash guard (87ca90c), PHASE-STATUS.md + WAVE-STATUS.md corrected (f07ebb9)",
        "2026-07-13/14 - Prod outage root-caused + fixed: 351 backend container restarts from two migrations landing with no backend-migrate run",
        "2026-07-13 - Weekly full audit + same-day closeout: WSR8 (assistant Revit-write auth gate) + 16 other findings — 11 shipped in code/config, 6 accepted owner decisions, zero dangling (c4194c5, b6bb96f)",
        "2026-07-12/13 - Phase 3.10a Cross-Model Room Join merged + migrated to prod (dd5adb1); warm-time writer gap found+fixed next day (c72f647/09cb66b); Phase 3.10b Furniture slice shipped (4bb6497); dynamic firm resolution P3-8-DYN shipped (72e88f8)",
        "2026-06-28 - PRs #153–#157 merged: Embedded Assistant Phase 4c (conversation persistence + stop-and-edit) + Phase 4d project-context grounding; NetworkX graph-topology tools + Model Health graph checks (#157) + permission-flow graph tool; report-only security-scan + BIM semgrep + prose-flag hook; trivy CI pin (main 80d3407)",
        "2026-06-23 - PR #142 merged (9f6f55c): P11 Model QA rules engine + P8 Wizard committed to main; expr-eval prototype-pollution CVE removed; relay frame guard + multi-tenant auth scoping + aec edge cases (audit remediation)",
        "2026-06-13 - Client-Management UIs shipped (0e0242f): Admin Portal v2 + My Account dashboard (budget, BYO-key, cost-by-model); CI green"
      ],
      audit: {
        lastRun: "2026-07-20",
        runType: "Weekly full audit — scheduled, autonomous, read-only through findings-gathering, user not present. 3 parallel lens sub-agents (Backend/data/ops, Frontend, Revit-relay/add-in+CI+ops+tests) plus direct re-verification of load-bearing claims. Auto-Fix Pass at the end applied 0 fixes — the sandbox has no Docker/PowerShell, so every candidate fix was routed to human-review rather than applied unverified. Nothing here was overtaken same-day (unlike 07-14/07-15) — this is a clean read of genuinely current state.",
        cadence: "weekly Mon 6am + on-demand",
        counts: {
          critical: 0,
          high: 1,
          medium: 6,
          low: 4,
          info: 2
        },
        closedLastRun: 5,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\Audit and Scan Info\\weekly-full-audit_2026-07-20.md",
        reportFile: "bimpossible/weekly-full-audit_2026-07-20.md",
        ledgerPath: "F:\\AI-Dev\\BIMpossible_Workspace\\02_Reference\\_audit-runs.md",
        open: [
          { id: "RE-1", sev: "high", title: "EventDispatcher.Execute() drains its whole pending-request queue FIFO on every successful Raise() — when an earlier request's Raise() was REJECTED, the pipe server already errored that caller but the request stays queued and its DispatchCommand (incl. write_instance_parameter) executes for real on the next unrelated raise, with no one awaiting the result. Traced end-to-end for the first time this cycle (both files read together); safe today only because the pipe is single-connection. Carried since the original foundation audit.", where: "Add-Ins/BIMpossible.RevitLink/EventDispatcher.cs:41-55 · PipeServer.cs:150-184" },
          { id: "ARCH-NEW-2", sev: "medium", title: "aec/router.py is still exactly 2,828 lines (~55 handlers) — unchanged, accepted-deferred, domain split at next major touch.", where: "backend/aec/router.py" },
          { id: "RE-2", sev: "medium", title: "Single-pipe-instance (maxNumberOfServerInstances:1) vs. the relay's 4-worker thread pool — the pool exists for wedge-isolation, not real concurrency; only one worker holds the pipe at a time, others get a clean retryable 503. Caps Revit-link throughput by design; needs RE-1 fixed first before raising the instance cap.", where: "PipeServer.cs:82,97 · relay.py:107-108,325-336" },
          { id: "ARCH-5", sev: "medium", title: "No formal production deployment path beyond single-host compose + cloudflared tunnel — no blue/green, no rollback. Accepted foundational-deferred, unchanged across cycles.", where: "docker/docker-compose.yml" },
          { id: "SEC-3", sev: "medium", title: "wizard/gate.py validates hub_id by allowlist membership, not real per-user Autodesk hub membership — latent IDOR once multi-tenant; today produces orphaned/misattributed rows at worst, no APS write at plan time. Carried, accepted per the Verification Checklist.", where: "backend/wizard/gate.py:49-66" },
          { id: "ARCH-ENGINE-BYPASS", sev: "medium", title: "A read-only drift-check baseline read constructs RevitNativeAdapter() directly instead of via the sanctioned get_engine() factory — no security impact (read-only, not the source-scan-protected write path), but cracks the 'one engine factory' invariant and produces a worse error message on relay misconfiguration.", where: "backend/aec/assistant_write_tools.py:484-490" },
          { id: "SEC-DEPENDABOT-ADDINS", sev: "medium", title: "The post-split Add-Ins repo has no .github/dependabot.yml of its own — its NuGet deps (Nice3point.Revit.Api.* etc.) get no automated CVE-advisory/update PRs, unlike the main repo's pip/npm coverage. First cycle to explicitly scope-check the split repo's supply-chain posture.", where: "Add-Ins/.github/ (absent)" },
          { id: "RE-NEW-3", sev: "low", title: "Nightly Backup-Db.ps1 failure (2026-07-12) had no alerting path; the webhook mechanism built in response ships dormant (BACKUP_ALERT_WEBHOOK unset) — not re-verified this cycle since no new failure occurred, but the gap itself remains unactivated.", where: "Send-BackupAlert.ps1 · BACKUP_ALERT_WEBHOOK unset" },
          { id: "CQ-WSR8-DOC", sev: "low", title: "Two docstrings on the write path were never updated after the gate-unification commit and now describe a superseded/wrong gate — still claim 'no permission gate beyond the flag' / 'check_firm_view_editor is the effective gate', both false; the actual gate is the independent fail-closed check_firm_model_editor. Code is correct and tested; only the comments are wrong.", where: "backend/aec/assistant_parameter_writes.py:13-23 · assistant_write_tools.py:457-463" },
          { id: "FE-3", sev: "low", title: "model/page.tsx god-component grew to 3,327 LOC (was 2,847 at the last dedicated pass) — deliberately deferred pending a 5k-element benchmark trigger (DT6), not an oversight, but the gap compounds.", where: "frontend/app/project/[id]/model/page.tsx" },
          { id: "ARCH-4", sev: "low", title: "Source/AST-scan tests remain the dominant shape for several 'no bypass' invariants (test_engines.py, parts of test_phase1_safety.py) — a rename preserving behavior could break the test, or a determined bypass not matching the literal pattern could slip through. Some are deliberately AST-based per in-code rationale.", where: "backend/tests/revit_link/test_engines.py:163-181" },
          { id: "SEC-CLOUD-1", sev: "info", title: "EMEA region is inferred from URN convention, not API-confirmed — misrouting risk on EMEA calls, low likelihood, unexercised (no EMEA hub onboarded). Carried, accepted.", where: "backend/aps/cloud_ids.py" },
          { id: "ARCH-ADDINS-TEST-COUNT", sev: "info", title: "Add-Ins xunit count re-verified at 634 this run vs. 643 reported last week (-9), no documented methodology for the prior number — most likely legitimate test consolidation from this week's naming-collision perf-fix commits, not a coverage loss. Flagged so next week's baseline can reconcile rather than silently drift.", where: "BIMpossible.RevitLink.Tests (634 Fact/Theory)" }
        ],
        history: [
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
        ]
      },
      waves: {
        updated: "2026-07-14",
        source: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md",
        summary: { done: 29, built: 3, inFlight: 1, ahead: 4 },
        current: [
          { id: "15", title: "Civil schedules", status: "PARTIAL", date: "2026-06-13", note: "Civil probe-config + model-discovery work merged (`cf3b8ee` Merge feat/wave15-civil-probe-config; model-discovery (local merge c7ac2d5; feat 9145f88)). Adds `b…" },
          { id: "26", title: "Phase 3.10a Cross-Model Room Join", status: "BUILT", date: "2026-07-13", note: "Code merged `dd5adb1` (2026-07-12); warm-time writer gap found+fixed `c72f647`/`09cb66b` (2026-07-13); migration genuinely applied to prod (confirmed live). No…" },
          { id: "28", title: "Phase 3.10b Furniture slice", status: "BUILT", date: "2026-07-12", note: "`4bb6497`, reuses 3.10a's algorithm unchanged. Inherits Wave 26's never-executed-pipeline gap — same caveat applies." },
          { id: "29", title: "WSR8 write-primitive cluster (assistant-Revit-write auth gate + reliability hardening)", status: "BUILT", date: "2026-07-13", note: "`c4194c5`, real GitHub Actions CI green. `execute_proposal` has zero production callers, enforced by a real AST-based test in the required CI gate — correctly,…" },
          { id: "8", title: "Revit Link Phase 1 multi-user pass", status: "PLANNED" },
          { id: "9", title: "APS Forma embed evaluation", status: "PLANNED" }
        ],
        lastCompleted: { id: "27", title: "Dynamic firm resolution (P3-8-DYN)", date: "2026-07-12" },
        drift: []
      }
    },
    /* PROJECT:bimpossible:END */
    /* PROJECT:addins:START */
    {
      id: "addins",
      name: "Add-Ins / RevitLink",
      icon: "wrench",
      oneLiner: "Revit ribbon add-ins: BIMpossible.RevitLink (9 tools SHIP, Check Conflicts newly wired, 2 retired) + Trade QA Scanner suite (6 trades deployed).",
      status: "active",
      phase: "main at a661924 (2026-07-20), synced with origin. New this week: **Open-in-Revit** — a bimpossible:// protocol handler (new BIMpossible.OpenInRevit project: strict URI validation, registry-based Revit locator, exact-version-only launch policy, atomic pending-open.json handoff, HKCU registration via Deploy-Local.ps1 --register, no admin needed) plus RevitLink's PendingOpenWatcher consumer — pairs with the BIMpossible backend's new cloud-ids endpoint + web R-button (#188) so clicking 'Open in Revit' on the web app actually launches the right model. New xunit suite for the pure parts. Two more draft PRs open, unmerged: #11 (Phase 7 step-2, add-in side — remove the SyncWithCentral force-guard in lockstep with the backend's confirmation flow, stacks with BIMpossible PR #187) and #12 (Family Fixer: probe_family/add_shared_params/go_single_panel pipe operations). Prior week: the 2026-07-12 audit CLOSED (C-01 disproven, all 10 highs fixed) and the CI gap that was C-01's real lesson closed same week (CI now compiles RevitLink on both TFMs).",
      focus: "Merge #11 (Phase 7 step-2, add-in side) in lockstep with BIMpossible's #187 — they're two halves of the same re-enable and will drift if one lands without the other. Ribbon icon/tooltip polish pass still postponed: 20/37 buttons missing ToolTipImage, Place Callout Sheets' placeholder icon. M-14 (split-level sheet title marker) needs a signature-level redesign — deferred, not scheduled. Live-verify the Retag All Rooms orphan-tag fix in Revit (shipped without that confirmation). QA Scanners: live smoke Architectural (4 tools, 21 tests); live spikes for E/M/P/FP/S collectors.",
      progress: { label: "Tracks", phases: [
        { name: "RevitLink tools (9 SHIP, 2 retired, 1 future)", pct: 78, note: "2026-07-14 audit closeout: Tool 7 (Build Sheet Set from Arch Link) retired — superseded by Tool 2 Scaffold, a strict superset. Check Conflicts wired to Sync panel (was built since 06-02, never given a ribbon face).",
          tasks: [
            { label: "Sync with Central, ARCH Mode Scan, Fix Title Blocks, Retag Rooms, Push View Templates, Trim Sheets, Create Callout Views, Batch Rename, Place Callout Sheets", status: "done", note: "9 tools SHIP" },
            { label: "Check Conflicts", status: "done", note: "wired 2026-07-14 — worksharing checkout pre-flight, before Sync with Central" },
            { label: "Build Sheet Set from Arch Link", status: "done", note: "RETIRED 2026-07-14 — deleted, superseded by Tool 2 Scaffold" },
            { label: "Batch PDF Export", status: "done", note: "RETIRED 2026-07-14 — deleted, thin Revit-exporter wrapper; Sync Print Sets already does it better" },
            { label: "Place Panel Schedules + Key Plan / Link Multi-Page PDFs", status: "pending", note: "IDEA stage" }
          ]
        },
        { name: "Duplicate Collection / Replicate Levels", pct: 75, note: "2026-07-14: major feature landing — new Replicate Levels tab (stamp a completed source level onto target levels), multi-pair view-rename autofill (detects every discipline in a mixed selection), rollback/atomicity gate now unit-tested (H-09)",
          tasks: [
            { label: "Core duplicate/replicate engine + rollback atomicity", status: "done", note: "ExecutionUnitDecision extracted + unit-tested" },
            { label: "Replicate Levels tab", status: "done", note: "supersedes the buried MultiLevelReplicateSection" },
            { label: "Multi-pair view-rename autofill (all disciplines)", status: "done" },
            { label: "Template remap store + smart-match", status: "done" }
          ]
        },
        { name: "QA scanners (6/7 deployed)", pct: 72, note: "Core consolidated + audit-hardened; live smokes owed",
          tasks: [
            { label: "6 trades deployed", status: "done" },
            { label: "ModelQA.Core consolidated + dedicated Core.Tests project", status: "done", note: "06-10 consolidation; 07-14 split Core's tests into their own Revit-free project (MI-11)" },
            { label: "Discipline collector silent-failure fixes", status: "done", note: "07-14 — Electrical CapacityVa + Plumbing CountOpenPipingConnectors no longer read a broken element as healthy" },
            { label: "Architectural live smoke (4 tools, 21 tests)", status: "active" },
            { label: "E / M / P / FP / S live spikes", status: "pending" },
            { label: "Civil scanner (Trade 7)", status: "pending", note: "Scope decision parked — unanswered" }
          ]
        }
      ]},
      activity: [12,16,6,0,16,19,4,0,0,0,1,12,2,0],
      lastActivity: {
        date: "2026-07-22",
        summary: "fix(open-in-revit): widen the pending-open TTL 120sâ†’300s for cold-start boots (#24) (c188a19)"
      },
      branch: "main; synced with origin",
      git: null,
      nextActions: [
        "Merge PR #11 (Phase 7 step-2, add-in side) together with BIMpossible's #187 — same re-enable, split across two repos, will drift if landed separately",
        "Review PR #12 (Family Fixer: probe_family/add_shared_params/go_single_panel pipe operations, DRAFT since 07-16)",
        "Ribbon icon/tooltip polish pass: wire ToolTipImage for 20/37 buttons, fix Place Callout Sheets' placeholder icon",
        "M-14: signature-level redesign for LevelSheetTitle.Build's split-level continuation marker",
        "Live-verify Retag All Rooms' orphan-tag fix (95c0ba4) in Revit — shipped without that confirmation",
        "QA Scanners: live smoke Architectural (4 tools, 21 tests); live spikes for E/M/P/FP/S collectors",
        "Git hygiene: remove 3 merged/identical worktrees under .claude/worktrees/; resolve 5 unmerged conformance branches (owner sign-off needed, all fork from an aging main)"
      ],
      pendingDecisions: [
        "Civil Shared-Coordinate Audit scanner - scope unanswered (PARKED)"
      ],
      blockers: [],
      reminders: [
        "Core.dll co-loads in one Revit process: redeploy ALL add-ins together when Core changes",
        "RoomTagger.TagView:105 still swallows NewRoomTag failures in the fresh-tag pass (flagged, deliberately not fixed 07-14 — changes a shared signature)",
        "3 stale/missing Trim Out-of-Scope Sheets guide screenshots (M-30, reclassified from a safety finding — the guide's toggle warning text is correct and complete; only images are stale, and they err safe)",
        "MI-19/MI-20: stale worktrees + 5 unmerged conformance branches — deferred, destructive git ops need explicit sign-off",
        "Deferred: Deploy-Local.ps1 PS 5.1-safe; Revit dev-mode hot-reload"
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
        "2026-07-20 - feat(open-in-revit): bimpossible:// protocol handler (new BIMpossible.OpenInRevit project) + RevitLink PendingOpenWatcher (a661924) — pairs with BIMpossible's cloud-ids endpoint (#188) so the web app's 'Open in Revit' button actually launches the model",
        "2026-07-15 - CI gap CLOSED (d292a38): CI now compiles RevitLink on both TFMs (net48 + net8.0-windows) — the real lesson C-01 pointed at, even though C-01 itself was a false positive. Same commit fixed 3 latent twins of audit findings M-21/M-10/M-28",
        "2026-07-15 - Panel schedules: grid-aligned rows across columns, copy ALL start-sheet detail items (not just the legend), clear key-plan/level/north-arrow, propagate Sheet Collection (48dde6f/864a672)",
        "2026-07-15 - Duplicate tool UX: nothing pre-checked by default + shift-click range-select, Check-all/Uncheck-all act on the full dataset (not just visible filter results), naming-collision perf fix (c40ac1c/9fd4791/65dfa51)",
        "2026-07-15 - Progress popup for every long-running loop across the suite (cc07730/3368097); Place Callout Sheets popups follow the real Revit theme (23f9d45); Section Clip derives datum from section geometry (3ab69fb)",
        "2026-07-14 - 2026-07-12 audit CLOSED: C-01 disproven (clean net48 build), all 10 highs fixed, Check Conflicts wired, 2 dead tools retired (audits/2026-07-12__audit-resolution.md)",
        "2026-07-14 - feat(revitlink): Replicate Levels tab, Duplicate UX, panel-schedule packing + legend fixes (98c515b)",
        "2026-07-14 - fix(retag-rooms): orphaned '?' tags were silently skipped and never reported — owner-caught bug (95c0ba4)",
        "2026-07-14 - fix(ribbon): tooltip images were 5x over Revit's 355px limit — stripped 16 oversized images + fixed the capture recipe (6a5a48f)",
        "2026-07-14 - fix(theme): last two theme-blind popups (Room Data, Electrical Param Sync) now follow Revit's Light/Dark (e6e936c)",
        "2026-07-14 - feat(duplicate): view-rename autofill detects ALL disciplines in a mixed selection, one Find row each (d97339f)"
      ],
      audit: {
        lastRun: "2026-07-14",
        runType: "Resolution of the 2026-07-12 full audit (106 findings) — 8 fix commits landed ~85 findings in code, then an explicit owner-decision pass (audits/2026-07-12__audit-resolution.md) closed everything left: 3 findings disproven as false positives (including the sole CRITICAL), the rest fixed, won't-fix (verified safe), deferred-design, or postponed pending owner time.",
        cadence: "on-demand",
        counts: { critical: 0, high: 0, medium: 4, low: 6, info: 1 },
        closedLastRun: 95,
        trend: "improving",
        reportPath: "F:\\AI-Dev\\Add-Ins\\audits\\2026-07-12__audit-resolution.md",
        reportFile: "addins/2026-07-12__audit-resolution.md",
        ledgerPath: "F:\\AI-Dev\\Add-Ins\\audits",
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
      activity: [2,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
      oneLiner: "Revit family audit + standardize tool (Family Fixer). Python auditor actively built; focus on S&L One-Line electrical symbol families. Updated README and CHANGELOG with Phase 0 probe, Op B planner, structural-diff verifier, and shared snapshot model. Added offline auditor, live automation scripts, and guardrails for family edits.",
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
      activity: [0,0,0,0,0,0,3,0,0,0,0,1,3,0],
      lastActivity: {
        date: "2026-07-22",
        summary: "fix(tool): verify leg queried the wrong pipe and turned a success into a failure (#4) (d61babb)"
      },
      branch: "main",
      nextActions: [
        "Run the auditor against a real family repo to validate output; green-light Path B only after validation"
      ],
      pendingDecisions: [],
      blockers: [],
      reminders: [
        "Folder renamed 'Families by AI' to 'Families by BIMpossible' - REFRESH-SPEC families section updated 06-28; check any other stale links/specs",
        "Promoted paused→active 06-28: continuous build through 06-28 (NetworkX DAG, XFMR expansion, device verifier)",
        "README and CHANGELOG updated with Phase 0 probe, Op B planner, structural-diff verifier, and shared snapshot model. Added offline auditor, live automation scripts, and guardrails for family edits."
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
      activity: [2,0,2,0,0,0,0,0,0,0,0,0,0,0],
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
      phase: "Local-only git repo (no GitHub remote). HEAD still 8e8b564 (2026-06-28), but the vault has kept accumulating daily context-log/copy-state/raw-log churn since — now 123 uncommitted files (up from 84 on 07-14), none committed in over three weeks. Post-graphify baseline shipped: 70 notes enriched, 12 MOCs created. The vault feeds AI-Server WP-B (RAG over AI-Brain-Data docs).",
      focus: "Commit the accumulated daily context-log churn (123 files, growing) before it's unmanageable to review; keep Revit-AI context current; feed AI-Server WP-B (sqlite-vec RAG index) when that work package starts.",
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
      phase: "main branch, synced with origin. Last commit ae4b7af (2026-07-16 05:21): docs(write-spine) — recorded items 1/3/4/5 of the convergence plan (contract shipped, Schedule-Push re-spec direction, the two-lane audit boundary, an Audit & History Pattern doc-reconciliation addendum); also corrected the PHASE-STATUS Phase-7/Phase-3 rows (DA4R = reserved name only, no code — 'scaffolded' overstated it) and updated WAVE-STATUS Wave 29 with that night's four ships. Nothing has landed in this repo since — 5 days quiet while the real activity moved to three unmerged draft PRs in the CODE repo (Phase 7/8/13 work) that this ledger doesn't yet reflect. Key sources of truth: 00_Strategy/BIMpossible_PHASE-STATUS.md, WAVE-STATUS.md, STATE-LIVE.md.",
      focus: "Place Phase 13's companion Wave 23 row in WAVE-STATUS.md — drafted paste-ready 2026-06-26, still unplaced, and now more urgent since real Phase 13 code exists on a draft PR. Write a Phase 15 definition doc (it entered build with no proposal/ratification artifact, unlike 13/14). Get WSR8's decision docs + buildlogs onto main — stranded on a docs-repo branch while main's decision-log/INDEX.md has nothing newer than 2026-07-07.",
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
        date: "2026-07-16",
        summary: "docs(write-spine): items 1/3/4/5 recorded — contract shipped, SP re-spec direction, audit boundary, doc reconciliation (ae4b7af)"
      },
      branch: "main at ae4b7af; synced with origin",
      git: null,
      nextActions: [
        "Place Phase 13's companion Wave 23 row in WAVE-STATUS.md — drafted paste-ready 2026-06-26 §2, still unplaced, now more pressing since real Phase 13 code exists on draft PR #186",
        "Write a Phase 15 definition doc — it entered build with no proposal/ratification artifact (13 and 14 both have one)",
        "Get WSR8's decision docs + buildlogs onto main; backfill decision-log/INDEX.md (nothing newer than 2026-07-07)",
        "Once #186/#187/#189 merge in the code repo, update PHASE-STATUS/WAVE-STATUS to reflect real Phase 7/8/13 progress — this ledger doesn't know about them yet",
        "Commit the pending uncommitted files (16 as of 2026-07-21)"
      ],
      pendingDecisions: [
        "Ratify Phase 13 (flip PLANNED → ACTIVE) and promote Phase 14 — both rows are now on the ledger but neither is ratified; placing a row was not ratifying it"
      ],
      blockers: [],
      reminders: [
        "PHASE-STATUS.md gained Phases 13/14/15 on 2026-07-15 — P13's row had sat paste-ready and unplaced since 2026-06-26; P14 was propose-only; P15 had no doc at all despite being the furthest along. Statuses recorded as their docs define them (13 unratified, 14 propose-only)",
        "This ledger is 5 days behind the real Phase 7/8/13 activity, which is happening on 3 unmerged draft PRs in the code repo — nothing here reflects it until those PRs land and someone updates PHASE-STATUS/WAVE-STATUS accordingly",
        "16 uncommitted files as of 2026-07-21 (routine backup rotations + ledger updates)"
      ],
      links: [
        { label: "Local workspace", path: "F:\\AI-Dev\\BIMpossible_Workspace" },
        { label: "Phase status", path: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_PHASE-STATUS.md" },
        { label: "Wave status", path: "F:\\AI-Dev\\BIMpossible_Workspace\\00_Strategy\\BIMpossible_WAVE-STATUS.md" },
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
