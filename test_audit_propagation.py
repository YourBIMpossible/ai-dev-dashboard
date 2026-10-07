"""Audit accounting categories must survive reconciliation -> data.js regeneration.

docs/COVERAGE-AND-DISCLOSURE-POLICY.md section 1: every finding sits in one of open /
awaiting / resolved / unknown; historical closures live in `carriedClosedCounts`, outside
the active-baseline arithmetic. `audit_fields()` must never drop an existing category on
regeneration and must never promote historical closures into this cycle's `closedLastRun`.

Run: python -m pytest -q test_audit_propagation.py
"""
from __future__ import annotations

import json
import shutil
import subprocess

import pytest

import reconcile_audit as ra
import validate_dashboard as vd

SEV0 = {"critical": 0, "high": 0, "medium": 0, "low": 0, "info": 0}


def hist(**kw):
    return {**SEV0, **kw}


def f(fid, sev="low"):
    return {"id": fid, "sev": sev, "title": fid, "source": "r.md"}


def result(*, open_=(), awaiting=(), resolved=(), unknown=(), status="success",
           detail="reconciled against origin/main abc1234."):
    raw = [*open_, *awaiting, *resolved, *unknown]
    return ra.ReconcileResult(
        project="p", report_date="2026-10-05", reconciled_at="2026-10-06 00:00:00",
        heads=[{"repo": "r", "head": "abc1234", "inspected": True}], raw=raw,
        open_findings=list(open_), unknown_findings=list(unknown),
        resolved_findings=list(resolved), evidence={}, rejected={},
        status=status, detail=detail, awaiting_findings=list(awaiting))


CARRIED = hist(medium=3, low=6)


class TestAuditFieldsCarriedClosed:
    def test_no_prior_emits_no_carried_key(self):
        # the public key set is unchanged for a first ingest (nothing invented)
        assert "carriedClosedCounts" not in result(open_=[f("A")]).audit_fields()

    def test_prior_carried_is_preserved(self):
        af = result(open_=[f("A")]).audit_fields(prior={"carriedClosedCounts": CARRIED})
        assert af["carriedClosedCounts"] == CARRIED

    def test_prior_carried_is_a_copy(self):
        prior = {"carriedClosedCounts": dict(CARRIED)}
        af = result().audit_fields(prior=prior)
        af["carriedClosedCounts"]["low"] = 99
        assert prior["carriedClosedCounts"]["low"] == 6

    def test_carried_never_inflates_closed_last_run(self):
        r = result(resolved=[f("R1")])
        af = r.audit_fields(prior={"carriedClosedCounts": CARRIED})
        assert af["closedLastRun"] == 1            # this cycle's verified closures only
        assert af["resolvedCounts"]["low"] == 1    # carried is NOT folded into resolved
        assert af["rawCounts"]["low"] == 1         # nor into the active-baseline raw

    def test_carried_outside_the_active_arithmetic(self):
        r = result(open_=[f("A")], awaiting=[f("B")], resolved=[f("C")], unknown=[f("D")])
        af = r.audit_fields(prior={"carriedClosedCounts": CARRIED})
        for sev in vd.SEVERITIES:
            assert af["rawCounts"][sev] == sum(
                af[k][sev] for k in ("openCounts", "awaitingIntegrationCounts",
                                     "resolvedCounts", "unknownCounts"))

    def test_other_categories_survive_regeneration(self):
        r = result(open_=[f("A")], awaiting=[f("B", "high")], unknown=[f("D")],
                   status="partial", detail="repo r unreadable")
        af = r.audit_fields(prior={"carriedClosedCounts": CARRIED})
        assert af["awaitingIntegrationCounts"]["high"] == 1
        assert af["unknownCounts"]["low"] == 1
        assert [u["id"] for u in af["unknown"]] == ["D"]
        assert af["ingestStatus"] == "partial" and af["ingestDetail"] == "repo r unreadable"

    def test_regenerated_card_passes_the_validator(self):
        r = result(open_=[f("A")], awaiting=[f("B")], resolved=[f("C")], unknown=[f("D")])
        a = r.audit_fields(prior={"carriedClosedCounts": CARRIED})
        a["trend"] = "unknown"
        assert vd.audit_accounting_problems([{"id": "p", "audit": a}]) == []


@pytest.mark.skipif(shutil.which("node") is None, reason="node required for write_back")
class TestWriteBack:
    DATA = """window.DASHBOARD_DATA = {
  projects: [
    /* PROJECT:p:START */
    {
      id: "p",
      name: "P",
      audit: {
        lastRun: "2026-10-04",
        trend: "improving",
        closedLastRun: 9,
        reportPath: "x.md",
        carriedClosedCounts: { critical: 0, high: 0, medium: 3, low: 6, info: 0 },
        history: [{ date: "2026-10-04", result: "kept" }]
      }
    },
    /* PROJECT:p:END */
  ]
};
"""

    def _run(self, tmp_path, monkeypatch, res):
        dj = tmp_path / "data.js"
        dj.write_text(self.DATA, encoding="utf-8")
        monkeypatch.setattr(ra, "LOCAL_DIR", tmp_path / "local")
        ra.write_back(res, data_path=dj)
        dump = ("global.window={};require(" + json.dumps(str(dj).replace("\\", "/")) + ");"
                "process.stdout.write(JSON.stringify(window.DASHBOARD_DATA.projects[0].audit))")
        out = subprocess.run(["node", "-e", dump], check=True, capture_output=True,
                             encoding="utf-8").stdout
        return json.loads(out)

    def test_carried_and_curated_fields_survive_write_back(self, tmp_path, monkeypatch):
        a = self._run(tmp_path, monkeypatch,
                      result(open_=[f("A")], awaiting=[f("B")], resolved=[f("C")]))
        assert a["carriedClosedCounts"] == CARRIED
        assert a["closedLastRun"] == 1             # not 9, not 1 + 9
        assert a["awaitingIntegrationCounts"]["low"] == 1
        assert a["history"] == [{"date": "2026-10-04", "result": "kept"}]
        assert a["trend"] == "improving"           # curated field untouched here
