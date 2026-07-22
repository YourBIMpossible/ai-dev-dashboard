window.NETWORKX_IMPACT = {
  "generated": "2026-07-22T00:09:28Z",
  "stats": {
    "repos": 4,
    "tools": 3,
    "algorithms": 6,
    "totalNodes": 9011,
    "missingCount": 0
  },
  "codebase": {
    "graph": {
      "nodes": 9011,
      "edges": 17611,
      "commit": "83384da8",
      "commitsBehind": 73,
      "builtAt": "2026-07-02",
      "stale": true
    },
    "cycles": {
      "count": 0,
      "baseline": 0,
      "delta": 0,
      "rootCauses": [],
      "excludedExternal": 140,
      "examples": []
    },
    "hubs": [
      {
        "label": "router.py",
        "file": "aec/router.py",
        "kind": "file",
        "degree": 222,
        "churn": 85,
        "risk": 2058.7
      },
      {
        "label": "models.py",
        "file": "db/models.py",
        "kind": "file",
        "degree": 80,
        "churn": 38,
        "risk": 499.6
      },
      {
        "label": "_serve_pool_schedule()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 52,
        "churn": 85,
        "risk": 482.2
      },
      {
        "label": "assistant.py",
        "file": "aec/assistant.py",
        "kind": "file",
        "degree": 80,
        "churn": 33,
        "risk": 466.5
      },
      {
        "label": "generate_spec_draft()",
        "file": "aec/spec_generator.py",
        "kind": "symbol",
        "degree": 255,
        "churn": 2,
        "risk": 441.7
      },
      {
        "label": "_by_category()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 34,
        "churn": 85,
        "risk": 315.3
      },
      {
        "label": "Firm",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 50,
        "churn": 38,
        "risk": 312.2
      },
      {
        "label": "_require_auth()",
        "file": "aec/router.py",
        "kind": "symbol",
        "degree": 32,
        "churn": 85,
        "risk": 296.8
      },
      {
        "label": "main.py",
        "file": "main.py",
        "kind": "file",
        "degree": 50,
        "churn": 29,
        "risk": 273.9
      },
      {
        "label": "assistant_tools.py",
        "file": "aec/assistant_tools.py",
        "kind": "file",
        "degree": 60,
        "churn": 18,
        "risk": 261.5
      },
      {
        "label": "router.py",
        "file": "aps/router.py",
        "kind": "file",
        "degree": 57,
        "churn": 19,
        "risk": 254.9
      },
      {
        "label": "Base",
        "file": "db/models.py",
        "kind": "symbol",
        "degree": 40,
        "churn": 38,
        "risk": 249.8
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
      "finding": "No circular imports. 140 third-party symbols excluded (graphify credits them to the importing file).",
      "category": "clear"
    },
    {
      "id": "blast_radius",
      "label": "Blast Radius",
      "repo": "BIMpossible",
      "tool": "graphify",
      "algo": "degree \u00d7 90d churn",
      "nodes": 12,
      "finding": "aec/router.py is the hotspot \u2014 222 dependents, 85 commits in 90d",
      "category": "watch"
    },
    {
      "id": "security_graph",
      "label": "Security Graph",
      "repo": "BIMpossible",
      "tool": "security_scan",
      "algo": "betweenness_centrality",
      "nodes": 163,
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
