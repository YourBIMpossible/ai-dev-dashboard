#!/usr/bin/env node
/**
 * Bundle the BIMpossible graphify artifacts into the dashboard so the Codebase
 * tabs can show them (the dashboard is static on Cloudflare and can't read local
 * files, so we copy them in and they deploy + serve same-origin).
 *
 * Produces under dashboard/codebase/:
 *   GRAPH_REPORT.md        — copied as-is (rendered client-side in the Report tab)
 *   graph-dashboard.html   — copied graphify dashboard (self-contained, iframed)
 *   graph-network.html     — generated reduced interactive graph (top-N by degree,
 *                            vis-network) since the full 6.6k-node graph is too big
 *   codebase-meta.js       — window.DASHBOARD_CODEBASE (counts, commit, generated)
 *
 *   node codebase_sync.mjs            (bundle + push)
 *   node codebase_sync.mjs --no-push  (bundle only)
 *
 * Refresh-Dashboard.ps1 calls the --no-push form on every scheduled refresh, so these
 * four artifacts track the backend automatically; that script's own commit+push stages
 * `codebase/` alongside data.js. Before that wiring (2026-07-21) the only caller was a
 * human running it by hand, and the bundle sat frozen at the 2026-06-13 graph for six
 * weeks. Run it manually (without --no-push) only to publish a bundle out of band.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// REPO is this script's own directory, not a hardcoded path: Refresh-Dashboard.ps1 calls
// us from the DEDICATED automation clone (Dashboard-auto), and a hardcoded
// "F:/AI-Dev/Dashboard" would bundle into the editing clone instead - the automation
// clone would then commit a `codebase/` it never refreshed. Both clones keep this script
// at the repo root, so script-dir is the repo root in either. Env vars override for tests.
const SRC = process.env.GRAPHIFY_OUT || "F:/AI-Dev/BIMpossible/backend/graphify-out";
const REPO = process.env.DASHBOARD_REPO || dirname(fileURLToPath(import.meta.url));
const OUT = join(REPO, "codebase");
const PUSH = !process.argv.includes("--no-push");
const TOP_N = 170;
const PAL = ["#6ea8ff","#a78bfa","#34d399","#fbbf24","#f87171","#22d3ee","#fb923c","#a3e635","#f472b6","#60a5fa","#c084fc","#2dd4bf"];

if (!existsSync(join(SRC, "graph.json"))) { console.error("graphify-out not found at " + SRC); process.exit(1); }
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// 1) copy report + dashboard
if (existsSync(join(SRC, "GRAPH_REPORT.md"))) copyFileSync(join(SRC, "GRAPH_REPORT.md"), join(OUT, "GRAPH_REPORT.md"));
if (existsSync(join(SRC, "dashboard.html"))) copyFileSync(join(SRC, "dashboard.html"), join(OUT, "graph-dashboard.html"));

// 2) reduced interactive network from graph.json
const g = JSON.parse(readFileSync(join(SRC, "graph.json"), "utf8"));
const nodes = g.nodes || [], links = g.links || [];
const deg = {};
for (const l of links) { deg[l.source] = (deg[l.source] || 0) + 1; deg[l.target] = (deg[l.target] || 0) + 1; }
const top = [...nodes].sort((a, b) => (deg[b.id] || 0) - (deg[a.id] || 0)).slice(0, TOP_N);
const keep = new Set(top.map((n) => n.id));
const commColor = {};
let ci = 0;
const visNodes = top.map((n) => {
  const c = n.community;
  if (!(c in commColor)) commColor[c] = PAL[ci++ % PAL.length];
  const d = deg[n.id] || 1;
  return { id: n.id, label: n.label || n.id, value: d, color: commColor[c], title: `${n.label || n.id} · ${d} links · community ${c}` };
});
const seen = new Set();
const visEdges = [];
for (const l of links) {
  if (!keep.has(l.source) || !keep.has(l.target)) continue;
  const k = l.source < l.target ? l.source + "|" + l.target : l.target + "|" + l.source;
  if (seen.has(k)) continue; seen.add(k);
  visEdges.push({ from: l.source, to: l.target });
}

const viewer = `<!doctype html><html><head><meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/vis-network@9.1.9/standalone/umd/vis-network.min.js"></scr`+`ipt>
<style>html,body{margin:0;height:100%;background:#0a0e17;overflow:hidden}#net{width:100%;height:100vh}
#hint{position:fixed;top:10px;left:12px;font:11px Inter,system-ui,sans-serif;color:#8491a8;background:rgba(10,14,23,.7);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.08)}</style>
</head><body><div id="hint">Top ${TOP_N} most-connected modules of ${nodes.length} · drag to explore · scroll to zoom</div><div id="net"></div>
<script>
const NODES=${JSON.stringify(visNodes)},EDGES=${JSON.stringify(visEdges)};
const net=new vis.Network(document.getElementById('net'),{nodes:new vis.DataSet(NODES),edges:new vis.DataSet(EDGES)},{
  nodes:{shape:'dot',scaling:{min:6,max:34},font:{color:'#cfd6e6',size:12,face:'Inter'},borderWidth:0},
  edges:{color:{color:'rgba(110,168,255,.22)',highlight:'#6ea8ff'},width:0.6,smooth:false},
  physics:{stabilization:{iterations:220},barnesHut:{gravitationalConstant:-9000,springLength:130,springConstant:0.03,damping:0.5}},
  interaction:{hover:true,tooltipDelay:120}});
</scr`+`ipt></body></html>`;
writeFileSync(join(OUT, "graph-network.html"), viewer, "utf8");

// 3) meta. `generated` is bumped ONLY when the substance below it changes, so a re-run
// over an unchanged graph rewrites this file byte-for-byte. That matters because
// Refresh-Dashboard.ps1 stages codebase/ on every scheduled run and reads "nothing
// staged" as "already current": a wall-clock stamp here manufactures a diff every time
// and turns the daily refresh into a perpetual no-op commit+push (caught 2026-07-21,
// before it ever ran). Nothing reads `generated`; it just must not invent churn.
const stats = {
  commit: (g.built_at_commit || "").slice(0, 7),
  nodes: nodes.length, links: links.length, communities: new Set(nodes.map((n) => n.community)).size,
  shownNodes: visNodes.length, shownEdges: visEdges.length,
};
const metaPath = join(OUT, "codebase-meta.js");
// Key-order-independent compare, so reordering `stats` can't silently defeat the reuse.
const canon = (o) => JSON.stringify(Object.keys(o).sort().map((k) => [k, o[k]]));
let generated = new Date().toISOString();
try {
  const { generated: prevGen, ...prevStats } = JSON.parse(
    readFileSync(metaPath, "utf8").replace(/^[^{]*/, "").replace(/;\s*$/, "")
  );
  if (prevGen && canon(prevStats) === canon(stats)) generated = prevGen;
} catch { /* no prior meta, or unparseable - stamp fresh */ }
writeFileSync(metaPath, "window.DASHBOARD_CODEBASE = " + JSON.stringify({ generated, ...stats }, null, 2) + ";\n", "utf8");
console.log(`codebase/: report + dashboard copied; graph-network.html = ${visNodes.length}/${nodes.length} nodes, ${visEdges.length} edges; commit ${stats.commit}.`);

if (!PUSH) { console.log("--no-push set."); process.exit(0); }
function git(a) { return execSync(`git -C "${REPO}" ${a}`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
try {
  git("pull --rebase --autostash origin main");
  git("add codebase");
  if (!git("status --porcelain codebase").trim()) { console.log("codebase unchanged."); process.exit(0); }
  git(`commit -m "codebase: refresh graphify artifacts (report/dashboard/network)" -- codebase`);
  git("push origin main");
  console.log("Pushed codebase artifacts.");
} catch (e) { console.error("git failed:", e.message); process.exit(1); }
