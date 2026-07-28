// ============================================
// Data: Question Banks (Expanded)
// ============================================

const DATA_FIND = [
  {
    text: "小鳥在枝頭上快樂地唱歌。",
    isPersonification: true,
    explain: "小鳥「唱歌」和「快樂」是人的表現。",
  },
  {
    text: "天空下著大雨，雷聲隆隆作響。",
    isPersonification: false,
    explain: "這是自然的描寫，雷聲響不是人的行為。",
  },
  {
    text: "風兒輕輕撫摸著我的臉頰。",
    isPersonification: true,
    explain: "風「撫摸」是人的動作。",
  },
  {
    text: "太陽公公害羞地躲在雲層後面。",
    isPersonification: true,
    explain: "太陽「害羞」和「躲」是擬人。",
  },
  {
    text: "這朵花紅得像火一樣。",
    isPersonification: false,
    explain: "這是比喻（明喻），用了「像」。",
  },
  {
    text: "時鐘滴答滴答地走個不停。",
    isPersonification: false,
    explain: "「走」在這裡是機械運作，不算明顯擬人。",
  },
  {
    text: "柳樹在河邊梳理她長長的頭髮。",
    isPersonification: true,
    explain: "柳樹「梳理頭髮」是人的動作。",
  },
  {
    text: "大海生氣了，捲起了巨大的波浪。",
    isPersonification: true,
    explain: "大海「生氣」是人的情緒。",
  },
  {
    text: "鉛筆安靜地躺在桌子上。",
    isPersonification: true,
    explain: "「安靜地躺」帶有人的姿態。",
  },
  {
    text: "星星在夜空中眨著眼睛。",
    isPersonification: true,
    explain: "星星「眨眼」是經典的擬人寫法。",
  },
  {
    text: "地板很滑，我不小心跌倒了。",
    isPersonification: false,
    explain: "這是事實陳述。",
  },
  {
    text: "頑皮的小草從泥土裡探出頭來。",
    isPersonification: true,
    explain: "小草「頑皮」和「探頭」是擬人。",
  },
  {
    text: "月亮姐姐穿上了雲做的衣裳。",
    isPersonification: true,
    explain: "月亮「穿衣裳」是擬人。",
  },
  {
    text: "大樹爺爺彎著腰，看著路過的人。",
    isPersonification: true,
    explain: "大樹「彎腰」、「看」是擬人。",
  },
  {
    text: "這輛車跑得像飛機一樣快。",
    isPersonification: false,
    explain: "這是比喻（明喻），用了「像」。",
  },
  {
    text: "春風叫醒了沉睡的大地。",
    isPersonification: true,
    explain: "春風「叫醒」誰是擬人。",
  },
  {
    text: "蝴蝶在花叢中跳著優美的舞姿。",
    isPersonification: true,
    explain: "蝴蝶「跳舞」是擬人。",
  },
  {
    text: "書包張開大嘴巴，吃掉了我的書本。",
    isPersonification: true,
    explain: "書包「吃」東西是擬人。",
  },
  {
    text: "鬧鐘每天早上準時唱歌叫我起床。",
    isPersonification: true,
    explain: "鬧鐘「唱歌」是擬人。",
  },
  {
    text: "這塊石頭硬得像鐵一樣。",
    isPersonification: false,
    explain: "這是比喻。",
  },
  {
    text: "秋葉最後跳了一支舞，才落在地上。",
    isPersonification: true,
    explain: "葉子「跳舞」是擬人。",
  },
  {
    text: "雲朵在天上追逐嬉戲。",
    isPersonification: true,
    explain: "雲朵「追逐嬉戲」是擬人。",
  },
  {
    text: "弟弟的臉紅得像蘋果。",
    isPersonification: false,
    explain: "這是比喻。",
  },
  {
    text: "小溪一邊跑一邊唱著歌流向大海。",
    isPersonification: true,
    explain: "小溪「跑」和「唱歌」是擬人。",
  },
  {
    text: "玫瑰花驕傲地抬起頭。",
    isPersonification: true,
    explain: "玫瑰花「驕傲抬頭」是擬人。",
  },
];

