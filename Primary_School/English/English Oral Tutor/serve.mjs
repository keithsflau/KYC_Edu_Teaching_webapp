/**
 * Local static server + Edge Neural TTS proxy for English Oral Tutor.
 *
 * Why: Chrome cannot set User-Agent / Origin on browser WebSockets, so
 * speech.platform.bing.com returns 403. This proxy speaks to Bing with an
 * Edge UA so Neural TTS works in Chrome on localhost.
 *
 * Usage:
 *   npm install
 *   npm start
 *   open http://127.0.0.1:8765/index.html
 *
 * Endpoints:
 *   GET  /api/edge-tts/health  → { ok: true }
 *   POST /api/edge-tts         → body { text, voice } → audio/mpeg
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { WebSocket } from "ws";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8765);
const HOST = process.env.HOST || "127.0.0.1";

const TRUSTED = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WSS =
  "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
const VERSION = "1-143.0.3650.75";
const DEFAULT_VOICE = "en-US-AriaNeural";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".woff2": "font/woff2",
};

function gec() {
  let ticks = Math.floor(Date.now() / 1000) + 11644473600;
  ticks -= ticks % 300;
  const windowsTicks = ticks * 10_000_000;
  return crypto
    .createHash("sha256")
    .update(String(windowsTicks) + TRUSTED)
    .digest("hex")
    .toUpperCase();
}

function edgeDateString() {
  const d = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${days[d.getUTCDay()]} ${months[d.getUTCMonth()]} ${pad(d.getUTCDate())} ` +
    `${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} ` +
    "GMT+0000 (Coordinated Universal Time)"
  );
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function extractAudio(buf) {
  if (buf.length < 2) return null;
  const headerLength = buf.readUInt16BE(0);
  if (headerLength + 2 > buf.length) return null;
  const header = buf.slice(2, 2 + headerLength).toString("utf8");
  if (!/Path:\s*audio/i.test(header)) return null;
  let start = 2 + headerLength;
  if (buf[start] === 13 && buf[start + 1] === 10) start += 2;
  return buf.slice(start);
}

function synthesizeEdge(text, voice = DEFAULT_VOICE, timeoutMs = 20000) {
  const cleaned = String(text || "").trim();
  if (!cleaned) return Promise.reject(new Error("Empty text"));

  const reqId = crypto.randomUUID().replace(/-/g, "");
  const url =
    `${WSS}?TrustedClientToken=${TRUSTED}` +
    `&Sec-MS-GEC=${gec()}&Sec-MS-GEC-Version=${VERSION}` +
    `&ConnectionId=${reqId}`;

  const chunks = [];

  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        ws.close();
      } catch (_) {}
      reject(err instanceof Error ? err : new Error(String(err)));
    };
    const ok = (data) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        ws.close();
      } catch (_) {}
      resolve(data);
    };

    const timer = setTimeout(
      () => fail(new Error("Edge TTS timeout")),
      timeoutMs
    );

    const ws = new WebSocket(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0",
        Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Cookie: `muid=${crypto.randomBytes(16).toString("hex").toUpperCase()};`,
      },
    });

    const finish = () => {
      if (!chunks.length) {
        fail(new Error("No audio received"));
        return;
      }
      ok(Buffer.concat(chunks));
    };

    ws.on("open", () => {
      const ts = edgeDateString();
      ws.send(
        `X-Timestamp:${ts}\r\nContent-Type:application/json; charset=utf-8\r\n` +
          `Path:speech.config\r\n\r\n` +
          `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n`
      );
      const ssml =
        `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" ` +
        `xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">` +
        `<voice name="${voice}">` +
        `<prosody rate="+0%" pitch="+0Hz" volume="+0%">` +
        `${escapeXml(cleaned)}` +
        `</prosody></voice></speak>`;
      ws.send(
        `X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\n` +
          `X-Timestamp:${ts}Z\r\nPath:ssml\r\n\r\n${ssml}`
      );
    });

    ws.on("message", (data, isBinary) => {
      if (!isBinary) {
        if (String(data).includes("Path:turn.end")) finish();
        return;
      }
      const audio = extractAudio(Buffer.isBuffer(data) ? data : Buffer.from(data));
      if (audio && audio.length) chunks.push(audio);
    });

    ws.on("error", (e) => fail(e));
    ws.on("close", () => {
      if (!settled && chunks.length) finish();
      else if (!settled) fail(new Error("WebSocket closed"));
    });
  });
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const parts = [];
    req.on("data", (c) => parts.push(c));
    req.on("end", () => resolve(Buffer.concat(parts)));
    req.on("error", reject);
  });
}

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent((urlPath || "/").split("?")[0]);
  const rel = decoded === "/" ? "/index.html" : decoded;
  const full = path.normalize(path.join(root, rel));
  if (!full.startsWith(root)) return null;
  return full;
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (url.pathname === "/api/edge-tts/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true, engine: "edge-neural-proxy" });
    return;
  }

  if (url.pathname === "/api/edge-tts" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const json = JSON.parse(raw.toString("utf8") || "{}");
      const text = json.text;
      const voice = json.voice || DEFAULT_VOICE;
      const audio = await synthesizeEdge(text, voice);
      console.log(
        `[edge-tts-proxy] ${voice} → ${audio.length} bytes (${String(text).slice(0, 40)})`
      );
      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": audio.length,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      });
      res.end(audio);
    } catch (e) {
      console.error("[edge-tts-proxy] error:", e.message || e);
      sendJson(res, 502, { ok: false, error: String(e.message || e) });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: "Not found" });
}

function serveStatic(req, res, url) {
  const filePath = safeJoin(__dirname, url.pathname);
  if (!filePath) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404).end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${HOST}:${PORT}`);
  if (url.pathname.startsWith("/api/edge-tts")) {
    await handleApi(req, res, url);
    return;
  }
  serveStatic(req, res, url);
});

server.listen(PORT, HOST, () => {
  console.log(`English Oral Tutor → http://${HOST}:${PORT}/index.html`);
  console.log(`Edge Neural TTS proxy → POST http://${HOST}:${PORT}/api/edge-tts`);
  console.log("(Use this server instead of python -m http.server for Chrome Neural TTS)");
});
