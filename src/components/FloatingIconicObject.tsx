"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

  const y = useTransform(scrollYProgress, [0, 1], [-depth, depth]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, opacity }}
      className={`absolute z-0 pointer-events-none ${
        side === "right" ? "-right-24 md:-right-48" : "-left-24 md:-left-48"
      } ${className}`}
    >
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
