"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Navigation from "@/components/Navigation";
import FilmGrain from "@/components/FilmGrain";
import BackgroundGlow from "@/components/BackgroundGlow";
import AnimatedContainer from "@/components/AnimatedContainer";
import {
  GenreSelector,
  GuideHero,
  ProgramList,
  QuickFactsRail,
  SectionRenderer,
} from "@/components/guide";
import type { GuideProgram, GuideSection } from "@/components/guide";
import type {
  GuideGenreData,
  GuideGenreSlug,
  GuideProgramItem,
} from "@/lib/guide-data";

function mapProgramStatus(status: GuideProgramItem["status"]): GuideProgram["status"] {
  if (status === "ongoing") return "current";
  return status;
}

function createPreviewSections(genre: GuideGenreData): GuideSection[] {
  return genre.sections.slice(0, 2).map((section, index) => ({
    id: `${genre.slug}-preview-${index + 1}`,
    eyebrow: index === 0 ? "입문 가이드" : "감상 포인트",
    title: section.title,
    description: section.lead,
    tone: index % 2 === 0 ? "dark" : "paper",
    blocks: [
      {
        kind: "text",
        lead: section.lead,
        body: section.body,
      },
      {
        kind: "list",
        title: "핵심 포인트",
        items: section.bullets,
      },
      ...(section.note
        ? [
            {
              kind: "callout" as const,
              label: "Guide note",
              title: "먼저 알고 가면 좋은 한 줄",
              body: section.note,
            },
          ]
        : []),
    ],
  }));
}

function createPreviewPrograms(genre: GuideGenreData): GuideProgram[] {
  return genre.currentPrograms.map((program, index) => ({
    id: `${genre.slug}-program-${index + 1}`,
    title: program.title,
    genre: genre.nameKo,
    venue: program.venue,
    city: program.city,
    period: program.period,
    status: mapProgramStatus(program.status),
    description: `${program.description} ${program.recommendation}`,
    tags: program.tags,
    metadata: [
      ...program.metadata,
      { label: "예매 힌트", value: program.bookingHint },
    ],
    featured: index === 0,
  }));
}

export default function GuideHubClient({
  genres,
}: {
  genres: GuideGenreData[];
}) {
  const [selectedSlug, setSelectedSlug] = useState<GuideGenreSlug>(genres[0]?.slug ?? "exhibition");

  const selectedGenre = useMemo(
    () => genres.find((genre) => genre.slug === selectedSlug) ?? genres[0],
    [genres, selectedSlug]
  );

  if (!selectedGenre) return null;

  const previewSections = createPreviewSections(selectedGenre);
  const previewPrograms = createPreviewPrograms(selectedGenre);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F0F0F] text-white selection:bg-white selection:text-black">
      <Navigation />
      <FilmGrain />
      <BackgroundGlow
        color="bg-amber-700"
        size="w-[720px] h-[720px]"
        className="left-[-180px] top-[-180px]"
        opacity={0.16}
      />
      <BackgroundGlow
        color="bg-emerald-700"
        size="w-[520px] h-[520px]"
        className="right-[-80px] top-[28vh]"
        opacity={0.12}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 pb-28 pt-32 md:px-8 md:pb-32 md:pt-40">
        <AnimatedContainer>
          <GuideHero
            eyebrow="Essential Guide"
            title="장르를 고르면, 감상법과 현재 프로그램이 함께 열립니다"
            description="전시, 음악, 오페라, 연극, 무용은 같은 문화 일정처럼 보여도 읽는 방식은 모두 다릅니다. 이 가이드는 장르별 입문 포인트, 감상 키워드, 자주 나오는 용어, 그리고 지금 확인할 프로그램 정보를 한 흐름으로 묶어 둡니다."
            note="Choose a discipline, then move from basic understanding to current programs."
            actions={[
              { label: "Registry 보기", href: "/exhibitions", variant: "primary" },
              { label: `${selectedGenre.nameKo} 상세 읽기`, href: `/guide/${selectedGenre.slug}`, variant: "secondary" },
            ]}
            stats={[
              {
                label: "장르 수",
                value: genres.length.toString().padStart(2, "0"),
                detail: "기초 지식과 프로그램 정보가 묶인 카테고리",
              },
              {
                label: "현재 선택",
                value: selectedGenre.nameKo,
                detail: selectedGenre.nameEn,
              },
              {
                label: "프로그램",
                value: selectedGenre.currentPrograms.length.toString().padStart(2, "0"),
                detail: "선택 장르 기준 샘플 일정",
              },
            ]}
            aside={
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                  현재 포커스
                </p>
                <p className="font-serif text-3xl tracking-tight text-white">
                  {selectedGenre.heroTitle}
                </p>
                <p className="text-sm leading-7 text-zinc-400">
                  {selectedGenre.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedGenre.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[#C9A96E26] bg-[#C9A96E0D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E7D1A0]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
        </AnimatedContainer>

        <AnimatedContainer className="mt-8">
          <GenreSelector
            label="Genre switcher"
            genres={genres.map((genre) => ({
              id: genre.slug,
              name: genre.nameKo,
              description: genre.summary,
              count: genre.currentPrograms.length.toString().padStart(2, "0"),
              accent: genre.nameEn,
            }))}
            value={selectedGenre.slug}
            onChange={(value) => setSelectedSlug(value as GuideGenreSlug)}
          />
        </AnimatedContainer>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <AnimatedContainer>
            <QuickFactsRail
              label={`${selectedGenre.nameKo} quick facts`}
              facts={selectedGenre.quickFacts.map((fact, index) => ({
                label: fact.label,
                value: fact.value,
                detail: fact.detail,
                tone: index % 3 === 1 ? "oxide" : index % 3 === 2 ? "paper" : "gold",
              }))}
            />
          </AnimatedContainer>

          <AnimatedContainer>
            <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">
                선택한 장르
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[0.94] tracking-[-0.05em] text-white md:text-5xl">
                {selectedGenre.nameKo}
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300">
                {selectedGenre.heroLead}
              </p>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {selectedGenre.heroBody}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/guide/${selectedGenre.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#C9A96E] px-5 text-[11px] font-bold uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  상세 보기
                </Link>
                <Link
                  href="#current-programs"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C9A96E26] px-5 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-100 transition-colors duration-300 hover:text-white"
                >
                  프로그램 확인
                </Link>
              </div>
            </div>
          </AnimatedContainer>
        </div>

        <AnimatedContainer className="mt-8">
          <SectionRenderer sections={previewSections} />
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div id="current-programs">
            <ProgramList
              label={`${selectedGenre.nameKo} 현재 프로그램`}
              items={previewPrograms}
            />
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
