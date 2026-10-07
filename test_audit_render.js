/*
 * Audit accounting RENDER tests for index.html (run: node test_audit_render.js).
 *
 * Same harness as test_disclosure.js: the real function sources are extracted from index.html
 * and executed in a vm sandbox; assertions are against the actual rendered markup.
 *
 * Contract under test (docs/COVERAGE-AND-DISCLOSURE-POLICY.md section 1):
 *   - every category is labelled: open / implemented, awaiting integration / unknown status /
 *     verified closed / carried closed (earlier baselines)
 *   - an open total of 0 never reads as a bare "All clear" while awaiting or unknown findings
 *     exist, or while ingestStatus is unverified/partial/failed
 *   - an evidence-limitation note carrying ingestDetail appears for unverified/partial/failed
 *   - trend: improving|flat|worsening|unknown; 'stable' = flat; missing = unknown (not flat);
 *     legacy "token -- note" keeps its token; anything else is "unrecognized" (never guessed,
 *     never a CSS class); audit.trendNote is escaped secondary text
 *   - open[] items may spell severity `sev` or `severity`
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
  return src.slice(i, j);
}
function extractConstLine(src, name) {
  const i = src.indexOf("const " + name + "=");
  if (i < 0) throw new Error("const not found in index.html: " + name);
  return src.slice(i, src.indexOf("\n", i));
}

const FNS = ["esc", "pathLink", "daysAgo", "sevBadge", "foldText", "revealBlock", "auditHistory",
  "auSev", "auCounts", "auTot", "auSevStr", "auTrend", "auTrendHtml", "auTrendBadge", "auAcct",
  "auQual", "auChip", "auAcctHtml", "auEvidenceNote", "auFinding", "auCleanLabel", "auditCard",
  "auditSummary", "badges", "auditView"];
const SRC = "var _ntSeq=0;var _rvSeq=0;\n" +
  extractConstLine(HTML, "SEVS") + "\n" + extractConstLine(HTML, "SEVLBL") + "\n" +
  extractConstLine(HTML, "AU_TRENDS") + "\n" + extractConstLine(HTML, "AU_LIMITED") + "\n" +
  extractConstLine(HTML, "FRESH") + "\n" +
  "const TODAY=new Date(2026,9,6);\n" +
  FNS.map(n => extractFn(HTML, n)).join("\n");

function load(projects) {
  const sandbox = {
    console,
    ICO: new Proxy({}, { get: () => '<svg class="i"></svg>' }),
    D: { projects: projects || [] },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox);
  // const-declared names live in the context's script scope, not on the global; re-export.
  vm.runInContext("this.__x={auTrend,auAcct,auditCard,auditView,badges,auditSummary,auCleanLabel,auTrendHtml}", sandbox);
  return sandbox.__x;
}
const R = load();
const plain = h => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const Z = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
const H = o => ({ ...Z, ...o });

// A card whose open total is 0 but which still owes work and has an unverified evidence base.
function qualified(extra) {
  return {
    id: "q", name: "Qualified", icon: "cube",
    audit: {
      lastRun: "2026-10-05", runType: "x", trend: "unknown", closedLastRun: 2,
      counts: H({}), open: [], rawCounts: H({ medium: 3, low: 8 }),
      awaitingIntegrationCounts: H({ medium: 1, low: 2 }), unknownCounts: H({ low: 1 }),
      unknown: [{ id: "U-1", severity: "low", title: "status undetermined" }],
      resolvedCounts: H({ low: 4 }), carriedClosedCounts: H({ medium: 5, low: 6 }),
      ingestStatus: "unverified", ingestDetail: "carried from <b>2026-09-30</b> report; repo unreadable",
      ...extra,
    },
  };
}

console.log("trend contract");
test("vocabulary tokens pass through", () => {
  for (const t of ["improving", "flat", "worsening", "unknown"]) {
    const r = R.auTrend({ trend: t });
    assert.strictEqual(r.token, t); assert.strictEqual(r.label, t);
  }
});
test("unknown renders as 'unknown', and a missing trend is unknown, not flat", () => {
  assert.strictEqual(R.auTrend({ trend: "unknown" }).label, "unknown");
  assert.strictEqual(R.auTrend({}).token, "unknown");
  assert.strictEqual(R.auTrend(undefined).token, "unknown");
});
test("'stable' is the legacy alias of flat", () => {
  assert.strictEqual(R.auTrend({ trend: "stable" }).token, "flat");
});
test("legacy 'improving -- note' keeps its token and exposes the note", () => {
  const r = R.auTrend({ trend: "improving -- 3 closed, 2 new" });
  assert.strictEqual(r.token, "improving"); assert.strictEqual(r.note, "3 closed, 2 new");
});
test("free-text trend is 'unrecognized', never guessed, never a CSS class", () => {
  const r = R.auTrend({ trend: "getting better lately" });
  assert.strictEqual(r.token, "unrecognized"); assert.strictEqual(r.label, "unrecognized");
  assert.strictEqual(r.note, "getting better lately");
  const h = R.auTrendHtml({ trend: "x\" onmouseover=\"alert(1)" });
  assert.ok(!/onmouseover="/.test(h), h);
  assert.ok(/class="trend unrecognized"/.test(h), h);
});
test("trendNote is secondary text, escaped, as tooltip and short suffix", () => {
  const h = R.auTrendHtml({ trend: "flat", trendNote: "<img src=x onerror=1> & \"q\"" });
  assert.ok(/class="trend flat"/.test(h), h);
  assert.ok(h.includes("&lt;img src=x onerror=1&gt; &amp; &quot;q&quot;"), h);
  assert.ok(!h.includes("<img"), h);
  assert.ok(/title="[^"]*&lt;img/.test(h), "tooltip carries the note");
  assert.ok(/class="trend-note"/.test(h), "dim suffix");
});
test("a long trendNote is shortened in the suffix but whole in the tooltip", () => {
  const note = ("narrative " ).repeat(40).trim();
  const h = R.auTrendHtml({ trend: "improving", trendNote: note });
  assert.ok(h.includes(note), "full note in title");
  const suffix = h.match(/<span class="trend-note"[^>]*>([^<]*)<\/span>/)[1];
  assert.ok(suffix.length < note.length && suffix.endsWith("…"), suffix);
});
test("trendNote wins over a legacy tail; no note means no suffix", () => {
  assert.strictEqual(R.auTrend({ trend: "flat -- old", trendNote: "new" }).note, "new");
  assert.ok(!R.auTrendHtml({ trend: "flat" }).includes("trend-note"));
});

console.log("audit card accounting");
test("every category is labelled", () => {
  const t = plain(R.auditCard(qualified()));
  for (const l of ["open", "implemented, awaiting integration", "unknown status", "verified closed",
    "carried closed (earlier baselines)"]) assert.ok(t.includes(l), "missing label: " + l);
});
test("category numbers match the data", () => {
  const h = R.auditCard(qualified());
  const chip = l => (h.match(new RegExp('<b>(\\d+)</b> ' + l.replace(/[()]/g, "\\$&")))||[])[1];
  assert.strictEqual(chip("open"), "0");
  assert.strictEqual(chip("implemented, awaiting integration"), "3");
  assert.strictEqual(chip("unknown status"), "1");
  assert.strictEqual(chip("verified closed"), "4");
  assert.strictEqual(chip("carried closed (earlier baselines)"), "11");
  assert.ok(plain(h).includes("11 findings in the report"), "raw total");
});
test("open 0 with awaiting/unknown never says all clear; qualifier names the rest", () => {
  const t = plain(R.auditCard(qualified()));
  assert.ok(!/all clear/i.test(t), t);
  assert.ok(t.includes("0 open + 3 implemented, awaiting integration + 1 unknown"), t);
  assert.ok(t.includes("neither is closed"), t);
});
test("unknown items are listed and marked not counted as open", () => {
  const t = plain(R.auditCard(qualified()));
  assert.ok(t.includes("U-1") && t.includes("status undetermined"), t);
  assert.ok(t.includes("not counted as open"), t);
});
test("unverified evidence note shows ingestDetail, escaped", () => {
  const h = R.auditCard(qualified());
  assert.ok(h.includes('role="note"'), "note present");
  assert.ok(plain(h).includes("Evidence not verified"), plain(h));
  assert.ok(h.includes("carried from &lt;b&gt;2026-09-30&lt;/b&gt; report; repo unreadable"), h);
  assert.ok(!h.includes("<b>2026-09-30</b>"), "ingestDetail must be escaped");
});
test("partial and failed also raise the note; success does not", () => {
  const clean = { open: [], counts: H({}), rawCounts: H({}), lastRun: "2026-10-05", trend: "flat" };
  for (const [st, lbl] of [["partial", "Evidence partial"], ["failed", "Reconciliation failed"]]) {
    const t = plain(R.auditCard({ id: "z", name: "Z", audit: { ...clean, ingestStatus: st, ingestDetail: "d-" + st } }));
    assert.ok(t.includes(lbl) && t.includes("d-" + st), st + ": " + t);
    assert.ok(!/all clear/i.test(t), st + " must not read as all clear: " + t);
  }
  const ok = R.auditCard({ id: "z", name: "Z", audit: { ...clean, ingestStatus: "success", ingestDetail: "fine" } });
  assert.ok(!ok.includes('role="note"'), "success shows no limitation note");
  assert.ok(/all clear/i.test(plain(ok)), "verified clean card keeps its all-clear");
});
test("limited evidence with no ingestDetail still explains itself", () => {
  const h = R.auditCard(qualified({ ingestDetail: "" }));
  assert.ok(plain(h).includes("not re-verified"), plain(h));
});
test("closedLastRun is flagged as carried when evidence is unverified", () => {
  assert.ok(plain(R.auditCard(qualified())).includes("closed last run (carried from an unverified record)"));
});
test("legacy card without any accounting fields renders as before", () => {
  const legacy = { id: "l", name: "L", audit: { lastRun: "2026-09-01", counts: H({ high: 1 }),
    open: [{ id: "A-1", sev: "high", title: "t", where: "f.py" }], trend: "flat -- same", closedLastRun: 0 } };
  const h = R.auditCard(legacy), t = plain(h);
  assert.ok(t.includes("Open findings") && t.includes("A-1") && t.includes("High"), t);
  assert.ok(!h.includes('role="note"') && !h.includes("au-acct"), "no accounting block invented");
  assert.ok(/class="trend flat"/.test(h));
});
test("open[] items spelled `severity` get a real badge, not 'undefined'", () => {
  const h = R.auditCard({ id: "s", name: "S", audit: { lastRun: "d", counts: H({ high: 1 }), trend: "flat",
    open: [{ id: "X-1", severity: "high", title: "t" }] } });
  assert.ok(h.includes('class="sev sev-high"'), h);
  assert.ok(!/undefined/.test(h), h);
});

console.log("summary surfaces");
test("auditSummary exposes pending and limited", () => {
  const s = R.auditSummary(qualified());
  assert.strictEqual(s.total, 0); assert.strictEqual(s.pending, 4);
  assert.strictEqual(s.limited, true);
});
test("badge never says 'Audit clear' when work is owed", () => {
  const b = R.badges(qualified());
  assert.ok(!b.includes("Audit clear"), b);
  assert.ok(b.includes("3 awaiting integration") && b.includes("1 unknown"), b);
  assert.ok(b.includes("Audit unverified"), b);
});
test("badge keeps 'Audit clear' for a verified clean card; open>0 mentions pending", () => {
  const clean = { id: "c", name: "C", audit: { lastRun: "d", counts: H({}), open: [], trend: "flat" } };
  assert.ok(R.badges(clean).includes("Audit clear"));
  const busy = qualified({ counts: H({ low: 2 }) });
  const b = R.badges(busy);
  assert.ok(b.includes("2 open findings + 3 awaiting integration"), b);
});
test("auCleanLabel qualifies zero-open states", () => {
  assert.strictEqual(R.auCleanLabel(R.auAcct({ counts: H({}), open: [] })).text, "✓ All clear");
  assert.ok(R.auCleanLabel(R.auAcct(qualified().audit)).text.startsWith("No open · 3 awaiting integration · 1 unknown"));
  assert.ok(/evidence partial/.test(R.auCleanLabel(R.auAcct({ counts: H({}), ingestStatus: "partial" })).text));
});

console.log("audit view");
test("zero-open portfolio with owed work is not announced as all clear", () => {
  const V = load([qualified(), { id: "c", name: "Clean", icon: "cube",
    audit: { lastRun: "2026-10-05", counts: H({}), open: [], trend: "flat" } }]);
  const t = plain(V.auditView());
  assert.ok(!t.includes("All clear — no open findings"), t);
  assert.ok(t.includes("not a verified all-clear"), t);
  assert.ok(t.includes("Not counted as open"), t);
  assert.ok(t.includes("Evidence not verified"), t);
  assert.ok(t.includes("implemented, awaiting integration"), t);
});
test("fully verified portfolio keeps its all-clear", () => {
  const V = load([{ id: "c", name: "Clean", icon: "cube",
    audit: { lastRun: "2026-10-05", counts: H({}), open: [], trend: "flat", ingestStatus: "success" } }]);
  const t = plain(V.auditView());
  assert.ok(t.includes("All clear — no open findings across 1 audited projects"), t);
  assert.ok(!t.includes("Not counted as open"), t);
});
test("audit view escapes trendNote and ingestDetail", () => {
  const V = load([qualified({ trendNote: "<script>alert(1)</script>" })]);
  const h = V.auditView();
  assert.ok(!h.includes("<script>"), "trendNote must be escaped");
  assert.ok(!h.includes("<b>2026-09-30</b>"), "ingestDetail must be escaped");
});
test("audit view lists severity-spelled open items with real badges", () => {
  const V = load([{ id: "s", name: "S", icon: "cube", audit: { lastRun: "2026-10-05", counts: H({ high: 1 }),
    open: [{ id: "X-1", severity: "high", title: "t" }], trend: "worsening" } }]);
  const h = V.auditView();
  assert.ok(h.includes('class="sev sev-high"') && !/undefined/.test(h), h);
  assert.ok(plain(h).includes("Open — no fix implemented"), plain(h));
});

console.log(`\n${passed} passed`);
