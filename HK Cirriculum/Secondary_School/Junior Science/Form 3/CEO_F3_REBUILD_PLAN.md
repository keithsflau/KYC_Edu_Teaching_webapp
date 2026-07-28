# CEO Form 3 Junior Science — FULL REBUILD PLAN

**Agent:** 1/5 (Audit + Kill List + PPT Map)  
**Date:** 2026-07-29  
**Verdict:** **ALL 31 existing Form 3 app folders are garbage.** Delete and rebuild from scicent Books 12–14 teaching PowerPoints only.  
**CEO directive:** Form 3 = textbook-faithful LGER apps, not HKDSE bridge stubs, not auto-generator spam.

---

## 1. Executive summary

| Metric | Count |
|--------|------:|
| Existing app folders | **31** |
| **KILL immediately** (corrupt / duplicate / wrong lane) | **14** |
| **REBUILD from scratch** (thin PPT stubs) | **18** |
| **Defer to Wave 2** (`Bridge/` subfolder, not PPT) | **6** |
| **Target after rebuild** (PPT 1:1) | **18** |
| Official PPT chapter decks (Books 12–14, excl. unit_end) | **18** |
| PPT files in repo (3A+3B+3C, EN+中文) | **42** |

**Root problems found:**

1. **Numbering civil war** — two competing schemes (`01–06` bridge vs `11–28` PPT vs `03–10` corrupt legacy) on the same hub.
2. **8× ~7 MB corrupted index.html** — generator bug inflated `LEARN`/`GUIDED` option arrays to ~200k entries; UTF-8 corruption; unusable in browser.
3. **18× thin auto-generated stubs** (~10–12 KB) — PPT text pasted with generic distractors (`"Science ignores evidence…"`), duplicate Learn steps 4–6, toy slider experiments, wrong `<title>` (`S2 Junior Science`), no real teach-from-zero.
4. **6× hand-crafted bridge apps** (~11 KB) — better bilingual opts but **not Books 12–14**; wrong curriculum lane for Form 3 textbook year.
5. **Hub index.html** lists 28 broken links + duplicates; must be rewritten after renumber.

---

## 2. Full inventory (current state)

Quality key: **STUB** = LGER shell + pasted PPT fragments + generic MCQ; **THIN** = hand-crafted but minimal; **CORRUPT** = multi-MB broken generator output; **CDN** = React 18 + Babel standalone (all apps).

| Folder | Size | Quality | LGER | NCS | Issues |
|--------|-----:|---------|:----:|:---:|--------|
| `01_Climate_Action` | 11 KB | THIN | ✓ | ✓ | Not Book 12–14; bridge content |
| `02_Genetics_Intro` | 11 KB | THIN | ✓ | ✓ | Not Book 12–14; bridge content |
| `03_Ecosystem_Balance` | 12 KB | THIN | ✓ | ✓ | Duplicate topic; not PPT |
| `03_Acid_Rain_Advanced` | **7.3 MB** | **CORRUPT** | ✓ | ✓ | 200k-option arrays, encoding rot |
| `04_Scientific_Method` | 11 KB | THIN | ✓ | ✓ | Not Book 12–14 |
| `04_Circuit_Design` | **7.2 MB** | **CORRUPT** | ✓ | ✓ | Duplicate of 06; corrupt |
| `05_Force_Motion_Bridge` | 11 KB | THIN | ✓ | ✓ | Not Book 12–14 |
| `05_Ecosystem_Balance` | **7.3 MB** | **CORRUPT** | ✓ | ✓ | Duplicate of 03; corrupt |
| `06_Circuit_Design` | 11 KB | THIN | ✓ | ✓ | Duplicate of 04 (thin) |
| `06_Human_Impact` | **7.6 MB** | **CORRUPT** | ✓ | ✓ | Corrupt generator output |
| `07_Data_Analysis` | **7.3 MB** | **CORRUPT** | ✓ | ✓ | Corrupt generator output |
| `08_Force_Advanced` | **7.4 MB** | **CORRUPT** | ✓ | ✓ | Corrupt generator output |
| `09_Chemistry_Bridge` | **7.4 MB** | **CORRUPT** | ✓ | ✓ | Corrupt generator output |
| `10_Energy_Systems` | **7.3 MB** | **CORRUPT** | ✓ | ✓ | Corrupt generator output |
| `11_Healthy_Lifestyle` | 12 KB | STUB | ✓ | ✓ | Generic distractors; toy experiment |
| `12_Food_Substances` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `13_Digestion` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `14_Balanced_Diet` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `15_Disease_Prevention` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `16_Biotechnology` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `17_Atoms_Elements` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `18_Periodic_Table` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `19_Compounds` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `20_Metals` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `21_Alloys_Materials` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `22_Light_Sources` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `23_Reflection` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `24_Refraction` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `25_Total_Internal_Reflection` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `26_Lenses` | 11 KB | STUB | ✓ | ✓ | Same pattern |
| `27_EM_Waves` | 10 KB | STUB | ✓ | ✓ | Same pattern |
| `28_Light_Technology` | 11 KB | STUB | ✓ | ✓ | Same pattern |

