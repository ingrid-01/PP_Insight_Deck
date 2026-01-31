/* =========================================
   1. 전역 변수 및 데이터
   ========================================= */
let currentLang = localStorage.getItem("userLang") || "ko";
let currentTheme = localStorage.getItem("userTheme") || "light";
let currentFilter = "all";
let currentCardId = null;
let currentLogType = null;
let tempColor = "B38F64";
let currentPreviewUrl = "";
let currentView = localStorage.getItem("lastView") || "hub";

// 레벨 시스템 데이터
const levelSystem = [
  { lv: 0, en: "Insight Newbie", ko: "통찰 새싹", max: 1 },
  { lv: 1, en: "Insight Starter", ko: "통찰 입문자", max: 5 },
  { lv: 2, en: "Insight Explorer", ko: "통찰 탐색자", max: 10 },
  { lv: 3, en: "Insight Adventurer", ko: "통찰 모험가", max: 20 },
  { lv: 4, en: "Insight Master", ko: "통찰 마스터", max: 50 },
];

// 배지 시스템 데이터
const badgeSystem = [
  {
    id: "first_step",
    icon: "flag",
    ko: "첫걸음",
    en: "First Step",
    desc_ko: "첫 번째 통찰 기록",
    desc_en: "Recorded first insight",
    condition: (n) => n >= 1,
  },
  {
    id: "steady",
    icon: "shutter_speed",
    ko: "꾸준함",
    en: "Steady",
    desc_ko: "3일 연속 기록",
    desc_en: "3 days streak",
    condition: (n, streak) => streak >= 3,
  },
  {
    id: "collector",
    icon: "library_books",
    ko: "수집가",
    en: "Collector",
    desc_ko: "통찰 10개 달성",
    desc_en: "Reached 10 insights",
    condition: (n) => n >= 10,
  },
  {
    id: "writer",
    icon: "edit_note",
    ko: "기록광",
    en: "Writer",
    desc_ko: "통찰 30개 달성",
    desc_en: "Reached 30 insights",
    condition: (n) => n >= 30,
  },
  {
    id: "thinker",
    icon: "psychology",
    ko: "사색가",
    en: "Thinker",
    desc_ko: "비문학 5개 기록",
    desc_en: "5 Non-fiction logs",
    condition: (n, s, cats) => cats["nonfiction"] >= 5,
  },
];

const translations = {
  ko: {
    logo: { title: "인사이트 덱", subtitle: "위기지학(爲己之學)" },
    nav: { hub: "대화 허브", archive: "아카이브", stats: "통계" },
    stats: {
      total: "총 기록된 통찰",
      streak: "연속 기록일",
      month: "이번 달 달성",
      heatmapTitle: "연간 활동 로그",
      less: "적음",
      more: "많음",
      catAnalysis: "관심 분야 분석",
      suggestion: "인사이트 코치",
      graphTitle: "지식 연결 그래프 (Mind Map)",
      badgeTitle: "명예의 전당",
      coachDefault:
        "아직 데이터가 충분하지 않습니다. 다양한 분야의 경험을 기록해보세요!",
      coachBias:
        "최근 '{best}' 분야에 집중하고 계시네요. 균형을 위해 '{worst}' 분야의 경험도 넓혀보는 건 어떨까요?",
      streakUnit: "일",
    },
    searchPlaceholder: "통찰, 주제, 질문 검색...",
    newInsightBtn: "새로운 통찰",
    logBtn: "로그",
    sidebar: {
      map: "나의 지식 지도",
      thisMonth: "이번 달",
      hub: "허브",
      total: "전체",
      filter: "필터",
      graph: {
        nonfiction: "비문학",
        news: "신문기사",
        movie: "영화",
        media: "미디어",
        art: "공연",
        fiction: "문학",
      },
    },
    filters: {
      all: "전체",
      nonfiction: "비문학",
      fiction: "문학",
      news: "신문기사",
      movie: "영화",
      art: "공연",
      media: "미디어",
    },
    zones: {
      ready: "토론 대기",
      logged: "토론 기록됨",
      internalized: "내재화됨",
    },
    modal: {
      title: "새로운 통찰 기록하기",
      cat: "카테고리",
      date: "날짜",
      datePlaceholder: "예) 2026년 1월",
      titleLabel: "제목",
      msgLabel: "핵심 메시지 (Fact)",
      saveBtn: "기록 저장하기",
      cancelBtn: "취소",
    },
    logModal: {
      title: "어떤 로그를 추가할까요?",
      reflect: { title: "자기 투영", sub: "" },
      action: { title: "실천 과제", sub: "" },
      dialogue: { title: "대화 로그", sub: "" },
      topic: { title: "토론 주제", sub: "" },
    },
    richModal: {
      save: "기록 저장",
      cancel: "취소",
      placeholder: "내용을 입력하세요...",
      tagPlaceholder: "관련 태그 추가 (쉼표로 구분)",
    },
    profile: {
      next: "다음 레벨까지",
      editName: "이름 변경",
      editPhoto: "프로필 사진 변경",
      lang: "언어",
      theme: "테마",
    },
    photoModal: {
      title: "프로필 스타일 설정",
      colorLabel: "배경 컬러 선택",
      uploadLabel: "이미지 업로드",
      uploadBtn: "파일 찾기",
      applyBtn: "적용하기",
      cancelBtn: "취소",
    },
    nameModal: {
      title: "이름 변경",
      desc: "새 닉네임 입력 (2~10자)",
      placeholder: "변경할 이름",
      applyBtn: "변경 완료",
      cancelBtn: "취소",
    },
  },
  en: {
    logo: { title: "Insight Deck", subtitle: "Know Thyself" },
    nav: { hub: "Conversation Hub", archive: "Archive", stats: "Statistics" },
    stats: {
      total: "Total Insights",
      streak: "Current Streak",
      month: "This Month",
      heatmapTitle: "Activity Log",
      less: "Less",
      more: "More",
      catAnalysis: "Category Analysis",
      suggestion: "Insight Coach",
      graphTitle: "Knowledge Graph (Mind Map)",
      badgeTitle: "Hall of Fame",
      coachDefault:
        "Not enough data yet. Try recording experiences from various fields!",
      coachBias:
        "You're focused on '{best}' lately. How about exploring '{worst}' to balance your perspective?",
      streakUnit: " days",
    },
    searchPlaceholder: "Search insights, topics...",
    newInsightBtn: "New Insight",
    logBtn: "Log",
    sidebar: {
      map: "My Knowledge Map",
      thisMonth: "This Month",
      hub: "Hub",
      total: "Total",
      filter: "Filters",
      graph: {
        nonfiction: "Non-Fi",
        news: "News",
        movie: "Movie",
        media: "Media",
        art: "Art",
        fiction: "Fiction",
      },
    },
    filters: {
      all: "All",
      nonfiction: "Non-fiction",
      fiction: "Fiction",
      news: "News",
      movie: "Movie",
      art: "Art",
      media: "Media",
    },
    zones: {
      ready: "Ready for Discussion",
      logged: "Discussion Logged",
      internalized: "Internalized",
    },
    modal: {
      title: "New Insight",
      cat: "Category",
      date: "Date",
      datePlaceholder: "Ex) Jan 2026",
      titleLabel: "Title",
      msgLabel: "Core Message",
      saveBtn: "Save Insight",
      cancelBtn: "Cancel",
    },
    logModal: {
      title: "Add New Log",
      reflect: { title: "Self-Reflection", sub: "" },
      action: { title: "Action Item", sub: "" },
      dialogue: { title: "Dialogue Log", sub: "" },
      topic: { title: "Discussion Topic", sub: "" },
    },
    richModal: {
      save: "Save Log",
      cancel: "Cancel",
      placeholder: "Type content...",
      tagPlaceholder: "Add tags (comma separated)",
    },
    profile: {
      next: "Next Level",
      editName: "Edit Name",
      editPhoto: "Edit Photo",
      lang: "Language",
      theme: "Theme",
    },
    photoModal: {
      title: "Profile Settings",
      colorLabel: "Background Color",
      uploadLabel: "Upload Image",
      uploadBtn: "Choose File",
      applyBtn: "Apply",
      cancelBtn: "Cancel",
    },
    nameModal: {
      title: "Change Name",
      desc: "Enter new nickname",
      placeholder: "New Name",
      applyBtn: "Done",
      cancelBtn: "Cancel",
    },
  },
};

