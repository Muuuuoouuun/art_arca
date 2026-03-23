import Link from "next/link";
import AnimatedContainer from "../../components/AnimatedContainer";

export const metadata = {
  title: "About — Art Arca",
  description: "Art Arca는 예술과 대중을 연결하는 독립적인 아트 큐레이션 플랫폼입니다.",
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
    title: "예술과 대중의 거리",
    description:
      "예술은 특권이 아닙니다. 우리는 고급 미술의 언어를 해독 가능하게 만들면서도, 그 깊이와 복잡성을 잃지 않도록 균형을 찾습니다.",
  },
  {
    number: "03",
    title: "시즌 기반 에디션",
    description:
      "Art Arca는 계절과 함께 호흡합니다. 각 시즌 에디션은 그 계절의 감각을 담은 큐레이션으로, 예술이 시간 속에서 어떻게 살아 숨쉬는지를 보여줍니다.",
  },
];

const team = [
  { name: "김아현 Ah-Hyun Kim", role: "Founder & Chief Curator" },
  { name: "이준혁 Jun-Hyuk Lee", role: "Artistic Director" },
  { name: "박서연 Seo-Yeon Park", role: "Exhibition Coordinator" },
  { name: "최한울 Han-Ul Choi", role: "Digital Experience" },
];

export default function AboutPage() {
  return (
    <AnimatedContainer>
      <div className="bg-[#F2F0ED] min-h-screen text-[#1a1a1a]">
        {/* Header */}
        <header className="px-8 md:px-24 pt-28 pb-16 border-b border-stone-200">
          <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-6">About Art Arca</p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-[0.9] max-w-4xl">
            예술들의<br />집합체.
          </h1>
        </header>

        {/* Mission Statement */}
        <section className="px-8 md:px-24 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-stone-700">
                예술과 대중, 대중과 예술.<br />
                그 사이 어딘가에 Art Arca가 있습니다.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-base leading-loose text-stone-600">
                Art Arca는 2024년 서울에서 시작된 독립 아트 큐레이션 플랫폼입니다. 우리는 동시대 한국 미술을 중심으로, 회화, 조각, 사진, 영상, 사운드 아트까지 폭넓은 매체를 큐레이션합니다.
              </p>
              <p className="text-base leading-loose text-stone-600">
                'Arca'는 라틴어로 '궤', '보관함'을 뜻합니다. 예술이 잠시 머물다 가는 공간이 아니라, 소중히 보관되고 기억되는 장소를 꿈꿉니다.
              </p>
            </div>
          </div>
        </section>

        {/* Horizontal Rule */}
        <div className="px-8 md:px-24">
          <div className="border-t border-stone-200" />
        </div>

        {/* Values */}
        <section className="px-8 md:px-24 py-24">
          <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-16 font-bold">
            Our Values
          </p>
          <div className="space-y-0">
            {values.map((val, i) => (
              <div
                key={val.number}
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 py-12 ${
                  i < values.length - 1 ? "border-b border-stone-200" : ""
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-[9px] font-mono text-stone-300 mt-1">{val.number}</span>
                  <h2 className="text-xl font-serif tracking-tight">{val.title}</h2>
                </div>
                <div className="md:col-span-2">
                  <p className="text-base leading-loose text-stone-600">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Horizontal Rule */}
        <div className="px-8 md:px-24">
          <div className="border-t border-stone-200" />
        </div>

        {/* Team */}
        <section className="px-8 md:px-24 py-24">
          <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-16 font-bold">
            Team
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {team.map((member) => (
              <div key={member.name} className="flex justify-between items-baseline py-6 border-b border-stone-100">
                <span className="text-base font-serif">{member.name}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400">{member.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 md:px-24 py-24 bg-stone-900 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-3">
                Spring 2026 Collection
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                이번 시즌의 전시들을 지금 만나보세요.
              </p>
            </div>
            <Link
              href="/exhibitions"
              className="text-[10px] uppercase tracking-[0.3em] border border-white text-white px-10 py-4 hover:bg-white hover:text-stone-900 transition-all whitespace-nowrap"
            >
              View Exhibitions
            </Link>
          </div>
        </section>

        <div className="pb-0" />
      </div>
    </AnimatedContainer>
  );
}
