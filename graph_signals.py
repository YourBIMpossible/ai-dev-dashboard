#!/usr/bin/env python3
"""
graph_signals.py — honest codebase risk signals from the graphify graph.

Replaces the old regex-over-GRAPH_REPORT.md path, which reported graphify's
*display caps* as if they were measurements:

  * "20 import cycles"  was `find_import_cycles(top_n=20)` -- the ceiling.
  * "10 god nodes"      was `Select-Object -First 10` in Update-Graph.ps1 -- a
                        leaderboard length, not a defect count.

Both numbers were therefore constant in every snapshot since 2026-06-10, which
is why the dashboard sat permanently red with nothing the user could do about
it. This module computes from backend\\graphify-out\\graph.json directly and
reports numbers that can actually move.

It also corrects a graphify extraction artifact: symbols imported from
third-party/stdlib packages (FastAPI, Request, Session, datetime, ...) are
given a `source_file` pointing at the first-party file that imported them.
Cycle detection resolves endpoints through `source_file`, so every file that
imports `FastAPI` looks like it imports from main.py -- manufacturing an
~85-cycle hairball out of nothing. Filtering those endpoints takes the
BIMpossible backend from 89 reported cycles to 0 real ones.
"""

import ast
import json
import pathlib
import subprocess
from datetime import datetime, timezone

import networkx as nx

# Nodes living under these path segments are excluded from blast-radius
# ranking: a helper with 165 edges inside one test file is not a production
# single-point-of-failure, it is a well-used test fixture.
TEST_MARKERS = ("tests/", "test_", "/tests/", "conftest")


# -- graph loading -----------------------------------------------------------

def load_graph(graph_json: pathlib.Path):
    """Return (nx.Graph, built_at_commit) or (None, None) if unreadable."""
    try:
        data = json.loads(graph_json.read_text(encoding="utf-8"))
    except Exception:
        return None, None
    try:
        G = nx.node_link_graph(data, edges="links")
    except TypeError:            # networkx < 3.4 has no `edges=` kwarg
        G = nx.node_link_graph(data)
    return G, data.get("built_at_commit") or None


def _label(G, n):
    return G.nodes.get(n, {}).get("label", n) or ""


def _source_file(G, n):
    sf = G.nodes.get(n, {}).get("source_file", "")
    return sf if isinstance(sf, str) else ""


# -- first-party symbol table ------------------------------------------------

def defined_names(repo_root: pathlib.Path) -> dict:
    """Map each .py file (repo-relative, forward slashes) -> names it defines.

    Walks the whole AST rather than just module level, so nested helpers still
    count as "defined here". Being permissive is deliberate: a name we fail to
    find gets classified external and dropped from the signals, so we would
    rather under-flag than silently delete a real first-party edge.
    """
    table = {}
    for path in repo_root.rglob("*.py"):
        try:
            rel = path.relative_to(repo_root).as_posix()
        except ValueError:
            continue
        try:
            tree = ast.parse(path.read_text(encoding="utf-8", errors="replace"))
        except (SyntaxError, OSError):
            table[rel] = set()
            continue

        names = set()
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
                names.add(node.name)
            elif isinstance(node, ast.Assign):
                for tgt in node.targets:
                    if isinstance(tgt, ast.Name):
                        names.add(tgt.id)
            elif isinstance(node, ast.AnnAssign) and isinstance(node.target, ast.Name):
                names.add(node.target.id)
        table[rel] = names
    return table


def external_nodes(G, defs: dict) -> set:
    """Node ids whose symbol is NOT actually defined in its claimed source_file.

    These are third-party/stdlib imports that graphify credited to the first
    first-party file that imported them. They are the sole cause of the
    backend's phantom import cycles.
    """
    external = set()
    for n in G.nodes:
        sf = _source_file(G, n)
        if not sf:
            continue
        label = _label(G, n)
        # A file node (label == its own filename) is never an external symbol.
        if label.endswith(".py") or label.endswith(".ts") or label.endswith(".tsx"):
            continue
        sym = label[:-2] if label.endswith("()") else label
        if not sym or not sym.isidentifier():
            continue                      # prose/docstring nodes -- ignore
        known = defs.get(sf)
        if known is None:
            continue                      # file outside the scanned root
        if sym not in known:
            external.add(n)
    return external


# -- import cycles -----------------------------------------------------------

def _file_dag(G, external: set) -> nx.DiGraph:
    """File-level import DAG, skipping edges that touch an external symbol.

    Direction is derived from the edge's own `source_file` (the importing
    file) rather than the stored endpoint order, which graphify does not
    guarantee: importer -> provider.
    """
    dag = nx.DiGraph()
    for u, v, data in G.edges(data=True):
        if data.get("relation") not in ("imports_from", "re_exports"):
            continue
        if u in external or v in external:
            continue
        importer = data.get("source_file", "")
        if not isinstance(importer, str) or not importer:
            continue
        fu, fv = _source_file(G, u), _source_file(G, v)
        # The provider is whichever endpoint is not the importing file.
        provider = fv if fu == importer else fu
        if not provider or provider == importer:
            continue
        dag.add_edge(importer, provider)
    return dag


