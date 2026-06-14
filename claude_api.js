// claude_api.js — Claude API (platform) spend snapshot.
//
// MANUAL snapshot, because the Usage & Cost API needs an Admin key (sk-ant-admin…)
// that only an Organization can mint — an Individual account can't. To AUTOMATE this
// (like github_actions.js), convert the account to an org, create an Admin key, and
// wire a scheduled GitHub Action against /v1/organizations/cost_report + usage_report.
//
// Two ways to update the numbers:
//   1. Easiest — click "Edit" on the Claude API card (Usage tab). Saves to your browser
//      (localStorage) only; great for one machine.
//   2. Persist everywhere — edit the values below and commit this file (deploys in ~30s).
//
// Numbers below are the snapshot from platform.claude.com/dashboard on the Updated date.
window.DASHBOARD_CLAUDE_API = {
  updated: "2026-06-13",
  source: "manual snapshot · platform.claude.com/dashboard",
  credits: 17.42,            // Organization credits balance ($)
  spendMonth: 2.59,          // Spend this month ($)
  limit: 500,                // Monthly spend limit ($)
  resetDate: "2026-06-30",   // when the monthly limit resets
  tokens7d: 94600,           // Token volume, last 7 days
  cacheHitRate: 64,          // Prompt-cache hit rate (%)
  lowCreditThreshold: 25     // show a "credits low" warning at/below this ($)
};
