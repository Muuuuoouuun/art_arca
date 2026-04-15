export interface BlogSection {
  title: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  kicker: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  featured?: boolean;
  relatedEventSlug?: string;
  relatedExhibitionId?: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-read-an-exhibition-twice",
    kicker: "Field Note 01",
    category: "Viewing Practice",
    title: "전시는 왜 두 번 볼수록 더 많이 열리는가",
    excerpt:
      "첫 번째 관람이 분위기를 잡는 시간이라면, 두 번째 관람은 구조를 읽는 시간입니다. 전시를 다시 보는 리듬을 실제 동선 기준으로 정리했습니다.",
    publishedAt: "2026.04.16",
    readTime: "5 min read",
    author: "Editorial Desk",
    tags: ["관람 리듬", "재방문", "메모"],
    featured: true,
    relatedEventSlug: "slow-looking-circle",
    relatedExhibitionId: "vaporwave-renaissance",
    sections: [
      {
        title: "첫 번째 관람은 정답 찾기가 아니라 온도 측정입니다",
        body: [
          "많은 관람자가 첫 방문에서 모든 작품을 이해해야 한다고 느끼지만, 실제로는 공간의 온도와 리듬을 먼저 잡는 편이 훨씬 안정적입니다.",
          "입구에서 가장 먼저 느껴지는 빛, 소리, 재질의 압력을 기억해 두면 두 번째 회전에서 왜 특정 장면이 더 오래 남는지 설명할 수 있게 됩니다.",
        ],
      },
      {
        title: "두 번째 관람에서는 오브젝트와 텍스트의 간격을 읽습니다",
        body: [
          "대표 장면을 먼저 정한 뒤 그 주변의 캡션, 벽면 간격, 이동 속도를 다시 보면 전시가 의도한 설계가 조금씩 드러납니다.",
          "특히 이미지 중심 전시는 가까이서 본 질감과 멀리서 본 실루엣 사이에 큰 차이가 있기 때문에 두 번 보기의 보상이 큽니다.",
        ],
      },
      {
        title: "재방문은 일정 낭비가 아니라 감상 완성도입니다",
        body: [
          "한 번에 다 보지 못했다는 감각은 실패가 아니라 전시의 여지를 남긴 것입니다. 다시 볼 이유를 남기는 전시는 대개 더 오래 기억됩니다.",
          "이 프로젝트가 저장과 예약, 리뷰를 하나의 흐름으로 묶는 이유도 여기에 있습니다. 두 번째 관람이 실제로 일어나도록 동선을 설계하는 것이 핵심입니다.",
        ],
      },
    ],
  },
  {
    slug: "seoul-night-route-for-april",
    kicker: "Route Memo",
    category: "City Route",
    title: "4월 서울의 야간 관람 루트를 짜는 가장 현실적인 방법",
    excerpt:
      "퇴근 후 90분 안에 가능한 전시 루트와, 관람 뒤 대화를 이어가기 좋은 정적의 장소들을 함께 정리했습니다.",
    publishedAt: "2026.04.18",
    readTime: "4 min read",
    author: "Jisu Park",
    tags: ["서울", "야간 관람", "도시 동선"],
    relatedEventSlug: "route-notes-night-walk",
    sections: [
      {
        title: "좋은 야간 루트는 전시 숫자보다 속도가 중요합니다",
        body: [
          "밤의 관람은 낮과 다르게 체력이 먼저 변수로 들어옵니다. 그래서 두 곳을 무리하게 도는 루트보다 한 곳을 충분히 보고 주변 대화 장소까지 이어지는 흐름이 낫습니다.",
          "을지로와 성수는 퇴근 동선과 연결하기 쉬워 짧은 시간에도 밀도 있는 루트를 만들 수 있는 지역입니다.",
        ],
      },
      {
        title: "야간 개장은 작품보다 조도가 경험을 바꿉니다",
        body: [
          "같은 전시도 어두워진 뒤에는 벽면 색, 반사, 소음의 체감이 완전히 달라집니다. 특히 라이트 아트와 저채도 설치 작업은 밤 시간대에 더 선명해지는 경우가 많습니다.",
          "루트를 짤 때는 오픈 시간만 보지 말고, 주변 거리의 밝기와 이동 중 머리가 식는 시간을 함께 고려하는 편이 좋습니다.",
        ],
      },
    ],
  },
  {
    slug: "why-salons-need-a-post-visit-language",
    kicker: "Community Note",
    category: "Community",
    title: "살롱이 전시 뒤에 더 중요해지는 이유",
    excerpt:
      "살롱은 단순한 행사 포맷이 아니라, 감상을 개인 경험에서 공용 언어로 바꾸는 장치입니다. 왜 관람 직후의 대화가 중요한지 정리했습니다.",
    publishedAt: "2026.04.24",
    readTime: "6 min read",
    author: "Community Desk",
    tags: ["살롱", "커뮤니티", "대화"],
    relatedEventSlug: "afterimage-salon",
    sections: [
      {
        title: "좋은 전시는 혼자 끝나지 않습니다",
        body: [
          "작품을 혼자 보는 시간은 중요하지만, 그 감각을 말로 옮기는 순간 전시는 한 번 더 열립니다.",
          "살롱은 정답을 확인하는 자리가 아니라, 서로 다른 메모가 어떻게 같은 장면을 다른 방향으로 끌고 가는지 확인하는 자리입니다.",
        ],
      },
      {
        title: "커뮤니티는 반응 수가 아니라 문장의 밀도로 측정해야 합니다",
        body: [
          "좋은 커뮤니티는 단순히 댓글이 많은 상태가 아닙니다. 누군가의 짧은 감상이 다른 사람의 방문 계획을 움직일 때 비로소 힘을 가집니다.",
          "그래서 이 프로젝트의 커뮤니티 축은 리뷰 수보다도 저장 이유, 재방문 의도, 질문의 길이에 더 주목합니다.",
        ],
      },
      {
        title: "오프라인 살롱과 온라인 노트는 분리되지 않습니다",
        body: [
          "오프라인 대화에서 시작된 문장은 블로그 노트와 커뮤니티 기록으로 이어지고, 그 기록은 다시 다음 관람의 출발점이 됩니다.",
          "결국 살롱은 이벤트 하나가 아니라, 플랫폼 안에서 감상이 계속 순환되도록 만드는 기반 구조에 가깝습니다.",
        ],
      },
    ],
  },
  {
    slug: "materials-that-remember-light",
    kicker: "Material Study",
    category: "Curatorial Decode",
    title: "빛을 기억하는 재질들은 어떻게 전시를 오래 남게 만드는가",
    excerpt:
      "유리, 금속, 반투명 필름 같은 재질은 장면을 보여 주는 동시에 시간을 저장합니다. 이번 시즌의 재질 중심 전시를 통해 그 차이를 살펴봅니다.",
    publishedAt: "2026.05.02",
    readTime: "5 min read",
    author: "Visual Research Desk",
    tags: ["재질", "광원", "기억"],
    relatedEventSlug: "material-memory-workshop",
    relatedExhibitionId: "nature-bio-art",
    sections: [
      {
        title: "재질은 설명보다 먼저 경험을 만듭니다",
        body: [
          "전시장 안에서 관람자는 작품의 의미를 읽기 전에 먼저 표면의 압력을 느낍니다. 차갑거나 젖어 보이거나, 빛을 흩뜨리는 성질이 먼저 몸에 들어옵니다.",
          "이 선행 감각이 강할수록 작품 설명은 나중에 와도 늦지 않습니다. 오히려 설명이 감각을 정리하는 역할을 하게 됩니다.",
        ],
      },
      {
        title: "빛을 기억하는 표면은 퇴장 뒤에도 남습니다",
        body: [
          "반사와 투과가 동시에 일어나는 재질은 관람 중보다 전시장 밖에서 더 오래 떠오르는 경우가 많습니다.",
          "그래서 재질 중심 전시는 굿즈보다 메모가 중요합니다. 순간의 빛 상태를 말로 붙잡아 두어야 나중에 다시 불러올 수 있기 때문입니다.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
