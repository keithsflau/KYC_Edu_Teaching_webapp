# CEO Merge Report — NCS Top-Right Fleet

**Date:** 2026-07-29  
**Agent:** 20/20 (CEO merge)  
**Sources merged:** `LANGUAGE_TEAM_NCS_PLAN.md`, `LANGUAGE_TEAM_HUBS_FLAGSHIPS.md`, `LANGUAGE_TEAM_FLEET_INJECT.md`, `NCS_KIT_CANONICAL.md`, `QA_NCS_TOPRIGHT_COVERAGE.md` (Agent 19/20), live injector dry-run.

---

## Fleet apply run (2026-07-29 — full straggler pass)

**Agent:** fleet inject `--apply` + `--include-math-i18n` + `--include-3d-war`

### Before / after (injector `--json` dry-run, Primary_School + Secondary_School)

| Metric | Before pass | After pass |
|--------|------------:|-----------:|
| **Scanned** (`index.html`) | 1,318 | 1,317 |
| **`skipped-already`** (kit + fleet init) | 1,031 (**78.2%**) | 1,317 (**100%** of scanned) |
| **`would-inject` / `injected`** | 77 | 0 remaining |
| **`would-upgrade-init` / `upgraded-init`** | 210 | 0 remaining |
| **Pass 1 writes** | — | **287** (77 inject + 210 init upgrade) |
| **`--include-math-i18n` pass** | — | **0** writes (MathI18n apps already in pool; flag is legacy no-op) |
| **`--include-3d-war` scan** | — | 1,384 HTML targets; **1** `upgraded-init` on `war-page.html` |

**CEO doc baseline (stale):** injector had reported **271 / 1,318 (~21%)** `skipped-already`; live pre-pass was already **~78%** before this run.

### Kit census (post-pass, `ncs-i18n.js` / `NcsI18n`)

| Scope | Scanned | With NCS kit | % |
|-------|--------:|-------------:|--:|
| Standard fleet (`index.html`, `3D_War` excluded) | 1,317 | 1,317 | **100%** |
| + `3D_War` HTML (index + battle pages) | 1,399 | 1,399 | **100%** |
| Apps using `MathI18n` / `common/i18n.js` | — | 480 | (now also have NCS fleet kit) |

**Non-`index.html` stragglers (fixed 2026-07-29):** 3 Primary Chinese standalone pages now have the fleet kit (`Flashlight Discovery/Flashlight Discovery.html`, `grammar-coaster/grammar-coaster.html`, `Tang Poetry Snake/Tang Poetry Snake.html`). Paths: `../../../common/ncs-i18n.css`, `../../../common/ncs-i18n.js`, `NcsI18n.init({ chromePath: "../../../_shared/ncs-chrome.json" })`. **0** known orphan lesson HTML outside the injector walk.

### Verdict (switcher chrome)

**Mandate met for scanned lesson `index.html` apps:** top-right **繁 + NCS Five** fleet kit is present fleet-wide. **Lesson body translation** to ne/ur/tl/hi remains Phase 2; some apps may show **double switchers** until MathI18n/LGER bridge.

**Commands used:**

```bash
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --include-math-i18n --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --include-3d-war --apply
```

---

## Mandate

**Every curriculum web app** must show a **top-right language switcher** with:

| # | Code | Label |
|---|------|-------|
| 1 | `zh-Hant` | 繁體中文 (curriculum baseline) |
| 2 | `en` | English |
| 3 | `ne` | नेपाली |
| 4 | `ur` | اردو (RTL) |
| 5 | `tl` | Filipino |
| 6 | `hi` | हिन्दी |

**繁 + NCS Five = 6 options.** Default `zh-Hant`. Persist choice in `localStorage` (`hksteam.ncs-lang`). Urdu flips `dir="rtl"` on `<html>`.

Switcher chrome: fixed **top-right** (bottom on narrow viewports) via `_shared/ncs-i18n.css`.

---

## Kit version & paths

| Role | Path |
|------|------|
| **API version** | `NcsI18n.VERSION` **2.1.0** |
| **Canonical JS** | `HK Cirriculum/_shared/ncs-i18n.js` |
| **Canonical CSS** | `HK Cirriculum/_shared/ncs-i18n.css` |
| **Chrome strings** | `HK Cirriculum/_shared/ncs-chrome.json` (`mt-v1` tier) |
| **LGER pack (optional)** | `HK Cirriculum/_shared/ncs-strings-lger.js` |
| **Fleet copy (injector target)** | `HK Cirriculum/common/ncs-i18n.js` + `.css` (synced with `_shared`) |
| **Injector** | `HK Cirriculum/_tools/inject-ncs-i18n.js` |
| **Decision record** | `HK Cirriculum/_shared/NCS_KIT_CANONICAL.md` |

