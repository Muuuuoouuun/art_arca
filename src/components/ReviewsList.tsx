"use client";

import StarRating from "./StarRating";
import { useReviews } from "../hooks/useReviews";

export default function ReviewsList({ exhibitionId }: { exhibitionId: string }) {
  const { reviews, deleteReview, averageRating } = useReviews(exhibitionId);

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-stone-400 py-6">
        아직 후기가 없습니다. 첫 번째 관람 후기를 남겨주세요.
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {/* 요약 */}
      <div className="flex items-center gap-4 py-4 border-b border-stone-100">
        <StarRating value={averageRating} readOnly size={16} />
        <span className="text-sm font-light text-stone-600">
          {averageRating.toFixed(1)} · {reviews.length}개 후기
        </span>
      </div>

      {/* 후기 목록 */}
      <div className="space-y-6 pt-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-stone-100 pb-6 last:border-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-sm font-light text-stone-800">{review.userName}</span>
                <span className="text-[9px] text-stone-400 ml-3">
                  {new Date(review.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <StarRating value={review.rating} readOnly size={13} />
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">{review.text}</p>
            <button
              onClick={() => deleteReview(review.id)}
              className="mt-2 text-[8px] uppercase tracking-[0.2em] text-stone-300 hover:text-stone-500 transition-colors"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
