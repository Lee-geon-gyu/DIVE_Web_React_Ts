import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from '../../lib/animation/gsap'

export function usePageHeroDecoration(
  rootRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current

    if (!root) return

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.fromTo(
            root,
            {
              '--page-hero-decor-y': '-4%',
              '--page-hero-line-scale': 0.35,
            },
            {
              '--page-hero-decor-y': '7%',
              '--page-hero-line-scale': 1,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        },
      )

    }, root)

    return () => {
      media.revert()
      context.revert()
    }
  }, [rootRef])
}
