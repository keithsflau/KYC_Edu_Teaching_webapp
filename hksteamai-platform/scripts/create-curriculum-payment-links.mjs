/**
 * Create Stripe TEST Payment Links for HK Cirriculum (HK$68/588/98/848).
 * Run: npm run stripe:curriculum-links
 */
import "dotenv/config";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const key = process.env.STRIPE_SECRET_KEY;
if (!key || !key.startsWith("sk_test_")) {
  console.error("Need sk_test_ STRIPE_SECRET_KEY in .env");
  process.exit(1);
}

const stripe = new Stripe(key);

const PLANS = [
  { key: "parentMonthly", name: "HK STEAM AI Parent Monthly", amount: 6800, interval: "month", tier: "parent" },
  { key: "parentAnnual", name: "HK STEAM AI Parent Annual", amount: 58800, interval: "year", tier: "parent" },
  { key: "familyMonthly", name: "HK STEAM AI Family Monthly", amount: 9800, interval: "month", tier: "family" },
  { key: "familyAnnual", name: "HK STEAM AI Family Annual", amount: 84800, interval: "year", tier: "family" },
];

const SUCCESS_URL =
  process.env.HKC_PAYMENT_SUCCESS_URL ||
  "http://localhost:5173/pricing/success.html?session_id={CHECKOUT_SESSION_ID}";

async function findOrCreatePrice(plan) {
  const existing = await stripe.prices.list({ limit: 100, active: true });
  const match = existing.data.find(
    (p) =>
      p.currency === "hkd" &&
      p.unit_amount === plan.amount &&
      p.recurring?.interval === plan.interval &&
      (p.metadata?.hkc_plan === plan.key || p.metadata?.tier === plan.tier)
  );
  if (match) return match;

  const product = await stripe.products.create({
    name: plan.name,
    metadata: { tier: plan.tier, hkc_plan: plan.key, product_line: "hkc_curriculum" },
  });
  return stripe.prices.create({
    product: product.id,
    unit_amount: plan.amount,
    currency: "hkd",
    recurring: { interval: plan.interval },
    metadata: { tier: plan.tier, hkc_plan: plan.key },
  });
}

async function findOrCreatePaymentLink(plan, priceId) {
  const links = await stripe.paymentLinks.list({ limit: 100 });
  const match = links.data.find(
    (l) =>
      l.active &&
      l.metadata?.hkc_plan === plan.key &&
      l.after_completion?.redirect?.url?.includes("success.html")
  );
  if (match) return match;

  return stripe.paymentLinks.create({
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { tier: plan.tier, hkc_plan: plan.key, product_line: "hkc_curriculum" },
    after_completion: {
      type: "redirect",
      redirect: { url: SUCCESS_URL },
    },
    allow_promotion_codes: true,
  });
}

async function main() {
  const out = {};
  const priceIds = {};
  console.log("Success URL:", SUCCESS_URL);
  for (const plan of PLANS) {
    const price = await findOrCreatePrice(plan);
    const link = await findOrCreatePaymentLink(plan, price.id);
    out[plan.key] = link.url;
    priceIds[plan.key] = price.id;
    console.log(`${plan.key}: price=${price.id} link=${link.url}`);
  }

  const dest = path.join(process.cwd(), "..", "HK Cirriculum", "data", "payment-links-test.generated.json");
  fs.writeFileSync(
    dest,
    JSON.stringify({ successUrl: SUCCESS_URL, links: out, priceIds }, null, 2) + "\n"
  );
  console.log("\nSaved:", dest);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
