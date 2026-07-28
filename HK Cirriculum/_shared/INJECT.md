# NCS i18n — quick inject reference

**Canonical API:** `NcsI18n` — see `NCS_KIT_CANONICAL.md` and `NCS_I18N_README.md`  
**Full plan:** `../LANGUAGE_TEAM_NCS_PLAN.md`

## The 5 NCS languages (+ zh-Hant)

| Code | Language |
|------|----------|
| `zh-Hant` | 繁體中文 (curriculum baseline) |
| `en` | English |
| `ne` | नेपाली (Nepali) |
| `ur` | اردو (Urdu, RTL) |
| `tl` | Filipino (Tagalog) |
| `hi` | हिन्दी (Hindi) |

## 3-line inject

```html
<link rel="stylesheet" href="REL/_shared/ncs-i18n.css" />
<script src="REL/_shared/ncs-i18n.js"></script>
<script>NcsI18n.init({ chromePath: "REL/_shared/ncs-chrome.json" });</script>
```

Replace `REL` with correct `../` depth. Fleet bulk inject may use `REL/common/ncs-i18n.js` (synced copy).

## Markup

```html
<button data-ncs-i18n="start">開始</button>
<span data-ncs-i18n="learn" data-ncs-i18n-attr="aria-label"></span>
<h1 data-i18n="my_title"></h1>
```

## React legacy dict

```js
NcsI18n.init({ chromePath: "..." }).then(function () {
  NcsI18n.extendLegacyDict(t);
  NcsI18n.onChange(function (lang) { setLang(lang); });
});
```

## Lookup helpers

```js
NcsI18n.tFromDict(t, "title");
NcsI18n.t("繁體標題", "English title");  // legacy bilingual
NcsI18n.tk("title");                     // registerStrings page dict
```

## Deprecated paths

| Old | Use instead |
|-----|-------------|
| `ncs-lang.js` / `NCSLang` | `ncs-i18n.js` / `NcsI18n` |
| `ncs-i18n/ncs-i18n.js` | `_shared/ncs-i18n.js` |
