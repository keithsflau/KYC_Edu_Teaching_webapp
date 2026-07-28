# -*- coding: utf-8 -*-
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
BOOKC = ROOT / "Secondary_School/ICT/F.4 Mock Paper/bookC.html"

TRUE_MOJI = re.compile(r"Ã[\x80-\xbf]|â€|ï¼|æ–|å¸|é™|ï¿½")

MC_JS = r"""const mcQuestions = [
            {
                id: 1,
                chapter: 1,
                category: "建網及網上安全",
                question: "以下哪項有關 LAN 與 WAN 的比較是正確的？",
                options: [
                    "LAN 通常覆蓋範圍較 WAN 大",
                    "WAN 通常由 ISP 提供，連接不同地區的網絡",
                    "LAN 只能使用無線連接",
                    "WAN 不能連接互聯網"
                ],
                answer: 1,
                hint: "想想校園網絡與互聯網的分別。",
                explanation: "WAN（廣域網絡）連接地理上分散的網絡，通常由 ISP 提供；LAN（區域網絡）覆蓋範圍較小，如學校或家庭。"
            },
            {
                id: 2,
                chapter: 1,
                category: "建網及網上安全",
                question: "交換器（Switch）主要工作在 OSI 模型的哪一層？",
                options: ["實體層", "數據鏈路層", "網絡層", "傳輸層"],
                answer: 1,
                hint: "Switch 使用 MAC 位址轉發封包。",
                explanation: "Switch 在數據鏈路層（第 2 層）依 MAC 位址轉發，比 Hub 更有效率。"
            },
            {
                id: 3,
                chapter: 1,
                category: "建網及網上安全",
                question: "路由器（Router）的主要功能是？",
                options: [
                    "放大 Wi-Fi 信號",
                    "在不同網絡之間轉發數據包並選擇路徑",
                    "只連接同一子網內的裝置",
                    "儲存網頁快取"
                ],
                answer: 1,
                hint: "Router 連接 LAN 與 WAN。",
                explanation: "路由器工作於網絡層，使用路由表決定數據包轉發路徑，可連接不同網絡。"
            },
            {
                id: 4,
                chapter: 1,
                category: "建網及網上安全",
                question: "WEP 與 WPA2 相比，哪項描述較正確？",
                options: [
                    "WEP 比 WPA2 更安全",
                    "WEP 較舊且較易被破解，WPA2 安全性較高",
                    "兩者完全相同",
                    "WPA2 不使用加密"
                ],
                answer: 1,
                hint: "WEP 是較早期的無線加密標準。",
                explanation: "WEP 存在設計弱點，易被破解；WPA/WPA2 提供較強的無線安全。"
            },
            {
                id: 5,
                chapter: 1,
                category: "建網及網上安全",
                question: "DNS 的主要用途是？",
                options: [
                    "將域名轉換為 IP 位址",
                    "加密電郵內容",
                    "分配 MAC 位址",
                    "壓縮圖像檔案"
                ],
                answer: 0,
                hint: "例如將 www.example.com 轉為 IP。",
                explanation: "DNS（域名系統）把易記的域名解析為 IP 位址，方便用戶存取網絡資源。"
            },
            {
                id: 6,
                chapter: 1,
                category: "建網及網上安全",
                question: "HTTPS 與 HTTP 的主要分別是？",
                options: [
                    "HTTPS 使用 TLS/SSL 加密傳輸",
                    "HTTP 較快所以較安全",
                    "HTTPS 不能傳送表格數據",
                    "HTTP 只能用於電郵"
                ],
                answer: 0,
                hint: "留意「S」代表 Secure。",
                explanation: "HTTPS 在 HTTP 之上加入 TLS/SSL 加密，保護數據在傳輸中不被竊聽或篡改。"
            },
            {
                id: 7,
                chapter: 1,
                category: "建網及網上安全",
                question: "防火牆（Firewall）的主要作用是？",
                options: [
                    "根據規則過濾進出網絡的流量",
                    "提高顯示器解像度",
                    "備份硬碟數據",
                    "自動修正文法錯誤"
                ],
                answer: 0,
                hint: "可阻擋未授權連線。",
                explanation: "防火牆監察並控制網絡流量，阻止未授權存取，提升網絡安全。"
            },
            {
                id: 8,
                chapter: 1,
                category: "建網及網上安全",
                question: "下列哪項屬於「多因素認證（MFA）」？",
                options: [
                    "只輸入密碼",
                    "密碼加一次性驗證碼（OTP）",
                    "只使用指紋而無其他因素",
                    "使用相同密碼於所有網站"
                ],
                answer: 1,
                hint: "MFA 需要兩種或以上不同類型的憑證。",
                explanation: "MFA 結合你知道的（密碼）、你擁有的（OTP/電話）或你是誰（生物特徵）等因子。"
            },
            {
                id: 9,
                chapter: 1,
                category: "建網及網上安全",
                question: "IPv4 位址的格式是？",
                options: [
                    "四組 0–255 的十進數，以點分隔",
                    "六組十六進數",
                    "只有數字沒有分隔",
                    "必須包含 @ 符號"
                ],
                answer: 0,
                hint: "例如 192.168.0.1",
                explanation: "IPv4 由四個八位元組（0–255）組成，以點分十進表示。"
            },
            {
                id: 10,
                chapter: 1,
                category: "建網及網上安全",
                question: "在星形（Star）拓撲中，所有節點連接到？",
                options: ["中央交換器或路由器", "隨機另一節點", "只有一條總線", "互不相連"],
                answer: 0,
                hint: "中央裝置是單一故障點但易於管理。",
                explanation: "星形拓撲中，各裝置均連至中央 Switch/Router，方便管理與故障隔離。"
            }
        ];"""

