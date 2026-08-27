---
name: Eskolx Labs
description: The Eskolx Almanac, an open-source statistics lab in two paper fields.
colors:
  parchment-field: "#ece1c6"
  loam-night: "#241407"
  parchment-ink: "#29190c"
  ink-soft: "#5c4a33"
  field-line: "#b9a67f"
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
    letterSpacing: "0.2em"
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

This is a statistical lab that writes its own libraries, presented as a grower's almanac: one book, two fields. The light field is the day-spread, the paper of the report sheet where findings are published. The dark field is the night-spread, the loam of the working soil where the lab builds. The book opens on the night cover and closes on night — the founder's order: dark cover, day identity, night trellis, day method, night keepers, day harvest, night close — and the page turns between fields as the visitor scrolls, so the reading experience itself dramatizes the lab's cycle of digging and harvesting.

Every surface belongs to the field it sits on. Chrome is minimal: hairline rules, corner ticks, a fixed print-tooth grain, and a brush-script wordmark with the engraved seal-die — the logo lockup, recut in wine and field ink. The motion language is scrollytelling in the basement.studio register: sections pin, elements scrub against the scroll with eased settles, and every pinned room carries at least two resolving beats (the seal stamp, the page turn). Content sits on the spread; the animation is the turning of the spread.

**Key Characteristics:**
- Two animated fields (parchment day, loam night) carried on `body` via `--field-bg` / `--field-ink`, flipped by scrubbed ScrollTriggers between sections. The seams-only rule: a chapter always reads on a settled field. Turns live in dedicated empty seams (dusk-seam, dawn-seam, keepers-dusk, harvest-dawn, guide-dusk) or in a room's content-empty tail (`field.turnAt`), never under readable copy. The turn's ink snaps, it does not lerp: the background eases the full turn, but text holds its from-field ink until the background passes the pair's luminance crossover, then re-inks in one step. The flip point is computed per palette pair at registration (parchment→loam flips near 54% of the turn, loam→parchment near 46%; a fixed 55% left the dawn direction at 2.86:1). A lerped ink crosses the background's midpoint luminance and sits near-invisible (~1.1:1) for half of every turn; held-then-snapped keeps both sides of the flip at 3.3:1 or better and reads as the spread being re-pressed.
- One brush-script wordmark with the engraved seal-die: the brand mark on every spread (nav, footer).
- Vermilion belongs to the seal alone (see the Seal Rule); buttons are plum.
- Hairline rules, corner ticks, hatched shading, print grain: the letterpress register.
- Scrollytelling: pinned scenes with long scroll rooms, scrubbed timelines normalized to 0-100.

## Colors

The palette is two fields plus a fixed accent set. Fields are carried as CSS custom properties on `body` and animated by ScrollTrigger; every surface tints from the current field.

