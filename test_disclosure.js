/*
 * Disclosure-state tests for the Strategy and Toolkit sections in index.html
 * (run: node test_disclosure.js — no test runner, same harness style as test_renderer.js).
 *
 * Nothing here re-implements the logic under test. The real function sources are extracted
 * from index.html by brace matching and executed in a `vm` sandbox whose global IS `window`,
 * so `localStorage` resolves the way it does in the browser. Each case swaps in a different
 * localStorage implementation — populated, empty, hand-corrupted, or outright throwing — and
 * asserts against the ACTUAL rendered markup (aria-expanded / hidden) rather than source text.
 *
 * Covered:
 *   readSecOpen / writeSecOpen  — parse, validate, fail-safe, write-through
 *   secInitialOpen              — the three-step precedence
 *   secToggle                   — aria-expanded + hidden + persistence stay in lockstep
 *   strategyView()              — fresh = all closed; stored restores; corrupt = closed;
 *                                 filtered-to-one-category opens; clearing the filter restores
 *   toolkitView()               — fresh = all closed; stored restores; corrupt = closed;
 *                                 every section carries a stable data-sec id
 *
 * Layout consequences of `hidden` (that a collapsed .tk-grid occupies no space) are a CSS
 * question and are verified in the browser pass, not here.
 */
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const HTML = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("  ok - " + name); }

// Objects that cross the vm realm boundary carry that realm's Object.prototype, so
// deepStrictEqual rejects them on prototype identity alone. Compare by value instead.
function sameMap(actual, expected, msg) {
  assert.deepStrictEqual(JSON.parse(JSON.stringify(actual)), expected, msg);
}

// --- source extraction (same approach as test_renderer.js) ---------------------------------
function extractFn(src, name) {
  const i = src.indexOf("function " + name + "(");
  if (i < 0) throw new Error("function not found in index.html: " + name);
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

// Some consts span lines (PHCLS, PHGROUP). Slice from `const NAME=` to the first `;` that sits
// outside every bracket, so the whole initializer comes across intact.
function extractConstBlock(src, name) {
  const i = src.indexOf("const " + name + "=");
  if (i < 0) throw new Error("const not found in index.html: " + name);
  let d = 0;
  for (let j = src.indexOf("=", i); j < src.length; j++) {
    const c = src[j];
    if (c === "{" || c === "[" || c === "(") d++;
    else if (c === "}" || c === "]" || c === ")") d--;
    else if (c === ";" && d === 0) return src.slice(i, j + 1);
  }
  throw new Error("unterminated const " + name);
}

const FNS = ["readSecOpen", "writeSecOpen", "secInitialOpen", "secToggle",
  "stratSecToggle", "tkSecToggle", "phGroupToggle", "phaseNote", "phaseRow", "phaseBars",
  "esc", "strategyView", "toolkitView",
  "foldText", "ntToggle", "revealBlock", "auditHistory"];
const SRC = "var _ntSeq=0;var _rvSeq=0;\n" +
  extractConstLine(HTML, "DISCLOSURE_KEY") + "\n" +
  extractConstLine(HTML, "SCAT_COLOR") + "\n" +
  extractConstLine(HTML, "SCAT_LABEL") + "\n" +
  extractConstLine(HTML, "PHCHIP") + "\n" +
  extractConstBlock(HTML, "PHCLS") + "\n" +
  extractConstBlock(HTML, "PHGROUP") + "\n" +
  extractConstBlock(HTML, "PHG_ORDER") + "\n" +
  FNS.map(n => extractFn(HTML, n)).join("\n");

// --- localStorage doubles ------------------------------------------------------------------
// A real-enough store. `mode` reproduces the three ways a browser store misbehaves:
//   'ok'      — works
//   'blocked' — every access throws (private window / storage disabled by policy)
//   'full'    — reads work, writes throw QuotaExceededError
function makeStorage(seed, mode) {
  const map = Object.assign(Object.create(null), seed || {});
  const m = mode || "ok";
  return {
    _map: map,
    getItem(k) {
      if (m === "blocked") throw new Error("SecurityError: storage disabled");
      return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null;
    },
    setItem(k, v) {
      if (m === "blocked") throw new Error("SecurityError: storage disabled");
      if (m === "full") throw new Error("QuotaExceededError");
      map[k] = String(v);
    },
    removeItem(k) { delete map[k]; },
  };
}

// Minimal DOM: only what secToggle touches — getElementById, an element's `hidden` property,
// setAttribute/getAttribute, and a `dataset`. Small enough to be obviously faithful.
function makeEl(id, attrs) {
  const cls = new Set(((attrs || {}).className || "").split(/\s+/).filter(Boolean));
  return {
    id, hidden: false, dataset: Object.assign({}, (attrs || {}).dataset),
    _attrs: Object.assign({}, (attrs || {}).attrs),
    setAttribute(k, v) { this._attrs[k] = String(v); },
    getAttribute(k) { return Object.prototype.hasOwnProperty.call(this._attrs, k) ? this._attrs[k] : null; },
    // Enough of DOMTokenList for ntToggle: contains, and the two-argument force form of toggle.
    classList: {
      contains(c) { return cls.has(c); },
      toggle(c, force) {
        const on = force === undefined ? !cls.has(c) : !!force;
        if (on) cls.add(c); else cls.delete(c);
        return on;
      },
    },
    get className() { return [...cls].join(" "); },
  };
}

// A disclosure button as ntToggle sees it: the event's currentTarget, with a text node whose
// nodeValue is the visible label.
function makeBtn(controls, label) {
  const el = makeEl("btn", { attrs: { "aria-controls": controls, "aria-expanded": "false" } });
  el.firstChild = { nodeValue: label };
  return el;
}
const clickOn = btn => ({ currentTarget: btn, stopPropagation() {} });

// Sandbox factory. `items` seeds getStrategyItems(); `lanes` maps item id -> workflow lane.
function buildEnv(opts) {
  const o = opts || {};
  const sandbox = {};
  sandbox.window = sandbox;                 // global === window, as in a browser
  sandbox.console = console;
  sandbox.localStorage = o.storage || makeStorage();
  sandbox.document = {
    _byId: o.byId || {},
    getElementById(id) { return this._byId[id] || null; },
  };
  // strategyView deps we deliberately stub so the fixture, not data.js, drives the test.
  sandbox.getStrategyItems = () => o.items || [];
  sandbox.getDumps = () => [];              // the capture inbox is irrelevant to disclosure state
  sandbox._scLane = it => (o.lanes && o.lanes[it.id]) || "pending";
  sandbox._stratCard = () => "<card/>";
  sandbox.ICO = new Proxy({}, { get: () => "" });   // inline SVG sprites; no bearing on state
  // phaseRow deps. _PR is the real task-popover registry; the task-count chips are irrelevant
  // to grouping, so they render as a marker we can assert is present without parsing it.
  sandbox._PR = {};
  sandbox.getTC = () => ({ done: 1, open: 1 });
  sandbox.buildTS = () => "<ts/>";
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox, { filename: "index.html:disclosure" });
  return sandbox;
}

