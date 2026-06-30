# NetworkX Impact Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Impact" tab inside the Knowledge Graph view that shows a hero-stat summary (4 cards) and a table of 8 surfaces where NetworkX is at work across the repos, all wired into the existing refresh pipeline.

**Architecture:** A Python generator (`networkx_impact.py`) reads cross-repo JSON artifacts (static snapshot, v1 — the generator does NOT re-run upstream tools), emits `networkx_impact.js` (`window.NETWORKX_IMPACT`), and is called non-fatally inside `Refresh-Dashboard.ps1`. A new render function `networkxImpactBody()` in `index.html` consumes it, and "Impact" is prepended as the first tab in `CTABS` inside `codebaseView()`.

**Tech Stack:** Python 3 (stdlib only — json, pathlib, datetime), PowerShell 5.1, vanilla JS (no bundler), existing `apply_patch()` helpers are NOT used here (networkx_impact.js is a standalone file, not a block inside data.js).

## Global Constraints

- Dark-theme UI only — no light backgrounds; follow `var(--c-card)`, `var(--c-border)`, `var(--c-accent)` CSS variables already in `index.html`.
- `networkx_impact.py` must be **graceful on every missing file** — any absent cross-repo JSON produces `null` for that surface's numbers; the panel must still render.
- `networkx_impact.js` is a **standalone file** (like `phase_dag.js`), not a block inside `data.js`. Do NOT use `apply_patch()`.
- The generator outputs **stable coverage numbers only** — no per-model transient counts (electrical islands, loop counts).
- All new JS in `index.html` must pass `node --check index.html` (extract the `<script>` block first — see Task 3 verification step).
- Refresh-dashboard calls the generator **non-fatally** (warning on failure, never abort the push).
- `networkx_impact.js` must be added to the `git add` line in `Refresh-Dashboard.ps1` so the automation clone doesn't strip it on `git reset origin/main`.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `F:\AI-Dev\Dashboard\networkx_impact.py` | **Create** | Generator: read cross-repo JSONs → emit `networkx_impact.js` |
| `F:\AI-Dev\Dashboard\networkx_impact.js` | **Create (generated)** | `window.NETWORKX_IMPACT` data object — committed, refreshed by generator |
| `F:\AI-Dev\Dashboard\index.html` | **Modify** | Add `<script>` include, `networkxImpactBody()`, "Impact" tab in `CTABS` + dispatch |
| `F:\AI-Dev\Dashboard\Refresh-Dashboard.ps1` | **Modify** | Call generator non-fatally; add `networkx_impact.js` to `git add` line |

---

## Task 1: Data Generator (`networkx_impact.py`)

**Files:**
- Create: `F:\AI-Dev\Dashboard\networkx_impact.py`
- Create (output): `F:\AI-Dev\Dashboard\networkx_impact.js`

**Interfaces:**
- Produces: `window.NETWORKX_IMPACT` — shape documented in Step 3 below
- Consumed by: Task 2 render function

- [ ] **Step 1: Create the generator script**

Create `F:\AI-Dev\Dashboard\networkx_impact.py` with this exact content:

