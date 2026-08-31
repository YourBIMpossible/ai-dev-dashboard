/*
 * Node test suite for phase_metrics.js (no test runner; run: node test_phase_metrics.js).
 * Covers bucket/weight normalization, active/flat/weighted completion, scope counts,
 * alias resolution + cycle detection, cohort dedupe, empty-denominator safety, and the
 * two headline numbers against the real data.js.
 */
"use strict";
const assert = require("assert");
const path = require("path");
const M = require("./phase_metrics.js");

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("  ok - " + name); }

// ---- normalizeBucket ----
test("normalizeBucket: valid buckets pass through", () => {
  ["active", "proposed", "held", "conditional", "placeholder"].forEach(b =>
    assert.strictEqual(M.normalizeBucket(b), b));
});
test("normalizeBucket: unknown/absent -> active", () => {
  ["bogus", "", null, undefined, 0, {}].forEach(b =>
    assert.strictEqual(M.normalizeBucket(b), "active"));
});

// ---- normalizeWeight ----
test("normalizeWeight: finite positive kept", () => {
  assert.strictEqual(M.normalizeWeight(1), 1);
  assert.strictEqual(M.normalizeWeight(2.5), 2.5);
});
test("normalizeWeight: invalid -> 1", () => {
  [0, -1, NaN, Infinity, -Infinity, "3", null, undefined, true, []].forEach(w =>
    assert.strictEqual(M.normalizeWeight(w), 1, "weight " + String(w)));
});

// ---- flat vs weighted (equal at all weights = 1) ----
test("getFlatCompletion: rounds at display boundary", () => {
  // 63.08 -> 63 (round), and 91.67 -> 92
  assert.strictEqual(M.getFlatCompletion([{ pct: 100 }, { pct: 93 }, { pct: 96 },
    { pct: 88 }, { pct: 85 }, { pct: 88 }]).pct, 92);
});
test("getFlatCompletion: empty -> pct null, not 0/NaN", () => {
  const r = M.getFlatCompletion([]);
  assert.strictEqual(r.pct, null);
  assert.strictEqual(r.den, 0);
});
test("getWeightedCompletion equals flat when all weights 1", () => {
  const ph = [{ pct: 100, weight: 1 }, { pct: 50, weight: 1 }, { pct: 0, weight: 1 }];
  assert.strictEqual(M.getWeightedCompletion(ph).pct, M.getFlatCompletion(ph).pct);
});
test("getWeightedCompletion: weights actually weight (stored-not-shipped path works)", () => {
  const ph = [{ pct: 100, weight: 3 }, { pct: 0, weight: 1 }]; // (300)/(4)=75
  assert.strictEqual(M.getWeightedCompletion(ph).pct, 75);
});
test("getWeightedCompletion: empty -> null", () => {
  assert.strictEqual(M.getWeightedCompletion([]).pct, null);
});

// ---- isActivePhase: bucket-when-present, legacy note-regex fallback ----
// Regression for the review finding: migrating one project to buckets must not change
// the headline of any project still on the legacy (no-bucket) note-prefix convention.
test("isActivePhase: legacy no-bucket 'On hold ...' note -> excluded", () => {
  assert.strictEqual(M.isActivePhase({ note: "On hold — bonus, not a need" }), false);
});
test("isActivePhase: legacy no-bucket 'conditional ...' note -> excluded", () => {
  assert.strictEqual(M.isActivePhase({ note: "conditional — pending owner go" }), false);
});
test("isActivePhase: legacy no-bucket ordinary note -> active", () => {
  assert.strictEqual(M.isActivePhase({ note: "ACTIVE — shipping" }), true);
  assert.strictEqual(M.isActivePhase({}), true); // no note at all -> active
});
test("isActivePhase: explicit bucket wins over a held-looking note", () => {
  assert.strictEqual(M.isActivePhase({ bucket: "active", note: "On hold looks held" }), true);
});
test("isActivePhase: explicit bucket:'held' with ordinary note -> excluded", () => {
  assert.strictEqual(M.isActivePhase({ bucket: "held", note: "ACTIVE — shipping" }), false);
});
test("PRE_MODEL_HELD_PHASE is exactly the historical three-term regex (no 'proposal')", () => {
  assert.strictEqual(M.PRE_MODEL_HELD_PHASE.source, "^(on hold|conditional|placeholder)");
  assert.strictEqual(M.PRE_MODEL_HELD_PHASE.test("proposal: pending owner go"), false);
  ["on hold — x", "conditional — y", "placeholder — z"].forEach(n =>
    assert.strictEqual(M.PRE_MODEL_HELD_PHASE.test(n), true));
});
test("isActivePhase: legacy no-bucket 'proposal:' note -> active (pre-model semantics)", () => {
  // A "proposal:"-prefixed note was IN scope before the completion model existed. The
  // fallback must not silently exclude it, or a no-bucket project's headline would drop.
  assert.strictEqual(M.isActivePhase({ note: "proposal: draft feature for later" }), true);
});
test("isActivePhase: explicit bucket:'proposed' -> excluded (structured data wins)", () => {
  // The bucket, not the note, drives exclusion once a phase is migrated. A "proposed"
  // bucket is out of the active headline even with an ordinary note.
  assert.strictEqual(M.isActivePhase({ bucket: "proposed", note: "ACTIVE — drafting" }), false);
});
test("getActivePhases: legacy no-bucket project keeps note-prefix exclusion", () => {
  const legacy = { progress: { phases: [
    { name: "A", pct: 100, note: "SHIPPED" },
    { name: "B", pct: 0, note: "On hold — later" },
    { name: "C", pct: 50, note: "conditional — maybe" },
    { name: "D", pct: 80 } // no note -> active
  ] } };
  assert.deepStrictEqual(M.getActivePhases(legacy).map(x => x.name), ["A", "D"]);
  assert.strictEqual(M.getFlatCompletion(M.getActivePhases(legacy)).pct, 90); // (100+80)/2
});

