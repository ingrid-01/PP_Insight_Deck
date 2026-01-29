/* =========================================
   1. 데이터 및 설정
   ========================================= */
let currentLang = localStorage.getItem("userLang") || "ko";

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

/* =========================================
   2. 언어 및 필터 설정
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

function updateLangButtons() {
  document.getElementById("btn-lang-kr").className =
    currentLang === "ko"
      ? "px-2 py-0.5 text-[10px] font-bold rounded bg-white shadow-sm text-primary transition-all"
      : "px-2 py-0.5 text-[10px] font-bold rounded text-text-muted hover:text-text-main transition-all";
  document.getElementById("btn-lang-en").className =
    currentLang === "en"
      ? "px-2 py-0.5 text-[10px] font-bold rounded bg-white shadow-sm text-primary transition-all"
      : "px-2 py-0.5 text-[10px] font-bold rounded text-text-muted hover:text-text-main transition-all";
}

let currentFilter = "all";
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
    btn.className =
      type === currentFilter
        ? "px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-sm transition-all"
        : "px-3 py-1.5 rounded-full bg-white border border-border text-text-sub text-xs font-bold transition-all hover:text-primary hover:bg-background-hover";
  });
}

/* =========================================
   3. 메인 렌더링 (그래프 업데이트 포함)
   ========================================= */
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
      <article id="card-${data.id}" class="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group mt-5">
          <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText} text-[10px] font-black uppercase tracking-wider"><span class="material-symbols-outlined !text-[14px]">${style.icon}</span>${subCatText}</div>
              <span class="text-[10px] font-bold text-text-muted">${data.date}</span>
          </div>
          <h4 class="font-bold text-lg leading-snug mb-3 serif group-hover:text-primary transition-colors">${data.title}</h4>
          <p class="text-sm text-text-sub font-medium leading-relaxed mb-4 line-clamp-3">"${data.content}"</p>
          ${data.reflect ? `<div class="bg-background-section/50 p-4 rounded-xl mb-4"><h5 class="text-xs font-bold text-accent-dialogue mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">psychology_alt</span> ${translations[currentLang].logModal.reflect.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium line-clamp-3">${data.reflect}</p></div>` : ""}
          ${data.action ? `<div class="bg-accent-action/10 p-4 rounded-xl mb-4"><h5 class="text-xs font-bold text-accent-action mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">bolt</span> ${translations[currentLang].logModal.action.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium">${data.action}</p></div>` : ""}
          ${data.dialogue ? `<div class="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10"><h5 class="text-xs font-bold text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider"><span class="material-symbols-outlined !text-[16px]">forum</span> ${translations[currentLang].logModal.dialogue.title}</h5><p class="text-xs text-text-main leading-relaxed font-medium italic">"${data.dialogue}"</p></div>` : ""}
          ${data.discussionTopic ? `<div class="bg-accent-dialogue/10 p-3 rounded-xl mb-4 border border-accent-dialogue/20"><h5 class="text-[10px] font-bold text-accent-dialogue mb-1 uppercase">💬 ${translations[currentLang].logModal.topic.title}</h5><p class="text-xs text-text-main font-bold">"${data.discussionTopic}"</p></div>` : ""}
          <button onclick="openLogModal(${data.id})" class="w-full py-2.5 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all"><span class="material-symbols-outlined !text-[18px]">add</span> Log</button>
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

  // [중요] 그래프 업데이트 함수 호출
  updateMapStats();

  userStats.postCount = insights.length;
  updateProfileUI();
}

// [New] 그래프 및 퍼센트 자동 업데이트 로직
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

  // 카테고리별 개수 세기
  insights.forEach((item) => {
    if (counts.hasOwnProperty(item.category)) {
      counts[item.category]++;
    }
  });

  // 그래프 및 텍스트 업데이트
  for (const [cat, count] of Object.entries(counts)) {
    const pct = total === 0 ? 0 : Math.round((count / total) * 100);

    // 1. 그래프 너비 조정
    const bar = document.getElementById(`bar-${cat}`);
    if (bar) bar.style.width = `${pct}%`;

    // 2. 퍼센트 텍스트 변경
    const txt = document.getElementById(`pct-${cat}`);
    if (txt) txt.innerText = `${pct}%`;

    // 3. 0%면 흐리게 처리 (시각적 개선)
    if (txt)
      txt.className =
        pct === 0
          ? "text-xs font-black text-text-muted transition-colors"
          : `text-xs font-black ${styles[cat].badgeText.replace("bg-", "text-")} transition-colors`;
  }
}

/* =========================================
   4. 모달 관련 함수들 (글쓰기, 로그, 이름, 사진)
   ========================================= */
const modal = document.getElementById("write-modal");
const openBtn = document.getElementById("new-insight-btn");
const closeBtn = document.getElementById("close-modal-btn");
const form = document.getElementById("insight-form");
openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
form.addEventListener("submit", (e) => {
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
  modal.classList.add("hidden");
  form.reset();
});

const logModal = document.getElementById("log-type-modal");
const richInputModal = document.getElementById("rich-input-modal");
let currentCardId = null;
let currentLogType = null;
function openLogModal(cardId) {
  currentCardId = cardId;
  logModal.classList.remove("hidden");
}
function closeLogModal() {
  logModal.classList.add("hidden");
}
function closeRichInputModal() {
  richInputModal.classList.add("hidden");
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
  richInputModal.classList.remove("hidden");
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

// 알림 및 프로필 UI 관련
const notiBtn = document.getElementById("notification-btn");
const notiDropdown = document.getElementById("notification-dropdown");
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");
notiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notiDropdown.classList.toggle("hidden");
  document.getElementById("notification-badge").classList.add("hidden");
  localStorage.setItem("isNotiRead", "true");
  profileDropdown.classList.add("hidden");
});
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

// 프로필 설정 함수들 (이름, 사진)
const nameModal = document.getElementById("name-modal");
const nameInput = document.getElementById("input-profile-name");
const photoModal = document.getElementById("photo-modal");
const fileInput = document.getElementById("profile-upload-input");
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

let tempColor = "B38F64";
let currentPreviewUrl = "";
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

// 초기화
window.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  const savedName = localStorage.getItem("userName");
  if (savedName)
    document.getElementById("profile-name-display").innerText = savedName;
  const savedImg = localStorage.getItem("userProfileImg");
  if (savedImg) document.getElementById("profile-img").src = savedImg;
  const savedColor = localStorage.getItem("userProfileColor");
  if (savedColor) tempColor = savedColor;
});