const insights = [
  {
    id: 1735689600000,
    status: "ready",
    category: "news",
    subCategory: { ko: "신문기사 - 심리학", en: "News - Psychology" },
    date: "Sep 2025",
    title: "친애하는 나의 결함에게",
    content: "누구나 결함을 가지고 있다...",
    tags: ["심리학", "자아", "결핍"],
    reflect: "내 결함을...",
    action: null,
    discussionTopic: null,
    dialogue: null,
  },
  {
    id: 1738281600000,
    status: "ready",
    category: "nonfiction",
    subCategory: { ko: "비문학 - IT", en: "Non-fiction - IT" },
    date: "Oct 2025",
    title: "Moral AI",
    content: "AI의 도덕적 한계는...",
    tags: ["AI", "윤리", "미래"],
    reflect: null,
    action: "질문하기 전...",
    discussionTopic: null,
    dialogue: null,
  },
  {
    id: 1738368000000,
    status: "ready",
    category: "movie",
    subCategory: { ko: "영화 - SF/드라마", en: "Movie - SF/Drama" },
    date: "Jan 2026",
    title: "Her",
    content: "사랑은 사회적으로...",
    tags: ["AI", "사랑", "고독"],
    reflect: "AI와의 사랑...",
    action: null,
    discussionTopic: null,
    dialogue: null,
  },
];

const styles = {
  news: {
    badgeBg: "bg-accent-news/10",
    badgeText: "text-accent-news",
    icon: "newspaper",
  },
  fiction: {
    badgeBg: "bg-accent-fiction/10",
    badgeText: "text-accent-fiction",
    icon: "auto_stories",
  },
  nonfiction: {
    badgeBg: "bg-accent-nonfiction/10",
    badgeText: "text-accent-nonfiction",
    icon: "menu_book",
  },
  movie: {
    badgeBg: "bg-accent-movie/10",
    badgeText: "text-accent-movie",
    icon: "movie",
  },
  art: {
    badgeBg: "bg-accent-art/10",
    badgeText: "text-accent-art",
    icon: "palette",
  },
  media: {
    badgeBg: "bg-accent-media/10",
    badgeText: "text-accent-media",
    icon: "play_circle",
  },
};

/* =========================================
   2. DOM & 초기화
   ========================================= */
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");
const notiBtn = document.getElementById("notification-btn");
const notiDropdown = document.getElementById("notification-dropdown");
const notiBadge = document.getElementById("notification-badge");
const notiList = document.getElementById("notification-list");
const readAllBtn = document.getElementById("btn-read-all");

