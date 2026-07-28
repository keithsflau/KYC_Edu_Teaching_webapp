import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, getAdminSecret } from "@/lib/admin";

async function loginAction(formData: FormData) {
  "use server";
  const secret = getAdminSecret();
  const provided = String(formData.get("secret") || "");
  if (!secret || provided !== secret) {
    redirect("/admin/login?error=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const secret = getAdminSecret();
  const jar = await cookies();
  if (secret && jar.get(ADMIN_COOKIE)?.value === secret) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16 font-sans">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Enter <code className="rounded bg-zinc-100 px-1">ADMIN_SECRET</code> to
        open the MVP backoffice.
      </p>
      {!secret && (
        <p className="mt-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Set <code>ADMIN_SECRET</code> in <code>.env</code> and restart the
          server.
        </p>
      )}
      {sp.error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          Invalid secret.
        </p>
      )}
      <form action={loginAction} className="mt-6 space-y-3">
        <label className="block text-sm font-medium text-zinc-700">
          Admin secret
          <input
            name="secret"
            type="password"
            autoComplete="current-password"
            disabled={!secret}
            className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            required
          />
        </label>
        <button
          type="submit"
          disabled={!secret}
          className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
