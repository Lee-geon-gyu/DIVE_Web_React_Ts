import Lenis from 'lenis'
import { useEffect, useRef, type PropsWithChildren } from 'react'
import { LenisContext } from './lenis-context'

export function LenisProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis()
    lenisRef.current = lenis
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

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
