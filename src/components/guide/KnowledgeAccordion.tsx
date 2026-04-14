"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

import type { GuideAccordionGroup } from "./types";

type KnowledgeAccordionProps = {
  groups: GuideAccordionGroup[];
  className?: string;
};

export default function KnowledgeAccordion({ groups, className }: KnowledgeAccordionProps) {
  return (
    <div className={clsx("space-y-6", className)}>
      {groups.map((group, index) => (
        <motion.section
          key={group.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
          className="rounded-[36px] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl md:p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              {group.eyebrow ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#C9A96E80]">
                  {group.eyebrow}
                </p>
              ) : null}
              <h3 className="mt-3 font-serif text-3xl tracking-tight text-white">
                {group.title}
              </h3>
            </div>
            {group.description ? (
              <p className="max-w-xl text-sm leading-6 text-zinc-400">{group.description}</p>
            ) : null}
          </div>

          <div className="mt-5 space-y-3">
            {group.items.map((item, itemIndex) => (
              <details
                key={item.id}
                className="group rounded-[24px] border border-white/[0.08] bg-black/20 open:border-[#C9A96E33]"
                open={index === 0 && itemIndex === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 md:px-5">
                  <div>
                    <p className="font-serif text-[1.2rem] tracking-tight text-white">
                      {item.title}
                    </p>
                    {item.meta ? (
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                        {item.meta}
                      </p>
                    ) : null}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A96E26] text-[#C9A96E] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-white/[0.08] px-4 py-4 text-sm leading-7 text-zinc-300 md:px-5">
                  {item.body}
                </div>
              </details>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
