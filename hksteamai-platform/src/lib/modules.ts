import fs from "fs";
import path from "path";
import { getModulesRoot, moduleKey } from "./entitlements";

const ALLOWED_PREFIXES = [
  "Primary_School/",
  "Secondary_School/",
  "bible_study/",
  "typing test/",
];

export function sanitizeModulePath(raw: string): string | null {
  if (!raw || typeof raw !== "string") return null;
  const p = raw.replace(/\\/g, "/").replace(/^\//, "").trim();
  if (!p || p.includes("\0") || p.includes("..")) return null;
  // Disallow absolute / UNC
  if (path.isAbsolute(p) || /^[a-zA-Z]:/.test(p)) return null;

  const key = moduleKey(p);
  const withIndex = key.endsWith(".html") ? key : `${key}/index.html`;
  const ok = ALLOWED_PREFIXES.some((prefix) => withIndex.startsWith(prefix));
  if (!ok) return null;
  return withIndex;
}

/** Resolve to absolute filesystem path under MODULES_ROOT; null if escape */
export function resolveModuleFile(moduleRel: string): string | null {
  const safe = sanitizeModulePath(moduleRel);
  if (!safe) return null;
  const root = path.resolve(getModulesRoot());
  const abs = path.resolve(root, ...safe.split("/"));
  const rel = path.relative(root, abs);
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) {
    return null;
  }
  return abs;
}

export function readModuleHtml(moduleRel: string): string | null {
  const abs = resolveModuleFile(moduleRel);
  if (!abs || !fs.existsSync(abs)) return null;
  const stat = fs.statSync(abs);
  if (!stat.isFile()) return null;
  // Cap size to avoid accidental huge reads (MVP)
  if (stat.size > 8 * 1024 * 1024) return null;
  return fs.readFileSync(abs, "utf8");
}

/**
 * Inject a subtle watermark (HTML comment + meta) with user id.
 * Does not break module scripts; visible in View Source for leak tracing.
 */
export function watermarkHtml(
  html: string,
  opts: { userId: string | null; modulePath: string }
): string {
  const uid = opts.userId || "guest";
  const stamp = new Date().toISOString();
  const comment = `<!-- hksteamai-wm uid=${uid} path=${opts.modulePath} at=${stamp} -->`;
  const meta = `<meta name="hksteamai-wm" content="${uid}" />`;

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (m) => `${m}\n${meta}\n${comment}`);
  }
  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html[^>]*>/i, (m) => `${m}\n${comment}\n${meta}`);
  }
  return `${comment}\n${meta}\n${html}`;
}

export function clientIp(headers: Headers): string {
  const xf = headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return headers.get("x-real-ip") || "unknown";
}
