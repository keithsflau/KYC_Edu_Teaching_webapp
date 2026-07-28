# Sayo-like Subject Directory IA Rules

## Overview
This document defines the Information Architecture (IA) rules for the Sayo-like Subject Directory.

## Hierarchy
1. **Primary/Secondary (中學 / 小學)**: The top-level toggle (Tabs).
2. **Subject (分科)**: The next level of grouping (e.g., Physics, Mathematics, General Studies).
3. **Level (分級)**: Forms (F1–F6) for Secondary, and Primary Levels (P1–P6) for Primary.
4. **App/Resource**: The individual interactive lab or learning module.

## Rules
- **Disk-Honest Counts**: The directory must reflect the actual files on disk. If an app exists (has an `index.html`), it counts towards the total.
- **Featured Science Interactive Labs**: Secondary school view must include a highlighted strip for Science Interactive Labs (Physics, Chemistry, Biology) showing counts or quick access.
- **Bilingual Support**: All UI elements must be in English and Traditional Chinese (zh-HK).
- **No Purple Mush**: Professional color palette. Avoid excessive gradients, particularly AI-typical purple/pink blends.
- **Mobile OK**: The UI must be responsive.
- **Data Source**: Use `_tools/rebuild-subjects-directory.js` to scan the filesystem and rebuild the static HTML.
- **Routing**: `Primary_School/index.html` and `Secondary_School/index.html` should redirect to `subjects/index.html?tab=primary` and `subjects/index.html?tab=secondary`.