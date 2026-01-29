/* =========================================
   1. 전역 변수 및 데이터 설정
   ========================================= */
let currentLang = localStorage.getItem("userLang") || "ko";
let currentTheme = localStorage.getItem("userTheme") || "light";
let currentFilter = "all";
let currentCardId = null;
let currentLogType = null;
let tempColor = "B38F64";
let currentPreviewUrl = "";

// 유저 스탯 (임시)
let userStats = { currentLevel: 1, postCount: 3, nextLevelGoal: 5 };

const translations = {
  ko: {
    nav: { hub: "Conversation Hub", archive: "Archive", stats: "Statistics" },
    searchPlaceholder: "통찰, 주제, 질문 검색...",
    newInsightBtn: "New Insight",
    sidebar: {
      map: "나의 지식 지도 (Map)",
      thisMonth: "이번 달",
      hub: "Hub",
      total: "Total",
      filter: "Filters",
    },
    filters: {
      all: "All",
      nonfiction: "비문학",
      fiction: "문학",
      news: "신문기사",
      movie: "영화",
      art: "전시/관람",
      media: "미디어",
    },
    zones: {
      ready: "Ready for Discussion",
      logged: "Discussion Logged",
      internalized: "Internalized",
    },
    modal: {
      title: "New Insight 기록하기",
      cat: "Category",
      date: "Date",
      titleLabel: "Title",
      msgLabel: "Core Message (Fact)",
      saveBtn: "기록 저장하기",
      cancelBtn: "취소",
    },
    logModal: {
      title: "어떤 로그를 추가할까요?",
      reflect: { title: "자기 투영", sub: "Reflect" },
      action: { title: "실천 과제", sub: "Action Item" },
      dialogue: { title: "대화 로그", sub: "Dialogue Log" },
      topic: { title: "토론 주제", sub: "Discussion Topic" },
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
      colorLabel: "배경 컬러 선택 (이니셜 모드)",
      uploadLabel: "이미지 직접 업로드",
      uploadBtn: "내 컴퓨터에서 파일 찾기",
      applyBtn: "적용하기",
      cancelBtn: "취소",
    },
    nameModal: {
      title: "이름 변경",
      desc: "새로운 닉네임을 입력해주세요 (2~10자)",
      placeholder: "변경할 이름",
      applyBtn: "변경 완료",
      cancelBtn: "취소",
    },
  },
  en: {
    nav: { hub: "Conversation Hub", archive: "Archive", stats: "Statistics" },
    searchPlaceholder: "Search insights, topics...",
    newInsightBtn: "New Insight",
    sidebar: {
      map: "My Knowledge Map",
      thisMonth: "This Month",
      hub: "Hub",
      total: "Total",
      filter: "Filters",
    },
    filters: {
      all: "All",
      nonfiction: "Non-fiction",
      fiction: "Fiction",
      news: "News",
      movie: "Movie",
      art: "Exhibition",
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
      titleLabel: "Title",
      msgLabel: "Core Message (Fact)",
      saveBtn: "Save Insight",
      cancelBtn: "Cancel",
    },
    logModal: {
      title: "Add New Log",
      reflect: { title: "Self-Reflection", sub: "Reflect" },
      action: { title: "Action Item", sub: "Action Item" },
      dialogue: { title: "Dialogue Log", sub: "Dialogue Log" },
      topic: { title: "Discussion Topic", sub: "Discussion Topic" },
    },
    richModal: {
      save: "Save Log",
      cancel: "Cancel",
      placeholder: "Type your content here...",
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
      colorLabel: "Background Color (Initials)",
      uploadLabel: "Upload Image",
      uploadBtn: "Choose File",
      applyBtn: "Apply",
      cancelBtn: "Cancel",
    },
    nameModal: {
      title: "Change Name",
      desc: "Enter new nickname (2-10 chars)",
      placeholder: "New Name",
      applyBtn: "Done",
      cancelBtn: "Cancel",
    },
  },
};

