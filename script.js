/* =========================================
   1. 데이터 및 설정 (Data & Config)
   ========================================= */
const insights = [
  {
    id: 1,
    status: "ready",
    category: "news",
    subCategory: "신문기사 - 심리학",
    date: "Sep 2025",
    title: "친애하는 나의 결함에게",
    content:
      "누구나 결함을 가지고 있다. 이를 어떻게 생각하고 어떻게 사용하는지에 따라 삶이 달라진다.",
    reflect:
      "나는 결함을 없애야 할 적으로만 여겼다. 하지만 상담가로서 타인에게 했던 말과 나의 행동의 모순을 깨달았다. 결핍은 나를 나답게 만드는 원동력이다.",
    action: null,
    discussionTopic:
      "당신의 결핍은 무엇인가? 그리고 그 결핍을 당신은 어떻게 사용하고 있는가?",
    dialogue: null,
  },
  {
    id: 2,
    status: "ready",
    category: "nonfiction",
    subCategory: "비문학 - IT",
    date: "Oct 2025",
    title: "Moral AI (도덕적인 AI)",
    content: "AI의 도덕적 한계는 결국 인간의 도덕적 미성숙함에서 비롯된다.",
    reflect: null,
    action:
      "AI에게 질문하기 전, 나 스스로에게 끝없이 질문하며 비판하는 훈련을 할 것. 나의 도덕적 미성숙을 먼저 성찰하자.",
    discussionTopic:
      "우리는 점점 AI에게 의존하는 사회가 되고 있다. 부모님 세대가 느끼는 공포감에 대해 어떻게 생각하는가?",
    dialogue: null,
  },
  {
    id: 3,
    status: "ready",
    category: "movie",
    subCategory: "영화 - SF/드라마",
    date: "Jan 2026",
    title: "Her (그녀)",
    content:
      "사랑은 사회적으로 용인된 미친 짓이다. 우리는 관계를 통해 서로를 성장시키지만, 때로는 그 성장이 이별을 부르기도 한다.",
    reflect:
      "AI와의 사랑을 다루지만 결국 인간 관계의 본질을 묻는다. 나는 관계 속에서 상대방을 내 방식대로 정의하려 하지 않았나?",
    action: null,
    discussionTopic:
      "기술이 발전하여 완벽한 정신적 교감이 가능한 AI가 나온다면, 육체적 사랑 없는 플라토닉 러브가 주류가 될 수 있을까?",
    dialogue: null,
  },
];

// 카테고리별 스타일 매핑
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
   2. 필터링 로직 (Filter)
   ========================================= */
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
    if (type === currentFilter) {
      btn.className =
        "px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-sm transition-all";
    } else {
      btn.className =
        "px-3 py-1.5 rounded-full bg-white border border-border text-text-sub text-xs font-bold transition-all hover:text-primary hover:bg-background-hover";
    }
  });
}

/* =========================================
   3. 화면 렌더링 (Render Main)
   ========================================= */
