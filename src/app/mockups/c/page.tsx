import Image from "next/image";
import Link from "next/link";
import MockupBar from "@/components/mockups/MockupBar";
import AiCuratorMock from "@/components/mockups/AiCuratorMock";
import { exhibitions } from "@/lib/data";
import { getGuideGenres } from "@/lib/guide-data";

/**
 * Variant C — "Salon Wall"
 * art_hub: bento grid with sculptural objects breaking out of the card frame; rim glow on hover.
 * art_arca: salon-hang image collage, genre guide, gold-led palette (no purple field).
 * AI curator block is a mockup only (no API call).
 */
const HANG = [
  "md:col-span-2 md:row-span-2",
  "",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "md:col-span-2",
];

export default function MockupC() {
  const wall = exhibitions.slice(0, 6);
  const objectPick = exhibitions.find((e) => e.iconicObject)!;
  const genres = getGuideGenres();
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F0F0D] text-white">
      <MockupBar current="c" />

      <section className="px-6 pb-16 pt-12 md:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#C9A96E]">Salon wall · SS 2026</p>
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.95]">
              한 벽에 걸린 <em className="text-[#E7D1A0]">이번 시즌.</em>
            </h1>
          </div>
          <Link href="/exhibitions" className="inline-flex min-h-[44px] items-center rounded-full border border-[#C9A96E] px-6 text-xs uppercase tracking-[0.25em] text-[#E7D1A0] hover:bg-[#C9A96E] hover:text-black">
            전시 전체
          </Link>
        </div>

        {/* Salon hang */}
        <div className="mt-10 grid auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
          {wall.map((e, i) => (
            <Link key={e.id} href={`/exhibitions/${e.id}`} className={`group relative overflow-hidden rounded-md border-[6px] border-[#1d1913] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] ${HANG[i]}`}>
              {e.image && <Image src={e.image} alt={e.title} fill sizes="(min-width: 768px) 50vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 text-sm opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                <span className="block font-serif">{e.title}</span>
                <span className="block text-[11px] text-white/60">{e.period}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bento with protruding object (art_hub), using the 0401 wrapper/shell split */}
      <section className="grid gap-6 px-6 pb-20 md:grid-cols-[1.4fr_1fr] md:px-16">
        <div className="relative min-h-[360px]">
          <div className="absolute inset-0 overflow-hidden rounded-[32px] border border-[#C9A96E]/25 bg-[#141410]">
            {objectPick.heroImage && <Image src={objectPick.heroImage} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-40" />}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          </div>
          <div className="relative z-10 max-w-sm p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">Iconic object</p>
            <p className="mt-3 font-serif text-3xl">{objectPick.iconicObject!.name}</p>
            <p className="mt-3 text-sm text-white/65">{objectPick.iconicObject!.description}</p>
            <p className="mt-6 text-xs text-white/45">from “{objectPick.title}”</p>
          </div>
          <div className="pointer-events-none absolute -bottom-6 right-2 z-20 h-48 w-48 md:-right-4 md:h-64 md:w-64">
            <Image src={objectPick.iconicObject!.image} alt="" fill sizes="256px" className="object-contain drop-shadow-[0_20px_30px_rgba(201,169,110,0.35)]" />
          </div>
        </div>
        <AiCuratorMock />
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:px-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Genre guide</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {genres.map((g) => (
            <li key={g.slug}>
              <Link href={`/guide/${g.slug}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 hover:border-[#C9A96E]">
                <span className="font-serif text-lg">{g.nameKo}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">{g.nameEn}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
