import type { Metadata } from "next";
import { notFound } from "next/navigation";

import GuideDetailClient from "../_components/GuideDetailClient";
import { findGuideGenre, getGuideGenres } from "@/lib/guide-data";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getGuideGenres().map((genre) => ({
    genre: genre.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata> {
  const { genre } = await params;
  const current = findGuideGenre(genre);

  if (!current) {
    return {
      title: `Guide — ${SITE_NAME}`,
    };
  }

  return {
    title: `${current.nameKo} Guide — ${SITE_NAME}`,
    description: `${current.nameKo} 장르를 처음 볼 때 필요한 감상 포인트, 기초 용어, 그리고 현재 프로그램 정보를 한 페이지에 정리한 가이드.`,
  };
}

export default async function GuideGenrePage({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  const current = findGuideGenre(genre);

  if (!current) {
    notFound();
  }

  return <GuideDetailClient genres={getGuideGenres()} genre={current} />;
}
