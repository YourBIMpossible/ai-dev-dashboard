#!/usr/bin/env python3
"""
networkx_impact.py — emit networkx_impact.js for the Dashboard Impact tab.

Reads static JSON artifacts already produced by upstream tools (does NOT
re-run those tools). Missing files -> null counts for that surface.
"""

import json
import pathlib
import sys
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).parent.parent  # F:\AI-Dev

# -- source paths ------------------------------------------------------------
SOURCES = {
    "security_graph":  ROOT / "BIMpossible"              / "tools" / "security_graph.json",
    "doc_drift":       ROOT / "BIMpossible_Workspace"    / "tools" / "doc_drift.json",
    "family_dag":      ROOT / "Families by BIMpossible"  / "tool"  / "family_dag.json",
    "graphify":        ROOT / "AI-Brain-Data"             / "graphify-out" / "graph.json",
}

# Backend knowledge graph -- the source for the two codebase risk signals.
BACKEND_REPO  = ROOT / "BIMpossible"
BACKEND_ROOT  = BACKEND_REPO / "backend"
BACKEND_GRAPH = BACKEND_ROOT / "graphify-out" / "graph.json"
BASELINE_PATH = pathlib.Path(__file__).parent / "codebase_baseline.json"

# -- graph-metrics.js: pull latest snapshot for total-nodes hero stat --------
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
        bracket_start = text.index("[")
        bracket_end   = text.rindex("]") + 1
        arr = json.loads(text[bracket_start:bracket_end])
        return arr[-1] if arr else {}
    except Exception:
        return {}


def _count(data, key):
    """Safely extract an integer count from a loaded JSON blob.

    Looks up `key` first — a scalar is returned directly, a list is counted
    by length (each upstream tool's own JSON shape, e.g. security_graph's
    scalar "routes" vs. family_dag's list-shaped "order"). Only falls back
    to the generic nodes/edges/elements guesses when `key` itself is absent,
    for callers (graphify) that don't have a fixed schema of their own.
    """
    if data is None or not isinstance(data, dict):
        return None
    v = data.get(key)
    if isinstance(v, (int, float)):
        return int(v)
    if isinstance(v, list):
        return len(v)
    v = data.get("nodes") or data.get("node_count") or data.get("count")
    if isinstance(v, (int, float)):
        return int(v)
    for k in ("nodes", "edges", "elements"):
        val = data.get(k)
        if isinstance(val, list):
            return len(val)
    return None


def _categorize(surface_id, nodes, has_source):
    """
    Assign display category for the UI grouping.
      risk    — a measured regression against the frozen baseline
      active  — live data present from an upstream JSON artifact
      static  — known static fact; source JSON not required
      missing — source JSON expected but not found

    NOTE: import_cycles/god_nodes used to be hardcoded "risk" here. They were
    graphify's display caps (top_n=20, First-10), so they never moved and the
    panel was permanently red with nothing actionable behind it. They are now
    categorised by `_codebase_signals()` from a real measurement vs. baseline.
    """
    if surface_id in ("route_graph", "phase_dag"):
        return "static"
    if nodes is not None:
        return "active"
    return "missing"


def _codebase_signals():
    """Measure the backend graph honestly. Returns {} if it can't be read.

    Non-fatal by contract: the refresh pipeline treats a networkx_impact.py
    failure as a WARN, but a missing graph or an absent networkx should still
    ship the other six surfaces rather than blank the tab.
    """
    try:
        import graph_signals as gs
    except ImportError:
        return {}

    G, commit = gs.load_graph(BACKEND_GRAPH)
    if G is None:
        return {}

    defs     = gs.defined_names(BACKEND_ROOT)
    external = gs.external_nodes(G, defs)
    cycles   = gs.import_cycles(G, external)
    churn    = gs.git_churn(BACKEND_REPO, 90)
    hubs     = gs.blast_radius(G, external, churn, repo_prefix="backend/", top=12)
    fresh    = gs.freshness(BACKEND_REPO, commit)

    baseline = gs.load_baseline(BASELINE_PATH)
    if not baseline:
        baseline = gs.save_baseline(BASELINE_PATH, len(cycles), len(hubs), commit or "")

    return {
        "graph": {
            "nodes": G.number_of_nodes(),
            "edges": G.number_of_edges(),
            **fresh,
        },
        "cycles": {
            "count":            len(cycles),
            "baseline":         baseline.get("cycles", 0),
            "delta":            len(cycles) - baseline.get("cycles", 0),
            "rootCauses":       gs.cycle_root_causes(cycles)[:5],
            "excludedExternal": len(external),
            "examples":         [" → ".join(c["cycle"]) for c in cycles[:5]],
        },
        "hubs":     hubs,
        "baseline": baseline,
    }


