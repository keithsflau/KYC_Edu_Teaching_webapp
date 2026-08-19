"""Audit local href/src targets in HTML catalog pages."""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {"node_modules", "venv", ".venv", ".git", "dist"}
HREF_RE = re.compile(r"""(?:href|src)\s*=\s*['"]([^'"]+)['"]""", re.I)

ENTRY_PAGES = [
    ROOT / "index.html",
    ROOT / "Primary_School" / "index.html",
    ROOT / "Secondary_School" / "index.html",
    ROOT / "typing test" / "index.html",
]


def is_external(url: str) -> bool:
    return bool(urlparse(url).scheme) or url.startswith("//") or url.startswith("mailto:") or url.startswith("tel:") or url.startswith("data:") or url.startswith("javascript:")


def iter_html(start: Path):
    for p in start.rglob("*.html"):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        yield p


def resolve_target(page: Path, raw: str) -> Path | None:
    url = raw.strip()
    if not url or url.startswith("#") or is_external(url):
        return None
    url = url.split("#", 1)[0].split("?", 1)[0]
    url = unquote(url)
    if not url:
        return None
    return (page.parent / url).resolve()


def main() -> None:
    missing: list[tuple[str, str, str]] = []
    seen_pages: set[Path] = set()
    queue = [p for p in ENTRY_PAGES if p.exists()]

    while queue:
        page = queue.pop()
        try:
            page = page.resolve()
        except OSError:
            continue
        if page in seen_pages or not page.is_file():
            continue
        seen_pages.add(page)
        try:
            text = page.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for raw in HREF_RE.findall(text):
            target = resolve_target(page, raw)
            if target is None:
                continue
            try:
                rel_page = page.relative_to(ROOT)
                rel_target = target.relative_to(ROOT) if str(target).startswith(str(ROOT)) else target
            except ValueError:
                rel_page = page
                rel_target = target
            if not target.exists():
                missing.append((str(rel_page), raw, str(rel_target)))
                continue
            if target.suffix.lower() in {".html", ".htm"} and ROOT in target.parents:
                queue.append(target)

    print(f"pages_crawled {len(seen_pages)}")
    print(f"missing {len(missing)}")
    for page, raw, target in missing:
        print(f"MISSING\t{page}\t{raw}\t{target}")


if __name__ == "__main__":
    main()
