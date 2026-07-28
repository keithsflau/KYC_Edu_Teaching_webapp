# Subjects link inventory

Generated: 2026-07-29

## Sources

| Source | Role |
|--------|------|
| `HK Cirriculum/subjects\index.html` | **Current** on-disk page (level hub) |
| `HK Cirriculum/_tools\rebuild-subjects-directory.js` | Regenerates current hub only |
| Legacy tabbed `subjects/index.html` | Sayo-style Secondary/Primary tabs + featured strip (captured from last full build; see `CEO_IA_REVERT.md`) |
| Primary_School/index.html | Primary subject grid (school hub) |
| Secondary_School/index.html | Secondary subject grid + featured strip |

Path convention: **`href` in `subjects/index.html`** uses `../Primary_School/...` or `../Secondary_School/...`. Resolved target = path under `HK Cirriculum/` (drop leading `../`).

---

## Current `subjects/index.html` (hub only)

The live file is **not** a per-subject catalog. It shows two level cards plus back-to-home. Legacy query params redirect client-side.

### Hub / navigation links

| `href` (from `subjects/index.html`) | Resolves to | Notes |
|-------------------------------------|-------------|-------|
| `../index.html` | `HK Cirriculum/index.html` | Back to home |
| `../Primary_School/index.html` | `Primary_School/index.html` | Primary level card |
| `../Secondary_School/index.html` | `Secondary_School/index.html` | Secondary level card |

### Query-param redirects (script, not `href`)

| Query | `location.replace` target | Resolves to |
|-------|---------------------------|-------------|
| `?section=primary` or `?tab=primary` | `../Primary_School/index.html` | `Primary_School/index.html` |
| `?section=secondary` or `?tab=secondary` | `../Secondary_School/index.html` | `Secondary_School/index.html` |

### External (non-curriculum)

- `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- `https://cdn.tailwindcss.com` (script src)

---

## Legacy tabbed Subject Directory (`subjects/index.html`)

Use this section for **redistribute / IA agents** that expect the old Sayo-style page: Secondary tab (default) with featured science strip + “All Secondary Subjects” grid, and Primary tab with four subjects.

### Featured strip (Secondary tab only)

| `href` | Resolves to | Subject |
|--------|-------------|---------|
| `../Secondary_School/Physics/index.html` | `Secondary_School/Physics/index.html` | Physics |
| `../Secondary_School/Chemistry/index.html` | `Secondary_School/Chemistry/index.html` | Chemistry |
| `../Secondary_School/Biology/index.html` | `Secondary_School/Biology/index.html` | Biology |

### Primary subjects (Primary tab — “Enter Subject” cards)

| `href` | Resolves to | Folder on disk |
|--------|-------------|----------------|
| `../Primary_School/General_Studies/index.html` | `Primary_School/General_Studies/index.html` | `General_Studies` |
| `../Primary_School/PrimaryChinese/index.html` | `Primary_School/PrimaryChinese/index.html` | `PrimaryChinese` |
| `../Primary_School/Mathematics/index.html` | `Primary_School/Mathematics/index.html` | `Mathematics` |
| `../Primary_School/English/index.html` | `Primary_School/English/index.html` | `English` |

### Secondary subjects (Secondary tab — “All Secondary Subjects” grid)

