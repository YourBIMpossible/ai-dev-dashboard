"""Deploy-boundary regression checks (closeout 2026-10-06).

What is verified here, and what is deliberately NOT claimed:

* The supported deploy is `.github/workflows/deploy.yml`: a clean `actions/checkout`
  followed by `wrangler pages deploy .`. Only tracked files exist on that runner, so the
  upload set is `git ls-files` minus Wrangler's own hard-coded Pages ignore list.
* `.assetsignore` is NOT part of that rule. `wrangler pages deploy` (verified in wrangler
  4.110.0, `pages/validate`) walks the directory with a fixed IGNORE_LIST and reads neither
  `.assetsignore` nor `.gitignore`; `.assetsignore` is a Workers-static-assets mechanism. The
  live site serving `*.py` and `.github/**` confirms it. Do not assert on `.assetsignore`.
* A manual working-tree `wrangler pages deploy .` WOULD upload `local/` (untracked and
  gitignored, but neither file is honoured). The guard against that is procedural (never
  deploy from a working tree) plus the checks below, not a mechanism.

Private-evidence checks derive their probe strings at run time from the private evidence
folder (outside the repo); nothing private is hard-coded here. They skip when that folder is
absent (for example on CI).
"""
from __future__ import annotations

import os
import re
import subprocess
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parent

PRIVATE_EVIDENCE_DIR = Path(
    os.environ.get(
        "DASHBOARD_PRIVATE_EVIDENCE_DIR",
        "F:/Claude-Tools/reports/private/2026-10-06__dashboard-closeout-private-evidence",
    )
)

# Mirror of wrangler 4.110.0 `pages deploy` validate() IGNORE_LIST.
WRANGLER_PAGES_IGNORED_TOP = {"_worker.js", "_redirects", "_headers", "_routes.json", "functions", ".wrangler"}
WRANGLER_PAGES_IGNORED_ANYWHERE = {".DS_Store", "node_modules", ".git"}

MIN_PROBE_LEN = 30
MAX_SCAN_BYTES = 8 * 1024 * 1024


