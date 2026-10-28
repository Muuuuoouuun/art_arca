"use client";

import { useState } from "react";
import Link from "next/link";
import { exhibitions } from "@/lib/data";

/**
 * MOCKUP ONLY. No network/API call: answers are picked locally from tags in src/lib/data.ts.
 * The UI exists to evaluate placement and tone of a future "AI curator" — not a working feature.
 */
const PROMPTS = [
  { label: "조용한 전시", tags: ["앰비언트", "미니멀리즘", "생태미술", "바이오아트"] },
  { label: "음악이 있는 전시", tags: ["디스코", "힙합", "펑크락", "테크노", "오페라", "인디팝"] },
  { label: "전통 × 현대", tags: ["한복", "우키요에", "르네상스", "민화"] },
];

export default function AiCuratorMock() {
  const [active, setActive] = useState<number | null>(null);
  const picks =
    active === null
      ? []
      : exhibitions
          .filter((e) => e.tags.some((t) => PROMPTS[active].tags.some((p) => t.includes(p))))
          .slice(0, 3);

  return (
    <div className="rounded-3xl border border-dashed border-[#C9A96E]/50 bg-white/[0.03] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-serif text-2xl">AI 큐레이터</p>
        <span className="rounded-full border border-[#C9A96E]/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">
          목업 · API 호출 없음
        </span>
      </div>
      <p className="mt-2 text-sm text-white/60">
        시안용 화면입니다. 버튼을 누르면 전시 태그로 로컬 필터링만 합니다(생성형 응답 아님).
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {PROMPTS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`min-h-[40px] rounded-full border px-4 text-sm transition-colors ${
              active === i ? "border-[#C9A96E] bg-[#C9A96E] text-black" : "border-white/20 hover:border-[#C9A96E]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <ul className="mt-5 space-y-2" aria-live="polite">
        {active !== null && picks.length === 0 && <li className="text-sm text-white/50">맞는 전시가 없습니다.</li>}
        {picks.map((e) => (
          <li key={e.id}>
            <Link href={`/exhibitions/${e.id}`} className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2 hover:text-[#E7D1A0]">
              <span className="font-serif text-lg">{e.title}</span>
              <span className="text-xs text-white/50">{e.tags.join(" · ")}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
