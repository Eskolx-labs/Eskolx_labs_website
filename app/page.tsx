import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { OriginStory } from '@/components/origin-story'
import { ConceptTiers } from '@/components/concept-tiers'
import { Roadmap } from '@/components/roadmap'
import { SealFlood } from '@/components/seal-flood'
import { Leadership } from '@/components/leadership'
import { MarqueeBand } from '@/components/marquee-band'
import { Community } from '@/components/community'
import { FieldGuide } from '@/components/field-guide'
import { SiteFooter } from '@/components/site-footer'
import { InkPress } from '@/components/ink-press'

export default function Page() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <InkPress />
      <main>
        <Hero />
        <OriginStory />
        <ConceptTiers />
        <Roadmap />
        <SealFlood />
        <Leadership />
        <MarqueeBand />
        <Community />
        <FieldGuide />
      </main>
      <SiteFooter />
    </div>
  )
}
