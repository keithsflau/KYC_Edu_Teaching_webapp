import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

/** Create a Stripe Customer Portal session (manage / cancel / update payment). */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sub = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  if (!sub?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No Stripe customer — subscribe first" },
      { status: 400 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

  const portal = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${origin}/account`,
  });

  return NextResponse.json({ url: portal.url });
}