// --- markup helpers: read the RENDERED state back out --------------------------------------
// Returns [{sec, expanded, hidden}] for every toggle of the given class in a rendered string.
function readToggles(html, toggleClass, bodyIdAttr) {
  const re = new RegExp('<button[^>]*class="' + toggleClass + '"[^>]*>', "g");
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const sec = (tag.match(/data-sec="([^"]*)"/) || [])[1];
    const expanded = (tag.match(/aria-expanded="([^"]*)"/) || [])[1] === "true";
    const ctrl = (tag.match(/aria-controls="([^"]*)"/) || [])[1];
    // The controlled body carries ` hidden` only when collapsed.
    const bodyRe = new RegExp('<div class="[^"]*" id="' + ctrl + '"( hidden)?>');
    const bm = html.match(bodyRe) || html.match(new RegExp('id="' + ctrl + '"( hidden)?>'));
    out.push({ sec, expanded, hidden: !!(bm && bm[1]), ctrl });
  }
  return out;
}
const stratToggles = h => readToggles(h, "strat-sec-toggle");
const tkToggles = h => readToggles(h, "tk-sec-toggle");

// Strategy fixture: three categories, all populated, so nothing is a "sole section" by accident.
const ITEMS = [
  { id: "i1", cat: "blindspot", title: "Bee", priority: "p1" },
  { id: "i2", cat: "blindspot", title: "Ant", priority: "p2" },
  { id: "i3", cat: "idea", title: "Cat", priority: "p1" },
  { id: "i4", cat: "outlook", title: "Dog", priority: "p3" },
];

// ============================================================================================
// readSecOpen / writeSecOpen
// ============================================================================================
test("readSecOpen: missing key yields no preferences", () => {
  const E = buildEnv({});
  sameMap(E.readSecOpen("nope"), {});
});

test("readSecOpen: valid map round-trips, booleans only", () => {
  const E = buildEnv({ storage: makeStorage({ k: '{"a":true,"b":false}' }) });
  sameMap(E.readSecOpen("k"), { a: true, b: false });
});

test("readSecOpen: malformed JSON fails safe to no preferences", () => {
  const E = buildEnv({ storage: makeStorage({ k: "{not json" }) });
  sameMap(E.readSecOpen("k"), {});
});

test("readSecOpen: wrong shapes (array, string, null) fail safe", () => {
  ["[1,2]", '"open"', "null", "42"].forEach(raw => {
    const E = buildEnv({ storage: makeStorage({ k: raw }) });
    sameMap(E.readSecOpen("k"), {}, "raw: " + raw);
  });
});

test("readSecOpen: a half-valid map keeps only the boolean entries", () => {
  const E = buildEnv({ storage: makeStorage({ k: '{"a":true,"b":"yes","c":1,"d":null,"e":false}' }) });
  sameMap(E.readSecOpen("k"), { a: true, e: false });
});

test("readSecOpen: a throwing store yields no preferences instead of raising", () => {
  const E = buildEnv({ storage: makeStorage({}, "blocked") });
  sameMap(E.readSecOpen("k"), {});
});

test("writeSecOpen: merges into existing state without dropping siblings", () => {
  const st = makeStorage({ k: '{"a":true}' });
  const E = buildEnv({ storage: st });
  E.writeSecOpen("k", "b", true);
  assert.deepStrictEqual(JSON.parse(st._map.k), { a: true, b: true });
  E.writeSecOpen("k", "a", false);
  assert.deepStrictEqual(JSON.parse(st._map.k), { a: false, b: true });
});

test("writeSecOpen: a full or blocked store does not throw", () => {
  ["full", "blocked"].forEach(mode => {
    const E = buildEnv({ storage: makeStorage({}, mode) });
    assert.doesNotThrow(() => E.writeSecOpen("k", "a", true), mode);
  });
});

test("writeSecOpen: corrupt existing value is replaced, not appended to", () => {
  const st = makeStorage({ k: "garbage" });
  const E = buildEnv({ storage: st });
  E.writeSecOpen("k", "a", true);
  assert.deepStrictEqual(JSON.parse(st._map.k), { a: true });
});

// ============================================================================================
// secInitialOpen — the precedence rule
// ============================================================================================
test("secInitialOpen: a stored preference wins over everything, in both directions", () => {
  const E = buildEnv({});
  assert.strictEqual(E.secInitialOpen("a", { a: true }, false), true);
  // Stored `false` must survive even when the section is the only one on screen: an explicit
  // choice outranks the convenience rule.
  assert.strictEqual(E.secInitialOpen("a", { a: false }, true), false);
});

test("secInitialOpen: with no stored preference, sole section opens", () => {
  const E = buildEnv({});
  assert.strictEqual(E.secInitialOpen("a", {}, true), true);
});

test("secInitialOpen: with no stored preference and siblings on screen, closed", () => {
  const E = buildEnv({});
  assert.strictEqual(E.secInitialOpen("a", {}, false), false);
  assert.strictEqual(E.secInitialOpen("a", { b: true }, false), false, "a sibling's state is not inherited");
});

// ============================================================================================
// secToggle — aria, hidden, and storage move together
// ============================================================================================
test("secToggle: opening sets hidden=false, aria-expanded=true, and persists true", () => {
  const body = makeEl("b1");
  body.hidden = true;
  const btn = makeEl("t1", { dataset: { sec: "agent" }, attrs: { "aria-controls": "b1", "aria-expanded": "false" } });
  const st = makeStorage();
  const E = buildEnv({ storage: st, byId: { b1: body } });
  E.secToggle(btn, "k");
  assert.strictEqual(body.hidden, false);
  assert.strictEqual(btn.getAttribute("aria-expanded"), "true");
  assert.deepStrictEqual(JSON.parse(st._map.k), { agent: true });
});

test("secToggle: closing sets hidden=true, aria-expanded=false, and persists false", () => {
  const body = makeEl("b1");
  const btn = makeEl("t1", { dataset: { sec: "agent" }, attrs: { "aria-controls": "b1", "aria-expanded": "true" } });
  const st = makeStorage();
  const E = buildEnv({ storage: st, byId: { b1: body } });
  E.secToggle(btn, "k");
  assert.strictEqual(body.hidden, true);
  assert.strictEqual(btn.getAttribute("aria-expanded"), "false");
  assert.deepStrictEqual(JSON.parse(st._map.k), { agent: false });
});

