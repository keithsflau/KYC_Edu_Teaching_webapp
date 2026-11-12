# CEO False FIXED Claims Audit

**Date:** 2026-07-29  
**Trigger:** User reports **blank** `Junior Science/Form 2/07_Circuit_Constructor` while CEO docs and agents claimed **Form 1–2 JS / lang switcher wired**.

**Method:** Read `index.html` on git `HEAD` (what ships if uncommitted WIP is ignored), scan Form 2 fleet, cross-check CEO boards and verify docs.

---

## 1. Circuit Constructor — technical truth

### On git `HEAD` (committed)

| Check | Result |
|-------|--------|
| `#root` present | **Yes** — empty `<div id="root"></div>` |
| `ReactDOM.createRoot` | **Yes** — `ReactDOM.createRoot(document.getElementById("root")).render(<App />);` |
| `ReactDOM.render` (legacy) | **No** |
| Visible body without JS | **No** — only `#root` + NCS fleet inject in `<head>` |
| Inline app script parses | **No** — **unterminated `bodyZh` / `qEn` string literals** in the Babel `<script type="text/babel">` block (batch generator corruption) |

**User-visible outcome:** NCS language switcher may appear; **main LGER UI never mounts** → **blank page**.

Example defect pattern (committed file, repeated across Learn steps):

```text
bodyZh: "完成學習後可使用互動實驗室。,
qEn: "The Experiment tab unlocks after??, qZh: "實驗分頁…後解鎖?,
```

Strings are not closed before the next property → **Babel fails** → **no React render**.

### Working tree (uncommitted, 2026-07-29)

Local edits replace React with a **vanilla** `#app` + `#main id="panel"` implementation (~25 KB). Node `--check` passes on extracted IIFE. **Not committed** — user on `HEAD` or deployed artifact still hits the broken React version.

---

## 2. What was falsely claimed

| Source | Claim | Reality |
|--------|-------|---------|
| `CEO_LANG_SWITCHER_BOARD.md` (prior) | Category **C** “Fixed in `junior-science-lger.js` … **VERIFY batch**” | Library contains `useLangSync`, but Fix 7 **FAIL** on Photosynthesis; **blank apps never reach lang testing** |
| `CEO_LANG_SWITCHER_BOARD.md` (prior) | Row 16 `Junior Science/**` **VERIFY** — “library fix landed (~83 apps)” | **~30/30 Form 2 HEAD apps** fail broken-string heuristic; **P0 BLANK FAIL**, not verify-pending |
| Agent narrative (user report) | “JS Form1–2 lang wired” | **Misleading** — fleet **NCS inject** is present; **lesson UI does not run** on HEAD |
| `CEO_JUNIOR_SCIENCE_GO_STATUS.md` | Form 2 bulk wrap “done”, Circuit Constructor “Series switch bulb” | **Not classroom-verified**; Circuit on HEAD is **blank** |
| `CEO_SAMPLE_ENRICHMENT_DONE.md` | `07_Circuit_Constructor` enriched from P4 Circuit Builder | **0/31 smoke-tested**; enrichment on top of **non-rendering** shell |
| `QA_JUNIOR_SCIENCE_AUDIT.md` | Long list of Form 1 “Fixed” for stub content | Separate track; **does not contradict** blank F2, but contributed to “fleet green” impression |

**Honest summary:** Teams conflated **(a)** adding `ncs-i18n.js`, **(b)** merging `useLangSync` into shared library, and **(c)** a working, language-switching lesson. Only (a) is reliably true on HEAD; (c) is **false** for Circuit Constructor and most Form 2 batch apps.

---

## 3. Form 2 Junior Science — size / shell scan (HEAD)

### Under 500 bytes

**None.** Smallest `index.html` in numbered Form 2 folders on HEAD is ~10 KB (React + NCS shell).

### NCS switcher without working body (HEAD)

All **numbered Form 2 lesson folders** checked on HEAD match:

- `ncs-i18n.js` fleet kit in `<head>`
- Body = **empty `#root` only** (React LGER pattern)
- `ReactDOM.createRoot(...)` present
- Inline Babel data contains **broken `bodyZh` lines** (automated scan: **30/30** folders including `30_Space_Mission`, `BioCycle`, `Newton-s-Cradle`, etc.)

**Exception class:** `30_Space_Mission` on HEAD is also **corrupt** (verify doc already **FAIL**); not a healthy vanilla app on committed revision.

**User symptom “only switcher, no content”** matches this architecture when JS parse/mount fails.

---

## 4. Enrichment apps called “done” but blank on HEAD

| App | Enrichment claim | HEAD mount | HEAD parse |
|-----|------------------|------------|------------|
| `07_Circuit_Constructor` | CEO_SAMPLE map | `#root` + `createRoot` | **FAIL** |
| `01_Photosynthesis` | CEO_SAMPLE map | `#root` + `createRoot` | **FAIL** |
| `03_Gas_Exchange` | CEO_SAMPLE map | `#root` + `createRoot` | **FAIL** |
| `09_Safety_House` | CEO_SAMPLE map | `#root` + `createRoot` | **FAIL** |
| `12_pH_Scale` | CEO_SAMPLE map | `#root` + `createRoot` | **FAIL** |

---

## 5. What is actually fixed (do not roll back)

- `_shared/ncs-i18n.js` / `getPageBucket` en-before-zh — **real fix** (kit PASS).
- Hub pages (home, Primary/Secondary hubs, pricing, argumentation_builder) — **Fix 7 PASS**.
- Six-pack Chem/Phys/Math flagships with `useLang()` — **PASS** with en-fallback for NCS five.

These are **not** excuses for Junior Science batch status.

---

## 6. Corrective actions (board updated)

See [`CEO_LANG_SWITCHER_BOARD.md`](CEO_LANG_SWITCHER_BOARD.md):

- `07_Circuit_Constructor` → **P0 BLANK FAIL**
- `Junior Science/**` batch → **P0 BLANK FAIL** (not VERIFY)
- Sample enrichment rows flagged
- New root-cause category **G** (broken inline JS)

**Definition of done going forward:** Browser load shows LGER tabs + lesson content; **then** lang switch changes chrome; Fix 7 VERIFY **PASS**.

---

## 7. CEO accountability line

**We marked library/integration work as FIXED and implied Form 1–2 lang was wired while the dominant Form 2 delivery path does not execute JavaScript successfully.** That is a **false FIXED** narrative relative to the user’s blank Circuit Constructor. Honesty over ego: treat as **P0 render failure**, not a switcher tweak.

---

*Audit author: CEO watchdog pass (static analysis + git HEAD inspection). Re-run after committing vanilla rebuild or repaired Babel blobs.*