const DATA_COMPARE = [
  {
    text: "月亮像一個大圓盤掛在天上。",
    type: "simile",
    explain: "有「像」，是比喻（明喻）。",
  },
  {
    text: "月亮姐姐對著我微笑。",
    type: "personification",
    explain: "月亮會「微笑」，是擬人。",
  },
  { text: "這棵樹高得像巨人。", type: "simile", explain: "有「像」，是比喻。" },
  {
    text: "小狗在門口汪汪叫。",
    type: "neither",
    explain: "這是動物本能，不是擬人，也不是比喻。",
  },
  {
    text: "春風溫柔地喚醒了沈睡的大地。",
    type: "personification",
    explain: "春風「喚醒」大地，是擬人。",
  },
  {
    text: "弟弟的臉紅得像蘋果。",
    type: "simile",
    explain: "有「像」，是比喻。",
  },
  {
    text: "書包張開大嘴巴，吃掉了我的書本。",
    type: "personification",
    explain: "書包「張嘴吃」東西，是擬人。",
  },
  {
    text: "爸爸是家裡的大山。",
    type: "simile",
    explain: "這是比喻（暗喻），爸爸＝山。",
  },
  {
    text: "蝴蝶在花叢中飛來飛去。",
    type: "neither",
    explain: "這是普通的描寫。",
  },
  {
    text: "落葉在空中跳著最後的舞曲。",
    type: "personification",
    explain: "落葉「跳舞」是擬人。",
  },
  {
    text: "他的聲音像雷聲一樣大。",
    type: "simile",
    explain: "有「像」，是比喻。",
  },
  {
    text: "雷公公生氣地吼叫起來。",
    type: "personification",
    explain: "雷公「生氣吼叫」是擬人。",
  },
  {
    text: "雨點像斷了線的珍珠落下。",
    type: "simile",
    explain: "有「像」，是比喻。",
  },
  {
    text: "雲兒在天空中悠閒地散步。",
    type: "personification",
    explain: "雲「散步」是擬人。",
  },
  { text: "這道菜辣得像火燒。", type: "simile", explain: "有「像」，是比喻。" },
  {
    text: "辣椒咬了一口我的舌頭。",
    type: "personification",
    explain: "辣椒「咬」我是擬人。",
  },
  {
    text: "時間像流水一樣逝去。",
    type: "simile",
    explain: "有「像」，是比喻。",
  },
  {
    text: "時間悄悄地溜走了。",
    type: "personification",
    explain: "時間「溜走」是擬人。",
  },
  {
    text: "小貓像個小毛球縮在角落。",
    type: "simile",
    explain: "有「像」，是比喻。",
  },
  {
    text: "小草努力地伸了個懶腰。",
    type: "personification",
    explain: "小草「伸懶腰」是擬人。",
  },
];

const DATA_REWRITE_BASE = [
  "鬧鐘響了，叫醒我。",
  "星星在天上發光。",
  "大樹長在路邊，幫人們擋太陽。",
  "小河流向大海。",
  "花朵在春天開了。",
  "蝴蝶在花園裡飛。",
  "太陽下山了。",
  "小鳥在樹上叫。",
  "風吹過樹葉，發出沙沙聲。",
  "車子在馬路上跑得很快。",
  "月亮出來了。",
  "雨下得很大。",
  "蜜蜂在採花蜜。",
  "白雲在天上飄。",
  "蠟燭燒完了。",
];

const DATA_STORY = [
  {
    title: "春天的花園",
    content: [
      { text: "這是一個陽光明媚的早晨。", isP: false },
      { text: "太陽公公伸了個大懶腰，笑嘻嘻地爬上了山頂。", isP: true },
      { text: "花園裡，花兒們都醒過來了。", isP: true },
      { text: "玫瑰花對著鏡子整理她紅色的裙子。", isP: true },
      { text: "百合花害羞地低著頭，不敢看人。", isP: true },
      { text: "小草也從泥土裡探出頭來，好奇地張望。", isP: true },
      { text: "一隻小蜜蜂飛過了圍牆。", isP: false },
      { text: "它停在一朵黃花上採蜜。", isP: false },
      { text: "風兒跑過來，輕輕地跟每一朵花說早安。", isP: true },
      { text: "整個花園都充滿了生氣。", isP: false },
    ],
  },
  {
    title: "颱風來了",
    content: [
      { text: "天文台掛起了八號風球。", isP: false },
      { text: "風在窗外憤怒地咆哮，拍打著玻璃。", isP: true },
      { text: "路邊的小樹痛得彎下了腰，在那裡呻吟。", isP: true },
      { text: "垃圾桶被風推倒在地上，滾了好遠。", isP: false },
      { text: "雨點像子彈一樣打在屋頂上。", isP: false }, // Simile
      { text: "招牌在風中嚇得瑟瑟發抖，發出吱吱聲。", isP: true },
      { text: "大廈依然屹立不倒。", isP: false },
      { text: "烏雲霸道地佔領了整個天空。", isP: true },
      { text: "街道上沒有一個人。", isP: false },
      { text: "整個城市都在等待風暴過去。", isP: true }, // City waiting
    ],
  },
];

