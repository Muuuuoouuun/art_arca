"use client";

import StarRating from "./StarRating";
import { useReviews } from "../hooks/useReviews";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsList({ exhibitionId }: { exhibitionId: string }) {
  const { reviews, deleteReview, averageRating } = useReviews(exhibitionId);

  if (reviews.length === 0) {
    return (
      <div className="py-20 text-center border-t border-white/5">
        <p className="text-xl font-serif italic text-zinc-600 mb-4">"The acoustic space is currently empty."</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-800 font-mono font-bold">Waiting for the first resonance signal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between py-8 border-b border-white/10">
        <div className="flex items-center gap-8">
           <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-mono font-bold">Archive Resonance</span>
           <div className="flex items-center gap-4">
              <StarRating value={averageRating} readOnly size={16} />
              <span className="text-2xl font-serif tabular-nums text-white">
                {averageRating.toFixed(1)}
              </span>
           </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
           Total Signals: {reviews.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        <AnimatePresence mode="popLayout">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="group relative border-b border-white/5 pb-10 last:border-0"
            >
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="space-y-1">
                  <h4 className="text-lg font-serif text-white italic group-hover:text-shadow-glow transition-all duration-500">{review.userName || "Anonymous Observer"}</h4>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })} // Logged
                  </p>
                </div>
                <StarRating value={review.rating} readOnly size={12} />
              </div>
              <p className="text-lg font-light text-zinc-400 leading-relaxed italic mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                 <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                       <div key={i} className="w-1 h-1 rounded-full bg-zinc-900 group-hover:bg-zinc-700 transition-colors" />
                    ))}
                 </div>
                 <button
                  onClick={() => deleteReview(review.id)}
                  className="text-[9px] uppercase tracking-[0.3em] text-zinc-800 hover:text-red-500 transition-all font-bold opacity-0 group-hover:opacity-100"
                >
                  Terminate Signal
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
