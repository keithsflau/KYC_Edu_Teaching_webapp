/**
 * Fleet injector — NCS 6-language switcher (zh-Hant + NCS five) into curriculum HTML apps.
 *
 * Usage:
 *   node "HK Cirriculum/_tools/inject-ncs-i18n.js"                    # dry-run, all targets
 *   node "HK Cirriculum/_tools/inject-ncs-i18n.js" --apply             # write changes
 *   node "HK Cirriculum/_tools/inject-ncs-i18n.js" --batch first --apply
 *   node "HK Cirriculum/_tools/inject-ncs-i18n.js" --filter "Junior Science" --apply
 *   node "HK Cirriculum/_tools/inject-ncs-i18n.js" --force-reposition --apply
 *
 * Options:
 *   --apply              Write files (default: dry-run only)
 *   --batch <name>       first | junior-science | primary-math | all
 *   --filter <substring> Only paths containing substring (repeatable)
 *   --force-reposition   Replace fleet init that mounts bottom switchers → top-right
 *   --include-3d-war     Include Chinese_History/3D_War apps (normally skipped)
 *   --json               Machine-readable summary on stdout
 *
 * Legacy: --include-math-i18n is accepted but ignored (MathI18n apps are included by default).
 */
const fs = require("fs");
const path = require("path");

const CURR = path.join(__dirname, "..");
const COMMON = path.join(CURR, "common");
const SHARED = path.join(CURR, "_shared");
const KIT_JS = "ncs-i18n.js";
const KIT_CSS = "ncs-i18n.css";
const CHROME_JSON = "ncs-chrome.json";
const MARKER = "data-ncs-kit";
const FLEET_COMMENT = "<!-- NCS i18n fleet kit (auto-injected) -->";
const SKIP_DIRS = new Set([
  "dist",
  "node_modules",
  "_archive",
  "_legacy",
  "workers",
  "3D_War",
  ".git",
  "venv",
]);
const SCAN_ROOTS = ["Primary_School", "Secondary_School"].map((r) => path.join(CURR, r));

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const JSON_OUT = args.includes("--json");
const FORCE_REPOSITION = args.includes("--force-reposition");
const INCLUDE_3D_WAR = args.includes("--include-3d-war");

function argValue(flag) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

const batch = (argValue("--batch") || "").toLowerCase();
const filters = args
  .map((a, i) => (a === "--filter" && args[i + 1] ? args[i + 1] : null))
  .filter(Boolean);

function relFrom(fileDir, targetDir) {
  const rel = path.relative(fileDir, targetDir).split(path.sep).join("/");
  return rel || ".";
}

function relCommonFrom(fileDir) {
  return relFrom(fileDir, COMMON);
}

function relSharedFrom(fileDir) {
  return relFrom(fileDir, SHARED);
}

function shouldSkipDir(name) {
  if (name === "3D_War" && INCLUDE_3D_WAR) return false;
  return SKIP_DIRS.has(name) || name.startsWith("_legacy");
}

function is3dWarHtml(filePath, fileName) {
  return (
    INCLUDE_3D_WAR &&
    /[\\/]3D_War[\\/]/i.test(filePath) &&
    fileName.endsWith(".html") &&
    fileName !== "index.html"
  );
}

