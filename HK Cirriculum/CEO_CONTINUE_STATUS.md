# CEO Continue Status — NCS language switch polish

**Date:** 2026-07-29  
**Pass:** Product continuation (sibling owns git commit)

## Root cause fixed

`preparePageStrings()` in `ncs-i18n.js` iterated `NCS_FIVE` (which includes `en`) and **wiped `out.en`** before rebuilding keys. When `hub-i18n.json` was slow or failed to load, NCS buckets (`hi`, `ne`, `ur`, `tl`) were left empty and `data-i18n` nodes could stay on **zh** or show raw keys instead of English/MT.

**Fix:** Skip `en` in the NCS expansion loop; snapshot `enKeys` before the loop so NCS langs always inherit page `en` strings when hub MT is unavailable.

## What changed this pass

| Area | Change |
|------|--------|
| `_shared/ncs-i18n.js` | `preparePageStrings` en-wipe bugfix; `resolveHubTitle` accepts hub key strings (e.g. `"hubTitleHome"`) |
| `common/ncs-i18n.js` | Kept in sync with `_shared` |
| `_shared/hub-i18n.json` | Added `back`, `leadPrimary`, `leadEnPrimary`, `leadSecondary`, `titleDashboard`, `ctaLogin`, `ctaRegister` (6 langs, mt-v1) |
| `index.html` | Document title via `hubTitleHome` key |
| `parent-dashboard/index.html` | H1 uses `titleDashboard`; page title via `hubTitleDashboard` |

## Already in place (prior pass / sibling)

- `hub-i18n.json` — full mt-v1 packs for homepage, pricing, parent-dashboard chrome
- `Primary_School/index.html` / `Secondary_School/index.html` — inline `ne`/`ur`/`tl`/`hi` buckets + `hubTitlePrimary` / `hubTitleSecondary`
- `pricing/index.html` — `NcsI18n.ensureHub()` before `registerStrings`; 6-lang `resolveHubTitle`
- `initHub()` — restores `localStorage` lang, awaits hub JSON, applies DOM on change

## Smoke-check expectation

| Lang | Homepage chrome (nav, tagline, cards) |
|------|----------------------------------------|
| `zh-Hant` | 繁體中文 (inline zh) |
| `en` | English |
| `hi` / `ne` / `ur` / `tl` | MT from `hub-i18n.json` (or English fallback if hub fetch fails — **not** zh) |

Serve over HTTP (`python -m http.server` in `HK Cirriculum/`) so `fetch('_shared/hub-i18n.json')` succeeds; `file://` will still fall back to English for NCS langs.

## Not in scope / deferred

- `CEO_NCS_LANG_SWITCH_FIX.md` — not present in repo; logic documented here
- Lesson body copy in ne/ur/tl/hi (Phase 2 fleet mandate)
- Stale payment copy — sibling commit (do not re-commit here)

## Files touched (this pass)

- `HK Cirriculum/_shared/ncs-i18n.js`
- `HK Cirriculum/common/ncs-i18n.js`
- `HK Cirriculum/_shared/hub-i18n.json`
- `HK Cirriculum/index.html`
- `HK Cirriculum/parent-dashboard/index.html`
- `HK Cirriculum/CEO_CONTINUE_STATUS.md` (this file)
