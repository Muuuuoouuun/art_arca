import type { ReactNode } from "react";

export type GuideGenreOption = {
  id: string;
  name: string;
  description?: string;
  count?: string;
  accent?: string;
  featured?: boolean;
};

export type GuideHeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export type GuideHeroStat = {
  label: string;
  value: string;
  detail?: string;
};

export type GuideQuickFact = {
  label: string;
  value: string;
  detail?: string;
  tone?: "gold" | "oxide" | "paper";
};

export type GuideContentBlock =
  | {
      kind: "text";
      body: string;
      lead?: string;
    }
  | {
      kind: "quote";
      quote: string;
      attribution?: string;
    }
  | {
      kind: "list";
      title?: string;
      items: string[];
    }
  | {
      kind: "callout";
      label: string;
      title: string;
      body: string;
    }
  | {
      kind: "cards";
      cards: Array<{
        title: string;
        body: string;
        eyebrow?: string;
      }>;
    }
  | {
      kind: "split";
      title?: string;
      body: string;
      points: string[];
    };

export type GuideSection = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  blocks: GuideContentBlock[];
  tone?: "dark" | "paper";
};

export type GuideAccordionItem = {
  id: string;
  title: string;
  body: ReactNode;
  meta?: string;
};

export type GuideAccordionGroup = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: GuideAccordionItem[];
};

export type GuideProgram = {
  id: string;
  title: string;
  genre: string;
  venue: string;
  city?: string;
  period: string;
  status?: "current" | "upcoming" | "ended";
  description: string;
  href?: string;
  image?: {
    src: string;
    alt: string;
  };
  tags?: string[];
  metadata?: Array<{
    label: string;
    value: string;
  }>;
  featured?: boolean;
};
