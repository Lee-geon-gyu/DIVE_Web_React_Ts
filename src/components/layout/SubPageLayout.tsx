import { Children, type PropsWithChildren } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { homeCategories } from '../../data/homeCategories'
import { SharedHeroBackground } from '../../sections/home/SharedHeroBackground'
import './sub-page-layout.css'

export function SubPageLayout({ children }: PropsWithChildren) {
  const [hero, ...body] = Children.toArray(children)
  const { pathname } = useLocation()
  const currentPath = pathname.replace(/\/$/, '')
  const current = homeCategories.find((category) => category.to === currentPath)

  return (
    <div className="sub-page-layout">
      <SharedHeroBackground fixed />
      <div className="sub-page-layout__intro">
        <div className="page-container">
          <nav className="d-breadcrumbs content-container sub-page-layout__breadcrumb" aria-label="현재 위치">
            <ol>
              <li><Link to="/">DIVE</Link></li>
              <li><Link to="/#categories">카테고리</Link></li>
              {current && <li aria-current="page">{current.label}</li>}
            </ol>
          </nav>
        </div>
        {hero}
        <div className="page-container">
          <nav className="d-tabs content-container sub-page-layout__categories" aria-label="가이드 카테고리">
            {homeCategories.map((category) => (
              <NavLink end className="d-tab dive-outline-pill sub-page-layout__category" key={category.to} to={category.to}>
                {category.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="sub-page-layout__body">{body}</div>
    </div>
  )
}