function renderInsights() {
  const zones = {
    ready: document.getElementById("zone-ready"),
    logged: document.getElementById("zone-logged"),
    internalized: document.getElementById("zone-internalized"),
  };
  const counts = { ready: 0, logged: 0, internalized: 0 };

  // 기존 카드 삭제
  document.querySelectorAll("article").forEach((el) => el.remove());

  // 필터링
  const filteredData =
    currentFilter === "all"
      ? insights
      : insights.filter((item) => item.category === currentFilter);

  filteredData.forEach((data) => {
    counts[data.status]++;
    if (!zones[data.status]) return;

    const style = styles[data.category] || styles.nonfiction;

    const cardHTML = `
      <article id="card-${data.id}" class="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group mt-5">
          <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText} text-[10px] font-black uppercase tracking-wider">
                  <span class="material-symbols-outlined !text-[14px]">${style.icon}</span>
                  ${data.subCategory}
              </div>
              <span class="text-[10px] font-bold text-text-muted">${data.date}</span>
          </div>
          <h4 class="font-bold text-lg leading-snug mb-3 serif group-hover:text-primary transition-colors">${data.title}</h4>
          <p class="text-sm text-text-sub font-medium leading-relaxed mb-4 line-clamp-3">
              "${data.content}"
          </p>
          
          ${
            data.reflect
              ? `
          <div class="bg-background-section/50 p-4 rounded-xl mb-4">
               <h5 class="text-xs font-bold text-accent-dialogue mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <span class="material-symbols-outlined !text-[16px]">psychology_alt</span> 자기 투영 (Reflect)
              </h5>
              <p class="text-xs text-text-main leading-relaxed font-medium line-clamp-3">
                  ${data.reflect}
              </p>
          </div>`
              : ""
          }

          ${
            data.action
              ? `
          <div class="bg-accent-action/10 p-4 rounded-xl mb-4">
              <h5 class="text-xs font-bold text-accent-action mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                 <span class="material-symbols-outlined !text-[16px]">bolt</span> 실천 과제 (Action)
             </h5>
             <p class="text-xs text-text-main leading-relaxed font-medium">
                 ${data.action}
             </p>
         </div>`
              : ""
          }

         ${
           data.dialogue
             ? `
         <div class="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10">
             <h5 class="text-xs font-bold text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <span class="material-symbols-outlined !text-[16px]">forum</span> 대화 로그 (Dialogue)
            </h5>
            <p class="text-xs text-text-main leading-relaxed font-medium italic">
                "${data.dialogue}"
            </p>
        </div>`
             : ""
         }

         ${
           data.discussionTopic
             ? `
         <div class="bg-accent-dialogue/10 p-3 rounded-xl mb-4 border border-accent-dialogue/20">
              <h5 class="text-[10px] font-bold text-accent-dialogue mb-1 uppercase">💬 Discussion Topic</h5>
              <p class="text-xs text-text-main font-bold">
                  "${data.discussionTopic}"
              </p>
          </div>`
             : ""
         }

          <button onclick="openLogModal(${data.id})" class="w-full py-2.5 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all">
              <span class="material-symbols-outlined !text-[18px]">add</span>
              로그 추가
          </button>
      </article>
    `;

    zones[data.status].insertAdjacentHTML("beforeend", cardHTML);
  });

  // 카운트 업데이트
  if (document.getElementById("count-ready"))
    document.getElementById("count-ready").innerText = counts.ready;
  if (document.getElementById("count-logged"))
    document.getElementById("count-logged").innerText = counts.logged;
  if (document.getElementById("count-internalized"))
    document.getElementById("count-internalized").innerText =
      counts.internalized;

  // 사이드바 통계 업데이트
  if (document.getElementById("stat-month"))
    document.getElementById("stat-month").innerText = insights.length;
  if (document.getElementById("stat-hub"))
    document.getElementById("stat-hub").innerText = counts.logged;
  if (document.getElementById("stat-total"))
    document.getElementById("stat-total").innerText = insights.length;

  // [Gamification] 데이터가 변경되면 유저 스탯도 업데이트
  userStats.postCount = insights.length;
  updateProfileUI();
}

