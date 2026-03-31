"use client";

import { useState } from "react";

interface Props {
  title: string;
  titleKo: string;
}

export default function ShareButtons({ title, titleKo }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard API 미지원 fallback
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  async function nativeShare() {
    if (!navigator.share) { copyLink(); return; }
    try {
      await navigator.share({
        title: `${title} — Art Arca`,
        text: titleKo,
        url: window.location.href,
      });
    } catch { /* 공유 취소 무시 */ }
  }

  return (
    <div className="flex items-center gap-3">
      <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-bold">Share</p>

      {/* 네이티브 공유 (모바일) */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={nativeShare}
          className="text-[9px] uppercase tracking-[0.15em] border border-stone-200 text-stone-500 px-4 py-2 hover:border-stone-700 hover:text-stone-900 transition-all flex items-center gap-2"
        >
          <ShareIcon />
          공유
        </button>
      )}

      {/* 링크 복사 */}
      <button
        onClick={copyLink}
        className={`text-[9px] uppercase tracking-[0.15em] border px-4 py-2 transition-all flex items-center gap-2 ${
          copied
            ? "border-stone-700 text-stone-900 bg-stone-100"
            : "border-stone-200 text-stone-500 hover:border-stone-700 hover:text-stone-900"
        }`}
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied ? "복사됨" : "링크 복사"}
      </button>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} fill="none">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
