import { useLayoutEffect, useRef, type ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenisRef } from '../../app/providers/lenis-context'
import { ScrollTrigger } from '../../lib/animation/gsap'
import './scroll-progress.css'

const scrollSteps = 1000

function getScrollLimit() {
  return Math.max(0, (document.scrollingElement ?? document.documentElement).scrollHeight - window.innerHeight)
}

function getScrollProgress(limit: number) {
  return limit > 0 ? Math.min(1, Math.max(0, window.scrollY / limit)) : 0
}

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const controlRef = useRef<HTMLInputElement>(null)
  const lenisRef = useLenisRef()
  const location = useLocation()

  useLayoutEffect(() => {
    const bar = barRef.current
    const control = controlRef.current

    if (!bar || !control) return

    let syncFrame = 0

    const updateProgressBar = () => {
      const limit = getScrollLimit()
      const progress = getScrollProgress(limit)
      bar.style.width = `${progress * 100}%`
      control.value = String(Math.round(progress * scrollSteps))
      control.disabled = limit === 0
      control.setAttribute('aria-valuetext', `${Math.round(progress * 100)}%`)
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

    const observer = new ResizeObserver(updateProgressBar)
    observer.observe(document.body)
    updateProgressBar()
    window.addEventListener('scroll', updateProgressBar, { passive: true })
    window.addEventListener('resize', updateProgressBar)
    window.addEventListener('load', syncProgressBar)
    window.addEventListener('pageshow', handlePageShow)

    if (document.readyState === 'complete') {
      syncProgressBar()
    }

    return () => {
      window.cancelAnimationFrame(syncFrame)
      observer.disconnect()
      window.removeEventListener('scroll', updateProgressBar)
      window.removeEventListener('resize', updateProgressBar)
      window.removeEventListener('load', syncProgressBar)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [lenisRef, location.key])

  function scrollFromProgress(event: ChangeEvent<HTMLInputElement>) {
    const control = event.currentTarget
    const limit = getScrollLimit()
    const lenis = lenisRef.current

    if (lenis?.isStopped || lenis?.isLocked) {
      control.value = String(Math.round(getScrollProgress(limit) * scrollSteps))
      return
    }

    const top = (control.valueAsNumber / scrollSteps) * limit
    if (lenis) lenis.scrollTo(top, { immediate: true })
    else window.scrollTo({ top, behavior: 'instant' })
  }

  return (
    <div className="scroll-progress">
      <div ref={barRef} className="scroll-progress__bar" aria-hidden="true" />
      <input
        ref={controlRef}
        className="scroll-progress__control"
        type="range"
        min={0}
        max={scrollSteps}
        defaultValue={0}
        aria-label="페이지 스크롤 위치"
        onChange={scrollFromProgress}
      />
    </div>
  )
}
