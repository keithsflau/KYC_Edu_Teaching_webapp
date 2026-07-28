# Homepage without Subjects — UI Design Rationale

**Agent:** UI Expert  
**File:** `index.html`  
**CEO mandate:** Remove top-level 科目目錄; keep subject depth inside 小學／中學 hubs.

---

## Problem

The previous homepage treated **科目目錄 · Subjects** as a peer of Primary and Secondary. That created three competing “front doors” and duplicated the same mental model twice (Subjects tabs → Primary/Secondary, then Primary/Secondary hubs → subjects).

Users had to choose *how* to browse before choosing *what* to learn.

---

## Information architecture

### Before

```
Home
├── 科目目錄 (subjects/index.html)  ← removed from home
├── 小學 Primary
├── 中學 Secondary
├── 家長儀表板
└── 收費計劃
```

### After

```
Home
├── 小學課程 → Primary_School/index.html (小學各科 hub)
├── 中學課程 → Secondary_School/index.html (中學各科 hub)
├── 家長儀表板
└── 收費計劃
```

**Subjects are not deleted** — links formerly on `subjects/index.html` are redistributed into the two school-level hubs by other agents. The homepage no longer advertises a third catalog layer.

---

## Visual hierarchy

| Tier | Component | Rationale |
|------|-----------|-----------|
| **Hero** | Title, tagline, demo CTAs | Immediate value: try a lesson without signing in |
| **Row 1 — `.stage`** | 小學課程 + 中學課程 (`.card.featured`) | Largest cards, Fraunces headings, teal/copper badges — clear primary paths |
| **Row 2 — `.grid.grid--secondary`** | 家長儀表板 + 收費 | Smaller type, softer ink — supports conversion without competing with curriculum |
| **Footer** | `@HKSTEAMAI` | Brand attribution |

### Featured card cues

- **小學課程:** badge `小學各科`, teal pill — matches brand primary
- **中學課程:** badge `中學各科`, copper-tinted pill (`.featured--secondary`) — sibling distinction without a new palette

Section labels (`課程 · Curriculum`, `家長與訂閱 · Parents`) group content for screen readers and scanning without adding nav chrome.

---

## Design system (unchanged)

- **Type:** Fraunces (display) + Noto Sans TC (UI) — editorial, Hong Kong–appropriate, not generic Inter/purple SaaS
- **Colour:** ink `#0a1f33`, teal `#0f6b5c`, copper `#b87333` — no indigo/violet gradients
- **Shape:** 4px radius, light borders, restrained shadow — cards feel tactile, not “AI slop glassmorphism”
- **Motion:** subtle `rise` on hero; `prefers-reduced-motion` respected

---

## What we deliberately did not do

1. **Flatten to two empty shells** — copy still names subjects (“數學、常識…”) so users know depth exists inside each hub.
2. **Remove `subjects/index.html`** — out of scope for homepage; other pages may still link there until migrated.
3. **Promote pricing above curriculum** — demo buttons stay in hero; paid paths stay in secondary row.

---

## Coordination for hub agents

When filling `Primary_School/index.html` and `Secondary_School/index.html`:

- Port every subject link from `subjects/index.html` (primary tab → primary hub, secondary tab → secondary hub).
- Use hub title **小學各科** / **中學各科** (or equivalent H1) so the homepage badge text matches the destination.
- Eventually align hub styling to teal/copper tokens; current Tailwind glass cards are functional but visually divergent from home.

---

## Success criteria

- [x] No Subjects card on homepage
- [x] 小學課程 + 中學課程 dominate first content row
- [x] Parent dashboard + pricing in secondary row
- [x] Teal/copper, Fraunces/Noto, `@HKSTEAMAI` footer preserved
- [ ] Hub pages fully absorb `subjects/index.html` links (other agents)
