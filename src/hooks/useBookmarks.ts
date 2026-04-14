"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/site";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(STORAGE_KEYS.bookmarks, []);
  const [likes, setLikes] = useLocalStorage<string[]>(STORAGE_KEYS.likes, []);

  const toggleBookmark = useCallback(
    (id: string) => {
      setBookmarks((prev) =>
        prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
      );
    },
    [setBookmarks]
  );

  const toggleLike = useCallback(
    (id: string) => {
      setLikes((prev) =>
        prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
      );
    },
    [setLikes]
  );

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);
  const isLiked = useCallback((id: string) => likes.includes(id), [likes]);

  return { bookmarks, likes, toggleBookmark, toggleLike, isBookmarked, isLiked };
}