const writeModal = document.getElementById("write-modal");
const writeOpenBtn = document.getElementById("new-insight-btn");
const writeCloseBtn = document.getElementById("close-modal-btn");
const writeForm = document.getElementById("insight-form");

const logModal = document.getElementById("log-type-modal");
const richModal = document.getElementById("rich-input-modal");

const nameModal = document.getElementById("name-modal");
const nameInput = document.getElementById("input-profile-name");
const photoModal = document.getElementById("photo-modal");
const fileInput = document.getElementById("profile-upload-input");

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("userLang", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = translations[lang];
    keys.forEach((k) => (text = text ? text[k] : null));
    if (text) {
      el.tagName === "INPUT" || el.tagName === "TEXTAREA"
        ? (el.placeholder = text)
        : (el.innerText = text);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const keys = el.getAttribute("data-i18n-title").split(".");
    let text = translations[lang];
    keys.forEach((k) => (text = text ? text[k] : null));
    if (text) el.title = text;
  });

  updateFormCategoryOptions(lang);
  renderInsights();
  updateFilterButtons();
  updateProfileUI();
  updateLangButtons();

  if (currentView === "stats") renderStatistics();
}

function updateFormCategoryOptions(lang) {
  const select = document.getElementById("input-category");
  const options = select.options;
  for (let i = 0; i < options.length; i++) {
    const key = options[i].value;
    if (translations[lang].filters[key])
      options[i].text = translations[lang].filters[key];
  }
}

function formatDate(dateStr) {
  if (currentLang === "en") return dateStr;
  const parts = dateStr.split(" ");
  if (parts.length !== 2) return dateStr;
  const monthMap = {
    Jan: "1월",
    Feb: "2월",
    Mar: "3월",
    Apr: "4월",
    May: "5월",
    Jun: "6월",
    Jul: "7월",
    Aug: "8월",
    Sep: "9월",
    Oct: "10월",
    Nov: "11월",
    Dec: "12월",
  };
  const mon = monthMap[parts[0]];
  const year = parts[1];
  return mon && year ? `${year}년 ${mon}` : dateStr;
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("userTheme", theme);
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  updateThemeButtons();
  if (currentView === "stats") renderGraph();
}

function updateLangButtons() {
  const active =
    "px-2 py-0.5 text-[10px] font-bold rounded bg-white shadow-sm text-primary transition-all dark:bg-gray-600 dark:text-white";
  const inactive =
    "px-2 py-0.5 text-[10px] font-bold rounded text-text-muted hover:text-text-main transition-all dark:text-gray-400 dark:hover:text-white";
  document.getElementById("btn-lang-kr").className =
    currentLang === "ko" ? active : inactive;
  document.getElementById("btn-lang-en").className =
    currentLang === "en" ? active : inactive;
}

function updateThemeButtons() {
  const active =
    "px-2 py-0.5 text-[10px] font-bold rounded bg-white shadow-sm text-primary transition-all dark:bg-gray-600 dark:text-white";
  const inactive =
    "px-2 py-0.5 text-[10px] font-bold rounded text-text-muted hover:text-text-main transition-all dark:text-gray-400 dark:hover:text-white";
  document.getElementById("btn-theme-light").className =
    currentTheme === "light" ? active : inactive;
  document.getElementById("btn-theme-dark").className =
    currentTheme === "dark" ? active : inactive;
}

function setFilter(category) {
  currentFilter = category;
  renderInsights();
  updateFilterButtons();
}
function updateFilterButtons() {
  const filters = [
    "all",
    "nonfiction",
    "news",
    "fiction",
    "movie",
    "art",
    "media",
  ];
  filters.forEach((type) => {
    const btn = document.getElementById(`filter-${type}`);
    if (!btn) return;
    btn.innerText = translations[currentLang].filters[type];
    const active =
      "px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-sm transition-all";
    const inactive =
      "px-3 py-1.5 rounded-full bg-white border border-border text-text-sub text-xs font-bold transition-all hover:text-primary hover:bg-background-hover dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:text-primary-light";
    btn.className = type === currentFilter ? active : inactive;
  });
}