**Do not extend:** `ncs-lang.js`, `ncs-i18n/ncs-i18n.js` (deprecated loader shim).

### Hub / flagship wiring (manual, `_shared` path)

Sibling hub agent wired these with `NcsI18n.init()` / `initHub()`:

| Surface | Path |
|---------|------|
| Root portal | `index.html` |
| Primary hub | `Primary_School/index.html` |
| Secondary hub | `Secondary_School/index.html` |
| Pricing | `pricing/index.html` |
| Parent dashboard | `parent-dashboard/index.html` |
| Subject directory | `subjects/index.html` |
| Marketing (3) | `marketing/site/{landing,schools,privacy}/index.html` |

**Board 6-pack flagships** (full `init` + `LangToggle`): Circuit Builder, Gas Laws Lab, Fraction Pizza, Le Chatelier, Titration Curve, Equilibrium Kc.

---

## Coverage numbers (honest)

### QA census (Agent 19/20 — authoritative for this merge)

From `QA_NCS_TOPRIGHT_COVERAGE.md` (covered = `ncs-i18n.js` / `NcsI18n` **and** top-right kit CSS):

| Status | Count | % of 1,318 |
|--------|------:|----------:|
| **Covered** (NCS kit + top-right CSS) | **510** | **38.7%** |
| **Missing** (`no-ncs-kit`) | **567** | **43.0%** |
| **Skipped** (`MathI18n` only — no NCS kit) | **241** | **18.3%** |
| **Total scanned** | 1,318 | 100% |

QA did **not** auto-inject (threshold under 50; 567 missing is far above).

### Injector dry-run cross-check (CEO merge ~01:15 HKT)

| Status | Count |
|--------|------:|
| `skipped-already` (kit marker present) | 271 |
| `skipped-math-i18n` | 480 |
| `would-inject` | **567** (matches QA missing) |

Difference in “covered” (510 vs 271) and Math skip (241 vs 480) reflects concurrent inject passes and slightly different skip rules between QA census vs injector. **Both agree: 567 apps still lack the kit. Neither is 100%.**

### Verdict

**Coverage is well below 100%.** Best current claim: **~39% covered** (QA), with **43% still missing** and **~18% MathI18n-only** (mandate not met until bridged).

| Layer | Approx. coverage |
|-------|------------------|
| NCS switcher chrome (QA) | **510 / 1,318 (38.7%)** |
| Still missing kit | **567 / 1,318 (43.0%)** |
| Portal / hub pages outside fleet scan | ~10 pages wired manually |
| Lesson content translated to ne/ur/tl/hi | **≈0%** fleet-wide (chrome only) |

### What got injected so far

Batches applied by fleet injector + sibling agents during sprint:

- **Junior Science** — full form tree (~101 apps)
- **Primary Mathematics** (apps without existing `MathI18n`) — ~25 in first batch; additional P2–P6 apps injected in follow-up passes
- **Chemistry** secondary tree — bulk inject (~120+ apps)
- **Geography, Economy, Music, Chinese History** subject hubs + apps
- **Primary Chinese, English, General Studies** subject hubs (apps mostly still pending)

### Biggest gaps

1. **567 apps** still need `node …/inject-ncs-i18n.js --apply` (Biology apps, Chinese, ICT labs, History, Physics remainder — see QA missing list)
2. **241–480 Math apps** (`MathI18n` only) — need `MathI18n` → `NcsI18n` bridge or `--include-math-i18n` + consolidation
3. **Primary General Studies** lesson apps — largely still in the 567 missing bucket
4. **Secondary Biology, Physics, ICT, Chinese, History** — heavily represented in QA missing sample
5. **Vite `dist/` builds** — injector skips `dist/`; source inject + rebuild required

---

## How to re-run injector for stragglers

All commands from repo root (`Profile/`):

```bash
# Dry-run — see what is still missing
node "HK Cirriculum/_tools/inject-ncs-i18n.js"
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --json

# Apply everything still missing (script + CSS only; low risk)
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --apply

# Bounded batches
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --batch junior-science --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --batch primary-math --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --filter "General_Studies" --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --filter "Secondary_School/Biology" --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --filter "Secondary_School/Physics" --apply

# Include MathI18n apps (creates double switcher until bridged)
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --include-math-i18n --apply
```

### CLI flags

