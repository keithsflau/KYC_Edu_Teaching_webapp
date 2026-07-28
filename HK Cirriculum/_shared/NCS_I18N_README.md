# NCS Language Kit (`NcsI18n`)

Shared **language switcher + dictionary** for HK Cirriculum static web apps.  
**Canonical decision:** `window.NcsI18n` in `_shared/ncs-i18n.js` (see `NCS_KIT_CANONICAL.md`).

Targets Hong Kong **NCS major languages** plus **Traditional Chinese** as the school default.

## Languages

| Code | Language | Native label | Direction |
|------|----------|--------------|-----------|
| `zh-Hant` | Traditional Chinese | 繁體中文 | LTR (default) |
| `en` | English | English | LTR |
| `ne` | Nepali | नेपाली | LTR |
| `ur` | Urdu | اردو | **RTL** |
| `tl` | Filipino (Tagalog) | Filipino | LTR |
| `hi` | Hindi | हिन्दी | LTR |

Aliases: `zh`, `zh-HK`, `zh-TW` → `zh-Hant`; `fil` → `tl`.

Persistence: `localStorage` key `hksteam.ncs-lang` (reads legacy `hkc-lang`, `hkc-ncs-lang`).

## Files

```
HK Cirriculum/_shared/
  ncs-i18n.js           # Canonical API + switcher
  ncs-i18n.css          # Switcher styles
  ncs-chrome.json       # Shared UI strings (mt-v1)
  ncs-strings-lger.js   # Optional LGER + common UI pack
  demo.html             # Smoke-test page
  NCS_KIT_CANONICAL.md  # Decision record + snippet
  INJECT.md             # Quick inject recipes
  NCS_I18N_README.md    # This file

HK Cirriculum/common/
  ncs-i18n.js           # Fleet copy (keep synced with _shared)
  ncs-i18n.css

Shims (deprecated for new work):
  ncs-lang.js           # NCSLang → NcsI18n alias
  ncs-i18n/ncs-i18n.js  # document.write loader to canonical JS
```

## Quick start

**Relative path example** — app in `Primary_School/General_Studies/P1/01_School_Tour/`:

```html
<link rel="stylesheet" href="../../../_shared/ncs-i18n.css" />
<script src="../../../_shared/ncs-i18n.js"></script>
<script>
  NcsI18n.init({ chromePath: "../../../_shared/ncs-chrome.json" });
</script>
```

With optional LGER pack + app strings:

```html
<script src="../../../_shared/ncs-strings-lger.js"></script>
<script src="../../../_shared/ncs-i18n.js"></script>
<script>
  NcsI18n.init({
    chromePath: "../../../_shared/ncs-chrome.json",
    strings: { my_title: { en: "School tour", zh: "校園遊", ne: "...", ur: "...", tl: "...", hi: "..." } },
  });
</script>
```

## API

### `NcsI18n.init(options)` → `Promise`

| Option | Default | Description |
|--------|---------|-------------|
| `chromePath` | auto from script URL | Path to `ncs-chrome.json` |
| `strings` | `{}` | App keys merged on top of `NCSStringsLGER` |
| `lang` / `defaultLang` | stored or `zh-Hant` | Initial language |
| `mount` | `true` | `true`, `false`, or `"#selector"` |
| `target` | — | Explicit switcher host (hub headers) |
| `inline` | `false` | Non-fixed switcher placement |
| `dark` | `false` | Dark header variant |
| `position` | `top` | `bottom` for footer-adjacent auto mount |
| `showMtNotice` | `false` | Machine-translation disclosure bar |
| `onChange(lang)` | — | After language change |
| `onReady(lang)` | — | After first DOM apply |

### `NcsI18n.t(key, fallback?)`

Returns translated string for current language. Also supports legacy `NcsI18n.t(zhText, enText)`.

```javascript
document.getElementById("title").textContent = NcsI18n.t("start");
```

### Other helpers

- `NcsI18n.getLang()` / `NcsI18n.setLang(code)`
- `NcsI18n.isZh()` / `NcsI18n.toggle()` — legacy zh/en hubs
- `NcsI18n.tk(key)` — `registerStrings({ zh: {...}, en: {...} })` lookup
- `NcsI18n.applyDom()` / `applyDOM()` — refresh `[data-i18n]` and extended attrs
- `NcsI18n.tFromDict(dict, key)` — per-app dictionary with fallback chain
- `NcsI18n.extendLegacyDict(t)` — add NCS keys to React `const t` objects
- `NcsI18n.mountSwitcher("#host", { inline, dark })`
- `NcsI18n.initHub({ strings, switcher, title, onChange })` — pricing-style pages
- `NcsI18n.LANGS` — metadata array

### Declarative markup

```html
<h1 data-ncs-i18n="start"></h1>
<h1 data-i18n="demo_title"></h1>
<input data-i18n-placeholder="hint" />
<button data-i18n-title="submit" data-i18n-aria="submit"></button>
```

### Events

```javascript
window.addEventListener("ncs-lang-change", function (e) {
  console.log(e.detail.lang);
});
```

Legacy: `ncs:langchange`, `hksteam-ncs-lang-change`.

## String format

Each key maps language codes to text (`zh` and `zh-Hant` are interchangeable):

```javascript
{
  start: {
    en: "Start",
    zh: "開始",
    ne: "सुरु गर्नुहोस्",
    ur: "شروع کریں",
    tl: "Simulan",
    hi: "शुरू करें",
  },
}
```

## Built-in LGER pack (`ncs-strings-lger.js`)

| Key | Purpose |
|-----|---------|
| `lger_learn`, `lger_guided`, `lger_experiment`, `lger_review` | LGER tabs |
| `start`, `reset`, `back`, `next`, `submit` | Primary actions |
| `check`, `hint`, `correct`, `try_again` | Feedback |
| `score`, `clear`, `done`, `loading`, `language` | UI chrome |

Chrome JSON mirrors overlapping keys (`learn`, `guided`, `start`, …).

## RTL (Urdu)

When `ur` is selected:

- `document.documentElement.dir` → `rtl`
- `html` gets class `ncs-rtl`
- Recommend [Noto Nastaliq Urdu](https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu) for substantial Urdu copy

## Smoke test

Open `HK Cirriculum/_shared/demo.html`. Change language; confirm LGER tabs, buttons, and Urdu RTL.

## Migration from `NCSLang`

Replace:

```html
<script src="ncs-lang.js"></script>
<script>NCSLang.init();</script>
```

With:

```html
<script src="ncs-i18n.js"></script>
<script>NcsI18n.init({ chromePath: "ncs-chrome.json" });</script>
```

`ncs-lang.js` remains a thin shim if load order cannot change immediately.

## Path cheat sheet

| App location | Script `src` prefix |
|--------------|---------------------|
| `Primary_School/General_Studies/P1/01_*/` | `../../../_shared/` |
| `Secondary_School/Mathematics/Form 2/L4_*/` | `../../../../_shared/` |
| `pricing/` | `../_shared/` |
| Fleet bulk (Junior Science etc.) | `../../../../common/` |

Count up to `HK Cirriculum/`, then into `_shared/` or `common/`.