```python
#!/usr/bin/env python3
"""
networkx_impact.py — emit networkx_impact.js for the Dashboard Impact tab.

Reads static JSON artifacts already produced by upstream tools (does NOT
re-run those tools). Missing files → null counts for that surface.
"""

import json
import pathlib
import sys
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).parent.parent  # F:\AI-Dev

# ── source paths ────────────────────────────────────────────────────────────
SOURCES = {
    "security_graph":  ROOT / "BIMpossible"          / "tools" / "security_graph.json",
    "doc_drift":       ROOT / "BIMpossible_Workspace" / "tools" / "doc_drift.json",
    "family_dag":      ROOT / "Families by BIMpossible" / "tool" / "family_dag.json",
    "graphify":        ROOT / "AI-Brain-Data"         / "graphify-out" / "graph.json",
}

# ── graph-metrics.js: pull latest snapshot for total-nodes hero stat ─────────
METRICS_JS = pathlib.Path(__file__).parent / "graph-metrics.js"

def _load_json(path: pathlib.Path):
    """Return parsed JSON or None if file missing/unreadable."""
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None

def _latest_metrics():
    """Return last entry from graph-metrics.js array, or {}."""
    try:
        text = METRICS_JS.read_text(encoding="utf-8")
        # strip JS wrapper: window.GRAPH_METRICS = [...];
        bracket_start = text.index("[")
        bracket_end   = text.rindex("]") + 1
        arr = json.loads(text[bracket_start:bracket_end])
        return arr[-1] if arr else {}
    except Exception:
        return {}

def _count(data, key):
    """Safely extract an integer count from a loaded JSON blob."""
    if data is None:
        return None
    if isinstance(data, dict):
        v = data.get(key) or data.get("nodes") or data.get("node_count") or data.get("count")
        if isinstance(v, (int, float)):
            return int(v)
        # try top-level list length
        for k in ("nodes", "edges", "elements"):
            val = data.get(k)
            if isinstance(val, list):
                return len(val)
    return None

def build():
    security  = _load_json(SOURCES["security_graph"])
    doc_drift = _load_json(SOURCES["doc_drift"])
    family    = _load_json(SOURCES["family_dag"])
    graphify  = _load_json(SOURCES["graphify"])
    metrics   = _latest_metrics()

    total_nodes = (
        metrics.get("nodes")
        or (_count(graphify, "nodes"))
        or None
    )

    surfaces = [
        {
            "id":      "import_cycles",
            "label":   "Import Cycles",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "cycle_detection",
            "nodes":   metrics.get("cycles"),
            "finding": "Detected circular import chains",
        },
        {
            "id":      "god_nodes",
            "label":   "God Nodes",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "betweenness_centrality",
            "nodes":   len(metrics.get("godNodes", []) or []) or None,
            "finding": "High-blast-radius hubs identified",
        },
        {
            "id":      "security_graph",
            "label":   "Security Graph",
            "repo":    "BIMpossible",
            "tool":    "security_scan",
            "algo":    "betweenness_centrality",
            "nodes":   _count(security, "nodes"),
            "finding": "Auth-gate and permission edges mapped",
        },
        {
            "id":      "route_graph",
            "label":   "Route Graph",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "pagerank",
            "nodes":   None,  # static fact — route count varies per model
            "finding": "74 routes w/ assert_project_allowed() coverage",
        },
        {
            "id":      "doc_drift",
            "label":   "Doc Drift",
            "repo":    "BIMpossible_Workspace",
            "tool":    "doc_drift",
            "algo":    "cosine_similarity",
            "nodes":   _count(doc_drift, "nodes"),
            "finding": "Stale doc nodes detected vs code graph",
        },
        {
            "id":      "family_dag",
            "label":   "Family DAG",
            "repo":    "Families by BIMpossible",
            "tool":    "family_dag",
            "algo":    "topological_sort",
            "nodes":   _count(family, "nodes"),
            "finding": "Family dependency order resolved",
        },
        {
            "id":      "phase_dag",
            "label":   "Phase DAG",
            "repo":    "Dashboard",
            "tool":    "phase_dag.py",
            "algo":    "topological_sort",
            "nodes":   None,  # counted from phase_dag.js at render time
            "finding": "Build-order for P6–P12 phases derived",
        },
        {
            "id":      "knowledge_graph",
            "label":   "Knowledge Graph",
            "repo":    "AI-Brain-Data",
            "tool":    "graphify",
            "algo":    "community_detection",
            "nodes":   _count(graphify, "nodes"),
            "finding": "Persistent cross-session memory graph",
        },
    ]

    payload = {
        "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "stats": {
            "repos":      4,
            "tools":      3,
            "algorithms": 6,
            "totalNodes": total_nodes,
        },
        "surfaces": surfaces,
    }

    out_path = pathlib.Path(__file__).parent / "networkx_impact.js"
    js = "window.NETWORKX_IMPACT = " + json.dumps(payload, indent=2) + ";\n"
    out_path.write_text(js, encoding="utf-8")
    print(f"[networkx_impact] wrote {out_path.name} — {len(surfaces)} surfaces")

if __name__ == "__main__":
    try:
        build()
    except Exception as exc:
        print(f"[networkx_impact] ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
```

