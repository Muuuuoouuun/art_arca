"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Exhibition } from "../lib/data";
import { getExhibitionStatus, STATUS_LABEL, STATUS_STYLE } from "../lib/utils";
import BookmarkButton from "./BookmarkButton";
import FadeIn from "./FadeIn";

interface Props {
  exhibitions: Exhibition[];
}

export default function ExhibitionsGrid({ exhibitions }: Props) {
  const categories = ["전체", ...Array.from(new Set(exhibitions.map((ex) => ex.category)))];
  const [activeCategory, setActiveCategory] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = exhibitions
    .filter((ex) => activeCategory === "전체" || ex.category === activeCategory)
    .filter((ex) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        ex.title.toLowerCase().includes(q) ||
        ex.titleKo.includes(q) ||
        ex.artist.toLowerCase().includes(q) ||
        ex.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

  return (
    <>
      {/* 검색 바 */}
      <div className="px-6 md:px-24 pt-8 pb-0">
        <div className="relative max-w-sm">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="전시명, 작가, 태그 검색..."
            className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-200 py-2.5 pr-8 focus:outline-none focus:border-stone-700 dark:focus:border-stone-300 placeholder:text-stone-300 dark:placeholder:text-stone-600 transition-colors"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              aria-label="검색어 지우기"
            >
              <svg width={15} height={15} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 dark:text-stone-600" width={15} height={15} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          )}
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="px-6 md:px-24 py-5 border-b border-stone-100 dark:border-stone-800 flex gap-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pb-1 transition-colors btn-press ${
              activeCategory === cat
                ? "text-stone-900 dark:text-stone-100 font-bold border-b border-stone-900 dark:border-stone-100"
                : "text-stone-400 dark:text-stone-600 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 결과 수 */}
      {(query || activeCategory !== "전체") && (
        <div className="px-6 md:px-24 pt-8 pb-0">
          <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
            {filtered.length}개 결과
            {query && <span className="ml-2 text-stone-500 dark:text-stone-400">"{query}"</span>}
          </p>
        </div>
      )}

      {/* 그리드 */}
      <section className="px-6 md:px-24 py-16">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-light text-stone-400 dark:text-stone-600 mb-3">검색 결과가 없습니다</p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("전체"); }}
              className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 underline underline-offset-4 transition-colors"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {filtered.map((ex, i) => {
              const status = getExhibitionStatus(ex.period);
              return (
                <FadeIn key={ex.id} delay={Math.min(i % 3, 2) * 80}>
                  <Link href={`/exhibitions/${ex.id}`} className="group block">
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

                      {/* 상태 배지 */}
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        {ex.featured && (
                          <span className="text-[8px] uppercase tracking-[0.3em] bg-stone-900 text-white px-2.5 py-1">
                            Featured
                          </span>
                        )}
                        <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 ${STATUS_STYLE[status]}`}>
                          {STATUS_LABEL[status]}
                        </span>
                      </div>

                      <BookmarkButton exhibitionId={ex.id} variant="card" />
                    </div>

                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-500">
                        {ex.category}
                      </span>
                      <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500">{ex.date}</span>
                    </div>
                    <h2 className="text-2xl font-serif tracking-tight mb-2 group-hover:underline underline-offset-4">
                      {ex.title}
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">{ex.artist}</p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed line-clamp-2">{ex.description}</p>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
