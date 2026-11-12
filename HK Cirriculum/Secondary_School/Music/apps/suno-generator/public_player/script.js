const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const INTERVALS = [
  { id: "M2", name: "大二度", semitones: 2, degree: 1 },
  { id: "m3", name: "小三度", semitones: 3, degree: 2 },
  { id: "M3", name: "大三度", semitones: 4, degree: 2 },
  { id: "P4", name: "純四度", semitones: 5, degree: 3 },
  { id: "P5", name: "純五度", semitones: 7, degree: 4 },
  { id: "M6", name: "大六度", semitones: 9, degree: 5 },
  { id: "M7", name: "大七度", semitones: 11, degree: 6 },
  { id: "P8", name: "純八度", semitones: 12, degree: 7 },
];
const SCALES = {
  C: {
    title: "C 大調",
    names: ["C", "D", "E", "F", "G", "A", "B", "C"],
    midi: [60, 62, 64, 65, 67, 69, 71, 72],
  },
  G: {
    title: "G 大調",
    names: ["G", "A", "B", "C", "D", "E", "F♯", "G"],
    midi: [67, 69, 71, 72, 74, 76, 78, 79],
  },
};

let audioCtx = null;
let active = [];
let token = 0;

function status(text) {
  document.getElementById("status").textContent = text;
}

function hz(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

async function context() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state !== "running") await audioCtx.resume();
  if (audioCtx.state !== "running") throw new Error("audio blocked");
  return audioCtx;
}

function stopActive() {
  active.forEach((node) => {
    try {
      node.stop();
    } catch (error) {
      /* already stopped */
    }
  });
  active = [];
}

function tone(ac, midi, when, dur, gainValue) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(hz(midi), when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(Math.max(gainValue, 0.0002), when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(dur, 0.05));
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(when);
  osc.stop(when + dur + 0.03);
  active.push(osc);
}

function spell(root, interval) {
  const rootIndex = LETTERS.indexOf(root);
  const letter = LETTERS[(rootIndex + interval.degree) % 7];
  const expected = (PC[root] + interval.semitones) % 12;
  let delta = (expected - PC[letter] + 12) % 12;
  if (delta > 6) delta -= 12;
  const accidental = delta === 0 ? "" : delta === 1 ? "♯" : delta === -1 ? "♭" : "?";
  const octave = rootIndex + interval.degree >= 7 ? 5 : 4;
  return {
    lower: PC[root] + 60,
    upper: PC[root] + 60 + interval.semitones,
    label: `${root}4 → ${letter}${accidental}${octave}`,
  };
}

function renderNotes(names) {
  const box = document.getElementById("scale-notes");
  box.innerHTML = "";
  names.forEach((name, index) => {
    const span = document.createElement("span");
    span.className = "note";
    span.id = `scale-note-${index}`;
    span.textContent = name;
    box.appendChild(span);
  });
}

async function playScale(id) {
  const scale = SCALES[id];
  const mine = ++token;
  stopActive();
  renderNotes(scale.names);
  try {
    const ac = await context();
    const step = 0.42;
    const line = scale.midi.concat(scale.midi.slice(0, -1).reverse());
    const labels = scale.names.concat(scale.names.slice(0, -1).reverse());
    line.forEach((midi, index) => {
      tone(ac, midi, ac.currentTime + index * step, 0.36, 0.22);
      setTimeout(() => {
        if (mine !== token) return;
        document.querySelectorAll(".note").forEach((el) => el.classList.remove("on"));
        const shown = index < scale.names.length ? index : scale.names.length - 2 - (index - scale.names.length);
        const target = document.getElementById(`scale-note-${Math.max(shown, 0)}`);
        if (target) target.classList.add("on");
        status(`正在播放 ${scale.title}：${labels[index]}`);
      }, index * step * 1000);
    });
    status(`正在播放 ${scale.title}`);
  } catch (error) {
    status("瀏覽器未允許發聲");
  }
}

async function playInterval() {
  const root = document.getElementById("root-select").value;
  const interval = INTERVALS.find((item) => item.id === document.getElementById("interval-select").value);
  const spelled = spell(root, interval);
  const mine = ++token;
  stopActive();
  refreshIntervalLabel();
  try {
    const ac = await context();
    const now = ac.currentTime + 0.05;
    tone(ac, spelled.lower, now, 0.55, 0.22);
    tone(ac, spelled.upper, now + 0.7, 0.55, 0.22);
    tone(ac, spelled.lower, now + 1.5, 0.9, 0.16);
    tone(ac, spelled.upper, now + 1.5, 0.9, 0.16);
    status(`正在播放 ${interval.name}`);
    setTimeout(() => {
      if (mine === token) status(`${interval.name}播放完畢`);
    }, 2600);
  } catch (error) {
    status("瀏覽器未允許發聲");
  }
}

function refreshIntervalLabel() {
  const root = document.getElementById("root-select").value;
  const interval = INTERVALS.find((item) => item.id === document.getElementById("interval-select").value);
  const spelled = spell(root, interval);
  document.getElementById("interval-label").textContent =
    `${spelled.label}　${interval.name}　${interval.semitones} 個半音`;
}

async function playMetre() {
  const beats = Number(document.getElementById("metre-select").value);
  const labels = beats === 2 ? ["強", "弱"] : beats === 3 ? ["強", "弱", "弱"] : ["強", "弱", "次強", "弱"];
  const box = document.getElementById("beats");
  box.innerHTML = "";
  labels.forEach((label, index) => {
    const span = document.createElement("span");
    span.className = index === 0 || (beats === 4 && index === 2) ? "beat strong" : "beat";
    span.id = `beat-${index}`;
    span.textContent = label;
    box.appendChild(span);
  });
  const mine = ++token;
  stopActive();
  try {
    const ac = await context();
    const step = 0.55;
    for (let bar = 0; bar < 2; bar++) {
      labels.forEach((label, index) => {
        const when = ac.currentTime + (bar * labels.length + index) * step;
        const strong = index === 0;
        const medium = beats === 4 && index === 2;
        tone(ac, strong ? 67 : medium ? 72 : 79, when, 0.12, strong ? 0.3 : medium ? 0.18 : 0.1);
        setTimeout(() => {
          if (mine !== token) return;
          document.querySelectorAll(".beat").forEach((el) => el.classList.remove("on"));
          document.getElementById(`beat-${index}`).classList.add("on");
          status(`正在播放 ${beats}/4：第 ${index + 1} 拍${label}`);
        }, (when - ac.currentTime) * 1000);
      });
    }
  } catch (error) {
    status("瀏覽器未允許發聲");
  }
}

document.getElementById("play-scale-c").addEventListener("click", () => playScale("C"));
document.getElementById("play-scale-g").addEventListener("click", () => playScale("G"));
document.getElementById("play-interval").addEventListener("click", playInterval);
document.getElementById("play-metre").addEventListener("click", playMetre);

const intervalSelect = document.getElementById("interval-select");
INTERVALS.forEach((interval) => {
  const option = document.createElement("option");
  option.value = interval.id;
  option.textContent = `${interval.name}（${interval.semitones} 個半音）`;
  intervalSelect.appendChild(option);
});
intervalSelect.value = "M3";
document.getElementById("root-select").addEventListener("change", refreshIntervalLabel);
intervalSelect.addEventListener("change", refreshIntervalLabel);
refreshIntervalLabel();
renderNotes(SCALES.C.names);
status("按按鈕即可聽見，不用自備錄音。");
