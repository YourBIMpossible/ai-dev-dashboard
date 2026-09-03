#!/usr/bin/env python3
"""
Deterministically render the bimpossible card's PHASE and WAVE blocks in data.js
straight from the two owner-maintained ledgers — NO language model involved.

    BIMpossible_PHASE-STATUS.md  ->  progress.phases[]   (name + status note)
    BIMpossible_WAVE-STATUS.md   ->  waves               (summary / current / lastCompleted / drift)

Why this exists
---------------
`sync_dashboard.py` updates the soft prose fields with a free-tier LLM. That model is
structurally the WRONG tool for phase/wave state: it re-derives phase numbering from
narrative prose and gets it wrong (the historical "P7 = Model QA" drift). The phase and
wave ledgers are plain Markdown tables — a parser reads them exactly, every time. So:

  * the LLM bot is hard-blocked from `progress` and `waves` (sync_dashboard.PROTECTED_FIELDS), and
  * this script owns those two fields, rendering them from the tables.

Ownership split, by field:
  * phase NAME  <- ledger (locked; this is the thing that drifts)
  * phase NOTE  <- ledger Status + Note (so an owner status flip shows with no hand-edit)
  * phase PCT   <- PRESERVED from data.js (a human judgement; ledger only sanity-checks it)
  * phase TASKS <- PRESERVED from data.js (curated build detail: PR #s, dates, smokes)
  * phase BUCKET/WEIGHT <- PRESERVED from data.js (completion-model v1 scope). data.js is
    their ONLY store, so losing them on a rebuild is unrecoverable: an existing phase that
    arrives without them ABORTS the render (CuratedFieldLoss) instead of defaulting.
  * waves       <- ledger (fully mechanical: counts, in-flight list, last completed)

The result is spliced in with the same proven, surgical machinery sync_dashboard.py
uses (only the `progress` and `waves` value-spans change; every other byte is identical),
then validated with `node --check`. A bad parse can never ship a broken dashboard.

Usage:
    python sync_ledgers.py                      # default repo paths
    python sync_ledgers.py --data data.js --phase-ledger <p> --wave-ledger <w>
    python sync_ledgers.py --check              # exit 1 if data.js is out of date, write nothing
    python sync_ledgers.py --allow-model-field-defaults   # schema migration only, see below
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

# Reuse the proven splice/serialize/validate helpers from the LLM sync.
from sync_dashboard import _is_ident, apply_patch, extract_block, node_check


def _scalar(v) -> bool:
    return isinstance(v, (str, int, float, bool)) or v is None


def compact_to_js(value, indent: int) -> str:
    """Serialize to a JS literal, but render any all-scalar dict INLINE — so a task
    `{ label, status, note }` stays on one line, matching the hand-curated data.js
    style and keeping ledger-change diffs to a single line instead of a dozen."""
    pad = " " * indent
    child = " " * (indent + 2)
    if _scalar(value):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, list):
        if not value:
            return "[]"
        if all(_scalar(x) for x in value):
            return "[" + ",".join(json.dumps(x, ensure_ascii=False) for x in value) + "]"
        items = [child + compact_to_js(x, indent + 2) for x in value]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    if isinstance(value, dict):
        if not value:
            return "{}"
        if all(_scalar(v) for v in value.values()):
            inner = ", ".join(
                f"{k if _is_ident(k) else json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}"
                for k, v in value.items()
            )
            return "{ " + inner + " }"
        parts = [
            f"{child}{(k if _is_ident(k) else json.dumps(k))}: {compact_to_js(v, indent + 2)}"
            for k, v in value.items()
        ]
        return "{\n" + ",\n".join(parts) + "\n" + pad + "}"
    return json.dumps(value, ensure_ascii=False)

HERE = Path(__file__).resolve().parent
WS = Path(os.environ.get("BIMPOSSIBLE_WORKSPACE", r"F:\BIMpossible-Workspace"))
BIM_REPO = Path(os.environ.get("BIMPOSSIBLE_REPO", r"F:\BIMpossible"))

DEFAULT_DATA = HERE / "data.js"
DEFAULT_PHASE_LEDGER = WS / "00_Strategy" / "BIMpossible_PHASE-STATUS.md"
DEFAULT_WAVE_LEDGER = WS / "00_Strategy" / "BIMpossible_WAVE-STATUS.md"

# Status -> percent band. Only used as a fallback when a phase has no curated pct,
# and by the validator to flag a pct that flatly contradicts the ledger status.
STATUS_PCT = {
    "CLOSED": 100, "SHIPPED": 95, "BUILT": 70, "ACTIVE": 50, "PARTIAL": 50,
    "ON HOLD": 30, "CONDITIONAL": 10, "PLANNED": 5, "PENDING": 5, "PLACEHOLDER": 0,
}


# --------------------------------------------------------------------------- #
# Markdown table parsing
# --------------------------------------------------------------------------- #
def _split_row(line: str) -> list[str]:
    """Split a Markdown table row into trimmed cells (drops the outer pipes)."""
    cells = [c.strip() for c in line.strip().strip("|").split("|")]
    return cells


def _is_separator(cells: list[str]) -> bool:
    return all(set(c) <= set("-: ") and c for c in cells)


def _clean(text: str) -> str:
    """Drop Markdown bold markers and collapse whitespace."""
    return text.replace("**", "").replace("  ", " ").strip()


def _clean_status(text: str) -> str:
    """Normalize a status cell: strip bold/emoji/leading punctuation, upper-case the
    leading status word-group. 'ON HOLD' and 'flag-gated OFF' tails are preserved."""
    s = _clean(text)
    # strip any leading non-letter run (emoji like ⏸, stray punctuation)
    while s and not s[0].isalpha():
        s = s[1:].lstrip()
    return s


def _status_key(status: str) -> str:
    """The canonical status token used for bucketing/bands (first 1-2 words upper)."""
    s = status.upper()
    if s.startswith("ON HOLD"):
        return "ON HOLD"
    return s.split()[0] if s.split() else ""


def parse_phase_ledger(path: Path) -> list[dict]:
    """Return ordered phases: [{num, key, name, status, note}]."""
    rows: list[dict] = []
    in_table = False
    header: list[str] | None = None
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip().startswith("|"):
            if in_table:
                break  # table ended
            continue
        cells = _split_row(line)
        if header is None:
            header = [c.lower() for c in cells]
            in_table = True
            continue
        if _is_separator(cells):
            continue
        # columns: Phase | Name | Status | Gate/depends on | Note
        if len(cells) < 5:
            continue
        num_raw = _clean(cells[0])
        key = num_raw.replace("–", "-").replace(" ", "")  # en-dash -> hyphen
        rows.append({
            "num": num_raw,
            "key": key,
            "name": _clean(cells[1]),
            "status": _clean_status(cells[2]),
            "note": _clean(cells[4]),
        })
    if not rows:
        sys.exit(f"ERROR: no phase rows parsed from {path}")
    return rows


def parse_wave_ledger(path: Path) -> tuple[list[dict], str]:
    """Return (waves, updated_date). waves: [{id, title, status, date, note}]."""
    waves: list[dict] = []
    updated = ""
    header: list[str] | None = None
    in_table = False
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip().lower().startswith("**updated:**") and not updated:
            # "**Updated:** 2026-06-18 (...)" -> first date-looking token
            tail = line.split("**Updated:**", 1)[1].strip()
            updated = tail.split()[0] if tail else ""
            continue
        if not line.strip().startswith("|"):
            if in_table:
                break
            continue
        cells = _split_row(line)
        if header is None:
            header = [c.lower() for c in cells]
            in_table = True
            continue
        if _is_separator(cells):
            continue
        # columns: Wave | Title | Status | Date | Note
        if len(cells) < 5:
            continue
        date = _clean(cells[3])
        waves.append({
            "id": _clean(cells[0]),
            "title": _clean(cells[1]),
            "status": _status_key(_clean_status(cells[2])),
            "date": "" if date in ("—", "-", "") else date,
            "note": _clean(cells[4]),
        })
    if not waves:
        sys.exit(f"ERROR: no wave rows parsed from {path}")
    return waves, updated


# --------------------------------------------------------------------------- #
# Read current card structure (robustly, via node) so we can preserve pct + tasks
# --------------------------------------------------------------------------- #
_DUMP_JS = (
    "const p=process.argv[1];global.window={};require(p);"
    "process.stdout.write(JSON.stringify(global.window.DASHBOARD_DATA));"
)


def load_current(data_path: Path) -> dict:
    # encoding="utf-8" is REQUIRED: node emits UTF-8, but subprocess text mode would
    # otherwise decode with the Windows locale (cp1252) and mojibake every em-dash /
    # arrow / ✦ in the preserved task notes.
    out = subprocess.run(
        ["node", "-e", _DUMP_JS, str(data_path.resolve()).replace("\\", "/")],
        capture_output=True, text=True, encoding="utf-8",
    )
    if out.returncode != 0:
        sys.exit(f"ERROR: could not parse data.js via node:\n{out.stderr.strip()}")
    return json.loads(out.stdout)


def _phase_num_of(name: str) -> str:
    """'P0-2 Foundation ...' -> '0-2'; 'P7 Revit ...' -> '7'."""
    if not name.startswith("P"):
        return ""
    tok = name[1:].split(" ", 1)[0]
    return tok.replace("–", "-")


# --------------------------------------------------------------------------- #
# Build the new progress + waves values
# --------------------------------------------------------------------------- #
# Phase-completion-model v1 buckets. Only `active` counts toward the ratified-scope
# headline; the rest are tracked in the scope inventory but excluded from the donut.
VALID_BUCKETS = {"active", "proposed", "held", "conditional", "placeholder"}

# Curated PHASE-level completion-model fields that MUST survive every ledger rebuild.
# `pct` and `tasks` were always preserved; the rest are the v1 phase-completion-model
# schema. Without this, the nightly ledger refresh would silently wipe bucket/weight/etc.
# NOTE: project-level registries (baselineCohorts, phaseAliases) are deliberately NOT in
# this tuple. They live outside `progress`/`waves`, and render() rewrites only those two
# value-spans (see apply_patch in render()), leaving every other byte — the cohort/alias
# registries included — byte-identical. This copy loop runs per-phase, so a project-level
# key could never match a phase record anyway. Do not add project-level fields here.
_PRESERVE_OPTIONAL = ("ratifiedAt", "evidenceUpdatedAt", "scoreBasis")


class CuratedFieldLoss(Exception):
    """An EXISTING phase reached the rebuild without its curated completion-model fields.

    Defaulting here is what turns one bad generation into permanent data loss: the curated
    values live only in data.js, so a phase silently rebuilt as `bucket: "active", weight: 1`
    erases the held/conditional/placeholder/proposed scope model with no way back except a
    git archaeology dig. Refusing to render keeps the last good data.js on disk and on the
    live board. Raised by build_progress(); the CLI turns it into a clean exit-1 message.
    """


def _weight_is_valid(w) -> bool:
    """Curated weight must be a finite positive number. Bools are rejected explicitly:
    `True == 1` in Python, so a bool would otherwise pass every numeric comparison."""
    if isinstance(w, bool) or not isinstance(w, (int, float)):
        return False
    return w == w and w not in (float("inf"), float("-inf")) and w > 0


def _normalize_weight(w):
    """Curated weight must be a finite positive number; anything else -> 1 (v1 default).
    v1 ships all weights at 1 (flat average); the field is stored + validated, not yet
    activated as a weighted headline."""
    return w if _weight_is_valid(w) else 1


def _curated_problems(pid: str, cur: dict) -> list[str]:
    """Curated completion-model fields missing/invalid on an EXISTING phase record.

    `id` is not checked: it is derived deterministically from the ledger key, so a phase
    joined by number carries no information in it that could be lost.
    """
    problems = []
    if "bucket" not in cur:
        problems.append(f"{pid}: missing 'bucket'")
    elif cur["bucket"] not in VALID_BUCKETS:
        problems.append(f"{pid}: invalid bucket {cur['bucket']!r} "
                        f"(expected one of {sorted(VALID_BUCKETS)})")
    if "weight" not in cur:
        problems.append(f"{pid}: missing 'weight'")
    elif not _weight_is_valid(cur["weight"]):
        problems.append(f"{pid}: invalid weight {cur['weight']!r} (expected a positive number)")
    return problems


def build_progress(current_progress: dict, phases: list[dict],
                   *, allow_defaults: bool = False) -> dict:
    """Rebuild every phase from the ledger, carrying the curated fields through.

    A phase ABSENT from data.js is genuinely new and is seeded with the v1 defaults
    (`bucket: "active"`, `weight: 1`). A phase PRESENT but missing or corrupting those
    fields is field loss, not a new phase, and raises CuratedFieldLoss - see that class
    for why defaulting is the more dangerous option. `allow_defaults=True` restores the
    old permissive behaviour and exists only for a deliberate re-migration of records
    that never carried the schema (CLI: --allow-model-field-defaults).
    """
    cur_phases = current_progress.get("phases", [])
    # `id` is the primary join key; the phase-number parsed from `name` is the fallback
    # so the one-time migration (before any phase carries an explicit id) still matches.
    by_id = {p["id"]: p for p in cur_phases if p.get("id")}
    by_num = {_phase_num_of(p.get("name", "")): p for p in cur_phases}
    new_phases = []
    losses: list[str] = []
    for ph in phases:
        pid = f"P{ph['key']}"
        cur = by_id.get(pid) or by_num.get(ph["key"], {})
        status = ph["status"]
        band = STATUS_PCT.get(_status_key(status), STATUS_PCT.get(status, 0))
        pct = cur.get("pct", band)
        note = f"{status} — {ph['note']}" if ph["note"] else status
        if cur and not allow_defaults:
            losses.extend(_curated_problems(pid, cur))
        bucket = cur.get("bucket", "active")
        if bucket not in VALID_BUCKETS:  # unknown -> safe default; validator flags it
            bucket = "active"
        new_phase = {
            "id": cur.get("id", pid),
            "bucket": bucket,
            "weight": _normalize_weight(cur.get("weight", 1)),
            "name": f"P{ph['key']} {ph['name']}",
            "pct": pct,
            "note": note,
        }
        for k in _PRESERVE_OPTIONAL:
            if k in cur:
                new_phase[k] = cur[k]
        if cur.get("tasks"):
            new_phase["tasks"] = cur["tasks"]
        new_phases.append(new_phase)
    if losses:
        raise CuratedFieldLoss(
            "existing phases have lost their curated completion-model fields:\n  "
            + "\n  ".join(losses)
            + "\n\nThis is data loss, not a new phase: rebuilding them with defaults would "
              "silently relabel the scope model as all-active. Restore the curated fields in "
              "data.js first (e.g. `git checkout <last-good-rev> -- data.js`, or re-inject the "
              "fields from that revision) and re-run. Only pass --allow-model-field-defaults "
              "if these phases genuinely never carried the schema."
        )
    return {"label": current_progress.get("label", "Program phases"), "phases": new_phases}


def build_waves(waves: list[dict], updated: str, source: Path) -> dict:
    done = sum(1 for w in waves if w["status"] in ("SHIPPED", "CLOSED"))
    built = sum(1 for w in waves if w["status"] == "BUILT")
    in_flight = sum(1 for w in waves if w["status"] in ("ACTIVE", "PARTIAL"))
    ahead = sum(1 for w in waves if w["status"] in ("PLANNED", "PENDING", "SCOPE-LOCK"))

    def _terse(note: str, n: int = 160) -> str:
        return note if len(note) <= n else note[: n - 1].rstrip() + "…"

    # current = in-flight (ACTIVE/PARTIAL/BUILT) + next 1-2 PLANNED/SCOPE-LOCK, cap 6
    in_flight_rows = [w for w in waves if w["status"] in ("ACTIVE", "PARTIAL", "BUILT")]
    next_rows = [w for w in waves if w["status"] in ("PLANNED", "SCOPE-LOCK")][:2]
    current = []
    for w in (in_flight_rows + next_rows)[:6]:
        entry = {"id": w["id"], "title": w["title"], "status": w["status"]}
        if w["date"]:
            entry["date"] = w["date"]
        if w["note"]:
            entry["note"] = _terse(w["note"])
        current.append(entry)

    # lastCompleted = newest SHIPPED/CLOSED by date, tie-break highest wave id
    completed = [w for w in waves if w["status"] in ("SHIPPED", "CLOSED") and w["date"]]
    last = None
    if completed:
        def _idnum(s: str) -> float:
            try:
                return float(s)
            except ValueError:
                return -1.0
        completed.sort(key=lambda w: (w["date"], _idnum(w["id"])))
        top = completed[-1]
        last = {"id": top["id"], "title": top["title"], "date": top["date"]}

    drift = _wave_drift(waves)

    block = {
        "updated": updated,
        "source": str(source),
        "summary": {"done": done, "built": built, "inFlight": in_flight, "ahead": ahead},
        "current": current,
    }
    if last:
        block["lastCompleted"] = last
    block["drift"] = drift
    return block


def _wave_drift(waves: list[dict]) -> list[str]:
    """REFRESH-SPEC rule 5: tag cross-check. Zero wave-*-complete tags is current
    reality -> one informational note, no per-wave noise."""
    try:
        tags = subprocess.run(
            ["git", "-C", str(BIM_REPO), "tag", "--list", "wave-*-complete"],
            capture_output=True, text=True, check=True,
        ).stdout.split()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ["wave tag check unavailable (git not reachable at sync)"]
    if not tags:
        return ["no wave-*-complete tags in git; the ledger is the sole completion signal"]
    closed_ids = {w["id"] for w in waves if w["status"] in ("SHIPPED", "CLOSED")}
    notes = []
    for t in tags:
        wid = t.replace("wave-", "").replace("-complete", "")
        if wid not in closed_ids:
            notes.append(f"Wave {wid} tagged complete in git but ledger not SHIPPED/CLOSED — reconcile")
    return notes


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
# Ledger-derived per-phase fields (everything else on a phase is curated and preserved
# verbatim by build_progress, so it can never appear in a change summary).
_LEDGER_PHASE_FIELDS = ("name", "note", "pct")
_LEDGER_WAVE_FIELDS = ("summary", "updated", "current", "lastCompleted", "drift")


def summarize_changes(old_bim: dict, new_progress: dict, new_waves: dict) -> list[str]:
    """Name every ledger-derived field the render would rewrite, one line each.

    Operator-facing: `--check` prints this list so an OUT OF DATE verdict says WHICH
    phase/wave field lags the ledgers (a regenerated note, a renamed phase, a new wave
    summary) instead of the bare "(field-level changes in progress/waves)". Curated
    completion-model fields (id/bucket/weight/...) are never listed here because
    build_progress preserves them; their loss aborts the render earlier as
    CuratedFieldLoss, so a non-empty summary is pending regeneration, not corruption.
    """
    changes: list[str] = []
    old_phases = (old_bim.get("progress") or {}).get("phases", [])
    new_phases = new_progress["phases"]
    for old, new in zip(old_phases, new_phases):
        label = new.get("id") or new.get("name") or old.get("name") or "?"
        for field in _LEDGER_PHASE_FIELDS:
            if old.get(field) != new.get(field):
                if field == "name":
                    changes.append(f"phase name: {old.get('name')!r} -> {new.get('name')!r}")
                else:
                    changes.append(f"phase {label}: {field} changed")
    if len(old_phases) != len(new_phases):
        changes.append(f"phase count: {len(old_phases)} -> {len(new_phases)}")
    old_waves = old_bim.get("waves") or {}
    for field in _LEDGER_WAVE_FIELDS:
        if old_waves.get(field) != new_waves.get(field):
            if field == "summary":
                changes.append(f"wave summary: {old_waves.get('summary')} -> {new_waves['summary']}")
            elif field == "updated":
                changes.append(f"wave ledger date: {old_waves.get('updated')} -> {new_waves['updated']}")
            else:
                changes.append(f"wave {field} changed")
    return changes


def render(data_path: Path, phase_ledger: Path, wave_ledger: Path,
           *, allow_defaults: bool = False) -> tuple[str, str, list[str]]:
    """Return (current_data_js, new_data_js, change_summary)."""
    for p in (data_path, phase_ledger, wave_ledger):
        if not p.is_file():
            sys.exit(f"ERROR: missing input: {p}")

    data_js = data_path.read_text(encoding="utf-8")
    i, j, block = extract_block(data_js, "bimpossible")

    current = load_current(data_path)
    bim = next((pr for pr in current["projects"] if pr["id"] == "bimpossible"), None)
    if bim is None:
        sys.exit("ERROR: bimpossible project not found in data.js")

    phases = parse_phase_ledger(phase_ledger)
    waves, updated = parse_wave_ledger(wave_ledger)

    new_progress = build_progress(bim.get("progress") or {}, phases,
                                  allow_defaults=allow_defaults)
    new_waves = build_waves(waves, updated, wave_ledger)

    changes = summarize_changes(bim, new_progress, new_waves)

    new_block = apply_patch(block, {"progress": new_progress, "waves": new_waves},
                            serialize=compact_to_js)
    spliced = data_js[:i] + "\n    " + new_block + ",\n    " + data_js[j:]
    return data_js, spliced, changes


def main() -> int:
    ap = argparse.ArgumentParser(description="Render bimpossible phases+waves from the ledgers.")
    ap.add_argument("--data", default=str(DEFAULT_DATA))
    ap.add_argument("--phase-ledger", default=str(DEFAULT_PHASE_LEDGER))
    ap.add_argument("--wave-ledger", default=str(DEFAULT_WAVE_LEDGER))
    ap.add_argument("--check", action="store_true",
                    help="Exit 1 if data.js is out of date with the ledgers; write nothing.")
    ap.add_argument("--allow-model-field-defaults", action="store_true",
                    help="Seed bucket/weight defaults onto EXISTING phases that lack them. "
                         "Off by default: missing curated fields are data loss and abort the "
                         "render. Use only for a deliberate schema migration.")
    args = ap.parse_args()

    # Scheduled runs redirect stdout to a log whose encoding may be cp1252; ledger
    # names carry em-dashes. Never let a print() crash the sync on an encode error.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass

    data_path = Path(args.data)
    try:
        data_js, spliced, changes = render(
            data_path, Path(args.phase_ledger), Path(args.wave_ledger),
            allow_defaults=args.allow_model_field_defaults,
        )
    except CuratedFieldLoss as exc:
        sys.exit(f"ERROR: refusing to render — {exc}")

    if not node_check(spliced):
        sys.exit("ERROR: rendered data.js failed `node --check` — refusing to write.")

    if spliced == data_js:
        print("Ledger sync: data.js already matches the ledgers.")
        return 0

    if args.check:
        print("Ledger sync: data.js is OUT OF DATE with the ledgers:")
        for c in changes or ["(field-level changes in progress/waves)"]:
            print(f"  - {c}")
        return 1

    data_path.write_text(spliced, encoding="utf-8")
    print("Ledger sync: updated progress + waves from the ledgers.")
    for c in changes or ["(field-level changes in progress/waves)"]:
        print(f"  - {c}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
