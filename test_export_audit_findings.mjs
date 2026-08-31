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
