# NCS language fix — Argument Tower (議論文積木 2.0)

## Root cause

Two issues stacked:

1. **Game script removed** — During the fleet NCS migration (`418d22d0`), the inline `<script>` (~430 lines: levels, crane game, architect feedback) was dropped. Only hard-coded Traditional Chinese HTML remained, so the switcher could never update dynamic UI.
2. **No app string registration** — Even in the original app, UI chrome (`建材倉庫`, stability label, win screen, architect messages) was hard-coded Chinese with no `NcsI18n.registerStrings`, `onChange`, or `applyUI`. The fleet switcher only translated shared chrome from `ncs-chrome.json`.

NCS Five languages were effectively stuck on zh because nothing listened for `hksteam-ncs-lang-change`.

## Fix

- Restored full game logic from git history (`1f765e0f`).
- Embedded `APP_STRINGS` for **zh**, **en**, **ne**, **ur**, **tl**, **hi** (UI chrome + feedback; essay block text stays zh — curriculum content).
- `registerArgStrings()` → `NcsI18n.registerStrings(APP_STRINGS)`.
- `applyUI()` updates all labelled chrome on load and on language change.
- Wired `NcsI18n.onChange`, `ncs-lang-change`, and `hksteam-ncs-lang-change`.
- `ui()` resolves NCS langs via **en fallback**, not zh (matches hub pattern).

## Verification

1. Open `index.html` via local server or `file://` (chrome fetch may fail; in-app strings are embedded).
2. Confirm game loads: block pool populates, crane drop works.
3. Default **繁體中文** → sidebar shows `建材倉庫`, architect welcome in Chinese.
4. Switch to **नेपाली** → sidebar shows `सामग्री गोदाम`, stability `स्थिरता`, win/next buttons in Nepali; essay blocks remain Chinese.
5. Switch to **English** → `Material Depot`, `Stability`, English architect toasts on wrong/right placement.
6. Repeat for **اردو**, **Filipino**, **हिन्दी** — chrome updates; no stuck Chinese labels.

## Sibling apps

Other `Secondary_School/Chinese/*/index.html` apps use the same fleet-init stub but mostly hard-coded zh UI — same pattern fix needed per app (not done in this pass; Argument Tower was priority).
