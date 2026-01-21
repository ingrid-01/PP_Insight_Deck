// 1. 초기 데이터 (우리가 정리한 그 내용들)
const insights = [
  {
    id: 1,
    status: "ready", // ready, logged, internalized
    category: "news", // newspaper, classic, nonfiction, other
    subCategory: "신문기사 - 심리학",
    date: "Sep 2025",
    title: "친애하는 나의 결함에게",
    content:
      "누구나 결함을 가지고 있다. 이를 어떻게 생각하고 어떻게 사용하는지에 따라 삶이 달라진다.",
    reflect:
      "나는 결함을 없애야 할 적으로만 여겼다. 하지만 상담가로서 타인에게 했던 말과 나의 행동의 모순을 깨달았다. 결핍은 나를 나답게 만드는 원동력이다.",
    action: null, // 아직 실천 과제가 없을 수 있음
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

// 2. 카테고리별 디자인 설정 (Tailwind 클래스 매핑)
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
// 3. 화면 그리기 함수 (Render Function)
function renderInsights() {}
