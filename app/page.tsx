import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { OriginStory } from '@/components/origin-story'
import { ConceptTiers } from '@/components/concept-tiers'
import { Roadmap } from '@/components/roadmap'
import { SealFlood } from '@/components/seal-flood'
import { Leadership } from '@/components/leadership'
import { MarqueeBand } from '@/components/marquee-band'
import { Community } from '@/components/community'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <OriginStory />
        <ConceptTiers />
        <Roadmap />
        <SealFlood />
        <Leadership />
        <MarqueeBand />
        <Community />
      </main>
      <SiteFooter />
    </div>
  )
}
