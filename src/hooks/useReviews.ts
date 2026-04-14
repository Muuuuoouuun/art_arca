"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/site";

export interface Review {
  id: string;
  exhibitionId: string;
  userName: string;
  rating: number; // 1–5
  text: string;
  date: string; // ISO string
}

export function useReviews(exhibitionId?: string) {
  const [allReviews, setAllReviews] = useLocalStorage<Review[]>(STORAGE_KEYS.reviews, []);

  const reviews = exhibitionId
    ? allReviews.filter((r) => r.exhibitionId === exhibitionId)
    : allReviews;

  const addReview = useCallback(
    (data: { userName: string; rating: number; text: string }) => {
      if (!exhibitionId) return;
      const review: Review = {
        id: typeof crypto !== "undefined" ? crypto.randomUUID() : String(Date.now()),
        exhibitionId,
        userName: data.userName.trim() || "익명",
        rating: data.rating,
        text: data.text.trim(),
        date: new Date().toISOString(),
      };
      setAllReviews((prev) => [review, ...prev]);
    },
    [exhibitionId, setAllReviews]
  );

  const deleteReview = useCallback(
    (id: string) => {
      setAllReviews((prev) => prev.filter((r) => r.id !== id));
    },
    [setAllReviews]
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return { reviews, addReview, deleteReview, averageRating };
}
