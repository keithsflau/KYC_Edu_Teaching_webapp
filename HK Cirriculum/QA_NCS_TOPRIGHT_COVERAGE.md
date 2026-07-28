# QA: NCS 6-language kit — top-right coverage

Generated: 2026-07-29 (reconciled after fleet inject + MathI18n bridge audit)

## Scope

- Roots: `Primary_School/`, `Secondary_School/` (same walker as `inject-ncs-i18n.js`: excludes `dist/`, `node_modules/`, `_legacy*`, `workers/`, `3D_War/`, etc.)
- App entry: each `index.html`
- **Covered (HTML fleet)**: `ncs-i18n.js` or `NcsI18n` / `data-ncs-kit` init **and** `ncs-i18n.css` (top-right via `.ncs-lang-root` in `common/ncs-i18n.css`)
- **Covered (bridge)**: loads `common/i18n.js` (MathI18n) — `Primary_School/Mathematics/common/i18n.js` or `General_Studies/common/i18n.js` dynamically loads `common/math-i18n-ncs-bridge.js`, which injects the same NCS kit at runtime (no `data-ncs-kit` block required)
- **Skipped (Agent 19 only)**: Primary Math marked `math-i18n-only` when the census ignored the bridge — **obsolete after 2026-07-29 fleet pass**

## Totals (live census)

| Status | Count |
|--------|------:|
| Scanned | 1317 |
| Covered (HTML fleet) | 1317 |
| Covered (bridge-only fallback) | 0 |
| Missing | 0 |
| Skipped (unreadable / non-app) | 0 |

**CEO mandate coverage (繁 + NCS Five, top-right):** **1317 / 1317 = 100%** of scanned lesson apps.

**Effective coverage (HTML ∪ bridge):** **1317 / 1317 = 100%** (480 MathI18n apps have **both** fleet HTML kit and i18n bridge — defense in depth).

| Segment | Scanned | With fleet kit in HTML | MathI18n (`common/i18n.js`) |
|---------|--------:|-----------------------:|------------------------------:|
| Primary_School | 533 | 533 | 480 |
| Secondary_School | 784 | 784 | 0 |
| Primary Mathematics | 265 | 265 | 240 |

Injector dry-run (`node HK Cirriculum/_tools/inject-ncs-i18n.js --json`): `skipped-already`: **1317**.

## Reconciliation: Agent 19 “240 skipped” vs fleet claims

| Claim | Verdict |
|-------|---------|
| Agent 19: 1077 covered, **240 skipped** (`math-i18n-only`) | **Stale** — census treated MathI18n apps without static `ncs-i18n.js` in HTML as skipped, before the full fleet inject completed. |
| Primary Math **265/265** NCS | **True** — all 265 `index.html` apps include fleet `data-ncs-kit` + `ncs-i18n.js` / `.css`; 240 also load `common/i18n.js` with runtime bridge. |
| Primary_School **533/533** | **True** (inject walker scope). |

No additional `--include-math-i18n` inject was required: flag is a legacy no-op; Math apps are in the default pool.

## Sample: 10 Primary Math MathI18n apps (runtime bridge + HTML kit)

Audited 2026-07-29. Each loads `../../common/i18n.js` (bridge boots `math-i18n-ncs-bridge.js` → `NcsI18n.init`) **and** has explicit fleet tags in HTML.

| App | `i18n.js` | `ncs-i18n.js` + CSS | `data-ncs-kit` |
|-----|:-----------:|:---------------------:|:----------------:|
| `P5/20_Volume_Formula` | yes | yes | yes |
| `P5/49_Volume_Basic` | yes | yes | yes |
| `P3/36_3D_Shapes` | yes | yes | yes |
| `P2/07_Skip_Counting_3_Digit` | yes | yes | yes |
| `P6/08_Speed_Concept` | yes | yes | yes |
| `P6/35_Money_Interest` | yes | yes | yes |
| `P5/24_3D_Prisms_Nets` | yes | yes | yes |
| `P5/41_Decimal_Operations` | yes | yes | yes |
| `P5/34_Line_Graphs_Read` | yes | yes | yes |
| `P6/36_Money_Discount` | yes | yes | yes |

**Bridge-only behavior (if HTML kit were absent):** `Mathematics/common/i18n.js` appends `math-i18n-ncs-bridge.js`; `bootKit()` loads `common/ncs-i18n.css`, `common/ncs-i18n.js`, and calls `NcsI18n.init({ position: "top" })`. `LanguageSelector` syncs via `NcsI18n.onChange` and hides legacy toggles (see `LANGUAGE_TEAM_MATHI18N_BRIDGE.md`).

## Missing paths

_(none)_

## Easy-fix policy

- Missing count: **0**
- **Applied this reconciliation run**: 0 file writes (fleet already complete)

## Remediation (if regressions)

```bash
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --apply
node "HK Cirriculum/_tools/_census-mathi18n-ncs.js"
```

## Census commands

```bash
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --json
node "HK Cirriculum/_tools/_census-mathi18n-ncs.js"
```

MathI18n census (480 apps): `withNcs` **480**, `missingNcs` **0**; both `i18n.js` copies report `hasBridge`, `hasNcsSync`, `hasHiddenSelector`.
