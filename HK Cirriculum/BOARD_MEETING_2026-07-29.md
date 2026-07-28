# HKSTEAMAI / HK Cirriculum — Board of Directors Meeting Minutes

**Date:** 2026-07-29 (Wed)  
**Time:** 10:00–12:30 HKT  
**Location:** Virtual (HK / async doc review)  
**Secretary:** Corporate Governance (AI-assisted)  
**Quorum:** Present

---

## 繁中 · CEO 一頁摘要

| 議題 | 結論 |
|------|------|
| **產品 IA** | **暫緩**「刪科目目錄、只留小學/中學兩卡」— CEO 昨日已還原 **科目目錄 + Primary/Secondary 並存**。董事會裁定：**維持還原後 IA**，10 隊改做「雙入口一致」而非硬刪 Subjects。 |
| **收錢準備度** | **5.5 / 10（黃燈）** — Launch pack 6/6 技術 PASS；Stripe 連結同 Worker health OK；**未做真人 test payment → redeem 仍係 YELLOW**。全 fleet 1314 apps 只得 ~89% PASS，唔可以當「全庫付費」。 |
| **而家賺唔賺到錢？** | **可以，但只限「策展軟啟動」** — 向早期家長賣 **Science + Math 6-pack**（Kc、Le Chatelier、Titration、Circuit、Gas Laws、Fraction Pizza），HK$68–98/月定價低過 Sayo。唔好開全站訂閱宣傳。 |
| **董事會表決** | **有條件軟賣（Soft-sell NOW）** — 4 票贊成、1 票棄權（Finance 要求先跑一單 E2E）。 |
| **兩星期重點** | (1) Owner 跑 test payment + redeem GREEN；(2) 修 P0 Space Mission；(3) IA 雙入口 QA；(4) 家長儀表板進度文案對齊付費價值。 |

**English one-liner for CEO:** *Ship a honest, narrow paid wedge (6 labs + pricing page) this fortnight; do not market the full 1,300-app catalog until redeem is proven and fleet P0 is zero.*

---

## Attendees

| Role | Name (fictional) | Present |
|------|------------------|---------|
| **CEO / Founder** | Keith Lau | ✓ |
| **Product** | Dr. Mei Chan, CPO | ✓ |
| **Engineering** | Alex Ng, VP Engineering | ✓ |
| **Finance** | Raymond Ho, CFO | ✓ |
| **Growth** | Sarah Cheung, CMO | ✓ |
| **Board observer** | — | Curriculum QA (read-only) |

---

## 1. Call to Order & Agenda

Chair called the meeting to order. Agenda:

1. Product IA: remove subjects catalog vs Primary/Secondary → subjects → apps  
2. Monetization readiness (Stripe, entitlements, launch pack GO/NO-GO)  
3. Research: can we earn revenue **now**? What blocks paid subscribers?  
4. Resolutions and next 2-week board actions  

**Documents reviewed:** `GATE_TO_GREEN_STATUS.md`, `LAUNCH_PACK_GAP_FIX.md`, `QA_LAUNCH_PACK_SMOKE.md`, `QA_FLEET_ALL_APPS.md`, `CEO_BILLING_STATUS_NOW.md`, `common/billing-config.js`, `pricing/index.html`, `QA_PRICING_LINKS.md`, `CEO_BEAT_SAYO.md`, `CEO_GLOBAL_DOMINATION.md`, `CEO_GLOBAL_PEERS.md`, `CEO_IA_REVERT.md`, `CEO_IA_PRIMARY_SECONDARY_ONLY.md`, `CEO_SUBJECT_DIRECTORY.md`, `workers/stripe-entitlement/README.md`, `hksteamai-platform/PM_STATUS.md`.

**Not found on disk (noted):** `CEO_LAUNCH_PACK.md`, `CEO_WEBHOOK_OWNER.md` (referenced by billing-config and Worker README only).

---

## 2. Product IA Decision

### 2.1 Background

Two competing IA models were on the table:

| Model | Flow | Status before meeting |
|-------|------|------------------------|
| **A — Subject-first (Sayo-like)** | Hub → **科目目錄** → Primary/Secondary tabs → Subject → Form → App | Restored **2026-07-29** per `CEO_IA_REVERT.md` after CEO directive「錯哂，返轉頭！」 |
| **B — Level-first** | Hub → **小學 / 中學** two cards only → subjects inside level → apps | Documented in `CEO_IA_PRIMARY_SECONDARY_ONLY.md`; partially shipped then reverted |

