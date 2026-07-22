import { useLayoutEffect, useRef } from 'react'
import aiToolsImmersiveBg from '../../assets/images/home/ai-tools-immersive-bg.png'
import { gsap, ScrollTrigger } from '../../lib/animation/gsap'

const INITIAL_RADIUS = 5

export function TransitionRevealSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current

    if (!section || !media) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const getFinalRadius = () =>
      Math.hypot(window.innerWidth, window.innerHeight) * 0.55
    const setClipPath = gsap.quickSetter(media, 'clipPath')
    const updateRadius = (progress: number) => {
      const radius = gsap.utils.interpolate(
        INITIAL_RADIUS,
        getFinalRadius(),
        progress,
      )
      setClipPath(`circle(${radius}px at 50% 50%)`)
    }
    let wasComplete = false
    const updateCompletionState = (progress: number) => {
      const isComplete = progress >= 1

      if (isComplete === wasComplete) return

      wasComplete = isComplete
      window.dispatchEvent(
        new Event(
          isComplete
            ? 'dive:transition-reveal-complete'
            : 'dive:transition-reveal-incomplete',
        ),
      )
    }

    ScrollTrigger.getById('transition-reveal-pin')?.kill()
    gsap.set(media, {
      autoAlpha: 0,
      clipPath: `circle(${INITIAL_RADIUS}px at 50% 50%)`,
    })

    if (prefersReducedMotion) {
      gsap.set(media, { autoAlpha: 1 })
      updateRadius(1)
      updateCompletionState(1)
      return () =>
        gsap.set(media, { clearProps: 'clipPath,opacity,visibility' })
    }

    const trigger = ScrollTrigger.create({
      id: 'transition-reveal-pin',
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * 2}`,
      pin: section,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.set(media, { autoAlpha: 1 })
        window.dispatchEvent(new Event('dive:transition-reveal-enter'))
      },
      onEnterBack: () => gsap.set(media, { autoAlpha: 1 }),
      onLeaveBack: () => gsap.set(media, { autoAlpha: 0 }),
      onUpdate: (self) => {
        updateRadius(self.progress)
        updateCompletionState(self.progress)
      },
      onRefresh: (self) => {
        updateRadius(self.progress)
        updateCompletionState(self.progress)
      },
    })

    return () => {
      trigger.kill()
      gsap.killTweensOf(media)
      gsap.set(media, { clearProps: 'clipPath,opacity,visibility' })
    }
  }, [])

  return (
    <>
      <div
        ref={mediaRef}
        className="ai-transition-reveal__media"
        aria-hidden="true"
      >
        <img
          className="ai-transition-reveal__image"
          src={aiToolsImmersiveBg}
          alt=""
          width="2880"
          height="1425"
          draggable={false}
        />
      </div>
      <section
        ref={sectionRef}
        className="ai-transition-reveal"
        aria-label="AI 도구 콘텐츠로 전환"
      />
    </>
  )
}
