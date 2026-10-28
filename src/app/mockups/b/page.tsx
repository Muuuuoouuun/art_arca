import Image from "next/image";
import Link from "next/link";
import MockupBar from "@/components/mockups/MockupBar";
import { LaurelAccent } from "@/components/ClassicalOrnament";
import { exhibitions } from "@/lib/data";
import { getGuideGenres } from "@/lib/guide-data";

/**
 * Variant B — "Collector's Cabinet"
 * art_hub: numbered registry list, physical shelf shadow, classical numerals, laurel accent.
 * art_arca: Paper #F3EBDD archive tone, label cards, guide hub entry, mobile-safe tap targets.
 */
export default function MockupB() {
  const shelf = exhibitions.slice(0, 4);
  const genres = getGuideGenres();
  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#171410]">
      <MockupBar current="b" tone="light" />

      <header className="flex items-center justify-between border-b border-[#171410]/10 px-6 py-5 md:px-16">
        <Link href="/" className="font-serif text-lg tracking-[0.45em]">ART ARCA</Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#171410]/50">Cabinet · SS 2026</span>
      </header>

      <section className="grid gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:px-16 md:py-24">
        <div>
          <LaurelAccent color="#9A7A4A" className="justify-start" />
          <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.92]">
            The <em className="text-[#9A7A4A]">registry</em> of a restless city.
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#171410]/75">
            서울의 이번 시즌 전시를 한 장의 소장 목록처럼 정리했습니다. 번호로 훑고, 라벨로 고르고, 선반에서 꺼내 보세요.
          </p>
          <Link href="/exhibitions" className="mt-8 inline-flex min-h-[44px] items-center rounded-full bg-[#171410] px-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#F3EBDD]">
            전체 목록 열기
          </Link>
        </div>

        {/* Registry (art_hub MASTER REGISTRY idea, as a readable table) */}
        <ol aria-label="이번 시즌 전시 목록" className="divide-y divide-[#171410]/10 border-y border-[#171410]/10">
          {exhibitions.slice(0, 8).map((e, i) => (
            <li key={e.id}>
              <Link href={`/exhibitions/${e.id}`} className="grid min-h-[56px] grid-cols-[44px_1fr_auto] items-center gap-3 py-3 hover:bg-[#E6DAC7]/60">
                <span className="font-serif text-xl italic text-[#9A7A4A]">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-lg leading-tight">{e.title}</span>
                  <span className="block text-xs text-[#171410]/55">{e.artist}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#171410]/50">{e.date}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Shelf (art_hub physical shelf) with art_arca paper label cards */}
      <section className="px-6 pb-24 md:px-16">
        <h2 className="font-serif text-3xl md:text-4xl">On the shelf</h2>
        <div className="relative mt-10">
          <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
            {shelf.map((e) => (
              <Link key={e.id} href={`/exhibitions/${e.id}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-2">
                  {e.image && <Image src={e.image} alt={e.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />}
                </div>
                <div className="mt-4 rounded-sm border border-[#171410]/10 bg-[#FBF6EC] px-3 py-2 shadow-sm">
                  <p className="font-serif text-sm leading-tight">{e.title}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#171410]/50">{e.category}</p>
                </div>
              </Link>
            ))}
          </div>
          <div aria-hidden className="absolute bottom-[64px] left-[-2%] right-[-2%] hidden h-4 rounded-sm bg-gradient-to-b from-white to-[#E6DAC7] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] md:block" />
        </div>
      </section>

      {/* Guide hub entry (art_arca) */}
      <section className="bg-[#171410] px-6 py-20 text-[#F3EBDD] md:px-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#C9A96E]">Guide</p>
        <h2 className="mt-4 font-serif text-3xl md:text-5xl">처음 보는 장르도 편하게.</h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {genres.map((g) => (
            <li key={g.slug}>
              <Link href={`/guide/${g.slug}`} className="flex min-h-[88px] flex-col justify-between rounded-xl border border-[#F3EBDD]/15 p-4 hover:border-[#C9A96E]">
                <span className="font-serif text-2xl">{g.nameKo}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F3EBDD]/50">{g.nameEn}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
