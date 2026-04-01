"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import GlassCard from "../GlassCard";
import { FloatingIconicObject, GlyphArtifact } from "../FloatingIconicObject";
import { OrnamentalDivider, LaurelAccent } from "../ClassicalOrnament";

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[100vh] flex flex-col justify-center px-8 md:px-16 overflow-hidden">

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
        className="absolute right-[-10vw] top-[10vh] w-[60vw] h-[80vh] z-0 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-transparent to-transparent z-10 pointer-events-none" />
          <Image
            src="/images/exhibitions/afrofuturism-disco-hero.jpg"
            alt="Hero Visual Asset"
            fill
            className="object-contain [mask-image:radial-gradient(ellipse_65%_75%_at_55%_45%,black_50%,transparent_85%)] drop-shadow-[0_0_120px_rgba(139,92,246,0.3)]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* GlyphArtifacts left sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-10 top-[25%] hidden xl:flex flex-col gap-12 z-20"
      >
        {[
          { label: "Ref. Code", value: "AH-4.2-SYN", delay: 1.4 },
          { label: "Coord", value: "37.5665° N / 126.9780° E", delay: 1.6 },
          { label: "Visual Engine", value: "Octane 2026.4", delay: 1.8 },
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
            <p className="text-[10px] tracking-[0.8em] uppercase font-bold mb-3" style={{ color: "#C9A96E" }}>
              Volume 04 / Iconic
            </p>
            <OrnamentalDivider />
          </motion.div>

          {/* Title */}
          <h1 className="text-[14vw] md:text-[10vw] font-serif leading-[0.8] tracking-[-0.05em] font-bold">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block gilded-text"
              >
                ARTISTIC
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block italic text-zinc-600"
              >
                SOUL.
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
            className="mt-6 max-w-xl"
          >
            <GlassCard className="p-8 border-l-2" style={{ borderLeftColor: "#C9A96E40" }}>
              <p className="text-lg md:text-xl font-serif text-zinc-300 font-light leading-relaxed">
                Art Hub 4.2: Team Synergy Update. We merge the high-end aesthetic with social connectivity. Bookmarks, reviews, and reservations now integrate seamlessly into the digital void.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>

      <FloatingIconicObject
        src="/images/objects/chrome-mask.webp"
        alt="Chrome Afrofuturist Mask"
        side="left"
        className="top-[40%] translate-x-[-20%]"
      />

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.4em] font-bold uppercase" style={{ color: "#C9A96E80" }}>
          Discover
        </span>
        <div className="w-[1px] h-16" style={{ background: "linear-gradient(to bottom, #C9A96E80, transparent)" }} />
      </motion.div>
    </section>
  );
}
