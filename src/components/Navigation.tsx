"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

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
        </div>
      </div>
    </nav>
  );
}
