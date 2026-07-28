/**
 * Minimal V1 smoke checks (no browser, no Stripe network).
 * Run: node scripts/smoke-qa.mjs
 * Exit 0 = all checks passed; non-zero = failures.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPO = path.resolve(ROOT, "..");
/** Apps live under HK Cirriculum/ — same default as MODULES_ROOT in .env */
const MODULES_ROOT = path.resolve(REPO, "HK Cirriculum");

let failed = 0;
let passed = 0;

function ok(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`PASS  ${name}${detail ? ` — ${detail}` : ""}`);
  } else {
    failed++;
    console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

// --- Free demo catalog ---
const free = readJson("data/free-demo-catalog.json");
ok(
  "free demo count in range 12–15",
  free.count >= 12 &&
    free.count <= 15 &&
    free.modules?.length === free.count,
  `${free.count} modules`
);

let pathsOk = 0;
const missing = [];
for (const m of free.modules || []) {
  const rel = m.path.replace(/\\/g, "/").replace(/^HK Cirriculum\//i, "");
  const abs = path.join(MODULES_ROOT, rel);
  if (fs.existsSync(abs)) pathsOk++;
  else missing.push(m.path);
}
ok("all free demo HTML paths exist on disk", missing.length === 0, `${pathsOk}/${free.modules.length}`);

// --- Entitlement rules ---
const rules = readJson("data/paid-entitlement-rules.json");
const ents = Object.keys(rules.entitlements || {});
ok(
  "entitlements free|primary|secondary|all present",
  ["free", "primary", "secondary", "all"].every((k) => ents.includes(k)),
  ents.join(",")
);

// --- Curriculum map ---
const mapPath = path.join(ROOT, "data", "curriculum-map.json");
ok("curriculum-map.json exists (run npm run curriculum:generate)", fs.existsSync(mapPath));
if (fs.existsSync(mapPath)) {
  const map = readJson("data/curriculum-map.json");
  const systems = Object.keys(map.systems || {});
  ok(
    "curriculum systems include hk/uk/us/ib/sg/intl",
    ["hk", "uk", "us", "ib", "sg", "intl"].every((s) => systems.includes(s)),
    systems.join(",")
  );
  const disc =
    typeof map.disclaimer === "string"
      ? map.disclaimer
      : map.disclaimer?.en || map.disclaimer?.["zh-HK"] || "";
  ok("curriculum disclaimer present", String(disc).length > 20);
  ok("curriculum has modules", (map.modules?.length || 0) > 0, String(map.modules?.length));
}

// --- Stripe placeholders documented ---
const envEx = fs.readFileSync(path.join(ROOT, ".env.example"), "utf8");
ok(
  "Stripe price IDs documented as placeholders in .env.example",
  envEx.includes("price_basic_monthly_placeholder") &&
    envEx.includes("STRIPE_PRICE_PRO_MONTHLY") &&
    envEx.includes("sk_test_")
);
ok("ADMIN_SECRET documented in .env.example", envEx.includes("ADMIN_SECRET"));
ok("TRIAL_DAYS=7 documented", /TRIAL_DAYS=["']?7/.test(envEx));

// --- No obvious secrets in tracked source ---
const secretPatterns = [
  /sk_live_[A-Za-z0-9]{10,}/,
  /sk_test_[A-Za-z0-9]{20,}/,
  /whsec_[A-Za-z0-9]{10,}/,
  /AKIA[0-9A-Z]{16}/,
];
const scanRoots = ["src", "scripts", "data", ".env.example"];
let leakHits = [];
for (const rel of scanRoots) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;
  const walk = (p) => {
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      for (const name of fs.readdirSync(p)) {
        if (name === "generated" || name === "node_modules") continue;
        walk(path.join(p, name));
      }
      return;
    }
    if (!/\.(ts|tsx|js|mjs|json|md|example)$/i.test(p)) return;
    const text = fs.readFileSync(p, "utf8");
    for (const re of secretPatterns) {
      if (re.test(text)) leakHits.push(path.relative(ROOT, p));
    }
  };
  walk(abs);
}
ok("no live/test Stripe secrets in src/scripts/data/.env.example", leakHits.length === 0, leakHits.join("; ") || "clean");

// --- Dual / conflicting routes (agent collision) ---
const playPath = path.join(ROOT, "src/app/play/[...path]/page.tsx");
const playSlug = path.join(ROOT, "src/app/play/[...slug]/page.tsx");
ok(
  "only one /play catch-all route (path OR slug, not both)",
  !(fs.existsSync(playPath) && fs.existsSync(playSlug)),
  fs.existsSync(playPath) && fs.existsSync(playSlug)
    ? "BOTH [...path] and [...slug] exist — Next conflict"
    : "ok"
);

// --- Prisma client generate output ---
const schema = fs.readFileSync(path.join(ROOT, "prisma/schema.prisma"), "utf8");
const wantsGenerated = /output\s*=\s*"\.\.\/src\/generated\/prisma"/.test(schema);
const generatedExists = fs.existsSync(path.join(ROOT, "src/generated/prisma"));
const pkg = readJson("package.json");
const hasAdapter = !!pkg.dependencies?.["@prisma/adapter-better-sqlite3"];
ok(
  "Prisma generate output present OR unused",
  !wantsGenerated || generatedExists,
  wantsGenerated
    ? generatedExists
      ? "generated ok"
      : "missing — run npx prisma generate"
    : "default client"
);
ok(
  "better-sqlite3 adapter declared if db.ts imports it",
  (() => {
    const db = fs.readFileSync(path.join(ROOT, "src/lib/db.ts"), "utf8");
    if (!db.includes("@prisma/adapter-better-sqlite3")) return true;
    return hasAdapter;
  })(),
  hasAdapter ? "dep present" : "db imports adapter but package.json missing it"
);

// --- Module proxy files exist ---
const contentProxy = fs.existsSync(
  path.join(ROOT, "src/app/api/modules/content/route.ts")
);
const pathProxy = fs.existsSync(
  path.join(ROOT, "src/app/api/modules/[...path]/route.ts")
);
ok(
  "at least one module HTML proxy exists",
  contentProxy || pathProxy,
  `content=${contentProxy} pathProxy=${pathProxy}`
);
if (contentProxy && pathProxy) {
  // Not a hard fail — document dual implementation risk
  console.warn(
    "WARN  both /api/modules/content and /api/modules/[...path] exist — unify rate-limit/watermark"
  );
}

console.log("\n---");
console.log(`Result: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
