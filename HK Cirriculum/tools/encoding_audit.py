"""Scan HK Cirriculum HTML for charset / UTF-8 / mojibake issues."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP = {"node_modules", "_archive"}
CHARSET_RE = re.compile(r"<meta[^>]+charset", re.I)
TRUE_MOJI = re.compile(r"Ã[\x80-\xbf]|â€|ï¼|æ–|å¸|é™|ï¿½")

def rel(p: Path) -> str:
    return p.relative_to(ROOT).as_posix()

not_utf8, missing, not_first, moji, ufffd = [], [], [], [], []
for path in ROOT.rglob("*.html"):
    if any(s in path.parts for s in SKIP):
        continue
    try:
        text = path.read_bytes().decode("utf-8")
    except UnicodeDecodeError:
        not_utf8.append(rel(path))
        continue
    head_m = re.search(r"<head[^>]*>(.*?)</head>", text, re.I | re.S)
    if head_m:
        inner = head_m.group(1)
        if not CHARSET_RE.search(inner):
            missing.append(rel(path))
        stripped = re.sub(r"^\s+", "", inner)
        stripped = re.sub(r"^<!--.*?-->\s*", "", stripped, flags=re.S)
        if not re.match(r"<meta[^>]+charset", stripped, re.I):
            not_first.append(rel(path))
    elif not CHARSET_RE.search(text[:3000]):
        missing.append(rel(path))
    if TRUE_MOJI.search(text):
        moji.append(rel(path))
    n = text.count("\ufffd")
    if n:
        ufffd.append((rel(path), n))

print("not_utf8", len(not_utf8))
print("missing_charset", len(missing))
print("charset_not_first", len(not_first))
print("mojibake", len(moji))
print("ufffd_files", len(ufffd))
