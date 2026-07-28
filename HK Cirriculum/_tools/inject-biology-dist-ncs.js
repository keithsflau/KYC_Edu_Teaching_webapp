const fs = require("fs");
const path = require("path");

const CURR = path.join(__dirname, "..");
const COMMON = path.join(CURR, "common");
const SHARED = path.join(CURR, "_shared");
const BIO = path.join(CURR, "Secondary_School", "Biology");
const KIT_JS = "ncs-i18n.js";
const KIT_CSS = "ncs-i18n.css";
const CHROME_JSON = "ncs-chrome.json";
const MARKER = "data-ncs-kit";
const FLEET_COMMENT = "<!-- NCS i18n fleet kit (auto-injected) -->";
const APPLY = process.argv.includes("--apply");

function relFrom(fileDir, targetDir) {
  const rel = path.relative(fileDir, targetDir).split(path.sep).join("/");
  return rel || ".";
}

function buildInitScript(relShared) {
  const chromePath = `${relShared}/${CHROME_JSON}`;
  return [
    `  <script ${MARKER}="fleet-init">`,
    "  (function () {",
    "    function hideLegacyToggles() {",
    '      document.body.classList.add("ncs-fleet-mounted");',
    '      document.querySelectorAll("header button[type=\\"button\\"]").forEach(function (btn) {',
    '        var label = (btn.textContent || "").trim();',
    '        if (label === "EN" || label === "\\u4E2D") {',
    '          btn.classList.add("ncs-hide-when-ncs-fleet");',
    "        }",
    "      });",
    '      document.querySelectorAll(".fixed.top-4.right-4.z-50").forEach(function (el) {',
    '        el.classList.add("ncs-hide-when-ncs-fleet");',
    "      });",
    "    }",
    "    function boot() {",
    "      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;",
    "      window.NcsI18n.init({",
    `        chromePath: "${chromePath}",`,
    "        target: document.body",
    "      }).then(hideLegacyToggles);",
    "    }",
    '    if (document.readyState === "loading") {',
    '      document.addEventListener("DOMContentLoaded", boot);',
    "    } else {",
    "      boot();",
    "    }",
    "  })();",
    "  </script>",
  ].join("\n");
}

function buildBridgeStyle() {
  return [
    `  <style ${MARKER}="fleet-bridge">`,
    "    body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet,",
    "    body.ncs-fleet-mounted .ncs-lang-btn:not(.ncs-lang-switcher *) {",
    "      display: none !important;",
    "    }",
    "  </style>",
  ].join("\n");
}

function buildSnippet(relCommon, relShared) {
  const base = relCommon.endsWith("/") ? relCommon.slice(0, -1) : relCommon;
  return [
    FLEET_COMMENT,
    `  <link rel="stylesheet" href="${base}/${KIT_CSS}" />`,
    `  <script src="${base}/${KIT_JS}" defer ${MARKER}="fleet"></script>`,
    buildBridgeStyle(),
    buildInitScript(relShared),
  ].join("\n");
}

function walkDist(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "dist") {
        const idx = path.join(p, "index.html");
        if (fs.existsSync(idx)) acc.push(idx);
      } else walkDist(p, acc);
    }
  }
  return acc;
}

const files = walkDist(BIO);
const counts = { injected: 0, skipped: 0, errors: 0 };

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  if (/data-ncs-kit=["']fleet-init["']/i.test(html)) {
    counts.skipped++;
    continue;
  }
  if (!/<\/head>/i.test(html)) {
    counts.errors++;
    continue;
  }
  const dir = path.dirname(file);
  const snippet = buildSnippet(relFrom(dir, COMMON), relFrom(dir, SHARED));
  const next = html.replace(/<\/head>/i, snippet + "\n</head>");
  if (APPLY) fs.writeFileSync(file, next, "utf8");
  counts.injected++;
}

console.log(JSON.stringify({ mode: APPLY ? "apply" : "dry-run", distFiles: files.length, ...counts }, null, 2));
