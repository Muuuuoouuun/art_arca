import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { exhibitions, getExhibition } from "../../../lib/data";
import { getExhibitionStatus, STATUS_LABEL, STATUS_STYLE } from "../../../lib/utils";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ParallaxImage from "../../../components/ParallaxImage";
import { FloatingIconicObject, GlyphArtifact } from "../../../components/FloatingIconicObject";
import FilmGrain from "../../../components/FilmGrain";
import BackgroundGlow from "../../../components/BackgroundGlow";
import BookmarkButton from "../../../components/BookmarkButton";
import ShareButtons from "../../../components/ShareButtons";
import ReservationModal from "../../../components/ReservationModal";
import ExhibitionTabs from "../../../components/ExhibitionTabs";
import { OrnamentalDivider } from "../../../components/ClassicalOrnament";
import { SITE_NAME_UPPER, SITE_NAME } from "@/lib/site";

export async function generateStaticParams() {
  return exhibitions.map((ex) => ({ id: ex.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ex = getExhibition(id);
  if (!ex) return { title: "Not Found" };

  return {
    title: `${ex.title} — ${SITE_NAME}`,
    description: ex.description,
  };
}

export default async function ExhibitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ex = getExhibition(id);
  if (!ex) notFound();

  const related = exhibitions.filter((e) => e.id !== ex.id).slice(0, 3);
  const status = getExhibitionStatus(ex.period);

  return (
    <div className="bg-[#141414] min-h-screen text-white selection:bg-white selection:text-black relative overflow-hidden">
      <FilmGrain />
      <BackgroundGlow color="bg-zinc-600" size="w-[1000px] h-[1000px]" className="top-[-500px] right-[-200px]" opacity={0.18} />
      
      {/* Dynamic Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-serif tracking-[0.5em] hover:italic transition-all">{SITE_NAME_UPPER}</Link>
        <Link href="/exhibitions" className="text-[10px] uppercase tracking-[0.3em] border-b border-white/20 pb-1 hover:border-white transition-all">Back to Index</Link>
      </nav>

      {/* Editorial Hero */}
      <section className="relative h-[100vh] flex flex-col justify-end px-8 md:px-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src={ex.heroImage!} alt={ex.title} className="opacity-60 grayscale-[40%] hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          {/* Renaissance vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #050505 100%)" }} />
        </div>
        
        {/* Floating Iconic Object in Detail Hero */}
        {ex.iconicObject && (
          <FloatingIconicObject 
            src={ex.iconicObject.image} 
            alt={ex.iconicObject.name} 
            side="right"
            className="top-[10%] opacity-90 scale-125"
          />
        )}

        {/* Visual-First Editorial Glyphs */}
        <div className="absolute left-10 top-[30%] hidden xl:flex flex-col gap-12 z-20">
          <GlyphArtifact label="Archive ID" value={ex.id.slice(0,8).toUpperCase()} />
          <GlyphArtifact label="Object Class" value="Iconic Masterpiece" />
          <GlyphArtifact label="Ref. System" value="Cabinet Layout" />
        </div>
        
        <div className="relative z-10 max-w-[1400px]">
          <AnimatedContainer delay={0.2}>
            <div className="flex items-center gap-6 mb-8">
              <span className="text-zinc-500 text-xs tracking-[0.6em] uppercase block font-mono">Archive No. {ex.id.slice(0,4).toUpperCase()}</span>
              <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${STATUS_STYLE[status]}`}>
                {STATUS_LABEL[status]}
              </span>
            </div>
            <h1 className="text-[10vw] md:text-[8vw] font-serif font-bold leading-[0.8] tracking-tighter mb-10">
              {ex.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'italic text-zinc-500 block' : 'block'}>{word}</span>
              ))}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-12 border-t border-zinc-900 pt-12">
               <div className="flex flex-col">
                 <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2 font-mono">Category</span>
                 <span className="text-lg font-serif">{ex.category}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2 font-mono">Artist</span>
                 <span className="text-lg font-serif">{ex.artist}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2 font-mono">Date</span>
                 <span className="text-lg font-serif">{ex.date}</span>
               </div>
               <div className="flex items-center gap-4 ml-auto">
                 <BookmarkButton exhibitionId={ex.id} variant="detail" />
                 <ShareButtons title={ex.title} titleKo={ex.titleKo} />
               </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Editorial Spread Layout */}
      <section className="px-8 md:px-20 py-40 max-w-[1800px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
          {/* Double Column Spread */}
          <div className="lg:col-span-8">
            <AnimatedContainer>
               {/* Description pull quote */}
               <div className="relative mb-24">
                 <span className="absolute -top-6 -left-4 text-[6rem] font-serif leading-none select-none pointer-events-none" style={{ color: "#C9A96E12" }}>❝</span>
                 <h2 className="text-5xl md:text-7xl font-serif italic text-zinc-300 leading-tight max-w-4xl relative z-10">
                   {ex.description}
                 </h2>
                 <OrnamentalDivider className="mt-10 max-w-sm" />
               </div>

               <div className="lg:columns-2 gap-16 space-y-12 lg:space-y-0">
                 {ex.longDescription.split('\n\n').map((p, i) => (
                   <p key={i} className={`text-xl md:text-2xl font-light text-zinc-400 leading-relaxed mb-12 break-inside-avoid ${i === 0 ? "dropcap-gold" : "first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-zinc-600 first-letter:leading-[0.9]"}`}>
                     {p}
                   </p>
                 ))}
               </div>

               <ExhibitionTabs exhibition={ex} status={status} />
            </AnimatedContainer>
          </div>

          {/* Metadata Grid & Stats */}
          <div className="lg:col-span-4 space-y-16">
            {/* Stat cards — gilded treatment */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Coord. X", value: "37.56°N" },
                { label: "Coord. Y", value: "126.9°E" },
                { label: "Serial No.", value: `#${ex.id.slice(0,6)}` },
                { label: "Spec Index", value: "A+ / 1.2" },
              ].map(({ label, value }) => (
                <div key={label} className="p-6 rounded-2xl" style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.18)" }}>
                  <p className="text-[10px] uppercase tracking-widest mb-4 font-mono font-bold" style={{ color: "#C9A96E60" }}>{label}</p>
                  <p className="text-2xl font-serif tabular-nums">{value}</p>
                </div>
              ))}
            </div>

            {/* Thumbnail card with CornerFlourish */}
            <AnimatedContainer delay={0.2} className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl group classical-frame" style={{ border: "1px solid rgba(201,169,110,0.2)" }}>
              <Image src={ex.image!} alt={ex.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {ex.iconicObject && (
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] uppercase tracking-[0.4em] mb-2 font-mono" style={{ color: "#C9A96E60" }}>Iconic Artifact</p>
                  <p className="text-2xl font-serif text-white">{ex.iconicObject.name}</p>
                </div>
              )}
            </AnimatedContainer>

            {/* Logistical data */}
            <AnimatedContainer delay={0.3} className="space-y-12">
              <div className="pt-12" style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}>
                <h4 className="text-[10px] uppercase tracking-[0.4em] mb-6 font-mono font-bold" style={{ color: "#C9A96E60" }}>Logistical Data</h4>
                <div className="space-y-8">
                  <div className="flex justify-between items-end pb-4" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">Period</p>
                    <p className="text-lg font-serif">{ex.period}</p>
                  </div>
                  <div className="flex justify-between items-end pb-4" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">Environment</p>
                    <p className="text-lg font-serif">{ex.location}</p>
                  </div>
                </div>
              </div>
              <ReservationModal
                exhibitionTitle={ex.title}
                exhibitionPeriod={ex.period}
              />
            </AnimatedContainer>
          </div>
        </div>

        {ex.iconicObject && (
          <div className="absolute left-[-10vw] bottom-[10%] opacity-20 pointer-events-none select-none mix-blend-screen hidden xl:block scale-150">
             <Image src={ex.iconicObject.image} alt="Background Artifact" width={800} height={800} />
          </div>
        )}
      </section>

      {/* Explore Further */}
      <section className="px-8 md:px-20 py-40 relative" style={{ borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <BackgroundGlow color="bg-amber-900" size="w-[800px] h-[800px]" className="bottom-[-400px] left-[-200px]" opacity={0.06} />
        <AnimatedContainer className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.6em] font-bold mb-4" style={{ color: "#C9A96E60" }}>
            Curated For You
          </p>
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-5xl font-serif uppercase tracking-tighter">
              THE <span className="italic" style={{ color: "#C9A96E70" }}>RELATED</span> SELECTION
            </h2>
          </div>
          <OrnamentalDivider className="max-w-sm" />
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {related.map((rel, i) => (
            <AnimatedContainer key={rel.id} delay={i * 0.1}>
              <Link href={`/exhibitions/${rel.id}`} className="group block space-y-6">
                <div className="aspect-[16/10] relative rounded-2xl overflow-hidden bg-zinc-900 transition-all duration-700" style={{ border: "1px solid rgba(201,169,110,0.1)" }}>
                  <Image src={rel.heroImage!} alt={rel.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  {/* Gold corner on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(201,169,110,0.3)" }} />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: "#C9A96E50" }}>{rel.artist}</span>
                    <h3 className="text-2xl font-serif mt-2 group-hover:text-shadow-glow transition-all">{rel.title}</h3>
                  </div>
                  <span className="font-mono text-xs transition-colors" style={{ color: "#C9A96E30" }}>#{rel.id.slice(0,3)}</span>
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      <footer className="py-20 px-8 text-center border-t border-zinc-900 relative z-10">
         <p className="text-[10px] text-zinc-700 tracking-[0.4em] font-mono uppercase font-bold">Art Arca Curatorial Metadata // Live Archive</p>
      </footer>
    </div>
  );
}
