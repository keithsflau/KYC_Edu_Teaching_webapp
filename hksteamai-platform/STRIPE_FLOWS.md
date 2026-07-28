# Stripe + trial flows (founder / Agent 1)

Exact sequences for hksteamai.com V1 billing. Parent subscriptions only.

## Pricing

| Tier | Monthly | Yearly | Entitlement |
|------|---------|--------|-------------|
| Free | — | — | `free` (demo catalog) |
| Basic | HK$98 | HK$980 | `primary` **or** `secondary` (chosen at checkout) |
| Pro | HK$148 | HK$1280 | `all` |

Trial: **7-day Pro** → soft downgrade to **Free** (demos remain).

---

## Flow A — Register → local trial → expire

```
Parent registers
  → grantLocalProTrial(userId)   // or POST /api/trial/start
  → Subscription { status: trialing, entitlement: all, trialEndsAt: now+7d }
  → canAccessModule → full library

After trialEndsAt
  → effectiveEntitlement() returns free   // soft downgrade, no webhook needed
  → demos still allowed via free-demo-catalog.json
```

Abuse rule: second `grantLocalProTrial` returns `trial_already_used` if `trialEndsAt` was ever set.

---

## Flow B — Pro Checkout (card)

```
POST /api/stripe/checkout { plan: "pro_monthly" | "pro_yearly" }
  → Stripe Customer (create if missing)
  → Checkout Session mode=subscription
       subscription_data.trial_period_days = 7  // skipped if trial already used
       metadata: userId, plan, entitlement=all
  → redirect to Stripe Hosted Checkout

checkout.session.completed + customer.subscription.*
  → syncSubscriptionFromStripe
  → local: status trialing|active, entitlement all, stripeSubscriptionId set

Trial ends with valid PM
  → Stripe charges → status active (webhook)

Cancel in Portal
  → customer.subscription.deleted → softDowngradeToFree → entitlement free
```

---

## Flow C — Basic Checkout

```
POST /api/stripe/checkout {
  plan: "basic_monthly" | "basic_yearly",
  libraryChoice: "primary" | "secondary"   // default primary
}
  → no Stripe trial (charged immediately)
  → metadata.entitlement = primary|secondary
  → webhook → entitlement primary|secondary, status active
```

---

## Flow D — Manage billing

```
POST /api/stripe/portal
  → requires stripeCustomerId
  → Stripe Customer Portal (cancel / update card / invoices)
  → return_url = /account
```

If already `active|trialing|past_due` with `stripeSubscriptionId`, Checkout returns **409** `use_portal`.

---

## Webhook → DB mapping

| Stripe status | Local `status` | Local `entitlement` |
|---------------|----------------|---------------------|
| `trialing` | `trialing` | `all` |
| `active` / `past_due` | same | from plan metadata (`primary`/`secondary`/`all`) |
| `canceled` / `unpaid` / deleted | `canceled` | `free` |

Source of truth for paid access: Stripe webhooks → `Subscription` row.  
Access checks: `effectiveEntitlement(sub)` (also respects local `trialEndsAt`).

Probe: `GET /api/entitlements`

---

## Env checklist

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_BASIC_MONTHLY=
STRIPE_PRICE_BASIC_YEARLY=
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_YEARLY=
TRIAL_DAYS=7
```

Create prices: `npm run stripe:products`  
Forward webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

---

## 粵語速查

- **註冊試用**：無卡，7 日 Pro（`all`），到期自動變 Free。
- **訂 Pro**：Checkout 綁卡；未用過試用可再有 7 日 Stripe trial。
- **訂 Basic**：即時扣款；要選小學庫或中學庫。
- **取消／改卡**：Customer Portal；取消後 webhook 軟降級 Free。
- **驗收**：CLI `stripe listen` + test card `4242…`。
