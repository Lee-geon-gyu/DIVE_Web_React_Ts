import { useId } from 'react'
import { HeroTablet } from './HeroTablet'
import { SharedHeroBackground } from './SharedHeroBackground'
import './home-hero.css'

const words = ['DESIGN', 'EXPERIENCE', 'PUBLISHING']
const highlights = ['EXPERIENCE', 'PUBLISHING', 'PUBLISHING']

export function HomeHero() {
  const titleId = useId()

  return (
    <section className="home-hero" aria-labelledby={titleId}>
      <div className="home-hero__stage">
        <SharedHeroBackground />
        <div className="home-hero__marquee" aria-hidden="true">
          <div className="home-hero__marquee-reveal">
            <div className="home-hero__marquee-track">
              {[0, 1].map((copy) => (
                <div className="home-hero__marquee-cycle" key={copy}>
                  {highlights.map((highlight, index) => (
                    <div className="home-hero__marquee-phrase" key={index}>
                      {words.map((word) => (
                        <span key={word} data-selection={word === highlight ? word : undefined}>{word}</span>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <HeroTablet titleId={titleId} />
      </div>
    </section>
  )
}
