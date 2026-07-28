import fs from "fs";
import path from "path";
import { moduleKey } from "./entitlements";
import type { Locale } from "./i18n";

export type FreeDemoModule = {
  id: string;
  path: string;
  title: { en: string; "zh-HK": string };
  subject: string;
  band: string;
  why?: string;
};

export type FreeDemoCatalog = {
  version: number;
  policy?: string;
  count?: number;
  modules: FreeDemoModule[];
};

let cache: FreeDemoCatalog | null = null;

export function loadFreeDemoCatalog(): FreeDemoCatalog {
  if (cache) return cache;
  const file = path.join(process.cwd(), "data", "free-demo-catalog.json");
  if (!fs.existsSync(file)) {
    return { version: 0, modules: [] };
  }
  cache = JSON.parse(fs.readFileSync(file, "utf8")) as FreeDemoCatalog;
  return cache;
}

export function freeDemoTitle(modulePath: string, locale: Locale): string | null {
  const key = moduleKey(modulePath);
  const hit = loadFreeDemoCatalog().modules.find((m) => moduleKey(m.path) === key);
  if (!hit) return null;
  return hit.title[locale] || hit.title.en;
}
