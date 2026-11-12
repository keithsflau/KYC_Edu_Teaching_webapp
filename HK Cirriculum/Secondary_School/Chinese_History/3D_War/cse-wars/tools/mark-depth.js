const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "wars");
const legend = "初中深度：沿地圖認識時間、地點、經過和結果。高中深度：分開史實、史料與評價，並做勝敗判斷。";
for (const era of fs.readdirSync(root)) {
  const idx = path.join(root, era, "index.html");
  if (!fs.existsSync(idx)) continue;
  let html = fs.readFileSync(idx, "utf8");
  if (!html.includes("card h2")) continue;
  if (!html.includes(".depth{")) {
    html = html.replace(
      ".card .places{margin-top:8px;font-size:10.5px;color:#9aa6b2;line-height:1.45}",
      ".card .places{margin-top:8px;font-size:10.5px;color:#9aa6b2;line-height:1.45}\n  .depth{margin-top:8px;font-size:11px;color:#d8c08a;line-height:1.45}"
    );
  }
  if (!html.includes("初中深度")) {
    html = html.replace(/<p class="intro">([\s\S]*?)<\/p>/, (m, inner) => `<p class="intro">${inner}<br>${legend}</p>`);
  }
  if (!html.includes("初中：史實導覽")) {
    html = html.replace(
      /<div class="places">([^<]*)<\/div>\s*<\/a>/g,
      '<div class="places">$1</div>\n      <div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div>\n    </a>'
    );
  }
  fs.writeFileSync(idx, html);
  console.log("era", era);
}

const qin = fs.readFileSync(path.join(root, "qin-han", "index.html"), "utf8");
const head = qin.split("<body>")[0];
const foot = qin.includes("learn-from-zero.js")
  ? qin.slice(qin.indexOf('<script src="../../../../../../common/learn-from-zero.js">'))
  : "</body>\n</html>\n";
const body = `<body>
  <a class="back" href="../../">← 返回中史戰爭總目錄</a>
  <h1>近代</h1>
  <div class="sub">MODERN CHINA · 19世紀末—1949年</div>
  <p class="intro">晚清、抗日戰爭與國共內戰屬同一時段。初中深度：沿地圖認識時間、地點、經過和結果。高中深度：分開史實、史料與評價，並做勝敗判斷。</p>
  <div class="grid">
    <a class="card" href="../late-qing/yellow-sea/"><h2>黃海海戰</h2><div class="en">YELLOW SEA 1894</div><p>北洋水師與伊東祐亨指揮的日本聯合艦隊。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../late-qing/weihaiwei/"><h2>威海衛淪陷</h2><div class="en">WEIHAIWEI 1895</div><p>北洋殘艦在劉公島被圍。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../anti-japan/songhu/"><h2>淞滬會戰</h2><div class="en">SHANGHAI 1937</div><p>上海作戰約三個月。相持通說在武漢會戰之後。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../anti-japan/pingxingguan/"><h2>平型關戰鬥</h2><div class="en">PINGXINGGUAN 1937</div><p>伏擊日軍輜重部隊。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../anti-japan/taierzhuang/"><h2>台兒莊戰役</h2><div class="en">TAIERZHUANG 1938</div><p>城寨巷戰與側翼合擊。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../anti-japan/hundred-regiments/"><h2>百團大戰</h2><div class="en">HUNDRED REGIMENTS 1940</div><p>破襲華北交通線。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../civil-war/liaoshen/"><h2>遼瀋戰役</h2><div class="en">LIAOSHEN 1948</div><p>先打錦州，再及瀋陽。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../civil-war/huaihai/"><h2>淮海戰役</h2><div class="en">HUAIHAI 1948–49</div><p>碾莊、雙堆集、陳官莊分開看。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../civil-war/pingjin/"><h2>平津戰役</h2><div class="en">PINGJIN 1948–49</div><p>天津攻克後北平接受改編。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
    <a class="card" href="../civil-war/crossing/"><h2>渡江戰役</h2><div class="en">CROSSING 1949</div><p>1949年4月23日進入南京。</p><div class="depth">初中：史實導覽｜高中：史料、評價與勝敗判斷</div></a>
  </div>
`;
fs.mkdirSync(path.join(root, "jindai"), { recursive: true });
fs.writeFileSync(path.join(root, "jindai", "index.html"), head + body + foot);
console.log("jindai");
