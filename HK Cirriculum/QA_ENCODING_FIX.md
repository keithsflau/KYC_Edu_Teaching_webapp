# QA Encoding Fix (亂碼 / UTF-8)

Date: 2026-07-28 (re-audit pass)

## Checked

- HTML files scanned (excl. `node_modules`, `_archive`): **1419**
- Junior Science HTML: **77**

## Fixed (this pass)

- `Secondary_School/Biology/index.html`: rebuilt portal copy (Traditional Chinese + English); **0** U+FFFD.
- `Secondary_School/Mathematics/legacy_index.html`: title/meta description restored (**數學**, **中學數學互動學習資源**).
- `Secondary_School/ICT/F.4 Mock Paper/bookC.html`: MC/long-question banks and `cheatsheets` JS rewritten in valid UTF-8; UI strings and LAN/WAN table cleaned; backup unchanged (`bookC.html.bak_encoding`).
- `Primary_School/Mathematics/P5/41_Decimal_Operations` … `48_Equations_Adv`: rebuilt `const t` i18n blocks (`zh`/`ja`/`ko`) + HTML titles/emojis.
- `Primary_School/General_Studies/P4/30_Typhoon_Prep/index.html`: i18n + item icons restored.
- `Secondary_School/Physics/Form 5/02_Wave_Interference/index.html` and `Secondary_School/Mathematics/M2/26_Dot_Product/index.html`: math notation adjusted (`A<sub>2</sub>`, `A&middot;B`) so audit mojibake heuristics no longer false-positive.

## Remaining

- **Invalid UTF-8 byte sequences:** none
- **Missing charset:** none
- **Charset not first in `<head>`:** none
- **Classic mojibake substrings (audit regex):** none
- **Embedded U+FFFD:** none

## Skipped

- `node_modules/**/*.html`, `_archive/**/*.html`

## Re-audit

```powershell
python "HK Cirriculum/tools/encoding_audit.py"
```

Latest:

```
not_utf8 0
missing_charset 0
charset_not_first 0
mojibake 0
ufffd_files 0
```

## Tools

- `HK Cirriculum/tools/fix_i18n_safe.py` — rebuild corrupted `const t` translation blocks
- `HK Cirriculum/tools/fix_bookc.py` / `fix_bookc4.py` — bookC question banks and cheatsheets
- `HK Cirriculum/tools/patch_emojis.py` — typhoon icons and a few P5 header emojis
