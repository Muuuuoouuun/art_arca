"use client";

import { useBookmarks } from "../hooks/useBookmarks";
import { useToast } from "../contexts/ToastContext";

interface Props {
  exhibitionId: string;
  variant?: "card" | "detail";
}

export default function BookmarkButton({ exhibitionId, variant = "card" }: Props) {
  const { isBookmarked, toggleBookmark, isLiked, toggleLike } = useBookmarks();
  const { toast } = useToast();
  const bookmarked = isBookmarked(exhibitionId);
  const liked = isLiked(exhibitionId);

  function handleBookmark() {
    toggleBookmark(exhibitionId);
    toast(bookmarked ? "북마크가 해제되었습니다" : "북마크에 저장되었습니다", "success");
  }

  function handleLike() {
    toggleLike(exhibitionId);
    toast(liked ? "좋아요를 취소했습니다" : "좋아요를 눌렀습니다", "success");
  }

  if (variant === "detail") {
    return (
      <div className="flex gap-3">
        <button
          onClick={handleBookmark}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border px-4 py-3 transition-all btn-press ${
            bookmarked
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100"
              : "border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-900 dark:hover:border-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
          }`}
          aria-label={bookmarked ? "북마크 해제" : "북마크 저장"}
        >
          <BookmarkIcon filled={bookmarked} />
          {bookmarked ? "저장됨" : "저장"}
        </button>

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border px-4 py-3 transition-all btn-press ${
            liked
              ? "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-400 dark:border-stone-600"
              : "border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-900 dark:hover:border-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
          }`}
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          <HeartIcon filled={liked} />
          좋아요
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
        handleBookmark();
      }}
      className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center transition-all btn-press ${
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
