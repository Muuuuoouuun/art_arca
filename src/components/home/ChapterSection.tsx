"use client";

import Link from "next/link";

import AnimatedContainer from "../AnimatedContainer";
import GlassCard from "../GlassCard";
import { OrnamentalDivider } from "../ClassicalOrnament";
import { blogPosts } from "@/lib/blog-data";
import { communityCircles } from "@/lib/community-data";
import { events } from "@/lib/events-data";

const featureCards = [
  {
    id: "agenda",
    title: "Season Agenda",
    eyebrow: "Visit Planning",
    href: "/events",
    count: events.length.toString().padStart(2, "0"),
    summary:
      "살롱, 워크숍, 야간 루트까지. 방문 계획이 실제 행동으로 이어지도록 이번 시즌 프로그램을 따로 모았습니다.",
    footer: `${events[0]?.date} / ${events[0]?.title}`,
    tone: "dark",
  },
  {
    id: "journal",
    title: "Field Journal",
    eyebrow: "Editorial Notes",
    href: "/blog",
    count: blogPosts.length.toString().padStart(2, "0"),
    summary:
      "전시를 읽는 방식, 서울의 밤 루트, 살롱의 의미를 짧고 정확한 노트로 정리한 에디토리얼 아카이브입니다.",
    footer: blogPosts[0]?.title ?? "Latest note",
    tone: "paper",
  },
  {
    id: "community",
    title: "Community Signals",
    eyebrow: "Resonance Lounge",
    href: "/community",
    count: communityCircles.length.toString().padStart(2, "0"),
    summary:
      "리뷰 수보다 감상의 밀도를 더 중요하게 보는 대화 방들입니다. 살롱과 노트, 저장 이유가 이곳에서 이어집니다.",
    footer: communityCircles[0]?.title ?? "Open room",
    tone: "glass",
  },
];

export default function ChapterSection() {
  return (
    <section id="chapters" className="relative px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1800px]">
        <AnimatedContainer>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em]"
                style={{ color: "#C9A96E80" }}
              >
                Next Chapters
              </p>
              <h2 className="text-5xl font-serif leading-[0.92] tracking-tight md:text-7xl">
                The season now opens
                <br />
                into <span className="italic text-zinc-500">three more rooms.</span>
              </h2>
              <OrnamentalDivider className="mt-8 max-w-sm" />
            </div>

            <p className="max-w-2xl text-base leading-7 text-zinc-400 md:text-lg lg:justify-self-end lg:text-right">
              홈이 전시 아카이브의 입구였다면, 이제부터는 방문 계획을 짜는 행사 보드와
              에디토리얼 노트, 감상이 이어지는 커뮤니티 허브로 자연스럽게 이동할 수
              있습니다.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimatedContainer>
            <Link
              href={featureCards[0].href}
              className="group block h-full overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[linear-gradient(160deg,rgba(24,20,16,0.98),rgba(8,8,8,0.98))] p-7 md:p-8"
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">
                    {featureCards[0].eyebrow}
                  </p>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl">
                        {featureCards[0].title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                        {featureCards[0].summary}
                      </p>
                    </div>
                    <p className="font-serif text-5xl tracking-tight text-white/20">
                      {featureCards[0].count}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <GlassCard className="rounded-[1.8rem] border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                      Opening program
                    </p>
                    <p className="mt-3 text-xl font-serif tracking-tight text-white">
                      {featureCards[0].footer}
                    </p>
                  </GlassCard>
                  <div className="flex items-end justify-between rounded-[1.8rem] border border-[#C9A96E26] bg-[#C9A96E0D] p-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A96E80]">
                        Open chapter
                      </p>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">
                        살롱, 워크숍, 야간 루트를 한 보드에서 확인합니다.
                      </p>
                    </div>
                    <span className="text-2xl text-[#C9A96E] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedContainer>

          <div className="grid gap-6">
            {featureCards.slice(1).map((card, index) => {
              const isPaper = card.tone === "paper";

              return (
                <AnimatedContainer key={card.id} delay={index * 0.05}>
                  <Link
                    href={card.href}
                    className={`group block overflow-hidden rounded-[2.2rem] border p-6 md:p-7 ${
                      isPaper
                        ? "border-[#E6DAC7] bg-[linear-gradient(180deg,rgba(243,235,221,0.98),rgba(230,218,199,0.96))] text-[#171410]"
                        : "border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] text-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-[0.35em] ${
                            isPaper ? "text-[#5E7A73]" : "text-[#C9A96E80]"
                          }`}
                        >
                          {card.eyebrow}
                        </p>
                        <h3 className="mt-4 font-serif text-3xl tracking-tight md:text-[2.2rem]">
                          {card.title}
                        </h3>
                      </div>
                      <p className={`font-serif text-4xl ${isPaper ? "text-[#171410]/20" : "text-white/20"}`}>
                        {card.count}
                      </p>
                    </div>

                    <p className={`mt-5 text-sm leading-7 ${isPaper ? "text-[#433D33]" : "text-zinc-400"}`}>
                      {card.summary}
                    </p>

                    <div
                      className={`mt-6 flex items-center justify-between border-t pt-4 text-[11px] font-bold uppercase tracking-[0.28em] ${
                        isPaper ? "border-black/10 text-[#433D33]" : "border-white/[0.08] text-zinc-400"
                      }`}
                    >
                      <span>{card.footer}</span>
                      <span className={isPaper ? "text-[#5E7A73]" : "text-[#C9A96E]"}>→</span>
                    </div>
                  </Link>
                </AnimatedContainer>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
