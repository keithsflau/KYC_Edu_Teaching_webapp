/**
 * HK Cirriculum — Stripe webhook + entitlement redeem (Cloudflare Worker)
 *
 * Routes:
 *   POST /webhook/stripe     — verify Stripe-Signature, persist entitlement (KV)
 *   POST /api/redeem         — { sessionId: "cs_…" } → entitlement JSON for static site
 *   GET  /api/health         — deploy smoke test
 *
 * Env (secrets via wrangler secret put):
 *   STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, ENTITLEMENT_SIGNING_SECRET (optional)
 *   ENTITLEMENTS (KV), ALLOWED_ORIGINS (var)
 */

const PARENT_MONTHLY_PRICE = "price_1Ty1hzAfkh50GY5IIAtXBVD8";
const PARENT_ANNUAL_PRICE = "price_1Ty1i0Afkh50GY5ILPYWG1oc";
const PARENT_MONTHLY_PRICE_TEST = "price_1TyDxEAfkh50GY5IhH2Vc9u0";
const PARENT_ANNUAL_PRICE_TEST = "price_1TyDxGAfkh50GY5IGWDHPIWg";
const FAMILY_MONTHLY_PRICE_TEST = "price_1TyDxIAfkh50GY5IPlVIJhu9";
const FAMILY_ANNUAL_PRICE_TEST = "price_1TyDxKAfkh50GY5IkuQfQbu2";

const PARENT_MONTHLY_PRICES = [PARENT_MONTHLY_PRICE, PARENT_MONTHLY_PRICE_TEST];
const PARENT_ANNUAL_PRICES = [PARENT_ANNUAL_PRICE, PARENT_ANNUAL_PRICE_TEST];

const corsHeaders = (origin, env) => {
  const allowed = parseOrigins(env.ALLOWED_ORIGINS);
  const o = origin && allowed.includes(origin) ? origin : allowed[0] || "*";
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
    "Access-Control-Max-Age": "86400"
  };
};

function parseOrigins(raw) {
  return String(raw || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, extraHeaders || {})
  });
}

function hex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader || !secret) return false;
  const parts = {};
  for (const piece of sigHeader.split(",")) {
    const eq = piece.indexOf("=");
    if (eq === -1) continue;
    parts[piece.slice(0, eq)] = piece.slice(eq + 1);
  }
  const timestamp = parts.t;
  const sig = parts.v1;
  if (!timestamp || !sig) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`)
  );
  return timingSafeEqual(hex(signed), sig);
}

async function signPayload(obj, secret) {
  if (!secret) return null;
  const body = JSON.stringify(obj);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return hex(sig);
}

function inferTierFromSession(session) {
  const meta = session.metadata || {};
  if (meta.tier) return normalizeTier(meta.tier);
  if (meta.plan) return normalizeTier(meta.plan);

  const lineItems = session.line_items && session.line_items.data;
  if (lineItems && lineItems.length) {
    for (const item of lineItems) {
      const priceId = item.price && (item.price.id || item.price);
      if (priceId === PARENT_MONTHLY_PRICE || priceId === PARENT_MONTHLY_PRICE_TEST) return "parent";
      if (priceId === PARENT_ANNUAL_PRICE || priceId === PARENT_ANNUAL_PRICE_TEST) return "parent";
      if (priceId === FAMILY_MONTHLY_PRICE_TEST || priceId === FAMILY_ANNUAL_PRICE_TEST) return "family";
    }
  }

  const amount = session.amount_total;
  if (amount === 6800 || amount === 58800) return "parent";
  if (amount === 9800 || amount === 84800) return "family";

  return "parent";
}

function normalizeTier(raw) {
  const p = String(raw || "parent")
    .trim()
    .toLowerCase();
  if (p === "family" || p === "school") return p;
  if (p === "parent" || p === "trial" || p === "parentmonthly" || p === "parentannual") return "parent";
  return "parent";
}

function inferExpiresAt(session, tier) {
  if (session.expires_at) {
    return new Date(session.expires_at * 1000).toISOString();
  }
  const mode = session.mode;
  const now = Date.now();
  if (mode === "subscription" && session.subscription) {
    return new Date(now + 32 * 864e5).toISOString();
  }
  const lineItems = session.line_items && session.line_items.data;
  if (lineItems && lineItems.length) {
    for (const item of lineItems) {
      const priceId = item.price && (item.price.id || item.price);
      if (priceId === PARENT_ANNUAL_PRICE || priceId === PARENT_ANNUAL_PRICE_TEST) return new Date(now + 366 * 864e5).toISOString();
      if (priceId === PARENT_MONTHLY_PRICE || priceId === PARENT_MONTHLY_PRICE_TEST) return new Date(now + 32 * 864e5).toISOString();
      if (priceId === FAMILY_ANNUAL_PRICE_TEST) return new Date(now + 366 * 864e5).toISOString();
      if (priceId === FAMILY_MONTHLY_PRICE_TEST) return new Date(now + 32 * 864e5).toISOString();
    }
  }
  const amount = session.amount_total;
  if (amount === 58800 || amount === 84800) return new Date(now + 366 * 864e5).toISOString();
  if (tier === "family") return new Date(now + 32 * 864e5).toISOString();
  return new Date(now + 366 * 864e5).toISOString();
}

function buildEntitlementRecord(session, overrides) {
  const tier = overrides && overrides.tier ? overrides.tier : inferTierFromSession(session);
  const active =
    overrides && typeof overrides.active === "boolean" ? overrides.active : session.payment_status === "paid";
  const expiresAt =
    overrides && overrides.expiresAt !== undefined
      ? overrides.expiresAt
      : active
        ? inferExpiresAt(session, tier)
        : null;

  return {
    tier: active ? tier : "free",
    plan: active ? tier : "free",
    seats: tier === "family" || tier === "school" ? 3 : 1,
    expiresAt,
    email: (session.customer_details && session.customer_details.email) || session.customer_email || null,
    stripeCustomerId: session.customer || null,
    stripeSubscriptionId: session.subscription || null,
    sessionId: session.id || null,
    source: "stripe_webhook",
    testMode: false,
    active,
    updatedAt: new Date().toISOString()
  };
}

async function persistEntitlement(env, record) {
  const payload = JSON.stringify(record);
  if (record.sessionId) {
    await env.ENTITLEMENTS.put(`session:${record.sessionId}`, payload, { expirationTtl: 86400 * 14 });
  }
  if (record.stripeCustomerId) {
    await env.ENTITLEMENTS.put(`customer:${record.stripeCustomerId}`, payload);
  }
  if (record.email) {
    await env.ENTITLEMENTS.put(`email:${record.email.toLowerCase()}`, payload);
  }
}

async function fetchStripeSession(sessionId, env) {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return null;
  const url = `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=line_items`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${key}` }
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchStripeSubscription(subscriptionId, env) {
  const key = env.STRIPE_SECRET_KEY;
  if (!key || !subscriptionId) return null;
  const res = await fetch(`https://api.stripe.com/v1/subscriptions/${encodeURIComponent(subscriptionId)}`, {
    headers: { Authorization: `Bearer ${key}` }
  });
  if (!res.ok) return null;
  return res.json();
}

