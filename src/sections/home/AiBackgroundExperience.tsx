import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../../lib/animation/gsap'
import './ai-background-experience.css'

interface AiBackgroundExperienceProps {
  children: ReactNode
}

export function AiBackgroundExperience({
  children,
}: AiBackgroundExperienceProps) {
  const rangeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const range = rangeRef.current
    const background = document.querySelector<HTMLElement>(
      '.ai-transition-reveal__media',
    )

    if (!range || !background) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    ScrollTrigger.getById('ai-background-range')?.kill()

    const trigger = ScrollTrigger.create({
      id: 'ai-background-range',
      trigger: range,
      start: 'top bottom',
      end: 'bottom bottom',
      onEnter: () => gsap.set(background, { autoAlpha: 1 }),
      onEnterBack: () => gsap.set(background, { autoAlpha: 1 }),
      onLeave: () =>
        gsap.to(background, {
          autoAlpha: 0,
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: 'power1.out',
          overwrite: true,
        }),
      onRefresh: (self) => {
        if (self.scroll() > self.end) {
          gsap.set(background, { autoAlpha: 0 })
        } else if (self.scroll() >= self.start) {
          gsap.set(background, { autoAlpha: 1 })
        }
      },
    })

    return () => {
      trigger.kill()
      gsap.killTweensOf(background)
    }
  }, [])

  return (
    <div ref={rangeRef} className="ai-background-experience">
      <div className="ai-background-content">{children}</div>
    </div>
  )
}
