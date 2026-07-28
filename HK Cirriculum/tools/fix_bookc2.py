from pathlib import Path
import re
BOOKC = Path("HK Cirriculum/Secondary_School/ICT/F.4 Mock Paper/bookC.html")
text = BOOKC.read_text(encoding="utf-8")
TRUE_MOJI = re.compile(r"Ã[\x80-\xbf]|â€|ï¼|æ–|å¸|é™|ï¿½")

CHEATSHEET = """
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <h3 class="text-lg font-bold text-white">建網及網上安全 — 重點速查</h3>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">LAN 與 WAN</h4>
                        <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                            <li><strong>LAN</strong>：區域網絡，覆蓋範圍小（如校園、家庭）。</li>
                            <li><strong>WAN</strong>：廣域網絡，連接不同地區，常由 ISP 提供。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">電郵協定</h4>
                        <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                            <li><strong>POP3</strong>：通常下載後在本機閱讀。</li>
                            <li><strong>IMAP</strong>：郵件保留在伺服器，可多裝置同步。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">IoT 與遠端登入</h4>
                        <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                            <li><strong>IoT</strong>：裝置連網並可遙距監控（如智能家居）。</li>
                            <li><strong>Remote Login</strong>：透過網絡遠端控制另一部電腦（注意授權與安全）。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">HTML 常見標籤</h4>
                        <p class="text-sm text-slate-300">&lt;img&gt; 需 src；&lt;a&gt; 需 href；&lt;script&gt; 可載入程式（須防 XSS）。</p>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">網絡安全</h4>
                        <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                            <li><strong>MITM</strong>：中間人攻擊，公共 Wi-Fi 風險高。</li>
                            <li><strong>私隱</strong>：清除 cookies、慎填個人資料、使用 HTTPS。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">PKI 與 MFA</h4>
                        <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                            <li><strong>PKI</strong>：公開金鑰基礎建設，支援數碼證書與 HTTPS。</li>
                            <li><strong>MFA</strong>：多因素認證（你知道的、你擁有的、你是誰）。</li>
                        </ul>
                    </div>
                </div>
"""

m = re.search(r'(<div id="tab-cheatsheet"[^>]*>)(.*?)(</div>\s*\n\s*<!-- TAB:)', text, re.S)
if m:
    text = text[: m.start(2)] + CHEATSHEET + text[m.end(2) :]

# hero line direct
text = re.sub(
    r"\s*\?¢å€‹æº«ç¿'系統根[^\n]+",
    "\n                            個人溫習系統根據最新官方教學大綱精心建構。涵蓋 <strong>建網、互聯網、HTML、網絡安全、私隱保護、PKI</strong> 等核心 DSE 課題。",
    text,
    count=1,
)

text = text.replace("?ƒé?深度è§??ï¼?", "試題深度解析：")
text = text.replace("作ç??‰ç¨¿ç´?(?¯åœ¨æ­¤è¼¸?¥ç?案進è??ªæ?模擬)ï¼?", "作答草稿區（可在此輸入答案進行自我模擬）：")

BOOKC.write_text(text, encoding="utf-8", newline="\n")
left = sum(1 for ln in text.splitlines() if TRUE_MOJI.search(ln))
print("left", left)
