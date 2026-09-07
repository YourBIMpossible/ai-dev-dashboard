/*
 * Deterministic tests for the daily check-in consolidation (run: node
 * test_checkin_consolidation.js — no test runner).
 *
 * Like test_renderer.js, these extract the ACTUAL pure functions out of
 * index.html (pickInitialView, deskItemKey, deskDeltaKeys, deskBaseline) and
 * execute them in a vm sandbox — no logic is re-copied here. They lock:
 *   Outcome 1 — landing: deep-link wins, same-session/same-day restores,
 *               a stale historical tab or a fresh visit lands on Today.
 *   Outcome 2 — delta: item identity keys, the new-vs-backlog split, and the
 *               header/"N new" count reconciliation (new + backlog === ripe).
 */
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const HTML = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("  ok - " + name); }

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

const FNS = ["pickInitialView", "deskItemKey", "deskDeltaKeys", "deskBaseline"];
const sandbox = {};
sandbox.window = sandbox;
sandbox.console = console;
vm.createContext(sandbox);
vm.runInContext(FNS.map(n => extractFn(HTML, n)).join("\n"), sandbox,
  { filename: "index.html:checkin" });
const { pickInitialView, deskItemKey, deskDeltaKeys, deskBaseline } = sandbox;

const VALID = ["today", "overview", "audit", "usage", "bimpossible"];

// ── Outcome 1: pickInitialView ──────────────────────────────────────────────
test("fresh visit (no hash, no session) lands on Today", () => {
  const r = pickInitialView({ hash: "", sessionTab: null, sessionSameDay: false, validIds: VALID });
  assert.strictEqual(r.view, "today");
  assert.strictEqual(r.src, "default");
});

test("a stored historical tab does NOT bypass Today (session not same-day)", () => {
  // localStorage 'dash.tab' is retired; only a same-DAY session tab restores.
  const r = pickInitialView({ hash: "", sessionTab: "usage", sessionSameDay: false, validIds: VALID });
  assert.strictEqual(r.view, "today");
});

test("same-session, same-day tab is restored", () => {
  const r = pickInitialView({ hash: "", sessionTab: "usage", sessionSameDay: true, validIds: VALID });
  assert.strictEqual(r.view, "usage");
  assert.strictEqual(r.src, "session");
});

test("an explicit deep link wins over a restored session tab", () => {
  const r = pickInitialView({ hash: "#audit", sessionTab: "usage", sessionSameDay: true, validIds: VALID });
  assert.strictEqual(r.view, "audit");
  assert.strictEqual(r.src, "deep-link");
});

test("a deep link to a project id works", () => {
  const r = pickInitialView({ hash: "#bimpossible", sessionTab: null, sessionSameDay: false, validIds: VALID });
  assert.strictEqual(r.view, "bimpossible");
});

test("an invalid hash falls through to session / default", () => {
  assert.strictEqual(pickInitialView({ hash: "#bogus", sessionTab: null, sessionSameDay: false, validIds: VALID }).view, "today");
  assert.strictEqual(pickInitialView({ hash: "#bogus", sessionTab: "usage", sessionSameDay: true, validIds: VALID }).view, "usage");
});

test("hash is case-insensitive and #-tolerant", () => {
  assert.strictEqual(pickInitialView({ hash: "#AUDIT", sessionTab: null, sessionSameDay: false, validIds: VALID }).view, "audit");
  assert.strictEqual(pickInitialView({ hash: "audit", sessionTab: null, sessionSameDay: false, validIds: VALID }).view, "audit");
});

// ── Outcome 2: delta keys + baseline ────────────────────────────────────────
test("deskItemKey is stable across whitespace/case, distinct across kind/project/text", () => {
  const a = deskItemKey({ pid: "x", kind: "blocker", text: "  Merge   OR close  " });
  const b = deskItemKey({ pid: "x", kind: "blocker", text: "merge or close" });
  assert.strictEqual(a, b);
  assert.notStrictEqual(a, deskItemKey({ pid: "y", kind: "blocker", text: "merge or close" }));
  assert.notStrictEqual(a, deskItemKey({ pid: "x", kind: "decision", text: "merge or close" }));
});

test("deskDeltaKeys returns only keys absent from the compare set", () => {
  assert.deepStrictEqual(deskDeltaKeys(["a", "b", "c"], ["a"]), ["b", "c"]);
  assert.deepStrictEqual(deskDeltaKeys(["a", "b"], ["a", "b"]), []);
  assert.deepStrictEqual(deskDeltaKeys(["a"], []), ["a"]);
});

test("first-ever visit (no prior baseline) marks nothing new", () => {
  const bl = deskBaseline(["a", "b"], null, "2026-09-06");
  assert.deepStrictEqual(bl.newKeys, []);
  assert.strictEqual(bl.store.day, "2026-09-06");
  assert.deepStrictEqual(bl.store.keys, ["a", "b"]);
  assert.deepStrictEqual(bl.store.compareKeys, ["a", "b"]); // first visit: everything is baseline
});

test("new check-in day: yesterday's desk is the comparison; additions are new", () => {
  const prev = { day: "2026-09-05", keys: ["a", "b"], compareKeys: ["a"] };
  const bl = deskBaseline(["a", "b", "c"], prev, "2026-09-06");
  assert.deepStrictEqual(bl.newKeys, ["c"]);            // only c is new vs yesterday's keys
  assert.strictEqual(bl.store.day, "2026-09-06");
  assert.deepStrictEqual(bl.store.compareKeys, ["a", "b"]); // baseline advanced to yesterday's desk
});

test("same day: comparison stays frozen across re-renders (markers don't clear)", () => {
  const prev = { day: "2026-09-06", keys: ["a", "b", "c"], compareKeys: ["a", "b"] };
  const bl = deskBaseline(["a", "b", "c"], prev, "2026-09-06");
  assert.deepStrictEqual(bl.newKeys, ["c"]);            // c still reads new all day
  assert.deepStrictEqual(bl.store.compareKeys, ["a", "b"]);
});

test("count reconciliation: new + backlog === all ripe", () => {
  const ripe = [
    { pid: "p1", kind: "blocker", text: "old one" },
    { pid: "p1", kind: "decision", text: "brand new" },
    { pid: "p2", kind: "blocker", text: "also old" },
  ];
  const curKeys = ripe.map(deskItemKey);
  const prev = { day: "2026-09-05", keys: [deskItemKey(ripe[0]), deskItemKey(ripe[2])], compareKeys: [] };
  const bl = deskBaseline(curKeys, prev, "2026-09-06");
  const newSet = new Set(bl.newKeys);
  const fresh = ripe.filter(d => newSet.has(deskItemKey(d)));
  const backlog = ripe.filter(d => !newSet.has(deskItemKey(d)));
  assert.strictEqual(fresh.length, 1);
  assert.strictEqual(fresh[0].text, "brand new");
  assert.strictEqual(fresh.length + backlog.length, ripe.length); // nothing dropped
});

console.log("\n" + passed + " checkin-consolidation tests passed.");
