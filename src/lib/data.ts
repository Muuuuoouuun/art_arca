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
  iconicObject?: {
    name: string;
    description: string;
    image: string;
  };
}

export const exhibitions: Exhibition[] = [
  {
    id: "afrofuturism-disco",
    title: "Celestial Groove",
    titleKo: "셀레스티얼 그루브: 아프로퓨처리즘과 디스코의 우주",
    artist: "자야 지부 Jaya Jibu",
    category: "디지털 콜라주 / Digital Collage",
    date: "2026.04",
    period: "2026.04.01 — 2026.05.15",
    location: "Art Arca Center, 서울",
    description: "은하수 위에서 펼쳐지는 아프로 비트와 네온 디스코의 향연",
    longDescription: "70년대 디스코 문화의 화려한 미학과 아프리카 전통 문양, 그리고 광활한 우주적 상상력이 결합된 전시입니다. 황금빛 아프로 헤어와 크롬 재질의 의상을 입은 인물들이 초현실적인 성운 속에서 춤추는 비주얼은 인류의 기원과 미래적 해방을 동시에 노래합니다.",
    tags: ["아프로퓨처리즘", "디스코", "초현실주의"],
    featured: true,
    image: "/images/exhibitions/afrofuturism-disco-thumb.jpg",
    heroImage: "/images/exhibitions/afrofuturism-disco-hero.jpg",
    iconicObject: {
      name: "Chrome Afrofuturist Mask",
      description: "A liquid metal mask reflecting cosmic nebulae.",
      image: "/images/objects/chrome-mask.webp"
    }
  },
  {
    id: "ukiyo-e-grunge",
    title: "Floating Punk",
    titleKo: "플로팅 펑크: 우키요에와 그란지의 파열음",
    artist: "타카시 켄 Takashi Ken",
    category: "혼합매체 / Mixed Media",
    date: "2026.04",
    period: "2026.04.10 — 2026.05.30",
    location: "Neo Edo Gallery, 서울",
    description: "에도 시대의 섬세한 선 위로 쏟아지는 거친 노이즈",
    longDescription: "에도 시대의 목판화 '우키요에'의 정적인 아름다움이 90년대 시애틀 그란지 락의 거칠고 반항적인 에너지와 충돌합니다. 화려한 기모노를 입은 인물들이 기타 피드백 노이즈와 그래피티 스타일의 텍스처 속에서 해체되는 과정을 통해 전통의 파괴와 재탄생을 보여줍니다.",
    tags: ["우키요에", "그란지", "펑크락"],
    featured: true,
    image: "/images/exhibitions/ukiyo-e-grunge-thumb.jpg",
    heroImage: "/images/exhibitions/ukiyo-e-grunge-hero.jpg",
    iconicObject: {
      name: "Shattered Porcelain Electric Guitar",
      description: "A traditional ceramic-textured guitar with visible glitch artifacts.",
      image: "/images/objects/porcelain-guitar.webp"
    }
  },
  {
    id: "nature-bio-art",
    title: "Organic Matrix",
    titleKo: "오가닉 매트릭스: 자연과 바이오 아트의 공진",
    artist: "엘레나 숲 Elena Soop",
    category: "바이오 인스톨레이션 / Bio Art",
    date: "2026.05",
    period: "2026.05.01 — 2026.06.20",
    location: "Green Cube, 서울",
    description: "살아있는 세포가 그리는 미시 세계의 교향곡",
    longDescription: "식물의 광합성 데이터와 미생물의 군집 성장을 시각화한 바이오 아트 전시입니다. 실험실의 페트리 접시 속 생태계가 거대한 프로젝션 맵핑을 통해 갤러리 전체로 확장되며, 관람객은 인간과 비인간 생명체가 상호작용하는 유기적 매트릭스의 일부가 됩니다.",
    tags: ["바이오아트", "생태미술", "뉴미디어"],
    featured: true,
    image: "/images/exhibitions/nature-bio-art-thumb.jpg",
    heroImage: "/images/exhibitions/nature-bio-art-hero.jpg",
    iconicObject: {
      name: "Bioluminescent Glass Cello",
      description: "A translucent cello filled with pulsing neon microorganisms.",
      image: "/images/objects/bio-cello.webp"
    }
  },
  {
    id: "architecture-hiphop",
    title: "Concrete Flow",
    titleKo: "콘크리트 플로우: 건축적 구조와 힙합의 비트",
    artist: "마커스 브릭 Marcus Brick",
    category: "조각 및 설치 / Sculpture",
    date: "2026.05",
    period: "2026.05.15 — 2026.07.10",
    location: "Urban Void, 서울",
    description: "브루탈리즘 건축의 육중함에 실린 붐뱁의 리듬",
    longDescription: "콘크리트와 철강으로 이루어진 브루탈리즘 건축의 차갑고 육중한 미학을 힙합 음악의 리드미컬한 샘플링 기법으로 재해석했습니다. 거친 질감의 기하학적 구조물들이 마치 샘플러 위에서 쪼개진 비트처럼 공간을 장악하며 도시의 고동 소리를 형상화합니다.",
    tags: ["브루탈리즘", "힙합", "도시건축"],
    featured: true,
    image: "/images/exhibitions/architecture-hiphop-thumb.jpg",
    heroImage: "/images/exhibitions/architecture-hiphop-hero.jpg",
    iconicObject: {
      name: "Brutalist Concrete Boombox",
      description: "A heavy, raw concrete boombox with brass accents.",
      image: "/images/objects/concrete-boombox.webp"
    }
  },
  {
    id: "cyberpunk-hanbok",
    title: "Neon Thread",
    titleKo: "네온 스레드: 사이버펑크와 한복의 만남",
    artist: "한지혜 Ji-Hye Han",
    category: "패션 아트 / Fashion Art",
    date: "2026.06",
    period: "2026.06.01 — 2026.07.15",
    location: "Digital Pavilion, 서울",
    description: "전통 한복의 곡선과 광섬유가 빚어내는 미래적 아우라",
    longDescription: "한복의 우아한 실루엣에 광섬유와 LED, 테크니컬 웨어의 소재를 결합하여 21세기형 '테크-한복'을 제시합니다. 비 오는 밤의 네온 거리를 배경으로, 전통과 최첨단 기술이 실타래처럼 얽혀 새로운 한국적 사이버펑크 비주얼을 완성합니다.",
    tags: ["사이버펑크", "한복", "테크웨어"],
    featured: true,
    image: "/images/exhibitions/cyberpunk-hanbok-thumb.jpg",
    heroImage: "/images/exhibitions/cyberpunk-hanbok-hero.jpg",
    iconicObject: {
      name: "Fiber-Optic Jade Norigae",
      description: "A traditional jade pendant glowing with inner data streams.",
      image: "/images/objects/neon-norigae.webp"
    }
  },
  {
    id: "surreal-ambient",
    title: "Dream Frequency",
    titleKo: "드림 프리퀀시: 초현실주의와 앰비언트의 심해",
    artist: "소피아 문 Sophia Moon",
    category: "몰입형 미디어 / Immersive Media",
    date: "2026.06",
    period: "2026.06.10 — 2026.08.05",
    location: "Deep Space Gallery, 서울",
    description: "시간이 멈춘 바닷속에서 들려오는 몽환적인 소리의 풍경",
    longDescription: "살바도르 달리의 초현실적 상상력과 브라이언 이노의 앰비언트 음악이 결합된 몰입형 전시입니다. 관람객은 구름이 떠다니는 깊은 바닷속을 유영하며, 감각의 전이를 통해 꿈과 현실이 모호해지는 무의식의 주파수를 체험하게 됩니다.",
    tags: ["초현실주의", "앰비언트", "사운드스케이프"],
    featured: true,
    image: "/images/exhibitions/surreal-ambient-thumb.jpg",
    heroImage: "/images/exhibitions/surreal-ambient-hero.jpg",
    iconicObject: {
      name: "Floating Melting Vinyl",
      description: "A distorted vinyl record warping like a liquid clock.",
      image: "/images/objects/melting-vinyl.webp"
    }
  },
  {
    id: "vaporwave-renaissance",
    title: "Statue Wave",
    titleKo: "스테츄 웨이브: 베이퍼웨이브와 르네상스 조각",
    artist: "베이퍼 97 Vapor 97",
    category: "디지털 렌더링 / 3D Art",
    date: "2026.07",
    period: "2026.07.01 — 2026.08.20",
    location: "Glitch Gallery, 서울",
    description: "파스텔톤 노을 아래 핑크색 액체로 변하는 다비드상",
    longDescription: "르네상스의 상징적인 조각상들이 베이퍼웨이브 특유의 파스텔톤 색조와 90년대 초기 인터넷 그래픽 속으로 소환됩니다. 고전적 완벽함이 로우파이(Lo-fi)한 노이즈와 디지털 오류 속에서 녹아내리는 모습은 풍요로웠던 과거에 대한 향수와 디지털적 허무를 동시에 드러냅니다.",
    tags: ["베이퍼웨이브", "르네상스", "인터넷미학"],
    featured: true,
    image: "/images/exhibitions/vaporwave-renaissance-thumb.jpg",
    heroImage: "/images/exhibitions/vaporwave-renaissance-hero.jpg",
    iconicObject: {
      name: "Abstract Marble David Head",
      description: "A marble bust with neon wireframe glitches and golden cracks.",
      image: "/images/objects/marble-david.webp"
    }
  },
  {
    id: "techno-minimalism",
    title: "Binary Pulse",
    titleKo: "바이너리 펄스: 테크노와 미니멀리즘의 격자",
    artist: "칼 드레이퍼 Karl Draper",
    category: "라이트 아트 / Light Art",
    date: "2026.07",
    period: "2026.07.15 — 2026.09.10",
    location: "The Grid, 서울",
    description: "완벽한 어둠 속에서 고동치는 차가운 레이저 비트",
    longDescription: "도널드 저드의 미니멀리즘 조각과 베를린 테크노의 정교한 리듬이 만났습니다. 0과 1, 켜짐과 꺼짐의 이진법적 논리를 따르는 정밀한 레이저 선들이 거대한 공간을 가로지르며, 관람객은 소리와 빛이 하나로 수렴되는 순수 추상의 정점을 경험합니다.",
    tags: ["미니멀리즘", "테크노", "라이트아트"],
    featured: true,
    image: "/images/exhibitions/techno-minimalism-thumb.jpg",
    heroImage: "/images/exhibitions/techno-minimalism-hero.jpg",
    iconicObject: {
      name: "Monolithic Slate Turntable",
      description: "A razor-sharp obsidian record player with a laser stylus.",
      image: "/images/objects/slate-turntable.webp"
    }
  },
  {
    id: "opera-streetart",
    title: "Grand Vandalism",
    titleKo: "그랜드 반달리즘: 오페라와 거리 미술의 소음",
    artist: "뱅크시 시스터즈 Banksy Sisters",
    category: "그래피티 및 설치 / Graffiti",
    date: "2026.08",
    period: "2026.08.01 — 2026.09.25",
    location: "Opera House Yard, 서울",
    description: "금박 장식된 오페라 무대 위에 뿌려지는 스프레이의 전율",
    longDescription: "고결하고 우아한 오페라의 아리아가 거친 스트리트 아트와 결합합니다. 벨벳 커튼과 샹들리에가 있는 고전적 무대 위에 화려한 그래피티가 덧칠해지며, 고급 예술의 권위에 도전하는 거리의 에너지를 폭발적으로 보여주는 전시입니다.",
    tags: ["오페라", "거리미술", "그래피티"],
    featured: true,
    image: "/images/exhibitions/opera-streetart-thumb.jpg",
    heroImage: "/images/exhibitions/opera-streetart-hero.jpg",
    iconicObject: {
      name: "Gilded Spray-Painted Harp",
      description: "A classical harp dripping with vibrant, neon street-art spray paint.",
      image: "/images/objects/neon-harp.webp"
    }
  },
  {
    id: "folk-indie-popart",
    title: "Wildflower Pop",
    titleKo: "와일드플라워 팝: 민속 신앙과 인디 팝의 변주",
    artist: "장미 Rose Jang",
    category: "회화 / Painting",
    date: "2026.08",
    period: "2026.08.15 — 2026.10.15",
    location: "Flower Garden, 서울",
    description: "토속적인 무속 신앙의 색채와 인디 팝의 발랄한 감수성",
    longDescription: "한국 전통 민화와 무속 신앙에서 쓰이는 강렬한 원색들을 현대적인 인디 팝 감성의 일러스트레이션으로 풀어냈습니다. 굿판의 역동적인 춤사위가 팝아트적인 평면성과 만나, 낯설지만 친숙한 현대판 '코리안 샤머니즘 팝'을 선보입니다.",
    tags: ["민화", "인디팝", "팝아트"],
    featured: true,
    image: "/images/exhibitions/folk-indie-popart-thumb.jpg",
    heroImage: "/images/exhibitions/folk-indie-popart-hero.jpg",
    iconicObject: {
      name: "Holographic Mudang Fan",
      description: "A traditional shamanic fan shimmering with iridescent pop-art colors.",
      image: "/images/objects/holographic-fan.webp"
    }
  }
];

export function getFeaturedExhibitions(): Exhibition[] {
  return exhibitions.filter((ex) => ex.featured);
}

export function getExhibition(id: string): Exhibition | undefined {
  return exhibitions.find((ex) => ex.id === id);
}
