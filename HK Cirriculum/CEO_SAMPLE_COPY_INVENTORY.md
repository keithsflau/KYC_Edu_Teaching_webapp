# CEO Sample Copy Inventory

**Source:** `Reference/Sample - 複製`  
**Target fleet:** `HK Cirriculum/`  
**Generated:** Agent 01/10 — for sibling agents enriching Primary/Secondary modules  
**Scope:** 539 `index.html` entry points (excluding `dist/` duplicates), plus 26 Biology Vite builds served from `dist/`

---

## Executive summary

The Sample folder is the **Education Engineering portfolio snapshot**: ~500 Primary-tier CDN React apps (General Studies + Mathematics), 22 Primary Chinese game/lesson apps, 1 English oral tutor, 26 HKDSE Biology Vite simulations, 1 Music Therapy Tier-C app, and a cinematic portfolio hub.

**Relationship to HK Cirriculum:** Primary GS/Math slugs are largely **1:1 copies** already deployed under `HK Cirriculum/Primary_School/`. The enrichment job is **not** re-copying files—it is **stealing interaction cores, visuals, and assessment patterns** from samples and grafting them onto HK modules that are thin, lack LGER scaffolding, or have no game layer (especially **Junior Science F2**, **Secondary Chinese**, **Physics/Chemistry**, **Secondary Math visual gaps**).

**LGER note:** Samples use **free-play Tier A/B** flows. HK Junior Science F2/F3 uses **`JSLGER.Shell`** (Learn → Guided → Experiment → Review) with tab gating. When mapping: **extract the Experiment/simulation body from Sample; wrap with `junior-science-lger.js` + NCS i18n fleet kit** (see `HK Cirriculum/Secondary_School/Junior Science/Form 3/01_Healthy_Lifestyle/index.html`).

---

## 1. Portfolio & misc

| Path | Subject | What makes it good | Enrich HK module(s) |
|------|---------|-------------------|---------------------|
| `Reference/Sample - 複製/index.html` | Portfolio hub | Scroll-driven canvas hero (480vh sticky sequence), Lenis smooth scroll, glass chapter cards, bilingual serif intro—**premium first impression** | `HK Cirriculum/index.html` (if exists), all subject hub pages (`Primary_School/index.html`, `Secondary_School/*/index.html`) |
| `Reference/Sample - 複製/Music Therapy/music-therapy-app/` | Music / SEL (Tier C) | MediaPipe + face-api emotion mirror, Tone.js iso-mood player, rhythm farm—**camera/mic consent UX** done right | `HK Cirriculum/Secondary_School/Music/`, `Primary_School/General_Studies/P2/14_Emotion_Matching`, `P6/29_Mental_Health_Check`, `P6/56_Mental_Wellness` |
| `Reference/Sample - 複製/.cursor/skills/education-engineer/` | Engineering docs | `app-patterns.md` tech tiers, i18n, hub registry rules—**canonical build spec** | All agents; align with `HK Cirriculum/.cursor/skills/education-engineer/` |

---

## 2. Primary General Studies (240 apps, P1–P6)

**Hub:** `Primary_School/General_Studies/index.html` + year indexes  
**Stack:** Tier A — React 18 CDN + Tailwind + Framer Motion + `common/i18n.js` (10 languages)  
**HK mirror:** `HK Cirriculum/Primary_School/General_Studies/` (same slugs)

### Flagship samples (steal these first)

