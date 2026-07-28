import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, getAdminSecret } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { clearFreeDemoCache } from "@/lib/entitlements";
import { loadFreeDemoCatalog } from "@/lib/catalog";
import { CURRICULUM_SYSTEMS, loadCurriculumMap } from "@/lib/curriculum";

async function requireAdmin() {
  const secret = getAdminSecret();
  if (!secret) redirect("/admin/login");
  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value !== secret) redirect("/admin/login");
}

async function logoutAction() {
  "use server";
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  redirect("/admin/login");
}

async function saveFreeOverrideAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const raw = String(formData.get("paths") || "").trim();
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  await prisma.featureFlag.upsert({
    where: { key: "free_catalog_override" },
    update: { value: JSON.stringify(lines) },
    create: { key: "free_catalog_override", value: JSON.stringify(lines) },
  });
  clearFreeDemoCache();
  redirect("/admin?saved=flags");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  const [users, logs, flag] = await Promise.all([
    prisma.user.findMany({
      take: 40,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        subscription: {
          select: {
            entitlement: true,
            status: true,
            plan: true,
            trialEndsAt: true,
          },
        },
      },
    }),
    prisma.accessLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true } } },
    }),
    prisma.featureFlag.findUnique({ where: { key: "free_catalog_override" } }),
  ]);

  let overridePaths: string[] = [];
  try {
    const parsed = JSON.parse(flag?.value || "[]");
    if (Array.isArray(parsed)) overridePaths = parsed.filter((x) => typeof x === "string");
  } catch {
    overridePaths = [];
  }

  const freeCatalog = loadFreeDemoCatalog();
  const curriculum = loadCurriculumMap();
  const sampleMapped = curriculum.modules.slice(0, 8);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 font-sans text-zinc-900">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin MVP</h1>
          <p className="text-sm text-zinc-600">
            Users, entitlements, free demos, curriculum map, access logs
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-zinc-600 underline">
            Site
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="rounded border px-3 py-1.5">
              Log out
            </button>
          </form>
        </div>
      </header>

      {sp.saved === "flags" && (
        <p className="mt-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Free catalog override saved.
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-medium">Users & subscriptions</h2>
        <div className="mt-3 overflow-x-auto rounded border border-zinc-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Entitlement</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Plan</th>
                <th className="px-3 py-2 font-medium">Trial ends</th>
                <th className="px-3 py-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-zinc-100">
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2">{u.role}</td>
                  <td className="px-3 py-2">
                    {u.subscription?.entitlement ?? "—"}
                  </td>
                  <td className="px-3 py-2">{u.subscription?.status ?? "none"}</td>
                  <td className="px-3 py-2">{u.subscription?.plan ?? "—"}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {u.subscription?.trialEndsAt
                      ? u.subscription.trialEndsAt.toISOString().slice(0, 10)
                      : "—"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {u.createdAt.toISOString().slice(0, 10)}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-zinc-500">
                    No users yet. Run <code>npm run db:seed</code>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Free forever demos (seed)</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Canonical list from <code>data/free-demo-catalog.json</code> ({freeCatalog.count}{" "}
          modules). Guests may play without login.
        </p>
        <div className="mt-3 overflow-x-auto rounded border border-zinc-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-3 py-2 font-medium">ID</th>
                <th className="px-3 py-2 font-medium">Title</th>
                <th className="px-3 py-2 font-medium">Library</th>
                <th className="px-3 py-2 font-medium">Path</th>
              </tr>
            </thead>
            <tbody>
              {freeCatalog.modules.map((m) => (
                <tr key={m.id} className="border-t border-zinc-100">
                  <td className="px-3 py-2 font-mono text-xs">{m.id}</td>
                  <td className="px-3 py-2">
                    {m.title.en}
                    <span className="block text-xs text-zinc-500">{m.title["zh-HK"]}</span>
                  </td>
                  <td className="px-3 py-2">{m.library}</td>
                  <td className="max-w-md truncate px-3 py-2 font-mono text-xs">{m.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Free catalog override</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Extra module paths (one per line) merged with the seed catalog. Use folder or{" "}
          <code>.../index.html</code> paths.
        </p>
        <form action={saveFreeOverrideAction} className="mt-3 space-y-2">
          <textarea
            name="paths"
            rows={6}
            defaultValue={overridePaths.join("\n")}
            className="w-full rounded border border-zinc-300 px-3 py-2 font-mono text-xs"
            placeholder="Primary_School/Mathematics/P1/02_Some_Module/index.html"
          />
          <button
            type="submit"
            className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
          >
            Save override
          </button>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Curriculum mapping (read)</h2>
        <p className="mt-1 text-sm text-zinc-600">
          {curriculum.stats?.totalModules ?? curriculum.modules.length} modules · systems:{" "}
          {CURRICULUM_SYSTEMS.filter((k) => curriculum.systems[k])
            .map((k) => curriculum.systems[k].label)
            .join(", ")}
          . Approximate discovery only — not official endorsement. Regenerate with{" "}
          <code>npm run curriculum:generate</code>.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          {curriculum.disclaimer?.["zh-HK"] || curriculum.disclaimer?.en}
        </p>
        <div className="mt-3 overflow-x-auto rounded border border-zinc-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-3 py-2 font-medium">Title</th>
                <th className="px-3 py-2 font-medium">HK</th>
                <th className="px-3 py-2 font-medium">UK</th>
                <th className="px-3 py-2 font-medium">US</th>
                <th className="px-3 py-2 font-medium">IB</th>
                <th className="px-3 py-2 font-medium">SG</th>
                <th className="px-3 py-2 font-medium">Intl</th>
              </tr>
            </thead>
            <tbody>
              {sampleMapped.map((m) => (
                <tr key={m.moduleId || m.path} className="border-t border-zinc-100">
                  <td className="max-w-xs truncate px-3 py-2">{m.title}</td>
                  <td className="px-3 py-2">{m.hk}</td>
                  <td className="px-3 py-2">{m.uk}</td>
                  <td className="px-3 py-2">{m.us}</td>
                  <td className="px-3 py-2">{m.ib}</td>
                  <td className="px-3 py-2">{m.sg}</td>
                  <td className="px-3 py-2">{m.intl ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Showing first {sampleMapped.length} rows. Full map:{" "}
          <code>data/curriculum-map.json</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Recent access logs</h2>
        <div className="mt-3 overflow-x-auto rounded border border-zinc-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-3 py-2 font-medium">When</th>
                <th className="px-3 py-2 font-medium">User</th>
                <th className="px-3 py-2 font-medium">Module</th>
                <th className="px-3 py-2 font-medium">OK</th>
                <th className="px-3 py-2 font-medium">Reason</th>
                <th className="px-3 py-2 font-medium">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-t border-zinc-100">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {l.createdAt.toISOString().replace("T", " ").slice(0, 19)}
                  </td>
                  <td className="px-3 py-2">{l.user?.email ?? "guest"}</td>
                  <td className="max-w-xs truncate px-3 py-2 font-mono text-xs">
                    {l.modulePath}
                  </td>
                  <td className="px-3 py-2">{l.allowed ? "yes" : "no"}</td>
                  <td className="px-3 py-2">{l.reason}</td>
                  <td className="px-3 py-2">{l.ip ?? "—"}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-zinc-500">
                    No access logs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        <h2 className="font-medium text-zinc-900">Ops notes</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
          <li>
            Stripe: set keys + <code>npm run stripe:products</code> → webhook → see GO_LIVE_ZH.md
          </li>
          <li>
            Entitlements: <code>free</code> | <code>primary</code> | <code>secondary</code> |{" "}
            <code>all</code>
          </li>
          <li>
            Module proxy: <code>/api/modules/[...path]</code> (auth + entitlement + watermark)
          </li>
        </ul>
      </section>
    </main>
  );
}
