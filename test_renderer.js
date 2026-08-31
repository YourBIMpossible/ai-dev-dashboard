/*
 * Renderer-level tests for the cohort-aware hero caption in index.html
 * (run: node test_renderer.js — no test runner).
 *
 * These do NOT re-copy the renderer logic. They extract the ACTUAL function
 * sources (esc, isActivePhase, activePhases, inScopePhases, overallPct,
 * cohortResults, scopeCaption, cohortMetricsHtml + the PRE_MODEL_HELD_PHASE
 * const) out of index.html and execute them in a `vm` sandbox whose global IS
 * `window` (so bare `PhaseMetrics` === `window.PhaseMetrics`, matching the
 * browser). That lets us drive the two real runtime states:
 *   - module PRESENT  (phase_metrics.js loaded, window.PhaseMetrics = api)
 *   - module ABSENT   (window.PhaseMetrics = null, the <script onerror> path)
 * and assert the caption's cohort-awareness is driven by DECLARED cohort
 * presence, not by project.id and not by whether the metric was computed.
 */
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const HTML = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const PM_SRC = fs.readFileSync(path.join(__dirname, "phase_metrics.js"), "utf8");
const DATA_SRC = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("  ok - " + name); }

// --- extract a top-level `function NAME(...){...}` by brace matching. The
// target functions contain only balanced braces (function blocks + `${}`
// interpolations); no stray brace lives inside a string literal, so a plain
// depth counter is exact here and stays faithful to the real source. ---
function extractFn(src, name) {
  const i = src.indexOf("function " + name + "(");
  if (i < 0) throw new Error("renderer function not found in index.html: " + name);
  const open = src.indexOf("{", i);
  let depth = 0, j = open;
  for (; j < src.length; j++) {
    const c = src[j];
    if (c === "{") depth++;
    else if (c === "}" && --depth === 0) { j++; break; }
  }
  if (depth !== 0) throw new Error("unbalanced braces extracting " + name);
  return src.slice(i, j);
}
function extractConstLine(src, name) {
  const i = src.indexOf("const " + name + "=");
  if (i < 0) throw new Error("const not found in index.html: " + name);
  return src.slice(i, src.indexOf("\n", i));
}

const RENDERER_FNS = ["esc", "isActivePhase", "activePhases", "inScopePhases",
  "overallPct", "cohortResults", "scopeCaption", "cohortMetricsHtml"];
const RENDERER_SRC = extractConstLine(HTML, "PRE_MODEL_HELD_PHASE") + "\n" +
  RENDERER_FNS.map(n => extractFn(HTML, n)).join("\n");

// Build a sandbox that reproduces one runtime state. withModule=true loads the
// real phase_metrics.js (sets window.PhaseMetrics); false leaves it null.
function buildEnv(withModule, withData) {
  const sandbox = {};
  sandbox.window = sandbox;            // global === window, as in a browser
  sandbox.console = console;
  sandbox.donut = () => "<donut/>";    // renderer dep; content irrelevant here
  vm.createContext(sandbox);
  if (withModule) vm.runInContext(PM_SRC, sandbox, { filename: "phase_metrics.js" });
  else sandbox.PhaseMetrics = null;    // == window.PhaseMetrics (onerror path)
  if (withData) vm.runInContext(DATA_SRC, sandbox, { filename: "data.js" });
  vm.runInContext(RENDERER_SRC, sandbox, { filename: "index.html:renderer" });
  return sandbox;
}

// ---- fixtures: NON-BIMpossible projects, one with a declared cohort ----
// acme declares a frozen cohort (q1-2026): A1(100), A2(50), A2.1->A2 (dedupe)
// => baseline (100+50)/2 = 75, den 2. Active headline also 75 (A3 held).
const acme = {
  id: "acme", name: "Acme Platform",
  phaseAliases: { "A2.1": "A2" },
  baselineCohorts: [{ id: "q1-2026", label: "Q1 2026 delivery", frozenAt: "2026-01-31",
    rationale: "frozen Q1 delivery scope", phaseIds: ["A1", "A2", "A2.1"] }],
  progress: { phases: [
    { id: "A1", bucket: "active", pct: 100, note: "shipped" },
    { id: "A2", bucket: "active", pct: 50, note: "in progress" },
    { id: "A3", bucket: "held", pct: 0, note: "On hold — later" },
  ] },
};
// beta declares NO cohort -> must get the generic caption, no tooltip.
const beta = {
  id: "beta", name: "Beta Service",
  progress: { phases: [
    { id: "B1", bucket: "active", pct: 80 },
    { id: "B2", bucket: "held", pct: 0, note: "On hold — later" },
  ] },
};
// A project whose id IS "bimpossible" but which declares NO cohort: proves the
// caption keys off declared presence, not the historical id.
const fakeBim = {
  id: "bimpossible", name: "Not The Real One",
  progress: { phases: [
    { id: "Z1", bucket: "active", pct: 10 },
    { id: "Z2", bucket: "held", pct: 0, note: "On hold" },
  ] },
};

