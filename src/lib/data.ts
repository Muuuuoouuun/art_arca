export interface Exhibition {
  id: string;
  title: string;
  titleKo: string;
  artist: string;
  category: string;
  date: string;
  period: string;
  location: string;
  description: string;
  longDescription: string;
  tags: string[];
  featured: boolean;
}

export const exhibitions: Exhibition[] = [
  {
    id: "silence-and-form",
    title: "Silence and Form",
    titleKo: "침묵과 형태",
    artist: "이지수 Ji-Su Lee",
    category: "회화 / Painting",
    date: "2026.03",
    period: "2026.03.01 — 2026.04.30",
    location: "Gallery A, 서울",
    description: "공간과 여백이 만들어내는 새로운 언어",
    longDescription: "이지수 작가의 이번 개인전은 한국 전통 여백의 미학과 현대 미니멀리즘이 조우하는 지점을 탐구합니다. 캔버스 위의 침묵 — 그리지 않은 공간들이 오히려 더 강렬하게 말을 건넵니다. 관람객은 각자의 내면에서 그 여백을 채워나가는 경험을 하게 됩니다.\n\n작가는 10년간의 유럽 거주 경험을 통해 동서양 회화의 경계를 지워왔습니다. 이번 전시는 그 여정의 정점으로, 순수한 형태와 색채의 언어로만 소통하는 30여 점의 신작을 선보입니다.",
    tags: ["미니멀리즘", "추상회화", "한국현대미술"],
    featured: true,
  },
  {
    id: "urban-fragments",
    title: "Urban Fragments",
    titleKo: "도시의 파편들",
    artist: "박민준 Min-Jun Park",
    category: "사진 / Photography",
    date: "2026.03",
    period: "2026.03.15 — 2026.05.15",
    location: "Gallery B, 서울",
    description: "도시의 틈새에서 발견한 익명의 아름다움",
    longDescription: "박민준 작가의 사진 시리즈 '도시의 파편들'은 5년에 걸쳐 서울, 도쿄, 베를린, 뉴욕의 골목과 틈새를 기록한 대규모 아카이브 프로젝트입니다. 우리가 무심코 지나치는 도시의 비가시적 영역들 — 벽의 균열, 빛의 각도, 시간의 흔적 — 이 하나의 완결된 미학적 언어로 재구성됩니다.\n\n흑백과 컬러를 교차하는 연출은 현재와 과거, 익명성과 특수성 사이의 긴장감을 시각화합니다.",
    tags: ["다큐멘터리 사진", "도시사진", "아카이브"],
    featured: true,
  },
  {
    id: "material-memory",
    title: "Material Memory",
    titleKo: "물질의 기억",
    artist: "최연지 Yeon-Ji Choi",
    category: "조각 / Sculpture",
    date: "2026.04",
    period: "2026.04.01 — 2026.05.31",
    location: "Gallery C, 서울",
    description: "소멸하는 물질 안에 새겨진 시간의 층위",
    longDescription: "최연지 작가는 버려진 산업 소재들 — 녹슨 금속, 마모된 콘크리트, 낡은 직물 — 을 수집해 새로운 조각적 언어를 구성합니다. 각 오브제들은 자신만의 역사와 기억을 품고 있으며, 작가의 손을 거쳐 그 기억이 가시화됩니다.\n\n이번 전시는 15개의 대형 설치 조각으로 구성되며, 관람객은 물질의 시간성과 물리적 소멸이라는 주제를 몸으로 경험하게 됩니다.",
    tags: ["설치미술", "재료미학", "환경미술"],
    featured: false,
  },
  {
    id: "threshold",
    title: "Threshold",
    titleKo: "경계",
    artist: "김도현 Do-Hyun Kim",
    category: "영상 / Video Art",
    date: "2026.04",
    period: "2026.04.10 — 2026.06.10",
    location: "Gallery D, 서울",
    description: "존재의 경계에서 바라본 자아와 타자",
    longDescription: "김도현 작가의 신작 비디오 설치 'Threshold'는 세 채널 영상과 입체 사운드로 구성된 몰입형 작품입니다. 한국 사회의 경계들 — 세대, 젠더, 계층 — 이 어떻게 개인의 정체성을 구성하고 제한하는지를 탐구합니다.\n\n각 채널은 서로 다른 '경계'의 순간들을 포착하며, 관람객이 작품 안을 걸으면서 세 영상이 만들어내는 중첩된 서사를 경험하게 됩니다. 상영 시간 45분.",
    tags: ["비디오아트", "미디어설치", "정체성"],
    featured: false,
  },
  {
    id: "spring-dialogue",
    title: "Spring Dialogue",
    titleKo: "봄의 대화",
    artist: "단체전 Group Exhibition",
    category: "단체전 / Group Show",
    date: "2026.05",
    period: "2026.05.01 — 2026.06.30",
    location: "Main Hall, 서울",
    description: "8인 작가의 봄을 둘러싼 다층적 대화",
    longDescription: "Art Arca의 봄 시즌 대표 단체전으로, 서로 다른 매체와 세대의 8인 작가가 '봄'이라는 테마를 각자의 시각으로 해석합니다. 공통의 주제 아래 이토록 다양한 목소리들이 어우러질 수 있다는 것, 그 자체가 이 전시의 핵심 메시지입니다.\n\n참여 작가: 이지수, 박민준, 최연지, 김도현, 오세진, 황예린, 강태호, 서미래",
    tags: ["단체전", "현대미술", "봄"],
    featured: true,
  },
  {
    id: "echo-chamber",
    title: "Echo Chamber",
    titleKo: "에코 챔버",
    artist: "오세진 Se-Jin Oh",
    category: "사운드아트 / Sound Art",
    date: "2026.05",
    period: "2026.05.15 — 2026.07.15",
    location: "Sound Room, 서울",
    description: "청각적 공간이 만들어내는 새로운 존재의 영역",
    longDescription: "오세진은 건축, 사운드, 퍼포먼스의 경계를 넘나드는 작가입니다. 이번 설치작 'Echo Chamber'는 관람객의 목소리와 발걸음이 실시간으로 변형되어 공간을 채우는 인터랙티브 사운드 환경입니다.\n\n전시 공간 자체가 하나의 악기가 되어, 모든 방문자들이 집단적으로 음악을 만들어갑니다. 혼자 방문해도, 여럿이 방문해도 매번 다른 경험을 선사합니다.",
    tags: ["사운드아트", "인터랙티브", "설치미술"],
    featured: false,
  },
];

export function getExhibition(id: string): Exhibition | undefined {
  return exhibitions.find((ex) => ex.id === id);
}

export function getFeaturedExhibitions(): Exhibition[] {
  return exhibitions.filter((ex) => ex.featured);
}
