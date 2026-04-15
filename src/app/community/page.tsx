import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageSquareQuote, RadioTower, Users } from "lucide-react";

import AnimatedContainer from "@/components/AnimatedContainer";
import BackgroundGlow from "@/components/BackgroundGlow";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import { OrnamentalDivider, LaurelAccent } from "@/components/ClassicalOrnament";
import {
  communityCircles,
  communityGuidelines,
  communityHighlights,
  communityOverview,
  communityPulses,
} from "@/lib/community-data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Community — ${SITE_NAME}`,
  description:
    "리뷰, 살롱, 질문 카드, 저장 이유를 한 흐름으로 묶는 Art Arca 커뮤니티 허브.",
};

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F0F0F] text-white selection:bg-white selection:text-black">
      <Navigation />
      <FilmGrain />
      <BackgroundGlow
        color="bg-amber-700"
        size="w-[760px] h-[760px]"
        className="left-[-180px] top-[-180px]"
        opacity={0.16}
      />
      <BackgroundGlow
        color="bg-emerald-700"
        size="w-[540px] h-[540px]"
        className="right-[-80px] top-[28vh]"
        opacity={0.12}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 pb-28 pt-32 md:px-8 md:pb-36 md:pt-40">
        <AnimatedContainer>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.58em] text-[#C9A96E80]">
                {communityOverview.eyebrow}
              </p>
              <LaurelAccent className="mb-8 mt-6" />
              <h1 className="font-serif text-[clamp(3.2rem,8vw,6.8rem)] leading-[0.9] tracking-[-0.06em] text-white">
                {communityOverview.title}
              </h1>
              <OrnamentalDivider className="mt-8 max-w-sm" />
            </div>

            <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg lg:justify-self-end lg:text-right">
              {communityOverview.description}
            </p>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {communityPulses.map((pulse) => (
              <div
                key={pulse.label}
                className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                  {pulse.label}
                </p>
                <p className="mt-4 font-serif text-4xl tracking-tight text-white">
                  {pulse.value}
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{pulse.note}</p>
              </div>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_360px]">
            <div className="rounded-[2.4rem] border border-white/[0.08] bg-[linear-gradient(160deg,rgba(22,19,15,0.98),rgba(8,8,8,0.98))] p-7 md:p-8">
              <div className="flex items-center gap-3 text-[#C9A96E]">
                <RadioTower size={18} />
                <p className="text-[10px] font-bold uppercase tracking-[0.36em]">
                  Active Rooms
                </p>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                {communityCircles.map((circle) => (
                  <article
                    key={circle.slug}
                    className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E80]">
                          {circle.host}
                        </p>
                        <h2 className="mt-3 font-serif text-2xl tracking-tight text-white">
                          {circle.title}
                        </h2>
                      </div>
                      <Users size={18} className="text-[#C9A96E]" />
                    </div>

                    <p className="mt-4 text-sm leading-7 text-zinc-400">{circle.summary}</p>

                    <div className="mt-5 rounded-[1.35rem] border border-[#C9A96E26] bg-[#C9A96E0D] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A96E80]">
                        Shared prompt
                      </p>
                      <p className="mt-3 text-sm leading-7 text-zinc-200">{circle.prompt}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {circle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                      <p className="text-sm text-zinc-400">{circle.nextSession}</p>
                      <Link
                        href={circle.href}
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A96E]"
                      >
                        Open room
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#E6DAC7] bg-[linear-gradient(180deg,rgba(243,235,221,0.98),rgba(230,218,199,0.96))] p-6 text-[#171410] shadow-[0_35px_80px_-35px_rgba(0,0,0,0.45)]">
              <div className="flex items-center gap-3 text-[#5E7A73]">
                <MessageSquareQuote size={18} />
                <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
                  Participation Sheet
                </p>
              </div>
              <p className="mt-5 font-serif text-3xl tracking-tight">
                좋은 커뮤니티는 감탄보다 구체적인 장면을 남깁니다.
              </p>
              <div className="mt-6 space-y-4">
                {communityGuidelines.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-black/10 bg-white/50 p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#5E7A73]">
                      0{index + 1} / {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#433D33]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-5 xl:grid-cols-3">
            {communityHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                  Current bridge
                </p>
                <h3 className="mt-4 font-serif text-[2rem] leading-tight tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{item.detail}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A96E]"
                >
                  {item.label}
                  <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="rounded-[2.2rem] border border-[#C9A96E22] bg-[linear-gradient(180deg,rgba(201,169,110,0.08),rgba(255,255,255,0.03))] p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A96E80]">
              Next step
            </p>
            <p className="mt-4 max-w-4xl font-serif text-3xl tracking-tight text-white md:text-4xl">
              다음 단계에서는 이 허브를 전시 상세의 리뷰, 행사 신청 상태, 실제 커뮤니티
              기록과 연결해 살아 있는 시스템으로 확장할 수 있습니다.
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
