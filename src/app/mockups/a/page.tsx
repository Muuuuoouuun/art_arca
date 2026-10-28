import Image from "next/image";
import Link from "next/link";
import MockupBar from "@/components/mockups/MockupBar";
import { OrnamentalDivider } from "@/components/ClassicalOrnament";
import { exhibitions } from "@/lib/data";

/**
 * Variant A — "Gilded Night"
 * art_hub: oversized two-line gilded/italic type hero, left meta rail, ornamental dividers, cool glow.
 * art_arca: season copy + real data, dark→paper section shift, one dominant CTA, no text-over-image collision.
 */
export default function MockupA() {
  const featured = exhibitions.filter((e) => e.featured).slice(0, 3);
  const lead = exhibitions[0];
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F0F0D] text-white">
      <MockupBar current="a" />

      {/* Glows: art_hub's cold field, re-tinted to oxide teal + a whisper of violet per DESIGN.md */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-[#4b3a6b] opacity-[0.18] blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute right-[-120px] top-[30vh] h-[520px] w-[520px] rounded-full bg-[#5E7A73] opacity-[0.22] blur-[120px]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-16">
        <Link href="/" className="font-serif text-lg tracking-[0.5em]">ART ARCA</Link>
        <nav aria-label="시안 A 메뉴" className="hidden gap-8 text-[11px] uppercase tracking-[0.3em] text-white/60 md:flex">
          <span className="text-[#C9A96E]">Season</span>
          <span>Archive</span>
          <span>Guide</span>
          <span>Saved</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 grid gap-10 px-6 pb-20 pt-6 md:grid-cols-[120px_1fr_420px] md:px-16 md:pt-12">
        {/* Meta rail (art_hub REF/COORD) — only true facts */}
        <dl className="hidden flex-col gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex">
          <div><dt>Season</dt><dd className="mt-1 text-white/80">SS 2026</dd></div>
          <div><dt>Base</dt><dd className="mt-1 text-white/80">Seoul</dd></div>
          <div><dt>Editions</dt><dd className="mt-1 text-white/80">{exhibitions.length}</dd></div>
        </dl>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#C9A96E]">Seoul program · Spring–Summer 2026</p>
          <OrnamentalDivider className="mt-4 max-w-[220px]" />
          <h1 className="mt-6 font-serif font-black leading-[0.88] tracking-tight">
            <span className="block bg-gradient-to-b from-[#F0D89A] to-[#C9A96E] bg-clip-text text-[clamp(3rem,7.4vw,7.25rem)] text-transparent">
              ART FOR A
            </span>
            <span className="block text-[clamp(3rem,7.4vw,7.25rem)] italic text-white/45">restless city.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/75">
            이번 시즌 서울을 오가는 {exhibitions.length}개의 크로스오버 전시. 끌리는 작품은 저장하고, 방문을 예약하고, 밤이 끝나면
            아카이브로 돌아와 다시 보세요.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/exhibitions" className="rounded-full bg-[#C9A96E] px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black">
              시즌 보기
            </Link>
            <Link href="/guide" className="text-xs uppercase tracking-[0.25em] text-white/60 underline-offset-8 hover:underline">
              처음이라면 가이드 →
            </Link>
          </div>
        </div>

        {/* Image sits in its own column — fixes the current headline/image overlap */}
        {lead.heroImage && (
          <figure className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-[#C9A96E]/30">
              <Image src={lead.image ?? lead.heroImage} alt={lead.title} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
            </div>
            <figcaption className="absolute bottom-5 left-5 right-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">{lead.period}</p>
              <p className="mt-1 font-serif text-2xl">{lead.title}</p>
              <p className="text-xs text-white/60">{lead.location}</p>
            </figcaption>
          </figure>
        )}
      </section>

      {/* Featured — dark glass cards */}
      <section className="relative z-10 px-6 pb-24 md:px-16">
        <h2 className="font-serif text-3xl md:text-5xl">Featured editions</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((e, i) => (
            <Link key={e.id} href={`/exhibitions/${e.id}`} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-colors hover:border-[#C9A96E]/50">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {e.image && <Image src={e.image} alt={e.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">No. {String(i + 1).padStart(2, "0")} · {e.date}</p>
              <p className="mt-1 font-serif text-xl">{e.title}</p>
              <p className="text-sm text-white/55">{e.titleKo}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Paper band — art_arca's warm archive shift */}
      <section className="bg-[#F3EBDD] px-6 py-20 text-[#171410] md:px-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#9A7A4A]">How Art Arca works</p>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {[
            ["저장", "마음에 남는 전시를 북마크해 두고 다시 찾습니다."],
            ["예약", "방문 날짜를 정해 두면 내 예약 목록에 남습니다."],
            ["기록", "관람 후 짧은 리뷰로 나만의 아카이브를 만듭니다."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-[#171410]/15 pt-6">
              <p className="font-serif text-3xl">{t}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#171410]/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
