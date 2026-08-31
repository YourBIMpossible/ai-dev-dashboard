/*
 * Phase Completion Model v1 — pure metric helpers.
 *
 * Shared by the dashboard renderer (index.html, via <script src>) and the Node test
 * suite (test_phase_metrics.js, via require). No DOM, no globals beyond the export —
 * every function is pure so both surfaces compute identical numbers.
 *
 * Scope model: each phase carries a `bucket`. Only `active` phases count toward the
 * headline; `proposed`/`held`/`conditional`/`placeholder` are tracked in the scope
 * inventory but excluded. A phase with no bucket defaults to `active`. `weight` is
 * stored and validated but v1 ships all weights at 1, so the weighted average equals
 * the flat average (weighted mode is deferred to an owner scoring pass).
 *
 * Empty denominators return pct:null (a "no data" sentinel) — never NaN or a
 * misleading 0%. Math.round is applied at the display boundary only.
 */
(function (factory) {
  "use strict";
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") { window.PhaseMetrics = api; }
})(function () {
  "use strict";

  var VALID_BUCKETS = ["active", "proposed", "held", "conditional", "placeholder"];
  var BUCKET_SET = {};
  VALID_BUCKETS.forEach(function (b) { BUCKET_SET[b] = true; });

  // Unknown/absent bucket -> "active" (safe default; the Python validator rejects
  // an unknown bucket at build time, so this only ever fires for a legacy phase).
  function normalizeBucket(b) { return BUCKET_SET[b] ? b : "active"; }

  // Curated weight must be a finite positive number; anything else -> 1.
  function normalizeWeight(w) {
    return (typeof w === "number" && isFinite(w) && w > 0) ? w : 1;
  }

  function getPhases(p) {
    return (p && p.progress && Array.isArray(p.progress.phases)) ? p.progress.phases : [];
  }

  function isActivePhase(ph) { return normalizeBucket(ph && ph.bucket) === "active"; }

  function getActivePhases(p) { return getPhases(p).filter(isActivePhase); }

  function _scorable(phases) {
    return (phases || []).filter(function (x) { return x && typeof x.pct === "number"; });
  }

  // Flat mean of pct over the given phases -> {num, den, pct|null}.
  function getFlatCompletion(phases) {
    var list = _scorable(phases);
    if (!list.length) return { num: 0, den: 0, pct: null };
    var sum = list.reduce(function (s, x) { return s + x.pct; }, 0);
    return { num: sum, den: list.length, pct: Math.round(sum / list.length) };
  }

  // Weighted mean: Sigma(w*pct)/Sigma(w). With all weights 1 this equals the flat mean.
  function getWeightedCompletion(phases) {
    var list = _scorable(phases);
    if (!list.length) return { num: 0, den: 0, pct: null };
    var num = 0, den = 0;
    list.forEach(function (x) { var w = normalizeWeight(x.weight); num += w * x.pct; den += w; });
    if (den <= 0) return { num: 0, den: 0, pct: null };
    return { num: num, den: den, pct: Math.round(num / den) };
  }

  function getScopeCounts(p) {
    var c = { active: 0, proposed: 0, held: 0, conditional: 0, placeholder: 0 };
    getPhases(p).forEach(function (ph) { c[normalizeBucket(ph && ph.bucket)]++; });
    return c;
  }

  // Resolve a raw phase id through the alias chain to its canonical id.
  // Returns null if the chain cycles.
  function resolvePhaseId(id, aliases) {
    aliases = aliases || {};
    var seen = {};
    seen[id] = true;
    while (Object.prototype.hasOwnProperty.call(aliases, id) && aliases[id] !== id) {
      id = aliases[id];
      if (seen[id]) return null; // cycle
      seen[id] = true;
    }
    return id;
  }

  // Resolve a cohort's frozen membership to live phase objects: alias-resolve,
  // cycle-drop, dedupe, match by id. Returns {phases, missing}.
  function getCohortPhases(p, cohort) {
    var phases = getPhases(p);
    var aliases = (p && p.phaseAliases) || {};
    var byId = {};
    phases.forEach(function (x) { if (x && x.id) byId[x.id] = x; });
    var ids = (cohort && cohort.phaseIds) || [];
    var seen = {}, out = [], missing = [];
    ids.forEach(function (raw) {
      var id = resolvePhaseId(raw, aliases);
      if (id === null || seen[id]) return; // cycle or duplicate
      seen[id] = true;
      if (byId[id]) out.push(byId[id]); else missing.push(id);
    });
    return { phases: out, missing: missing };
  }

  // Completion of a frozen cohort, computed from members' CURRENT pct.
  function getCohortCompletion(p, cohort) {
    var r = getCohortPhases(p, cohort);
    var f = getFlatCompletion(r.phases);
    return { pct: f.pct, den: f.den, missing: r.missing };
  }

  return {
    VALID_BUCKETS: VALID_BUCKETS,
    normalizeBucket: normalizeBucket,
    normalizeWeight: normalizeWeight,
    getPhases: getPhases,
    isActivePhase: isActivePhase,
    getActivePhases: getActivePhases,
    getFlatCompletion: getFlatCompletion,
    getWeightedCompletion: getWeightedCompletion,
    getScopeCounts: getScopeCounts,
    resolvePhaseId: resolvePhaseId,
    getCohortPhases: getCohortPhases,
    getCohortCompletion: getCohortCompletion
  };
});
