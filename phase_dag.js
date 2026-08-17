window.PHASE_DAG = {
"nodes": [
{
"id": "0-2",
"name": "Foundation — Env Setup / Skeleton / Auth",
"status": "CLOSED",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "3",
"name": "Read-Only Data Dashboard (+ 3.x family)",
"status": "ACTIVE",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "4",
"name": "Embedded Intelligent Assistant (4a/4b)",
"status": "CLOSED",
"dependsOn": [],
"gates": [
"12",
"15"
],
"gatesCount": 2
},
{
"id": "5",
"name": "Views / Sheets / 3D / Workspace Coherence",
"status": "ON HOLD",
"dependsOn": [
"7"
],
"gates": [],
"gatesCount": 0
},
{
"id": "6",
"name": "Platform / Billing + Client-Management",
"status": "PARTIAL — original scope shipped + live; Client-Mgmt E and F open (reopened 2026-07-27, PLACED not ratified)",
"dependsOn": [],
"gates": [
"17"
],
"gatesCount": 1
},
{
"id": "7",
"name": "Model Write-back — DA4R + Revit Link (two engines)",
"status": "ON HOLD",
"dependsOn": [],
"gates": [
"5",
"9",
"10",
"12",
"13",
"15",
"17"
],
"gatesCount": 7
},
{
"id": "8",
"name": "Project Setup Wizard",
"status": "LIVE — deployed on main 2026-07-22",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "9",
"name": "Product Data Ingestion",
"status": "ACTIVE",
"dependsOn": [
"7"
],
"gates": [
"10"
],
"gatesCount": 1
},
{
"id": "10",
"name": "Cost Intelligence / Estimating",
"status": "CONDITIONAL",
"dependsOn": [
"9"
],
"gates": [],
"gatesCount": 0
},
{
"id": "11",
"name": "Model QA & Health (incl. Coordination & Health Report)",
"status": "ACTIVE — core shipped + LIVE in prod; reopened for further development",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "12",
"name": "Content Authoring",
"status": "PLACEHOLDER (unbuilt)",
"dependsOn": [
"4",
"7"
],
"gates": [],
"gatesCount": 0
},
{
"id": "13",
"name": "Augmentation & Write-back Layer (incl. Write Engine — Typed Values + Type Params)",
"status": "ACTIVE",
"dependsOn": [
"7"
],
"gates": [
"17"
],
"gatesCount": 1
},
{
"id": "14",
"name": "Local AI Inference — On-Device RAG + Revit Context (Optional)",
"status": "ACTIVE",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "15",
"name": "In-Revit BIMpossible Assistant Pane",
"status": "ACTIVE",
"dependsOn": [
"4",
"7"
],
"gates": [],
"gatesCount": 0
},
{
"id": "16",
"name": "Desktop Orchestration Hub — MCP-First, Gated GUI Exception Path",
"status": "CONDITIONAL",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "17",
"name": "App Integrations (governed third-party app surfaces — chat gateways + collaboration / CDE / reporting apps over a shared control plane)",
"status": "PARTIAL",
"dependsOn": [
"6",
"13"
],
"gates": [],
"gatesCount": 0
},
{
"id": "18",
"name": "Client Knowledge Assistant (3 pillars)",
"status": "ACTIVE",
"dependsOn": [],
"gates": [],
"gatesCount": 0
}
],
"generations": [
[
{
"id": "0-2",
"name": "Foundation — Env Setup / Skeleton / Auth",
"status": "CLOSED"
},
{
"id": "3",
"name": "Read-Only Data Dashboard (+ 3.x family)",
"status": "ACTIVE"
},
{
"id": "4",
"name": "Embedded Intelligent Assistant (4a/4b)",
"status": "CLOSED"
},
{
"id": "6",
"name": "Platform / Billing + Client-Management",
"status": "PARTIAL — original scope shipped + live; Client-Mgmt E and F open (reopened 2026-07-27, PLACED not ratified)"
},
{
"id": "7",
"name": "Model Write-back — DA4R + Revit Link (two engines)",
"status": "ON HOLD"
},
{
"id": "8",
"name": "Project Setup Wizard",
"status": "LIVE — deployed on main 2026-07-22"
},
{
"id": "11",
"name": "Model QA & Health (incl. Coordination & Health Report)",
"status": "ACTIVE — core shipped + LIVE in prod; reopened for further development"
},
{
"id": "14",
"name": "Local AI Inference — On-Device RAG + Revit Context (Optional)",
"status": "ACTIVE"
},
{
"id": "16",
"name": "Desktop Orchestration Hub — MCP-First, Gated GUI Exception Path",
"status": "CONDITIONAL"
},
{
"id": "18",
"name": "Client Knowledge Assistant (3 pillars)",
"status": "ACTIVE"
}
],
[
{
"id": "5",
"name": "Views / Sheets / 3D / Workspace Coherence",
"status": "ON HOLD"
},
{
"id": "9",
"name": "Product Data Ingestion",
"status": "ACTIVE"
},
{
"id": "12",
"name": "Content Authoring",
"status": "PLACEHOLDER (unbuilt)"
},
{
"id": "13",
"name": "Augmentation & Write-back Layer (incl. Write Engine — Typed Values + Type Params)",
"status": "ACTIVE"
},
{
"id": "15",
"name": "In-Revit BIMpossible Assistant Pane",
"status": "ACTIVE"
}
],
[
{
"id": "10",
"name": "Cost Intelligence / Estimating",
"status": "CONDITIONAL"
},
{
"id": "17",
"name": "App Integrations (governed third-party app surfaces — chat gateways + collaboration / CDE / reporting apps over a shared control plane)",
"status": "PARTIAL"
}
]
],
"criticalPath": [
{
"id": "7",
"name": "Model Write-back — DA4R + Revit Link (two engines)",
"status": "ON HOLD"
},
{
"id": "9",
"name": "Product Data Ingestion",
"status": "ACTIVE"
},
{
"id": "10",
"name": "Cost Intelligence / Estimating",
"status": "CONDITIONAL"
}
],
"lynchpins": [
{
"id": "7",
"name": "Model Write-back — DA4R + Revit Link (two engines)",
"gatesCount": 7,
"gates": [
"5",
"9",
"10",
"12",
"13",
"15",
"17"
]
},
{
"id": "4",
"name": "Embedded Intelligent Assistant (4a/4b)",
"gatesCount": 2,
"gates": [
"12",
"15"
]
},
{
"id": "6",
"name": "Platform / Billing + Client-Management",
"gatesCount": 1,
"gates": [
"17"
]
},
{
"id": "9",
"name": "Product Data Ingestion",
"gatesCount": 1,
"gates": [
"10"
]
},
{
"id": "13",
"name": "Augmentation & Write-back Layer (incl. Write Engine — Typed Values + Type Params)",
"gatesCount": 1,
"gates": [
"17"
]
}
],
"externalGates": [
{
"phase": "7",
"gate": "= Wave 8"
},
{
"phase": "8",
"gate": "— (write-permission approval GRANTED 2026-07-21)"
},
{
"phase": "11",
"gate": "2026-07-01"
},
{
"phase": "14",
"gate": "Owner ratification — optional track; gates nothing on the main line and must not block Phases 7–13"
},
{
"phase": "16",
"gate": "Owner ratification — gates nothing on the main line; not scheduled until the core product line (Phases 3–13) is complete or far enough along to prove the target workflows (owner instruction 2026-07-23)"
},
{
"phase": "18",
"gate": "Owner-authorized multi-session completion program (2026-08-09)"
}
],
"edges": [
{
"from": "4",
"to": "12"
},
{
"from": "4",
"to": "15"
},
{
"from": "6",
"to": "17"
},
{
"from": "7",
"to": "5"
},
{
"from": "7",
"to": "9"
},
{
"from": "7",
"to": "12"
},
{
"from": "7",
"to": "13"
},
{
"from": "7",
"to": "15"
},
{
"from": "9",
"to": "10"
},
{
"from": "13",
"to": "17"
}
],
"generated": "2026-08-17"
};
