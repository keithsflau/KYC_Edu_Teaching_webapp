import fs from "fs";
import path from "path";
import { prisma } from "./db";

export type Entitlement = "free" | "primary" | "secondary" | "all";

export type AccessDecision = {
  allowed: boolean;
  reason: string;
  isFreeDemo: boolean;
  entitlement: Entitlement;
};

type FreeCatalog = {
  modules: { path: string; id: string }[];
};

type PaidRulesLite = {
  pathClassification?: {
    primary?: { pathPrefixes?: string[] };
    secondary?: { pathPrefixes?: string[] };
    other?: { outOfScopePrefixes?: string[] };
  };
};

let cachedFreePaths: Set<string> | null = null;
let cachedRules: PaidRulesLite | null = null;

export function getModulesRoot(): string {
  if (process.env.MODULES_ROOT) return path.resolve(process.env.MODULES_ROOT);
  return path.resolve(process.cwd(), "..");
}

function loadPaidRulesLite(): PaidRulesLite {
  if (cachedRules) return cachedRules;
  const file = path.join(process.cwd(), "data", "paid-entitlement-rules.json");
  try {
    cachedRules = JSON.parse(fs.readFileSync(file, "utf8")) as PaidRulesLite;
  } catch {
    cachedRules = {};
  }
  return cachedRules;
}

export function loadFreeDemoPaths(): Set<string> {
  if (cachedFreePaths) return cachedFreePaths;
  const file = path.join(process.cwd(), "data", "free-demo-catalog.json");
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as FreeCatalog;
  const set = new Set(raw.modules.map((m) => moduleKey(m.path)));
  cachedFreePaths = set;
  return set;
}

/** Merge admin feature-flag overrides (JSON array of paths) into free set */
export async function loadFreeDemoPathsWithOverrides(): Promise<Set<string>> {
  const base = new Set(loadFreeDemoPaths());
  try {
    const flag = await prisma.featureFlag.findUnique({
      where: { key: "free_catalog_override" },
    });
    if (flag?.value) {
      const extra = JSON.parse(flag.value) as unknown;
      if (Array.isArray(extra)) {
        for (const p of extra) {
          if (typeof p === "string" && p.trim()) base.add(moduleKey(p));
        }
      }
    }
  } catch {
    // ignore bad JSON / missing table
  }
  return base;
}

export function clearFreeDemoCache() {
  cachedFreePaths = null;
  cachedRules = null;
}

/** Normalize to folder path without trailing slash / index.html */
export function moduleKey(p: string): string {
  let s = p
    .replace(/\\/g, "/")
    .replace(/^\//, "")
    .replace(/^HK Cirriculum\//i, "");
  if (s.toLowerCase().endsWith("/index.html")) s = s.slice(0, -"/index.html".length);
  else if (s.toLowerCase().endsWith("index.html"))
    s = s.slice(0, -"index.html".length).replace(/\/$/, "");
  return s.replace(/\/$/, "");
}

/** @deprecated Prefer moduleKey */
export function normalizeModulePath(p: string): string {
  return moduleKey(p);
}

export function isFreeDemo(modulePath: string): boolean {
  const key = moduleKey(modulePath);
  return loadFreeDemoPaths().has(key);
}

export async function isFreeDemoAsync(modulePath: string): Promise<boolean> {
  const key = moduleKey(modulePath);
  const free = await loadFreeDemoPathsWithOverrides();
  return free.has(key);
}

export function libraryBand(modulePath: string): "primary" | "secondary" | "other" {
  const p = modulePath.replace(/\\/g, "/").replace(/^\//, "");
  const rules = loadPaidRulesLite();
  const primaryPrefixes =
    rules.pathClassification?.primary?.pathPrefixes ?? ["Primary_School/"];
  const secondaryPrefixes =
    rules.pathClassification?.secondary?.pathPrefixes ?? ["Secondary_School/"];
  if (primaryPrefixes.some((pre) => p.startsWith(pre))) return "primary";
  if (secondaryPrefixes.some((pre) => p.startsWith(pre))) return "secondary";
  return "other";
}

export function isOutOfScopeModule(modulePath: string): boolean {
  const p = modulePath.replace(/\\/g, "/").replace(/^\//, "");
  const prefixes =
    loadPaidRulesLite().pathClassification?.other?.outOfScopePrefixes ?? [];
  return prefixes.some(
    (pre) => p === pre.replace(/\/$/, "") || p.startsWith(pre)
  );
}

export function effectiveEntitlement(sub: {
  entitlement: string;
  status: string;
  trialEndsAt: Date | null;
  currentPeriodEnd: Date | null;
} | null): Entitlement {
  if (!sub) return "free";
  const now = Date.now();

  // Active paid
  if (sub.status === "active" || sub.status === "past_due") {
    return (sub.entitlement as Entitlement) || "free";
  }

  // Stripe or local trial
  if (
    (sub.status === "trialing" || sub.trialEndsAt) &&
    sub.trialEndsAt &&
    sub.trialEndsAt.getTime() > now
  ) {
    return "all";
  }

  // Soft downgrade
  return "free";
}

export function canAccessModule(
  entitlement: Entitlement,
  modulePath: string,
  freeOverride?: boolean
): AccessDecision {
  const demo = freeOverride ?? isFreeDemo(modulePath);
  if (demo) {
    return {
      allowed: true,
      reason: "free_demo",
      isFreeDemo: true,
      entitlement,
    };
  }

  if (isOutOfScopeModule(modulePath)) {
    return {
      allowed: false,
      reason: "out_of_scope",
      isFreeDemo: false,
      entitlement,
    };
  }

  const band = libraryBand(modulePath);

  if (band === "other") {
    return {
      allowed: false,
      reason: "out_of_scope",
      isFreeDemo: false,
      entitlement,
    };
  }

  if (entitlement === "all") {
    return { allowed: true, reason: "pro_or_trial", isFreeDemo: false, entitlement };
  }
  if (entitlement === "primary" && band === "primary") {
    return { allowed: true, reason: "basic_primary", isFreeDemo: false, entitlement };
  }
  if (entitlement === "secondary" && band === "secondary") {
    return { allowed: true, reason: "basic_secondary", isFreeDemo: false, entitlement };
  }

  return {
    allowed: false,
    reason:
      entitlement === "free"
        ? "subscribe_required"
        : "wrong_library_tier",
    isFreeDemo: false,
    entitlement,
  };
}

export async function canAccessModuleAsync(
  entitlement: Entitlement,
  modulePath: string
): Promise<AccessDecision> {
  const demo = await isFreeDemoAsync(modulePath);
  return canAccessModule(entitlement, modulePath, demo);
}

export async function getUserAccess(userId: string | null | undefined) {
  if (!userId) {
    return { entitlement: "free" as Entitlement, subscription: null, trialEndsAt: null as Date | null };
  }
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  const entitlement = effectiveEntitlement(sub);
  return {
    entitlement,
    subscription: sub,
    trialEndsAt: sub?.trialEndsAt ?? null,
  };
}

export async function logAccess(opts: {
  userId?: string | null;
  modulePath: string;
  allowed: boolean;
  reason: string;
  ip?: string | null;
}) {
  try {
    await prisma.accessLog.create({
      data: {
        userId: opts.userId || null,
        modulePath: opts.modulePath,
        allowed: opts.allowed,
        reason: opts.reason,
        ip: opts.ip || null,
      },
    });
  } catch {
    // non-fatal
  }
}
