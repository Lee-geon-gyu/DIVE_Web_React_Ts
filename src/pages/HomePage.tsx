import { HomeAiTools } from '../sections/home/HomeAiTools'
import { HomeCategories } from '../sections/home/HomeCategories'
import { HomeFeaturedGuides } from '../sections/home/HomeFeaturedGuides'
import { HomeFinalCta } from '../sections/home/HomeFinalCta'
import { HomeHero } from '../sections/home/HomeHero'
import { HomeResources } from '../sections/home/HomeResources'
import { useHomeGsap } from '../sections/home/useHomeGsap'

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useHomeGsap(rootRef)

  return (
    <div ref={rootRef} className="home-page">
      <HomeHero />
      <HomeCategories />
      <HomeFeaturedGuides />
      <HomeAiTools />
      <HomeResources />
      <HomeFinalCta />
    </div>
  )
}
import { useRef } from 'react'
