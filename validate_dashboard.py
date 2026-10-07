#!/usr/bin/env python3
"""
Pre-push guard for the dashboard. Run by Refresh-Dashboard.ps1 BEFORE every commit
(push-dashboard.ps1 is now just a thin delegate to that script):
if it exits non-zero, the push is aborted, so a data.js with wrong phase numbering
can never reach the live site again.

Checks (hard failures unless noted):
  1. data.js is syntactically valid (`node --check`).
  2. Every phase number in BIMpossible_PHASE-STATUS.md appears exactly once in
     progress.phases, in ledger order.
  3. Canonical-identity anchors — the exact swaps that have burned us before are
     forbidden by name:
        P6  is Billing/Platform        — never "content authoring", never "model QA"
        P7  is Write-back/Revit Link   — never "model QA", never "QA & Health"
        P11 is Model QA & Health       — never "Revit Link write-back"
        P12 is Content Authoring       — never "billing"
  4. No deprecated phase label anywhere ("Phase 7 = Model QA", "Phase 6 = content authoring").
  5. (warning only) a phase percent that flatly contradicts its ledger status
     (e.g. SHIPPED shown at 15%, or PLACEHOLDER shown at 80%).
  6. Phase-completion-model schema for projects that opted in.
  7. Audit-card accounting (docs/COVERAGE-AND-DISCLOSURE-POLICY.md section 1) for every
     project with an `audit` block: see audit_accounting_problems().

Usage:
    python validate_dashboard.py            # validate ./data.js against the default ledger
    python validate_dashboard.py --data <p> --phase-ledger <p>
    python validate_dashboard.py --strict   # treat warnings as failures too
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from sync_dashboard import node_check
from sync_ledgers import (
    DEFAULT_DATA, DEFAULT_PHASE_LEDGER, STATUS_PCT, VALID_BUCKETS,
    _phase_num_of, _status_key, load_current, parse_phase_ledger,
)

# Canonical anchors: for a phase number, the name MUST contain at least one
# `must_any` token and MUST NOT contain any `must_not` token (all case-insensitive).
# These encode the historical drift directly — if any of them ever fires, the push
# is blocked. Keyed by the normalized phase number.
ANCHORS = {
    "6":  {"must_any": ["billing", "platform"],     "must_not": ["content authoring", "model qa"]},
    "7":  {"must_any": ["write-back", "revit link"], "must_not": ["model qa", "qa & health", "qa and health"]},
    "11": {"must_any": ["qa", "health"],            "must_not": ["revit link write-back"]},
    "12": {"must_any": ["content"],                 "must_not": ["billing", "revit link"]},
}

# Phrases that must never appear in ANY phase name (the void renumberings).
DEPRECATED_SUBSTRINGS = [
    "p7 model qa", "p7 qa & health", "p6 content auth",
]

# How far a curated pct may sit from its status band before we warn.
PCT_WARN_DELTA = 45


def fail(msg: str) -> None:
    print(f"  ✗ {msg}", file=sys.stderr)


# --- audit-card accounting (policy section 1) --------------------------------------
SEVERITIES = ("critical", "high", "medium", "low", "info")
# Trend vocabulary. REFRESH-SPEC.md names improving | flat | worsening; `unknown` is the
# established "no comparable evidence" state (index.html renders any other value dim);
# `stable` is a legacy alias of `flat`; `recovered` is a legacy hand-written label on one
# card. A free-text trend is allowed when its leading token (before " -- ") is in this set.
TREND_TOKENS = {"improving", "flat", "worsening", "stable", "unknown", "recovered"}
# Reconcile writes success | partial | failed; `none` = no audit on record;
# `unverified` = hand-curated card whose evidence cannot be inspected (needs ingestDetail).
INGEST_STATUSES = {"success", "partial", "failed", "none", "unverified"}
INGEST_DETAIL_REQUIRED = {"partial", "failed", "unverified"}
_HIST_KEYS = ("counts", "rawCounts", "openCounts", "unknownCounts", "resolvedCounts",
              "awaitingIntegrationCounts", "carriedClosedCounts")


def _is_count(v) -> bool:
    return isinstance(v, int) and not isinstance(v, bool) and v >= 0


def _hist_total(h) -> int:
    return sum(v for v in h.values() if _is_count(v)) if isinstance(h, dict) else 0


def _valid_hist(h) -> bool:
    return isinstance(h, dict) and all(k in SEVERITIES and _is_count(v) for k, v in h.items())


def audit_accounting_problems(projects: list[dict]) -> list[str]:
    """Hard-failure messages for the audit-card accounting rules. Pure (no I/O).

    Rules, applied only where the fields exist (legacy cards without rawCounts are
    checked for the subset that applies):
      - every *Counts field is a severity histogram of non-negative integers.
      - rawCounts == openCounts + awaitingIntegrationCounts + resolvedCounts +
        unknownCounts, per severity (an absent histogram counts as zero).
      - counts == openCounts, and counts == the composition of open[] (by severity when
        every open item carries one; by length otherwise).
      - closedLastRun is a non-negative integer and, on cards with rawCounts, never
        exceeds the closures the card can evidence: resolved + carriedClosed.
      - trend: leading token in TREND_TOKENS; `improving` needs verified closure on the
        canonical branch (closedLastRun > 0 or resolved > 0) when the card carries
        implemented-awaiting-integration findings. Awaiting is not closure.
      - ingestStatus in INGEST_STATUSES; ingestDetail is required when any finding is
        awaiting integration or the status is partial / failed / unverified.
    """
    problems: list[str] = []
    for proj in projects:
        a = proj.get("audit")
        if not isinstance(a, dict):
            continue
        pid = proj.get("id", "?")

        def bad(msg: str, _pid: str = pid) -> None:
            problems.append(f"[{_pid}] audit: {msg}")

        hists: dict[str, dict] = {}
        for key in _HIST_KEYS:
            if key in a:
                if _valid_hist(a[key]):
                    hists[key] = a[key]
                else:
                    bad(f"{key} must be a severity histogram of non-negative integers, got {a[key]!r}.")

        closed = a.get("closedLastRun")
        closed_ok = _is_count(closed)
        if "closedLastRun" in a and not closed_ok:
            bad(f"closedLastRun must be a non-negative integer, got {closed!r}.")

        counts = hists.get("counts")
        opn = hists.get("openCounts")
        if counts is not None and opn is not None:
            for sev in SEVERITIES:
                if counts.get(sev, 0) != opn.get(sev, 0):
                    bad(f"counts.{sev}={counts.get(sev, 0)} != openCounts.{sev}={opn.get(sev, 0)} "
                        f"(counts must equal openCounts).")
        base = counts if counts is not None else opn
        items = a.get("open")
        if isinstance(items, list) and base is not None:
            if len(items) != _hist_total(base):
                bad(f"open[] has {len(items)} item(s) but counts total {_hist_total(base)}.")
            elif items and all(isinstance(i, dict) and i.get("severity") in SEVERITIES for i in items):
                for sev in SEVERITIES:
                    n = sum(1 for i in items if i["severity"] == sev)
                    if n != base.get(sev, 0):
                        bad(f"open[] has {n} {sev} item(s) but counts.{sev}={base.get(sev, 0)}.")

        raw = hists.get("rawCounts")
        if raw is not None:
            for sev in SEVERITIES:
                parts = {k: hists[k].get(sev, 0) for k in
                         ("openCounts", "awaitingIntegrationCounts", "resolvedCounts", "unknownCounts")
                         if k in hists}
                if sum(parts.values()) != raw.get(sev, 0):
                    bad(f"rawCounts.{sev}={raw.get(sev, 0)} != open+awaiting+resolved+unknown {parts}.")
            if closed_ok:
                evidenced = (_hist_total(hists.get("resolvedCounts"))
                             + _hist_total(hists.get("carriedClosedCounts")))
                if closed > evidenced:
                    bad(f"closedLastRun={closed} exceeds evidenced verified closures "
                        f"(resolved + carriedClosed = {evidenced}).")

        trend = a.get("trend")
        if trend is not None:
            token = str(trend).split(" -- ", 1)[0].strip().lower()
            if token not in TREND_TOKENS:
                bad(f"trend {trend!r} is not one of {sorted(TREND_TOKENS)}.")
            elif token == "improving" and _hist_total(hists.get("awaitingIntegrationCounts")) > 0:
                verified = (closed if closed_ok else 0) + _hist_total(hists.get("resolvedCounts"))
                if verified == 0:
                    bad("trend 'improving' has no verified closure on the canonical branch "
                        "(closedLastRun and resolvedCounts are 0); implemented-awaiting-integration "
                        "is not closure.")

        status = a.get("ingestStatus")
        if status is not None and status not in INGEST_STATUSES:
            bad(f"ingestStatus {status!r} is not one of {sorted(INGEST_STATUSES)}.")
        detail = a.get("ingestDetail")
        if not (isinstance(detail, str) and detail.strip()):
            if _hist_total(hists.get("awaitingIntegrationCounts")) > 0:
                bad("ingestDetail is required when findings are implemented-awaiting-integration.")
            if status in INGEST_DETAIL_REQUIRED:
                bad(f"ingestDetail is required when ingestStatus is {status!r}.")
    return problems


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate the dashboard before push.")
    ap.add_argument("--data", default=str(DEFAULT_DATA))
    ap.add_argument("--phase-ledger", default=str(DEFAULT_PHASE_LEDGER))
    ap.add_argument("--strict", action="store_true", help="Treat warnings as failures.")
    args = ap.parse_args()

    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass

    data_path = Path(args.data)
    ledger_path = Path(args.phase_ledger)
    errors = 0
    warnings = 0

    # --- 1. syntax -----------------------------------------------------------
    if not data_path.is_file():
        fail(f"data.js not found: {data_path}")
        return 1
    if not node_check(data_path.read_text(encoding="utf-8")):
        fail("data.js failed `node --check` (invalid JS).")
        return 1

    # --- load both sides -----------------------------------------------------
    if not ledger_path.is_file():
        fail(f"phase ledger not found: {ledger_path} — cannot validate phase numbering.")
        return 1
    ledger = parse_phase_ledger(ledger_path)
    current = load_current(data_path)
    bim = next((p for p in current["projects"] if p["id"] == "bimpossible"), None)
    if bim is None:
        fail("bimpossible project missing from data.js.")
        return 1
    phases = (bim.get("progress") or {}).get("phases", [])
    by_num = {_phase_num_of(p.get("name", "")): p for p in phases}

    # --- 2. every ledger phase present, in order -----------------------------
    dash_order = [_phase_num_of(p.get("name", "")) for p in phases]
    ledger_order = [ph["key"] for ph in ledger]
    for key in ledger_order:
        if key not in by_num:
            fail(f"ledger phase P{key} ({_name_of(ledger, key)}) is missing from the dashboard.")
            errors += 1
    # order check (only over the phases that exist on both sides)
    common = [k for k in dash_order if k in ledger_order]
    if common != [k for k in ledger_order if k in dash_order]:
        fail(f"phase order on the dashboard {common} does not match the ledger order "
             f"{[k for k in ledger_order if k in dash_order]}.")
        errors += 1

    # --- 3. canonical anchors ------------------------------------------------
    for num, rule in ANCHORS.items():
        ph = by_num.get(num)
        if not ph:
            continue  # missing-phase already reported in step 2
        name = ph.get("name", "").lower()
        if not any(tok in name for tok in rule["must_any"]):
            fail(f"P{num} name {ph.get('name')!r} is missing any of {rule['must_any']} "
                 f"— canonical identity broken.")
            errors += 1
        for bad in rule["must_not"]:
            if bad in name:
                fail(f"P{num} name {ph.get('name')!r} contains forbidden token {bad!r} "
                     f"(this is the historical drift — blocked).")
                errors += 1

    # --- 4. deprecated labels anywhere ---------------------------------------
    for ph in phases:
        flat = ph.get("name", "").lower().replace("-", " ").replace("=", " ")
        flat = " ".join(flat.split())
        for dep in DEPRECATED_SUBSTRINGS:
            if dep.replace("-", " ") in flat:
                fail(f"deprecated phase label detected in {ph.get('name')!r} ({dep!r}).")
                errors += 1

    # --- 5. pct vs status sanity (warning) -----------------------------------
    status_by_num = {ph["key"]: _status_key(ph["status"]) for ph in ledger}
    for num, ph in by_num.items():
        status = status_by_num.get(num)
        if status is None:
            continue
        band = STATUS_PCT.get(status)
        pct = ph.get("pct")
        if band is None or not isinstance(pct, (int, float)):
            continue
        if abs(pct - band) > PCT_WARN_DELTA:
            print(f"  ! warning: P{num} pct={pct} contradicts ledger status "
                  f"{status} (~{band}). Reconcile the pct or the ledger.", file=sys.stderr)
            warnings += 1

    # --- 6. phase-completion-model v1 schema ---------------------------------
    # Applies to any project that opted into the model (declares baselineCohorts or
    # tags any phase with a bucket). Today that is bimpossible only; other projects
    # keep the default-active behavior and are skipped here.
    for proj in current.get("projects", []):
        pphases = (proj.get("progress") or {}).get("phases", [])
        cohorts = proj.get("baselineCohorts") or []
        opted_in = bool(cohorts) or any("bucket" in ph for ph in pphases)
        if not opted_in:
            continue
        pid = proj.get("id", "?")
        seen_ids: dict[str, int] = {}
        for ph in pphases:
            nm = ph.get("name", "?")
            # id present + unique
            pid_val = ph.get("id")
            if not pid_val:
                fail(f"[{pid}] phase {nm!r} is missing an `id` (required by the completion model).")
                errors += 1
            else:
                seen_ids[pid_val] = seen_ids.get(pid_val, 0) + 1
            # bucket present + in enum
            bucket = ph.get("bucket")
            if bucket is None:
                fail(f"[{pid}] phase {nm!r} is missing a `bucket`.")
                errors += 1
            elif bucket not in VALID_BUCKETS:
                fail(f"[{pid}] phase {nm!r} has unknown bucket {bucket!r} "
                     f"(allowed: {sorted(VALID_BUCKETS)}).")
                errors += 1
            # weight present + finite positive number (not bool)
            w = ph.get("weight")
            if isinstance(w, bool) or not isinstance(w, (int, float)) or w != w \
                    or w in (float("inf"), float("-inf")) or w <= 0:
                fail(f"[{pid}] phase {nm!r} has invalid weight {w!r} "
                     f"(must be a finite number > 0).")
                errors += 1
            # pct in range
            pct = ph.get("pct")
            if not isinstance(pct, (int, float)) or isinstance(pct, bool) \
                    or pct < 0 or pct > 100:
                fail(f"[{pid}] phase {nm!r} has pct {pct!r} out of range [0,100].")
                errors += 1
        # duplicate ids
        for dup, n in seen_ids.items():
            if n > 1:
                fail(f"[{pid}] phase id {dup!r} appears {n} times (ids must be unique).")
                errors += 1
        # at least one active phase (else the headline has an empty denominator)
        if pphases and not any((ph.get("bucket") or "active") == "active" for ph in pphases):
            fail(f"[{pid}] has no `active` phase — the headline denominator would be empty.")
            errors += 1

        # cohort registry integrity: alias cycles, and every member resolves to a phase
        aliases = proj.get("phaseAliases") or {}
        id_set = set(seen_ids)

        def _resolve(raw: str) -> str | None:
            cur_id, chain = raw, {raw}
            while cur_id in aliases and aliases[cur_id] != cur_id:
                cur_id = aliases[cur_id]
                if cur_id in chain:
                    return None  # cycle
                chain.add(cur_id)
            return cur_id

        pct_by_id = {ph.get("id"): ph.get("pct") for ph in pphases if ph.get("id")}
        for co in cohorts:
            cid = co.get("id", "?")
            member_ids = co.get("phaseIds") or []
            if not member_ids:
                fail(f"[{pid}] baseline cohort {cid!r} has no phaseIds.")
                errors += 1
            resolved, dupes, cohort_pcts, bad = [], 0, [], False
            for raw in member_ids:
                r = _resolve(raw)
                if r is None:
                    fail(f"[{pid}] cohort {cid!r} member {raw!r} has a cyclic alias chain.")
                    errors += 1
                    bad = True
                    continue
                if r in resolved:
                    dupes += 1
                    continue
                resolved.append(r)
                if r not in id_set:
                    fail(f"[{pid}] cohort {cid!r} member {raw!r} -> {r!r} "
                         f"does not match any phase id.")
                    errors += 1
                    bad = True
                    continue
                # Member resolved to a real phase — its pct must be numeric to average.
                # (The per-phase loop above also flags this, but a cohort-scoped message
                # is actionable, and using .get avoids a KeyError crash on absent pct.)
                v = pct_by_id.get(r)
                if not isinstance(v, (int, float)) or isinstance(v, bool):
                    fail(f"[{pid}] cohort {cid!r} member {raw!r} -> {r!r} "
                         f"has no valid numeric pct ({v!r}); cannot compute the baseline.")
                    errors += 1
                    bad = True
                    continue
                cohort_pcts.append(v)
            # Only report a baseline when the whole cohort resolved cleanly.
            if resolved and not bad and cohort_pcts:
                base = round(sum(cohort_pcts) / len(cohort_pcts))
                print(f"  · [{pid}] cohort {cid!r}: {len(cohort_pcts)} phases "
                      f"({dupes} alias-dupe(s) folded) -> {base}% complete.")

    # --- 7. audit-card accounting --------------------------------------------
    for msg in audit_accounting_problems(current.get("projects", [])):
        fail(msg)
        errors += 1

    # --- verdict -------------------------------------------------------------
    if errors:
        print(f"\nDashboard validation FAILED: {errors} error(s), {warnings} warning(s).",
              file=sys.stderr)
        return 1
    if warnings and args.strict:
        print(f"\nDashboard validation failed (strict): {warnings} warning(s).", file=sys.stderr)
        return 1
    print(f"Dashboard validation passed ({warnings} warning(s)).")
    return 0


def _name_of(ledger: list[dict], key: str) -> str:
    for ph in ledger:
        if ph["key"] == key:
            return ph["name"]
    return "?"


if __name__ == "__main__":
    raise SystemExit(main())