| Path | Topic | What makes it good | Enrich HK module(s) |
|------|-------|-------------------|---------------------|
| `…/P1/09_My_Feelings` | SEL | Image + emotion choice cards, instant emoji feedback, warm Fredoka UI | Same slug (add difficulty tiers); **F2** `29_Psychology_Colors` |
| `…/P1/16_Animal_Sorting` | Classification | Drag-and-drop bins, wrong-drop bounce + hint | Same; **F1** `18_Animal_Cell` (organelle sort variant) |
| `…/P1/21_Community_Map` | HK geography | Hotspot map clicks, locality photos | Same; **F3** civics if added |
| `…/P2/22_Light_And_Shadow` | Light | Shadow length slider tied to sun angle | Same; **F2** `19_Optics_Lab`, **F3** `12–18` light units |
| `…/P3/02_Balanced_Lunchbox` | Nutrition | 3:2:1 compartment drag-fill, section-full toast, Framer snap | Same; **F3** `04_Balanced_Diet` (LGER Experiment tab) |
| `…/P3/08_Transport_Planner` | HK transport | Route planning puzzle, MTR/bus icons | Same |
| `…/P3/12_Water_Cycle` | Earth science | Animated cycle stages, label drops | Same; **F2** `BioCycle` |
| `…/P4/08_Photosynthesis_Lab` | Photosynthesis | Drag sun/water/CO₂; plant grows; O₂ bubbles—**rich sim without LGER** | Same; **F2** `01_Photosynthesis` (replace placeholder Experiment body) |
| `…/P4/10_Circuit_Builder` | Electricity | Wire drag, bulb glow on complete circuit | Same; **F2** `07_Circuit_Constructor`, **P6/02_Electric_Circuit_Master` |
| `…/P4/17_Cyber_Defense` | Digital literacy | Scenario branching, safe/unsafe choices | Same; **P6/20_Cyber_Safety_Password` |
| `…/P5/03_Circulatory_Flow` | Body systems | Animated blood path, organ hotspots | Same; Biology `cardiac-cycle` (secondary) |
| `…/P5/14_Photosynthesis_Deep` | Photosynthesis | Chloroplast diagram + variable sliders | Same; **F2** `01_Photosynthesis` Guided steps |
| `…/P5/27_AI_Classifier` | AI literacy | Train/test classifier mini-game, confusion matrix lite | Same; **ICT** secondary |
| `…/P5/42_Lens_Lab` | Optics | Ray drawing, focal length slider | Same; **F3** `16_Lenses`, Physics `Lens_Ray_Diagrams` |
| `…/P6/05_Volcano_Explorer` | Geology | Cross-section canvas, eruption pressure meter | Same |
| `…/P6/17_Light_Prism` | Light spectrum | **Canvas ray-tracing**, wavelength slider, CRT scanline aesthetic—**top-tier visual** | Same; **F3** `14_Refraction`, `15_TIR`, Physics `Prism_Dispersion` |
| `…/P6/33_Immune_Warriors` | Immune system | Game-style pathogen invasion | Same; Biology `immune-response`; **F3** `05_Disease_Prevention` |
| `…/P6/38_Moon_Phases` | Astronomy | Phase dial + Earth–Moon–Sun model | Same; Physics `3D_Solar_System` |

### Full slug catalog (all map 1:1 to same path under `HK Cirriculum/Primary_School/General_Studies/`)

**P1 (30):** `01_School_Tour`, `02_Pack_My_Bag`, `03_Classroom_Rules`, `04_Focus_Class`, `05_Meeting_Friends`, `06_My_Five_Senses`, `07_Teeth_Brushing`, `08_Healthy_Plate`, `09_My_Feelings`, `10_Good_Posture`, `11_My_Family_Tree`, `12_Housework_Hero`, `13_Home_Safety`, `14_Save_Water`, `15_Filial_Piety_Acts`, `16_Animal_Sorting`, `17_Plant_Growth`, `18_Four_Seasons`, `19_Weather_Reporter`, `20_Recycling_Bin`, `21_Community_Map`, `22_Transport_Sounds`, `23_Good_Citizen`, `24_Helping_Professions`, `25_Sink_Or_Float`, `26_Magnet_Fun`, `27_Chinese_Festivals`, `28_China_Map_Puzzle`, `29_Flag_Raising`, `30_Simple_Machine`

**P2 (30):** `01_My_Timetable` … `30_Green_Manager` (full list in repo; identical to Sample)

**P3 (30):** `01_Nutrient_Match` … `30_Cultural_Manners`

**P4 (30):** `01_Food_Pyramid_Pro` … `30_Typhoon_Prep`

**P5 (60):** `01_Nutrition_Scanner` … `60_Natural_Disasters`

**P6 (60):** `01_World_Continents` … `60_Memories_Book`

**Default enrichment rule:** If HK copy equals Sample verbatim, sibling agents should **diff for missing NCS fleet i18n** (`common/ncs-i18n.js`) and **upgrade Experiment depth** using flagship patterns above—not re-scaffold.

---

## 3. Primary Mathematics (230 apps, P1–P6)

**Hub:** `Primary_School/Mathematics/index.html` + `P{n}/index.html`  
**Stack:** Tier A + `Mathematics/common/i18n.js`; some **dark glass** premium UI (P5+)  
**HK mirror:** `HK Cirriculum/Primary_School/Mathematics/`

