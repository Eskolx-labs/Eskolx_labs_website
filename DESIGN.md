---
name: Eskolx Labs
description: The Eskolx Almanac, an open-source statistics lab in two paper fields.
colors:
  parchment-field: "#ece1c6"
  loam-night: "#241407"
  parchment-ink: "#29190c"
  ink-soft: "#5c4a33"
  field-line: "#a1a187"
  field-line-soft: "#d3c5a3"
  cream-100: "#f0e4c8"
  cream-200: "#e2d1ab"
  wine-300: "#d29cb6"
  wine-400: "#b05a81"
  wine-500: "#963a68"
  wine-600: "#7c2c54"
  wine-700: "#5c1f3e"
  gold-leaf: "#b3946a"
  gold-ink: "#6f542a"
  vermilion: "#bf3b2b"
  vermilion-deep: "#a8321c"
typography:
  script:
    fontFamily: "Kaushan Script, Brush Script MT, cursive"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1
  display:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.04
  headline:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2rem, 3.8vw, 3.2rem)"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.18em"
    textTransform: "uppercase"
rounded:
  sm: "6px"
  full: "9999px"
spacing:
  sm: "16px"
  md: "32px"
  lg: "64px"
components:
  button-primary:
    backgroundColor: "{colors.wine-600}"
    textColor: "{colors.cream-100}"
    border: "1px solid rgb(236 225 198 / 0.75)"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.wine-500}"
    borderColor: "{colors.cream-100}"
    textColor: "{colors.cream-100}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.parchment-ink}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
---

# Design System: The Eskolx Almanac

## Overview

**Creative North Star: "The Field Journal of a Growing Lab"**

This is a statistical lab that writes its own libraries, presented as a grower's almanac: one book, two fields. The light field is the day-spread, the paper of the report sheet where findings are published. The dark field is the night-spread, the loam of the working soil where the lab builds. The page turns between them as the visitor scrolls, so the reading experience itself dramatizes the lab's cycle of digging and harvesting.

Every surface belongs to the field it sits on. Chrome is minimal: hairline rules, corner ticks, a fixed print-tooth grain, and a brush-script wordmark with the engraved seal-die — the logo lockup, recut in wine and field ink. The motion language is scrollytelling in the basement.studio register: sections pin, elements scrub against the scroll with eased settles, and every pinned room carries at least two resolving beats (the seal stamp, the page turn). Content sits on the spread; the animation is the turning of the spread.

**Key Characteristics:**
- Two animated fields (parchment day, loam night) carried on `body` via `--field-bg` / `--field-ink`, flipped by scrubbed ScrollTriggers between sections.
- One brush-script wordmark with the engraved seal-die: the brand mark on every spread (nav, footer).
- Vermilion belongs to the seal alone (see the Seal Rule); buttons are plum.
- Hairline rules, corner ticks, hatched shading, print grain: the letterpress register.
- Scrollytelling: pinned scenes with long scroll rooms, scrubbed timelines normalized to 0-100.

## Colors

The palette is two fields plus a fixed accent set. Fields are carried as CSS custom properties on `body` and animated by ScrollTrigger; every surface tints from the current field.

