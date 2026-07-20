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
"status": "CLOSED",
"dependsOn": [],
"gates": [],
"gatesCount": 0
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
"15"
],
"gatesCount": 6
},
{
"id": "8",
"name": "Project Setup Wizard",
"status": "BUILT (gated OFF)",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "9",
"name": "Product Data Ingestion",
"status": "CONDITIONAL",
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
"name": "Model QA & Health",
"status": "SHIPPED — LIVE in prod",
"dependsOn": [],
"gates": [],
"gatesCount": 0
},
{
"id": "11.1",
"name": "Coordination & Health Report",
"status": "SHIPPED — LIVE in prod",
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
"name": "Augmentation & Write-back Layer",
"status": "PLANNED *(unratified)*",
"dependsOn": [
"7"
],
"gates": [],
"gatesCount": 0
},
{
"id": "14",
"name": "Local AI Inference — On-Device RAG + Revit Context (Optional)",
"status": "CONDITIONAL",
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
"status": "CLOSED"
},
{
"id": "7",
"name": "Model Write-back — DA4R + Revit Link (two engines)",
"status": "ON HOLD"
},
{
"id": "8",
"name": "Project Setup Wizard",
"status": "BUILT (gated OFF)"
},
{
"id": "11",
"name": "Model QA & Health",
"status": "SHIPPED — LIVE in prod"
},
{
"id": "11.1",
"name": "Coordination & Health Report",
"status": "SHIPPED — LIVE in prod"
},
{
"id": "14",
"name": "Local AI Inference — On-Device RAG + Revit Context (Optional)",
"status": "CONDITIONAL"
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
"status": "CONDITIONAL"
},
{
"id": "12",
"name": "Content Authoring",
"status": "PLACEHOLDER (unbuilt)"
},
{
"id": "13",
"name": "Augmentation & Write-back Layer",
"status": "PLANNED *(unratified)*"
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
"status": "CONDITIONAL"
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
"gatesCount": 6,
"gates": [
"5",
"9",
"10",
"12",
"13",
"15"
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
"id": "9",
"name": "Product Data Ingestion",
"gatesCount": 1,
"gates": [
"10"
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
"gate": "APS write-permission approval"
},
{
"phase": "11",
"gate": "2026-07-01"
},
{
"phase": "11.1",
"gate": "2026-07-02"
},
{
"phase": "14",
"gate": "Owner ratification — optional track; gates nothing on the main line and must not block Phases 7–13"
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
}
],
"generated": "2026-07-20"
};