const BADGES = [
  {
    id: "first_star",
    name: "初露鋒芒",
    icon: "⭐",
    desc: "獲得第 1 顆星星",
    check: (s) => s.stars >= 1,
  },
  {
    id: "ten_stars",
    name: "摘星少年",
    icon: "🌟",
    desc: "獲得 10 顆星星",
    check: (s) => s.stars >= 10,
  },
  {
    id: "streak_5",
    name: "連對達人",
    icon: "🔥",
    desc: "連續答對 5 題",
    check: (s) => s.currentStreak >= 5,
  },
  {
    id: "story_1",
    name: "故事探險家",
    icon: "📖",
    desc: "完成 1 個故事尋寶",
    check: (s) => s.storiesCompleted >= 1,
  },
  {
    id: "writer",
    name: "小小作家",
    icon: "✍️",
    desc: "提交 1 次改寫句子",
    check: (s) => s.writesCompleted >= 1,
  },
  {
    id: "voter",
    name: "評論家",
    icon: "🗳️",
    desc: "參與 1 次投票",
    check: (s) => s.votesCast >= 1,
  },
];

// ============================================
// State Management
// ============================================

let state = {
  stars: 0,
  currentStreak: 0, // Current session streak
  maxStreak: 0,

  // Progress tracking
  storiesCompleted: 0,
  writesCompleted: 0,
  votesCast: 0,
  unlockedBadges: [],

  // Find Mode
  findIdx: 0,
  findShuffled: [],

  // Compare Mode
  cmpIdx: 0,
  cmpShuffled: [],

  // Story Mode
  storyIdx: 0,
  storySelectedIndices: new Set(),

  // Rewrite
  rewriteCurrentBase: "",
  rewriteWorks: [],

  // Challenge (Class)
  challengeRunning: false,
  challengeTimer: null,
  challengeTimeLeft: 0,
  challengeScore: 0,
  challengeTeam: "",
  challengeCurrentQ: null,

  // Vote
  voteCandidates: [],
};

// ============================================
// Init
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  loadLocalData();

  initTabs();
  initFindMode();
  initCompareMode();
  initRewriteMode();
  initChallengeMode();
  initVoteMode();
  initStoryMode();

  // Initial renders
  renderScore();
  renderBadges();

  // Global Listeners
  document
    .getElementById("btnShowBadges")
    .addEventListener("click", toggleBadges);

  // Confetti setup
  setupConfetti();
});

function loadLocalData() {
  const saved = localStorage.getItem("p5_copilot_save");
  if (saved) {
    const parsed = JSON.parse(saved);
    // Merge saved state cautiously
    state.stars = parsed.stars || 0;
    state.maxStreak = parsed.maxStreak || 0;
    state.unlockedBadges = parsed.unlockedBadges || [];
    state.storiesCompleted = parsed.storiesCompleted || 0;
    state.writesCompleted = parsed.writesCompleted || 0;
    state.votesCast = parsed.votesCast || 0;

    // Resume leaderboards/votes
    state.voteCandidates = parsed.voteCandidates || [];
    state.rewriteWorks = parsed.rewriteWorks || [];
  }
}

function saveLocalData() {
  const toSave = {
    stars: state.stars,
    maxStreak: state.maxStreak,
    unlockedBadges: state.unlockedBadges,
    storiesCompleted: state.storiesCompleted,
    writesCompleted: state.writesCompleted,
    votesCast: state.votesCast,
    voteCandidates: state.voteCandidates,
    rewriteWorks: state.rewriteWorks,
  };
  localStorage.setItem("p5_copilot_save", JSON.stringify(toSave));
}

// ============================================
// Core Logic & Gamification
// ============================================

function addStar(amount = 1) {
  state.stars += amount;
  checkBadges();
  saveLocalData();
  renderScore();
  fireConfetti({ x: 0.1, y: 0.1 }); // Mini confetti at top left
}

function updateStreak(isCorrect) {
  if (isCorrect) {
    state.currentStreak++;
    if (state.currentStreak > state.maxStreak) {
      state.maxStreak = state.currentStreak;
    }
  } else {
    state.currentStreak = 0;
  }
  checkBadges();
  renderScore();
}

function checkBadges() {
  let newUnlock = false;
  BADGES.forEach((b) => {
    if (!state.unlockedBadges.includes(b.id) && b.check(state)) {
      state.unlockedBadges.push(b.id);
      newUnlock = true;
      showToastBadge(b);
    }
  });

  if (newUnlock) {
    saveLocalData();
    renderBadges();
    fireConfetti(); // Big confetti for badge
  }
}

function renderScore() {
  document.getElementById("headerStars").textContent = state.stars;
  document.getElementById("headerStreak").textContent = state.currentStreak;

  document.getElementById("introTotalStars").textContent = state.stars;

  // Intro progress bar (simple logic: 0-100 stars)
  const pct = Math.min(100, (state.stars / 20) * 100);
  document.getElementById("introProgressBar").style.width = `${pct}%`;

  if (state.stars < 5)
    document.getElementById("introNextBadgeTip").textContent =
      "再得 " + (5 - state.stars) + " 顆星解鎖下一個里程碑！";
  else if (state.stars < 10)
    document.getElementById("introNextBadgeTip").textContent =
      "目標：10 顆星星！";
  else
    document.getElementById("introNextBadgeTip").textContent =
      "你是擬人法大師！";
}

