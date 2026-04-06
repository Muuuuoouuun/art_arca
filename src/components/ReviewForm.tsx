"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { useReviews } from "../hooks/useReviews";
import { useToast } from "../contexts/ToastContext";

export default function ReviewForm({ exhibitionId }: { exhibitionId: string }) {
  const { addReview } = useReviews(exhibitionId);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !text.trim()) return;
    addReview({ userName: name, rating, text });
    setName("");
    setRating(0);
    setText("");
    toast("후기가 등록되었습니다", "success");
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-stone-200 dark:border-stone-800 pt-8 space-y-5">
      <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-bold">관람 후기 작성</p>

      {/* 별점 */}
      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-2">별점</p>
        <StarRating value={rating} onChange={setRating} />
        {!rating && <p className="text-[9px] text-stone-400 dark:text-stone-600 mt-1">별점을 선택해주세요</p>}
      </div>

      {/* 이름 */}
      <div>
        <label className="block text-[9px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-2">이름 (선택)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="익명"
          maxLength={30}
          className="w-full bg-transparent border border-stone-200 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-200 px-4 py-3 focus:outline-none focus:border-stone-500 dark:focus:border-stone-400 placeholder:text-stone-300 dark:placeholder:text-stone-600 transition-colors"
        />
      </div>

      {/* 후기 텍스트 */}
      <div>
        <label className="block text-[9px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-2">후기</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="전시를 관람한 소감을 자유롭게 적어주세요."
          rows={4}
          maxLength={500}
          required
          className="w-full bg-transparent border border-stone-200 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-200 px-4 py-3 focus:outline-none focus:border-stone-500 dark:focus:border-stone-400 placeholder:text-stone-300 dark:placeholder:text-stone-600 resize-none transition-colors"
        />
        <p className="text-right text-[9px] text-stone-300 dark:text-stone-600 mt-1">{text.length}/500</p>
      </div>

      <button
        type="submit"
        disabled={!rating || !text.trim()}
        className="text-[10px] uppercase tracking-[0.2em] bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-8 py-3 hover:bg-stone-700 dark:hover:bg-stone-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed btn-press"
      >
        후기 등록
      </button>
    </form>
  );
}
