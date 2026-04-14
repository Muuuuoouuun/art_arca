"use client";

import { useEffect, useRef } from "react";

export default function AmbientSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || shouldReduceMotion) {
      return;
    }

    let isArmed = false;
    let lastPlayedAt = 0;

    const armAudio = async () => {
      if (!audioContextRef.current) {
        const WebAudioContext =
          window.AudioContext ??
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!WebAudioContext) return;

        audioContextRef.current = new WebAudioContext();
      }

      const ctx = audioContextRef.current;
      if (!ctx) return;

      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch {
          return;
        }
      }

      isArmed = ctx.state === "running";
    };

    const playHoverSound = () => {
      const ctx = audioContextRef.current;
      if (!ctx || !isArmed) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (Date.now() - lastPlayedAt < 120) return;

      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        lastPlayedAt = Date.now();
        playHoverSound();
      }
    };

    const handleFirstIntent = () => {
      void armAudio();
    };

    window.addEventListener("pointerdown", handleFirstIntent, { passive: true });
    window.addEventListener("keydown", handleFirstIntent);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("pointerdown", handleFirstIntent);
      window.removeEventListener("keydown", handleFirstIntent);
      window.removeEventListener("mouseover", handleMouseOver);
      if (audioContextRef.current) {
        void audioContextRef.current.close().catch(() => undefined);
        audioContextRef.current = null;
      }
    };
  }, []);

  return null;
}