Ten engineering teams were reportedly aligning to **Model B** (remove subjects catalog entry). Platform `library/page.tsx` and static `subjects/index.html` were in conflict as of 2026-07-29 morning.

### 2.2 Discussion

- **Product:** Model B reduces cognitive load for parents who only know their child’s school level. Sayo uses subject branding (`maths.sayo.ai`); we are not Sayo yet — parents may not know which “subject directory” means.  
- **Engineering:** Model B is simpler to maintain **if** we delete one entry point. Running **both** hub card + subjects directory duplicates QA surface (`QA_DOUBLE_NESTING`, link audits).  
- **CEO:** Revert was intentional — **科目目錄** is a discovery asset and matches disk-honest counts in `CEO_SUBJECT_DIRECTORY.md`. Removing it confused internal demos.  
- **Growth:** Marketing landing and parent dashboard already deep-link to featured labs; IA change does not fix conversion if redeem is unproven.

### 2.3 Resolution (IA)

**Approved hierarchy (disk-honest, bilingual):**

```
Home / Platform library
  ├─ Entry A: 科目目錄 · Subjects  →  subjects/index.html (Primary | Secondary tabs)
  ├─ Entry B: 小學 Primary / 中學 Secondary hubs (school-level cards)
  └─ Converge: Subject → Form/Level → App
```

| Decision | Detail |
|----------|--------|
| **Do NOT remove** the subjects catalog entry for this sprint | Aligns with CEO revert and `CEO_SUBJECT_DIRECTORY.md` |
| **Do NOT force** level-only two-card gate as sole entry | `CEO_IA_PRIMARY_SECONDARY_ONLY.md` marked **superseded** for navigation |
| **Do** require both paths to reach the same subject grids | Platform `?section=primary|secondary` ≡ static `?tab=primary|secondary` |
| **Owner** | Product + Eng (Platform squad + Static squad) |

**Vote:** Unanimous — maintain dual entry, converge downstream.

---

## 3. Monetization Readiness

### 3.1 Stripe & billing config

| Check | Evidence | Status |
|-------|----------|--------|
| Payment Links populated | `billing-config.js` — Parent/Family monthly & annual URLs | **GREEN** |
| Prices match Worker tier inference | HK$68 / 588 / 98 / 848 (cents in Worker) | **GREEN** |
| Pricing page loads plans | `pricing/index.html` + `QA_PRICING_LINKS.md` (0 broken) | **GREEN** |
| Worker deployed | `hkc-stripe-entitlement.hksteamai.workers.dev` | **GREEN** |
| `/api/health` | `webhookConfigured: true`, `redeemConfigured: true` | **GREEN** |
| **End-to-end payment → redeem** | `CEO_BILLING_STATUS_NOW.md`: *Owner needs test payment* | **YELLOW** |
| Platform Checkout (hksteamai.com) | `PM_STATUS.md`: code done; founder Stripe keys + DNS | **YELLOW** |

### 3.2 Entitlements

- Static apps: `subscribe-gate.js` + local TEST MODE trial (14-day, no card).  
- Paid path: Checkout → webhook → `/api/redeem` → local entitlement (`source: stripe_webhook`).  
- Platform: `entitlements.ts` OK per fleet QA; gating code complete, production secrets not verified in this meeting.  
- **Risk:** Marketing copy promises “parent progress reports” and unlimited drills; parent dashboard exists but **paid value proof** is not yet demonstrated in a live subscriber journey.

### 3.3 Launch pack GO/NO-GO

| Gate | Result | Source |
|------|--------|--------|
| Launch pack 6/6 apps | **PASS** (HTTP 200 smoke) | `QA_FLEET_ALL_APPS.md`, `LAUNCH_PACK_GAP_FIX.md` |
| Launch pack smoke URLs | **12/12 PASS** | `QA_LAUNCH_PACK_SMOKE.md` |
| Kc → Subjects entry | **WIN** | `GATE_TO_GREEN_STATUS.md` |
| P0 billing wiring | **WIN** | `GATE_TO_GREEN_STATUS.md` |
| Full fleet soft-launch | **NO-GO** | `QA_FLEET_ALL_APPS.md`: 1166/1314 PASS, **P0=1**, 133 thin stubs |
| CEO fleet one-liner | **Soft-launch: NO-GO** (catalog-wide) | `QA_FLEET_ALL_APPS.md` |

