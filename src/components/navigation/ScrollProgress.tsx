import type Lenis from 'lenis'
import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenisRef } from '../../app/providers/lenis-context'
import { gsap } from '../../lib/animation/gsap'
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
    let removeScrollListener: () => void = () => undefined

    const updateProgress = ({ scroll, limit }: Lenis) => {
      const progress = limit > 0 ? scroll / limit : 0
      setScale(gsap.utils.clamp(0, 1, progress))
    }

    const connectToLenis = () => {
      const lenis = lenisRef.current

      if (!lenis) {
        connectionFrame = window.requestAnimationFrame(connectToLenis)
        return
      }

      removeScrollListener = lenis.on('scroll', updateProgress)
      updateProgress(lenis)
    }

    connectToLenis()

    return () => {
      window.cancelAnimationFrame(connectionFrame)
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
