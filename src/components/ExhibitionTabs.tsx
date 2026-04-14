"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpenText,
  Clock3,
  HeartHandshake,
  LucideIcon,
  MapPinned,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import { Exhibition } from "../lib/data";
import { getExhibitionDetailMock } from "../lib/exhibition-detail";
import { ExhibitionStatus } from "../lib/utils";
import { useReviews } from "../hooks/useReviews";
import { useBookmarks } from "../hooks/useBookmarks";
import { LaurelAccent, OrnamentalDivider } from "./ClassicalOrnament";

type DetailTabKey = "community" | "information" | "insights";

interface ExhibitionTabsProps {
  exhibition: Exhibition;
  status: ExhibitionStatus;
}

interface TabConfig {
  key: DetailTabKey;
  label: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  index: string;
  aura: string;
}

const tabs: TabConfig[] = [
  {
    key: "community",
    label: "커뮤니티",
    eyebrow: "Resonance Lounge",
    description: "리뷰와 저장, 살롱 참여가 하나의 흐름으로 이어지는 라이브 레이어",
    icon: HeartHandshake,
    index: "01",
    aura: "rgba(201,169,110,0.2)",
  },
  {
    key: "information",
    label: "정보들",
    eyebrow: "Visit Intelligence",
    description: "현장 감각까지 포함한 방문 시트와 동선 메모를 정리한 아카이브 레이어",
    icon: MapPinned,
    index: "02",
    aura: "rgba(94,122,115,0.18)",
  },
  {
    key: "insights",
    label: "인사이트",
    eyebrow: "Curatorial Decode",
    description: "전시를 더 오래 남게 읽는 해설 보드와 데이터형 해석 레이어",
    icon: BarChart3,
    index: "03",
    aura: "rgba(166,126,80,0.18)",
  },
];

function isDetailTabKey(value: string): value is DetailTabKey {
  return tabs.some((tab) => tab.key === value);
}

function DarkPanel({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] backdrop-blur-xl ${className}`}
      style={style}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_42%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PaperPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`paper-panel relative overflow-hidden rounded-[2rem] border border-black/10 text-[var(--ink)] shadow-[0_35px_80px_-35px_rgba(0,0,0,0.45)] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.24), transparent 40%), repeating-linear-gradient(180deg, rgba(23,20,16,0.035) 0, rgba(23,20,16,0.035) 1px, transparent 1px, transparent 34px)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_34%)] opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function QuickFact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">{label}</p>
      <p className="mt-2 text-lg font-serif leading-tight text-white">{value}</p>
    </div>
  );
}