test("secToggle: repeated toggles stay in lockstep and end where they started", () => {
  const body = makeEl("b1"); body.hidden = true;
  const btn = makeEl("t1", { dataset: { sec: "agent" }, attrs: { "aria-controls": "b1", "aria-expanded": "false" } });
  const st = makeStorage();
  const E = buildEnv({ storage: st, byId: { b1: body } });
  for (let i = 0; i < 5; i++) {
    E.secToggle(btn, "k");
    assert.strictEqual(btn.getAttribute("aria-expanded"), String(!body.hidden), "step " + i);
    assert.strictEqual(JSON.parse(st._map.k).agent, !body.hidden, "persisted state, step " + i);
  }
  assert.strictEqual(body.hidden, false, "odd number of toggles from closed ends open");
});

test("secToggle: a blocked store still toggles the section for this render", () => {
  const body = makeEl("b1"); body.hidden = true;
  const btn = makeEl("t1", { dataset: { sec: "agent" }, attrs: { "aria-controls": "b1", "aria-expanded": "false" } });
  const E = buildEnv({ storage: makeStorage({}, "blocked"), byId: { b1: body } });
  assert.doesNotThrow(() => E.secToggle(btn, "k"));
  assert.strictEqual(body.hidden, false);
  assert.strictEqual(btn.getAttribute("aria-expanded"), "true");
});

test("secToggle: a missing body is a no-op, not a crash", () => {
  const btn = makeEl("t1", { dataset: { sec: "agent" }, attrs: { "aria-controls": "gone", "aria-expanded": "false" } });
  const E = buildEnv({});
  assert.doesNotThrow(() => E.secToggle(btn, "k"));
  assert.strictEqual(btn.getAttribute("aria-expanded"), "false", "aria must not drift when nothing moved");
});

test("the three surfaces use distinct, namespaced, versioned keys", () => {
  // `const` at script top level lives in the global lexical scope, not on the global object,
  // so it is read back by evaluating in the same context rather than off the sandbox.
  const E = buildEnv({});
  const keys = vm.runInContext("JSON.stringify(DISCLOSURE_KEY)", E);
  assert.deepStrictEqual(JSON.parse(keys), {
    strategy: "strat.secOpen",
    toolkit: "dashboard.v2.toolkit.secOpen",
    project: "dashboard.v2.project.phaseGroups",
  });
});

test("stratSecToggle / tkSecToggle write to their own key only", () => {
  const mk = () => {
    const body = makeEl("b1"); body.hidden = true;
    const btn = makeEl("t1", { dataset: { sec: "idea" }, attrs: { "aria-controls": "b1", "aria-expanded": "false" } });
    return { body, btn };
  };
  let f = mk(); let st = makeStorage();
  buildEnv({ storage: st, byId: { b1: f.body } }).stratSecToggle(f.btn);
  assert.deepStrictEqual(Object.keys(st._map), ["strat.secOpen"]);

  f = mk(); st = makeStorage();
  buildEnv({ storage: st, byId: { b1: f.body } }).tkSecToggle(f.btn);
  assert.deepStrictEqual(Object.keys(st._map), ["dashboard.v2.toolkit.secOpen"]);
});

// ============================================================================================
// strategyView() — rendered initial state
// ============================================================================================
test("strategy fresh visit: every category renders collapsed", () => {
  const E = buildEnv({ items: ITEMS });
  const t = stratToggles(E.strategyView());
  assert.strictEqual(t.length, 3, "three populated categories");
  t.forEach(s => {
    assert.strictEqual(s.expanded, false, s.sec + " must start closed");
    assert.strictEqual(s.hidden, true, s.sec + " body must start hidden");
  });
});

test("strategy fresh visit: the first category is not special-cased open", () => {
  const E = buildEnv({ items: ITEMS });
  const t = stratToggles(E.strategyView());
  assert.strictEqual(t[0].expanded, false, "no large first section unfolding on arrival");
});

test("strategy: a valid stored preference is restored, per category, independently", () => {
  const E = buildEnv({
    items: ITEMS,
    storage: makeStorage({ "strat.secOpen": '{"idea":true,"blindspot":false}' }),
  });
  const t = stratToggles(E.strategyView());
  const by = Object.fromEntries(t.map(s => [s.sec, s]));
  assert.strictEqual(by.idea.expanded, true);
  assert.strictEqual(by.idea.hidden, false);
  assert.strictEqual(by.blindspot.expanded, false);
  assert.strictEqual(by.outlook.expanded, false, "an unmentioned category stays closed");
});

test("strategy: multiple categories can be open at once", () => {
  const E = buildEnv({
    items: ITEMS,
    storage: makeStorage({ "strat.secOpen": '{"idea":true,"outlook":true}' }),
  });
  const open = stratToggles(E.strategyView()).filter(s => s.expanded).map(s => s.sec);
  assert.deepStrictEqual(open.sort(), ["idea", "outlook"]);
});

test("strategy: malformed stored state fails safe to all-closed", () => {
  ["{{{", '["idea"]', '{"idea":"true"}', ""].forEach(raw => {
    const E = buildEnv({ items: ITEMS, storage: makeStorage({ "strat.secOpen": raw }) });
    const t = stratToggles(E.strategyView());
    assert.ok(t.length > 0, "sections still render for raw: " + raw);
    t.forEach(s => assert.strictEqual(s.expanded, false, "raw " + raw + " -> " + s.sec));
  });
});

test("strategy: filtering to one category opens it, so the result is visible", () => {
  const E = buildEnv({ items: ITEMS, storage: makeStorage({ "strat.cat": "idea" }) });
  const t = stratToggles(E.strategyView());
  assert.strictEqual(t.length, 1);
  assert.strictEqual(t[0].sec, "idea");
  assert.strictEqual(t[0].expanded, true);
  assert.strictEqual(t[0].hidden, false);
});

test("strategy: a lane filter that leaves one category also opens it", () => {
  // Only i3 (idea) is in progress; the lane filter reduces the board to one section.
  const E = buildEnv({
    items: ITEMS,
    lanes: { i1: "pending", i2: "pending", i3: "inprogress", i4: "pending" },
    storage: makeStorage({ "strat.status": "inprogress" }),
  });
  const t = stratToggles(E.strategyView());
  assert.strictEqual(t.length, 1, "one populated category survives the lane filter");
  assert.strictEqual(t[0].expanded, true, "sole visible section opens even without a category tab");
});

test("strategy: clearing the filter restores stored state and does not lose it", () => {
  const st = makeStorage({ "strat.cat": "idea", "strat.secOpen": '{"outlook":true}' });
  // Filtered: only idea renders, opened by the sole-section rule.
  let t = stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView());
  assert.deepStrictEqual(t.map(s => s.sec), ["idea"]);
  assert.strictEqual(t[0].expanded, true);
  // The sole-section rule is a render-time convenience, not a write: it must not have
  // overwritten the user's stored map.
  assert.deepStrictEqual(JSON.parse(st._map["strat.secOpen"]), { outlook: true });
  // Clearing the filter re-renders all three with the stored preference intact.
  st._map["strat.cat"] = "all";
  t = stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView());
  const by = Object.fromEntries(t.map(s => [s.sec, s]));
  assert.strictEqual(by.outlook.expanded, true, "the user's own choice survived the round trip");
  assert.strictEqual(by.idea.expanded, false, "the temporary filter-open did not become permanent");
});