const insights = [
  {
    id: 1,
    status: "ready",
    category: "news",
    subCategory: { ko: "신문기사 - 심리학", en: "News - Psychology" },
    date: "Sep 2025",
    title: "친애하는 나의 결함에게",
    content: "누구나 결함을 가지고 있다...",
    reflect: "나는 결함을 없애야 할 적으로만 여겼다...",
    action: null,
    discussionTopic: "당신의 결핍은 무엇인가?",
    dialogue: null,
  },
  {
    id: 2,
    status: "ready",
    category: "nonfiction",
    subCategory: { ko: "비문학 - IT", en: "Non-fiction - IT" },
    date: "Oct 2025",
    title: "Moral AI",
    content: "AI의 도덕적 한계는...",
    reflect: null,
    action: "AI에게 질문하기 전...",
    discussionTopic: "우리는 점점 AI에게 의존하는...",
    dialogue: null,
  },
  {
    id: 3,
    status: "ready",
    category: "movie",
    subCategory: { ko: "영화 - SF/드라마", en: "Movie - SF/Drama" },
    date: "Jan 2026",
    title: "Her",
    content: "사랑은 사회적으로...",
    reflect: "AI와의 사랑을 다루지만...",
    action: null,
    discussionTopic: "기술이 발전하여...",
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

const levelSystem = [
  {
    lv: 0,
    en: "Insight Newbie",
    ko: "통찰 새싹",
    desc_ko: "아직 아무것도 기록하지 않았지만...",
    desc_en: "Ready to record insights...",
    next_ko: "첫 기록 1개",
    next_en: "1st Insight",
  },
  {
    lv: 1,
    en: "Insight Starter",
    ko: "통찰 입문자",
    desc_ko: "경험을 처음으로 붙잡았다.",
    desc_en: "Captured the first experience.",
    next_ko: "기록 5개",
    next_en: "5 Insights",
  },
  {
    lv: 2,
    en: "Insight Explorer",
    ko: "통찰 탐색자",
    desc_ko: "다양한 경험을 탐색 중.",
    desc_en: "Exploring various interests.",
    next_ko: "기록 10개",
    next_en: "10 Insights",
  },
  {
    lv: 3,
    en: "Insight Adventurer",
    ko: "통찰 모험가",
    desc_ko: "기록이 일회성이 아님을 깨닫다.",
    desc_en: "Realizing insights are continuous.",
    next_ko: "기록 15개",
    next_en: "15 Insights",
  },
];

/* =========================================
   2. DOM 요소 선택 (중복 선언 방지)
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
const nameError = document.getElementById("name-error-msg");

const photoModal = document.getElementById("photo-modal");
const previewImg = document.getElementById("preview-profile-img");
const fileInput = document.getElementById("profile-upload-input");

/* =========================================
   3. 핵심 로직: 언어, 테마, 필터, 렌더링
   ========================================= */
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
  renderInsights();
  updateFilterButtons();
  updateProfileUI();
  updateLangButtons();
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("userTheme", theme);
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  updateThemeButtons();
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

    const cardHTML = `
          <article id="card-${data.id}" class="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group mt-5 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText} text-[10px] font-black uppercase tracking-wider"><span class="material-symbols-outlined !text-[14px]">${style.icon}</span>${subCatText}</div>
                  <span class="text-[10px] font-bold text-text-muted dark:text-gray-400">${data.date}</span>
              </div>
              <h4 class="font-bold text-lg leading-snug mb-3 serif group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-primary-light">${data.title}</h4>
              <p class="text-sm text-text-sub font-medium leading-relaxed mb-4 line-clamp-3 dark:text-gray-300">"${data.content}"</p>
              ${data.reflect ? `<div class="bg-background-section/50 p-4 rounded-xl mb-4 dark:bg-gray-700"><h5 class="text-xs font-bold text-accent-dialogue mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">psychology_alt</span> ${translations[currentLang].logModal.reflect.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium line-clamp-3 dark:text-gray-200">${data.reflect}</p></div>` : ""}
              ${data.action ? `<div class="bg-accent-action/10 p-4 rounded-xl mb-4 dark:bg-green-900/20"><h5 class="text-xs font-bold text-accent-action mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">bolt</span> ${translations[currentLang].logModal.action.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium dark:text-gray-200">${data.action}</p></div>` : ""}
              ${data.dialogue ? `<div class="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10 dark:bg-gray-700 dark:border-gray-600"><h5 class="text-xs font-bold text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider dark:text-primary-light"><span class="material-symbols-outlined !text-[16px]">forum</span> ${translations[currentLang].logModal.dialogue.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium italic dark:text-gray-200">"${data.dialogue}"</p></div>` : ""}
              ${data.discussionTopic ? `<div class="bg-accent-dialogue/10 p-3 rounded-xl mb-4 border border-accent-dialogue/20 dark:bg-orange-900/20"><h5 class="text-[10px] font-bold text-accent-dialogue mb-1 uppercase">💬 ${translations[currentLang].logModal.topic.title}</h5><p class="text-xs text-text-main font-bold dark:text-gray-200">"${data.discussionTopic}"</p></div>` : ""}
              <button onclick="openLogModal(${data.id})" class="w-full py-2.5 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-light"><span class="material-symbols-outlined !text-[18px]">add</span> Log</button>
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
  userStats.postCount = insights.length;
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
  if (userStats.currentLevel >= levelSystem.length)
    userStats.currentLevel = levelSystem.length - 1;
  const lvData = levelSystem[userStats.currentLevel];
  const title =
    currentLang === "ko" ? `${lvData.en} (${lvData.ko})` : lvData.en;
  const desc = currentLang === "ko" ? lvData.desc_ko : lvData.desc_en;
  const next =
    currentLang === "ko"
      ? `다음: ${lvData.next_ko}`
      : `Next: ${lvData.next_en}`;

  document.getElementById("profile-level-badge").innerText = `Lv.${lvData.lv}`;
  document.getElementById("profile-title-display").innerText = title;
  document.getElementById("profile-desc-display").innerText = `"${desc}"`;
  document.getElementById("profile-next-goal").innerText = next;
  let progress = Math.min(
    (userStats.postCount / userStats.nextLevelGoal) * 100,
    100,
  );
  document.getElementById("profile-progress-bar").style.width = `${progress}%`;
}

/* =========================================
   4. 이벤트 리스너 (Event Listeners)
   ========================================= */
// 모달 (글쓰기)
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
    art: ["전시/관람", "Exhibition"],
    media: ["영상/미디어", "Media"],
  };
  if (catMap[category]) {
    subCatKo = catMap[category][0];
    subCatEn = catMap[category][1];
  }
  const newInsight = {
    id: Date.now(),
    status: "ready",
    category: category,
    subCategory: { ko: subCatKo, en: subCatEn },
    date: document.getElementById("input-date").value || "Just Now",
    title: document.getElementById("input-title").value,
    content: document.getElementById("input-content").value,
    reflect: null,
    action: null,
    discussionTopic: null,
    dialogue: null,
  };
  insights.unshift(newInsight);
  renderInsights();
  writeModal.classList.add("hidden");
  writeForm.reset();
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

// 외부 클릭 닫기 통합
document.addEventListener("click", (e) => {
  if (!notiBtn.contains(e.target) && !notiDropdown.contains(e.target))
    notiDropdown.classList.add("hidden");
  if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target))
    profileDropdown.classList.add("hidden");
});