### Primary
- **Vermilion Seal** (#a8321c, deep; hover #bf3b2b): the single action color. Primary buttons only. The seal-mark logo and the CTA on every spread.
- **Wine** (#7c2c54 family, #b05a81/#963a68/#d29cb6): the grape family, for fruit marks, accent text, chips, focus, selection. Never the primary CTA.

### Secondary
- **Gold Leaf** (#b3946a): rules, ornament, hatch, and the nav's reading-rule progress hairline. Never text at body size.

### Neutral
- **Parchment** (#ece1c6): the day field. Cards, plates, the spread itself.
- **Loam** (#241407, #2e1c0d, #382412, #45301b, #5a4227): the night field and its tonal ramp.
- **Cream** (#f0e4c8 / #e2d1ab / #c2ad85): ink on loam.
- **Parchment Ink** (#29190c): ink on paper.
- **Ink Soft** (#5c4a33): secondary text on paper.
- **Field Line** (#b9a187 / #d3c5a3): hairlines and borders on paper.

### Named Rules
**The Two-Field Rule.** Every surface carries the field of the section it belongs to. No mixed fields, no floating panels in an alien ground.
**The One Vermilion Rule.** Vermilion is the single CTA on any spread. It appears nowhere else; a wine or gold button is a violation.
**The Seal Rule.** The seal-mark is an engraved die, not a filled plate: a double hairline keyline stroked in `--field-ink` (so it presses dark into the day spread and cream into the night spread, always inverting against its field) with the grape cluster filled wine-500 — each berry carrying a small engraved crescent shine — and the vine wine-700: one stem escaping the top-right that coils into a tendril spiral and opens a single veined leaf. Vermilion is retired from the mark; the seal carries no filled background. The die/vine/fruit groups are addressable (`seal-die`, `seal-vine`, `seal-fruit`) so the flood can dissolve the stamp into its own harvest.
**The Signed Rule.** The seal-die (double hairline pressed in field ink, wine cluster) marks the brand and the primary moment. It is never an icon in a list.

## Typography

**Logo Font:** Kaushan Script (with Brush Script MT, cursive)
**Display Font:** IM Fell English (with Iowan Old Style, Georgia, serif)
**Body Font:** Source Serif 4 (with Georgia, serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** A woodcut-print voice: the display is a fel (Fell) English face with a slightly wildcut edge; the body is a reliable book serif. Mono is used for code, measurement, labels, and the almanac's column data, not for decoration.

### Hierarchy
- **Display** (400, clamp(2.75rem,7vw,6rem), 1.04): hero headline, section headlines, card titles. Balance with `text-wrap`.
- **Headline** (400, clamp(2rem,3.8vw,3.2rem), 1.2): section headings.
- **Body** (400, 1rem–1.125rem, 1.625): paragraphs, max 60–65ch.
- **Body Small** (400, 0.9375rem, 1.6): card copy, plate bodies, footer.
- **Code** (400, 13px, 1.5): code samples in plates.
- **Label** (400, 11px, 0.18em tracking, uppercase): mono captions for tiers, phases, footer; gold-leaf or muted ink.

### Named Rules
**The Rule Label Rule.** No eyebrow, no kicker, no decorative headline prefix. Section headings carry the section.
**The Tabular Numbers Rule.** Any number that could be read, counted, or totaled is set in tabular figures.

## Layout

One rhythm: tight groups, generous sections, more space above a heading than below. Sections are `py-24` on loam or paper, with the pinned scenes handling the 300–420vh scroll rooms.

- Container: `max-w-7xl` with `px-4 sm:px-6 lg:px-8`.
- Hero: single column, copy block `max-w-4xl` rising in on load; the seal stamps at the spread's right.
- Tier rail: `lg:grid-cols-[0.9fr_1.1fr]`, stakes left, plate right.
- Roadmap: one pinned, frameless spread — the room holds while three phases rise onto the same open stage, one at a time (gold rule first, then the entry rises whole), releases with a breathing pause while the vine rail keeps drawing past chapter nodes that fill wine; quiet numerals mark the reader's place. Below md and under reduced motion the beats stack as an ordinary flowing section. Secondary/out tweens must set `immediateRender: false` so from-states never pre-light the stage.
- Community: `md:grid-cols-3` for primary channels, `sm:grid-cols-5` for secondary.
- The nav reading rule: a 2px gold hairline under the header filling left-to-right with document scroll. The grounded chrome tints with the field (`--field-bg`/`--field-ink`/`--field-line` via color-mix): warm light over day spreads, dark over night — never fixed loam.
- Browser surfaces: slim wine scrollbar (7px / `thin`), wine selection, wine caret.

### Named Rules
**The Pin Pays for Its Room.** A pin only buys a scroll room it then uses. 300vh of hero must earn it with the masked headline and the field flip; 420vh of tiers must advance the plate.
**The Mobile Pin Rule.** Pins hold `height:100vh` on mobile too; content that cannot fit in 100vh gets its own ordinary section, not a pin.

## Elevation & Depth

Depth is conveyed by the two fields, not by shadows. Plates are flat paper with a hairline border, corner ticks, and a slight float shadow (`0 24px 60px -30px rgb(0 0 0 / .35)`) on loam. Buttons press with a 1px translate, never a drop.

## Shapes

Radius is `6px` (`--radius-sm`). No large radii, no pill shapes except the one seal. Corners are ruled with 18px gold ticks (`.plate-frame`). Hatched shading (`repeating-linear-gradient(-45deg, gold / .16)`) stands in for tone on paper. Borders are 1px hairlines, `currentColor`-aware.

## Components

### Buttons
- **Shape:** 6px, hairline border + inset.
- **Primary:** wine-600 (#7c2c54) fill with cream text, cream hairline over the double plate border, press translate 1px.
- **Hover / Focus:** wine-500 fill and solid cream border on hover, 1px up translate; focus ring `2px var(--wine-500)` at 3px offset.
- **Outline:** transparent, ink text, hairline; 6% paper tint on hover.

### Chips
- **Style:** bordered hairline, gold leaf or wine, mono label, 2px spacing.
- **State:** active chip inverts to wine filled cream text.

### Cards / Containers

- **Corner Style:** 6px or square.
- **Background:** `--field-bg`, or `--loam-900` / `--parchment` plates.
- **Shadow Strategy:** flat paper or plate; shadow only for the loam plate float.
- **Border:** 1px field-line.
- **Internal Padding:** `p-7 lg:p-8` on plates, `p-4 lg:p-5` on code plates.

### Code Block
A mono block on `--loam-950` with a hatched header bar, wine/gold dots, line numbers at 40% cream, `13px` JetBrains Mono.

### Navigation

Fixed, `h-16`, transparent at rest over the hero, paper-field background with `backdrop-blur` once the visitor scrolls (`border-b field-line-soft`). Links are serif `15px` with `underline-offset-8`, gold on hover. The mobile menu is a full-width drop with border rows.

### The Come-and-Go Rule

Every content block outside the pinned machines owns one scrubbed Reveal (`components/reveal.tsx`): it rises in as its box enters (top 88% -> top 54%), sinks back when the reader scrolls it away, and runs at every width — mobile included. Reveals are the only way static copy moves; they must never share an element with a Root-timeline beat.

### Systems Index

- **Field scrub** (`lib/field-controller.ts`): body colors are a pure function of scrollY — each section's from/to pair lerps continuously across its travel (minimal-goods pattern). No boundary flips, no tweens; reduced motion snaps at chapter midpoints.
- **The dock** (hero): the giant script lockup lands pixel-aligned on the nav slot across the first 55% of the pin room; geometry is measured from a never-transformed wrapper so refreshes can't drift.
- **Marquee band**: "FROM SEED TO HARVEST" travels the viewport with per-letter keyframed pop-ins (basement.studio register).
- **Seal flood** (`components/seal-flood.tsx`): pinned interlude where the seal swells past the frame while the day field holds steady. The die releases in the first third of the zoom, so nothing near-black ever covers the spread — the flood belongs to the wine fruit on parchment. The night turn stays reserved for the keepers seam right after (`leadership.tsx` carries `PARCHMENT → LOAM`).
- **Living grain** (`components/living-grain.tsx`): fixed canvas of fibers blown by Lenis velocity; desktop, motion-permitting only.
- **Trellis holds night; dawn turns at a dedicated seam**: the four-tier chapter keeps `LOAM → LOAM` across its whole pin (a mid-read bleach to parchment made tier three unreadable); a short `h-[55vh]` turn Root before the method carries `LOAM → PARCHMENT` so the roadmap still opens on paper.
- **Eshcol identities, typed by hand** (`components/origin-story.tsx`): one pinned spread; each plate rises alone — icon draws, kicker stamps, then title (per character) and body (per word) write themselves from a time-based timeline that fires when the beat's stake of the pin arrives. Scroll velocity sets nothing: a reader who stops still watches the sentence finish, never a half-word freeze. Plates hold for roughly a third of a 340vh room and lift away read.
- **Hydration law**: `Animation`'s child mode renders a `<div>` wrapper — it must never sit inside `<p>`/`<h3>` (invalid nesting breaks SSR hydration). Inline text animation uses target-mode `Animation` or plain spans driven by timelines (`data-tw` units).
- **Nav speaks both languages**: poetic rail words keep a mono plain gloss beneath ("Trellis · Curriculum"); footer matches the nav label exactly.
- **Mobile gets its cover art**: below md the seal flood plays as a one-shot stage (label arrives, stamp swells once past scale 2.5, die releases), the dawn seam halves to 28vh, typing runs at every width, and the header always offers Telegram; the GitHub pill joins from `sm`.
- **Proof is linked**: tier sketch chips, the status ledger's Code row, and the keepers' "Find us in the commit log" all point at github.com/eskolx-labs.
- **Keepers are name and role only**: founders carry no expertise or experience lines; leadership cards show medallion initials, name, role.
- **Harvest table** (community cards): the three channel plates are ruled like ledger rows — identical padding, top-aligned chip/name/handle/desc, a bottom-anchored "Open channel" link row so all three baselines lock regardless of copy length. Because this chapter sits last before a short footer, its entrance beats are self-owned, viewport-relative ScrollTriggers (hero-dock pattern) that cascade threshold-by-threshold so the leftmost plate leads; the shared Root timeline only carries the heading drift.
- **Field guide** (`components/field-guide.tsx`): the practicalities spread after the harvest, held on daylight parchment (the harvest's own field). Motion rides its flow transit: header drifts against scroll while the seal stamps in, do/don't plates wipe open sequentially, join requirements rise one by one, HACKTIVATION ENERGY stamps down, and status-ledger rules draw left to right under their rows. The don't-list states the honest boundaries: no first Python tutorial, no payment promises, AI allowed but every line explained. Copy doctrine for the whole site lives in the Eskolx-Core vault (`Mission`, `Roadmap`, `Long Term Goals`): state mechanisms and numbers, keep the almanac voice, never dress the plan up beyond what the notes say.
- **Type pipeline** (`app/layout.tsx`): the four faces (IM Fell English normal+italic, Source Serif 4 variable, JetBrains Mono variable, Kaushan Script) are self-hosted via `next/font/local` from `app/fonts/*.woff2`, keeping `--font-*` variables unchanged — builds no longer depend on reaching Google Fonts.
- **Flow-chapter transit** (`lib/scrollytelling.tsx`): a non-pinned Root configured `"top bottom"/"bottom top"` spans its natural viewport crossing (element height + viewport), which is what lets bands like the seed-catalog marquee pop letter by letter; the span clamps to the document's last scroll position, so the final chapter before the short footer completes exactly at book close instead of reserving an unreachable tail. Per-letter tweens must render their from-state (`back.out` pop rather than `keyframes`, which ignores from-vars and never hides pre-entry).

### Wordmark & Seal (signature)

The logo lockup from template 1, recut: brush-script wordmark (`--font-script`, Kaushan Script) with the engraved seal-die stamped after it — double hairline in `--field-ink`, cluster wine-500, vine wine-700. Nav: script `1.5rem` + 28px seal; footer: script `3xl` + 44px seal with its own settle animation. No vine illustration ships — grape presence is the die, the wine palette, and the language.

### Entrance & Scroll Beats

On load (all viewports, motion-permitting): the hero copy block rises in (y 44→0, power3.out), then the seal stamps with a ring (scale 2.6 → 0.86 → 1, rotate -18 → -6, power4.in into back.out). On scroll: headline lines mask away per third of the room with a scale push, the copy drifts on a slower layer, CTAs ride out, and each field flip commits in one eased turn. Below `lg` there is no scrubbed timeline — instead the entrance plays and sections stack in reading order.

## Do's and Don'ts

### Do:
- Do use the two fields (parchment, loam) as the page's own paper and ground.
- Do keep vermilion out of active use; it remains only as a historical token.
- Do use hairline 1px borders and `--radius-sm` 6px.
- Do scrub every motion against the scroll: pinned, slowed, or masked.

### Don't:
- Don't drop back to a dark-fixed hero or a single dark page; the two fields are the structure.
- Don't sprinkle vermilion as decoration.
- Don't reintroduce any vine illustration (L-system or hand-drawn SVG) without a commissioned engraving; both prior attempts were rejected.
- Don't stack glass, glow, or neon on top of paper.
- Don't leave any section unpinned but restless; quiet passes earn the loud ones.
