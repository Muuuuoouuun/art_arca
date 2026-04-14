"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedContainer from "../AnimatedContainer";
import GlassCard from "../GlassCard";
import ParallaxImage from "../ParallaxImage";
import BookmarkButton from "../BookmarkButton";
import { OrnamentalDivider, CornerFlourish } from "../ClassicalOrnament";
import { exhibitions } from "../../lib/data";

export default function BentoSection() {
  return (
    <section id="bento" className="relative px-4 py-28 md:px-8 md:py-40">
      <div className="max-w-[1800px] mx-auto">

        {/* Section header */}
        <AnimatedContainer className="mb-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.4em]" style={{ color: "#C9A96E80" }}>
                Current Program
              </p>
              <h2 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none">
                Three entry points
                <br />
                into the <span className="italic text-zinc-500">season.</span>
              </h2>
              <OrnamentalDivider className="mt-8 max-w-md" />
              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
                Start with the marquee exhibition, the tactile object study, or the visit-planning
                layer. Each card is a different pace, not just a different size.
              </p>
            </div>
            <div className="hidden md:block justify-self-end text-right">
              <GlassCard className="max-w-sm px-8 py-5" style={{ borderBottom: "1px solid #C9A96E30" }}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#C9A96E60" }}>
                  Season Index
                </p>
                <p className="text-4xl font-serif tabular-nums tracking-tighter">
                  {exhibitions.length} Editions
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Save the work, reserve the visit, and return through the archive.
                </p>
              </GlassCard>
            </div>
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px]">

          {/* ── Large hero card (col-span-8, row-span-2) ── */}
          <div className="md:col-span-8 md:row-span-2 relative group rounded-[40px] overflow-hidden bg-[#0a0a0a] bento-hover border border-white/[0.09] classical-frame">
            {/* Corner flourishes */}
            <CornerFlourish corner="tl" size={48} className="absolute top-4 left-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CornerFlourish corner="tr" size={48} className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CornerFlourish corner="bl" size={48} className="absolute bottom-4 left-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CornerFlourish corner="br" size={48} className="absolute bottom-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute inset-0 z-0">
              <ParallaxImage src={exhibitions[6].heroImage!} alt={exhibitions[6].title} className="opacity-70 group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

            <div className="absolute top-8 right-8 z-30">
              <BookmarkButton exhibitionId={exhibitions[6].id} variant="card" />
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ y: -40, rotate: 8, scale: 1.15 }}
              className="absolute right-[-5%] top-[5%] w-[500px] h-[500px] z-20 pointer-events-none drop-shadow-[0_0_140px_rgba(255,255,255,0.45)]"
            >
              <Image src="/images/objects/marble-david.webp" alt="Abstract Marble David Head" fill className="object-contain mix-blend-screen" />
            </motion.div>

            <div className="absolute bottom-0 left-0 p-16 z-30 w-full flex justify-between items-end">
              <Link href={`/exhibitions/${exhibitions[6].id}`} className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-[0.5em] mb-6 block font-bold" style={{ color: "#C9A96E60" }}>
                  Opening Night Pick
                </span>
                <h3 className="text-6xl md:text-7xl font-serif mb-8 leading-none tracking-tighter group-hover:text-shadow-glow transition-all duration-700">
                  {exhibitions[6].title}
                </h3>
                <p className="text-zinc-400 text-xl font-light line-clamp-2 max-w-lg leading-relaxed">
                  {exhibitions[6].description}
                </p>
              </Link>
              <Link
                href={`/exhibitions/${exhibitions[6].id}`}
                aria-label={`Open ${exhibitions[6].title}`}
                className="group/cta relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-700 group-hover:rotate-45"
                style={{ borderColor: "#C9A96E40" }}
              >
                <span className="relative z-10 text-2xl transition-colors duration-700 group-hover/cta:text-black">→</span>
                <div
                  className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-y-0"
                  style={{ background: "#C9A96E" }}
                />
              </Link>
            </div>
          </div>

          {/* ── Right tall card ── */}
          <div className="md:col-span-4 md:row-span-2 relative group rounded-[40px] overflow-hidden border bento-hover" style={{ borderColor: "#C9A96E15" }}>
            <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-xl z-0" />
            <div className="absolute top-8 right-8 z-30">
              <BookmarkButton exhibitionId={exhibitions[4].id} variant="card" />
            </div>
            <div className="absolute inset-0 z-10 p-12 flex flex-col justify-between">
              <Link href={`/exhibitions/${exhibitions[4].id}`} className="relative">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 block font-bold">{exhibitions[4].artist}</span>
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 border shadow-2xl" style={{ borderColor: "#C9A96E20" }}>
                  <Image src={exhibitions[4].image!} alt={exhibitions[4].title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <motion.div
                  animate={{ y: [0, -14, 0], rotate: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 -bottom-4 w-28 h-28 z-20 pointer-events-none drop-shadow-[0_0_30px_rgba(255,150,200,0.5)]"
                >
                  <Image src="/images/objects/neon-norigae.webp" alt="Norigae Artifact" fill className="object-contain mix-blend-screen" />
                </motion.div>
              </Link>
              <Link href={`/exhibitions/${exhibitions[4].id}`}>
                <h3 className="text-4xl font-serif mb-6 leading-tight tracking-tight">{exhibitions[4].titleKo}</h3>
                <div className="flex flex-wrap gap-2">
                  {exhibitions[4].tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full text-zinc-400 uppercase font-bold" style={{ background: "#C9A96E08", border: "1px solid #C9A96E20" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          </div>

          {/* ── Chrome mask card ── */}
          <div className="md:col-span-6 md:row-span-1 relative group rounded-[40px] overflow-hidden bg-[#0a0a0a] bento-hover border border-white/[0.09]">
            <div className="absolute top-6 right-6 z-30">
              <BookmarkButton exhibitionId={exhibitions[0].id} variant="card" />
            </div>
            <Link href={`/exhibitions/${exhibitions[0].id}`}>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 h-[300px] w-[300px] drop-shadow-[0_0_60px_rgba(201,169,110,0.22)]"
                >
                  <Image src="/images/objects/chrome-mask.webp" alt="Chrome Mask" fill className="object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-700" />
                </motion.div>
                <div className="absolute inset-0 bg-radial-gradient from-emerald-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="absolute bottom-10 left-10 z-20">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                  Gallery Signal
                </p>
                <h3 className="text-3xl font-serif mb-1 tracking-tight">{exhibitions[0].title}</h3>
                <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-bold">{exhibitions[0].category}</span>
              </div>
            </Link>
          </div>

          {/* ── Parallax card ── */}
          <div className="md:col-span-3 md:row-span-1 relative group rounded-[40px] overflow-hidden bg-zinc-900 bento-hover border border-white/[0.09]">
            <div className="absolute top-6 right-6 z-30">
              <BookmarkButton exhibitionId={exhibitions[7].id} variant="card" />
            </div>
            <Link href={`/exhibitions/${exhibitions[7].id}`}>
              <ParallaxImage src={exhibitions[7].heroImage!} alt={exhibitions[7].title} className="opacity-30 group-hover:opacity-60 transition-all duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                  Quietest Room
                </p>
                <h3 className="text-3xl font-serif mb-4 group-hover:scale-110 transition-all duration-700">{exhibitions[7].title}</h3>
                <div className="w-8 h-[1px] group-hover:w-20 transition-all duration-700" style={{ background: "#C9A96E60" }} />
              </div>
            </Link>
          </div>

          {/* ── Visit ritual card ── */}
          <Link
            href="/bookmarks"
            className="md:col-span-3 md:row-span-1 relative group rounded-[40px] overflow-hidden bento-hover p-8 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, #242424 0%, #161616 100%)", border: "1px solid #C9A96E20" }}
          >
            {/* Faint gilded fan object */}
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[-20px] top-[-20px] w-[180px] h-[180px] opacity-20 pointer-events-none"
            >
              <Image src="/images/objects/holographic-fan.webp" alt="Holographic Fan" fill className="object-contain mix-blend-screen" />
            </motion.div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#C9A96E10", border: "1px solid #C9A96E30" }}>
              <span className="font-mono text-xs" style={{ color: "#C9A96E80" }}>05</span>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                Visit Ritual
              </p>
              <h3 className="mb-3 text-2xl font-serif">Build Your Night</h3>
              <p className="text-sm leading-6 text-zinc-400">
                Bookmark the works you want to revisit, carry them into a reservation flow, and
                return with reviews after the show.
              </p>
            </div>
            <div className="space-y-2">
              {["Save the work", "Reserve a slot", "Return to the archive"].map((step) => (
                <div
                  key={step}
                  className="flex items-center justify-between border-t pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400"
                  style={{ borderColor: "rgba(201,169,110,0.12)" }}
                >
                  <span>{step}</span>
                  <span style={{ color: "#C9A96E80" }}>→</span>
                </div>
              ))}
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
