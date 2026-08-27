# Animation Inventory — Eskolx Labs site

Temporary working file for the animation-enhancement pass. Every animation on the
site, its nature, what the craft community does with this kind of motion, and a
different angle on it. One entry at a time gets deep research + implementation;
this file is the map.

Progress: #2 motto (done pre-pass), #3 mission (done), #1 hero cover (done), #4 seal flood (removed — carried no content), #5 roadmap (done), #6 concept tiers (done), #7 origin story (done), #8 field guide (done), #9 community (done), #10 footer (done), #11 marquee (in progress).

Legend for "nature":
- **scrubbed** — driven by scroll progress (GSAP timeline / ScrollTrigger)
- **ambient** — continuous, time-based, not scroll-owned
- **time-based** — plays on a clock, triggered by scroll position
- **micro** — CSS transition on hover/state
- **system** — the field/ink machinery the whole page reads

---

## Part 1 — The pinned spreads (the book)

### 1. Hero cover — arrival + lift-away  (components/hero.tsx)
- **What**: load-time arrival (wordmark settles up from y:26/autoAlpha 0, seal stamps in at scale 2.2→1 with power4.in); scroll cue fades 0-12; resting CTA fades 40-48; the whole lockup lifts y:-40 and fades 80-90 as the field turns to day.
- **Nature**: time-based arrival + scrubbed exits.
- **Expert practice**: load-in arrivals are the one place a site may use time-based motion; the best covers treat the arrival as a *press* (stamp) with anticipation and a settle, and the exit as a *hand-off* — the mark should feel it is leaving the stage for the next actor, not just fading.
- **Different angle**: the seal stamps with power4.in (fast, hard) but the wordmark just fades up. A cover arrival with a shared rhythm (mark settles, seal stamps *onto* it, a hairline draws under) reads as one choreographed opening. The lift-away is a straight fade — a slight scale-down + rotation toward the top edge (like the page turning) would hand the spread to the motto.
- **STATUS: DONE** (committed 8b2b8e3). One timeline now: the mark settles (power3.out, scale 0.98), the seal stamps onto it (power4.in), the paper gives a hair (1.03) and settles — the follow-through the motto taught. A gold hairline draws beneath as the seal stamps (the book's rule language opening the cover). The hand-off recedes: scale 0.97, -1.2° turn as the field turns to day. Verified beat-by-beat, 70/70 regression checks.

### 2. Motto spread — the four-beat choreography  (components/motto.tsx)
- **What**: settle → pluck (ing flicked away on a curved arc) → crossing (Deep ducks under Learn with squash/stretch + overshoot) → pop (build expertise. back.out spring). Just reworked; the reference for the rest of this pass.
- **Nature**: scrubbed, per-action easing, anticipation, squash & stretch, follow-through.
- **Expert practice**: this is the current best-in-class on the site — per-axis eases, anticipation before major moves, overshoot landings, sequential beats with breathing room.
- **Different angle**: none needed — it is the model. (Listed for completeness.)

### 3. Mission thesis — the three lines  (components/mission.tsx)
- **What**: three masked lines rise yPercent 118→0 (8-16, 12-20, 16-24); sub fades up 34-44; CTA block fades up 38-48; whole copy lifts y:-64 80-90.
- **Nature**: scrubbed mask-reveal + fade-ups.
- **Expert practice**: masked line reveals are the standard for cinematic type; the craft is in the *ease* (power4.out reads as "rising", power2.out as "sliding") and in staggering the lines so the eye lands on the accent word last. The accent "build it." is wine-colored but animates identically to its line — the best work gives the accent its own micro-beat (a color flash or a slight scale) so the emphasis lands.
- **Different angle**: the three lines rise with identical timing and ease — no anticipation, no overshoot, no stagger feel. The sub and CTA fade in flat (no ease specified = linear). The lift-away is a straight fade. This spread is the motto's sibling and currently the plainest of the three opening spreads.
- **STATUS: DONE** (committed on feature/animation-enhancement). The rise now opens with line 0 already mid-rise (start -4, the room never opens blank), lines overlap so the eye flows, each landing with power4.out. "build it." pops with back.out(1.6) after its line settles while the whole line breathes (1.012). The pitch presses in slightly compressed (scale 0.985→1), the CTA steps in beneath. The lift-away carries a slight rotation (1.2°) as the field turns back to day. Verified beat-by-beat through the pin, 70/70 regression checks, no console errors at 390x844 and 1440x900.

### 4. Seal flood — the stamp pressing through  (components/seal-flood.tsx)
- **What**: label on stage at 0, lifts away 22-38; seal swells scale 1→16 (10-72, power1.inOut) with rotate -6→2; die dissolves 20-32, vine 44-60; seal releases opacity 0 + scale 19 at 78-96.
- **Nature**: scrubbed, one continuous swell.
- **Expert practice**: the "grow past the frame" move (minimal-goods circle-grow) is a known pattern; the craft is in the *ease curve* — a constant power1.inOut makes the whole swell feel like one speed. A press should accelerate into the frame (power2.in) and decelerate as it fills (power2.out) — the stamp *lands*.
- **Different angle**: the dissolve of die→vine is opacity-only, so the seal visibly thins before it floods. A clipPath or scale-based dissolve (the die "wearing away" from the edges) would read as the stamp pressing through the paper rather than fading. The label lift is a straight fade-up — it could slide aside like a caption being pushed by the growing stamp.
- **STATUS: REMOVED** (committed with the removal). The interlude carried no content (one caption, one emblem), and the keepers seam already owns the night turn — the book flows method → keepers without it. Reworked once (press in, wear through, lift off, acf4c4b) before the removal; the work is archived in git history if the interlude ever returns.

### 5. Roadmap — the growing method  (components/roadmap.tsx)
- **What**: vine rail draws scaleY 0→1 (2-88); vine nodes light via Waypoints (color to wine); chapter numerals fade/color in and out; each phase: gold rule scaleX (power2.out), unit rises y:48 (power2.out), lifts y:-26 (power1.in); exit block rises y:28.
- **Nature**: scrubbed, mostly fade/slide + one draw.
- **Expert practice**: the "one stage, three beats" pattern is strong; the craft is in *secondary motion* — the vine rail drawing is the spine, and the nodes lighting should feel *caused* by the rail reaching them (a node should light as the rail passes, with a small pop, not a color lerp). The phase units rise with power2.out but no anticipation or overshoot; the rule draws before the unit with no overlap.
- **Different angle**: the numerals are opacity+color only — they could slide along the rail like a cursor. The vine rail is a single scaleY — a draw with a slight overshoot (back.out) or a two-segment draw (stem then tendril) would feel grown, not stretched. The exit is a plain rise — it could echo the cover's hand-off.
- **STATUS: DONE** (committed 7d755c5). The vine is now the spine: linear draw (2-88) with a wine growth tip riding the leading edge; nodes pop (back.out(2), scale 1.55) as the tip passes them (measured 15/42/69, stable across viewports) and settle — lighting is caused, not scheduled; phases rise as their node pops (power3.out, slight scale); numerals slide along the rail (x ±14); the node CSS transition (GSAP/transition conflict) removed; Waypoint accepts per-tween ease. Verified tip rides the growing edge at every position; 65/65 regression checks.

### 6. Concept tiers — the trellis stack  (components/concept-tiers.tsx)
- **What**: the plate stack travels its own scrollable height (scrubbed y, linear); the rail drifts y:14 across the pin; stake lighting via data-lit toggles (bindStakeLighting); phone stake strip + progress hairline (scaleX via CSS class toggle).
- **Nature**: scrubbed travel + state lighting.
- **Expert practice**: stack-travel is the "one window, many plates" pattern; the craft is in the *transition between plates* — currently the stack slides linearly (ease none), so plates cross at constant speed with no beat. The best work gives the crossing a slight ease (power1.inOut) so each plate *arrives* and *departs* with weight, and the incoming plate's content settles after the frame stops.
- **Different angle**: the rail drift (y:14) is a constant slide — a parallax with a different speed than the stack is right, but it could also *light* with a spring. The stake lighting is a hard class toggle — a 150ms transition on the lit state would make the rail feel alive. The phone strip progress is scaleX via class — same.
- **STATUS: DONE** (committed 947349e). The stack travel stays linear on purpose (the measured grammar — stake lighting, jumps, aria-current — derives from the linear translate). The arrivals now live in the content: each plate's heading settles as its plate frames (back.out(1.4), measured fractions 0/1/3/2/3/1 stable across viewports; plate 1 settled at the open, plate 4 frames at the room's close). The desktop current stake's wine pop was dead (aria-current rule sat before data-lit, lost the cascade) — moved after, now pops with translateY -1 + scale 1.04; phone strip keeps its 1.15 pop. 65/65 regression checks.

