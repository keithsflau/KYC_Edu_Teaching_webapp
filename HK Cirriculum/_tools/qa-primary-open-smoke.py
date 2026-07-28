"""HTTP smoke + open-fail scan for Primary GS/Math/English."""
from __future__ import annotations

import json
import os
import random
import re
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

BASE = Path(__file__).resolve().parent.parent
PRIMARY = BASE / "Primary_School"
SUBJECTS = ("General_Studies", "Mathematics", "English")
SKIP_DIRS = {"node_modules", "_archive", "_legacy"}
BASE_URL = "http://localhost:5173"
PRIORITY = [
    "Primary_School/General_Studies/P1/26_Magnet_Fun",
    "Primary_School/General_Studies/P1/29_Flag_Raising",
    "Primary_School/English/index.html",
    "Primary_School/English/English Oral Tutor",
    "Primary_School/English/English_Vocabulary/dist",
    "Primary_School/Mathematics/P3/41_Fraction_Pizza_Share",
]


def list_apps() -> list[str]:
    apps: list[str] = []
    for subject in SUBJECTS:
        root = PRIMARY / subject
        if not root.is_dir():
            continue
        for dirpath, dirs, files in os.walk(root):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS and d != "dist"]
            if "index.html" not in files:
                continue
            app_dir = Path(dirpath)
            if app_dir == root:
                continue
            apps.append(app_dir.relative_to(BASE).as_posix())
    return apps


def http_status(rel: str) -> int | None:
    url = f"{BASE_URL}/{rel}/index.html" if not rel.endswith(".html") else f"{BASE_URL}/{rel}"
    try:
        with urlopen(url, timeout=8) as resp:
            return resp.status
    except URLError:
        return None


def static_issues(rel: str) -> list[str]:
    app_dir = BASE / rel.replace("/", os.sep)
    html_path = app_dir / "index.html"
    if not html_path.is_file():
        return ["missing_index"]
    raw = html_path.read_bytes()
    html = raw.decode("utf-8", errors="replace")
    issues: list[str] = []
    if len(raw) < 2000 and "http-equiv=\"refresh\"" not in html.lower():
        issues.append("tiny_html")
    if "<html" in html.lower() and "</body>" not in html.lower():
        issues.append("malformed_html")
    if (
        '<div id="root"></div>' in html
        and "createRoot" not in html
        and "ReactDOM.render" not in html
        and 'type="module"' not in html
    ):
        issues.append("no_mount")
    broken = []
    for link in re.findall(r'(?:src|href)=["\']([^"\']+)["\']', html, re.I):
        if link.startswith(("http://", "https://", "data:", "#", "mailto:", "${")):
            continue
        target = (app_dir / link.split("?")[0].split("#")[0]).resolve()
        if not target.exists():
            broken.append(link)
    if broken:
        issues.append("broken_links")
    return issues


def main() -> None:
    apps = list_apps()
    rng = random.Random(42)
    sample = rng.sample(apps, min(30, len(apps)))
    targets = list(dict.fromkeys(PRIORITY + sample))

    rows = []
    for rel in targets:
        status = http_status(rel)
        issues = static_issues(rel if not rel.endswith(".html") else rel.rsplit("/", 1)[0])
        rows.append(
            {
                "rel": rel,
                "http": status,
                "static_issues": issues,
                "ok": status == 200 and not issues,
            }
        )

    out = {
        "base_url": BASE_URL,
        "scanned_apps_total": len(apps),
        "http_tested": len(rows),
        "http_pass": sum(1 for r in rows if r["http"] == 200),
        "static_fail": [r for r in rows if r["static_issues"]],
        "priority": [r for r in rows if r["rel"] in PRIORITY],
        "sample": rows,
    }
    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