/* =========================================
   4. New Insight (새 글 쓰기) 모달
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

  // 서브카테고리 자동 생성
  let subCat = "기타";
  const catMap = {
    news: "신문기사",
    fiction: "문학",
    nonfiction: "비문학",
    movie: "영화",
    art: "전시/관람",
    media: "영상/미디어",
  };
  subCat = catMap[category] || "기타";

  const newInsight = {
    id: Date.now(),
    status: "ready",
    category: category,
    subCategory: subCat,
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

/* =========================================
   5. 로그 추가 모달 & 상세 입력 모달
   ========================================= */
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
  const titleEl = document.getElementById("rich-modal-title");
  const descEl = document.getElementById("rich-modal-desc");
  const inputContainer = document.getElementById("input-container");
  const inputField = document.getElementById("rich-input-field");

  inputContainer.className =
    "flex flex-col gap-4 rounded-xl bg-white border border-[#d1d5db] p-1 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all";

  if (type === "reflect") {
    titleEl.innerHTML = `<span class="material-symbols-outlined text-accent-dialogue text-[24px]">psychology_alt</span> 자기 투영 (Reflect)`;
    descEl.innerText = "이 내용이 현재 나의 상황이나 경험과 어떻게 연결되나요?";
    inputField.placeholder =
      "예: 이 문구는 내가 지난주에 겪었던 프로젝트 문제와 정확히 일치한다...";
    inputContainer.classList.add(
      "bg-accent-dialogue/5",
      "border-accent-dialogue/20",
    );
  } else if (type === "action") {
    titleEl.innerHTML = `<span class="material-symbols-outlined text-accent-action text-[24px]">bolt</span> 실천 과제 (Action)`;
    descEl.innerText =
      "이 통찰을 삶에 적용하기 위해 당장 실천할 수 있는 행동은 무엇인가요?";
    inputField.placeholder = "예: 내일 아침 30분 일찍 일어나서 글쓰기 시작하기";
    inputContainer.classList.add(
      "bg-accent-action/5",
      "border-accent-action/20",
    );
  } else if (type === "dialogue") {
    titleEl.innerHTML = `<span class="material-symbols-outlined text-primary text-[24px]">forum</span> 대화 로그 (Dialogue)`;
    descEl.innerText =
      "가족, 친구와 나눈 대화 중 기억하고 싶은 핵심 내용을 기록하세요.";
    inputField.placeholder = "A: 우리가 이걸 왜 해야 하지?\nB: 결국 본질은...";
    inputContainer.classList.add("bg-primary/5", "border-primary/20");
  } else if (type === "topic") {
    titleEl.innerHTML = `<span class="material-symbols-outlined text-accent-news text-[24px]">chat_bubble</span> 토론 주제 (Topic)`;
    descEl.innerText =
      "이 인사이트를 바탕으로 타인과 논의해보고 싶은 질문을 던져보세요.";
    inputField.placeholder = "예: 기술의 발전이 인간의 소외를 낳는다면...";
  }

  richInputModal.classList.remove("hidden");
  inputField.focus();
}

function saveRichInput() {
  const inputVal = document.getElementById("rich-input-field").value;

  if (!inputVal.trim()) {
    alert("내용을 입력해주세요.");
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

/* =========================================
   6. 알림(Notification) 시스템
   ========================================= */
const notiBtn = document.getElementById("notification-btn");
const notiBadge = document.getElementById("notification-badge");
const notiDropdown = document.getElementById("notification-dropdown");
const notiList = document.getElementById("notification-list");
const readAllBtn = document.getElementById("btn-read-all");

function renderNotifications() {
  notiList.innerHTML = "";

  const targetCard = insights.find((c) => c.id === 1);

  if (targetCard) {
    const notiHTML = `
            <li onclick="scrollToCard(${targetCard.id}, this)" class="px-5 py-4 border-b border-border hover:bg-background-hover cursor-pointer transition-colors flex gap-3 items-start">
                <div class="noti-dot mt-1 min-w-[8px] size-2 rounded-full bg-primary"></div>
                <div>
                    <p class="text-xs font-bold text-text-main mb-1 line-clamp-2">'${targetCard.title}' 글을 작성한 지 1년이 지났습니다. 다시 읽어보시겠습니까?</p>
                    <span class="text-[10px] text-text-sub font-medium">방금 전 • 리마인드</span>
                </div>
            </li>
        `;
    notiList.insertAdjacentHTML("beforeend", notiHTML);
  }
  const systemNotiHTML = `
        <li class="px-5 py-4 hover:bg-background-hover cursor-pointer transition-colors flex gap-3 items-start opacity-50">
            <div class="mt-1 min-w-[8px] size-2 rounded-full bg-transparent"></div>
            <div>
                <p class="text-xs font-bold text-text-main mb-1">새로운 기능 '가족 대화 로그'가 추가되었습니다.</p>
                <span class="text-[10px] text-text-sub font-medium">1일 전 • 시스템</span>
            </div>
        </li>
    `;
  notiList.insertAdjacentHTML("beforeend", systemNotiHTML);
}

setTimeout(() => {
  renderNotifications();
  const isRead = localStorage.getItem("isNotiRead");
  if (isRead !== "true") {
    notiBadge.classList.remove("hidden");
    document.title = "(1) Insight Deck";
  }
}, 2000);

// 알림 버튼 클릭 (프로필 닫기 포함)
notiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isHidden = notiDropdown.classList.contains("hidden");

  if (isHidden) {
    notiDropdown.classList.remove("hidden");
    notiBadge.classList.add("hidden");
    document.title = "인사이트 덱 (Insight Deck)";
    localStorage.setItem("isNotiRead", "true");

    // 프로필 닫기
    if (document.getElementById("profile-dropdown")) {
      document.getElementById("profile-dropdown").classList.add("hidden");
    }
  } else {
    notiDropdown.classList.add("hidden");
  }
});

