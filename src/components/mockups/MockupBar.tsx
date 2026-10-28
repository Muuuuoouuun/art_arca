import Link from "next/link";

const VARIANTS = [
  { href: "/mockups/a", label: "A · Gilded Night" },
  { href: "/mockups/b", label: "B · Collector's Cabinet" },
  { href: "/mockups/c", label: "C · Salon Wall" },
];

/** Design-review switcher. Frontend-only mockups — not production pages. */
export default function MockupBar({ current, tone = "dark" }: { current: "a" | "b" | "c"; tone?: "dark" | "light" }) {
  const base =
    tone === "dark"
      ? "bg-black/70 text-white/70 border-white/10"
      : "bg-[#F3EBDD]/90 text-[#171410]/70 border-[#171410]/10";
  return (
    <div
      role="navigation"
      aria-label="디자인 시안 전환"
      className={`sticky top-0 z-[400] flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-4 py-2 text-[11px] tracking-wide backdrop-blur-md md:px-8 ${base}`}
    >
      <span className="font-semibold uppercase tracking-[0.2em]">시안 Mockup</span>
      <span className="hidden opacity-60 sm:inline">프론트엔드 전용 · 실제 서비스 화면 아님</span>
      <div className="ml-auto flex flex-wrap gap-1">
        {VARIANTS.map((v) => {
          const active = v.href.endsWith(`/${current}`);
          return (
            <Link
              key={v.href}
              href={v.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3 py-1 transition-colors ${
                active ? "bg-[#C9A96E] text-black" : "hover:text-[#C9A96E]"
              }`}
            >
              {v.label}
            </Link>
          );
        })}
        <Link href="/mockups" className="rounded-full px-3 py-1 hover:text-[#C9A96E]">
          목록
        </Link>
      </div>
    </div>
  );
}
