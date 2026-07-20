import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from '../../lib/animation/gsap'

function playAfterLoader(timeline: gsap.core.Timeline) {
  const loader = document.querySelector('.app-loader')

  if (!loader) {
    timeline.delay(0.32).play()
    return () => undefined
  }

  let frameId = 0
  const observer = new MutationObserver(() => {
    if (!document.querySelector('.app-loader')) {
      observer.disconnect()
      frameId = window.requestAnimationFrame(() => timeline.play())
    }
  })

  observer.observe(document.body, { childList: true })

  return () => {
    observer.disconnect()
    if (frameId) window.cancelAnimationFrame(frameId)
  }
}

export function useHomeGsap(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current

    if (!root) return

    let stopWatchingLoader: () => void = () => undefined
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = root.querySelector<HTMLElement>('.home-hero')
        const heroContent = root.querySelector<HTMLElement>('.home-hero__inner')
        const serviceName = root.querySelector<HTMLElement>(
          '.home-hero__service-name',
        )
        const titleLine = root.querySelector<HTMLElement>(
          '.home-hero__title-line',
        )
        const description = root.querySelector<HTMLElement>(
          '.home-hero__description',
        )
        const cta = root.querySelector<HTMLElement>('.home-hero__cta')

        if (
          hero &&
          heroContent &&
          serviceName &&
          titleLine &&
          description &&
          cta
        ) {
          const intro = gsap
            .timeline({ paused: true, defaults: { ease: 'power3.out' } })
            .fromTo(
              hero,
              {
                '--hero-decor-opacity': 0,
                '--hero-decor-scale': 1.04,
              },
              {
                '--hero-decor-opacity': 1,
                '--hero-decor-scale': 1,
                duration: 0.7,
              },
            )
            .fromTo(
              serviceName,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55 },
              0.2,
            )
            .fromTo(
              titleLine,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.85 },
              0.32,
            )
            .fromTo(
              description,
              { y: 28, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 },
              0.68,
            )
            .fromTo(
              cta,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55 },
              0.86,
            )

          stopWatchingLoader = playAfterLoader(intro)
        }

        const createSectionEffects = (strength: number) => {
          if (hero && heroContent) {
            gsap.to(heroContent, {
              y: -48 * strength,
              opacity: 0.72,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8,
              },
            })

            gsap.to(hero, {
              '--hero-near-y': `${12 * strength}%`,
              '--hero-far-y': `${5 * strength}%`,
              '--hero-near-rotate': `${3 * strength}deg`,
              '--hero-scroll-scale': 1.03,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8,
              },
            })
          }

          const categories = root.querySelector<HTMLElement>('.home-categories')
          if (categories) {
            gsap.fromTo(
              categories,
              { '--category-track-x': '-8%' },
              {
                '--category-track-x': `${18 * strength}%`,
                ease: 'none',
                scrollTrigger: {
                  trigger: categories,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              },
            )
          }

          const featured = root.querySelector<HTMLElement>(
            '.home-featured-guides',
          )
          const featuredCards = featured?.querySelectorAll<HTMLElement>(
            '.home-featured-guides__link',
          )
          if (featured && featuredCards?.length) {
            gsap.fromTo(
              featuredCards,
              { '--featured-depth': 0.97 },
              {
                '--featured-depth': 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: featured,
                  start: 'top 82%',
                  end: 'center 42%',
                  scrub: 0.9,
                },
              },
            )
          }

          const aiTools = root.querySelector<HTMLElement>('.home-ai-tools')
          if (aiTools) {
            gsap.fromTo(
              aiTools,
              { '--ai-grid-y': '-3%' },
              {
                '--ai-grid-y': `${8 * strength}%`,
                ease: 'none',
                scrollTrigger: {
                  trigger: aiTools,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              },
            )
          }

          const resources = root.querySelector<HTMLElement>('.home-resources')
          if (resources) {
            gsap.fromTo(
              resources,
              { '--resources-reveal': '100%', '--resources-layer-y': '-2%' },
              {
                '--resources-reveal': '0%',
                '--resources-layer-y': `${5 * strength}%`,
                ease: 'none',
                scrollTrigger: {
                  trigger: resources,
                  start: 'top 88%',
                  end: 'center 45%',
                  scrub: 0.9,
                },
              },
            )
          }
        }

        media.add('(min-width: 1280px)', () => createSectionEffects(1))
        media.add('(min-width: 768px) and (max-width: 1279px)', () =>
          createSectionEffects(0.6),
        )

        const finalCta = root.querySelector<HTMLElement>('.home-final-cta')
        const finalEyebrow = finalCta?.querySelector<HTMLElement>(
          '.home-final-cta__eyebrow',
        )
        const finalTitleLine = finalCta?.querySelector<HTMLElement>(
          '.home-final-cta__title-line',
        )
        const finalDescription = finalCta?.querySelector<HTMLElement>(
          '.home-final-cta__description',
        )
        const finalActions = finalCta?.querySelector<HTMLElement>(
          '.home-final-cta__actions',
        )

        if (
          finalCta &&
          finalEyebrow &&
          finalTitleLine &&
          finalDescription &&
          finalActions
        ) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: finalCta,
                start: 'top 75%',
                once: true,
              },
              defaults: { ease: 'power3.out' },
            })
            .fromTo(
              finalCta,
              { '--cta-reveal': '100%' },
              { '--cta-reveal': '0%', duration: 0.8 },
            )
            .fromTo(
              finalEyebrow,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45 },
              0.18,
            )
            .fromTo(
              finalTitleLine,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.7 },
              0.25,
            )
            .fromTo(
              finalDescription,
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 },
              0.48,
            )
            .fromTo(
              finalActions,
              { scale: 0.96, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5 },
              0.62,
            )
        }
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          root.querySelectorAll(
            '.home-hero__service-name, .home-hero__title-line, .home-hero__description, .home-hero__cta, .home-final-cta__eyebrow, .home-final-cta__title-line, .home-final-cta__description, .home-final-cta__actions',
          ),
          { clearProps: 'all' },
        )
        gsap.set(
          root.querySelectorAll('.home-hero, .home-final-cta'),
          { clearProps: 'all' },
        )
      })
    }, root)

    return () => {
      stopWatchingLoader()
      media.revert()
      context.revert()
    }
  }, [rootRef])
}
