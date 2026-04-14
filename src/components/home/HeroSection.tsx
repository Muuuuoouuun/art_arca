"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import GlassCard from "../GlassCard";
import { FloatingIconicObject, GlyphArtifact } from "../FloatingIconicObject";
import { OrnamentalDivider, LaurelAccent } from "../ClassicalOrnament";
import { exhibitions } from "../../lib/data";

const heroFacts = [
  {
    value: exhibitions.length.toString().padStart(2, "0"),
    label: "editions in the season",
  },
  {
    value: "Seoul",
    label: "city-wide venues and night routes",
  },
  {
    value: "Save / Reserve",
    label: "tools for returning with intent",
  },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-4 pb-20 pt-32 md:px-16 md:pb-24 md:pt-36"
    >

      {/* Faint Renaissance fresco arc — top background */}
      <div className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none z-0 overflow-hidden">
        <svg viewBox="0 0 1200 400" fill="none" className="absolute top-0 left-0 w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
          <path d="M0 400 Q300 0 600 200 Q900 400 1200 100" stroke="#C9A96E" strokeWidth="1.2" fill="none"/>
          <path d="M0 350 Q300 50 600 250 Q900 350 1200 150" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
          <ellipse cx="600" cy="180" rx="280" ry="160" stroke="#C9A96E" strokeWidth="0.6" fill="none"/>
          <ellipse cx="600" cy="180" rx="320" ry="200" stroke="#C9A96E" strokeWidth="0.3" fill="none"/>
        </svg>
      </div>

      {/* Hero image */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="pointer-events-none absolute right-[-34vw] top-[10rem] z-0 h-[50vh] w-[100vw] opacity-70 md:right-[-10vw] md:top-[10vh] md:h-[80vh] md:w-[60vw] md:opacity-100"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 z-10 pointer-events-none bg-radial-gradient from-amber-900/20 via-transparent to-transparent" />
          <Image
            src="/images/exhibitions/afrofuturism-disco-hero.jpg"
            alt="Celestial Groove exhibition key visual"
            fill
            className="object-contain [mask-image:radial-gradient(ellipse_65%_75%_at_55%_45%,black_50%,transparent_85%)] drop-shadow-[0_0_120px_rgba(201,169,110,0.18)]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* GlyphArtifacts left sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-10 top-[25%] z-20 hidden flex-col gap-12 xl:flex"
      >
        {[
          { label: "Season", value: "Spring-Summer 2026", delay: 1.4 },
          { label: "Base", value: "Seoul, KR", delay: 1.6 },
          { label: "Mode", value: "Cabinet / Salon", delay: 1.8 },
        ].map(({ label, value, delay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlyphArtifact label={label} value={value} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main text content */}
      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Volume tag line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-8 max-w-xs"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.8em]" style={{ color: "#C9A96E" }}>
              Seoul Program / 2026
            </p>
            <OrnamentalDivider />
          </motion.div>

          {/* Title */}
          <h1 className="max-w-5xl text-[16vw] font-serif font-bold leading-[0.82] tracking-[-0.05em] md:text-[9vw]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block gilded-text"
              >
                ART FOR A
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block italic text-zinc-500"
              >
                RESTLESS CITY.
              </motion.span>
            </span>
          </h1>

          {/* Laurel + subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 mb-4"
          >
            <LaurelAccent />
          </motion.div>

          {/* Description card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 max-w-2xl"
          >
            <GlassCard className="border-l-2 p-6 md:p-8" style={{ borderLeftColor: "#C9A96E50" }}>
              <p className="text-xl font-display italic tracking-tight text-[#E7D1A0] md:text-[1.7rem]">
                For the works that deserve a second look.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-300 md:text-lg">
                Ten cross-era exhibitions move through Seoul this season, spanning digital collage,
                bio art, fashion, sculpture, light, graffiti, and immersive sound. Save the works
                that pull you in, reserve a visit, then return to the archive when the night is over.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/exhibitions"
              className="group inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[11px] font-bold uppercase tracking-[0.32em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "#C9A96E" }}
            >
              Enter Season
            </Link>
            <Link
              href="#curation"
              className="inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-[11px] font-bold uppercase tracking-[0.32em] text-zinc-100 transition-colors duration-300 hover:text-white"
              style={{ borderColor: "rgba(201,169,110,0.28)" }}
            >
              Browse Cabinet
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-4 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500"
          >
            Spring-Summer 2026 / Seoul / Save, reserve, return
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3"
          >
            {heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[22px] border px-4 py-4 backdrop-blur-sm md:px-5"
                style={{
                  borderColor: "rgba(201,169,110,0.14)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <p className="text-xl font-serif tracking-tight text-white md:text-2xl">{fact.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  {fact.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <FloatingIconicObject
        src="/images/objects/chrome-mask.webp"
        alt="Chrome Afrofuturist Mask"
        side="left"
        className="top-[40%] translate-x-[-20%] opacity-70"
      />

      {/* Scroll indicator */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 md:bottom-12"
      >
        <span className="text-[10px] tracking-[0.4em] font-bold uppercase" style={{ color: "#C9A96E80" }}>
          Drift Down
        </span>
        <div className="w-[1px] h-16" style={{ background: "linear-gradient(to bottom, #C9A96E80, transparent)" }} />
      </motion.div>
    </section>
  );
}
