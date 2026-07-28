# Language Team — NCS Fleet Plan

**Lead:** Language Team  
**Date:** 2026-07-29  
**Scope:** All web apps under `HK Cirriculum/` (~1,300 modules) + platform shell `hksteamai-platform/`  
**Status:** Phase 0 complete — shared kit scaffolded; injection is sibling-agent work.

---

## 1. The five NCS languages (confirmed)

### Decision

| # | BCP-47 | Native label | Community / EDB alignment |
|---|--------|--------------|---------------------------|
| 1 | `en` | English | Medium of instruction & EDB support language for NCS families |
| 2 | `ne` | नेपाली | Nepalese — 29,701 residents (2021 census); fast-growing HK-born student cohort |
| 3 | `ur` | اردو | Pakistani — 24,385 residents; EDB parent booklets in Urdu |
| 4 | `tl` | Filipino | Filipino — largest ethnic minority (201,291; 32.5% of EM); EDB Tagalog materials |
| 5 | `hi` | हिन्दी | Indian — 42,569 residents; EDB Hindi materials for South Asian families |

**These five are the CEO-mandated NCS set** (English + four major South/Southeast Asian mother-tongue groups in HK schools).

### Full learner selector (6 languages)

Apps also expose **`zh-Hant` (繁體中文)** as the Hong Kong curriculum baseline. NCS learners study Chinese in school; the switcher must let them return to Traditional Chinese for class alignment.

```
Full selector = zh-Hant + NCS Five = 6 options
```

| Code | Role |
|------|------|
| `zh-Hant` | Curriculum / school Chinese (default for HK apps) |
| `en` | English — instruction & accessibility |
| `ne` | Nepali mother-tongue UI |
| `ur` | Urdu mother-tongue UI (RTL) |
| `tl` | Filipino / Tagalog mother-tongue UI |
| `hi` | Hindi mother-tongue UI |

### Why not Indonesian, Thai, Punjabi, Vietnamese?

- **EDB publishes 10 parent-booklet languages** (zh, en, id, hi, ne, tl, th, ur, pa, vi). We cannot ship 10 on day one.
- **2021 census top ethnic minorities (excl. Chinese):** Filipino → Indonesian → Indian → Nepalese → Pakistani.
- **CEO mandate names five:** en, ne, ur, tl, hi — matches the four largest *school-age* South/Southeast Asian groups plus English.
- **Phase 2 candidate:** `id` (Bahasa Indonesia) — #2 ethnic group; add when human-reviewed strings exist.

### Sources