def _git(root: Path, *args: str) -> str:
    res = subprocess.run(
        ["git", "-C", str(root), *args],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if res.returncode not in (0, 1):  # check-ignore uses 1 for "not ignored"
        raise RuntimeError(f"git {' '.join(args)} failed ({res.returncode}): {res.stderr.strip()}")
    return res.stdout


def _lines(out: str) -> list[str]:
    return [ln for ln in out.split("\n") if ln.strip()]


def wrangler_would_skip(rel: str) -> bool:
    parts = rel.replace("\\", "/").split("/")
    if parts[0] in WRANGLER_PAGES_IGNORED_TOP:
        return True
    return any(p in WRANGLER_PAGES_IGNORED_ANYWHERE for p in parts)


def clean_checkout_upload_set(root: Path) -> list[str]:
    """Files a clean-checkout `wrangler pages deploy .` uploads."""
    return [f for f in _lines(_git(root, "ls-files")) if not wrangler_would_skip(f)]


def tracked_under_local(root: Path) -> list[str]:
    return [f for f in _lines(_git(root, "ls-files")) if f.replace("\\", "/").startswith("local/")]


def local_is_gitignored(root: Path) -> bool:
    res = subprocess.run(
        ["git", "-C", str(root), "check-ignore", "-q", "local/_probe_deploy_boundary"],
        capture_output=True,
    )
    return res.returncode == 0


def candidate_files(root: Path) -> list[Path]:
    """Tracked + untracked-not-ignored files + everything under local/ (what a
    working-tree deploy would add that a clean checkout would not)."""
    rels = set(_lines(_git(root, "ls-files")))
    rels |= set(_lines(_git(root, "ls-files", "--others", "--exclude-standard")))
    out = [root / r for r in sorted(rels)]
    local = root / "local"
    if local.is_dir():
        for dirpath, dirnames, filenames in os.walk(local):
            dirnames[:] = [d for d in dirnames if d not in WRANGLER_PAGES_IGNORED_ANYWHERE]
            out.extend(Path(dirpath) / f for f in filenames)
    seen: set[Path] = set()
    uniq = []
    for p in out:
        if p not in seen:
            seen.add(p)
            uniq.append(p)
    return uniq


def derive_probes(private_dir: Path) -> list[str]:
    probes: list[str] = []
    for f in sorted(private_dir.glob("*.md")):
        for raw in f.read_text(encoding="utf-8", errors="replace").splitlines():
            line = raw.strip()
            if len(line) < MIN_PROBE_LEN or line.startswith(("#", "```")):
                continue
            probes.append(line)
    return probes


def find_probe_hits(root: Path, probes: list[str]) -> list[str]:
    """Return repo-relative paths (never the matched text) containing any probe."""
    hits: list[str] = []
    for p in candidate_files(root):
        try:
            if not p.is_file() or p.stat().st_size > MAX_SCAN_BYTES:
                continue
            text = p.read_bytes().decode("utf-8", "ignore")
        except OSError:
            continue
        if any(pr in text for pr in probes):
            hits.append(p.relative_to(root).as_posix())
    return hits


# --------------------------------------------------------------------------- real repo


def test_local_dir_is_gitignored():
    assert local_is_gitignored(REPO), "local/ must stay in .gitignore (private audit enrichment)"


def test_no_tracked_file_under_local():
    assert tracked_under_local(REPO) == []


def test_clean_checkout_upload_set_excludes_local():
    upload = clean_checkout_upload_set(REPO)
    assert upload, "upload set unexpectedly empty"
    assert not [f for f in upload if f.startswith("local/")]


def test_old_private_evidence_location_is_gone():
    assert not (REPO / "local" / "closeout-private-evidence").exists()


def test_only_supported_deploy_path_invokes_pages_deploy():
    """deploy.yml is a clean-checkout deploy and nothing else tracked deploys."""
    wf = (REPO / ".github" / "workflows" / "deploy.yml").read_text(encoding="utf-8")
    assert "actions/checkout" in wf
    assert re.search(r"pages deploy \.", wf)
    pat = re.compile(r"pages\s+deploy|wrangler\s+(pages|deploy)", re.I)
    offenders = []
    for f in _lines(_git(REPO, "ls-files")):
        if f == ".github/workflows/deploy.yml" or f.startswith("test_deploy_boundary"):
            continue
        if not f.lower().endswith((".ps1", ".cmd", ".bat", ".sh", ".yml", ".yaml", ".py", ".mjs", ".js")):
            continue
        try:
            text = (REPO / f).read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        if pat.search(text):
            offenders.append(f)
    assert offenders == [], f"unexpected deploy invocations: {offenders}"


def test_private_evidence_text_absent_from_upload_candidates():
    if not PRIVATE_EVIDENCE_DIR.is_dir():
        pytest.skip("private evidence folder not present on this machine")
    probes = derive_probes(PRIVATE_EVIDENCE_DIR)
    if not probes:
        pytest.skip("private evidence folder has no probe-able lines")
    hits = find_probe_hits(REPO, probes)
    assert hits == [], f"private evidence text found in upload candidates: {hits}"


# ------------------------------------------------------------- self-tests (red cases)


def _init_repo(tmp_path: Path, gitignore: str) -> Path:
    root = tmp_path / "repo"
    root.mkdir()
    subprocess.run(["git", "-C", str(root), "init", "-q"], check=True)
    (root / ".gitignore").write_text(gitignore, encoding="utf-8")
    (root / "index.html").write_text("<html></html>\n", encoding="utf-8")
    (root / "local").mkdir()
    return root


def _track(root: Path, *rels: str) -> None:
    subprocess.run(["git", "-C", str(root), "add", "-f", *rels], check=True)


PROBE = "synthetic-private-line-for-the-boundary-selftest-0001"


def test_selftest_detects_unignored_local(tmp_path):
    root = _init_repo(tmp_path, "")
    assert not local_is_gitignored(root)


def test_selftest_detects_tracked_file_under_local(tmp_path):
    root = _init_repo(tmp_path, "local/\n")
    (root / "local" / "x.md").write_text("x", encoding="utf-8")
    _track(root, "local/x.md")
    assert tracked_under_local(root) == ["local/x.md"]
    assert [f for f in clean_checkout_upload_set(root) if f.startswith("local/")] == ["local/x.md"]


def test_selftest_detects_probe_in_ignored_local_dir(tmp_path):
    root = _init_repo(tmp_path, "local/\n")
    assert local_is_gitignored(root)
    (root / "local" / "leak.md").write_text(f"before\n{PROBE}\nafter\n", encoding="utf-8")
    assert find_probe_hits(root, [PROBE]) == ["local/leak.md"]


def test_selftest_detects_probe_in_untracked_unignored_file(tmp_path):
    root = _init_repo(tmp_path, "local/\n")
    (root / "stray.txt").write_text(PROBE, encoding="utf-8")
    assert find_probe_hits(root, [PROBE]) == ["stray.txt"]


def test_selftest_clean_repo_has_no_hits(tmp_path):
    root = _init_repo(tmp_path, "local/\n")
    _track(root, ".gitignore", "index.html")
    assert find_probe_hits(root, [PROBE]) == []


def test_wrangler_ignore_mirror():
    assert wrangler_would_skip("functions/api/x.js")
    assert wrangler_would_skip("_headers")
    assert wrangler_would_skip("a/node_modules/b.js")
    assert wrangler_would_skip(".wrangler/cache/x")
    assert not wrangler_would_skip("local/x.md")  # NOT ignored by wrangler: the known limitation
    assert not wrangler_would_skip(".github/workflows/deploy.yml")
    assert not wrangler_would_skip("reconcile_audit.py")  # .assetsignore does not apply to Pages