### 7. Origin story — the Eshcol plates  (components/origin-story.tsx)
- **What**: plate rises y:44 (power2.out); numeral fades; icon draws via clipPath inset (power2.inOut); kicker stamps scale 1.6→1 (power4.in); title/body hand-type on a time-based timeline (stagger 0.026/0.011); wax dot stamps scale 1.7→1 (power4.in); plate lifts y:-36 (power1.in).
- **Nature**: scrubbed entrances + time-based typing.
- **Expert practice**: the hand-typing is the standout — time-based so it finishes even when scroll stops. The craft around it: the *stamp* eases (power4.in) are the right register for ink; the icon clipPath draw is a straight wipe — a draw with a slight ease asymmetry (fast start, slow finish) reads as a pen stroke. The plate entrance (y:44, power2.out) has no anticipation or overshoot.
- **Different angle**: the typing is char/word stagger with linear opacity — a *cursor* (a blinking ink bar) would make the hand-writing feel alive, and the last word could land with a micro-settle. The plate lift-away (y:-36, power1.in) is a straight slide — a slight rotation (like a page lifting) would hand the stage to the next plate.
- **STATUS: DONE** (committed 0df33e7). The hand now carries a pen: a wine ink bar blinks while the hand writes (finite blink covering the writing window, reversible — no kill) and fades as the last word lands. The icon draws with a pen-stroke ease (power2.in: fast start, slow finish). The plate lifts away with a slight turn (-1.2°) — the hand-off register. Verified: cursor blinks and fades at the last word, reduced motion hides the cursor and shows static text, phone flows with the typing engine intact; 65/65 regression checks.

