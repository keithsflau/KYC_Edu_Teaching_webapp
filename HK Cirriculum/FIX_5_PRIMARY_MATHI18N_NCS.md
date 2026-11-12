# Fix 5 — Primary Math + GS: NCS switcher updates visible UI

**Date:** 2026-07-29  
**Scope:** 480 MathI18n apps (240 Primary Mathematics + 240 Primary General Studies)

## Bug

Selecting **English**, **नेपाली**, **اردو**, **Filipino**, or **हिन्दी** in the fleet NCS switcher updated the dropdown but lesson UI stayed in **Traditional Chinese**.

`ncsToMathLang()` already mapped NCS codes → `en` (or `zh`), but React apps never re-rendered because `LanguageSelector` failed to subscribe to `NcsI18n`.

## Root cause

1. **Race:** `LanguageSelector` ran `useEffect` on mount; `NcsI18n` loads **async** (`defer` fleet kit + `math-i18n-ncs-bridge.js`). Early exit `if (!window.NcsI18n) return` meant **no subscription** was ever registered.
2. **Stale initial state:** Apps used `useState("zh")` while `NcsI18n` restored `en`/NCS from `localStorage` — switcher and content disagreed on boot.
3. **No DOM event fallback:** Only `NcsI18n.onChange` was wired; no listener for `ncs:langchange` / `ncs-lang-change`.

## Fix (shared — all 480 inherit)

Updated **`Primary_School/Mathematics/common/i18n.js`** and **`Primary_School/General_Studies/common/i18n.js`**:

| API | Role |
|-----|------|
| `bindNcsLangSync(setLang)` | Polls for `NcsI18n`, subscribes `onChange`, listens DOM events; returns unsubscribe |
| `useMathLang()` | React hook: `[lang, setLang]` with boot sync from NcsI18n |
| `resolveText(t, key, lang)` | `t[key][lang] \|\| t[key].en \|\| t[key].zh` with NCS→math mapping |
| `LanguageSelector` | Uses `bindNcsLangSync` + internal bump to force bridge re-sync |

### NCS → lesson lang mapping (unchanged)

| NCS code | MathI18n / `t{}` key |
|----------|----------------------|
| `zh-Hant` | `zh` |
| `en`, `ja`, `ko`, … | same where present |
| `ne`, `ur`, `tl`, `hi` | **`en`** (English fallback in `t{}`) |

## Sample apps verified (2026-07-29)

| App | Subject | Test |
|-----|---------|------|
| `Mathematics/P1/01_Counting_1_To_10` | Math | Hindi → English title; 繁中 → 數數 1-10 |
| `Mathematics/P2/38_Right_Angles` | Math | Restored corrupted file; EN → Right Angles / Yes / Streak |
| `General_Studies/P1/26_Magnet_Fun` | GS | English UI on boot (stored lang) |
| `General_Studies/P1/29_Flag_Raising` | GS | English UI on boot |

## Pattern for all 480 apps

### Zero-change path (476 apps)

Apps that already have:

```javascript
const [lang, setLang] = useState("zh");
// …
React.createElement(LanguageSelector, { lang, setLang })
// …
t.title[lang] || t.title.en
```

**No edit required.** Shared `i18n.js` bridge now syncs `setLang` when NCS changes.

### Recommended path (new / refactored apps)

```javascript
const { LanguageSelector, useMathLang, resolveText, get } = window.MathI18n;

function App() {
  const [lang, setLang] = useMathLang();

  return React.createElement("div", null,
    React.createElement(LanguageSelector, { lang, setLang }),
    React.createElement("h1", null, resolveText(t, "title", lang)),
    React.createElement("button", null, resolveText(t, "start", lang))
  );
}
```

Rules:

1. Keep **`LanguageSelector`** mounted (hidden bridge marker + backup sync).
2. Use **`useMathLang()`** instead of `useState("zh")` for correct boot lang.
3. Use **`resolveText(t, key, lang)`** or `t[key][lang] || t[key].en` — never hard-code `lang === "zh" ? … : …` for lesson copy.
4. Do **not** add a second language toggle; fleet NCS switcher is top-right.

## Verify locally

```bash
cd "HK Cirriculum"
python -m http.server 8765
# Open any lesson under Primary_School/Mathematics or General_Studies
# Switch NCS → English or Nepali → lesson chrome should show English t{} strings
```

```bash
node "_tools/_census-mathi18n-ncs.js"
```

## Known limitation

**Double switcher:** Some apps load both HTML `data-ncs-kit="fleet-init"` and `math-i18n-ncs-bridge.js`. `NcsI18n.isInitialized()` prevents double init but two `<select>` elements may appear. Cosmetic; both drive the same sync. Strip duplicate fleet-init in a follow-up pass if needed.

## Related docs

- `LANGUAGE_TEAM_MATHI18N_BRIDGE.md` — fleet bridge architecture
- `CEO_NCS_LANG_SWITCH_FIX.md` — hub pages (separate fix)
- `common/math-i18n-ncs-bridge.js` — async NCS kit loader