test("strategy: aria-expanded and the body's hidden attribute never disagree", () => {
  [{}, { "strat.secOpen": '{"idea":true}' }, { "strat.cat": "outlook" }, { "strat.secOpen": "junk" }]
    .forEach(seed => {
      const t = stratToggles(buildEnv({ items: ITEMS, storage: makeStorage(seed) }).strategyView());
      t.forEach(s => assert.strictEqual(s.expanded, !s.hidden,
        "aria/hidden disagree for " + s.sec + " with seed " + JSON.stringify(seed)));
    });
});

test("strategy: every toggle carries a stable data-sec id and an aria-controls target", () => {
  const html = buildEnv({ items: ITEMS }).strategyView();
  stratToggles(html).forEach(s => {
    assert.ok(s.sec && /^[a-z]+$/.test(s.sec), "expected a stable category id, got " + s.sec);
    assert.ok(s.ctrl && html.indexOf('id="' + s.ctrl + '"') > -1, "aria-controls must resolve: " + s.ctrl);
  });
});

// ============================================================================================
// toolkitView() — rendered initial state
// ============================================================================================
test("toolkit fresh visit: every section renders collapsed", () => {
  const t = tkToggles(buildEnv({}).toolkitView());
  assert.ok(t.length >= 5, "expected the full section set, got " + t.length);
  t.forEach(s => {
    assert.strictEqual(s.expanded, false, s.sec + " must start closed");
    assert.strictEqual(s.hidden, true, s.sec + " grid must start hidden");
  });
});

test("toolkit: section ids are stable and unique, so stored state can't collide", () => {
  const secs = tkToggles(buildEnv({}).toolkitView()).map(s => s.sec);
  secs.forEach(s => assert.ok(s && /^[a-z]+$/.test(s), "unstable section id: " + s));
  assert.strictEqual(new Set(secs).size, secs.length, "duplicate section ids: " + secs.join(","));
});

test("toolkit: stored state is restored on render, with no open-then-close flash", () => {
  const secs = tkToggles(buildEnv({}).toolkitView()).map(s => s.sec);
  const pick = secs[2];
  const E = buildEnv({
    storage: makeStorage({ "dashboard.v2.toolkit.secOpen": JSON.stringify({ [pick]: true }) }),
  });
  const t = tkToggles(E.toolkitView());
  const by = Object.fromEntries(t.map(s => [s.sec, s]));
  // Rendered open in the first frame: aria and hidden are both already correct in the markup.
  assert.strictEqual(by[pick].expanded, true);
  assert.strictEqual(by[pick].hidden, false);
  t.filter(s => s.sec !== pick).forEach(s => assert.strictEqual(s.expanded, false, s.sec));
});

test("toolkit: malformed or unreadable state fails safe to all-closed", () => {
  const cases = [
    { storage: makeStorage({ "dashboard.v2.toolkit.secOpen": "not-json" }) },
    { storage: makeStorage({ "dashboard.v2.toolkit.secOpen": '["agent"]' }) },
    { storage: makeStorage({ "dashboard.v2.toolkit.secOpen": '{"agent":"open"}' }) },
    { storage: makeStorage({}, "blocked") },
  ];
  cases.forEach((c, i) => {
    const t = tkToggles(buildEnv(c).toolkitView());
    assert.ok(t.length > 0, "sections still render, case " + i);
    t.forEach(s => assert.strictEqual(s.expanded, false, "case " + i + " -> " + s.sec));
  });
});

test("toolkit: a stale id from an older section set is ignored, not rendered", () => {
  const E = buildEnv({
    storage: makeStorage({ "dashboard.v2.toolkit.secOpen": '{"retired-section":true}' }),
  });
  const t = tkToggles(E.toolkitView());
  t.forEach(s => assert.strictEqual(s.expanded, false, s.sec));
});

test("toolkit: aria-expanded and the grid's hidden attribute never disagree", () => {
  const secs = tkToggles(buildEnv({}).toolkitView()).map(s => s.sec);
  [{}, { "dashboard.v2.toolkit.secOpen": JSON.stringify({ [secs[0]]: true, [secs[1]]: false }) },
    { "dashboard.v2.toolkit.secOpen": "junk" }].forEach(seed => {
    tkToggles(buildEnv({ storage: makeStorage(seed) }).toolkitView()).forEach(s =>
      assert.strictEqual(s.expanded, !s.hidden, "aria/hidden disagree for " + s.sec));
  });
});

test("toolkit: no card is stranded — every section is reachable through its own button", () => {
  const html = buildEnv({}).toolkitView();
  const grids = [...html.matchAll(/<div class="tk-grid" id="([^"]+)"/g)].map(m => m[1]);
  const ctrls = tkToggles(html).map(s => s.ctrl);
  assert.deepStrictEqual(grids.sort(), ctrls.sort(),
    "every grid must be the aria-controls target of exactly one toggle");
});

// ============================================================================================
// project view — phase groups
// ============================================================================================
// A stand-in for the largest real project: live/active/partial work, a couple parked, several
// closed. Chips are the leading token of the note, exactly as the dataset writes them.
const PROG = { phases: [
  { name: "P0-2 Foundation", pct: 100, note: "CLOSED — original axis" },
  { name: "P3 Data Dashboard", pct: 93, note: "ACTIVE — permanent substrate" },
  { name: "P4 Assistant", pct: 96, note: "CLOSED — live-smoked" },
  { name: "P5 Views/Sheets", pct: 15, note: "ON HOLD — bonus, not a need" },
  { name: "P6 Billing", pct: 88, note: "PARTIAL — client-mgmt E and F open" },
  { name: "P7 Write-back", pct: 68, note: "LIVE — supervised cutover" },
  { name: "P10 Cost", pct: 0, note: "CONDITIONAL — supersedes 3.X" },
  { name: "P12 Unlabelled", pct: 40, note: "no leading status token here" },
] };
const phToggles = h => readToggles(h, "ph-gh");
// Return one group's rendered rows. Groups are siblings, so split on the wrapper and take the
// chunk carrying this body id — nested `.ph` divs make a closing-tag regex unreliable.
const groupOf = (html, gid) =>
  html.split('<div class="ph-group">').find(c => c.indexOf('id="' + gid + '"') >= 0) || "";

