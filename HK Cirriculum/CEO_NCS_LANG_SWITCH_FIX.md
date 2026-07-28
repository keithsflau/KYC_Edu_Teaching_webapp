# NCS Language Switcher Fix

**Date:** 2026-07-29  
**Bug:** Selecting नेपाली / اردو / Filipino / हिन्दी updated the dropdown but left all hub UI in Traditional Chinese.

## Root cause

`pageStringGet()` in `ncs-i18n.js` resolved page-local `initHub` strings with this fallback:

```
pageStrings[hi] → pageStrings.zh → pageStrings.en
```

Hub pages only define `zh` and `en` buckets. For any NCS language, the missing bucket fell through to **Chinese first**, so Hindi (and ne/ur/tl) never reached English or translated strings.

Secondary issues:

- `state.lang` was not synced from `localStorage` on boot (only `html[lang]` was).
- `initHub` document titles used `t(zh, en)` which is a zh/en toggle only.
- No shared NCS string pack existed for hub chrome (`navPricing`, `tagline`, etc.).

## Fix

1. **`getPageBucket()`** — NCS languages now fall back `lang → en → zh`; zh-Hant falls back `zh → en`.
2. **`preparePageStrings()`** — merges page `zh`/`en` with new `_shared/hub-i18n.json` (machine-translated NCS Five). Per-key priority: explicit page NCS → hub NCS → page `en`.
3. **`initHub()`** — async `ensureHub()` load; `resolveHubTitle()` for all six languages.
4. **Boot** — `state.lang` synced from storage; `hub-i18n.json` preloaded.
5. **`pricing/index.html`** — waits for `ensureHub()` before `registerStrings()`.

## Files changed

| File | Change |
|------|--------|
| `_shared/ncs-i18n.js` | Fallback logic, hub loader, `ensureHub`, `resolveHubTitle` |
| `common/ncs-i18n.js` | Fleet sync of canonical kit |
| `_shared/hub-i18n.json` | **New** — MT strings for hub chrome (nav, hero, cards, dashboard, pricing) |
| `pricing/index.html` | `ensureHub()` + NCS-aware document title |
| `CEO_NCS_LANG_SWITCH_FIX.md` | This note |

## Verify

1. Open `http://localhost:5173/index.html`
2. Select **हिन्दी** — nav, tagline, section labels, card copy should show Hindi (or English for keys without MT), **not** 繁中.
3. Repeat on `Primary_School/index.html`, `Secondary_School/index.html`, `pricing/index.html`, `parent-dashboard/index.html`.
4. Confirm **繁體中文** and **English** still work.

## v2 follow-up

- Human-review `hub-i18n.json` MT strings before classroom use.
- i18n remaining hard-coded card bodies on Primary/Secondary hub grids (subject cards).