// 외부 클릭 (통합 관리)
document.addEventListener("click", (e) => {
  // 알림창
  if (!notiBtn.contains(e.target) && !notiDropdown.contains(e.target)) {
    notiDropdown.classList.add("hidden");
  }
  // 프로필창
  if (profileBtn && profileDropdown) {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.add("hidden");
    }
  }
});

function markItemAsRead(liElement) {
  if (!liElement) return;
  liElement.classList.add("opacity-50");
  const dot = liElement.querySelector(".noti-dot");
  if (dot) {
    dot.classList.remove("bg-primary");
    dot.classList.add("bg-transparent");
  }
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
    setTimeout(() => {
      targetCard.classList.remove("ring-4", "ring-primary/50");
    }, 2000);
  } else {
    alert("해당 카드를 찾을 수 없습니다.");
  }
}

readAllBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const allItems = document.querySelectorAll("#notification-list li");
  allItems.forEach((item) => markItemAsRead(item));
});

/* =========================================
   8. 프로필 설정 & Gamification (Level System)
   ========================================= */
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");
const nameModal = document.getElementById("name-modal");
const nameInput = document.getElementById("input-profile-name");
const nameError = document.getElementById("name-error-msg");

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 엔터 시 줄바꿈 등 기본 동작 방지
    saveProfileName();
  }
});