### Flagship samples

| Path | Topic | What makes it good | Enrich HK module(s) |
|------|-------|-------------------|---------------------|
| `…/P1/09_Addition_NumberLine` | Addition | Animated number line jumps, tick marks | Same; **F1** `01_Directed_Numbers` |
| `…/P2/03_Place_Value_Abacus` | Place value | Interactive abacus beads | Same |
| `…/P3/23_Coordinates_Grid` | Coordinates | Click-to-plot, quadrant feedback | Same; **F6** coordinate units |
| `…/P4/03_Fraction_Explorer` | Fractions | Area model shade/unshade | Same; **F1** `41_Fraction_Pizza_Share` |
| `…/P5/11_Fractions_Multiply_Frac` | Fraction × fraction | **Grid intersection highlight** (row × col), dark glass panel, rule mnemonic | Same; Secondary Math fraction gaps |
| `…/P5/42_Volume_Builder` | Volume | 3D block stacking, layer count | Same; **F5** mensuration |
| `…/P5/47_Equations_Intro` | Algebra | Balance scale metaphor | Same; **F1** algebra intro |
| `…/P6/03_Speed_Distance_Time` | Speed | Triangle formula drag, unit conversion | Same; Physics kinematics intro |
| `…/P6/02_Circle_Explorer` | Circles | Radius/diameter drag, circumference live calc | Same; **F5** `10_Radians_Deg`, `11_Arc_Sector` |

### Full slug catalog (maps 1:1 to `HK Cirriculum/Primary_School/Mathematics/`)

**P1 (40 + index):** `01_Counting_1_To_10` … `40_Math_Challenge_P1`  
**P2 (40 + index):** `01_Numbers_To_1000` … `40_Math_Challenge_P2`  
**P3 (40 + index):** `01_Five_Digit_Numbers` … `40_Math_Games`  
**P4 (40 + index):** `01_Multiplication_Grid` … `40_Math_Challenge_P4`  
**P5 (54 + index):** `01_Multiplication_Advanced` … `54_Percentages_Intro`  
**P6 (40 + index):** includes duplicate-prefix slugs `01_Fractions_Division`, `01_Percentage_Calculator`, `02_Circle_Explorer`, `02_Fractions_Div_Frac`, etc.—**preserve both** when syncing

**Cross-enrichment:** Secondary Math modules lacking manipulatives → steal **grid/array** (`P5/11`), **number line** (`P1/09`), **3D volume** (`P5/42`).

---

## 4. Primary Chinese (22 apps)

**Hub:** `Primary_School/PrimaryChinese/index.html`  
**HK mirror:** `HK Cirriculum/Primary_School/PrimaryChinese/` (+ extra: `粵語伴讀：濫竽充數` Tier C, Tang Poetry Snake, grammar-coaster HTML only in HK)

| Path | Topic | What makes it good | Enrich HK module(s) |
|------|-------|-------------------|---------------------|
| `…/lesson-13/` | 濫竽充數 unit | **4-tab LGER-like flow** (Reading / Vocabulary / Writing / Quiz), per-char TTS click, Tesseract OCR writing check, progress bar | **Secondary** `Chinese/classical_translation_puzzle`, `classical_punctuation_master`; wrap other classical texts |
| `…/poetry_royale/` | Tang poetry | 100 upper/lower couplet pairs, wrong distractors, arcade scoring | **Secondary** `tang_poetry_lab`, `couplet_duel` |
| `…/typo_mole/` | 錯別字 | Whack-a-mole timing, homophone traps | **Secondary** `typo_detective`; Primary copy |
| `…/typo_surgeon/` | 錯別字 | Surgical metaphor, streak combos | Same |
| `…/character_fireworks/` | Characters | Firework reveal on correct answer, progress sections | **Secondary** `stroke_ninja` |
| `…/particle-bridge-game/` | 虛詞 | Bridge-building particle placement | **Secondary** `particle_courtroom`, `transition_bridge` |
| `…/radical_bubble_chemistry/` | 部首 | Bubble merge chemistry metaphor | **Secondary** `radical_monster_crafter` |
| `…/The Radical Cube/` | 部首 | 3D cube face radicals | Same |
| `…/rhetoric_factory/` | 修辭 | Assembly-line rhetoric types | **Secondary** `rhetoric_playground` |
| `…/rhetoric_ninja/` | 修辭 | Action game verbs | Same |
| `…/Rhetoric_Defense/` | 修辭 | Tower-defense metaphor | Same |
| `…/idiom_asteroids/` | 成語 | Asteroid shooter | **Secondary** `idiom_parkour`, `idiom_comic_maker` |
| `…/idiom-laser-maze/` | 成語 | Maze navigation | Same |
| `…/idiom_mood_board/` | 成語 | Mood board matching | Same |
| `…/story_dice/` | Creative writing | Tier B Vite—dice roll story prompts | Same slug (HK has dist) |
| `…/chinesemonopoly/` | Revision | Board game loop | Primary hub gamification |
| `…/millionaire/` | Revision | Who Wants to Be a Millionaire ladder | All Chinese quiz modules |
| `…/railshooter/` | 詞語 | Rail shooter vocabulary | **Secondary** `oral_exam_simulator` warm-up |
| `…/word_rain/` | 詞語 | Falling character catch | Primary + Secondary vocab |
| `…/ac_particle_fill_in/` | 虛詞 | Fill-in-blank particles | **Secondary** `particle_courtroom` |
| `…/P5_擬人法/` | 修辭 | Personification lesson | **Secondary** `rhetoric_playground` |
| `…/P5_擬人法_Copilot/` | 修辭 + AI | Copilot-assisted variant | Argumentation / writing modules |