// ============ module PRESENT ============
(() => {
  const E = buildEnv(true, false);
  const capAcme = E.scopeCaption(acme, E.cohortResults(acme));
  const capBeta = E.scopeCaption(beta, E.cohortResults(beta));
  const capFake = E.scopeCaption(fakeBim, E.cohortResults(fakeBim));

  test("present: cohort project (non-bimpossible id) gets active-ratified caption", () => {
    assert.ok(/active ratified scope/.test(capAcme), "expected ratified-scope label");
    assert.ok(/title="/.test(capAcme), "expected reconciliation tooltip");
    assert.ok(/cursor:help/.test(capAcme), "expected help cursor");
  });
  test("present: computed baseline pct + declared label flow into the tooltip", () => {
    assert.ok(/Q1 2026 delivery now stands at 75% complete/.test(capAcme),
      "expected live 75% + declared label in tooltip:\n" + capAcme);
  });
  test("present: caption is presence-driven, not id-driven (bimpossible id, no cohort -> generic)", () => {
    assert.ok(/active scope/.test(capFake) && !/active ratified scope/.test(capFake),
      "a cohort-less project must get generic copy even with id 'bimpossible'");
    assert.ok(!/title="/.test(capFake) && !/cursor:help/.test(capFake),
      "no tooltip/cursor without a declared cohort");
  });
  test("present: no-cohort project gets generic copy, no tooltip", () => {
    assert.ok(/active scope · 1 on-hold\/future excluded/.test(capBeta), capBeta);
    assert.ok(!/active ratified scope/.test(capBeta) && !/title="/.test(capBeta));
  });
  test("present: cohortResults computes the frozen cohort once (75%, den 2)", () => {
    const r = E.cohortResults(acme);
    assert.strictEqual(r.length, 1);
    assert.strictEqual(r[0].r.pct, 75);
    assert.strictEqual(r[0].r.den, 2);
    assert.ok(Array.isArray(r[0].r.missing) && r[0].r.missing.length === 0);
  });
  test("present: cohortMetricsHtml renders baseline donut + scope inventory", () => {
    const html = E.cohortMetricsHtml(acme, E.cohortResults(acme));
    assert.ok(/<donut\/>/.test(html) && /Scope inventory/.test(html), html);
    assert.ok(/Q1 2026 delivery/.test(html));
  });
})();

// ============ module ABSENT (window.PhaseMetrics = null) ============
(() => {
  const E = buildEnv(false, false);
  const cohorts = E.cohortResults(acme);
  const capAcme = E.scopeCaption(acme, cohorts);
  const capBeta = E.scopeCaption(beta, E.cohortResults(beta));

  test("absent: cohortResults returns [] (metric needs the module)", () => {
    // vm-realm array: assert shape, not cross-realm reference identity
    assert.ok(Array.isArray(cohorts) && cohorts.length === 0);
  });
  test("absent: cohort project STILL gets active-ratified caption semantics", () => {
    assert.ok(/active ratified scope/.test(capAcme), "ratified label must survive fallback");
    assert.ok(/title="/.test(capAcme), "reconciliation tooltip must survive fallback");
    assert.ok(/cursor:help/.test(capAcme), "help cursor must survive fallback");
  });
  test("absent: caption omits the live baseline sentence (no computed pct)", () => {
    assert.ok(!/% complete/.test(capAcme), "no baseline pct when module absent:\n" + capAcme);
  });
  test("absent: baseline donut + scope inventory are omitted safely (empty string)", () => {
    assert.strictEqual(E.cohortMetricsHtml(acme, cohorts), "");
  });
  test("absent: headline math still computes via legacy fallback (acme 75%)", () => {
    assert.strictEqual(E.overallPct(acme), 75);
  });
  test("absent: no-cohort project still generic, no tooltip", () => {
    assert.ok(/active scope/.test(capBeta) && !/active ratified scope/.test(capBeta));
    assert.ok(!/title="/.test(capBeta));
  });
})();

// ============ no hardcoded historical baseline copy anywhere in the renderer ============
test("renderer copy contains no hardcoded baseline percentage", () => {
  const banned = [/~85% in July/i, /~84%/i, /84% complete/i, /85% in July/i, /up from ~/i];
  banned.forEach(re => assert.ok(!re.test(RENDERER_SRC),
    "renderer must not hardcode a baseline figure: " + re));
  // also assert against actually-rendered output (behavioral, not just source)
  const E = buildEnv(true, false);
  const cap = E.scopeCaption(acme, E.cohortResults(acme));
  banned.forEach(re => assert.ok(!re.test(cap), "rendered caption leaked a hardcoded figure: " + re));
});

// ============ attribute escaping: quotes in a cohort label don't break out of title="" ============
test("cohort label with a double-quote is attribute-escaped in the tooltip", () => {
  const E = buildEnv(true, false);
  const evil = JSON.parse(JSON.stringify(acme));
  evil.baselineCohorts[0].label = 'The "July" baseline';
  const cap = E.scopeCaption(evil, E.cohortResults(evil));
  assert.ok(/&quot;July&quot;/.test(cap), "label quotes must be escaped:\n" + cap);
  // the raw double-quote must not appear between title=" and its closing quote
  const m = cap.match(/title="([^]*?)"\s+style=/);
  assert.ok(m, "tooltip attribute not found");
  assert.ok(!/"/.test(m[1]), "unescaped quote broke out of the title attribute");
});

// ============ real data.js through the renderer path (module present) ============
test("real data.js via renderer: bimpossible = 63% active / 92% computed baseline", () => {
  const E = buildEnv(true, true);
  const D = E.window.DASHBOARD_DATA;
  const bim = D.projects.find(p => p.id === "bimpossible");
  assert.strictEqual(E.activePhases(bim).length, 13, "13 active phases");
  assert.strictEqual(E.overallPct(bim), 63, "active-ratified headline");
  const cr = E.cohortResults(bim);
  assert.ok(cr.length >= 1, "bimpossible declares a cohort");
  assert.strictEqual(cr[0].r.pct, 92, "July baseline computed = 92%");
  assert.strictEqual(cr[0].r.den, 6, "6 phases after P11.1->P11 dedupe");
  const cap = E.scopeCaption(bim, cr);
  assert.ok(/active ratified scope/.test(cap) && /title="/.test(cap),
    "real bimpossible keeps the ratified caption");
});

console.log("\n" + passed + " passed");
