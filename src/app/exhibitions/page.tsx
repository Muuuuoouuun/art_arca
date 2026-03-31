"use client";

import Link from "next/link";
import Image from "next/image";
import { exhibitions } from "../../lib/data";
import AnimatedContainer from "../../components/AnimatedContainer";
import GlassCard from "../../components/GlassCard";
import BackgroundGlow from "../../components/BackgroundGlow";
import FilmGrain from "../../components/FilmGrain";
import { motion } from "framer-motion";
import BookmarkButton from "../../components/BookmarkButton";

const categories = ["All", ...Array.from(new Set(exhibitions.map((ex) => ex.category)))];

export default function ExhibitionsPage() {
  return (
    <div className="bg-[#030303] min-h-screen text-white relative overflow-hidden selection:bg-white selection:text-black">
      <FilmGrain />
      <BackgroundGlow color="bg-zinc-800" size="w-[1000px] h-[1000px]" className="top-[-300px] left-[-300px]" opacity={0.1} />
      
      <AnimatedContainer>
        <header className="px-8 md:px-24 pt-48 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-[1800px] mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-white/40" />
                 <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">Registry 4.2 // Synergy Archive</p>
              </div>
              <h1 className="text-8xl md:text-[10vw] font-serif tracking-tighter leading-none font-bold uppercase">
                Master<br/><span className="italic text-zinc-700">Registry</span>
              </h1>
            </div>
            <div className="text-right">
              <GlassCard className="px-12 py-8 border-b-2 border-b-white/20 inline-block">
                 <p className="text-[10px] text-zinc-500 tracking-[0.4em] mb-2 uppercase font-bold text-left">Archive Depth</p>
                 <p className="text-6xl font-serif tabular-nums tracking-tighter text-left">{exhibitions.length} Items</p>
              </GlassCard>
            </div>
          </div>
        </header>

        <div className="px-8 md:px-24 py-12 border-y border-white/5 relative z-10 bg-white/[0.02] backdrop-blur-md">
           <div className="max-w-[1800px] mx-auto flex flex-wrap items-center gap-12">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 font-bold">Filter By Set:</span>
              <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    className={`text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-500 relative py-2 ${
                      i === 0 ? "text-white font-bold" : "text-zinc-600 hover:text-white"
                    }`}
                  >
                    {cat}
                    {i === 0 && (
                       <motion.div layoutId="filter-active" className="absolute bottom-0 left-0 w-full h-[1px] bg-white shadow-[0_0_10px_white]" />
                    )}
                  </button>
                ))}
              </div>
           </div>
        </div>

        <section className="px-8 md:px-24 py-20 relative z-10">
          <div className="max-w-[1800px] mx-auto">
             <div className="hidden lg:grid grid-cols-12 gap-8 px-12 py-8 border-b border-white/10 text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold font-mono">
                <div className="col-span-1">Ref</div>
                <div className="col-span-4">Exhibition Title // Subject</div>
                <div className="col-span-3">Artist // Curator</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2 text-right">Actions // Status</div>
             </div>

             <div className="flex flex-col">
               {exhibitions.map((ex, i) => (
                 <div 
                  key={ex.id} 
                  className="group relative block border-b border-white/5 transition-all duration-500 hover:bg-white/[0.03]"
                 >
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-12 py-12 items-center">
                      <Link href={`/exhibitions/${ex.id}`} className="col-span-1 hidden lg:block">
                        <span className="font-mono text-xl text-zinc-800 group-hover:text-white transition-colors duration-500">{(i + 1).toString().padStart(2, '0')}</span>
                      </Link>
                      
                      <Link href={`/exhibitions/${ex.id}`} className="col-span-12 lg:col-span-4 flex items-center gap-8">
                         <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5">
                            <Image src={ex.image!} alt={ex.title} fill className="object-cover" />
                         </div>
                         <div>
                            <h2 className="text-3xl lg:text-4xl font-serif tracking-tight leading-none group-hover:text-shadow-glow transition-all duration-500 mb-2">{ex.title}</h2>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono lg:hidden">{ex.artist}</p>
                         </div>
                      </Link>

                      <Link href={`/exhibitions/${ex.id}`} className="col-span-3 hidden lg:block">
                        <p className="text-xl font-serif text-zinc-400 group-hover:text-white transition-colors">{ex.artist}</p>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono mt-1 italic group-hover:text-zinc-500">Verified Protocol</p>
                      </Link>

                      <Link href={`/exhibitions/${ex.id}`} className="col-span-2 hidden lg:block">
                         <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-zinc-500 font-bold group-hover:border-white/30 group-hover:text-zinc-300 transition-all">{ex.category}</span>
                      </Link>

                      <div className="col-span-2 text-right flex flex-col items-end">
                         <div className="flex items-center gap-4 mb-2">
                            <BookmarkButton exhibitionId={ex.id} variant="card" />
                         </div>
                         <div className="flex items-center gap-2 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest font-bold">Active Archive</span>
                         </div>
                      </div>

                      <Link href={`/exhibitions/${ex.id}`} className="absolute right-8 top-1/2 -translate-y-1/2 lg:hidden">
                         <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                            <span className="text-xl">→</span>
                         </div>
                      </Link>
                   </div>
                   <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent" />
                 </div>
               ))}
             </div>
          </div>
        </section>

        <footer className="py-40 px-8 text-center relative z-10">
           <div className="max-w-xl mx-auto space-y-8">
              <div className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-12">
                 <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
              <p className="text-zinc-600 font-serif italic text-lg leading-relaxed">
                "The archive is not a grave for the past, but a lens for the future. Every item registered here carries the resonance of its digital twin."
              </p>
              <div className="h-[1px] w-24 bg-zinc-800 mx-auto" />
              <p className="text-[10px] text-zinc-700 tracking-[0.5em] font-mono uppercase font-bold">Art Hub 4.2 Master Registry // Node: Verified</p>
           </div>
        </footer>
      </AnimatedContainer>
    </div>
  );
}
