import { gsap } from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { useLenisRef } from '../../app/providers/lenis-context'
import './app-loader.css'

const LOADING_MESSAGE = 'Dive Into Verified Experiences.'
const BLOCKED_SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
  'Spacebar',
])

interface AppLoaderProps {
  onComplete: () => void
}

export function AppLoader({ onComplete }: AppLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const lenisRef = useLenisRef()

  useLayoutEffect(() => {
    const loader = loaderRef.current

    if (!loader) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverscrollBehavior =
      document.body.style.overscrollBehavior
    const previousHtmlOverscrollBehavior =
      document.documentElement.style.overscrollBehavior
    const previousBodyTouchAction = document.body.style.touchAction
    const previousHtmlTouchAction = document.documentElement.style.touchAction
    const previousScrollRestoration = window.history.scrollRestoration
    const previousActiveElement = document.activeElement
    let isPageRestored = false
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const resetInitialScrollPosition = () => {
      lenisRef.current?.scrollTo(0, { immediate: true })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    const preventInitialScroll = (event: Event) => {
      event.preventDefault()
    }

    const preventBackgroundInteraction = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        return
      }

      if (
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        BLOCKED_SCROLL_KEYS.has(event.key)
      ) {
        event.preventDefault()
      }
    }

    const keepInitialScrollPosition = () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        resetInitialScrollPosition()
      }
    }

    window.history.scrollRestoration = 'manual'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.touchAction = 'none'
    document.documentElement.style.touchAction = 'none'
    lenisRef.current?.stop()
    resetInitialScrollPosition()
    loader.focus({ preventScroll: true })

    document.addEventListener('keydown', preventBackgroundInteraction)
    window.addEventListener('wheel', preventInitialScroll, { passive: false })
    window.addEventListener('touchmove', preventInitialScroll, {
      passive: false,
    })
    window.addEventListener('scroll', keepInitialScrollPosition, {
      passive: true,
    })

    const restorePage = () => {
      if (isPageRestored) {
        return
      }

      isPageRestored = true
      document.removeEventListener('keydown', preventBackgroundInteraction)
      window.removeEventListener('wheel', preventInitialScroll)
      window.removeEventListener('touchmove', preventInitialScroll)
      window.removeEventListener('scroll', keepInitialScrollPosition)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overscrollBehavior = previousBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscrollBehavior
      document.body.style.touchAction = previousBodyTouchAction
      document.documentElement.style.touchAction = previousHtmlTouchAction
      window.history.scrollRestoration = previousScrollRestoration

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
      resetInitialScrollPosition()
      restorePage()
      resetInitialScrollPosition()
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
  }, [lenisRef, onComplete])

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
