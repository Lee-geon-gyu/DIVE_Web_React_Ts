import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenisRef } from '../../app/providers/lenis-context'
import { gsap, ScrollTrigger } from '../../lib/animation/gsap'
import './scroll-progress.css'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const lenisRef = useLenisRef()
  const location = useLocation()

  useLayoutEffect(() => {
    const bar = barRef.current

    if (!bar) return

    const setScale = gsap.quickSetter(bar, 'scaleX')
    let connectionFrame = 0
    let syncFrame = 0
    let removeScrollListener: () => void = () => undefined

    const updateProgressBar = () => {
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      const scrollLimit = Math.max(0, documentHeight - window.innerHeight)
      const progress = scrollLimit > 0 ? window.scrollY / scrollLimit : 0

      setScale(gsap.utils.clamp(0, 1, progress))
    }

    const syncProgressBar = () => {
      updateProgressBar()
      window.cancelAnimationFrame(syncFrame)
      syncFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh(true)
        ScrollTrigger.update()
        updateProgressBar()
      })
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      updateProgressBar()

      if (event.persisted) {
        lenisRef.current?.resize()
      }

      syncProgressBar()
    }

    const connectToLenis = () => {
      const lenis = lenisRef.current

      if (!lenis) {
        connectionFrame = window.requestAnimationFrame(connectToLenis)
        return
      }

      removeScrollListener = lenis.on('scroll', updateProgressBar)
      updateProgressBar()
    }

    updateProgressBar()
    connectToLenis()
    window.addEventListener('load', syncProgressBar)
    window.addEventListener('pageshow', handlePageShow)

    if (document.readyState === 'complete') {
      syncProgressBar()
    }

    return () => {
      window.cancelAnimationFrame(connectionFrame)
      window.cancelAnimationFrame(syncFrame)
      window.removeEventListener('load', syncProgressBar)
      window.removeEventListener('pageshow', handlePageShow)
      removeScrollListener()
      gsap.killTweensOf(bar)
    }
  }, [lenisRef, location.key])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  )
}
