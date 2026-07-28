# CEO BEAT: Sayo Chem Counter-Strategy

## 1. The Threat
Sayo Chemistry (`chem.sayo.ai`) has real interactive virtual labs (e.g. Acid-Base Titration) with dynamic charting, interactive apparatus, and multi-tab learning. It is not just a quiz engine.

## 2. Our Advantage: Teach From Zero (TFZ) + Better Sims
We will not just copy PhET or Sayo. We will beat them by ensuring **Teach From Zero (TFZ)** is completed *before* the student enters the lab. Sayo drops students into the lab; we build the conceptual scaffolding first.

## 3. The Upgrades
We are upgrading the following 5 Chemistry flagships to include the full TFZ structure (Learn -> Guided -> Exam -> Review) and enhancing their simulations:

1. **Titration (`Form 6/02_Titration_Curve`)**: **[SHIPPED]** Upgraded to a 3D Three.js simulation for the burette and beaker, keeping the live Chart.js titration curve. Full TFZ structure is present. This directly counters Sayo's 2D titration lab.
2. **Rates (`Form 5/01_Rates_Collision`)**: **[SHIPPED]** Integrated `Matter.js` for a true rigid-body collision engine to demonstrate collision theory and activation energy. Added the full TFZ structure.
3. **Le Chatelier (`Form 6/01_Le_Chatelier`)**: **[SHIPPED]** Added the full TFZ structure (LearnFromZero, GuidedLab, Drill) before the interactive chamber simulation.
4. **Haber Yield (`Form 6/04_Haber_Yield`)**: **[SHIPPED]** Added the full TFZ structure before the Haber plant simulation.
5. **Electrolysis (`Form 5/04_Electrolysis_Sandbox`)**: **[SHIPPED]** Added the full TFZ structure before the electrolysis sandbox.

## 4. Protection
- **Equilibrium Kc (`Form 5/09_Chemical_Equilibrium_Kc`)**: Protected. The A1-A8 TFZ structure is the gold standard and will not be wiped.

## 5. Shipped paths (return list)
- `CEO_BEAT_SAYO_CHEM_COUNTER.md`
- `HK Cirriculum/Secondary_School/Chemistry/Form 6/02_Titration_Curve/index.html`
- `HK Cirriculum/Secondary_School/Chemistry/Form 5/01_Rates_Collision/index.html`
- `HK Cirriculum/Secondary_School/Chemistry/Form 6/01_Le_Chatelier/index.html`
- `HK Cirriculum/Secondary_School/Chemistry/Form 6/04_Haber_Yield/index.html`
- `HK Cirriculum/Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox/index.html`
- `HK Cirriculum/Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/index.html` (protected A1–A8)

## 6. Execution Rules
- No `git clean -fd`.
- No passwords or lockouts.
- No direct copying of PhET.
- Incremental upgrades using CDN libraries (`Three.js`, `Matter.js`).
