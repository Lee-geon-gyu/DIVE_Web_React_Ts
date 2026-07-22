import { useLayoutEffect, useRef } from 'react'
import homeBackground from '../assets/images/home/background/Home_Background.png'
import { AiToolList } from '../sections/ai/AiToolList'
import { ScrollTrigger } from '../lib/animation/gsap'
import { AiBackgroundExperience } from '../sections/home/AiBackgroundExperience'
import { HomeCategories } from '../sections/home/HomeCategories'
import { HomeFeaturedGuides } from '../sections/home/HomeFeaturedGuides'
import { HomeFinalCta } from '../sections/home/HomeFinalCta'
import { HomeHero } from '../sections/home/HomeHero'
import { HomeResources } from '../sections/home/HomeResources'
import { SharedHeroBackground } from '../sections/home/SharedHeroBackground'
import { TransitionRevealSection } from '../sections/home/TransitionRevealSection'
import { useHomeGsap } from '../sections/home/useHomeGsap'
import { PublishingGuideList } from '../sections/publishing-guide/PublishingGuideList'
import './home-page.css'

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useHomeGsap(rootRef)

  useLayoutEffect(() => {
    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => window.cancelAnimationFrame(refreshFrame)
  }, [])

  return (
    <div ref={rootRef} className="home-page">
      <SharedHeroBackground />
      <HomeHero />

      <div className="home-visual-group">
        <div className="home-visual-group__background" aria-hidden="true">
          <div className="home-visual-group__background-center">
            <div className="home-visual-group__background-pointer">
              <div className="home-visual-group__background-ambient">
                <img
                  className="home-visual-group__background-image"
                  src={homeBackground}
                  alt=""
                  width="2880"
                  height="6804"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="home-visual-group__content">
          <div className="home-space-glass-zone">
            <HomeCategories />
            <HomeFeaturedGuides />
            <HomeResources />
          </div>
        </div>
      </div>

      <TransitionRevealSection />
      <AiBackgroundExperience>
        <AiToolList enablePinnedScroll theme="home-light" />
        <div className="home-ai-tools-spacing" aria-hidden="true">
          <div className="home-ai-tools-spacing__transparent-window" />
        </div>
        <PublishingGuideList theme="home-light" />
      </AiBackgroundExperience>
      <HomeFinalCta />
    </div>
  )
}
