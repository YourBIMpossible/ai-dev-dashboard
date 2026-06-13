#!/usr/bin/env node
/**
 * strategy_cowork_sync.mjs
 *
 * Reads strategy_decisions.json (exported from the Strategy tab) and:
 *   1. Generates strategy_cowork_brief.md — a structured brief for Claude Cowork
 *   2. --trigger: spawns `claude -p` to process the decisions into data.js
 *
 * Usage:
 *   node strategy_cowork_sync.mjs              # generate brief only
 *   node strategy_cowork_sync.mjs --trigger    # brief + run Claude Cowork
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const DECISIONS = path.join(DIR, 'strategy_decisions.json');
const BRIEF     = path.join(DIR, 'strategy_cowork_brief.md');
const DATA      = path.join(DIR, 'data.js');

// ── Read decisions ────────────────────────────────────────────────────────────

if (!fs.existsSync(DECISIONS)) {
  console.error('❌  No strategy_decisions.json found.');
  console.error('    Export from the Strategy tab first (→ Cowork button).');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(DECISIONS, 'utf8'));
const all = raw.decisions || [];

const approved   = all.filter(d => d.status === 'approved');
const researching = all.filter(d => d.status === 'researching');
const denied     = all.filter(d => d.status === 'denied');

if (!all.length) {
  console.log('No decisions in file — nothing to do.');
  process.exit(0);
}

// ── Build brief ───────────────────────────────────────────────────────────────

const lines = [
  '# Strategy Decisions — Cowork Brief',
  '',
  `**Generated:** ${new Date().toISOString()}`,
  `**Source:** ${raw.project || 'BIMpossible Platform'} Strategy Dashboard`,
  `**Totals:** ${approved.length} approved · ${researching.length} research · ${denied.length} denied`,
  '',
];

if (approved.length) {
  lines.push('## ✅ Approved — add to product plan');
  lines.push('');
  approved.forEach(d => {
    const pri = d.priority ? ` [${d.priority.toUpperCase()}]` : '';
    lines.push(`### ${d.title}${pri}`);
    lines.push(`- ID: \`${d.id}\` | Category: \`${d.cat}\``);
    if (d.decided_at) lines.push(`- Decided: ${d.decided_at.slice(0, 10)}`);
    if (d.body) lines.push(`- ${d.body}`);
    lines.push('');
  });
}

if (researching.length) {
  lines.push('## 🔍 Research needed — flag as pending decisions');
  lines.push('');
  researching.forEach(d => {
    lines.push(`### ${d.title}`);
    lines.push(`- ID: \`${d.id}\` | Category: \`${d.cat}\``);
    if (d.body) lines.push(`- ${d.body}`);
    lines.push('');
  });
}

if (denied.length) {
  lines.push('## ❌ Denied — log only, no action');
  lines.push('');
  denied.forEach(d => lines.push(`- ${d.title} (\`${d.id}\`)`));
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push('## Instructions for Claude Cowork');
lines.push('');
lines.push(`Read \`data.js\` to understand the current project structure, then:`);
lines.push('');
lines.push('- **Approved** → add as `nextActions` entries or phase tasks in the relevant project');
lines.push('- **Research** → add as `pendingDecisions` strings in the relevant project');
lines.push('- **Denied** → no changes needed; this brief is the audit trail');
lines.push('');
lines.push('Keep edits minimal — add only the new items, do not restructure existing data.');
lines.push('If unsure which project an item belongs to, default to the BIMpossible Platform project.');

const brief = lines.join('\n');
fs.writeFileSync(BRIEF, brief);

console.log(`✅  Brief written → ${path.basename(BRIEF)}`);
console.log(`    ✅ ${approved.length} approved  🔍 ${researching.length} research  ❌ ${denied.length} denied`);

// ── Optionally trigger Claude Cowork ─────────────────────────────────────────

if (!process.argv.includes('--trigger')) {
  console.log('');
  console.log('To trigger Claude Cowork:');
  console.log('  node strategy_cowork_sync.mjs --trigger');
  process.exit(0);
}

console.log('\n🤖  Triggering Claude Cowork...\n');

const prompt = [
  `You are Claude Cowork, working on the BIMpossible Platform product plan.`,
  `Read the strategy decisions brief at: ${BRIEF}`,
  `Then read the current project data at: ${DATA}`,
  `Process every approved and research item as instructed in the brief.`,
  `Edit data.js directly — keep changes minimal and targeted.`,
].join(' ');

const result = spawnSync('claude', ['-p', prompt, '--allowedTools', 'Read,Edit,Bash'], {
  stdio: 'inherit',
  cwd: DIR,
  shell: true,
});

if (result.error) {
  console.error('\n❌  Could not run claude. Is it on your PATH?');
  console.error('    Run manually:');
  console.error(`    claude -p "${prompt}"`);
  process.exit(1);
}
