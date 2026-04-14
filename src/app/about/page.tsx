import Link from "next/link";
import AnimatedContainer from "../../components/AnimatedContainer";
import FilmGrain from "../../components/FilmGrain";
import BackgroundGlow from "../../components/BackgroundGlow";
import { OrnamentalDivider, LaurelAccent, CornerFlourish, ClassicalNumber } from "../../components/ClassicalOrnament";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: `About — ${SITE_NAME}`,
  description: `The curatorial philosophy and visual system behind ${SITE_NAME}, a cinematic Seoul-wide exhibition archive.`,
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
      `물리적 예술의 무게를 디지털 공간에 구현합니다. ${SITE_NAME}는 초고해상도 렌더링과 딥 레이아웃 시스템을 통해 작품의 질감과 존재감을 보존합니다.`,
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
    <div className="bg-[#0F0F0F] min-h-screen text-white relative overflow-hidden selection:bg-white selection:text-black">
      <FilmGrain />
      <BackgroundGlow color="bg-zinc-500" size="w-[1000px] h-[1000px]" className="top-[-400px] left-[-200px]" opacity={0.18} />

      {/* Renaissance ceiling fresco motif */}
      <div className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden opacity-[0.04]">
        <svg viewBox="0 0 1400 600" fill="none" className="w-full">
          {/* Arched vault */}
          <path d="M0 600 Q100 200 350 100 Q700 0 700 0 Q700 0 1050 100 Q1300 200 1400 600" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
          <path d="M0 600 Q150 300 400 180 Q700 80 700 80 Q700 80 1000 180 Q1250 300 1400 600" stroke="#C9A96E" strokeWidth="0.6" fill="none" />
          {/* Central medallion */}
          <ellipse cx="700" cy="160" rx="120" ry="80" stroke="#C9A96E" strokeWidth="1" fill="none" />
          <ellipse cx="700" cy="160" rx="80" ry="50" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <ellipse cx="700" cy="160" rx="40" ry="25" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
          {/* Radial spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={700 + 40 * Math.cos(rad)}
                y1={160 + 25 * Math.sin(rad)}
                x2={700 + 120 * Math.cos(rad)}
                y2={160 + 80 * Math.sin(rad)}
                stroke="#C9A96E"
                strokeWidth="0.4"
                opacity="0.6"
              />
            );
          })}
        </svg>
      </div>

      <AnimatedContainer>
        {/* Header */}
        <header className="px-8 md:px-24 pt-48 pb-24 border-b relative z-10" style={{ borderColor: "#C9A96E15" }}>
          <div className="max-w-[1800px] mx-auto">
            <p className="text-[10px] uppercase tracking-[0.6em] mb-6 font-bold" style={{ color: "#C9A96E80" }}>
              Seoul Archive // Origin Story
            </p>
            <LaurelAccent className="mb-8" />
            <h1 className="text-8xl md:text-[10vw] font-serif tracking-tighter leading-none font-bold uppercase">
              Artistic<br /><span className="italic text-zinc-700">Vision.</span>
            </h1>
            <OrnamentalDivider className="mt-10 max-w-sm" />
          </div>
        </header>

        {/* Mission Statement */}
        <section className="px-8 md:px-24 py-40 relative z-10">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div className="relative">
              {/* Decorative large quote marks */}
              <span className="absolute -top-8 -left-4 text-[8rem] font-serif leading-none select-none pointer-events-none" style={{ color: "#C9A96E15" }}>❝</span>
              <p className="text-4xl md:text-5xl font-serif italic leading-tight text-zinc-300 relative z-10">
                예술의 영혼을 디지털 코드로 번역하는 과정에서 우리는 새로운 실체를 발견합니다.
              </p>
              <OrnamentalDivider className="mt-10 max-w-xs" />
            </div>
            <div className="space-y-12">
              <p className="text-xl leading-relaxed text-zinc-400 font-light">
                {SITE_NAME}는 2026년 서울에서 시작된 독립 아트 큐레이션 아카이브입니다. 우리는 동시대 예술과 역사적 아이콘을 한 계절의 흐름 안에 묶어, 단순한 갤러리 웹사이트가 아니라 다시 찾아오는 전시 기록장을 만들고자 합니다.
              </p>
              <p className="text-xl leading-relaxed text-zinc-400 font-light">
                우리의 딥 레이아웃 기술은 각 작품이 가진 서사를 공간적으로 배치하며, 아이코닉 오브젝트들은 물리적 한계를 벗어나 관람객의 화면 속에서 새롭게 숨 쉽니다.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-8 md:px-24 py-40 border-t relative z-10" style={{ borderColor: "#C9A96E10" }}>
          <div className="max-w-[1800px] mx-auto">
            <div className="flex items-center gap-6 mb-24">
              <p className="text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: "#C9A96E80" }}>
                Core Protocols
              </p>
              <OrnamentalDivider className="flex-1 max-w-xs" />
            </div>
            <div className="space-y-0">
              {values.map((val, i) => (
                <div
                  key={val.number}
                  className={`grid grid-cols-1 md:grid-cols-3 gap-12 py-20 group ${i < values.length - 1 ? "border-b" : ""}`}
                  style={i < values.length - 1 ? { borderColor: "#C9A96E10" } : {}}
                >
                  <div className="flex items-start gap-12">
                    <ClassicalNumber value={val.number} className="mt-1 opacity-50 group-hover:opacity-100 transition-opacity duration-500 shrink-0" />
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
        <section className="px-8 md:px-24 py-40 border-t relative z-10" style={{ borderColor: "#C9A96E10" }}>
          <div className="max-w-[1800px] mx-auto">
            <div className="flex items-center gap-6 mb-24">
              <p className="text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: "#C9A96E80" }}>The Architects</p>
              <OrnamentalDivider className="flex-1 max-w-xs" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4">
              {team.map((member) => (
                <div key={member.name} className="flex justify-between items-end py-10 border-b group" style={{ borderColor: "#C9A96E10" }}>
                  <span className="text-2xl font-serif group-hover:text-shadow-glow transition-all">{member.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold transition-colors" style={{ color: "#C9A96E60" }}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 md:px-24 py-40 relative z-10">
          <div className="max-w-[1800px] mx-auto relative group rounded-[60px] p-24 overflow-hidden" style={{ background: "rgba(201,169,110,0.03)", border: "1px solid #C9A96E20" }}>
            {/* Corner flourishes */}
            <CornerFlourish corner="tl" size={52} className="absolute top-6 left-6 opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            <CornerFlourish corner="tr" size={52} className="absolute top-6 right-6 opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            <CornerFlourish corner="bl" size={52} className="absolute bottom-6 left-6 opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            <CornerFlourish corner="br" size={52} className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%)" }} />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">
                  {SITE_NAME}<br /><span className="italic text-zinc-500">Season Archive</span>
                </h2>
                <p className="text-zinc-500 text-xl font-light max-w-xl">
                  서울 곳곳의 전시를 저장하고, 예약하고, 다시 돌아올 수 있는 큐레이션 아카이브를 지금 둘러보세요.
                </p>
              </div>
              <Link
                href="/exhibitions"
                className="group/btn relative px-16 py-8 overflow-hidden rounded-full text-xs tracking-[0.4em] font-bold transition-all duration-700"
                style={{ border: "1px solid #C9A96E40" }}
              >
                <span className="relative z-10 transition-colors duration-700 group-hover/btn:text-black uppercase" style={{ color: "#C9A96E" }}>ACCESS ARCHIVE</span>
                <div className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: "#C9A96E" }} />
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-20 text-center font-mono uppercase tracking-[0.5em] text-[10px]" style={{ color: "#C9A96E20" }}>
          Art Arca Curatorial Notes // Seoul Archive
        </footer>
      </AnimatedContainer>
    </div>
  );
}
