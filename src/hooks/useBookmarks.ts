"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("art-arca:bookmarks", []);
  const [likes, setLikes] = useLocalStorage<string[]>("art-arca:likes", []);

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
