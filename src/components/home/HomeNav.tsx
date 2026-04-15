"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "../GlassCard";
import { SITE_NAME_UPPER } from "@/lib/site";

interface HomeNavProps {
  activeSection: string;
}

const navItems = [
  { label: "Season", href: "#hero", section: "hero" },
  { label: "Briefing", href: "#salon", section: "salon" },
  { label: "Highlights", href: "#bento", section: "bento" },
  { label: "Chapters", href: "#chapters", section: "chapters" },
  { label: "Archive", href: "#curation", section: "curation" },
  { label: "Guide", href: "/guide" },
  { label: "Saved", href: "/bookmarks" },
];

export default function HomeNav({ activeSection }: HomeNavProps) {
  return (
    <nav className="fixed left-0 top-0 z-[100] w-full px-4 py-4 md:px-8 md:py-6">
      <GlassCard className="mx-auto max-w-[1800px] px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 md:gap-4"
            >
              <span className="text-base font-serif font-bold tracking-[0.38em] text-white md:text-lg">
                {SITE_NAME_UPPER}
              </span>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60">
                <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill="#C9A96E" />
              </svg>
              <span
                className="hidden pl-1 text-[9px] font-bold uppercase tracking-[0.2em] md:block"
                style={{ color: "#C9A96E60" }}
              >
                Seoul
                <br />
                Exhibition Archive
              </span>
            </motion.div>

            <Link
              href="/exhibitions"
              className="group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-700 md:min-h-12 md:px-8"
              style={{ border: "1px solid #C9A96E40", color: "#C9A96E" }}
            >
              <span className="relative z-10 transition-colors duration-700 group-hover:text-black">
                Browse Season
              </span>
              <div
                className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                style={{ background: "#C9A96E" }}
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:hidden">
            {navItems.map((item) => {
              const active = item.section === activeSection;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-full border px-4 text-[10px] font-bold uppercase tracking-[0.24em] whitespace-nowrap transition-colors"
                  style={
                    active
                      ? {
                          borderColor: "rgba(201,169,110,0.36)",
                          background: "rgba(201,169,110,0.08)",
                          color: "#C9A96E",
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.08)",
                          color: "#A1A1AA",
                        }
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => {
              const active = item.section === activeSection;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                    active ? "font-bold" : "text-zinc-500 hover:text-white"
                  }`}
                  style={active ? { color: "#C9A96E" } : {}}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 h-[1px] w-full"
                      style={{ background: "#C9A96E", boxShadow: "0 0 8px rgba(201,169,110,0.8)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </nav>
  );
}
