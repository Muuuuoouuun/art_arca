import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, NotebookPen, PenSquare, TimerReset } from "lucide-react";

import AnimatedContainer from "@/components/AnimatedContainer";
import BackgroundGlow from "@/components/BackgroundGlow";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import { OrnamentalDivider, LaurelAccent } from "@/components/ClassicalOrnament";
import { blogPosts } from "@/lib/blog-data";
import { getExhibition } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog — ${SITE_NAME}`,
  description:
    "전시 읽기, 서울의 야간 루트, 살롱과 커뮤니티에 대한 에디토리얼 노트를 모아 두는 필드 저널.",
};

const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
const remainingPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);

export default function BlogPage() {
  const featuredExhibition = featuredPost.relatedExhibitionId
    ? getExhibition(featuredPost.relatedExhibitionId)
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
        color="bg-sky-800"
        size="w-[900px] h-[900px]"
        className="bottom-[-320px] left-[10%]"
        opacity={0.1}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 pb-28 pt-32 md:px-8 md:pb-36 md:pt-40">
        <AnimatedContainer>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.58em] text-[#C9A96E80]">
                Field Journal
              </p>
              <LaurelAccent className="mb-8 mt-6" />
              <h1 className="font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] tracking-[-0.06em] text-white">
                블로그는 업데이트 피드가 아니라
                <br />
                <span className="italic text-zinc-500">큐레이터의 작업 노트입니다.</span>
              </h1>
              <OrnamentalDivider className="mt-8 max-w-sm" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Notes",
                  value: blogPosts.length.toString().padStart(2, "0"),
                  detail: "현재 공개된 에디토리얼 노트 수",
                },
                {
                  label: "Mode",
                  value: "Route / Viewing / Community",
                  detail: "관람과 행동을 연결하는 세 가지 문맥",
                },
                {
                  label: "Pace",
                  value: "Short, precise, reusable",
                  detail: "빠르게 읽히지만 오래 참조되는 노트 구조",
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
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[linear-gradient(160deg,rgba(21,18,16,0.98),rgba(9,9,9,0.98))] p-7 md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C9A96E80]">
                    {featuredPost.kicker}
                  </p>
                  <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#C9A96E26] bg-[#C9A96E0D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E7D1A0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                    <span>{featuredPost.category}</span>
                    <span>{featuredPost.publishedAt}</span>
                    <span>{featuredPost.readTime}</span>
                    <span className="text-[#C9A96E]">Read note →</span>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-4">
                  {featuredExhibition?.heroImage ? (
                    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08]">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={featuredExhibition.heroImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                      Related exhibition
                    </p>
                    <p className="mt-2 font-serif text-2xl tracking-tight text-white">
                      {featuredExhibition?.title ?? "Editorial note"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <div className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C9A96E80]">
                Why This Layer Exists
              </p>
              <div className="mt-6 space-y-4">
                {[
                  {
                    icon: NotebookPen,
                    title: "관람 문법을 설명합니다",
                    detail: "가이드보다 짧고, 상세 페이지보다 넓은 문맥을 제공합니다.",
                  },
                  {
                    icon: PenSquare,
                    title: "행사와 커뮤니티를 이어 줍니다",
                    detail: "살롱과 워크숍이 왜 필요한지 에디토리얼 문장으로 묶어 줍니다.",
                  },
                  {
                    icon: TimerReset,
                    title: "다시 찾아볼 수 있게 남깁니다",
                    detail: "피드처럼 흘러가기보다 나중에도 참고 가능한 기록물로 구성합니다.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.6rem] border border-white/[0.08] bg-black/20 p-5"
                    >
                      <Icon size={18} className="text-[#C9A96E]" />
                      <p className="mt-4 font-serif text-xl tracking-tight text-white">
                        {item.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{item.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10">
          <div className="grid gap-5 xl:grid-cols-3">
            {remainingPosts.map((post) => {
              const exhibition = post.relatedExhibitionId
                ? getExhibition(post.relatedExhibitionId)
                : undefined;

              return (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl"
                >
                  {exhibition?.image ? (
                    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08]">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={exhibition.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  ) : null}

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                    {post.kicker}
                  </p>
                  <h3 className="mt-4 font-serif text-[2rem] leading-tight tracking-tight text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">{post.excerpt}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
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
                      {post.publishedAt} / {post.readTime}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A96E] transition-transform duration-300 group-hover:-translate-y-0.5"
                    >
                      Read note
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