function renderInsights() {
  const zones = {
    ready: document.getElementById("zone-ready"),
    logged: document.getElementById("zone-logged"),
    internalized: document.getElementById("zone-internalized"),
  };
  const counts = { ready: 0, logged: 0, internalized: 0 };
  document.querySelectorAll("article").forEach((el) => el.remove());

  const filteredData =
    currentFilter === "all"
      ? insights
      : insights.filter((item) => item.category === currentFilter);

  filteredData.forEach((data) => {
    counts[data.status]++;
    if (!zones[data.status]) return;
    const style = styles[data.category] || styles.nonfiction;
    const subCatText =
      typeof data.subCategory === "object"
        ? data.subCategory[currentLang]
        : data.subCategory;
    const displayDate = formatDate(data.date);

    const cardHTML = `
      <article id="card-${data.id}" class="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group mt-5 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText} text-[10px] font-black uppercase tracking-wider"><span class="material-symbols-outlined !text-[14px]">${style.icon}</span>${subCatText}</div>
              <span class="text-[10px] font-bold text-text-muted dark:text-gray-400">${displayDate}</span>
          </div>
          <h4 class="font-bold text-lg leading-snug mb-3 serif group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-primary-light">${data.title}</h4>
          <p class="text-sm text-text-sub font-medium leading-relaxed mb-4 line-clamp-3 dark:text-gray-300">"${data.content}"</p>
          ${data.reflect ? `<div class="bg-background-section/50 p-4 rounded-xl mb-4 dark:bg-gray-700"><h5 class="text-xs font-bold text-accent-dialogue mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">psychology_alt</span> ${translations[currentLang].logModal.reflect.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium line-clamp-3 dark:text-gray-200">${data.reflect}</p></div>` : ""}
          ${data.action ? `<div class="bg-accent-action/10 p-4 rounded-xl mb-4 dark:bg-green-900/20"><h5 class="text-xs font-bold text-accent-action mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">bolt</span> ${translations[currentLang].logModal.action.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium dark:text-gray-200">${data.action}</p></div>` : ""}
          ${data.dialogue ? `<div class="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10 dark:bg-gray-700 dark:border-gray-600"><h5 class="text-xs font-bold text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider dark:text-primary-light"><span class="material-symbols-outlined !text-[16px]">forum</span> ${translations[currentLang].logModal.dialogue.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium italic dark:text-gray-200">"${data.dialogue}"</p></div>` : ""}
          ${data.discussionTopic ? `<div class="bg-accent-dialogue/10 p-3 rounded-xl mb-4 border border-accent-dialogue/20 dark:bg-orange-900/20"><h5 class="text-[10px] font-bold text-accent-dialogue mb-1 uppercase">💬 ${translations[currentLang].logModal.topic.title}</h5><p class="text-xs text-text-main font-bold dark:text-gray-200">"${data.discussionTopic}"</p></div>` : ""}
          <button onclick="openLogModal(${data.id})" class="w-full py-2.5 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-light">
            <span class="material-symbols-outlined !text-[18px]">add</span> ${translations[currentLang].logBtn}
          </button>
      </article>`;
    zones[data.status].insertAdjacentHTML("beforeend", cardHTML);
  });

  if (document.getElementById("count-ready"))
    document.getElementById("count-ready").innerText = counts.ready;
  if (document.getElementById("count-logged"))
    document.getElementById("count-logged").innerText = counts.logged;
  if (document.getElementById("count-internalized"))
    document.getElementById("count-internalized").innerText =
      counts.internalized;
  if (document.getElementById("stat-month"))
    document.getElementById("stat-month").innerText = insights.length;
  if (document.getElementById("stat-hub"))
    document.getElementById("stat-hub").innerText = counts.logged;
  if (document.getElementById("stat-total"))
    document.getElementById("stat-total").innerText = insights.length;

  document.querySelector("#zone-ready h3").innerHTML =
    `<span class="size-2.5 rounded-full bg-accent-dialogue"></span> ${translations[currentLang].zones.ready}`;
  document.querySelector("#zone-logged h3").innerHTML =
    `<span class="size-2.5 rounded-full bg-primary"></span> ${translations[currentLang].zones.logged}`;
  document.querySelector("#zone-internalized h3").innerHTML =
    `<span class="size-2.5 rounded-full bg-accent-nonfiction"></span> ${translations[currentLang].zones.internalized}`;

  updateMapStats();
  updateProfileUI();
}

function updateMapStats() {
  const total = insights.length;
  const counts = {
    nonfiction: 0,
    news: 0,
    movie: 0,
    media: 0,
    art: 0,
    fiction: 0,
  };
  insights.forEach((item) => {
    if (counts.hasOwnProperty(item.category)) counts[item.category]++;
  });
  for (const [cat, count] of Object.entries(counts)) {
    const pct = total === 0 ? 0 : Math.round((count / total) * 100);
    const bar = document.getElementById(`bar-${cat}`);
    if (bar) bar.style.width = `${pct}%`;
    const txt = document.getElementById(`pct-${cat}`);
    if (txt) txt.innerText = `${pct}%`;
    if (txt)
      txt.className =
        pct === 0
          ? "text-xs font-black text-text-muted transition-colors dark:text-gray-600"
          : `text-xs font-black ${styles[cat].badgeText.replace("bg-", "text-")} transition-colors`;
  }
}

function updateProfileUI() {
  const totalInsights = insights.length;
  let currentLvlObj = levelSystem[0];

  for (let i = 0; i < levelSystem.length; i++) {
    if (totalInsights >= levelSystem[i].max) {
      /* keep going */
    } else {
      currentLvlObj = levelSystem[i];
      break;
    }
    if (i === levelSystem.length - 1) currentLvlObj = levelSystem[i];
  }

  const title =
    currentLang === "ko"
      ? `${currentLvlObj.en} (${currentLvlObj.ko})`
      : currentLvlObj.en;
  const next =
    currentLang === "ko"
      ? `다음: 기록 ${currentLvlObj.max}개`
      : `Next: ${currentLvlObj.max} Insights`;

  document.getElementById("profile-level-badge").innerText =
    `Lv.${currentLvlObj.lv}`;
  document.getElementById("profile-title-display").innerText = title;

  let prevMax =
    currentLvlObj.lv === 0 ? 0 : levelSystem[currentLvlObj.lv - 1].max;
  let range = currentLvlObj.max - prevMax;
  let currentInRange = totalInsights - prevMax;
  let progress = Math.min((currentInRange / range) * 100, 100);
  if (
    currentLvlObj.lv === levelSystem.length - 1 &&
    totalInsights >= currentLvlObj.max
  )
    progress = 100;

  document.getElementById("profile-progress-bar").style.width = `${progress}%`;
  document.getElementById("profile-next-goal").innerText = next;
}

// 이벤트 리스너
writeOpenBtn.addEventListener("click", () =>
  writeModal.classList.remove("hidden"),
);
writeCloseBtn.addEventListener("click", () =>
  writeModal.classList.add("hidden"),
);
writeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("input-category").value;
  let subCatKo = "기타",
    subCatEn = "Other";
  const catMap = {
    news: ["신문기사", "News"],
    fiction: ["문학", "Fiction"],
    nonfiction: ["비문학", "Non-fiction"],
    movie: ["영화", "Movie"],
    art: ["공연", "Performance"],
    media: ["영상/미디어", "Media"],
  };
  if (catMap[category]) {
    subCatKo = catMap[category][0];
    subCatEn = catMap[category][1];
  }

  const rawDate = document.getElementById("input-date").value || "Jan 2026";

  const newInsight = {
    id: Date.now(),
    status: "ready",
    category: category,
    subCategory: { ko: subCatKo, en: subCatEn },
    date: rawDate,
    title: document.getElementById("input-title").value,
    content: document.getElementById("input-content").value,
    tags: [],
    reflect: null,
    action: null,
    discussionTopic: null,
    dialogue: null,
  };
  insights.unshift(newInsight);
  renderInsights();
  writeModal.classList.add("hidden");
  writeForm.reset();
  if (currentView === "stats") renderStatistics();
});

// 알림창
function renderNotifications() {
  notiList.innerHTML = "";
  const targetCard = insights.find((c) => c.id === 1);
  if (targetCard) {
    const msg =
      currentLang === "ko"
        ? `'${targetCard.title}' 글을 작성한 지 1년이 지났습니다.`
        : `It's been a year since you wrote '${targetCard.title}'.`;
    const time =
      currentLang === "ko" ? "방금 전 • 리마인드" : "Just now • Reminder";
    const notiHTML = `<li onclick="scrollToCard(${targetCard.id}, this)" class="px-5 py-4 border-b border-border hover:bg-background-hover cursor-pointer transition-colors flex gap-3 items-start dark:border-gray-700 dark:hover:bg-gray-700"><div class="noti-dot mt-1 min-w-[8px] size-2 rounded-full bg-primary"></div><div><p class="text-xs font-bold text-text-main mb-1 line-clamp-2 dark:text-white">${msg}</p><span class="text-[10px] text-text-sub font-medium dark:text-gray-400">${time}</span></div></li>`;
    notiList.insertAdjacentHTML("beforeend", notiHTML);
  }
}
setTimeout(() => {
  renderNotifications();
  const isRead = localStorage.getItem("isNotiRead");
  if (isRead !== "true") notiBadge.classList.remove("hidden");
}, 2000);

notiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notiDropdown.classList.toggle("hidden");
  notiBadge.classList.add("hidden");
  localStorage.setItem("isNotiRead", "true");
  profileDropdown.classList.add("hidden");
});
readAllBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  document
    .querySelectorAll("#notification-list li")
    .forEach((item) => markItemAsRead(item));
});

