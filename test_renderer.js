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

// ============================================================================
// Check-in triage contract (Needs-you vs Parked) — behavioural coverage.
// Extracts the ACTUAL classifier + partition seam out of index.html (same
// vm-sandbox discipline as above) and drives the real contract: reminders park
// by kind; blockers/decisions are ripe unless their text is parked; unknown
// wording fails safe to ripe; every eligible item lands in exactly one bucket.
// ============================================================================
const CHECKIN_CONSTS = ["DESK_PARK", "DESK_WAIT", "DESK_DONE", "DESK_UNDONE", "DESK_ASK", "EV_TIP"]
  .map(n => extractConstLine(HTML, n)).join("\n");
const CHECKIN_FNS = ["deskSegments", "deskRipe", "tvPartition", "tvHumanize", "tvDesk", "cohortHeadlinePct",
  "flagshipMetric", "revealBlock", "todayView"]
  .map(n => extractFn(HTML, n)).join("\n");
const D_ALIAS = extractConstLine(HTML, "D");

// One bundle, one runInContext call, so tvPartition/deskRipe/tvDesk close over
// the DESK_* consts and the D alias (top-level `const` in vm is script-scoped,
// not a context global — esc/overallPct/cohortResults reach in as fn-decl globals).
function checkinEnv() {
  const E = buildEnv(true, true); // module present + real data.js loaded
  vm.runInContext(D_ALIAS + "\n" + CHECKIN_CONSTS + "\n" + CHECKIN_FNS,
    E, { filename: "index.html:checkin" });
  return E;
}
const CE = checkinEnv();
const part1 = (kind, text) => CE.tvPartition([{ kind, text, pid: "x", pname: "X" }]);
const isRipe = (kind, text) => part1(kind, text).ripe.length === 1;
// deskSegments/tvPartition return arrays built inside the vm realm, so their prototype is that
// realm's Array.prototype and deepStrictEqual's prototype check would fail on identical contents.
// Array.from re-homes them here, keeping the assertions about VALUES rather than realms.
const segsOf = t => Array.from(CE.deskSegments(t));

// -- the classifier's semantic contract, case by case --
test("triage 1: 'awaiting owner ratification' -> Needs you (waiting on YOU)", () => {
  assert.ok(isRipe("decision", "awaiting owner ratification"));
});
test("triage 2: 'awaiting your decision' -> Needs you", () => {
  assert.ok(isRipe("decision", "awaiting your decision"));
});
test("triage 3: 'needs owner approval' -> Needs you", () => {
  assert.ok(isRipe("decision", "needs owner approval"));
});
test("triage 4: 'awaiting CI to go green' -> Parked", () => {
  assert.ok(!isRipe("blocker", "awaiting CI to go green"));
});
test("triage 5: 'awaiting upstream release' -> Parked", () => {
  assert.ok(!isRipe("blocker", "awaiting upstream release"));
});
test("triage 6: 'blocked on external dependency' -> Parked", () => {
  assert.ok(!isRipe("blocker", "blocked on external dependency"));
});
test("triage 7: owner-resolvable blocker -> Needs you", () => {
  assert.ok(isRipe("blocker", "Owner needs to push the release tag to the private remote"));
});
test("triage 8: non-owner-resolvable blocker ('waiting on vendor') -> Parked", () => {
  assert.ok(!isRipe("blocker", "waiting on vendor to ship the SDK"));
});
test("triage 9: reminder is context -> Parked by kind (even with ripe-looking text)", () => {
  // text alone would read ripe; the kind rule must still park it
  assert.ok(CE.deskRipe({ text: "Owner: decide the release date" }), "text-level would be ripe");
  assert.ok(!isRipe("reminder", "Owner: decide the release date"), "reminder must park by kind");
});
test("triage 10: done/closed item -> Parked", () => {
  assert.ok(!isRipe("decision", "Migration complete; no action needed"));
});
test("triage 11: unknown wording fails safe -> Needs you", () => {
  assert.ok(isRipe("decision", "Xyzzy frobnicate the wibble grommet"));
});
test("triage 12: open owner choice 'merge or close' is NOT mistaken for done -> Needs you", () => {
  // guards DESK_DONE against catching an open choice that merely mentions 'close'
  assert.ok(isRipe("decision", "PR #1 (scoring self-heal): merge to main or close - open 4 weeks"));
  assert.ok(isRipe("decision", "worktree-harness has sat unmerged for 7 weeks -- ship it or delete it?"));
});
test("triage 12c: a terminal 'completed.' clause does NOT park an item still carrying an owner ask", () => {
  // DESK_DONE matches 'completed.' as a substring; the owner-ask override must keep it ripe.
  assert.ok(isRipe("decision", "Scoring self-heal completed. Owner: keep the fallback path or remove it?"));
  assert.ok(isRipe("decision", "P9 already merged; owner still needs to decide whether to backport it"));
});
test("triage 12d: soft-demand park cues do NOT hide an open owner kill/keep choice", () => {
  // DESK_PARK matches 'no demand' / 'blocks nothing' as substrings; an open choice stays ripe.
  assert.ok(isRipe("decision", "Feature X sees no demand yet - owner, kill it or keep it?"));
  assert.ok(isRipe("decision", "The shim blocks nothing, but you must choose: keep it or drop it before P12"));
});

