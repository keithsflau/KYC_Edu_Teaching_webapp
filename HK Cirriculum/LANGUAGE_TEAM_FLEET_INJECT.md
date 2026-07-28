# Language Team — Fleet NCS i18n injection

**Date:** 2026-07-29 (v2 upgrade: top-right **6-lang** + MathI18n included)  
**Goal:** Put a selectable **6-language NCS switcher** (zh-Hant + en/ne/ur/tl/hi) on every curriculum web app without hand-editing ~1,300 `index.html` files.

## What was built

| Asset | Purpose |
|-------|---------|
| `common/ncs-i18n.js` | Shared kit — `window.NcsI18n`, floating switcher, `localStorage` persistence |
| `common/ncs-i18n.css` | Switcher chrome (fixed top-right; bottom on mobile) |
| `_tools/inject-ncs-i18n.js` | Fleet scanner + injector (dry-run / apply) |

### Six languages (v2 — CEO mandate)

| Code | Language | Notes |
|------|----------|-------|
| `zh-Hant` | 繁體中文 | Curriculum baseline |
| `en` | English | |
| `ne` | नेपाली (Nepali) | |
| `ur` | اردو (Urdu) | RTL layout |
| `tl` | Filipino (Tagalog) | |
| `hi` | हिन्दी (Hindi) | |

Aligned with HK ethnic-minority home languages. Chrome strings load from `_shared/ncs-chrome.json`.

### Injected snippet (per app)

Fleet bulk inject uses **`common/ncs-i18n.js`** (synced copy; matches first 126 apps). Init loads chrome from **`_shared/ncs-chrome.json`**. Switcher mounts **fixed top-right** via `NcsI18n.init({ target: document.body })`.

```html
  <!-- NCS i18n fleet kit (auto-injected) -->
  <link rel="stylesheet" href="../../../../common/ncs-i18n.css" />
  <script src="../../../../common/ncs-i18n.js" defer data-ncs-kit="fleet"></script>
  <style data-ncs-kit="fleet-bridge">…hide legacy EN/中 toggles…</style>
  <script data-ncs-kit="fleet-init">NcsI18n.init({ chromePath: "…/_shared/ncs-chrome.json", target: document.body });</script>
```

Inserted immediately before `</head>`. UTF-8 read/write; original CRLF/LF preserved. **Idempotent:** re-run skips apps that already have `data-ncs-kit="fleet-init"`.

### v2 injector changes (2026-07-29)

| Change | Detail |
|--------|--------|
| **Init block** | Script+CSS alone no longer enough — injector adds `fleet-init` so switcher actually mounts |
| **Top-right** | `target: document.body` (not legacy bottom `bootSwitcher`) |
| **MathI18n** | **No longer skipped** — NCS injects alongside; legacy selector hidden via `.ncs-hide-when-ncs-fleet` |
| **`--force-reposition`** | Replaces old bottom-mounted fleet inits on already-injected apps |
| **Upgrade path** | Apps with kit but missing init → `would-upgrade-init` on dry-run |

## First batch applied (2026-07-29)

```bash
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --batch first --apply
```

| Metric | Count |
|--------|------:|
| Fleet scanned (`Primary_School` + `Secondary_School` `index.html`) | 1,318 |
| **Injected (first batch)** | **126** |
| — Junior Science apps + form hubs | 101 |
| — Primary Mathematics (no existing `MathI18n`) | 25 |

`--batch first` = all of **Junior Science** + Primary Math apps that do **not** already load `common/i18n.js` / `MathI18n` (avoids double switchers on the 240 Math apps that already have a 10-language selector).

Re-run idempotency check: all 126 reported `skipped-already`.

## Full fleet status (dry-run after first batch)

| Status | Count |
|--------|------:|
| Already injected | 128 |
| Skipped — existing `MathI18n` (`common/i18n.js`) | 480 |
| **Remaining injectable** | **710** |
| **Total fleet** | **1,318** |

## How to re-run

