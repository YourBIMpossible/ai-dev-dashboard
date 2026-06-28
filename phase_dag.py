#!/usr/bin/env python3
"""
Build the BIMpossible phase-dependency DAG from the PHASE-STATUS ledger and emit:

  * phase_dag.js   ->  window.PHASE_DAG  (consumed by the dashboard panel)
  * PHASE_DAG.md   ->  human-readable summary (build order + critical path + lynchpins)

The ONLY edge source is the ledger's "Gate / depends on" column (real, owner-maintained
data — no invented edges). A cell's "Phase N" references become dependency edges
N -> P ("N enables P" / "P depends on N"); non-phase gates (e.g. "APS write-permission
approval", "Go-live gate", "= Wave 8") are kept as external-gate annotations, never as
graph edges. NetworkX then gives the deterministic build order (topological generations),
the critical path (longest enables-chain), and the lynchpins (phases gating the most
others, by descendant count).

Usage:  python phase_dag.py            # default ledger + write into this dir
        python phase_dag.py --check    # parse + print, write nothing (CI/preview)
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import networkx as nx

HERE = Path(__file__).resolve().parent
WS = Path(os.environ.get("BIMPOSSIBLE_WORKSPACE", r"F:\AI-Dev\BIMpossible_Workspace"))
DEFAULT_LEDGER = WS / "00_Strategy" / "BIMpossible_PHASE-STATUS.md"

_PHASE_REF = re.compile(r"Phase\s+(\d+)", re.IGNORECASE)


def _split_row(line: str) -> list[str]:
    return [c.strip() for c in line.strip().strip("|").split("|")]


def _is_sep(cells: list[str]) -> bool:
    return all(set(c) <= set("-: ") and c for c in cells)


def _clean(text: str) -> str:
    return text.replace("**", "").strip()


def parse_ledger(path: Path) -> list[dict]:
    """Rows: [{key, name, status, gate, note}] from the | Phase | Name | Status |
    Gate/depends on | Note | table."""
    rows, header, in_table = [], None, False
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip().startswith("|"):
            if in_table:
                break
            continue
        cells = _split_row(line)
        if header is None:
            header, in_table = cells, True
            continue
        if _is_sep(cells) or len(cells) < 5:
            continue
        rows.append({
            "key": _clean(cells[0]).replace("–", "-").replace(" ", ""),
            "name": _clean(cells[1]),
            "status": _clean(cells[2]).lstrip("⏸ ").strip(),
            "gate": _clean(cells[3]),
            "note": _clean(cells[4]),
        })
    if not rows:
        sys.exit(f"ERROR: no phase rows parsed from {path}")
    return rows


def build(rows: list[dict]) -> dict:
    keys = {r["key"] for r in rows}
    G = nx.DiGraph()
    external = []
    for r in rows:
        G.add_node(r["key"], name=r["name"], status=r["status"], gate=r["gate"])
    for r in rows:
        deps = {m for m in _PHASE_REF.findall(r["gate"]) if m in keys and m != r["key"]}
        for d in deps:
            G.add_edge(d, r["key"])          # d enables r  (r depends on d)
        gate = r["gate"]
        if gate and gate not in ("-", "—") and not deps:
            # a real gate that isn't a phase dependency -> external annotation
            external.append({"phase": r["key"], "gate": gate})

    if not nx.is_directed_acyclic_graph(G):
        cyc = list(nx.find_cycle(G))
        sys.exit(f"ERROR: phase gate column has a dependency cycle: {cyc}")

    generations = [sorted(g, key=_keysort) for g in nx.topological_generations(G)]
    critical = nx.dag_longest_path(G) if G.number_of_edges() else []
    name = {r["key"]: r["name"] for r in rows}
    status = {r["key"]: r["status"] for r in rows}

    nodes = []
    for r in rows:
        blocks = sorted(nx.descendants(G, r["key"]), key=_keysort)   # phases this one gates
        nodes.append({
            "id": r["key"], "name": r["name"], "status": r["status"],
            "dependsOn": sorted(G.predecessors(r["key"]), key=_keysort),
            "gates": blocks, "gatesCount": len(blocks),
        })
    lynchpins = sorted(
        [n for n in nodes if n["gatesCount"] > 0],
        key=lambda n: (-n["gatesCount"], _keysort(n["id"])),
    )
    return {
        "nodes": nodes,
        "generations": [[{"id": k, "name": name[k], "status": status[k]} for k in gen]
                        for gen in generations],
        "criticalPath": [{"id": k, "name": name[k], "status": status[k]} for k in critical],
        "lynchpins": [{"id": n["id"], "name": n["name"], "gatesCount": n["gatesCount"],
                       "gates": n["gates"]} for n in lynchpins],
        "externalGates": external,
        "edges": [{"from": u, "to": v} for u, v in sorted(G.edges(), key=lambda e: (_keysort(e[0]), _keysort(e[1])))],
    }


def _keysort(k: str):
    """Sort phase keys numerically ('0-2' < '3' < '11')."""
    head = re.match(r"\d+", k)
    return (int(head.group()) if head else 999, k)


def main() -> int:
    ap = argparse.ArgumentParser(description="Build the BIMpossible phase-dependency DAG.")
    ap.add_argument("--ledger", default=str(DEFAULT_LEDGER))
    ap.add_argument("--check", action="store_true", help="parse + print, write nothing")
    args = ap.parse_args()

    rows = parse_ledger(Path(args.ledger))
    dag = build(rows)
    dag["generated"] = datetime.now(timezone.utc).date().isoformat()

    crit = " -> ".join(f"P{n['id']}" for n in dag["criticalPath"]) or "(no dependencies)"
    lynch = ", ".join(f"P{l['id']} (gates {l['gatesCount']})" for l in dag["lynchpins"]) or "none"
    print(f"Phases: {len(dag['nodes'])} · edges: {len(dag['edges'])} · "
          f"generations: {len(dag['generations'])}")
    print(f"Critical path: {crit}")
    print(f"Lynchpins: {lynch}")
    if args.check:
        return 0

    js = "window.PHASE_DAG = " + json.dumps(dag, ensure_ascii=False, indent=0) + ";\n"
    (HERE / "phase_dag.js").write_text(js, encoding="utf-8")

    md = ["# BIMpossible Phase Dependency DAG", "",
          f"Source: `{Path(args.ledger).name}` (Gate/depends-on column). Auto-generated by `phase_dag.py`.", "",
          f"**Critical path:** {crit}", "",
          f"**Lynchpins (gate the most downstream phases):** {lynch}", "",
          "## Build order (topological generations)", ""]
    for i, gen in enumerate(dag["generations"]):
        md.append(f"{i+1}. " + ", ".join(f"P{g['id']} {g['name']} ({g['status']})" for g in gen))
    md += ["", "## External (non-phase) gates", ""]
    for e in dag["externalGates"]:
        md.append(f"- **P{e['phase']}** — {e['gate']}")
    (HERE / "PHASE_DAG.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    print("wrote phase_dag.js + PHASE_DAG.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