// 레벨 데이터 시스템 (0~20)
const levelSystem = [
  {
    lv: 0,
    en: "Insight Newbie",
    ko: "통찰 새싹",
    desc: "아직 아무것도 기록하지 않았지만, 생각을 남길 준비가 되었다.",
    next: "첫 기록 1개 작성",
  },
  {
    lv: 1,
    en: "Insight Starter",
    ko: "통찰 입문자",
    desc: "경험을 그냥 흘려보내지 않고, 처음으로 붙잡았다.",
    next: "기록 5개 작성",
  },
  {
    lv: 2,
    en: "Insight Explorer",
    ko: "통찰 탐색자",
    desc: "다양한 경험을 기록하며 자신의 관심사를 탐색하고 있다.",
    next: "기록 10개 + 수정 1회",
  },
  {
    lv: 3,
    en: "Insight Adventurer",
    ko: "통찰 모험가",
    desc: "기록이 일회성이 아니라는 걸 깨닫기 시작했다.",
    next: "기록 15개 + 주제 3개",
  },
  {
    lv: 4,
    en: "Insight Observer",
    ko: "통찰 관찰자",
    desc: "자신의 반응과 생각 패턴을 관찰하기 시작한다.",
    next: "기록 20개 + 보완 5회",
  },
  {
    lv: 5,
    en: "Insight Recorder",
    ko: "통찰 기록자",
    desc: "생각을 남기는 것이 자연스러운 습관이 되었다.",
    next: "재성찰 10회",
  },
  {
    lv: 6,
    en: "Insight Reflector",
    ko: "통찰 성찰자",
    desc: "같은 경험에서도 다른 생각이 나온다는 걸 이해한다.",
    next: "생각 확장 2회",
  },
  {
    lv: 7,
    en: "Insight Thinker",
    ko: "통찰 사유가",
    desc: "감상이 아닌 ‘왜 그렇게 느꼈는지’를 묻기 시작한다.",
    next: "생각 정리 10회",
  },
  {
    lv: 8,
    en: "Insight Analyzer",
    ko: "통찰 분석가",
    desc: "감정과 생각을 분리해 바라볼 수 있다.",
    next: "재방문 20회",
  },
  {
    lv: 9,
    en: "Insight Interpreter",
    ko: "통찰 해석자",
    desc: "과거의 자신을 현재의 언어로 다시 해석한다.",
    next: "기록 연결 5회",
  },
  {
    lv: 10,
    en: "Insight Synthesizer",
    ko: "통찰 종합자",
    desc: "흩어진 생각을 하나의 흐름으로 묶기 시작한다.",
    next: "장문 성찰 5회",
  },
  {
    lv: 11,
    en: "Insight Builder",
    ko: "통찰 구축자",
    desc: "생각을 쌓아 올려 하나의 구조를 만든다.",
    next: "일관성 유지 10회",
  },
  {
    lv: 12,
    en: "Insight Architect",
    ko: "통찰 설계자",
    desc: "자신만의 사고 프레임을 설계한다.",
    next: "행동 계획 5회",
  },
  {
    lv: 13,
    en: "Insight Strategist",
    ko: "통찰 전략가",
    desc: "생각을 삶의 전략으로 바꾸기 시작한다.",
    next: "큐레이션 20개",
  },
  {
    lv: 14,
    en: "Insight Curator",
    ko: "통찰 큐레이터",
    desc: "자신의 사유 아카이브를 선별하고 관리한다.",
    next: "연속 기록 10개",
  },
  {
    lv: 15,
    en: "Insight Scholar",
    ko: "통찰 연구자",
    desc: "반복된 사유를 통해 깊이를 확보한다.",
    next: "가치관 기록 5개",
  },
  {
    lv: 16,
    en: "Insight Philosopher",
    ko: "통찰 철학자",
    desc: "‘나는 무엇을 중요하게 여기는가’를 언어화한다.",
    next: "실행 후 회고 5회",
  },
  {
    lv: 17,
    en: "Insight Luminary",
    ko: "통찰 선구자",
    desc: "생각이 실제 삶의 변화를 만들어낸다.",
    next: "6개월 지속 + 재방문 50회",
  },
  {
    lv: 18,
    en: "Insight Authority",
    ko: "통찰 권위자",
    desc: "사유의 밀도와 지속성이 확실히 드러난다.",
    next: "재성찰 비율 30%",
  },
  {
    lv: 19,
    en: "Insight Master",
    ko: "통찰 마스터",
    desc: "기록 자체가 하나의 사고 훈련이 되었다.",
    next: "대표 성찰 3개",
  },
  {
    lv: 20,
    en: "Insight Sage",
    ko: "통찰 현자",
    desc: "경험을 통찰로 바꾸는 법을 완전히 체득했다.",
    next: "Max Level",
  },
];

// 유저 스탯 (임시)
let userStats = {
  currentLevel: 1,
  postCount: 3,
  nextLevelGoal: 5,
};

function updateProfileUI() {
  // 안전장치: 레벨이 범위 밖이면 조정
  if (userStats.currentLevel >= levelSystem.length)
    userStats.currentLevel = levelSystem.length - 1;

  const lvData = levelSystem[userStats.currentLevel];

  document.getElementById("profile-level-badge").innerText = `Lv.${lvData.lv}`;
  document.getElementById("profile-title-display").innerText =
    `${lvData.en} (${lvData.ko})`;
  document.getElementById("profile-desc-display").innerText =
    `"${lvData.desc}"`;
  document.getElementById("profile-next-goal").innerText =
    `Next: ${lvData.next}`;

  let progress = Math.min(
    (userStats.postCount / userStats.nextLevelGoal) * 100,
    100,
  );
  document.getElementById("profile-progress-bar").style.width = `${progress}%`;
}

// 프로필 메뉴 토글 (알림 닫기 포함)
profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isHidden = profileDropdown.classList.contains("hidden");

  if (isHidden) {
    updateProfileUI();
    profileDropdown.classList.remove("hidden");
    // 알림창 닫기
    if (document.getElementById("notification-dropdown")) {
      document.getElementById("notification-dropdown").classList.add("hidden");
    }
  } else {
    profileDropdown.classList.add("hidden");
  }
});

