"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  exhibitionTitle: string;
  exhibitionPeriod: string;
  onClose: () => void;
}

const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function ReservationModal({ exhibitionTitle, exhibitionPeriod, onClose }: Props) {
  const [step, setStep] = useState<"form" | "done">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ESC 키로 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // localStorage에 예약 저장
    try {
      const existing = JSON.parse(localStorage.getItem("art-arca:reservations") ?? "[]");
      existing.push({ exhibitionTitle, name, email, date, time, createdAt: new Date().toISOString() });
      localStorage.setItem("art-arca:reservations", JSON.stringify(existing));
    } catch { /* 저장 실패 무시 */ }
    setStep("done");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 카드 */}
      <div className="relative bg-[#F2F0ED] w-full max-w-md p-10 shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
          aria-label="닫기"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {step === "form" ? (
          <>
            <p className="text-[8px] uppercase tracking-[0.4em] text-stone-400 mb-6">Visit Reservation</p>
            <h2 className="text-2xl font-serif tracking-tight mb-1">{exhibitionTitle}</h2>
            <p className="text-xs text-stone-400 mb-8">{exhibitionPeriod}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="이름" required>
                <input
                  type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="input-base"
                />
              </Field>

              <Field label="이메일" required>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="input-base"
                />
              </Field>

              <Field label="방문 날짜" required>
                <input
                  type="date" required value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-base"
                />
              </Field>

              <Field label="방문 시간" required>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t} type="button"
                      onClick={() => setTime(t)}
                      className={`text-[9px] py-2 border transition-all ${
                        time === t
                          ? "bg-stone-900 text-white border-stone-900"
                          : "border-stone-200 text-stone-600 hover:border-stone-500"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              <button
                type="submit"
                disabled={!name || !email || !date || !time}
                className="w-full text-[10px] uppercase tracking-[0.2em] bg-stone-900 text-white py-4 hover:bg-stone-700 transition-all mt-4 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                예약 신청
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
              <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" className="text-stone-700">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[8px] uppercase tracking-[0.4em] text-stone-400 mb-4">Confirmed</p>
            <h3 className="text-2xl font-serif tracking-tight mb-3">예약이 접수되었습니다</h3>
            <p className="text-sm text-stone-500 leading-relaxed mb-2">{name}님</p>
            <p className="text-sm text-stone-500">{date} {time}</p>
            <p className="text-xs text-stone-400 mt-1 mb-8">{exhibitionTitle}</p>
            <button
              onClick={onClose}
              className="text-[10px] uppercase tracking-[0.2em] border border-stone-300 text-stone-600 px-8 py-3 hover:border-stone-900 hover:text-stone-900 transition-all"
            >
              닫기
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-base {
          width: 100%;
          background: transparent;
          border: 1px solid #e7e5e4;
          color: #1a1a1a;
          padding: 12px 16px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-base:focus { border-color: #78716c; }
        .input-base::placeholder { color: #d6d3d1; }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[9px] uppercase tracking-[0.2em] text-stone-500 mb-2">
        {label}{required && <span className="text-stone-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
