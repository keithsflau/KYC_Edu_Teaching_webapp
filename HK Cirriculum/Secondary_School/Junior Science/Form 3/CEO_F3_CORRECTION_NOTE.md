# CEO Form 3 Correction Note — S3_PLAN vs CEO_F3_REBUILD_PLAN

**Date:** 2026-07-29  
**Agent:** Correction pass (post Batch A conflict)  
**Authority:** `CEO_F3_REBUILD_PLAN.md` **wins** over `S3_PLAN.md`

---

## Conflict summary

| Document | Intent | Status |
|----------|--------|--------|
| `S3_PLAN.md` | HKDSE **bridge** lane — 30 integrative apps (Climate, Genetics, Force/Motion, Acids review, etc.) | **OBSOLETE** for Form 3 canonical apps |
| `CEO_F3_REBUILD_PLAN.md` | **Textbook-faithful** LGER — 18 apps 1:1 with scicent Books 12–14 PPTs | **AUTHORITATIVE** |

**What went wrong (Batch A):** A sibling agent followed `S3_PLAN.md` and kept/rebuilt wrong-lane folders `01–10` (e.g. `01_Climate_Action`, `05_Force_Motion_Bridge`, `07_Acid_Base_Review`) while the hub also listed duplicate PPT stubs at `11–28`. This created a **numbering civil war** — 31 folders, three competing schemes, broken links.

**CEO verdict (Agent 1 audit):** Kill **all 31** existing folders. Rebuild **only 18** apps numbered `01–18` aligned to Books 12–14 teaching PowerPoints.

---

## Actions taken (this correction)

### 1. Deleted (31 folders — full kill list)

**Wrong-lane bridge (S3_PLAN):**
- `01_Climate_Action`, `02_Genetics_Intro`, `03_Ecosystem_Balance`, `04_Scientific_Method`, `05_Force_Motion_Bridge`, `06_Circuit_Design`
- `07_Acid_Base_Review`, `08_Data_Graphs`, `09_Human_Body_Systems`, `10_Space_Earth`

**Corrupt generator output (7 MB blobs):**
- `03_Acid_Rain_Advanced`, `04_Circuit_Design`, `05_Ecosystem_Balance`, `06_Human_Impact`, `07_Data_Analysis`, `08_Force_Advanced`, `09_Chemistry_Bridge`, `10_Energy_Systems`

**Old PPT stub numbering (`11–28`):**
- All retired; renumbered to `01–18` per CEO plan.

### 2. Rebuilt Book 12 (apps 01–06) — REAL LGER

| # | Folder | PPT source | Status |
|---|--------|------------|--------|
| 01 | `01_Healthy_Lifestyle` | `scicent_ppt_12_1_e.ppt` | ✅ Full LGER (~11 KB) |
| 02 | `02_Food_Substances` | `scicent_ppt_12_2_r_e.ppt` | ✅ Full LGER |
| 03 | `03_Digestion` | `scicent_ppt_12_3_e.ppt` | ✅ Full LGER |
| 04 | `04_Balanced_Diet` | `scicent_ppt_12_4_r_e.ppt` | ✅ Full LGER |
| 05 | `05_Disease_Prevention` | `scicent_ppt_12_5_r_e.ppt` | ✅ Full LGER |
| 06 | `06_Biotechnology` | `scicent_ppt_12_6_e.ppt` | ✅ Full LGER |

Improvements vs old stubs:
- 6 Learn steps with **PPT-sourced bilingual bodies** and **plausible chapter distractors** (no `"Science ignores evidence…"` spam)
- Guided (4) + Review (5) from same content
- Experiments upgraded per CEO §6.4 (WHO 3-axis wheel, food plate builder, digestion animation, HK pyramid, pathogen transmission sim, biotech decision tree)
- `Form 3` title tag, NCS fleet kit, `@HKSTEAMAI` footer via `JSLGER.Shell`
- All files **< 100 KB** (hard cap enforced in generator)

### 3. Placeholders 07–18 (Agents 4–5)

Clear folder names reserved per CEO §5:

| # | Folder | Book | Agent |
|---|--------|------|-------|
| 07–11 | Atoms → Alloys | Book 13 | Agent 4 |
| 12–18 | Light → Technology | Book 14 | Agent 5 |

Each placeholder `index.html` links back to hub and cites target PPT file.

### 4. Hub rewritten

`Form 3/index.html` now lists **exactly 18 apps** in book order (emerald / violet / amber accents). No S3 bridge section. Points to `CEO_F3_REBUILD_PLAN.md`.

### 5. Config / generator fixes

- `f3-lger-configs.json` — folders renumbered `01–18`; Book 12 configs carry full `learn` arrays
- `generate-f3-lger.py` — `generate_f3_app()`, Form 3 title, NCS kit, option cap at 4, 100 KB fail
- `rebuild-f3-correction.py` — one-shot correction script (re-runnable for Book 12)

---

## Wave 2 (not blocking)

Salvaged bridge concepts from `S3_PLAN.md` (Climate, Genetics review, Force/Motion, etc.) may return later under `Form 3/Bridge/` — **not** as canonical Form 3 textbook apps.

---

## For coordinating agents

- **Do not** recreate `01_Climate_Action` … `10_Space_Earth` at Form 3 root
- **Do not** use `11–28` numbering
- **Do** build `07–11` and `12–18` into existing placeholder folders
- **Do** follow `CEO_F3_REBUILD_PLAN.md` + `LGER_QUALITY_CHECKLIST.md`

---

**Resolution:** `S3_PLAN.md` is historical bridge roadmap only. Form 3 canonical curriculum = **18 PPT-aligned LGER apps (`01–18`)**.