async function handleCheckoutCompleted(session, env) {
  const record = buildEntitlementRecord(session);
  await persistEntitlement(env, record);
  return record;
}

async function handleSubscriptionChange(subscription, env) {
  const active = subscription.status === "active" || subscription.status === "trialing";
  const tier = normalizeTier(
    (subscription.metadata && (subscription.metadata.tier || subscription.metadata.plan)) || "parent"
  );
  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null;

  const record = {
    tier: active ? tier : "free",
    plan: active ? tier : "free",
    seats: tier === "family" || tier === "school" ? 3 : 1,
    expiresAt: active ? periodEnd : null,
    email: null,
    stripeCustomerId: subscription.customer || null,
    stripeSubscriptionId: subscription.id,
    sessionId: null,
    source: "stripe_webhook",
    testMode: false,
    active,
    updatedAt: new Date().toISOString()
  };

  await env.ENTITLEMENTS.put(`customer:${subscription.customer}`, JSON.stringify(record));
  return record;
}

async function handleStripeWebhook(request, env) {
  const sig = request.headers.get("Stripe-Signature");
  const secret = env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return json({ error: "webhook_secret_not_configured" }, 503);

  const body = await request.text();
  const ok = await verifyStripeSignature(body, sig, secret);
  if (!ok) return json({ error: "invalid_signature" }, 400);

  let event;
  try {
    event = JSON.parse(body);
  } catch (e) {
    return json({ error: "invalid_json" }, 400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(event.data.object, env);
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await handleSubscriptionChange(event.data.object, env);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("webhook_handler_error", err);
    return json({ error: "handler_failed" }, 500);
  }

  return json({ received: true });
}

async function handleRedeem(request, env, origin) {
  let sessionId = null;
  const contentType = request.headers.get("Content-Type") || "";
  if (request.method === "GET") {
    sessionId = new URL(request.url).searchParams.get("session_id") || new URL(request.url).searchParams.get("sessionId");
  } else if (contentType.includes("application/json")) {
    const body = await request.json();
    sessionId = body.sessionId || body.session_id;
  } else {
    const text = await request.text();
    try {
      const body = JSON.parse(text);
      sessionId = body.sessionId || body.session_id;
    } catch (e) {
      sessionId = text.trim();
    }
  }

  if (!sessionId || !String(sessionId).startsWith("cs_")) {
    return json({ error: "invalid_session_id" }, 400, corsHeaders(origin, env));
  }

  let record = await env.ENTITLEMENTS.get(`session:${sessionId}`, "json");

  if (!record || !record.active) {
    const session = await fetchStripeSession(sessionId, env);
    if (session && (session.payment_status === "paid" || session.status === "complete")) {
      record = buildEntitlementRecord(session);
      await persistEntitlement(env, record);
    }
  }

  if (!record || record.plan === "free" || record.active === false) {
    return json(
      {
        error: "not_found",
        message: "Payment not confirmed yet. Wait a moment and retry, or use TEST MODE fallback."
      },
      404,
      corsHeaders(origin, env)
    );
  }

  const signingSecret = env.ENTITLEMENT_SIGNING_SECRET || env.STRIPE_WEBHOOK_SECRET;
  const sig = await signPayload(record, signingSecret);

  return json(
    {
      ok: true,
      entitlement: record,
      token: sig
    },
    200,
    corsHeaders(origin, env)
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (path === "/api/health" && request.method === "GET") {
      return json(
        {
          ok: true,
          service: "hkc-stripe-entitlement",
          version: "1.0.0",
          webhookConfigured: !!env.STRIPE_WEBHOOK_SECRET,
          redeemConfigured: !!(env.STRIPE_SECRET_KEY || env.STRIPE_WEBHOOK_SECRET)
        },
        200,
        corsHeaders(origin, env)
      );
    }

    if (path === "/webhook/stripe" && request.method === "POST") {
      return handleStripeWebhook(request, env);
    }

    if (path === "/api/redeem" && (request.method === "POST" || request.method === "GET")) {
      return handleRedeem(request, env, origin);
    }

    return json({ error: "not_found" }, 404, corsHeaders(origin, env));
  }
};
