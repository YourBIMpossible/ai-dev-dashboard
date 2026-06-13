#!/usr/bin/env node
/**
 * Claude Code agent/session activity -> dashboard "Agents" + "Health" tabs.
 *
 * Native re-implementation of the useful parts of hoangsonww/Claude-Code-Agent-
 * Monitor: no separate server, no ~/.claude hook changes. Reads LOCAL data only.
 *
 * Cheap (always): ccusage session/daily -> sessions, by-project, recent, timeline,
 *   cache-hit rate, avg cost/tokens per session, model mix.
 * Bounded scan: streams recent session transcripts (~/.claude/projects/<dir>/<uuid>.jsonl)
 *   to count tool usage, Task/subagent spawns, and tool errors. Capped by session
 *   count, lines/file, and total bytes so it never walks all ~13B tokens of history.
 *
 * Cost = API-equivalent value (subscription, not cash paid).
 *
 *   node agents_sync.mjs            (sync + push)
 *   node agents_sync.mjs --no-push  (regenerate agents.js only)
 */
import { execSync } from "node:child_process";
import { writeFileSync, readFileSync, existsSync, readdirSync, createReadStream, statSync } from "node:fs";
import { createInterface } from "node:readline";
import { homedir } from "node:os";
import { join } from "node:path";

const REPO = "F:/AI-Dev/Dashboard";
const OUT = `${REPO}/agents.js`;
const PUSH = !process.argv.includes("--no-push");
const RECENT_LIMIT = 30;

// Scan bounds (keep the transcript pass fast):
const SCAN_DAYS = 7;            // only sessions active within N days
const SCAN_MAX_SESSIONS = 120;  // hard cap on files opened
const SCAN_LINE_CAP = 40000;    // max lines read per file
const SCAN_BYTE_BUDGET = 900 * 1024 * 1024; // total bytes across all files

function projectLabel(dir) {
  if (!dir) return "(unknown)";
  if (dir.includes("claude-worktrees")) return "worktree";
  return dir.replace(/^[A-Za-z]--/, "").replace(/^AI-Dev-/, "").replace(/-/g, " ").replace(/\s+/g, " ").trim() || dir;
}

function buildUuidProjectMap() {
  const root = join(homedir(), ".claude", "projects");
  const map = {};
  let dirs = [];
  try { dirs = readdirSync(root); } catch { return { map, root }; }
  for (const dir of dirs) {
    try { for (const f of readdirSync(join(root, dir))) if (f.endsWith(".jsonl")) map[f.slice(0, -6)] = dir; }
    catch { /* skip */ }
  }
  return { map, root };
}

function configInventory() {
  const base = join(homedir(), ".claude");
  const countEntries = (sub, ext) => { try { return readdirSync(join(base, sub)).filter((f) => !ext || f.endsWith(ext)).length; } catch { return 0; } };
  let settings = {};
  try { settings = JSON.parse(readFileSync(join(base, "settings.json"), "utf8")); } catch { /* none */ }
  const mcpServers = settings.mcpServers ? Object.keys(settings.mcpServers).length : 0;
  let hooks = 0;
  if (settings.hooks && typeof settings.hooks === "object")
    for (const k of Object.keys(settings.hooks)) { const v = settings.hooks[k]; hooks += Array.isArray(v) ? v.length : 1; }
  let keybindings = 0;
  try { const kb = JSON.parse(readFileSync(join(base, "keybindings.json"), "utf8")); keybindings = Array.isArray(kb) ? kb.length : Object.keys(kb).length; } catch { /* none */ }
  let memory = 0;
  try { for (const d of readdirSync(join(base, "projects"))) { try { memory += readdirSync(join(base, "projects", d, "memory")).filter((f) => f.endsWith(".md") && f !== "MEMORY.md").length; } catch { /* */ } } } catch { /* */ }
  return {
    skills: countEntries("skills"), subagents: countEntries("agents", ".md"),
    commands: countEntries("commands", ".md"), outputStyles: countEntries("output-styles", ".md"),
    plugins: countEntries("plugins"), mcpServers, hooks, keybindings, memory,
  };
}

function ccusage(cmd) {
  return JSON.parse(execSync(`npx -y ccusage@latest ${cmd} --json`, {
    encoding: "utf8", maxBuffer: 128 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"],
  }));
}

const shortModel = (m) => String(m).replace(/-\d{8}$/, "").replace(/^claude-/, "");

console.log("Running ccusage…");
const { session, totals } = ccusage("session");
const daily = ccusage("daily").daily || [];
const { map: uuidProject, root: projectsRoot } = buildUuidProjectMap();

const times = session.map((s) => Date.parse(s.metadata?.lastActivity || 0)).filter(Boolean);
const nowMs = times.length ? Math.max(...times) : Date.parse("2026-01-01");
const DAY = 86400000;
const ymd = (ms) => new Date(ms).toISOString().slice(0, 10);

