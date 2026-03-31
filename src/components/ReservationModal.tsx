"use client";

import { useState, useEffect, useCallback } from "react";
import GlassCard from "./GlassCard";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  exhibitionTitle: string;
  exhibitionPeriod: string;
}

const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function ReservationModal({ exhibitionTitle, exhibitionPeriod }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "done">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onClose = () => setIsOpen(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem("art-hub:reservations") ?? "[]");
      existing.push({ exhibitionTitle, name, email, date, time, createdAt: new Date().toISOString() });
      localStorage.setItem("art-hub:reservations", JSON.stringify(existing));
    } catch { /* ignore */ }
    setStep("done");
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full group relative py-6 overflow-hidden rounded-2xl border border-white/10 text-white transition-all duration-700 hover:border-white"
      >
        <span className="relative z-10 text-xs tracking-[0.5em] font-bold group-hover:text-black transition-colors duration-700">RESERVE ACCESS</span>
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg"
            >
              <GlassCard className="p-12 border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {step === "form" ? (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-8 font-mono font-bold">Secure Access Protocol</p>
                    <h2 className="text-4xl font-serif tracking-tight mb-2">{exhibitionTitle}</h2>
                    <p className="text-xs text-zinc-500 mb-12 font-mono uppercase tracking-widest">{exhibitionPeriod}</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Attendee Identity</label>
                        <input
                          type="text" required value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-white/40 outline-none transition-all placeholder:text-zinc-700"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Digital Contact</label>
                        <input
                          type="email" required value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-white/40 outline-none transition-all placeholder:text-zinc-700"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Temporal Coordinates</label>
                        <input
                          type="date" required value={date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-white/40 outline-none transition-all [color-scheme:dark]"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Time Interval</label>
                        <div className="grid grid-cols-4 gap-3">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t} type="button"
                              onClick={() => setTime(t)}
                              className={`text-[10px] py-3 rounded-lg border transition-all font-bold tracking-widest ${
                                time === t
                                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                  : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/30"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!name || !email || !date || !time}
                        className="w-full group relative py-6 overflow-hidden rounded-2xl bg-white text-black text-xs tracking-[0.5em] font-bold transition-all duration-700 disabled:opacity-20 disabled:grayscale"
                      >
                        CONFIRM RESERVATION
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-12 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      <svg width={32} height={32} viewBox="0 0 24 24" stroke="white" strokeWidth={2} fill="none">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                    <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-6 font-mono font-bold">Verification Success</p>
                    <h3 className="text-4xl font-serif tracking-tight mb-8">Access Confirmed</h3>
                    <div className="space-y-2 mb-12 text-zinc-400 font-light">
                      <p className="text-xl text-white">{name}</p>
                      <p className="text-lg">{date} // {time}</p>
                      <p className="text-sm italic mt-4">{exhibitionTitle}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="group relative px-12 py-4 overflow-hidden rounded-full border border-white/20 text-[10px] tracking-[0.3em] font-bold transition-all duration-700 hover:border-white"
                    >
                      <span className="relative z-10 group-hover:text-black transition-colors duration-700 uppercase">Return to Archive</span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
