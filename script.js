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
let datePicker = null;

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
    archive: {
      title: "지식 서재",
      subtitle: "내재화된 통찰들이 머무는 공간",
      collections: "컬렉션 (Tags)",
      empty: "아직 서재가 비어있습니다. 통찰을 내재화(Internalize) 해보세요.",
      moveBtn: "서재로 보내기 (완료)",
      restoreBtn: "다시 허브로 보내기",
    },
    daily: {
      refresh: "다른 질문 보기",
      placeholder: "이 질문에 대한 현재의 생각은?",
      btn: "기록에 덧붙이기",
      questions: [
        "이 생각은 여전히 유효한가요? 아니면 수정이 필요한가요?",
        "이때와 비교해서 지금의 나는 얼마나 성장했나요?",
        "이 내용을 지금의 삶에 어떻게 적용해볼 수 있을까요?",
        "이때의 감정과 지금 느끼는 감정은 어떻게 다른가요?",
        "이 기록을 통해 얻은 가장 큰 깨달음은 무엇이었나요?",
        "만약 과거의 나에게 조언을 해준다면 뭐라고 말하고 싶나요?",
      ],
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
      addLogBtn: "추가 로그 작성하기", // [New]
    },
    logModal: {
      title: "어떤 로그를 추가할까요?",
      reflect: { title: "자기 투영", sub: "" },
      action: { title: "실천 과제", sub: "" },
      dialogue: { title: "대화 로그", sub: "" },
      topic: { title: "토론 주제", sub: "" },
      cancelBtn: "취소",
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
    msg: {
      deleteConfirm:
        "이 기록을 정말 삭제하시겠습니까? 이 작업은 복구할 수 없습니다.",
    },
  },
  en: {
    logo: { title: "Insight Deck", subtitle: "Know Thyself" },
    nav: { hub: "Conversation Hub", archive: "Archive", stats: "Statistics" },
    modal: {
      title: "New Insight",
      cat: "Category",
      date: "Date",
      datePlaceholder: "Ex) Jan 2026",
      titleLabel: "Title",
      msgLabel: "Core Message",
      saveBtn: "Save Insight",
      cancelBtn: "Cancel",
      addLogBtn: "Add Optional Log", // [New]
    },
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
    archive: {
      title: "The Library",
      subtitle: "Where verified insights rest.",
      collections: "Collections",
      empty: "The library is empty. Try internalizing your insights.",
      moveBtn: "Archive (Done)",
      restoreBtn: "Restore to Hub",
    },
    daily: {
      refresh: "Refresh Question",
      placeholder: "What are your thoughts on this now?",
      btn: "Append to Log",
      questions: [
        "Is this thought still valid, or does it need updating?",
        "How much have you grown since you wrote this?",
        "How can you apply this insight to your life today?",
        "How does your emotion now compare to back then?",
        "What was the biggest takeaway from this record?",
        "What advice would you give to your past self?",
      ],
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
    logModal: {
      title: "Add New Log",
      reflect: { title: "Self-Reflection", sub: "" },
      action: { title: "Action Item", sub: "" },
      dialogue: { title: "Dialogue Log", sub: "" },
      topic: { title: "Discussion Topic", sub: "" },
      cancelBtn: "Cancel",
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
    msg: {
      deleteConfirm:
        "Are you sure you want to delete this insight? This action cannot be undone.",
    },
  },
};

// [수정 1] 하드코딩 된 데이터를 'initialData'라는 이름으로 변경 (초기화용)
const initialData = [
  {
    id: 1735689600000,
    status: "ready",
    category: "news",
    subCategory: { ko: "신문기사 - 심리학", en: "News - Psychology" },
    date: "2025-09-15", // [중요] 날짜 포맷을 달력과 맞추기 위해 YYYY-MM-DD로 변경
    title: "친애하는 나의 결함에게",
    content:
      "누구나 결함을 가지고 있다. 하지만 그것을 감추려 할수록 그림자는 더 짙어진다.",
    tags: ["심리학", "자아", "결핍"],
    reflect: "나는 결함을 없애야 할 적으로만 여겼다. 하지만...",
    action: null,
    discussionTopic: null,
    dialogue: null,
  },
  {
    id: 1738281600000,
    status: "ready",
    category: "nonfiction",
    subCategory: { ko: "비문학 - IT", en: "Non-fiction - IT" },
    date: "2025-10-01",
    title: "Moral AI",
    content:
      "AI의 도덕적 한계는 기술의 문제가 아니라, 그것을 학습시키는 인간 윤리의 투영이다.",
    tags: ["AI", "윤리", "미래"],
    reflect: null,
    action: "AI에게 질문하기 전에 나의 의도를 먼저 점검하자.",
    discussionTopic: null,
    dialogue: null,
  },
  {
    id: 1738368000000,
    status: "ready",
    category: "movie",
    subCategory: { ko: "영화 - SF/드라마", en: "Movie - SF/Drama" },
    date: "2026-01-15",
    title: "Her",
    content:
      "사랑은 사회적으로 정의되는 것이 아니라, 두 존재 사이의 고유한 주파수다.",
    tags: ["AI", "사랑", "고독"],
    reflect: "AI와의 사랑을 다루지만, 결국 인간 본연의 고독에 대한 이야기였다.",
    action: null,
    discussionTopic: null,
    dialogue: null,
  },
];

// [수정 2] 실제 사용할 'insights' 변수는 로컬 스토리지에서 불러옵니다.
// (저장된 게 있으면 가져오고, 없으면 방금 만든 initialData를 사용합니다.)
let insights =
  JSON.parse(localStorage.getItem("insightDeckData")) || initialData;

// [NEW] 데이터를 저장하는 함수 (데이터가 변경될 때마다 호출할 예정)
function saveInsights() {
  localStorage.setItem("insightDeckData", JSON.stringify(insights));
}

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
  initDatePicker();
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
  if (!dateStr) return "";

  // 만약 기존 데이터(Jan 2026) 형식이면 기존 로직 처리
  if (dateStr.includes(" ")) {
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

  // [NEW] YYYY-MM-DD 형식 파싱
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return dateStr; // 날짜가 아니면 그대로 반환

  if (currentLang === "ko") {
    // 한국어: 2026년 1월 15일
    return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  } else {
    // 영어: Jan 15, 2026
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
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
  // 초기화
  Object.values(zones).forEach((el) => {
    if (el) el.innerHTML = "";
  });

  // 헤더 다시 그리기 (innerHTML로 지웠으므로)
  if (zones.ready)
    zones.ready.innerHTML = `<div class="flex items-center justify-between"><h3 class="font-black text-lg flex items-center gap-2 dark:text-white"><span class="size-2.5 rounded-full bg-accent-dialogue"></span> ${translations[currentLang].zones.ready}</h3><span id="count-ready" class="text-xs font-bold text-text-muted bg-background-section px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-400">0</span></div>`;
  if (zones.logged)
    zones.logged.innerHTML = `<div class="flex items-center justify-between"><h3 class="font-black text-lg flex items-center gap-2 dark:text-white"><span class="size-2.5 rounded-full bg-primary"></span> ${translations[currentLang].zones.logged}</h3><span id="count-logged" class="text-xs font-bold text-text-muted bg-background-section px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-400">0</span></div>`;
  // Internalized 존은 Hub에서 보여주긴 하되, 데이터는 비워둠 (혹은 최근 3개만 보여주는 방식도 가능하나, 깔끔하게 숨김 처리)
  if (zones.internalized)
    zones.internalized.innerHTML = `<div class="flex items-center justify-between opacity-50"><h3 class="font-black text-lg flex items-center gap-2 dark:text-white"><span class="size-2.5 rounded-full bg-accent-nonfiction"></span> ${translations[currentLang].zones.internalized} (Moved to Archive)</h3></div>`;

  const counts = { ready: 0, logged: 0, internalized: 0 };

  // [중요] 필터링: 현재 필터 + status가 internalized가 아닌 것만 Hub에 표시
  const filteredData = insights.filter((item) => {
    if (item.status === "internalized") {
      counts.internalized++; // 카운트는 세지만 렌더링은 안 함
      return false;
    }
    if (currentFilter !== "all" && item.category !== currentFilter)
      return false;
    return true;
  });

  filteredData.forEach((data) => {
    counts[data.status]++;
    if (!zones[data.status]) return;

    const style = styles[data.category] || styles.nonfiction;
    const subCatText =
      typeof data.subCategory === "object"
        ? data.subCategory[currentLang]
        : data.subCategory;
    const displayDate = formatDate(data.date);

    // 태그 HTML 생성
    const tagHTML =
      data.tags && data.tags.length > 0
        ? `<div class="flex flex-wrap gap-1 mb-3">${data.tags.map((t) => `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-text-sub dark:bg-gray-700 dark:text-gray-300">#${t}</span>`).join("")}</div>`
        : "";

    // [New] 아카이브 이동 버튼 (Logged 상태일 때만 표시)
    const archiveBtn =
      data.status === "logged"
        ? `<button onclick="moveToArchive(${data.id})" class="mt-2 w-full py-2 rounded-xl bg-accent-nonfiction/10 text-accent-nonfiction text-xs font-bold hover:bg-accent-nonfiction hover:text-white transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined !text-[16px]">inventory_2</span> ${translations[currentLang].archive.moveBtn}</button>`
        : "";

    const cardHTML = `
      <article class="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow group mt-5 dark:bg-gray-800 dark:border-gray-700 relative flex flex-col h-full">
          <div onclick="openDetailModal(${data.id})" class="cursor-pointer flex-1">
              <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText} text-[10px] font-black uppercase tracking-wider"><span class="material-symbols-outlined !text-[14px]">${style.icon}</span>${subCatText}</div>
                  <span class="text-[10px] font-bold text-text-muted dark:text-gray-400">${displayDate}</span>
              </div>
              <h4 class="font-bold text-lg leading-snug mb-2 serif group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-primary-light">${data.title}</h4>
              ${tagHTML}
              <p class="text-sm text-text-sub font-medium leading-relaxed mb-4 line-clamp-3 dark:text-gray-300">"${data.content}"</p>
              
              ${data.reflect ? `<div class="bg-background-section/50 p-3 rounded-xl mb-2 dark:bg-gray-700"><p class="text-xs text-text-main line-clamp-2 dark:text-gray-200"><span class="font-bold text-accent-dialogue">REFLECT:</span> ${data.reflect}</p></div>` : ""}
          </div>
          
          <div class="mt-3 pt-3 border-t border-border border-dashed dark:border-gray-700">
              <div class="grid ${data.status === "logged" ? "grid-cols-2" : "grid-cols-1"} gap-2">
                  <button onclick="openLogModal(${data.id})" class="py-2 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-light">
                    <span class="material-symbols-outlined !text-[16px]">add</span> ${translations[currentLang].logBtn}
                  </button>
                  ${archiveBtn}
              </div>
          </div>
      </article>`;
    zones[data.status].insertAdjacentHTML("beforeend", cardHTML);
  });

  if (document.getElementById("count-ready"))
    document.getElementById("count-ready").innerText = counts.ready;
  if (document.getElementById("count-logged"))
    document.getElementById("count-logged").innerText = counts.logged;

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

// [UPDATED] 포스트 작성 (Create Insight) 로직

// 모달 닫기 공통 함수 (초기화 포함)
function closeWriteModal() {
  writeModal.classList.add("hidden");
  document.getElementById("log-type-menu").classList.add("hidden");
  document.getElementById("creation-log-container").innerHTML = ""; // 추가된 로그 입력창 초기화
  writeForm.reset();
}

// 모달 열기/닫기 이벤트
writeOpenBtn.addEventListener("click", () =>
  writeModal.classList.remove("hidden"),
);
writeCloseBtn.addEventListener("click", closeWriteModal);

// [NEW] 로그 타입 메뉴 토글
function toggleLogTypeMenu() {
  const menu = document.getElementById("log-type-menu");
  menu.classList.toggle("hidden");
}

// [NEW] 작성 화면에 로그 입력창 동적 추가
function addCreationLog(type) {
  const container = document.getElementById("creation-log-container");
  const menu = document.getElementById("log-type-menu");

  // UI 설정을 위한 데이터
  const config = {
    reflect: {
      icon: "psychology_alt",
      color: "text-accent-dialogue",
      label: translations[currentLang].logModal.reflect.title,
    },
    action: {
      icon: "bolt",
      color: "text-accent-action",
      label: translations[currentLang].logModal.action.title,
    },
    dialogue: {
      icon: "forum",
      color: "text-primary",
      label: translations[currentLang].logModal.dialogue.title,
    },
    topic: {
      icon: "chat_bubble",
      color: "text-accent-news",
      label: translations[currentLang].logModal.topic.title,
    },
  };

  const conf = config[type];
  const uniqueId = Date.now(); // 고유 ID 생성 (삭제 등을 위해)

  const html = `
        <div id="log-entry-${uniqueId}" class="group relative bg-gray-50 p-3 rounded-xl border border-border dark:bg-gray-700/50 dark:border-gray-600 animation-fade" data-log-type="${type}">
            <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold ${conf.color} flex items-center gap-1">
                    <span class="material-symbols-outlined !text-[14px]">${conf.icon}</span> ${conf.label}
                </span>
                <button type="button" onclick="removeCreationLog('${uniqueId}')" class="text-text-muted hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined !text-[16px]">close</span>
                </button>
            </div>
            <textarea rows="2" class="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder:text-text-muted dark:text-white" placeholder="내용을 입력하세요..."></textarea>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", html);
  menu.classList.add("hidden"); // 메뉴 닫기

  // 새로 생긴 textarea에 포커스
  const newEntry = document.getElementById(`log-entry-${uniqueId}`);
  if (newEntry) newEntry.querySelector("textarea").focus();
}

// [NEW] 동적 로그 삭제
function removeCreationLog(id) {
  const el = document.getElementById(`log-entry-${id}`);
  if (el) el.remove();
}

// [UPDATED] 폼 제출 핸들러 수정
writeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. 기본 정보 수집
  const category = document.getElementById("input-category").value;
  // writeForm 이벤트 리스너 내부 수정

  // [수정] 날짜 값 가져오기
  // Flatpickr를 쓰면 input-date의 value는 "YYYY-MM-DD"가 됩니다.
  // 만약 값이 비어있으면 오늘 날짜를 포맷팅해서 넣습니다.
  let rawDate = document.getElementById("input-date").value;
  if (!rawDate) {
    // 값이 없으면 오늘 날짜 생성
    const today = new Date();
    // YYYY-MM-DD 형식으로 변환
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    rawDate = `${y}-${m}-${d}`;
  }
  const title = document.getElementById("input-title").value;
  const content = document.getElementById("input-content").value;

  // 카테고리 다국어 처리
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

  // 2. 동적 로그 데이터 수집
  // 같은 타입이 여러 개일 경우 줄바꿈으로 합침
  const logs = { reflect: [], action: [], dialogue: [], discussionTopic: [] };

  document.querySelectorAll("#creation-log-container > div").forEach((el) => {
    const type = el.getAttribute("data-log-type"); // reflect, action ...
    const val = el.querySelector("textarea").value.trim();
    if (val) {
      // discussionTopic 처리를 위해 키 매핑 (type은 topic, DB키는 discussionTopic)
      const key = type === "topic" ? "discussionTopic" : type;
      if (logs[key]) logs[key].push(val);
    }
  });

  // 3. 데이터 객체 생성
  const newInsight = {
    id: Date.now(),
    status: "ready", // 로그가 있으면 logged 상태로 시작할 수도 있지만, 일단 ready가 기본
    category: category,
    subCategory: { ko: subCatKo, en: subCatEn },
    date: rawDate,
    title: title,
    content: content,
    tags: [],
    reflect: logs.reflect.length > 0 ? logs.reflect.join("\n\n") : null,
    action: logs.action.length > 0 ? logs.action.join("\n\n") : null,
    dialogue: logs.dialogue.length > 0 ? logs.dialogue.join("\n\n") : null,
    discussionTopic:
      logs.discussionTopic.length > 0
        ? logs.discussionTopic.join("\n\n")
        : null,
  };

  // 로그가 하나라도 있으면 상태를 'logged'로 변경 (선택 사항)
  if (newInsight.reflect || newInsight.action || newInsight.dialogue) {
    newInsight.status = "logged";
  }

  // 4. 저장 및 렌더링
  insights.unshift(newInsight);
  saveInsights();
  renderInsights();

  if (currentView === "stats") renderStatistics();

  closeWriteModal(); // 초기화 및 닫기
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

    saveInsights();
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

  initDailyReflection();
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

  const views = {
    hub: document.getElementById("view-hub"),
    stats: document.getElementById("view-stats"),
    archive: document.getElementById("view-archive"), // [New]
  };

  const navs = {
    hub: document.getElementById("nav-hub"),
    stats: document.getElementById("nav-stats"),
    archive: document.getElementById("nav-archive"), // [New]
  };

  const activeClass =
    "flex items-center gap-2 text-primary relative after:absolute after:bottom-[-22px] after:left-0 after:w-full after:h-0.5 after:bg-primary dark:text-primary-light";
  const inactiveClass =
    "flex items-center gap-2 text-text-sub hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary-light";

  // 모든 뷰 숨기고 nav 스타일 초기화
  Object.keys(views).forEach((key) => {
    if (views[key]) views[key].classList.add("hidden");
    if (navs[key]) navs[key].className = inactiveClass;
  });

  // 선택된 뷰 보이기 & nav 활성화
  if (views[viewName]) views[viewName].classList.remove("hidden");
  if (navs[viewName]) navs[viewName].className = activeClass;

  // 뷰별 렌더링 함수 호출
  if (viewName === "stats") renderStatistics();
  if (viewName === "archive") renderArchive(); // [New]
  if (viewName === "hub") renderInsights();
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

/* =========================================
   [NEW] 아카이브 (Archive) 로직
   ========================================= */

// 카드 상태 변경 함수 (Hub -> Archive)
function moveToArchive(id) {
  const card = insights.find((c) => c.id === id);
  if (card) {
    if (
      confirm(
        currentLang === "ko"
          ? "이 통찰을 서재(Archive)로 옮기시겠습니까? 허브에서는 사라집니다."
          : "Move this insight to Archive? It will be hidden from the Hub.",
      )
    ) {
      card.status = "internalized";
      saveInsights();
      renderInsights(); // Hub 갱신
      // 만약 현재 통계 화면이라면 통계도 갱신
      if (currentView === "stats") renderStatistics();
    }
  }
}

let activeArchiveTag = "all";

function renderArchive() {
  const container = document.getElementById("archive-timeline");
  const tagContainer = document.getElementById("archive-tags");
  const countEl = document.getElementById("archive-count");

  if (!container || !tagContainer) return;

  container.innerHTML = "";
  tagContainer.innerHTML = "";

  // 1. 내재화된 데이터만 필터링
  let archivedData = insights.filter((i) => i.status === "internalized");
  countEl.innerText = archivedData.length;

  // 2. 태그 추출 및 렌더링
  const allTags = {};
  archivedData.forEach((i) => {
    if (i.tags) i.tags.forEach((t) => (allTags[t] = (allTags[t] || 0) + 1));
  });

  // 'All' 태그
  const allActive =
    activeArchiveTag === "all"
      ? "bg-primary text-white"
      : "bg-white border border-border text-text-sub hover:border-primary hover:text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300";
  tagContainer.insertAdjacentHTML(
    "beforeend",
    `<button onclick="filterArchiveTag('all')" class="px-3 py-1 rounded-full text-xs font-bold transition-all ${allActive}">All (${archivedData.length})</button>`,
  );

  Object.entries(allTags)
    .sort((a, b) => b[1] - a[1])
    .forEach(([tag, count]) => {
      const isActive =
        activeArchiveTag === tag
          ? "bg-primary text-white"
          : "bg-white border border-border text-text-sub hover:border-primary hover:text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300";
      tagContainer.insertAdjacentHTML(
        "beforeend",
        `<button onclick="filterArchiveTag('${tag}')" class="px-3 py-1 rounded-full text-xs font-bold transition-all ${isActive}">#${tag} (${count})</button>`,
      );
    });

  // 3. 태그 필터링 적용
  if (activeArchiveTag !== "all") {
    archivedData = archivedData.filter(
      (i) => i.tags && i.tags.includes(activeArchiveTag),
    );
  }

  if (archivedData.length === 0) {
    container.innerHTML = `<div class="pl-12 py-10 text-text-muted text-sm font-medium italic">${translations[currentLang].archive.empty}</div>`;
    return;
  }

  // 4. 날짜별 그룹핑 (연도 -> 월)
  // 날짜 포맷이 'Jan 2026' 또는 timestamp일 수 있음. timestamp 기준으로 정렬 권장.
  // 여기선 단순화를 위해 id(timestamp) 역순 정렬
  archivedData.sort((a, b) => b.id - a.id);

  let lastYear = null;
  let lastMonth = null;

  archivedData.forEach((data) => {
    const dateObj = new Date(data.id);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString(
      currentLang === "ko" ? "ko-KR" : "en-US",
      { month: "long" },
    );

    // 연도 헤더
    if (year !== lastYear) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="relative pl-8 mb-6">
                    <span class="absolute left-[-5px] top-1 size-3 rounded-full bg-primary ring-4 ring-white dark:ring-gray-900"></span>
                    <h3 class="text-2xl font-black text-primary dark:text-primary-light">${year}</h3>
                </div>
            `,
      );
      lastYear = year;
      lastMonth = null; // 연도가 바뀌면 월도 초기화
    }

    // 월 헤더 (같은 연도 내에서 월이 바뀔 때)
    if (month !== lastMonth) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="relative pl-8 mb-4">
                    <span class="absolute left-[0px] top-2 size-1.5 rounded-full bg-border dark:bg-gray-600"></span>
                    <h4 class="text-sm font-bold text-text-muted uppercase tracking-wider dark:text-gray-400">${month}</h4>
                </div>
            `,
      );
      lastMonth = month;
    }

    // 카드 아이템 (타임라인 스타일)
    const style = styles[data.category];
    const displayDate = formatDate(data.date);
    const itemHTML = `
            <div class="relative ml-8 mb-6 bg-white p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group dark:bg-gray-800 dark:border-gray-700">
                <div onclick="openDetailModal(${data.id})" class="cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined ${style.badgeText} !text-[20px]">${style.icon}</span>
                            <h5 class="font-bold text-text-main text-base group-hover:text-primary transition-colors dark:text-white">${data.title}</h5>
                        </div>
                        <span class="text-[10px] font-bold text-text-muted dark:text-gray-500">${displayDate}</span>
                    </div>
                    <p class="text-sm text-text-sub line-clamp-2 mb-2 dark:text-gray-300">${data.content}</p>
                    <div class="flex gap-2">
                        ${data.tags ? data.tags.map((t) => `<span class="text-[10px] text-text-muted bg-background-section px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400">#${t}</span>`).join("") : ""}
                    </div>
                </div>
                
                <button onclick="restoreToHub(${data.id})" class="absolute top-4 right-4 p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-gray-100 transition-all dark:hover:bg-gray-700" title="${translations[currentLang].archive.restoreBtn}">
                    <span class="material-symbols-outlined !text-[20px]">settings_backup_restore</span>
                </button>
            </div>
        `;
    container.insertAdjacentHTML("beforeend", itemHTML);
  });
}

function filterArchiveTag(tag) {
  activeArchiveTag = tag;
  renderArchive();
}

function openArchiveDetail(id) {
  // 아카이브 아이템 클릭 시 상세 보기 (여기서는 일단 로그 모달을 재활용하거나 알림만 띄움)
  // 추후 '읽기 전용 모달'을 만들면 좋음. 현재는 간단히 로그 모달 띄우기
  openLogModal(id);
}
/* =========================================
   [NEW] 상세 보기 & 복구 로직
   ========================================= */

// 1. 상세 모달 열기 (View Mode)
function openDetailModal(id) {
  const card = insights.find((c) => c.id === id);
  if (!card) return;

  const modal = document.getElementById("detail-modal");
  const style = styles[card.category];
  const subCatText =
    typeof card.subCategory === "object"
      ? card.subCategory[currentLang]
      : card.subCategory;

  // 헤더 정보 주입
  document.getElementById("detail-category-badge").className =
    `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${style.badgeBg} ${style.badgeText}`;
  document.getElementById("detail-category-badge").innerHTML =
    `<span class="material-symbols-outlined !text-[14px]">${style.icon}</span> ${subCatText}`;
  document.getElementById("detail-title").innerText = card.title;
  document.getElementById("detail-date").innerText = formatDate(card.date);
  document.getElementById("detail-content").innerText = card.content;

  // 태그 주입
  const tagsContainer = document.getElementById("detail-tags");
  tagsContainer.innerHTML = "";
  if (card.tags && card.tags.length > 0) {
    card.tags.forEach((tag) => {
      tagsContainer.insertAdjacentHTML(
        "beforeend",
        `<span class="px-2 py-1 rounded-lg text-xs font-bold bg-gray-100 text-text-sub dark:bg-gray-700 dark:text-gray-300">#${tag}</span>`,
      );
    });
  }

  // 로그 주입 (작성된 것만 표시)
  const logsContainer = document.getElementById("detail-logs-container");
  logsContainer.innerHTML = "";
  let hasLogs = false;

  // 로그 렌더링 헬퍼
  const addLogItem = (title, icon, colorClass, text) => {
    if (!text) return;
    hasLogs = true;
    const html = `
            <div class="bg-gray-50 rounded-2xl p-5 border border-border dark:bg-gray-700/50 dark:border-gray-600">
                <h5 class="text-xs font-bold ${colorClass} mb-2 flex items-center gap-2 uppercase tracking-wider">
                    <span class="material-symbols-outlined !text-[18px]">${icon}</span> ${title}
                </h5>
                <p class="text-sm text-text-main leading-relaxed dark:text-gray-200 whitespace-pre-wrap">${text}</p>
            </div>`;
    logsContainer.insertAdjacentHTML("beforeend", html);
  };

  addLogItem(
    translations[currentLang].logModal.reflect.title,
    "psychology_alt",
    "text-accent-dialogue",
    card.reflect,
  );
  addLogItem(
    translations[currentLang].logModal.action.title,
    "bolt",
    "text-accent-action",
    card.action,
  );
  addLogItem(
    translations[currentLang].logModal.dialogue.title,
    "forum",
    "text-primary",
    card.dialogue,
  );
  addLogItem(
    translations[currentLang].logModal.topic.title,
    "chat_bubble",
    "text-accent-news",
    card.discussionTopic,
  );

  if (!hasLogs) {
    logsContainer.innerHTML = `<p class="text-center text-text-muted text-sm italic py-4">"${currentLang === "ko" ? "아직 기록된 로그가 없습니다." : "No logs recorded yet."}"</p>`;
  }

  // 푸터 버튼 설정
  const restoreBtn = document.getElementById("detail-restore-btn");
  const addLogBtn = document.getElementById("detail-add-log-btn");

  // 아카이브 상태라면 '복구' 버튼 보이기
  if (card.status === "internalized") {
    restoreBtn.classList.remove("hidden");
    restoreBtn.onclick = () => {
      restoreToHub(card.id);
      closeDetailModal();
    };
    addLogBtn.classList.add("hidden"); // 아카이브에선 로그 추가 불가 (원칙상)
  } else {
    restoreBtn.classList.add("hidden");
    addLogBtn.classList.remove("hidden");
    addLogBtn.onclick = () => {
      closeDetailModal();
      openLogModal(card.id);
    };
  }

  modal.classList.remove("hidden");
}