// -- sentence/clause scoping: the root done/park/wait cues are read PER SEGMENT, so a terminal cue
// in one clause cannot speak for the whole item, and an owner word in another clause cannot un-park
// a plain external wait. The owner-ask override deliberately stays whole-item (the widest, fail-safe
// test in the set) so scoping can never hide an ask that the previous classifier surfaced. --
test("segment 1: deskSegments splits on sentence enders, ';' and newlines", () => {
  assert.deepStrictEqual(segsOf("Closed. Owner to ratify."), ["Closed", "Owner to ratify"]);
  assert.deepStrictEqual(segsOf("Awaiting CI; no owner action needed"),
    ["Awaiting CI", "no owner action needed"]);
  assert.deepStrictEqual(segsOf("Awaiting CI\nReview complete"), ["Awaiting CI", "Review complete"]);
  assert.deepStrictEqual(segsOf("Ship it?  Or drop it!"), ["Ship it", "Or drop it"]);
});
test("segment 2: a dot inside an identifier or a version does NOT split the clause", () => {
  // the separator requires trailing whitespace (or end-of-string), which is what keeps these intact
  assert.deepStrictEqual(segsOf("prep_to_standard.py is the ruling doc"),
    ["prep_to_standard.py is the ruling doc"]);
  assert.deepStrictEqual(segsOf("pin v1.2 before the release"), ["pin v1.2 before the release"]);
});
test("segment 3: deskSegments is pure and total; empty prose reads as unrecognised -> ripe", () => {
  assert.deepStrictEqual(segsOf(""), []);
  assert.deepStrictEqual(segsOf("   "), []);
  assert.deepStrictEqual(segsOf(null), []);
  assert.deepStrictEqual(segsOf(undefined), []);
  assert.ok(CE.deskRipe({ text: "" }), "no recognised cue at all must fail safe to ripe");
});
test("segment 4: a terminal cue in one sentence cannot bury a live owner ask in another", () => {
  assert.ok(isRipe("decision", "Closed. Owner to ratify."));
  assert.ok(isRipe("decision", "Completed implementation. Owner decision required."));
  assert.ok(isRipe("decision", "Dormant until review. Keep it or kill it."));
});
test("segment 5: a live owner ask FOLLOWED by terminal context stays Needs you", () => {
  assert.ok(isRipe("decision", "Owner to ratify the rollback. Closed."));
  assert.ok(isRipe("decision", "Owner: keep the shim or drop it. Already merged upstream."));
});
test("segment 6: an item whose every clause is parked/done/waiting stays Parked", () => {
  assert.ok(!isRipe("blocker", "Awaiting CI. No owner action needed."));
  assert.ok(!isRipe("blocker", "Waiting on vendor. Review complete."));
  assert.ok(!isRipe("decision", "Completed. Closed."));
});
test("segment 7: ';' and newline separate clauses too (both occur in the real desk prose)", () => {
  // an 'owner' in the SECOND clause must not lend itself to the WAIT lookahead in the first — the
  // old [^.]* run crossed ';' and '\n' (neither is a '.') and wrongly held these ripe.
  assert.ok(!isRipe("blocker", "Awaiting CI; owner already informed"));
  assert.ok(!isRipe("blocker", "Awaiting CI\nowner already informed"));
  // ...but a genuine ask in that second clause still wins outright
  assert.ok(isRipe("decision", "Awaiting CI; owner to ratify the release"));
  assert.ok(isRipe("decision", "Resolved; owner to pick a successor."));
  // ...and so does OWNER WORK stated in that clause, whose verb is no decision at all. Scoping the
  // wait must not hide it just because 'update'/'rerun'/'file'/'own' are not choices.
  assert.ok(isRipe("blocker", "Awaiting CI; you must update the changelog"));
  assert.ok(isRipe("blocker", "Awaiting CI; owner needs to rerun the migration"));
  assert.ok(isRipe("blocker", "Blocked on upstream\nyou still have to file the RFI"));
  assert.ok(isRipe("blocker", "Waiting on vendor; your action item is the site visit"));
  assert.ok(isRipe("blocker", "Depends on Wave 16; you own the rollout plan"));
  assert.ok(isRipe("blocker", "Blocked on vendor; owner is responsible for the resubmit"));
});
test("segment 8: a terminal cue closing an item with no trailing punctuation still parks", () => {
  // 'complete/closed/resolved' used to require a literal '.' or ';' — exactly what the segmenter
  // strips — so end-of-segment is now the anchor and these no longer leak into Needs you.
  assert.ok(!isRipe("decision", "Migration complete"));
  assert.ok(!isRipe("decision", "Rollout closed"));
  assert.ok(!isRipe("blocker", "Ceilings shaper not built"));
});
test("segment 8b: a NEGATED terminal is unfinished work and must stay Needs you", () => {
  // the end-of-segment anchor above matches "...not complete" just as readily as "...complete",
  // so the negation lookbehind is what keeps explicitly-unfinished work out of the parked fold.
  assert.ok(isRipe("blocker", "Deployment not complete"));
  assert.ok(isRipe("blocker", "Migration is not yet complete"));
  assert.ok(isRipe("blocker", "Merge conflict not resolved"));
  assert.ok(isRipe("blocker", "Ticket not closed"));
  assert.ok(isRipe("blocker", "Wave 16 is far from complete"));
  assert.ok(isRipe("decision", "Retro isn't complete"));
  assert.ok(isRipe("blocker", "Cannot complete")); // no word boundary before "not" — still negated
  assert.ok(isRipe("blocker", "Handoff not complete\nBlocker stands"));
  // the guard is clause-bounded, so a negator far from the terminal word still reads as done
  assert.ok(!isRipe("decision", "Not gating - the migration is complete"));
});
test("segment 9: the owner-ask override is NOT segment-scoped, so scoping cannot narrow it", () => {
  // owner word and verb in DIFFERENT clauses of one sentence: still a live ask, still ripe
  assert.ok(isRipe("decision", "Owner has the final say; merge or close. Already merged upstream."));
  // 'call' sits in the DESK_WAIT owner-cue list but NOT in DESK_ASK, so that lookahead is still
  // load-bearing on its own — this case is what makes it non-redundant.
  assert.ok(isRipe("blocker", "blocked on your call"));
});
test("segment 10: unknown wording still fails safe to Needs you after scoping", () => {
  assert.ok(isRipe("decision", "Xyzzy frobnicate the wibble grommet"));
  assert.ok(isRipe("blocker", "Frobnicate the widget"));
});
test("segment 11: partition invariant holds across a mixed segment-scoped set", () => {
  const items = [
    { kind: "decision", text: "Closed. Owner to ratify.", pid: "a", pname: "A" },
    { kind: "blocker", text: "Awaiting CI. No owner action needed.", pid: "b", pname: "B" },
    { kind: "decision", text: "Completed. Closed.", pid: "c", pname: "C" },
    { kind: "decision", text: "Xyzzy frobnicate", pid: "d", pname: "D" },
    { kind: "reminder", text: "Owner: decide the release date", pid: "e", pname: "E" },
  ];
  const p = CE.tvPartition(items);
  assert.strictEqual(p.ripe.length + p.parked.length, items.length, "buckets must total the input");
  items.forEach(d => assert.ok(p.ripe.some(x => x.pid === d.pid) !== p.parked.some(x => x.pid === d.pid),
    "each item must land in exactly one bucket: " + d.pid));
  assert.deepStrictEqual(Array.from(p.ripe, d => d.pid).sort(), ["a", "d"]);
});
test("segment 12: widening the ask to obligation verbs does NOT un-park settled wording", () => {
  // the obligation stems are anchored so they cannot fire on the parked-by-design phrases: "owner"
  // must not satisfy own(?:s|ed)?\b, and "needed"/"informed" must not satisfy need(?:s|ed)?\s+to\b.
  assert.ok(!isRipe("blocker", "Awaiting CI; owner already informed"));
  assert.ok(!isRipe("blocker", "Awaiting CI. No owner action needed."));
  assert.ok(!isRipe("blocker", "No owner action needed"));
  assert.ok(!isRipe("blocker", "Waiting on the vendor"));
  assert.ok(!isRipe("decision", "Owner action needed: none. Resolved."));
});

