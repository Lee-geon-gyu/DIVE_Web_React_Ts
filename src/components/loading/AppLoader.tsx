import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import './app-loader.css'

const LOADING_MESSAGE = 'Dive Into Verified Experiences.'

interface AppLoaderProps {
  onComplete: () => void
}

export function AppLoader({ onComplete }: AppLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = loaderRef.current

    if (!loader) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousActiveElement = document.activeElement
    let isPageRestored = false
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    loader.focus({ preventScroll: true })

    const preventBackgroundFocus = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', preventBackgroundFocus)

    const restorePage = () => {
      if (isPageRestored) {
        return
      }

      isPageRestored = true
      document.removeEventListener('keydown', preventBackgroundFocus)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow

      if (
        previousActiveElement instanceof HTMLElement &&
        previousActiveElement !== document.body
      ) {
        previousActiveElement.focus({ preventScroll: true })
      } else {
        loader.blur()
      }
    }

    const completeLoading = () => {
      restorePage()
      onComplete()
    }

    const context = gsap.context(() => {
      const phrase = loader.querySelector<HTMLElement>('.app-loader__phrase')
      const textMark = loader.querySelector<HTMLElement>(
        '.app-loader__text-mark',
      )
      const logo = loader.querySelector<HTMLElement>('.app-loader__logo')
      const remainders = loader.querySelectorAll<HTMLElement>(
        '.app-loader__remainder',
      )
      const initials = loader.querySelectorAll<HTMLElement>(
        '.app-loader__initial',
      )

      if (!phrase || !textMark || !logo) {
        completeLoading()
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: completeLoading,
      })

      if (prefersReducedMotion) {
        timeline
          .to(phrase, { opacity: 1, duration: 0.15 })
          .to(phrase, { duration: 0.25 })
          .to(phrase, { opacity: 0, duration: 0.15 })
          .to(logo, { opacity: 1, duration: 0.2 }, '<')
          .to(logo, { duration: 0.3 })
          .to(loader, { opacity: 0, duration: 0.2 })

        return
      }

      timeline
        .to(phrase, { opacity: 1, duration: 0.55 })
        .to(phrase, { duration: 0.65 })
        .to(remainders, {
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
        })
        .to(
          remainders,
          {
            width: 0,
            duration: 0.7,
          },
          '-=0.1',
        )
        .to(
          phrase,
          {
            columnGap: 0,
            duration: 0.7,
          },
          '<',
        )
        .to(
          initials,
          {
            scale: 1.08,
            duration: 0.7,
          },
          '<',
        )
        .to(textMark, {
          opacity: 0,
          scale: 1.03,
          duration: 0.45,
        })
        .fromTo(
          logo,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.55 },
          '-=0.3',
        )
        .to(logo, { duration: 0.55 })
        .to(loader, { opacity: 0, duration: 0.5 })
    }, loader)

    return () => {
      context.revert()
      restorePage()
    }
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="app-loader"
      role="status"
      aria-label={LOADING_MESSAGE}
      tabIndex={-1}
    >
      <div className="app-loader__stage" aria-hidden="true">
        <div className="app-loader__text-mark">
          <p className="app-loader__phrase">
            <span className="app-loader__word">
              <span className="app-loader__initial">D</span>
              <span className="app-loader__remainder">ive</span>
            </span>
            <span className="app-loader__word">
              <span className="app-loader__initial">I</span>
              <span className="app-loader__remainder">nto</span>
            </span>
            <span className="app-loader__word">
              <span className="app-loader__initial">V</span>
              <span className="app-loader__remainder">erified</span>
            </span>
            <span className="app-loader__word">
              <span className="app-loader__initial">E</span>
              <span className="app-loader__remainder">xperiences.</span>
            </span>
          </p>
        </div>

        <img
          className="app-loader__logo"
          src={`${import.meta.env.BASE_URL}DIVE_logo_Typo.png`}
          alt=""
          width="1379"
          height="395"
          decoding="async"
        />
      </div>
    </div>
  )
}
