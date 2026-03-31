"use client";

import { useBookmarks } from "../hooks/useBookmarks";

interface Props {
  exhibitionId: string;
  variant?: "card" | "detail";
}

export default function BookmarkButton({ exhibitionId, variant = "card" }: Props) {
  const { isBookmarked, toggleBookmark, isLiked, toggleLike } = useBookmarks();
  const bookmarked = isBookmarked(exhibitionId);
  const liked = isLiked(exhibitionId);

  if (variant === "detail") {
    return (
      <div className="flex gap-3">
        {/* 북마크 버튼 */}
        <button
          onClick={() => toggleBookmark(exhibitionId)}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border px-4 py-3 transition-all ${
            bookmarked
              ? "bg-stone-900 text-white border-stone-900"
              : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
          }`}
          aria-label={bookmarked ? "북마크 해제" : "북마크 저장"}
        >
          <BookmarkIcon filled={bookmarked} />
          {bookmarked ? "저장됨" : "저장"}
        </button>

        {/* 좋아요 버튼 */}
        <button
          onClick={() => toggleLike(exhibitionId)}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border px-4 py-3 transition-all ${
            liked
              ? "bg-stone-100 text-stone-900 border-stone-400"
              : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
          }`}
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          <HeartIcon filled={liked} />
          {liked ? "좋아요" : "좋아요"}
        </button>
      </div>
    );
  }

  // card variant — 카드 우상단 오버레이 아이콘
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(exhibitionId);
      }}
      className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center transition-all ${
        bookmarked ? "text-stone-900" : "text-white drop-shadow-sm hover:text-stone-900"
      }`}
      aria-label={bookmarked ? "북마크 해제" : "북마크"}
    >
      <BookmarkIcon filled={bookmarked} size={18} />
    </button>
  );
}

function BookmarkIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function HeartIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
