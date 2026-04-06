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
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <>
      {/* 북마크 / 공유 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
        <BookmarkButton exhibitionId={exhibitionId} variant="detail" />
        <ShareButtons title={exhibitionTitle} titleKo={exhibitionTitleKo} />
      </div>

      {/* 관람 후기 */}
      <section className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800">
        <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-12 font-bold">Reviews</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ReviewsList exhibitionId={exhibitionId} />
          <ReviewForm exhibitionId={exhibitionId} />
        </div>
      </section>

      {reservationOpen && (
        <ReservationModal
          exhibitionTitle={exhibitionTitle}
          exhibitionPeriod={exhibitionPeriod}
          onClose={() => setReservationOpen(false)}
        />
      )}
    </>
  );
}

/** 사이드바에 배치되는 예약 버튼 */
export function ReservationTrigger({
  exhibitionTitle,
  exhibitionPeriod,
}: {
  exhibitionTitle: string;
  exhibitionPeriod: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-[10px] uppercase tracking-[0.2em] bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-4 hover:bg-stone-700 dark:hover:bg-stone-300 transition-all btn-press"
      >
        방문 예약
      </button>
      {open && (
        <ReservationModal
          exhibitionTitle={exhibitionTitle}
          exhibitionPeriod={exhibitionPeriod}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