// -- partition invariants on the REAL desk --
const realDesk = CE.tvDesk();
const realPart = CE.tvPartition(realDesk);
test("triage 13: real desk partitions by the contract (invariants, not hardcoded counts)", () => {
  // Assert the RULES the split must obey, not the day's exact totals — coupling a release-gate
  // test to daily-changing data.js content made it fail on unrelated content edits. Every ripe
  // item is a blocker/decision that deskRipe() accepts; every parked item is either the wrong kind
  // or deskRipe-rejected; and the two buckets reconcile to the whole desk with none dropped.
  assert.ok(realDesk.length > 0, "the real desk should be non-empty");
  realPart.ripe.forEach(d => {
    assert.ok(d.kind === "blocker" || d.kind === "decision", "ripe kind must be eligible: " + d.text);
    assert.ok(CE.deskRipe(d), "a ripe item must satisfy deskRipe(): " + d.text);
  });
  realPart.parked.forEach(d => {
    const eligible = d.kind === "blocker" || d.kind === "decision";
    assert.ok(!eligible || !CE.deskRipe(d), "a parked item must be ineligible or deskRipe-rejected: " + d.text);
  });
  assert.strictEqual(realPart.ripe.length + realPart.parked.length, realDesk.length, "buckets must total the desk");
});
test("triage 14: reconciliation — ripe + parked accounts for every item, no loss", () => {
  assert.strictEqual(realPart.ripe.length + realPart.parked.length, realDesk.length);
  const kk = d => d.pid + "::" + d.text;
  const rk = new Set(realPart.ripe.map(kk)), pk = new Set(realPart.parked.map(kk));
  // disjoint buckets, and their union is the whole desk (nothing dropped, nothing duplicated)
  realDesk.forEach(d => {
    const inR = rk.has(kk(d)), inP = pk.has(kk(d));
    assert.ok(inR !== inP, "each item must be in exactly one bucket: " + kk(d));
  });
  assert.strictEqual(rk.size + pk.size, realDesk.length);
});
test("triage 15: every ripe real item is a blocker/decision (never a reminder)", () => {
  realPart.ripe.forEach(d => assert.ok(d.kind === "blocker" || d.kind === "decision",
    "a reminder leaked into Needs you: " + d.text));
});

