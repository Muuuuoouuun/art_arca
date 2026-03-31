"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BackgroundGlowProps {
  color?: string;
  size?: string;
  opacity?: number;
  className?: string;
}

export default function BackgroundGlow({
  color = "bg-blue-500",
  size = "w-[500px] h-[500px]",
  opacity = 0.15,
  className = "",
}: BackgroundGlowProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={ref} className={`absolute pointer-events-none select-none ${className}`}>
      <motion.div
        style={{ y, scale, opacity }}
        className={`${size} ${color} rounded-full blur-[120px] mix-blend-screen`}
      />
    </div>
  );
}
