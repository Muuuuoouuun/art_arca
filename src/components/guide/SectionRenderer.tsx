"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

import type { GuideContentBlock, GuideSection } from "./types";

type SectionRendererProps = {
  sections: GuideSection[];
  className?: string;
};

function SectionBlock({ block }: { block: GuideContentBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="space-y-4 text-zinc-300">
          {block.lead ? (
            <p className="max-w-3xl font-serif text-xl italic tracking-tight text-[#E7D1A0] md:text-2xl">
              {block.lead}
            </p>
          ) : null}
          <p className="max-w-3xl text-base leading-7 md:text-[1.05rem] md:leading-8">
            {block.body}
          </p>
        </div>
      );
    case "quote":
      return (
        <blockquote className="max-w-3xl border-l border-[#C9A96E40] pl-5">
          <p className="font-serif text-2xl leading-tight tracking-tight text-white md:text-[2rem]">
            {block.quote}
          </p>
          {block.attribution ? (
            <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <div>
          {block.title ? (
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
              {block.title}
            </p>
          ) : null}
          <ul className="grid gap-3 sm:grid-cols-2">
            {block.items.map((item) => (
              <li
                key={item}
                className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm leading-6 text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout":
      return (
        <div className="rounded-[28px] border border-[#C9A96E26] bg-[linear-gradient(180deg,rgba(201,169,110,0.12),rgba(255,255,255,0.03))] p-5 md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
            {block.label}
          </p>
          <p className="mt-3 font-serif text-2xl tracking-tight text-white md:text-[2.2rem]">
            {block.title}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-[1rem] md:leading-8">
            {block.body}
          </p>
        </div>
      );
    case "cards":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {block.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[28px] border border-white/[0.08] bg-white/[0.04] p-5"
            >
              {card.eyebrow ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                  {card.eyebrow}
                </p>
              ) : null}
              <p className="mt-3 font-serif text-[1.6rem] tracking-tight text-white">
                {card.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{card.body}</p>
            </div>
          ))}
        </div>
      );
    case "split":
      return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            {block.title ? (
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                {block.title}
              </p>
            ) : null}
            <p className="max-w-xl text-base leading-7 text-zinc-300 md:text-[1.05rem] md:leading-8">
              {block.body}
            </p>
          </div>
          <ul className="grid gap-3">
            {block.points.map((point) => (
              <li
                key={point}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm leading-6 text-zinc-300"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export default function SectionRenderer({ sections, className }: SectionRendererProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={clsx("space-y-6", className)}>
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
          className={clsx(
            "rounded-[36px] border px-5 py-6 md:px-8 md:py-8",
            section.tone === "paper"
              ? "border-[#E6DAC7] bg-[linear-gradient(180deg,rgba(243,235,221,0.98),rgba(230,218,199,0.96))] text-[#171410]"
              : "border-white/[0.08] bg-white/[0.03] text-white backdrop-blur-xl"
          )}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              {section.eyebrow ? (
                <p className={clsx("text-[10px] font-bold uppercase tracking-[0.38em]", section.tone === "paper" ? "text-[#5E7A73]" : "text-[#C9A96E80]")}>
                  {section.eyebrow}
                </p>
              ) : null}
              <h3
                className={clsx(
                  "mt-3 font-serif text-[clamp(1.9rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.05em]",
                  section.tone === "paper" ? "text-[#171410]" : "text-white"
                )}
              >
                {section.title}
              </h3>
            </div>
            {section.description ? (
              <p
                className={clsx(
                  "max-w-xl text-sm leading-6 md:text-[1rem] md:leading-7",
                  section.tone === "paper" ? "text-[#433D33]" : "text-zinc-400"
                )}
              >
                {section.description}
              </p>
            ) : null}
          </div>

          <div className="mt-8 space-y-6">
            {section.blocks.map((block, blockIndex) => (
              <motion.div
                key={`${section.id}-${blockIndex}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: blockIndex * 0.05 }}
              >
                <SectionBlock block={block} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
