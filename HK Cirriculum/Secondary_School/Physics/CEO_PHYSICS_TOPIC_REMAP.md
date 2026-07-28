# CEO Physics Topic Remap | 物理科課題重組

**Authority:** CEO mandate 2026-07-29 — topic-first IA; **唔再分中幾** as primary navigation.  
**Scope (Phase 1):** 10 root-level orphan apps under `Physics/` (not in Form folders).  
**Reference:** `Reference/Secondary/HKDSE/Physics/topic_map.json`, `syllabus_outline.md`.

---

## 1. Current state (audit)

### Root orphans (must move)

| # | Folder on disk | Listed on `Physics/index.html` |
|---|----------------|--------------------------------|
| 1 | `3D_Solar_System/` | Open Simulations |
| 2 | `Light Ray Diagram with Convex Len and Concave Len/` | Open Simulations |
| 3 | `Atomic Emission Spectra/` | Open Simulations |
| 4 | `Bernoulli-Simulation/` | Open Simulations |
| 5 | `Dopper's Effect/` | Open Simulations (href uses `&#39;` escape) |
| 6 | `Fraunhofer Lines/` | Open Simulations |
| 7 | `Light Dispersion through a Prism/` | Open Simulations |
| 8 | `Parity Non-Conservation/` | Open Simulations |
| 9 | `Photoelectric Effect/` | Open Simulations |
| 10 | `Quantum Mechanics/` | Open Simulations |

### Form hubs (stay for Phase 1; migrate in Phase 2)

| Hub | Labs on disk |
|-----|----------------|
| `Form 4/` | `01_Force_Motion`, `02_Heat_Transfer`, `04_Gas_Laws_Lab`, `05_SHC_Mixer`, `06_Motion_Graph_Studio` |
| `Form 5/` | `01_EMF_Internal_R`, `02_Wave_Interference`, `03_Lenses_Optics`, `06_Circuit_Builder`, `07_Momentum_Collisions`, `08_Induction_Explorer` |
| `Form 6/` | `01_Half_Life_Lab`, `02_Projectile_Motion`, `09_Work_Energy_Power` |

**Problem:** Two navigation systems (Form hubs + flat root orphans). Teachers searching by DSE topic cannot find root apps; Form hubs duplicate optics/waves content (`03_Lenses_Optics` vs lens ray orphan).

---

## 2. Target scheme (decisive)

Create **`Physics/Topics/`** as the **primary** app tree. Use **HKDSE C&A strand folders** with numeric prefix for syllabus order (matches `Reference/Secondary/HKDSE/Physics/topics/`).

```
Physics/
  index.html                 ← rewire: Topics first, Form second
  Topics/
    index.html               ← NEW primary topic hub
    01_Heat_and_Gases/
    02_Force_and_Motion/
    03_Wave_Motion/
    04_Electricity_and_Magnetism/
    05_Radioactivity_and_Nuclear_Energy/
    06_Astronomy_and_Space_Science/    ← elective VI
    07_Atomic_World/                     ← elective VII
    08_Energy_and_Use_of_Energy/         ← elective VIII (empty Phase 1)
    09_Medical_Physics/                  ← elective IX (empty Phase 1)
  Form 4/ … Form 6/          ← Phase 1: keep; Phase 2: redirect-only stubs
```

**Naming rules for app folders**

- ASCII + underscores only (no spaces, no apostrophes, no hyphens).
- Fix known typos on move (see §4).
- Each topic folder gets a minimal `index.html` hub listing its apps.

**Do not** nest `Form 4/` inside topics. Form becomes a **filter view**, not a storage location.

---

## 3. Phase 1 — orphan app path map (execute now)

Base: `HK Cirriculum/Secondary_School/Physics/`

