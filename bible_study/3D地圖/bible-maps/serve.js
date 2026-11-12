const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = 5052;

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
};

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

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);

    const dem = url.match(/^\/tiles\/dem\/(\d+)\/(\d+)\/(\d+)\.png$/);
    if (dem) return proxyTile("dem", dem[1], dem[2], dem[3], res);

    const img = url.match(/^\/tiles\/img\/(\d+)\/(\d+)\/(\d+)\.jpg$/);
    if (img) return proxyTile("img", img[1], img[2], img[3], res);

    let rel = url === "/" ? "index.html" : url.replace(/\/$/, "") || "index.html";
    let file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    fs.stat(file, (err, st) => {
      if (!err && st.isDirectory()) file = path.join(file, "index.html");
      fs.readFile(file, (err2, data) => {
        if (err2) {
          res.writeHead(404);
          return res.end("Not found");
        }
        res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
        res.end(data);
      });
    });
  })
  .listen(PORT, () => console.log(`Bible Maps → http://localhost:${PORT}`));
