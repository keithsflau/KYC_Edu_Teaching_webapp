import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  attachCheckoutSession,
  softDowngradeToFree,
  syncSubscriptionFromStripe,
} from "@/lib/subscription-sync";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function retrieveSubscription(id: string) {
  return stripe.subscriptions.retrieve(id);
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret || secret.includes("placeholder")) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("[stripe-webhook] signature", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const linked = await attachCheckoutSession(session);
        if (linked?.subscriptionId) {
          const sub = await retrieveSubscription(linked.subscriptionId);
          await syncSubscriptionFromStripe(sub, {
            userId: linked.userId,
            customerId: linked.customerId ?? undefined,
          });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const stripeSub = event.data.object as Stripe.Subscription;
        await syncSubscriptionFromStripe(stripeSub);
        break;
      }

      case "customer.subscription.deleted": {
        const stripeSub = event.data.object as Stripe.Subscription;
        const userId =
          stripeSub.metadata?.userId ||
          (
            await prisma.subscription.findFirst({
              where: { stripeSubscriptionId: stripeSub.id },
            })
          )?.userId;

        if (userId) {
          await softDowngradeToFree(userId);
        } else {
          await syncSubscriptionFromStripe(stripeSub);
        }
        break;
      }

      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef =
          invoice.parent?.subscription_details &&
          (typeof invoice.parent.subscription_details.subscription === "string"
            ? invoice.parent.subscription_details.subscription
            : invoice.parent.subscription_details.subscription?.id);

        if (subRef) {
          const sub = await retrieveSubscription(subRef);
          await syncSubscriptionFromStripe(sub);
        }
        break;
      }

      default:
        // Ignore unrelated events
        break;
    }
  } catch (err) {
    console.error("[stripe-webhook] handler error", event.type, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
