import type { Metadata } from "next";

import GuideHubClient from "./_components/GuideHubClient";
import { getGuideGenres } from "@/lib/guide-data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Genre Guide — ${SITE_NAME}`,
  description:
    "전시, 음악, 오페라, 연극, 무용을 장르별로 고르고 감상 포인트와 현재 프로그램 정보를 함께 보는 기초 지식 가이드.",
};

export default function GuidePage() {
  const genres = getGuideGenres();

  return <GuideHubClient genres={genres} />;
}
