import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

import AnimatedContainer from "@/components/AnimatedContainer";
import BackgroundGlow from "@/components/BackgroundGlow";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import { OrnamentalDivider, LaurelAccent } from "@/components/ClassicalOrnament";
import { getExhibition } from "@/lib/data";
import {
  events,
  getEventFormatLabel,
  getEventStatusLabel,
} from "@/lib/events-data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Events — ${SITE_NAME}`,
  description:
    "살롱, 워크숍, 야간 관람 루트까지. Art Arca 시즌을 실제 방문 계획으로 연결하는 행사 정보 보드.",
};

const featuredEvent = events[0];
const limitedEvents = events.filter((event) => event.status === "limited").length;

export default function EventsPage() {
  const featuredExhibition = featuredEvent.relatedExhibitionId
    ? getExhibition(featuredEvent.relatedExhibitionId)
    : undefined;

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
        className="right-[-80px] top-[30vh]"
        opacity={0.12}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 pb-28 pt-32 md:px-8 md:pb-36 md:pt-40">
        <AnimatedContainer>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.58em] text-[#C9A96E80]">
                Season Agenda
              </p>
              <LaurelAccent className="mb-8 mt-6" />
              <h1 className="font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] tracking-[-0.06em] text-white">
                행사 정보는
                <br />
                <span className="italic text-zinc-500">방문 동선의 시작점입니다.</span>
              </h1>
              <OrnamentalDivider className="mt-8 max-w-sm" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Programs",
                  value: events.length.toString().padStart(2, "0"),
                  detail: "현재 시즌 기준 공개된 행사 수",
                },
                {
                  label: "Limited",
                  value: limitedEvents.toString().padStart(2, "0"),
                  detail: "좌석 또는 재료 수가 제한된 회차",
                },
                {
                  label: "Mode",
                  value: "Salon / Route / Workshop",
                  detail: "정보를 행동으로 바꾸는 세 가지 방식",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-serif text-3xl leading-tight tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_360px]">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[linear-gradient(160deg,rgba(22,19,15,0.98),rgba(9,9,9,0.98))] p-7 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C9A96E80]">
                    Featured Program
                  </p>
                  <h2 className="mt-4 font-serif text-4xl tracking-tight text-white md:text-5xl">
                    {featuredEvent.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
                    {featuredEvent.subtitle}
                  </p>
                </div>

                <div className="rounded-full border border-[#C9A96E26] bg-[#C9A96E12] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#E7D1A0]">
                  {getEventStatusLabel(featuredEvent.status)}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-5">
                  <CalendarClock className="text-[#C9A96E]" size={18} />
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Schedule
                  </p>
                  <p className="mt-2 text-lg font-serif text-white">{featuredEvent.date}</p>
                  <p className="mt-1 text-sm text-zinc-400">{featuredEvent.time}</p>
                </div>
                <div className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-5">
                  <MapPin className="text-[#C9A96E]" size={18} />
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Venue
                  </p>
                  <p className="mt-2 text-lg font-serif text-white">{featuredEvent.venue}</p>
                  <p className="mt-1 text-sm text-zinc-400">{featuredEvent.district}</p>
                </div>
                <div className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-5">
                  <Users className="text-[#C9A96E]" size={18} />
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Entry
                  </p>
                  <p className="mt-2 text-lg font-serif text-white">{featuredEvent.capacity}</p>
                  <p className="mt-1 text-sm text-zinc-400">{featuredEvent.entry}</p>
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
                {featuredEvent.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#C9A96E] px-6 text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Program Detail
                </Link>
                {featuredExhibition ? (
                  <Link
                    href={`/exhibitions/${featuredExhibition.id}`}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9A96E26] px-6 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-100 transition-colors duration-300 hover:text-white"
                  >
                    Related Exhibition
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C9A96E80]">
                How To Read This Board
              </p>
              <div className="mt-6 space-y-4">
                {[
                  "먼저 날짜보다 포맷을 보세요. 살롱인지, 워크숍인지에 따라 기대해야 할 리듬이 달라집니다.",
                  "행사 정보는 전시 상세와 연결됩니다. 관련 전시 링크를 따라가면 관람 맥락이 훨씬 빨리 잡힙니다.",
                  "야간 루트와 재질 워크숍처럼 전시 바깥의 행동을 만드는 회차부터 채워 두는 편이 좋습니다.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[1.6rem] border border-white/[0.08] bg-black/20 p-5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E80]">
                      0{index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-5 xl:grid-cols-2">
            {events.map((event) => {
              const exhibition = event.relatedExhibitionId
                ? getExhibition(event.relatedExhibitionId)
                : undefined;

              return (
                <article
                  key={event.slug}
                  className="group rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl md:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                        {event.chapter}
                      </p>
                      <h3 className="mt-4 font-serif text-[2rem] leading-tight tracking-tight text-white">
                        {event.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                        {getEventFormatLabel(event.format)}
                      </span>
                      <span className="rounded-full border border-[#C9A96E26] bg-[#C9A96E0D] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#E7D1A0]">
                        {getEventStatusLabel(event.status)}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">{event.summary}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                        Time
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white">
                        {event.date} / {event.time}
                      </p>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                        Place
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white">
                        {event.venue} / {event.district}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                    <div className="text-sm text-zinc-400">
                      {exhibition ? (
                        <span>
                          Related: <span className="text-zinc-200">{exhibition.title}</span>
                        </span>
                      ) : (
                        <span>{event.host}</span>
                      )}
                    </div>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A96E] transition-transform duration-300 group-hover:-translate-y-0.5"
                    >
                      Open program
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="rounded-[2.2rem] border border-[#C9A96E22] bg-[linear-gradient(180deg,rgba(201,169,110,0.08),rgba(255,255,255,0.03))] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-[#C9A96E]">
                  <Sparkles size={18} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.36em]">
                    Planning Note
                  </p>
                </div>
                <p className="mt-4 font-serif text-3xl tracking-tight text-white md:text-4xl">
                  이 보드는 캘린더보다 방문 리듬을 먼저 보여 줍니다.
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                  다음 단계는 이 데이터 구조를 기준으로 날짜 필터, 회차 상태, 지역별
                  탐색을 붙여 실제 일정 탐색 보드로 확장하는 것입니다.
                </p>
              </div>
              <Link
                href="/community"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9A96E26] px-6 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-100 transition-colors duration-300 hover:text-white"
              >
                Community Signals
              </Link>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