// 로그 모달 함수들
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
        : "How does this relate to your current situation?"
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
    renderInsights();
    closeRichInputModal();
  }
}

// 기타 헬퍼 함수
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

// 이름 변경 관련
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

// 사진 변경 관련
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
   5. 초기화 (Initialization)
   ========================================= */
window.addEventListener("DOMContentLoaded", () => {
  // 1. 테마 적용
  setTheme(currentTheme);
  // 2. 언어 적용 (렌더링 포함)
  setLanguage(currentLang);

  // 3. 사용자 이름 복원
  const savedName = localStorage.getItem("userName");
  if (savedName)
    document.getElementById("profile-name-display").innerText = savedName;

  // 4. 프로필 사진 복원 (없으면 기본값 설정)
  const savedImg = localStorage.getItem("userProfileImg");
  if (savedImg) {
    document.getElementById("profile-img").src = savedImg;
  } else {
    // [Fix] 초기 이미지가 깨지지 않도록 기본값 설정
    const defaultName = savedName || "Lisa";
    const defaultUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${defaultName}&backgroundColor=B38F64&textColor=ffffff&chars=1`;
    document.getElementById("profile-img").src = defaultUrl;
  }

  const savedColor = localStorage.getItem("userProfileColor");
  if (savedColor) tempColor = savedColor;
});
