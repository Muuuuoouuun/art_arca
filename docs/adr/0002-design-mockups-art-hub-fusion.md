# ADR 0002 — Design mockups (시안) fusing art_hub and art_arca

- Status: Proposed. The mockups are for review only, and no variant is adopted yet.
- Date: 2026-10-28

## Context
준혁님 asked for 2–3 frontend-only variants that combine the strongest design elements of the old local `art_hub` and the current `art_arca`.

The two sides contribute different things:
- **art_hub** has a strong type-led hero ("ARTISTIC / SOUL." gilded serif plus a grey italic second line), a left meta rail (REF / COORD), laurel and ornamental dividers, an archive "shelf" with classical numerals, bento cards with objects breaking out of the frame, and a purple/blue glow field.
- **art_arca** has season-driven copy ("Art for a restless city."), DESIGN.md tokens (Canvas / Gold / Oxide Teal / Paper), a dark→paper section rhythm, the genre guide hub, and real routes and data.
- **Problem with today's art_arca home hero:** at 1440 the headline overlaps the hero image, and the floating nav overlaps the eyebrow.

## Decision
Add the routes `/mockups`, `/mockups/a`, `/mockups/b` and `/mockups/c`:
- They are statically rendered, `noindex`, and use the existing `src/lib/data.ts` and `guide-data.ts`.
- They make no backend or API changes and touch no production page.
- A sticky "시안 Mockup" bar switches between the variants.

| Variant | From art_hub | From art_arca | Why |
|---|---|---|---|
| **A · Gilded Night** | Two-line gilded/italic type hero, meta rail (only true facts: season, base, edition count), ornamental divider, cool glow (re-tinted to oxide teal plus a faint violet, per DESIGN.md "avoid purple-led") | Season copy, one dominant CTA plus a calm secondary link to the guide, featured cards, a paper "how it works" band | Keeps the cinematic first screen and moves the image into its own column, which fixes the current text/image collision. |
| **B · Collector's Cabinet** | MASTER-REGISTRY-style numbered list, physical shelf shadow, laurel accent, italic numerals | Paper #F3EBDD archive tone, label cards, guide hub as the closing section, ≥44px tap targets | A light, readable, archive-first home that is the closest to DESIGN.md's "collector's cabinet" thesis and best for scanning on mobile. |
| **C · Salon Wall** | Bento card with the iconic object protruding from the frame (using the 0401 wrapper/shell split), gold rim glow | Salon-hang image collage, genre-guide pills, gold-led palette | Image-first discovery. It includes an **AI curator mockup** that does NOT call any API: the buttons filter locally by exhibition tags, and the block is labelled "목업 · API 호출 없음". |

## Consequences
- These routes are reachable in builds. Before any production deploy, either delete `/mockups` after a variant is chosen, or gate it behind an environment flag.
- Fact rule: the meta rails and copy only state things the data supports (season, Seoul, count of editions). No visitor counts, ratings or rankings were invented.
- Screenshots and the comparison sheet are in `/workspace/community_survey/shots/after/art_arca/` (`mockup-{a,b,c}-{desktop,mobile}[-full].png`, `mockups-compare.png`).
