"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "../GlassCard";

interface HomeNavProps {
  activeSection: string;
}

export default function HomeNav({ activeSection }: HomeNavProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6">
      <GlassCard className="max-w-[1800px] mx-auto px-10 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-white tracking-[0.5em] font-serif text-lg font-bold">ART HUB 4.2</span>
          {/* Small gilded diamond separator */}
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60">
            <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill="#C9A96E" />
          </svg>
          <span className="font-sans text-[9px] tracking-[0.2em] pl-1 py-1 uppercase font-bold" style={{ color: "#C9A96E60" }}>Synergy Update<br/>Edition</span>
        </motion.div>
        
        <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.2em] font-bold">
          {["Origins", "The Grid", "Archive", "Saved"].map((item, idx) => {
            const hrefs = ["#hero", "#bento", "#curation", "/bookmarks"];
            const sections = ["hero", "bento", "curation", "bookmarks"];
            return (
              <Link
                key={item}
                href={hrefs[idx]}
                className={`transition-all duration-500 relative py-2 ${activeSection === sections[idx] ? "font-bold" : "text-zinc-500 hover:text-white"}`}
                style={activeSection === sections[idx] ? { color: "#C9A96E" } : {}}
              >
                {item}
                {activeSection === sections[idx] && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-[1px]"
                    style={{ background: "#C9A96E", boxShadow: "0 0 8px rgba(201,169,110,0.8)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/exhibitions"
          className="group relative px-8 py-3 overflow-hidden rounded-full text-[10px] tracking-[0.2em] font-bold transition-all duration-700"
          style={{ border: "1px solid #C9A96E40", color: "#C9A96E" }}
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-700 uppercase">Enter Gallery</span>
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: "#C9A96E" }} />
        </Link>
      </GlassCard>
    </nav>
  );
}
