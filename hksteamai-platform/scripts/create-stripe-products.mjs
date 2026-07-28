/**
 * Create Stripe Products + Prices (HKD) in TEST mode.
 * Requires STRIPE_SECRET_KEY=sk_test_... in .env
 *
 * Prints price IDs to paste into .env
 *
 * Trial policy (documented):
 * - Pro monthly/yearly: 7-day trial via Checkout subscription_data.trial_period_days
 * - Basic: no Stripe trial (card charged immediately); users may still use local register trial
 */
import "dotenv/config";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const key = process.env.STRIPE_SECRET_KEY;
if (!key || !key.startsWith("sk_")) {
  console.error("Set STRIPE_SECRET_KEY in .env (test mode sk_test_...)");
  process.exit(1);
}

const stripe = new Stripe(key);

const PLANS = [
  { key: "BASIC_MONTHLY", name: "Basic Monthly", amount: 9800, interval: "month", tier: "basic" },
  { key: "BASIC_YEARLY", name: "Basic Yearly", amount: 98000, interval: "year", tier: "basic" },
  { key: "PRO_MONTHLY", name: "Pro Monthly", amount: 14800, interval: "month", tier: "pro" },
  { key: "PRO_YEARLY", name: "Pro Yearly", amount: 128000, interval: "year", tier: "pro" },
];

async function main() {
  const out = {};
  for (const p of PLANS) {
    const product = await stripe.products.create({
      name: `HK Steam AI — ${p.name}`,
      metadata: { tier: p.tier, plan_key: p.key },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount,
      currency: "hkd",
      recurring: { interval: p.interval },
      metadata: { tier: p.tier, plan_key: p.key },
    });
    out[`STRIPE_PRICE_${p.key}`] = price.id;
    console.log(`${p.name}: product=${product.id} price=${price.id}`);
  }

  const lines = Object.entries(out)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");
  const dest = path.join(process.cwd(), "data", "stripe-prices.generated.env");
  fs.writeFileSync(dest, lines + "\n");
  console.log("\nPaste into .env:\n" + lines);
  console.log(`\nAlso saved to ${dest}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
