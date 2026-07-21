import { gsap } from './gsap'

const AMBIENT_LOOP_DURATION = 16
const ambientEpoch = performance.now()

interface ImmersiveWaveMotionOptions {
  ambient: HTMLElement
  pointer: HTMLElement
}

export function createImmersiveWaveMotion({
  ambient,
  pointer,
}: ImmersiveWaveMotionOptions) {
  const media = gsap.matchMedia()

  const createAmbientTimeline = (strength: number) => {
    const timeline = gsap
      .timeline({ repeat: -1, paused: true })
      .to(ambient, {
        x: 5 * strength,
        y: -3 * strength,
        rotationY: 0.12 * strength,
        rotationX: -0.06 * strength,
        duration: 3.2,
        ease: 'sine.inOut',
      })
      .to(ambient, {
        x: 3 * strength,
        y: 4 * strength,
        rotationY: 0.06 * strength,
        rotationX: 0.08 * strength,
        duration: 3.2,
        ease: 'sine.inOut',
      })
      .to(ambient, {
        x: -5 * strength,
        y: 2 * strength,
        rotationY: -0.12 * strength,
        rotationX: 0.04 * strength,
        duration: 3.2,
        ease: 'sine.inOut',
      })
      .to(ambient, {
        x: -2 * strength,
        y: -4 * strength,
        rotationY: -0.05 * strength,
        rotationX: -0.08 * strength,
        duration: 3.2,
        ease: 'sine.inOut',
      })
      .to(ambient, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 3.2,
        ease: 'sine.inOut',
      })

    const elapsed = (performance.now() - ambientEpoch) / 1000
    timeline.totalTime(elapsed % AMBIENT_LOOP_DURATION).play()

    return timeline
  }

  media.add(
    '(prefers-reduced-motion: no-preference) and (min-width: 1280px)',
    () => createAmbientTimeline(1),
  )
  media.add(
    '(prefers-reduced-motion: no-preference) and (min-width: 768px) and (max-width: 1279px)',
    () => createAmbientTimeline(0.5),
  )

  media.add(
    '(prefers-reduced-motion: no-preference) and (min-width: 1280px) and (hover: hover) and (pointer: fine)',
    () => {
      const moveX = gsap.quickTo(pointer, 'x', {
        duration: 0.9,
        ease: 'power3.out',
      })
      const moveY = gsap.quickTo(pointer, 'y', {
        duration: 0.9,
        ease: 'power3.out',
      })
      const rotateX = gsap.quickTo(pointer, 'rotationX', {
        duration: 1.1,
        ease: 'power3.out',
      })
      const rotateY = gsap.quickTo(pointer, 'rotationY', {
        duration: 1.1,
        ease: 'power3.out',
      })
      const handlePointerMove = (event: PointerEvent) => {
        const normalizedX = (event.clientX / window.innerWidth) * 2 - 1
        const normalizedY = (event.clientY / window.innerHeight) * 2 - 1

        moveX(normalizedX * 12)
        moveY(normalizedY * 8)
        rotateX(normalizedY * -0.25)
        rotateY(normalizedX * 0.35)
      }
      const resetPointer = (event: PointerEvent) => {
        if (event.relatedTarget) return

        moveX(0)
        moveY(0)
        rotateX(0)
        rotateY(0)
      }

      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      })
      window.addEventListener('pointerout', resetPointer)

      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerout', resetPointer)
        gsap.killTweensOf(pointer)
      }
    },
  )

  return () => media.revert()
}
