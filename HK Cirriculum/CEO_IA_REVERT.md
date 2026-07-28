# CEO IA revert (Primary/Secondary-only wave)

**Date:** 2026-07-29  
**Trigger:** CEO「錯哂，返轉頭！」— undo homepage / library IA that removed 科目目錄 and forced a two-card-only entry.

## Restored

| Area | Action |
|------|--------|
| `HK Cirriculum/index.html` | Brought back **科目目錄 · Subjects** card and 5-card hub grid; hero title back to **HK Cirriculum** (not 小學/中學-only headline). |
| `HK Cirriculum/subjects/index.html` | Reverted generator + **regenerated** — Sayo-style **Secondary \| Primary** tabs (no two-card `level-view` gate). |
| `HK Cirriculum/_tools/rebuild-subjects-directory.js` | Reverted IA template changes (level picker / 課程導覽 header). |
| `HK Cirriculum/Primary_School/index.html` | Restored from last **git HEAD** hub (Tailwind glass layout). |
| `HK Cirriculum/Secondary_School/index.html` | Same as Primary — from **git HEAD**. |
| `index.html`, `Primary_School/index.html`, `Secondary_School/index.html` (repo root) | `git restore` from HEAD (undoes redirect stubs to `HK Cirriculum/`). |
| `hksteamai-platform/src/app/library/page.tsx` | Removed level-picker gate; library shows section tabs + subject grid (default secondary). |
| `hksteamai-platform/src/lib/i18n.ts` | Reverted library lead / tab copy from Primary-Secondary-only wording. |
| `hksteamai-platform/src/components/LibraryLevelPicker.tsx` | **Deleted** (only used by reverted IA). |
| Marketing / parent surfaces | Reversed nav CTA edits from retire-科目目錄 pass (`marketing/site/landing`, `schools`, `parent-dashboard` where applicable). |

## Left unchanged (on purpose)

- App-level QA fixes (Physics, Space Mission, Chemistry labs, etc.) — not touched unless same hub file.
- `HK Cirriculum/Secondary_School/Chemistry/index.html` — back link already `../index.html` (Secondary hub).
- `CEO_HOME_IA.md`, `CEO_IA_PRIMARY_SECONDARY_ONLY.md` — kept for audit; superseded by this note.

## Verify

```text
HK Cirriculum/index.html              → Subjects card + Primary + Secondary + parent/pricing
HK Cirriculum/subjects/index.html     → Subject Directory, tab switch (no level-only landing)
localhost:3000/library                → Tabs + subjects (no two-card picker)
```

## Method

- Tracked root hubs: `git restore`.
- Untracked `HK Cirriculum/*` + platform: reverse `StrReplace` ops from agent transcripts `fc770a0a`, `73749411`, `ba912ea4`; regenerate subjects via `node _tools/rebuild-subjects-directory.js`.
