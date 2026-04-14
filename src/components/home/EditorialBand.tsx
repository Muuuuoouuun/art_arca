"use client";

import Link from "next/link";
import AnimatedContainer from "../AnimatedContainer";
import GlassCard from "../GlassCard";
import { OrnamentalDivider } from "../ClassicalOrnament";
import { exhibitions } from "../../lib/data";
import { SITE_NAME } from "@/lib/site";

const locationCount = new Set(exhibitions.map((exhibition) => exhibition.location)).size;
const categoryCount = new Set(exhibitions.map((exhibition) => exhibition.category)).size;

const briefingCards = [
  {
    value: exhibitions.length.toString().padStart(2, "0"),
    label: "Editions",
    body: "From digital collage and sculpture to bio art, light, fashion, and graffiti-led hybrids.",
  },
  {
    value: locationCount.toString().padStart(2, "0"),
    label: "Seoul Venues",
    body: "A city-wide program built like a route, not a single room. The season moves from yards to labs to galleries.",
  },
  {
    value: categoryCount.toString().padStart(2, "0"),
    label: "Formats",
    body: "Move by medium, object, or mood. The archive should help visitors choose an entry point without flattening the work.",
  },
];

export default function EditorialBand() {
  return (
    <section id="salon" className="relative px-4 pb-10 md:px-8 md:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <AnimatedContainer>
          <div
            className="rounded-[32px] px-6 py-8 md:px-10 md:py-12"
            style={{
              border: "1px solid rgba(201,169,110,0.16)",
              background:
                "linear-gradient(180deg, rgba(20,18,15,0.84) 0%, rgba(14,13,11,0.92) 100%)",
            }}
          >
            <div className="grid gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:items-end">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.55em]"
                    style={{ color: "#C9A96E80" }}
                  >
                    Season Briefing
                  </p>
                  <h2 className="max-w-2xl text-4xl font-serif leading-[0.95] tracking-tight md:text-6xl">
                    A cabinet,
                    <br />
                    not a feed.
                  </h2>
                </div>

                <OrnamentalDivider className="max-w-sm" />

                <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                  {SITE_NAME} works best when it feels like a late-night private view: paced,
                  tactile, and specific. The homepage should help people choose an entry point
                  quickly, then move deeper without losing the atmosphere.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/guide"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border px-5 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-100 transition-colors hover:text-white"
                    style={{ borderColor: "rgba(201,169,110,0.28)" }}
                  >
                    Genre Guide
                  </Link>
                  <Link
                    href="/exhibitions"
                    className="inline-flex min-h-12 items-center justify-center rounded-full px-5 text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-transform hover:-translate-y-0.5"
                    style={{ background: "#C9A96E" }}
                  >
                    See All Editions
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {briefingCards.map((card) => (
                  <GlassCard
                    key={card.label}
                    className="h-full rounded-[28px] border-white/10 bg-white/[0.03] p-5 md:p-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <p className="text-3xl font-serif tracking-tight md:text-4xl">{card.value}</p>
                        <p
                          className="mt-2 text-[10px] font-bold uppercase tracking-[0.35em]"
                          style={{ color: "#C9A96E80" }}
                        >
                          {card.label}
                        </p>
                      </div>
                      <p className="text-sm leading-6 text-zinc-400">{card.body}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
