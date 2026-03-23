import Link from "next/link";
import Image from "next/image";
import { exhibitions } from "../../lib/data";
import AnimatedContainer from "../../components/AnimatedContainer";

export const metadata = {
  title: "Exhibitions — Art Arca",
  description: "Spring 2026 전시 목록. Art Arca가 큐레이션한 현대 미술 전시들을 만나보세요.",
};

const categories = ["전체", ...Array.from(new Set(exhibitions.map((ex) => ex.category)))];

export default function ExhibitionsPage() {
  return (
    <AnimatedContainer>
      <div className="bg-[#F2F0ED] min-h-screen text-[#1a1a1a]">
        {/* Page Header */}
        <header className="px-8 md:px-24 pt-28 pb-16 border-b border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-4">Spring 2026</p>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Exhibitions</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-500">{exhibitions.length}개의 전시</p>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="px-8 md:px-24 py-6 border-b border-stone-100 flex gap-6 overflow-x-auto">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pb-1 transition-colors ${
                i === 0
                  ? "text-stone-900 font-bold border-b border-stone-900"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exhibition Grid */}
        <section className="px-8 md:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {exhibitions.map((ex, i) => (
              <Link key={ex.id} href={`/exhibitions/${ex.id}`} className="group block">
                {/* Image */}
                <div
                  className="aspect-[3/4] mb-6 overflow-hidden relative"
                  style={
                    !ex.image
                      ? { backgroundColor: `hsl(${(i * 47) % 360}, 10%, ${82 + (i % 3) * 4}%)` }
                      : undefined
                  }
                >
                  {ex.image ? (
                    <Image
                      src={ex.image}
                      alt={ex.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundColor: `hsl(${(i * 47) % 360}, 8%, ${80 + (i % 3) * 4}%)`,
                      }}
                    />
                  )}
                  {ex.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[8px] uppercase tracking-[0.3em] bg-stone-900 text-white px-3 py-1.5">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start mb-3">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400">
                    {ex.category}
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">{ex.date}</span>
                </div>
                <h2 className="text-2xl font-serif tracking-tight mb-2 group-hover:underline underline-offset-4">
                  {ex.title}
                </h2>
                <p className="text-xs text-stone-500 mb-2">{ex.artist}</p>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{ex.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="pb-24" />
      </div>
    </AnimatedContainer>
  );
}
