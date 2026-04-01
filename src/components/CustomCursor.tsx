"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    const isClickable = (e: MouseEvent) =>
      (e.target as HTMLElement).closest("a, button") !== null;

    const handleEnter = (e: MouseEvent) => {
      if (!isClickable(e)) return;
      ring.style.width = "3rem";
      ring.style.height = "3rem";
      ring.style.borderColor = "rgba(201,169,110,0.9)";
      ring.style.boxShadow = "0 0 20px rgba(201,169,110,0.5)";
      dot.style.opacity = "0";
    };

    const handleLeave = (e: MouseEvent) => {
      if (!isClickable(e)) return;
      ring.style.width = "2rem";
      ring.style.height = "2rem";
      ring.style.borderColor = "rgba(201,169,110,0.55)";
      ring.style.boxShadow = "0 0 8px rgba(201,169,110,0.2)";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleEnter);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("mouseout", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

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
