import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";
import { detectKey, scoreChroma, NOTE_NAMES } from "../src/keyDetection.js";

const KS_MAJOR = [
  6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88,
];
const KS_MINOR = [
  6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17,
];

function placeTonic(profile, tonic) {
  return profile.map((_, index) => profile[(index - tonic + 12) % 12]);
}

function fail(message) {
  console.error("失敗:", message);
  process.exitCode = 1;
}

for (let tonic = 0; tonic < 12; tonic++) {
  const major = scoreChroma(placeTonic(KS_MAJOR, tonic));
  const minor = scoreChroma(placeTonic(KS_MINOR, tonic));
  if (major.major !== NOTE_NAMES[tonic]) {
    fail(`大調 ${NOTE_NAMES[tonic]} 被標成 ${major.major}`);
  }
  if (minor.minor !== NOTE_NAMES[tonic]) {
    fail(`小調 ${NOTE_NAMES[tonic]} 被標成 ${minor.minor}`);
  }
  if (major.minor == null || minor.major == null) {
    fail(`${NOTE_NAMES[tonic]} 的大調與小調沒有分開`);
  }
}

const cMajor = scoreChroma(placeTonic(KS_MAJOR, 0));
const gMajor = scoreChroma(placeTonic(KS_MAJOR, 7));
console.log(`音階模板  C 大調 → 大調 ${cMajor.major}，小調 ${cMajor.minor}`);
console.log(`音階模板  G 大調 → 大調 ${gMajor.major}，小調 ${gMajor.minor}`);
if (cMajor.major !== "C") fail("C 大調沒有顯示 C");
if (gMajor.major !== "G") fail("G 大調沒有顯示 G");
if (gMajor.major === "F") fail("G 大調被標成 F");
if (!cMajor.minor || !gMajor.minor) fail("小調沒有分開顯示");

const silent = scoreChroma(new Array(12).fill(0));
console.log(`無聲模板 → ok=${silent.ok} 大調=${silent.major} 小調=${silent.minor}`);
if (silent.ok || silent.major || silent.minor) fail("分析失敗不應標成任何調，包括 C");

function chordBuffer(midis) {
  const sampleRate = 44100;
  const seconds = 2.4;
  const length = sampleRate * seconds;
  const data = new Float32Array(length);
  const weights = [6.35, 3.48, 4.38, 4.09, 5.19, 3.66, 2.88];
  midis.forEach((midi, index) => {
    const freq = 440 * 2 ** ((midi - 69) / 12);
    const amp = 0.16 * (weights[index] / weights[0]);
    for (let n = 0; n < length; n++) {
      data[n] += amp * Math.sin((2 * Math.PI * freq * n) / sampleRate);
    }
  });
  return {
    sampleRate,
    duration: seconds,
    length,
    numberOfChannels: 1,
    getChannelData() {
      return data;
    },
  };
}

const heardC = await detectKey(chordBuffer([72, 74, 76, 77, 79, 81, 83]));
const heardG = await detectKey(chordBuffer([67, 69, 71, 72, 74, 76, 78]));
const heardSilence = await detectKey({
  sampleRate: 44100,
  duration: 2,
  length: 88200,
  getChannelData() {
    return new Float32Array(88200);
  },
});

console.log(`合成音  C 大調 → 大調 ${heardC.major}，小調 ${heardC.minor}`);
console.log(`合成音  G 大調 → 大調 ${heardG.major}，小調 ${heardG.minor}`);
console.log(`合成音  無聲 → ok=${heardSilence.ok} 大調=${heardSilence.major}`);

if (heardC.major !== "C") fail(`合成 C 大調顯示 ${heardC.major}`);
if (heardG.major !== "G") fail(`合成 G 大調顯示 ${heardG.major}`);
if (heardG.major === "F") fail("合成 G 大調被標成 F");
if (heardSilence.ok || heardSilence.major === "C") fail("無聲不應標成 C");

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "../dist/student-key.js"), "utf8"),
  sandbox
);
const student = sandbox.StudentKey;
const impulse = new Float64Array(8);
const impulseImag = new Float64Array(8);
impulse[0] = 1;
student.fft(impulse, impulseImag);
if (impulse.some((value) => Math.abs(value - 1) > 1e-6)) fail("FFT 自測失敗");

function samplesOf(midis) {
  const sampleRate = 44100;
  const length = Math.floor(sampleRate * 2.4);
  const data = new Float32Array(length);
  const weights = [6.35, 3.48, 4.38, 4.09, 5.19, 3.66, 2.88];
  midis.forEach((midi, index) => {
    const freq = 440 * 2 ** ((midi - 69) / 12);
    const amp = 0.16 * (weights[index] / weights[0]);
    for (let n = 0; n < length; n++) data[n] += amp * Math.sin((2 * Math.PI * freq * n) / sampleRate);
  });
  return data;
}
const pageC = student.detectFromSamples(samplesOf([72, 74, 76, 77, 79, 81, 83]), 44100);
const pageG = student.detectFromSamples(samplesOf([67, 69, 71, 72, 74, 76, 78]), 44100);
const pageSilent = student.detectFromSamples(new Float32Array(88200), 44100);
console.log(`學生頁  C 大調 → 大調 ${pageC.major}，小調 ${pageC.minor}`);
console.log(`學生頁  G 大調 → 大調 ${pageG.major}，小調 ${pageG.minor}`);
if (pageC.major !== "C") fail(`學生頁 C 大調顯示 ${pageC.major}`);
if (pageG.major !== "G" || pageG.major === "F") fail(`學生頁 G 大調顯示 ${pageG.major}`);
if (pageSilent.ok || pageSilent.major) fail("學生頁無聲不應標成調名");

if (process.exitCode) {
  console.error("調性自測未通過");
} else {
  console.log("調性自測通過：C 大調是 C，G 大調是 G，不是 F。");
}