const enriched = session.map((s) => ({
  id: s.period,
  project: projectLabel(uuidProject[s.period]),
  dir: uuidProject[s.period] || "",
  models: (s.modelsUsed || []).map(shortModel),
  breakdowns: s.modelBreakdowns || [],
  cost: +(s.totalCost || 0).toFixed(2),
  tokens: s.totalTokens || 0,
  last: Date.parse(s.metadata?.lastActivity || 0) || 0,
  lastActivity: s.metadata?.lastActivity || null,
}));

const activeToday = enriched.filter((s) => nowMs - s.last <= DAY).length;
const active7d = enriched.filter((s) => nowMs - s.last <= 7 * DAY).length;

// ── By-project ──────────────────────────────────────────────────────────────
const byProjMap = {};
for (const s of enriched) {
  const p = (byProjMap[s.project] ||= { project: s.project, sessions: 0, cost: 0, tokens: 0 });
  p.sessions++; p.cost += s.cost; p.tokens += s.tokens;
}
const byProject = Object.values(byProjMap).map((p) => ({ ...p, cost: +p.cost.toFixed(2) })).sort((a, b) => b.cost - a.cost);

// ── Recent ──────────────────────────────────────────────────────────────────
const recent = [...enriched].sort((a, b) => b.last - a.last).slice(0, RECENT_LIMIT)
  .map((s) => ({ id: s.id.slice(0, 8), project: s.project, models: s.models, cost: s.cost, tokens: s.tokens, lastActivity: s.lastActivity }));

// ── Timeline (last 21 days): cost from ccusage daily, sessions/day from data ──
const sessByDay = {};
for (const s of enriched) if (s.last) sessByDay[ymd(s.last)] = (sessByDay[ymd(s.last)] || 0) + 1;
const timeline = daily.slice(-21).map((d) => ({
  date: d.period, cost: +(d.totalCost || 0).toFixed(2), sessions: sessByDay[d.period] || 0,
}));

// ── Model mix (aggregate per-model cost across sessions) ──────────────────────
const modelCost = {};
for (const s of enriched) for (const b of s.breakdowns) {
  const m = shortModel(b.modelName); modelCost[m] = (modelCost[m] || 0) + (b.cost || 0);
}
const mmTotal = Object.values(modelCost).reduce((a, b) => a + b, 0) || 1;
const modelMix = Object.entries(modelCost).map(([model, c]) => ({ model, cost: +c.toFixed(2), pct: Math.round(c / mmTotal * 100) })).sort((a, b) => b.cost - a.cost);

// ── Bounded transcript scan: tools, subagents, errors ─────────────────────────
const toScan = [...enriched].filter((s) => s.dir && nowMs - s.last <= SCAN_DAYS * DAY)
  .sort((a, b) => b.last - a.last).slice(0, SCAN_MAX_SESSIONS);

const tools = {};
const subBy = {};
const subTypes = {};
const allEvents = [];
let subTotal = 0, errors = 0, toolCalls = 0, scanned = 0, bytes = 0, bounded = false, eventLines = 0;

async function scanFile(path, project, sid) {
  let size = 0;
  try { size = statSync(path).size; } catch { return; }
  if (bytes + size > SCAN_BYTE_BUDGET) { bounded = true; return; }
  bytes += size;
  const rl = createInterface({ input: createReadStream(path, { encoding: "utf8" }), crlfDelay: Infinity });
  let lines = 0;
  try {
    for await (const line of rl) {
      if (++lines > SCAN_LINE_CAP) { bounded = true; break; }
      if (!line || line[0] !== "{") continue;
      let ev; try { ev = JSON.parse(line); } catch { continue; }
      eventLines++;
      const content = ev.message?.content;
      if (!Array.isArray(content)) continue;
      for (const b of content) {
        if (b.type === "tool_use") {
          const n = b.name || "?";
          tools[n] = (tools[n] || 0) + 1; toolCalls++;
          if (ev.timestamp) allEvents.push({ ts: ev.timestamp, tool: n, project, session: sid });
          // Subagent spawns: "Agent" (this env) / "Task" (CLI) / mcp "*spawn_task".
          // NOT TaskCreate/TaskUpdate (those are todo-list tools).
          if (n === "Agent" || n === "Task" || /spawn_task$/.test(n)) {
            subTotal++; subBy[project] = (subBy[project] || 0) + 1;
            const st = b.input?.subagent_type || b.input?.subagentType || "general-purpose";
            subTypes[st] = (subTypes[st] || 0) + 1;
          }
        } else if (b.type === "tool_result" && b.is_error) errors++;
      }
    }
  } finally { rl.close(); }
  scanned++;
}