// 프로필 드롭다운
profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (profileDropdown.classList.contains("hidden")) {
    updateProfileUI();
    profileDropdown.classList.remove("hidden");
    notiDropdown.classList.add("hidden");
  } else {
    profileDropdown.classList.add("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (!notiBtn.contains(e.target) && !notiDropdown.contains(e.target))
    notiDropdown.classList.add("hidden");
  if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target))
    profileDropdown.classList.add("hidden");
});

// 로그 모달
function openLogModal(cardId) {
  currentCardId = cardId;
  logModal.classList.remove("hidden");
}
function closeLogModal() {
  logModal.classList.add("hidden");
}
function closeRichInputModal() {
  richModal.classList.add("hidden");
  currentCardId = null;
  currentLogType = null;
  document.getElementById("rich-input-field").value = "";
  // 태그 입력 초기화
  const tagInput = document.querySelector(
    "#rich-input-modal input[type='text']",
  );
  if (tagInput) tagInput.value = "";
}
function selectLogType(type) {
  if (!currentCardId) return;
  currentLogType = type;
  closeLogModal();
  openRichInputModal(type);
}
function openRichInputModal(type) {
  const txt = translations[currentLang].logModal[type];
  document.getElementById("rich-modal-title").innerHTML =
    `<span class="material-symbols-outlined ${type === "reflect" ? "text-accent-dialogue" : type === "action" ? "text-accent-action" : type === "dialogue" ? "text-primary" : "text-accent-news"} text-[24px]"></span> ${txt.title}`;
  document.getElementById("rich-modal-desc").innerText =
    type === "reflect"
      ? currentLang === "ko"
        ? "이 내용이 현재 나의 상황이나 경험과 어떻게 연결되나요?"
        : "How does this relate to your current situation or experience?"
      : type === "action"
        ? currentLang === "ko"
          ? "이 통찰을 삶에 적용하기 위해 당장 실천할 수 있는 행동은?"
          : "What immediate action can you take?"
        : type === "dialogue"
          ? currentLang === "ko"
            ? "기억하고 싶은 대화 내용을 기록하세요."
            : "Record key points from conversations."
          : currentLang === "ko"
            ? "논의해보고 싶은 질문을 던져보세요."
            : "Pose a question to discuss.";

  // 태그 불러오기 (기존 태그가 있다면)
  const card = insights.find((c) => c.id === currentCardId);
  const tagInput = document.querySelector(
    "#rich-input-modal input[type='text']",
  );
  if (card && card.tags && tagInput) {
    tagInput.value = card.tags.join(", ");
  }

  document.getElementById("rich-input-field").focus();
  richModal.classList.remove("hidden");
}
function saveRichInput() {
  const inputVal = document.getElementById("rich-input-field").value;
  if (!inputVal.trim()) {
    alert(
      currentLang === "ko" ? "내용을 입력해주세요." : "Please enter content.",
    );
    return;
  }
  const card = insights.find((c) => c.id === currentCardId);
  if (card) {
    if (currentLogType === "reflect") card.reflect = inputVal;
    if (currentLogType === "action") card.action = inputVal;
    if (currentLogType === "dialogue") {
      card.dialogue = inputVal;
      card.status = "logged";
    }
    if (currentLogType === "topic") card.discussionTopic = inputVal;

    // [New] 태그 저장 로직 추가
    const tagInput = document.querySelector(
      "#rich-input-modal input[type='text']",
    );
    if (tagInput && tagInput.value.trim()) {
      // 쉼표로 구분하여 배열로 저장
      card.tags = tagInput.value.split(",").map((t) => t.trim());
    }

    renderInsights();
    closeRichInputModal();
  }
}

