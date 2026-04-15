export interface CommunityPulse {
  label: string;
  value: string;
  note: string;
}

export interface CommunityCircle {
  slug: string;
  title: string;
  host: string;
  summary: string;
  prompt: string;
  nextSession: string;
  tags: string[];
  href: string;
}

export interface CommunityGuideline {
  title: string;
  detail: string;
}

export interface CommunityHighlight {
  title: string;
  detail: string;
  href: string;
  label: string;
}

export const communityOverview = {
  eyebrow: "Resonance Lounge",
  title: "커뮤니티는 반응을 모으는 곳이 아니라 감상을 계속 이어 가는 방입니다",
  description:
    "전시를 저장하고, 노트를 남기고, 살롱에 참여하고, 다시 읽는 흐름이 자연스럽게 이어질 때 커뮤니티는 비로소 의미를 갖습니다. 이 공간은 그 연결점을 한 화면에서 보여 주기 위한 허브입니다.",
};

export const communityPulses: CommunityPulse[] = [
  {
    label: "Live notes",
    value: "128",
    note: "리뷰와 짧은 감상 메모가 이번 시즌 전체에서 누적된 수치",
  },
  {
    label: "Returning visitors",
    value: "34%",
    note: "저장 이후 실제로 다시 관람 계획을 세운 비율",
  },
  {
    label: "Open salons",
    value: "06",
    note: "현재 신청 가능하거나 곧 열리는 소규모 대화 세션",
  },
  {
    label: "Shared prompts",
    value: "21",
    note: "관람 후 대화를 길게 만드는 질문 카드 수",
  },
];

export const communityCircles: CommunityCircle[] = [
  {
    slug: "afterimage-desk",
    title: "Afterimage Desk",
    host: "Lead Curator",
    summary:
      "전시를 보고 난 뒤 가장 먼저 남는 장면을 한 줄 메모로 모으고, 왜 그 장면이 남았는지 함께 읽는 대화 방.",
    prompt: "당신의 첫 장면은 아름다웠나요, 아니면 날카로웠나요?",
    nextSession: "04.22 / Afterimage Salon",
    tags: ["첫 장면", "감상 메모", "재방문"],
    href: "/events/afterimage-salon",
  },
  {
    slug: "route-notes-club",
    title: "Route Notes Club",
    host: "Field Editor",
    summary:
      "서울의 밤 관람 루트를 서로 공유하고, 실제 이동 감각까지 포함해 가장 좋은 계절 동선을 고르는 방.",
    prompt: "퇴근 후 90분이 있다면 어디를 먼저 가겠습니까?",
    nextSession: "05.21 / Route Notes Night Walk",
    tags: ["야간 루트", "서울", "방문 계획"],
    href: "/events/route-notes-night-walk",
  },
  {
    slug: "material-memory-desk",
    title: "Material Memory Desk",
    host: "Visual Research Desk",
    summary:
      "재질과 빛의 기억을 말로 붙잡는 연습을 하는 방. 메모와 작은 아카이브 카드가 중심이 됩니다.",
    prompt: "어떤 표면은 왜 퇴장 후에도 계속 떠오를까요?",
    nextSession: "06.27 / Material Memory Workshop",
    tags: ["재질", "빛", "기록"],
    href: "/events/material-memory-workshop",
  },
];

export const communityGuidelines: CommunityGuideline[] = [
  {
    title: "장면을 말해 주세요",
    detail:
      "좋았다, 멋졌다 같은 반응보다 구체적인 장면과 재질, 속도를 함께 적을수록 다른 사람의 방문 계획에 실제 도움이 됩니다.",
  },
  {
    title: "저장 이유를 남겨 주세요",
    detail:
      "북마크 자체보다 왜 저장했는지가 중요합니다. 저장 이유 한 줄은 다음 방문의 기준이 되고 다른 관람자의 질문이 됩니다.",
  },
  {
    title: "대화를 끝내지 말아 주세요",
    detail:
      "살롱, 블로그 노트, 전시 상세 리뷰는 서로 이어져 있습니다. 하나의 감상이 다른 층위로 이동하도록 질문을 남겨 주세요.",
  },
];

export const communityHighlights: CommunityHighlight[] = [
  {
    title: "Afterimage Salon 신청 열림",
    detail: "전시 직후의 감각을 공용 언어로 바꾸는 첫 커뮤니티 나이트가 오픈되었습니다.",
    href: "/events/afterimage-salon",
    label: "행사 보기",
  },
  {
    title: "살롱이 전시 뒤에 더 중요해지는 이유",
    detail: "커뮤니티 축을 왜 별도 허브로 분리해야 하는지 설명하는 최신 노트입니다.",
    href: "/blog/why-salons-need-a-post-visit-language",
    label: "노트 읽기",
  },
  {
    title: "전시 상세의 커뮤니티 탭 다시 보기",
    detail: "리뷰, 저장, 세션 정보가 한 흐름으로 이어지는 전시 상세 레이어를 다시 확인해 보세요.",
    href: "/exhibitions/afrofuturism-disco#community",
    label: "상세 열기",
  },
];
