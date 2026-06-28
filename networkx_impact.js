window.NETWORKX_IMPACT = {
  "generated": "2026-06-28T19:50:24Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 8630
  },
  "surfaces": [
    {
      "id": "import_cycles",
      "label": "Import Cycles",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "cycle_detection",
      "nodes": 20,
      "finding": "Detected circular import chains"
    },
    {
      "id": "god_nodes",
      "label": "God Nodes",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "betweenness_centrality",
      "nodes": 10,
      "finding": "High-blast-radius hubs identified"
    },
    {
      "id": "security_graph",
      "label": "Security Graph",
      "repo": "BIMpossible",
      "tool": "security_scan",
      "algo": "betweenness_centrality",
      "nodes": null,
      "finding": "Auth-gate and permission edges mapped"
    },
    {
      "id": "route_graph",
      "label": "Route Graph",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "pagerank",
      "nodes": null,
      "finding": "74 routes w/ assert_project_allowed() coverage"
    },
    {
      "id": "doc_drift",
      "label": "Doc Drift",
      "repo": "BIMpossible_Workspace",
      "tool": "doc_drift",
      "algo": "cosine_similarity",
      "nodes": null,
      "finding": "Stale doc nodes detected vs code graph"
    },
    {
      "id": "family_dag",
      "label": "Family DAG",
      "repo": "Families by BIMpossible",
      "tool": "family_dag",
      "algo": "topological_sort",
      "nodes": null,
      "finding": "Family dependency order resolved"
    },
    {
      "id": "phase_dag",
      "label": "Phase DAG",
      "repo": "Dashboard",
      "tool": "phase_dag.py",
      "algo": "topological_sort",
      "nodes": null,
      "finding": "Build-order for P6-P12 phases derived"
    },
    {
      "id": "knowledge_graph",
      "label": "Knowledge Graph",
      "repo": "AI-Brain-Data",
      "tool": "graphify",
      "algo": "community_detection",
      "nodes": 198,
      "finding": "Persistent cross-session memory graph"
    }
  ]
};
