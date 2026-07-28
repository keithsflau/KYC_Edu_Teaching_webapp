import re
from pathlib import Path
from urllib.parse import unquote

root = Path(r"c:\Users\keith\OneDrive\Github\Profile\HK Cirriculum")
html_files = list(root.rglob("*.html"))
# skip venv
html_files = [p for p in html_files if "venv" not in p.parts and "node_modules" not in p.parts]

pattern = re.compile(r'href="([^"#?]+)"')
broken = []
former_subject_paths = set()
for school in ("Primary_School", "Secondary_School"):
    base = root / school
    for d in base.iterdir():
        if d.is_dir() and (d / "index.html").is_file():
            former_subject_paths.add(f"{school}/{d.name}/index.html".replace("\\", "/"))

# links that look like old subjects directory deep links
subjects_deep = re.compile(r"subjects/.*(Primary_School|Secondary_School)", re.I)

for f in html_files:
    try:
        text = f.read_text(encoding="utf-8", errors="replace")
    except Exception:
        continue
    for href in pattern.findall(text):
        if href.startswith("http") or href.startswith("mailto:") or href.startswith("javascript:"):
            continue
        if subjects_deep.search(href):
            broken.append((str(f.relative_to(root)), href, "stale subjects deep link"))
        # resolve relative to file
        if href.startswith("/"):
            continue  # absolute site paths - skip
        target = (f.parent / unquote(href)).resolve()
        try:
            target.relative_to(root.resolve())
        except ValueError:
            continue
        if not target.exists():
            # common optional assets
            if any(href.endswith(x) for x in (".css", ".js", ".png", ".svg", ".ico")):
                continue
            broken.append((str(f.relative_to(root)), href, "missing target"))

print("Former subject targets:", len(former_subject_paths))
print("HTML files scanned:", len(html_files))
print("Broken relative links (sample max 30):", len(broken))
for row in broken[:30]:
    print(row)
