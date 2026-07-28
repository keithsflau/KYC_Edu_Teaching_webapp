import re
from pathlib import Path

root = Path(r"c:\Users\keith\OneDrive\Github\Profile\HK Cirriculum")

def subject_hubs(school: str):
    base = root / school
    hubs = []
    for d in sorted(base.iterdir()):
        if d.is_dir() and not d.name.startswith("."):
            if (d / "index.html").is_file():
                hubs.append(f"{school}/{d.name}/index.html")
    return hubs

former_primary = subject_hubs("Primary_School")
former_secondary = subject_hubs("Secondary_School")

def hub_links(hub_html: Path):
    text = hub_html.read_text(encoding="utf-8", errors="replace")
    return set(re.findall(r'href="([^"#?]+)"', text))

primary_hub = root / "Primary_School" / "index.html"
secondary_hub = root / "Secondary_School" / "index.html"
p_links = hub_links(primary_hub)
s_links = hub_links(secondary_hub)

def resolve_from_hub(hub_path: Path, href: str):
    if href.startswith("http") or href.startswith(".."):
        return None
    return (hub_path.parent / href).resolve()

issues = []
for h in former_primary:
    subj = h.split("/")[1]
    rel = f"{subj}/index.html"
    if rel not in p_links:
        issues.append(("primary", f"not linked: {rel}"))
    else:
        p = resolve_from_hub(primary_hub, rel)
        if not p or not p.is_file():
            issues.append(("primary", f"404: {rel} -> {p}"))

for h in former_secondary:
    subj = h.split("/")[1]
    rel = f"{subj}/index.html"
    if rel not in s_links:
        issues.append(("secondary", f"not linked: {rel}"))
    else:
        p = resolve_from_hub(secondary_hub, rel)
        if not p or not p.is_file():
            issues.append(("secondary", f"404: {rel} -> {p}"))

subj_idx = root / "subjects" / "index.html"
for href in hub_links(subj_idx):
    if href.startswith("http"):
        continue
    p = (subj_idx.parent / href).resolve()
    if not p.is_file():
        issues.append(("subjects", f"404: {href}"))

print("PRIMARY", len(former_primary), "SECONDARY", len(former_secondary))
print("ISSUES", len(issues))
for i in issues:
    print(i)

# Former 18-link catalog (QA_SUBJECTS_DIR_LINKS): 3 featured + 15 cards
featured = [
    "Secondary_School/Physics/index.html",
    "Secondary_School/Chemistry/index.html",
    "Secondary_School/Biology/index.html",
]
all_former = former_primary + former_secondary
print("featured reachable from secondary hub:")
for f in featured:
    subj = f.split("/")[1]
    rel = f"{subj}/index.html"
    ok = rel in s_links and resolve_from_hub(secondary_hub, rel).is_file()
    print(" ", f, "OK" if ok else "FAIL")
print("total unique former subject targets:", len(all_former))
