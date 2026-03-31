"use client";

import { useState } from "react";
import BookmarkButton from "./BookmarkButton";
import ShareButtons from "./ShareButtons";
import ReservationModal from "./ReservationModal";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

interface Props {
  exhibitionId: string;
  exhibitionTitle: string;
  exhibitionTitleKo: string;
  exhibitionPeriod: string;
}

export default function ExhibitionActions({
  exhibitionId,
  exhibitionTitle,
  exhibitionTitleKo,
  exhibitionPeriod,
}: Props) {
  return (
    <>
      {/* 좋아요 / 북마크 / 공유 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-12 pt-8 border-t border-stone-200">
        <BookmarkButton exhibitionId={exhibitionId} variant="detail" />
        <ShareButtons title={exhibitionTitle} titleKo={exhibitionTitleKo} />
      </div>

      {/* 예약 버튼 (사이드바에서 트리거 — 여기선 인라인 렌더 안 함) */}
      {/* 사이드바 예약 버튼은 별도 ReservationTrigger 사용 */}

      {/* 관람 후기 */}
      <section className="mt-16 pt-8 border-t border-stone-200">
        <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-12 font-bold">Reviews</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ReviewsList exhibitionId={exhibitionId} />
          <ReviewForm exhibitionId={exhibitionId} />
        </div>
      </section>

      {/* 예약 모달 */}
      <ReservationModal
        exhibitionTitle={exhibitionTitle}
        exhibitionPeriod={exhibitionPeriod}
      />
    </>
  );
}

/** 사이드바에 배치되는 예약 버튼 — 모달 상태를 독립적으로 관리 */
export function ReservationTrigger({
  exhibitionTitle,
  exhibitionPeriod,
}: {
  exhibitionTitle: string;
  exhibitionPeriod: string;
}) {
  return (
    <ReservationModal
      exhibitionTitle={exhibitionTitle}
      exhibitionPeriod={exhibitionPeriod}
    />
  );
}