// -- empty-state contract (behavioural precondition + rendered copy) --
test("empty state: an all-parked desk yields zero ripe (band goes empty)", () => {
  const allParked = CE.tvPartition([
    { kind: "reminder", text: "weekly backup check", pid: "a", pname: "A" },
    { kind: "blocker", text: "awaiting CI", pid: "b", pname: "B" },
    { kind: "decision", text: "gated on the P11 spike; blocks nothing", pid: "c", pname: "C" },
  ]);
  assert.strictEqual(allParked.ripe.length, 0);
  assert.strictEqual(allParked.parked.length, 3);
});
// -- todayView() rendered behaviourally: todayView + revealBlock ride in the same bundle as
// the classifier (so they close over const D / EV_TIP); the non-triage deps are stubbed and
// tvDesk is overridden per render to control the split. These assert on the RENDERED HTML —
// the actual header count, empty-state block, and disclosure wiring — not on index.html source
// text (which passed even when the runtime behaviour it purported to cover had drifted). --
Object.assign(CE, {
  tvFeed: () => [], auditSummary: () => null, daysAgo: () => 0, FRESH: { live: 3 },
  dayLabel: x => String(x), isoDate: () => "2026-09-02", relDay: () => "",
  spark: () => "", ICO: { check: "", shield: "", refresh: "" },
  TODAY: new Date("2026-09-02T00:00:00Z"), _sinceDate: null, _rvSeq: 0,
});
function renderToday(desk) { CE.tvDesk = () => desk; return CE.todayView(); }