LONG_JS = r"""const longQuestions = [
            {
                id: 1,
                chapter: 1,
                marks: 4,
                category: "網絡共享與打印",
                question: "學校新增網絡印表機。方案 X：以 UTP 連接至 Switch；方案 Y：以 USB 連接至電腦 A 並分享。<br>(a) 指出方案 Y 的一個缺點。[2分]<br>(b) 簡述方案 X 在資源管理上的優點。[2分]",
                markingScheme: `<ul class="list-disc pl-5 text-sm text-slate-300"><li>(a) 電腦 A 必須長開；A 關機則其他人無法列印。</li><li>(b) 印表機獨立連網，不佔用工作站資源，管理較容易。</li></ul>`
            }
        ];"""


def replace_const_array(text: str, name: str, new_decl: str) -> str:
    start = text.find(f"const {name}")
    if start < 0:
        return text
    i = text.find("[", start)
    depth = 0
    end = i
    for j in range(i, len(text)):
        if text[j] == "[":
            depth += 1
        elif text[j] == "]":
            depth -= 1
            if depth == 0:
                end = j + 1
                break
    semi = text.find(";", end)
    if semi < 0:
        semi = end
    else:
        semi += 1
    return text[:start] + new_decl + text[semi:]


def fix_ui(text: str) -> str:
    text = re.sub(
        r"<title>[^<]*</title>",
        "<title>DSE ICT 互聯網與建網及網上安全 — 互動溫習系統</title>",
        text,
        count=1,
    )
    replacements = [
        (
            re.compile(r"DSE ICT 互聯網[^\n<]+"),
            "DSE ICT 互聯網與建網及網上安全",
        ),
        (
            re.compile(r"<span class=\"text-xs bg-indigo-500/10[^\"]*\">[^<]+</span>"),
            '<span class="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">互動溫習系統</span>',
            1,
        ),
    ]
    # simple string replaces for common broken UI fragments
    subs = {
        "?²åº¦:": "進度:",
        "溫ç??€è¡¨æ¿": "溫習儀表板",
        "課å??¦é?å¿«æ???": "課後快測",
        "?³æ??ç¸¾å¿«å ±": "成績快報",
        "MC æ­?¢º": "MC 答對",
        "?ç½®?€?‰æº«ç¿'進度": "重設溫習進度",
        "?‹å? 20 é¡?MC 測試": "完成 20 題 MC 測試",
        "題目跳è??¢æ¿": "題目跳轉面板",
        "你好!優秀??ICT å­¸å?": "你好！ICT 考生",
        "© 2026 DSE ICT ç¶²ä??ªä¸»æº«ç?平台?'ç?願å?å­¸æ??Ÿå¥ª?Ÿï?5**)ï??ƒå…¥?†æƒ³å¤§å­¸ï¼?/p>":
            "© 2026 DSE ICT 網上自主溫習平台 — 祝各位同學奪星（5**），考入理想大學！</p>",
        "溫馨?ç¤ºï¼ˆDSE ?ƒé??¹å?點撥)ï?": "溫馨提示（DSE 常見考點）：",
        "答æ?æ­?¢ºï¼ç²å¾?1 ?†ï?": "答對了！獲 1 分！",
        "答æ??¯èª¤ï¼Œè?ç´°å??æº«è§??ï¼?": "答錯了，請細心溫習！",
    }
    for old, new in subs.items():
        text = text.replace(old, new)
    # hero paragraph - replace whole broken line if still mojibake
    lines = text.splitlines()
    out = []
    for ln in lines:
        if TRUE_MOJI.search(ln) and "個人溫習" not in ln and "精心" not in ln:
            if "?¢å€‹æº«ç¿'" in ln or "系統根" in ln:
                ln = '                            個人溫習系統根據最新官方教學大綱精心建構。涵蓋 <strong>建網、互聯網、HTML、網絡安全、私隱保護、PKI</strong> 等核心 DSE 課題。'
            elif "è§???ªç?å­¸å?證書" in ln:
                ln = '                            <h4 class="font-black text-xl text-amber-400">獲取 ICT 學生證書</h4>'
            elif "?­å?你喺 20 題" in ln:
                ln = '                            <p class="text-xs text-slate-400 mt-1">當你在 20 題模擬選擇題 (MC) 中獲得完整 100% 分數，即可解鎖證書。</p>'
            elif "精選äº?5 題" in ln:
                ln = "                        精選 5 題具 DSE 公開試風格的結構性問題，建議使用文稿輸入框作答。"
            elif "?ºä??´å?了六大課?" in ln:
                ln = "                        涵蓋六大課題，整理 DSE 公開試常見精要概念，溫習必讀。"
            elif "課å?概念診斷" in ln:
                ln = '                        <h3 class="font-extrabold text-lg text-white">課題概念診斷與重點</h3>'
            elif "?²è??Žã€?" in ln:
                ln = '                                完成 <strong>ICT 學生證書</strong> 代表你已掌握資訊及通訊科技建網、互聯網、網頁創作與網絡安全之精要。'
        out.append(ln)
    text = "\n".join(out)
    # cheatsheet headings - strip remaining moji lines in tab-cheatsheet by replacing known broken h4
    text = re.sub(
        r"<h4 class=\"text-sm font-bold text-indigo-400 mb-2\">[^<]*</h4>",
        '<h4 class="text-sm font-bold text-indigo-400 mb-2">重點概念</h4>',
        text,
    )
    return text


def main():
    text = BOOKC.read_text(encoding="utf-8")
    text = replace_const_array(text, "mcQuestions", MC_JS)
    text = replace_const_array(text, "longQuestions", LONG_JS)
    text = fix_ui(text)
    # LAN/WAN table headers (already partially fixed)
    text = text.replace(
        '<th class="border border-slate-800 p-2">?€?Ÿç¶²çµ?(LAN)</th>',
        '<th class="border border-slate-800 p-2">區域網絡 (LAN)</th>',
    )
    text = text.replace(
        '<span id="questionCategory" class="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">範ç?</span>',
        '<span id="questionCategory" class="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">範疇</span>',
    )
    BOOKC.write_text(text, encoding="utf-8", newline="\n")
    left = sum(1 for ln in text.splitlines() if TRUE_MOJI.search(ln))
    print("bookC moji lines left", left)


if __name__ == "__main__":
    main()