test("phases: a fresh visit opens In motion and folds Parked and Done", () => {
  const t = phToggles(buildEnv({}).phaseBars(PROG, "acme"));
  assert.deepStrictEqual(t.map(g => g.sec), ["motion", "parked", "done"], "order is motion → parked → done");
  assert.deepStrictEqual(t.map(g => g.expanded), [true, false, false]);
  t.forEach(g => assert.strictEqual(g.expanded, !g.hidden, "aria/hidden disagree for " + g.sec));
});

test("phases: every phase lands in exactly one group, and the counts say so", () => {
  const html = buildEnv({}).phaseBars(PROG, "acme");
  const counts = [...html.matchAll(/<span class="gct">(\d+)<\/span>/g)].map(m => +m[1]);
  // motion: P3 ACTIVE, P6 PARTIAL, P7 LIVE, P12 unchipped · parked: P5 ON HOLD, P10 CONDITIONAL
  // done: P0-2 CLOSED, P4 CLOSED
  assert.deepStrictEqual(counts, [4, 2, 2]);
  assert.strictEqual(counts.reduce((a, b) => a + b, 0), PROG.phases.length, "no phase dropped");
  assert.strictEqual((html.match(/<div class="ph[ "]/g) || []).length, PROG.phases.length);
});

test("phases: an unchipped phase reads as live work, not folded away on a guess", () => {
  const html = buildEnv({}).phaseBars(PROG, "acme");
  const motion = groupOf(html, "phg-acme-motion");
  assert.ok(/P12 Unlabelled/.test(motion), "unchipped phase must be in the open group");
});

test("phases: a closed phase under 100% still groups as Done (chip wins, not pct)", () => {
  const html = buildEnv({}).phaseBars(PROG, "acme");
  assert.ok(/P4 Assistant/.test(groupOf(html, "phg-acme-done")), "CLOSED 96% belongs to Done");
});

test("phases: a project with only one group renders a plain list, no header", () => {
  const only = { phases: [{ name: "A", pct: 10, note: "ACTIVE — x" }, { name: "B", pct: 20, note: "LIVE — y" }] };
  const html = buildEnv({}).phaseBars(only, "solo");
  assert.strictEqual(phToggles(html).length, 0, "a lone group needs no control that can only hide everything");
  assert.ok(/^<div class="phases">/.test(html) && /A/.test(html) && /B/.test(html));
});

test("phases: a stored preference overrides the default in both directions", () => {
  const seed = { "dashboard.v2.project.phaseGroups": JSON.stringify({ motion: false, done: true }) };
  const t = phToggles(buildEnv({ storage: makeStorage(seed) }).phaseBars(PROG, "acme"));
  assert.deepStrictEqual(t.map(g => [g.sec, g.expanded]),
    [["motion", false], ["parked", false], ["done", true]]);
  t.forEach(g => assert.strictEqual(g.expanded, !g.hidden, g.sec));
});

test("phases: group state is shared across projects, so a choice holds everywhere", () => {
  const store = makeStorage({ "dashboard.v2.project.phaseGroups": JSON.stringify({ done: true }) });
  ["acme", "beta"].forEach(pid => {
    const done = phToggles(buildEnv({ storage: store }).phaseBars(PROG, pid)).find(g => g.sec === "done");
    assert.strictEqual(done.expanded, true, pid + " must honour the same stored choice");
    assert.strictEqual(done.ctrl, "phg-" + pid + "-done", "body ids stay per-project so two cards can coexist");
  });
});

test("phases: malformed and unavailable storage both fall back to the defaults", () => {
  [makeStorage({ "dashboard.v2.project.phaseGroups": "{oops" }),
    makeStorage({ "dashboard.v2.project.phaseGroups": "[1,2,3]" }),
    makeStorage({ "dashboard.v2.project.phaseGroups": JSON.stringify({ motion: "yes" }) }),
    makeStorage({}, "blocked")].forEach((storage, i) => {
    let t;
    assert.doesNotThrow(() => { t = phToggles(buildEnv({ storage }).phaseBars(PROG, "acme")); }, "case " + i);
    assert.deepStrictEqual(t.map(g => g.expanded), [true, false, false], "case " + i + " must be the default layout");
  });
});

test("phGroupToggle writes to the project key and leaves the other two alone", () => {
  const body = makeEl("phg-acme-done"); body.hidden = true;
  const btn = makeEl("b", { dataset: { sec: "done" }, attrs: { "aria-controls": "phg-acme-done", "aria-expanded": "false" } });
  const store = makeStorage({});
  const E = buildEnv({ storage: store, byId: { "phg-acme-done": body } });
  E.phGroupToggle(btn);
  assert.strictEqual(body.hidden, false);
  assert.strictEqual(btn.getAttribute("aria-expanded"), "true");
  assert.deepStrictEqual(JSON.parse(store._map["dashboard.v2.project.phaseGroups"]), { done: true });
  assert.ok(!("strat.secOpen" in store._map) && !("dashboard.v2.toolkit.secOpen" in store._map),
    "toggling a phase group must not touch Strategy's or Toolkit's key");
});

test("phases: no phase data renders the empty state, not a group shell", () => {
  const E = buildEnv({});
  assert.ok(/no phase data yet/.test(E.phaseBars(null, "acme")));
  assert.strictEqual(phToggles(E.phaseBars(null, "acme")).length, 0);
});

// ============================================================================================
// the global [hidden] override the disclosures depend on
// ============================================================================================
test("stylesheet forces [hidden] to win over class-level display rules", () => {
  // .tk-grid{display:grid} outranks the UA sheet's bare [hidden]{display:none}, so without
  // this rule a "collapsed" grid keeps its full height while correctly reporting hidden===true.
  assert.ok(/\[hidden\]\s*\{\s*display:\s*none\s*!important;?\s*\}/.test(HTML),
    "index.html must carry a global [hidden]{display:none!important} rule");
});

// ============================================================================================
// prose folding outside a phase row — audit run notes and history rows
// ============================================================================================
const SHORT = "Weekly full audit, no findings.";
const LONG = "x".repeat(400);

test("foldText: a short note renders plain, with no disclosure control", () => {
  const E = buildEnv({});
  const h = E.foldText(SHORT, "au-run", "Full run note");
  assert.ok(h.includes(SHORT));
  assert.ok(!/clamped/.test(h), "a note that already fits must not be clamped");
  assert.ok(!/nt-more/.test(h), "and must not carry a control that can only hide it");
});

test("foldText: empty or absent text renders nothing at all", () => {
  const E = buildEnv({});
  ["", "   ", null, undefined].forEach(v =>
    assert.strictEqual(E.foldText(v, "au-run", "Full run note"), "", "value: " + JSON.stringify(v)));
});

