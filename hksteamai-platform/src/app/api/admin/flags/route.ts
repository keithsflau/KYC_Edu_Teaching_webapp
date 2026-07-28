import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { clearFreeDemoCache } from "@/lib/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** List / update feature flags. Primary: free_catalog_override (JSON path array). */
export async function GET(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const flags = await prisma.featureFlag.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ flags });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const key = String(body.key || "").trim();
  if (!key) {
    return NextResponse.json({ error: "key required" }, { status: 400 });
  }

  let value: string;
  if (typeof body.value === "string") {
    value = body.value;
  } else {
    value = JSON.stringify(body.value ?? []);
  }

  // Validate free_catalog_override is a JSON array of strings
  if (key === "free_catalog_override") {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed) || !parsed.every((x) => typeof x === "string")) {
        return NextResponse.json(
          { error: "free_catalog_override must be a JSON string array" },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  }

  const flag = await prisma.featureFlag.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  if (key === "free_catalog_override") clearFreeDemoCache();

  return NextResponse.json({ flag });
}
