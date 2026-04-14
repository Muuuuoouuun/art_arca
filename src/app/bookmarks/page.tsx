"use client";

import Link from "next/link";
import Image from "next/image";
import { exhibitions } from "../../lib/data";
import { useBookmarks } from "../../hooks/useBookmarks";
import AnimatedContainer from "../../components/AnimatedContainer";
import BookmarkButton from "../../components/BookmarkButton";
import GlassCard from "../../components/GlassCard";
import BackgroundGlow from "../../components/BackgroundGlow";
import FilmGrain from "../../components/FilmGrain";
import { motion } from "framer-motion";
import { SITE_NAME_UPPER } from "@/lib/site";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const saved = exhibitions.filter((ex) => bookmarks.includes(ex.id));

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white relative overflow-hidden selection:bg-white selection:text-black">
      <FilmGrain />
      <BackgroundGlow color="bg-indigo-700" size="w-[1000px] h-[1000px]" className="top-[-300px] left-[-300px]" opacity={0.20} />
      
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-lg font-serif tracking-[0.5em] hover:italic transition-all">{SITE_NAME_UPPER}</Link>
        <Link href="/exhibitions" className="text-[10px] uppercase tracking-[0.3em] border-b border-white/20 pb-1 hover:border-white transition-all">Back to Index</Link>
      </nav>

      <AnimatedContainer>
        <header className="px-8 md:px-24 pt-48 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-[1800px] mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-white/40" />
                 <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">Personal Registry // Saved Items</p>
              </div>
              <h1 className="text-8xl md:text-[10vw] font-serif tracking-tighter leading-none font-bold uppercase">
                Saved<br/><span className="italic text-zinc-700">Collection</span>
              </h1>
            </div>
            <div className="text-right">
              <GlassCard className="px-12 py-8 border-b-2 border-b-white/20 inline-block">
                 <p className="text-[10px] text-zinc-500 tracking-[0.4em] mb-2 uppercase font-bold text-left">Collection Size</p>
                 <p className="text-6xl font-serif tabular-nums tracking-tighter text-left">{saved.length} Items</p>
              </GlassCard>
            </div>
          </div>
        </header>

        <section className="px-8 md:px-24 py-16 min-h-[50vh] relative z-10">
          {saved.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center max-w-xl mx-auto">
              <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mb-12 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none" className="text-zinc-500 relative z-10">
                   <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                 </svg>
              </div>
              <p className="text-3xl font-serif mb-6 italic text-zinc-300">저장한 작품이 아직 없습니다.</p>
              <p className="text-sm text-zinc-500 tracking-[0.3em] uppercase mb-12 font-mono">마음에 드는 작품을 저장해 두고 다시 돌아오세요.</p>
              <Link
                href="/exhibitions"
                className="group relative px-12 py-4 overflow-hidden rounded-full border border-white/20 text-[10px] tracking-[0.3em] font-bold transition-all duration-700 hover:border-white"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-700 uppercase">Browse Season</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1800px] mx-auto">
              {saved.map((ex, i) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="group relative overflow-hidden rounded-[32px] p-4 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-700">
                    <Link href={`/exhibitions/${ex.id}`} className="block relative aspect-[4/5] rounded-[24px] overflow-hidden mb-8 border border-white/5">
                      <Image
                        src={ex.image!}
                        alt={ex.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </Link>
                    
                    <div className="px-4 pb-4">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono font-bold mb-2">{ex.artist}</p>
                          <h2 className="text-3xl font-serif tracking-tight leading-none group-hover:text-shadow-glow transition-all duration-700">{ex.title}</h2>
                        </div>
                        <BookmarkButton exhibitionId={ex.id} variant="card" />
                      </div>
                      
                      <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{ex.category}</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="text-[9px] font-mono text-zinc-500 tracking-tighter uppercase">{ex.date}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <footer className="py-40 px-8 text-center relative z-10">
           <div className="max-w-xl mx-auto space-y-8">
              <p className="text-zinc-700 text-[10px] tracking-[0.5em] font-mono uppercase font-bold">Art Arca Saved Collection // Seoul Archive</p>
           </div>
        </footer>
      </AnimatedContainer>
    </div>
  );
}
