import Link from "next/link";

/**
 * B direction — structural wireframe ONLY.
 * Grey boxes + labels. No visual design applied on purpose.
 * See docs/design/B-DIRECTION.md (디자인 작업이 매우 시급히 필요합니다).
 */

function Box({
  label,
  note,
  className = "",
  children,
}: {
  label: string;
  note?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`rounded border border-dashed border-neutral-400 bg-neutral-100 p-3 text-neutral-700 ${className}`}>
      <p className="text-xs font-semibold">{label}</p>
      {note && <p className="mt-1 text-xs text-neutral-500">{note}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

function PageFrame({ id, title, route, children }: { id: string; title: string; route: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-neutral-300 py-10">
      <h2 className="text-lg font-bold text-neutral-900">
        {title} <code className="ml-2 text-sm font-normal text-neutral-500">{route}</code>
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

const rows = Array.from({ length: 4 }, (_, i) => i + 1);

export default function BStructureWireframe() {
  return (
    <div className="min-h-screen bg-white px-6 pb-20 text-neutral-900 md:px-16">
      <div
        role="note"
        className="sticky top-0 z-50 -mx-6 border-b-2 border-red-600 bg-red-50 px-6 py-3 text-sm text-red-900 md:-mx-16 md:px-16"
      >
        <strong>구조 와이어프레임 · 디자인 미적용</strong> — ⚠️ 디자인 작업이 매우 시급히 필요합니다. 색·글꼴·간격은 모두 임시입니다.{" "}
        <Link href="/mockups" className="underline">시안 목록</Link>
      </div>

      <header className="py-10">
        <p className="text-xs text-neutral-500">B · Collector&apos;s Cabinet 방향 / 2026-10-28</p>
        <h1 className="mt-2 text-2xl font-bold">Art Arca 페이지 구조 (B 방향)</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          각 페이지의 섹션 순서와 정보 단위만 보여 줍니다. 자세한 설명은 <code>docs/design/B-DIRECTION.md</code>에 있습니다.
        </p>
        <nav aria-label="와이어프레임 페이지" className="mt-4 flex flex-wrap gap-2 text-sm">
          {[
            ["#home", "홈"],
            ["#exhibitions", "전시 레지스트리"],
            ["#detail", "전시 상세 + 리뷰"],
            ["#guide", "가이드 허브"],
            ["#genre", "장르 가이드"],
            ["#cabinet", "내 캐비닛"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="inline-flex min-h-[44px] items-center rounded border border-neutral-400 px-3">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <PageFrame id="home" title="1. 홈" route="/">
        <Box label="헤더" note="로고 · 내비(레지스트리/가이드/내 캐비닛/소개) · 시즌 표기" />
        <div className="grid gap-3 md:grid-cols-2">
          <Box label="인트로" note="한 줄 소개 + 주 CTA 1개(전체 목록 열기)" className="min-h-[160px]" />
          <Box label="레지스트리 상위 8" note="번호 · 제목 · 작가 · 기간">
            <div className="space-y-1">
              {rows.map((n) => (
                <div key={n} className="h-6 rounded bg-neutral-300" aria-hidden />
              ))}
            </div>
          </Box>
        </div>
        <Box label="선반 (큐레이션 4)" note="이미지 + 라벨 카드(제목 · 분야 · 기간) · 1440: 4열 / 390: 2열">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {rows.map((n) => (
              <div key={n} className="aspect-square rounded bg-neutral-300" aria-hidden />
            ))}
          </div>
        </Box>
        <Box label="가이드 허브 진입" note="장르 타일 5개 · 1440: 5열 / 390: 2열" />
        <Box label="이용 방법" note="훑기 → 라벨 확인 → 저장 → 방문" />
        <Box label="푸터" />
      </PageFrame>

      <PageFrame id="exhibitions" title="2. 전시 레지스트리" route="/exhibitions">
        <Box label="페이지 머리" note="제목 · 실제 총 개수 · 시즌" />
        <Box label="필터 바" note="분야 · 상태(예정/진행 중/종료) · 장소 · 보기 전환(목록/선반)" />
        <Box label="레지스트리 목록" note="번호 · 제목(영/한) · 작가 · 분야 · 기간 · 장소 · 저장">
          <div className="space-y-1">
            {rows.map((n) => (
              <div key={n} className="h-8 rounded bg-neutral-300" aria-hidden />
            ))}
          </div>
        </Box>
        <Box label="빈 상태" note="결과 없음 + 필터 초기화" />
      </PageFrame>

      <PageFrame id="detail" title="3. 전시 상세 + 리뷰" route="/exhibitions/[id]">
        <div className="grid gap-3 md:grid-cols-2">
          <Box label="대표 이미지" className="min-h-[180px]" />
          <Box label="라벨 헤더" note="번호 · 제목 · 작가 · 분야 · 기간 · 장소 · 상태 · 주 CTA 1개" />
        </div>
        <Box label="소개" note="설명 · 긴 설명 · 태그" />
        <Box label="방문 정보" note="데이터에 있는 값만 (없으면 숨김)" />
        <Box label="리뷰" note="평균(리뷰가 있을 때만) · 최신순 목록 · 작성 폼(localStorage)" />
        <Box label="같이 볼 전시 2~4" />
        <Box label="이전 / 다음 (레지스트리 번호 기준)" />
      </PageFrame>

      <PageFrame id="guide" title="4. 가이드 허브" route="/guide">
        <Box label="머리" note="가이드 소개 한 문단" />
        <Box label="장르 타일 5" note="전시 · 음악 · 오페라 · 연극 · 무용" />
        <Box label="지금 볼 만한 프로그램" note="장르별 진행/예정" />
        <Box label="처음 관람 팁" />
      </PageFrame>

      <PageFrame id="genre" title="5. 장르 가이드" route="/guide/[genre]">
        <Box label="장르 히어로" note="제목 · 요약 · 빠른 사실" />
        <Box label="기초 섹션들" />
        <Box label="용어집" />
        <Box label="FAQ" />
        <Box label="프로그램 (예정/진행/종료)" />
        <Box label="다른 장르로 이동" />
      </PageFrame>

      <PageFrame id="cabinet" title="6. 내 캐비닛" route="/bookmarks">
        <Box label="저장한 전시" note="레지스트리 행 / 선반 보기" />
        <Box label="빈 상태" note="저장 방법 안내 + 레지스트리로 이동" />
      </PageFrame>
    </div>
  );
}
