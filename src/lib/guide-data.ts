export type GuideGenreSlug = "exhibition" | "music" | "opera" | "theater" | "dance";

export type GuideProgramStatus = "upcoming" | "ongoing" | "ended";

export interface GuidePalette {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
}

export interface GuideQuickFact {
  label: string;
  value: string;
  detail: string;
}

export interface GuideSection {
  title: string;
  lead: string;
  body: string;
  bullets: string[];
  note?: string;
}

export interface GuideGlossaryEntry {
  term: string;
  reading?: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
}

export interface GuideFaqEntry {
  question: string;
  answer: string;
}

export interface GuideProgramItem {
  title: string;
  venue: string;
  city: string;
  period: string;
  status: GuideProgramStatus;
  description: string;
  recommendation: string;
  bookingHint: string;
  tags: string[];
  metadata: Array<{
    label: string;
    value: string;
  }>;
}

export interface GuideGenreData {
  slug: GuideGenreSlug;
  nameKo: string;
  nameEn: string;
  summary: string;
  heroTitle: string;
  heroLead: string;
  heroBody: string;
  palette: GuidePalette;
  keywords: string[];
  quickFacts: GuideQuickFact[];
  sections: GuideSection[];
  glossary: GuideGlossaryEntry[];
  faq: GuideFaqEntry[];
  currentPrograms: GuideProgramItem[];
}