def build():
    security  = _load_json(SOURCES["security_graph"])
    doc_drift = _load_json(SOURCES["doc_drift"])
    family    = _load_json(SOURCES["family_dag"])
    graphify  = _load_json(SOURCES["graphify"])
    metrics   = _latest_metrics()
    codebase  = _codebase_signals()

    # Prefer the live backend graph over the (often stale) metrics snapshot.
    total_nodes = (
        codebase.get("graph", {}).get("nodes")
        or metrics.get("nodes")
        or _count(graphify, "nodes")
        or None
    )

    cyc  = codebase.get("cycles", {})
    hubs = codebase.get("hubs", [])

    # A cycle count only earns "risk" when it exceeds the frozen baseline;
    # holding the line is a pass, not a permanent alarm.
    if cyc:
        n_cyc = cyc["count"]
        if n_cyc == 0:
            cyc_finding = (f"No circular imports. {cyc['excludedExternal']} third-party "
                           "symbols excluded (graphify credits them to the importing file).")
        elif cyc["delta"] > 0:
            cyc_finding = (f"{cyc['delta']} new since baseline — "
                           f"{len(cyc['rootCauses'])} root cause(s) to unpick")
        else:
            cyc_finding = f"{n_cyc} cycles, at or under baseline of {cyc['baseline']}"
        cyc_category = "risk" if cyc["delta"] > 0 else ("active" if n_cyc else "clear")
    else:
        n_cyc, cyc_finding, cyc_category = None, "Backend graph unavailable", "missing"

    top_hub = hubs[0] if hubs else None

    raw_surfaces = [
        {
            "id":      "import_cycles",
            "label":   "Import Cycles",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "cycle_detection",
            "nodes":   n_cyc,
            "finding": cyc_finding,
            "category": cyc_category,
        },
        {
            "id":      "blast_radius",
            "label":   "Blast Radius",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "degree × 90d churn",
            "nodes":   len(hubs) or None,
            "finding": (f"{top_hub['file']} is the hotspot — {top_hub['degree']} dependents, "
                        f"{top_hub['churn']} commits in 90d" if top_hub
                        else "No hub data"),
            "category": "watch" if hubs else "missing",
        },
        {
            "id":      "security_graph",
            "label":   "Security Graph",
            "repo":    "BIMpossible",
            "tool":    "security_scan",
            "algo":    "betweenness_centrality",
            "nodes":   _count(security, "routes"),
            "finding": "Auth-gate and permission edges mapped",
        },
        {
            "id":      "route_graph",
            "label":   "Route Graph",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "pagerank",
            "nodes":   74,  # static fact — all routes gated by assert_project_allowed()
            "finding": "All 74 routes covered by assert_project_allowed()",
        },
        {
            "id":      "doc_drift",
            "label":   "Doc Drift",
            "repo":    "BIMpossible_Workspace",
            "tool":    "doc_drift",
            "algo":    "cosine_similarity",
            "nodes":   _count(doc_drift, "docs_scanned"),
            "finding": "Stale doc nodes detected vs code graph",
        },
        {
            "id":      "family_dag",
            "label":   "Family DAG",
            "repo":    "Families by BIMpossible",
            "tool":    "family_dag",
            "algo":    "topological_sort",
            "nodes":   _count(family, "order"),
            "finding": "Family dependency order resolved",
        },
        {
            "id":      "phase_dag",
            "label":   "Phase DAG",
            "repo":    "Dashboard",
            "tool":    "phase_dag.py",
            "algo":    "topological_sort",
            "nodes":   7,  # P6-P12 = 7 phases, stable
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

    surfaces = []
    for s in raw_surfaces:
        # The two codebase signals carry a measured category already; the rest
        # are classified by whether their upstream JSON showed up.
        if "category" in s:
            surfaces.append(s)
            continue
        has_source = (s["id"] not in ("route_graph", "phase_dag")
                      and s["nodes"] is not None)
        surfaces.append({**s, "category": _categorize(s["id"], s["nodes"], has_source)})

    missing_count = sum(1 for s in surfaces if s["category"] == "missing")

    payload = {
        "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "stats": {
            "repos":        4,
            "tools":        3,
            "algorithms":   6,
            "totalNodes":   total_nodes,
            "missingCount": missing_count,
        },
        "codebase": codebase,
        "surfaces": surfaces,
    }

    out_path = pathlib.Path(__file__).parent / "networkx_impact.js"
    js = "window.NETWORKX_IMPACT = " + json.dumps(payload, indent=2) + ";\n"
    out_path.write_text(js, encoding="utf-8")
    print(f"[networkx_impact] wrote {out_path.name} -- {len(surfaces)} surfaces"
          f" ({missing_count} missing)")


if __name__ == "__main__":
    try:
        build()
    except Exception as exc:
        print(f"[networkx_impact] ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
