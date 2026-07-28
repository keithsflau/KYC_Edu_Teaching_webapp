# Language Team — Hubs + Launch-Pack Flagships

**Date:** 2026-07-29  
**Kit:** `_shared/ncs-i18n/` (thin local stub; migrate when Lead ships full kit)

## Shared kit (stub)

| File | Role |
|------|------|
| `_shared/ncs-i18n/ncs-i18n.js` | `NcsI18n` API — `t()`, `initHub()`, `useLang()`, `LangToggle`, `appTabs()`, `hkc-lang` storage |
| `_shared/ncs-i18n/ncs-i18n.css` | `.ncs-lang-btn` switcher chrome |

Storage key: `hkc-lang` (`zh` default · `en` on toggle). Compatible with existing pricing page.

## Hubs wired

| File | Switcher | Strings |
|------|----------|---------|
| `index.html` | `#ncs-lang-switcher` in header | Nav, hero, curriculum cards, parent section via `data-i18n` |
| `Primary_School/index.html` | top-right | Title, lead, back link |
| `Secondary_School/index.html` | top-right | Title, lead, back link |
| `pricing/index.html` | top-right | Migrated from inline toggle → `NcsI18n` |
| `parent-dashboard/index.html` | header nav | Nav, stats labels, panels, CTAs |

## Launch-pack / board 6-pack flagships

| App | Path |
|-----|------|
| Circuit Builder | `Secondary_School/Physics/Form 5/06_Circuit_Builder/index.html` |
| Gas Laws Lab | `Secondary_School/Physics/Form 4/04_Gas_Laws_Lab/index.html` |
| Fraction Pizza | `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share/index.html` |
| Le Chatelier | `Secondary_School/Chemistry/Form 6/01_Le_Chatelier/index.html` |
| Titration Curve | `Secondary_School/Chemistry/Form 6/02_Titration_Curve/index.html` |
| Equilibrium Kc | `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/index.html` |

Each flagship: `ncs-i18n.js` + `LangToggle` in header; `useLang()` + `appTabs()` for mode tabs; localized back link, title, subtitle, complete CTA. TFZ/drill body copy still uses existing `titleZh`/`titleEn` fields — full paragraph sweep is follow-up.

## Integration pattern

**Static hub:**
```html
<link rel="stylesheet" href="_shared/ncs-i18n/ncs-i18n.css" />
<script src="_shared/ncs-i18n/ncs-i18n.js"></script>
<div id="ncs-lang-switcher"></div>
<script>
  NcsI18n.initHub({ switcher: "#ncs-lang-switcher", strings: { zh: {...}, en: {...} } });
</script>
```

**React flagship:**
```html
<script src="../../../../_shared/ncs-i18n/ncs-i18n.js"></script>
<!-- in babel block -->
const { useLang, LangToggle, appTabs } = window.NcsI18n;
const { isZh, t } = useLang();
```

## Follow-up

- Swap stub path to Lead's canonical `_shared/ncs-i18n` when merged (API should match)
- Deep TFZ / drill string toggle inside flagship labs (hint, feedback, options)
- Subject hub pages (`Chemistry/index.html`, etc.) if board wants toggle on directory headers
