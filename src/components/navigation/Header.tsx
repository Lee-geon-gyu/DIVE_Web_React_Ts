import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import menuCloseWhite from '../../assets/common/menu-close-white.png'
import { primaryNavigationItems } from '../../data/navigation'
import './header.css'

const headerLogoSrc = `${import.meta.env.BASE_URL}DIVE_logo_Typo.png`

function getNavigationClassName({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'site-header__navigation-link is-active'
    : 'site-header__navigation-link'
}

export function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const isMenuVisible = isMenuOpen || isMenuClosing

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMenuOpen(false)
      setIsMenuClosing(false)
      setIsScrolled(window.scrollY > 24)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [location.pathname])

  useEffect(() => {
    let frameId = 0

    const updateHeader = () => {
      frameId = 0
      setIsScrolled(window.scrollY > 24)
    }

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [location.pathname])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setIsMenuClosing(true)
  }, [])

  const openMenu = () => {
    setIsMenuClosing(false)
    setIsMenuOpen(true)
  }

  const handleDrawerAnimationEnd = () => {
    if (!isMenuClosing) {
      return
    }

    setIsMenuClosing(false)
    window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  useEffect(() => {
    if (!isMenuVisible) {
      return
    }

    const drawer = drawerRef.current
    const previousOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const focusableElements = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusableElements?.[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

      if (event.key !== 'Tab' || !focusableElements?.length) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeMenu, isMenuVisible])

  return (
    <>
      <header
        className={`site-header${isScrolled ? ' is-scrolled' : ''}${
          isMenuVisible ? ' is-menu-open' : ''
        }`}
      >
        <div className="page-container">
          <div className="content-container site-header__inner">
            <NavLink
              className="site-header__logo"
              to="/"
              end
              aria-label="DIVE 홈으로 이동"
            >
              <img
                className="site-header__logo-image"
                src={headerLogoSrc}
                alt=""
                width="1724"
                height="500"
                decoding="async"
              />
            </NavLink>

            <nav className="site-header__desktop-navigation" aria-label="주요 메뉴">
              <ul className="site-header__navigation-list">
                {primaryNavigationItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className={getNavigationClassName}
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              ref={menuButtonRef}
              className="site-header__menu-button"
              type="button"
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={isMenuOpen ? closeMenu : openMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>

        {isMenuVisible ? (
          <div
            className={
              isMenuClosing
                ? 'site-header__mobile-layer is-closing'
                : 'site-header__mobile-layer'
            }
          >
            <button
              className="site-header__backdrop"
              type="button"
              aria-label="메뉴 닫기"
              onClick={closeMenu}
            />

            <div
              ref={drawerRef}
              id="mobile-navigation"
              className="site-header__drawer"
              role="dialog"
              aria-modal="true"
              aria-label="모바일 메뉴"
              onAnimationEnd={handleDrawerAnimationEnd}
            >
              <div className="site-header__drawer-heading">
                <span className="site-header__logo" aria-hidden="true">
                  <img
                    className="site-header__logo-image"
                    src={headerLogoSrc}
                    alt=""
                    width="1724"
                    height="500"
                    decoding="async"
                  />
                </span>
                <button
                  className="site-header__close-button"
                  type="button"
                  aria-label="메뉴 닫기"
                  onClick={closeMenu}
                >
                  <img
                    className="site-header__close-image"
                    src={menuCloseWhite}
                    alt=""
                    width="197"
                    height="193"
                    decoding="async"
                  />
                </button>
              </div>

              <nav aria-label="모바일 주요 메뉴">
                <ul className="site-header__mobile-navigation-list">
                  {primaryNavigationItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        className={getNavigationClassName}
                        to={item.to}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      <div className="site-header-spacer" aria-hidden="true" />
    </>
  )
}
