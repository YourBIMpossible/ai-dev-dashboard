#!/usr/bin/env node
/**
 * export-audit-findings.js — one-command audit-findings report for the dashboard.
 *
 * Reads the same generated data the live board renders (data.js) plus the
 * freshness signal (audit-freshness.js) and emits a single consolidated report
 * of every open audit finding across every project card, so you never have to
 * ask for it interactively.
 *
 * Usage:
 *   node export-audit-findings.js                 # write audit-findings-report.md + print summary
 *   node export-audit-findings.js --json          # print structured JSON to stdout (no file)
 *   node export-audit-findings.js --out report.md # write markdown to a custom path
 *   node export-audit-findings.js --open-only     # markdown: skip the history digest
 *
 * Pure reader. Never mutates data.js or any dashboard state.
 */

"use strict";
const fs = require("fs");
const path = require("path");

const HERE = __dirname;
const SEV_ORDER = ["critical", "high", "medium", "low", "info"];
const SEV_RANK = Object.fromEntries(SEV_ORDER.map((s, i) => [s, i]));

// ---- load the generated data the same way the repo's own tooling does ----
// data.js / audit-freshness.js are plain scripts that assign `window.X = {...}`.
// Point `window` at Node's global object and require() them; no eval, no
// string-built functions — identical to the sync/validate scripts' approach.
global.window = global.window || {};
function loadGlobal(file, prop) {
  const p = path.join(HERE, file);
  if (!fs.existsSync(p)) return null;
  require(p);
  return global.window[prop] || null;
}

const DATA = loadGlobal("data.js", "DASHBOARD_DATA");
if (!DATA || !Array.isArray(DATA.projects)) {
  console.error("ERROR: could not load DASHBOARD_DATA.projects from data.js");
  process.exit(1);
}
const FRESH = loadGlobal("audit-freshness.js", "AUDIT_FRESHNESS") || { projects: {} };

// ---- collect ----
function collect() {
  const rows = [];
  for (const p of DATA.projects) {
    if (!p.audit) continue;
    const a = p.audit;
    const fresh = (FRESH.projects || {})[p.id] || null;
    const open = (a.open || []).slice().sort(
      (x, y) => (SEV_RANK[x.sev] ?? 99) - (SEV_RANK[y.sev] ?? 99)
    );
    rows.push({
      id: p.id,
      name: p.name || p.id,
      lastRun: a.lastRun || null,
      runType: a.runType || null,
      cadence: a.cadence || null,
      counts: a.counts || {},
      closedLastRun: a.closedLastRun ?? null,
      trend: a.trend || null,
      reportFile: a.reportFile || null,
      reportPath: a.reportPath || null,
      stale: fresh ? !!fresh.stale : null,
      newestOnDisk: fresh ? fresh.newestOnDisk : null,
      staleAction: fresh ? fresh.action : null,
      open,
      history: a.history || [],
    });
  }
  // projects with findings first, then by open count desc
  rows.sort((x, y) => y.open.length - x.open.length);
  return rows;
}

const rows = collect();

// ---- aggregate totals ----
function totals() {
  const t = { critical: 0, high: 0, medium: 0, low: 0, info: 0, open: 0, closedLastRun: 0 };
  for (const r of rows) {
    for (const s of SEV_ORDER) t[s] += (r.counts[s] || 0);
    t.open += r.open.length;
    t.closedLastRun += (r.closedLastRun || 0);
  }
  return t;
}
const T = totals();
const staleProjects = rows.filter((r) => r.stale);

