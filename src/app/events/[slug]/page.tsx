import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, MapPin, Ticket, Users } from "lucide-react";

import AnimatedContainer from "@/components/AnimatedContainer";
import BackgroundGlow from "@/components/BackgroundGlow";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import { OrnamentalDivider } from "@/components/ClassicalOrnament";
import { getExhibition } from "@/lib/data";
import {
  getEvent,
  getEventFormatLabel,
  getEventStatusLabel,
} from "@/lib/events-data";
import { SITE_NAME } from "@/lib/site";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const event = getEvent(slug);

    if (!event) {
      return {
        title: `Event Not Found — ${SITE_NAME}`,
      };
    }

    return {
      title: `${event.title} — ${SITE_NAME}`,
      description: event.summary,
    };
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    notFound();
  }

  const exhibition = event.relatedExhibitionId
    ? getExhibition(event.relatedExhibitionId)
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

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-28 pt-32 md:px-8 md:pb-36 md:pt-40">
        <AnimatedContainer>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500 transition-colors hover:text-white"
          >
            ← Back to Agenda
          </Link>

          <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_360px]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#C9A96E26] bg-[#C9A96E0D] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#E7D1A0]">
                  {getEventStatusLabel(event.status)}
                </span>
                <span className="rounded-full border border-white/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                  {getEventFormatLabel(event.format)}
                </span>
              </div>

              <h1 className="mt-6 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.06em]">
                {event.title}
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-300">
                {event.subtitle}
              </p>
              <OrnamentalDivider className="mt-8 max-w-sm" />
              <p className="mt-8 max-w-4xl text-base leading-8 text-zinc-400 md:text-lg">
                {event.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-[#C9A96E]">
                  <CalendarClock size={18} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
                    Schedule
                  </p>
                </div>
                <p className="mt-4 font-serif text-2xl tracking-tight text-white">
                  {event.date}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{event.time}</p>
              </div>

              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-[#C9A96E]">
                  <MapPin size={18} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
                    Venue
                  </p>
                </div>
                <p className="mt-4 font-serif text-2xl tracking-tight text-white">
                  {event.venue}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{event.district}</p>
              </div>

              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-3 text-[#C9A96E]">
                      <Users size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
                        Capacity
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-zinc-300">{event.capacity}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-[#C9A96E]">
                      <Ticket size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
                        Entry
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-zinc-300">{event.entry}</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-white/[0.08] pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Host
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{event.host}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-7 backdrop-blur-xl md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C9A96E80]">
                Program Structure
              </p>
              <div className="mt-7 space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={item.label} className="relative pl-12">
                    {index !== event.agenda.length - 1 ? (
                      <span className="absolute left-[18px] top-10 h-[calc(100%+14px)] w-px bg-white/[0.08]" />
                    ) : null}
                    <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A96E26] bg-[#C9A96E12] text-sm font-serif text-[#E7D1A0]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5">
                      <p className="text-xl font-serif tracking-tight text-white">
                        {item.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#E6DAC7] bg-[linear-gradient(180deg,rgba(243,235,221,0.98),rgba(230,218,199,0.96))] p-6 text-[#171410] shadow-[0_35px_80px_-35px_rgba(0,0,0,0.45)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#5E7A73]">
                  What You Leave With
                </p>
                <div className="mt-5 space-y-4">
                  {event.takeaways.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-black/10 bg-white/50 p-4"
                    >
                      <p className="text-sm leading-7 text-[#433D33]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A96E80]">
                  Attendance Notes
                </p>
                <div className="mt-5 space-y-4">
                  {event.notes.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4"
                    >
                      <p className="text-sm leading-7 text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {exhibition ? (
          <AnimatedContainer className="mt-10">
            <div className="rounded-[2.2rem] border border-[#C9A96E22] bg-[linear-gradient(180deg,rgba(201,169,110,0.08),rgba(255,255,255,0.03))] p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A96E80]">
                Related Exhibition
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-white md:text-4xl">
                {exhibition.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
                이 프로그램은 {exhibition.titleKo}를 더 길게 읽기 위한 확장 동선입니다.
                전시 상세의 커뮤니티, 정보, 인사이트 레이어를 함께 보면 행사 경험이 더
                선명해집니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/exhibitions/${exhibition.id}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#C9A96E] px-6 text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open Exhibition
                </Link>
                <Link
                  href="/community"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9A96E26] px-6 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-100 transition-colors duration-300 hover:text-white"
                >
                  Community Hub
                </Link>
              </div>
            </div>
          </AnimatedContainer>
        ) : null}
      </div>
    </div>
  );
}