### 8. Field guide — covenant, bar, ledger  (components/field-guide.tsx)
- **What**: head drifts y:-26 (2-62); seal stamps scale 1.35→1 (power4.in); two covenant panels wipe via clipPath (power2.inOut); bar stack travels (linear); status rules draw scaleX (power1.inOut); FAQ rows unfold on grid-rows CSS transition; stake lighting toggles.
- **Nature**: scrubbed + CSS micro.
- **Expert practice**: the wipes are the "curtain" pattern — power2.inOut is the right ease but the two panels wipe with a 10-unit overlap that reads as a single curtain; a *staggered* wipe (second panel starts as the first finishes) reads as two pages. The seal stamp (scale 1.35) is gentler than the hero's (2.2) — inconsistent stamp register across the site.
- **Different angle**: the status rules draw with power1.inOut (linear-ish) — a power2.out would make each rule *arrive*. The FAQ unfold is a CSS grid-rows transition — the standard modern pattern, but the + icon rotates with the same ease as the panel; a springier icon (back.out) would make the row feel mechanical in the good way.
- **STATUS: DONE** (committed 6c99cf7). The bar plates' content settles as each frames (back.out(1.4), measured fractions 0/1/3/2/3/1 stable across viewports; plate 1 settled at the open, plate 4 frames at the room's close). The status rules draw with power2.out (each arrives). The FAQ + icon rotates with a spring (cubic-bezier(0.34,1.56,0.64,1)) while the panel keeps its smooth expo. The covenant wipes were already staggered (2-unit overlap). 65/65 regression checks.

### 9. Community — the harvest table  (components/community.tsx)
- **What**: head drifts y:34→-22 (6-94); rule draws scaleX (power2.inOut, scrub 0.6); three cards cascade in (y:36, opacity, rotate -1, power2.out) with chip scale 1.55 (power3.in) and index rotate 8; Reveal for the secondary row.
- **Nature**: scrubbed cascade + micro hovers.
- **Expert practice**: the cascade is the "staggered entrance" pattern — the lead offsets (7% per card) are the right idea. The craft: cards rise with power2.out but no overshoot; the chip stamps with power3.in (hard) which is right for a stamp but the card and chip overlap (-=0.28) so the chip lands mid-card-rise — the best work lets the card *settle* before the chip stamps.
- **Different angle**: the card hover (translate-y -1, shadow) is a CSS transition — a *lift with a slight rotate* and a springier ease would make the harvest feel physical. The arrow nudge (translate-x 1) is fine but could rotate with the lift.
- **STATUS: DONE** (committed 27885b2). The cards land with a slight back.out(1.2) overshoot; the chips stamp AFTER their card settles (the overlap is now a trailing gap) — ink on paper; the card hover lifts with a spring (cubic-bezier(0.34,1.56,0.64,1)), a hair more travel (-1.5) and a slight rotate (0.4°). Verified: chips stamp after their cards settle; 65/65 regression checks.