**Launch pack apps (approved paid wedge):**

1. `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc`  
2. `Secondary_School/Chemistry/Form 6/01_Le_Chatelier`  
3. `Secondary_School/Chemistry/Form 6/02_Titration_Curve`  
4. `Secondary_School/Physics/Form 5/06_Circuit_Builder`  
5. `Secondary_School/Physics/Form 4/04_Gas_Laws_Lab`  
6. `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share`  

### 3.4 Honest revenue readiness score

| Dimension | Score (1–10) | Rationale |
|-----------|:------------:|-----------|
| Launch pack product quality | **8** | 6/6 PASS, TFZ A1–A8 on flagships; competitive vs Sayo on Science TFZ per `CEO_BEAT_SAYO.md` |
| Billing plumbing | **6** | Links live; health OK; **no founder-signed E2E receipt** |
| Entitlement trust | **5** | Redeem proof **YELLOW**; TEST MODE still default for most users |
| Catalog / brand trust | **4** | 133 P1 thin stubs; 1 P0 (`Junior Science/Form 2/30_Space_Mission`); ~11% fleet not PASS |
| Platform production | **5** | V1 code done; deploy + secrets + privatize paid HTML still open (`PM_STATUS.md`) |
| Competitive monetization | **4** | Sayo live B2C HK$138/mo; we are cheaper but unproven |
| **Composite — “Can we charge money?”** | **5.5 / 10** | **YELLOW** — wedge-only, not fleet-wide |

---

## 4. Research: Can We Earn Money NOW?

### 4.1 What is NOT blocking revenue

- **Product wedge exists.** The 6-pack is demonstrably stronger than Sayo on Teach-From-Zero for Chem/Phys manipulatives (`CEO_BEAT_SAYO.md`, `CEO_GLOBAL_PEERS.md` white space).  
- **Price is viable.** HK$68/mo parent plan undercuts Sayo (HK$138/mo) and Snapask-style tutoring; annual HK$588 improves LTV.  
- **Free tier is generous.** Learn-From-Zero unlocked + daily drill quota lowers trial friction (`pricing/index.html`).  
- **Infrastructure is no longer empty.** This was a P0 blocker; `CEO_BILLING_STATUS_NOW.md` confirms restoration.

### 4.2 What IS blocking paid subscribers

| Blocker | Severity | Owner |
|---------|----------|-------|
| **No proven pay → unlock journey** | Critical | CEO (founder test card) |
| **Marketing full catalog while 133 apps are thin stubs** | Critical | Growth + Product |
| **Parent dashboard does not yet sell “I paid and my child improved”** | High | Product |
| **Dual hosting story** (GitHub Pages static vs hksteamai-platform) confuses checkout return URLs | High | Eng |
| **P0 app still in fleet** (Space Mission corrupt inject) | Medium | Eng squad |
| **Bio wing mostly stub** (~25 apps &lt;1 KB) — cannot sell “Science pack” beyond Chem/Phys | Medium | Curriculum |
| **English/Chinese moat** — Sayo wins; we should not sell language subscription yet | Strategic | Board |
| **Trust / compliance gap** vs Sayo (SOC2, schools) | Medium-long | CEO |

### 4.3 Competitive context (brief)

- **Sayo.ai:** Distribution + polish + language assessment; weak on deep Science manipulatives; Bio vaporware gap (`CEO_BEAT_SAYO.md`).  
- **Global:** PhET free; Brilliant B2C proof at ~US$160/yr (`CEO_GLOBAL_PEERS.md`). Our positioning: **HK DSE TFZ bilingual labs**, parent-pay, not school-first.

### 4.4 Revenue scenarios (next 90 days)

| Scenario | Realistic? | Notes |
|----------|------------|-------|
| **Curated soft-sell** — 6 labs + pricing, waitlist + manual onboarding | **Yes** | Target 10–30 founding families; honest scope |
| **Open self-serve on static Pages** | **Risky** | Works technically; brand damage if user hits thin app from SEO |
| **Full hksteamai.com launch** | **Not yet** | Founder env blockers in `PM_STATUS.md` |
| **B2B school licenses** | **No** | Violates `CEO_GLOBAL_PEERS.md` “do not B2B trap” for this phase |