| # | Old path | New path | HKDSE strand / map id | Rationale |
|---|----------|----------|----------------------|-----------|
| 1 | `3D_Solar_System/` | `Topics/06_Astronomy_and_Space_Science/3D_Solar_System/` | Elective VI · `elec-01` | Orbital / scale-of-universe visualisation |
| 2 | `Light Ray Diagram with Convex Len and Concave Len/` | `Topics/03_Wave_Motion/Lens_Ray_Diagrams/` | Comp III.b Light · `wave-02` | Thin-lens ray tracing (rename fixes “Len”) |
| 3 | `Atomic Emission Spectra/` | `Topics/07_Atomic_World/Atomic_Emission_Spectra/` | Elective VII · `elec-02` | Line spectra / energy levels |
| 4 | `Bernoulli-Simulation/` | `Topics/02_Force_and_Motion/Bernoulli_Simulation/` | Comp II · extension | Fluid pressure–speed link; enrichment (not examined core) |
| 5 | `Dopper's Effect/` | `Topics/03_Wave_Motion/Doppler_Effect/` | Comp III.a · `wave-01` | Relative motion & frequency shift |
| 6 | `Fraunhofer Lines/` | `Topics/07_Atomic_World/Fraunhofer_Lines/` | Elective VII · `elec-02` | Solar absorption lines / atomic spectra |
| 7 | `Light Dispersion through a Prism/` | `Topics/03_Wave_Motion/Prism_Dispersion/` | Comp III.b Light · `wave-02` | Refraction & visible spectrum |
| 8 | `Parity Non-Conservation/` | `Topics/05_Radioactivity_and_Nuclear_Energy/Parity_Non_Conservation/` | Comp V · extension | Wu β-decay; beyond core LOs — tag “extension” |
| 9 | `Photoelectric Effect/` | `Topics/07_Atomic_World/Photoelectric_Effect/` | Elective VII · `elec-02` | Core elective LO |
| 10 | `Quantum Mechanics/` | `Topics/07_Atomic_World/Quantum_Mechanics/` | Elective VII · `elec-02` | Wave–particle / atomic models overview |

### Copy-paste move list (old → new)

```
3D_Solar_System/
  → Topics/06_Astronomy_and_Space_Science/3D_Solar_System/

Light Ray Diagram with Convex Len and Concave Len/
  → Topics/03_Wave_Motion/Lens_Ray_Diagrams/

Atomic Emission Spectra/
  → Topics/07_Atomic_World/Atomic_Emission_Spectra/

Bernoulli-Simulation/
  → Topics/02_Force_and_Motion/Bernoulli_Simulation/

Dopper's Effect/
  → Topics/03_Wave_Motion/Doppler_Effect/

Fraunhofer Lines/
  → Topics/07_Atomic_World/Fraunhofer_Lines/

Light Dispersion through a Prism/
  → Topics/03_Wave_Motion/Prism_Dispersion/

Parity Non-Conservation/
  → Topics/05_Radioactivity_and_Nuclear_Energy/Parity_Non_Conservation/

Photoelectric Effect/
  → Topics/07_Atomic_World/Photoelectric_Effect/

Quantum Mechanics/
  → Topics/07_Atomic_World/Quantum_Mechanics/
```

---

## 4. Renames (mandatory on move)

| Old folder | New folder | Notes |
|------------|------------|-------|
| `Dopper's Effect` | `Doppler_Effect` | **Fix typo** (Dopper → Doppler); removes apostrophe URL bug |
| `Bernoulli-Simulation` | `Bernoulli_Simulation` | Hyphen → underscore |
| `Light Ray Diagram with Convex Len and Concave Len` | `Lens_Ray_Diagrams` | Shorter + fixes “Len” → lens |
| `Light Dispersion through a Prism` | `Prism_Dispersion` | Shorter ASCII |
| `Atomic Emission Spectra` | `Atomic_Emission_Spectra` | Spaces → underscores |
| `Fraunhofer Lines` | `Fraunhofer_Lines` | Spaces → underscores |
| `Parity Non-Conservation` | `Parity_Non_Conservation` | Spaces → underscores |
| `Photoelectric Effect` | `Photoelectric_Effect` | Spaces → underscores |
| `Quantum Mechanics` | `Quantum_Mechanics` | Spaces → underscores |
| `3D_Solar_System` | *(unchanged)* | Already valid |

---

## 5. Hub IA — Topics primary, Form secondary

### `Physics/index.html` (subject hub)