function MeterRow({
  label,
  value,
  detail,
  accent = "#C9A96E",
}: {
  label: string;
  value: number;
  detail: string;
  accent?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-sm font-serif text-zinc-200">{label}</p>
        <span className="text-sm tabular-nums" style={{ color: accent }}>
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, rgba(240,216,154,0.96))` }}
        />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{detail}</p>
    </div>
  );
}

export default function ExhibitionTabs({ exhibition, status }: ExhibitionTabsProps) {
  const detail = useMemo(() => getExhibitionDetailMock(exhibition, status), [exhibition, status]);
  const { reviews, averageRating } = useReviews(exhibition.id);
  const { isLiked, isBookmarked } = useBookmarks();
  const [activeTab, setActiveTab] = useState<DetailTabKey>("community");
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isDetailTabKey(hash)) {
        setActiveTab(hash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const communityStats = [
    {
      label: "Signals",
      value: `${detail.community.baseStats.signals + reviews.length}`,
      note: "리뷰와 관람 메모가 누적되는 흐름",
    },
    {
      label: "Save Rate",
      value: `${detail.community.baseStats.saveRate + (isBookmarked(exhibition.id) ? 1 : 0)}%`,
      note: "북마크 전환을 고려한 저장 의도",
    },
    {
      label: "Revisit",
      value: `${detail.community.baseStats.revisitIntent + (isLiked(exhibition.id) ? 2 : 0)}%`,
      note: "한 번 더 보고 싶다는 응답 비중",
    },
    {
      label: "Salon Seats",
      value: `${detail.community.baseStats.salonCapacity}`,
      note: "커뮤니티 세션 기준 회차당 수용 인원",
    },
  ];

  const activeTabMeta = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const ActiveIcon = activeTabMeta.icon;

  const quickFactsByTab: Record<DetailTabKey, Array<{ label: string; value: string }>> = {
    community: [
      { label: "Live Signals", value: `${detail.community.baseStats.signals + reviews.length}` },
      { label: "Save Heat", value: `${detail.community.baseStats.saveRate}%` },
      { label: "Average", value: reviews.length > 0 ? averageRating.toFixed(1) : "N/A" },
      { label: "Salon", value: `${detail.community.baseStats.salonCapacity} seats` },
    ],
    information: detail.information.essentials.map((item) => ({
      label: item.label,
      value: item.value,
    })),
    insights: [
      {
        label: "Dominant Signal",
        value:
          detail.insights.bars.reduce((highest, current) =>
            current.value > highest.value ? current : highest
          ).label,
      },
      {
        label: "Peak Score",
        value: String(
          detail.insights.bars.reduce((highest, current) =>
            current.value > highest.value ? current : highest
          ).value
        ),
      },
      { label: "Lens Count", value: `${detail.insights.lenses.length}` },
      { label: "Pairings", value: `${detail.insights.pairings.length}` },
    ],
  };

  const pulseMeters = [
    {
      label: "Archive Heat",
      value: Math.min(100, detail.community.baseStats.signals + reviews.length),
      detail: "지금 이 전시에서 실제로 반응이 쌓이는 속도",
    },
    {
      label: "Return Desire",
      value: detail.community.baseStats.revisitIntent + (isLiked(exhibition.id) ? 2 : 0),
      detail: "좋아요와 재관람 의도까지 포함한 감정 잔존치",
    },
    {
      label: "Save Intent",
      value: detail.community.baseStats.saveRate + (isBookmarked(exhibition.id) ? 1 : 0),
      detail: "북마크 행동으로 이어질 가능성",
    },
  ];

  const handleTabChange = (nextTab: DetailTabKey) => {
    setActiveTab(nextTab);
    const url = new URL(window.location.href);
    url.hash = nextTab;
    window.history.replaceState(null, "", url);
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    handleTabChange(nextTab.key);
    document.getElementById(`detail-tab-${nextTab.key}`)?.focus();
  };

  return (
    <section className="mt-32 pt-20" style={{ borderTop: "1px solid #C9A96E15" }}>
      <div
        className="relative overflow-hidden rounded-[2.6rem] border px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10"
        style={{
          borderColor: "rgba(201,169,110,0.2)",
          background:
            "linear-gradient(180deg, rgba(19,19,19,0.96) 0%, rgba(10,10,10,0.98) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,169,110,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(circle at center, black 38%, transparent 92%)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{ background: activeTabMeta.aura }}
        />
        <div
          className="pointer-events-none absolute -right-12 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(94,122,115,0.14)" }}
        />
        <motion.p
          key={activeTabMeta.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute right-6 top-10 hidden text-right font-serif text-[6rem] leading-none tracking-[-0.07em] text-white/[0.03] xl:block 2xl:text-[8rem]"
        >
          {activeTabMeta.label}
        </motion.p>

        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-end 2xl:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.6em]" style={{ color: "#C9A96E80" }}>
                Detail Atlas Layer
              </p>
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-full border border-[rgba(201,169,110,0.22)] px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-zinc-400">
                  Section {activeTabMeta.index}
                </span>
                <OrnamentalDivider className="hidden md:block max-w-xs flex-1" />
              </div>
              <h3 className="text-4xl font-serif tracking-tight md:text-6xl">
                상세 페이지를 하나의
                <span className="gilded-text block italic">편집형 무드 스테이지</span>
              </h3>
              <LaurelAccent className="mt-6 mb-6" />
              <p className="max-w-3xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
                탭 하나를 누를 때마다 같은 상세 페이지 안에서도 다른 편집 레이어로 넘어가는 감각을 만들었습니다.
                서비스 목업이면서도 전시 사이트다운 밀도와 분위기를 같이 가져가도록 다듬었습니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:min-w-[700px]">
              <QuickFact label="Title" value={exhibition.title} />
              <QuickFact label="Artist" value={exhibition.artist} />
              <QuickFact label="Category" value={exhibition.category} />
              <QuickFact label="Status" value={status} />
            </div>
          </div>

          <div
            role="tablist"
            aria-label="전시 상세 확장 탭"
            className="grid grid-cols-1 gap-3 lg:grid-cols-3"
          >
            {tabs.map((tab, index) => {
              const active = tab.key === activeTab;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  id={`detail-tab-${tab.key}`}
                  type="button"
                  role="tab"
                  tabIndex={active ? 0 : -1}
                  aria-selected={active}
                  aria-controls={`${tab.key}-panel`}
                  onClick={() => handleTabChange(tab.key)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className="group relative overflow-hidden rounded-[1.8rem] border p-5 text-left transition-all duration-500 md:p-6"
                  style={{
                    borderColor: active ? "rgba(201,169,110,0.46)" : "rgba(255,255,255,0.08)",
                    background: active
                      ? "linear-gradient(135deg, rgba(201,169,110,0.1), rgba(255,255,255,0.03))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
                    boxShadow: active ? "0 24px 60px -34px rgba(201,169,110,0.45)" : "none",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at top right, ${tab.aura}, transparent 42%)` }}
                  />
                  {active && (
                    <motion.div
                      layoutId="detail-tab-outline"
                      className="absolute inset-0 rounded-[1.8rem] border"
                      style={{ borderColor: "rgba(240,216,154,0.22)" }}
                    />
                  )}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full border"
                          style={{
                            borderColor: active ? "rgba(201,169,110,0.42)" : "rgba(255,255,255,0.08)",
                            background: active ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.03)",
                          }}
                        >
                          <Icon size={18} color={active ? "#F0D89A" : "#A1A1AA"} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: active ? "#C9A96E" : "#71717A" }}>
                            {tab.eyebrow}
                          </p>
                          <p className="mt-1 text-2xl font-serif text-white">{tab.label}</p>
                        </div>
                      </div>
                      <p className="max-w-md text-sm leading-relaxed" style={{ color: active ? "#E4E4E7" : "#A1A1AA" }}>
                        {tab.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-5">
                      <span className="text-sm font-serif text-white/[0.35]">{tab.index}</span>
                      <ArrowUpRight size={18} color={active ? "#F0D89A" : "#71717A"} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <DarkPanel className="p-6 md:p-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                  <ActiveIcon size={18} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.45em]">{activeTabMeta.eyebrow}</p>
                </div>
                <p className="text-3xl font-serif tracking-tight text-white md:text-4xl">{activeTabMeta.label}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  {activeTabMeta.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 xl:min-w-[640px] xl:grid-cols-4">
                {quickFactsByTab[activeTab].map((fact) => (
                  <QuickFact key={`${activeTab}-${fact.label}`} label={fact.label} value={fact.value} />
                ))}
              </div>
            </div>
          </DarkPanel>

          <AnimatePresence mode="wait">
            {activeTab === "community" && (
              <motion.div
                key="community"
                id="community-panel"
                role="tabpanel"
                aria-labelledby="detail-tab-community"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
                  <DarkPanel className="p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                      <HeartHandshake size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Community Brief</p>
                    </div>
                    <h4 className="max-w-3xl text-3xl font-serif leading-tight tracking-tight text-white md:text-5xl">
                      {detail.community.headline}
                    </h4>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
                      {detail.community.intro}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {detail.community.prompts.map((prompt, index) => {
                        const active = index === selectedPrompt;

                        return (
                          <button
                            key={prompt.label}
                            type="button"
                            onClick={() => setSelectedPrompt(index)}
                            className="rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300"
                            style={{
                              borderColor: active ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.08)",
                              color: active ? "#F3E4BE" : "#A1A1AA",
                              background: active ? "rgba(201,169,110,0.08)" : "rgba(255,255,255,0.03)",
                            }}
                          >
                            {prompt.label}
                          </button>
                        );
                      })}
                    </div>

                    <motion.div
                      key={selectedPrompt}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 overflow-hidden rounded-[1.75rem] border"
                      style={{
                        borderColor: "rgba(201,169,110,0.18)",
                        background:
                          "linear-gradient(135deg, rgba(201,169,110,0.1), rgba(255,255,255,0.02) 58%, rgba(0,0,0,0.2) 100%)",
                      }}
                    >
                      <div className="grid gap-6 px-6 py-6 md:grid-cols-[120px_1fr] md:px-7 md:py-7">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                            Selected Lens
                          </p>
                          <p className="mt-3 text-4xl font-serif leading-none text-white/20">
                            {String(selectedPrompt + 1).padStart(2, "0")}
                          </p>
                        </div>
                        <p className="text-lg font-light leading-relaxed text-zinc-200 md:text-xl">
                          {detail.community.prompts[selectedPrompt]?.response}
                        </p>
                      </div>
                    </motion.div>

                    <div className="mt-8 grid gap-3 md:grid-cols-2">
                      {communityStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-[1.5rem] border p-5"
                          style={{
                            borderColor: "rgba(255,255,255,0.08)",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
                          }}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">{stat.label}</p>
                          <p className="mt-3 text-3xl font-serif tabular-nums text-white">{stat.value}</p>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{stat.note}</p>
                        </div>
                      ))}
                    </div>
                  </DarkPanel>

                  <div className="space-y-6">
                    <DarkPanel className="p-7">
                      <div className="mb-6 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                        <Activity size={18} />
                        <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Pulse Board</p>
                      </div>
                      <div className="mb-7 flex items-center justify-between rounded-[1.4rem] border border-white/[0.08] bg-black/20 px-5 py-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Current Mood</p>
                          <p className="mt-2 text-xl font-serif text-white">
                            {isLiked(exhibition.id) ? "공감이 활성화된 상태" : "관찰 중심의 감상 상태"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
                          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">Live</span>
                        </div>
                      </div>
                      <div className="space-y-5">
                        {pulseMeters.map((meter) => (
                          <MeterRow
                            key={meter.label}
                            label={meter.label}
                            value={meter.value}
                            detail={meter.detail}
                          />
                        ))}
                      </div>
                    </DarkPanel>

                    <DarkPanel className="p-7">
                      <div className="mb-6 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                        <MessageSquareQuote size={18} />
                        <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Salon Schedule</p>
                      </div>
                      <div className="space-y-5">
                        {detail.community.salons.map((salon, index) => (
                          <div key={salon.title} className="relative pl-8">
                            {index !== detail.community.salons.length - 1 && (
                              <span className="absolute left-[10px] top-7 h-[calc(100%+20px)] w-px bg-[rgba(201,169,110,0.18)]" />
                            )}
                            <span className="absolute left-0 top-2 h-5 w-5 rounded-full border border-[rgba(201,169,110,0.36)] bg-[rgba(201,169,110,0.08)]" />
                            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.02] p-5">
                              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="text-xl font-serif text-white">{salon.title}</p>
                                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A96E70" }}>
                                    {salon.host}
                                  </p>
                                </div>
                                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                                  {salon.schedule}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed text-zinc-400">{salon.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DarkPanel>
                  </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "#C9A96E80" }}>
                      Live Input Surface
                    </p>
                    <ReviewForm exhibitionId={exhibition.id} />
                  </div>

                  <PaperPanel className="p-8 md:p-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "var(--gold-dark)" }}>
                      Participation Sheet
                    </p>
                    <h4 className="mt-4 text-3xl font-serif tracking-tight text-[var(--ink)]">
                      커뮤니티 탭은 감상과 참여가 한 번에 이어져야 합니다
                    </h4>
                    <p className="mt-4 text-base leading-relaxed text-black/70">
                      이 구간은 전시의 분위기를 설명하는 자리이면서도, 실제 사용자는 여기서 바로 저장하거나 리뷰를 남기고
                      세션 정보를 확인하게 됩니다. 그래서 정보보다 행동 동선이 먼저 보이도록 리듬을 잡았습니다.
                    </p>
                    <div className="mt-8 space-y-4">
                      {detail.community.etiquette.map((item, index) => (
                        <div
                          key={item}
                          className="grid grid-cols-[44px_1fr] gap-4 rounded-[1.35rem] border border-black/[0.08] bg-white/[0.4] px-4 py-4"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-lg font-serif text-[var(--gold-dark)]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <p className="self-center text-sm leading-relaxed text-black/75">{item}</p>
                        </div>
                      ))}
                    </div>
                  </PaperPanel>
                </div>

                <ReviewsList exhibitionId={exhibition.id} />
              </motion.div>
            )}

            {activeTab === "information" && (
              <motion.div
                key="information"
                id="information-panel"
                role="tabpanel"
                aria-labelledby="detail-tab-information"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_380px]">
                  <PaperPanel className="p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-3" style={{ color: "var(--gold-dark)" }}>
                      <MapPinned size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Visit Sheet</p>
                    </div>
                    <h4 className="max-w-3xl text-3xl font-serif leading-tight tracking-tight md:text-5xl">
                      {detail.information.headline}
                    </h4>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
                      {detail.information.summary}
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      {detail.information.essentials.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.55rem] border border-black/[0.08] bg-white/[0.45] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">{item.label}</p>
                          <p className="mt-3 text-2xl font-serif leading-tight text-[var(--ink)]">{item.value}</p>
                          <p className="mt-3 text-sm leading-relaxed text-black/60">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </PaperPanel>

                  <DarkPanel className="p-8 md:p-9">
                    <div className="mb-6 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                      <Clock3 size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Visitor Notes</p>
                    </div>
                    <div className="space-y-4">
                      {detail.information.visitorNotes.map((note, index) => (
                        <div
                          key={note}
                          className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                            Note {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-base">{note}</p>
                        </div>
                      ))}
                    </div>
                  </DarkPanel>
                </div>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)]">
                  <PaperPanel className="p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-3" style={{ color: "var(--gold-dark)" }}>
                      <BookOpenText size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Viewing Route</p>
                    </div>
                    <div className="space-y-4">
                      {detail.information.checkpoints.map((checkpoint, index) => (
                        <div key={checkpoint.step} className="relative pl-12">
                          {index !== detail.information.checkpoints.length - 1 && (
                            <span className="absolute left-[17px] top-10 h-[calc(100%+18px)] w-px bg-black/10" />
                          )}
                          <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-sm font-serif text-[var(--gold-dark)]">
                            {checkpoint.step}
                          </div>
                          <div className="rounded-[1.45rem] border border-black/[0.08] bg-white/[0.45] p-5">
                            <p className="text-xl font-serif text-[var(--ink)]">{checkpoint.title}</p>
                            <p className="mt-3 text-sm leading-relaxed text-black/70 md:text-base">{checkpoint.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PaperPanel>

                  <div className="space-y-6">
                    <DarkPanel className="p-8 md:p-9">
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "#C9A96E70" }}>
                        Useful Add-ons
                      </p>
                      <div className="mt-6 space-y-4">
                        {detail.information.amenities.map((item) => (
                          <div
                            key={item.title}
                            className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5"
                          >
                            <p className="text-lg font-serif text-white">{item.title}</p>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </DarkPanel>

                    <PaperPanel className="p-7 md:p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/40">Visit Rhythm Memo</p>
                      <p className="mt-4 text-2xl font-serif leading-tight text-[var(--ink)]">
                        정보 탭은 단순 운영정보보다, 실제로 “어떻게 보면 좋은지”를 알려주는 큐레이션 브리프에 가깝습니다.
                      </p>
                      <div className="mt-6 rounded-[1.3rem] border border-black/[0.08] bg-white/[0.45] px-5 py-4">
                        <p className="text-sm leading-relaxed text-black/70">
                          운영 정보, 체류 시간, 촬영 정책, 동선 포인트를 같은 톤으로 묶으면 사용자는 예약 전에 이미 현장 감각을 상상할 수 있습니다.
                        </p>
                      </div>
                    </PaperPanel>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "insights" && (
              <motion.div
                key="insights"
                id="insights-panel"
                role="tabpanel"
                aria-labelledby="detail-tab-insights"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_380px]">
                  <DarkPanel className="p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                      <BarChart3 size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Insight Summary</p>
                    </div>
                    <h4 className="max-w-3xl text-3xl font-serif leading-tight tracking-tight text-white md:text-5xl">
                      {detail.insights.headline}
                    </h4>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
                      {detail.insights.summary}
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      {detail.insights.takeaways.map((takeaway, index) => (
                        <div
                          key={takeaway}
                          className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.03] p-5"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                            Takeaway {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-base">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </DarkPanel>

                  <DarkPanel className="p-8 md:p-9">
                    <div className="mb-6 flex items-center gap-3" style={{ color: "#C9A96E" }}>
                      <Sparkles size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]">Dominant Signal</p>
                    </div>
                    <div className="rounded-[1.6rem] border border-[rgba(201,169,110,0.16)] bg-[rgba(201,169,110,0.05)] p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Highest Reading</p>
                      <p className="mt-3 text-4xl font-serif text-white">
                        {
                          detail.insights.bars.reduce((highest, current) =>
                            current.value > highest.value ? current : highest
                          ).label
                        }
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {
                          detail.insights.bars.reduce((highest, current) =>
                            current.value > highest.value ? current : highest
                          ).detail
                        }
                      </p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {quickFactsByTab.insights.map((fact) => (
                        <QuickFact key={`insight-${fact.label}`} label={fact.label} value={fact.value} />
                      ))}
                    </div>
                  </DarkPanel>
                </div>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                  <DarkPanel className="p-8 md:p-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "#C9A96E70" }}>
                      Resonance Spectrum
                    </p>
                    <div className="mt-7 space-y-5">
                      {detail.insights.bars.map((bar, index) => (
                        <MeterRow
                          key={bar.label}
                          label={`${String(index + 1).padStart(2, "0")} ${bar.label}`}
                          value={bar.value}
                          detail={bar.detail}
                          accent={index % 2 === 0 ? "#C9A96E" : "#8BA59B"}
                        />
                      ))}
                    </div>
                  </DarkPanel>

                  <div className="space-y-6">
                    <DarkPanel className="p-8 md:p-9">
                      <p className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "#C9A96E70" }}>
                        Pairings & Questions
                      </p>
                      <div className="mt-6 space-y-4">
                        {detail.insights.pairings.map((pairing) => (
                          <div
                            key={pairing.title}
                          className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025] p-5"
                          >
                            <p className="text-lg font-serif text-white">{pairing.title}</p>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">{pairing.detail}</p>
                          </div>
                        ))}
                      </div>
                    </DarkPanel>

                    <PaperPanel className="p-7 md:p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Why This Matters</p>
                      <p className="mt-4 text-2xl font-serif leading-tight text-[var(--ink)]">
                        인사이트 탭은 감상 후 대화가 더 길어지게 만드는 질문 보드 역할을 합니다.
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-black/70 md:text-base">
                        해석을 강요하지 않고, 관람자가 자기 문장으로 전시를 다시 꺼내 말할 수 있게 만드는 방향으로 카피와 데이터 표시를 조합했습니다.
                      </p>
                    </PaperPanel>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {detail.insights.lenses.map((lens) => (
                    <DarkPanel key={lens.title} className="p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#C9A96E70" }}>
                        Insight Lens
                      </p>
                      <h5 className="mt-4 text-2xl font-serif text-white">{lens.title}</h5>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">{lens.detail}</p>
                    </DarkPanel>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