function closeDetailModal() {
  document.getElementById("detail-modal").classList.add("hidden");
}

// 2. 허브로 되돌리기 (Restore)
function restoreToHub(id) {
  const card = insights.find((c) => c.id === id);
  if (card) {
    if (
      confirm(
        currentLang === "ko"
          ? "이 통찰을 다시 대화 허브로 가져오시겠습니까?"
          : "Restore this insight to Conversation Hub?",
      )
    ) {
      // 로그가 있으면 logged, 없으면 ready 상태로 복구
      const hasLogs = card.reflect || card.action || card.dialogue;
      card.status = hasLogs ? "logged" : "ready";

      saveInsights();
      renderInsights(); // Hub 갱신
      if (currentView === "archive") renderArchive(); // Archive 갱신
      if (currentView === "stats") renderStatistics(); // 통계 갱신
    }
  }
}

/* =========================================
   [NEW] 오늘의 고찰 (Daily Reflection) 로직
   ========================================= */

let currentDailyId = null;
let currentQuestion = "";

function initDailyReflection() {
  const section = document.getElementById("daily-reflection-card");
  const titleEl = document.getElementById("daily-target-title");
  const contentEl = document.getElementById("daily-target-content");
  const dateEl = document.getElementById("daily-target-date");
  const questionEl = document.getElementById("daily-question");
  const inputEl = document.getElementById("daily-answer");

  // 1. 데이터가 없으면 숨김
  if (insights.length === 0) {
    section.classList.add("hidden");
    return;
  }
  section.classList.remove("hidden");

  // 2. 랜덤한 통찰 선택 (internalized 된 것도 포함해서 회고할 수 있게 함)
  // 단, 너무 최근(오늘 쓴 것)은 제외하고 싶다면 필터링 가능. 일단 전체 대상.
  const randomIdx = Math.floor(Math.random() * insights.length);
  const target = insights[randomIdx];
  currentDailyId = target.id;

  // 3. 랜덤 질문 선택
  const qList = translations[currentLang].daily.questions;
  const qIdx = Math.floor(Math.random() * qList.length);
  currentQuestion = qList[qIdx];

  // 4. UI 렌더링
  titleEl.innerText = target.title;
  contentEl.innerText = target.content;
  dateEl.innerText = formatDate(target.date);
  questionEl.innerText = `"${currentQuestion}"`;

  // 입력창 초기화 및 번역 적용
  inputEl.value = "";
  inputEl.placeholder = translations[currentLang].daily.placeholder;

  // 버튼 텍스트 등도 업데이트 필요하다면 여기서 처리
}