function renderBadges() {
  const grid = document.getElementById("badgeGrid");
  grid.innerHTML = "";

  const miniList = document.getElementById("badgeMiniList");
  miniList.innerHTML = "";

  BADGES.forEach((b) => {
    const isUnlocked = state.unlockedBadges.includes(b.id);

    // Modal Grid Item
    const div = document.createElement("div");
    div.className = `p-4 rounded-2xl border text-center flex flex-col items-center gap-2 ${
      isUnlocked
        ? "bg-indigo-50 border-indigo-200"
        : "bg-slate-50 border-slate-100 opacity-50 grayscale"
    }`;
    div.innerHTML = `
      <div class="text-4xl shadow-sm rounded-full bg-white w-16 h-16 grid place-items-center">${b.icon}</div>
      <div>
        <div class="font-bold text-slate-800">${b.name}</div>
        <div class="text-xs text-slate-500">${b.desc}</div>
      </div>
    `;
    grid.appendChild(div);

    // Header Mini Icon
    if (isUnlocked) {
      const mini = document.createElement("div");
      mini.className =
        "w-6 h-6 rounded-full bg-white border border-slate-200 grid place-items-center text-xs";
      mini.textContent = b.icon;
      miniList.appendChild(mini);
    }
  });
}

function showToastBadge(badge) {
  // Simple alert-like or create a floating div
  // For simplicity, using a nice floating div
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-10 right-10 bg-white border-2 border-accent-yellow p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce z-50";
  toast.innerHTML = `
    <div class="text-4xl">${badge.icon}</div>
    <div>
      <div class="text-xs font-bold text-slate-400 uppercase">解鎖成就</div>
      <div class="text-lg font-black text-slate-800">${badge.name}</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

window.toggleBadges = function () {
  const el = document.getElementById("badgeModal");
  el.classList.toggle("hidden");
};

// ============================================
// Tabs
// ============================================

function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      // UI Update
      tabs.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      // Panel Update
      document
        .querySelectorAll(".tab-panel")
        .forEach((p) => p.classList.add("hidden"));
      const target = btn.getAttribute("data-tab");
      document.getElementById(target).classList.remove("hidden");
    });
  });
}

window.clickTab = function (id) {
  document.querySelector(`[data-tab="${id}"]`).click();
};

// ============================================
// 1. Story Mode
// ============================================

function initStoryMode() {
  loadStory(0);

  document.getElementById("storyNext").addEventListener("click", () => {
    if (state.storyIdx < DATA_STORY.length - 1) {
      state.storyIdx++;
      loadStory(state.storyIdx);
    }
  });

  document.getElementById("storyPrev").addEventListener("click", () => {
    if (state.storyIdx > 0) {
      state.storyIdx--;
      loadStory(state.storyIdx);
    }
  });

  document
    .getElementById("storyCheckBtn")
    .addEventListener("click", checkStory);
}

function loadStory(idx) {
  state.storyIdx = idx;
  state.storySelectedIndices.clear();

  const story = DATA_STORY[idx];
  const container = document.getElementById("storyContainer");
  container.innerHTML = `<h3 class="text-xl font-black mb-4">${story.title}</h3>`;

  const correctCount = story.content.filter((s) => s.isP).length;
  document.getElementById("storyTotalCount").textContent = `/ ${correctCount}`;
  document.getElementById("storyFoundCount").textContent = "0";
  document.getElementById("storyFeedback").classList.add("hidden");
  document.getElementById("storyCheckBtn").disabled = false;
  document.getElementById("storyCheckBtn").textContent = "檢查答案";
  document
    .getElementById("storyCheckBtn")
    .classList.remove("opacity-50", "bg-slate-400");
  document.getElementById("storyCheckBtn").classList.add("bg-brand-600");

  // Render sentences
  story.content.forEach((sent, i) => {
    const span = document.createElement("span");
    span.textContent = sent.text + " ";
    span.className =
      "sentence-hover p-1 transition-colors select-none inline-block";
    span.dataset.idx = i;
    span.onclick = () => toggleStorySentence(i, span);
    container.appendChild(span);
  });

  // Update nav buttons
  document.getElementById("storyPrev").disabled = idx === 0;
  document.getElementById("storyNext").disabled = idx === DATA_STORY.length - 1;
}

function toggleStorySentence(idx, el) {
  if (state.storySelectedIndices.has(idx)) {
    state.storySelectedIndices.delete(idx);
    el.classList.remove("sentence-selected");
  } else {
    state.storySelectedIndices.add(idx);
    el.classList.add("sentence-selected");
  }
  document.getElementById("storyFoundCount").textContent =
    state.storySelectedIndices.size;
}

function checkStory() {
  const story = DATA_STORY[state.storyIdx];
  const allElements = document
    .getElementById("storyContainer")
    .querySelectorAll("span[data-idx]");

  let correctFound = 0;
  let wrongSelections = 0;
  let missed = 0;

  allElements.forEach((el) => {
    const i = parseInt(el.dataset.idx, 10);
    const isP = story.content[i].isP;
    const isSelected = state.storySelectedIndices.has(i);

    // Clear styles
    el.classList.remove(
      "bg-green-200",
      "bg-red-200",
      "text-green-800",
      "text-red-800"
    );

    if (isP && isSelected) {
      el.classList.add("bg-green-200", "text-green-800", "font-bold");
      correctFound++;
    } else if (!isP && isSelected) {
      el.classList.add("bg-red-200", "text-red-800", "line-through");
      wrongSelections++;
    } else if (isP && !isSelected) {
      el.classList.add("border-b-2", "border-green-400", "text-green-600"); // Show missed
      missed++;
    }
  });

  const totalP = story.content.filter((x) => x.isP).length;
  const feedback = document.getElementById("storyFeedback");
  feedback.classList.remove(
    "hidden",
    "bg-green-100",
    "bg-orange-100",
    "text-green-800",
    "text-orange-800"
  );

  if (correctFound === totalP && wrongSelections === 0) {
    feedback.textContent = "完美！你找出了所有擬人句！ 🎉 +3 星星";
    feedback.classList.add("bg-green-100", "text-green-800");
    if (!document.getElementById("storyCheckBtn").disabled) {
      addStar(3);
      state.storiesCompleted++;
      checkBadges();
      fireConfetti();
    }
    document.getElementById("storyCheckBtn").disabled = true;
    document.getElementById("storyCheckBtn").textContent = "已完成";
    document
      .getElementById("storyCheckBtn")
      .classList.add("opacity-50", "bg-slate-400");
  } else {
    feedback.textContent = `找到了 ${correctFound} 個，錯了 ${wrongSelections} 個，漏了 ${missed} 個。綠色是正確，紅色是錯誤，底部綠線是漏掉的。請修正後再試！`;
    feedback.classList.add("bg-orange-100", "text-orange-800");
  }
}

// ============================================
// 2. Find Mode
// ============================================

function initFindMode() {
  state.findShuffled = shuffle([...DATA_FIND]); // Simple shuffle
  renderFindCard();

  document
    .getElementById("btnFindYes")
    .addEventListener("click", () => answerFind(true));
  document
    .getElementById("btnFindNo")
    .addEventListener("click", () => answerFind(false));
  document.getElementById("btnFindNext").addEventListener("click", nextFind);
}

function renderFindCard() {
  const q = state.findShuffled[state.findIdx % state.findShuffled.length];
  document.getElementById("findSentence").textContent = q.text;
  document.getElementById("findProgress").textContent = `${
    (state.findIdx % state.findShuffled.length) + 1
  } / ${state.findShuffled.length}`;

  // Reset
  document.getElementById("findFeedback").classList.add("hidden");
  document.getElementById("btnFindYes").disabled = false;
  document.getElementById("btnFindNo").disabled = false;
  document
    .getElementById("btnFindYes")
    .classList.remove("opacity-20", "ring-4");
  document.getElementById("btnFindNo").classList.remove("opacity-20", "ring-4");
  document.getElementById("btnFindNext").classList.add("hidden");
}

function answerFind(choice) {
  const q = state.findShuffled[state.findIdx % state.findShuffled.length];
  const isCorrect = choice === q.isPersonification;

  const feedback = document.getElementById("findFeedback");
  feedback.classList.remove(
    "hidden",
    "bg-green-50",
    "bg-red-50",
    "border-green-300",
    "border-red-300",
    "text-green-800",
    "text-red-800"
  );

  updateStreak(isCorrect);
  if (isCorrect) {
    addStar(1);
    feedback.classList.add("bg-green-50", "border-green-300", "text-green-800");
    feedback.innerHTML = `<strong>答對了！</strong> ${q.explain}`;
  } else {
    feedback.classList.add("bg-red-50", "border-red-300", "text-red-800");
    feedback.innerHTML = `<strong>哎呀！</strong> ${q.explain}`;
  }

  // Visuals
  document.getElementById("btnFindYes").disabled = true;
  document.getElementById("btnFindNo").disabled = true;

  if (choice === true) {
    document
      .getElementById("btnFindYes")
      .classList.add("ring-4", "ring-brand-200");
    document.getElementById("btnFindNo").classList.add("opacity-20");
  } else {
    document
      .getElementById("btnFindNo")
      .classList.add("ring-4", "ring-brand-200");
    document.getElementById("btnFindYes").classList.add("opacity-20");
  }

  document.getElementById("btnFindNext").classList.remove("hidden");
}

function nextFind() {
  state.findIdx++;
  renderFindCard();
}

// ============================================
// 3. Compare Mode
// ============================================

function initCompareMode() {
  state.cmpShuffled = shuffle([...DATA_COMPARE]);
  renderCompareCard();

  document.getElementById("btnCmpP").onclick = () =>
    answerCompare("personification");
  document.getElementById("btnCmpS").onclick = () => answerCompare("simile");
  document.getElementById("btnCmpN").onclick = () => answerCompare("neither");
  document.getElementById("btnCmpNext").onclick = nextCompare;
}

function renderCompareCard() {
  const q = state.cmpShuffled[state.cmpIdx % state.cmpShuffled.length];
  document.getElementById("cmpSentence").textContent = q.text;
  document.getElementById("cmpProgress").textContent = `${
    (state.cmpIdx % state.cmpShuffled.length) + 1
  } / ${state.cmpShuffled.length}`;

  document.getElementById("cmpFeedback").classList.add("hidden");
  document.getElementById("btnCmpNext").classList.add("hidden");

  document.querySelectorAll(".cmp-btn").forEach((b) => {
    b.disabled = false;
    b.classList.remove("opacity-50", "ring-4", "ring-slate-300");
  });
}

function answerCompare(type) {
  const q = state.cmpShuffled[state.cmpIdx % state.cmpShuffled.length];
  const isCorrect = type === q.type;

  updateStreak(isCorrect);
  if (isCorrect) addStar(1);

  const feedback = document.getElementById("cmpFeedback");
  feedback.classList.remove(
    "hidden",
    "bg-green-50",
    "bg-red-50",
    "text-green-800",
    "text-red-800"
  );

  const typeMap = {
    personification: "擬人",
    simile: "比喻",
    neither: "都不是",
  };

  if (isCorrect) {
    feedback.classList.add("bg-green-50", "text-green-800");
    feedback.innerHTML = `<strong>正確！</strong> ${q.explain}`;
  } else {
    feedback.classList.add("bg-red-50", "text-red-800");
    feedback.innerHTML = `<strong>答錯了。正確是【${
      typeMap[q.type]
    }】</strong><br>${q.explain}`;
  }

  document.querySelectorAll(".cmp-btn").forEach((b) => {
    b.disabled = true;
    if (b.id === "btnCmpP" && type === "personification")
      b.classList.add("ring-4", "ring-brand-400");
    else if (b.id === "btnCmpS" && type === "simile")
      b.classList.add("ring-4", "ring-orange-400");
    else if (b.id === "btnCmpN" && type === "neither")
      b.classList.add("ring-4", "ring-slate-400");
    else b.classList.add("opacity-50");
  });

  document.getElementById("btnCmpNext").classList.remove("hidden");
}

function nextCompare() {
  state.cmpIdx++;
  renderCompareCard();
}

// ============================================
// 4. Rewrite Mode
// ============================================

function initRewriteMode() {
  pickDiffRewriteBase();

  document.getElementById("btnRwNew").onclick = pickDiffRewriteBase;

  document.getElementById("btnRwSubmit").onclick = () => {
    const input = document.getElementById("rwInput").value.trim();
    if (!input) return;

    // Heuristic Check
    const keywords = [
      "笑",
      "哭",
      "說",
      "想",
      "跑",
      "跳",
      "招手",
      "點頭",
      "害羞",
      "生氣",
      "開心",
      "難過",
      "告訴",
      "撫摸",
      "親吻",
      "擁抱",
      "嘆氣",
      "唱歌",
      "跳舞",
    ];
    const hasKeyword = keywords.some((k) => input.includes(k));

    const feedback = document.getElementById("rwFeedback");
    feedback.classList.remove(
      "hidden",
      "bg-green-100",
      "bg-blue-100",
      "text-green-800",
      "text-blue-800"
    );

    if (hasKeyword) {
      feedback.classList.add("bg-green-100", "text-green-800");
      feedback.innerHTML =
        "<strong>太棒了！</strong> 你的句子好像有了生命一樣！ (+1 星星)";
      addStar(1);
    } else {
      feedback.classList.add("bg-blue-100", "text-blue-800");
      feedback.innerHTML =
        "<strong>寫得不錯！</strong> 試試看加入更多像「說」、「笑」、「跑」這樣的動作，會更像擬人法喔！";
    }

    state.writesCompleted++;
    checkBadges();

    state.rewriteWorks.unshift({
      base: state.rewriteCurrentBase,
      text: input,
      time: Date.now(),
    });
    saveLocalData();
    renderRewriteGallery();
  };

  document.getElementById("btnRwSaveToVote").onclick = () => {
    const input = document.getElementById("rwInput").value.trim();
    if (!input) return alert("請先寫句子！");

    state.voteCandidates.push({
      id: Date.now(),
      text: input,
      author: "匿名同學",
      votes: 0,
    });
    saveLocalData();
    alert("已加入投票候選！");
    renderVoteList();
    document.getElementById("rwInput").value = "";
  };

  renderRewriteGallery();
}

function pickDiffRewriteBase() {
  const t =
    DATA_REWRITE_BASE[Math.floor(Math.random() * DATA_REWRITE_BASE.length)];
  state.rewriteCurrentBase = t;
  document.getElementById("rwBase").textContent = t;
  document.getElementById("rwInput").value = "";
  document.getElementById("rwFeedback").classList.add("hidden");
}

function renderRewriteGallery() {
  const ul = document.getElementById("rwGallery");
  ul.innerHTML = "";
  state.rewriteWorks.forEach((w) => {
    const li = document.createElement("li");
    li.className = "p-3 bg-white border border-slate-100 rounded-xl text-sm";
    li.innerHTML = `<div class="text-xs text-slate-400 mb-1">原句：${w.base}</div><div class="font-bold text-slate-700">${w.text}</div>`;
    ul.appendChild(li);
  });
}

// ============================================
// 5. Challenge Mode
// ============================================

function initChallengeMode() {
  document.getElementById("btnChStart").onclick = startChallenge;
  document.getElementById("btnChStop").onclick = stopChallenge;

  // Auto-load leaderboard
  renderChallengeLeaderboard();
}

function startChallenge() {
  const team = document.getElementById("chTeamName").value.trim();
  if (!team) return alert("請輸入隊伍名稱");

  state.challengeTeam = team;
  state.challengeScore = 0;
  state.challengeTimeLeft =
    parseInt(document.getElementById("chSeconds").value, 10) || 60;
  const totalTime = state.challengeTimeLeft;

  state.challengeRunning = true;
  document.getElementById("chSetup").classList.add("hidden");
  document.getElementById("chGame").classList.remove("hidden");
  document.getElementById("chTimerBar").style.width = "100%";
  document.getElementById("chScoreDisplay").textContent = 0;

  nextChallengeQ();

  // Timer
  const startTs = Date.now();
  state.challengeTimer = setInterval(() => {
    const elapsed = (Date.now() - startTs) / 1000;
    const left = Math.max(0, totalTime - elapsed);

    document.getElementById("chTimerDisplay").textContent =
      Math.ceil(left) + "s";
    document.getElementById("chTimerBar").style.width =
      (left / totalTime) * 100 + "%";

    if (left <= 0) {
      stopChallenge();
    }
  }, 100);
}

function stopChallenge() {
  clearInterval(state.challengeTimer);
  state.challengeRunning = false;

  document.getElementById("chSetup").classList.remove("hidden");
  document.getElementById("chGame").classList.add("hidden");

  alert(
    `時間到！\n隊伍：${state.challengeTeam}\n分數：${state.challengeScore}`
  );

  // Save Leaderboard
  let board = JSON.parse(localStorage.getItem("p5_challenge_lb") || "[]");
  board.push({ name: state.challengeTeam, score: state.challengeScore });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem("p5_challenge_lb", JSON.stringify(board));

  renderChallengeLeaderboard();
  fireConfetti();
}

function nextChallengeQ() {
  if (!state.challengeRunning) return;

  const mode = document.getElementById("chMode").value;
  let type = mode;
  if (mode === "mix") type = Math.random() > 0.5 ? "find" : "compare";

  const container = document.getElementById("chAnswerArea");
  container.innerHTML = "";

  if (type === "find") {
    const q = DATA_FIND[Math.floor(Math.random() * DATA_FIND.length)];
    state.challengeCurrentQ = { ...q, qType: "find" };
    document.getElementById("chSentence").textContent = q.text;

    const b1 = document.createElement("button");
    b1.className =
      "py-6 rounded-2xl bg-brand-100 text-brand-900 font-black text-xl hover:scale-105 transition-transform";
    b1.textContent = "有擬人";
    b1.onclick = () => ansChallenge(true);

    const b2 = document.createElement("button");
    b2.className =
      "py-6 rounded-2xl bg-slate-100 text-slate-800 font-black text-xl hover:scale-105 transition-transform";
    b2.textContent = "沒有";
    b2.onclick = () => ansChallenge(false);

    container.appendChild(b1);
    container.appendChild(b2);
    container.className = "grid grid-cols-2 gap-4"; // Ensure grid
  } else {
    const q = DATA_COMPARE[Math.floor(Math.random() * DATA_COMPARE.length)];
    state.challengeCurrentQ = { ...q, qType: "compare" };
    document.getElementById("chSentence").textContent = q.text;

    const opts = [
      { t: "擬人", v: "personification", c: "bg-brand-100 text-brand-900" },
      { t: "比喻", v: "simile", c: "bg-orange-100 text-orange-900" },
      { t: "都不是", v: "neither", c: "bg-slate-100 text-slate-800" },
    ];

    opts.forEach((o) => {
      const btn = document.createElement("button");
      btn.className = `py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform ${o.c}`;
      btn.textContent = o.t;
      btn.onclick = () => ansChallenge(o.v);
      container.appendChild(btn);
    });
    container.className = "grid grid-cols-3 gap-2";
  }
}

function ansChallenge(val) {
  const q = state.challengeCurrentQ;
  let correct = false;
  if (q.qType === "find") correct = val === q.isPersonification;
  else correct = val === q.type;

  if (correct) {
    state.challengeScore += 10;
    // simple flash effect
    document.getElementById("chGame").classList.add("bg-green-50");
    setTimeout(
      () => document.getElementById("chGame").classList.remove("bg-green-50"),
      200
    );
  } else {
    state.challengeScore = Math.max(0, state.challengeScore - 5);
    document.getElementById("chGame").classList.add("bg-red-50");
    setTimeout(
      () => document.getElementById("chGame").classList.remove("bg-red-50"),
      200
    );
  }

  document.getElementById("chScoreDisplay").textContent = state.challengeScore;
  nextChallengeQ();
}

function renderChallengeLeaderboard() {
  const board = JSON.parse(localStorage.getItem("p5_challenge_lb") || "[]");
  const ul = document.getElementById("chLeaderboard");
  ul.innerHTML = "";
  board.slice(0, 5).forEach((r, i) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between p-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-600";
    li.innerHTML = `<span>#${i + 1} ${r.name}</span> <span>${
      r.score
    } 分</span>`;
    ul.appendChild(li);
  });
}
window.clearLeaderboard = function () {
  localStorage.removeItem("p5_challenge_lb");
  renderChallengeLeaderboard();
};

// ============================================
// 6. Vote Mode
// ============================================

function initVoteMode() {
  renderVoteList();

  document.getElementById("btnVoteExport").onclick = () => {
    alert("匯出功能（模擬）：\n" + JSON.stringify(state.voteCandidates));
  };
  document.getElementById("btnVoteClear").onclick = () => {
    if (confirm("清除所有投票？")) {
      state.voteCandidates = [];
      saveLocalData();
      renderVoteList();
    }
  };
}

function renderVoteList() {
  const list = document.getElementById("voteList");
  const results = document.getElementById("voteResults");
  list.innerHTML = "";
  results.innerHTML = "";

  state.voteCandidates.forEach((c) => {
    // Voting Card
    const li = document.createElement("li");
    li.className =
      "p-4 rounded-xl border border-slate-200 flex justify-between items-center bg-white";
    li.innerHTML = `
      <div>
        <div class="font-bold text-lg text-slate-800">${c.text}</div>
        <div class="text-xs text-slate-400">ID: ${c.id}</div>
      </div>
      <button class="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-lg font-bold transition-colors" onclick="castVote(${c.id})">
        👍 投票
      </button>
    `;
    list.appendChild(li);

    // Result Bar
    const rLi = document.createElement("li");
    rLi.className = "text-xs";
    rLi.innerHTML = `
      <div class="flex justify-between text-indigo-200 mb-1">
        <span class="truncate w-32">${c.text}</span>
        <span>${c.votes} 票</span>
      </div>
      <div class="w-full bg-black/20 rounded-full h-2">
        <div class="bg-accent-yellow h-2 rounded-full" style="width: ${Math.min(
          100,
          c.votes * 5
        )}%"></div>
      </div>
    `;
    results.appendChild(rLi);
  });
}

window.castVote = function (id) {
  const c = state.voteCandidates.find((x) => x.id === id);
  if (c) {
    c.votes++;
    state.votesCast++;
    saveLocalData();
    renderVoteList();
    checkBadges();
  }
};

// ============================================
// Utils: Confetti & Shuffle
// ============================================

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Simple Confetti Implementation
let confettiCtx;
let confettiCanvas;
let particles = [];

function setupConfetti() {
  confettiCanvas = document.getElementById("confetti");
  confettiCtx = confettiCanvas.getContext("2d");
  resizeConfetti();
  window.addEventListener("resize", resizeConfetti);
  requestAnimationFrame(loopConfetti);
}

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function fireConfetti(origin = { x: 0.5, y: 0.5 }) {
  const pf = 30;
  for (let i = 0; i < pf; i++) {
    particles.push({
      x: origin.x * confettiCanvas.width,
      y: origin.y * confettiCanvas.height,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 1) * 10 - 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      life: 100,
    });
  }
}

function loopConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2; // gravity
    p.life--;

    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(p.x, p.y, 6, 6);

    if (p.life <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(loopConfetti);
}