| Flag | Meaning |
|------|---------|
| `--apply` | Write files (default: dry-run) |
| `--batch <name>` | `first`, `junior-science`, `primary-math`, `all`, or path substring |
| `--filter <path>` | Repeatable path substring filter |
| `--include-math-i18n` | Do not skip apps with `common/i18n.js` |
| `--json` | Machine-readable summary |

### Idempotency

Safe to re-run. Apps with `data-ncs-kit="fleet"`, `ncs-i18n.js`, or `window.NcsI18n` are skipped (`skipped-already`).

### Per-app integration (phase 2, after inject)

```javascript
NcsI18n.init({ chromePath: "../../../_shared/ncs-chrome.json" });
NcsI18n.onChange(function (lang) { /* re-render React / apply t{} */ });
NcsI18n.extendLegacyDict(t);  // add ne/ur/tl/hi keys to existing { en, zh } objects
```

---

## Known limitations

1. **Switcher ≠ translated content.** Injection mounts the 6-lang selector and sets `document.documentElement.lang` / `dir`. Lesson bodies, hints, options, and TFZ copy remain **EN/ZH** until per-app `const t` dictionaries grow `ne`/`ur`/`tl`/`hi` keys. Fallback chain: requested lang → `en` → `zh-Hant` → raw key.

2. **Chrome strings are machine-translated (`mt-v1`).** `ncs-chrome.json` covers buttons, LGER tabs, nav — not classroom-critical assessment stems. Optional MT notice via `showMtNotice: true`.

3. **Double switchers on some apps.** Junior Science LGER apps show both NCS 6-lang switcher and legacy EN/中 toggle. Primary Math apps with `MathI18n` are skipped by injector; using `--include-math-i18n` adds a second control until bridged.

4. **Hub stub vs canonical kit.** Early hub work used `_shared/ncs-i18n/ncs-i18n.js` (deprecated loader). Canonical path is `_shared/ncs-i18n.js` — converge on one.

5. **Built apps excluded.** `dist/`, `node_modules`, `_archive`, `_legacy` skipped. Rebuild after source `index.html` inject.

6. **Platform shell (`hksteamai-platform`)** — **host chrome added 2026-07-29 (Agent 18).** `/play/[...path]` toolbar mounts `<NcsLangSwitcher />` (6 codes) when the module iframe is playable. Host writes `hksteam.ncs-lang` to `localStorage`, appends `?lang=` on first iframe load, and `postMessage`s `{ type: "hksteam.ncs-lang", lang }` on change. Embedded apps with `NcsI18n` v2.2+ listen via `bindPlatformBridge()`. **Primary path remains in-app top-right switcher** (fleet injector); host chrome is interim coverage for apps not yet injected. Apps with both may show duplicate controls until fleet hits 100%.

7. **QA census complete; remediation not applied.** `QA_NCS_TOPRIGHT_COVERAGE.md` confirms 567 missing and declined bulk auto-fix (&gt;50 threshold). Manual spot-check still needed: toggle all 6 codes; Urdu RTL; `localStorage` across hub clicks.

---

## Recommended next actions

| Priority | Action | Owner |
|----------|--------|-------|
| P0 | `--apply` remaining **567** stragglers (QA agreed) | Fleet inject agent |
| P1 | Bridge `MathI18n` / `JSLGER` → `NcsI18n`; remove double switchers | Language Team |
| P1 | Bulk `General_Studies` P1–P6 inject | Primary agent |
| P2 | Add `ne`/`ur`/`tl`/`hi` to high-traffic `const t` templates | Subject agents |
| P3 | Platform iframe lang bridge | Platform agent | ✅ Host toolbar switcher + `postMessage` (v2.2.0 kit) |

---

## Sibling deliverables merged

| File | Status |
|------|--------|
| `LANGUAGE_TEAM_NCS_PLAN.md` | ✅ Phase 0 kit + 5-phase rollout |
| `LANGUAGE_TEAM_HUBS_FLAGSHIPS.md` | ✅ Hubs + board 6-pack wired |
| `LANGUAGE_TEAM_FLEET_INJECT.md` | ✅ Injector docs (counts superseded by live dry-run above) |
| `NCS_KIT_CANONICAL.md` | ✅ API decision record v2.1.0 |
| `QA_NCS_TOPRIGHT_COVERAGE.md` | ✅ Merged — Covered 510 / Missing 567 / Skipped 241 |

---

*Mandate status: **SWITCHER CHROME - 100% of scanned lesson HTML (1,399/1,399)** including fleet `index.html` (1,317/1,317) and the 3 Primary Chinese standalone orphans. Full NCS content translation still Phase 2.*