---

## 5. Primary English (1 app)

| Path | Topic | What makes it good | Enrich HK module(s) |
|------|-------|-------------------|---------------------|
| `…/English/English Oral Tutor/` | Oral English | Full-screen glass UI, scenario cards, recording UX, Outfit font, animated backgrounds—**1,600+ line single-page tutor** | `HK Cirriculum/Primary_School/English/English Oral Tutor`; **Secondary** `Chinese/oral_exam_simulator` (UX patterns) |
| `…/English/index.html` | Hub | Subject portal | Same |

**Note:** HK also has `English_Vocabulary` (Tier B dist)—not in Sample folder.

---

## 6. Secondary Biology (26 published + 2 source-only)

**Hub:** `Secondary_School/Biology/index.html` → links to `apps/*/dist/index.html`  
**Stack:** Tier B — Vite + React + Tailwind + Framer Motion (+ Recharts where noted)  
**HK mirror:** `HK Cirriculum/Secondary_School/Biology/` (full fleet + extras: `cardiac-cycle`, `dna-translation`, `membrane-transport`, `nerve-impulse`)

| Path (serve `dist/`) | HKDSE focus | What makes it good | Enrich HK module(s) |
|----------------------|-------------|-------------------|---------------------|
| `action-potential` | Nerve impulse | Step-through depolarisation animation | **F2** `22_Reaction_Time`; JS nervous system |
| `allopatric-speciation` | Evolution | Geographic isolation timeline | **F2** `DNA`; P6 `15_Evolution_Game` |
| `antibiotic-resistance` | Microbiology | Selection pressure simulation | **F3** `05_Disease_Prevention`, `06_Biotechnology` |
| `cell-cycle-mitosis` | Cell division | Phase gate interactives | **F1** `18_Animal_Cell`; **F2** `DNA` |
| `cellular-respiration` | Respiration | ATP pathway steps | **F2** `02_Respiration` (critical—replace weak Experiment) |
| `cholinergic-synapse` | Synapse | Neurotransmitter release UI | **F2** nervous system units |
| `energy-flow` | Ecology | **10% law** particle animation, pyramid builder, inverted pyramid scenarios | **F3** `04_Balanced_Diet` food web; P5 `13_Ecosystem_Balance` |
| `enzyme-kinetics` | Enzymes | Substrate concentration curves | **F3** `02_Food_Substances` enzymes |
| `flowering-plants-reproduction` | Reproduction | Pollination stages | **F2** plant units |
| `fluid-mosaic-model` | Membrane | Phospholipid drag | **F1** `18_Animal_Cell` |
| `food-test-simulation` | Food tests | Benedict/Biuret/Iodine lab with shake/heat UI + lab report | **F3** `02_Food_Substances` (primary Experiment donor) |
| `gel-electrophoresis` | Biotech | DNA fragment migration | **F3** `06_Biotechnology` |
| `genetics-punnett-pedigree` | Genetics | Punnett + pedigree toggle | **F2** `DNA`; P6 `32_DNA_Traits` |
| `glucose-regulation` | Homeostasis | Insulin/glucagon feedback | **F3** `01_Healthy_Lifestyle` |
| `immune-response` | Immunity | Cell army metaphor | P6 `33_Immune_Warriors`; **F3** `05_Disease_Prevention` |
| `mechanisms-of-movement` | Muscles | Sliding filament | **F2** force/motion crossover |
| `meiosis-simulation` | Meiosis | Crossing-over stage control | **F2** `DNA` |
| `menstrual-cycle` | Reproduction | Hormone timeline | P6 puberty units |
| `muscle-contraction` | Muscles | Sarcomere shorten slider | **F2** `23_Force_Meter` bridge |
| `oxygen-dissociation` | Gas transport | O₂ dissociation curve drag | **F2** `03_Gas_Exchange`, `04_Air_Composition` |
| `photosynthesis` | Photosynthesis | Chloroplast light/dark reactions | **F2** `01_Photosynthesis` (secondary-depth Experiment) |
| `protein-synthesis` | Molecular genetics | Transcription/translation steps | **F2** `DNA`; `dna-translation` source |
| `recombinant-dna` | Biotech | Restriction enzyme cut + ligate | **F3** `06_Biotechnology` |
| `translocation-in-phloem` | Transport | Pressure-flow model | Plant transport JS |
| `transpiration-lab` | Transport | Potometer variables | Plant units |
| `cardiac-cycle` *(source only, not in hub)* | Circulation | Heart phase animation | **F3** `03_Circulatory` concepts; P5 `03_Circulatory_Flow` |
| `dna-translation` *(source only)* | Protein synthesis | Codon wheel | **F2** `DNA` |

