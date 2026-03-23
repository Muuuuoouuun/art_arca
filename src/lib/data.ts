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
  image?: string;       // thumbnail path (3:4)
  heroImage?: string;   // hero/detail page image (16:7)
}

export const exhibitions: Exhibition[] = [
  /* ─── 현재 진행 전시 ─── */
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
    longDescription:
      "이지수 작가의 이번 개인전은 한국 전통 여백의 미학과 현대 미니멀리즘이 조우하는 지점을 탐구합니다. 캔버스 위의 침묵 — 그리지 않은 공간들이 오히려 더 강렬하게 말을 건넵니다. 관람객은 각자의 내면에서 그 여백을 채워나가는 경험을 하게 됩니다.\n\n작가는 10년간의 유럽 거주 경험을 통해 동서양 회화의 경계를 지워왔습니다. 이번 전시는 그 여정의 정점으로, 순수한 형태와 색채의 언어로만 소통하는 30여 점의 신작을 선보입니다.",
    tags: ["미니멀리즘", "추상회화", "한국현대미술"],
    featured: true,
    image: "/images/exhibitions/silence-and-form-thumb.jpg",
    heroImage: "/images/exhibitions/silence-and-form-hero.jpg",
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
    longDescription:
      "박민준 작가의 사진 시리즈 '도시의 파편들'은 5년에 걸쳐 서울, 도쿄, 베를린, 뉴욕의 골목과 틈새를 기록한 대규모 아카이브 프로젝트입니다. 우리가 무심코 지나치는 도시의 비가시적 영역들 — 벽의 균열, 빛의 각도, 시간의 흔적 — 이 하나의 완결된 미학적 언어로 재구성됩니다.\n\n흑백과 컬러를 교차하는 연출은 현재와 과거, 익명성과 특수성 사이의 긴장감을 시각화합니다.",
    tags: ["다큐멘터리 사진", "도시사진", "아카이브"],
    featured: true,
    image: "/images/exhibitions/urban-fragments-thumb.jpg",
    heroImage: "/images/exhibitions/urban-fragments-hero.jpg",
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
    longDescription:
      "최연지 작가는 버려진 산업 소재들 — 녹슨 금속, 마모된 콘크리트, 낡은 직물 — 을 수집해 새로운 조각적 언어를 구성합니다. 각 오브제들은 자신만의 역사와 기억을 품고 있으며, 작가의 손을 거쳐 그 기억이 가시화됩니다.\n\n이번 전시는 15개의 대형 설치 조각으로 구성되며, 관람객은 물질의 시간성과 물리적 소멸이라는 주제를 몸으로 경험하게 됩니다.",
    tags: ["설치미술", "재료미학", "환경미술"],
    featured: false,
    image: "/images/exhibitions/material-memory-thumb.jpg",
    heroImage: "/images/exhibitions/material-memory-hero.jpg",
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
    longDescription:
      "김도현 작가의 신작 비디오 설치 'Threshold'는 세 채널 영상과 입체 사운드로 구성된 몰입형 작품입니다. 한국 사회의 경계들 — 세대, 젠더, 계층 — 이 어떻게 개인의 정체성을 구성하고 제한하는지를 탐구합니다.\n\n각 채널은 서로 다른 '경계'의 순간들을 포착하며, 관람객이 작품 안을 걸으면서 세 영상이 만들어내는 중첩된 서사를 경험하게 됩니다. 상영 시간 45분.",
    tags: ["비디오아트", "미디어설치", "정체성"],
    featured: false,
    image: "/images/exhibitions/threshold-thumb.jpg",
    heroImage: "/images/exhibitions/threshold-hero.jpg",
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
    longDescription:
      "Art Arca의 봄 시즌 대표 단체전으로, 서로 다른 매체와 세대의 8인 작가가 '봄'이라는 테마를 각자의 시각으로 해석합니다. 공통의 주제 아래 이토록 다양한 목소리들이 어우러질 수 있다는 것, 그 자체가 이 전시의 핵심 메시지입니다.\n\n참여 작가: 이지수, 박민준, 최연지, 김도현, 오세진, 황예린, 강태호, 서미래",
    tags: ["단체전", "현대미술", "봄"],
    featured: true,
    image: "/images/exhibitions/spring-dialogue-thumb.jpg",
    heroImage: "/images/exhibitions/spring-dialogue-hero.jpg",
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
    longDescription:
      "오세진은 건축, 사운드, 퍼포먼스의 경계를 넘나드는 작가입니다. 이번 설치작 'Echo Chamber'는 관람객의 목소리와 발걸음이 실시간으로 변형되어 공간을 채우는 인터랙티브 사운드 환경입니다.\n\n전시 공간 자체가 하나의 악기가 되어, 모든 방문자들이 집단적으로 음악을 만들어갑니다. 혼자 방문해도, 여럿이 방문해도 매번 다른 경험을 선사합니다.",
    tags: ["사운드아트", "인터랙티브", "설치미술"],
    featured: false,
    image: "/images/exhibitions/echo-chamber-thumb.jpg",
    heroImage: "/images/exhibitions/echo-chamber-hero.jpg",
  },

  /* ─── 예정 전시 — 음악 & 시대별 아이코닉 장르 ─── */
  {
    id: "jazz-visions",
    title: "Jazz Visions",
    titleKo: "재즈의 시각",
    artist: "Thomas Mills & 박지훈 Ji-Hoon Park",
    category: "음악 / Music Art",
    date: "2026.04",
    period: "2026.04.20 — 2026.06.20",
    location: "Gallery F, 서울",
    description: "재즈 황금시대의 리듬이 회화로 피어오르다",
    longDescription:
      "1920년대 뉴올리언스에서 시작된 재즈는 단순한 음악을 넘어 20세기 예술 전반의 패러다임을 바꿨습니다. Thomas Mills와 박지훈 두 작가는 각각 미국과 한국의 시각으로 재즈가 품은 즉흥성, 자유, 도시적 에너지를 캔버스에 옮겼습니다.\n\n색채와 붓터치가 리듬과 임프로비제이션을 직접 모방하는 독특한 연작 40점을 선보입니다. 트럼펫 소리가 물감처럼 흐르고, 피아노 선율이 선으로 그려지는 이 전시는 눈으로 듣는 재즈의 경험입니다.",
    tags: ["재즈", "음악미술", "20세기미국", "즉흥성"],
    featured: true,
    image: "/images/exhibitions/jazz-visions-thumb.jpg",
    heroImage: "/images/exhibitions/jazz-visions-hero.jpg",
  },
  {
    id: "renaissance-echoes",
    title: "Renaissance Echoes",
    titleKo: "르네상스의 메아리",
    artist: "갤러리 특별전 Special Collection",
    category: "회화 / Classical Painting",
    date: "2026.04",
    period: "2026.04.15 — 2026.06.15",
    location: "Gallery E, 서울",
    description: "인류 예술의 정점, 르네상스 거장들과의 대화",
    longDescription:
      "15~16세기 이탈리아를 중심으로 꽃핀 르네상스는 인간과 자연에 대한 경이로운 탐구를 통해 미술사에 영원한 획을 그었습니다. 레오나르도 다빈치, 미켈란젤로, 라파엘로가 구현한 원근법과 인체 묘사의 정수를 고해상도 재현 작품과 현대 해석으로 살펴봅니다.\n\n이번 특별전은 원작 연구 자료, 스케치 복원, 현대 작가들의 르네상스 재해석 작품을 함께 선보이며, 600년을 넘어 오늘에 울려 퍼지는 예술적 메아리를 탐구합니다.",
    tags: ["르네상스", "고전회화", "이탈리아미술", "유럽미술"],
    featured: false,
    image: "/images/exhibitions/renaissance-echoes-thumb.jpg",
    heroImage: "/images/exhibitions/renaissance-echoes-hero.jpg",
  },
  {
    id: "minhwa-now",
    title: "Minhwa Now",
    titleKo: "민화, 지금",
    artist: "김채원 Chae-Won Kim",
    category: "회화 / Folk Painting",
    date: "2026.05",
    period: "2026.05.01 — 2026.07.01",
    location: "Gallery G, 서울",
    description: "조선의 빛깔이 현재와 만나는 순간",
    longDescription:
      "민화는 조선 시대 서민들의 삶 속에서 자유롭게 피어난 생명력 넘치는 그림입니다. 호랑이, 모란, 책가도, 십장생 — 각각의 도상이 담은 염원과 철학은 수백 년을 지나 오늘날에도 여전히 유효합니다.\n\n김채원 작가는 전통 안료와 한지를 고집하면서도 현대적 구도와 주제를 접목, 민화의 문법으로 21세기를 이야기합니다. 총 45점의 신작은 전통과 현대, 과거와 현재의 경계가 아름답게 허물어지는 현장을 만들어냅니다.",
    tags: ["민화", "한국전통미술", "현대적해석", "조선회화"],
    featured: false,
    image: "/images/exhibitions/minhwa-now-thumb.jpg",
    heroImage: "/images/exhibitions/minhwa-now-hero.jpg",
  },
  {
    id: "impressionist-moments",
    title: "Impressionist Moments",
    titleKo: "인상의 순간들",
    artist: "이서현 Seo-Hyun Lee",
    category: "회화 / Impressionism",
    date: "2026.05",
    period: "2026.05.10 — 2026.07.10",
    location: "Gallery H, 서울",
    description: "빛과 색채로 포착한 찰나의 감동",
    longDescription:
      "19세기 후반 파리, 모네와 르누아르가 관습을 깨고 자연의 빛을 캔버스에 담았을 때 미술의 역사가 바뀌었습니다. 이서현 작가는 인상주의의 정수 — 순간의 빛, 흐릿한 경계, 감각적 색채 — 를 한국의 사계절 풍경에 녹여냅니다.\n\n서울 북한산의 안개, 제주 바다의 반짝임, 전라도 들판의 햇살이 두꺼운 물감층 위에서 살아 숨쉽니다. 총 35점의 대형 유화를 통해 관람객은 순간 속에 영원을 담는 인상주의적 시선을 경험하게 됩니다.",
    tags: ["인상주의", "빛과색채", "야외회화", "한국풍경"],
    featured: false,
    image: "/images/exhibitions/impressionist-moments-thumb.jpg",
    heroImage: "/images/exhibitions/impressionist-moments-hero.jpg",
  },
  {
    id: "baroque-shadows",
    title: "Baroque Shadows",
    titleKo: "바로크의 그림자",
    artist: "갤러리 큐레이션 Gallery Curated",
    category: "회화 / Baroque Art",
    date: "2026.06",
    period: "2026.06.01 — 2026.07.31",
    location: "Main Hall, 서울",
    description: "빛과 어둠의 극적 대비가 빚어낸 인간의 초상",
    longDescription:
      "17세기 바로크 미술은 카라바조의 혁명적인 키아로스쿠로(명암법)로 시작해 렘브란트의 내면 탐구, 루벤스의 역동적 육체성으로 전개됩니다. 빛과 어둠의 극적 대비는 단순한 기법을 넘어 인간 존재의 드라마를 표현하는 철학이 되었습니다.\n\n이번 전시는 바로크 원작 연구 자료와 현대 작가들이 재해석한 신작을 함께 구성합니다. 깊은 어둠 속에서 빛나는 얼굴들, 그 안에 담긴 감정의 진폭을 직접 마주하는 경험을 제공합니다.",
    tags: ["바로크", "명암법", "고전미술", "유럽회화"],
    featured: false,
    image: "/images/exhibitions/baroque-shadows-thumb.jpg",
    heroImage: "/images/exhibitions/baroque-shadows-hero.jpg",
  },
  {
    id: "electronic-fields",
    title: "Electronic Fields",
    titleKo: "전자적 풍경",
    artist: "Haruki Nakamura & 정수빈 Su-Bin Jung",
    category: "음악 / Electronic Music Art",
    date: "2026.06",
    period: "2026.06.15 — 2026.08.15",
    location: "Sound Room, 서울",
    description: "전자음악과 디지털 비주얼이 만들어내는 새로운 감각 지평",
    longDescription:
      "1970년대 크라프트베르크에서 시작된 전자음악은 아날로그와 디지털의 경계를 지우며 인간의 감각을 확장해 왔습니다. Haruki Nakamura(일본)와 정수빈(한국)은 각자의 전자음악 어휘로 서로의 비주얼 언어에 응답하는 공동 작업을 선보입니다.\n\n실시간 신시사이저 연주에 반응하는 생성 비주얼, 관람객의 움직임을 사운드로 변환하는 인터랙티브 설치, 그리고 두 작가의 콜라보레이션 영상 작품이 한데 어우러지는 이 전시는 전자음악의 현재를 집약합니다.",
    tags: ["전자음악", "디지털아트", "사운드비주얼", "인터랙티브"],
    featured: false,
    image: "/images/exhibitions/electronic-fields-thumb.jpg",
    heroImage: "/images/exhibitions/electronic-fields-hero.jpg",
  },
  {
    id: "abstract-expressions",
    title: "Abstract Expressions",
    titleKo: "추상의 표현",
    artist: "양정훈 Jung-Hoon Yang",
    category: "회화 / Abstract Art",
    date: "2026.06",
    period: "2026.06.01 — 2026.07.31",
    location: "Gallery I, 서울",
    description: "의식의 흐름을 캔버스 위에 쏟아붓다",
    longDescription:
      "1950년대 뉴욕을 뒤흔든 추상표현주의 — 폴록의 드리핑, 클라인의 거대한 검정 획, 로스코의 색면들 — 은 이성보다 감정, 계획보다 즉흥을 믿었습니다. 양정훈 작가는 이 사조의 정신적 후계자로서, 한국적 정서와 몸의 언어를 더한 자신만의 추상 회화 세계를 구축해 왔습니다.\n\n대형 캔버스에 거침없이 쏟아지는 붓질들이 만들어내는 이 작품들은, 보는 순간마다 다른 감정을 촉발합니다. 25점의 신작으로 구성된 이번 개인전은 작가의 10년 탐구의 정점을 보여줍니다.",
    tags: ["추상표현주의", "뉴욕파", "액션페인팅", "한국현대미술"],
    featured: false,
    image: "/images/exhibitions/abstract-expressions-thumb.jpg",
    heroImage: "/images/exhibitions/abstract-expressions-hero.jpg",
  },
  {
    id: "korean-classical-music",
    title: "Gugak Horizons",
    titleKo: "국악의 지평",
    artist: "전통음악연구소 Traditional Music Institute",
    category: "음악 / Korean Music",
    date: "2026.07",
    period: "2026.07.01 — 2026.08.31",
    location: "Main Hall, 서울",
    description: "천 년의 소리가 오늘과 만나는 교차점",
    longDescription:
      "가야금의 가녀린 떨림, 해금의 구슬픈 선율, 장구의 힘찬 리듬 — 한국 전통 음악은 수천 년의 역사를 담고 오늘날까지 숨쉬고 있습니다. 이번 전시는 국악기의 아름다움을 시각 예술로 해석한 사진, 조각, 회화 작품들과 함께 전통 음악의 역사 아카이브를 선보입니다.\n\n조선 왕조의 궁중음악부터 현대 퓨전 국악까지 망라하는 이 전시는 소리를 눈으로, 시각을 귀로 경험하는 공감각적 여정입니다. 주말마다 진행되는 국악 라이브 퍼포먼스도 함께 기획되어 있습니다.",
    tags: ["국악", "한국전통음악", "가야금", "현대적해석"],
    featured: true,
    image: "/images/exhibitions/korean-classical-music-thumb.jpg",
    heroImage: "/images/exhibitions/korean-classical-music-hero.jpg",
  },
];

export function getExhibition(id: string): Exhibition | undefined {
  return exhibitions.find((ex) => ex.id === id);
}

export function getFeaturedExhibitions(): Exhibition[] {
  return exhibitions.filter((ex) => ex.featured);
}