---

## 5. Board Vote: Soft-Sell Now vs Wait

**Motion:** Authorize **conditional soft-sell** of the **Launch Science + Math 6-pack** with live Stripe Payment Links, with explicit “early access / founding subscriber” positioning — **without** fleet-wide paid marketing or App Store claims.

| Director | Vote |
|----------|------|
| CEO | **Yes** (conditional) |
| Product | **Yes** |
| Engineering | **Yes** |
| Finance | **Abstain** — requires one documented E2E payment + refund test before scaling ads |
| Growth | **Yes** — narrow campaign only |

**Result:** **APPROVED (4–0–1)** — Soft-sell **NOW**, scope-limited.

**Conditions of approval:**

1. Checkout success URL must land on a page that explains redeem steps (or auto-redeem).  
2. All paid CTAs must list **included apps** (6-pack) until fleet &gt;95% PASS.  
3. No “subscribe to all 1,300 apps” language.  
4. Finance sign-off after **one** live HK$68 (or smallest) test transaction and entitlement unlock within 24h.

---

## 6. Resolutions

1. **IA:** Keep **科目目錄** + Primary/Secondary dual entry; converge subject grids; supersede level-only-only IA for this quarter.  
2. **Monetization:** Proceed with **founding subscriber soft-sell** on static curriculum + pricing page; parallel-track hksteamai-platform production deploy.  
3. **Quality bar:** Fleet-wide paid marketing remains **NO-GO** until P0=0 and redeem proof **GREEN**.  
4. **Positioning:** Lead with **Science TFZ labs**; defer English/Chinese paid SKUs.  
5. **Pricing:** Maintain current HK$68 / 588 / 98 / 848 grid; revisit after 30 paying families.

---

## 7. Action Items (Next 14 Days)

| # | Action | Owner | Due | Success metric |
|---|--------|-------|-----|----------------|
| 1 | Run **live Stripe test payment** (parent monthly) → verify webhook → `/api/redeem` → app unlock; document in `GATE_TO_GREEN_STATUS.md` | **CEO** | D+3 | Redeem **GREEN** |
| 2 | Fix P0 `Secondary_School/Junior Science/Form 2/30_Space_Mission` (tfz_corrupt_inject) | **Eng — Fleet** | D+5 | Fleet P0=0 |
| 3 | IA parity QA: hub, subjects, Primary/Secondary hubs, `localhost:3000/library` — one checklist | **Product + Eng** | D+7 | `QA_IA_DUAL_ENTRY.md` |
| 4 | Publish **Founding 6-pack** landing copy (EN/繁中): included apps, honest “more labs coming” | **Growth** | D+7 | Single URL for ads |
| 5 | Parent dashboard: show **lab mastery** for 6-pack skills (not generic counters) | **Product** | D+10 | Demo-ready screenshot |
| 6 | Stripe success/cancel URLs + email receipt copy reviewed | **Eng + Finance** | D+5 | No dead-end post-pay |
| 7 | Commit `HK Cirriculum/` to git; no `git clean` on uncommitted work | **CEO** | D+1 | Prevent wipe repeat |
| 8 | Draft missing `CEO_WEBHOOK_OWNER.md` from `workers/stripe-entitlement/README.md` | **Eng** | D+3 | Founder runbook exists |
| 9 | Bio counter-offensive: upgrade **2** flagship apps from thin stub (Enzyme Kinetics, Osmosis) — no new SKUs | **Curriculum** | D+14 | 2 apps TFZ_LIKELY |
| 10 | Weekly board check-in: redeem status + paid subscriber count | **Finance** | D+14 | Minutes update |

---

## 8. Risks Accepted (This Sprint)

- Selling before hksteamai.com production is live (static-first).  
- Subscriber may discover thin apps via directory — mitigated by not advertising full catalog.  
- Sayo may close Bio gap before we ship counter-apps.

---

## 9. Meeting Adjourned

**Next board meeting:** 2026-08-12 (tentative) — redeem GREEN review + first 10 paying families.

---

*Minutes prepared from repository QA and CEO docs as of 2026-07-29. Fictional board roles used for governance clarity.*