---

## 7. Techniques to steal (cross-cutting)

### Interaction patterns

| Pattern | Where seen | Apply to HK |
|---------|------------|-------------|
| **Drag-and-drop zones** with snap + wrong-drop shake | GS sorting, lunchbox, recycling | Any classification LGER Guided tab |
| **Resource toggles** (sun/water/CO₂) → animated outcome | `P4/08_Photosynthesis_Lab` | F2 `01_Photosynthesis` Experiment |
| **Canvas ray physics** (reflection/refraction/prism) | `P6/17_Light_Prism` | F3 light units, Physics optics |
| **Grid intersection model** | `P5/11_Fractions_Multiply_Frac` | Primary Math + F1 fractions |
| **Slider → live system response** | Ecology, circuits, optics | All JS science sims |
| **Hotspot map / compass** | HK geography apps | Geography secondary, GS P3–P4 |
| **Scenario branch quiz** | Cyber defense, consumer rights | Citizenship modules |
| **Lab report panel** after experiment | Biology `food-test-simulation` | F3 food tests, F2 titration |
| **Particle flow animation** | `energy-flow`, circulatory | Food webs, energy chains |
| **Game loops** (mole, rail shooter, tower defense) | PrimaryChinese | Secondary Chinese engagement layer |
| **4-tab lesson unit** | `lesson-13` | Chinese classical texts, English units |
| **Millionaire ladder assessment** | `millionaire` | End-of-unit Review tabs |
| **Scroll-cinematic hub** | Portfolio `index.html` | CEO-facing curriculum portal |

### Visual / UI patterns

| Pattern | Details | Steal for |
|---------|---------|-----------|
| **Warm Primary GS** | Fredoka + yellow gradients + emoji CTAs | P1–P3 GS |
| **Dark glass premium** | `#0f172a` + blur panels + glow sliders | P5–P6 Math, light labs |
| **Biology earthy glass** | Emerald hub gradients, glass-card hover lift | Biology + JS bio units |
| **10-language i18n** | `MathI18n.get(t.key, lang)` | All Primary; extend via NCS fleet in HK |
| **Visible feedback <1 action** | Every click animates | QA rule for all modules |
| **Progress bar + section lock** | `lesson-13` header | LGER Learn gating |

### LGER-like structures (samples → HK wrapper)

| Sample structure | HK implementation |
|------------------|-------------------|
| Free-play sim body | `JSLGER.Shell` **Experiment** tab payload |
| Pre-sim reading/quiz | **Learn** + **Guided** arrays (`LEARN`, `GUIDED`, `REVIEW`, `SUMMARY`) |
| End quiz | **Review** tab |
| Tab progression lock | Already in `junior-science-lger.js`—wire `experimentUnlock` after Learn |
| `lesson-13` tabs | Map to LGER: Reading→Learn, Vocabulary→Guided, Writing→Experiment, Quiz→Review |

