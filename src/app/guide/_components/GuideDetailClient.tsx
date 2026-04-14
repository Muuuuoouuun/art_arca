"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Navigation from "@/components/Navigation";
import FilmGrain from "@/components/FilmGrain";
import BackgroundGlow from "@/components/BackgroundGlow";
import AnimatedContainer from "@/components/AnimatedContainer";
import {
  GenreSelector,
  GuideHero,
  KnowledgeAccordion,
  ProgramList,
  QuickFactsRail,
  SectionRenderer,
} from "@/components/guide";
import type {
  GuideAccordionGroup,
  GuideProgram,
  GuideSection as GuideRenderedSection,
} from "@/components/guide";
import type {
  GuideGenreData,
  GuideProgramItem,
} from "@/lib/guide-data";

function mapProgramStatus(status: GuideProgramItem["status"]): GuideProgram["status"] {
  if (status === "ongoing") return "current";
  return status;
}

function createRenderedSections(genre: GuideGenreData): GuideRenderedSection[] {
  return genre.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    eyebrow: index === 0 ? "입문 가이드" : index === 1 ? "관람 포인트" : "현재 프로그램 읽기",
    title: section.title,
    description: section.lead,
    tone: index === 1 ? "paper" : "dark",
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
              label: "Field note",
              title: "현장에서 먼저 챙길 것",
              body: section.note,
            },
          ]
        : []),
    ],
  }));
}

function createAccordionGroups(genre: GuideGenreData): GuideAccordionGroup[] {
  return [
    {
      id: "glossary",
      eyebrow: "Glossary",
      title: "자주 나오는 용어",
      description: "장르 입문에서 가장 자주 막히는 단어를 먼저 정리했습니다.",
      items: genre.glossary.map((entry, index) => ({
        id: `glossary-${index}`,
        title: entry.term,
        meta: entry.reading,
        body: (
          <div className="space-y-3">
            <p>{entry.definition}</p>
            {entry.example ? <p className="text-zinc-400">예시: {entry.example}</p> : null}
            {entry.relatedTerms?.length ? (
              <p className="text-zinc-500">연관 용어: {entry.relatedTerms.join(", ")}</p>
            ) : null}
          </div>
        ),
      })),
    },
    {
      id: "faq",
      eyebrow: "FAQ",
      title: "처음 볼 때 자주 생기는 질문",
      description: "막연한 불안 대신, 실제로 필요한 준비만 남기는 짧은 답변입니다.",
      items: genre.faq.map((entry, index) => ({
        id: `faq-${index}`,
        title: entry.question,
        body: <p>{entry.answer}</p>,
      })),
    },
  ];
}

function createProgramCards(genre: GuideGenreData): GuideProgram[] {
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
    href: genre.slug === "exhibition" ? "/exhibitions" : undefined,
    featured: index === 0,
  }));
}

