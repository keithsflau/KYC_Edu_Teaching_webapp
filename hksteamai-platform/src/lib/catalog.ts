/**
 * Free-demo + paid entitlement catalog (Agent 2).
 * Agents 4/5: import from `@/lib/catalog` — do not hardcode free paths in UI.
 */
import fs from "fs";
import path from "path";
import type { Entitlement } from "./entitlements";
import { moduleKey } from "./entitlements";

export type Locale = "en" | "zh-HK";

export type FreeDemoModule = {
  id: string;
  path: string;
  title: { en: string; "zh-HK": string };
  subject: string;
  band: string;
  ageHint?: string;
  library: "primary" | "secondary";
  why: string;
};

export type FreeDemoCatalogFile = {
  version: number;
  updatedAt?: string;
  policy: string;
  count: number;
  audienceNote?: string;
  modules: FreeDemoModule[];
};

export type PaidEntitlementRulesFile = {
  version: number;
  updatedAt?: string;
  summary: { en: string; "zh-HK": string };
  guestAccess: string;
  pathClassification: {
    primary: { entitlement: string; pathPrefixes: string[] };
    secondary: { entitlement: string; pathPrefixes: string[] };
    other: { entitlement: string; outOfScopePrefixes?: string[] };
  };
  entitlements: Record<
    string,
    {
      allows: string[];
      pathPrefixes: string[];
      plans?: string[];
      checkoutLibraryChoice?: string;
      trialDefaultDays?: number;
      uiTier?: string;
    }
  >;
  denyReasons: Record<string, { en: string; "zh-HK": string }>;
  featureFlags?: Record<string, unknown>;
};

export type SoftPaywallCopyFile = {
  version: number;
  strings: Record<string, { en: string; "zh-HK": string }>;
};

let freeCache: FreeDemoCatalogFile | null = null;
let rulesCache: PaidEntitlementRulesFile | null = null;
let copyCache: SoftPaywallCopyFile | null = null;

function dataPath(name: string): string {
  return path.join(process.cwd(), "data", name);
}

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

/** Invalidate in-memory caches (tests / admin hot-reload). */
export function clearCatalogCaches(): void {
  freeCache = null;
  rulesCache = null;
  copyCache = null;
}

export function loadFreeDemoCatalog(): FreeDemoCatalogFile {
  if (freeCache) return freeCache;
  freeCache = readJson<FreeDemoCatalogFile>(dataPath("free-demo-catalog.json"));
  return freeCache;
}

export function loadPaidEntitlementRules(): PaidEntitlementRulesFile {
  if (rulesCache) return rulesCache;
  rulesCache = readJson<PaidEntitlementRulesFile>(
    dataPath("paid-entitlement-rules.json")
  );
  return rulesCache;
}

export function loadSoftPaywallCopy(): SoftPaywallCopyFile {
  if (copyCache) return copyCache;
  copyCache = readJson<SoftPaywallCopyFile>(dataPath("soft-paywall-copy.json"));
  return copyCache;
}

export function listFreeDemoModules(): FreeDemoModule[] {
  return loadFreeDemoCatalog().modules;
}

export function freeDemoFolderKeys(): Set<string> {
  return new Set(listFreeDemoModules().map((m) => moduleKey(m.path)));
}

export function getPaywallCopy(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const entry = loadSoftPaywallCopy().strings[key];
  let s = entry?.[locale] || entry?.en || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, String(v));
    }
  }
  return s;
}

export function getDenyReasonCopy(
  reason: string,
  locale: Locale
): string {
  const rules = loadPaidEntitlementRules();
  const entry = rules.denyReasons[reason];
  return entry?.[locale] || entry?.en || reason;
}

export function outOfScopePrefixes(): string[] {
  return (
    loadPaidEntitlementRules().pathClassification.other.outOfScopePrefixes || []
  );
}

export function isOutOfScopePath(modulePath: string): boolean {
  const p = modulePath.replace(/\\/g, "/").replace(/^\//, "");
  return outOfScopePrefixes().some(
    (prefix) => p === prefix.replace(/\/$/, "") || p.startsWith(prefix)
  );
}

/** Path prefixes unlocked by a given entitlement (excluding free demos). */
export function prefixesForEntitlement(entitlement: Entitlement): string[] {
  const rules = loadPaidEntitlementRules();
  return rules.entitlements[entitlement]?.pathPrefixes ?? [];
}

export type CatalogApiPayload = {
  version: number;
  free: {
    count: number;
    policy: string;
    modules: Array<{
      id: string;
      path: string;
      folder: string;
      title: string;
      titleZh: string;
      subject: string;
      band: string;
      ageHint?: string;
      library: "primary" | "secondary";
    }>;
  };
  entitlements: PaidEntitlementRulesFile["entitlements"];
  summary: { en: string; "zh-HK": string };
  paywall: SoftPaywallCopyFile["strings"];
};

/** Shape returned by GET /api/catalog — safe for Agent 4/5 UI. */
export function buildCatalogApiPayload(): CatalogApiPayload {
  const free = loadFreeDemoCatalog();
  const rules = loadPaidEntitlementRules();
  const copy = loadSoftPaywallCopy();
  return {
    version: free.version,
    free: {
      count: free.count,
      policy: free.policy,
      modules: free.modules.map((m) => ({
        id: m.id,
        path: m.path,
        folder: moduleKey(m.path),
        title: m.title.en,
        titleZh: m.title["zh-HK"],
        subject: m.subject,
        band: m.band,
        ageHint: m.ageHint,
        library: m.library,
      })),
    },
    entitlements: rules.entitlements,
    summary: rules.summary,
    paywall: copy.strings,
  };
}
