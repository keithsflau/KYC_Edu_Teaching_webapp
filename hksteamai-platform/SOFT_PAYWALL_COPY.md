# Soft Paywall Copy (EN + 繁中)

Machine-readable twin: [`data/soft-paywall-copy.json`](./data/soft-paywall-copy.json)  
Runtime: `getPaywallCopy(locale, key)` / `getDenyReasonCopy(reason, locale)` in `src/lib/catalog.ts`.

## Principle

Soft paywall — **browse freely**, **never shame**, always leave a path: free demos + 7-day Pro trial.

## Locked module (guest / free)

| Key | EN | 繁中 |
|-----|----|------|
| `lockedTitle` | Unlock this module | 解鎖呢個模組 |
| `lockedBody` | You can preview the library and play free demos anytime. Start a 7-day Pro trial to open the full STEM library for your family. | 你可以隨時瀏覽課程庫同玩免費示範。開始 7 日 Pro 試用，全家解鎖完整 STEM 課程庫。 |
| `lockedBodyShort` | Free demos stay open. Subscribe or start a trial to play this one. | 免費示範照玩。訂閱或開始試用就可以玩呢個。 |
| `ctaTrial` | Start 7-day Pro trial | 開始 7 日 Pro 試用 |
| `ctaSubscribe` | See family plans | 睇家庭計劃 |
| `ctaKeepBrowsing` | Keep browsing free demos | 繼續瀏覽免費示範 |

## Wrong Basic library (primary vs secondary)

| Key | EN | 繁中 |
|-----|----|------|
| `wrongTierTitle` | Different library on your plan | 你嘅計劃係另一個課程庫 |
| `wrongTierBody` | Basic includes either Primary or Secondary. Upgrade to Pro for both — or keep enjoying your current library plus free demos. | 基本計劃包括小學或中學其中一庫。升級專業版可兩者兼得——或者繼續用而家個庫同免費示範。 |
| `ctaUpgradePro` | Upgrade to Pro | 升級專業版 |

## Badges / pricing blurbs

| Key | EN | 繁中 |
|-----|----|------|
| `freeBadge` | Free demo | 免費示範 |
| `lockedBadge` | Members | 會員 |
| `pricingFreeBlurb` | 15 forever demos · no card required to try | 15 個永久示範 · 試玩唔使信用卡 |
| `pricingBasicBlurb` | Choose Primary or Secondary library for your child’s stage | 按子女階段揀小學或中學課程庫 |
| `pricingProBlurb` | Full Primary + Secondary STEM library for the whole family | 全家完整小學＋中學 STEM 課程庫 |

## Deny reasons (API → UI)

From `data/paid-entitlement-rules.json` → `denyReasons`:

| Reason | When |
|--------|------|
| `subscribe_required` | Guest / free hits a paid module |
| `wrong_library_tier` | Basic Primary user opens Secondary (or reverse) |
| `auth_required` | Optional gate before checkout |
| `out_of_scope` | bible_study / typing / music therapy etc. |

## Do / Don’t for Agent 4–5

**Do**
- Show titles + free badge for demos; lock icon for the rest
- Primary CTA = trial; secondary = pricing
- Keep free demos one click away after a lock modal

**Don’t**
- Hard-block the library browser
- Say “you must pay to learn”
- Serve paid HTML as public static files
