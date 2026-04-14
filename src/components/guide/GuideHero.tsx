"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import type { GuideHeroAction, GuideHeroStat } from "./types";

type GuideHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  note?: string;
  stats?: GuideHeroStat[];
  actions?: GuideHeroAction[];
  aside?: ReactNode;
  className?: string;
};

export default function GuideHero({
  eyebrow = "Guide",
  title,
  description,
  note,
  stats = [],
  actions = [],
  aside,
  className,
}: GuideHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={clsx(
        "relative overflow-hidden rounded-[40px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(22,20,16,0.98),rgba(12,12,11,0.98))] px-5 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:px-10 md:py-12",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E66] to-transparent" />
      <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#5E7A73]/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#C9A96E]/10 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">{eyebrow}</p>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-4xl font-serif text-[clamp(3rem,8vw,6.8rem)] leading-[0.9] tracking-[-0.06em]"
          >
            {title}
          </motion.h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-[1.05rem] md:leading-8">
            {description}
          </p>
          {note ? (
            <p className="mt-4 max-w-2xl text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
              {note}
            </p>
          ) : null}

          {actions.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noreferrer" : undefined}
                  className={clsx(
                    "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-[11px] font-bold uppercase tracking-[0.32em] transition-transform duration-300 hover:-translate-y-0.5",
                    action.variant === "secondary"
                      ? "border border-[#C9A96E26] bg-transparent text-zinc-100"
                      : "bg-[#C9A96E] text-black shadow-[0_14px_40px_rgba(201,169,110,0.25)]"
                  )}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}

          {stats.length ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] px-4 py-4 backdrop-blur-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-serif text-2xl tracking-tight text-white">{stat.value}</p>
                  {stat.detail ? <p className="mt-2 text-sm leading-6 text-zinc-400">{stat.detail}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative">
          {aside ? (
            <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
              {aside}
            </div>
          ) : (
            <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
                Editorial cue
              </p>
              <p className="mt-4 font-serif text-3xl tracking-tight text-white">
                A calm entry point before the detail view begins.
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Use this space for a supporting visual, a short curator note, or a compact seasonal summary.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
