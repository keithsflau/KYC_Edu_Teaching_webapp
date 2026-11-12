#!/usr/bin/env node
/**
 * 將 ChatGPT 長檔名 PNG 改名為 01_名稱.png，並刪除重複檔。
 * 用法：node tools/rename-maps.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const RENAMES = {
  "ChatGPT Image 2026年6月30日 上午12_15_06.png": "01_亞伯拉罕生平.png",
  "ChatGPT Image 2026年6月30日 上午12_09_43.png": "03_曠野四十年.png",
  "ChatGPT Image 2026年6月30日 上午12_23_51.png": "04_約書亞得地.png",
  "ChatGPT Image 2026年6月30日 上午12_27_16.png": "05_十二支派分配.png",
  "ChatGPT Image 2026年6月30日 上午12_29_16.png": "06_士師時代.png",
  "ChatGPT Image 2026年6月30日 上午12_28_22.png": "07_大衛生平.png",
  "ChatGPT Image 2026年6月30日 上午01_00_05.png": "08_所羅門時代.png",
  "ChatGPT Image 2026年6月30日 上午12_57_03.png": "09_國度分裂.png",
  "ChatGPT Image 2026年6月30日 上午12_30_30.png": "10_先知時序.png",
  "ChatGPT Image 2026年6月30日 上午12_28_46.png": "11_北國亡國.png",
  "ChatGPT Image 2026年6月30日 上午12_57_39.png": "12_南國亡國.png",
  "ChatGPT Image 2026年6月30日 上午12_57_52.png": "13_被擄與回歸.png",
  "ChatGPT Image 2026年6月30日 上午12_58_01.png": "14_耶穌生平.png",
  "ChatGPT Image 2026年6月30日 上午12_58_12.png": "15_施洗約翰.png",
  "ChatGPT Image 2026年6月30日 上午12_58_53.png": "16_保羅第一次宣教.png",
  "ChatGPT Image 2026年6月30日 上午12_58_37.png": "17_保羅第二次宣教.png",
  "ChatGPT Image 2026年6月30日 上午01_01_14.png": "18_保羅第三次宣教.png",
  "ChatGPT Image 2026年6月30日 上午12_59_18.png": "19_保羅上羅馬.png",
  "ChatGPT Image 2026年6月30日 上午01_00_40.png": "20_保羅總覽.png",
  "ChatGPT Image 2026年6月30日 上午12_59_43.png": "21_福音傳歐洲.png",
  "ChatGPT Image 2026年6月30日 上午12_58_30.png": "22_十字軍東征.png",
  "ChatGPT Image 2026年6月30日 上午01_01_26.png": "23_東西教會分裂.png",
  "ChatGPT Image 2026年6月30日 上午01_01_38.png": "24_六座逃城.png",
  "ChatGPT Image 2026年6月30日 上午01_01_57.png": "25_約拿書.png",
};

for (const [src, dst] of Object.entries(RENAMES)) {
  const from = path.join(dir, src);
  const to = path.join(dir, dst);
  if (!fs.existsSync(from)) continue;
  if (fs.existsSync(to)) fs.unlinkSync(from);
  else fs.renameSync(from, to);
  console.log("→", dst);
}

for (const f of fs.readdirSync(dir)) {
  if (f.startsWith("ChatGPT Image") && f.endsWith(".png")) {
    fs.unlinkSync(path.join(dir, f));
    console.log("✕", f);
  }
}

const pngs = fs.readdirSync(dir).filter(f => /^\d{2}_.+\.png$/.test(f)).sort();
console.log(`\n${pngs.length} / 26 張已就緒`);
pngs.forEach(f => console.log(" ", f));
