"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AnimatedContainer from "../AnimatedContainer";
import { FloatingIconicObject } from "../FloatingIconicObject";
import { OrnamentalDivider, LaurelAccent } from "../ClassicalOrnament";

export default function HomeFooter() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <footer id="footer" className="bg-[#0F0F0F] py-80 px-8 md:px-16 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto text-center relative z-10">
        <AnimatedContainer>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            {/* ICONIC — warm gilded undertone instead of cold dark */}
            <h2
              className="text-[30vw] font-serif font-bold leading-none select-none tracking-tighter"
              style={{ color: "#140F02" }}
            >
              ICONIC
            </h2>
            {/* Faint radial glow behind the text */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white space-y-8">
                <p className="text-[12px] tracking-[1.5em] uppercase mb-4 font-bold" style={{ color: "#C9A96E60" }}>
                  The New Curation Frontier
                </p>
                <LaurelAccent color="#C9A96E50" className="justify-center mb-8" />
                <p className="text-3xl md:text-6xl font-serif italic max-w-4xl tracking-tighter leading-tight shadow-text-glow">
                  Where technology and human soul become indistinguishable.
                </p>
              </div>
            </div>
          </motion.div>
          
          <OrnamentalDivider className="mt-60 mb-0" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 text-left border-t pt-32" style={{ borderColor: "#C9A96E15" }}>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: "#C9A96E60" }}>The Vision</span>
              <Link href="#" className="text-lg font-serif italic transition-colors" style={{ color: "#C9A96E80" }} onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")} onMouseLeave={e => (e.currentTarget.style.color = "#C9A96E80")}>The Manifesto</Link>
              <Link href="#" className="text-lg font-serif italic transition-colors" style={{ color: "#C9A96E80" }} onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")} onMouseLeave={e => (e.currentTarget.style.color = "#C9A96E80")}>Curator&apos;s Note</Link>
              <Link href="#" className="text-lg font-serif italic transition-colors" style={{ color: "#C9A96E80" }} onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")} onMouseLeave={e => (e.currentTarget.style.color = "#C9A96E80")}>The Process</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: "#C9A96E60" }}>Network</span>
              <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">Instagram</Link>
              <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">X / Twitter</Link>
              <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">Discord Lab</Link>
            </div>
            <div className="md:col-span-2 text-right flex flex-col justify-end items-end gap-8">
              <div className="px-6 py-2 rounded-full inline-block backdrop-blur-xl" style={{ border: "1px solid #C9A96E30", background: "rgba(201,169,110,0.05)" }}>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase leading-none" style={{ color: "#C9A96E80" }}>Status: Node Active</span>
              </div>
              <p className="text-[10px] text-zinc-700 tracking-[0.4em] font-bold uppercase">
                © 2026 Art Hub 4.2 — Synergy Integration Architect.
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
      
      <FloatingIconicObject src="/images/objects/porcelain-guitar.webp" alt="Porcelain Guitar" side="left" className="bottom-[10%] opacity-40" />
      <FloatingIconicObject src="/images/objects/bio-cello.webp" alt="Bio Cello" side="right" className="bottom-[20%] opacity-30" />

      <motion.div 
         style={{ x: useTransform(smoothProgress, [0, 1], ["0%", "-50%"]) }}
         className="absolute bottom-[-10vh] left-0 text-[40vh] font-serif font-black text-white/[0.01] whitespace-nowrap pointer-events-none select-none"
      >
         MASTERPIECE MASTERPIECE MASTERPIECE MASTERPIECE
      </motion.div>
    </footer>
  );
}