**Hub:** `Form 3/index.html` — lists all 31 broken apps; footer OK.  
**Orphan doc:** `S3_PLAN.md` — obsolete bridge roadmap; superseded by this plan.

---

## 3. Kill list (Agent 2 — execute first)

### 3A. DELETE folder entirely (corrupt / duplicate — no salvage)

| Folder | Reason |
|--------|--------|
| `03_Acid_Rain_Advanced` | 7.3 MB corrupt; not Book 12–14 |
| `04_Circuit_Design` | 7.2 MB corrupt duplicate |
| `05_Ecosystem_Balance` | 7.3 MB corrupt duplicate |
| `06_Human_Impact` | 7.6 MB corrupt |
| `07_Data_Analysis` | 7.3 MB corrupt |
| `08_Force_Advanced` | 7.4 MB corrupt |
| `09_Chemistry_Bridge` | 7.4 MB corrupt |
| `10_Energy_Systems` | 7.3 MB corrupt |

### 3B. DELETE folder entirely (wrong curriculum lane — salvage ideas only)

| Folder | Reason | Salvage note |
|--------|--------|--------------|
| `01_Climate_Action` | HKDSE bridge, not scicent F3 | Move concept to Wave 2 `Bridge/` |
| `02_Genetics_Intro` | F1 Book 4 content, not F3 | Already covered F1 |
| `03_Ecosystem_Balance` | F1/F2 ecology, not Book 12–14 | Wave 2 |
| `04_Scientific_Method` | F1 Book 1 content | Wave 2 |
| `05_Force_Motion_Bridge` | F2 Book 11 content | Wave 2 |
| `06_Circuit_Design` | F2 Book 8 duplicate | Wave 2 |

### 3C. DELETE folder entirely (PPT stubs — full rewrite replaces)

All `11_*` … `28_*` folders — content is auto-generator trash; **do not patch in place**.

**Total folders to delete: 31** (clean slate).

---

## 4. Official PPT sources (Books 12–14)

**Base path:**  
`Reference/Secondary/HKDSE/Integrated_Science/materials/Resources_{3A,3B,3C}_r/01-Teaching Resources 教學資源/01-Teaching PowerPoint 教學簡報/`

| Pack | Book | Form unit | PPT files | EN chapter decks |
|------|------|-----------|----------:|-----------------:|
| `Resources_3A_r` | **12** — Health & Biotechnology | 3A | 14 | 7 |
| `Resources_3B_r` | **13** — Matter (Atoms → Alloys) | 3B | 12 | 6 |
| `Resources_3C_r` | **14** — Light & EM waves | 3C | 16 | 8 |

**Extracted text:** `HK Cirriculum/ppt-extract-com.json` (PowerPoint COM, EN `_e.ppt` / `_r_e.ppt` decks).  
**Configs (to fix, not trust):** `HK Cirriculum/scripts/f3-lger-configs.json`  
**Generator (broken for corrupt apps):** `HK Cirriculum/scripts/generate-f3-lger.py`  
**See also:** `JUNIOR_SCIENCE_PPT_INVENTORY.md`, `JUNIOR_SCIENCE_PPT_TO_APP_MAP.md`

**Unit-end concept map decks** (`*_unit_end_*.ppt`) — **do not** spawn separate apps; fold key links into **Review** of final chapter per book (12·6, 13·5, 14·7).

---

## 5. Target app list — 18 apps, 1:1 with PPT chapters

