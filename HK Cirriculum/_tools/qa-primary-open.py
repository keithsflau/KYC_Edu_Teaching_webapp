"""Scan Primary GS/Math/English apps for open failures."""
from __future__ import annotations

import os
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "Primary_School"
SUBJECTS = ("General_Studies", "Mathematics", "English")
SKIP_DIRS = {"node_modules", "dist", "_archive", "_legacy"}
BASE_URL = "http://localhost:5173"


def scan() -> tuple[dict, list[dict]]:
    counts = {
        "total": 0,
        "ok": 0,
        "tiny_html": 0,
        "no_mount": 0,
        "malformed": 0,
        "abs_path": 0,
        "broken_links": 0,
    }
    issues: list[dict] = []

    for subject in SUBJECTS:
        root = BASE / subject
        if not root.is_dir():
            continue
        for dirpath, dirs, files in os.walk(root):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            if "index.html" not in files:
                continue
            app_dir = Path(dirpath)
            rel = app_dir.relative_to(BASE.parent).as_posix()
            if app_dir == root:
                continue
            counts["total"] += 1
            html_path = app_dir / "index.html"
            raw = html_path.read_bytes()
            size = len(raw)
            try:
                html = raw.decode("utf-8")
            except UnicodeDecodeError:
                issues.append(
                    {"rel": rel, "classes": ["decode_error"], "size": size}
                )
                continue

            classes: list[str] = []
            if size < 2000:
                classes.append("tiny_html")
                counts["tiny_html"] += 1
            if (
                '<div id="root"></div>' in html
                and "createRoot" not in html
                and "ReactDOM.render" not in html
            ):
                classes.append("no_react_mount")
                counts["no_mount"] += 1
            if "<html" in html.lower() and "</body>" not in html.lower():
                classes.append("malformed_html")
                counts["malformed"] += 1
            if re.search(r'(?:src|href)=["\']/[^"\']+', html):
                classes.append("absolute_path")
                counts["abs_path"] += 1

            broken: list[str] = []
            for link in re.findall(r'(?:src|href)=["\']([^"\']+)["\']', html, re.I):
                if link.startswith(("http://", "https://", "data:", "#", "mailto:")):
                    continue
                target = (app_dir / link.split("?")[0].split("#")[0]).resolve()
                if not target.exists():
                    broken.append(link)
            if broken:
                classes.append("broken_links")
                counts["broken_links"] += 1

            if classes:
                issues.append(
                    {
                        "rel": rel,
                        "classes": classes,
                        "broken": broken[:5],
                        "size": size,
                    }
                )
            else:
                counts["ok"] += 1

    return counts, issues


if __name__ == "__main__":
    counts, issues = scan()
    print("COUNTS", counts)
    print("ISSUE_COUNT", len(issues))
    for row in issues:
        print(row)
