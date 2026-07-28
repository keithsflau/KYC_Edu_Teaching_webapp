from pathlib import Path
import re
TRUE_MOJI=re.compile(r"Ã[\x80-\xbf]|â€|ï¼|æ–|å¸|é™|ï¿½")
path=Path("HK Cirriculum/Secondary_School/ICT/F.4 Mock Paper/bookC.html")
lines=path.read_text(encoding="utf-8").splitlines()
start=next(i for i,l in enumerate(lines) if 'id="tab-cheatsheet"' in l)
end=next(i for i,l in enumerate(lines) if "System JavaScript Logic" in l)
# back up to closing divs before footer - find <footer
footer=next(i for i,l in enumerate(lines) if "<footer" in l)
print("start", start+1, "footer", footer+1, "js comment", end+1)
CHEATSHEET_OPEN = lines[start]
# keep opening div line, replace until footer section's parent closes
# find line before footer that closes main - use footer-3
new_block = [lines[start], """                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <h3 class="text-lg font-bold text-white">建網及網上安全 — 重點速查</h3>
                    <table class="w-full text-sm text-slate-300 border border-slate-800">
                        <thead><tr><th class="border border-slate-800 p-2">項目</th><th class="border border-slate-800 p-2">區域網絡 (LAN)</th><th class="border border-slate-800 p-2">廣域網絡 (WAN)</th></tr></thead>
                        <tbody>
                            <tr><td class="border border-slate-800 p-2 font-bold">覆蓋範圍</td><td class="border border-slate-800 p-2">小（家庭、辦公室、學校）</td><td class="border border-slate-800 p-2">大（城市、國家）</td></tr>
                            <tr><td class="border border-slate-800 p-2 font-bold">傳輸速度</td><td class="border border-slate-800 p-2">高（一般以以太網）</td><td class="border border-slate-800 p-2">較低</td></tr>
                        </tbody>
                    </table>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">重點概念</h4>
                        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-300">
                            <li><strong>NIC / MAC</strong>：網卡具唯一 MAC 位址。</li>
                            <li><strong>Switch</strong>：依 MAC 在 LAN 內轉發。</li>
                            <li><strong>Router</strong>：連接不同網絡，依 IP 路由。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">電郵與 IoT</h4>
                        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-300">
                            <li><strong>POP3 / IMAP</strong>：本機下載 vs 伺服器同步。</li>
                            <li><strong>IoT</strong>：裝置連網遙距監控。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-indigo-400 mb-2">PKI 與 MFA</h4>
                        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-300">
                            <li><strong>PKI</strong>：公開金鑰與數碼證書。</li>
                            <li><strong>MFA</strong>：多因素認證提升安全。</li>
                        </ul>
                    </div>
                </div>""", "            </div>"]
# find closing of tab-cheatsheet - line with only </div> before footer
close_tab = footer - 1
while close_tab > start and lines[close_tab].strip() != "</div>":
    close_tab -= 1
out = lines[:start] + new_block + lines[close_tab+1:]
text = "\n".join(out)
path.write_text(text, encoding="utf-8", newline="\n")
print("moji left", sum(1 for ln in text.splitlines() if TRUE_MOJI.search(ln)))
