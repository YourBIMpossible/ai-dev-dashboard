// Tests for export-audit-findings.js.
//
// The regressions that matter (2026-08-31 slop audit):
//   MEDIUM-2  a missing/unparseable audit-freshness.js fell back to an empty
//             project map, and the report then claimed "All cards in sync with
//             disk" and exited 0. A required input that did not load must never
//             render as an all-clear.
//   LOW-2     rendered totals came from each card's DECLARED `counts` while the
//             open total came from the canonical `open` array, and cards with no
//             `audit` block vanished from the report with no coverage line.
//
// Fixtures are written under os.tmpdir() and read via --data-dir, so no fixture
// ever lands in the repo and the live data.js/audit-freshness.js are untouched.
//
// Run: node test_export_audit_findings.mjs

import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.join(HERE, "export-audit-findings.js");

let seq = 0;
function fixture({ data, freshness }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `export-audit-fixture-${seq++}-`));
  if (data !== undefined) {
    fs.writeFileSync(path.join(dir, "data.js"), `window.DASHBOARD_DATA = ${data};\n`, "utf8");
  }
  if (freshness !== undefined) {
    fs.writeFileSync(path.join(dir, "audit-freshness.js"), freshness, "utf8");
  }
  return dir;
}

function run(dir, extraArgs = []) {
  const out = path.join(dir, "report.md");
  const r = spawnSync(process.execPath, [SCRIPT, "--data-dir", dir, "--out", out, ...extraArgs], {
    encoding: "utf8",
  });
  return {
    code: r.status,
    stdout: r.stdout || "",
    stderr: r.stderr || "",
    reportPath: out,
    report: fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null,
  };
}

const HEALTHY_DATA = JSON.stringify({
  projects: [
    {
      id: "alpha",
      name: "Alpha",
      audit: {
        lastRun: "2026-08-20",
        counts: { critical: 0, high: 1, medium: 1, low: 0, info: 0 },
        closedLastRun: 3,
        open: [
          { id: "A-1", sev: "high", title: "thing one", where: "a.js:1" },
          { id: "A-2", sev: "medium", title: "thing two", where: "a.js:2" },
        ],
      },
    },
  ],
});
const HEALTHY_FRESH = `window.AUDIT_FRESHNESS = ${JSON.stringify({
  checked: "2026-08-30 18:00:00",
  projects: { alpha: { name: "Alpha", lastRun: "2026-08-20", newestOnDisk: "2026-08-20", stale: false, action: null } },
})};\n`;

// ---------------------------------------------------------------- required inputs

test("missing audit-freshness.js exits 2 and writes no report", () => {
  const r = run(fixture({ data: HEALTHY_DATA }));
  assert.equal(r.code, 2);
  assert.match(r.stderr, /STALENESS UNKNOWN/);
  assert.equal(r.report, null, "no report file may be produced");
  assert.doesNotMatch(r.stdout, /in sync with disk/i);
});

test("unparseable audit-freshness.js exits 2", () => {
  const r = run(fixture({ data: HEALTHY_DATA, freshness: "window.AUDIT_FRESHNESS = {oops" }));
  assert.equal(r.code, 2);
  assert.match(r.stderr, /STALENESS UNKNOWN/);
  assert.equal(r.report, null);
});

test("audit-freshness.js without a projects object exits 2", () => {
  const r = run(fixture({ data: HEALTHY_DATA, freshness: "window.AUDIT_FRESHNESS = { checked: '2026-08-30' };\n" }));
  assert.equal(r.code, 2);
  assert.match(r.stderr, /STALENESS UNKNOWN/);
  assert.equal(r.report, null);
});

test("missing data.js exits 1", () => {
  const r = run(fixture({ freshness: HEALTHY_FRESH }));
  assert.equal(r.code, 1);
  assert.match(r.stderr, /DASHBOARD_DATA/);
  assert.equal(r.report, null);
});

test("healthy inputs still produce a report and exit 0", () => {
  const r = run(fixture({ data: HEALTHY_DATA, freshness: HEALTHY_FRESH }));
  assert.equal(r.code, 0);
  assert.ok(r.report, "report is written");
  assert.match(r.report, /2 findings open/);
  assert.match(r.stdout, /in sync/i);
});

// ------------------------------------------------------------ counting integrity

