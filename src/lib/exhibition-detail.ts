import { Exhibition } from "./data";
import { ExhibitionStatus, STATUS_LABEL } from "./utils";

export interface ExhibitionDetailMock {
  community: {
    headline: string;
    intro: string;
    baseStats: {
      signals: number;
      saveRate: number;
      revisitIntent: number;
      salonCapacity: number;
    };
    salons: Array<{
      title: string;
      host: string;
      schedule: string;
      note: string;
    }>;
    prompts: Array<{
      label: string;
      response: string;
    }>;
    etiquette: string[];
  };
  information: {
    headline: string;
    summary: string;
    essentials: Array<{
      label: string;
      value: string;
      detail: string;
    }>;
    checkpoints: Array<{
      step: string;
      title: string;
      detail: string;
    }>;
    amenities: Array<{
      title: string;
      detail: string;
    }>;
    visitorNotes: string[];
  };
  insights: {
    headline: string;
    summary: string;
    bars: Array<{
      label: string;
      value: number;
      detail: string;
    }>;
    lenses: Array<{
      title: string;
      detail: string;
    }>;
    pairings: Array<{
      title: string;
      detail: string;
    }>;
    takeaways: string[];
  };
}

const arrivalWindows = [
  "오픈 직후 45분",
  "평일 14:00 이전",
  "해 질 무렵 조도가 바뀌는 시간",
  "주말 첫 회차",
  "마감 90분 전",
];

const pacingLabels = [
  "빠르게 훑기보다 2회 순환 관람이 잘 맞습니다.",
  "중앙 오브젝트와 벽면 디테일을 번갈아 보는 동선이 좋습니다.",
  "첫 인상보다 체류 후반부에 의미가 열리는 타입입니다.",
  "원거리 실루엣과 근거리 텍스처 차이가 큰 전시입니다.",
  "초반 10분은 분위기 적응에 쓰는 편이 만족도가 높습니다.",
];

const salonHosts = [
  "Lead Curator",
  "Visual Researcher",
  "Archive Moderator",
  "Artist Liaison",
  "Field Editor",
];

const audienceCues = [
  "혼자 조용히 해석하고 싶은 관람자",
  "같이 보며 계속 이야기하고 싶은 친구 페어",
  "비주얼 레퍼런스를 수집하는 디자이너",
  "전시 뒤 긴 산책이 필요한 감각형 관람자",
  "서사보다 분위기에서 먼저 감응하는 타입",
];

const amenityTemplates = [
  {
    title: "현장 메모 포인트",
    detail:
      "입구와 메인 존 사이 전환 구간에서 시선이 가장 크게 흔들립니다. 첫 감상을 짧게 메모해 두면 후반 비교가 쉬워집니다.",
  },
  {
    title: "사진 촬영 밀도",
    detail:
      "오브젝트 전면보다 사선 30도 구도에서 재질 대비가 더 잘 살아납니다. 플래시는 제외하고 주변 동선을 막지 않는 선에서 촬영하는 구성이 좋습니다.",
  },
  {
    title: "추천 동행 조합",
    detail:
      "같은 이미지를 다르게 읽는 사람과 함께 보면 훨씬 재밌습니다. 감상 후 10분 정도 대화 시간을 남겨 두는 편을 권장합니다.",
  },
  {
    title: "체류 후 행동",
    detail:
      "굿즈보다 메모와 저장을 먼저 남기면 재방문 의도가 높아집니다. 화면으로 다시 볼 때도 장면 간 연결이 잘 남습니다.",
  },
];

function hashString(value: string) {
  return value.split("").reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) >>> 0, 17);
}

function pick<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length];
}

function formatTagList(tags: string[]) {
  if (tags.length === 0) return "동시대 감각";
  if (tags.length === 1) return tags[0];
  if (tags.length === 2) return `${tags[0]}와 ${tags[1]}`;
  return `${tags[0]}, ${tags[1]}, ${tags[2]}`;
}

