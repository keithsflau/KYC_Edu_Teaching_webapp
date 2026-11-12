import re
import json
import collections
import zipfile
from html import unescape


EPUB_PATH = r"c:\Users\keith\OneDrive\Desktop\Profile\bible_study\信仰分享\聖經論\cmn-cu89t.epub"
OUTPUT_JSON = r"c:\Users\keith\OneDrive\Desktop\Profile\bible_study\信仰分享\聖經論\cuv_top20_words.json"


def is_chinese_char(ch: str) -> bool:
    return "\u4e00" <= ch <= "\u9fff"


def strip_tags(html: str) -> str:
    # Remove scripts/styles
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.DOTALL | re.IGNORECASE)
    # Remove all tags
    text = re.sub(r"<[^>]+>", " ", html)
    text = unescape(text)
    return text


def extract_text_from_epub(epub_path: str) -> str:
    texts = []
    with zipfile.ZipFile(epub_path, "r") as zf:
        for name in zf.namelist():
            lower = name.lower()
            if lower.endswith((".xhtml", ".html", ".htm")):
                data = zf.read(name)
                try:
                    s = data.decode("utf-8")
                except UnicodeDecodeError:
                    try:
                        s = data.decode("utf-16")
                    except UnicodeDecodeError:
                        s = data.decode(errors="ignore")
                texts.append(strip_tags(s))
    return "\n".join(texts)


def tokenize_chinese_words(text: str):
    # Keep only Chinese characters and spaces as separators
    # Replace non-Chinese with spaces, then split contiguous Chinese sequences into "words"
    cleaned_chars = []
    for ch in text:
        if is_chinese_char(ch):
            cleaned_chars.append(ch)
        else:
            cleaned_chars.append(" ")
    cleaned = "".join(cleaned_chars)

    # Now we have segments of pure Chinese separated by spaces
    segments = cleaned.split()

    # Treat each contiguous Chinese segment as a candidate "word" if length >= 2
    words = [seg for seg in segments if len(seg) >= 2]
    return words


def main():
    print("Reading EPUB:", EPUB_PATH)
    full_text = extract_text_from_epub(EPUB_PATH)
    print("Total text length:", len(full_text))

    print("Tokenizing Chinese segments...")
    words = tokenize_chinese_words(full_text)
    print("Total candidate words (len>=2):", len(words))

    counter = collections.Counter(words)
    top20 = counter.most_common(20)

    print("\nTop 20 詞頻：")
    for w, c in top20:
        print(f"{w}\t{c}")

    data = [{"word": w, "count": c} for w, c in top20]
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("\n已輸出到：", OUTPUT_JSON)


if __name__ == "__main__":
    main()