const guideGenres: GuideGenreData[] = [
  {
    slug: "exhibition",
    nameKo: "전시",
    nameEn: "Exhibition",
    summary: "이미지, 오브젝트, 공간 연출을 중심으로 감상하는 가장 넓은 형태의 장르",
    heroTitle: "전시는 느리게 읽을수록 더 많이 열립니다",
    heroLead: "초보 관람자에게는 가장 친절하고, 숙련 관람자에게는 가장 해석이 많은 장르입니다.",
    heroBody:
      "전시는 한 번에 이해하려고 하기보다, 입구에서 전체 분위기를 읽고 중간 오브젝트를 붙잡고, 마지막에 다시 처음으로 돌아오는 방식이 잘 맞습니다. 작품의 크기보다 동선, 조도, 재료감, 벽면 텍스트가 전체 경험을 결정하는 경우가 많습니다.",
    palette: {
      primary: "#9c7b46",
      secondary: "#3d4b44",
      accent: "#f1e3c4",
      surface: "#f7f2ea",
    },
    keywords: ["관람 동선", "오브젝트", "텍스트 리딩", "재방문"],
    quickFacts: [
      {
        label: "권장 체류",
        value: "40-70분",
        detail: "작품 수보다 장면 전환이 많을수록 체류 시간이 길어집니다.",
      },
      {
        label: "입문 난이도",
        value: "낮음",
        detail: "짧은 메모와 사진 기록만으로도 충분히 즐길 수 있습니다.",
      },
      {
        label: "좋은 관람법",
        value: "두 번 보기",
        detail: "한 번은 빠르게, 한 번은 멈춰서 보는 방식이 가장 안정적입니다.",
      },
      {
        label: "핵심 포인트",
        value: "재질과 텍스트",
        detail: "작품 표면과 캡션 문장 사이의 긴장을 함께 읽어야 합니다.",
      },
    ],
    sections: [
      {
        title: "입문 가이드",
        lead: "전시는 작품을 다 아는 사람보다, 처음 보는 사람이 더 좋은 질문을 만들 수 있는 장르입니다.",
        body:
          "첫 관람에서는 작품 설명을 전부 읽기보다, 먼저 전체의 온도와 리듬을 느껴 보세요. 어떤 전시는 크고 강한 이미지가 먼저 들어오고, 어떤 전시는 설명을 읽을수록 의미가 더 깊어집니다.",
        bullets: [
          "입구에서 전체 조도와 소리를 먼저 체크하세요.",
          "한 작품당 10-20초 정도의 초깃값 감상을 먼저 남기세요.",
          "마음에 남는 작품은 다시 돌아와 캡션과 함께 읽으세요.",
        ],
        note: "전시는 첫 인상과 재관람의 차이가 큰 장르라서, 메모 습관이 곧 감상력입니다.",
      },
      {
        title: "관람 포인트",
        lead: "전시는 무엇이 걸려 있느냐보다, 어떻게 보여 주느냐가 더 중요할 때가 많습니다.",
        body:
          "같은 작품도 벽면 색, 조명 각도, 관람 동선, 옆 작품의 관계에 따라 완전히 다른 인상을 줍니다. 그래서 전시는 개별 작품보다 배열과 간격, 그리고 시선의 흐름을 함께 봐야 합니다.",
        bullets: [
          "오브젝트 주변의 여백이 충분한지 확인하세요.",
          "작품 사이의 거리와 순서가 서사를 만드는지 보세요.",
          "캡션이 설명인지, 문제 제기인지 구분해 보세요.",
        ],
      },
      {
        title: "현재 프로그램 읽기",
        lead: "전시 상세에서 가장 먼저 봐야 할 정보는 날짜보다 관람 구조입니다.",
        body:
          "전시는 시작일과 종료일만 보지 말고, 요일별 혼잡도, 야간 개장, 도슨트 운영, 예약 여부를 함께 확인하는 편이 좋습니다. 작품 수가 많을수록 실제 관람 리듬을 먼저 파악해야 합니다.",
        bullets: [
          "도슨트가 있으면 처음 15분의 이해도가 크게 올라갑니다.",
          "오픈 첫 주와 마지막 주는 관람 경험이 달라질 수 있습니다.",
          "포토존보다 메인 작업의 앞뒤 구간을 우선 확인하세요.",
        ],
      },
    ],
    glossary: [
      {
        term: "도슨트",
        reading: "docent",
        definition: "전시장 안에서 작품 설명과 해설을 진행하는 안내 역할입니다.",
        example: "처음 보는 전시라면 도슨트 회차를 한 번 넣는 것만으로도 이해도가 높아집니다.",
      },
      {
        term: "큐레이션",
        reading: "curation",
        definition: "작품을 고르고 배열하며 하나의 관점을 만드는 편집 행위입니다.",
        example: "같은 작품도 큐레이션 방식에 따라 전혀 다른 메시지를 가질 수 있습니다.",
      },
      {
        term: "스테이트먼트",
        reading: "statement",
        definition: "작가나 전시가 무엇을 말하려는지 요약한 핵심 진술입니다.",
      },
    ],
    faq: [
      {
        question: "전시는 무엇부터 봐야 하나요?",
        answer: "입구의 전체 분위기, 중앙에 놓인 대표 작품, 벽면 캡션 순서로 보면 구조가 빨리 잡힙니다.",
      },
      {
        question: "사진을 많이 찍어도 되나요?",
        answer: "촬영 허용 여부는 전시마다 다르지만, 기록은 많이 남기되 감상 자체를 끊지 않는 방식이 가장 좋습니다.",
      },
      {
        question: "처음 보는 전시인데 어렵지 않을까요?",
        answer: "전시는 정답을 맞히는 장르가 아니라 질문을 발견하는 장르에 가깝습니다. 이해보다 반응을 먼저 기록해도 충분합니다.",
      },
    ],
    currentPrograms: [
      {
        title: "Gold Index: Material Memory",
        venue: "Gallery Arc",
        city: "Seoul",
        period: "2026.04.12 - 2026.05.18",
        status: "ongoing",
        description: "금속, 종이, 유리의 표면을 따라 기억이 어떻게 남는지 추적하는 전시",
        recommendation: "처음 20분은 작품 설명보다 재질 차이를 따라가면 좋습니다.",
        bookingHint: "주말 오후는 혼잡하므로 평일 오후 예약을 권장합니다.",
        tags: ["재질", "아카이브", "조도"],
        metadata: [
          { label: "관람 시간", value: "50분" },
          { label: "촬영", value: "부분 허용" },
          { label: "난이도", value: "입문" },
        ],
      },
      {
        title: "Night Paper, Quiet Room",
        venue: "Paper House",
        city: "Seoul",
        period: "2026.05.03 - 2026.06.09",
        status: "upcoming",
        description: "종이 설치와 텍스트 작업을 중심으로 한 저채도 전시",
        recommendation: "캡션을 끝까지 읽고 마지막에 다시 입구로 돌아오는 동선이 잘 맞습니다.",
        bookingHint: "야간 회차가 있으니 퇴근 후 방문 수요를 함께 고려하세요.",
        tags: ["텍스트", "설치", "야간개장"],
        metadata: [
          { label: "관람 시간", value: "45분" },
          { label: "예약", value: "필수" },
          { label: "포인트", value: "리딩 중심" },
        ],
      },
    ],
  },
  {
    slug: "music",
    nameKo: "음악",
    nameEn: "Music",
    summary: "공간의 소리, 연주자의 호흡, 프로그램의 흐름을 함께 감상하는 장르",
    heroTitle: "음악은 듣는 순간보다, 끝난 뒤 더 오래 남습니다",
    heroLead: "공연 정보는 날짜만이 아니라 편성, 자리, 악장, 휴식 시간까지 함께 봐야 합니다.",
    heroBody:
      "음악 장르는 프로그램 전체의 흐름을 읽는 힘이 중요합니다. 같은 곡이라도 편성에 따라 에너지 밀도가 달라지고, 무대와 객석의 거리감에 따라 감상 방식도 변합니다. 그래서 기초 지식 탭에서는 곡명보다 먼저 장르 문법을 익히는 것이 좋습니다.",
    palette: {
      primary: "#7a5c95",
      secondary: "#30415a",
      accent: "#efe0ff",
      surface: "#f7f3fb",
    },
    keywords: ["편성", "프로그램 노트", "악장", "호흡"],
    quickFacts: [
      {
        label: "권장 체류",
        value: "60-120분",
        detail: "인터미션이 있는 프로그램일수록 전체 체류가 길어집니다.",
      },
      {
        label: "입문 난이도",
        value: "중간",
        detail: "작품명보다 연주 형식과 편성을 먼저 이해하면 진입이 쉬워집니다.",
      },
      {
        label: "좋은 관람법",
        value: "프로그램 순서 읽기",
        detail: "곡 사이의 대비와 배치가 공연의 감정선을 만듭니다.",
      },
      {
        label: "핵심 포인트",
        value: "공간의 울림",
        detail: "연주보다 홀의 잔향과 앙상블 밸런스가 더 중요한 경우가 많습니다.",
      },
    ],
    sections: [
      {
        title: "입문 가이드",
        lead: "음악은 잘 모를수록 더 많이 들리는 장르입니다.",
        body:
          "곡명이나 작곡가를 전부 외우지 않아도 됩니다. 처음에는 악기 편성, 공연 길이, 인터미션 유무, 프로그램 노트만 읽어도 충분합니다. 같은 공연이라도 전반부와 후반부의 배치가 다르면 경험의 질도 크게 달라집니다.",
        bullets: [
          "공연 전 프로그램 순서를 미리 한 번만 읽어 두세요.",
          "내가 좋아하는 악기나 음색이 어디서 등장하는지 체크하세요.",
          "인터미션이 있다면 앞뒤 감정 온도가 어떻게 달라지는지 느껴 보세요.",
        ],
      },
      {
        title: "관람 포인트",
        lead: "음악은 '무엇을 연주하는가'와 '어떻게 배치하는가'를 함께 봐야 합니다.",
        body:
          "같은 곡도 실내악, 독주, 오케스트라, 전자음향으로 들으면 완전히 다른 세계가 됩니다. 그래서 음악 정보에서는 연주자 이름과 더불어 편성, 지휘, 악장 구조, 앙코르 여부를 함께 보는 편이 유리합니다.",
        bullets: [
          "전반부가 밝고 후반부가 무거운지 먼저 파악하세요.",
          "공연장이 작은지 큰지에 따라 감상 집중점이 달라집니다.",
          "음량보다 다이내믹 변화가 큰 순간을 기억해 두세요.",
        ],
      },
      {
        title: "현재 프로그램 읽기",
        lead: "음악 공연은 티켓 정보보다 편성 정보가 더 중요할 때가 있습니다.",
        body:
          "같은 날짜의 공연이라도 오케스트라, 실내악, 재즈, 전자 음악에 따라 입장 시간과 기대 포인트가 완전히 다릅니다. 이 탭에서는 공연명보다 먼저, 어떤 청취 방식이 맞는지를 보여 주는 데 초점을 둡니다.",
        bullets: [
          "독주는 섬세한 집중이, 앙상블은 전체 밸런스 읽기가 중요합니다.",
          "오후 공연은 해가 지는 흐름과 함께 들으면 몰입이 커질 수 있습니다.",
          "프로그램 노트는 최소한 시작 전에 한 번 읽는 편이 좋습니다.",
        ],
      },
    ],
    glossary: [
      {
        term: "인터미션",
        reading: "intermission",
        definition: "공연 중간에 주어지는 휴식 시간입니다.",
        example: "인터미션이 있으면 1부와 2부의 감정 대비를 의식하면서 들을 수 있습니다.",
      },
      {
        term: "편성",
        reading: "ensemble",
        definition: "어떤 악기와 인원이 어떤 조합으로 연주하는지 나타내는 구조입니다.",
      },
      {
        term: "프로그램 노트",
        reading: "program note",
        definition: "곡과 공연의 맥락을 설명하는 안내 글입니다.",
      },
    ],
    faq: [
      {
        question: "클래식만 음악인가요?",
        answer: "아닙니다. 재즈, 전자음악, 실험음악, 현대음악도 모두 공연 정보의 중요한 범주입니다.",
      },
      {
        question: "공연 전에 무엇을 읽으면 좋나요?",
        answer: "프로그램 순서, 작곡가 소개, 편성 정보 정도만 읽어도 관람의 절반은 준비됩니다.",
      },
      {
        question: "음악을 잘 몰라도 괜찮나요?",
        answer: "괜찮습니다. 음악은 아는 만큼만 듣는 장르가 아니라, 듣는 동안 계속 이해가 생기는 장르에 가깝습니다.",
      },
    ],
    currentPrograms: [
      {
        title: "Midnight Chamber Set",
        venue: "Seoul Recital Hall",
        city: "Seoul",
        period: "2026.04.20 - 2026.04.20",
        status: "upcoming",
        description: "현악 사중주와 피아노가 교차하는 실내악 중심의 야간 공연",
        recommendation: "고요한 공간에서 세부 음색을 듣고 싶은 사람에게 적합합니다.",
        bookingHint: "좌석 간 거리감이 중요하므로 중앙 블록을 먼저 확인하세요.",
        tags: ["실내악", "야간", "현대곡"],
        metadata: [
          { label: "공연 시간", value: "90분" },
          { label: "인터미션", value: "있음" },
          { label: "권장 좌석", value: "중앙" },
        ],
      },
      {
        title: "Glassline Electronic Session",
        venue: "Wave Room",
        city: "Seoul",
        period: "2026.04.06 - 2026.04.28",
        status: "ongoing",
        description: "전자음향과 라이브 연주가 결합된 몰입형 공연",
        recommendation: "소리의 방향성과 조명 변화를 함께 보는 것이 포인트입니다.",
        bookingHint: "스탠딩 여부와 착석 구역을 미리 확인하면 좋습니다.",
        tags: ["전자음악", "라이브", "몰입형"],
        metadata: [
          { label: "공연 시간", value: "75분" },
          { label: "형식", value: "혼합" },
          { label: "준비물", value: "이어플러그 선택" },
        ],
      },
    ],
  },
  {
    slug: "opera",
    nameKo: "오페라",
    nameEn: "Opera",
    summary: "음악, 서사, 무대, 언어가 동시에 작동하는 밀도 높은 공연 장르",
    heroTitle: "오페라는 이야기를 듣고, 장면을 보고, 감정을 따라가는 장르입니다",
    heroLead: "초보자에게는 어렵게 보이지만, 실제로는 줄거리와 장면 구조만 잡히면 빠르게 열린다.",
    heroBody:
      "오페라는 아리아, 레치타티보, 서곡, 합창 등 여러 요소가 겹치는 장르입니다. 기초 지식 탭에서는 줄거리 요약보다 먼저 작품 구조, 언어, 자막, 악장 길이, 주요 등장 인물의 관계를 정리해 주는 것이 좋습니다.",
    palette: {
      primary: "#8e6b3b",
      secondary: "#5a3340",
      accent: "#f6e6d2",
      surface: "#fcf5ef",
    },
    keywords: ["아리아", "서곡", "자막", "서사 구조"],
    quickFacts: [
      {
        label: "권장 체류",
        value: "120-180분",
        detail: "인터미션이 포함된 대형 작품은 더 긴 체류를 고려해야 합니다.",
      },
      {
        label: "입문 난이도",
        value: "높음",
        detail: "줄거리와 인물 관계도를 먼저 보면 진입 장벽이 크게 낮아집니다.",
      },
      {
        label: "좋은 관람법",
        value: "인물 맵 읽기",
        detail: "누가 누구를 부르는지, 장면마다 관계가 어떻게 바뀌는지 추적하세요.",
      },
      {
        label: "핵심 포인트",
        value: "아리아의 반복",
        detail: "같은 감정이 다른 가사와 멜로디로 돌아오는 순간을 기억하세요.",
      },
    ],
    sections: [
      {
        title: "입문 가이드",
        lead: "오페라는 긴 공연이지만, 구조를 알면 생각보다 훨씬 친절합니다.",
        body:
          "첫 관람이라면 전 작품을 이해하려 하지 말고, 가장 중요한 인물 세 명과 갈등 축 하나만 잡아도 충분합니다. 자막이 제공되는지, 원어 공연인지, 인터미션이 몇 번인지 먼저 확인하면 체력 배분이 쉬워집니다.",
        bullets: [
          "공연 전에 줄거리 요약을 5분만 읽어 두세요.",
          "인물 관계도와 시대 배경을 함께 확인하세요.",
          "아리아가 언제 반복되는지 기억해 두면 공연의 하이라이트가 선명해집니다.",
        ],
      },
      {
        title: "관람 포인트",
        lead: "오페라는 음악적 감정선과 극적 장면이 동시에 진행됩니다.",
        body:
          "오페라를 볼 때는 '누가 노래하는지'와 '왜 지금 이 감정이 필요한지'를 같이 보는 편이 좋습니다. 합창 장면은 이야기의 배경을 넓혀 주고, 독창은 인물의 내면을 압축해서 보여 줍니다.",
        bullets: [
          "오케스트라가 언제 전면에 나오는지 확인하세요.",
          "무대 전환이 서사의 속도를 어떻게 바꾸는지 보세요.",
          "자막을 따라가되 무대 표정도 같이 놓치지 마세요.",
        ],
      },
      {
        title: "현재 프로그램 읽기",
        lead: "오페라 정보에서는 작품명보다 버전과 연출 정보가 중요합니다.",
        body:
          "같은 작품이라도 전막, 하이라이트, 현대적 재해석, 콘서트 오페라에 따라 완전히 다른 경험이 됩니다. 이 영역에서는 공연장의 규모와 언어, 자막 여부, 러닝타임을 가장 먼저 제시하는 것이 좋습니다.",
        bullets: [
          "원어 공연이면 자막 위치와 시야각을 체크하세요.",
          "러닝타임이 길수록 중간 휴식 계획이 중요합니다.",
          "초행자라면 줄거리보다 대표 아리아 먼저 듣고 가도 좋습니다.",
        ],
      },
    ],
    glossary: [
      {
        term: "아리아",
        reading: "aria",
        definition: "인물의 감정이나 핵심 주제를 길게 펼쳐 보이는 독창입니다.",
        example: "오페라에서 가장 기억에 남는 멜로디가 아리아인 경우가 많습니다.",
      },
      {
        term: "레치타티보",
        reading: "recitativo",
        definition: "대사처럼 빠르게 노래하며 이야기를 진행하는 형식입니다.",
      },
      {
        term: "서곡",
        reading: "overture",
        definition: "공연의 분위기와 주요 모티프를 미리 제시하는 도입부입니다.",
      },
    ],
    faq: [
      {
        question: "오페라는 너무 길지 않나요?",
        answer: "길 수는 있지만, 줄거리와 인물 관계를 알고 보면 체감 길이가 훨씬 짧아집니다.",
      },
      {
        question: "이탈리아어를 몰라도 되나요?",
        answer: "대부분 자막이 제공되므로 언어 자체보다 장면의 흐름을 따라가면 됩니다.",
      },
      {
        question: "초보자는 무엇을 보면 좋나요?",
        answer: "짧은 하이라이트 공연이나 유명 아리아 중심의 프로그램부터 시작하면 좋습니다.",
      },
    ],
    currentPrograms: [
      {
        title: "Luminous Garden: Modern Opera Night",
        venue: "Grand Hall Seoul",
        city: "Seoul",
        period: "2026.05.08 - 2026.05.10",
        status: "upcoming",
        description: "현대적 연출과 대형 합창이 결합된 오페라 프로그램",
        recommendation: "줄거리와 주요 인물 관계를 먼저 보면 몰입이 쉬워집니다.",
        bookingHint: "자막 시야가 좋은 좌석부터 빠르게 마감될 수 있습니다.",
        tags: ["현대연출", "합창", "대형무대"],
        metadata: [
          { label: "러닝타임", value: "160분" },
          { label: "인터미션", value: "2회" },
          { label: "언어", value: "이탈리아어" },
        ],
      },
      {
        title: "Opera Salon: Verdi Arias",
        venue: "Salon Theater",
        city: "Seoul",
        period: "2026.04.02 - 2026.04.27",
        status: "ongoing",
        description: "대표 아리아와 해설이 함께 구성된 입문형 오페라 프로그램",
        recommendation: "오페라 첫 관람자에게 가장 부담이 적은 형식입니다.",
        bookingHint: "작은 홀이라도 자막과 피아노 반주 구성 여부를 먼저 보세요.",
        tags: ["입문", "아리아", "해설"],
        metadata: [
          { label: "러닝타임", value: "80분" },
          { label: "형식", value: "콘서트 오페라" },
          { label: "자막", value: "있음" },
        ],
      },
    ],
  },
  {
    slug: "theater",
    nameKo: "연극",
    nameEn: "Theater",
    summary: "대사, 몸, 장면 전환, 리듬이 서사를 직접 밀어가는 장르",
    heroTitle: "연극은 장면보다 장면 사이의 숨결이 더 오래 남습니다",
    heroLead: "대사의 의미를 따라가되, 배우의 몸과 공간 사용을 함께 읽어야 합니다.",
    heroBody:
      "연극은 줄거리 중심으로 보이지만 실제로는 말의 속도, 침묵의 길이, 배우 간 거리, 장면 전환의 방식이 감상을 결정합니다. 기초 지식 탭에서는 작품 개요보다 공연 형식과 무대 문법을 먼저 알려 주면 초보자에게 훨씬 친절합니다.",
    palette: {
      primary: "#7b5b4b",
      secondary: "#3e4a57",
      accent: "#f0dfd4",
      surface: "#fbf6f2",
    },
    keywords: ["대사", "장면 전환", "앙상블", "리듬"],
    quickFacts: [
      {
        label: "권장 체류",
        value: "90-140분",
        detail: "인터미션 유무와 장면 수에 따라 체감 길이가 달라집니다.",
      },
      {
        label: "입문 난이도",
        value: "중간",
        detail: "줄거리보다 무대 리듬을 익히는 것이 더 중요합니다.",
      },
      {
        label: "좋은 관람법",
        value: "말의 온도 읽기",
        detail: "같은 대사도 속도와 호흡에 따라 의미가 달라집니다.",
      },
      {
        label: "핵심 포인트",
        value: "무대 전환",
        detail: "세트가 바뀌는 순간이 감정선의 주요 지점이 됩니다.",
      },
    ],
    sections: [
      {
        title: "입문 가이드",
        lead: "연극은 줄거리만 따라가면 놓치는 것이 많고, 호흡을 읽으면 훨씬 풍부해집니다.",
        body:
          "공연을 처음 볼 때는 등장인물 관계와 장면 수, 무대 형식만 먼저 이해해도 충분합니다. 배우의 발화 속도나 침묵의 길이, 동선 이동이 의미를 만드는 경우가 많기 때문에, 대사 내용과 함께 몸의 움직임을 같이 보는 습관이 중요합니다.",
        bullets: [
          "공연 시작 전에 캐릭터 관계도를 간단히 보세요.",
          "장면 전환이 빠른지 느린지 먼저 감지하세요.",
          "침묵이 길어지는 순간에 관객의 반응도 함께 느껴 보세요.",
        ],
      },
      {
        title: "관람 포인트",
        lead: "연극은 배우의 말보다 말이 놓이는 방식에서 더 큰 이야기가 나옵니다.",
        body:
          "무대의 크기보다 시선이 모이는 위치가 중요합니다. 어떤 연극은 중앙보다 측면에서, 어떤 연극은 배우가 관객 쪽으로 직접 호흡을 던질 때 더 강하게 작동합니다. 이 장르에서는 텍스트와 몸의 관계를 함께 보는 것이 핵심입니다.",
        bullets: [
          "배우 간 거리 변화가 관계 변화를 드러내는지 보세요.",
          "세트가 고정인지 변형되는지 확인하세요.",
          "장면 전환의 템포가 감정선과 맞물리는지 체크하세요.",
        ],
      },
      {
        title: "현재 프로그램 읽기",
        lead: "연극 정보는 장르명보다 형식과 텍스트 버전을 우선해야 합니다.",
        body:
          "창작극, 고전 재해석, 낭독극, 인터랙티브 공연은 모두 관람 준비가 다릅니다. 따라서 공연 상세에서는 러닝타임, 관객 참여 여부, 좌석 배치, 언어 스타일을 먼저 제시하는 편이 좋습니다.",
        bullets: [
          "낭독극은 텍스트 집중도가 높아 자막이나 대본 안내가 중요합니다.",
          "인터랙티브 형식이면 관객 참여 범위를 미리 확인하세요.",
          "창작극은 창작 배경과 제작 노트가 감상의 실마리가 됩니다.",
        ],
      },
    ],
    glossary: [
      {
        term: "낭독극",
        reading: "reading play",
        definition: "배우가 텍스트를 중심으로 읽어 주는 형식의 공연입니다.",
      },
      {
        term: "앙상블",
        reading: "ensemble",
        definition: "여러 배우가 균형 있게 장면을 구성하는 방식입니다.",
        example: "연극에서는 앙상블의 리듬이 작품의 밀도를 크게 좌우합니다.",
      },
      {
        term: "무대미술",
        reading: "scenography",
        definition: "공간, 조명, 오브젝트를 통해 무대의 세계를 만드는 설계입니다.",
      },
    ],
    faq: [
      {
        question: "연극은 대사를 다 들어야 이해되나요?",
        answer: "전부를 놓치지 않아도 됩니다. 핵심 관계와 장면의 전환만 따라가도 충분합니다.",
      },
      {
        question: "첫 관람은 어떤 형식이 좋나요?",
        answer: "러닝타임이 짧고 인물 수가 적은 공연이 부담이 적습니다.",
      },
      {
        question: "관객 참여가 있으면 어렵지 않나요?",
        answer: "참여 범위는 작품마다 다릅니다. 공연 안내에서 어느 정도 상호작용이 있는지 먼저 확인하면 됩니다.",
      },
    ],
    currentPrograms: [
      {
        title: "Room Tone",
        venue: "Black Box Seoul",
        city: "Seoul",
        period: "2026.04.17 - 2026.05.12",
        status: "ongoing",
        description: "침묵과 대화 사이의 간격을 다루는 미니멀 연극",
        recommendation: "대사보다 배우의 호흡과 시선 이동을 따라가면 좋습니다.",
        bookingHint: "소극장 특성상 앞열과 중앙석이 빨리 마감됩니다.",
        tags: ["미니멀", "소극장", "호흡"],
        metadata: [
          { label: "러닝타임", value: "100분" },
          { label: "인터미션", value: "없음" },
          { label: "관객 참여", value: "적음" },
        ],
      },
      {
        title: "Rehearsal of Tomorrow",
        venue: "Studio Stage",
        city: "Seoul",
        period: "2026.05.01 - 2026.05.26",
        status: "upcoming",
        description: "창작 과정 자체를 서사로 삼는 메타 연극 프로그램",
        recommendation: "작품 안의 작품 구조를 읽으면 재미가 크게 늘어납니다.",
        bookingHint: "초연 시즌이라 회차별 회고 이벤트를 함께 확인하세요.",
        tags: ["메타연극", "초연", "창작극"],
        metadata: [
          { label: "러닝타임", value: "110분" },
          { label: "형식", value: "창작극" },
          { label: "시야", value: "전방 추천" },
        ],
      },
    ],
  },
  {
    slug: "dance",
    nameKo: "무용",
    nameEn: "Dance",
    summary: "몸의 리듬, 공간의 흐름, 반복과 변주를 읽는 장르",
    heroTitle: "무용은 말 대신 움직임의 문법으로 감정을 전달합니다",
    heroLead: "몸의 궤적, 정지, 반복, 속도 변화가 곧 작품의 언어입니다.",
    heroBody:
      "무용은 동작의 의미를 한 번에 해석하기보다, 동작이 반복되고 변형되는 흐름을 보는 장르입니다. 현대무용, 발레, 전통무용은 각각 읽는 방식이 조금 다르지만, 모두 공간 점유와 에너지 변화가 핵심입니다.",
    palette: {
      primary: "#496f73",
      secondary: "#324a58",
      accent: "#dbf0ef",
      surface: "#f3f8f7",
    },
    keywords: ["동선", "에너지", "반복", "리듬"],
    quickFacts: [
      {
        label: "권장 체류",
        value: "50-110분",
        detail: "무용은 구성에 따라 짧고 밀도 높게 끝나는 경우가 많습니다.",
      },
      {
        label: "입문 난이도",
        value: "중간",
        detail: "서사보다 에너지와 반복을 읽으면 접근이 쉬워집니다.",
      },
      {
        label: "좋은 관람법",
        value: "몸의 궤적 보기",
        detail: "손끝, 시선, 발의 방향이 말해 주는 것을 따라가 보세요.",
      },
      {
        label: "핵심 포인트",
        value: "정지의 힘",
        detail: "움직임보다 멈춤이 더 강한 장면을 놓치지 마세요.",
      },
    ],
    sections: [
      {
        title: "입문 가이드",
        lead: "무용은 해석하려고 볼수록 어렵고, 리듬을 따라가면 훨씬 열린다.",
        body:
          "처음 보는 무용 공연에서는 '무엇을 의미하는가'보다 '어떻게 움직이는가'에 집중하세요. 반복되는 동작, 군무의 밀도, 정지와 폭발의 대비를 읽으면 작품의 구조가 보이기 시작합니다.",
        bullets: [
          "무용수의 시선 방향이 어디를 향하는지 확인하세요.",
          "같은 동작이 반복될 때 미세한 변화가 있는지 보세요.",
          "공간을 넓게 쓰는지, 한 지점에 압축하는지 구분해 보세요.",
        ],
      },
      {
        title: "관람 포인트",
        lead: "무용은 몸의 언어가 공간 전체로 번지는 순간 가장 선명해집니다.",
        body:
          "발레는 선과 균형, 현대무용은 에너지와 변형, 전통무용은 호흡과 장단이 중요하게 읽힙니다. 따라서 장르별 기준을 모두 하나로 보려 하지 말고, 작품이 어떤 움직임의 문법을 쓰는지 먼저 확인하는 편이 좋습니다.",
        bullets: [
          "반복되는 동작이 쌓여 감정이 변하는지 보세요.",
          "군무가 개인의 움직임을 덮는지, 반대로 드러내는지 살펴보세요.",
          "조명 전환이 몸의 리듬과 맞물리는지 확인하세요.",
        ],
      },
      {
        title: "현재 프로그램 읽기",
        lead: "무용 정보에서는 안무가, 편성, 무대 크기, 음악 사용 방식이 핵심입니다.",
        body:
          "같은 무용이라도 라이브 음악, 녹음음악, 무음에 가까운 구성에 따라 경험이 완전히 달라집니다. 시각적으로는 깔끔해 보여도 실제 관람에서는 체력 소모가 높을 수 있으므로 러닝타임과 구성 밀도를 함께 봐야 합니다.",
        bullets: [
          "무대가 넓을수록 동선과 시야 이동이 중요합니다.",
          "전통 요소가 들어가면 장단과 의상 재질을 함께 보세요.",
          "짧은 작품 묶음이면 각 작품의 질감 차이를 비교하는 재미가 있습니다.",
        ],
      },
    ],
    glossary: [
      {
        term: "안무",
        reading: "choreography",
        definition: "무용의 동작과 동선을 설계하는 구성 방식입니다.",
      },
      {
        term: "군무",
        reading: "ensemble dance",
        definition: "여러 무용수가 함께 움직이며 장면을 만드는 형식입니다.",
      },
      {
        term: "장단",
        reading: "jangdan",
        definition: "전통음악과 무용에서 리듬의 틀을 이루는 박자 구조입니다.",
      },
    ],
    faq: [
      {
        question: "무용은 스토리를 꼭 알아야 하나요?",
        answer: "아닙니다. 무용은 서사보다 동작의 반복과 변화를 보는 즐거움이 큽니다.",
      },
      {
        question: "발레와 현대무용은 어떻게 다르죠?",
        answer: "발레는 선과 균형, 현대무용은 에너지와 변형이 더 두드러지는 편입니다.",
      },
      {
        question: "처음 보면 뭐가 중요한가요?",
        answer: "동작의 방향, 반복, 정지, 그리고 음악과의 관계를 먼저 보면 됩니다.",
      },
    ],
    currentPrograms: [
      {
        title: "Tide Line",
        venue: "Movement House",
        city: "Seoul",
        period: "2026.04.11 - 2026.05.01",
        status: "ongoing",
        description: "물결 같은 반복 동작으로 감정의 흐름을 만드는 현대무용",
        recommendation: "동작의 미세한 변화와 정지 구간에 집중하면 좋습니다.",
        bookingHint: "무대 측면이 보이는 좌석은 동선 읽기에 유리합니다.",
        tags: ["현대무용", "반복", "리듬"],
        metadata: [
          { label: "러닝타임", value: "70분" },
          { label: "음악", value: "라이브+음원" },
          { label: "체감 난도", value: "중간" },
        ],
      },
      {
        title: "White Frame Ballet",
        venue: "Blue Stage",
        city: "Seoul",
        period: "2026.05.14 - 2026.05.29",
        status: "upcoming",
        description: "클래식 발레 문법을 바탕으로 한 미니멀한 무대 구성",
        recommendation: "선과 균형이 어떻게 바뀌는지 보기에 적합합니다.",
        bookingHint: "시야 방해가 적은 전열 또는 중블록을 권장합니다.",
        tags: ["발레", "미니멀", "클래식"],
        metadata: [
          { label: "러닝타임", value: "95분" },
          { label: "인터미션", value: "있음" },
          { label: "의상", value: "클래식" },
        ],
      },
    ],
  },
];

export const guideGenresBySlug: Record<GuideGenreSlug, GuideGenreData> = guideGenres.reduce(
  (acc, genre) => {
    acc[genre.slug] = genre;
    return acc;
  },
  {} as Record<GuideGenreSlug, GuideGenreData>
);

export function getGuideGenres(): GuideGenreData[] {
  return guideGenres;
}

export function getGuideGenre(slug: GuideGenreSlug): GuideGenreData {
  return guideGenresBySlug[slug];
}

export function findGuideGenre(slug: string): GuideGenreData | undefined {
  return guideGenresBySlug[slug as GuideGenreSlug];
}

export function getGuideCurrentPrograms(slug: GuideGenreSlug): GuideProgramItem[] {
  return guideGenresBySlug[slug].currentPrograms;
}

