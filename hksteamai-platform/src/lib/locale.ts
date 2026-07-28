import { cookies } from "next/headers";
import type { Locale } from "./i18n";

export const LOCALE_COOKIE = "locale";

export async function getLocale(searchParams?: { lang?: string }): Promise<Locale> {
  if (searchParams?.lang === "zh-HK" || searchParams?.lang === "en") {
    return searchParams.lang;
  }
  const jar = await cookies();
  const c = jar.get(LOCALE_COOKIE)?.value;
  if (c === "zh-HK" || c === "en") return c;
  return "en";
}

export function parseLocaleParam(raw: string | null | undefined): Locale | null {
  if (raw === "zh-HK" || raw === "en") return raw;
  if (raw === "zh" || raw === "zh-TW" || raw === "zh-Hant") return "zh-HK";
  return null;
}
