/* HKC Billing Config — single source of truth for plans + checkout wiring.
   Loaded before subscribe-gate.js in every gated app (see Kc / Titration).

   Owner: paste Stripe Payment Links (public https://buy.stripe.com/... URLs,
   NOT secrets) into PAYMENT_LINKS after creating them in the Stripe Dashboard.
   NEVER commit API keys — secrets live only in workers/stripe-entitlement
   via `wrangler secret put` (see CEO_WEBHOOK_OWNER.md). */
(function () {
  "use strict";

  /* Cloudflare Worker base for entitlement redeem/verify (no trailing slash).
     Owner fills this after `wrangler deploy` of workers/stripe-entitlement
     (see workers/stripe-entitlement/README.md). Leave "" = offline mode:
     apps stay on local TEST MODE trial and no network calls are made. */
  var ENTITLEMENT_API_BASE = "https://hkc-stripe-entitlement.hksteamai.workers.dev";

  /* Stripe success page (Payment Link redirect target). Must include {CHECKOUT_SESSION_ID}
     in Stripe Dashboard or via create-curriculum-payment-links.mjs. */
  var PAYMENT_SUCCESS_PATH = "pricing/success.html?session_id={CHECKOUT_SESSION_ID}";

  /* LIVE Payment Links (production soft-sell). */
  var PAYMENT_LINKS_LIVE = {
    parentMonthly: "https://buy.stripe.com/bJefZga4M4Yg5fpfMvaMU00",
    parentAnnual: "https://buy.stripe.com/6oUcN4b8Q3Uc7nx1VFaMU01",
    familyMonthly: "https://buy.stripe.com/bJedR84Ks0I07nx0RBaMU02",
    familyAnnual: "https://buy.stripe.com/6oUeVc90IeyQ5fp0RBaMU03"
  };

  /* TEST Payment Links — npm run stripe:curriculum-links in hksteamai-platform. */
  var PAYMENT_LINKS_TEST = {
    parentMonthly: "https://buy.stripe.com/test_bJefZga4M4Yg5fpfMvaMU00",
    parentAnnual: "https://buy.stripe.com/test_6oUcN4b8Q3Uc7nx1VFaMU01",
    familyMonthly: "https://buy.stripe.com/test_bJedR84Ks0I07nx0RBaMU02",
    familyAnnual: "https://buy.stripe.com/test_6oUeVc90IeyQ5fp0RBaMU03"
  };

  function isTestCheckoutHost() {
    try {
      var h = (location && location.hostname) || "";
      return h === "localhost" || h === "127.0.0.1" || h.endsWith(".local");
    } catch (e) { return false; }
  }

  var PAYMENT_LINKS = isTestCheckoutHost() ? PAYMENT_LINKS_TEST : PAYMENT_LINKS_LIVE;

  /* Plan display metadata. Prices verified on disk against
     workers/stripe-entitlement/src/index.js (inferTierFromSession amounts:
     6800 / 58800 / 9800 / 84800 cents HKD). */
  var PLAN_META = {
    parentMonthly: { labelZh: "家長 · 月費", labelEn: "Parent Monthly", priceZh: "HK$68/月", priceEn: "HK$68/mo" },
    parentAnnual:  { labelZh: "家長 · 年費", labelEn: "Parent Annual",  priceZh: "HK$588/年", priceEn: "HK$588/yr" },
    familyMonthly: { labelZh: "家庭 · 月費", labelEn: "Family Monthly", priceZh: "HK$98/月", priceEn: "HK$98/mo" },
    familyAnnual:  { labelZh: "家庭 · 年費", labelEn: "Family Annual",  priceZh: "HK$848/年", priceEn: "HK$848/yr" }
  };

  function pricingHref() {
    var cfg = window.HKC_SUBSCRIBE || {};
    return cfg.comingSoonHref || "../pricing/index.html#payment-links";
  }

  function openCheckout(opts) {
    opts = opts || {};
    var plan = opts.plan || "parentAnnual";
    var link = PAYMENT_LINKS[plan] || "";
    document.dispatchEvent(new CustomEvent("hkc:billing-checkout", {
      detail: { plan: plan, placement: opts.placement || "", hasLink: !!link }
    }));
    window.location.href = link || pricingHref();
  }

  window.HkcBilling = {
    plans: PLAN_META,
    paymentLinks: PAYMENT_LINKS,
    paymentLinksLive: PAYMENT_LINKS_LIVE,
    paymentLinksTest: PAYMENT_LINKS_TEST,
    successPath: PAYMENT_SUCCESS_PATH,
    apiBase: function () { return ENTITLEMENT_API_BASE; },
    link: function (plan) { return PAYMENT_LINKS[plan] || ""; },
    pricingHref: pricingHref,
    openCheckout: openCheckout,
    isTestCheckoutHost: isTestCheckoutHost
  };
})();