| `href` | Resolves to | Folder on disk | In featured strip |
|--------|-------------|----------------|---------------------|
| `../Secondary_School/Chemistry/index.html` | `Secondary_School/Chemistry/index.html` | `Chemistry` | yes |
| `../Secondary_School/Physics/index.html` | `Secondary_School/Physics/index.html` | `Physics` | yes |
| `../Secondary_School/Chinese/index.html` | `Secondary_School/Chinese/index.html` | `Chinese` | no |
| `../Secondary_School/Mathematics/index.html` | `Secondary_School/Mathematics/index.html` | `Mathematics` | no |
| `../Secondary_School/Geography/index.html` | `Secondary_School/Geography/index.html` | `Geography` | no |
| `../Secondary_School/Biology/index.html` | `Secondary_School/Biology/index.html` | `Biology` | yes |
| `../Secondary_School/ICT/index.html` | `Secondary_School/ICT/index.html` | `ICT` | no |
| `../Secondary_School/Junior Science/index.html` | `Secondary_School/Junior Science/index.html` | `Junior Science` | no |
| `../Secondary_School/History/index.html` | `Secondary_School/History/index.html` | `History` | no |
| `../Secondary_School/Chinese_History/index.html` | `Secondary_School/Chinese_History/index.html` | `Chinese_History` | no |
| `../Secondary_School/Economy/index.html` | `Secondary_School/Economy/index.html` | `Economy` | no |

### Legacy primary + secondary href lists (copy-paste)

**Primary**
- `../Primary_School/General_Studies/index.html` → `Primary_School/General_Studies/index.html`
- `../Primary_School/PrimaryChinese/index.html` → `Primary_School/PrimaryChinese/index.html`
- `../Primary_School/Mathematics/index.html` → `Primary_School/Mathematics/index.html`
- `../Primary_School/English/index.html` → `Primary_School/English/index.html`

**Secondary**
- `../Secondary_School/Chemistry/index.html` → `Secondary_School/Chemistry/index.html`
- `../Secondary_School/Physics/index.html` → `Secondary_School/Physics/index.html`
- `../Secondary_School/Chinese/index.html` → `Secondary_School/Chinese/index.html`
- `../Secondary_School/Mathematics/index.html` → `Secondary_School/Mathematics/index.html`
- `../Secondary_School/Geography/index.html` → `Secondary_School/Geography/index.html`
- `../Secondary_School/Biology/index.html` → `Secondary_School/Biology/index.html`
- `../Secondary_School/ICT/index.html` → `Secondary_School/ICT/index.html`
- `../Secondary_School/Junior Science/index.html` → `Secondary_School/Junior Science/index.html`
- `../Secondary_School/History/index.html` → `Secondary_School/History/index.html`
- `../Secondary_School/Chinese_History/index.html` → `Secondary_School/Chinese_History/index.html`
- `../Secondary_School/Economy/index.html` → `Secondary_School/Economy/index.html`

**Featured strip**
- `../Secondary_School/Physics/index.html` → `Secondary_School/Physics/index.html`
- `../Secondary_School/Chemistry/index.html` → `Secondary_School/Chemistry/index.html`
- `../Secondary_School/Biology/index.html` → `Secondary_School/Biology/index.html`

---

## School hub pages (same targets, different `href` base)

From `Primary_School/index.html` and `Secondary_School/index.html`, subject links are **relative to that school folder** (no `../Secondary_School/` prefix). They land on the same subject `index.html` as the legacy subjects directory.

### `Primary_School/index.html` → `Primary_School/...`

- `../index.html` → `HK Cirriculum/index.html` (hub)
- `English/index.html` → `Primary_School/English/index.html`
- `General_Studies/index.html` → `Primary_School/General_Studies/index.html`
- `Mathematics/index.html` → `Primary_School/Mathematics/index.html`
- `PrimaryChinese/index.html` → `Primary_School/PrimaryChinese/index.html`

### `Secondary_School/index.html` → `Secondary_School/...`

- `../index.html` → `HK Cirriculum/index.html` (hub)
- `Biology/index.html` → `Secondary_School/Biology/index.html`
- `Chemistry/index.html` → `Secondary_School/Chemistry/index.html`
- `Chinese/index.html` → `Secondary_School/Chinese/index.html`
- `Chinese_History/index.html` → `Secondary_School/Chinese_History/index.html`
- `Economy/index.html` → `Secondary_School/Economy/index.html`
- `Geography/index.html` → `Secondary_School/Geography/index.html`
- `History/index.html` → `Secondary_School/History/index.html`
- `ICT/index.html` → `Secondary_School/ICT/index.html`
- `Junior Science/index.html` → `Secondary_School/Junior Science/index.html`
- `Mathematics/index.html` → `Secondary_School/Mathematics/index.html`
- `Music/index.html` → `Secondary_School/Music/index.html`
- `Physics/index.html` → `Secondary_School/Physics/index.html`

