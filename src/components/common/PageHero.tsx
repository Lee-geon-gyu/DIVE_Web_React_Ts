import { useId, useRef } from 'react'
import { usePageHeroDecoration } from './usePageHeroDecoration'
import './page-hero.css'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  narrowDescription?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  narrowDescription = false,
}: PageHeroProps) {
  const titleId = useId()
  const heroRef = useRef<HTMLElement>(null)

  usePageHeroDecoration(heroRef)

  return (
    <section ref={heroRef} className="page-hero" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container page-hero__inner">
          <p className="page-hero__eyebrow" data-aos="fade-up">
            {eyebrow}
          </p>
          <h1 id={titleId} className="page-hero__title" data-aos="fade-up" data-aos-delay="80">
            {title}
          </h1>
          <p
            className={`page-hero__description${
              narrowDescription ? ' page-hero__description--narrow' : ''
            }`}
            data-aos="fade-up"
            data-aos-delay="160"
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
