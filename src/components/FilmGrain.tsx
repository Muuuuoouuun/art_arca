"use client";

export default function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] animate-noise mix-blend-overlay" />
    </div>
  );
}
