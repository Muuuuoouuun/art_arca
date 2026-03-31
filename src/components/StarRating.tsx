"use client";

interface Props {
  value: number;        // 0–5
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: number;
}

export default function StarRating({ value, onChange, readOnly = false, size = 20 }: Props) {
  return (
    <div className="flex gap-1" role={readOnly ? "img" : "group"} aria-label={`${value}점`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(value);
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            className={`transition-all ${
              readOnly ? "cursor-default" : "hover:scale-110 cursor-pointer"
            } ${filled ? "text-stone-800" : "text-stone-300"}`}
            aria-label={`${star}점`}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
