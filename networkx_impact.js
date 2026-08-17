window.NETWORKX_IMPACT = {
  "generated": "2026-08-17T00:08:15Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 10088,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 10088,
      "edges": 23441,
      "commit": "a2344bd7",
      "commitsBehind": 31,
      "builtAt": "2026-08-09",
      "stale": true
    },
    "cycles": {
      "count": 0,
      "baseline": 0,
      "delta": 0,
      "rootCauses": [],
      "excludedExternal": 21,
      "examples": []
    },
    "hubs": [
      {
        "label": "aec/router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 169,
        "churn": 96,
        "risk": 167.5
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 53,
        "churn": 96,
        "risk": 80.0
      },
      {
        "label": "_by_category()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 35,
        "churn": 96,
        "risk": 67.8
      },
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 128,
        "churn": 57,
        "risk": 47.2
      },
      {
        "label": "_require_auth()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 39,
        "churn": 96,
        "risk": 40.4
      },
      {
        "label": "assert_project_allowed()",
        "file": "guard.py",
        "kind": "symbol",
        "degree": 63,
        "churn": 4,
        "risk": 37.5
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 83,
        "churn": 35,
        "risk": 32.8
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 62,
        "churn": 28,
        "risk": 32.4
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 58,
        "churn": 57,
        "risk": 31.3
      },
      {
        "label": "assistant_tools.py",
        "file": "aec/assistant_tools.py",
        "kind": "file",
        "degree": 53,
        "churn": 22,
        "risk": 28.4
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 67,
        "churn": 38,
        "risk": 25.1
      },
      {
        "label": "get_elements_endpoint()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 22,
        "churn": 96,
        "risk": 22.9
      }
    ],
    "baseline": {
      "setAt": "2026-07-21",
      "commit": "83384da8",
      "cycles": 0,
      "hubs": 12
    }
  },
  "surfaces": [
    {
      "id": "import_cycles",
      "label": "Import Cycles",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "cycle_detection",
      "nodes": 0,
      "finding": "No circular imports. 21 third-party symbols excluded (graphify credits them to the importing file).",
      "category": "clear"
    },
    {
      "id": "blast_radius",
      "label": "Blast Radius",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "degree \u00d7 90d churn",
      "nodes": 12,
      "finding": "aec/router.py is the hotspot \u2014 169 dependents, 96 commits in 90d",
      "category": "watch"
    },
    {
      "id": "security_graph",
      "label": "Security Graph",
      "repo": "BIMpossible",
      "tool": "security_scan",
      "algo": "betweenness_centrality",
      "nodes": 232,
      "finding": "Auth-gate and permission edges mapped",
      "category": "active"
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
      "nodes": 119,
      "finding": "Stale doc nodes detected vs code graph",
      "category": "active"
    },
    {
      "id": "family_dag",
      "label": "Family DAG",
      "repo": "Families by BIMpossible",
      "tool": "family_dag",
      "algo": "topological_sort",
      "nodes": 8,
      "finding": "Family dependency order resolved",
      "category": "active"
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
