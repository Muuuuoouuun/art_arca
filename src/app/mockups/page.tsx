import Link from "next/link";

const VARIANTS = [
  {
    href: "/mockups/a",
    name: "A · Gilded Night",
    fromHub: "ARTISTIC SOUL 타이포 히어로, 좌측 메타 레일(REF/COORD), 장식 디바이더, 차가운 글로우",
    fromArca: "시즌 카피·실제 데이터, 다크→페이퍼 섹션 전환, 단일 CTA 규칙, 히어로 이미지 겹침 해소",
  },
  {
    href: "/mockups/b",
    name: "B · Collector's Cabinet",
    fromHub: "MASTER REGISTRY식 번호 목록, 선반(shelf) 그림자, ClassicalNumber",
    fromArca: "Paper #F3EBDD 아카이브 톤, 라벨 카드, 가이드 허브 진입, 모바일 터치 타깃",
  },
  {
    href: "/mockups/c",
    name: "C · Salon Wall",
    fromHub: "벤토 + 카드 밖으로 튀어나오는 오브젝트, 퍼플 대신 금빛 림 글로우",
    fromArca: "살롱 행(salon hang) 이미지 콜라주, 장르 가이드, AI 큐레이터(목업, API 호출 없음)",
  },
];

export default function MockupsIndex() {
  return (
    <div className="min-h-screen bg-[#0F0F0D] px-6 py-16 text-white md:px-16">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A96E]">Design review · 2026-10-28</p>
      <h1 className="mt-4 font-serif text-4xl md:text-6xl">Art Arca 디자인 시안</h1>
      <p className="mt-4 max-w-2xl text-white/70">
        art_hub(구 로컬)와 art_arca의 디자인 요소를 섞은 프론트엔드 전용 시안입니다. 백엔드 변경과 API 호출은 없습니다.
        전시 데이터는 기존 <code>src/lib/data.ts</code>를 그대로 사용합니다.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {VARIANTS.map((v) => (
          <li key={v.href}>
            <Link
              href={v.href}
              className="block h-full rounded-2xl border border-white/10 p-6 transition-colors hover:border-[#C9A96E]/60"
            >
              <h2 className="font-serif text-2xl text-[#E7D1A0]">{v.name}</h2>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">from art_hub</p>
              <p className="mt-1 text-sm text-white/80">{v.fromHub}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">from art_arca</p>
              <p className="mt-1 text-sm text-white/80">{v.fromArca}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-sm text-white/70">
        채택 방향: <strong>B</strong> (실제 버전은 처음부터 새로 디자인).{" "}
        <Link href="/mockups/b-structure" className="underline hover:text-[#C9A96E]">
          B 구조 와이어프레임 · 디자인 미적용
        </Link>{" "}
        — ⚠️ 디자인 작업이 매우 시급히 필요합니다.
      </p>
    </div>
  );
}