### Assessment patterns

| Type | Example | Use |
|------|---------|-----|
| MC with distractor triplets | F3 LGER `opts: [correct, nonsense×2]` | Keep; improve Experiment linkage |
| OCR handwriting check | `lesson-13` + Tesseract | Chinese writing modules |
| Timed arcade accuracy | `typo_mole`, `poetry_royale` | Review tab gamification |
| Lab observation checklist | Biology sims | Experiment reflection prompts |
| Score + streak | Chinese games | Review leaderboard localStorage |

---

## 8. Master enrichment map (Sample → HK priority targets)

Priority = where Sample quality **exceeds** current HK module or HK lacks a game/sim layer.

### Secondary Junior Science (highest ROI)

| HK target module | Sample donor(s) | Action |
|------------------|-----------------|--------|
| `Form 2/01_Photosynthesis` | `P4/08_Photosynthesis_Lab`, Biology `photosynthesis` | Graft interactive plant sim into LGER Experiment |
| `Form 2/02_Respiration` | Biology `cellular-respiration` | Replace static content |
| `Form 2/03_Gas_Exchange`, `04_Air_Composition` | Biology `oxygen-dissociation`, `P5/04_Respiratory_Lab` | Add dissociation curve + lung model |
| `Form 2/07_Circuit_Constructor`, `10_Electromagnet` | `P4/10_Circuit_Builder`, `P4/13_Magnet_Electromagnet` | Unified circuit sandbox |
| `Form 2/12_pH_Scale`–`16_Reactivity` | Step-by-step lab pattern from Biology food-test | Titration/indicators wet sim |
| `Form 2/18_Eye_Anatomy`, `19_Optics_Lab`, `20_Ear_Sound` | `P5/43_Eye_Structure`, `P5/45_Ear_Anatomy`, `P6/17_Light_Prism` | Canvas optics + anatomy hotspots |
| `Form 2/DNA` | Biology `genetics-punnett-pedigree`, `meiosis-simulation`, `protein-synthesis` | Multi-tab genetics suite |
| `Form 3/02_Food_Substances` | Biology `food-test-simulation`, `enzyme-kinetics` | Lab report Experiment |
| `Form 3/04_Balanced_Diet` | `P3/02_Balanced_Lunchbox`, Biology `energy-flow` | Nutrition + food web |
| `Form 3/05_Disease_Prevention` | Biology `immune-response`, `antibiotic-resistance` | Infection narrative |
| `Form 3/06_Biotechnology` | Biology `gel-electrophoresis`, `recombinant-dna` | Biotech pipeline |
| `Form 3/12–18` (Light) | `P6/17_Light_Prism`, `P5/42_Lens_Lab`, `P5/12_Light_Reflection` | Ray canvas + lens sim |

### Secondary Biology (HKDSE — polish & link)

All 26 Sample sims exist in HK Biology—enrich by **cross-linking from JS modules** above and adding **LGER Review question banks** derived from each sim's README "Key concepts" section.

### Secondary Chinese (game layer missing in HK)

| HK module | Sample donor |
|-----------|--------------|
| `tang_poetry_lab` | `poetry_royale` |
| `typo_detective` | `typo_mole`, `typo_surgeon` |
| `particle_courtroom` | `particle-bridge-game`, `ac_particle_fill_in` |
| `radical_monster_crafter` | `radical_bubble_chemistry`, `The Radical Cube` |
| `rhetoric_playground` | `rhetoric_factory`, `rhetoric_ninja`, `Rhetoric_Defense` |
| `idiom_parkour` | `idiom_asteroids`, `idiom-laser-maze` |
| `classical_translation_puzzle` | `lesson-13` tab scaffold |
| `oral_exam_simulator` | `English Oral Tutor` (recording UX), `railshooter` (warm-up) |
| `argumentation_builder` | `Rhetoric_Defense`, `millionaire` review |

### Secondary Physics / Chemistry

Sample has **no dedicated F4–F6 Physics/Chem apps**—steal from GS/Math/Biology:

