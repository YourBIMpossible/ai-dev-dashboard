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
 *   node export-audit-findings.js --data-dir DIR  # read data.js/audit-freshness.js from DIR (tests)
 *
 * Exit codes:
 *   0  report produced
 *   1  data.js missing/invalid - nothing can be reported
 *   2  a REQUIRED input is missing or invalid (e.g. audit-freshness.js). No
 *      report is written: every sync/staleness claim this script makes depends
 *      on it, and an absent input is not an empty valid input (2026-08-31 slop
 *      audit, MEDIUM-2 - a missing audit-freshness.js used to render
 *      "All cards in sync with disk" and exit 0).
 *
 * Counting rules (2026-08-31 slop audit, LOW-2):
 *   - every severity count is DERIVED from the canonical open[] records; a card's
 *     declared `counts` block is only cross-checked and reported on mismatch;
 *   - a finding whose severity is not one of SEV_ORDER is counted as unclassified,
 *     never dropped;
 *   - cards with no `audit` block are counted and named, and every report states
 *     its own coverage, so no total here can be read as estate-wide.
 *
 * Pure reader. Never mutates data.js or any dashboard state.
 */

"use strict";
const fs = require("fs");
const path = require("path");

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
function argVal(f) { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : null; }

const HERE = __dirname;
// Tests point this at a fixture directory; production always reads the repo.
const DATA_DIR = argVal("--data-dir") ? path.resolve(argVal("--data-dir")) : HERE;
const SEV_ORDER = ["critical", "high", "medium", "low", "info"];
const SEV_RANK = Object.fromEntries(SEV_ORDER.map((s, i) => [s, i]));
// A severity outside SEV_ORDER lands in its own bucket rather than falling out
// of the tally: a finding we cannot classify is not zero findings.
const SEV_UNKNOWN = "unknown";
const SEV_BUCKETS = [...SEV_ORDER, SEV_UNKNOWN];

function normSev(v) {
  const t = typeof v === "string" ? v.trim().toLowerCase() : "";
  return SEV_RANK[t] === undefined ? SEV_UNKNOWN : t;
}
function sevRank(s) {
  const r = SEV_RANK[s];
  return r === undefined ? SEV_ORDER.length : r;  // unclassified sorts last, deterministically
}
function countBySev(findings) {
  const c = Object.fromEntries(SEV_BUCKETS.map((b) => [b, 0]));
  for (const f of findings) c[f.sev] += 1;
  return c;
}

// ---- load the generated data the same way the repo's own tooling does ----
// data.js / audit-freshness.js are plain scripts that assign `window.X = {...}`.
// Point `window` at Node's global object and require() them; no eval, no
// string-built functions — identical to the sync/validate scripts' approach.
global.window = global.window || {};
// Returns {ok, value, reason}. A missing or unparseable input is a FAILURE, not
// an empty value - the callers below decide whether the input is required.
function loadGlobal(file, prop) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return { ok: false, reason: `not found: ${p}` };
  try {
    require(p);
  } catch (e) {
    return { ok: false, reason: `${file} could not be parsed: ${e.message}` };
  }
  const value = global.window[prop];
  if (!value || typeof value !== "object") {
    return { ok: false, reason: `${file} loaded but did not define window.${prop}` };
  }
  return { ok: true, value };
}

const dataLoad = loadGlobal("data.js", "DASHBOARD_DATA");
if (!dataLoad.ok || !Array.isArray(dataLoad.value.projects)) {
  console.error(`ERROR: could not load DASHBOARD_DATA.projects from data.js - ${dataLoad.reason || "projects is not an array"}`);
  process.exit(1);
}
const DATA = dataLoad.value;

// audit-freshness.js is REQUIRED: every "in sync with disk" / "stale" claim in
// this report is derived from it. Without it the answer is unknown, and unknown
// must not render as an all-clear.
const freshLoad = loadGlobal("audit-freshness.js", "AUDIT_FRESHNESS");
if (!freshLoad.ok || !freshLoad.value.projects || typeof freshLoad.value.projects !== "object") {
  console.error("STALENESS UNKNOWN - audit-freshness.js not loaded or invalid: " +
    (freshLoad.reason || "audit-freshness.js defines no projects object"));
  console.error("No report written. Run check_audit_freshness.py, then re-run this export.");
  process.exit(2);
}
const FRESH = freshLoad.value;

// ---- collect ----
// Cards with no `audit` block are not findings-free, they are UNMEASURED. They
// are collected and named instead of being skipped silently, so no total below
// can be mistaken for estate-wide coverage.
const cardsWithoutAudit = [];

