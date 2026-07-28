/* HKC Entitlement — optional server-verified entitlement layer.
   Complements subscribe-gate.js (localStorage, offline-first): when
   HkcBilling.ENTITLEMENT_API_BASE is configured, redeem a Stripe checkout
   session (cs_…) into a local paid entitlement via the hkc-stripe-entitlement
   Cloudflare Worker. No secrets in this file. */
(function () {
  "use strict";
  var LS_ENT = "hkc_entitlement_v1";

  function apiBase() {
    return (window.HkcBilling && window.HkcBilling.apiBase && window.HkcBilling.apiBase()) || "";
  }
  function configured() { return !!apiBase(); }

  /* Worker tiers (parent / family / school) → subscribe-gate paid tiers
     (paid / trial / family / school — see subscribe-gate.js isPaidTier). */
  function mapTier(t) {
    if (t === "family" || t === "school" || t === "trial") return t;
    return "paid";
  }
  function daysUntil(iso) {
    if (!iso) return 0;
    var ms = new Date(iso).getTime() - Date.now();
    return Math.max(0, Math.ceil(ms / 864e5));
  }

  function applyEntitlement(record) {
    var tier = mapTier(record && record.tier);
    var days = daysUntil(record && record.expiresAt) || 366;
    if (window.HkcSubscribe && window.HkcSubscribe.setLocalEntitlement) {
      window.HkcSubscribe.setLocalEntitlement(tier, days);
    } else {
      try {
        localStorage.setItem(LS_ENT, JSON.stringify({
          tier: tier,
          expires: (record && record.expiresAt) || null,
          source: (record && record.source) || "stripe_webhook"
        }));
      } catch (e) {}
    }
    document.dispatchEvent(new CustomEvent("hkc:entitlement", {
      detail: { tier: tier, source: (record && record.source) || "stripe_webhook" }
    }));
    return { ok: true, tier: tier };
  }

  async function redeem(sessionId) {
    if (!configured()) {
      return { ok: false, error: "offline_mode", message: "Entitlement API not configured — local TEST MODE only." };
    }
    if (!sessionId || !String(sessionId).startsWith("cs_")) {
      return { ok: false, error: "invalid_session_id" };
    }
    try {
      var resp = await fetch(apiBase().replace(/\/+$/, "") + "/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId })
      });
      var data = await resp.json().catch(function () { return {}; });
      if (resp.ok && data && data.ok && data.entitlement) {
        return applyEntitlement(data.entitlement);
      }
      return { ok: false, error: (data && data.error) || "redeem_failed", message: data && data.message };
    } catch (e) {
      return { ok: false, error: "network_error", message: String(e) };
    }
  }

  /* Stripe success redirect convention: ?session_id=cs_… or ?redeem=cs_… */
  function sessionFromUrl() {
    var q = new URLSearchParams(location.search);
    return q.get("session_id") || q.get("redeem") || "";
  }
  async function redeemFromUrl() {
    var sid = sessionFromUrl();
    if (!sid) return { ok: false, error: "no_session_in_url" };
    var r = await redeem(sid);
    if (r.ok && window.history && history.replaceState) {
      var url = new URL(location.href);
      url.searchParams.delete("session_id");
      url.searchParams.delete("redeem");
      history.replaceState(null, "", url.toString());
    }
    return r;
  }

  window.HkcEntitlement = {
    configured: configured,
    redeem: redeem,
    redeemFromUrl: redeemFromUrl,
    mapTier: mapTier
  };
})();
