"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

import type { GuideGenreOption } from "./types";

type GenreSelectorProps = {
  genres: GuideGenreOption[];
  value?: string;
  onChange?: (genreId: string) => void;
  label?: string;
  className?: string;
};

export default function GenreSelector({
  genres,
  value,
  onChange,
  label = "Genre",
  className,
}: GenreSelectorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={clsx("rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl md:p-5", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">{label}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
            Choose a discipline to reveal the right introduction, quick facts, and current programs.
          </p>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
          {genres.length.toString().padStart(2, "0")} categories
        </p>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {genres.map((genre, index) => {
          const active = genre.id === value;

          return (
            <motion.button
              key={genre.id}
              type="button"
              onClick={() => onChange?.(genre.id)}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              className={clsx(
                "group min-w-[11rem] rounded-[24px] border px-4 py-4 text-left transition-colors duration-300",
                active
                  ? "border-[#C9A96E55] bg-[#C9A96E] text-black shadow-[0_12px_40px_rgba(201,169,110,0.22)]"
                  : "border-white/[0.08] bg-white/[0.03] text-white hover:border-[#C9A96E33] hover:bg-white/[0.05]"
              )}
              aria-pressed={active}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={clsx("font-serif text-[1.05rem] tracking-tight", active ? "text-black" : "text-white")}>
                    {genre.name}
                  </p>
                  {genre.description ? (
                    <p className={clsx("mt-2 text-sm leading-6", active ? "text-black/75" : "text-zinc-400")}>
                      {genre.description}
                    </p>
                  ) : null}
                </div>
                <div
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold uppercase tracking-[0.28em]",
                    active ? "border-black/15 bg-black/10 text-black" : "border-white/[0.08] text-[#C9A96E]"
                  )}
                >
                  {genre.count ?? String(index + 1).padStart(2, "0")}
                </div>
              </div>
              {genre.accent ? (
                <p className={clsx("mt-4 text-[10px] font-bold uppercase tracking-[0.32em]", active ? "text-black/60" : "text-[#C9A96E80]")}>
                  {genre.accent}
                </p>
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