test("totals come from open[], not from the declared counts block", () => {
  // Declared counts claim 5 High; the canonical open[] holds one High and one
  // Medium. The report must show what is actually open and say so.
  const data = JSON.stringify({
    projects: [
      {
        id: "alpha",
        name: "Alpha",
        audit: {
          lastRun: "2026-08-20",
          counts: { critical: 0, high: 5, medium: 0, low: 0, info: 0 },
          closedLastRun: 0,
          open: [
            { id: "A-1", sev: "high", title: "one", where: "a.js:1" },
            { id: "A-2", sev: "medium", title: "two", where: "a.js:2" },
          ],
        },
      },
    ],
  });
  const r = run(fixture({ data, freshness: HEALTHY_FRESH }));
  assert.equal(r.code, 0);
  assert.match(r.report, /2 findings open/);
  assert.match(r.report, /1 Critical|0 Critical/);
  assert.match(r.report, /1 High/, "derived High count, not the declared 5");
  assert.doesNotMatch(r.report, /5 High/);
  assert.match(r.report, /Declared counts disagree/);
  assert.match(r.stdout, /declared counts disagree/i);
  const json = JSON.parse(
    spawnSync(process.execPath, [SCRIPT, "--data-dir", path.dirname(r.reportPath), "--json"], { encoding: "utf8" }).stdout
  );
  assert.equal(json.totals.high, 1);
  assert.equal(json.totals.open, 2);
  assert.equal(json.countMismatch.length, 1);
});

test("an unknown severity is counted as unclassified, never dropped", () => {
  const data = JSON.stringify({
    projects: [
      {
        id: "alpha",
        name: "Alpha",
        audit: {
          lastRun: "2026-08-20",
          counts: {},
          open: [
            { id: "A-1", sev: "catastrophic", title: "off-scale", where: "a.js:1" },
            { id: "A-2", sev: null, title: "no severity at all", where: "a.js:2" },
          ],
        },
      },
    ],
  });
  const r = run(fixture({ data, freshness: HEALTHY_FRESH }));
  assert.equal(r.code, 0);
  assert.match(r.report, /2 findings open/);
  assert.match(r.report, /2 unclassified severity/);
  assert.match(r.report, /raw: catastrophic/, "the raw value is shown, not swallowed");
  assert.match(r.stdout, /2 unclassified/);
});

// ---------------------------------------------------------------- coverage

test("a card with no audit block is named, not silently skipped", () => {
  const data = JSON.stringify({
    projects: [
      JSON.parse(HEALTHY_DATA).projects[0],
      { id: "beta", name: "Beta" }, // no audit block at all
    ],
  });
  const r = run(fixture({ data, freshness: HEALTHY_FRESH }));
  assert.equal(r.code, 0);
  assert.match(r.report, /Audit coverage: 1 of 2 project cards contain audit data; 1 have no audit block\./);
  assert.match(r.report, /carry no audit data at all/);
  assert.match(r.report, /Beta/, "the unmeasured card is named in the report");
  assert.match(r.stdout, /Audit coverage: 1 of 2 project cards contain audit data; 1 have no audit block\./);
  assert.match(r.stdout, /unmeasured \(no audit block\): Beta/);
});

test("a card absent from audit-freshness.js is unknown, not in sync", () => {
  const data = JSON.stringify({
    projects: [
      JSON.parse(HEALTHY_DATA).projects[0],
      { id: "beta", name: "Beta", audit: { lastRun: "2026-08-01", counts: {}, open: [] } },
    ],
  });
  const r = run(fixture({ data, freshness: HEALTHY_FRESH })); // freshness knows only alpha
  assert.equal(r.code, 0);
  assert.match(r.report, /Sync state UNKNOWN for 1 card\(s\)/);
  assert.doesNotMatch(r.report, /All cards with audit data are in sync/);
  assert.doesNotMatch(r.stdout, /All cards with audit data in sync/);
  assert.match(r.stdout, /sync state unknown: Beta/);
});

test("normal valid data reports full coverage and an all-clear", () => {
  const r = run(fixture({ data: HEALTHY_DATA, freshness: HEALTHY_FRESH }));
  assert.equal(r.code, 0);
  assert.match(r.report, /Audit coverage: 1 of 1 project cards contain audit data; 0 have no audit block\./);
  assert.match(r.report, /All cards with audit data are in sync with the newest report on disk\./);
  assert.doesNotMatch(r.report, /Declared counts disagree/);
  assert.doesNotMatch(r.report, /unclassified severity/);
  assert.match(r.stdout, /All cards with audit data in sync with disk\./);
});

// ---------------------------------------------------------------- accounting categories
//
// The export must not present "open" as the whole unresolved obligation: awaiting-integration
// and unknown findings, verified/carried closures and the ingest evidence limitation all have
// to survive into the report and the --json output.

function freshFor(ids) {
  const projects = {};
  for (const id of ids) projects[id] = { name: id, lastRun: "2026-08-20", newestOnDisk: "2026-08-20", stale: false, action: null };
  return `window.AUDIT_FRESHNESS = ${JSON.stringify({ checked: "2026-08-30 18:00:00", projects })};\n`;
}

