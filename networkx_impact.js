window.NETWORKX_IMPACT = {
  "generated": "2026-06-28T20:09:25Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 8630,
    "missingCount": 3
  },
  "surfaces": [
    {
      "id": "import_cycles",
      "label": "Import Cycles",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "cycle_detection",
      "nodes": 20,
      "finding": "Circular imports detected \u2014 technical debt to resolve",
      "category": "risk"
    },
    {
      "id": "god_nodes",
      "label": "God Nodes",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "betweenness_centrality",
      "nodes": 10,
      "finding": "High blast-radius hubs \u2014 single points of failure",
      "category": "risk"
    },
    {
      "id": "security_graph",
      "label": "Security Graph",
      "repo": "BIMpossible",
      "tool": "security_scan",
      "algo": "betweenness_centrality",
      "nodes": null,
      "finding": "Auth-gate and permission edges mapped",
      "category": "missing"
    },
    {
      "id": "route_graph",
      "label": "Route Graph",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "pagerank",
      "nodes": 74,
      "finding": "All 74 routes covered by assert_project_allowed()",
      "category": "static"
    },
    {
      "id": "doc_drift",
      "label": "Doc Drift",
      "repo": "BIMpossible_Workspace",
      "tool": "doc_drift",
      "algo": "cosine_similarity",
      "nodes": null,
      "finding": "Stale doc nodes detected vs code graph",
      "category": "missing"
    },
    {
      "id": "family_dag",
      "label": "Family DAG",
      "repo": "Families by BIMpossible",
      "tool": "family_dag",
      "algo": "topological_sort",
      "nodes": null,
      "finding": "Family dependency order resolved",
      "category": "missing"
    },
    {
      "id": "phase_dag",
      "label": "Phase DAG",
      "repo": "Dashboard",
      "tool": "phase_dag.py",
      "algo": "topological_sort",
      "nodes": 7,
      "finding": "Build-order for P6\u2013P12 phases derived",
      "category": "static"
    },
    {
      "id": "knowledge_graph",
      "label": "Knowledge Graph",
      "repo": "AI-Brain-Data",
      "tool": "graphify",
      "algo": "community_detection",
      "nodes": 198,
      "finding": "Persistent cross-session memory graph",
      "category": "active"
    }
  ]
};
