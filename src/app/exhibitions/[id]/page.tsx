import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { exhibitions, getExhibition } from "../../../lib/data";
import { getExhibitionStatus, STATUS_LABEL, STATUS_STYLE } from "../../../lib/utils";
import AnimatedContainer from "../../../components/AnimatedContainer";
import BookmarkButton from "../../../components/BookmarkButton";
import ExhibitionActions, { ReservationTrigger } from "../../../components/ExhibitionActions";
import FadeIn from "../../../components/FadeIn";

export async function generateStaticParams() {
  return exhibitions.map((ex) => ({ id: ex.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ex = getExhibition(id);
  if (!ex) return { title: "Not Found" };

  const ogImage = ex.heroImage
    ? `https://art-arca.vercel.app${ex.heroImage}`
    : undefined;

  return {
    title: `${ex.title} — Art Arca`,
    description: ex.description,
    openGraph: {
      title: `${ex.title} (${ex.titleKo})`,
      description: ex.description,
      type: "article",
      ...(ogImage && { images: [{ url: ogImage, width: 1600, height: 700, alt: ex.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${ex.title} — Art Arca`,
      description: ex.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ExhibitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ex = getExhibition(id);
  if (!ex) notFound();

  const related = exhibitions.filter((e) => e.id !== ex.id).slice(0, 2);
  const status = getExhibitionStatus(ex.period);

  return (
    <AnimatedContainer>
      <div className="bg-background min-h-screen text-foreground">
        {/* Back Navigation */}
        <div className="px-6 md:px-24 pt-28 pb-0">
          <Link
            href="/exhibitions"
            className="text-[9px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            ← Exhibitions
          </Link>
        </div>

        {/* Hero */}
        <header className="px-6 md:px-24 pt-10 pb-16">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-bold">{ex.category}</span>
              <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 ${STATUS_STYLE[status]}`}>
                {STATUS_LABEL[status]}
              </span>
            </div>
            <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500">{ex.date}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9] mb-6">{ex.title}</h1>
          <p className="text-lg md:text-2xl font-serif italic text-stone-500 dark:text-stone-400">{ex.titleKo}</p>
        </header>

        {/* Hero Image */}
        <FadeIn className="px-6 md:px-24 mb-16">
          <div className="w-full aspect-[16/7] relative overflow-hidden">
            {ex.heroImage ? (
              <Image
                src={ex.heroImage} alt={`${ex.title} — ${ex.titleKo}`}
                fill className="object-cover" sizes="100vw" priority
              />
            ) : (
              <div className="w-full h-full bg-stone-300 dark:bg-stone-700" />
            )}
            <div className="absolute top-5 right-5 z-10">
              <BookmarkButton exhibitionId={ex.id} variant="card" />
            </div>
          </div>
        </FadeIn>

        {/* Content Grid */}
        <div className="px-6 md:px-24 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Main */}
            <FadeIn className="md:col-span-2">
              <p className="text-2xl font-light leading-relaxed mb-10 text-stone-700 dark:text-stone-300">{ex.description}</p>
              <div className="space-y-4">
                {ex.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-base leading-loose text-stone-600 dark:text-stone-400">{para}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-12">
                {ex.tags.map((tag) => (
                  <span key={tag} className="text-[8px] uppercase tracking-[0.2em] border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 클라이언트 인터랙션 */}
              <ExhibitionActions
                exhibitionId={ex.id}
                exhibitionTitle={ex.title}
                exhibitionTitleKo={ex.titleKo}
                exhibitionPeriod={ex.period}
              />
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={150} className="space-y-8">
              <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
                <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-2 font-bold">Artist</p>
                <p className="text-sm text-stone-800 dark:text-stone-200">{ex.artist}</p>
              </div>
              <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
                <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-2 font-bold">Period</p>
                <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">{ex.period}</p>
              </div>
              <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
                <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-2 font-bold">Location</p>
                <p className="text-sm text-stone-800 dark:text-stone-200">{ex.location}</p>
              </div>
              <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
                <ReservationTrigger
                  exhibitionTitle={ex.title}
                  exhibitionPeriod={ex.period}
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Related Exhibitions */}
        <FadeIn>
          <section className="px-6 md:px-24 py-16 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-12 font-bold">More Exhibitions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {related.map((rel) => (
                <Link key={rel.id} href={`/exhibitions/${rel.id}`} className="group flex gap-6 items-start">
                  <div className="w-24 aspect-[3/4] flex-shrink-0 overflow-hidden relative bg-stone-200 dark:bg-stone-800">
                    {rel.image ? (
                      <Image src={rel.image} alt={rel.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-300 dark:bg-stone-700 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{rel.category}</span>
                    <h3 className="text-xl font-serif mt-1 mb-1 group-hover:underline underline-offset-4">{rel.title}</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{rel.artist}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>

        <div className="pb-24" />
      </div>
    </AnimatedContainer>
  );
}