function refreshDailyReflection() {
  // 회전 애니메이션 효과를 주면 좋음 (여기선 단순 호출)
  initDailyReflection();
}

function saveDailyReflection() {
  const inputEl = document.getElementById("daily-answer");
  const text = inputEl.value.trim();

  if (!text) {
    alert(
      currentLang === "ko" ? "내용을 입력해주세요." : "Please enter content.",
    );
    return;
  }

  const card = insights.find((c) => c.id === currentDailyId);
  if (card) {
    const today = new Date().toLocaleDateString();
    // 기존 reflect에 덧붙이기 (구분선 사용)
    // 형식: [2026.2.1 질문?] 답변
    const newLog = `\n\n[Reflect: ${today}]\nQ: ${currentQuestion}\nA: ${text}`;

    if (card.reflect) {
      card.reflect += newLog;
    } else {
      card.reflect = newLog.trim(); // 앞에 줄바꿈 제거
    }
    saveInsights();

    // 저장 완료 알림
    alert(
      currentLang === "ko"
        ? "고찰이 기록에 추가되었습니다."
        : "Reflection added to the log.",
    );

    // UI 갱신 (상세 모달이나 리스트에서 보이게)
    renderInsights();
    if (currentView === "stats") renderStatistics();

    // 입력창 비우고 새로운 질문 제안? 아니면 그대로 두기? -> 비우기
    inputEl.value = "";

    // (선택) 카드가 만약 'internalized' 상태가 아니라면, 다시 생각했으니 'logged'로 상태 변경해줄 수도 있음
    if (card.status === "ready") card.status = "logged";
    renderInsights();
  }
}

