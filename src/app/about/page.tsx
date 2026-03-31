import Link from "next/link";
import AnimatedContainer from "../../components/AnimatedContainer";
import FilmGrain from "../../components/FilmGrain";
import BackgroundGlow from "../../components/BackgroundGlow";

export const metadata = {
  title: "About — Art Hub 4.1",
  description: "Art Hub 4.1: Iconic Masterpiece Edition — A digital lens for the new curation frontier.",
};

const values = [
  {
    number: "01",
    title: "큐레이션의 철학",
    description:
      "우리는 단순히 작품을 나열하지 않습니다. 각각의 전시는 하나의 담론이며, 관람객이 예술과 진정한 대화를 나눌 수 있도록 엄선된 맥락 속에 작품을 위치시킵니다.",
  },
  {
    number: "02",
    title: "디지털 트윈 & 실체",
    description:
      "물리적 예술의 무게를 디지털 공간에 구현합니다. Art Hub 4.1은 초고해상도 렌더링과 딥 레이아웃 시스템을 통해 작품의 질감과 존재감을 보존합니다.",
  },
  {
    number: "03",
    title: "아이코닉 에디션",
    description:
      "계절을 넘어, 시대를 관통하는 마스터피스들을 다룹니다. 3D 아티팩트와 앰비언트 오디오를 결합하여 감각적인 전시 경험을 제공합니다.",
  },
];

const team = [
  { name: "Ah-Hyun Kim", role: "Founder & Chief Curator" },
  { name: "Maggie 매기", role: "Lead Visual Architect // Subagent" },
  { name: "Jun-Hyuk Lee", role: "Artistic Director" },
  { name: "Seo-Yeon Park", role: "Exhibition Coordinator" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#030303] min-h-screen text-white relative overflow-hidden selection:bg-white selection:text-black">
      <FilmGrain />
      <BackgroundGlow color="bg-zinc-800" size="w-[1000px] h-[1000px]" className="top-[-400px] left-[-200px]" opacity={0.1} />

      <AnimatedContainer>
        {/* Header */}
        <header className="px-8 md:px-24 pt-48 pb-24 border-b border-white/10 relative z-10">
          <div className="max-w-[1800px] mx-auto">
             <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-8 font-bold">Node 4.1 // Origin Story</p>
             <h1 className="text-8xl md:text-[10vw] font-serif tracking-tighter leading-none font-bold uppercase">
                Artistic<br /><span className="italic text-zinc-700">Vision.</span>
             </h1>
          </div>
        </header>

        {/* Mission Statement */}
        <section className="px-8 md:px-24 py-40 relative z-10">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div>
              <p className="text-4xl md:text-5xl font-serif italic leading-tight text-zinc-300">
                "예술의 영혼을 디지털 코드로 번역하는 과정에서 우리는 새로운 실체를 발견합니다."
              </p>
            </div>
            <div className="space-y-12">
              <p className="text-xl leading-relaxed text-zinc-400 font-light">
                Art Hub 4.1은 2026년 서울에서 시작된 독립 아트 큐레이션 플랫폼의 정점입니다. 우리는 동시대 예술과 역사적 아이콘을 결합하여, 단순한 갤러리 웹사이트를 넘어선 '디지털 박물관'을 지향합니다.
              </p>
              <p className="text-xl leading-relaxed text-zinc-400 font-light">
                우리의 딥 레이아웃 기술은 각 작품이 가진 서사를 공간적으로 배치하며, 아이코닉 오브젝트들은 물리적 한계를 벗어나 관람객의 화면 속에서 새롭게 숨 쉽니다.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-8 md:px-24 py-40 border-t border-white/5 relative z-10">
           <div className="max-w-[1800px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-24 font-bold uppercase">
                Core Protocols
              </p>
              <div className="space-y-0">
                {values.map((val, i) => (
                  <div
                    key={val.number}
                    className={`grid grid-cols-1 md:grid-cols-3 gap-12 py-20 ${
                      i < values.length - 1 ? "border-b border-white/5" : ""
                    } group`}
                  >
                    <div className="flex items-start gap-12">
                      <span className="text-xl font-mono text-zinc-800 mt-1 group-hover:text-white transition-colors">{val.number}</span>
                      <h2 className="text-4xl font-serif tracking-tight group-hover:italic transition-all">{val.title}</h2>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xl leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors font-light">{val.description}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Team Grid */}
        <section className="px-8 md:px-24 py-40 border-t border-white/5 relative z-10">
          <div className="max-w-[1800px] mx-auto">
             <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-24 font-bold">
                The Architects
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4">
                {team.map((member) => (
                  <div key={member.name} className="flex justify-between items-end py-10 border-b border-white/5 group">
                    <span className="text-2xl font-serif group-hover:text-shadow-glow transition-all">{member.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-mono group-hover:text-zinc-400 transition-colors font-bold">{member.role}</span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* CTA Blockbuster Style */}
        <section className="px-8 md:px-24 py-40 relative z-10">
           <div className="max-w-[1800px] mx-auto bg-white/[0.03] border border-white/10 rounded-[60px] p-24 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
                <div>
                  <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">
                    Art Hub 4.1<br/><span className="italic text-zinc-500">Master Registry</span>
                  </h2>
                  <p className="text-zinc-500 text-xl font-light max-w-xl">
                    가장 진보된 디지털 아트 큐레이션을 지금 바로 경험해 보세요. 아이코닉 에디션이 당신을 기다립니다.
                  </p>
                </div>
                <Link
                  href="/exhibitions"
                  className="group relative px-16 py-8 overflow-hidden rounded-full border border-white/20 text-xs tracking-[0.4em] font-bold transition-all duration-700 hover:border-white"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-700 uppercase">ACCESS ARCHIVE</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </div>
           </div>
        </section>

        <footer className="py-20 text-center text-[10px] text-zinc-800 font-mono uppercase tracking-[0.5em]">
           Art Hub 4.1 Architecture Spec-04 // All Systems Go.
        </footer>
      </AnimatedContainer>
    </div>
  );
}
