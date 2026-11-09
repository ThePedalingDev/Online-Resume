# Markus CV · Editorial

> Category: Portfolio & Personal

## Intent

Single-page editorial portfolio for a full-stack developer. Calm white canvas, strong typographic hierarchy, photo hero, no decorative motion behind the portrait.

## Surfaces

- **Hero + nav (at top):** seamless `#ffffff` — nav must not use glass or border while hero is in view.
- **Below fold:** nav may use subtle border and light blur over section content.
- **Sections:** white background, `#e5e7eb` dividers.

## Type

- Display: Source Serif 4 — name, section titles, pull quotes.
- Body: Inter — UI, paragraphs, meta.
- Mono: JetBrains Mono — labels, stats, terminal blocks.

### Hero hierarchy (Experience)

1. **Name** — largest, semibold display.
2. **Role** — one muted body line.
3. **Tagline** — display italic; the only “headline” besides the name.
4. **Subline + CTAs** — separated by a hairline; subline is 14px muted context, not a fourth headline.

No employer/availability block in the hero; that lives in Contact.

## Color

- Ink `#111827`, secondary `#374151`, muted `#6b7280`.
- Accent `#1d4ed8` (primary actions, focus rings, links on hover).

## Motion

- Prefer OpenDesign / motion-anything only when recipe-backed; no canvas fields behind hero imagery.
- Respect `prefers-reduced-motion`.

## Components

- Nav: fixed; brand appears only after hero title scrolls away.
- Hero CTAs: pill buttons, centered label, no trailing arrows.
- Status: two-line meta (employer + availability), no status dot.