// 헬퍼 함수
function markItemAsRead(liElement) {
  if (!liElement) return;
  liElement.classList.add("opacity-50");
  liElement
    .querySelector(".noti-dot")
    ?.classList.replace("bg-primary", "bg-transparent");
}
function scrollToCard(cardId, element) {
  markItemAsRead(element);
  setFilter("all");
  notiDropdown.classList.add("hidden");
  const targetCard = document.getElementById(`card-${cardId}`);
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    targetCard.classList.add(
      "ring-4",
      "ring-primary/50",
      "transition-all",
      "duration-500",
    );
    setTimeout(
      () => targetCard.classList.remove("ring-4", "ring-primary/50"),
      2000,
    );
  }
}

// 이름/사진 변경
function editProfileName() {
  profileDropdown.classList.add("hidden");
  nameInput.value = document.getElementById("profile-name-display").innerText;
  nameModal.classList.remove("hidden");
  nameInput.focus();
}
function closeNameModal() {
  nameModal.classList.add("hidden");
}
function saveProfileName() {
  const newName = nameInput.value.trim();
  if (newName.length < 2 || newName.length > 10) return;
  document.getElementById("profile-name-display").innerText = newName;
  localStorage.setItem("userName", newName);
  const savedColor = localStorage.getItem("userProfileColor") || "B38F64";
  const newImgUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${newName}&backgroundColor=${savedColor}&textColor=ffffff&chars=1`;
  document.getElementById("profile-img").src = newImgUrl;
  localStorage.setItem("userProfileImg", newImgUrl);
  closeNameModal();
}
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveProfileName();
  }
});

function editProfileImage() {
  profileDropdown.classList.add("hidden");
  photoModal.classList.remove("hidden");
  const src = document.getElementById("profile-img").src;
  document.getElementById("preview-profile-img").src = src;
  currentPreviewUrl = src;
}
function closePhotoModal() {
  photoModal.classList.add("hidden");
  fileInput.value = "";
}
function selectBgColor(color) {
  tempColor = color;
  const name = document.getElementById("profile-name-display").innerText;
  currentPreviewUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=${color}&textColor=ffffff&chars=1`;
  document.getElementById("preview-profile-img").src = currentPreviewUrl;
}
function triggerFileUpload() {
  fileInput.click();
}
fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const max = 200;
      let w = img.width,
        h = img.height;
      if (w > h) {
        if (w > max) {
          h *= max / w;
          w = max;
        }
      } else {
        if (h > max) {
          w *= max / h;
          h = max;
        }
      }
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      currentPreviewUrl = canvas.toDataURL("image/jpeg", 0.8);
      document.getElementById("preview-profile-img").src = currentPreviewUrl;
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});
function saveProfileImage() {
  document.getElementById("profile-img").src = currentPreviewUrl;
  localStorage.setItem("userProfileImg", currentPreviewUrl);
  if (currentPreviewUrl.includes("dicebear"))
    localStorage.setItem("userProfileColor", tempColor);
  closePhotoModal();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !photoModal.classList.contains("hidden")) {
    e.preventDefault();
    saveProfileImage();
  }
});

/* =========================================
   5. 초기화
   ========================================= */

function toggleMobileSearch() {
  const bar = document.getElementById("mobile-search-bar");
  const input = document.getElementById("mobile-search-input");
  if (bar.classList.contains("hidden")) {
    bar.classList.remove("hidden");
    document.getElementById("notification-dropdown").classList.add("hidden");
    document.getElementById("profile-dropdown").classList.add("hidden");
    setTimeout(() => input.focus(), 100);
  } else {
    bar.classList.add("hidden");
  }
}

function resetDashboard() {
  switchView("hub");
  setFilter("all");
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("mobile-search-bar").classList.add("hidden");
  document.getElementById("write-modal").classList.add("hidden");
}

document.addEventListener("click", (e) => {
  const searchBar = document.getElementById("mobile-search-bar");
  const searchBtn = document.querySelector(
    "button[onclick='toggleMobileSearch()']",
  );
  if (
    !searchBar.classList.contains("hidden") &&
    !searchBar.contains(e.target) &&
    !searchBtn.contains(e.target)
  ) {
    searchBar.classList.add("hidden");
  }
});