test("foldText: a long note is clamped and gets a control aimed at it", () => {
  const E = buildEnv({});
  const h = E.foldText(LONG, "au-run", "Full run note");
  const id = (h.match(/id="([^"]+)"/) || [])[1];
  assert.ok(id, "the folded block must carry an id");
  assert.ok(h.includes('class="au-run clamp2 clamped"'));
  assert.ok(h.includes('aria-controls="' + id + '"'), "the control must name the block it folds");
  assert.ok(h.includes('aria-expanded="false"'));
  assert.ok(h.includes(LONG), "nothing is truncated away — the full text stays in the markup");
});

test("foldText: ids are unique, so two notes on one page can't collide", () => {
  const E = buildEnv({});
  const ids = [E.foldText(LONG, "au-run", "L"), E.foldText(LONG, "au-run", "L")]
    .map(h => (h.match(/id="([^"]+)"/) || [])[1]);
  assert.notStrictEqual(ids[0], ids[1]);
});

test("foldText: the text is escaped, not injected", () => {
  const E = buildEnv({});
  const h = E.foldText("<img src=x onerror=1>" + LONG, "au-run", "L");
  assert.ok(!/<img/.test(h));
  assert.ok(h.includes("&lt;img"));
});

// --- audit history rows -----------------------------------------------------------------------
const auP = rows => ({ id: "acme", name: "Acme", audit: { history: rows } });
const auRow = over => Object.assign(
  { date: "2026-08-26", type: "weekly", result: "clean", scope: "src", report: "r.md" }, over);

test("audit history: a short run renders unclamped, with no control", () => {
  const E = buildEnv({});
  const h = E.auditHistory(auP([auRow()]));
  assert.ok(!/clamp2/.test(h));
  assert.ok(!/nt-more[^]*Full note/.test(h));
});

test("audit history: a long run clamps type, result and scope under one control", () => {
  const E = buildEnv({});
  const h = E.auditHistory(auP([auRow({ result: LONG, type: "t".repeat(120), scope: "s".repeat(200) })]));
  const ctrl = (h.match(/aria-controls="([^"]+)"/) || [])[1];
  const ids = ctrl.split(" ");
  assert.strictEqual(ids.length, 3, "one control, three folded regions: " + ctrl);
  ids.forEach(id => {
    const m = h.match(new RegExp('class="([^"]*)" id="' + id + '"'));
    assert.ok(m, "no element carries id " + id);
    assert.ok(/clamp2 clamped/.test(m[1]), id + " is named by the control but is not clamped");
  });
});

test("audit history: a long field with no scope controls only the two regions present", () => {
  const E = buildEnv({});
  const h = E.auditHistory(auP([auRow({ result: LONG, scope: "" })]));
  const ctrl = (h.match(/aria-controls="([^"]+)"/) || [])[1];
  assert.strictEqual(ctrl.trim().split(/\s+/).length, 2);
  assert.ok(!/ah-scope/.test(h), "an absent scope must not render an empty row");
});

test("audit history: only the first three runs show; the rest stay in the DOM, folded", () => {
  const E = buildEnv({});
  const h = E.auditHistory(auP(Array.from({ length: 7 }, (_, i) => auRow({ date: "2026-08-0" + i }))));
  assert.ok(/Run history · 7 runs/.test(h));
  assert.ok(/Show 4 more runs/.test(h));
  for (let i = 0; i < 7; i++) assert.ok(h.includes("2026-08-0" + i), "run " + i + " must stay in the markup");
});

// --- ntToggle -----------------------------------------------------------------------------------
test("ntToggle: opening clears the clamp and flips the control's label and state", () => {
  const note = makeEl("n1", { className: "au-run clamp2 clamped" });
  const btn = makeBtn("n1", "Full run note");
  const E = buildEnv({ byId: { n1: note, btn: btn } });
  E.ntToggle(clickOn(btn), "n1", "Full run note");
  assert.ok(!note.classList.contains("clamped"));
  assert.strictEqual(btn.getAttribute("aria-expanded"), "true");
  assert.strictEqual(btn.firstChild.nodeValue, "Less");
});

test("ntToggle: one control drives every region its aria-controls names", () => {
  const a = makeEl("a", { className: "ah-type clamp2 clamped" });
  const b = makeEl("b", { className: "ah-result clamp2 clamped" });
  const c = makeEl("c", { className: "ah-scope clamp2 clamped" });
  const btn = makeBtn("b a c", "Full note");
  const E = buildEnv({ byId: { a: a, b: b, c: c } });
  E.ntToggle(clickOn(btn), "b", "Full note");
  [a, b, c].forEach(el => assert.ok(!el.classList.contains("clamped"), el.id + " stayed clamped"));
  E.ntToggle(clickOn(btn), "b", "Full note");
  [a, b, c].forEach(el => assert.ok(el.classList.contains("clamped"), el.id + " stayed open"));
  assert.strictEqual(btn.getAttribute("aria-expanded"), "false");
  assert.strictEqual(btn.firstChild.nodeValue, "Full note");
});

test("ntToggle: a missing or stale target is a no-op, not a crash", () => {
  const btn = makeBtn("gone", "Full note");
  const E = buildEnv({ byId: {} });
  E.ntToggle(clickOn(btn), "gone", "Full note");
  assert.strictEqual(btn.getAttribute("aria-expanded"), "false", "state must not claim an open region");
});

// ============================================================================================
// project layout contract — the balancer relies on these attributes, not on card order
// ============================================================================================
test("project cards declare a reading order the balancer can restore", () => {
  // Every card the two columns render carries data-ord; the movable ones also carry data-move.
  const fn = HTML.slice(HTML.indexOf("function project(p)"), HTML.indexOf("const PROJ_BALANCE_TOL"));
  const ords = [...fn.matchAll(/data-ord="(\d+)"/g)].map(m => +m[1]);
  assert.ok(ords.length >= 8, "expected every project card to declare data-ord, got " + ords.length);
  assert.strictEqual(new Set(ords).size, ords.length, "data-ord values must be unique: " + ords);
  // The action set and the phase list are what each column is for — they must stay put.
  const pinned = [...fn.matchAll(/data-ord="(1[0-9]|2[0-9])"[^>]*>/g)].map(m => m[0]);
  pinned.forEach(tag => assert.ok(!/data-move/.test(tag), "pinned card must not be movable: " + tag));
});

test("the balancer stands down when the grid is stacked into one column", () => {
  const fn = HTML.slice(HTML.indexOf("function balanceProjectGrid"), HTML.indexOf("let _pbTimer"));
  assert.ok(/gridTemplateColumns/.test(fn),
    "balanceProjectGrid must check the computed column count before moving anything");
  assert.ok(/\.proj-rail\{order:-1;\}/.test(HTML.replace(/\s+/g, "")),
    "stacked layout must put the action rail above the phase list");
});

// ============================================================================================
// strategy filter vs stored preference — a filter that leaves one section must show its result
// ============================================================================================
test("strategy: stored false is overridden by a category filter leaving one section", () => {
  const st = makeStorage({ "strat.cat": "idea", "strat.secOpen": '{"idea":false}' });
  const t = stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView());
  assert.strictEqual(t.length, 1);
  assert.strictEqual(t[0].sec, "idea");
  assert.strictEqual(t[0].expanded, true, "the sole filtered section must be visible despite stored false");
  assert.strictEqual(t[0].hidden, false);
});

