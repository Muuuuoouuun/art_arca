import Link from "next/link";
import Image from "next/image";
import { getFeaturedExhibitions } from "../lib/data";
import AnimatedContainer from "../components/AnimatedContainer";

export default function Home() {
  const featured = getFeaturedExhibitions();

  return (
    <AnimatedContainer>
      <div className="bg-[#F2F0ED] min-h-screen text-[#1a1a1a]">
        {/* Edition Header */}
        <header className="px-8 md:px-24 pt-28 pb-12">
          <div className="flex justify-between items-end border-b border-stone-800 pb-8">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold">Art Hub — Spring 2026 Edition</h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Curated & Selected</span>
          </div>
        </header>

        {/* Hero Impact Section */}
        <section className="px-8 md:px-24 py-24">
          <h1 className="text-[80px] md:text-[200px] font-serif leading-[0.85] tracking-tighter mb-16">
            예술적<br />
            침묵.
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-light leading-snug mb-12 text-stone-700">
              가장 깊은 질문은 언제나 침묵 속에 숨어있습니다.<br />
              이번 시즌, 당신의 감각을 깨울 큐레이션을 확인하세요.
            </p>
            <Link
              href="/exhibitions"
              className="inline-block text-[11px] uppercase tracking-[0.2em] bg-stone-900 text-white px-12 py-5 hover:bg-stone-700 transition-all"
            >
              Explore the Collection
            </Link>
          </div>
        </section>

        {/* Featured Divider */}
        <section className="px-8 md:px-24 py-4">
          <div className="flex items-center gap-6">
            <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Featured</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>
        </section>

        {/* Editorial Feature Grid */}
        <section className="px-8 md:px-24 pb-48 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
            {featured.map((ex) => (
              <Link key={ex.id} href={`/exhibitions/${ex.id}`} className="group cursor-pointer block">
                <div className="aspect-[4/3] mb-10 overflow-hidden relative bg-stone-200">
                  {ex.image ? (
                    <Image
                      src={ex.image}
                      alt={ex.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-300 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  )}
                </div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-500">{ex.category}</span>
                  <span className="text-[10px] font-mono tracking-tighter text-stone-400">{ex.date}</span>
                </div>
                <h3 className="text-4xl font-serif tracking-tight mb-3 group-hover:underline underline-offset-8">
                  {ex.title}
                </h3>
                <p className="text-sm text-stone-500 tracking-wide mb-3">{ex.artist}</p>
                <p className="text-sm text-stone-400 leading-relaxed">{ex.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-24 border-t border-stone-200 pt-12 text-center">
            <Link
              href="/exhibitions"
              className="text-[10px] uppercase tracking-[0.3em] text-stone-500 hover:text-stone-900 transition-colors"
            >
              View All Exhibitions →
            </Link>
          </div>
        </section>
      </div>
    </AnimatedContainer>
  );
}
