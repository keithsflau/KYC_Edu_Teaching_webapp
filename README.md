# KYC Edu Teaching Webapp

Kau Yan College education engineering portfolio — interactive lessons, simulations, and games for Hong Kong primary and secondary curricula.

Prepared by Lau Siu Fung (Kau Yan College).

## Open locally

This is a static site. From the project root:

```bash
npx --yes serve .
```

Then open the printed URL (usually `http://localhost:3000`).

## Contents

- `index.html` — home
- `Primary_School/` — P1–P6 Chinese, English, General Studies, Mathematics
- `Secondary_School/` — Biology, Chemistry, Physics, Mathematics, Music, Junior Science, Chinese, Economy, ICT, History, Chinese History, Geography
- `typing test/` — Chinese / English typing speed test
- `Music Therapy/` — optional therapy tools (API keys are entered in the app, not stored in the repo)

## Notes

- Two ICT PowerPoint files exceed GitHub’s 100MB limit and are not in this repository: `HE Ch1.pptx`, `HE Ch3.pptx`.
- Do not commit API keys. Music / Suno features expect you to paste your own key in the UI.
