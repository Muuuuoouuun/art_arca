"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import AnimatedContainer from "../AnimatedContainer";
import { FloatingIconicObject } from "../FloatingIconicObject";
import { OrnamentalDivider, LaurelAccent } from "../ClassicalOrnament";
import { SITE_NAME } from "@/lib/site";

export default function HomeFooter() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const marqueeX = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#0F0F0F] px-4 py-32 md:px-16 md:py-56">
      <div className="max-w-[1800px] mx-auto text-center relative z-10">
        <AnimatedContainer>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            <h2
              className="select-none font-serif text-[26vw] font-bold leading-none tracking-tighter md:text-[22vw]"
              style={{ color: "#171108" }}
            >
              ARCHIVE
            </h2>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="space-y-6 text-white md:space-y-8">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[1em] md:tracking-[1.5em]" style={{ color: "#C9A96E60" }}>
                  Season closes, the archive stays open
                </p>
                <LaurelAccent color="#C9A96E50" className="justify-center mb-8" />
                <p className="max-w-4xl text-3xl font-serif italic leading-tight tracking-tighter shadow-text-glow md:text-6xl">
                  Not every work asks for speed.
                  <br />
                  Some ask for return.
                </p>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-400 md:text-lg">
                  Bookmark what changed your pulse, plan a visit around the work, and come back when
                  you want the night to resolve into something clearer.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/exhibitions"
                    className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[11px] font-bold uppercase tracking-[0.32em] text-black transition-transform hover:-translate-y-0.5"
                    style={{ background: "#C9A96E" }}
                  >
                    Enter Season
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-[11px] font-bold uppercase tracking-[0.32em] text-zinc-100 transition-colors hover:text-white"
                    style={{ borderColor: "rgba(201,169,110,0.28)" }}
                  >
                    Read About
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          <OrnamentalDivider className="mb-0 mt-28 md:mt-44" />
          <div
            className="grid gap-12 border-t pt-16 text-left md:grid-cols-[0.9fr_0.9fr_1.2fr] md:pt-24"
            style={{ borderColor: "#C9A96E15" }}
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em]" style={{ color: "#C9A96E60" }}>
                Explore
              </span>
              <Link href="/exhibitions" className="text-lg font-serif italic text-zinc-300 transition-colors hover:text-[#C9A96E]">
                Current Season
              </Link>
              <Link href="/events" className="text-lg font-serif italic text-zinc-300 transition-colors hover:text-[#C9A96E]">
                Season Agenda
              </Link>
              <Link href="/blog" className="text-lg font-serif italic text-zinc-300 transition-colors hover:text-[#C9A96E]">
                Field Journal
              </Link>
              <Link href="/community" className="text-lg font-serif italic text-zinc-300 transition-colors hover:text-[#C9A96E]">
                Community
              </Link>
              <Link href="/bookmarks" className="text-lg font-serif italic text-zinc-300 transition-colors hover:text-[#C9A96E]">
                Saved Works
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em]" style={{ color: "#C9A96E60" }}>
                Visit Flow
              </span>
              {["Save the work", "Reserve a slot", "Return with notes"].map((item) => (
                <div
                  key={item}
                  className="border-t pt-3 text-sm uppercase tracking-[0.3em] text-zinc-400"
                  style={{ borderColor: "rgba(201,169,110,0.12)" }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-end gap-8 md:items-end md:text-right">
              <div
                className="inline-block rounded-full px-6 py-2 backdrop-blur-xl"
                style={{ border: "1px solid #C9A96E30", background: "rgba(201,169,110,0.05)" }}
              >
                <span className="text-[10px] font-mono font-bold uppercase leading-none tracking-[0.2em]" style={{ color: "#C9A96E80" }}>
                  Spring-Summer 2026 / Seoul
                </span>
              </div>
              <p className="max-w-lg text-sm leading-7 text-zinc-400 md:text-base">
                {SITE_NAME} works best when it feels like a collector&apos;s note rather than a
                product dashboard: cinematic on arrival, warm in the archive, and always clear
                about what the visitor can do next.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-700">
                Bookmark. Reserve. Return.
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
      
      <FloatingIconicObject src="/images/objects/porcelain-guitar.webp" alt="Porcelain Guitar" side="left" className="bottom-[10%] opacity-40" />
      <FloatingIconicObject src="/images/objects/bio-cello.webp" alt="Bio Cello" side="right" className="bottom-[20%] opacity-30" />

      <motion.div 
         style={shouldReduceMotion ? undefined : { x: marqueeX }}
         className="pointer-events-none absolute bottom-[-8vh] left-0 select-none whitespace-nowrap font-serif text-[34vh] font-black text-white/[0.01]"
      >
         ARCHIVE ARCHIVE ARCHIVE ARCHIVE
      </motion.div>
    </footer>
  );
}
