#!/usr/bin/env python3
"""QA audit for Form 3 Junior Science rebuild apps."""
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "Secondary_School" / "Junior Science" / "Form 3"


def check_app(app_dir: Path) -> dict:
    idx = app_dir / "index.html"
    name = app_dir.name
    issues = []
    if not idx.exists():
        return {"app": name, "status": "FAIL", "issues": ["missing index.html"]}

    text = idx.read_text(encoding="utf-8", errors="replace")
    size = idx.stat().st_size

    if size < 500:
        issues.append("file too small/blank")
    if "<!DOCTYPE html>" not in text and "<!doctype html>" not in text.lower():
        issues.append("no DOCTYPE")
    if 'id="root"' not in text and "id='root'" not in text:
        issues.append("no #root mount")

    has_jslger = "JSLGER" in text and "Shell" in text
    has_learn = bool(re.search(r"const\s+LEARN\s*=", text))
    has_guided = bool(re.search(r"const\s+GUIDED\s*=", text))
    has_review = bool(re.search(r"const\s+REVIEW\s*=", text))
    has_experiment = (
        "ExperimentLab" in text
        or "function ExperimentLab" in text
        or bool(re.search(r"const\s+EXPERIMENT\s*=", text))
        or "experiment={p =>" in text
        or "experiment={p=>" in text
    )
    if not has_jslger:
        issues.append("missing JSLGER.Shell")
    if not has_learn:
        issues.append("missing LEARN")
    if not has_guided:
        issues.append("missing GUIDED")
    if not has_review:
        issues.append("missing REVIEW")
    if not has_experiment:
        issues.append("missing ExperimentLab")

    guided_count = len(re.findall(r"const\s+GUIDED\s*=", text))
    if guided_count > 1:
        issues.append(f"duplicate GUIDED blocks ({guided_count})")

    ncs_checks = [
        ("ncs-i18n.js", "ncs-i18n.js" in text),
        ("ncs-i18n.css", "ncs-i18n.css" in text),
        ('data-ncs-kit="fleet"', 'data-ncs-kit="fleet"' in text),
        ("NcsI18n.init", "NcsI18n.init" in text),
        ("ncs-chrome.json path", "ncs-chrome.json" in text),
    ]
    for label, ok in ncs_checks:
        if not ok:
            issues.append(f"missing NCS: {label}")

    broken = []
    for m in re.finditer(r'(?:src|href)="([^"#?]+)"', text):
        ref = m.group(1)
        if ref.startswith(("http://", "https://", "//", "data:", "mailto:")):
            continue
        target = (app_dir / ref).resolve()
        if not target.exists():
            broken.append(ref)
    if broken:
        suffix = "..." if len(broken) > 5 else ""
        issues.append("broken paths: " + ", ".join(broken[:5]) + suffix)

    cdns = ["cdn.tailwindcss.com", "react@18", "react-dom@18", "babel"]
    missing_cdn = [c for c in cdns if c not in text]
    if missing_cdn:
        issues.append("missing CDN refs: " + ", ".join(missing_cdn))

    status = "PASS" if not issues else "FAIL"
    return {
        "app": name,
        "status": status,
        "issues": issues,
        "size_kb": round(size / 1024, 1),
        "guided_count": guided_count,
    }


CANONICAL_APPS = {
    "01_Healthy_Lifestyle",
    "02_Food_Substances",
    "03_Digestion",
    "04_Balanced_Diet",
    "05_Disease_Prevention",
    "06_Biotechnology",
    "07_Atoms_Elements",
    "08_Periodic_Table",
    "09_Compounds",
    "10_Metals",
    "11_Alloys_Materials",
    "12_Light_Sources",
    "13_Reflection",
    "14_Refraction",
    "15_Total_Internal_Reflection",
    "16_Lenses",
    "17_EM_Waves",
    "18_Light_Technology",
}


def is_canonical_app(name: str) -> bool:
    return name in CANONICAL_APPS


def check_hub() -> dict:
    idx = BASE / "index.html"
    if not idx.exists():
        return {"app": "hub (index.html)", "status": "FAIL", "issues": ["missing hub"]}
    text = idx.read_text(encoding="utf-8", errors="replace")
    issues = []
    broken = []
    for m in re.finditer(r'href="(\d{2}_[^"/]+/index\.html)"', text):
        ref = m.group(1)
        if not (BASE / ref.split("/")[0] / "index.html").exists():
            broken.append(ref)
    if broken:
        issues.append("broken hub links: " + ", ".join(broken[:8]) + ("..." if len(broken) > 8 else ""))
    if "ncs-i18n.js" not in text:
        issues.append("missing NCS on hub")
    return {
        "app": "hub (index.html)",
        "status": "PASS" if not issues else "FAIL",
        "issues": issues,
        "size_kb": round(idx.stat().st_size / 1024, 1),
    }


def main() -> None:
    apps = sorted(
        [
            d
            for d in BASE.iterdir()
            if d.is_dir() and (d / "index.html").exists() and is_canonical_app(d.name)
        ],
        key=lambda p: p.name,
    )
    results = [check_app(app) for app in apps]
    results.append(check_hub())
    pass_n = sum(1 for r in results if r["status"] == "PASS")
    fail_n = sum(1 for r in results if r["status"] == "FAIL")
    print(f"Total apps: {len(results)} | PASS: {pass_n} | FAIL: {fail_n}\n")
    for r in results:
        extra = f" ({r['size_kb']}KB)" if r.get("size_kb", 0) > 500 else ""
        print(f"{r['status']} {r['app']}{extra}")
        for issue in r.get("issues", []):
            print(f"    - {issue}")
    print("\n---JSON---")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