document.getElementById("desktop-search")?.addEventListener("input", (e) => {
  const val = e.target.value;
  const mobileInput = document.getElementById("mobile-search-input");
  if (mobileInput) mobileInput.value = val;
});

document
  .getElementById("mobile-search-input")
  ?.addEventListener("input", (e) => {
    const val = e.target.value;
    const desktopInput = document.getElementById("desktop-search");
    if (desktopInput) desktopInput.value = val;
  });

// SPA & Statistics Logic

function switchView(viewName) {
  currentView = viewName;
  localStorage.setItem("lastView", viewName);
  const hubView = document.getElementById("view-hub");
  const statsView = document.getElementById("view-stats");
  const navHub = document.getElementById("nav-hub");
  const navStats = document.getElementById("nav-stats");

  const activeClass =
    "flex items-center gap-2 text-primary relative after:absolute after:bottom-[-22px] after:left-0 after:w-full after:h-0.5 after:bg-primary dark:text-primary-light";
  const inactiveClass =
    "flex items-center gap-2 text-text-sub hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary-light";

  if (navHub)
    navHub.className = viewName === "hub" ? activeClass : inactiveClass;
  if (navStats)
    navStats.className = viewName === "stats" ? activeClass : inactiveClass;

  if (viewName === "hub") {
    hubView.classList.remove("hidden");
    statsView.classList.add("hidden");
  } else {
    hubView.classList.add("hidden");
    statsView.classList.remove("hidden");
    renderStatistics();
  }
}

function renderStatistics() {
  renderSummaryCards();
  renderHeatmap();
  renderCategoryAnalysis();
  renderGraph();
  renderBadges();
}

function calculateStreak() {
  if (insights.length === 0) return 0;
  const sorted = insights
    .map((i) => new Date(i.id).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);
  const uniqueDates = [...new Set(sorted)];

  let streak = 0;
  let today = new Date().setHours(0, 0, 0, 0);

  if (uniqueDates[0] !== today && uniqueDates[0] !== today - 86400000) return 0;

  let checkDate = uniqueDates[0];
  streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    if (uniqueDates[i] === checkDate - 86400000) {
      streak++;
      checkDate = uniqueDates[i];
    } else {
      break;
    }
  }
  return streak;
}

