window.NETWORKX_IMPACT = {
  "generated": "2026-10-21T13:00:30Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 27763,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 27763,
      "edges": 68557,
      "commit": "eeac8dd5",
      "commitsBehind": 0,
      "builtAt": "2026-10-17",
      "stale": false
    },
    "cycles": {
      "count": 0,
      "baseline": 0,
      "delta": 0,
      "rootCauses": [],
      "excludedExternal": 12,
      "examples": []
    },
    "hubs": [
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 291,
        "churn": 51,
        "risk": 38.7
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 148,
        "churn": 31,
        "risk": 36.9
      },
      {
        "label": "admin_router.py",
        "file": "admin_router.py",
        "kind": "file",
        "degree": 101,
        "churn": 28,
        "risk": 33.3
      },
      {
        "label": "account_router.py",
        "file": "account_router.py",
        "kind": "file",
        "degree": 81,
        "churn": 26,
        "risk": 29.5
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 96,
        "churn": 31,
        "risk": 27.3
      },
      {
        "label": "hub_tenancy.py",
        "file": "aec/hub_tenancy.py",
        "kind": "file",
        "degree": 156,
        "churn": 25,
        "risk": 25.8
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 90,
        "churn": 51,
        "risk": 22.6
      },
      {
        "label": "aec/router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 69,
        "churn": 42,
        "risk": 22.4
      },
      {
        "label": "change_set_router.py",
        "file": "aec/change_set_router.py",
        "kind": "file",
        "degree": 68,
        "churn": 25,
        "risk": 20.7
      },
      {
        "label": "Firm",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 368,
        "churn": 51,
        "risk": 20.4
      },
      {
        "label": "assert_project_access()",
        "file": "aec/hub_tenancy.py",
        "kind": "symbol",
        "degree": 125,
        "churn": 25,
        "risk": 20.3
      },
      {
        "label": "AccountAuditLog",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 218,
        "churn": 51,
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
      "finding": "No circular imports. 12 third-party symbols excluded (graphify credits them to the importing file).",
      "category": "clear"
    },
    {
      "id": "blast_radius",
      "label": "Blast Radius",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "degree \u00d7 90d churn",
      "nodes": 12,
      "finding": "db/models.py is the hotspot \u2014 291 dependents, 51 commits in 90d",
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