### Featured strip on Secondary school hub

- `Physics/index.html` → `Secondary_School/Physics/index.html`
- `Chemistry/index.html` → `Secondary_School/Chemistry/index.html`
- `Biology/index.html` → `Secondary_School/Biology/index.html`

---

## Disk vs legacy subjects index

### Primary folders on disk
- `English`
- `General_Studies`
- `Mathematics`
- `PrimaryChinese`

### Secondary folders on disk
- `Biology`
- `Chemistry`
- `Chinese`
- `Chinese_History`
- `Economy`
- `Geography`
- `History`
- `ICT`
- `Junior Science`
- `Mathematics`
- `Music`
- `Physics`

### Gaps

- On disk but **not** in legacy `subjects/index.html` secondary grid: `Music`
- In `Secondary_School/index.html` but **not** legacy subjects grid: `..`, `Music`

---

## Redistribute agent map (canonical subject entry URLs)

Absolute path pattern: `HK Cirriculum/Secondary_School/<Subject>/index.html` or `HK Cirriculum/Primary_School/<Subject>/index.html`.

| Agent slice | Legacy `subjects/index.html` `href` | Canonical target |
|-------------|--------------------------------------|-------------------|
| Primary — General Studies | `../Primary_School/General_Studies/index.html` | `Primary_School/General_Studies/index.html` |
| Primary — Chinese | `../Primary_School/PrimaryChinese/index.html` | `Primary_School/PrimaryChinese/index.html` |
| Primary — Mathematics | `../Primary_School/Mathematics/index.html` | `Primary_School/Mathematics/index.html` |
| Primary — English | `../Primary_School/English/index.html` | `Primary_School/English/index.html` |
| Secondary — Chemistry | `../Secondary_School/Chemistry/index.html` | `Secondary_School/Chemistry/index.html` |
| Secondary — Physics | `../Secondary_School/Physics/index.html` | `Secondary_School/Physics/index.html` |
| Secondary — Chinese | `../Secondary_School/Chinese/index.html` | `Secondary_School/Chinese/index.html` |
| Secondary — Mathematics | `../Secondary_School/Mathematics/index.html` | `Secondary_School/Mathematics/index.html` |
| Secondary — Geography | `../Secondary_School/Geography/index.html` | `Secondary_School/Geography/index.html` |
| Secondary — Biology | `../Secondary_School/Biology/index.html` | `Secondary_School/Biology/index.html` |
| Secondary — ICT | `../Secondary_School/ICT/index.html` | `Secondary_School/ICT/index.html` |
| Secondary — Junior Science | `../Secondary_School/Junior Science/index.html` | `Secondary_School/Junior Science/index.html` |
| Secondary — History | `../Secondary_School/History/index.html` | `Secondary_School/History/index.html` |
| Secondary — Chinese_History | `../Secondary_School/Chinese_History/index.html` | `Secondary_School/Chinese_History/index.html` |
| Secondary — Economy | `../Secondary_School/Economy/index.html` | `Secondary_School/Economy/index.html` |

Featured strip agents reuse the Physics / Chemistry / Biology rows above.

---

## Generator note

`node _tools/rebuild-subjects-directory.js` **overwrites** `subjects/index.html` with the hub-only template (Primary/Secondary cards). It does **not** emit per-subject links. To restore the tabbed Subject Directory, revert `rebuild-subjects-directory.js` to the Sayo scanner template and regenerate (see `CEO_IA_REVERT.md`).
