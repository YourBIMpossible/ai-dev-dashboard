"""Tests for check_live_boundary.py: the content-based (not status-based) live boundary check.

Runs against a throwaway local HTTP server and a throwaway git repo; never touches the network
or the real site. Also pins the simulated upload manifest of the real repo.
Run: python -m pytest -q test_check_live_boundary.py
"""
from __future__ import annotations

import http.server
import subprocess
import threading
from pathlib import Path

import pytest

import check_live_boundary as clb

INDEX = b"<html>index</html>\n"
DATA = b"window.DATA = {};\n"
SECRET = b"operational-detail-that-must-not-be-public\n"


def _repo(tmp_path: Path) -> Path:
    root = tmp_path / "repo"
    root.mkdir()
    g = lambda *a: subprocess.run(["git", "-C", str(root), *a], check=True, capture_output=True)
    g("init", "-q")
    g("config", "user.email", "t@example.invalid")
    g("config", "user.name", "t")
    (root / "index.html").write_bytes(INDEX)
    (root / "data.js").write_bytes(DATA)
    (root / "ops.ps1").write_bytes(SECRET)
    g("add", ".")
    g("commit", "-q", "-m", "x")
    return root


class _Server:
    def __init__(self, mode: str):
        files = {"/index.html": INDEX, "/data.js": DATA}
        if mode == "leak":
            files["/ops.ps1"] = SECRET
        spa = mode != "404"

        class H(http.server.BaseHTTPRequestHandler):
            def do_GET(self):  # noqa: N802
                path = self.path.split("?")[0]
                body = files.get(path)
                if body is None and spa:
                    body = INDEX  # SPA fallback: unknown path -> 200 + index.html
                if body is None:
                    self.send_response(404); self.end_headers(); return
                self.send_response(200); self.end_headers(); self.wfile.write(body)

            def log_message(self, *a):
                pass

        self.srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
        self.url = f"http://127.0.0.1:{self.srv.server_address[1]}"
        threading.Thread(target=self.srv.serve_forever, daemon=True).start()

    def close(self):
        self.srv.shutdown()
        self.srv.server_close()


@pytest.fixture
def repo(tmp_path):
    return _repo(tmp_path)


def _run(root, mode, excluded, positives=("index.html", "data.js")):
    s = _Server(mode)
    try:
        return {r.path: r for r in clb.run_live(s.url, list(excluded), list(positives), root)}
    finally:
        s.close()


def test_spa_fallback_200_is_not_a_leak(repo):
    res = _run(repo, "spa", ["ops.ps1"])
    assert res["ops.ps1"].ok and "fallback" in res["ops.ps1"].detail
    assert res["index.html"].ok and res["data.js"].ok


def test_plain_404_is_not_a_leak(repo):
    res = _run(repo, "404", ["ops.ps1"])
    assert res["ops.ps1"].ok and "404" in res["ops.ps1"].detail


def test_published_file_is_detected_even_with_200(repo):
    res = _run(repo, "leak", ["ops.ps1"])
    assert not res["ops.ps1"].ok and "PUBLISHED" in res["ops.ps1"].detail


def test_probe_only_path_with_unexplained_200_fails(repo):
    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            body = b"[core]\n" if self.path.startswith("/.git/config") else INDEX
            self.send_response(200); self.end_headers(); self.wfile.write(body)

        def log_message(self, *a):
            pass

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        res = {r.path: r for r in clb.run_live(f"http://127.0.0.1:{srv.server_address[1]}",
                                                [".git/config"], ["index.html"], repo)}
    finally:
        srv.shutdown(); srv.server_close()
    assert not res[".git/config"].ok and "unexplained" in res[".git/config"].detail


def test_positive_control_that_returns_fallback_fails(repo):
    # Server that 200s index for everything: a positive control for data.js must NOT pass.
    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            self.send_response(200); self.end_headers(); self.wfile.write(INDEX)

        def log_message(self, *a):
            pass

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        res = {r.path: r for r in clb.run_live(f"http://127.0.0.1:{srv.server_address[1]}",
                                                [], ["index.html", "data.js"], repo)}
    finally:
        srv.shutdown(); srv.server_close()
    assert res["index.html"].ok
    assert not res["data.js"].ok and "fallback" in res["data.js"].detail


def test_unreachable_host_is_unverified_not_pass(repo):
    with pytest.raises(clb.NetworkError):
        clb.fetch("http://127.0.0.1:9", "index.html", timeout=1)


def test_manifest_of_real_repo_has_no_local_and_keeps_core_files():
    files = {m["path"] for m in clb.upload_manifest(clb.REPO)}
    assert files, "empty upload manifest"
    assert not [f for f in files if f.startswith("local/")]
    assert {"index.html", "data.js"} <= files
    assert "_headers" not in files and not [f for f in files if f.startswith("functions/")]


def _status_server(code: int):
    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            path = self.path.split("?")[0]
            if path in ("/index.html", "/data.js"):
                self.send_response(200); self.end_headers()
                self.wfile.write(INDEX if path == "/index.html" else DATA)
            elif path.startswith("/ops"):
                self.send_response(code); self.end_headers()
            else:
                self.send_response(200); self.end_headers(); self.wfile.write(INDEX)

        def log_message(self, *a):
            pass

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


@pytest.mark.parametrize("code", [429, 500, 502, 503, 401, 403])
def test_non_404_error_status_on_excluded_path_is_unverified_not_pass(repo, code):
    srv = _status_server(code)
    try:
        with pytest.raises(clb.NetworkError):
            clb.run_live(f"http://127.0.0.1:{srv.server_address[1]}", ["ops.ps1"], ["index.html"], repo)
    finally:
        srv.shutdown(); srv.server_close()


@pytest.mark.parametrize("code", [404, 410])
def test_absent_statuses_pass(repo, code):
    srv = _status_server(code)
    try:
        res = {r.path: r for r in clb.run_live(f"http://127.0.0.1:{srv.server_address[1]}",
                                                ["ops.ps1"], ["index.html"], repo)}
    finally:
        srv.shutdown(); srv.server_close()
    assert res["ops.ps1"].ok and str(code) in res["ops.ps1"].detail


def test_request_path_is_percent_encoded():
    seen: list[str] = []

    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            seen.append(self.path)
            self.send_response(404); self.end_headers()

        def log_message(self, *a):
            pass

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        clb.fetch(f"http://127.0.0.1:{srv.server_address[1]}", "dir/we ird#frag%41.txt")
    finally:
        srv.shutdown(); srv.server_close()
    # '#' and '%' are escaped so they are part of the path, not a fragment / escape sequence
    assert seen[0].startswith("/dir/we%20ird%23frag%2541.txt?cb=")
