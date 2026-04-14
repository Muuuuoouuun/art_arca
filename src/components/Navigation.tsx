"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookmarks } from "../hooks/useBookmarks";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { SITE_NAME_UPPER } from "@/lib/site";

const navLinks = [
  { href: "/exhibitions", label: "Registry" },
  { href: "/guide", label: "Guide" },
  { href: "/bookmarks", label: "Saved" },
  { href: "/about", label: "System" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { bookmarks } = useBookmarks();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6">
      <GlassCard className="max-w-[1800px] mx-auto px-10 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Link href="/" className="text-white tracking-[0.5em] font-serif text-lg font-bold">{SITE_NAME_UPPER}</Link>
          <span className="hidden sm:block text-zinc-500 font-sans text-[9px] tracking-[0.2em] border-l border-zinc-800 pl-4 py-1 uppercase font-bold">Seoul<br/>Archive</span>
        </motion.div>
        
        <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.2em] font-bold">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`hover:text-white transition-colors duration-500 relative py-2 ${pathname.startsWith(link.href) ? "text-white" : "text-zinc-500"}`}
            >
              <div className="flex items-center gap-2">
                {link.label}
                {link.href === "/bookmarks" && bookmarks.length > 0 && (
                  <span className="w-4 h-4 bg-white text-black text-[8px] flex items-center justify-center rounded-full shadow-[0_0_10px_white]">
                    {bookmarks.length}
                  </span>
                )}
              </div>
              {pathname.startsWith(link.href) && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              )}
            </Link>
          ))}
        </div>

        <Link href="/exhibitions" className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/20 text-[10px] tracking-[0.2em] font-bold transition-all duration-700 hover:border-white">
          <span className="relative z-10 group-hover:text-black transition-colors duration-700 uppercase">Browse Season</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </Link>
      </GlassCard>
    </nav>
  );
}
