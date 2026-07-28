# Junior Science PPT Gap Analysis

**Audit date:** 2026-07-28 (revised)  
**Scope:** `Reference/Secondary/HKDSE/Integrated_Science/materials` vs `HK Cirriculum/Secondary_School/Junior Science` apps (F1–F3)

## Executive summary (corrected)

**Previous claim was wrong.** The `Resources_1A_r` … `Resources_3C_r` folders are **not empty**. They contain **196** commercial scicent teaching `.ppt` decks under:

`01-Teaching Resources 教學資源/01-Teaching PowerPoint 教學簡報/`

| Category | Status | Notes |
|----------|--------|-------|
| **scicent PPT banks** (`Resources_1A_r` … `Resources_3C_r`) | **✅ Present (196 files)** | See `JUNIOR_SCIENCE_PPT_INVENTORY.md` |
| **PPT text extraction** | **✅ 98 EN chapter decks** | `ppt-extract-com.json` via PowerPoint COM |
| **LGER apps aligned to PPT** | **✅ F1: 35, F2: 26** | `apply-ppt-to-configs.py` + map in `JUNIOR_SCIENCE_PPT_TO_APP_MAP.md` |
| **EDB official PDFs** | Catalogued | Supplementary; not per-lesson slides |
| **Form 3 apps** | **⚠️ Partial** | Books 12–14 PPTs extracted; only 2 F3 LGER apps exist |

**Bottom line:** Junior Science LGER apps should follow the scicent teaching PowerPoints. Form 1 and Form 2 have been rebuilt with slide-sourced Learn/Guided/Review content. Form 3 mapping is next.

---

## What changed (2026-07-28)

1. Inventoried all 196 `.ppt` files — folders are **not** placeholder shells.
2. Extracted English chapter slide text for 98 unique book/chapter decks.
3. Mapped PPT chapters → 61 existing F1/F2 app folders (`ppt-app-map.json`).
4. Regenerated apps with PPT-derived `keyPoints` and quizzes (no more generic stubs).

---

## Materials folder inventory (corrected)

```
materials/
├── Resources_1A_r/   42 PPTs  (Books 1–3, Form 1A)
├── Resources_1B_r/   36 PPTs  (Books 4–6, Form 1B)
├── Resources_2A_r/   34 PPTs  (Books 7–9, Form 2A)
├── Resources_2B_r/   42 PPTs  (Books 10–11, Form 2B)
├── Resources_3A_r/   14 PPTs  (Book 12, Form 3A)
├── Resources_3B_r/   12 PPTs  (Book 13, Form 3B)
├── Resources_3C_r/   16 PPTs  (Book 14, Form 3C)
├── classroom/        STEAM pack (PDFs)
└── official/         EDB PDFs per DOWNLOAD_MANIFEST.md
```

---

## Remaining gaps

| Gap | Priority |
|-----|----------|
| Form 3 LGER apps for Books 12–14 | High |
| Chinese slide text in Learn panels (currently EN from `_e.ppt` decks) | Medium |
| Hand-crafted trio (`04_Air_Composition`, `22_Reaction_Time`, `30_Space_Mission`) — verify PPT alignment | Low |
| `BioCycle` Vite wrapper | Medium |
| Richer Experiment tabs from PPT diagrams/activities | Medium |

---

## Policy note

PPT files are present in the workspace for curriculum alignment. Distribution/redistribution outside licensed school use may be restricted by publisher terms — apps reference concepts, not republish slide assets.

---

## See also

- `JUNIOR_SCIENCE_PPT_INVENTORY.md` — full file list + chapter titles
- `JUNIOR_SCIENCE_PPT_TO_APP_MAP.md` — PPT chapter → app mapping
- `CEO_JUNIOR_SCIENCE_REBUILD_STATUS.md` — rebuild metrics
