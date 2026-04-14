# DESIGN.md for art_arca / Art Hub 4.2

## 1. Brand Thesis
Art Hub 4.2 should feel like a night museum opening crossed with a collector's cabinet.

The first screen is cinematic, atmospheric, and confident. Deeper sections become warmer, calmer, and more tactile, like moving from glass and light into paper labels, shelf edges, and archival notes.

This product should not feel like a startup dashboard wearing an art costume. It should feel curated.

## 2. Reference Blend
- From [awesome-design-md](https://github.com/VoltAgent/awesome-design-md): use the `DESIGN.md` pattern itself as the source of truth for future visual development.
- From the Notion-inspired direction in that collection: warm-neutral surfaces, whisper borders, editorial restraint, and paper-like calm in lighter sections.
- From [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): hero-first hierarchy, luxury serif pairing, exaggerated minimalism, strong CTA clarity, and mobile-safe spacing/touch targets.
- From the current product: gilded accents, sculptural objects, glass surfaces, Seoul-based exhibition framing, and collectible archive behavior.

## 3. Visual System

### Color
- Canvas: `#0F0F0D`
- Ink: `#171410`
- Gold: `#C9A96E`
- Gold Soft: `#E7D1A0`
- Oxide Teal: `#5E7A73`
- Paper: `#F3EBDD`
- Paper Shadow: `#E6DAC7`
- Mist Text: `#A29A8B`

Rules:
- Gold is the main accent, not a blanket fill color.
- Use oxide teal as atmospheric contrast, not as the primary brand color.
- Avoid purple-led glows and generic neon gradients.
- Dark sections should feel smoky and expensive, not gamer-like.
- Light sections should feel archival and tactile, not corporate white.

### Typography
- UI and body copy: clean sans, highly readable, slightly editorial in rhythm.
- Headlines: high-contrast serif.
- Decorative emphasis: italic serif only in strategic moments.
- Labels, dates, metadata: mono or tightly tracked uppercase sans.

Rules:
- Hero headlines should be oversized and decisive.
- Supporting copy should stay readable and grounded.
- Use italics as punctuation, not as a default personality.
- Keep line lengths controlled: readable on mobile, elegant on desktop.

### Surfaces
- Dark cards: soft glass, whisper borders, restrained blur.
- Light archive cards: paper/label feel with subtle shadows.
- Dividers should feel engraved or hairline, never heavy.

### Motion
- Motion should feel slow, intentional, and atmospheric.
- Favor opacity and transform over large choreography.
- Use 150-300ms for UI feedback, slower only for ambient floating objects.
- Respect reduced motion.

## 4. Layout Rules

### Global
- Use a hero-first landing structure.
- Maintain one dominant CTA per screen section.
- Desktop should feel expansive; mobile should feel stacked but still luxurious.
- Avoid accidental horizontal scroll and tiny tap targets.

### Homepage Order
1. Hero
2. Editorial briefing band
3. Curated highlights grid
4. Warm archive cabinet
5. Closing CTA / footer

### Hero
- One oversized statement headline.
- One grounded paragraph that explains the real value.
- Immediate CTA plus a calmer secondary path.
- A short fact rail is allowed if it clarifies the season.

### Editorial Band
- This is where we explain the product logic.
- It should feel like a curator's note or briefing, not product marketing jargon.

### Highlight Grid
- Each card should represent a different way into the season: blockbuster, object, mood, or visit-planning path.
- Cards should not all speak in the same tone. Vary rhythm and scale.

### Archive Section
- Must feel warmer than the hero.
- Should evoke shelves, labels, editions, and collection depth.
- The archive is not a generic grid. It is a cabinet.

### Footer
- End with a strong emotional reason to return.
- Use real internal links, not placeholders.

## 5. Copy System

### Voice
- Curatorial
- Precise
- Slightly poetic
- Confident, never vague

### Prefer
- season
- edition
- cabinet
- archive
- salon
- Seoul
- save
- reserve
- return
- collect
- revisit

### Avoid
- synergy
- digital void
- next-gen experience
- immersive platform
- cutting-edge ecosystem
- generic luxury filler

### Writing Rules
- Headlines: 3-6 words when possible.
- Supporting text should name real behavior, real places, or real content.
- If a feature exists, say what it lets the visitor do.
- If a statement is poetic, anchor it with something concrete nearby.

## 6. Component Rules

### Navigation
- Fixed and refined.
- Mobile must still expose section paths clearly.
- CTA should be visible without overpowering the brand block.

### Buttons
- Minimum comfortable touch size.
- Primary buttons may fill with gold on hover.
- Secondary buttons should feel quieter and more archival.

### Cards
- Big cards can be cinematic.
- Small cards should carry a strong point of view and one clear action.

### Archive Tiles
- Each tile should feel collectible.
- Hover states can reveal title/artist metadata and a saved-state action.

## 7. Accessibility + UX
- Maintain visible focus states.
- Keep labels legible on mobile.
- No feature should depend on hover alone.
- Motion must reduce gracefully.
- Body copy should remain easy to read even when the design is dramatic.

## 8. Success Check
If a new section looks like a premium SaaS landing page with art words pasted in, it is wrong.

If it feels like a curated exhibition platform with cinematic tension up front and archival warmth underneath, it is right.

## 9. Shopify Editions Notes

Reference pages:
- https://www.shopify.com/editions
- https://www.shopify.com/editions/winter2026

What to borrow:
- Treat each season like a named cultural object, not just a release date.
- Keep one very clear seasonal headline and one short supporting line.
- Use a sticky chapter navigation for deep landing pages.
- Let every chapter open with one sharp statement, then a small cluster of repeatable cards.
- Build a clearer bridge between overview-level storytelling and detail-level actions.
- Make the archive of past seasons feel collectible, almost like covers or volumes.
- Use repeated CTA grammar so scanning feels easy.

How that maps to Art Hub:
- Home hero should present the season as a titled edition, not just a homepage.
- The current section nav can become more chapter-like and less generic.
- The current briefing and bento sections should use tighter, repeatable card grammar.
- A dedicated editions index or seasonal archive view would be high value.
- Cards should pair poetry with utility: read, save, reserve, revisit.

What not to borrow:
- Do not import software-product taxonomy literally.
- Do not flood the page with dozens of nearly identical update cards.
- Do not let utility overwhelm atmosphere.

Implementation priority:
1. Season identity system, title, subtitle, and chapter labels.
2. Sticky chapter rail with stronger scanability.
3. Seasonal archive / editions index.
4. More consistent CTA language across cards and detail views.
