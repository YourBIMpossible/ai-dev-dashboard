window.NETWORKX_IMPACT = {
  "generated": "2026-09-26T13:00:27Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 24638,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 24638,
      "edges": 60404,
      "commit": "93e7efaa",
      "commitsBehind": 13,
      "builtAt": "2026-09-25",
      "stale": false
    },
    "cycles": {
      "count": 0,
      "baseline": 0,
      "delta": 0,
      "rootCauses": [],
      "excludedExternal": 14,
      "examples": []
    },
    "hubs": [
      {
        "label": "aec/router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 198,
        "churn": 33,
        "risk": 54.4
      },
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 260,
        "churn": 63,
        "risk": 44.2
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 146,
        "churn": 35,
        "risk": 40.4
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 92,
        "churn": 63,
        "risk": 29.6
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 98,
        "churn": 24,
        "risk": 28.4
      },
      {
        "label": "admin_router.py",
        "file": "admin_router.py",
        "kind": "file",
        "degree": 112,
        "churn": 22,
        "risk": 27.7
      },
      {
        "label": "account_router.py",
        "file": "account_router.py",
        "kind": "file",
        "degree": 105,
        "churn": 21,
        "risk": 27.1
      },
      {
        "label": "Firm",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 324,
        "churn": 63,
        "risk": 23.1
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 53,
        "churn": 33,
        "risk": 22.8
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 133,
        "churn": 39,
        "risk": 21.7
      },
      {
        "label": "change_set_router.py",
        "file": "aec/change_set_router.py",
        "kind": "file",
        "degree": 58,
        "churn": 22,
        "risk": 18.9
      },
      {
        "label": "_by_category()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 34,
        "churn": 33,
        "risk": 17.8
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
      "finding": "No circular imports. 14 third-party symbols excluded (graphify credits them to the importing file).",
      "category": "clear"
    },
    {
      "id": "blast_radius",
      "label": "Blast Radius",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "degree \u00d7 90d churn",
      "nodes": 12,
      "finding": "aec/router.py is the hotspot \u2014 198 dependents, 33 commits in 90d",
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
