# CEO IA: Primary + Secondary only (no subject-first landing)

**Decision:** Browse UI starts with **小學課程 / Primary** and **中學課程 / Secondary** — not a flat subject catalog.

## Top level (both surfaces)

| Surface | URL | First screen |
|---------|-----|--------------|
| Platform library | `localhost:3000/library` | Two cards: 小學課程 · Primary \| 中學課程 · Secondary |
| Static curriculum | `localhost:5173/subjects/index.html` | Same two cards; title **課程目錄 · Curriculum** |

## Flow after pick

1. User chooses school level.
2. Subject grid / tabs appear **inside** that level (e.g. `/library?section=secondary`, `?section=primary`).
3. Subject folders on disk are unchanged; grouping under Primary/Secondary only.

## What we removed / de-emphasised

- **科目目錄 · Subjects** as the main hub label (replaced with **課程目錄**).
- Default landing that jumped straight to secondary subject list without level choice.
- Nav links that pointed to “科目” as the primary browse entry (hub, parent dashboard, marketing now lead to 小學/中學 or 課程目錄).

## Bilingual labels

- 小學課程 / Primary
- 中學課程 / Secondary

## Verify

```text
localhost:3000/library          → only 小學 + 中學 cards
localhost:3000/library?section=secondary → secondary subjects
localhost:5173/subjects/index.html       → only 小學 + 中學 cards
localhost:5173/subjects/index.html?section=primary → primary subjects
```

## Files touched

- `hksteamai-platform`: `library/page.tsx`, `LibraryLevelPicker.tsx`, `LibrarySectionTabs.tsx`, `i18n.ts`, `globals.css`
- `HK Cirriculum/subjects/index.html`, `_tools/rebuild-subjects-directory.js`
- `HK Cirriculum/index.html` (already emphasises Primary/Secondary stage cards)
- Nav: parent-dashboard, marketing landing (小學/中學 first)
