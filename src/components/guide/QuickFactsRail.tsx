"use client";

import clsx from "clsx";

import type { GuideQuickFact } from "./types";

type QuickFactsRailProps = {
  facts: GuideQuickFact[];
  className?: string;
  label?: string;
  compact?: boolean;
};

const toneClasses: Record<NonNullable<GuideQuickFact["tone"]>, string> = {
  gold: "text-[#E7D1A0]",
  oxide: "text-[#8AA7A0]",
  paper: "text-[#F3EBDD]",
};

export default function QuickFactsRail({
  facts,
  className,
  label = "Quick facts",
  compact = false,
}: QuickFactsRailProps) {
  return (
    <aside className={clsx("rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl md:p-5", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">{label}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
          {facts.length.toString().padStart(2, "0")} points
        </p>
      </div>

      <div className={clsx("mt-4 grid gap-3", compact ? "sm:grid-cols-2" : "lg:grid-cols-2")}>
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-[24px] border border-white/[0.08] bg-black/20 px-4 py-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              {fact.label}
            </p>
            <p className={clsx("mt-2 font-serif tracking-tight", compact ? "text-xl" : "text-[1.6rem]", toneClasses[fact.tone ?? "gold"])}>
              {fact.value}
            </p>
            {fact.detail ? (
              <p className="mt-2 text-sm leading-6 text-zinc-400">{fact.detail}</p>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
