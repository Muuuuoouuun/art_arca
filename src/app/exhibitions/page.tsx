"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { exhibitions } from "../../lib/data";
import AnimatedContainer from "../../components/AnimatedContainer";
import GlassCard from "../../components/GlassCard";
import BackgroundGlow from "../../components/BackgroundGlow";
import FilmGrain from "../../components/FilmGrain";
import { motion } from "framer-motion";
import BookmarkButton from "../../components/BookmarkButton";
import { OrnamentalDivider, LaurelAccent, ClassicalNumber } from "../../components/ClassicalOrnament";

const categories = ["All", ...Array.from(new Set(exhibitions.map((ex) => ex.category)))];

export default function ExhibitionsPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white relative overflow-hidden selection:bg-white selection:text-black">
      <FilmGrain />
      <BackgroundGlow color="bg-zinc-600" size="w-[1000px] h-[1000px]" className="top-[-300px] left-[-300px]" opacity={0.18} />

      {/* Background baroque arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] pointer-events-none overflow-hidden opacity-[0.03]">
        <svg viewBox="0 0 900 500" fill="none" className="w-full">
          <path d="M50 500 Q50 30 450 30 Q850 30 850 500" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
          <path d="M150 500 Q150 120 450 120 Q750 120 750 500" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
          <ellipse cx="450" cy="200" rx="100" ry="70" stroke="#C9A96E" strokeWidth="1" fill="none" />
          <ellipse cx="450" cy="200" rx="140" ry="100" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <line x1="450" y1="30" x2="450" y2="100" stroke="#C9A96E" strokeWidth="0.8" />
        </svg>
      </div>

      <AnimatedContainer>
        {/* Header */}
        <header className="px-8 md:px-24 pt-48 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-[1800px] mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px]" style={{ background: "#C9A96E60" }} />
                <p className="text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: "#C9A96E80" }}>
                  Registry 4.2 // Synergy Archive
                </p>
              </div>
              <h1 className="text-8xl md:text-[10vw] font-serif tracking-tighter leading-none font-bold uppercase">
                Master<br /><span className="italic text-zinc-700">Registry</span>
              </h1>
              <LaurelAccent className="pt-2" />
              <OrnamentalDivider className="max-w-xs" />
            </div>
            <div className="text-right">
              <GlassCard className="px-12 py-8 inline-block" style={{ borderBottom: "2px solid #C9A96E30" }}>
                <p className="text-[10px] tracking-[0.4em] mb-2 uppercase font-bold text-left" style={{ color: "#C9A96E60" }}>
                  Archive Depth
                </p>
                <p className="text-6xl font-serif tabular-nums tracking-tighter text-left">{exhibitions.length} Items</p>
              </GlassCard>
            </div>
          </div>
        </header>

        {/* Filter bar */}
        <div className="px-8 md:px-24 py-12 border-y border-white/5 relative z-10 bg-white/[0.02] backdrop-blur-md">
          <div className="max-w-[1800px] mx-auto flex flex-wrap items-center gap-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 font-bold">Filter By Set:</span>
            <div className="flex gap-8 overflow-x-auto scrollbar-hide">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-500 relative py-2 ${
                    i === 0 ? "font-bold" : "text-zinc-600 hover:text-white"
                  }`}
                  style={i === 0 ? { color: "#C9A96E" } : {}}
                >
                  {cat}
                  {i === 0 && (
                    <motion.div
                      layoutId="filter-active"
                      className="absolute bottom-0 left-0 w-full h-[1px]"
                      style={{ background: "#C9A96E" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exhibition list */}
        <section className="px-8 md:px-24 py-20 relative z-10">
          <div className="max-w-[1800px] mx-auto">
            <div className="hidden lg:grid grid-cols-12 gap-8 px-12 py-8 border-b text-[10px] uppercase tracking-[0.5em] font-bold font-mono" style={{ borderColor: "#C9A96E15", color: "#C9A96E40" }}>
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
                  onMouseEnter={() => setHovered(ex.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Floating preview on hover */}
                  <div
                    className={`hidden xl:block absolute left-[38%] top-1/2 -translate-y-1/2 w-[420px] h-[260px] pointer-events-none z-50 transition-all duration-500 ${
                      hovered === ex.id ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 -translate-x-8"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]" style={{ borderColor: "#C9A96E25" }}>
                      <Image src={ex.heroImage!} alt={ex.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 opacity-60">
                        <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
                          <path d="M2 38 L2 4 Q2 2 4 2 L38 2" stroke="#C9A96E" strokeWidth="0.9" fill="none" />
                          <rect x="-2" y="-2" width="8" height="8" transform="rotate(45 2 2)" fill="#C9A96E" />
                        </svg>
                      </div>
                      <div className="absolute bottom-5 left-5">
                        <p className="text-[8px] font-mono tracking-[0.4em] mb-1" style={{ color: "#C9A96E80" }}>Preview // Archive</p>
                        <p className="text-lg font-serif text-white tracking-tight">{ex.titleKo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-12 py-12 items-center">
                    <Link href={`/exhibitions/${ex.id}`} className="col-span-1 hidden lg:block">
                      <ClassicalNumber
                        value={(i + 1).toString().padStart(2, '0')}
                        className="opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </Link>

                    <Link href={`/exhibitions/${ex.id}`} className="col-span-12 lg:col-span-4 flex items-center gap-8">
                      <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
                        <div className="w-full h-full rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border" style={{ borderColor: "#C9A96E20" }}>
                          <Image src={ex.image!} alt={ex.title} fill className="object-cover" />
                        </div>
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{ boxShadow: "0 0 30px rgba(201,169,110,0.3), inset 0 0 0 1px #C9A96E40" }}
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-serif tracking-tight leading-none group-hover:text-shadow-glow transition-all duration-500 mb-2">{ex.title}</h2>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono lg:hidden">{ex.artist}</p>
                      </div>
                    </Link>

                    <Link href={`/exhibitions/${ex.id}`} className="col-span-3 hidden lg:block">
                      <p className="text-xl font-serif text-zinc-400 group-hover:text-white transition-colors">{ex.artist}</p>
                      <p className="text-[10px] uppercase tracking-widest font-mono mt-1 italic" style={{ color: "#C9A96E40" }}>
                        Verified Protocol
                      </p>
                    </Link>

                    <Link href={`/exhibitions/${ex.id}`} className="col-span-2 hidden lg:block">
                      <span className="px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all" style={{ background: "#C9A96E08", border: "1px solid #C9A96E20", color: "#C9A96E80" }}>
                        {ex.category}
                      </span>
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

                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.015), transparent)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-40 px-8 text-center relative z-10">
          <div className="max-w-xl mx-auto space-y-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-12"
              style={{ border: "1px solid #C9A96E20" }}
            >
              <div className="w-2 h-2 rounded-full animate-ping" style={{ background: "#C9A96E60" }} />
            </div>
            <OrnamentalDivider className="mb-10" />
            <p className="font-serif italic text-lg leading-relaxed text-zinc-600">
              "The archive is not a grave for the past, but a lens for the future. Every item registered here carries the resonance of its digital twin."
            </p>
            <LaurelAccent color="#C9A96E40" className="justify-center" />
            <p className="text-[10px] text-zinc-700 tracking-[0.5em] font-mono uppercase font-bold">Art Hub 4.2 Master Registry // Node: Verified</p>
          </div>
        </footer>
      </AnimatedContainer>
    </div>
  );
}
