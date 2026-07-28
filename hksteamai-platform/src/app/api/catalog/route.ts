import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { buildCatalogApiPayload } from "@/lib/catalog";
import {
  gradeForSystem,
  gradeLabelFor,
  loadCurriculumMap,
  moduleDisplayTitle,
  type CurriculumSystem,
} from "@/lib/curriculum";
import {
  canAccessModuleAsync,
  getUserAccess,
  loadFreeDemoPathsWithOverrides,
  moduleKey,
} from "@/lib/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/catalog
 *
 * - No filter params → Agent 2 marketing payload (free demos + paywall copy).
 * - With `system` (and optional grade/subject/q) → library browse using curriculum-map.json.
 */
export async function GET(req: NextRequest) {
  const systemParam = req.nextUrl.searchParams.get("system");

  // Marketing / soft-paywall shape (Agent 2) when region filter not requested
  if (!systemParam) {
    try {
      const payload = buildCatalogApiPayload();
      return NextResponse.json(payload, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "catalog_load_failed";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  const session = await auth();
  const userId = session?.user?.id ?? null;
  const { entitlement } = await getUserAccess(userId);
  const system = (
    systemParam === "all" ? "hk" : systemParam
  ) as CurriculumSystem;
  const grade = req.nextUrl.searchParams.get("grade") || "all";
  const subject = req.nextUrl.searchParams.get("subject") || "all";
  const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase().trim();
  const lang =
    req.nextUrl.searchParams.get("lang") === "zh-HK" ||
    req.nextUrl.searchParams.get("lang") === "zh"
      ? "zh-HK"
      : "en";
  const limit = Math.min(
    500,
    Math.max(1, Number(req.nextUrl.searchParams.get("limit") || 120) || 120)
  );

  const map = loadCurriculumMap();
  const freeSet = await loadFreeDemoPathsWithOverrides();

  const modules = [];
  for (const m of map.modules) {
    const g = gradeForSystem(m, system);
    if (!g) continue;
    if (grade !== "all" && g !== grade && !String(g).startsWith(grade)) continue;
    if (subject !== "all" && m.subject !== subject) continue;
    if (q) {
      const hay =
        `${m.title} ${m.titleZh || ""} ${m.subject} ${m.path} ${m.topics.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) continue;
    }

    const key = moduleKey(m.path);
    const isFree = freeSet.has(key) || !!m.freeDemo;
    // Guests: free demos only. Signed-in: locked stubs OK for soft paywall UI.
    if (!isFree && !userId) continue;

    const decision = await canAccessModuleAsync(entitlement, m.path);
    const playable = decision.allowed;

    modules.push({
      moduleId: m.moduleId,
      path: m.path,
      title: moduleDisplayTitle(m, lang),
      subject: m.subject,
      section: m.section,
      freeDemo: isFree,
      locked: !playable,
      gradeLabel: gradeLabelFor(m, system, lang),
      hk: m.hk,
      uk: m.uk,
      us: m.us,
      ib: m.ib,
      sg: m.sg,
      au: m.au,
    });

    if (modules.length >= limit) break;
  }

  return NextResponse.json({
    entitlement,
    authenticated: !!userId,
    total: modules.length,
    system,
    grade,
    disclaimer: map.disclaimer[lang] || map.disclaimer.en,
    systems: map.systems,
    approximate: map.approximate !== false,
    modules,
  });
}
