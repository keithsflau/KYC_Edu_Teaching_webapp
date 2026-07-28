from pathlib import Path
import re
TRUE_MOJI=re.compile(r"Ã[\x80-\xbf]|â€|ï¼|æ–|å¸|é™|ï¿½")
BOOKC=Path("HK Cirriculum/Secondary_School/ICT/F.4 Mock Paper/bookC.html")
text=BOOKC.read_text(encoding="utf-8")
CHEATSHEETS=r"""const cheatsheets = [
            {
                chapter: 1,
                title: "第一課：建網及互聯網基礎",
                content: `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-300">LAN 與 WAN、Switch、Router、NIC/MAC 等基礎概念。</p>
                    </div>
                `
            },
            {
                chapter: 2,
                title: "第二課：電郵與 IoT",
                content: `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-300">POP3、IMAP、物聯網 (IoT) 與遠端登入 (Remote Login)。</p>
                    </div>
                `
            },
            {
                chapter: 3,
                title: "第三課：HTML 與網頁",
                content: `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-300">HTML 標籤、超連結、圖像與基本網頁結構。</p>
                    </div>
                `
            },
            {
                chapter: 4,
                title: "第四課：網絡安全",
                content: `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-300">MITM、惡意軟件、防火牆、HTTPS 與私隱保護。</p>
                    </div>
                `
            },
            {
                chapter: 5,
                title: "第五課：PKI 與 MFA",
                content: `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-300">公開金鑰、數碼證書、對稱/非對稱加密與多因素認證。</p>
                    </div>
                `
            }
        ];"""

def replace_const_array(text, name, new_decl):
    start = text.find(f"const {name}")
    i = text.find("[", start)
    depth = 0
    for j in range(i, len(text)):
        if text[j] == "[": depth += 1
        elif text[j] == "]":
            depth -= 1
            if depth == 0:
                end = j + 1
                break
    semi = text.find(";", end) + 1
    return text[:start] + new_decl + text[semi:]

text = replace_const_array(text, "cheatsheets", CHEATSHEETS)
BOOKC.write_text(text, encoding="utf-8", newline="\n")
print("moji left", sum(1 for ln in text.splitlines() if TRUE_MOJI.search(ln)))
