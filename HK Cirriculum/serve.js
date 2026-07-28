/**
 * HK Cirriculum static server with terrain-tile proxy for 3D war maps.
 * Serves the curriculum tree and proxies /tiles/* under cse-wars, dse-wars, ru-ua-war.
 *
 * Usage: node serve.js   → http://localhost:5173
 */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5173;

const TILE_UPSTREAM = {
  dem: (z, x, y) => `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`,
  img: (z, x, y) =>
    `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/GoogleMapsCompatible/${z}/${y}/${x}.jpg`,
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".wasm": "application/wasm",
};

const TILE_RE = /\/tiles\/(dem|img)\/(\d+)\/(\d+)\/(\d+)\.(png|jpg)$/;

function proxyTile(kind, z, x, y, res) {
  const url = TILE_UPSTREAM[kind](z, x, y);
  https
    .get(url, (up) => {
      if (up.statusCode === 301 || up.statusCode === 302) {
        https.get(up.headers.location, (r2) => pipeTile(r2, res, kind)).on("error", () => send502(res));
        up.resume();
        return;
      }
      pipeTile(up, res, kind);
    })
    .on("error", () => send502(res));
}

function pipeTile(up, res, kind) {
  if (up.statusCode !== 200) {
    res.writeHead(up.statusCode || 502);
    return res.end();
  }
  res.writeHead(200, {
    "Content-Type": kind === "dem" ? "image/png" : "image/jpeg",
    "Cache-Control": "public, max-age=86400",
    "Access-Control-Allow-Origin": "*",
  });
  up.pipe(res);
}

function send502(res) {
  res.writeHead(502);
  res.end("Tile upstream failed");
}

function serveFile(file, res) {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);

    const tile = url.match(TILE_RE);
    if (tile) return proxyTile(tile[1], tile[2], tile[3], tile[4], res);

    let rel = url === "/" ? "index.html" : url.replace(/\/$/, "") || "index.html";
    let file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    fs.stat(file, (err, st) => {
      if (!err && st.isDirectory()) file = path.join(file, "index.html");
      serveFile(file, res);
    });
  })
  .listen(PORT, () => console.log(`HK Cirriculum → http://localhost:${PORT}`));