```bash
# Dry-run everything still missing the kit
node "HK Cirriculum/_tools/inject-ncs-i18n.js"

# Apply full fleet (script + CSS only; low risk)
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --apply

# Bounded batches
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --batch junior-science --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --batch primary-math --apply
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --filter "Secondary_School/Chemistry" --apply

# Fix apps that still mount bottom switchers (legacy fleet-init)
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --force-reposition --apply

# Machine-readable report
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --json
```

### CLI flags

| Flag | Default | Meaning |
|------|---------|---------|
| `--apply` | off | Write files (otherwise dry-run) |
| `--batch <name>` | `all` | `first`, `junior-science`, `primary-math`, or path substring |
| `--filter <path>` | — | Repeatable; only paths containing substring |
| `--force-reposition` | off | Replace bottom-mounted fleet init → top-right |
| `--json` | off | JSON summary on stdout |

## App integration (phase 2)

Injection alone mounts the switcher and sets `document.documentElement.lang` / `dir`. **Lesson content stays EN/ZH** until apps wire dictionaries.

### Listen for language changes

```javascript
document.addEventListener("hksteam-ncs-lang-change", function (e) {
  var lang = e.detail.lang; // en | zh | ur | ne | hi
  // re-render UI from your t{} object
});

// or
NcsI18n.onChange(function (detail) { /* ... */ });
```

### Lookup pattern

```javascript
// Shared chrome
NcsI18n.get("check", NcsI18n.getLang());

// Per-app entry { en, zh, ur, ne, hi } — fall back to en
NcsI18n.lookup(t.title, NcsI18n.getLang());
```

### Junior Science / LGER

Apps using `junior-science-lger.js` still have the built-in **EN/中** toggle. After fleet inject they also show the NCS 5-lang switcher. Next step: bridge `NcsI18n` → `Shell` `isZh` / locale helpers (or replace `LangToggle`).

### Primary Math / General Studies

~240 Math apps use `common/i18n.js` (`MathI18n`, 10 languages). Fleet inject **includes them** (v2). The old 10-lang `<select>` is hidden via `.ncs-hide-when-ncs-fleet` when NCS mounts. Long-term: bridge `MathI18n.setLang` ↔ `NcsI18n.onChange` for content sync.

## Limitations

1. **Switcher only (v1)** — selecting Urdu/Nepali/Hindi does not translate hard-coded English/Chinese lesson strings until per-app `t` objects include `ur`/`ne`/`hi` keys (or apps subscribe to `hksteam-ncs-lang-change`).
2. **Double switchers** — Junior Science (NCS + LGER EN/中) and any `--include-math-i18n` Math app until consolidated.
3. **Vite `dist/` apps** — injector skips `dist/`, `node_modules`, `_archive`, `_legacy`; built apps need source `index.html` inject + rebuild, or a separate dist pass.
4. **Hub / portal pages** — subject `index.html` hubs are included; switcher appears on directory pages too.
5. **Path depth** — injector uses `path.relative(fileDir, common)` (same approach as `p0-fix.js`); no hard-coded `../` count.

## Skip rules

Skipped when:

- `ncs-i18n.js`, `data-ncs-kit="fleet"`, or `window.NcsI18n` already present
- Not under `Primary_School` / `Secondary_School`
- Under `dist/`, `node_modules`, `_archive`, `_legacy`, etc.
- Bottom-mounted fleet init (unless `--force-reposition`)
- Fails `--batch` / `--filter` scope

## Related tools

- `_tools/p0-fix.js` — common path repair (same `relCommonFrom` pattern)
- `tools/fix_i18n_safe.py` — rebuild corrupted inline `const t` blocks (separate concern)
- `_tools/normalize_js_language.py` — Junior Science EN/ZH string splitting

## Next steps (Language Team)

1. Run `--apply` on remaining **710** apps when ready (script-tag-only; low risk).
2. Add `ur`/`ne`/`hi` to high-traffic `const t` templates; use `NcsI18n.lookup`.
3. Bridge `JSLGER` / `MathI18n` to `NcsI18n` to remove duplicate switchers.
4. Optional: `data-ncs-i18n="title"` attribute convention for static HTML chrome.
