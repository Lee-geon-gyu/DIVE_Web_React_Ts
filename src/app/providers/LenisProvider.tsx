import Lenis from 'lenis'
import { useLayoutEffect, useRef, type PropsWithChildren } from 'react'
import { useMatch } from 'react-router-dom'
import { LenisContext } from './lenis-context'

interface LenisProviderProps extends PropsWithChildren {
  isPaused: boolean
  holdAtHero: boolean
}

export function LenisProvider({ children, isPaused, holdAtHero }: LenisProviderProps) {
  const isHome = Boolean(useMatch({ path: '/', end: true }))
  const homeScroll = useRef(isHome)
  const lenisRef = useRef<Lenis | null>(null)
  const initiallyPausedRef = useRef(isPaused)

  useLayoutEffect(() => {
    homeScroll.current = isHome
  }, [isHome])

  useLayoutEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 0.85,
      virtualScroll: (input) => {
        if (homeScroll.current && input.event.type === 'wheel') {
          const distance = Math.abs(input.deltaY) * 0.72
          // Soften long wheel impulses without slowing normal wheel ticks further.
          const softened = distance > 120 ? Math.min(205, 120 + (distance - 120) * 0.44) : distance
          input.deltaY = Math.sign(input.deltaY) * softened
        }
        return true
      },
    })
    lenisRef.current = lenis

    if (initiallyPausedRef.current) {
      lenis.stop()
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    let animationFrameId = 0

    const update = (time: number) => {
      lenis.raf(time)
      animationFrameId = window.requestAnimationFrame(update)
    }

    animationFrameId = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    const lenis = lenisRef.current

    if (!lenis) return

    if (isPaused) {
      lenis.stop()
      if (holdAtHero) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        lenis.resize()
      }
      lenis.scrollTo(0, { immediate: true, force: true })
      return
    }

    lenis.resize()
    lenis.start()
    const fragment = document.getElementById(window.location.hash.slice(1))
    lenis.scrollTo(fragment ?? 0, { immediate: true })
  }, [holdAtHero, isPaused])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
