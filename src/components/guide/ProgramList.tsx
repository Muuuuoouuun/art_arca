"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

import type { GuideProgram } from "./types";

type ProgramListProps = {
  items: GuideProgram[];
  className?: string;
  label?: string;
  emptyState?: string;
};

function ProgramCard({ program, index }: { program: GuideProgram; index: number }) {
  const statusLabel = program.status ? program.status.toUpperCase() : "PROGRAM";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(24,21,18,0.98),rgba(10,10,10,0.98))] p-5 backdrop-blur-xl md:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E55] to-transparent" />
      <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-[#5E7A73]/10 blur-3xl" />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A96E80]">
              {program.genre}
            </p>
            <h4 className="mt-3 font-serif text-[1.8rem] leading-tight tracking-tight text-white md:text-[2.2rem]">
              {program.title}
            </h4>
          </div>
          <div className="rounded-full border border-white/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
            {statusLabel}
          </div>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-zinc-400">
          {program.description}
        </p>

        {program.image ? (
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/20">
            <div className="relative aspect-[16/10]">
              <Image
                src={program.image.src}
                alt={program.image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Venue
            </p>
            <p className="mt-2 text-sm leading-6 text-white">{program.venue}</p>
            {program.city ? <p className="mt-1 text-sm leading-6 text-zinc-400">{program.city}</p> : null}
          </div>
          <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Period
            </p>
            <p className="mt-2 text-sm leading-6 text-white">{program.period}</p>
          </div>
        </div>

        {program.metadata?.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {program.metadata.map((entry) => (
              <div
                key={entry.label}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] px-4 py-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  {entry.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white">{entry.value}</p>
              </div>
            ))}
          </div>
        ) : null}

        {program.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {program.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#C9A96E26] bg-[#C9A96E0D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E7D1A0]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {program.href ? (
          <div className="mt-auto pt-2">
            <Link
              href={program.href}
              className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#C9A96E26] px-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-100 transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#C9A96E50]"
            >
              <span>{program.featured ? "Open feature" : "View details"}</span>
              <span className="text-[#C9A96E]">→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function ProgramList({
  items,
  className,
  label = "Current programs",
  emptyState = "No programs are available in this genre yet.",
}: ProgramListProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!items.length) {
    return (
      <div className={clsx("rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-6 text-sm leading-7 text-zinc-400", className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <section className={clsx("space-y-5", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">{label}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            A gentle bridge from editorial context to action, with the most relevant event data first.
          </p>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
          {items.length.toString().padStart(2, "0")} results
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={shouldReduceMotion ? 0 : index} />
        ))}
      </div>
    </section>
  );
}