### 10. Footer — the close  (components/site-footer.tsx)
- **What**: seal stamps scale 2→1 (power4.in, 0-40); close rule draws scaleX (power1.inOut, 45-82).
- **Nature**: scrubbed.
- **Expert practice**: the close rule is the "book shuts" moment — power1.inOut is linear-ish; a power2.inOut with a *hold* at the end (the rule arriving as the last page settles) would read as a deliberate close.
- **Different angle**: the seal stamp here (scale 2) matches the hero (2.2) — good register. The footer is the last spread; the close rule could *complete* the nav's reading rule (they're the same gold hairline language) — a nice bookend if the two share timing language.
- **STATUS: DONE** (committed 6897914). The seal stamps (power4.in, the cover's register), then the paper gives a hair (1.03) and settles — the same follow-through the cover opening got, closing the book the way it opened. The close rule draws with power2.out — the gold hairline arrives with a settle instead of sliding. Verified: seal stamps to 1.0, gives to 1.027, settles back to 1.0; 65/65 regression checks.

---

## Part 2 — Flow chapters & ambient layers

### 11. Marquee band — from seed to harvest  (components/marquee-band.tsx)
- **What**: the track travels xPercent 60→-62 across the viewport; every letter pops through its own window (yPercent 42, scale 0.5, autoAlpha 0 → back.out(1.4)).
- **Nature**: scrubbed, per-letter stagger.
- **Expert practice**: the per-letter pop with back.out is already the right register (basement.studio marquee). The craft: the track travels with *no ease* (linear) — correct for a marquee; the letters pop with back.out(1.4) — the standard. The stagger is computed from char index × 0.7 — a *wave* (letters popping in the direction of travel) is the classic; here the pop window is per-letter so it reads as a wave already.
- **Different angle**: the letters pop but never *settle* — the back.out overshoot is there. The harvest word is wine-colored but pops identically to the rest — a gold flash on the harvest letters would make the phrase land. The ❋ separators are static — they could pulse once as the wave passes.

### 12. Reveal — the come-and-go layer  (components/reveal.tsx)
- **What**: generic rise-in (y:34, opacity, power2.out, stagger 0.09) scrubbed over the box's viewport crossing, identical in both directions.
- **Nature**: scrubbed, generic.
- **Expert practice**: the "rise in, sink out" is the workhorse; the craft is in *not* using it everywhere — it's the default for every section heading, which flattens the book's rhythm. The best sites reserve the generic reveal for secondary content and give primary moments bespoke beats.
- **Different angle**: the reveal is opacity+y with power2.out — fine, but it's used on ~15 elements across the site, so the *sameness* is the issue, not the motion itself. Could get a slight blur-in (filter) for a softer register, or a per-element stagger that follows reading order.

### 13. Living grain — the drifting fibers  (components/living-grain.tsx)
- **What**: 110 canvas fibers drift like dust; Lenis velocity blows them across the page (boost), shear-stretching them; ink tone tracks the field.
- **Nature**: ambient, canvas, velocity-reactive.
- **Expert practice**: velocity-reactive ambient layers are the "the page breathes" pattern. The craft: fibers respond to velocity with a linear boost — the best work adds *inertia* (velocity eases in/out, fibers lag then catch up) and *direction* (fibers streak along the scroll axis, not just drift).
- **Different angle**: the fibers are rectangles with stretch — they could *curl* (a slight rotation aligned with velocity) or *swirl* near the edges. The boost is clamped at ±14 — a gentler curve with a longer tail would feel more like wind than a push.

### 14. Ink press — the field turn as wet ink  (components/ink-press.tsx)
- **What**: on the dawn seam, a fixed overlay of the target color runs through SVG turbulence+displacement; the bite rises (power2.in), settles (power2.out), releases.
- **Nature**: scrubbed, filter-based, one authored moment.
- **Expert practice**: this is already a distinctive, expert-grade effect (the displacement bite with a settle is the right grammar for "pressed into paper"). The craft: the bite peaks at scale 74 and rests at 22 — the *rest* is the key detail (the grain stays, the press is real).
- **Different angle**: only the dawn seam presses; the guide's dusk rides the lerp. A second press on the dusk (or the flood) would give the book two authored turns — but restraint may be the point. The press could also *sound* the field's ink snap (the held-then-snapped re-ink) — the press is the visual of the snap.

### 15. Field controller — the two almanac fields  (lib/field-controller.ts)
- **What**: the page's field colors scrub continuously against scroll (lerp with a luminance-crossover ink snap, quantized to 1/64 steps, throttled writes).
- **Nature**: system — the machinery every spread reads.
- **Expert practice**: this is the minimal-goods pattern done carefully (the ink snap is a genuinely expert detail — held-then-snapped ink keeps contrast through the crossover).
- **Different angle**: the turn is a pure linear lerp of the background. A *slight ease* on the turn (the field accelerating into the turn and settling out) would make each chapter's arrival feel authored — but the controller is deliberately a pure function of scrollY; any easing must stay reversible and position-pure.

---

## Part 3 — Chrome & micro-interactions

### 16. Site nav  (components/site-nav.tsx)
- **What**: seal rotates 180° across the whole read (scrubbed, linear); reading rule fills scaleX (scrubbed, linear); rail CTA fades in after the thesis (scrubbed); gold marker slides under the active link (measured rects, CSS transition with cubic-bezier(0.16,1,0.3,1)); burger morphs (CSS); mobile panel unfolds on grid-rows (CSS); header tints with the field.
- **Nature**: scrubbed + CSS micro.
- **Expert practice**: the seal's 180° rotation across the whole page is the "slow ambient" pattern — linear is right for a full-page rotation. The marker slide uses the expo-out curve (0.16,1,0.3,1) — the correct choice for a sliding indicator.
- **Different angle**: the seal rotation is *constant* — a rotation that *eases* (fast at chapter boundaries, slow mid-chapter) would tie it to the book's rhythm. The reading rule is linear — it could share the close rule's timing language at the end. The CTA fade is a plain autoAlpha — a small rise (y:8) with the fade would make it feel like it steps in.

### 17. Buttons — the letterpress plates  (app/globals.css .btn-plate)
- **What**: hover lifts -1px, active presses +1px with shadow collapse, 140ms cubic-bezier(0.2,0.8,0.2,1).
- **Nature**: micro.
- **Expert practice**: the press-on-actuation is the right physical metaphor for a letterpress plate. 140ms is snappy — good. The hover lift (-1px) is subtle — the best plates lift with a *slight shadow growth* (already there) and a *tiny rotate* for tactility.
- **Different angle**: the press is translateY only — a scale (0.99) with the press would read as the plate going *into* the paper. The ease (0.2,0.8,0.2,1) is a gentle in-out — a springier release (0.16,1,0.3,1) on hover-out would feel more mechanical.

### 18. Cards, chips, arrows — hover micro  (community.tsx, concept-tiers.tsx, field-guide.tsx)
- **What**: harvest cards lift -1px + shadow (300ms ease-out); chips rotate -6° on hover; arrows nudge translate-x 1; stake buttons tint; FAQ + rotates 45°.
- **Nature**: micro.
- **Expert practice**: the card lift with shadow is standard; the chip rotate is a nice detail. The arrow nudge (translate-x 1, -translate-y 0.5) is the classic "the door opens" cue.
- **Different angle**: the card lift is ease-out (decelerating) — a *spring* (cubic-bezier(0.16,1,0.3,1)) would make the lift feel physical. The chip rotate is instant-ish (300ms) — a faster rotate with a slight overshoot would make the chip feel stamped.

### 19. Links — the underline language
- **What**: hover underlines with gold decoration, color transitions.
- **Nature**: micro.
- **Expert practice**: the underline-offset + decoration-gold is the site's signature link language — consistent and quiet. The best sites animate the underline *drawing* (background-size or scaleX) rather than toggling it.
- **Different angle**: the underline appears on hover (decoration toggles) — a *drawing* underline (scaleX from left, 200ms expo) would make the links feel hand-inked, matching the letterpress register.

---

## The register (for reference)
- **Stamps** (seal entrances): power4.in, scale 1.35-2.2 — the site's "ink hits paper" move. Used in hero, field guide, footer, origin kicker + wax dot.
- **Draws** (rules, rails, wipes): scaleX/scaleY/clipPath, power1.inOut to power2.out.
- **Rises** (content entrances): y + opacity, power2.out, no overshoot.
- **Lifts** (exits): y + opacity, power1.in, no rotation.
- **Ambient**: grain (velocity), seal spin (linear 180°), field lerp (linear).
- **Micro**: 140-300ms CSS, expo-ish curves.

## The recurring craft gaps (what the experts would flag)
1. **Rises have no anticipation or overshoot** — every content entrance is a plain power2.out slide. The motto now has anticipation + squash/stretch + overshoot; the rest of the book doesn't.
2. **Exits are straight fades/slides** — no rotation, no hand-off feel. The book's spreads hand to each other by fading out.
3. **Stamps are inconsistent** — scale 2.2 (hero), 1.35 (guide), 2 (footer), 1.6 (kicker), 1.7 (wax dot) — same move, five strengths.
4. **Linear scrubs where an ease belongs** — stack travels, seal spin, field lerp, reading rules.
5. **The generic Reveal is everywhere** — ~15 uses flatten the rhythm; primary moments deserve bespoke beats.
6. **Micro-interactions are ease-out, not springy** — the site's own expo curve (0.16,1,0.3,1) is used in the nav marker and FAQ but not on cards/buttons.