**Renumbering mandate:** New folders **`01`–`18`** (book order). Retire `11–28` numbering forever.

### Book 12 — Health & Biotechnology (`Resources_3A_r`)

| # | New folder | App name (EN · 中文) | PPT source | PPT file | Learning objectives (from slides) |
|---|------------|----------------------|------------|----------|-----------------------------------|
| 01 | `01_Healthy_Lifestyle` | Healthy Lifestyle · 健康生活 | B12·Ch1 | `scicent_ppt_12_1_e.ppt` | Define health (WHO: physical + mental + social); identify healthy vs unhealthy habits; discuss lifestyle choices (exercise, sleep, diet, no smoking/drugs) |
| 02 | `02_Food_Substances` | Food Substances · 食物物質 | B12·Ch2 | `scicent_ppt_12_2_r_e.ppt` | Classify primary (carbohydrates, lipids, proteins) and protective (vitamins, minerals, fibre, water) food substances; energy from carbs; fat vs oil; protein for growth/repair |
| 03 | `03_Digestion` | Digestion & Absorption · 消化與吸收 | B12·Ch3 | `scicent_ppt_12_3_e.ppt` | Explain digestion breaks large food into small soluble units; mechanical vs chemical digestion; alimentary canal organs; absorption in small intestine |
| 04 | `04_Balanced_Diet` | Balanced Diet · 均衡飲食 | B12·Ch4 | `scicent_ppt_12_4_r_e.ppt` | State balanced diet = six food types in right amounts/proportions; HK food pyramid; malnutrition (overnutrition/undernutrition); special dietary needs |
| 05 | `05_Disease_Prevention` | Disease Prevention · 疾病預防 | B12·Ch5 | `scicent_ppt_12_5_r_e.ppt` | Classify infectious vs non-infectious disease; pathogens; transmission routes; hygiene, vaccination, antibiotics; lifestyle disease prevention |
| 06 | `06_Biotechnology` | Biotechnology · 生物科技 | B12·Ch6 | `scicent_ppt_12_6_e.ppt` | Define biotechnology; examples (fermentation, GM crops, insulin production); benefits, risks, ethics |

### Book 13 — Atoms, Elements & Materials (`Resources_3B_r`)

| # | New folder | App name (EN · 中文) | PPT source | PPT file | Learning objectives (from slides) |
|---|------------|----------------------|------------|----------|-----------------------------------|
| 07 | `07_Atoms_Elements` | Atoms & Elements · 原子與元素 | B13·Ch1 | `scicent_ppt_13_1_r_e.ppt` | Atoms as smallest units; elements = one kind of atom; compare atoms to building blocks; symbols and names |
| 08 | `08_Periodic_Table` | Periodic Table · 週期表 | B13·Ch2 | `scicent_ppt_13_2_r_e.ppt` | Mendeleev's development; rows = periods, columns = groups; predict properties from position; modern periodic table layout |
| 09 | `09_Compounds` | Compounds · 化合物 | B13·Ch3 | `scicent_ppt_13_3_r_e.ppt` | Compounds vs elements; fixed composition; electrolysis of water (Exp 13.4); chemical formulas |
| 10 | `10_Metals` | Metals · 金屬 | B13·Ch4 | `scicent_ppt_13_4_r_e.ppt` | History (Stone/Copper/Bronze/Iron Age); properties and uses of metals; extraction from ores; reactivity preview |
| 11 | `11_Alloys_Materials` | Alloys & Materials · 合金與物料 | B13·Ch5 | `scicent_ppt_13_5_r_e.ppt` | Define alloy; steel, brass, solder examples; alloys vs pure metals; plastics as modern materials |

### Book 14 — Light & Electromagnetic Spectrum (`Resources_3C_r`)

