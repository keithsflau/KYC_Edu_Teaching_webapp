import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { auth } from "@/lib/auth";
import {
  canAccessModule,
  getUserAccess,
  moduleKey,
} from "@/lib/entitlements";
import {
  loadCurriculumMap,
  moduleDisplayTitle,
} from "@/lib/curriculum";
import { getPaywallCopy } from "@/lib/catalog";
import { SoftPaywall } from "@/components/SoftPaywall";
import { PlayableModule } from "@/components/PlayableModule";

type Params = Promise<{ path: string[] }>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Params }) {
  const { path: parts } = await params;
  const key = moduleKey(parts.map(decodeURIComponent).join("/"));
  return { title: key.split("/").pop() || "Play" };
}

export default async function PlayPage({ params }: { params: Params }) {
  const locale = await getLocale();
  const { path: parts } = await params;
  const rel = parts.map(decodeURIComponent).join("/");
  const key = moduleKey(rel);

  const session = await auth();
  let entitlement: Awaited<ReturnType<typeof getUserAccess>>["entitlement"] =
    "free";
  try {
    entitlement = (await getUserAccess(session?.user?.id)).entitlement;
  } catch {
    entitlement = "free";
  }

  const decision = canAccessModule(entitlement, key);
  // Paid modules need sign-in even when entitled (matches module proxy)
  const playable = decision.allowed && (decision.isFreeDemo || !!session?.user?.id);

  const map = loadCurriculumMap();
  const meta = map.modules.find((m) => moduleKey(m.path) === key);
  const title = meta
    ? moduleDisplayTitle(meta, locale)
    : key.split("/").pop() || key;

  // Path-style proxy so relative assets (../../common/*.js) resolve under /api/modules/...
  const contentPath = moduleKey(meta?.path || key);
  const src = `/api/modules/${contentPath
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

  if (playable) {
    return (
      <div className="shell player-shell">
        <PlayableModule
          src={src}
          title={title}
          backLabel={t(locale, "backToLibrary")}
          isFreeDemo={decision.isFreeDemo}
          freeBadge={getPaywallCopy(locale, "freeBadge")}
        />
      </div>
    );
  }

  return (
    <div className="shell player-shell">
      <div className="player-toolbar">
        <Link href="/library" className="btn btn-ghost btn-sm">
          {t(locale, "backToLibrary")}
        </Link>
        <h1>{title}</h1>
      </div>

      <div className="player-frame-wrap">
        <div
          style={{
            height: "min(72vh, 820px)",
            background:
              "linear-gradient(160deg, #1a3d36, #0e241f 60%, #2a2118)",
          }}
        />
        <SoftPaywall locale={locale} signedIn={Boolean(session?.user)} />
      </div>
    </div>
  );
}
