# NCS Kit — Canonical API

**Version:** `2.1.0` (kit JS: `NcsI18n.VERSION`)

**Decision (2026-07-29):** One kit, one global: `window.NcsI18n`.

| Role | Path |
|------|------|
| **Canonical JS** | `HK Cirriculum/_shared/ncs-i18n.js` |
| **Canonical CSS** | `HK Cirriculum/_shared/ncs-i18n.css` |
| **Chrome strings** | `HK Cirriculum/_shared/ncs-chrome.json` |
| **LGER string pack** | `HK Cirriculum/_shared/ncs-strings-lger.js` (optional) |
| **Fleet copy** | `HK Cirriculum/common/ncs-i18n.js` (+ `.css`) — same file, synced |
| **Docs** | `NCS_I18N_README.md` (full API), `INJECT.md` (quick inject) |

**Shims (do not extend):**

| Shim | Points to |
|------|-----------|
| `ncs-lang.js` | `NCSLang` alias → `NcsI18n` |
| `ncs-lang.css` | `@import` of `ncs-i18n.css` |
| `ncs-i18n/ncs-i18n.js` | `document.write` loader → `../ncs-i18n.js` |

## Switcher placement (CEO mandate)

Every web app must show the language switcher **fixed at top-right** (右上角).

| Rule | Detail |
|------|--------|
| Default | `position: fixed; top-right; z-index: 2147483000` |
| Auto-mount | `#ncs-lang-auto` injects at top-right (no footer/bottom default) |
| Inline slot | `inline: true` only when app provides `#ncs-lang-slot` in header/toolbar |
| Urdu RTL | Page `dir="rtl"` for content; **switcher stays top-right** (CEO mandate). Select control mirrors internally (`dir="rtl"` on `<option>` + CSS) so اردو remains readable. |
| Deprecated | `position: "bottom"` kept for legacy pages only — do not use in new apps |

Native script labels in dropdown: `繁體中文`, `English`, `नेपाली`, `اردو`, `Filipino`, `हिन्दी`.

## Languages (6)

`zh-Hant` (default) + NCS Five: `en`, `ne`, `ur` (RTL page), `tl`, `hi`

Legacy aliases: `zh`, `zh-HK`, `zh-TW` → `zh-Hant`; `fil` → `tl`.

Storage key: `hksteam.ncs-lang` (also mirrors `hkc-lang` / `hkc-ncs-lang` for older pages).

## Minimal inject

```html
<link rel="stylesheet" href="REL/_shared/ncs-i18n.css" />
<script src="REL/_shared/ncs-i18n.js"></script>
<script>
  NcsI18n.init({ chromePath: "REL/_shared/ncs-chrome.json" });
</script>
```

Fleet apps already on `common/ncs-i18n.js` use the same API (synced copy).

## API snippet

```javascript
// Init (returns Promise)
NcsI18n.init({
  chromePath: "../_shared/ncs-chrome.json",
  strings: { my_key: { en: "...", zh: "...", ne: "...", ur: "...", tl: "...", hi: "..." } },
  target: "#ncs-lang-slot",   // or mount: "#slot" | false
  inline: true,               // static in header slot (not fixed)
  dark: false,
  position: "top",              // default; "bottom" deprecated
  showMtNotice: true,
  onReady: function (lang) {},
  onChange: function (lang) {},
});

// Lookup
NcsI18n.t("start");                    // chrome / app / page string by key
NcsI18n.t("標題", "Title");            // legacy bilingual pick (zh vs en)
NcsI18n.tFromDict(appDict, "title");   // per-app { key: { en, zh, ... } }
NcsI18n.tk("title");                   // registerStrings({ zh: {...}, en: {...} })

// State
NcsI18n.getLang();   // e.g. "zh-Hant", "ur"
NcsI18n.setLang("tl");
NcsI18n.isZh();      // legacy zh/en hubs
NcsI18n.onChange(function (lang) { /* re-render */ });

// DOM
NcsI18n.applyDom();                    // [data-ncs-i18n], [data-i18n], placeholders
NcsI18n.mountSwitcher("#host", { dark: true, inline: true });
NcsI18n.extendLegacyDict(constT);      // add NCS keys to React `const t` objects

// Legacy hub (pricing-style zh/en page dict)
NcsI18n.registerStrings({ zh: { title: "..." }, en: { title: "..." } });
NcsI18n.initHub({ strings: I18N, switcher: "#ncs-lang-switcher", title: { zh, en } });
```

## Accessibility

- Switcher root: `<nav role="navigation" aria-label="Language selection">`
- Select: `aria-labelledby` + dynamic `aria-label` with current language native name
- Options: `lang` attribute per BCP-47 code; `dir="rtl"` on Urdu
- Touch targets: min 44×44 px; `:focus-visible` outlines on select and legacy toggle

## Markup

```html
<button data-ncs-i18n="start">開始</button>
<span data-ncs-i18n="learn" data-ncs-i18n-attr="aria-label"></span>
<h1 data-i18n="demo_title"></h1>
<input data-i18n-placeholder="hint" />
```

## Events

- `ncs-lang-change` — `{ detail: { lang, meta } }`
- `ncs:langchange` — legacy pricing pages (`detail.lang` is `zh` or `en` bucket)
- `hksteam-ncs-lang-change` — fleet listeners

## Changelog

### 2.1.0 (2026-07-29)

- **Top-right mandate:** auto-mount and default position moved from bottom-right to top-right
- **RTL:** Urdu page content RTL; switcher anchor stays top-right (not mirrored to top-left)
- **Labels:** dropdown shows native script only (no English suffix)
- **A11y:** `<nav>` landmark, improved `aria-label`, 44px touch targets, `focus-visible`
- **z-index:** raised to `2147483000` for always-on-top visibility

### 2.0.0

- Unified `NcsI18n` API; 6-language kit (zh-Hant + NCS Five)

## Optional LGER pack

```html
<script src="REL/_shared/ncs-strings-lger.js"></script>
<script src="REL/_shared/ncs-i18n.js"></script>
<script>NcsI18n.init({ chromePath: "REL/_shared/ncs-chrome.json" });</script>
```

Keys like `lger_learn`, `start`, `check` merge automatically.

## Do not

- Add features to `ncs-lang.js` — extend `ncs-i18n.js` only.
- Fork a third kit under `ncs-i18n/ncs-i18n.js` (deprecated loader only).
- Use `NCSLang` in new apps (shim for in-flight kit-build scripts only).
- Place switcher at bottom-right or footer in new apps.
