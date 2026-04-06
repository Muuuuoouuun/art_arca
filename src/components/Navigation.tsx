"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useBookmarks } from "../hooks/useBookmarks";
import DarkModeToggle from "./DarkModeToggle";

const navLinks = [
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { bookmarks } = useBookmarks();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Detect scroll for nav shadow
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#F2F0ED]/90 dark:bg-[#18181A]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="px-6 md:px-24 py-5 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
          >
            Art Arca
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-stone-900 dark:text-stone-100 font-bold"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Bookmarks */}
            <Link
              href="/bookmarks"
              className={`relative flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] transition-colors ${
                pathname === "/bookmarks"
                  ? "text-stone-900 dark:text-stone-100 font-bold"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <BookmarkIcon filled={pathname === "/bookmarks"} />
              Saved
              {bookmarks.length > 0 && (
                <span className="absolute -top-2 -right-3.5 w-4 h-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[8px] flex items-center justify-center rounded-full font-bold">
                  {bookmarks.length > 9 ? "9+" : bookmarks.length}
                </span>
              )}
            </Link>

            <DarkModeToggle />
          </div>

          {/* Mobile right group */}
          <div className="flex md:hidden items-center gap-3">
            {bookmarks.length > 0 && (
              <Link
                href="/bookmarks"
                className="relative text-stone-500 dark:text-stone-400"
                aria-label="저장된 전시"
              >
                <BookmarkIcon filled={false} />
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[7px] flex items-center justify-center rounded-full font-bold">
                  {bookmarks.length > 9 ? "9+" : bookmarks.length}
                </span>
              </Link>
            )}
            <DarkModeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-[5px] text-stone-900 dark:text-stone-100 btn-press"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F2F0ED] dark:bg-[#18181A] flex flex-col md:hidden transition-all duration-400 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex-1 flex flex-col justify-center px-8 pt-24 pb-16 gap-8">
          {[...navLinks, { href: "/bookmarks", label: "Saved" }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[40px] font-serif tracking-tight leading-tight transition-all duration-300 ${
                menuOpen ? "animate-fade-up" : "opacity-0"
              } ${
                pathname.startsWith(link.href)
                  ? "text-stone-900 dark:text-stone-100"
                  : "text-stone-400 dark:text-stone-600 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
              style={{ animationDelay: `${i * 60 + 80}ms`, animationFillMode: "both" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="px-8 pb-12">
          <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-600">
            Art Arca — Spring 2026 Edition
          </p>
        </div>
      </div>
    </>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}
