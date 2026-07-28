# QA Report: Double-Nested Link Sweep (HK Cirriculum)

Date: 2026-07-28
Trigger: 404 screenshot showing `HK Cirriculum/HK Cirriculum/Primary_School/index.html`

## Root Cause

`HK Cirriculum/index.html` contained links such as `HK%20Cirriculum/Primary_School/index.html`,
written as if the page sat at the repo root. Because the file lives inside `HK Cirriculum/`,
those paths resolved to `HK Cirriculum/HK Cirriculum/...` and 404'd.

## Fix Applied (prior to this sweep)

- `HK Cirriculum/index.html` — nav, CTA, subject cards, and footer links converted to
  relative paths (e.g. `Primary_School/index.html`, `pricing/index.html`).

**Files fixed for double-nesting: 1**

## Files Checked This Sweep

| File | Result |
| --- | --- |
| `HK Cirriculum/index.html` | PASS — no `HK%20Cirriculum/` or `HK Cirriculum/` self-references remain; all hrefs relative |
| `HK Cirriculum/Primary_School/index.html` | PASS — redirect stub uses `../subjects/index.html?tab=primary` (correct relative) |
| `HK Cirriculum/Secondary_School/index.html` | PASS — redirect stub uses `../subjects/index.html?tab=secondary` (correct relative) |
| `HK Cirriculum/subjects/index.html` | PASS — 15 unique subject links, all `../Primary_School/...` / `../Secondary_School/...`; all 15 targets verified on disk |
| `index.html` (repo root) | PASS — `HK%20Cirriculum/index.html` redirect is correct from repo root |
| `Primary_School/index.html` (repo root) | PASS — `../HK Cirriculum/Primary_School/index.html` resolves to `/HK Cirriculum/Primary_School/`; correct |
| `Secondary_School/index.html` (repo root) | PASS — same pattern; correct |

## Full-Subtree Scan

- HTML files under `HK Cirriculum/` scanned: **1,354**
- Files containing `HK%20Cirriculum` or `HK Cirriculum/` path references: **0**
- Repo-wide scan of all `*.html`: no double-nesting patterns remain anywhere.

**Remaining double-nesting issues: 0**

## Link-Target Verification (`HK Cirriculum/index.html`)

Working (target exists):

- `./index.html` (brand link)
- `pricing/index.html`
- `Primary_School/index.html`
- `Secondary_School/index.html`

## Separate Finding (NOT double-nesting — pre-existing content gap)

These 5 hrefs in `HK Cirriculum/index.html` point to pages that do not exist anywhere
in the repo (checked both at repo root and inside `HK Cirriculum/`):

1. `marketing/site/landing/index.html` (nav link + hero CTA `index.html#demos`)
2. `marketing/site/schools/index.html` (nav)
3. `marketing/site/privacy/index.html` (footer)
4. `marketing/CEO_MARKETING_PLAYBOOK.md` (footer)
5. `parent-dashboard/index.html` (nav + card)

These will 404 until the marketing/parent-dashboard pages are created. Recommend either
creating stub pages or temporarily pointing these links at existing content
(e.g. `parent.html` for the dashboard links).

## Minor Note (cosmetic, functional as-is)

The two repo-root stubs (`Primary_School/index.html`, `Secondary_School/index.html`)
use raw spaces in URLs (`../HK Cirriculum/...`) instead of `%20`. Browsers auto-encode
spaces in hrefs and meta-refresh URLs, so they work; encoding to `%20` would be
strictly cleaner but is not required.

## Verdict

Double-nesting bug is fully resolved. No additional files required fixes during this sweep.
