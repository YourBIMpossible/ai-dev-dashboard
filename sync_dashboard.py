#!/usr/bin/env python3
"""
Splice/patch/validate machinery for the AI-Dev dashboard's data.js.

This module is a library, not a CLI. Its former CLI entry point drove a
GitHub Models (free-tier LLM) prose sync; GitHub retired GitHub Models on
2026-07-30 and the calling workflow was deleted, so that code is gone.

What remains — and is actively imported by sync_ledgers.py, sync_activity.py,
validate_dashboard.py, and the dashboard-update skill's manual patch flow:

1. extract_block() pulls the CURRENT project block out of data.js using the
   managed markers
       /* PROJECT:<id>:START */  ...  /* PROJECT:<id>:END */
2. apply_patch() applies a {field: new_value} patch deterministically: each
   changed top-level field's value-span is replaced in place; every untouched
   field stays byte-for-byte. Keys not present in the block are skipped.
3. node_check() validates the spliced file with `node --check` so a bad patch
   can never ship a broken dashboard.

Only the targeted project's block is ever touched, and within it only the
patched fields, so updating one card can never clobber another.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import tempfile

# Fields the LLM bot is NEVER allowed to write, because a deterministic source owns
# each one (one writer per field => nothing fights):
#   - progress / waves      : sync_ledgers.py renders these from the PHASE-STATUS /
#                             WAVE-STATUS ledgers. A weak free-tier model re-deriving
#                             phase numbering from prose produced the historical
#                             "P7 = Model QA" drift, so it is hard-blocked, not merely
#                             discouraged in the prompt.
#   - activity / lastActivity: sync_activity.py fills these from real git history
#                             (gh api). The model must not invent or stale-overwrite
#                             the freshness signal. (Added 2026-06-27 with the activity
#                             scan, which fixed cards sitting ~2 weeks stale.)
# See REFRESH-SPEC.md "Phase status ingestion".
PROTECTED_FIELDS = {"progress", "waves", "activity", "lastActivity"}


def extract_block(data_js: str, project_id: str) -> tuple[int, int, str]:
    start = f"/* PROJECT:{project_id}:START */"
    end = f"/* PROJECT:{project_id}:END */"
    if start not in data_js or end not in data_js:
        sys.exit(f"ERROR: markers for project '{project_id}' not found in data.js")
    i = data_js.index(start) + len(start)
    j = data_js.index(end)
    return i, j, data_js[i:j].strip().rstrip(",").strip()


def _is_ident(key: str) -> bool:
    return bool(re.match(r"^[A-Za-z_]\w*$", key))


def to_js(value, indent: int) -> str:
    """Serialize a JSON value to a JS literal with UNQUOTED identifier keys, matching
    data.js style closely enough to pass `node --check`. `indent` is the column the
    value's closing bracket sits at; children indent two further."""
    pad = " " * indent
    child = " " * (indent + 2)
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, bool) or value is None:
        return json.dumps(value)
    if isinstance(value, (int, float)):
        return json.dumps(value)
    if isinstance(value, list):
        if not value:
            return "[]"
        # Inline pure-number arrays (e.g. activity: [31,45,...]); everything else
        # goes multi-line to match the curated string/object arrays.
        if all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in value):
            return "[" + ",".join(json.dumps(x) for x in value) + "]"
        items = [child + to_js(x, indent + 2) for x in value]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    if isinstance(value, dict):
        if not value:
            return "{}"
        parts = []
        for key, val in value.items():
            jskey = key if _is_ident(key) else json.dumps(key)
            parts.append(f"{child}{jskey}: {to_js(val, indent + 2)}")
        return "{\n" + ",\n".join(parts) + "\n" + pad + "}"
    return json.dumps(value, ensure_ascii=False)


_TOPKEY_RE = re.compile(r"(?m)^( {6})(\w+):")
_VALUE_RE = re.compile(r"(?s)^(\s*)(.*?)(,?)(\s*)$")


def _field_spans(block: str) -> list[tuple[str, int, int]]:
    """(name, start, end) for each top-level field's full `key: value` span inside
    `block`, using the same _TOPKEY_RE shape apply_patch relies on."""
    open_i = block.index("{")
    close_i = block.rfind("}")
    body = block[open_i + 1:close_i]
    matches = list(_TOPKEY_RE.finditer(body))
    spans = []
    for k, m in enumerate(matches):
        end = matches[k + 1].start() if k + 1 < len(matches) else len(body)
        spans.append((m.group(2), open_i + 1 + m.start(), open_i + 1 + end))
    return spans


def apply_patch(block: str, patch: dict, serialize=to_js) -> str:
    """Replace the values of changed top-level fields in `block` (a JS object literal
    `{ ... }`) with serialized values from `patch`. Untouched fields are preserved
    byte-for-byte. Keys the model invents (not already in the block) are skipped.

    `serialize(value, indent)` controls JS rendering; defaults to the verbose `to_js`.
    The deterministic ledger sync passes a compact serializer to keep diffs small."""
    open_i = block.index("{")
    close_i = block.rfind("}")
    body = block[open_i + 1:close_i]

    matches = list(_TOPKEY_RE.finditer(body))
    if not matches:
        sys.exit("ERROR: no top-level fields found in project block")
    known = {m.group(2) for m in matches}
    for key in patch:
        if key not in known:
            print(f"  (skip) model returned unknown top-level field: {key}", file=sys.stderr)

    out, cursor = [], 0
    for idx, m in enumerate(matches):
        key = m.group(2)
        val_start = m.end()
        val_end = matches[idx + 1].start() if idx + 1 < len(matches) else len(body)
        out.append(body[cursor:val_start])        # leading ws + "key:"
        raw = body[val_start:val_end]             # " value,\n      " (incl. comma/ws)
        if key in patch:
            vm = _VALUE_RE.match(raw)
            lead, _old, comma, trail = vm.group(1), vm.group(2), vm.group(3), vm.group(4)
            out.append(lead + serialize(patch[key], 6) + comma + trail)
        else:
            out.append(raw)
        cursor = val_end

    return block[:open_i + 1] + "".join(out) + block[close_i:]


def node_check(data_js: str) -> bool:
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as fh:
        fh.write(data_js)
        tmp = fh.name
    try:
        result = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
        if result.returncode != 0:
            print(result.stderr.strip(), file=sys.stderr)
        return result.returncode == 0
    finally:
        os.unlink(tmp)