// ---- markdown ----
function esc(s) {
  return String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
function sevBadge(s) {
  return ({ critical: "🔴 Critical", high: "🟠 High", medium: "🟡 Medium", low: "🔵 Low", info: "⚪ Info" }[s]) || s;
}

function toMarkdown({ openOnly } = {}) {
  const L = [];
  L.push("# Audit Findings — Consolidated Report");
  L.push("");
  L.push(`_Generated ${new Date().toISOString().replace("T", " ").slice(0, 19)} from data.js + audit-freshness.js. Source of truth is the dashboard; regenerate with \`node export-audit-findings.js\`._`);
  L.push("");

  // overall
  L.push("## Totals");
  L.push("");
  L.push(`**${T.open} findings open** across ${rows.filter((r) => r.open.length).length} project(s) — ` +
    `${T.critical} Critical · ${T.high} High · ${T.medium} Medium · ${T.low} Low · ${T.info} Info. ` +
    `${T.closedLastRun} closed in the most recent cycle.`);
  L.push("");
  if (staleProjects.length) {
    L.push(`> ⚠️ **${staleProjects.length} project(s) out of sync with disk:** ` +
      staleProjects.map((r) => `${r.name} (shown ${r.lastRun}, newer on disk ${r.newestOnDisk})`).join("; ") + ".");
    L.push("");
  } else {
    L.push("> ✅ All cards are in sync with the newest report on disk.");
    L.push("");
  }

  // summary table
  L.push("## By project");
  L.push("");
  L.push("| Project | Last run | Fresh | Crit | High | Med | Low | Info | Open | Closed (cycle) |");
  L.push("|---|---|:--:|--:|--:|--:|--:|--:|--:|--:|");
  for (const r of rows) {
    const fresh = r.stale === null ? "—" : (r.stale ? "⚠️ stale" : "✅");
    L.push(`| ${esc(r.name)} | ${esc(r.lastRun) || "—"} | ${fresh} | ` +
      `${r.counts.critical || 0} | ${r.counts.high || 0} | ${r.counts.medium || 0} | ` +
      `${r.counts.low || 0} | ${r.counts.info || 0} | ${r.open.length} | ${r.closedLastRun ?? "—"} |`);
  }
  L.push("");

  // per-project open findings
  L.push("## Open findings");
  L.push("");
  const withFindings = rows.filter((r) => r.open.length);
  if (!withFindings.length) {
    L.push("_No open findings on any card._");
    L.push("");
  }
  for (const r of withFindings) {
    L.push(`### ${r.name} — ${r.open.length} open`);
    L.push("");
    const meta = [];
    if (r.lastRun) meta.push(`last run **${r.lastRun}**`);
    if (r.runType) meta.push(r.runType);
    if (r.cadence) meta.push(`cadence: ${r.cadence}`);
    if (r.trend) meta.push(`trend: ${r.trend}`);
    if (r.reportFile) meta.push(`report: \`${r.reportFile}\``);
    if (meta.length) { L.push(meta.join(" · ")); L.push(""); }
    L.push("| ID | Severity | Finding | Where |");
    L.push("|---|---|---|---|");
    for (const f of r.open) {
      L.push(`| ${esc(f.id)} | ${sevBadge(f.sev)} | ${esc(f.title)} | ${esc(f.where) || "—"} |`);
    }
    L.push("");
  }

  // history digest
  if (!openOnly) {
    const withHist = rows.filter((r) => (r.history || []).length);
    if (withHist.length) {
      L.push("## Audit history (most recent first)");
      L.push("");
      for (const r of withHist) {
        L.push(`### ${r.name}`);
        L.push("");
        for (const h of r.history) {
          L.push(`- **${esc(h.date)}** — ${esc(h.type) || "(audit)"}${h.report ? ` _(${esc(h.report)})_` : ""}`);
        }
        L.push("");
      }
    }
  }

  return L.join("\n");
}

// ---- JSON shape ----
function toJSON() {
  return JSON.stringify({
    generated: new Date().toISOString(),
    totals: T,
    stale: staleProjects.map((r) => ({ id: r.id, name: r.name, lastRun: r.lastRun, newestOnDisk: r.newestOnDisk })),
    projects: rows.map((r) => ({
      id: r.id, name: r.name, lastRun: r.lastRun, runType: r.runType, cadence: r.cadence,
      counts: r.counts, closedLastRun: r.closedLastRun, trend: r.trend,
      reportFile: r.reportFile, reportPath: r.reportPath,
      stale: r.stale, newestOnDisk: r.newestOnDisk,
      open: r.open, history: r.history,
    })),
  }, null, 2);
}

// ---- CLI ----
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
function argVal(f) { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : null; }

if (has("--json")) {
  process.stdout.write(toJSON() + "\n");
  process.exit(0);
}

const outPath = argVal("--out") || path.join(HERE, "audit-findings-report.md");
const md = toMarkdown({ openOnly: has("--open-only") });
fs.writeFileSync(outPath, md, "utf8");

// console summary
console.log(`Audit findings: ${T.open} open ` +
  `(${T.critical}C / ${T.high}H / ${T.medium}M / ${T.low}L / ${T.info}I), ` +
  `${T.closedLastRun} closed last cycle.`);
if (staleProjects.length) {
  console.log(`⚠️  ${staleProjects.length} card(s) stale: ` +
    staleProjects.map((r) => r.name).join(", "));
} else {
  console.log("✅ All cards in sync with disk.");
}
console.log(`Report written: ${path.relative(process.cwd(), outPath) || outPath}`);