// finding 3: isolate these render tests from live data.js. todayView also renders the Movement and
// "since your last check-in" bands over D.projects — but the injected desk is the only thing under
// test here, so pin D.projects to an empty set for the duration (the other bands render empty and
// depend on nothing that data.js edits can move) and restore the real projects before the flagship
// tests below, which legitimately assert on the real computed headline.
const _realProjects = CE.window.DASHBOARD_DATA.projects;
CE.window.DASHBOARD_DATA.projects = [];

test("empty state: todayView renders the clear-desk block + 'clear' header when nothing is ripe", () => {
  const html = renderToday([
    { kind: "reminder", text: "weekly backup check", pid: "a", pname: "A" },       // parked by kind
    { kind: "blocker", text: "awaiting CI to go green", pid: "b", pname: "B" },     // parked (waiting on CI)
    { kind: "decision", text: "gated on the P11 spike; blocks nothing", pid: "c", pname: "C" }, // parked
  ]);
  assert.ok(/Nothing needs a decision today\./.test(html), "clear-desk copy must render when ripe is empty");
  assert.ok(/class="tv-clear"/.test(html), "the ripe list is replaced by the clear-desk block");
  assert.ok(/Needs you <span class="ct">· clear<\/span>/.test(html), "header must read 'clear', not a count");
});
test("header count reflects only ripe items, never the parked ones (rendered)", () => {
  const html = renderToday([
    { kind: "decision", text: "Xyzzy frobnicate the wibble grommet", pid: "a", pname: "A" }, // unknown -> ripe
    { kind: "decision", text: "needs owner approval", pid: "b", pname: "B" },                 // ripe
    { kind: "blocker", text: "awaiting CI to go green", pid: "c", pname: "C" },               // parked
    { kind: "reminder", text: "weekly backup", pid: "d", pname: "D" },                        // parked by kind
  ]);
  assert.ok(/Needs you <span class="ct">· 2<\/span>/.test(html), "header must count the 2 ripe, not all 4");
  assert.ok(/Show 2 more parked items/.test(html), "the 2 parked fold into the disclosure, counted separately");
});
test("parked items fold into a recoverable disclosure (hidden + expandable), never dropped", () => {
  const html = renderToday([
    { kind: "decision", text: "needs owner approval", pid: "a", pname: "A" },                 // ripe
    { kind: "blocker", text: "awaiting upstream release note-XYZ", pid: "b", pname: "B" },    // parked
  ]);
  assert.ok(/aria-expanded="false"/.test(html), "disclosure starts collapsed");
  assert.ok(/<div id="rv\d+" hidden><div class="tv-desk tv-parked">/.test(html), "parked list sits in a hidden, recoverable container");
  assert.ok(/note-XYZ/.test(html), "the parked item text is retained in the DOM, not discarded");
});
test("rendered: an owner ask beside a terminal clause lands in Needs you, not the parked fold", () => {
  const html = renderToday([
    { kind: "decision", text: "Closed. Owner to ratify.", pid: "a", pname: "A" },
    { kind: "decision", text: "Completed implementation. Owner decision required.", pid: "b", pname: "B" },
    { kind: "blocker", text: "Awaiting CI. No owner action needed.", pid: "c", pname: "C" },
    { kind: "decision", text: "Completed. Closed.", pid: "d", pname: "D" },
  ]);
  assert.ok(/Needs you <span class="ct">· 2<\/span>/.test(html), "the 2 owner asks must be counted ripe");
  assert.ok(/Show 2 more parked items/.test(html), "the 2 fully-terminal items fold away");
  // split the document at the parked container: everything before it is the visible Needs-you list,
  // everything from it on is inside the collapsed disclosure. An ask must never be on the wrong side.
  const cut = html.indexOf("tv-parked");
  assert.ok(cut > 0, "the parked fold must render");
  const visible = html.slice(0, cut), folded = html.slice(cut);
  assert.ok(/Owner to ratify/.test(visible) && !/Owner to ratify/.test(folded),
    "'Closed. Owner to ratify.' must be visible, never hidden in the parked fold");
  assert.ok(/Owner decision required/.test(visible) && !/Owner decision required/.test(folded),
    "'Owner decision required' must be visible, never hidden in the parked fold");
  assert.ok(/No owner action needed/.test(folded), "the terminal items are retained inside the fold");
});
CE.window.DASHBOARD_DATA.projects = _realProjects; // restore live data for the computed-headline tests

