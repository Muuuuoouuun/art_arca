"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookmarks } from "../hooks/useBookmarks";

const navLinks = [
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { bookmarks } = useBookmarks();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F2F0ED]/90 backdrop-blur-sm border-b border-stone-200">
      <div className="px-8 md:px-24 py-5 flex justify-between items-center">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-900 hover:text-stone-600 transition-colors"
        >
          Art Arca
        </Link>

        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-stone-900 font-bold"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* 북마크 링크 */}
          <Link
            href="/bookmarks"
            className={`relative flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] transition-colors ${
              pathname === "/bookmarks"
                ? "text-stone-900 font-bold"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill={pathname === "/bookmarks" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
            Saved
            {bookmarks.length > 0 && (
              <span className="absolute -top-1.5 -right-3 w-4 h-4 bg-stone-900 text-white text-[8px] flex items-center justify-center rounded-full">
                {bookmarks.length > 9 ? "9+" : bookmarks.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