// ---- active phases + scope counts ----
const sample = {
  phaseAliases: { "P11.1": "P11" },
  progress: { phases: [
    { id: "P1", bucket: "active", pct: 100 },
    { id: "P2", bucket: "held", pct: 15 },
    { id: "P3", bucket: "conditional", pct: 0 },
    { id: "P4", bucket: "placeholder", pct: 0 },
    { id: "P5", bucket: "proposed", pct: 0 },
    { id: "P6", pct: 50 } // no bucket -> active
  ] }
};
test("getActivePhases: bucket filter + default-active", () => {
  const ids = M.getActivePhases(sample).map(p => p.id);
  assert.deepStrictEqual(ids, ["P1", "P6"]);
});
test("getScopeCounts: one per bucket, default-active counted", () => {
  assert.deepStrictEqual(M.getScopeCounts(sample),
    { active: 2, proposed: 1, held: 1, conditional: 1, placeholder: 1 });
});

// ---- alias resolution + cycles ----
test("resolvePhaseId: follows alias", () => {
  assert.strictEqual(M.resolvePhaseId("P11.1", { "P11.1": "P11" }), "P11");
});
test("resolvePhaseId: no alias -> identity", () => {
  assert.strictEqual(M.resolvePhaseId("P3", {}), "P3");
});
test("resolvePhaseId: cycle -> null", () => {
  assert.strictEqual(M.resolvePhaseId("A", { A: "B", B: "A" }), null);
});

// ---- cohort dedupe + alias + missing ----
test("getCohortPhases: alias-resolves, dedupes, matches by id", () => {
  const p = { phaseAliases: { "P11.1": "P11" }, progress: { phases: [
    { id: "P0-2", pct: 100 }, { id: "P11", pct: 88 }, { id: "P3", pct: 93 }
  ] } };
  const co = { phaseIds: ["P0-2", "P3", "P11", "P11.1"] }; // P11.1 -> P11 dupe
  const r = M.getCohortPhases(p, co);
  assert.deepStrictEqual(r.phases.map(x => x.id), ["P0-2", "P3", "P11"]);
  assert.deepStrictEqual(r.missing, []);
});
test("getCohortPhases: reports missing ids, doesn't crash", () => {
  const p = { progress: { phases: [{ id: "P1", pct: 10 }] } };
  const r = M.getCohortPhases(p, { phaseIds: ["P1", "P999"] });
  assert.deepStrictEqual(r.phases.map(x => x.id), ["P1"]);
  assert.deepStrictEqual(r.missing, ["P999"]);
});
test("getCohortPhases: cyclic alias id is dropped, not looped", () => {
  const p = { phaseAliases: { X: "Y", Y: "X" }, progress: { phases: [{ id: "P1", pct: 10 }] } };
  const r = M.getCohortPhases(p, { phaseIds: ["P1", "X"] });
  assert.deepStrictEqual(r.phases.map(x => x.id), ["P1"]);
});

// ---- integration against the real data.js ----
test("real data.js: active headline = 63%, baseline = 92%", () => {
  global.window = {};
  require(path.join(process.cwd(), "data.js"));
  const D = global.window.DASHBOARD_DATA;
  const bp = D.projects.find(p => p.id === "bimpossible");
  assert.strictEqual(M.getActivePhases(bp).length, 13);
  assert.strictEqual(M.getFlatCompletion(M.getActivePhases(bp)).pct, 63);
  const base = M.getCohortCompletion(bp, bp.baselineCohorts[0]);
  assert.strictEqual(base.pct, 92);
  assert.strictEqual(base.den, 6);       // P11.1 deduped into P11
  assert.deepStrictEqual(base.missing, []);
  assert.deepStrictEqual(M.getScopeCounts(bp),
    { active: 13, proposed: 1, held: 1, conditional: 2, placeholder: 1 });
});
test("real data.js: non-cohort projects yield no baseline", () => {
  const D = global.window.DASHBOARD_DATA;
  const others = D.projects.filter(p => p.id !== "bimpossible");
  others.forEach(p => assert.ok(!Array.isArray(p.baselineCohorts) || !p.baselineCohorts.length,
    p.id + " should not declare cohorts"));
});
test("real data.js: non-bucket projects match pure-legacy note-regex scope (headline-neutral)", () => {
  const D = global.window.DASHBOARD_DATA;
  // The EXACT pre-model regex (three terms, NO "proposal"). Using the pre-model literal
  // here makes this a real pin against the historical headline, not a tautology against
  // whatever the module currently ships.
  const HELD = /^(on hold|conditional|placeholder)/i;
  D.projects.filter(p => p.id !== "bimpossible").forEach(p => {
    const ph = (p.progress && p.progress.phases) || [];
    if (!ph.length) return;
    const legacy = ph.filter(x => !HELD.test(String(x.note == null ? "" : x.note).trim()));
    assert.deepStrictEqual(M.getActivePhases(p).map(x => x.name), legacy.map(x => x.name),
      p.id + " active scope must equal the pre-model legacy scope");
  });
});
test("real data.js: every project still gets a headline (default-active safe)", () => {
  const D = global.window.DASHBOARD_DATA;
  D.projects.forEach(p => {
    if (!(p.progress && p.progress.phases && p.progress.phases.length)) return;
    const r = M.getFlatCompletion(M.getActivePhases(p));
    assert.ok(r.pct === null || (r.pct >= 0 && r.pct <= 100), p.id + " pct in range");
  });
});

console.log("\n" + passed + " passed");
