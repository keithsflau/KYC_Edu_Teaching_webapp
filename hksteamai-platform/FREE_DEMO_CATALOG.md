# Free Demo Catalog (V1)

**Policy:** These **15 modules** are free forever (no account required to play via the public demo player). Everything else under `Primary_School/` / `Secondary_School/` requires sign-in plus an active entitlement (`primary` / `secondary` / `all`) or an active **7-day Pro trial**.

| File | Purpose |
|------|---------|
| [`data/free-demo-catalog.json`](./data/free-demo-catalog.json) | Machine-readable free list |
| [`data/paid-entitlement-rules.json`](./data/paid-entitlement-rules.json) | Which paths need primary / secondary / all |
| [`data/soft-paywall-copy.json`](./data/soft-paywall-copy.json) | Soft-paywall strings (EN + 繁中) |
| [`SOFT_PAYWALL_COPY.md`](./SOFT_PAYWALL_COPY.md) | Human-readable copy notes |
| `src/lib/catalog.ts` | Runtime imports for Agent 4/5 |
| `GET /api/catalog` | Marketing bundle: free + rules summary + paywall copy |
| `GET /api/modules/demos` | Free demos with `contentUrl` |
| `GET /api/modules/catalog` | Entitlement-aware library listing |

## Free forever (15)

| # | Band | Subject | Title (EN) | Path |
|---|------|---------|------------|------|
| 1 | Early primary | Math | Counting 1 to 10 | `Primary_School/Mathematics/P1/01_Counting_1_To_10/` |
| 2 | Early primary | Math | Comparing Numbers | `Primary_School/Mathematics/P1/04_Comparing_Numbers/` |
| 3 | Mid primary | Math | Multiplication Tables | `Primary_School/Mathematics/P3/04_Multiplication_Tables/` |
| 4 | Mid primary | Math | Telling Time (24-hour) | `Primary_School/Mathematics/P3/05_Time_24Hour/` |
| 5 | Upper primary | Math | Percentage Calculator | `Primary_School/Mathematics/P6/01_Percentage_Calculator/` |
| 6 | Early primary | Health | Brushing Teeth | `Primary_School/General_Studies/P1/07_Teeth_Brushing/` |
| 7 | Early primary | Environment | Recycling Bin | `Primary_School/General_Studies/P1/20_Recycling_Bin/` |
| 8 | Mid primary | Health | Food Pyramid | `Primary_School/General_Studies/P4/01_Food_Pyramid_Pro/` |
| 9 | Lower secondary | Math | Directed Numbers | `Secondary_School/Mathematics/Form 1/01_Directed_Numbers/` |
| 10 | Lower secondary | Math | Basic Algebra | `Secondary_School/Mathematics/Form 1/05_Basic_Algebra/` |
| 11 | Mid secondary | Math | Mastering Quadrilaterals | `Secondary_School/Mathematics/Form 3/01_Mastering_Quad/` |
| 12 | Lower secondary | Science | Lab Safety | `Secondary_School/Junior Science/Form 1/01_Lab_Safety/` |
| 13 | Lower secondary | Science | Water Cycle | `Secondary_School/Junior Science/Form 1/05_Water_Cycle/` |
| 14 | Mid secondary | Chemistry | Periodic Table | `HK Cirriculum/Secondary_School/Chemistry/Form 3/03_Periodic_Table/` |
| 15 | Upper secondary | Physics | 3D Solar System | `Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System/` |

**Split:** 8 primary + 7 secondary (balanced for global parent marketing).

## Paid — who needs to subscribe?

| Entitlement | Plan | Unlocks |
|-------------|------|---------|
| `free` | Guest / free account | Free demo catalog only |
| `primary` | Basic (library = Primary) | All `Primary_School/**` + free demos |
| `secondary` | Basic (library = Secondary) | All `Secondary_School/**` + free demos |
| `all` | Pro / active trial | Full Primary + Secondary libraries |

Out of V1 product scope (not sold / soft-paywalled here): `bible_study/`, `typing test/`, `Music Therapy/`.

## Soft paywall UX

1. Library browser lists titles for the whole catalog (or filtered by region).
2. Free demos open immediately (guest or signed-in).
3. Locked modules show lock + CTA to start trial / subscribe — copy in `SOFT_PAYWALL_COPY.md`.
4. Paid HTML is never served as a public static URL through this app — only via `/api/modules/...` after entitlement check (Agent 4/5).

## Agent 4/5 imports

```ts
import {
  listFreeDemoModules,
  buildCatalogApiPayload,
  getPaywallCopy,
  getDenyReasonCopy,
} from "@/lib/catalog";
import { canAccessModule, canAccessModuleAsync, isFreeDemo } from "@/lib/entitlements";
```

Or fetch `GET /api/catalog` from the client.

## Changing the free list

1. Edit `data/free-demo-catalog.json` (keep `count` in sync)
2. Update this markdown table
3. Restart / redeploy (catalog loaded at runtime; clear cache via `clearFreeDemoCache` / `clearCatalogCaches` if needed)
4. Optional: Admin feature flag `free_catalog_override` = JSON array of extra folder paths

---

## 粵語摘要（畀家長／內部）

**永久免費（唔使訂閱）：** 一共 **15** 個示範——小學數數、比較數目、乘數表、時間、百分數；刷牙、回收、食物金字塔；中學有向數、基礎代數、四邊形、實驗室安全、水循環、元素週期表、立體太陽系。訪客都可以玩。

**要訂閱先開：**
- **基本計劃** → 揀 **小學庫** 或 **中學庫** 其中一個（免費示範照玩）
- **專業計劃 / 7 日試用** → **小學＋中學完整課程庫**
- 其餘唔喺免費名單嘅模組一律軟性上鎖（可睇標題，撳開就叫試用／訂閱）
