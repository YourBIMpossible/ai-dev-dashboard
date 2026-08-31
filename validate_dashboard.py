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

        for co in cohorts:
            cid = co.get("id", "?")
            member_ids = co.get("phaseIds") or []
            if not member_ids:
                fail(f"[{pid}] baseline cohort {cid!r} has no phaseIds.")
                errors += 1
            resolved, dupes = set(), 0
            for raw in member_ids:
                r = _resolve(raw)
                if r is None:
                    fail(f"[{pid}] cohort {cid!r} member {raw!r} has a cyclic alias chain.")
                    errors += 1
                    continue
                if r in resolved:
                    dupes += 1
                    continue
                resolved.add(r)
                if r not in id_set:
                    fail(f"[{pid}] cohort {cid!r} member {raw!r} -> {r!r} "
                         f"does not match any phase id.")
                    errors += 1
            if resolved:
                base = round(sum(ph["pct"] for ph in pphases if ph.get("id") in resolved)
                             / len(resolved))
                print(f"  · [{pid}] cohort {cid!r}: {len(resolved)} phases "
                      f"({dupes} alias-dupe(s) folded) -> {base}% complete.")

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
