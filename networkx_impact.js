window.NETWORKX_IMPACT = {
  "generated": "2026-08-29T13:00:16Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 13991,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 13991,
      "edges": 32500,
      "commit": "ac8ba6ff",
      "commitsBehind": 23,
      "builtAt": "2026-08-24",
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
        "label": "aec/router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 178,
        "churn": 82,
        "risk": 137.5
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 53,
        "churn": 82,
        "risk": 62.0
      },
      {
        "label": "db/models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 162,
        "churn": 62,
        "risk": 56.9
      },
      {
        "label": "_by_category()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 35,
        "churn": 82,
        "risk": 51.3
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 74,
        "churn": 62,
        "risk": 41.2
      },
      {
        "label": "_require_auth()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 43,
        "churn": 82,
        "risk": 33.4
      },
      {
        "label": "aps/router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 73,
        "churn": 31,
        "risk": 33.2
      },
      {
        "label": "_get()",
        "file": "aec/issues_client.py",
        "kind": "symbol",
        "degree": 91,
        "churn": 1,
        "risk": 32.2
      },
      {
        "label": "assistant_tools.py",
        "file": "aec/assistant_tools.py",
        "kind": "file",
        "degree": 58,
        "churn": 26,
        "risk": 28.3
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 71,
        "churn": 38,
        "risk": 26.8
      },
      {
        "label": "_authz_gate_model_read()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 18,
        "churn": 82,
        "risk": 21.9
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 76,
        "churn": 35,
        "risk": 21.0
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
      "finding": "aec/router.py is the hotspot \u2014 178 dependents, 82 commits in 90d",
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
