# QA: Subjects redistributed to Primary / Secondary hubs

**Date:** 2026-07-29  
**Scope:** Every subject entry that previously lived on `subjects/index.html` must remain reachable via `Primary_School/index.html` or `Secondary_School/index.html` (not via a flat subject catalog).

## Summary

| Metric | Value |
|--------|------:|
| **Unique former subject targets** | **16** |
| **Featured science links (legacy strip)** | **3** (Physics, Chemistry, Biology) |
| **Missing from hubs** | **0** |
| **Hub -> subject 404s** | **0** |
| **Fixes applied this QA** | **0** (all targets already wired) |

## Method

1. **Canonical target set:** each top-level folder under `Primary_School/` and `Secondary_School/` that has an `index.html` (disk-honest catalog). This matches the 18 internal links historically generated for `subjects/index.html` (15 subject cards + 3 featured science cards with overlap on Physics/Chemistry/Biology); the tree now has **16** unique subject hubs (4 primary + 12 secondary).
2. **Hub audit:** parse `href` values on `Primary_School/index.html` and `Secondary_School/index.html`, resolve relative paths, assert `index.html` exists on disk.
3. **Legacy URL:** `subjects/index.html` is a two-card gate plus JS redirect for `?tab=` / `?section=primary|secondary` -> school hubs (`_tools/rebuild-subjects-directory.js`).
4. **Regression script:** `HK Cirriculum/_tools/qa-subjects-redistributed.py`

## Subject reachability matrix

| Status | Subject (EN) | 科目 | Disk path | Reachable from |
|--------|--------------|------|-----------|----------------|
| PASS | English | 英語 | Primary_School/English/index.html | Primary_School/index.html -> English/index.html |
| PASS | General Studies | 常識 | `Primary_School/General_Studies/index.html` | `Primary_School/index.html` -> `General_Studies/index.html` |
| PASS | Mathematics | 數學 | `Primary_School/Mathematics/index.html` | `Primary_School/index.html` -> `Mathematics/index.html` |
| PASS | Primary Chinese | 小學中文 | `Primary_School/PrimaryChinese/index.html` | `Primary_School/index.html` -> `PrimaryChinese/index.html` |
| PASS | Biology | 生物 | `Secondary_School/Biology/index.html` | `Secondary_School/index.html` -> `Biology/index.html` |
| PASS | Chemistry | 化學 | `Secondary_School/Chemistry/index.html` | `Secondary_School/index.html` -> `Chemistry/index.html` |
| PASS | Chinese | 中國語文 | `Secondary_School/Chinese/index.html` | `Secondary_School/index.html` -> `Chinese/index.html` |
| PASS | Chinese History | 中國歷史 | `Secondary_School/Chinese_History/index.html` | `Secondary_School/index.html` -> `Chinese_History/index.html` |
| PASS | Economy | 經濟 | `Secondary_School/Economy/index.html` | `Secondary_School/index.html` -> `Economy/index.html` |
| PASS | Geography | 地理 | `Secondary_School/Geography/index.html` | `Secondary_School/index.html` -> `Geography/index.html` |
| PASS | History | 歷史 | `Secondary_School/History/index.html` | `Secondary_School/index.html` -> `History/index.html` |
| PASS | ICT | 資訊科技 | `Secondary_School/ICT/index.html` | `Secondary_School/index.html` -> `ICT/index.html` |
| PASS | Junior Science | 初中科學 | `Secondary_School/Junior Science/index.html` | `Secondary_School/index.html` -> `Junior Science/index.html` |
| PASS | Mathematics | 數學 | `Secondary_School/Mathematics/index.html` | `Secondary_School/index.html` -> `Mathematics/index.html` |
| PASS | Music | 音樂 | `Secondary_School/Music/index.html` | `Secondary_School/index.html` -> `Music/index.html` |
| PASS | Physics | 物理 | `Secondary_School/Physics/index.html` | `Secondary_School/index.html` -> `Physics/index.html` |

## Featured science (former `subjects/index.html` strip)

| Target | Via secondary hub |
|--------|-------------------|
| Physics | PASS |
| Chemistry | PASS |
| Biology | PASS |

All three are linked on `Secondary_School/index.html` and resolve to existing `index.html` files.

## Legacy `subjects/index.html`

| Link from subjects hub | Resolves |
|------------------------|----------|
| `../Primary_School/index.html` | PASS |
| `../Secondary_School/index.html` | PASS |
| `../index.html` | PASS |

## Navigation surfaces (spot check)

| Surface | Points to school hubs (not flat subjects) |
|---------|-------------------------------------------|
| `HK Cirriculum/index.html` | `Primary_School/index.html`, `Secondary_School/index.html` |
| `parent-dashboard/index.html` | Primary / Secondary hubs |
| `marketing/site/landing/index.html` | Primary / Secondary hubs |
| `subjects/index.html` | Primary / Secondary only (bookmarks + query redirects) |

## Smoke test

```powershell
cd "c:\Users\keith\OneDrive\Github\Profile"
python "HK Cirriculum\_tools\qa-subjects-redistributed.py"
npx serve "HK Cirriculum" -l 5173
# http://localhost:5173/Primary_School/index.html
# http://localhost:5173/Secondary_School/index.html
# http://localhost:5173/subjects/index.html?section=secondary  -> redirects to Secondary hub
```

## Notes

- Prior audit `QA_SUBJECTS_DIR_LINKS.md` tracked **18** hrefs on the old flat directory (path prefix bug). After IA Model B, subject depth moved into the two school hubs; this QA validates **hub coverage**, not the retired tab UI.
- `CEO_SUBJECT_DIRECTORY.md` still mentions routing school hubs -> `subjects/index.html`; product direction is the inverse (home -> hubs; `subjects/` is legacy). Doc drift only — no broken links found.
