import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listFreeDemoModules } from "@/lib/catalog";
import { getUserAccess, moduleKey } from "@/lib/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public free-demo list (always listable, no auth).
 * Source of truth: data/free-demo-catalog.json via @/lib/catalog
 * Paid catalog: /api/modules/catalog · marketing bundle: /api/catalog
 */
export async function GET() {
  const modules = listFreeDemoModules();
  const session = await auth();
  const { entitlement } = await getUserAccess(session?.user?.id);

  return NextResponse.json({
    policy:
      "These modules are free forever. Guests may play without an account.",
    entitlement,
    authenticated: !!session?.user?.id,
    count: modules.length,
    modules: modules.map((m) => ({
      id: m.id,
      path: m.path,
      key: moduleKey(m.path),
      title: m.title,
      subject: m.subject,
      band: m.band,
      ageHint: m.ageHint,
      library: m.library,
      freeDemo: true,
      locked: false,
      playable: true,
      contentUrl: `/api/modules/content?path=${encodeURIComponent(m.path)}`,
    })),
  });
}
