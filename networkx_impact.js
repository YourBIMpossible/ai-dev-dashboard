window.NETWORKX_IMPACT = {
  "generated": "2026-09-07T21:26:54Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 16936,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 16936,
      "edges": 40301,
      "commit": "85e8208b",
      "commitsBehind": 2,
      "builtAt": "2026-09-07",
      "stale": false
    },
    "cycles": {
      "count": 0,
      "baseline": 0,
      "delta": 0,
      "rootCauses": [],
      "excludedExternal": 13,
      "examples": []
    },
    "hubs": [
      {
        "label": "aec/router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 174,
        "churn": 65,
        "risk": 98.3
      },
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 189,
        "churn": 67,
        "risk": 54.9
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 147,
        "churn": 45,
        "risk": 47.7
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 53,
        "churn": 65,
        "risk": 41.4
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 84,
        "churn": 67,
        "risk": 39.7
      },
      {
        "label": "_by_category()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 34,
        "churn": 65,
        "risk": 33.5
      },
      {
        "label": "admin_router.py",
        "file": "admin_router.py",
        "kind": "file",
        "degree": 99,
        "churn": 20,
        "risk": 28.8
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 73,
        "churn": 26,
        "risk": 27.0
      },
      {
        "label": "_require_auth()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 47,
        "churn": 65,
        "risk": 23.9
      },
      {
        "label": "account_router.py",
        "file": "account_router.py",
        "kind": "file",
        "degree": 88,
        "churn": 17,
        "risk": 23.4
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 89,
        "churn": 36,
        "risk": 21.5
      },
      {
        "label": "assistant_tools.py",
        "file": "aec/assistant_tools.py",
        "kind": "file",
        "degree": 60,
        "churn": 22,
        "risk": 21.4
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
      "finding": "No circular imports. 13 third-party symbols excluded (graphify credits them to the importing file).",
      "category": "clear"
    },
    {
      "id": "blast_radius",
      "label": "Blast Radius",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "degree \u00d7 90d churn",
      "nodes": 12,
      "finding": "aec/router.py is the hotspot \u2014 174 dependents, 65 commits in 90d",
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
