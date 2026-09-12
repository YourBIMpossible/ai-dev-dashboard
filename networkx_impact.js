window.NETWORKX_IMPACT = {
  "generated": "2026-09-12T13:00:14Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 17189,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 17189,
      "edges": 40693,
      "commit": "a3d32a92",
      "commitsBehind": 19,
      "builtAt": "2026-09-11",
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
        "degree": 163,
        "churn": 38,
        "risk": 72.6
      },
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 190,
        "churn": 62,
        "risk": 61.6
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 147,
        "churn": 36,
        "risk": 47.2
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 84,
        "churn": 62,
        "risk": 45.3
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 52,
        "churn": 38,
        "risk": 32.3
      },
      {
        "label": "admin_router.py",
        "file": "admin_router.py",
        "kind": "file",
        "degree": 99,
        "churn": 17,
        "risk": 27.7
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 72,
        "churn": 21,
        "risk": 26.5
      },
      {
        "label": "_by_category()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 34,
        "churn": 38,
        "risk": 25.8
      },
      {
        "label": "account_router.py",
        "file": "account_router.py",
        "kind": "file",
        "degree": 88,
        "churn": 15,
        "risk": 24.1
      },
      {
        "label": "_require_auth()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 47,
        "churn": 38,
        "risk": 21.0
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 83,
        "churn": 34,
        "risk": 20.9
      },
      {
        "label": "assistant_tools.py",
        "file": "aec/assistant_tools.py",
        "kind": "file",
        "degree": 60,
        "churn": 18,
        "risk": 20.9
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
      "finding": "aec/router.py is the hotspot \u2014 163 dependents, 38 commits in 90d",
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
