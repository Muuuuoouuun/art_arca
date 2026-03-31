"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = "", delay = 0, style }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.07] backdrop-blur-md ${className}`}
      style={style}
    >
      <div className="relative z-10">{children}</div>
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent pointer-events-none" />
    </motion.div>
  );
}