- [ ] **Step 2: Run the generator to produce the initial JS file**

```powershell
cd F:\AI-Dev\Dashboard
python networkx_impact.py
```

Expected output (exact paths may vary depending on which cross-repo files exist):
```
[networkx_impact] wrote networkx_impact.js — 8 surfaces
```

If some source JSONs are missing you'll still see this success line — missing files produce `null` nodes counts, which is expected for v1.

- [ ] **Step 3: Verify the output is valid JS**

```powershell
node -e "const d = require('./networkx_impact.js'); console.log(JSON.stringify(global.NETWORKX_IMPACT.stats))"
```

Expected: a JSON object with keys `repos`, `tools`, `algorithms`, `totalNodes`.

If `node` can't `require` a `window.NETWORKX_IMPACT` assignment directly, use:
```powershell
node -e "const window={}; eval(require('fs').readFileSync('networkx_impact.js','utf8')); console.log(JSON.stringify(window.NETWORKX_IMPACT.stats))"
```

- [ ] **Step 4: Commit the generator and initial output**

```powershell
git add networkx_impact.py networkx_impact.js
git commit -m "feat(impact): add networkx_impact.py generator + initial networkx_impact.js"
```

---

## Task 2: Script Include + Render Function + CTABS Tab (`index.html`)

**Files:**
- Modify: `F:\AI-Dev\Dashboard\index.html`

**Interfaces:**
- Consumes: `window.NETWORKX_IMPACT` from `networkx_impact.js`
- Consumes: `window._ctab` global and localStorage `'dash.ctab'` (existing CTABS machinery)
- Produces: `networkxImpactBody()` — called by `codebaseView()` when `_ctab === 'impact'`

> **Read before editing:** Open `index.html` and find:
> 1. The `<script>` block that includes `phase_dag.js` (around line 562–570) — add the new include after it.
> 2. The line `const CTABS=[` (around line 2143) — prepend `['impact','Impact']`.
> 3. The `graphMetricsBody()` function — use it as the style template for `networkxImpactBody()`.
> 4. Inside `codebaseView()`, the `if(ct==='metrics')` dispatch block — add `else if(ct==='impact')` before it.

- [ ] **Step 1: Add the script include**

In `index.html`, find the line:
```html
<script src="phase_dag.js" onerror="void 0"></script>
```

Add immediately after it:
```html
<script src="networkx_impact.js" onerror="void 0"></script>
```

- [ ] **Step 2: Add `networkxImpactBody()` render function**