/* =========================================
   [NEW] 달력(Flatpickr) 초기화 로직
   ========================================= */
function initDatePicker() {
  // 이미 생성된 달력이 있다면 설정만 업데이트 (언어 변경 대응)
  if (datePicker) {
    datePicker.destroy(); // 기존 인스턴스 삭제 후 재생성 (가장 안전한 방법)
  }

  const inputElement = document.getElementById("input-date");
  if (!inputElement) return;

  // 언어 설정에 따른 달력 설정
  const locale = currentLang === "ko" ? "ko" : "default";
  // 보여지는 포맷: 한국어면 "2026년 1월 15일", 영어면 "Jan 15, 2026"
  const altFormat = currentLang === "ko" ? "Y년 m월 d일" : "M j, Y";

  datePicker = flatpickr("#input-date", {
    locale: locale,
    dateFormat: "Y-m-d", // 실제 데이터 저장 값 (2026-01-15)
    altInput: true, // 유저에게는 다른 포맷으로 보여줌
    altFormat: altFormat,
    defaultDate: "today", // 기본값 오늘
    theme: currentTheme === "dark" ? "dark" : "light", // 테마는 CSS로 제어되지만 클래스 명시
    disableMobile: "true", // 모바일에서도 네이티브 대신 이 캘린더 사용 (선택사항)
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setTheme(currentTheme);
  initDatePicker();
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

  /* =========================================
   [NEW] 드롭다운 외부 클릭 감지 (닫기)
   ========================================= */
  document.addEventListener("click", function (e) {
    const menu = document.getElementById("log-type-menu");
    const btn = document.getElementById("add-log-toggle-btn");

    // 메뉴가 열려있고, 클릭된 곳이 메뉴 내부가 아니고, 버튼도 아니라면 -> 닫기
    if (
      !menu.classList.contains("hidden") &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      menu.classList.add("hidden");
    }
  });

  initDailyReflection();
  switchView(currentView);
});
