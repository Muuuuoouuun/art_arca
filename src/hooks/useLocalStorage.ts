"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // SSR 안전: 첫 렌더는 initialValue로 시작 (hydration mismatch 방지)
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // localStorage 접근 불가 시 initialValue 유지
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(next));
          }
          return next;
        });
      } catch {
        // 저장 실패 시 무시
      }
    },
    [key]
  );

  return [storedValue, setValue, mounted] as const;
}