function editProfileName() {
  profileDropdown.classList.add("hidden");
  const currentName = document.getElementById("profile-name-display").innerText;
  nameInput.value = currentName;
  nameError.classList.add("hidden");
  nameModal.classList.remove("hidden");
  nameInput.focus();
}

function closeNameModal() {
  nameModal.classList.add("hidden");
}

// 이름 저장 로직 (이름 변경 시 프로필 사진도 자동 업데이트)
function saveProfileName() {
  const newName = nameInput.value.trim();

  // 유효성 검사
  if (newName.length < 2) {
    nameError.innerText = "이름은 최소 2글자 이상이어야 합니다.";
    nameError.classList.remove("hidden");
    return;
  }
  if (newName.length > 10) {
    nameError.innerText = "이름은 10글자를 넘을 수 없습니다.";
    nameError.classList.remove("hidden");
    return;
  }

  // 1. 이름 업데이트
  document.getElementById("profile-name-display").innerText = newName;
  localStorage.setItem("userName", newName);

  // ▼▼▼ [추가된 부분] 2. 프로필 사진 자동 업데이트 ▼▼▼
  // 현재 저장된 배경색을 가져옵니다 (없으면 기본값 B38F64)
  const savedColor = localStorage.getItem("userProfileColor") || "B38F64";

  // 바뀐 이름(newName)으로 새 이미지 URL 생성
  const newImgUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${newName}&backgroundColor=${savedColor}&textColor=ffffff&chars=1`;

  // 이미지 교체 및 저장
  document.getElementById("profile-img").src = newImgUrl;
  localStorage.setItem("userProfileImg", newImgUrl);
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  alert(`이름이 '${newName}'(으)로 변경되었습니다! ✨`);
  closeNameModal();
}
/* =========================================
   10. 프로필 사진 변경 (Step 1.4.1 - 이니셜 모드 수정)
   ========================================= */
const photoModal = document.getElementById("photo-modal");
const previewImg = document.getElementById("preview-profile-img");

// 현재 선택된 설정 임시 저장용
let tempColor = "B38F64"; // 기본값

// 모달 열기
function editProfileImage() {
  profileDropdown.classList.add("hidden");
  photoModal.classList.remove("hidden");

  // 현재 이름 가져오기 (Lisa 등)
  const currentName = document.getElementById("profile-name-display").innerText;

  // 모달 열 때 현재 미리보기 생성 (기존 선택 색상 or 기본색)
  updatePreview(currentName, tempColor);
}

// 모달 닫기
function closePhotoModal() {
  photoModal.classList.add("hidden");
}

// 색상 선택 시 실행
function selectBgColor(color) {
  tempColor = color; // 선택한 색상 기억
  const currentName = document.getElementById("profile-name-display").innerText;
  updatePreview(currentName, tempColor);
}

// [수정됨] chars=1 옵션 추가
function updatePreview(name, color) {
  // &chars=1 : 한 글자만 출력하라
  const newUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=${color}&textColor=ffffff&chars=1`;
  previewImg.src = newUrl;
}

// [수정됨] chars=1 옵션 추가
function saveProfileImage() {
  const currentName = document.getElementById("profile-name-display").innerText;
  // &chars=1 : 한 글자만 출력하라
  const finalUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${currentName}&backgroundColor=${tempColor}&textColor=ffffff&chars=1`;

  document.getElementById("profile-img").src = finalUrl;

  localStorage.setItem("userProfileImg", finalUrl);
  localStorage.setItem("userProfileColor", tempColor);

  alert("프로필 이미지가 변경되었습니다! 🎨");
  closePhotoModal();
}
/* =========================================
   9. 초기화 (수정됨)
   ========================================= */
window.addEventListener("DOMContentLoaded", () => {
  renderInsights();

  // 1. 저장된 이름 불러오기
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    document.getElementById("profile-name-display").innerText = savedName;
  }

  // 2. [New] 저장된 프로필 이미지 불러오기
  const savedImg = localStorage.getItem("userProfileImg");
  const savedColor = localStorage.getItem("userProfileColor");

  if (savedImg) {
    document.getElementById("profile-img").src = savedImg;
  }
  if (savedColor) {
    tempColor = savedColor; // 다음에 모달 열 때 이 색상 기억
  }
});