export default function GuideDetailClient({
  genres,
  genre,
}: {
  genres: GuideGenreData[];
  genre: GuideGenreData;
}) {
  const router = useRouter();

  const renderedSections = createRenderedSections(genre);
  const accordionGroups = createAccordionGroups(genre);
  const programCards = createProgramCards(genre);
  const chapterLinks = [
    { href: "#genre-selector", label: "장르 선택" },
    ...renderedSections.map((section) => ({ href: `#${section.id}`, label: section.title })),
    { href: "#guide-programs", label: "현재 프로그램" },
    { href: "#guide-knowledge", label: "용어 / FAQ" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F0F0F] text-white selection:bg-white selection:text-black">
      <Navigation />
      <FilmGrain />
      <BackgroundGlow
        color="bg-amber-700"
        size="w-[760px] h-[760px]"
        className="left-[-180px] top-[-200px]"
        opacity={0.16}
      />
      <BackgroundGlow
        color="bg-emerald-700"
        size="w-[520px] h-[520px]"
        className="right-[-80px] top-[24vh]"
        opacity={0.12}
      />
      <BackgroundGlow
        color="bg-sky-800"
        size="w-[840px] h-[840px]"
        className="bottom-[-320px] left-[10%]"
        opacity={0.1}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 pb-28 pt-32 md:px-8 md:pb-36 md:pt-40">
        <AnimatedContainer>
          <GuideHero
            eyebrow={`${genre.nameKo} Essential`}
            title={genre.heroTitle}
            description={genre.heroBody}
            note={`${genre.nameEn} / Basic literacy, viewing cues, and current programs`}
            actions={[
              { label: "전체 Guide", href: "/guide", variant: "secondary" },
              {
                label: genre.slug === "exhibition" ? "Registry 보기" : "현재 프로그램 보기",
                href: genre.slug === "exhibition" ? "/exhibitions" : "#guide-programs",
                variant: "primary",
              },
            ]}
            stats={[
              {
                label: "핵심 섹션",
                value: genre.sections.length.toString().padStart(2, "0"),
                detail: "입문, 감상, 프로그램 읽기",
              },
              {
                label: "용어 수",
                value: genre.glossary.length.toString().padStart(2, "0"),
                detail: "기본 문법부터 먼저 익히기",
              },
              {
                label: "프로그램",
                value: genre.currentPrograms.length.toString().padStart(2, "0"),
                detail: "현재 확인할 샘플 일정",
              },
            ]}
            aside={
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                  Genre cue
                </p>
                <p className="font-serif text-3xl tracking-tight text-white">
                  {genre.heroLead}
                </p>
                <p className="text-sm leading-7 text-zinc-400">
                  {genre.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {genre.keywords.map((keyword) => (
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

        <div id="genre-selector">
          <AnimatedContainer className="mt-8">
            <GenreSelector
              label="Genre switcher"
              genres={genres.map((item) => ({
                id: item.slug,
                name: item.nameKo,
                description: item.summary,
                count: item.currentPrograms.length.toString().padStart(2, "0"),
                accent: item.nameEn,
              }))}
              value={genre.slug}
              onChange={(value) => router.push(`/guide/${value}`)}
            />
          </AnimatedContainer>
        </div>

        <AnimatedContainer className="mt-6">
          <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl md:p-5">
            <div className="flex flex-wrap items-center gap-3">
              {chapterLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center rounded-full border border-white/[0.08] px-4 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-300 transition-colors hover:border-[#C9A96E33] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <AnimatedContainer>
            <QuickFactsRail
              label={`${genre.nameKo} quick facts`}
              facts={genre.quickFacts.map((fact, index) => ({
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
                장르 읽기
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.05em] text-white md:text-5xl">
                무엇을 먼저 보고,
                <br />
                무엇을 나중에 읽을지.
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300">
                이 페이지는 장르별 감상 문법을 먼저 정리한 뒤, 실제 프로그램을 읽는 순서로 설계했습니다.
                처음 보는 사람도 바로 일정과 예매 맥락으로 이어질 수 있게 만드는 것이 목표입니다.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  "입문 포인트를 먼저 이해합니다.",
                  "장면과 리듬의 핵심을 잡습니다.",
                  "그 다음 실제 프로그램을 고릅니다.",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[22px] border border-white/[0.08] bg-black/20 px-4 py-4 text-sm leading-6 text-zinc-300"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A96E80]">
                      0{index + 1}
                    </p>
                    <p className="mt-2">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContainer>
        </div>

        <AnimatedContainer className="mt-8">
          <SectionRenderer sections={renderedSections} />
        </AnimatedContainer>

        <div id="guide-programs">
          <AnimatedContainer className="mt-10">
            <ProgramList
              label={`${genre.nameKo} 현재 프로그램`}
              items={programCards}
            />
          </AnimatedContainer>
        </div>

        <div id="guide-knowledge">
          <AnimatedContainer className="mt-10">
            <KnowledgeAccordion groups={accordionGroups} />
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
}
