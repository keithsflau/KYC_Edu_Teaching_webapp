import type { Metadata } from "next";
import { Fraunces, Manrope, Noto_Sans_TC } from "next/font/google";
import { auth } from "@/lib/auth";
import { getLocale } from "@/lib/locale";
import { getUserAccess } from "@/lib/entitlements";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrialBanner } from "@/components/TrialBanner";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const noto = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-zh",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HK Steam AI",
    template: "%s · HK Steam AI",
  },
  description:
    "HK Steam AI — subscription STEM/STEAM learning for Hong Kong and diaspora families. Free demos, Basic and Pro plans in HKD. Support: support@hksteamai.com",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const session = await auth();
  let daysLeft: number | null = null;
  let expired = false;

  if (session?.user?.id) {
    try {
      const access = await getUserAccess(session.user.id);
      const ends = access.trialEndsAt;
      if (access.subscription?.status === "trialing" && ends) {
        daysLeft = Math.max(
          0,
          Math.ceil((ends.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
        );
      } else if (
        ends &&
        ends.getTime() < Date.now() &&
        access.entitlement === "free"
      ) {
        expired = true;
      }
    } catch {
      // DB may not be migrated yet — skip trial banner
    }
  }

  return (
    <html
      lang={locale === "zh-HK" ? "zh-HK" : "en"}
      className={`${display.variable} ${sans.variable} ${noto.variable}`}
    >
      <body>
        <Providers>
          <SiteHeader
            locale={locale}
            email={session?.user?.email}
            role={session?.user?.role}
          />
          <TrialBanner locale={locale} daysLeft={daysLeft} expired={expired} />
          <main className="page-main">{children}</main>
          <SiteFooter locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