### Primary
- **Vermilion Seal** (#a8321c, deep; hover #bf3b2b): reserved for the seal mark alone. Buttons are plum/wine (`btn-wine`); vermilion appears on no control.
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
- **Body** (400, 1rem–1.125rem, 1.625): paragraphs, max 72ch.
- **Body Small** (`text-copy`, 400, 0.9375rem — 16px under md, 1.6): card copy, plate bodies, footer links.
- **Code** (400, 13px, 1.5): code samples in plates.

### Type tokens
Named roles live in `@theme` (globals.css) so new type can't spawn fresh arbitrary values:
- `text-copy` — the secondary body size (0.9375rem). Phones bump to base via `max-md:text-base`.
- `text-kicker` — every uppercase mono label is 11px, no exceptions.
- `tracking-label-snug` (0.16em) — compact caps: nav items, menu glosses, FAQ keys, the scroll cue.
- `tracking-label` (0.2em) — the standard kicker track: section kickers, badges, footer column heads.
- Display moments only (seal label, community Telegram rows) may exceed the stops at 0.28–0.35em.

Card-level h3s sit at `text-2xl leading-snug`; movement/chapter titles may run larger (`sm:text-3xl`, `md:text-4xl`). The origin-story headline keeps its own smaller clamp on purpose — it shares its column with a portrait plate.
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
**The Pin Pays for Its Room.** A pin only buys a scroll room it then uses. 200vh of cover must earn it with the mark's lift and the field flip; the motto (230vh) and the thesis (280vh) spreads must land their decomposition and their masked lines by ~90% of their rooms; 360vh of tiers and 230vh of the guide's bar must land their final plate by ~90% of the room.
**The Mobile Pin Rule.** By default pins collapse below `md`: the spacer drops to auto and the sticky shell becomes flow, and the Root builds no scrubbed timeline. The **mobile pin tier** (`pinMobile` + `mobilePins`) — the four-tier trellis (240vh), the guide's bar (220vh), the seal flood (180vh), and the three opening spreads (cover 200vh, motto 230vh, thesis 280vh) — keeps shortened rooms on portrait phones AND on short desktop windows (500–699px of height): their plate stacks and centered type fit those shells, so the animations never disappear there. The roadmap and the identity chapter are deliberately NOT in the tier: their tall plates would clip a phone shell, so they stack as flow below md and the Root builds no timeline there — the rooms read as ordinary chapters, and the pinned stage is a desktop treatment only. A two-step height guard: under 500px of viewport height *everything* collapses to flow (a 100vh shell clips any room), and on 500–699px heights every non-tier pin collapses while flow chapters keep their viewport-crossing timelines (a crossing scrub needs no shell height). The opening spreads center their content in the flex shell at every height — no absolute composition to clip — and the nav logo simply stays visible. Mobile waypoints light exactly like desktop now that the tier rooms build timelines there.

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

Fixed, `h-16`, transparent at rest over the hero (ink and borders tint from the field vars, cream over the night cover), paper-field background with `backdrop-blur` once the visitor scrolls (`border-b field-line-soft`). Links are serif `15px` with `underline-offset-8`, gold on hover. The mobile menu is a full-width drop with border rows.

### The Come-and-Go Rule

Every content block outside the pinned machines owns one scrubbed Reveal (`components/reveal.tsx`): it rises in as its box enters (top 88% -> top 54%), sinks back when the reader scrolls it away, and runs at every width — mobile included. Reveals are the only way static copy moves; they must never share an element with a Root-timeline beat.

### Systems Index

- **Field scrub** (`lib/field-controller.ts`): body colors are a pure function of scrollY — each section's from/to pair lerps continuously across its travel (minimal-goods pattern). No boundary flips, no tweens; reduced motion snaps at chapter midpoints.
- **Marquee band**: "FROM SEED TO HARVEST" travels the viewport with per-letter keyframed pop-ins (basement.studio register).
- **Seal flood** (`components/seal-flood.tsx`): ~~pinned interlude where the seal swells past the frame while the day field holds steady~~. **REMOVED** — the interlude carried no content; the keepers seam (`leadership.tsx` carries `PARCHMENT → LOAM`) already carries the night turn, so the book flows method → keepers without the interlude.
- **Living grain** (`components/living-grain.tsx`): fixed canvas of fibers blown by Lenis velocity; desktop, motion-permitting only.
- **The cover is night; the spreads turn under the reader**: the hero holds `LOAM` with only the script wordmark — big, dead-centered, the cover's single word (no motto, no copy, no dock; the nav carries its own small wordmark from the first paint). The mark lifts and fades in the tail and the field turns to `PARCHMENT` (`turnAt: [0.88, 1]`). The motto spread pins on day: "DeepLearning" rests as one sharp compound — the buzzword owns the page — and scroll decomposes it, the "ing" peeling off and dying while Deep and Learn trade back into "Learn Deep" and "build expertise." rises under them (`components/motto.tsx`, swap slides in em offsets against measured IM Fell widths). It lifts and turns to `LOAM` for the thesis spread: "The only way to understand something is to build it." rises line by line, dead-centered on night, the pitch and the two doors beneath (`components/mission.tsx`). The rail's CTA holds back while the thesis CTA is on stage, then takes over as the thesis lifts. The identity chapter keeps `PARCHMENT → PARCHMENT`; a short `h-[55vh]` dusk seam (28vh below md) carries `PARCHMENT → LOAM` into the trellis. Nav chrome tints with the field vars even ungrounded, so it reads cream over the dark cover and ink over paper.
- **Trellis holds night; dawn turns at a dedicated seam**: the four-tier chapter keeps `LOAM → LOAM` across its whole pin (a mid-read bleach to parchment made tier three unreadable); a short `h-[55vh]` turn Root before the method carries `LOAM → PARCHMENT` so the roadmap still opens on paper.
- **Keepers and harvest sit on settled night**: leadership and community hold `LOAM → LOAM` — the `keepers-dusk` seam before the team (`PARCHMENT → LOAM`) and the `harvest-dawn` seam before the practicalities (`LOAM → PARCHMENT`) carry the turns across empty space, so the two most human chapters never read mid-lerp. Both chapters' floating copy rides `field-ink`.
- **The book closes on night**: the field guide holds day to its end (practicalities stay on paper), then the short transparent `guide-dusk` crossing (`h-[30vh]`, `md:h-[45vh]`) carries `PARCHMENT → LOAM` one last time — pressed, not faded, by the ink-press's second plate. The footer sits on loam: field-ink wordmark and links, wine-400 accents, the motto at display scale in gold leaf, the seal pressing in as the reader arrives, and a gold hairline that draws shut above the copyright — the rail's reading rule arriving at its last page. The field controller's book-close rule ends on `LOAM`, so reduced-motion readers close on night too; the almanac ends where it began.
- **Identity and tier copy come from the vault, not invention**: the three identity plates keep their ideas (cluster on one stem; the three X promises; dark-earth rigor) in plain unslopped sentences; the trellis tiers restate Roadmap and Long Term Goals with no code examples — "automation" appears only in tier four.
- **Eshcol identities, typed by hand** (`components/origin-story.tsx`): one pinned spread; each plate rises alone — icon draws, kicker stamps, then title (per character) and body (per word) write themselves from a time-based timeline that fires when the beat's stake of the pin arrives. Scroll velocity sets nothing: a reader who stops still watches the sentence finish, never a half-word freeze. Plates hold for roughly a third of a 340vh room and lift away read.
- **Stake lighting is unlayered CSS, not tweens**: lib/stakes measures each plate's framing fraction and toggles one `data-lit` attribute; the styles live at the END of globals.css OUTSIDE any `@layer`. Reason: Tailwind v4's utilities layer wins the cascade against any layered rule regardless of specificity, so the first (layered) version of these styles silently never applied over `bg-loam-900/60` — the lit state was invisible for a release. Below lg the treatment strengthens (wine fill, cream numeral, the active stake scaling 1.15) because a border shift disappears on a 44px circle, and each strip carries its own gold reading-rule that fills with room travel.
- **Hydration law**: `Animation`'s child mode renders a `<div>` wrapper — it must never sit inside `<p>`/`<h3>` (invalid nesting breaks SSR hydration). Inline text animation uses target-mode `Animation` or plain spans driven by timelines (`data-tw` units).
- **Nav speaks both languages**: poetic rail words keep a mono plain gloss beneath ("Trellis · Curriculum"); footer matches the nav label exactly.
- **Mobile gets its cover art**: the hero joins the mobile pin tier too (200vh room) — phones get the full cover lift, night holding while the mark holds center and the field turning across the room instead of flickering to mud in 170px, and a pinned shell that can never scroll the wordmark under the nav. The motto and thesis spreads join the tier with shortened rooms (230vh, 280vh) so the decomposition and the masked lines still perform on phones. The seal flood scrubs at every size (pinned at 180vh; the seal floods to scale 16 and releases past 19), typing runs at every width, and the header always offers Telegram; the GitHub pill joins from `sm`.
- **Proof is linked**: tier sketch chips, the status ledger's Code row, and the keepers' "Find us in the commit log" all point at github.com/eskolx-labs.
- **Detector verdicts on the house devices** (`.impeccable/critique/ignore.md`): framed plates with press shadows, mono eyebrow kickers, layered paper nesting, and the oversized cover headline are reviewed almanac decisions — the browser overlay's flags for them are recorded as accepted, not open findings.
- **Keepers are name and role only**: founders carry no expertise or experience lines; leadership cards show medallion initials, name, role.
- **Harvest table** (community cards): the three channel plates are ruled like ledger rows — identical padding, top-aligned chip/name/handle/desc, a bottom-anchored "Open channel" link row so all three baselines lock regardless of copy length. Because this chapter sits last before a short footer, its entrance beats are self-owned, viewport-relative ScrollTriggers (the nav-CTA pattern) that cascade threshold-by-threshold so the leftmost plate leads; the shared Root timeline only carries the heading drift.
- **Field guide** (`components/field-guide.tsx`): the practicalities spread after the harvest, in three movements. The covenant (header, do/don't plates) holds daylight on an opaque parchment Root. A short transparent `guide-dusk` crossing then carries `PARCHMENT → LOAM` across empty space — the turn never runs mid-paragraph, because lerping ink and background together crosses at unreadable contrast (the pinned-room version of this was tried and rejected). The bar pins at 260vh on stable night: the four asks stack in a measured window (the tiers-stack grammar), each plate lighting its number wine as it frames, a stake rail restating the trellis. The ledger and the asked-often FAQ read on night in field-var plates. Copy doctrine for the whole site lives in the Eskolx-Core vault (`Mission`, `Roadmap`, `Long Term Goals`): state mechanisms and numbers, keep the almanac voice, never dress the plan up beyond what the notes say.
- **Type pipeline** (`app/layout.tsx`): the four faces (IM Fell English normal+italic, Source Serif 4 variable, JetBrains Mono variable, Kaushan Script) are self-hosted via `next/font/local` from `app/fonts/*.woff2`, keeping `--font-*` variables unchanged — builds no longer depend on reaching Google Fonts.
- **Flow-chapter transit** (`lib/scrollytelling.tsx`): a non-pinned Root configured `"top bottom"/"bottom top"` spans its natural viewport crossing (element height + viewport), which is what lets bands like the seed-catalog marquee pop letter by letter; the span clamps to the document's last scroll position, so the final chapter before the short footer completes exactly at book close instead of reserving an unreachable tail. Per-letter tweens must render their from-state (`back.out` pop rather than `keyframes`, which ignores from-vars and never hides pre-entry).

### Wordmark & Seal (signature)

The logo lockup from template 1, recut: brush-script wordmark (`--font-script`, Kaushan Script) with the engraved seal-die stamped after it — double hairline in `--field-ink`, cluster wine-500, vine wine-700. Nav: script `1.5rem` + 28px seal; footer: script `3xl` + 44px seal with its own settle animation. No vine illustration ships — grape presence is the die, the wine palette, and the language.

### Entrance & Scroll Beats

On load (all viewports, motion-permitting): the cover's wordmark settles in (y 26→0, power3.out), then the seal stamps with a ring (scale 2.2 → 1, rotate -14 → 0, power4.in). On scroll: the mark lifts and the field turns to day, the motto decomposes ("DeepLearning" → the ing peels → "Learn Deep" + "build expertise."), the thesis lines mask away per third of the room with a scale push, the copy drifts on a slower layer, CTAs ride out, and each field flip commits in one eased turn. Below `md` (768px) flow chapters still scrub and the tier scenes (trellis, joining bar, seal flood, the three opening spreads) pin in shorter rooms; only pinned rooms without a mobile room collapse to stacked reading order, along with everything under 500px of height or under reduced motion.

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