def import_cycles(G, external: set, max_len: int = 12) -> list:
    """Every real import cycle, uncapped. Shortest first."""
    dag = _file_dag(G, external)
    if dag.number_of_nodes() == 0:
        return []
    cycles = []
    for cyc in nx.simple_cycles(dag, length_bound=max_len):
        cycles.append({"cycle": list(cyc), "length": len(cyc)})
    cycles.sort(key=lambda c: (c["length"], c["cycle"]))
    return cycles


def cycle_root_causes(cycles: list) -> list:
    """Collapse cycles to the files that would break the most of them.

    Twenty cycles through one file is one refactor, not twenty. Greedily picks
    the file present in the most uncovered cycles until every cycle is
    attributed, so the dashboard can show "N cycles -> K root causes".
    """
    remaining = [set(c["cycle"]) for c in cycles]
    causes = []
    while remaining:
        counts = {}
        for cyc in remaining:
            for f in cyc:
                counts[f] = counts.get(f, 0) + 1
        pivot = max(counts, key=lambda f: (counts[f], f))
        hit = [c for c in remaining if pivot in c]
        causes.append({"file": pivot, "cycles": len(hit)})
        remaining = [c for c in remaining if pivot not in c]
    return causes


# -- blast radius ------------------------------------------------------------

def git_churn(repo_root: pathlib.Path, days: int = 90) -> dict:
    """Commits touching each file in the last `days`. {} if git is unavailable."""
    try:
        out = subprocess.run(
            ["git", "-C", str(repo_root), "log", f"--since={days}.days",
             "--name-only", "--pretty=format:"],
            capture_output=True, text=True, timeout=60, check=False,
        ).stdout
    except (OSError, subprocess.SubprocessError):
        return {}
    churn = {}
    for line in out.splitlines():
        line = line.strip()
        if line:
            churn[line] = churn.get(line, 0) + 1
    return churn


def _is_test(path: str) -> bool:
    p = path.lower()
    return any(m in p for m in TEST_MARKERS)


def blast_radius(G, external: set, churn: dict, repo_prefix: str = "backend/",
                 top: int = 12) -> list:
    """Rank first-party production nodes by degree, annotated with churn.

    The old list was 3/10 test-file helpers and 2/10 third-party imports, and
    it flagged `assert_project_allowed()` -- the security gate on all 74 routes
    -- as a "single point of failure" when a high degree there is the point.
    Churn is what separates the two: widely-depended-on AND frequently edited
    is a real risk; widely-depended-on and untouched for 90 days is just
    load-bearing.
    """
    rows = []
    for n, deg in G.degree:
        if n in external:
            continue
        sf = _source_file(G, n)
        if not sf or _is_test(sf):
            continue
        label = _label(G, n)
        if not label:
            continue
        commits = churn.get(repo_prefix + sf, 0)
        rows.append({
            "label":  label,
            "file":   sf,
            "kind":   "file" if label.endswith(".py") else "symbol",
            "degree": deg,
            "churn":  commits,
            # Frequently-edited hubs rank above equally-connected stable ones.
            "risk":   round(deg * (1 + commits) ** 0.5, 1),
        })
    rows.sort(key=lambda r: -r["risk"])
    return rows[:top]


# -- freshness ---------------------------------------------------------------

def freshness(repo_root: pathlib.Path, built_at_commit: str) -> dict:
    """How far the graph has drifted from HEAD.

    The panel used to stamp the *render* date on the data, so a graph 73
    commits stale still read as today's measurement.
    """
    info = {"commit": (built_at_commit or "")[:8] or None,
            "commitsBehind": None, "builtAt": None, "stale": None}
    if not built_at_commit:
        return info

    def _git(*args):
        try:
            r = subprocess.run(["git", "-C", str(repo_root), *args],
                               capture_output=True, text=True, timeout=30, check=False)
            return r.stdout.strip() if r.returncode == 0 else ""
        except (OSError, subprocess.SubprocessError):
            return ""

    behind = _git("rev-list", "--count", f"{built_at_commit}..HEAD")
    if behind.isdigit():
        info["commitsBehind"] = int(behind)
        info["stale"] = int(behind) > 25
    built = _git("log", "-1", "--format=%cI", built_at_commit)
    if built:
        info["builtAt"] = built[:10]
    return info


# -- baseline ----------------------------------------------------------------

def load_baseline(path: pathlib.Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_baseline(path: pathlib.Path, cycles: int, hubs: int, commit: str) -> dict:
    """Freeze today's counts as the budget to hold. Written once, then honoured.

    Without a baseline every signal is a permanent level and can only ever be
    "bad"; with one, holding the line is green and a regression is the alert.
    """
    data = {
        "setAt":  datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "commit": (commit or "")[:8],
        "cycles": cycles,
        "hubs":   hubs,
    }
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return data
