import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  gradeForSystem,
  gradeLabelFor,
  loadCurriculumMap,
  type CurriculumSystem,
} from "@/lib/curriculum";
import {
  canAccessModuleAsync,
  getUserAccess,
  loadFreeDemoPathsWithOverrides,
  moduleKey,
  type Entitlement,
} from "@/lib/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Catalog for Agent 4 UI.
 *
 * - Guests / free: only free-demo modules are fully listable with playable=true.
 * - Paid titles may appear as locked stubs when `includeLocked=1` AND signed in.
 * - Default (no auth): free demos only.
 *
 * Query: system, grade, includeLocked=0|1, q=, lang=
 *
 * Modules use flat tags: hk / uk / us / ib / sg / au (see CURRICULUM_MAP.md).
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  const { entitlement } = await getUserAccess(userId);
  const includeLocked =
    req.nextUrl.searchParams.get("includeLocked") === "1" && !!userId;
  const systemParam = req.nextUrl.searchParams.get("system") || "hk";
  const system = (
    systemParam === "all" ? "hk" : systemParam
  ) as CurriculumSystem;
  const grade = req.nextUrl.searchParams.get("grade") || undefined;
  const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase().trim();
  const lang =
    req.nextUrl.searchParams.get("lang") === "zh-HK" ? "zh-HK" : "en";

  const freeSet = await loadFreeDemoPathsWithOverrides();
  const map = loadCurriculumMap();

  type Item = {
    moduleId: string;
    path: string;
    title: string;
    titleZh?: string | null;
    subject: string;
    section: string;
    hk: string;
    uk: string;
    us: string;
    ib: string;
    sg: string;
    au?: string;
    gradeLabel: string;
    freeDemo: boolean;
    locked: boolean;
    playable: boolean;
    reason: string;
    entitlementNeeded?: Entitlement;
  };

  const items: Item[] = [];

  for (const m of map.modules) {
    const key = moduleKey(m.path);
    const isFree = freeSet.has(key) || !!m.freeDemo;

    if (systemParam && systemParam !== "all") {
      const g = gradeForSystem(m, system);
      if (!g) continue;
      if (
        grade &&
        grade !== "all" &&
        g !== grade &&
        !String(g).startsWith(grade)
      ) {
        continue;
      }
    }

    if (q) {
      const hay =
        `${m.title} ${m.titleZh || ""} ${m.subject} ${m.path} ${m.topics.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) continue;
    }

    const decision = await canAccessModuleAsync(entitlement, m.path);
    const playable = decision.allowed && (isFree || !!userId);

    if (!isFree && !includeLocked && !playable) continue;
    if (!isFree && !userId) continue;

    items.push({
      moduleId: m.moduleId,
      path: m.path,
      title: m.title,
      titleZh: m.titleZh,
      subject: m.subject,
      section: m.section || "other",
      hk: m.hk,
      uk: m.uk,
      us: m.us,
      ib: m.ib,
      sg: m.sg,
      au: m.au,
      gradeLabel: gradeLabelFor(m, system, lang),
      freeDemo: isFree,
      locked: !playable,
      playable,
      reason: decision.reason,
      entitlementNeeded: isFree
        ? "free"
        : m.section === "primary"
          ? "primary"
          : m.section === "secondary"
            ? "secondary"
            : "all",
    });
  }

  if (items.length === 0 && freeSet.size > 0 && map.modules.length === 0) {
    const { listFreeDemoModules } = await import("@/lib/catalog");
    for (const m of listFreeDemoModules()) {
      items.push({
        moduleId: m.id,
        path: moduleKey(m.path),
        title: m.title.en,
        titleZh: m.title["zh-HK"],
        subject: m.subject,
        section: m.library,
        hk: "",
        uk: "",
        us: "",
        ib: "",
        sg: "",
        gradeLabel: "",
        freeDemo: true,
        locked: false,
        playable: true,
        reason: "free_demo",
        entitlementNeeded: "free",
      });
    }
  }

  return NextResponse.json({
    entitlement,
    authenticated: !!userId,
    count: items.length,
    total: items.length,
    system,
    disclaimer: map.disclaimer[lang] || map.disclaimer.en,
    systems: map.systems,
    approximate: map.approximate,
    modules: items,
    policy: {
      publicListable: "free_demos_only",
      paidHtml: "via /api/modules/content after entitlement",
      mapping:
        "Grade tags are approximate discovery equivalences — not accreditation.",
    },
  });
}
