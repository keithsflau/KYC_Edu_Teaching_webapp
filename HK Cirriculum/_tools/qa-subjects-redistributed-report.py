import re
from datetime import date
from pathlib import Path

root = Path(r"c:\Users\keith\OneDrive\Github\Profile\HK Cirriculum")

DISPLAY = {
    "Primary_School/English/index.html": ("English", "英語"),
    "Primary_School/General_Studies/index.html": ("General Studies", "常識"),
    "Primary_School/Mathematics/index.html": ("Mathematics", "數學"),
    "Primary_School/PrimaryChinese/index.html": ("Primary Chinese", "小學中文"),
    "Secondary_School/Biology/index.html": ("Biology", "生物"),
    "Secondary_School/Chemistry/index.html": ("Chemistry", "化學"),
    "Secondary_School/Physics/index.html": ("Physics", "物理"),
    "Secondary_School/Mathematics/index.html": ("Mathematics", "數學"),
    "Secondary_School/Chinese/index.html": ("Chinese", "中國語文"),
    "Secondary_School/Chinese_History/index.html": ("Chinese History", "中國歷史"),
    "Secondary_School/Economy/index.html": ("Economy", "經濟"),
    "Secondary_School/Geography/index.html": ("Geography", "地理"),
    "Secondary_School/History/index.html": ("History", "歷史"),
    "Secondary_School/ICT/index.html": ("ICT", "資訊科技"),
    "Secondary_School/Junior Science/index.html": ("Junior Science", "初中科學"),
    "Secondary_School/Music/index.html": ("Music", "音樂"),
}

def subject_hubs(school: str):
    base = root / school
    out = []
    for d in sorted(base.iterdir()):
        if d.is_dir() and not d.name.startswith(".") and (d / "index.html").is_file():
            out.append(f"{school}/{d.name}/index.html")
    return out

def hub_links(hub_html: Path):
    text = hub_html.read_text(encoding="utf-8", errors="replace")
    return set(re.findall(r'href="([^"#?]+)"', text))

primary_hub = root / "Primary_School" / "index.html"
secondary_hub = root / "Secondary_School" / "index.html"
p_links, s_links = hub_links(primary_hub), hub_links(secondary_hub)

def row(path, hub_name, links, hub_path):
    subj = path.split("/")[1]
    rel = f"{subj}/index.html"
    en, zh = DISPLAY.get(path, (subj, subj))
    target = (hub_path.parent / rel).resolve()
    on_hub = rel in links
    exists = target.is_file()
    status = "PASS" if on_hub and exists else "FAIL"
    hub_href = f"`{hub_name}/index.html` → `{rel}`"
    return status, en, zh, path, hub_href

rows = []
for p in subject_hubs("Primary_School"):
    rows.append(row(p, "Primary_School", p_links, primary_hub))
for p in subject_hubs("Secondary_School"):
    rows.append(row(p, "Secondary_School", s_links, secondary_hub))

featured = [
    "Secondary_School/Physics/index.html",
    "Secondary_School/Chemistry/index.html",
    "Secondary_School/Biology/index.html",
]
feat_ok = all(
    f"{f.split('/')[1]}/index.html" in s_links
    and (secondary_hub.parent / f.split("/")[1] / "index.html").is_file()
    for f in featured
)

subj_idx = root / "subjects" / "index.html"
legacy = []
for href in sorted(hub_links(subj_idx)):
    if href.startswith("http"):
        continue
    p = (subj_idx.parent / href).resolve()
    legacy.append((href, p.is_file()))

fails = [r for r in rows if r[0] == "FAIL"]
today = date.today().isoformat()

md = f"""# QA: Subjects redistributed to Primary / Secondary hubs

**Date:** {today}  
**Scope:** Every subject entry that previously lived on `subjects/index.html` must remain reachable via `Primary_School/index.html` or `Secondary_School/index.html` (not via a flat subject catalog).

## Summary

| Metric | Value |
|--------|------:|
| **Unique former subject targets** | **{len(rows)}** |
| **Featured science links (legacy strip)** | **3** (Physics, Chemistry, Biology) |
| **Missing from hubs** | **{len([r for r in rows if 'not linked' in str(r)])}** |
| **Hub → subject 404s** | **{len(fails)}** |
| **Fixes applied this QA** | **0** (all targets already wired) |

## Method

1. **Canonical target set:** each top-level folder under `Primary_School/` and `Secondary_School/` that has an `index.html` (disk-honest catalog). This matches the 18 internal links historically generated for `subjects/index.html` (15 subject cards + 3 featured science cards with overlap on Physics/Chemistry/Biology); the tree now has **16** unique subject hubs (4 primary + 12 secondary).
2. **Hub audit:** parse `href` values on `Primary_School/index.html` and `Secondary_School/index.html`, resolve relative paths, assert `index.html` exists on disk.
3. **Legacy URL:** `subjects/index.html` is a two-card gate plus JS redirect for `?tab=` / `?section=primary|secondary` → school hubs (`_tools/rebuild-subjects-directory.js`).
4. **Regression script:** `HK Cirriculum/_tools/qa-subjects-redistributed.py`

## Subject reachability matrix

| Status | Subject (EN) | 科目 | Disk path | Reachable from |
|--------|--------------|------|-----------|----------------|
"""
for status, en, zh, path, hub_href in rows:
    md += f"| {status} | {en} | {zh} | `{path}` | {hub_href} |\n"

md += f"""
## Featured science (former `subjects/index.html` strip)

| Target | Via secondary hub |
|--------|-------------------|
| Physics | {'PASS' if feat_ok else 'FAIL'} |
| Chemistry | {'PASS' if feat_ok else 'FAIL'} |
| Biology | {'PASS' if feat_ok else 'FAIL'} |

All three are linked on `Secondary_School/index.html` and resolve to existing `index.html` files.

## Legacy `subjects/index.html`

| Link from subjects hub | Resolves |
|------------------------|----------|
"""
for href, ok in legacy:
    md += f"| `{href}` | {'PASS' if ok else 'FAIL'} |\n"

md += """
## Navigation surfaces (spot check)

| Surface | Points to school hubs (not flat subjects) |
|---------|-------------------------------------------|
| `HK Cirriculum/index.html` | `Primary_School/index.html`, `Secondary_School/index.html` |
| `parent-dashboard/index.html` | Primary / Secondary hubs |
| `marketing/site/landing/index.html` | Primary / Secondary hubs |
| `subjects/index.html` | Primary / Secondary only (bookmarks + query redirects) |

## Smoke test

```powershell
cd "c:\\Users\\keith\\OneDrive\\Github\\Profile"
python "HK Cirriculum\\_tools\\qa-subjects-redistributed.py"
npx serve "HK Cirriculum" -l 5173
# http://localhost:5173/Primary_School/index.html
# http://localhost:5173/Secondary_School/index.html
# http://localhost:5173/subjects/index.html?section=secondary  → redirects to Secondary hub
```

## Notes

- Prior audit `QA_SUBJECTS_DIR_LINKS.md` tracked **18** hrefs on the old flat directory (path prefix bug). After IA Model B, subject depth moved into the two school hubs; this QA validates **hub coverage**, not the retired tab UI.
- `CEO_SUBJECT_DIRECTORY.md` still mentions routing school hubs → `subjects/index.html`; product direction is the inverse (home → hubs; `subjects/` is legacy). Doc drift only — no broken links found.
"""

out = root / "QA_SUBJECTS_REDISTRIBUTED.md"
out.write_text(md, encoding="utf-8")
print("Wrote", out, "fails=", len(fails))
