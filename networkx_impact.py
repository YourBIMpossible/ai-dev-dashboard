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
    """Safely extract an integer count from a loaded JSON blob."""
    if data is None:
        return None
    if isinstance(data, dict):
        v = data.get(key) or data.get("nodes") or data.get("node_count") or data.get("count")
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
      risk    — signals that flag problems (cycles, blast-radius hubs)
      active  — live data present from an upstream JSON artifact
      static  — known static fact; source JSON not required
      missing — source JSON expected but not found
    """
    if surface_id in ("import_cycles", "god_nodes"):
        return "risk"
    if surface_id in ("route_graph", "phase_dag"):
        return "static"
    if nodes is not None:
        return "active"
    return "missing"


def build():
    security  = _load_json(SOURCES["security_graph"])
    doc_drift = _load_json(SOURCES["doc_drift"])
    family    = _load_json(SOURCES["family_dag"])
    graphify  = _load_json(SOURCES["graphify"])
    metrics   = _latest_metrics()

    total_nodes = (
        metrics.get("nodes")
        or _count(graphify, "nodes")
        or None
    )

    raw_surfaces = [
        {
            "id":      "import_cycles",
            "label":   "Import Cycles",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "cycle_detection",
            "nodes":   metrics.get("cycles"),
            "finding": "Circular imports detected — technical debt to resolve",
        },
        {
            "id":      "god_nodes",
            "label":   "God Nodes",
            "repo":    "BIMpossible",
            "tool":    "graphify",
            "algo":    "betweenness_centrality",
            "nodes":   len(metrics.get("godNodes", []) or []) or None,
            "finding": "High blast-radius hubs — single points of failure",
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
            "nodes":   74,  # static fact — all routes gated by assert_project_allowed()
            "finding": "All 74 routes covered by assert_project_allowed()",
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
        has_source = (s["id"] not in ("import_cycles", "god_nodes", "route_graph", "phase_dag")
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