Find `function graphMetricsBody(){` in `index.html`. Add the following function **immediately before** it (so it's grouped with the other codebase-tab renderers):

```javascript
function networkxImpactBody(){
  const ni=window.NETWORKX_IMPACT;
  if(!ni)return'<p style="color:var(--c-muted);padding:1rem">No impact data — run networkx_impact.py to generate.</p>';
  const s=ni.stats;
  const heroCards=[
    {label:'Repos Touched', value:s.repos??'—'},
    {label:'Prod Tools',    value:s.tools??'—'},
    {label:'Algorithms',    value:s.algorithms??'—'},
    {label:'Graph Nodes',   value:s.totalNodes!=null?s.totalNodes.toLocaleString():'—'},
  ];
  let h='<div style="padding:0.75rem 1rem">';
  // hero stats
  h+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;margin-bottom:1rem">';
  heroCards.forEach(c=>{
    h+=`<div style="background:var(--c-card);border:1px solid var(--c-border);border-radius:6px;padding:0.75rem;text-align:center">
      <div style="font-size:1.5rem;font-weight:700;color:var(--c-accent)">${c.value}</div>
      <div style="font-size:0.7rem;color:var(--c-muted);margin-top:2px">${c.label}</div>
    </div>`;
  });
  h+='</div>';
  // surfaces table
  h+='<div style="font-size:0.72rem;font-weight:600;color:var(--c-muted);letter-spacing:.05em;margin-bottom:0.4rem">SURFACES</div>';
  h+='<table style="width:100%;border-collapse:collapse;font-size:0.78rem">';
  h+='<thead><tr style="color:var(--c-muted);text-align:left">';
  ['Surface','Repo','Tool','Algorithm','Nodes','Finding'].forEach(col=>{
    h+=`<th style="padding:0.3rem 0.5rem;border-bottom:1px solid var(--c-border)">${col}</th>`;
  });
  h+='</tr></thead><tbody>';
  (ni.surfaces||[]).forEach((row,i)=>{
    const bg=i%2===0?'transparent':'rgba(255,255,255,0.02)';
    h+=`<tr style="background:${bg}">
      <td style="padding:0.3rem 0.5rem;font-weight:600">${row.label}</td>
      <td style="padding:0.3rem 0.5rem;color:var(--c-muted)">${row.repo}</td>
      <td style="padding:0.3rem 0.5rem"><code style="font-size:0.72rem;background:rgba(255,255,255,0.07);padding:1px 4px;border-radius:3px">${row.tool}</code></td>
      <td style="padding:0.3rem 0.5rem"><code style="font-size:0.72rem;background:rgba(255,255,255,0.07);padding:1px 4px;border-radius:3px">${row.algo}</code></td>
      <td style="padding:0.3rem 0.5rem;text-align:right;color:var(--c-accent)">${row.nodes!=null?row.nodes:'—'}</td>
      <td style="padding:0.3rem 0.5rem;color:var(--c-muted)">${row.finding}</td>
    </tr>`;
  });
  h+='</tbody></table>';
  const gen=ni.generated?`<div style="font-size:0.65rem;color:var(--c-muted);margin-top:0.75rem;text-align:right">Generated: ${ni.generated}</div>`:'';
  h+=gen+'</div>';
  return h;
}
```

- [ ] **Step 3: Prepend "Impact" to CTABS**

Find this exact line in `index.html`:
```javascript
const CTABS=[['metrics','Metrics'],
```

Change it to:
```javascript
const CTABS=[['impact','Impact'],['metrics','Metrics'],
```

(Keep the rest of the array — `['network','Graph'],['dashboard','Dashboard'],['report','Report']` — unchanged.)

- [ ] **Step 4: Add dispatch inside `codebaseView()`**

Find this block inside `codebaseView()`:
```javascript
if(ct==='metrics')h+=graphMetricsBody();
```

Add one line **before** it:
```javascript
if(ct==='impact')h+=networkxImpactBody();
else if(ct==='metrics')h+=graphMetricsBody();
```

Remove the original `if(ct==='metrics')` line (it's now the `else if`).

- [ ] **Step 5: Smoke-check the JS is syntactically valid**

Extract the main inline `<script>` block from `index.html` and run node --check:

```powershell
# Extract everything between the last <script> and </script> that has the app logic
# (The big block starting around line 600). A quick way:
$text = Get-Content F:\AI-Dev\Dashboard\index.html -Raw
$start = $text.LastIndexOf('<script>') + '<script>'.Length
$end   = $text.LastIndexOf('</script>')
$js    = $text.Substring($start, $end - $start)
$js | Out-File "$env:TEMP\dash_check.js" -Encoding utf8
node --check "$env:TEMP\dash_check.js"
```

Expected: no output (exit 0). Any syntax error will be reported with line number.

- [ ] **Step 6: Commit**

```powershell
git add index.html
git commit -m "feat(impact): networkxImpactBody() + Impact tab in Knowledge Graph view"
```

---

## Task 3: Refresh Pipeline Wiring (`Refresh-Dashboard.ps1`)

**Files:**
- Modify: `F:\AI-Dev\Dashboard\Refresh-Dashboard.ps1`

**Interfaces:**
- Consumes: `networkx_impact.py` (Task 1)
- Produces: `networkx_impact.js` added to committed set each refresh

> **Read before editing:** Open `Refresh-Dashboard.ps1` and locate:
> 1. The block that calls `python phase_dag.py` (non-fatal, with a `Write-Warning` on failure) — the new call goes immediately after it.
> 2. The `git add` line that currently reads something like `git add data.js graph-metrics.js phase_dag.js` — add `networkx_impact.js` to it.

- [ ] **Step 1: Add non-fatal generator call**

Find this block (approx lines 100–110 of Refresh-Dashboard.ps1):
```powershell
python phase_dag.py
if ($LASTEXITCODE -ne 0) { Write-Warning "[refresh] phase_dag.py failed — skipping phase DAG" }
```

Add immediately after it:
```powershell
python networkx_impact.py
if ($LASTEXITCODE -ne 0) { Write-Warning "[refresh] networkx_impact.py failed — skipping impact data" }
```

- [ ] **Step 2: Add `networkx_impact.js` to the git add line**

Find the line (exact text will vary slightly):
```powershell
git add data.js graph-metrics.js phase_dag.js
```

Change it to:
```powershell
git add data.js graph-metrics.js phase_dag.js networkx_impact.js
```

> **Why this matters:** `Refresh-Dashboard.ps1` runs `git reset origin/main` at the top of each loop iteration. Any file not in `git add` will be wiped out. This is exactly what happened to `phase_dag.js` in Play B (commit e575b63 hardened this pattern).

- [ ] **Step 3: Verify the diff is minimal and correct**

```powershell
git diff Refresh-Dashboard.ps1
```

You should see exactly two hunks:
1. Two lines added after the `phase_dag.py` block
2. `networkx_impact.js` appended to the `git add` line

No other changes.

- [ ] **Step 4: Commit**

```powershell
git add Refresh-Dashboard.ps1
git commit -m "feat(impact): wire networkx_impact.py into refresh pipeline"
```

---

## Task 4: End-to-End Verification

**Files:** None (read-only verification)

- [ ] **Step 1: Run a full local refresh simulation**

```powershell
cd F:\AI-Dev\Dashboard
python networkx_impact.py
```

Confirm `networkx_impact.js` is updated (check its `generated` timestamp).

- [ ] **Step 2: Open the dashboard and navigate to the Impact tab**

Start a local server (Python's built-in is fine):
```powershell
python -m http.server 8080
```

Open `http://localhost:8080` in a browser. Click **"Knowledge Graph"** in the left nav. The first tab should now be **"Impact"** and it should be selected by default. You should see:
- 4 hero stat cards (Repos Touched / Prod Tools / Algorithms / Graph Nodes)
- An 8-row surfaces table with labels, repos, tool chips, algo chips, node counts, and findings

If any cross-repo JSON was missing, that surface row's Nodes cell shows `—` — this is correct.

- [ ] **Step 3: Confirm localStorage persistence**

Click away to another nav item, then come back to Knowledge Graph. The tab memory (which tab was active) should be whichever you left it on. If you were on "Impact", it stays on "Impact".

- [ ] **Step 4: Confirm dark-theme rendering**

All backgrounds should use `var(--c-card)` (dark). No white/light panels. Check the hero cards and table header specifically.

- [ ] **Step 5: Push**

Only push when the above verification passes. Do not push mid-session.

```powershell
# Stop the local server first (Ctrl+C), then:
git push origin main
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Data generator (`networkx_impact.py`) — Task 1
- [x] Script include in `index.html` — Task 2 Step 1
- [x] `networkxImpactBody()` render fn — Task 2 Step 2
- [x] "Impact" tab in CTABS — Task 2 Step 3
- [x] CTABS dispatch in `codebaseView()` — Task 2 Step 4
- [x] Refresh-Dashboard.ps1 wiring (non-fatal call) — Task 3 Step 1
- [x] `git add` includes `networkx_impact.js` — Task 3 Step 2
- [x] Graceful on missing files — Task 1 generator uses `_load_json()` returning `None`
- [x] Stable coverage numbers only — route graph node count is static fact, not live
- [x] Dark theme — all styles use CSS variables
- [x] Static snapshot approach (v1 decision) — generator reads existing JSONs, does not re-run tools

**Placeholder scan:** None found. All code blocks are complete.

**Type consistency:**
- `window.NETWORKX_IMPACT.stats` — keys `repos`, `tools`, `algorithms`, `totalNodes` used consistently in generator (Task 1) and render fn (Task 2).
- `window.NETWORKX_IMPACT.surfaces[].nodes` — both `null` (Python) and `null` (JS render `!= null` check) are consistent.
- `window._ctab === 'impact'` — string `'impact'` matches the CTABS entry `['impact','Impact']` exactly.