function collect() {
  const rows = [];
  for (const p of DATA.projects) {
    if (!p.audit) { cardsWithoutAudit.push({ id: p.id, name: p.name || p.id }); continue; }
    const a = p.audit;
    const fresh = (FRESH.projects || {})[p.id] || null;
    const open = (a.open || [])
      .map((f) => {
        const sev = normSev(f.sev);
        return sev === f.sev ? f : { ...f, sev, sevRaw: f.sev };
      })
      .sort((x, y) => sevRank(x.sev) - sevRank(y.sev));
    // Counts are DERIVED from open[]. The declared `counts` block is only
    // cross-checked: rendering declared severities beside a derived open total
    // produced a table whose columns did not add up to its own headline.
    const counts = countBySev(open);
    const declared = a.counts || {};
    const countMismatch = SEV_ORDER
      .filter((sv) => (declared[sv] || 0) !== counts[sv])
      .map((sv) => ({ sev: sv, declared: declared[sv] || 0, derived: counts[sv] }));
    rows.push({
      id: p.id,
      name: p.name || p.id,
      lastRun: a.lastRun || null,
      runType: a.runType || null,
      cadence: a.cadence || null,
      counts,
      declaredCounts: declared,
      countMismatch,
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

const COVERAGE = {
  cards: DATA.projects.length,
  withAudit: rows.length,
  withoutAudit: cardsWithoutAudit.length,
  missing: cardsWithoutAudit,
};
const COVERAGE_LINE =
  `Audit coverage: ${COVERAGE.withAudit} of ${COVERAGE.cards} project cards contain audit data; ` +
  `${COVERAGE.withoutAudit} have no audit block.`;
const mismatchRows = rows.filter((r) => r.countMismatch.length);
// Cards audit-freshness.js says nothing about: their sync state is unknown, so
// they may not be swept into an "all in sync" claim either.
const unknownFreshness = rows.filter((r) => r.stale === null);

// ---- aggregate totals ----
// Every number here comes from the same source - the open[] records - so the
// severity columns always add up to the open total.
function totals() {
  const t = Object.fromEntries(SEV_BUCKETS.map((b) => [b, 0]));
  t.open = 0;
  t.closedLastRun = 0;
  for (const r of rows) {
    for (const b of SEV_BUCKETS) t[b] += r.counts[b];
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
  return ({ critical: "🔴 Critical", high: "🟠 High", medium: "🟡 Medium", low: "🔵 Low", info: "⚪ Info",
    [SEV_UNKNOWN]: "⚫ Unclassified" }[s]) || s;
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
    `${T.critical} Critical · ${T.high} High · ${T.medium} Medium · ${T.low} Low · ${T.info} Info` +
    (T[SEV_UNKNOWN] ? ` · ${T[SEV_UNKNOWN]} unclassified severity` : "") + ". " +
    `${T.closedLastRun} closed in the most recent cycle. All severity counts are derived from the open findings themselves.`);
  L.push("");
  L.push(`_${COVERAGE_LINE}_`);
  L.push("");
  if (COVERAGE.withoutAudit) {
    L.push(`> ⚠️ **${COVERAGE.withoutAudit} card(s) carry no audit data at all** (unmeasured, not clean): ` +
      COVERAGE.missing.map((c) => esc(c.name)).join(", ") + ". Nothing above covers them.");
    L.push("");
  }
  if (mismatchRows.length) {
    L.push(`> ⚠️ **Declared counts disagree with the open findings** on ${mismatchRows.length} card(s): ` +
      mismatchRows.map((r) => `${esc(r.name)} (` +
        r.countMismatch.map((m) => `${m.sev}: declared ${m.declared}, open ${m.derived}`).join("; ") +
        ")").join("; ") + ". The derived numbers are the ones shown.");
    L.push("");
  }
  if (staleProjects.length) {
    L.push(`> ⚠️ **${staleProjects.length} project(s) out of sync with disk:** ` +
      staleProjects.map((r) => `${r.name} (shown ${r.lastRun}, newer on disk ${r.newestOnDisk})`).join("; ") + ".");
    L.push("");
  }
  if (unknownFreshness.length) {
    L.push(`> ❓ **Sync state UNKNOWN for ${unknownFreshness.length} card(s)** absent from audit-freshness.js: ` +
      unknownFreshness.map((r) => esc(r.name)).join(", ") + ".");
    L.push("");
  }
  if (!staleProjects.length && !unknownFreshness.length) {
    L.push("> ✅ All cards with audit data are in sync with the newest report on disk.");
    L.push("");
  }

  // summary table
  L.push("## By project");
  L.push("");
  L.push("| Project | Last run | Fresh | Crit | High | Med | Low | Info | Unclass | Open | Closed (cycle) |");
  L.push("|---|---|:--:|--:|--:|--:|--:|--:|--:|--:|--:|");
  for (const r of rows) {
    const fresh = r.stale === null ? "❓ unknown" : (r.stale ? "⚠️ stale" : "✅");
    L.push(`| ${esc(r.name)} | ${esc(r.lastRun) || "—"} | ${fresh} | ` +
      `${r.counts.critical} | ${r.counts.high} | ${r.counts.medium} | ` +
      `${r.counts.low} | ${r.counts.info} | ${r.counts[SEV_UNKNOWN]} | ${r.open.length} | ${r.closedLastRun ?? "—"} |`);
  }
  // Unmeasured cards get a row too - a card that vanishes from the table reads
  // as a card with nothing to report.
  for (const c of cardsWithoutAudit) {
    L.push(`| ${esc(c.name)} | _no audit data_ | ❓ | — | — | — | — | — | — | — | — |`);
  }
  L.push("");
  L.push(`_${COVERAGE_LINE}_`);
  L.push("");

  // per-project open findings
  L.push("## Open findings");
  L.push("");
  const withFindings = rows.filter((r) => r.open.length);
  if (!withFindings.length) {
    L.push(`_No open findings on any of the ${COVERAGE.withAudit} card(s) that carry audit data._`);
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
      const sevCell = sevBadge(f.sev) + (f.sevRaw === undefined ? "" : ` (raw: ${esc(f.sevRaw)})`);
      L.push(`| ${esc(f.id)} | ${sevCell} | ${esc(f.title)} | ${esc(f.where) || "—"} |`);
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
    coverage: COVERAGE,
    totals: T,
    countMismatch: mismatchRows.map((r) => ({ id: r.id, name: r.name, mismatch: r.countMismatch })),
    freshnessUnknown: unknownFreshness.map((r) => ({ id: r.id, name: r.name })),
    stale: staleProjects.map((r) => ({ id: r.id, name: r.name, lastRun: r.lastRun, newestOnDisk: r.newestOnDisk })),
    projects: rows.map((r) => ({
      id: r.id, name: r.name, lastRun: r.lastRun, runType: r.runType, cadence: r.cadence,
      counts: r.counts, declaredCounts: r.declaredCounts, countMismatch: r.countMismatch,
      closedLastRun: r.closedLastRun, trend: r.trend,
      reportFile: r.reportFile, reportPath: r.reportPath,
      stale: r.stale, newestOnDisk: r.newestOnDisk,
      open: r.open, history: r.history,
    })),
  }, null, 2);
}

// ---- CLI ----
if (has("--json")) {
  process.stdout.write(toJSON() + "\n");
  process.exit(0);
}

const outPath = argVal("--out") || path.join(HERE, "audit-findings-report.md");
const md = toMarkdown({ openOnly: has("--open-only") });
fs.writeFileSync(outPath, md, "utf8");

// console summary
console.log(`Audit findings: ${T.open} open ` +
  `(${T.critical}C / ${T.high}H / ${T.medium}M / ${T.low}L / ${T.info}I` +
  (T[SEV_UNKNOWN] ? ` / ${T[SEV_UNKNOWN]} unclassified` : "") + `), ` +
  `${T.closedLastRun} closed last cycle.`);
console.log(COVERAGE_LINE);
if (COVERAGE.withoutAudit) {
  console.log(`   unmeasured (no audit block): ${COVERAGE.missing.map((c) => c.name).join(", ")}`);
}
if (mismatchRows.length) {
  console.log(`⚠️  declared counts disagree with open findings on ${mismatchRows.length} card(s): ` +
    mismatchRows.map((r) => r.id).join(", ") + " (derived numbers shown)");
}
if (staleProjects.length) {
  console.log(`⚠️  ${staleProjects.length} card(s) stale: ` +
    staleProjects.map((r) => r.name).join(", "));
}
if (unknownFreshness.length) {
  console.log(`❓  ${unknownFreshness.length} card(s) absent from audit-freshness.js - sync state unknown: ` +
    unknownFreshness.map((r) => r.name).join(", "));
}
if (!staleProjects.length && !unknownFreshness.length) {
  console.log("✅ All cards with audit data in sync with disk.");
}
console.log(`Report written: ${path.relative(process.cwd(), outPath) || outPath}`);
