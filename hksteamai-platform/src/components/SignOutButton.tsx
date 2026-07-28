"use client";

import { signOut } from "next-auth/react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function SignOutButton({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {t(locale, "navLogout")}
    </button>
  );
}
