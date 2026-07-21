import { useRef } from 'react'
import { AiToolList } from '../sections/ai/AiToolList'
import { HomeCategories } from '../sections/home/HomeCategories'
import { HomeFeaturedGuides } from '../sections/home/HomeFeaturedGuides'
import { HomeFinalCta } from '../sections/home/HomeFinalCta'
import { HomeHero } from '../sections/home/HomeHero'
import { HomeResources } from '../sections/home/HomeResources'
import { useHomeGsap } from '../sections/home/useHomeGsap'
import { PublishingGuideList } from '../sections/publishing-guide/PublishingGuideList'

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useHomeGsap(rootRef)

  return (
    <div ref={rootRef} className="home-page">
      <HomeHero />
      <HomeCategories />
      <HomeFeaturedGuides />
      <AiToolList />
      <HomeResources />
      <PublishingGuideList />
      <HomeFinalCta />
    </div>
  )
}
