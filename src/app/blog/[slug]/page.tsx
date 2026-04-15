import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AnimatedContainer from "@/components/AnimatedContainer";
import BackgroundGlow from "@/components/BackgroundGlow";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import { OrnamentalDivider } from "@/components/ClassicalOrnament";
import { getBlogPost } from "@/lib/blog-data";
import { getExhibition } from "@/lib/data";
import { getEvent } from "@/lib/events-data";
import { SITE_NAME } from "@/lib/site";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPost(slug);

    if (!post) {
      return {
        title: `Post Not Found — ${SITE_NAME}`,
      };
    }

    return {
      title: `${post.title} — ${SITE_NAME}`,
      description: post.excerpt,
    };
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const exhibition = post.relatedExhibitionId
    ? getExhibition(post.relatedExhibitionId)
    : undefined;
  const event = post.relatedEventSlug ? getEvent(post.relatedEventSlug) : undefined;

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

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-28 pt-32 md:px-8 md:pb-36 md:pt-40">
        <AnimatedContainer>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500 transition-colors hover:text-white"
          >
            ← Back to Journal
          </Link>

          <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">
                {post.kicker}
              </p>
              <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.06em]">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{post.excerpt}</p>
              <OrnamentalDivider className="mt-8 max-w-sm" />
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#C9A96E26] bg-[#C9A96E0D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E7D1A0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A96E80]">
                Note Meta
              </p>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Category", value: post.category },
                  { label: "Published", value: post.publishedAt },
                  { label: "Read time", value: post.readTime },
                  { label: "Author", value: post.author },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {exhibition?.heroImage ? (
          <AnimatedContainer className="mt-10">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/[0.08]">
              <div className="relative aspect-[16/7]">
                <Image
                  src={exhibition.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
          </AnimatedContainer>
        ) : null}

        <AnimatedContainer className="mt-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {post.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-7 backdrop-blur-xl md:p-8"
                >
                  <h2 className="font-serif text-3xl tracking-tight text-white md:text-4xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-zinc-300 md:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="space-y-6">
              {event ? (
                <div className="rounded-[2rem] border border-[#C9A96E22] bg-[linear-gradient(180deg,rgba(201,169,110,0.08),rgba(255,255,255,0.03))] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A96E80]">
                    Related Event
                  </p>
                  <h3 className="mt-4 font-serif text-2xl tracking-tight text-white">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{event.summary}</p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#C9A96E] px-5 text-[11px] font-bold uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Open Program
                  </Link>
                </div>
              ) : null}

              {exhibition ? (
                <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A96E80]">
                    Related Exhibition
                  </p>
                  <h3 className="mt-4 font-serif text-2xl tracking-tight text-white">
                    {exhibition.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {exhibition.description}
                  </p>
                  <Link
                    href={`/exhibitions/${exhibition.id}`}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#C9A96E26] px-5 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-100 transition-colors duration-300 hover:text-white"
                  >
                    Exhibition Detail
                  </Link>
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-[#E6DAC7] bg-[linear-gradient(180deg,rgba(243,235,221,0.98),rgba(230,218,199,0.96))] p-6 text-[#171410] shadow-[0_35px_80px_-35px_rgba(0,0,0,0.45)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#5E7A73]">
                  Next Move
                </p>
                <p className="mt-4 font-serif text-2xl tracking-tight">
                  노트를 읽은 뒤에는 실제 방문 계획이나 커뮤니티 질문으로 이어져야 합니다.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/events"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white/60 px-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#171410] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Browse Agenda
                  </Link>
                  <Link
                    href="/community"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white/60 px-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#171410] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Community Hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
