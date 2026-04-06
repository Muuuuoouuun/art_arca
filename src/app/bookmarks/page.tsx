"use client";

import Link from "next/link";
import Image from "next/image";
import { exhibitions } from "../../lib/data";
import { useBookmarks } from "../../hooks/useBookmarks";
import AnimatedContainer from "../../components/AnimatedContainer";
import BookmarkButton from "../../components/BookmarkButton";
import FadeIn from "../../components/FadeIn";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const saved = exhibitions.filter((ex) => bookmarks.includes(ex.id));

  return (
    <AnimatedContainer>
      <div className="bg-background min-h-screen text-foreground">
        <header className="px-6 md:px-24 pt-28 pb-16 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-4">My Collection</p>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Bookmarks</h1>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">{saved.length}개의 저장된 전시</p>
          </div>
        </header>

        <section className="px-6 md:px-24 py-16 min-h-[50vh]">
          {saved.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 border border-stone-200 dark:border-stone-800 flex items-center justify-center mb-8">
                <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none" className="text-stone-300 dark:text-stone-700">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </div>
              <p className="text-lg font-light text-stone-500 dark:text-stone-400 mb-2">저장한 전시가 없습니다</p>
              <p className="text-sm text-stone-400 dark:text-stone-600 mb-10">마음에 드는 전시에 북마크를 눌러 저장하세요.</p>
              <Link
                href="/exhibitions"
                className="text-[10px] uppercase tracking-[0.2em] border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 px-10 py-4 hover:border-stone-900 dark:hover:border-stone-200 hover:text-stone-900 dark:hover:text-stone-100 transition-all btn-press"
              >
                전시 둘러보기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
              {saved.map((ex, i) => (
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
                      <BookmarkButton exhibitionId={ex.id} variant="card" />
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-500">{ex.category}</span>
                      <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500">{ex.date}</span>
                    </div>
                    <h2 className="text-2xl font-serif tracking-tight mb-2 group-hover:underline underline-offset-4">{ex.title}</h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">{ex.artist}</p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed line-clamp-2">{ex.description}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </section>

        <div className="pb-24" />
      </div>
    </AnimatedContainer>
  );
}
