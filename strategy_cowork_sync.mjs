#!/usr/bin/env node
/**
 * strategy_cowork_sync.mjs
 *
 * FALLBACK CLI only. The dashboard's "→ Cowork" button now merges the ledger
 * directly in the browser (one click, no node) on Chromium browsers. This script
 * exists for browsers without the File System Access API (Firefox/Safari): there
 * the button downloads strategy_decisions.json, and you run this to merge it into
 * the same durable decisions ledger in the workspace:
 *
 *     F:\AI-Dev\BIMpossible_Workspace\00_Strategy\Dashboard\strategy_decisions_ledger.md
 *
 * The merge is BY ID — new decisions are appended, existing ones are updated in place,
 * and the per-row "Promoted" flag plus any rows not present in the export are preserved.
 * Nothing is ever overwritten wholesale, so the ledger is a full, git-diffable history.
 *
 * This ledger is what Claude Cowork reads as the source of truth. Promotion of approved
 * items into BIMpossible_ProgramPlan_*.md is a SEPARATE, deliberate, human-reviewed step.
 * This script never edits the ProgramPlan or data.js.
 *
 * Usage:
 *   node strategy_cowork_sync.mjs            # merge the latest export into the ledger
 *
 * Overrides (optional env vars):
 *   STRATEGY_DECISIONS=<path to json>        # default: ./strategy_decisions.json
 *   STRATEGY_LEDGER=<path to ledger.md>      # default: ../BIMpossible_Workspace/00_Strategy/Dashboard/strategy_decisions_ledger.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const DECISIONS = process.env.STRATEGY_DECISIONS || path.join(DIR, 'strategy_decisions.json');
const LEDGER = process.env.STRATEGY_LEDGER ||
  path.join(DIR, '..', 'BIMpossible_Workspace', '00_Strategy', 'Dashboard', 'strategy_decisions_ledger.md');

const COLS = ['ID', 'Title', 'Category', 'Status', 'Priority', 'Decided', 'Promoted', 'Notes'];
const HEADER = '| ' + COLS.join(' | ') + ' |';
const SEP = '|' + COLS.map(() => '---').join('|') + '|';

// ── Read the export ───────────────────────────────────────────────────────────

if (!fs.existsSync(DECISIONS)) {
  console.error('❌  No strategy_decisions.json found at:');
  console.error('    ' + DECISIONS);
  console.error('    Export from the dashboard Strategy tab first (→ Cowork button).');
  process.exit(1);
}

let raw;
try {
  raw = JSON.parse(fs.readFileSync(DECISIONS, 'utf8'));
} catch (e) {
  console.error('❌  strategy_decisions.json is not valid JSON: ' + e.message);
  process.exit(1);
}
const incoming = (raw.decisions || []).filter(d => d && d.id);
if (!incoming.length) {
  console.log('No decided items in the export — nothing to merge.');
  process.exit(0);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Collapse a value to a single, pipe-safe table cell (no truncation — history is kept).
const cell = s => String(s == null ? '' : s).replace(/\r?\n+/g, ' ').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
const priDisp = p => { p = (p || '').toLowerCase(); return p ? p.toUpperCase() : '—'; };
const today = new Date().toISOString().slice(0, 10);

// Split a markdown table row on UNescaped pipes so cells containing "\|" survive intact.
const splitRow = line => line.split(/(?<!\\)\|/).slice(1, -1).map(c => c.trim());

function ledgerTemplate(tableBlock, updatedLine) {
  return `<!-- BIMpossible strategy decisions ledger — durable record of decisions made in the
     dashboard Strategy tab. MERGE-populated by F:\\AI-Dev\\Dashboard\\strategy_cowork_sync.mjs
     from strategy_decisions.json (exported via the Strategy tab's "→ Cowork" button):
     rows are appended/updated by ID, never overwritten — history and the Promoted flag persist.
     Claude Cowork READS this as the source of truth. Promotion of approved items into
     BIMpossible_ProgramPlan_*.md is a SEPARATE, human-reviewed step — neither this script nor
     the dashboard refresh edits the ProgramPlan or data.js. The dashboard refresh may READ
     this file to display approved/research counts. -->

# BIMpossible — Strategy Decisions Ledger

${updatedLine}
**Source:** dashboard Strategy tab → strategy_decisions.json, merged by ID (append/update, never overwrite).
One row per decision. **Promoted** tracks whether an approved item has been folded into the ProgramPlan — set by hand or during a deliberate promotion pass; this script never changes it once set.

## Status legend
- \`approved\` — ratified; eligible for promotion into the ProgramPlan.
- \`researching\` — needs investigation before deciding.
- \`denied\` — rejected; kept for the audit trail, never promoted.

## Decisions

${tableBlock}
`;
}

// ── Parse any existing ledger table (preserve order + Promoted + untouched rows) ──

let existingRows = [];   // array of cell-arrays, in file order
let existingText = null;

if (fs.existsSync(LEDGER)) {
  existingText = fs.readFileSync(LEDGER, 'utf8');
  const lines = existingText.split(/\r?\n/);
  const start = lines.findIndex(l => /^\|\s*ID\s*\|/i.test(l));
  if (start >= 0) {
    for (let i = start + 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) {
      const cells = splitRow(lines[i]);
      if (cells.length >= 7 && cells[0]) existingRows.push(cells);
    }
  }
}

// ── Merge by ID ───────────────────────────────────────────────────────────────

const order = existingRows.map(r => r[0]);          // preserve existing order
const rowById = new Map(existingRows.map(r => [r[0], r]));
let added = 0, updated = 0, unchanged = 0;

for (const d of incoming) {
  const prev = rowById.get(d.id);
  const decided = d.decided_at ? String(d.decided_at).slice(0, 10) : (prev ? prev[5] : today);
  const promoted = prev ? (prev[6] || 'no') : 'no';   // never reset a Promoted flag
  const row = [d.id, cell(d.title), cell(d.cat), cell(d.status), priDisp(d.priority), decided, promoted, cell(d.body)];

  if (!prev) { added++; order.push(d.id); }
  else if (JSON.stringify(prev) === JSON.stringify(row)) { unchanged++; }
  else { updated++; }

  rowById.set(d.id, row);
}

const mergedRows = order.map(id => rowById.get(id));

// Counts for the Updated stamp (over the full merged ledger, not just this export).
const cnt = { approved: 0, researching: 0, denied: 0 };
mergedRows.forEach(r => { const s = (r[3] || '').toLowerCase(); if (s in cnt) cnt[s]++; });

const tableBlock = [HEADER, SEP, ...mergedRows.map(r => '| ' + r.join(' | ') + ' |')].join('\n');
const updatedLine = `**Updated:** ${today} (${mergedRows.length} decisions: ${cnt.approved} approved · ${cnt.researching} research · ${cnt.denied} denied)`;

// ── Write (surgical when the file exists; full template otherwise) ─────────────

let out;
if (existingText == null) {
  out = ledgerTemplate(tableBlock, updatedLine);
} else {
  const lines = existingText.split(/\r?\n/);
  const start = lines.findIndex(l => /^\|\s*ID\s*\|/i.test(l));
  if (start >= 0) {
    let end = start + 1;
    while (end + 1 < lines.length && /^\s*\|/.test(lines[end + 1])) end++;
    out = [...lines.slice(0, start), ...tableBlock.split('\n'), ...lines.slice(end + 1)].join('\n');
  } else if (/^##\s+Decisions/m.test(existingText)) {
    out = existingText.replace(/(^##\s+Decisions.*$)/m, `$1\n\n${tableBlock}`);
  } else {
    out = existingText.replace(/\s*$/, '') + `\n\n## Decisions\n\n${tableBlock}\n`;
  }
  // Refresh the Updated stamp (add one under the H1 if it was missing).
  if (/^\*\*Updated:\*\*.*$/m.test(out)) out = out.replace(/^\*\*Updated:\*\*.*$/m, updatedLine);
  else out = out.replace(/^(#\s+.*$)/m, `$1\n\n${updatedLine}`);
}

fs.mkdirSync(path.dirname(LEDGER), { recursive: true });
fs.writeFileSync(LEDGER, out);

// ── Report ─────────────────────────────────────────────────────────────────────

console.log(`✅  Ledger merged → ${LEDGER}`);
console.log(`    +${added} new · ~${updated} updated · ${unchanged} unchanged  →  ${mergedRows.length} rows total`);
console.log(`    ${cnt.approved} approved · ${cnt.researching} research · ${cnt.denied} denied`);
console.log('');
console.log('Cowork reads this ledger as the source of truth.');
console.log('Promoting approved items into the ProgramPlan is a separate, human-reviewed step.');