| # | New folder | App name (EN · 中文) | PPT source | PPT file | Learning objectives (from slides) |
|---|------------|----------------------|------------|----------|-----------------------------------|
| 12 | `12_Light_Sources` | Light Sources · 光源 | B14·Ch1 | `scicent_ppt_14_1_e.ppt` | Luminous vs non-luminous objects; light enables vision; light travels in straight lines (ray model) |
| 13 | `13_Reflection` | Reflection of Light · 光的反射 | B14·Ch2 | `scicent_ppt_14_2_e.ppt` | Laws of reflection; angle of incidence = angle of reflection; plane mirror images (virtual, laterally inverted); Exp 14.1 |
| 14 | `14_Refraction` | Refraction of Light · 光的折射 | B14·Ch3 | `scicent_ppt_14_3_e.ppt` | Refraction at boundary; glass block experiment (Exp 14.3); refractive index idea; apparent depth |
| 15 | `15_Total_Internal_Reflection` | Total Internal Reflection · 全內反射 | B14·Ch4 | `scicent_ppt_14_4_e.ppt` | Critical angle; TIR conditions; optical fibres; Exp 14.5 water-to-air |
| 16 | `16_Lenses` | Lenses · 透鏡 | B14·Ch5 | `scicent_ppt_14_5_e.ppt` | Convex vs concave; converging/diverging; real vs virtual images; Exp 14.9 ray diagrams |
| 17 | `17_EM_Waves` | Electromagnetic Waves · 電磁波 | B14·Ch6 | `scicent_ppt_14_6_e.ppt` | EM spectrum; visible light as EM wave; IR/UV properties; wave model (wavelength, frequency) |
| 18 | `18_Light_Technology` | Light & Technology · 光與科技 | B14·Ch7 | `scicent_ppt_14_7_e.ppt` | IR/UV detection (Exp 14.18); applications (self-driving LiDAR/IR, UV sterilization); safety |

---

## 6. Build mandates (non-negotiable)

Every rebuilt app **must** pass `LGER_QUALITY_CHECKLIST.md` and `LGER_FRAMEWORK.md`.

### 6.1 LGER structure

| Phase | Requirement |
|-------|-------------|
| **L — Learn** | 6 teach-from-zero steps; each step = concept explanation + bilingual body + 1 MCQ gate; **no** generic distractors |
| **G — Guided** | ≥4 challenges; progressive difficulty; per-question hints; instant feedback |
| **E — Experiment** | Canvas/SVG interactive sim matching PPT activity (not a single slider toy); parameters + observable outcome; unlock after Learn (`localStorage` `hkc_js_lger_{appId}`) |
| **R — Review** | 4-point bilingual summary + 5-question quiz + 1 extension challenge |

### 6.2 Content sourcing

1. **Primary:** PPT `key_concepts` from `ppt-extract-com.json` + `_c.ppt` 中文 decks for zh-Hant bodies.
2. **Secondary:** EDB `JS_Science_Curriculum_Framework_2025` unit tags (`is-u11-healthy`, `is-u07-matter-energy`, `is-u12-light-sound`).
3. **Forbidden:** Generic filler options (`"Science ignores evidence…"`, `"Measurements are never needed…"`).

### 6.3 Technical stack

| Rule | Detail |
|------|--------|
| Shell | `../../../../common/junior-science-lger.js` → `JSLGER.Shell` |
| Bilingual | zh-Hant + en via `{ zh, en }` opts + `whyZh`/`whyEn`; **NCS fleet kit** (`ncs-i18n.js`, `ncs-chrome.json`) |
| Footer | `@HKSTEAMAI All Copy-Right Reserved.` via `JSLGER.Footer` (mandatory) |
| React CDN | **Avoid if possible.** Prefer vanilla JS experiment + Babel-safe JSX in single file; if React required, use pinned UMD + `babel-react-classic.js` preset only |
| **No** visit counter | Ban `visitor counter`, `hit counter`, external analytics pixels |
| Title tag | `Form 3` not `S2`; `lang="zh-HK"` |
| Size budget | **< 50 KB** per `index.html` (hard fail if > 100 KB) |
| Links | 0 broken relative paths to `common/` |

### 6.4 Experiment specs (minimum per app)

