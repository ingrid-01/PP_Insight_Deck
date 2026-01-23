/* =========================================
   1. 데이터 및 설정
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
};

/* =========================================
   2. 필터링 로직
   ========================================= */
let currentFilter = "all";

function setFilter(category) {
  currentFilter = category;
  renderInsights();
  updateFilterButtons();
}

function updateFilterButtons() {
  const filters = ["all", "nonfiction", "news", "fiction"];

  filters.forEach((type) => {
    const btn = document.getElementById(`filter-${type}`);
    if (!btn) return; // 버튼이 없는 경우 방지

    if (type === currentFilter) {
      // 선택됨: Primary 색상
      btn.className =
        "px-4 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-sm transition-all";
    } else {
      // 선택 안 됨: 흰색 배경
      btn.className =
        "px-4 py-2 rounded-full bg-white border border-border text-text-sub text-sm font-bold transition-all hover:bg-background-hover hover:text-primary";
    }
  });
}

/* =========================================
   3. 화면 렌더링 (Render)
   ========================================= */
function renderInsights() {
  const zones = {
    ready: document.getElementById("zone-ready"),
    logged: document.getElementById("zone-logged"),
    internalized: document.getElementById("zone-internalized"),
  };
  const counts = { ready: 0, logged: 0, internalized: 0 };

  // 구역 초기화
  document.querySelectorAll("article").forEach((el) => el.remove());

  // 필터링 적용
  const filteredData =
    currentFilter === "all"
      ? insights
      : insights.filter((item) => item.category === currentFilter);

  filteredData.forEach((data) => {
    if (!zones[data.status]) return;

    counts[data.status]++;
    const style = styles[data.category] || styles.nonfiction;

    const cardHTML = `
      <article class="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group mt-5">
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

  if (document.getElementById("count-ready"))
    document.getElementById("count-ready").innerText = counts.ready;
  if (document.getElementById("count-logged"))
    document.getElementById("count-logged").innerText = counts.logged;
  if (document.getElementById("count-internalized"))
    document.getElementById("count-internalized").innerText =
      counts.internalized;
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

  const newInsight = {
    id: Date.now(),
    status: "ready",
    category: category,
    subCategory:
      category === "news"
        ? "신문기사"
        : category === "fiction"
          ? "문학"
          : "비문학",
    date: document.getElementById("input-date").value || "Just Now",
    title: document.getElementById("input-title").value,
    content: document.getElementById("input-content").value,
    reflect: null,
    action: null,
    discussionTopic: null,
    dialogue: null,
  };

  insights.unshift(newInsight);
  renderInsights(); // 새로 그릴 때 필터도 자동 적용됨
  modal.classList.add("hidden");
  form.reset();
});

/* =========================================
   5. 로그 추가 모달 & 상세 입력(Rich) 모달
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
    if (currentLogType === "dialogue") card.dialogue = inputVal;
    if (currentLogType === "topic") card.discussionTopic = inputVal;

    renderInsights();
    closeRichInputModal();
  }
}

// 6. 초기 실행
window.addEventListener("DOMContentLoaded", renderInsights);
