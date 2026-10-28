# ADR 0001 — Re-apply the art_hub 0401 interaction fixes, without its images

- Status: Accepted (2026-10-28)
- Context source: the old local repo `art_hub`, commit `81e23eb` (2026-04-01 interaction polish).

## Context
The old `art_hub` repo had one commit that fixed several interaction bugs. That commit was never ported to art_arca:
the hero moved twice on the Y axis, the floating objects jittered, the bento ornaments were clipped by `overflow-hidden`,
the film grain sat above the cursor and modals, the custom cursor hover detection was flaky, and the review list
flashed on filter change. The same commit also swapped in 6 classical object images (baroque_void, opera_stage,
ballet_dancer, classic_cello, marble_bust, renaissance_hand). Their licensing and provenance are not documented.

## Decision
Re-apply only these 6 interaction fixes:
1. `FilmGrain`: `z-[9999]` → `z-[300]`, so the grain no longer covers the cursor, modals or toasts.
2. `CustomCursor`: lerp 0.15. A single passive `mousemove` hit-test (`closest('a,button,[role=button],…')`) replaces the mouseover/mouseout pair. The hover ring gets a gold glow. The existing reduced-motion and coarse-pointer gating is kept.
3. `ReviewsList`: `AnimatePresence mode="sync"` (no blank frame between filters).
4. `AnimatedContainer`: `viewport={{ once: true, amount: 0.08 }}`, so tall blocks on mobile still trigger.
5. `HeroSection` and `FloatingIconicObject`: scroll transforms pass through `useSpring`. The double-Y (scroll parallax plus an inner bob) in the hero is removed. Floating objects bob with `repeatType: "mirror"`.
6. `BentoSection`: each card is split into an outer positioning wrapper and an inner clipped shell, so the sculptural objects can protrude without being cut off. Bob amplitude is reduced and set to mirror.

We do **not** bring:
- the 6 classical images;
- the opera-stage footer background;
- the removal of the porcelain-guitar and bio-cello objects. That removal only made sense together with the image swap.

## Consequences
- No new binary assets, so there is no provenance or licensing question.
- The protruding objects could have caused horizontal overflow. This was verified at 1440 and 390: `scrollWidth - innerWidth = 0` on /, /exhibitions and /guide.
