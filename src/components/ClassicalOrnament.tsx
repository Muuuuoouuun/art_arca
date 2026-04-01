"use client";

import { motion } from "framer-motion";

// ─── Horizontal ornamental divider ────────────────────────────────
export function OrnamentalDivider({
  className = "",
  color = "#C9A96E",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.3 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center w-full ${className}`}
    >
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color}60)` }}
      />
      {/* Left satellite */}
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mx-2">
        <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill={color} opacity="0.5" />
      </svg>
      {/* Center medallion */}
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mx-1">
        <rect x="4" y="4" width="12" height="12" transform="rotate(45 10 10)" fill="none" stroke={color} strokeWidth="0.8" />
        <rect x="7" y="7" width="6" height="6" transform="rotate(45 10 10)" fill={color} opacity="0.85" />
        {/* outer ring tick marks */}
        <line x1="10" y1="0" x2="10" y2="3" stroke={color} strokeWidth="0.6" opacity="0.4" />
        <line x1="10" y1="17" x2="10" y2="20" stroke={color} strokeWidth="0.6" opacity="0.4" />
        <line x1="0" y1="10" x2="3" y2="10" stroke={color} strokeWidth="0.6" opacity="0.4" />
        <line x1="17" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.6" opacity="0.4" />
      </svg>
      {/* Right satellite */}
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mx-2">
        <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill={color} opacity="0.5" />
      </svg>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${color}60)` }}
      />
    </motion.div>
  );
}

// ─── Corner bracket flourish for cards ────────────────────────────
export function CornerFlourish({
  className = "",
  size = 56,
  color = "#C9A96E",
  corner = "tl",
}: {
  className?: string;
  size?: number;
  color?: string;
  corner?: "tl" | "tr" | "bl" | "br";
}) {
  const sx = corner === "tr" || corner === "br" ? -1 : 1;
  const sy = corner === "bl" || corner === "br" ? -1 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      className={className}
      style={{ transform: `scale(${sx}, ${sy})`, transformOrigin: "center" }}
    >
      {/* Outer L-bracket */}
      <path d="M2 38 L2 4 Q2 2 4 2 L38 2" stroke={color} strokeWidth="0.9" fill="none" />
      {/* Inner L-bracket */}
      <path d="M8 38 L8 10 Q8 8 10 8 L38 8" stroke={color} strokeWidth="0.4" fill="none" opacity="0.45" />
      {/* Corner diamond ornament */}
      <rect x="-2" y="-2" width="8" height="8" transform="rotate(45 2 2)" fill={color} opacity="0.9" />
      {/* Mid-line accent dots */}
      <circle cx="2" cy="20" r="1.3" fill={color} opacity="0.45" />
      <circle cx="20" cy="2" r="1.3" fill={color} opacity="0.45" />
      {/* Small end caps */}
      <line x1="2" y1="38" x2="6" y2="38" stroke={color} strokeWidth="0.8" />
      <line x1="38" y1="2" x2="38" y2="6" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

// ─── Paired laurel accent (for headings) ──────────────────────────
export function LaurelAccent({
  className = "",
  color = "#C9A96E",
  children,
}: {
  className?: string;
  color?: string;
  children?: React.ReactNode;
}) {
  const branch = (
    <svg width="72" height="22" viewBox="0 0 72 22" fill="none">
      <path d="M68 11 Q40 11 6 11" stroke={color} strokeWidth="0.5" opacity="0.5" />
      {([12, 26, 40, 54] as const).map((cx, i) => (
        <ellipse
          key={cx}
          cx={cx}
          cy={11}
          rx={8}
          ry={3.5}
          transform={`rotate(${-15 + i * 9} ${cx} 11)`}
          fill="none"
          stroke={color}
          strokeWidth="0.75"
          opacity={0.75 - i * 0.08}
        />
      ))}
      <circle cx="6" cy="11" r="2.2" fill={color} opacity="0.85" />
    </svg>
  );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {branch}
      {children && <span style={{ color }}>{children}</span>}
      <div style={{ transform: "scaleX(-1)" }}>{branch}</div>
    </div>
  );
}

// ─── Gilded text span ─────────────────────────────────────────────
export function GildedText({
  children,
  className = "",
  tag: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  tag?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag
      className={className}
      style={{
        background: "linear-gradient(135deg, #C9A96E 0%, #F0D89A 35%, #C9A96E 55%, #A07840 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Tag>
  );
}

// ─── Engraving-style decorative number ───────────────────────────
export function ClassicalNumber({
  value,
  className = "",
}: {
  value: string | number;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="absolute">
        <rect x="2" y="2" width="44" height="44" transform="rotate(45 24 24)" fill="none" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5" />
        <rect x="8" y="8" width="32" height="32" transform="rotate(45 24 24)" fill="none" stroke="#C9A96E" strokeWidth="0.3" opacity="0.3" />
      </svg>
      <span
        className="relative z-10 font-serif text-sm tabular-nums"
        style={{ color: "#C9A96E" }}
      >
        {value}
      </span>
    </div>
  );
}
