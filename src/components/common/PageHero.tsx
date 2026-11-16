import { useId } from 'react'
import { useLocation } from 'react-router-dom'
import { homeCategories } from '../../data/homeCategories'
import './page-hero.css'

interface PageHeroProps {
  eyebrow: string
}

export function PageHero({ eyebrow }: PageHeroProps) {
  const titleId = useId()
  const { pathname } = useLocation()
  const current = homeCategories.find((category) => category.to === pathname.replace(/\/$/, ''))

  return (
    <section className="page-hero" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container page-hero__inner">
          <h1 id={titleId} className="page-hero__title">{current?.title ?? eyebrow}</h1>
        </div>
      </div>
    </section>
  )
}
