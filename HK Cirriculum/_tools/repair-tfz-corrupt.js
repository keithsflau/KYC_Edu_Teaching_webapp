/**
 * Emergency repair: corrupt TFZ Science mid-JSX inject + missing LearnFromZero.
 *
 * - Prefer restore from Cursor-history copies listed in HISTORY_RESTORE when present
 * - Prefer _legacy_thin_learn.html ONLY if it is a runnable app (not "Archived thin Learn" stub)
 * - Else surgical strip of mid-line LearnFromZero inject when recoverable
 * - Else inject common/learn-from-zero.js when LearnFromZero is referenced without def
 * - NEVER touch Chemistry/Form 5/09_Chemical_Equilibrium_Kc
 * - Do NOT re-run tfz-science-upgrade.js
 *
 * Usage: node "HK Cirriculum/_tools/repair-tfz-corrupt.js" [--dry-run]
 */
const fs = require("fs");
const path = require("path");

const CURR = path.join(__dirname, "..");
const ROOT = path.join(CURR, "Secondary_School");
const SKIP = new Set(["Chemistry/Form 5/09_Chemical_Equilibrium_Kc"]);
const SUBJECTS = ["Chemistry", "Biology", "Physics", "Junior Science", "Mathematics", "ICT"];

const HISTORY_RESTORE = [
  {
    rel: "Physics/Form 5/01_EMF_Internal_R/index.html",
    hist: path.join(
      process.env.APPDATA || "",
      "Cursor/User/History/-2930c679/ZAJ2.html"
    ),
  },
  {
    rel: "Biology/Form 6/01_Glucose_Homeostasis/index.html",
    hist: path.join(
      process.env.APPDATA || "",
      "Cursor/User/History/64665fc3/HV6k.html"
    ),
  },
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "dist" || ent.name === "_archive_race_stubs" || ent.name === "node_modules")
      continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === "index.html") acc.push(p);
  }
  return acc;
}

function relOf(full) {
  return path.relative(ROOT, full).split(path.sep).join("/");
}

function dirKey(full) {
  return path.dirname(relOf(full));
}

function isArchiveStub(src) {
  return (
    src.includes("Archived thin Learn") ||
    (src.includes("Legacy thin Learn") && src.includes("<pre class=") && src.length < 12000)
  );
}

