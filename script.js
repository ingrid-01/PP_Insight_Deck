// 1. 초기 데이터 (우리가 정리한 그 내용들)
const insights = [
  {
    id: 1,
    status: "ready", // ready, logged, internalized
    category: "news", // news, classic, nonfiction
    subCategory: "신문기사 - 심리학",
    date: "Sep 2025",
    title: "친애하는 나의 결함에게",
    content: "누구나 결함을 가지고 있다. 이를 어떻게 생각하고 어떻게 사용하는지에 따라 삶이 달라진다.",
    reflect: "나는 결함을 없애야 할 적으로만 여겼다. 하지만 상담가로서 타인에게 했던 말과 나의 행동의 모순을 깨달았다. 결핍은 나를 나답게 만드는 원동력이다.",
    action: null,
    discussionTopic: "당신의 결핍은 무엇인가? 그리고 그 결핍을 당신은 어떻게 사용하고 있는가?",
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
    action: "AI에게 질문하기 전, 나 스스로에게 끝없이 질문하며 비판하는 훈련을 할 것. 나의 도덕적 미성숙을 먼저 성찰하자.",
    discussionTopic: "우리는 점점 AI에게 의존하는 사회가 되고 있다. 부모님 세대가 느끼는 공포감에 대해 어떻게 생각하는가?",
    dialogue: null,
  },
];

// 2. 카테고리별 디자인 설정 (Tailwind 클래스 매핑)
// 수정사항: 'fiction' -> 'classic'으로 변경 (앞서 설정한 CSS 색상 이름과 맞춤)
const styles = {
  news: {
    badgeBg: "bg-accent-news/10",
    badgeText: "text-accent-news",
    icon: "newspaper",
  },
  classic: { 
    badgeBg: "bg-accent-classic/10",
    badgeText: "text-accent-classic",
    icon: "auto_stories",
  },
  nonfiction: {
    badgeBg: "bg-accent-nonfiction/10",
    badgeText: "text-accent-nonfiction",
    icon: "menu_book",
  },
};

// 3. 화면 그리기 함수 (Render Function)
function renderInsights() {
  // 1) 구역 청소 (기존 내용 지우기)
  const zones = {
    ready: document.getElementById("zone-ready"),
    logged: document.getElementById("zone-logged"),
    internalized: document.getElementById("zone-internalized"),
  };

  // 카운트용 변수
  const counts = { ready: 0, logged: 0, internalized: 0 };

  // HTML 비우기 (기존 article 태그 삭제)
  document.querySelectorAll("article").forEach((el) => el.remove());

  // 2) 데이터 순회하며 카드 만들기
  insights.forEach((data) => {
    // 상태에 맞는 구역이 없으면 건너뛰기 (에러 방지)
    if (!zones[data.status]) return;

    counts[data.status]++; // 개수 세기
    const style = styles[data.category] || styles.nonfiction; // 스타일 가져오기

    // 카드 HTML template 생성
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
          
          ${data.reflect ? `
          <div class="bg-background-section/50 p-4 rounded-xl mb-4">
               <h5 class="text-xs font-bold text-accent-dialogue mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <span class="material-symbols-outlined !text-[16px]">psychology_alt</span> 자기 투영 (Reflect)
              </h5>
              <p class="text-xs text-text-main leading-relaxed font-medium line-clamp-3">
                  ${data.reflect}
              </p>
          </div>` : ''}

          ${data.action ? `
          <div class="bg-accent-action/10 p-4 rounded-xl mb-4">
              <h5 class="text-xs font-bold text-accent-action mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                 <span class="material-symbols-outlined !text-[16px]">bolt</span> 실천 과제 (Action)
             </h5>
             <p class="text-xs text-text-main leading-relaxed font-medium">
                 ${data.action}
             </p>
         </div>` : ''}

         ${data.discussionTopic ? `
         <div class="bg-accent-dialogue/10 p-3 rounded-xl mb-4 border border-accent-dialogue/20">
              <h5 class="text-[10px] font-bold text-accent-dialogue mb-1 uppercase">💬 Discussion Topic</h5>
              <p class="text-xs text-text-main font-bold">
                  "${data.discussionTopic}"
              </p>
          </div>` : ''}

          <button class="w-full py-2.5 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all">
              <span class="material-symbols-outlined !text-[18px]">chat_add_on</span>
              가족 대화 로그 추가
          </button>
      </article>
    `;
    
    // 알맞은 구역에 카드 꽂기
    zones[data.status].insertAdjacentHTML("beforeend", cardHTML);
  });

  // 3) 카운트 숫자 업데이트 (요소가 있을 때만 실행하여 에러 방지)
  if(document.getElementById("count-ready")) document.getElementById("count-ready").innerText = counts.ready;
  if(document.getElementById("count-logged")) document.getElementById("count-logged").innerText = counts.logged;
  if(document.getElementById("count-internalized")) document.getElementById("count-internalized").innerText = counts.internalized;
}

// 4. 페이지 로드 시 실행
window.addEventListener("DOMContentLoaded", renderInsights);