- EDB NCS definition: home spoken language ≠ Chinese ([EDB NCS page](https://www.edb.gov.hk/en/student-parents/ncs-students/about-ncs-students/index.html))
- Parent Education Resource Booklet — 10 language versions ([Smart Parent Net](https://www.parent.edu.hk/en/smart-parent-net/topics/article/NCS_resourcebooklet))
- 2021 Population Census — Ethnic Minorities thematic report ([C&SD PDF](https://www.census2021.gov.hk/doc/pub/21c-ethnic-minorities.pdf))
- LCQ12 school NCS counts ~9,500+ in public primaries (2023/24)

---

## 2. Architecture

### Shared kit (fleet-wide) — unified 2026-07-29

**Canonical:** `window.NcsI18n` in `_shared/ncs-i18n.js` (see `NCS_KIT_CANONICAL.md`).

| File | Purpose |
|------|---------|
| `HK Cirriculum/_shared/ncs-i18n.js` | **Canonical** API: `init`, `setLang`, `t`, `mountSwitcher`, `extendLegacyDict` |
| `HK Cirriculum/_shared/ncs-i18n.css` | Accessible switcher chrome (slate/teal) |
| `HK Cirriculum/_shared/ncs-chrome.json` | Shared UI strings (LGER tabs, buttons, nav) — **mt-v1 tier** |
| `HK Cirriculum/_shared/ncs-strings-lger.js` | Optional LGER pack merged on `init()` |
| `HK Cirriculum/common/ncs-i18n.js` | Fleet copy (synced with `_shared`) |
| `HK Cirriculum/_shared/INJECT.md` | Copy-paste recipes for sibling agents |
| `HK Cirriculum/_shared/NCS_I18N_README.md` | Full API reference |

**Shims (do not extend):** `ncs-lang.js` (`NCSLang` alias), `ncs-i18n/ncs-i18n.js` (deprecated loader).

### Design principles

1. **Zero build step** — plain `<script>` + `<link>` for static HTML apps (matches existing fleet).
2. **localStorage persistence** — key `hksteam.ncs-lang`; survives refresh across apps on same origin.
3. **Legacy alias map** — `zh`, `zh-HK`, `zh-TW` → `zh-Hant`; `fil` → `tl`.
4. **RTL** — `ur` sets `dir="rtl"` on `<html>` and `<body>`.
5. **Progressive content** — chrome first (buttons, LGER labels, nav); per-app `const t` blocks extended over time.
6. **Machine translation tiering** — `ncs-chrome.json` tagged `mt-v1`; human review before classroom-critical copy.

### API surface (`window.NcsI18n` v2)

```js
NcsI18n.init({ chromePath, strings, target, inline, dark, mount, position, showMtNotice, onReady, onChange })
NcsI18n.setLang("ur")           // persists + applies dir + re-renders DOM hooks
NcsI18n.getLang()               // current code (zh-Hant, en, ne, ur, tl, hi)
NcsI18n.t("start")              // chrome / app / page string
NcsI18n.t("繁體", "English")    // legacy bilingual pick
NcsI18n.tk("title")             // registerStrings({ zh, en }) lookup
NcsI18n.tFromDict(appDict, "title")
NcsI18n.extendLegacyDict(t)     // add NCS keys to existing { en, zh } objects
NcsI18n.onChange(fn)
NcsI18n.mountSwitcher("#host")
NcsI18n.applyDom()              // data-ncs-i18n, data-i18n, placeholder/title/aria
```

### DOM hooks

```html
<button data-ncs-i18n="start">開始</button>
<span data-ncs-i18n="learn" data-ncs-i18n-attr="aria-label"></span>
```

Legacy `data-i18n` attributes are also updated when chrome keys exist.

### Coexistence with legacy `common/i18n.js`

Primary **General Studies** and **Mathematics** hubs ship an older 10-language `MathI18n` selector (en, zh, ja, ko, es, de, fi, fr, ar, it). **Do not delete yet.**

| App type | Action |
|----------|--------|
| New apps / flagships | Use `_shared/ncs-i18n.js` only |
| GS / Math React apps | Add NCS kit **alongside** legacy; migrate `t` objects via `extendLegacyDict` |
| Secondary plain HTML | Inject NCS kit; wrap existing zh/en toggle |

### Platform (`hksteamai-platform`) — ✅ host chrome (2026-07-29)

Keep Next.js `src/lib/i18n.ts` for shell (en / zh-HK). **Play route:** `PlayableModule` + `NcsLangSwitcher` in `/play/[...path]` toolbar (6 codes). Host syncs `hksteam.ncs-lang`, `?lang=` on first load, and `postMessage` `{ type: "hksteam.ncs-lang", lang }`. Kit v2.2+ `bindPlatformBridge()` in iframe. **In-app switcher remains primary** once fleet injection completes.

---

## 3. Rollout phases

### Phase 0 — Kit scaffold ✅ (this deliverable)

- [x] Confirm 5 NCS languages + zh-Hant baseline
- [x] Ship `_shared/ncs-i18n.js`, `.css`, `ncs-chrome.json`
- [x] Document injection for sibling agents

### Phase 1 — Hubs & flagships (sibling agents: hub / flagship)

**Targets:** `Primary_School/index.html`, `Secondary_School/index.html`, subject hub pages, `pricing/`, top 20 showcase apps.

**Work:**
1. Add 3-line injection (see `INJECT.md`).
2. Mark hub nav links with `data-ncs-i18n`.
3. Verify Urdu RTL + localStorage across two hub clicks.

**Acceptance:** Hub loads switcher; LGER tabs (if present) translate for all 6 codes.

### Phase 2 — Primary bulk injection (sibling: primary agent)

**Targets:** `Primary_School/General_Studies/**`, `Primary_School/Mathematics/**` (~300 apps).

**Work:**
1. Bulk-inject script tags via `_tools/inject_ncs_i18n.py` (to be written by Digital Office).
2. For React apps: `NcsI18n.extendLegacyDict(t)` after `const t` definition.
3. Add `ne|ur|tl|hi` keys to high-traffic apps first; others fall back to English.

**Acceptance:** Magnet Fun–style apps show 6-language selector; `t("start")` never returns raw key for chrome strings.

### Phase 3 — Secondary bulk injection (sibling: secondary agent)

**Targets:** `Secondary_School/**` labs, mock papers, simulations.

**Work:**
1. Same injection pattern; respect existing zh/en toggle buttons — replace with unified switcher where trivial.
2. Science/ICT apps: chrome only in pass 1; question stems in pass 2.

### Phase 4 — Content depth & human QA

| Tier | Content | QA |
|------|---------|-----|
| `mt-v1` | Chrome JSON | Machine translation; show optional MT notice |
| `mt-v2` | Per-app `const t` blocks | Glossary-constrained MT batch |
| `human-v1` | Parent-facing / assessment labels | Bilingual teacher review |
| `human-v2` | Exam-adjacent copy | EDB officer sign-off |

**Indonesian (`id`)** added here if census demand + EDB booklet parity requires a 7th selector option.

### Phase 5 — Platform iframe bridge

- Play route passes `?lang=` query from parent localStorage.
- Module `init` reads query before localStorage.

---

## 4. Sibling agent injection guide

### Minimal injection (any `index.html`)

```html
<link rel="stylesheet" href="../../_shared/ncs-i18n.css" />
<script src="../../_shared/ncs-i18n.js"></script>
<script>
  NcsI18n.init({ chromePath: "../../_shared/ncs-chrome.json" });
</script>
```

Adjust `../../` depth per folder. From `Primary_School/General_Studies/P1/01_School_Tour/` use `../../../_shared/`.

### React app with local `const t`

```html
<script>
  const t = { title: { en: "Magnet Fun", zh: "磁鐵小遊戲" }, /* ... */ };
  NcsI18n.init({ chromePath: "../../../_shared/ncs-chrome.json" }).then(function () {
    NcsI18n.extendLegacyDict(t);
    // re-render or setState with NcsI18n.getLang()
    NcsI18n.onChange(function () { /* trigger React setLang */ });
  });
</script>
```

### Hub header (inline, dark)

```js
NcsI18n.init({
  chromePath: "../_shared/ncs-chrome.json",
  target: "#ncs-lang-slot",
  inline: true,
  dark: true,
});
```

### Path cheat sheet

| Location | Relative path to `_shared/` |
|----------|----------------------------|
| `HK Cirriculum/pricing/` | `../_shared/` |
| `HK Cirriculum/Primary_School/` | `../_shared/` |
| `HK Cirriculum/Primary_School/General_Studies/P3/01_*/` | `../../../_shared/` |
| `HK Cirriculum/Secondary_School/Biology/apps/*/` | `../../../../_shared/` |

### Do not

- Hand-translate 1,300 apps in one sprint.
- Remove zh-Hant as default — NCS students still need curriculum Chinese.
- Mix languages in one string (see `QA_LANGUAGE_CONSISTENCY.md`).
- Ship purple gradient AI-slop switchers — use `_shared/ncs-i18n.css`.

---

## 5. Translation strategy

| Layer | Owner | Method |
|-------|-------|--------|
| Chrome (buttons, LGER, nav) | Language Team | `ncs-chrome.json` — batch MT now, human review queue |
| Per-app instructional copy | Subject agents | Extend `const t` with 6 keys per string; EN fallback |
| Assessment / exam stems | EDB officer role | Human only |
| Platform shell | Platform lead | `i18n.ts` separate track |

**Fallback chain:** requested lang → `en` → `zh-Hant` → raw key (dev visibility).

---

## 6. QA checklist (per app)

- [ ] Switcher visible, keyboard accessible, `aria-labelledby` present
- [ ] All 6 options selectable; choice persists after reload
- [ ] Urdu sets RTL; switching back to zh-Hant restores LTR
- [ ] No mixed-language sentences in one label
- [ ] Chrome strings update; content strings fall back gracefully
- [ ] No console errors when `ncs-chrome.json` path is correct

---

## 7. Coordination matrix

| Agent | Responsibility |
|-------|----------------|
| **Language Team (Lead)** | Kit, chrome JSON, plan, QA standards |
| **Hub agent** | Primary/Secondary index pages, pricing |
| **Flagship agent** | Top showcase apps, LGER tab bars |
| **Primary agent** | GS + Math bulk inject |
| **Secondary agent** | Labs, simulations, mock papers |
| **Digital Office** | `inject_ncs_i18n.py` bulk tool, CI grep for missing kit |
| **Platform agent** | iframe lang bridge, play toolbar |

---

## 8. Files delivered (Phase 0 + unify)

```
HK Cirriculum/
  _shared/
    ncs-i18n.js           # canonical library (NcsI18n v2)
    ncs-i18n.css          # switcher styles
    ncs-chrome.json       # shared UI strings (mt-v1)
    ncs-strings-lger.js   # optional LGER pack
    NCS_KIT_CANONICAL.md  # API decision record
    NCS_I18N_README.md    # full API docs
    INJECT.md             # quick reference
    demo.html             # smoke test
  common/
    ncs-i18n.js           # fleet copy (synced)
    ncs-i18n.css
  LANGUAGE_TEAM_NCS_PLAN.md   # this document
```

---

*Next action for siblings:* pick Phase 1 hub targets and inject using `INJECT.md`. Report blockers in `BOARD_MEETING_2026-07-29.md` thread.