function estimateDuration(category: string) {
  if (category.includes("Immersive") || category.includes("Bio") || category.includes("Light")) return "55 - 75분";
  if (category.includes("Sculpture") || category.includes("Fashion") || category.includes("Graffiti")) return "45 - 60분";
  return "35 - 50분";
}

function getPhotoPolicy(category: string) {
  if (category.includes("Fashion") || category.includes("Graffiti")) return "플래시 제외 자유";
  if (category.includes("Immersive") || category.includes("Light")) return "광원 구간별 확인";
  return "주요 존에서 제한적 가능";
}

function getSoundCue(tags: string[]) {
  if (tags.some((tag) => tag.includes("앰비언트") || tag.includes("테크노") || tag.includes("디스코"))) return "사운드 반응형 리듬";
  if (tags.some((tag) => tag.includes("오페라") || tag.includes("힙합"))) return "장면 전환을 밀어주는 음악성";
  return "정숙하지만 밀도 높은 분위기";
}

function getEnergyNote(tags: string[]) {
  if (tags.some((tag) => tag.includes("초현실") || tag.includes("베이퍼웨이브"))) return "이미지적 여운이 길게 남는 타입";
  if (tags.some((tag) => tag.includes("한복") || tag.includes("민화"))) return "문화적 레퍼런스를 읽을수록 보상이 커지는 타입";
  if (tags.some((tag) => tag.includes("생태") || tag.includes("바이오"))) return "느리게 관찰할수록 감응이 커지는 타입";
  return "첫 장면의 임팩트와 후반 해석이 균형 잡힌 타입";
}

function buildCheckpoints(exhibition: Exhibition, seed: number) {
  return [
    {
      step: "01",
      title: "Threshold Scan",
      detail: `입구에서 ${exhibition.titleKo}의 전체 실루엣을 먼저 읽어 보세요. 멀리서 볼 때 주제의 긴장선이 가장 선명하게 잡힙니다.`,
    },
    {
      step: "02",
      title: "Primary Object",
      detail: exhibition.iconicObject
        ? `${exhibition.iconicObject.name} 주변에서 재질 대비를 확인해 보세요. 이 오브젝트가 전시의 정서 톤을 한 번에 압축합니다.`
        : `${exhibition.artist}의 대표 장면이 전시 해석의 기준점이 됩니다. 첫 15분 안에 기준 장면을 고르는 편이 좋습니다.`,
    },
    {
      step: "03",
      title: "Tag Crossfade",
      detail: `${formatTagList(exhibition.tags)}가 어떻게 충돌하거나 섞이는지 비교해 보세요. 혼합 지점에서 가장 좋은 대화거리가 생깁니다.`,
    },
    {
      step: "04",
      title: "Exit Memo",
      detail: `${pick(pacingLabels, seed, 2)} 퇴장 직전에 한 줄 메모를 남기면 재방문 시 감각 비교가 쉬워집니다.`,
    },
  ];
}

