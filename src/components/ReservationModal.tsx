"use client";

import { useState, useEffect, useCallback } from "react";
import GlassCard from "./GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { STORAGE_KEYS } from "@/lib/site";

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
  const [minDate, setMinDate] = useState("");

  const resetForm = useCallback(() => {
    setStep("form");
    setName("");
    setEmail("");
    setDate("");
    setTime("");
  }, []);

  const openModal = useCallback(() => {
    resetForm();
    setIsOpen(true);
  }, [resetForm]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    setMinDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
        .toISOString()
        .split("T")[0]
    );
  }, []);

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
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.reservations) ?? "[]");
      existing.push({ exhibitionTitle, name, email, date, time, createdAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(existing));
    } catch { /* ignore */ }
    setStep("done");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "0.75rem",
    padding: "1rem 1.5rem",
    color: "white",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-full group relative py-6 overflow-hidden rounded-2xl text-white transition-all duration-700"
        style={{ border: "1px solid rgba(201,169,110,0.3)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A96E")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)")}
      >
        <span className="relative z-10 text-xs tracking-[0.5em] font-bold transition-colors duration-700" style={{ color: "#C9A96E" }}>RESERVE VISIT</span>
        <div
          className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "rgba(201,169,110,0.08)" }}
        />
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="reservation-title"
            >
              <GlassCard
                className="p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 transition-colors"
                  aria-label="예약 모달 닫기"
                  style={{ color: "#52525b" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#C9A96E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#52525b")}
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {step === "form" ? (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-8 font-mono font-bold">Reservation Request</p>
                    <h2 id="reservation-title" className="text-4xl font-serif tracking-tight mb-2">{exhibitionTitle}</h2>
                    <p className="text-xs text-zinc-500 mb-12 font-mono uppercase tracking-widest">{exhibitionPeriod}</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Attendee Identity</label>
                        <input
                          type="text" required value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Digital Contact</label>
                        <input
                          type="email" required value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Temporal Coordinates</label>
                        <input
                          type="date" required value={date}
                          min={minDate}
                          onChange={(e) => setDate(e.target.value)}
                          style={{ ...inputStyle, colorScheme: "dark" } as React.CSSProperties}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Time Interval</label>
                        <div className="grid grid-cols-4 gap-3">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t} type="button"
                              onClick={() => setTime(t)}
                              className="text-[10px] py-3 rounded-lg border transition-all font-bold tracking-widest"
                              style={
                                time === t
                                  ? {
                                      background: "rgba(201,169,110,0.15)",
                                      borderColor: "#C9A96E",
                                      color: "#C9A96E",
                                      boxShadow: "0 0 15px rgba(201,169,110,0.2)",
                                    }
                                  : {
                                      background: "rgba(255,255,255,0.03)",
                                      borderColor: "rgba(255,255,255,0.08)",
                                      color: "#71717a",
                                    }
                              }
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!name || !email || !date || !time}
                        className="w-full group relative py-6 overflow-hidden rounded-2xl text-xs tracking-[0.5em] font-bold transition-all duration-700 disabled:opacity-20 disabled:grayscale"
                        style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.4)", color: "#C9A96E" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.2)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.12)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.4)";
                        }}
                      >
                        CONFIRM VISIT
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-12"
                      style={{
                        background: "rgba(201,169,110,0.08)",
                        border: "1px solid rgba(201,169,110,0.3)",
                        boxShadow: "0 0 30px rgba(201,169,110,0.15)",
                      }}
                    >
                      <svg width={32} height={32} viewBox="0 0 24 24" strokeWidth={2} fill="none" style={{ stroke: "#C9A96E" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                    <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-6 font-mono font-bold">Reservation Complete</p>
                    <h3 className="text-4xl font-serif tracking-tight mb-8">Visit Confirmed</h3>
                    <div className="space-y-2 mb-12 text-zinc-400 font-light">
                      <p className="text-xl text-white">{name}</p>
                      <p className="text-lg">
                        {date} {" / "} {time}
                      </p>
                      <p className="text-sm italic mt-4">{exhibitionTitle}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="group relative px-12 py-4 overflow-hidden rounded-full text-[10px] tracking-[0.3em] font-bold transition-all duration-700"
                      style={{ border: "1px solid rgba(201,169,110,0.3)", color: "#C9A96E" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.3)")}
                    >
                      <span className="relative z-10 uppercase transition-colors duration-700">Return to Archive</span>
                      <div
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ background: "rgba(201,169,110,0.08)" }}
                      />
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
