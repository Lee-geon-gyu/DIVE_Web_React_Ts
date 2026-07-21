import Lenis from 'lenis'
import { useEffect, useRef, type PropsWithChildren } from 'react'
import { LenisContext } from './lenis-context'

interface LenisProviderProps extends PropsWithChildren {
  isPaused: boolean
}

export function LenisProvider({ children, isPaused }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const initiallyPausedRef = useRef(isPaused)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis()
    lenisRef.current = lenis

    if (initiallyPausedRef.current) {
      lenis.stop()
      lenis.scrollTo(0, { immediate: true })
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

  useEffect(() => {
    const lenis = lenisRef.current

    if (!lenis) return

    if (isPaused) {
      lenis.stop()
      lenis.scrollTo(0, { immediate: true })
      return
    }

    lenis.resize()
    lenis.scrollTo(0, { immediate: true })
    lenis.start()
  }, [isPaused])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
