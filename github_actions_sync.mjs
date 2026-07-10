#!/usr/bin/env node
// github_actions_sync.mjs — GitHub Actions billing sync
//
// Local:   node github_actions_sync.mjs
//   Reads the most recent usageReport_*.csv from ~/Downloads for row history.
//   Computes live billing by summing per-run timing from the GitHub API.
//
// CI:      GH_TOKEN=<pat> node github_actions_sync.mjs --live-only
//   Skips CSV; just recomputes liveBilling + generated timestamp.
//
// Token needs: repo (reads workflow runs + timing) — no special billing scope needed.

import { execSync } from 'child_process';
import { writeFileSync, readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const USERNAME = 'YourBIMpossible';
const REPOS = ['BIMpossible', 'bimpossible-site', 'ai-dev-dashboard', 'Families-by-BIMpossible', 'BIMpossible_Workspace', 'BIMpossible-AddIns', 'AI-Server'];
const LIVE_ONLY = process.argv.includes('--live-only');
// Self-push only for a local full run. --live-only (CI) is already pushed by separate
// git steps in .github/workflows/github-actions-live.yml — self-pushing here too would
// double-commit. A local CSV-import run previously had no push at all, so its output
// sat uncommitted until the next Refresh-Dashboard.ps1 run silently discarded it via
// `git checkout origin/main -- ... github_actions.js`.
const PUSH = !LIVE_ONLY && !process.argv.includes('--no-push');

// GitHub minutes multiplier per OS (how they count against plan inclusion)
const MULTIPLIER = { UBUNTU: 1, WINDOWS: 2, MACOS: 10 };

// ── Token resolution ──────────────────────────────────────────────────────────
function resolveToken() {
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) {
    return process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  }
  try {
    return execSync('gh auth token', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

// ── GitHub REST helper ────────────────────────────────────────────────────────
async function ghFetch(path, token) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${path}: ${body.slice(0, 120)}`);
  }
  return res.json();
}

// ── Live billing via per-run timing (replaces deprecated summary endpoint) ───
async function fetchLiveBilling(token) {
  if (!token) return null;

  // Billing period = current calendar month (GitHub resets on the 1st)
  const now = new Date();
  const billingStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const totals = { UBUNTU: 0, WINDOWS: 0, MACOS: 0 };
  let runsChecked = 0;

  for (const repo of REPOS) {
    // Collect all run IDs this billing period (paginated)
    const runIds = [];
    for (let page = 1; page <= 5; page++) {
      try {
        const data = await ghFetch(
          `/repos/${USERNAME}/${repo}/actions/runs?created=>=${billingStart}&per_page=100&page=${page}`,
          token
        );
        runIds.push(...data.workflow_runs.map(r => r.id));
        if (data.workflow_runs.length < 100) break;
      } catch (e) {
        console.warn(`    ${repo} runs page ${page}: ${e.message}`);
        break;
      }
    }

    // Fetch timing for each run (cap per repo to stay within rate limits)
    for (const id of runIds.slice(0, 150)) {
      try {
        const timing = await ghFetch(`/repos/${USERNAME}/${repo}/actions/runs/${id}/timing`, token);
        for (const os of Object.keys(MULTIPLIER)) {
          totals[os] += timing.billable?.[os]?.total_ms || 0;
        }
        runsChecked++;
      } catch {
        // skip individual run errors silently
      }
    }
    process.stdout.write(`    ${repo}: ${runIds.length} runs\n`);
  }

  // Convert ms → actual minutes, then apply plan multiplier for billing minutes
  const actualMin = os => Math.ceil(totals[os] / 60000);
  const billedMin = os => Math.ceil(totals[os] / 60000 * MULTIPLIER[os]);
  const totalBilledMin = Object.keys(MULTIPLIER).reduce((s, os) => s + billedMin(os), 0);

  return {
    total_minutes_used: totalBilledMin,
    total_paid_minutes_used: 0,
    included_minutes: 3000,
    minutes_used_breakdown: {
      UBUNTU: actualMin('UBUNTU'),
      WINDOWS: actualMin('WINDOWS'),
      MACOS: actualMin('MACOS'),
    },
    computed_from: `${runsChecked} workflow runs via GitHub API`,
    billing_period_start: billingStart.slice(0, 10),
  };
}

// ── CSV helpers ───────────────────────────────────────────────────────────────
function findLatestCsv() {
  const dl = join(homedir(), 'Downloads');
  if (!existsSync(dl)) return null;
  const files = readdirSync(dl)
    .filter(f => f.startsWith('usageReport_') && f.endsWith('.csv'))
    .map(f => ({ path: join(dl, f), mtime: statSync(join(dl, f)).mtimeMs }));
  if (!files.length) return null;
  files.sort((a, b) => b.mtime - a.mtime);
  return files[0].path;
}

function parseCsv(content) {
  return content.trim().split('\n').slice(1).map(line => {
    const fields = line.match(/"([^"]*)"/g)?.map(f => f.slice(1, -1)) || [];
    if (fields.length < 14) return null;
    const [date, , sku, qty, , , gross, , net, user, , repo, wfPath] = fields;
    const wf = wfPath.split('/').pop() || wfPath;
    return { date, sku, qty: +qty, gross: +gross, net: +net, user, repo, wf };
  }).filter(Boolean);
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('GitHub Actions sync starting…');

const token = resolveToken();
if (!token) console.warn('  No token found — live billing will be skipped.');

// Live billing
console.log('  Computing live billing from workflow run timing…');
let live = null;
try {
  live = await fetchLiveBilling(token);
  if (live) {
    console.log(`  Live: ${live.total_minutes_used} billing-min used of ${live.included_minutes} included (${live.computed_from})`);
  }
} catch (e) {
  console.warn('  Live billing failed:', e.message);
}

// CSV rows
let rows = [];
let period = { start: '', end: '' };

if (!LIVE_ONLY) {
  const csvPath = findLatestCsv();
  if (csvPath) {
    console.log(`  CSV: ${csvPath}`);
    rows = parseCsv(readFileSync(csvPath, 'utf8'));
    if (rows.length) {
      const dates = rows.map(r => r.date).sort();
      period = { start: dates[0], end: dates[dates.length - 1] };
      console.log(`  Parsed ${rows.length} rows (${period.start} → ${period.end})`);
    }
  } else {
    console.warn('  No usageReport_*.csv in ~/Downloads — preserving existing rows.');
  }
}

// Preserve existing rows if none found above
if (!rows.length) {
  const existing = join(__dir, 'github_actions.js');
  if (existsSync(existing)) {
    const src = readFileSync(existing, 'utf8');
    const m = src.match(/rows:\s*\[([\s\S]*?)\s*\]\s*\}/);
    if (m) {
      try {
        rows = eval('[' + m[1] + ']'); // eslint-disable-line no-eval
        const dates = rows.map(r => r.date).sort();
        period = { start: dates[0], end: dates[dates.length - 1] };
        console.log(`  Kept ${rows.length} existing rows from github_actions.js`);
      } catch (e) {
        console.warn('  Could not parse existing rows:', e.message);
      }
    }
  }
}

// Write
const now = new Date().toISOString();
const rowsJson = rows.map(r =>
  `    {date:"${r.date}",sku:"${r.sku}",qty:${r.qty},gross:${r.gross.toFixed(3)},net:${r.net},user:"${r.user}",repo:"${r.repo}",wf:"${r.wf}"}`
).join(',\n');

const out = `// Auto-generated by github_actions_sync.mjs — GitHub Actions billing data.
// Re-run: node github_actions_sync.mjs          (local, reads ~/Downloads CSV + live API)
//         node github_actions_sync.mjs --live-only  (CI: updates liveBilling only)
window.DASHBOARD_GH_ACTIONS = {
  generated: "${now}",
  source: "GitHub billing CSV export · account: ${USERNAME}",
  period: { start: "${period.start}", end: "${period.end}" },
  liveBilling: ${live ? JSON.stringify(live) : 'null'},
  rows: [
${rowsJson},
  ]
};
`;

writeFileSync(join(__dir, 'github_actions.js'), out, 'utf8');
console.log(`  Written → github_actions.js`);

if (!PUSH) {
  console.log(LIVE_ONLY ? 'Done (--live-only: pushed by the CI workflow, not this script).' : 'Done (--no-push set, skipping git).');
  process.exit(0);
}

function git(args) {
  return execSync(`git -C "${__dir}" ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}
try {
  git('pull --rebase --autostash origin main');
  git('add github_actions.js');
  const status = git('status --porcelain github_actions.js').trim();
  if (!status) {
    console.log('github_actions.js unchanged — nothing to push.');
    process.exit(0);
  }
  // period.start/end come from parsed CSV rows (external input) - strip to bare
  // date characters before it ever reaches a shell-interpolated command string.
  const safeDate = (s) => (/^[0-9-]{1,20}$/.test(s || '') ? s : null);
  const rangeLabel = `${safeDate(period.start) || 'no CSV'} to ${safeDate(period.end) || 'n/a'}`;
  git(`commit -m "github-actions: refresh billing data (${rangeLabel})" -- github_actions.js`);
  git('push origin main');
  console.log('Pushed github_actions.js to dashboard.');
} catch (e) {
  console.error('git step failed:', e.message);
  process.exit(1);
}
