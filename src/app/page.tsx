import { exhibitions } from '../lib/data';
import AnimatedContainer from '../components/AnimatedContainer';

export default function Home() {
  return (
    <AnimatedContainer>
      <div className="bg-[#F2F0ED] min-h-screen text-[#1a1a1a]">
        {/* Edition Header */}
        <header className="px-8 md:px-24 pt-24 pb-12">
          <div className="flex justify-between items-end border-b border-stone-800 pb-8">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold">Art Hub — Spring 2026 Edition</h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Curated & Selected</span>
          </div>
        </header>

        {/* Hero Impact Section */}
        <section className="px-8 md:px-24 py-24">
          <h1 className="text-[100px] md:text-[220px] font-serif leading-[0.8] tracking-tighter mb-16">
            예술적<br />
            침묵.
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-light leading-snug mb-12">
              가장 깊은 질문은 언제나 침묵 속에 숨어있습니다. 이번 시즌, 당신의 감각을 깨울 큐레이션을 확인하세요.
            </p>
            <button className="text-[11px] uppercase tracking-[0.2em] bg-stone-900 text-white px-12 py-5 hover:bg-stone-700 transition-all">
              Explore the Collection
            </button>
          </div>
        </section>

        {/* Editorial Feature Grid */}
        <section className="px-8 md:px-24 pb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
            {exhibitions.map((ex) => (
              <div key={ex.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-stone-200 mb-10 overflow-hidden">
                  <div className="w-full h-full bg-stone-300 group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-500">{ex.category}</span>
                  <span className="text-[10px] font-mono tracking-tighter text-stone-400">{ex.date}</span>
                </div>
                <h3 className="text-4xl font-serif tracking-tight mb-4 group-hover:underline underline-offset-8">
                  {ex.title}
                </h3>
                <p className="text-sm text-stone-500 tracking-wide">{ex.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AnimatedContainer>
  );
}