export type EventStatus = "upcoming" | "limited" | "sold-out";

export type EventFormat =
  | "salon"
  | "conversation"
  | "walkthrough"
  | "screening"
  | "workshop";

export interface EventAgendaItem {
  label: string;
  detail: string;
}

export interface EventItem {
  slug: string;
  title: string;
  subtitle: string;
  format: EventFormat;
  status: EventStatus;
  date: string;
  time: string;
  venue: string;
  district: string;
  host: string;
  capacity: string;
  entry: string;
  summary: string;
  description: string;
  chapter: string;
  tags: string[];
  relatedExhibitionId?: string;
  agenda: EventAgendaItem[];
  takeaways: string[];
  notes: string[];
}

export const events: EventItem[] = [
  {
    slug: "afterimage-salon",
    title: "Afterimage Salon",
    subtitle: "관람이 끝난 뒤에도 장면이 남는 이유를 한 전시씩 천천히 푸는 저녁 세션",
    format: "salon",
    status: "limited",
    date: "2026.04.22",
    time: "19:30 - 21:00",
    venue: "Art Arca Center",
    district: "성수",
    host: "Lead Curator Ah-Hyun Kim",
    capacity: "18 seats",
    entry: "예약 필수 / 18,000 KRW",
    summary:
      "전시를 보고 난 직후의 감각을 기록으로 바꾸는 소규모 살롱입니다. 첫 장면, 메모, 저장 이유를 한 흐름으로 다룹니다.",
    description:
      "셀레스티얼 그루브를 중심으로 감상 메모가 왜 서로 다르게 남는지 읽어 보는 저녁 살롱입니다. 설명보다 대화의 리듬을 우선하며, 참가자 각자의 장면 기록을 하나의 공통 질문으로 묶어 냅니다.",
    chapter: "Community Night",
    tags: ["소규모 대화", "관람 메모", "저장 동선"],
    relatedExhibitionId: "afrofuturism-disco",
    agenda: [
      {
        label: "Threshold Notes",
        detail: "입장 직후 가장 먼저 들어온 이미지와 색감을 짧은 문장으로 기록합니다.",
      },
      {
        label: "Shared Reading",
        detail: "작품 설명보다 각자 남긴 메모를 먼저 읽으며 공통되는 감각을 찾습니다.",
      },
      {
        label: "Return Prompt",
        detail: "다시 본다면 어느 지점부터 시작할지, 재방문 질문을 한 줄씩 남깁니다.",
      },
    ],
    takeaways: [
      "관람 메모를 그냥 감상문이 아니라 다음 방문의 출발점으로 바꾸는 구조를 경험합니다.",
      "다른 사람의 해석을 통해 같은 장면이 얼마나 다르게 읽히는지 확인할 수 있습니다.",
      "전시 상세의 커뮤니티 탭과 실제 오프라인 살롱이 연결되는 방식이 선명해집니다.",
    ],
    notes: [
      "현장에서는 촬영보다 메모를 우선합니다.",
      "세션 전 전시 관람을 마치고 오는 흐름을 권장합니다.",
      "음료 포함, 좌석은 지정이 아닌 도착 순 배치입니다.",
    ],
  },
  {
    slug: "slow-looking-circle",
    title: "Slow Looking Circle",
    subtitle: "한 전시를 빠르게 소비하지 않고 두 번의 리듬으로 다시 보는 주말 회차",
    format: "walkthrough",
    status: "upcoming",
    date: "2026.05.09",
    time: "11:00 - 12:20",
    venue: "Glitch Gallery",
    district: "한남",
    host: "Archive Moderator Min Seo",
    capacity: "24 seats",
    entry: "예약 권장 / 12,000 KRW",
    summary:
      "베이퍼웨이브와 르네상스 조각이 충돌하는 전시를 두 번의 동선으로 나눠 읽는 느린 관람 프로그램입니다.",
    description:
      "스테츄 웨이브를 대상으로 첫 회전에서는 실루엣과 색을, 두 번째 회전에서는 재질과 오류감을 읽습니다. 빠른 설명 대신 같은 장면을 다른 속도로 다시 보는 방식에 집중합니다.",
    chapter: "Viewing Route",
    tags: ["느린 관람", "재질 읽기", "주말 회차"],
    relatedExhibitionId: "vaporwave-renaissance",
    agenda: [
      {
        label: "Wide Pass",
        detail: "전체 공간의 장면 전환과 색의 압력을 먼저 확인합니다.",
      },
      {
        label: "Object Return",
        detail: "대표 오브젝트를 중심으로 근거리 재질과 디지털 오류의 차이를 읽습니다.",
      },
      {
        label: "Closing Comparison",
        detail: "첫 인상과 두 번째 인상이 어떻게 달라졌는지 비교 메모를 남깁니다.",
      },
    ],
    takeaways: [
      "같은 전시를 두 번 볼 때 생기는 해석 차이를 자연스럽게 체감합니다.",
      "이미지 중심 전시도 속도를 조절하면 훨씬 오래 남는다는 감각을 얻습니다.",
      "가이드 페이지의 관람 포인트가 실제 동선에서 어떻게 작동하는지 연결됩니다.",
    ],
    notes: [
      "도슨트 형식보다 자율 관찰 비중이 높습니다.",
      "현장 상황에 따라 일부 동선은 변경될 수 있습니다.",
      "초보 관람자도 참여하기 쉽게 질문 카드가 제공됩니다.",
    ],
  },
  {
    slug: "route-notes-night-walk",
    title: "Route Notes Night Walk",
    subtitle: "한 전시만 보지 않고 밤의 이동 경로까지 하나의 문화 일정으로 묶는 도시형 프로그램",
    format: "conversation",
    status: "upcoming",
    date: "2026.05.21",
    time: "20:00 - 21:30",
    venue: "Paper House Lounge",
    district: "을지로",
    host: "Field Editor Jisu Park",
    capacity: "32 seats",
    entry: "무료 / 사전 신청",
    summary:
      "퇴근 후 관람 동선, 주변 거리, 대화가 이어지는 장소까지 포함해 서울의 예술 야간 루트를 함께 짜는 프로그램입니다.",
    description:
      "전시 하나의 정보보다 그 전후의 이동 감각이 중요하다는 전제에서 출발합니다. 종이, 텍스트, 저채도 공간을 중심으로 서울의 밤 관람 루트를 큐레이터 노트처럼 정리합니다.",
    chapter: "City Route",
    tags: ["야간 루트", "도시 동선", "퇴근 후 방문"],
    agenda: [
      {
        label: "Opening Route",
        detail: "퇴근 후 90분 안에 가능한 전시 루트를 구역별로 나눠 소개합니다.",
      },
      {
        label: "Quiet Stops",
        detail: "관람 뒤 대화가 이어지기 좋은 조용한 장소들을 함께 메모합니다.",
      },
      {
        label: "Season Picks",
        detail: "이번 시즌에서 실제로 밤 관람과 잘 맞는 프로그램을 추천합니다.",
      },
    ],
    takeaways: [
      "행사 정보가 단순 캘린더가 아니라 실제 방문 계획이 되도록 정리할 수 있습니다.",
      "서울 기반 아트 루트를 계절별로 모아 보는 감각을 얻습니다.",
      "블로그와 가이드의 에디토리얼 문맥이 방문 계획으로 연결됩니다.",
    ],
    notes: [
      "도보 중심 루트 예시와 대중교통 기준 이동 시간이 함께 제공됩니다.",
      "실외 이동이 포함될 수 있어 간단한 겉옷을 권장합니다.",
      "현장 기록용 미니 노트가 제공됩니다.",
    ],
  },
  {
    slug: "dream-frequency-listening-session",
    title: "Dream Frequency Listening Session",
    subtitle: "몰입형 전시를 눈보다 귀로 다시 읽어 보는 심야 리스닝 세션",
    format: "screening",
    status: "sold-out",
    date: "2026.06.18",
    time: "21:00 - 22:10",
    venue: "Deep Space Gallery",
    district: "이태원",
    host: "Visual Researcher Han Sol",
    capacity: "20 seats",
    entry: "예약 마감",
    summary:
      "드림 프리퀀시의 사운드스케이프와 장면 전환을 분리해서 듣고 다시 보는 야간 프로그램입니다.",
    description:
      "초현실주의와 앰비언트가 만나는 전시를 사운드 중심으로 다시 읽습니다. 장면보다 리듬과 정적의 타이밍을 먼저 잡아 보는 세션이라, 이미 전시를 본 사람에게 특히 잘 맞습니다.",
    chapter: "After Hours",
    tags: ["심야 세션", "사운드스케이프", "몰입형 미디어"],
    relatedExhibitionId: "surreal-ambient",
    agenda: [
      {
        label: "Sound Before Image",
        detail: "이미지를 가리운 상태로 주요 사운드 변화를 먼저 듣습니다.",
      },
      {
        label: "Scene Re-entry",
        detail: "같은 구간을 다시 보며 사운드가 장면 인식을 어떻게 바꾸는지 비교합니다.",
      },
      {
        label: "Residual Notes",
        detail: "관람 직후보다 시간이 지난 뒤 더 남는 감각을 한 줄 노트로 정리합니다.",
      },
    ],
    takeaways: [
      "몰입형 전시의 핵심이 이미지 자체보다 시간과 호흡에 있다는 점을 확인합니다.",
      "전시 인사이트 탭의 데이터형 해석을 감각 경험과 연결할 수 있습니다.",
      "이미 본 전시를 전혀 다른 축으로 다시 여는 방법을 익힙니다.",
    ],
    notes: [
      "현재 회차는 마감되었지만 대기 신청은 열려 있습니다.",
      "이어폰이 아닌 공간 사운드로 진행됩니다.",
      "빛 자극에 민감한 관람자는 후반 구간을 주의해 주세요.",
    ],
  },
  {
    slug: "material-memory-workshop",
    title: "Material Memory Workshop",
    subtitle: "전시를 보고 끝내지 않고 표면, 재질, 메모를 작은 기록물로 남기는 제작형 워크숍",
    format: "workshop",
    status: "limited",
    date: "2026.06.27",
    time: "14:00 - 16:00",
    venue: "Green Cube Studio",
    district: "연남",
    host: "Artist Liaison Bora Lim",
    capacity: "14 seats",
    entry: "예약 필수 / 재료비 포함 28,000 KRW",
    summary:
      "바이오 아트와 생태미술 전시를 보고 난 뒤 남는 질감의 기억을 종이와 투명 필름 위에 기록하는 워크숍입니다.",
    description:
      "오가닉 매트릭스의 재질감과 광원 변화를 관찰한 뒤, 참가자 각자가 기억에 남는 표면을 짧은 아카이브 카드로 만듭니다. 결과물보다 관찰 언어를 만드는 데 집중합니다.",
    chapter: "Material Desk",
    tags: ["워크숍", "재질 기록", "생태미술"],
    relatedExhibitionId: "nature-bio-art",
    agenda: [
      {
        label: "Surface Capture",
        detail: "전시에서 기억에 남는 재질과 빛의 패턴을 짧은 문장으로 먼저 채집합니다.",
      },
      {
        label: "Paper Translation",
        detail: "투명 필름, 트레이싱지, 금속 펜을 활용해 감각을 작은 기록 카드로 옮깁니다.",
      },
      {
        label: "Archive Share",
        detail: "완성된 카드를 벽면에 잠시 전시하고 서로의 언어를 비교합니다.",
      },
    ],
    takeaways: [
      "전시 감상을 기록 가능한 언어와 형태로 변환하는 감각을 익힙니다.",
      "블로그 노트나 커뮤니티 메모로 이어질 개인 아카이브의 출발점을 만들 수 있습니다.",
      "재질 중심 전시를 해석하는 기본 프레임을 직접 체험합니다.",
    ],
    notes: [
      "도구와 재료는 현장에서 제공됩니다.",
      "완성물은 개인 소장 가능합니다.",
      "초등 고학년 이상부터 참여 가능합니다.",
    ],
  },
];

export function getEventStatusLabel(status: EventStatus) {
  switch (status) {
    case "upcoming":
      return "Upcoming";
    case "limited":
      return "Limited";
    case "sold-out":
      return "Sold Out";
    default:
      return "Program";
  }
}

export function getEventFormatLabel(format: EventFormat) {
  switch (format) {
    case "salon":
      return "Salon";
    case "conversation":
      return "Conversation";
    case "walkthrough":
      return "Walkthrough";
    case "screening":
      return "Listening Session";
    case "workshop":
      return "Workshop";
    default:
      return "Program";
  }
}

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}
