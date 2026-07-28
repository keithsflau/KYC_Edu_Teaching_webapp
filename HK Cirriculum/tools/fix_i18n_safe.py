# -*- coding: utf-8 -*-
"""Safely rebuild corrupted i18n blocks (zh/ja/ko) in P5 / GS HTML apps."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LANGS = ("en", "zh", "ja", "ko", "es", "de", "fi", "fr", "ar", "it")

SHARED: dict[str, tuple[str, str, str]] = {
    "Score": ("得分", "スコア", "점수"),
    "Calculation Steps": ("計算步驟", "計算ステップ", "계산 단계"),
    "Show Steps": ("顯示詳細步驟", "ステップを表示", "단계 보기"),
    "Hide Steps": ("隱藏詳細步驟", "ステップを隠す", "단계 숨기기"),
    "Next Question": ("下一題", "次の問題", "다음 문제"),
    "Check": ("確認", "確認", "확인"),
    "Check Answer": ("確認答案", "答えを確認", "정답 확인"),
    "Enter answer...": ("輸入答案...", "答えを入力...", "답 입력..."),
    "Correct!": ("答對了！", "正解！", "정답!"),
    "Try Again!": ("再試一次！", "もう一度！", "다시 시도!"),
    "Balanced!": ("平衡了！", "釣り合いました！", "균형!"),
    "Not balanced yet...": ("尚未平衡...", "まだ釣り合っていません...", "아직 균형이 아닙니다..."),
    "Hint": ("提示", "ヒント", "힌트"),
    "Reset": ("重設", "リセット", "초기화"),
    "Simplify": ("約簡", "約分", "약분"),
    "Result": ("結果", "結果", "결과"),
    "Formula": ("公式", "公式", "공식"),
    "Area": ("面積", "面積", "넓이"),
    "Volume": ("體積", "体積", "부피"),
    "Height": ("高", "高さ", "높이"),
    "Base": ("底", "底辺", "밑변"),
    "Quick Practice": ("快速練習", "クイック練習", "빠른 연습"),
    "Step-by-step": ("逐步解題", "ステップバイステップ", "단계별 풀이"),
    "Equation": ("方程", "方程式", "방정식"),
    "Solve for x": ("求 x 的值", "x を求める", "x 구하기"),
    "Next Problem": ("下一題", "次の問題", "다음 문제"),
}

SPECIFIC: dict[tuple[str, str], tuple[str, str, str]] = {
    ("title", "Decimal Operations"): ("小數四則運算", "小数の四則演算", "소수 사칙연산"),
    ("tipsTitle", "Decimal Tips"): ("小數要訣", "小数のコツ", "소수 팁"),
    ("addTip", "Align decimal points!"): ("小數點要對齊！", "小数点を揃えよう！", "소수점을 맞추세요!"),
    ("mulTip", "Count decimal places."): ("數清楚小數位。", "小数点以下の桁数を数えよう。", "소수 자릿수를 세세요."),
    ("divTip", "Shift decimals if needed."): ("必要時移動小數點。", "必要なら小数点を移動。", "필요하면 소수점을 이동하세요."),
    ("title", "3D Volume Builder"): ("3D 立體體積建造器", "3D 体積ビルダー", "3D 부피 빌더"),
    ("subtitle", "Cuboid ? Cube"): ("長方體與立方體", "直方体と立方体", "직육면체와 정육면체"),
    ("length", "Length (L)"): ("長 (L)", "長さ (L)", "길이 (L)"),
    ("width", "Width (W)"): ("闊 (W)", "幅 (W)", "너비 (W)"),
    ("height", "Height (H)"): ("高 (H)", "高さ (H)", "높이 (H)"),
    ("formulaTitle", "Volume Formula"): ("體積公式", "体積の公式", "부피 공식"),
    ("formula", "Volume = Length ? Width ? Height"): ("體積 = 長 × 闊 × 高", "体積 = 長さ × 幅 × 高さ", "부피 = 길이 × 너비 × 높이"),
    ("surfaceArea", "Surface Area"): ("表面積", "表面積", "겉넓이"),
    ("adjust", "Adjust Dimensions"): ("調整尺寸", "寸法を調整", "크기 조절"),
    ("makeCube", "Make Cube"): ("變成立方體", "立方体にする", "정육면체 만들기"),
    ("tipsTitle", "Learning Tips"): ("學習要訣", "学習のヒント", "학습 팁"),
    ("tipVol", "Volume: Space occupied by an object"): ("體積：物件佔有的空間", "体積：物体が占める空間", "부피: 물체가 차지하는 공간"),
    ("tipUnit", "Unit: Cubic Centimeters (cm³)"): ("單位：立方厘米 (cm³)", "単位：立方センチメートル (cm³)", "단위: 세제곱센티미터 (cm³)"),
    ("tipCuboid", "Cuboid: L, W, H can be different"): ("長方體：長、闊、高可以不同", "直方体：長さ・幅・高さは異なってよい", "직육면체: 길이, 너비, 높이가 달라도 됩니다"),
    ("tipCube", "Cube: L, W, H are all same"): ("立方體：長、闊、高相同", "立方体：長さ・幅・高さが同じ", "정육면체: 길이, 너비, 높이가 같습니다"),
    ("title", "Algebra Balance Scale"): ("代數天平", "代数の天秤", "대수 저울"),
    ("findX", "Find value of x"): ("求 x 的值", "x の値を求める", "x 값 구하기"),
    ("xVal", "Enter x:"): ("輸入 x：", "x を入力：", "x 입력:"),
    ("titleAdd", "Fraction Addition"): ("分數加法", "分数の加法", "분수 덧셈"),
    ("titleSub", "Fraction Subtraction"): ("分數減法", "分数の減法", "분수 뺄셈"),
    ("lcmStep", "Find Common Denominator (LCM)"): ("找公分母 (最小公倍數)", "共通の分母を求める (最小公倍数)", "공통 분모 구하기 (최소공배수)"),
    ("title", "Fraction Multiplication"): ("分數乘法", "分数の乗法", "분수 곱셈"),
    ("setup", "Setup Fractions"): ("設定分數", "分数を設定", "분수 설정"),
    ("rows", "Rows (Denominator 2)"): ("行數 (分母 2)", "行 (分母 2)", "행 (분모 2)"),
    ("cols", "Cols (Denominator 1)"): ("列數 (分母 1)", "列 (分母 1)", "열 (분모 1)"),
    ("overlap", "Overlap"): ("重疊部分", "重なり", "겹침"),
    ("total", "Total Parts"): ("總格數", "総マス数", "전체 칸"),
    ("title", "Area of Polygons"): ("多邊形面積", "多角形の面積", "다각형 넓이"),
    ("triangle", "Triangle"): ("三角形", "三角形", "삼각형"),
    ("parallelogram", "Parallelogram"): ("平行四邊形", "平行四辺形", "평행사변형"),
    ("trapezium", "Trapezium"): ("梯形", "台形", "사다리꼴"),
    ("topBase", "Top Base"): ("上底", "上底", "윗변"),
    ("bottomBase", "Bottom Base"): ("下底", "下底", "아랫변"),
    ("calc", "Calculation"): ("計算", "計算", "계산"),
    ("title", "Simple Equations (1)"): ("簡易方程 (1)", "簡単な方程式 (1)", "간단한 방정식 (1)"),
    ("balanceTitle", "Equation Balance"): ("方程天平", "方程式の天秤", "방정식 저울"),
    ("subtractBoth", "Subtract {n} from both sides"): ("兩邊同時減 {n}", "両辺から {n} を引く", "양변에서 {n} 빼기"),
    ("title", "Simple Equations (2)"): ("簡易方程 (2)", "簡単な方程式 (2)", "간단한 방정식 (2)"),
    ("topic", "Equations (Mult/Div)"): ("方程 (乘除)", "方程式 (乗除)", "방정식 (곱셈/나눗셈)"),
    ("divideBoth", "Divide both sides by"): ("兩邊同時除以", "両辺を同じ数で割る", "양변을 나누기"),
    ("multiplyBoth", "Multiply both sides by"): ("兩邊同時乘以", "両辺に同じ数を掛ける", "양변에 곱하기"),
}

TYPHOON: dict[str, tuple[str, str, str]] = {
    "Typhoon Preparation": ("颱風準備", "台風の準備", "태풍 준비"),
    "Tap the items you need to pack for a typhoon!": (
        "點選你需要為颱風準備的物品！",
        "台風に備えて必要な物を選んでね！",
        "태풍 대비에 필요한 물건을 골라 보세요!",
    ),
    "Packed Items:": ("已收拾物品：", "準備した物：", "챙긴 물건:"),
    "You are Ready!": ("你已準備好了！", "準備完了！", "準備完了！"),
    "Adhesive Tape": ("膠紙", "ガムテープ", "테이프"),
    "Canned Food": ("罐頭食物", "缶詰", "통조림"),
    "Bottled Water": ("瓶裝水", "ペットボトルの水", "생수"),
    "Flashlight": ("電筒", "懐中電灯", "손전등"),
    "Radio": ("收音機", "ラジオ", "라디오"),
    "Board Games": ("桌遊", "ボードゲーム", "보드게임"),
    "Kite": ("風箏", "凧", "연"),
    "Bicycle": ("單車", "自転車", "자전거"),
    "Swimsuit": ("泳衣", "水着", "수영복"),
}

APP_META: dict[str, dict[str, str]] = {
    "41_Decimal_Operations": {"html_title": "小五數學：小數四則運算 | Decimal Operations", "emoji": "🔢"},
    "42_Volume_Builder": {"html_title": "小五數學：3D 立體體積建造器 | 3D Volume Builder", "emoji": "📦"},
    "43_Algebra_Intro": {"html_title": "小五數學：代數天平 | Algebra Balance Scale", "emoji": "⚖️"},
    "44_Fractions_AddSub": {"html_title": "小五數學：分數加減 | Fraction Addition & Subtraction", "emoji": "➕"},
    "45_Fractions_Mul": {"html_title": "小五數學：分數乘法 | Fraction Multiplication", "emoji": "✖️"},
    "46_Area_Polygons": {"html_title": "小五數學：多邊形面積 | Area of Polygons", "emoji": "📐"},
    "47_Equations_Intro": {"html_title": "小五數學：簡易方程 (1) | Simple Equations (1)", "emoji": "🧮"},
    "48_Equations_Adv": {"html_title": "小五數學：簡易方程 (2) | Simple Equations (2)", "emoji": "🧮"},
}


def lookup(key: str, en: str) -> tuple[str, str, str] | None:
    if (key, en) in SPECIFIC:
        return SPECIFIC[(key, en)]
    if en in SHARED:
        return SHARED[en]
    if en in TYPHOON:
        return TYPHOON[en]
    return None


def cjk_fix(key: str, en: str, lang: str, val: str) -> str:
    if lang not in ("zh", "ja", "ko"):
        return val
    if "\ufffd" not in val and "?" not in val:
        return val
    tr = lookup(key, en)
    if not tr:
        return val
    return tr[{"zh": 0, "ja": 1, "ko": 2}[lang]]


def is_clean(val: str) -> bool:
    return "\ufffd" not in val and "?" not in val


def parse_lang_line(line: str) -> tuple[str, str] | None:
    m = re.match(r"\s*(en|zh|ja|ko|es|de|fi|fr|ar|it):\s*\"([^\"]*)\"", line)
    if m:
        return m.group(1), m.group(2)
    return None


def split_i18n_blocks(body: str) -> list[tuple[str, list[str]]]:
    lines = body.splitlines()
    blocks: list[tuple[str, list[str]]] = []
    i = 0
    while i < len(lines):
        m = re.match(r"(\s*)(\w+):\s*\{\s*$", lines[i])
        if not m:
            i += 1
            continue
        key = m.group(2)
        block_lines = [lines[i]]
        i += 1
        while i < len(lines):
            block_lines.append(lines[i])
            if re.match(r"\s*\}\s*,?\s*$", lines[i]):
                break
            i += 1
        blocks.append((key, block_lines))
        i += 1
    return blocks


def render_block(key: str, block_lines: list[str]) -> list[str]:
    parsed: dict[str, str] = {}
    for line in block_lines[1:-1]:
        got = parse_lang_line(line)
        if got:
            lang, val = got
            if lang not in parsed or not is_clean(parsed[lang]):
                if is_clean(val) or lang not in parsed:
                    parsed[lang] = val
    en = parsed.get("en", "")
    if not en:
        return block_lines
    indent = re.match(r"(\s*)", block_lines[0]).group(1)
    inner = indent + "  "
    out = [block_lines[0]]
    for lang in LANGS:
        tr = lookup(key, en)
        if lang in ("zh", "ja", "ko") and tr:
            val = tr[{"zh": 0, "ja": 1, "ko": 2}[lang]]
        else:
            val = parsed.get(lang, en if lang == "en" else "")
            if lang in ("zh", "ja", "ko"):
                val = cjk_fix(key, en, lang, val)
        if not val and lang != "en":
            val = parsed.get(lang, en)
        val = val.replace("\\", "\\\\").replace('"', '\\"')
        out.append(f'{inner}{lang}: "{val}",')
    out.append(block_lines[-1])
    return out


def rebuild_const_t(text: str) -> str:
    m = re.search(r"(const t = \{)(.*?)(\n\};)", text, re.S)
    if not m:
        return text
    prefix, body, suffix = m.group(1), m.group(2), m.group(3)
    blocks = split_i18n_blocks(body)
    new_lines: list[str] = []
    for key, blines in blocks:
        new_lines.extend(render_block(key, blines))
    return text[: m.start()] + prefix + "\n" + "\n".join(new_lines) + suffix + text[m.end() :]


def fix_file(path: Path, meta: dict[str, str] | None = None) -> None:
    text = path.read_text(encoding="utf-8")
    if meta:
        if meta.get("html_title"):
            text = re.sub(r"<title>[^<]*</title>", f"<title>{meta['html_title']}</title>", text, count=1)
        if meta.get("emoji"):
            text = re.sub(
                r'\}, "[^"]*", getText\("title", lang\)\)',
                f'}}, "{meta["emoji"]} ", getText("title", lang))',
                text,
                count=1,
            )
    if "const t = {" in text:
        text = rebuild_const_t(text)
    elif "const translations = {" in text or "const i18n = {" in text:
        for marker in ("const translations = {", "const i18n = {"):
            if marker in text:
                m = re.search(re.escape(marker) + r"(.*?)(\n\};)", text, re.S)
                if m:
                    body = m.group(1)
                    blocks = split_i18n_blocks(body)
                    new_lines = []
                    for key, blines in blocks:
                        new_lines.extend(render_block(key, blines))
                    text = text[: m.start()] + marker + "\n" + "\n".join(new_lines) + m.group(2) + text[m.end() :]
                break
    if "Typhoon" in text and "30_Typhoon" in str(path):
        text = re.sub(
            r"<title>[^<]*</title>",
            "<title>小四常識：颱風準備 | Typhoon Preparation</title>",
            text,
            count=1,
        )
    path.write_text(text, encoding="utf-8", newline="\n")


def main() -> None:
    for app, meta in APP_META.items():
        fix_file(ROOT / f"Primary_School/Mathematics/P5/{app}/index.html", meta)
    fix_file(ROOT / "Primary_School/General_Studies/P4/30_Typhoon_Prep/index.html")
    print("rebuilt")


if __name__ == "__main__":
    main()