| HK module | Sample donor |
|-----------|--------------|
| `Physics/Topics/03_Wave_Motion/Prism_Dispersion` | `P6/17_Light_Prism` |
| `Physics/Topics/03_Wave_Motion/Lens_Ray_Diagrams` | `P5/42_Lens_Lab` |
| `Physics/Topics/06_Astronomy/3D_Solar_System` | `P6/37_Solar_System`, `P6/38_Moon_Phases` |
| `Physics/Topics/02_Force_and_Motion/Bernoulli_Simulation` | `P6/41_Force_Motion`, `P5/09_Force_and_Motion` |
| Chemistry apps (if thin) | Biology lab-step UI, `P6/14_Common_Chemicals` |

### Secondary Mathematics

| HK module | Sample donor |
|-----------|--------------|
| `Form 1/41_Fraction_Pizza_Share` | `P4/03_Fraction_Explorer`, `P5/11_Fractions_Multiply_Frac` |
| `Form 1/01_Directed_Numbers` | `P1/09_Addition_NumberLine`, `P6/31_Negative_Numbers` |
| Mensuration / volume units | `P5/42_Volume_Builder`, `P6/16_Cylinder_Volume` |
| Statistics | `P6/25_Average_Mean`, `P6/23_Pie_Chart_Draw` |

### Primary (HK ≈ Sample — selective upgrades)

| Priority | Sample donor | HK target |
|----------|--------------|-----------|
| Add NCS fleet i18n if missing | Any Sample with `i18n.js` | All Primary apps without `ncs-i18n.js` |
| Premium visuals | `P6/17_Light_Prism`, `P5/11_Fractions_Multiply_Frac` | Same slugs in HK if older/plain |
| GS–JS bridges | Photosynthesis, circuits, immune | Link Primary P4/P6 to Secondary JS hubs |

### Primary / Secondary English

| HK target | Sample donor |
|-----------|--------------|
| `Primary_School/English/English Oral Tutor` | Sample version (compare diff) |
| Future oral modules | Scenario card UX from Oral Tutor |

### Music / SEL

| HK target | Sample donor |
|-----------|--------------|
| `Secondary_School/Music/` | `Music Therapy/music-therapy-app` (EmotionMirror, IsoMoodPlayer) |
| GS mental health units | Rhythm + breathing from Music Therapy |

---

## 9. Tech tier quick reference (from Sample)

| Tier | Sample examples | HK deployment |
|------|-----------------|---------------|
| **A** | All Primary GS/Math, most Chinese HTML games | Single `index.html`, CDN React |
| **B** | Biology apps, `story_dice` | Vite build, commit `dist/` |
| **C** | Music Therapy, `粵語伴讀：濫竽充數` (HK only) | TS + MediaPipe/Gemini |
| **D** | Canvas-heavy (Light Prism internals) | Vanilla/canvas inside React |

---

## 10. Agent workflow checklist

1. **Identify HK module** from Section 8 priority table.  
2. **Read Sample donor** `index.html` (or Biology `src/App.jsx`) for interaction core only.  
3. **If Junior Science:** extract sim → inject as `experimentContent` in existing `JSLGER.Shell`; keep `LEARN/GUIDED/REVIEW` aligned to scicent slides.  
4. **If Secondary Chinese:** port game loop mechanics; keep HK typography and NCS chrome.  
5. **Verify hub link** exists in subject `index.html`.  
6. **Smoke test** page load + one complete LGER cycle.

---

## Appendix A — Sample counts

| Section | Apps |
|---------|------|
| Primary General Studies | 240 |
| Primary Mathematics | ~230 |
| Primary Chinese | 22 |
| Primary English | 1 (+ hub) |
| Secondary Biology (dist) | 26 |
| Biology source-only extras | 2 (`cardiac-cycle`, `dna-translation`) |
| Music Therapy | 1 |
| Portfolio root | 1 |
| **Total index entry points** | **539** |

---

## Appendix B — Sibling agent split suggestion

| Agent focus | Sample sections | HK targets |
|-------------|-----------------|------------|
| 02–03 | Biology + GS science sims | JS F2–F3 science |
| 04–05 | Primary Math premium + GS | Primary upgrades + Math F1 |
| 06–07 | Primary Chinese games | Secondary Chinese |
| 08 | English Oral + lesson-13 | English + classical Chinese |
| 09 | Music Therapy + SEL GS | Music + wellness |
| 10 | Portfolio hub + docs | Hub pages + QA fleet |

---

*End of inventory. For build conventions see `Reference/Sample - 複製/.cursor/skills/education-engineer/app-patterns.md` and HK mirror at `HK Cirriculum/.cursor/skills/education-engineer/`.*
