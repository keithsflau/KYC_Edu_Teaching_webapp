# Mathematical Modelling + AI + National Security Education Plan

**Status:** Flagship suite shipped (2026-07)  
**Audience:** Secondary Mathematics F2–F6 (enrichment links across junior & senior)  
**Alignment:** HKDSE modelling habits, EDB national security education themes (Resource / Data / Tech / Energy / Information literacy), junior–senior rates–probability–LP progression — **maths-first, age-appropriate, no political slogans**.

**Academic integrity:** All scenario defaults, quiz figures, and coach presets use **original fictional educational numbers** invented for these labs. They are not copied from commercial textbook exercises. Curriculum-theme alignment is thematic only.

**Repo-wide originality:** A 2026-07 pass rewrote fixed quiz/default numbers across Form 1–6, M1, and M2 (not only this suite). Tracking: `ORIGINAL_DATA_PASS.md`.

## Learning design

| Pillar | Approach |
|--------|----------|
| Modelling cycle | Real problem → assumptions → math model → solve → interpret → refine |
| AI coach | Offline rule-based heuristics with **transparent numbered reasoning** (no API keys / secrets) |
| National security | Embed via Resource / Data / Tech / Energy / Information literacy scenarios |

## Suite map (live)

| Path | Level | Focus | NSE field |
|------|-------|-------|-----------|
| `Form 2/41_Modelling_Cycle` | F2 | Modelling cycle + MTR queue rates | Societal resilience |
| `Form 3/42_Reservoir_Security` | F3 | Linear storage balance | Resource security (water) |
| `Form 4/39_Cyber_Risk_Model` | F4 | Probability tree (phishing) | Data / tech security |
| `Form 5/31_Energy_Grid_Model` | F5 | Supply mix & reserve margin | Energy / economic security |
| `Form 6/26_AI_Modelling_Coach` | F6+ | Multi-scenario AI coach sandbox | All of the above + misinfo |

**Hub entry:** Mathematics portal flagship card → AI Modelling Coach; form dashboards list each app.

## Upgraded companions

- `Form 1/29_Estimation` — bilingual K/S/A, % error tracking (estimation accuracy)
- `Form 6/07_Linear_Prog_Optim` — interactive feasible region + corner principle (staffing capacity story)
- `Form 6/24_Stat_Misuse` — true vs visual difference, quiz, link to misinfo coach scenario

## Tech

- Tier A: static HTML + React CDN + Babel + Tailwind (GitHub Pages safe)
- Bilingual EN / 繁中 (`zh-HK` copy)
- Bright Math visual language (Outfit / Noto Sans TC)

## Suggested next batch

1. Expand F6 stubs (`16_Circle_Prop_*`, `18_Locus_*`) to full interactives  
2. M1 Bayes / confidence apps: “critical alert false-positive” modelling (data security)  
3. F2 probability intro: link tree diagrams → cyber risk lab  
4. Shared `shared/modelling-coach.js` to DRY coach heuristics across suite  
5. Form 3/4 plan docs (`S3_MATH_PLAN.md`, `S4_MATH_PLAN.md`) mirroring S1/S2  

## Curriculum notes

NSE fields (Economic / Societal / Resource / Homeland / Data / Tech) appear in published teaching schedules as **theme tags**. This suite operationalises those themes as **quantitative labs** with independently invented parameters — keep skills (rates, trees, reserve margin, LP corners), never paste textbook exercise data.