test("strategy: stored true + sole filtered section stays open", () => {
  const st = makeStorage({ "strat.cat": "idea", "strat.secOpen": '{"idea":true}' });
  const t = stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView());
  assert.strictEqual(t[0].expanded, true);
});

test("strategy: the filter-driven open never writes to the stored map", () => {
  const st = makeStorage({ "strat.cat": "idea", "strat.secOpen": '{"idea":false}' });
  buildEnv({ items: ITEMS, storage: st }).strategyView();
  assert.deepStrictEqual(JSON.parse(st._map["strat.secOpen"]), { idea: false },
    "render-time convenience must not become a persisted preference");
});

test("strategy: clearing the filter restores the stored false", () => {
  const st = makeStorage({ "strat.cat": "idea", "strat.secOpen": '{"idea":false}' });
  stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView()); // filtered render
  st._map["strat.cat"] = "all";
  const by = Object.fromEntries(
    stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView()).map(s => [s.sec, s]));
  assert.strictEqual(by.idea.expanded, false, "the user's stored choice survives the filter round-trip");
});

test("strategy: a lane filter leaving one stored-closed section also opens it", () => {
  const st = makeStorage({ "strat.status": "inprogress", "strat.secOpen": '{"idea":false}' });
  const t = stratToggles(buildEnv({
    items: ITEMS,
    lanes: { i1: "pending", i2: "pending", i3: "inprogress", i4: "pending" },
    storage: st,
  }).strategyView());
  assert.strictEqual(t.length, 1);
  assert.strictEqual(t[0].expanded, true);
});

test("strategy: unfiltered multi-section render still honours stored preferences", () => {
  const st = makeStorage({ "strat.secOpen": '{"idea":true,"blindspot":false}' });
  const by = Object.fromEntries(
    stratToggles(buildEnv({ items: ITEMS, storage: st }).strategyView()).map(s => [s.sec, s]));
  assert.strictEqual(by.idea.expanded, true);
  assert.strictEqual(by.blindspot.expanded, false);
});

// ============================================================================================
// report jump — arbitrary names must survive the trip into and back out of the markup
// ============================================================================================
const unesc = s => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

