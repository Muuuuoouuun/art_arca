"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedContainer from "../AnimatedContainer";
import BookmarkButton from "../BookmarkButton";
import { OrnamentalDivider, LaurelAccent, ClassicalNumber } from "../ClassicalOrnament";
import { exhibitions } from "../../lib/data";

export default function ArchiveSection() {
  const rows: typeof exhibitions[] = [];
  const locationCount = new Set(exhibitions.map((exhibition) => exhibition.location)).size;
  for (let i = 0; i < exhibitions.length; i += 4) {
    rows.push(exhibitions.slice(i, i + 4));
  }

  return (
    <section
      id="curation"
      className="relative bg-gradient-to-b from-[#F3EBDD] to-[#FAF6EF] px-4 py-32 text-black shadow-[inset_0_20px_50px_rgba(0,0,0,0.45)] md:px-16 md:py-40"
    >

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* Faint baroque arch motif — top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] pointer-events-none overflow-hidden opacity-[0.06]">
        <svg viewBox="0 0 600 200" fill="none" className="w-full">
          <path d="M50 200 Q50 20 300 20 Q550 20 550 200" stroke="#7A5A2A" strokeWidth="1.2" fill="none" />
          <path d="M100 200 Q100 60 300 60 Q500 60 500 200" stroke="#7A5A2A" strokeWidth="0.6" fill="none" />
          <path d="M0 200 Q0 0 300 0 Q600 0 600 200" stroke="#7A5A2A" strokeWidth="0.5" fill="none" />
          <ellipse cx="300" cy="80" rx="60" ry="40" stroke="#7A5A2A" strokeWidth="0.8" fill="none" />
          <ellipse cx="300" cy="80" rx="80" ry="55" stroke="#7A5A2A" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Section header with classical ornaments */}
        <AnimatedContainer className="mb-20 text-center md:text-left">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "#9A7A4A" }}>
                Full Season Index
              </p>
              <LaurelAccent color="#9A7A4A" className="mb-6 md:justify-start" />
              <h2 className="text-5xl font-serif font-bold leading-none tracking-tighter text-zinc-900 md:text-7xl">
                The Cabinet
                <br />
                of Editions.
              </h2>
              <OrnamentalDivider className="mt-8 max-w-xs" color="#9A7A4A" />
            </div>
            <div className="space-y-5 lg:pb-2">
              <p className="text-base leading-7 text-zinc-700 md:text-lg">
                Every edition keeps its artist, venue, object, and atmosphere. This section should
                feel warmer and more tactile than the hero, like moving from neon glass into paper,
                card stock, and collector labels.
              </p>
              <div className="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.3em]">
                <span
                  className="rounded-full px-4 py-2"
                  style={{ border: "1px solid rgba(154,122,74,0.2)", color: "#9A7A4A" }}
                >
                  {exhibitions.length} editions
                </span>
                <span
                  className="rounded-full px-4 py-2"
                  style={{ border: "1px solid rgba(154,122,74,0.2)", color: "#9A7A4A" }}
                >
                  {locationCount} Seoul venues
                </span>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        <div className="flex flex-col gap-32 pb-20">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative w-full">

              {/* Cover grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-6 px-4 md:px-8 relative z-20">
                {row.map((exhibition, idx) => (
                  <motion.div
                    key={exhibition.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group flex flex-col items-center"
                  >
                    {/* Classical number overlay */}
                    <div className="absolute -top-3 -left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ClassicalNumber value={(rowIndex * 4 + idx + 1).toString().padStart(2, '0')} />
                    </div>

                    <Link href={`/exhibitions/${exhibition.id}`} className="relative w-full">
                      <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] group-hover:shadow-[0_25px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 transform group-hover:-translate-y-4">
                        <Image
                          src={exhibition.image!}
                          alt={exhibition.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Plastic reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform -skew-x-12" />
                        {/* Gold tint on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)" }} />
                      </div>
                    </Link>

                    {/* Metadata row */}
                    <div className="absolute -bottom-8 w-full flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-zinc-800 tracking-tight">{exhibition.title}</h4>
                        <p className="text-[9px] font-serif italic" style={{ color: "#9A7A4A" }}>{exhibition.artist}</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-full shadow-sm p-1">
                        <BookmarkButton exhibitionId={exhibition.id} variant="card" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Physical shelf */}
              <div className="absolute bottom-0 left-[-5%] right-[-5%] h-5 bg-gradient-to-b from-white to-zinc-200 rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] z-10 hidden md:block" />
              <div className="absolute left-0 right-0 bottom-5 h-[150px] bg-gradient-to-t from-white/60 to-transparent blur-2xl z-0 pointer-events-none hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