console.log(`Scanning ${toScan.length} recent session transcripts (bounded)…`);
for (const s of toScan) {
  if (bytes > SCAN_BYTE_BUDGET) { bounded = true; break; }
  await scanFile(join(projectsRoot, s.dir, `${s.id}.jsonl`), s.project, s.id.slice(0, 8));
}

const toolsTotal = Object.values(tools).reduce((a, b) => a + b, 0) || 1;
const toolList = Object.entries(tools).map(([name, count]) => ({ name, count, pct: Math.round(count / toolsTotal * 100) })).sort((a, b) => b.count - a.count);
const subList = Object.entries(subBy).map(([project, count]) => ({ project, count })).sort((a, b) => b.count - a.count);
const subTypeList = Object.entries(subTypes).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);

// ── Analytics: cost by weekday (from ccusage daily) ───────────────────────────
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const wdCost = {};
for (const d of daily) { const w = WD[new Date(d.period + "T00:00:00Z").getUTCDay()]; wdCost[w] = (wdCost[w] || 0) + (d.totalCost || 0); }
const byWeekday = WD.map((w) => ({ day: w, cost: +(wdCost[w] || 0).toFixed(2) }));

// ── Recent tool activity (last 40) + config inventory ─────────────────────────
allEvents.sort((a, b) => (b.ts || "").localeCompare(a.ts || ""));
const recentEvents = allEvents.slice(0, 40);
const config = configInventory();

// ── Health ────────────────────────────────────────────────────────────────────
const cacheDenom = (totals.cacheReadTokens || 0) + (totals.cacheCreationTokens || 0) + (totals.inputTokens || 0);
const health = {
  cacheHitRate: cacheDenom ? Math.round((totals.cacheReadTokens || 0) / cacheDenom * 100) : 0,
  errorRate: toolCalls ? +(errors / toolCalls * 100).toFixed(1) : 0,
  avgCostPerSession: +((totals.totalCost || 0) / session.length).toFixed(2),
  avgTokensPerSession: Math.round((totals.totalTokens || 0) / session.length),
  toolCalls, errors, scannedSessions: scanned, bounded,
  modelMix,
};

const agents = {
  generated: new Date(nowMs).toISOString(),
  source: "ccusage + ~/.claude/projects (native, no hooks)",
  totals: { sessions: session.length, cost: +(totals.totalCost || 0).toFixed(2), tokens: totals.totalTokens || 0, activeToday, active7d, projects: byProject.length },
  byProject, recent, timeline, health,
  tools: toolList,
  subagents: { total: subTotal, byProject: subList, scannedSessions: scanned, bounded },
  workflow: {
    subagentTypes: subTypeList,
    avgSubagentsPerSession: scanned ? +(subTotal / scanned).toFixed(2) : 0,
    successRate: toolCalls ? +(100 - (errors / toolCalls * 100)).toFixed(1) : 100,
    topSubagentType: subTypeList[0] ? subTypeList[0].type : "—",
    mostCommonTool: toolList[0] ? toolList[0].name : "—",
  },
  analytics: { totalSessions: session.length, totalTokens: totals.totalTokens || 0, totalCost: +(totals.totalCost || 0).toFixed(2), events: eventLines, byWeekday },
  config,
  recentEvents,
};

const stripGen = (u) => { const c = { ...u }; delete c.generated; return JSON.stringify(c); };
if (existsSync(OUT)) {
  try {
    const m = readFileSync(OUT, "utf8").match(/window\.DASHBOARD_AGENTS\s*=\s*([\s\S]*?);\s*$/);
    if (m && stripGen(JSON.parse(m[1])) === stripGen(agents)) { console.log("No change — skipping."); process.exit(0); }
  } catch { /* rewrite */ }
}

const banner =
  "// Auto-generated by agents_sync.mjs — Claude Code session/agent activity.\n" +
  "// Native (no server, no ~/.claude hooks). Cost = API-equivalent. Do not hand-edit.\n";
writeFileSync(OUT, banner + "window.DASHBOARD_AGENTS = " + JSON.stringify(agents, null, 2) + ";\n", "utf8");
console.log(`agents.js: ${agents.totals.sessions} sessions, ${toolList.length} tools (${toolCalls} calls, ${errors} errors), ${subTotal} subagent spawns, scanned ${scanned}${bounded ? " (bounded)" : ""}.`);

if (!PUSH) { console.log("--no-push set."); process.exit(0); }
function git(a) { return execSync(`git -C "${REPO}" ${a}`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
try {
  git("pull --rebase --autostash origin main");
  git("add agents.js");
  if (!git("status --porcelain agents.js").trim()) { console.log("unchanged."); process.exit(0); }
  git(`commit -m "agents: refresh session activity + health/tools/subagents" -- agents.js`);
  git("push origin main");
  console.log("Pushed agents.js.");
} catch (e) { console.error("git failed:", e.message); process.exit(1); }
