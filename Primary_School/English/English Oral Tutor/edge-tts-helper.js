/**
 * Microsoft Edge neural TTS (browser).
 * Paths (in order):
 *   1) Local proxy  POST /api/edge-tts  (Chrome-friendly; use serve.mjs)
 *   2) Direct WebSocket to speech.platform.bing.com (works in Microsoft Edge)
 * Free — no API key. Chrome cannot set Edge User-Agent on WebSocket → 403 without proxy.
 */
(function (global) {
  "use strict";

  const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  const WSS_URL =
    "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
  const VERSION_MS_GEC = "1-143.0.3650.75";
  const DEFAULT_VOICE = "en-US-AriaNeural";
  const PROXY_PATH = "/api/edge-tts";

  const PREFERRED_VOICES = [
    { id: "en-US-AriaNeural", label: "Aria (US · Neural)" },
    { id: "en-US-JennyNeural", label: "Jenny (US · Neural)" },
    { id: "en-US-GuyNeural", label: "Guy (US · Neural)" },
    { id: "en-GB-SoniaNeural", label: "Sonia (UK · Neural)" },
    { id: "en-GB-RyanNeural", label: "Ryan (UK · Neural)" },
    { id: "en-AU-NatashaNeural", label: "Natasha (AU · Neural)" },
  ];

  /** @type {'unknown'|'proxy'|'direct'|'none'} */
  let transport = "unknown";

  function uuid() {
    if (global.crypto && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, "");
    }
    return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
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

  /** Match edge-tts date_to_string() */
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
      days[d.getUTCDay()] +
      " " +
      months[d.getUTCMonth()] +
      " " +
      pad(d.getUTCDate()) +
      " " +
      d.getUTCFullYear() +
      " " +
      pad(d.getUTCHours()) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      pad(d.getUTCSeconds()) +
      " GMT+0000 (Coordinated Universal Time)"
    );
  }

  async function generateSecMsGec() {
    const ticks = Math.floor(Date.now() / 1000) + 11644473600;
    const rounded = ticks - (ticks % 300);
    const windowsTicks = rounded * 10_000_000;
    const data = new TextEncoder().encode(
      `${windowsTicks}${TRUSTED_CLIENT_TOKEN}`
    );
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }

  function buildSsml(text, voice) {
    return (
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" ` +
      `xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">` +
      `<voice name="${voice}">` +
      `<prosody rate="+0%" pitch="+0Hz" volume="+0%">` +
      `${escapeXml(text)}` +
      `</prosody></voice></speak>`
    );
  }

  function extractAudioFromBinary(buf) {
    if (buf.length < 2) return null;
    const headerLength = (buf[0] << 8) | buf[1];
    if (headerLength < 0 || headerLength + 2 > buf.length) {
      // Fallback: search for Path:audio\r\n
      const needle = new TextEncoder().encode("Path:audio\r\n");
      outer: for (let i = 0; i <= buf.length - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
          if (buf[i + j] !== needle[j]) continue outer;
        }
        return buf.slice(i + needle.length);
      }
      return null;
    }
    const header = new TextDecoder().decode(buf.slice(2, 2 + headerLength));
    if (!/Path:\s*audio/i.test(header)) return null;
    // Skip header + \r\n
    let dataStart = 2 + headerLength;
    if (buf[dataStart] === 13 && buf[dataStart + 1] === 10) dataStart += 2;
    if (dataStart >= buf.length) return new Uint8Array(0);
    return buf.slice(dataStart);
  }

  async function synthesizeViaProxy(text, voice, timeoutMs) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(PROXY_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
        signal: ctrl.signal,
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(
          "Proxy TTS HTTP " + res.status + (msg ? ": " + msg.slice(0, 120) : "")
        );
      }
      const buf = new Uint8Array(await res.arrayBuffer());
      if (buf.length < 100) throw new Error("Proxy returned empty audio");
      return buf;
    } finally {
      clearTimeout(timer);
    }
  }

  async function synthesizeViaWebSocket(text, voice, timeoutMs) {
    const secMsGEC = await generateSecMsGec();
    const reqId = uuid();
    const url =
      `${WSS_URL}?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}` +
      `&Sec-MS-GEC=${secMsGEC}&Sec-MS-GEC-Version=${VERSION_MS_GEC}` +
      `&ConnectionId=${reqId}`;

    const chunks = [];

    return new Promise((resolve, reject) => {
      let settled = false;
      let inactivityTimer;
      let ws;

      const fail = (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(inactivityTimer);
        try {
          ws && ws.close();
        } catch (_) {}
        reject(err instanceof Error ? err : new Error(String(err)));
      };

      const succeed = (data) => {
        if (settled) return;
        settled = true;
        clearTimeout(inactivityTimer);
        try {
          ws && ws.close();
        } catch (_) {}
        resolve(data);
      };

      const bumpInactivity = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(
          () => fail(new Error("Edge TTS timeout")),
          timeoutMs
        );
      };

      const finishFromChunks = () => {
        if (!chunks.length) {
          fail(new Error("Edge TTS returned no audio"));
          return;
        }
        const total = chunks.reduce((n, c) => n + c.length, 0);
        const out = new Uint8Array(total);
        let offset = 0;
        for (const c of chunks) {
          out.set(c, offset);
          offset += c.length;
        }
        succeed(out);
      };

      try {
        ws = new WebSocket(url);
      } catch (e) {
        fail(e);
        return;
      }

      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        bumpInactivity();
        const ts = edgeDateString();
        const config =
          `X-Timestamp:${ts}\r\nContent-Type:application/json; charset=utf-8\r\n` +
          `Path:speech.config\r\n\r\n` +
          `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n`;
        ws.send(config);

        const ssml = buildSsml(text, voice);
        // Trailing Z on timestamp matches Microsoft Edge quirk (edge-tts)
        const speech =
          `X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\n` +
          `X-Timestamp:${ts}Z\r\nPath:ssml\r\n\r\n${ssml}`;
        ws.send(speech);
      };

      ws.onmessage = (event) => {
        bumpInactivity();
        if (typeof event.data === "string") {
          if (event.data.includes("Path:turn.end")) {
            finishFromChunks();
          }
          return;
        }

        const buf = new Uint8Array(event.data);
        const audio = extractAudioFromBinary(buf);
        if (audio && audio.length) chunks.push(audio);
      };

      ws.onerror = () => fail(new Error("Edge TTS WebSocket error (often 403 in Chrome — use serve.mjs)"));
      ws.onclose = () => {
        if (settled) return;
        if (chunks.length) finishFromChunks();
        else fail(new Error("Edge TTS connection closed"));
      };
    });
  }

  async function proxyAvailable() {
    try {
      const res = await fetch(PROXY_PATH + "/health", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) return false;
      const j = await res.json().catch(() => ({}));
      return !!(j && j.ok);
    } catch (_) {
      return false;
    }
  }

  /**
   * Synthesize text → MP3 Uint8Array.
   * Prefers local proxy (Chrome), then direct WebSocket (Edge).
   */
  async function synthesize(text, voice = DEFAULT_VOICE, timeoutMs = 20000) {
    if (!text || !String(text).trim()) {
      throw new Error("Empty text");
    }
    const v = voice || DEFAULT_VOICE;

    if (transport === "proxy" || transport === "unknown") {
      const hasProxy =
        transport === "proxy" ? true : await proxyAvailable();
      if (hasProxy) {
        try {
          const data = await synthesizeViaProxy(text, v, timeoutMs);
          transport = "proxy";
          return data;
        } catch (e) {
          if (transport === "proxy") throw e;
          console.warn(
            "[EdgeTTS] Proxy failed, trying direct WebSocket:",
            e.message || e
          );
        }
      }
    }

    const data = await synthesizeViaWebSocket(text, v, timeoutMs);
    transport = "direct";
    return data;
  }

  /** One-shot probe: returns true if Edge neural TTS works here. */
  let probePromise = null;
  function probe() {
    if (probePromise) return probePromise;
    probePromise = (async () => {
      try {
        const data = await synthesize("Hi.", DEFAULT_VOICE, 10000);
        return !!(data && data.length > 100);
      } catch (e) {
        console.warn("[EdgeTTS] probe failed:", e && e.message ? e.message : e);
        transport = "none";
        return false;
      }
    })();
    return probePromise;
  }

  function getTransport() {
    return transport;
  }

  function resetProbe() {
    probePromise = null;
    if (transport === "none") transport = "unknown";
  }

  global.EdgeTTSHelper = {
    DEFAULT_VOICE,
    PREFERRED_VOICES,
    PROXY_PATH,
    synthesize,
    probe,
    resetProbe,
    getTransport,
  };
})(typeof window !== "undefined" ? window : globalThis);
