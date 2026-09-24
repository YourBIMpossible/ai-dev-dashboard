window.NETWORKX_IMPACT = {
  "generated": "2026-09-24T03:12:46Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 18048,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 18048,
      "edges": 42691,
      "commit": "ea32beee",
      "commitsBehind": 34,
      "builtAt": "2026-09-13",
      "stale": true
    },
    "cycles": {
      "count": 0,
      "baseline": 0,
      "delta": 0,
      "rootCauses": [],
      "excludedExternal": 23,
      "examples": []
    },
    "hubs": [
      {
        "label": "aec/router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 190,
        "churn": 33,
        "risk": 62.6
      },
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 195,
        "churn": 62,
        "risk": 55.2
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 145,
        "churn": 39,
        "risk": 50.9
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 85,
        "churn": 62,
        "risk": 39.7
      },
      {
        "label": "account_router.py",
        "file": "account_router.py",
        "kind": "file",
        "degree": 92,
        "churn": 21,
        "risk": 31.7
      },
      {
        "label": "admin_router.py",
        "file": "admin_router.py",
        "kind": "file",
        "degree": 100,
        "churn": 21,
        "risk": 31.2
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 76,
        "churn": 24,
        "risk": 28.5
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 53,
        "churn": 33,
        "risk": 25.3
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 92,
        "churn": 35,
        "risk": 22.5
      },
      {
        "label": "Firm",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 201,
        "churn": 62,
        "risk": 22.4
      },
      {
        "label": "assistant_tools.py",
        "file": "aec/assistant_tools.py",
        "kind": "file",
        "degree": 59,
        "churn": 18,
        "risk": 19.7
      },
      {
        "label": "assert_project_access()",
        "file": "aec/hub_tenancy.py",
        "kind": "symbol",
        "degree": 94,
        "churn": 13,
        "risk": 19.6
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
      "finding": "No circular imports. 23 third-party symbols excluded (graphify credits them to the importing file).",
      "category": "clear"
    },
    {
      "id": "blast_radius",
      "label": "Blast Radius",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "degree \u00d7 90d churn",
      "nodes": 12,
      "finding": "aec/router.py is the hotspot \u2014 190 dependents, 33 commits in 90d",
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
