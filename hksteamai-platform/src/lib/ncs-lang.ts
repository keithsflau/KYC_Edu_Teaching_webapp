/** NCS language codes — must stay aligned with `HK Cirriculum/_shared/ncs-i18n.js`. */
export const NCS_STORAGE_KEY = "hksteam.ncs-lang";

/** postMessage `type` from platform play shell → embedded module iframe. */
export const NCS_MESSAGE_TYPE = "hksteam.ncs-lang";

export type NcsLangCode = "zh-Hant" | "en" | "ne" | "ur" | "tl" | "hi";

export type NcsLangOption = {
  code: NcsLangCode;
  native: string;
  dir: "ltr" | "rtl";
};

export const NCS_LANGS: readonly NcsLangOption[] = [
  { code: "zh-Hant", native: "繁體中文", dir: "ltr" },
  { code: "en", native: "English", dir: "ltr" },
  { code: "ne", native: "नेपाली", dir: "ltr" },
  { code: "ur", native: "اردو", dir: "rtl" },
  { code: "tl", native: "Filipino", dir: "ltr" },
  { code: "hi", native: "हिन्दी", dir: "ltr" },
] as const;

const LEGACY_ALIASES: Record<string, NcsLangCode> = {
  zh: "zh-Hant",
  "zh-HK": "zh-Hant",
  "zh-TW": "zh-Hant",
  fil: "tl",
};

export function normalizeNcsLang(code: string | null | undefined): NcsLangCode {
  if (!code) return "zh-Hant";
  const trimmed = code.trim();
  const alias = LEGACY_ALIASES[trimmed] ?? LEGACY_ALIASES[trimmed.toLowerCase()];
  if (alias) return alias;
  if (NCS_LANGS.some((l) => l.code === trimmed)) return trimmed as NcsLangCode;
  return "zh-Hant";
}

export function readStoredNcsLang(): NcsLangCode {
  if (typeof window === "undefined") return "zh-Hant";
  try {
    const primary = window.localStorage.getItem(NCS_STORAGE_KEY);
    if (primary) return normalizeNcsLang(primary);
    const legacy = window.localStorage.getItem("hkc-ncs-lang");
    if (legacy) return normalizeNcsLang(legacy);
    const hkc = window.localStorage.getItem("hkc-lang");
    if (hkc === "en") return "en";
    if (hkc) return "zh-Hant";
  } catch {
    /* private mode */
  }
  return "zh-Hant";
}

export function writeStoredNcsLang(code: NcsLangCode): void {
  if (typeof window === "undefined") return;
  const lang = normalizeNcsLang(code);
  try {
    window.localStorage.setItem(NCS_STORAGE_KEY, lang);
    window.localStorage.setItem("hkc-ncs-lang", lang);
    window.localStorage.setItem("hkc-lang", lang === "en" ? "en" : "zh");
  } catch {
    /* quota / private mode */
  }
}

export function moduleSrcWithLang(src: string, lang: NcsLangCode): string {
  const url = new URL(src, "http://local");
  url.searchParams.set("lang", lang);
  return `${url.pathname}${url.search}`;
}

export function postNcsLangToIframe(
  iframe: HTMLIFrameElement | null,
  lang: NcsLangCode
): void {
  const win = iframe?.contentWindow;
  if (!win) return;
  win.postMessage({ type: NCS_MESSAGE_TYPE, lang }, window.location.origin);
}