1. **Hero CTA:** “Browse by HKDSE topic” → `Topics/index.html` (large cards, 9 strands).
2. **Section 2:** “Flagship labs” — link to topic paths (not Form paths).
3. **Section 3 (collapsed / smaller):** “Browse by school year (Form 4–6)” → existing `Form 4|5|6/index.html` with disclaimer: *「按學年瀏覽 — 所有 lab 已按 DSE 課題歸類」*.
4. **Remove** “Open Simulations” flat grid — those cards live on topic hubs only.

### `Topics/index.html` (new primary hub)

- Grid of 9 topic cards with bilingual titles from `topic_map.json` strands.
- Badge: **必修** vs **選修** (electives VI–IX).
- Each card links to `Topics/NN_…/index.html`.
- Footer link back to Physics hub + optional Form browse.

### Per-topic `Topics/NN_…/index.html`

- List apps in that topic with one-line LO hook.
- Show optional **typical Form** tag (F4/F5/F6) as metadata only — not as folder structure.

### Form hubs (`Form 4/`, `Form 5/`, `Form 6/`)

**Phase 1:** Replace hard-coded relative links with **outbound links to `../Topics/…/App/`** for any app that has moved. Orphans no longer listed here until Phase 2 alignment.

**Phase 2:** Form hub becomes a **curated filter page** — same cards as today but every `href` points into `Topics/`. Keep `Form N/index.html` for teachers who think in school year; do **not** duplicate app folders under Form.

Example Form 5 card rewrite:

```html
<!-- was -->
<a href="03_Lenses_Optics/index.html">
<!-- Phase 2 becomes -->
<a href="../Topics/03_Wave_Motion/Lens_Ray_Diagrams/index.html">
<!-- and/or merge duplicate lens apps -->
```

---

## 6. Backwards-compatible redirects (recommended)

After move, leave **stub folders** at old paths (30-day minimum) with `index.html`:

```html
<meta http-equiv="refresh" content="0; url=Topics/07_Atomic_World/Photoelectric_Effect/index.html" />
<p>Moved — <a href="…">click here</a>.</p>
```

Priority stubs (external / catalogued paths):

- `3D_Solar_System/` — in `free-demo-catalog.json`, platform play URLs
- `Dopper's Effect/` — historically broken apostrophe links

---

## 7. Link inventory to update after move

| File | What to change |
|------|----------------|
| `Physics/index.html` | Remove Open Simulations grid; add Topics section |
| `hksteamai-platform/data/curriculum-map.json` | All 10 `path` keys |
| `hksteamai-platform/data/free-demo-catalog.json` | `3D_Solar_System` path |
| `hksteamai-platform/FREE_DEMO_CATALOG.md` | Demo path |
| `hksteamai-platform/QA_PLAY_ALL_SUBJECTS.md` | Play URL examples |
| `HK Cirriculum/QA_FLEET_ALL_APPS.json` | `rel` paths (regenerate if scripted) |
| `HK Cirriculum/_tools/ncs-apply-pass1.json` | `rel` paths (regenerate) |
| Any grep hit for old folder names | Run repo-wide search |

Regenerate command suggestion:

```bash
rg -l "Secondary_School/Physics/(3D_Solar_System|Dopper|Bernoulli|Atomic Emission|Fraunhofer|Light Dispersion|Light Ray|Parity|Photoelectric|Quantum Mechanics)" .
```

---

## 8. Phase 2 — Form lab migration (planned, not Phase 1)

Move Form folders into the **same** `Topics/` tree (single canonical copy):