function walkIndex(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (shouldSkipDir(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkIndex(p, acc);
    else if (ent.name === "index.html") acc.push(p);
    else if (is3dWarHtml(p, ent.name)) acc.push(p);
  }
  return acc;
}

function appRel(file) {
  const rel = path.relative(CURR, file).split(path.sep).join("/");
  if (/\/index\.html$/i.test(rel)) return rel.replace(/\/index\.html$/i, "");
  return rel;
}

function resolveAppFile(rel) {
  if (/\.html$/i.test(rel)) return path.join(CURR, ...rel.split("/"));
  return path.join(CURR, ...rel.split("/"), "index.html");
}

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function hasNcsAssets(html) {
  return (
    new RegExp(KIT_JS.replace(".", "\\."), "i").test(html) ||
    new RegExp(KIT_CSS.replace(".", "\\."), "i").test(html) ||
    /window\.NcsI18n/i.test(html)
  );
}

function hasFleetInjectBlock(html) {
  return (
    new RegExp(MARKER + '=["\']fleet["\']', "i").test(html) ||
    html.includes(FLEET_COMMENT)
  );
}

function hasFleetInit(html) {
  return (
    new RegExp(MARKER + '=["\']fleet-init["\']', "i").test(html) ||
    /data-ncs-kit=["']fleet-bridge["']/i.test(html)
  );
}

function hasBottomFleetInit(html) {
  return (
    /NcsI18n\.init\s*\(\s*\{[^}]*position\s*:\s*["']bottom["']/i.test(html) ||
    /bootSwitcher\s*\([^)]*bottom/i.test(html) ||
    /ncs-lang-root--bottom/i.test(html)
  );
}

function hasMathI18n(html) {
  return /common\/i18n\.js/i.test(html) || /window\.MathI18n/i.test(html);
}

function hasLgerShell(html) {
  return /junior-science-lger\.js/i.test(html) || /window\.JSLGER/i.test(html);
}

function isHtmlApp(html) {
  return /<html[\s>]/i.test(html) && /<\/head>/i.test(html);
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

function injectIntoHead(html, snippet) {
  const headClose = /<\/head>/i;
  if (!headClose.test(html)) return { ok: false, reason: "no-head-close" };
  if (html.includes(snippet.trim())) return { ok: false, reason: "duplicate-snippet" };
  return { ok: true, html: html.replace(headClose, snippet + "\n</head>") };
}

function stripOldFleetInit(html) {
  let next = html;
  next = next.replace(
    new RegExp(
      `\\s*<script[^>]*${MARKER}=["']fleet-init["'][^>]*>[\\s\\S]*?<\\/script>`,
      "gi"
    ),
    ""
  );
  next = next.replace(
    /\s*<script[^>]*>\s*NcsI18n\.init\s*\(\s*\{[\s\S]*?\}\s*\)\s*;?\s*<\/script>/gi,
    function (block) {
      if (/data-ncs-kit/i.test(block) || /fleet/i.test(block)) return "";
      if (/chromePath/i.test(block) && /ncs/i.test(block)) return "";
      return block;
    }
  );
  return next;
}

function addOrReplaceFleetInit(html, relShared, forceReposition) {
  const initBlock = buildInitScript(relShared);
  const bridgeBlock = buildBridgeStyle();

  if (hasFleetInit(html)) {
    if (!forceReposition && !hasBottomFleetInit(html)) {
      return { ok: false, reason: "init-present" };
    }
    let next = stripOldFleetInit(html);
    if (!/data-ncs-kit=["']fleet-bridge["']/i.test(next)) {
      next = next.replace(/<\/head>/i, bridgeBlock + "\n</head>");
    }
    const headClose = /<\/head>/i;
    if (!headClose.test(next)) return { ok: false, reason: "no-head-close" };
    return { ok: true, html: next.replace(headClose, initBlock + "\n</head>") };
  }

  if (!hasNcsAssets(html)) {
    return { ok: false, reason: "no-ncs-assets" };
  }

  let next = html;
  if (!/data-ncs-kit=["']fleet-bridge["']/i.test(next)) {
    next = next.replace(/<\/head>/i, bridgeBlock + "\n</head>");
  }
  const headClose = /<\/head>/i;
  if (!headClose.test(next)) return { ok: false, reason: "no-head-close" };
  return { ok: true, html: next.replace(headClose, initBlock + "\n</head>") };
}

function inBatch(rel) {
  const norm = rel.replace(/\\/g, "/");
  if (!batch || batch === "all") return true;
  if (batch === "first") {
    return (
      norm.includes("Secondary_School/Junior Science/") ||
      norm.includes("Primary_School/Mathematics/")
    );
  }
  if (batch === "junior-science") return norm.includes("Secondary_School/Junior Science/");
  if (batch === "primary-math") return norm.includes("Primary_School/Mathematics/");
  return batch.split(",").some((b) => norm.includes(b.trim()));
}

function passesFilters(rel) {
  if (filters.length === 0) return true;
  const norm = rel.replace(/\\/g, "/");
  return filters.some((f) => norm.includes(f));
}

function classify(file) {
  const rel = appRel(file);
  const html = fs.readFileSync(file, "utf8");
  const eol = detectEol(html);
  const fileDir = path.dirname(file);
  const relCommon = relCommonFrom(fileDir);
  const relShared = relSharedFrom(fileDir);
  const mathI18n = hasMathI18n(html);
  const lger = hasLgerShell(html);

  if (!inBatch(rel) || !passesFilters(rel)) {
    return { rel, status: "skipped-filter", eol };
  }
  if (!isHtmlApp(html)) {
    return { rel, status: "skipped-not-html", eol };
  }

  const snippet = buildSnippet(relCommon, relShared);

  if (!hasNcsAssets(html) && !hasFleetInjectBlock(html)) {
    const result = injectIntoHead(html, snippet);
    if (!result.ok) {
      return { rel, status: "skipped-" + result.reason, eol, mathI18n, lger };
    }
    return {
      rel,
      status: "would-inject",
      eol,
      relCommon,
      relShared,
      mathI18n,
      lger,
      next: result.html,
    };
  }

  if (hasFleetInit(html) && !hasBottomFleetInit(html)) {
    return { rel, status: "skipped-already", eol, mathI18n, lger };
  }

  if (hasBottomFleetInit(html) && !FORCE_REPOSITION) {
    return { rel, status: "skipped-needs-force-reposition", eol, mathI18n, lger };
  }

  const upgrade = addOrReplaceFleetInit(html, relShared, FORCE_REPOSITION);
  if (!upgrade.ok) {
    if (upgrade.reason === "init-present") {
      return { rel, status: "skipped-already", eol, mathI18n, lger };
    }
    return { rel, status: "skipped-" + upgrade.reason, eol, mathI18n, lger };
  }

  return {
    rel,
    status: hasFleetInjectBlock(html) ? "would-upgrade-init" : "would-inject",
    eol,
    relCommon,
    relShared,
    mathI18n,
    lger,
    next: upgrade.html,
  };
}

function main() {
  const files = SCAN_ROOTS.flatMap((root) => walkIndex(root));
  const results = files.map(classify);

  const counts = {};
  for (const r of results) {
    counts[r.status] = (counts[r.status] || 0) + 1;
  }

  const toWrite = results.filter((r) =>
    ["would-inject", "would-upgrade-init"].includes(r.status)
  );

  if (APPLY) {
    for (const r of toWrite) {
      const file = resolveAppFile(r.rel);
      const normalized = r.next.replace(/\n/g, r.eol);
      fs.writeFileSync(file, normalized, "utf8");
      r.status = r.status === "would-upgrade-init" ? "upgraded-init" : "injected";
    }
    counts["would-inject"] = 0;
    counts["would-upgrade-init"] = 0;
    counts.injected = results.filter((r) => r.status === "injected").length;
    counts["upgraded-init"] = results.filter((r) => r.status === "upgraded-init").length;
  }

  const summary = {
    mode: APPLY ? "apply" : "dry-run",
    batch: batch || "all",
    filters,
    forceReposition: FORCE_REPOSITION,
    includeMathI18n: true,
    scanned: files.length,
    counts,
    changes: toWrite.map((r) => ({
      rel: r.rel,
      relCommon: r.relCommon,
      relShared: r.relShared,
      mathI18n: !!r.mathI18n,
      lger: !!r.lger,
      action: r.status,
    })),
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`NCS i18n fleet inject — ${summary.mode}`);
    console.log(`Scanned: ${summary.scanned} index.html under Primary_School + Secondary_School`);
    console.log("Counts:", counts);
    if (toWrite.length) {
      console.log(`\n${APPLY ? "Written" : "Would change"} (${toWrite.length}):`);
      for (const r of toWrite.slice(0, 30)) {
        const flags = [
          r.mathI18n ? "MathI18n" : null,
          r.lger ? "JSLGER" : null,
        ]
          .filter(Boolean)
          .join("+");
        console.log(
          `  ${r.rel}  →  ${r.relCommon}/${KIT_JS}${flags ? "  [" + flags + "]" : ""}`
        );
      }
      if (toWrite.length > 30) console.log(`  … and ${toWrite.length - 30} more`);
    }
    if (counts["skipped-needs-force-reposition"]) {
      console.log(
        `\n${counts["skipped-needs-force-reposition"]} app(s) have bottom-mounted fleet init — re-run with --force-reposition --apply`
      );
    }
    if (!APPLY && toWrite.length) {
      console.log(
        '\nRe-run with --apply to write. Example: node "HK Cirriculum/_tools/inject-ncs-i18n.js" --filter "Chemistry" --apply'
      );
    }
  }

  return summary;
}

main();