export function getExhibitionDetailMock(
  exhibition: Exhibition,
  status: ExhibitionStatus
): ExhibitionDetailMock {
  const seed = hashString(exhibition.id);
  const tagStory = formatTagList(exhibition.tags);
  const bestWindow = pick(arrivalWindows, seed);
  const audience = pick(audienceCues, seed, 1);
  const mood = getEnergyNote(exhibition.tags);
  const duration = estimateDuration(exhibition.category);
  const photoPolicy = getPhotoPolicy(exhibition.category);
  const soundCue = getSoundCue(exhibition.tags);

  return {
    community: {
      headline: `${exhibition.titleKo}를 둘러싼 대화는 지금 "${tagStory}"의 접점에 집중되고 있습니다.`,
      intro: `전시가 ${STATUS_LABEL[status]} 상태인 지금, 관람자들은 ${exhibition.description}라는 첫 인상을 어떻게 해석하는지 활발하게 기록하고 있습니다. 감상 메모, 저장, 재방문 의도가 한 화면에서 이어지도록 커뮤니티 흐름을 구성했습니다.`,
      baseStats: {
        signals: 24 + (seed % 37),
        saveRate: 61 + (seed % 18),
        revisitIntent: 58 + (seed % 23),
        salonCapacity: 12 + (seed % 7),
      },
      salons: [
        {
          title: "Afterimage Salon",
          host: pick(salonHosts, seed),
          schedule: "매주 수 / 19:30",
          note: `${exhibition.artist}의 장면 언어를 관람자 메모와 함께 읽는 소규모 대화 세션입니다.`,
        },
        {
          title: "Collector Notes Drop",
          host: pick(salonHosts, seed, 1),
          schedule: "금 / 18:00 업데이트",
          note: `${tagStory} 키워드가 실제 저장 행동으로 이어지는 지점을 짧은 카드 브리핑으로 공유합니다.`,
        },
        {
          title: "Slow Looking Circle",
          host: pick(salonHosts, seed, 2),
          schedule: "주말 첫 회차 이후",
          note: `${duration} 기준으로 관람 동선을 다시 풀어 보는 세션입니다. 말보다 관찰 비중이 높은 편입니다.`,
        },
      ],
      prompts: [
        {
          label: "첫 장면의 강도",
          response: `이 전시는 시작 30초 안에 분위기를 꽂아 넣는 편입니다. 다만 진짜 흥미는 첫 인상 이후에 ${tagStory}가 어떻게 뒤집히는지에서 생깁니다.`,
        },
        {
          label: "누구와 보면 좋은가",
          response: `${audience}와 잘 맞습니다. 각자 한 장면씩 고른 뒤 감상 이유를 비교하면 전시가 가진 해석 폭이 크게 벌어집니다.`,
        },
        {
          label: "저장하고 싶은 이유",
          response: `${exhibition.iconicObject ? exhibition.iconicObject.name : exhibition.title} 같은 강한 오브젝트 기억점이 있어 화면 밖으로 나온 뒤에도 다시 보고 싶어지는 구조입니다.`,
        },
      ],
      etiquette: [
        "짧은 감탄보다 구체적인 장면 언급이 더 좋은 피드백으로 남습니다.",
        "이미지 촬영 후에는 바로 저장보다 한 줄 메모를 먼저 남기는 흐름을 권장합니다.",
        "다른 관람자의 시선을 가리지 않도록 오브젝트 주변 체류는 2 - 3분 단위로 끊어 주세요.",
      ],
    },
    information: {
      headline: "방문 전에 필요한 운영 정보와 관람 리듬을 한 묶음으로 정리했습니다.",
      summary: `${exhibition.location}에서 ${exhibition.period} 동안 운영되며, 현재 상태는 ${STATUS_LABEL[status]}입니다. 이 전시는 ${mood}라서 ${bestWindow}에 맞춰 들어가면 집중도가 가장 좋습니다.`,
      essentials: [
        {
          label: "권장 체류",
          value: duration,
          detail: "한 바퀴 후 되돌아보는 2회전 관람 기준",
        },
        {
          label: "베스트 입장",
          value: bestWindow,
          detail: "혼잡도보다 장면 집중도를 우선한 시간",
        },
        {
          label: "사운드 톤",
          value: soundCue,
          detail: "공간 전환 체감에 직접 영향을 주는 요소",
        },
        {
          label: "촬영 정책",
          value: photoPolicy,
          detail: "세부 존 안내를 현장 스태프와 함께 확인",
        },
      ],
      checkpoints: buildCheckpoints(exhibition, seed),
      amenities: [
        amenityTemplates[seed % amenityTemplates.length],
        amenityTemplates[(seed + 1) % amenityTemplates.length],
        {
          title: "밀도 높은 구간",
          detail: `${exhibition.category} 특성상 중반부에서 체류가 길어지는 편입니다. 메인 오브젝트 앞 대기 여유를 5분 정도 잡아 두면 좋습니다.`,
        },
      ],
      visitorNotes: [
        `${exhibition.location} 기준으로 입장 전 대기 시간을 짧게 잡고, 내부에서 시간을 쓰는 편이 만족도가 높습니다.`,
        `${tagStory} 레퍼런스에 익숙하지 않아도 괜찮습니다. 전시는 배경지식보다 감각 차이를 비교하는 쪽에서 더 잘 열립니다.`,
        `예약 후 바로 입장하기보다 5분 정도 전 도착해 조도와 주변 소음을 정리하면 체험 품질이 좋아집니다.`,
      ],
    },
    insights: {
      headline: `${exhibition.title}는 서로 다른 미학의 충돌을 '한 장면의 설득력'으로 정리하는 전시입니다.`,
      summary: `${exhibition.longDescription} 이 전시를 읽는 핵심은 ${tagStory}가 단순 병치가 아니라 하나의 태도로 재구성되는 순간을 찾는 데 있습니다.`,
      bars: [
        {
          label: "실험성",
          value: 64 + (seed % 24),
          detail: "익숙한 장르 조합을 얼마나 낯설게 뒤집는지",
        },
        {
          label: "몰입도",
          value: 58 + ((seed >> 1) % 29),
          detail: "공간 체류가 감정 상승으로 이어지는 정도",
        },
        {
          label: "대화 유발도",
          value: 62 + ((seed >> 2) % 26),
          detail: "관람 후 다른 해석을 꺼내게 만드는 힘",
        },
        {
          label: "재관람 가치",
          value: 55 + ((seed >> 3) % 31),
          detail: "두 번째 관람에서 보상이 커지는 정도",
        },
      ],
      lenses: [
        {
          title: "Curatorial Angle",
          detail: `${exhibition.artist}는 ${tagStory}를 단순 레퍼런스 콜라주가 아니라, 지금 시대의 감정 구조로 번역하고 있습니다.`,
        },
        {
          title: "Visual Trigger",
          detail: exhibition.iconicObject
            ? `${exhibition.iconicObject.name}가 화면의 중심 기억점 역할을 하며, 나머지 장면을 해석하는 기준축이 됩니다.`
            : "장면 간 대비가 강해서 특정 오브젝트보다 전체 리듬을 읽는 편이 중요합니다.",
        },
        {
          title: "Why It Stays",
          detail: `${mood}라서 관람 직후보다 시간이 조금 지난 뒤 더 또렷하게 떠오르는 전시입니다.`,
        },
      ],
      pairings: [
        {
          title: "이렇게 보면 더 재밌습니다",
          detail: `전시를 하나의 세계관으로 보기보다, ${exhibition.tags[0] ?? "핵심 키워드"}가 다른 태그를 어떻게 끌고 가는지 중심축을 정해 보세요.`,
        },
        {
          title: "함께 던질 질문",
          detail: `"이 전시는 아름답기보다 날카로운가?" 같은 양자택일 질문을 던지면 감상이 훨씬 구체적으로 풀립니다.`,
        },
        {
          title: "전시 후 남는 이미지",
          detail: `${exhibition.description}라는 요약 문장이 실제로는 어떤 재질, 조명, 속도로 구현되는지 떠올려 보면 기억이 오래 갑니다.`,
        },
      ],
      takeaways: [
        `${tagStory}의 조합이 왜 지금 동시대적으로 보이는지 스스로 한 문장으로 정리해 보세요.`,
        `첫 인상과 퇴장 직전의 감정 차이를 비교하면 이 전시의 설계 포인트가 선명해집니다.`,
        `${audience}와 감상 차이를 비교하기 좋은 전시입니다.`,
      ],
    },
  };
}
