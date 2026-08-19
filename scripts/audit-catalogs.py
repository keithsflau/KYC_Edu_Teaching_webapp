"""Compare each catalog index.html to sibling folders that have an index."""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SKIP = {"node_modules", "venv", ".venv", ".git", "dist", "common", "shared", "scripts"}
HREF_RE = re.compile(r'''href\s*=\s*(?:"([^"]+)"|'([^']+)')''', re.I)


def is_external(url: str) -> bool:
    return bool(urlparse(url).scheme) or url.startswith(("//", "mailto:", "tel:", "javascript:", "data:", "#"))


def linked_dirs(index: Path) -> set[str]:
    text = index.read_text(encoding="utf-8", errors="replace")
    out = set()
    for a, b in HREF_RE.findall(text):
        raw = a or b
        if is_external(raw):
            continue
        url = unquote(raw.split("#", 1)[0].split("?", 1)[0])
        if not url or "${" in url:
            continue
        target = (index.parent / url).resolve()
        base = index.parent.resolve()
        try:
            if target.is_file():
                rel = target.parent.relative_to(base)
                out.add(rel.parts[0] if rel.parts else ".")
            elif target.is_dir():
                rel = target.relative_to(base)
                out.add(rel.parts[0] if rel.parts else ".")
        except ValueError:
            continue
    return out


def child_apps(folder: Path) -> list[str]:
    names = []
    for child in sorted(folder.iterdir()):
        if not child.is_dir() or child.name in SKIP:
            continue
        if (child / "index.html").exists() or (child / "dist" / "index.html").exists():
            names.append(child.name)
    return names


def walk_indexes(start: Path):
    for p in start.rglob("index.html"):
        if any(part in SKIP for part in p.parts):
            continue
        yield p


def main() -> None:
    missing_cards = []
    broken = []
    for index in walk_indexes(ROOT):
        parent = index.parent
        apps = child_apps(parent)
        if not apps:
            continue
        linked = linked_dirs(index)
        for name in apps:
            if name not in linked and name != parent.name:
                missing_cards.append((str(index.relative_to(ROOT)), name))
        text = index.read_text(encoding="utf-8", errors="replace")
        for a, b in HREF_RE.findall(text):
            raw = a or b
            if is_external(raw) or "${" in raw:
                continue
            url = unquote(raw.split("#", 1)[0].split("?", 1)[0])
            if not url:
                continue
            target = (parent / url).resolve()
            if not target.exists():
                broken.append((str(index.relative_to(ROOT)), raw))

    print("BROKEN_HREF", len(broken))
    for row in broken:
        print("BROKEN", *row)
    print("UNLINKED_APPS", len(missing_cards))
    for row in missing_cards:
        print("UNLINKED", *row)


if __name__ == "__main__":
    main()