test("audit history: report references carry data-* values, never inline JS literals", () => {
  const h = buildEnv({}).auditHistory(auP([auRow()]));
  assert.ok(!/onclick="auViewReport/.test(h), "no auViewReport inline handler may remain");
  assert.ok(/data-report-file="/.test(h) && /data-report-title="/.test(h));
  assert.ok(/class="ah-ref au-jump"[^>]*role="button"[^>]*tabindex="0"/.test(h),
    "the reference must stay keyboard-operable once the inline handler is gone");
});

test("audit history: apostrophes, quotes, ampersands and angle brackets round-trip intact", () => {
  const p = { id: "acme", name: `O'Brien & Co <x> "West"`, audit: { history: [
    auRow({ report: `2026-08-31__owner's "final" <v2> & notes.md`, date: "2026-08-31" }),
  ] } };
  const h = buildEnv({}).auditHistory(p);
  const file = (h.match(/data-report-file="([^"]*)"/) || [])[1];
  const title = (h.match(/data-report-title="([^"]*)"/) || [])[1];
  assert.strictEqual(unesc(file), `acme/2026-08-31__owner's "final" <v2> & notes.md`,
    "the dataset value the click handler reads must be the exact name");
  assert.strictEqual(unesc(title), `O'Brien & Co <x> "West" — 2026-08-31 report`);
  assert.ok(!/<x>/.test(h), "raw angle brackets must never reach the markup");
  assert.ok(!/onclick=/.test(h.match(/<span class="ah-ref[^>]*>/)[0]), "no handler attribute on the span");
});

test("audit history: unicode punctuation in names is preserved verbatim", () => {
  const p = { id: "acme", name: "Étude — “fancy” ’quotes’", audit: { history: [auRow({ report: "r–1.md" })] } };
  const h = buildEnv({}).auditHistory(p);
  assert.strictEqual(unesc((h.match(/data-report-file="([^"]*)"/) || [])[1]), "acme/r–1.md");
  assert.ok(/Étude — “fancy” ’quotes’/.test(unesc((h.match(/data-report-title="([^"]*)"/) || [])[1])));
});

test("show() wires a delegated handler for the data-report-file references", () => {
  const wiring = HTML.slice(HTML.indexOf("function show(id)"), HTML.indexOf("// ══ Keyboard"));
  assert.ok(/\.au-jump\[data-report-file\]/.test(wiring), "show() must select the report references");
  assert.ok(/dataset\.reportFile/.test(wiring) && /dataset\.reportTitle/.test(wiring),
    "the handler must read the values back from dataset, not from source text");
});

// ============================================================================================
// balanceProjectGrid — declared placement is restored before any breakpoint decision
// ============================================================================================
// A faithful-enough two-column DOM: appendChild/insertBefore reparent, offsetHeight is the sum
// of the children's declared heights, and getComputedStyle answers from the test's own state.
function makeCard(ord, h, move) {
  return {
    h, parentElement: null,
    dataset: Object.assign({ ord: String(ord) }, move ? { move: "1" } : {}),
    get nextElementSibling() {
      const p = this.parentElement; if (!p) return null;
      const i = p.children.indexOf(this); return p.children[i + 1] || null;
    },
  };
}
function makeColumn() {
  return {
    children: [],
    _detach(c) {
      if (c.parentElement) {
        const i = c.parentElement.children.indexOf(c);
        if (i >= 0) c.parentElement.children.splice(i, 1);
      }
    },
    appendChild(c) { this._detach(c); this.children.push(c); c.parentElement = this; },
    insertBefore(c, ref) {
      this._detach(c);
      const i = this.children.indexOf(ref);
      this.children.splice(i < 0 ? this.children.length : i, 0, c);
      c.parentElement = this;
    },
    get offsetHeight() { return this.children.reduce((s, c) => s + c.h, 0); },
  };
}
function balancerEnv() {
  const main = makeColumn(), rail = makeColumn();
  const grid = { firstElementChild: main, lastElementChild: rail };
  const state = { stacked: false };
  const sandbox = {
    console,
    document: { querySelector: sel => (sel === ".proj-grid" ? grid : null) },
    getComputedStyle: () => ({ gridTemplateColumns: state.stacked ? "1fr" : "500px 380px" }),
    window: { addEventListener() {} },
    setTimeout() { return 0; }, clearTimeout() {},
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  const src = HTML.slice(HTML.indexOf("const PROJ_BALANCE_TOL"), HTML.indexOf("let _pbTimer"));
  vm.runInContext(src, sandbox, { filename: "index.html:balancer" });
  return { main, rail, state, run: () => vm.runInContext("balanceProjectGrid()", sandbox) };
}
// Fixture mirrors a real project: pinned action set + phases in main, pinned audit in rail,
// movable reference cards. Main is far taller, so the wide pass has a reason to move.
function seedBalancer(env) {
  const cards = {
    actions: makeCard(10, 200, false), phases: makeCard(20, 1400, false),
    waves: makeCard(60, 500, true), recent: makeCard(70, 200, true),
    audit: makeCard(30, 400, false), activity: makeCard(50, 150, true),
  };
  ["actions", "phases", "waves", "recent"].forEach(k => env.main.appendChild(cards[k]));
  ["audit", "activity"].forEach(k => env.rail.appendChild(cards[k]));
  return cards;
}

test("balancer: a movable card relocates at wide width and pinned cards never move", () => {
  const env = balancerEnv(); const c = seedBalancer(env);
  env.run();
  assert.strictEqual(c.waves.parentElement, env.rail, "the tall movable card closes the gap");
  assert.strictEqual(c.actions.parentElement, env.main, "pinned action card stays");
  assert.strictEqual(c.phases.parentElement, env.main, "pinned phase list stays");
  assert.strictEqual(c.audit.parentElement, env.rail, "pinned audit card stays");
});

test("balancer: resizing to the stacked breakpoint restores declared placement", () => {
  const env = balancerEnv(); const c = seedBalancer(env);
  env.run();                                   // wide pass moves something
  assert.strictEqual(c.waves.parentElement, env.rail, "precondition: a move happened");
  env.state.stacked = true;
  env.run();                                   // the resize pass at the narrow breakpoint
  assert.strictEqual(c.waves.parentElement, env.main, "the moved card is back in its declared column");
  assert.deepStrictEqual(env.main.children.map(x => +x.dataset.ord), [10, 20, 60, 70],
    "main column is back in declared data-ord order");
  assert.deepStrictEqual(env.rail.children.map(x => +x.dataset.ord), [30, 50],
    "rail column is back in declared data-ord order");
});

test("balancer: resizing back to wide balances again from the declared layout", () => {
  const env = balancerEnv(); const c = seedBalancer(env);
  env.run();
  env.state.stacked = true; env.run();
  env.state.stacked = false; env.run();
  assert.strictEqual(c.waves.parentElement, env.rail, "wide layout re-balances after the round trip");
  const ords = col => col.children.map(x => +x.dataset.ord);
  assert.deepStrictEqual(ords(env.main), [...ords(env.main)].sort((a, b) => a - b), "main stays ord-sorted");
  assert.deepStrictEqual(ords(env.rail), [...ords(env.rail)].sort((a, b) => a - b), "rail stays ord-sorted");
});

test("balancer: pinned cards survive every transition in their declared column", () => {
  const env = balancerEnv(); const c = seedBalancer(env);
  [false, true, false, true].forEach(stacked => {
    env.state.stacked = stacked; env.run();
    assert.strictEqual(c.actions.parentElement, env.main, "actions pinned (stacked=" + stacked + ")");
    assert.strictEqual(c.phases.parentElement, env.main, "phases pinned (stacked=" + stacked + ")");
    assert.strictEqual(c.audit.parentElement, env.rail, "audit pinned (stacked=" + stacked + ")");
  });
});

test("balancer: balanced columns within tolerance are left untouched", () => {
  const env = balancerEnv();
  const a = makeCard(10, 500, false), b = makeCard(60, 100, true);
  const x = makeCard(30, 550, false), y = makeCard(50, 100, true);
  env.main.appendChild(a); env.main.appendChild(b);
  env.rail.appendChild(x); env.rail.appendChild(y);
  env.run();
  assert.strictEqual(b.parentElement, env.main, "a 50px gap is under tolerance — nothing moves");
});

// ============================================================================================
// keyboard — an open modal owns the keys; g-jumps stop at the backdrop
// ============================================================================================
function keyboardEnv() {
  const calls = { show: [], openCP: 0, openHelp: 0 };
  const state = { modalOpen: false };
  const listeners = [];
  const sandbox = {
    console,
    document: {
      addEventListener: (type, fn) => { if (type === "keydown") listeners.push(fn); },
      querySelector: sel => (state.modalOpen && /cp-bg|au-modal-bg/.test(sel) ? {} : null),
    },
    setTimeout(fn) { return { fn }; }, clearTimeout() {},
    show: id => calls.show.push(id),
    openCP: () => calls.openCP++,
    openHelp: () => calls.openHelp++,
  };
  vm.createContext(sandbox);
  const src = HTML.slice(HTML.indexOf("let _gPending=false"), HTML.indexOf("function openHelp("));
  vm.runInContext(src, sandbox, { filename: "index.html:keyboard" });
  return { calls, state, press: key => listeners.forEach(fn => fn({
    key, ctrlKey: false, metaKey: false, altKey: false, target: { tagName: "BODY" },
    preventDefault() {},
  })) };
}

test("keyboard: modal closed, g o navigates to Overview", () => {
  const k = keyboardEnv();
  k.press("g"); k.press("o");
  assert.deepStrictEqual(k.calls.show, ["overview"]);
});

test("keyboard: modal open, g o does NOT navigate behind the dialog", () => {
  const k = keyboardEnv();
  k.state.modalOpen = true;
  k.press("g"); k.press("o");
  assert.deepStrictEqual(k.calls.show, [], "no view change behind an aria-modal dialog");
});

test("keyboard: modal open, ? does not stack a second shortcut sheet", () => {
  const k = keyboardEnv();
  k.state.modalOpen = true;
  k.press("?");
  assert.strictEqual(k.calls.openHelp, 0);
});

test("keyboard: a g pressed before the modal opened cannot fire through it", () => {
  const k = keyboardEnv();
  k.press("g");                 // jump armed…
  k.state.modalOpen = true;     // …then a modal opens (e.g. ? handled elsewhere)
  k.press("o");
  assert.deepStrictEqual(k.calls.show, [], "the pending jump is cleared, not held for later");
  k.state.modalOpen = false;
  k.press("o");
  assert.deepStrictEqual(k.calls.show, [], "and it stays cleared after the modal closes");
});

test("keyboard: shortcuts work normally again after the modal closes", () => {
  const k = keyboardEnv();
  k.state.modalOpen = true;
  k.press("g"); k.press("t");
  k.state.modalOpen = false;
  k.press("g"); k.press("t");
  assert.deepStrictEqual(k.calls.show, ["today"]);
  k.press("?");
  assert.strictEqual(k.calls.openHelp, 1);
});

console.log("\n" + passed + " passed");