function renderSummaryCards() {
  document.getElementById("stats-total-count").innerText = insights.length;
  const now = new Date();
  const thisMonthCount = insights.filter((i) => {
    const d = new Date(i.id);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;
  document.getElementById("stats-month-count").innerText = thisMonthCount;

  const streak = calculateStreak();
  const unit = translations[currentLang].stats.streakUnit;
  document.getElementById("stats-streak").innerText = streak + unit;
}

function renderHeatmap() {
  const grid = document.getElementById("heatmap-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  const dateMap = {};
  insights.forEach((i) => {
    const d = new Date(i.id);
    const key = d.toISOString().split("T")[0];
    dateMap[key] = (dateMap[key] || 0) + 1;
  });

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const count = dateMap[dateStr] || 0;
    let colorClass = "bg-gray-100 dark:bg-gray-700";
    if (count >= 1) colorClass = "bg-primary/30";
    if (count >= 2) colorClass = "bg-primary/60";
    if (count >= 4) colorClass = "bg-primary";

    const cell = document.createElement("div");
    cell.className = `size-3 rounded-sm ${colorClass} transition-colors hover:ring-1 hover:ring-text-sub cursor-pointer relative group`;
    cell.title = `${dateStr}: ${count}`;
    grid.appendChild(cell);
  }
}

function renderCategoryAnalysis() {
  const counts = {
    nonfiction: 0,
    news: 0,
    movie: 0,
    media: 0,
    art: 0,
    fiction: 0,
  };
  insights.forEach((item) => {
    if (counts.hasOwnProperty(item.category)) counts[item.category]++;
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxVal = sorted[0][1] || 1;
  const listEl = document.getElementById("stats-category-list");
  if (!listEl) return;
  listEl.innerHTML = "";
  sorted.forEach(([cat, count]) => {
    if (count === 0) return;
    const pct = (count / insights.length) * 100;
    const widthPct = (count / maxVal) * 100;
    const style = styles[cat] || styles.nonfiction;
    const name = translations[currentLang].filters[cat];
    const html = `
      <div class="mb-2">
          <div class="flex justify-between text-xs font-bold mb-1 text-text-sub dark:text-gray-300">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined !text-[14px] ${style.badgeText}">${style.icon}</span> ${name}</span>
              <span>${count} (${Math.round(pct)}%)</span>
          </div>
          <div class="w-full bg-background-section rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div class="h-full rounded-full ${style.badgeText.replace("text-", "bg-")}" style="width: ${widthPct}%"></div>
          </div>
      </div>`;
    listEl.insertAdjacentHTML("beforeend", html);
  });

  const bestCat = translations[currentLang].filters[sorted[0][0]];
  const worstCat =
    translations[currentLang].filters[sorted[sorted.length - 1][0]];
  const msgEl = document.getElementById("stats-coach-msg");
  if (insights.length < 3) {
    msgEl.innerText = translations[currentLang].stats.coachDefault;
  } else {
    let text = translations[currentLang].stats.coachBias;
    text = text.replace("{best}", bestCat).replace("{worst}", worstCat);
    msgEl.innerText = text;
  }
}

function renderGraph() {
  const canvas = document.getElementById("knowledge-graph");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  const nodes = [];
  const links = [];

  // [New] 카테고리별 색상 매핑 (Hex 코드 사용)
  const catColors = {
    nonfiction: "#648F73",
    fiction: "#B38F64",
    news: "#7D8FA1",
    movie: "#8E7CC3",
    art: "#D0607A",
    media: "#E08E79",
  };

  insights.forEach((i) => {
    nodes.push({
      id: `i-${i.id}`,
      type: "insight",
      label: i.title,
      category: i.category,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
    });
    if (i.tags && i.tags.length > 0) {
      i.tags.forEach((tag) => {
        let tagNode = nodes.find((n) => n.type === "tag" && n.label === tag);
        if (!tagNode) {
          tagNode = {
            id: `t-${tag}`,
            type: "tag",
            label: tag,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0,
            vy: 0,
          };
          nodes.push(tagNode);
        }
        links.push({ source: `i-${i.id}`, target: tagNode.id });
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node) => {
      let dx = canvas.width / 2 - node.x;
      let dy = canvas.height / 2 - node.y;
      node.vx += dx * 0.005;
      node.vy += dy * 0.005;

      nodes.forEach((other) => {
        if (node === other) return;
        let dx = node.x - other.x;
        let dy = node.y - other.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          let force = (100 - dist) / 100;
          node.vx += (dx / dist) * force * 2;
          node.vy += (dy / dist) * force * 2;
        }
      });
    });

    links.forEach((link) => {
      let source = nodes.find((n) => n.id === link.source);
      let target = nodes.find((n) => n.id === link.target);
      if (source && target) {
        let dx = target.x - source.x;
        let dy = target.y - source.y;
        source.vx += dx * 0.05;
        source.vy += dy * 0.05;
        target.vx -= dx * 0.05;
        target.vy -= dy * 0.05;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle =
          currentTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.stroke();
      }
    });

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      node.vx *= 0.9;
      node.vy *= 0.9;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.type === "insight" ? 6 : 4, 0, Math.PI * 2);

      if (node.type === "insight") {
        // [New] 매핑된 색상 사용
        ctx.fillStyle = catColors[node.category] || "#3E5C53";
      } else {
        ctx.fillStyle = "#999999";
      }
      ctx.fill();

      ctx.fillStyle = currentTheme === "dark" ? "#eee" : "#333";
      ctx.font = "10px Noto Sans KR";
      ctx.fillText(node.label, node.x + 8, node.y + 3);
    });

    if (window.graphFrameCount < 100) {
      window.graphFrameCount++;
      requestAnimationFrame(animate);
    }
  }
  window.graphFrameCount = 0;
  animate();
}

function renderBadges() {
  const badgeList = document.getElementById("badge-list");
  if (!badgeList) return;
  badgeList.innerHTML = "";

  const total = insights.length;
  const streak = calculateStreak();
  const catCounts = {};
  insights.forEach(
    (i) => (catCounts[i.category] = (catCounts[i.category] || 0) + 1),
  );

  const currentLvl =
    levelSystem.find((l, i) => total < (levelSystem[i + 1]?.max || 9999)) ||
    levelSystem[levelSystem.length - 1];
  const nextMax =
    levelSystem.find((l) => l.lv === currentLvl.lv + 1)?.max || currentLvl.max;

  document.getElementById("stats-lvl-name").innerText =
    currentLang === "ko" ? currentLvl.ko : currentLvl.en;
  document.getElementById("stats-lvl-progress").innerText =
    `${total} / ${nextMax}`;
  let pct = (total / nextMax) * 100;
  if (total >= nextMax) pct = 100;
  document.getElementById("stats-lvl-bar").style.width = `${pct}%`;

  const msg =
    currentLang === "ko"
      ? "훌륭합니다! 계속 정진하세요."
      : "Great job! Keep moving forward.";
  document.getElementById("stats-lvl-msg").innerText = msg;

  badgeSystem.forEach((badge) => {
    const isUnlocked = badge.condition(total, streak, catCounts);
    const opacity = isUnlocked ? "opacity-100" : "opacity-30 grayscale";
    const bg = isUnlocked
      ? "bg-white dark:bg-gray-800 shadow-sm"
      : "bg-gray-100 dark:bg-gray-800";
    const name = currentLang === "ko" ? badge.ko : badge.en;

    const html = `
      <div class="flex flex-col items-center p-3 rounded-2xl ${bg} ${opacity} transition-all border border-border dark:border-gray-700">
        <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
          <span class="material-symbols-outlined">${badge.icon}</span>
        </div>
        <span class="text-xs font-bold text-text-main dark:text-white">${name}</span>
      </div>
    `;
    badgeList.insertAdjacentHTML("beforeend", html);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setTheme(currentTheme);
  setLanguage(currentLang);

  const savedName = localStorage.getItem("userName");
  if (savedName)
    document.getElementById("profile-name-display").innerText = savedName;

  const savedImg = localStorage.getItem("userProfileImg");
  if (savedImg) {
    document.getElementById("profile-img").src = savedImg;
  } else {
    const defaultName = savedName || "Lisa";
    const defaultUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${defaultName}&backgroundColor=B38F64&textColor=ffffff&chars=1`;
    document.getElementById("profile-img").src = defaultUrl;
  }

  const savedColor = localStorage.getItem("userProfileColor");
  if (savedColor) tempColor = savedColor;

  switchView(currentView);
});
