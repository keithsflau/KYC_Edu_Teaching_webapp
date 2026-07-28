# QA TFZ Repair Report

**Date:** 2026-07-28  
**Tool:** `_tools/repair-tfz-corrupt.js`  
**Policy:** Prefer runnable restore over half-fixed TFZ. Never touch `09_Chemical_Equilibrium_Kc`. Did **not** re-run `tfz-science-upgrade.js`.

## Do not trust CEO_TFZ_SCIENCE.md

CEO claimed **43** TFZ Science upgrades PASS. On-disk QA (`QA_TFZ_SCIENCE.md` / `QA_TFZ_SCIENCE_RECHECK.md`) found **corrupt mid-expression** `{mode === "learn" && (<LearnFromZero` splices from `tfz-science-upgrade.js` learn-section replace. Soft-launch pack (Kc / some Interactive Labs) was real; fleet PASS counts were **not**.

## Critical disk finding

During repair, many `index.html` files had already been overwritten with **non-runnable** `_legacy_thin_learn.html` **audit stubs** ("Archived thin Learn" + `<pre>` snippets — produced by `buildLegacyHtml` in the upgrade script). Those stubs are **not** valid pre-upgrade apps.

Separately, a large portion of `HK Cirriculum/Secondary_School` (including **Chemistry** and `_tools`) disappeared from the working tree mid-session (OneDrive/sync or parallel agent). Kc was intact earlier (~37KB) then Chemistry vanished from disk.

## Counts (this repair run)

| Action | N |
|--------|---|
| Restored (Cursor local history / runnable legacy) | **0** |
| Script-fixed (`learn-from-zero.js` inject or strip) | **0** |
| Still broken (on disk, unrepaired) | **0** |
| Expected apps **missing on disk** | **3** |
| Index files scanned | 702 |

Dry-run: `false`

## Restored paths

_None_

## Script-fixed paths

_None_

## Still broken (present)

_None_

## Missing on disk (cannot repair until tree returns)

- `Chemistry/Form 5/11_Entropy_Spontaneity/index.html` — path-missing-on-disk
- `Chemistry/Form 4/10_Mole_Concept/index.html` — path-missing-on-disk
- `Chemistry/Form 5/07_Solubility_Product/index.html` — path-missing-on-disk

## Shared asset

- `common/learn-from-zero.js` — `window.LearnFromZero` UMD for Babel apps missing an in-file def.

## Next actions (blocking)

1. **Stop further deletes / sync overwrites** of `HK Cirriculum`.
2. **Restore Chemistry tree** (incl. Kc) from OneDrive version history / backup — Kc was never to be touched but is currently absent from disk.
3. Re-run `node HK\ Cirriculum/_tools/repair-tfz-corrupt.js` after Chemistry/Physics fleet files are back.
4. Do **not** restore from archive-stub `_legacy_thin_learn.html` files.