const zero = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
function card(id, audit) {
  return { id, name: id.toUpperCase(), audit: { lastRun: "2026-08-20", closedLastRun: 2, ...audit } };
}
function runJson(dir) {
  const r = spawnSync(process.execPath, [SCRIPT, "--data-dir", dir, "--json"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  return JSON.parse(r.stdout);
}
function runCards(cards) {
  return fixture({ data: JSON.stringify({ projects: cards }), freshness: freshFor(cards.map((c) => c.id)) });
}

const FULL = card("full", {
  counts: { ...zero, high: 1 },
  open: [{ id: "F-1", sev: "high", title: "still open", where: "f.js:1" }],
  awaitingIntegrationCounts: { ...zero, medium: 2, low: 1 },
  unknownCounts: { ...zero, low: 1 },
  unknown: [{ id: "F-9", sev: "low", title: "cannot tell", where: "f.js:9" }],
  resolvedCounts: { ...zero, high: 2 },
  carriedClosedCounts: { ...zero, low: 4 },
  rawCounts: { ...zero, high: 3, medium: 2, low: 2 },
  ingestStatus: "partial",
  ingestDetail: "only 3 of 5 reports | readable\nsecond line",
  trend: "improving",
  trendNote: "down from 9",
});

test("every accounting category and the ingest evidence reach the markdown", () => {
  const r = run(runCards([FULL]));
  assert.equal(r.code, 0);
  assert.match(r.report, /\*\*Accounting\*\* — 1 open .* · 3 implemented, awaiting integration · 1 unknown status · 2 verified closed on the canonical branch · 4 carried closed/);
  assert.match(r.report, /\| Awaiting integration \| Unknown \| Verified closed \| Carried closed \|/);
  assert.match(r.report, /\| FULL \|.*\| 1 \| 3 \| 1 \| 2 \| 4 \| 2 \| .*partial \|/);
  assert.match(r.report, /Unknown status \(not counted as open\)/);
  assert.match(r.report, /F-9/);
  assert.match(r.report, /trend: improving \(down from 9\)/);
});

test("labels: open is qualified as not the unresolved total, with the unresolved sum", () => {
  const r = run(runCards([FULL]));
  assert.match(r.report, /1 open is not the unresolved total/);
  assert.match(r.report, /Unresolved = 5 /); // 1 open + 3 awaiting + 1 unknown
  assert.match(r.report, /3 implemented, awaiting integration \(fix not on the canonical branch\)/);
  assert.match(r.report, /carried closed from earlier baselines \(outside this arithmetic; not part of the cycle figure\)/);
});

test("carried closed is reported separately and never added to the cycle figure", () => {
  const j = runJson(runCards([FULL]));
  assert.equal(j.accounting.carriedClosed, 4);
  assert.equal(j.projects[0].closedLastRun, 2, "cycle figure is the declared closedLastRun, untouched");
  assert.equal(j.accounting.unresolved, j.accounting.open + j.accounting.awaitingIntegration + j.accounting.unknown);
});

test("ingestDetail is shown on a limited card with table pipes and newlines escaped", () => {
  const r = run(runCards([FULL]));
  assert.match(r.report, /Evidence limitation on 1 card/);
  assert.match(r.report, /ingest status `partial` \(evidence partial\) — only 3 of 5 reports/);
  assert.doesNotMatch(r.report, /reports \| readable/, "raw pipe would break a markdown table");
  assert.doesNotMatch(r.report, /readable\nsecond line/, "raw newline would split the note");
});

test("--json carries categories, ingest evidence and per-project accounting", () => {
  const j = runJson(runCards([FULL]));
  assert.deepEqual(
    { o: j.accounting.open, a: j.accounting.awaitingIntegration, u: j.accounting.unknown, v: j.accounting.verifiedClosed },
    { o: 1, a: 3, u: 1, v: 2 },
  );
  assert.equal(j.accounting.limitedEvidence[0].ingestStatus, "partial");
  const p = j.projects[0];
  assert.equal(p.ingestStatus, "partial");
  assert.match(p.ingestDetail, /only 3 of 5/);
  assert.equal(p.accounting.awaiting, 3);
  assert.equal(p.accounting.awaitingCounts.medium, 2);
  assert.equal(p.unknown[0].id, "F-9");
  assert.equal(p.trendNote, "down from 9");
});

test("arithmetic: rawCounts that do not equal the categories are flagged", () => {
  const bad = card("bad", {
    counts: { ...zero, high: 1 },
    open: [{ id: "B-1", sev: "high", title: "x", where: "b" }],
    awaitingIntegrationCounts: zero, unknownCounts: zero, resolvedCounts: zero,
    rawCounts: { ...zero, high: 4 }, // 1 open != 4 raw
    ingestStatus: "success",
  });
  const dir = runCards([bad]);
  const r = run(dir);
  assert.match(r.report, /Accounting does not add up/);
  assert.match(r.report, /high: raw 4, categories 1/);
  assert.equal(runJson(dir).accounting.partitionMismatch.length, 1);
  const good = run(runCards([FULL]));
  assert.doesNotMatch(good.report, /does not add up/);
});

// ---------------------------------------------------------------- sev / severity spelling

test("open[] items spelled `severity` are classified, not unclassified", () => {
  const c = card("spell", {
    counts: { ...zero, high: 1, low: 1 },
    open: [
      { id: "S-1", severity: "high", title: "data.js spelling", where: "s:1" },
      { id: "S-2", sev: "low", title: "reconciler spelling", where: "s:2" },
    ],
  });
  const dir = runCards([c]);
  const r = run(dir);
  assert.doesNotMatch(r.report, /unclassified severity/);
  assert.doesNotMatch(r.report, /Declared counts disagree/);
  assert.match(r.report, /2 findings open/);
  assert.match(r.report, /1 High/);
  const j = runJson(dir);
  assert.equal(j.projects[0].open.find((f) => f.id === "S-1").sev, "high");
  assert.equal(j.projects[0].counts.unknown, 0);
});

test("a genuinely unknown `severity` value is still surfaced as unclassified", () => {
  const c = card("odd", {
    counts: zero,
    open: [{ id: "O-1", severity: "catastrophic", title: "x", where: "o" }],
  });
  const r = run(runCards([c]));
  assert.match(r.report, /1 unclassified severity/);
  assert.match(r.report, /raw: catastrophic/);
});

// ---------------------------------------------------------------- legacy / missing data

const LEGACY = card("legacy", { counts: zero, open: [], closedLastRun: 5 });

test("a legacy card without category fields is 'not recorded', never an implied zero", () => {
  const dir = runCards([LEGACY]);
  const r = run(dir);
  assert.equal(r.code, 0);
  assert.match(r.report, /Accounting categories not recorded for 1 card/);
  assert.match(r.report, /\| LEGACY \|.*\| 0 \| — \| — \| — \| — \| 5 \| — \|/);
  assert.match(r.report, /this is NOT an all-clear/);
  assert.doesNotMatch(r.report, /No open findings on any of the 1 card\(s\) that carry audit data\._/);
  const j = runJson(dir);
  assert.equal(j.accounting.notRecorded[0].id, "legacy");
  assert.equal(j.projects[0].accounting.awaiting, null);
  assert.equal(j.projects[0].accounting.missing, true);
});

test("open 0 with awaiting-integration work is not presented as an all-clear", () => {
  const c = card("wait", {
    counts: zero, open: [],
    awaitingIntegrationCounts: { ...zero, high: 2 },
    unknownCounts: zero, resolvedCounts: zero,
    rawCounts: { ...zero, high: 2 },
    ingestStatus: "success",
  });
  const r = run(runCards([c]));
  assert.match(r.report, /0 open is not the unresolved total/);
  assert.match(r.report, /Unresolved = 2 /);
  assert.match(r.report, /this is NOT an all-clear/);
});

test("open 0 with unknown-status findings is not presented as an all-clear", () => {
  const c = card("unk", {
    counts: zero, open: [],
    awaitingIntegrationCounts: zero, resolvedCounts: zero,
    unknownCounts: { ...zero, medium: 1 },
    unknown: [{ id: "U-1", severity: "medium", title: "?", where: "u" }],
    rawCounts: { ...zero, medium: 1 },
    ingestStatus: "success",
  });
  const r = run(runCards([c]));
  assert.match(r.report, /0 open is not the unresolved total/);
  assert.match(r.report, /1 unknown status/);
  assert.match(r.report, /this is NOT an all-clear/);
});

test("a fully recorded, fully clean card keeps the plain all-clear", () => {
  const c = card("clean", {
    counts: zero, open: [],
    awaitingIntegrationCounts: zero, unknownCounts: zero, resolvedCounts: { ...zero, low: 3 },
    rawCounts: { ...zero, low: 3 },
    ingestStatus: "success",
  });
  const r = run(runCards([c]));
  assert.doesNotMatch(r.report, /not the unresolved total/);
  assert.doesNotMatch(r.report, /NOT an all-clear/);
  assert.match(r.report, /No open findings on any of the 1 card\(s\) that carry audit data\._/);
});

test("the console summary states the accounting and warns when pending work exists", () => {
  const r = run(runCards([FULL]));
  assert.match(r.stdout, /Accounting: 1 open \/ 3 awaiting integration \/ 1 unknown \/ 2 verified closed \/ 4 carried closed\./);
  assert.match(r.stdout, /1 open is not the unresolved total/);
  assert.match(r.stdout, /evidence limited on 1 card\(s\)/);
});
