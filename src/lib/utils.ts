/**
 * "2026.03.01 — 2026.04.30" 형식의 period 문자열에서 전시 상태를 반환합니다.
 */
export type ExhibitionStatus = "current" | "upcoming" | "ended";

export function getExhibitionStatus(period: string): ExhibitionStatus {
  try {
    const [startStr, endStr] = period.split("—").map((s) => s.trim());
    const start = new Date(startStr.replace(/\./g, "-"));
    const end = new Date(endStr.replace(/\./g, "-"));
    const now = new Date();

    if (now < start) return "upcoming";
    if (now > end) return "ended";
    return "current";
  } catch {
    return "upcoming";
  }
}

export const STATUS_LABEL: Record<ExhibitionStatus, string> = {
  current: "진행중",
  upcoming: "예정",
  ended: "종료",
};

export const STATUS_STYLE: Record<ExhibitionStatus, string> = {
  current: "bg-stone-900 text-white",
  upcoming: "bg-stone-100 text-stone-600 border border-stone-300",
  ended: "bg-transparent text-stone-400 border border-stone-200",
};
