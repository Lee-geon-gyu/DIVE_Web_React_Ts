import { gsap } from 'gsap'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigationType,
} from 'react-router-dom'
import { useLenisRef } from '../../app/providers/lenis-context'
import { preloadSubPageBackground } from '../../lib/preloadSubPageBackground'
import './page-transition.css'

const TRANSITION_DURATION = 0.3
const TRANSITION_EASE = 'power2.out'
const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

function getRouterPath(url: URL) {
  if (
    ROUTER_BASENAME &&
    url.pathname !== ROUTER_BASENAME &&
    !url.pathname.startsWith(`${ROUTER_BASENAME}/`)
  ) {
    return null
  }

  const pathname = ROUTER_BASENAME
    ? url.pathname.slice(ROUTER_BASENAME.length) || '/'
    : url.pathname

  return `${pathname}${url.search}`
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const navigationRequestRef = useRef(0)
  const location = useLocation()
  const previousLocationKeyRef = useRef(location.key)
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const lenisRef = useLenisRef()

  const moveToPageTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [lenisRef])

  const startRouteTransition = useCallback(
    async (to: string) => {
      const requestId = ++navigationRequestRef.current

      await preloadSubPageBackground(to)

      if (requestId !== navigationRequestRef.current) return

      const container = containerRef.current

      if (!container || prefersReducedMotion()) {
        navigate(to)
        return
      }

      animationRef.current?.kill()
      gsap.killTweensOf(container)

      animationRef.current = gsap.to(container, {
        opacity: 0,
        y: -4,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
        overwrite: true,
        onComplete: () => navigate(to),
      })
    },
    [navigate],
  )

  useEffect(() => {
    const handleInternalLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest<HTMLAnchorElement>('a[href]')

      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }

      const url = new URL(anchor.href, window.location.href)

      if (url.origin !== window.location.origin || url.hash) {
        return
      }

      const targetPath = getRouterPath(url)

      if (!targetPath) {
        return
      }

      const currentPath = `${location.pathname}${location.search}`

      if (currentPath === targetPath) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      void startRouteTransition(targetPath)
    }

    document.addEventListener('click', handleInternalLinkClick, true)

    return () => {
      document.removeEventListener('click', handleInternalLinkClick, true)
    }
  }, [location.pathname, location.search, startRouteTransition])

  useLayoutEffect(() => {
    if (previousLocationKeyRef.current === location.key) {
      return
    }

    previousLocationKeyRef.current = location.key

    const container = containerRef.current

    if (!container) {
      return
    }

    animationRef.current?.kill()
    gsap.killTweensOf(container)

    if (location.hash) {
      gsap.set(container, { clearProps: 'opacity,transform' })
      return
    }

    if (navigationType !== 'POP') {
      moveToPageTop()
    }

    const main = document.getElementById('main-content')
    main?.focus({ preventScroll: true })

    if (prefersReducedMotion()) {
      gsap.set(container, { clearProps: 'opacity,transform' })
      return
    }

    animationRef.current = gsap.fromTo(
      container,
      { opacity: 0, y: 4 },
      {
        opacity: 1,
        y: 0,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
        overwrite: true,
        onComplete: () => {
          gsap.set(container, { clearProps: 'opacity,transform' })
        },
      },
    )
  }, [location.hash, location.key, moveToPageTop, navigationType])

  useEffect(() => {
    const container = containerRef.current

    return () => {
      navigationRequestRef.current += 1
      animationRef.current?.kill()

      if (container) {
        gsap.killTweensOf(container)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="page-transition">
      <Outlet />
    </div>
  )
}
