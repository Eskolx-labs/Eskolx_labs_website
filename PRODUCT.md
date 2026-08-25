# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router + React 19 + Tailwind v4. Confirmed by user on 2026-08-22. shadcn stays only as a primitives base; its default look is discarded. Animation engine: GSAP ScrollTrigger + Lenis smooth scroll, in the pattern of darkroomengineering/lenis and basementstudio/scrollytelling (one scrubbed timeline per section, normalized to 0-100, pinned scenes, absolute start/end positions). Single landing page now; About / Projects / Docs / Community pages come later as anchors or routes.

## Users

Primary: builders and interns, students, self-taught developers, junior researchers who want to master statistics by rebuilding its tools from scratch. They find the site, read the mission, then join Telegram and GitHub to work in cohorts. Secondary (not yet optimized for): hiring partners and academic collaborators scanning credibility.

## Product Purpose

Eskolx Labs is an open-source lab that rebuilds statistical tools in pure Python from first principles. It translates formulas and papers into modular, tested, documented packages under the `eskolx` namespace (eskolx.stats, eskolx.inference, eskolx.model, eskolx.ts, eskolx.deploy). Success means builders joining the community and shipping packages instead of notebooks.

## Positioning

No black boxes: every formula is implemented, tested, and understood by the people who coded it. Neighboring tools wrap existing libraries; Eskolx Labs writes the library itself as the way you learn it.

## Operating Context

Work happens in small fast-moving builder cohorts on a 3-month cycle: Phase 1 basic statistical packages from scratch, Phase 2 literature and research driven code, Phase 3 novel real-world research and application. A 4-tier concept ladder organizes the ecosystem: foundational stats and probability, core modeling and inference, advanced applied methods, enterprise AI and spatial. An internal engineering internship feeds an open-source maintainer pipeline.

## Capabilities and Constraints

- Landing page only for this build; nav items anchor to sections.
- The site is animation-forward by explicit product decision, in the scrollytelling register of minimal-goods.webflow.io and basementstudio/scrollytelling: pinned scenes with long scroll rooms, scrubbed transforms, full-page color-field transitions between the parchment and dark-loam variants, masked text reveals, parallax strips. Every ScrollTrigger cleans up (tl.revert), reduced-motion renders static complete states. The feel contract: something is always resolving on screen — fields turn continuously with the scroll, content comes and goes via scrubbed reveals at every width, and each pinned room carries large-amplitude motion end to end. Must stay fast: transform/opacity-driven, no scroll-jank stacking.
- Real channels: GitHub github.com/eskolx-labs, Telegram t.me/eskolx_labs, LinkedIn linkedin.com/company/eskolx_labs, plus YouTube, X, Instagram, Facebook, TikTok handles @eskolx_labs.
- One community CTA link is undecided (Slack vs Discord invite).
- Leadership: Barkilign Mulatu (Founder & CEO), Natnael Getahun (Co-Founder and Member of Technical Staff).

## Brand Commitments

- Name is "Eskolx Labs", never "Eshkol" or "Eskolx" alone.
- Eshcol root: Hebrew for a rich cluster of grapes, abundance bound to one stem. The grapevine is the brand's central symbol. The X stands for Execution & Automation, eXploration, Scale.
- Binding visual facts from two user-supplied reference images (axum_template_dark_brown.jpg, axum_template_light_brown.png): the grapevine symbol and two color fields, a light parchment variant and a dark loam variant, are binding. The script-lettered wordmark is the brand's lettering; on 2026-08-23 the user recut the seal from its red-plate stamp to an engraved die (double hairline in the current field ink, grape cluster in the wine family) so grapes read purple and the mark always contrasts its spread. The L-system grapevine AND the authored SVG vine plate were both rejected by the user; no vine illustration ships until a proper engraved asset exists — the grape lives in the seal-die, the language, and the wine palette.
- The templates are terrible drafts of the final look, not comps: direction only, never pixel reference.

## Evidence on Hand

True written content lives in the current components (hero, origin-story, concept-tiers, roadmap, leadership, community): mission copy, tier architecture with Python examples, roadmap phases, leadership bios, channel links. No testimonials, benchmarks, customer logos, or press exist; none may be fabricated.

## Product Principles

- Grow from the root: every claim ties back to building from first principles.
- Show the work: real code, real diagnostics, no decorative filler.
- Craft over decoration: illustration and motion carry meaning, never ornament alone.
- Abundance bound to one stem: individual concepts connect into one integrated ecosystem.

## Accessibility & Inclusion

The site is animation-heavy, so prefers-reduced-motion must collapse scroll choreography to static or minimal states. Standard contrast and keyboard reachability apply.