function detectCorrupt(src) {
  if (isArchiveStub(src)) {
    return { corrupt: true, why: "archive-stub-as-index" };
  }
  const lines = src.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (!/\{\s*mode\s*===\s*["']learn["']\s*&&/.test(L)) continue;
    const t = L.trim();
    const ok =
      /^\{\s*mode\s*===\s*["']learn["']/.test(t) ||
      /^\{mode\s*===\s*["']learn["']\s*&&\s*<LearnFromZero/.test(t);
    if (!ok) return { corrupt: true, why: "mid-line@" + (i + 1), line: t.slice(0, 100) };
  }
  if (
    /<LearnFromZero[\s\S]{0,120}?\/>\s*\r?\n?\s*\}\)\s*\(/.test(src)
  ) {
    return { corrupt: true, why: "leftover-after-lfz-close" };
  }
  return { corrupt: false };
}

function legacyRunnable(src) {
  if (!src || src.length < 800) return false;
  if (isArchiveStub(src)) return false;
  if (!/function\s+App\s*\(|ReactDOM\.createRoot|createRoot\(/.test(src)) return false;
  return !detectCorrupt(src).corrupt;
}

function hasLFZDef(src) {
  return (
    /function\s+LearnFromZero\s*\(/.test(src) ||
    /const\s+LearnFromZero\s*=/.test(src) ||
    /learn-from-zero\.js/.test(src)
  );
}

function depthToCommon(appDir) {
  return path.relative(appDir, path.join(CURR, "common")).split(path.sep).join("/");
}

function injectScript(src, appDir) {
  if (/learn-from-zero\.js/.test(src)) return { src, changed: false };
  const tag = `<script src="${depthToCommon(appDir)}/learn-from-zero.js"></script>`;
  if (/@babel\/standalone\/babel\.min\.js"><\/script>/.test(src)) {
    return {
      src: src.replace(
        /(<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>)/,
        `$1\n  ${tag}`
      ),
      changed: true,
    };
  }
  if (/<script type="text\/babel">/.test(src)) {
    return {
      src: src.replace(/<script type="text\/babel">/, `${tag}\n  <script type="text/babel">`),
      changed: true,
    };
  }
  if (/<\/head>/i.test(src)) {
    return { src: src.replace(/<\/head>/i, `  ${tag}\n</head>`), changed: true };
  }
  return { src, changed: false };
}

/** Remove a mid-line corrupt LearnFromZero splice, leaving a hole that may still be broken. */
function surgicalStripCorruptInject(src) {
  const re =
    /[^\n]*\{\s*mode\s*===\s*["']learn["']\s*&&\s*\(\s*\r?\n\s*<LearnFromZero onComplete=\{\(\)\s*=>\s*setMode\(["']guided["']\)\}\s*\/>\s*\r?\n\s*\)\}[^\n]*/g;
  if (!re.test(src)) return { src, changed: false };
  // Re-run replace (test consumed lastIndex)
  const next = src.replace(
    /[^\n]*\{\s*mode\s*===\s*["']learn["']\s*&&\s*\(\s*\r?\n\s*<LearnFromZero onComplete=\{\(\)\s*=>\s*setMode\(["']guided["']\)\}\s*\/>\s*\r?\n\s*\)\}[^\n]*/g,
    "/* TFZ-CORRUPT-INJECT-REMOVED — restore from history/legacy required */"
  );
  return { src: next, changed: next !== src };
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const restored = [];
  const scriptFixed = [];
  const stillBroken = [];
  const missingOnDisk = [];
  const skipped = [];

  // History restores first
  for (const h of HISTORY_RESTORE) {
    const dest = path.join(ROOT, h.rel.replace(/\//g, path.sep));
    if (!fs.existsSync(h.hist)) {
      missingOnDisk.push({ rel: h.rel, why: "no-cursor-history" });
      continue;
    }
    const cur = fs.existsSync(dest) ? fs.readFileSync(dest, "utf8") : "";
    if (cur && !isArchiveStub(cur) && !detectCorrupt(cur).corrupt && cur.length > 8000) {
      skipped.push({ rel: h.rel, why: "already-healthy" });
      continue;
    }
    if (!dryRun) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(h.hist, dest);
    }
    restored.push({ rel: h.rel, why: "cursor-history" });
  }

  const files = SUBJECTS.flatMap((s) => walk(path.join(ROOT, s)));
  if (!files.length) {
    console.warn("WARNING: no index.html under Secondary_School subjects — tree may be syncing/wiped");
  }

  for (const full of files) {
    const rel = relOf(full);
    const key = dirKey(full);
    if (SKIP.has(key)) {
      skipped.push({ rel, why: "kc-hard-skip" });
      continue;
    }
    if (restored.some((r) => r.rel === rel)) continue;

    let src = fs.readFileSync(full, "utf8");
    const det = detectCorrupt(src);
    const legacyPath = path.join(path.dirname(full), "_legacy_thin_learn.html");

    if (det.corrupt) {
      if (fs.existsSync(legacyPath)) {
        const leg = fs.readFileSync(legacyPath, "utf8");
        if (legacyRunnable(leg)) {
          if (!dryRun) fs.writeFileSync(full, leg, "utf8");
          restored.push({ rel, why: det.why + "+legacy-runnable" });
          continue;
        }
      }
      // Surgical strip alone leaves syntax holes — mark still broken unless strip makes runnable
      const strip = surgicalStripCorruptInject(src);
      if (strip.changed) {
        const after = detectCorrupt(strip.src);
        if (!after.corrupt && /function\s+App\s*\(/.test(strip.src)) {
          if (!dryRun) fs.writeFileSync(full, strip.src, "utf8");
          // may still need learn block — count as script-fixed-ish
          scriptFixed.push(rel + " (strip-inject)");
          continue;
        }
      }
      stillBroken.push({
        rel,
        why: det.why + (fs.existsSync(legacyPath) ? "+legacy-archive-stub" : "+no-legacy"),
      });
      continue;
    }

    if (src.includes("LearnFromZero") && !hasLFZDef(src)) {
      const { src: next, changed } = injectScript(src, path.dirname(full));
      if (changed) {
        if (!dryRun) fs.writeFileSync(full, next, "utf8");
        scriptFixed.push(rel);
      } else {
        stillBroken.push({ rel, why: "missing-lfz-def-no-inject-point" });
      }
    }
  }

  // Known CEO-upgraded paths that may be absent after wipe
  const expectedBrokenSample = [
    "Chemistry/Form 5/11_Entropy_Spontaneity/index.html",
    "Chemistry/Form 3/02_Atomic_Structure/index.html",
    "Chemistry/Form 4/10_Mole_Concept/index.html",
    "Chemistry/Form 4/05_Reactivity_Series/index.html",
    "Chemistry/Form 4/08_Polarity/index.html",
    "Chemistry/Form 5/07_Solubility_Product/index.html",
  ];
  for (const rel of expectedBrokenSample) {
    const full = path.join(ROOT, rel.replace(/\//g, path.sep));
    if (!fs.existsSync(full)) {
      missingOnDisk.push({ rel, why: "path-missing-on-disk" });
    }
  }

  const report = {
    dryRun,
    restored: restored.length,
    scriptFixed: scriptFixed.length,
    stillBroken: stillBroken.length,
    missingOnDisk: missingOnDisk.length,
    restoredPaths: restored,
    scriptFixedPaths: scriptFixed,
    stillBrokenPaths: stillBroken,
    missingOnDiskPaths: missingOnDisk,
    skipped,
    indexFilesScanned: files.length,
  };
  console.log(JSON.stringify(report, null, 2));

  const md = `# QA TFZ Repair Report

**Date:** 2026-07-28  
**Tool:** \`_tools/repair-tfz-corrupt.js\`  
**Policy:** Prefer runnable restore over half-fixed TFZ. Never touch \`09_Chemical_Equilibrium_Kc\`. Did **not** re-run \`tfz-science-upgrade.js\`.

## Do not trust CEO_TFZ_SCIENCE.md

CEO claimed **43** TFZ Science upgrades PASS. On-disk QA (\`QA_TFZ_SCIENCE.md\` / \`QA_TFZ_SCIENCE_RECHECK.md\`) found **corrupt mid-expression** \`{mode === "learn" && (<LearnFromZero\` splices from \`tfz-science-upgrade.js\` learn-section replace. Soft-launch pack (Kc / some Interactive Labs) was real; fleet PASS counts were **not**.

## Critical disk finding

During repair, many \`index.html\` files had already been overwritten with **non-runnable** \`_legacy_thin_learn.html\` **audit stubs** ("Archived thin Learn" + \`<pre>\` snippets — produced by \`buildLegacyHtml\` in the upgrade script). Those stubs are **not** valid pre-upgrade apps.

Separately, a large portion of \`HK Cirriculum/Secondary_School\` (including **Chemistry** and \`_tools\`) disappeared from the working tree mid-session (OneDrive/sync or parallel agent). Kc was intact earlier (~37KB) then Chemistry vanished from disk.

## Counts (this repair run)

| Action | N |
|--------|---|
| Restored (Cursor local history / runnable legacy) | **${restored.length}** |
| Script-fixed (\`learn-from-zero.js\` inject or strip) | **${scriptFixed.length}** |
| Still broken (on disk, unrepaired) | **${stillBroken.length}** |
| Expected apps **missing on disk** | **${missingOnDisk.length}** |
| Index files scanned | ${files.length} |

Dry-run: \`${dryRun}\`

## Restored paths

${restored.map((r) => `- \`${r.rel}\` — ${r.why}`).join("\n") || "_None_"}

## Script-fixed paths

${scriptFixed.map((r) => `- \`${r}\``).join("\n") || "_None_"}

## Still broken (present)

${stillBroken.map((r) => `- \`${r.rel}\` — ${r.why}`).join("\n") || "_None_"}

## Missing on disk (cannot repair until tree returns)

${missingOnDisk.map((r) => `- \`${r.rel}\` — ${r.why}`).join("\n") || "_None_"}

## Shared asset

- \`common/learn-from-zero.js\` — \`window.LearnFromZero\` UMD for Babel apps missing an in-file def.

## Next actions (blocking)

1. **Stop further deletes / sync overwrites** of \`HK Cirriculum\`.
2. **Restore Chemistry tree** (incl. Kc) from OneDrive version history / backup — Kc was never to be touched but is currently absent from disk.
3. Re-run \`node HK\\ Cirriculum/_tools/repair-tfz-corrupt.js\` after Chemistry/Physics fleet files are back.
4. Do **not** restore from archive-stub \`_legacy_thin_learn.html\` files.
`;

  if (!dryRun) fs.writeFileSync(path.join(CURR, "QA_TFZ_REPAIR.md"), md, "utf8");
  console.log("QA_TFZ_REPAIR.md updated");
}

main();
