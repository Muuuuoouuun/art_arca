"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface FloatingIconicObjectProps {
  src: string;
  alt: string;
  className?: string;
  depth?: number; // Higher = more parallax
  side?: "left" | "right";
}

export function FloatingIconicObject({
  src,
  alt,
  className = "",
  depth = 100,
  side = "right",
}: FloatingIconicObjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 스크롤 값을 스프링으로 걸러 휠 단위 끊김을 줄인다.
  const rawY = useTransform(scrollYProgress, [0, 1], [-depth, depth]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const rotate = useSpring(rawRotate, { stiffness: 60, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, opacity }}
      className={`absolute z-0 pointer-events-none ${
        side === "right" ? "-right-24 md:-right-48" : "-left-24 md:-left-48"
      } ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] mix-blend-screen filter drop-shadow-[0_0_80px_rgba(255,255,255,0.25)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

export function GlyphArtifact({ 
  label, 
  value, 
  className = "" 
}: { 
  label: string; 
  value: string; 
  className?: string 
}) {
  return (
    <div className={`font-mono text-[10px] uppercase tracking-widest text-white/40 flex flex-col gap-1 ${className}`}>
      <span className="opacity-50">{label}</span>
      <span className="text-white/60">{value}</span>
      <div className="w-4 h-[1px] bg-white/20 mt-1" />
    </div>
  );
}