| Current Form path | Target topic path |
|-------------------|-------------------|
| `Form 4/01_Force_Motion/` | `Topics/02_Force_and_Motion/Force_Motion/` |
| `Form 4/02_Heat_Transfer/` | `Topics/01_Heat_and_Gases/Heat_Transfer/` |
| `Form 4/04_Gas_Laws_Lab/` | `Topics/01_Heat_and_Gases/Gas_Laws_Lab/` |
| `Form 4/05_SHC_Mixer/` | `Topics/01_Heat_and_Gases/SHC_Mixer/` |
| `Form 4/06_Motion_Graph_Studio/` | `Topics/02_Force_and_Motion/Motion_Graph_Studio/` |
| `Form 5/01_EMF_Internal_R/` | `Topics/04_Electricity_and_Magnetism/EMF_Internal_R/` |
| `Form 5/02_Wave_Interference/` | `Topics/03_Wave_Motion/Wave_Interference/` |
| `Form 5/03_Lenses_Optics/` | `Topics/03_Wave_Motion/Lenses_Optics/` *(review merge with `Lens_Ray_Diagrams`)* |
| `Form 5/06_Circuit_Builder/` | `Topics/04_Electricity_and_Magnetism/Circuit_Builder/` |
| `Form 5/07_Momentum_Collisions/` | `Topics/02_Force_and_Motion/Momentum_Collisions/` |
| `Form 5/08_Induction_Explorer/` | `Topics/04_Electricity_and_Magnetism/Induction_Explorer/` |
| `Form 6/01_Half_Life_Lab/` | `Topics/05_Radioactivity_and_Nuclear_Energy/Half_Life_Lab/` |
| `Form 6/02_Projectile_Motion/` | `Topics/02_Force_and_Motion/Projectile_Motion/` |
| `Form 6/09_Work_Energy_Power/` | `Topics/02_Force_and_Motion/Work_Energy_Power/` |

After Phase 2: delete empty `Form N/App/` folders; keep `Form N/index.html` as filter-only pages.

**Lens dedup note:** `Form 5/03_Lenses_Optics` and orphan `Lens_Ray_Diagrams` overlap — Phase 2 owner should merge or cross-link, not maintain two hubs.

---

## 9. Topic folder cheat sheet (bilingual labels for hubs)

| Folder | EN | zh-HK | Part |
|--------|----|-------|------|
| `01_Heat_and_Gases` | Heat and Gases | 熱和氣體 | Compulsory I |
| `02_Force_and_Motion` | Force and Motion | 力和運動 | Compulsory II |
| `03_Wave_Motion` | Wave Motion | 波動 | Compulsory III |
| `04_Electricity_and_Magnetism` | Electricity and Magnetism | 電和磁 | Compulsory IV |
| `05_Radioactivity_and_Nuclear_Energy` | Radioactivity and Nuclear Energy | 放射現象和核能 | Compulsory V |
| `06_Astronomy_and_Space_Science` | Astronomy and Space Science | 天文學和太空科學 | Elective VI |
| `07_Atomic_World` | Atomic World | 原子世界 | Elective VII |
| `08_Energy_and_Use_of_Energy` | Energy and Use of Energy | 能量和能源的使用 | Elective VIII |
| `09_Medical_Physics` | Medical Physics | 醫學物理 | Elective IX |

---

## 10. Acceptance checklist (Phase 1)

- [ ] All 10 orphan folders moved under `Topics/NN_…/` with ASCII names
- [ ] `Dopper's Effect` → `Doppler_Effect` (typo fixed)
- [ ] `Topics/index.html` + 6 topic sub-hubs created (topics with apps)
- [ ] `Physics/index.html` promotes Topics over Form
- [ ] Redirect stubs at old root paths (minimum: `3D_Solar_System`, `Dopper's Effect`)
- [ ] `curriculum-map.json` + `free-demo-catalog.json` updated
- [ ] Smoke: open each app from `Topics/index.html`; no broken `../../common/` relative paths (may need +1 `../` depth — fix in moved `index.html` or use path audit script)

---

## 11. Relative path depth note for movers

Apps moved from `Physics/App/` → `Physics/Topics/NN_Topic/App/` gain **two** directory levels. Audit and fix:

- `../../common/ncs-i18n.css` → `../../../../common/ncs-i18n.css`
- `../../_shared/ncs-chrome.json` → `../../../../_shared/ncs-chrome.json`
- Hub back-links to `../index.html` → topic hub, not Physics root

Run existing NCS fleet kit path repair if available.

---

*Lead agent: mapping complete. Sibling agents: execute §3 moves, §4 renames, §5 hub rewire, §7 link updates.*
