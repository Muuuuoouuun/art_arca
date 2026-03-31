"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Exhibition } from "../lib/data";
import BookmarkButton from "./BookmarkButton";

interface Props {
  exhibitions: Exhibition[];
}

export default function ExhibitionsGrid({ exhibitions }: Props) {
  const categories = ["전체", ...Array.from(new Set(exhibitions.map((ex) => ex.category)))];
  const [active, setActive] = useState("전체");

  const filtered =
    active === "전체" ? exhibitions : exhibitions.filter((ex) => ex.category === active);

  return (
    <>
      {/* Filter Bar */}
      <div className="px-8 md:px-24 py-6 border-b border-stone-100 flex gap-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pb-1 transition-colors ${
              active === cat
                ? "text-stone-900 font-bold border-b border-stone-900"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="px-8 md:px-24 py-16">
        {filtered.length === 0 ? (
          <p className="text-sm text-stone-400 py-12 text-center">해당 카테고리의 전시가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {filtered.map((ex, i) => (
              <Link key={ex.id} href={`/exhibitions/${ex.id}`} className="group block">
                <div
                  className="aspect-[3/4] mb-6 overflow-hidden relative"
                  style={
                    !ex.image
                      ? { backgroundColor: `hsl(${(i * 47) % 360}, 10%, ${82 + (i % 3) * 4}%)` }
                      : undefined
                  }
                >
                  {ex.image ? (
                    <Image
                      src={ex.image} alt={ex.title} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundColor: `hsl(${(i * 47) % 360}, 8%, ${80 + (i % 3) * 4}%)` }}
                    />
                  )}

                  {/* 뱃지 */}
                  {ex.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[8px] uppercase tracking-[0.3em] bg-stone-900 text-white px-3 py-1.5">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* 북마크 버튼 */}
                  <BookmarkButton exhibitionId={ex.id} variant="card" />
                </div>

                <div className="flex justify-between items-start mb-3">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400">
                    {ex.category}
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">{ex.date}</span>
                </div>
                <h2 className="text-2xl font-serif tracking-tight mb-2 group-hover:underline underline-offset-4">
                  {ex.title}
                </h2>
                <p className="text-xs text-stone-500 mb-2">{ex.artist}</p>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{ex.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