| App | Experiment (must build) |
|-----|-------------------------|
| 01 | Lifestyle wheel: toggle habits → WHO health score on 3 axes |
| 02 | Food plate builder: drag food types → classify primary/protective |
| 03 | Digestion animation: mouth → stomach → intestine with enzyme labels |
| 04 | HK food pyramid: portion sliders → balanced / deficient feedback |
| 05 | Pathogen transmission sim: route choice → infection probability |
| 06 | Biotech decision tree: GM vs fermentation vs medicine branches |
| 07 | Atom builder: protons/neutrons/electrons → element identity |
| 08 | Periodic table explorer: click group → predict properties |
| 09 | Electrolysis sim: water → H₂/O₂ volume ratio 2:1 |
| 10 | Metal timeline + property card sort (Stone→Iron Age) |
| 11 | Alloy mixer: metal + element → strength/hardness chart |
| 12 | Ray box: luminous/non-luminous object toggle in dark room |
| 13 | Mirror canvas: drag ray → measure i = r |
| 14 | Glass block refraction: Snell-style angle display |
| 15 | TIR tank: angle slider → critical angle / fibre optic demo |
| 16 | Lens ray diagram: object distance → image type (real/virtual) |
| 17 | EM spectrum strip: select band → wavelength + application |
| 18 | IR/UV detector sim: sensor placement → self-driving car scenario |

---

## 7. Agent assignments (Agents 2–5)

| Agent | Scope | Deliverable |
|-------|-------|-------------|
| **Agent 2 — Kill** | Delete all 31 folders; fix `generate-f3-lger.py` option-cap bug; update `f3-lger-configs.json` folder names `01–18` | Clean `Form 3/` with only `index.html`, this plan, empty placeholders |
| **Agent 3 — Book 12** | Apps `01–06` | 6 full LGER apps |
| **Agent 4 — Book 13** | Apps `07–11` | 5 full LGER apps |
| **Agent 5 — Book 14 + Hub** | Apps `12–18` + rewrite `Form 3/index.html` hub | 7 apps + hub card grid |

**Wave 2 (post-PPT, optional):** `Bridge/` subfolder — 6 HKDSE integrative apps from salvaged bridge concepts (`Climate`, `Genetics review`, etc.). **Not blocking.**

---

## 8. Hub rebuild spec (Agent 5)

Replace current dual-section hub with single grid:

```
Form 3 · scicent Books 12–14
├── Book 12 Health (01–06) — emerald accent
├── Book 13 Matter (07–11) — violet accent
└── Book 14 Light (12–18) — amber accent
```

Each card: chapter number, bilingual title, 1-line LO, LGER badge, link to `NN_Folder/index.html`.

---

## 9. Generator fixes required (Agent 2)

Before any regen from `generate-f3-lger.py`:

1. **Cap MCQ options at 4** — never dump full slide vocabulary into `opts[]`.
2. **Reject output > 100 KB** — fail CI if exceeded.
3. **Remove generic distractor template** — generate 2 plausible wrong answers from same chapter.
4. **Deduplicate Learn steps 4–6** — currently 3 identical "Experiment unlocks after Learn" clones.
5. **Pull zh-Hant from `_c.ppt` extract** — not English copy-paste in `bodyZh`.
6. **Rename folders in `f3-lger-configs.json`** to `01–18` mapping above.

---

## 10. Acceptance checklist (CEO gate)

- [ ] Exactly **18** apps, folders `01_` … `18_`, zero legacy folders
- [ ] Each app maps 1:1 to PPT chapter in §5 table
- [ ] All apps pass `LGER_QUALITY_CHECKLIST.md`
- [ ] No file > 100 KB; no visit counters
- [ ] NCS fleet kit on every app; `@HKSTEAMAI` footer visible
- [ ] Hub lists 18 apps only; no duplicate numbering
- [ ] `JUNIOR_SCIENCE_PPT_TO_APP_MAP.md` updated to new folder names

---

## 11. Reference files

| File | Purpose |
|------|---------|
| `HK Cirriculum/LGER_FRAMEWORK.md` | L/G/E/R definitions |
| `HK Cirriculum/LGER_QUALITY_CHECKLIST.md` | QA gate |
| `HK Cirriculum/common/junior-science-lger.js` | Shared shell (`JSLGER.Shell`, `Footer`, bilingual helpers) |
| `HK Cirriculum/ppt-extract-com.json` | Slide text extraction |
| `HK Cirriculum/JUNIOR_SCIENCE_PPT_INVENTORY.md` | Full PPT file list |
| `Reference/.../Integrated_Science/topics/07_healthy_body.md` | EDB unit 11 focus |
| `Reference/.../Integrated_Science/topics/08_light_sound.md` | EDB unit 12 focus |

---

**Decision:** Kill everything. Rebuild 18 PPT-faithful LGER apps as Form 3. No compromises on experiment depth or bilingual quality.
