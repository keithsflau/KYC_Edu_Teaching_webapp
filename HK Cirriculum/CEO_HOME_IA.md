# Home information architecture

**Primary path (marketing & nav):**

```
Home → 小學課程 | 中學課程 → subject hub → app
```

- **Home** (`index.html`): hub cards and CTAs point to `Primary_School/` and `Secondary_School/` only.
- **小學課程** (`Primary_School/index.html`): subject cards → form/year hubs → individual apps.
- **中學課程** (`Secondary_School/index.html`): same pattern for secondary subjects.

**Deep link only (not marketed):**

- `subjects/index.html` — flat subject directory; kept for bookmarks and internal links, not top nav or primary CTAs.
