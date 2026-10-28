"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setEnabled(canUseCustomCursor);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let raf: number;
    let mx = -200, my = -200;
    let rx = -200, ry = -200;

    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    // 한 번의 mousemove 핸들러에서 클릭 가능 영역 진입/이탈을 판정한다.
    // mouseover/mouseout은 자식 요소 사이를 오갈 때마다 발생해 링 크기가 깜빡였다.
    let currentlyOverClickable = false;

    const handleMove = (e: MouseEvent) => {
      const overClickable = (e.target as HTMLElement).closest("a, button") !== null;
      if (overClickable === currentlyOverClickable) return;
      currentlyOverClickable = overClickable;

      if (overClickable) {
        ring.style.width = "2.8rem";
        ring.style.height = "2.8rem";
        ring.style.borderColor = "rgba(201,169,110,0.9)";
        ring.style.boxShadow = "0 0 16px rgba(201,169,110,0.45)";
        dot.style.opacity = "0";
      } else {
        ring.style.width = "2rem";
        ring.style.height = "2rem";
        ring.style.borderColor = "rgba(201,169,110,0.55)";
        ring.style.boxShadow = "0 0 8px rgba(201,169,110,0.2)";
        dot.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Lagging outer ring — gold */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: "2rem",
          height: "2rem",
          border: "1px solid rgba(201,169,110,0.55)",
          boxShadow: "0 0 8px rgba(201,169,110,0.2)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      {/* Precise inner dot — white, mix-blend-difference */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-[5px] h-[5px] rounded-full bg-white mix-blend-difference"
        style={{ transition: "opacity 0.2s ease" }}
      />
      <style jsx global>{`
        body { cursor: none; }
        a, button { cursor: none; }
      `}</style>
    </>
  );
}
