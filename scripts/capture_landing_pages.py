#!/usr/bin/env python3
import base64
import hashlib
import json
import socket
import struct
import subprocess
import time
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "landing-captures"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9229
WIDTH = 1440
PAGES = [
    ("radio-music-a", "http://192.168.4.65:4000/landing/radio-music-a/"),
    ("radio-music-b", "http://192.168.4.65:4000/landing/radio-music-b/"),
    ("radio-music-c", "http://192.168.4.65:4000/landing/radio-music-c/"),
    ("radio-music-d", "http://192.168.4.65:4000/landing/radio-music-d/"),
    ("8mu-a", "http://192.168.4.65:4000/landing/8mu-a/"),
    ("8mu-b", "http://192.168.4.65:4000/landing/8mu-b/"),
    ("8mu-c", "http://192.168.4.65:4000/landing/8mu-c/"),
    ("8mu-d", "http://192.168.4.65:4000/landing/8mu-d/"),
]


class CDP:
    def __init__(self, ws_url):
        assert ws_url.startswith("ws://")
        rest = ws_url[5:]
        hostport, path = rest.split("/", 1)
        host, port = hostport.split(":")
        self.sock = socket.create_connection((host, int(port)), timeout=10)
        key = base64.b64encode(b"codex-landing-captures").decode()
        request = (
            f"GET /{path} HTTP/1.1\r\n"
            f"Host: {hostport}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(request.encode())
        response = self.sock.recv(4096)
        if b"101" not in response.split(b"\r\n", 1)[0]:
            raise RuntimeError(response.decode("utf-8", "replace"))
        self.next_id = 1

    def _recv_exact(self, n):
        data = b""
        while len(data) < n:
            chunk = self.sock.recv(n - len(data))
            if not chunk:
                raise RuntimeError("websocket closed")
            data += chunk
        return data

    def _read_frame(self):
        header = self._recv_exact(2)
        b1, b2 = header
        length = b2 & 0x7F
        if length == 126:
            length = struct.unpack("!H", self._recv_exact(2))[0]
        elif length == 127:
            length = struct.unpack("!Q", self._recv_exact(8))[0]
        if b2 & 0x80:
            mask = self._recv_exact(4)
            payload = bytes(c ^ mask[i % 4] for i, c in enumerate(self._recv_exact(length)))
        else:
            payload = self._recv_exact(length)
        opcode = b1 & 0x0F
        if opcode == 8:
            raise RuntimeError("websocket closed")
        if opcode != 1:
            return None
        return json.loads(payload.decode())

    def _send_frame(self, payload):
        raw = payload.encode()
        mask = hashlib.sha1(raw + b"codex").digest()[:4]
        if len(raw) < 126:
            header = bytes([0x81, 0x80 | len(raw)])
        elif len(raw) < 65536:
            header = bytes([0x81, 0x80 | 126]) + struct.pack("!H", len(raw))
        else:
            header = bytes([0x81, 0x80 | 127]) + struct.pack("!Q", len(raw))
        masked = bytes(c ^ mask[i % 4] for i, c in enumerate(raw))
        self.sock.sendall(header + mask + masked)

    def call(self, method, params=None, timeout=20):
        msg_id = self.next_id
        self.next_id += 1
        self._send_frame(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
        deadline = time.time() + timeout
        while time.time() < deadline:
            msg = self._read_frame()
            if not msg:
                continue
            if msg.get("id") == msg_id:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})
        raise TimeoutError(method)

    def close(self):
        self.sock.close()


def http_json(path, method="GET"):
    request = urllib.request.Request(f"http://127.0.0.1:{PORT}{path}", method=method)
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.loads(response.read().decode())


def wait_for_chrome():
    deadline = time.time() + 15
    while time.time() < deadline:
        try:
            http_json("/json/version")
            return
        except Exception:
            time.sleep(0.25)
    raise TimeoutError("Chrome debugging port did not become ready")


def capture_page(name, url):
    target = http_json(f"/json/new?{urllib.parse.quote(url, safe=':/?&=')}", method="PUT")
    cdp = CDP(target["webSocketDebuggerUrl"])
    try:
        cdp.call("Page.enable")
        cdp.call("Runtime.enable")
        cdp.call("Emulation.setDeviceMetricsOverride", {
            "width": WIDTH,
            "height": 900,
            "deviceScaleFactor": 1,
            "mobile": False,
        })
        cdp.call("Page.navigate", {"url": url})
        deadline = time.time() + 20
        while time.time() < deadline:
            state = cdp.call("Runtime.evaluate", {
                "expression": "document.readyState",
                "returnByValue": True,
            })["result"].get("value")
            if state == "complete":
                break
            time.sleep(0.25)
        time.sleep(1)
        metrics = cdp.call("Runtime.evaluate", {
            "expression": "Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight))",
            "returnByValue": True,
        })
        height = int(metrics["result"]["value"])
        cdp.call("Emulation.setDeviceMetricsOverride", {
            "width": WIDTH,
            "height": height,
            "deviceScaleFactor": 1,
            "mobile": False,
        })
        png = cdp.call("Page.captureScreenshot", {
            "format": "png",
            "captureBeyondViewport": True,
            "fromSurface": True,
            "clip": {"x": 0, "y": 0, "width": WIDTH, "height": height, "scale": 1},
        }, timeout=60)["data"]
        out = OUT_DIR / f"{name}.png"
        out.write_bytes(base64.b64decode(png))
        print(f"{out} {WIDTH}x{height}")
    finally:
        cdp.close()
        try:
            http_json(f"/json/close/{target['id']}", method="PUT")
        except Exception:
            pass


def main():
    OUT_DIR.mkdir(exist_ok=True)
    user_data = Path("/tmp/codex-landing-capture-chrome")
    user_data.mkdir(exist_ok=True)
    proc = subprocess.Popen([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "about:blank",
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        wait_for_chrome()
        for name, url in PAGES:
            capture_page(name, url)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


if __name__ == "__main__":
    import urllib.parse
    main()
