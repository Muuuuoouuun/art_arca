"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { useReviews } from "../hooks/useReviews";
import GlassCard from "./GlassCard";

export default function ReviewForm({ exhibitionId }: { exhibitionId: string }) {
  const { addReview } = useReviews(exhibitionId);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !text.trim()) return;
    addReview({ userName: name, rating, text });
    setName("");
    setRating(0);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <GlassCard className="p-10 border-white/10 bg-white/[0.02]">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-mono font-bold">Feedback Loop // Signal</p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Resonance Index</span>
            <StarRating value={rating} onChange={setRating} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Observer ID</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anonymous"
              maxLength={30}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none transition-all placeholder:text-zinc-700"
              style={{ "--tw-ring-color": "transparent" } as React.CSSProperties}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Transmission</label>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your resonance with this masterpiece..."
                rows={4}
                maxLength={500}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none transition-all placeholder:text-zinc-700 resize-none"
                onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <p className="absolute bottom-4 right-6 text-[9px] font-mono text-zinc-700">{text.length}/500</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 pt-4 border-t border-white/5">
          <button
            type="submit"
            disabled={!rating || !text.trim()}
            className="group relative px-12 py-4 overflow-hidden rounded-full text-[10px] tracking-[0.3em] font-bold transition-all duration-700 disabled:opacity-20 disabled:grayscale"
            style={{ border: "1px solid rgba(201,169,110,0.4)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.4)";
            }}
          >
            <span className="relative z-10 transition-colors duration-700 uppercase" style={{ color: "#C9A96E" }}>Transmit Review</span>
            <div
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: "rgba(201,169,110,0.1)" }}
            />
          </button>
          {submitted && (
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold animate-pulse" style={{ color: "#C9A96E", textShadow: "0 0 20px rgba(201,169,110,0.5)" }}>Signal Received // Saved to Archive</p>
          )}
        </div>
      </form>
    </GlassCard>
  );
}