// -- ref humanising: PR/issue citations rendered secondary, not deleted --
test("tvHumanize keeps #-refs but wraps them in the dimmed .tv-ref span", () => {
  const out = CE.tvHumanize("merge PR #115 then close #12/#13");
  assert.ok(/#115/.test(out) && /#12\/#13/.test(out), "refs must survive, not be stripped");
  assert.ok(/<span class="tv-ref">#115<\/span>/.test(out), "ref must be wrapped for dimming");
  assert.ok(!/<script/i.test(out), "must stay escaped");
  // finding 7: a fully-parenthesised citation dims as one unit; a stray ')' after a lone ref
  // must stay OUTSIDE the dim span (the old unbalanced /\(?...\)?/ pulled the stray paren in).
  const bal = CE.tvHumanize("see (#12/#13) for context");
  assert.ok(/<span class="tv-ref">\(#12\/#13\)<\/span>/.test(bal), "balanced (#12/#13) dims as one unit");
  const stray = CE.tvHumanize("done #115) later");
  assert.ok(/<span class="tv-ref">#115<\/span>\) later/.test(stray), "a stray ')' after a lone ref stays outside the dim span");
  const lead = CE.tvHumanize("(#12 done");
  assert.ok(/\(<span class="tv-ref">#12<\/span> done/.test(lead), "a stray leading '(' (no closing paren) stays outside the dim span");
});

// -- Part D: the flagship headline numbers are COMPUTED, never hardcoded --
test("flagshipMetric renders computed 92% cohort / 63% active scope (not literals)", () => {
  const html = CE.flagshipMetric();
  assert.ok(/>92%</.test(html) && /delivery cohort/.test(html), "computed cohort % + label:\n" + html);
  assert.ok(/>63%</.test(html) && /active scope/.test(html), "computed active-scope % + label");
  // prove it is derived: the same env's functions produce those very numbers
  const bim = CE.window.DASHBOARD_DATA.projects.find(p => p.id === "bimpossible");
  assert.strictEqual(CE.overallPct(bim), 63);
  assert.strictEqual(CE.cohortResults(bim)[0].r.pct, 92);
});

console.log("\n" + passed + " passed");
