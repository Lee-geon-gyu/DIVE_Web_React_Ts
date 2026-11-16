import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CategoryBackdrop } from '../sections/home/CategoryBackdrop'
import { HomeCategories } from '../sections/home/HomeCategories'
import { HomeFinalCta } from '../sections/home/HomeFinalCta'
import { HomeHero } from '../sections/home/HomeHero'
import './home-page.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const smoothstep = (progress: number) => progress * progress * (3 - 2 * progress)

function wrapLineMotion(lines: Element[], className: string) {
  return lines.map((line) => {
    const layer = document.createElement('span')
    layer.className = className
    line.before(layer)
    layer.append(line)
    return layer
  })
}

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const cubeTravel = useRef({ progress: 0 })

  useLayoutEffect(() => {
    const page = pageRef.current
    const journey = page?.querySelector<HTMLElement>('.home-intro-journey')
    const stage = journey?.querySelector<HTMLElement>('.home-intro-journey__stage')
    const about = journey?.querySelector<HTMLElement>('.home-about')
    const workflowAnchor = journey?.querySelector<HTMLElement>('.home-workflow-anchor')
    const workflow = stage?.querySelector<HTMLElement>('.home-workflow')
    const categoriesAnchor = journey?.querySelector<HTMLElement>('#categories')
    const workflowEndAnchor = journey?.querySelector<HTMLElement>('.home-workflow-end')
    const categories = stage?.querySelector<HTMLElement>('.home-categories')
    const categoriesContent = categories?.querySelector<HTMLElement>('.home-categories__content')
    const backdrop = page?.querySelector<HTMLElement>('.category-backdrop')
    const closing = page?.querySelector<HTMLElement>('.home-final-cta')
    const guides = stage?.querySelector<HTMLElement>('.home-closing-guides')
    const ring = guides?.querySelector<HTMLElement>('.home-closing-guides__ring')
    const header = page?.closest('.app-layout')?.querySelector<HTMLElement>('.site-header')
    const headerLight = header?.querySelector<HTMLElement>('.site-header__ceiling-light')
    if (!page || !journey || !stage || !about || !workflowAnchor || !workflowEndAnchor || !workflow || !categoriesAnchor || !categories || !categoriesContent || !backdrop || !closing || !guides || !ring) return

    const context = gsap.context(() => {
      const entranceDistance = () => Math.round(journey.offsetTop * 0.26)
      const workflowStart = () => workflowAnchor.offsetTop
      const categoriesStart = () => categoriesAnchor.offsetTop
      const workflowEnd = () => workflowEndAnchor.offsetTop
      const workflowAt = (progress: number) => Math.round(workflowStart() + (workflowEnd() - workflowStart()) * progress)
      const fillEnd = () => Math.round(workflowStart() * 0.47)
      const turnStart = () => workflowEnd() + 80
      const turnEnd = () => journey.offsetHeight - stage.offsetHeight
      const turnAt = (progress: number) => `top top-=${turnStart() + (turnEnd() - turnStart()) * progress}`
      const workflowContent = workflow.querySelectorAll('.home-workflow__stage-content')
      let lineMotion: gsap.Context | undefined
      const intro = SplitText.create('.home-about__copy', {
        type: 'lines', mask: 'lines', tag: 'span', linesClass: 'home-about__line', autoSplit: true,
        onRevert: () => lineMotion?.revert(),
        onSplit({ lines }) {
          // Rebuild the line animations when the text wraps at a new width.
          const exitLayers = wrapLineMotion(lines, 'home-about__line-exit')
          lineMotion = gsap.context(() => {
            gsap.fromTo(lines, { yPercent: 110 }, {
              yPercent: 0, ease: 'power2.out', stagger: 0.09,
              scrollTrigger: {
                trigger: journey, start: () => `top top+=${entranceDistance()}`,
                end: 'top top-=55', scrub: true,
              },
            })
            gsap.fromTo(lines, { '--line-fill': '0%' }, {
              '--line-fill': '100%', duration: 1, ease: 'none', stagger: 1,
              scrollTrigger: {
                trigger: journey, start: 'top top-=55',
                end: () => `top top-=${fillEnd()}`,
                scrub: true,
              },
            })
            const handoff = gsap.timeline({
              scrollTrigger: {
                trigger: journey, start: () => `top top-=${fillEnd()}`,
                end: () => `top top-=${workflowStart()}`, scrub: 0.34,
              },
            })
            handoff.fromTo(exitLayers, { yPercent: 0 }, {
              yPercent: -110, duration: 0.22, ease: 'power1.inOut', stagger: { amount: 0.18 },
            }, 0)
            handoff.fromTo(about, { autoAlpha: 1 }, {
              autoAlpha: 0, duration: 0.54, ease: 'power1.inOut',
            }, 0.46)
            handoff.fromTo([backdrop, categories], { autoAlpha: 0 }, {
              autoAlpha: 1, duration: 0.54, ease: 'power1.inOut',
            }, 0.46)
            if (headerLight) {
              handoff.fromTo(headerLight, { '--home-ceiling-opacity': 1 }, {
                '--home-ceiling-opacity': 0, duration: 0.54, ease: 'power1.inOut',
              }, 0.46)
            }
          }, about)
        },
      })

      gsap.fromTo(about, { '--intro-surface': 0 }, {
        '--intro-surface': 1, ease: 'none',
        scrollTrigger: { trigger: journey, start: () => `top top+=${entranceDistance()}`, end: 'top top', scrub: true },
      })

      gsap.fromTo(workflowContent, { autoAlpha: 0, y: 12 }, {
        autoAlpha: 1, y: 0, duration: 0.21, ease: 'power1.out', stagger: 0.14,
        scrollTrigger: {
          trigger: journey, start: () => `top top-=${workflowStart()}`,
          end: () => `top top-=${categoriesStart()}`, scrub: 0.42,
        },
      })

      const remainingHeight = () => {
        const { paddingTop, paddingBottom } = getComputedStyle(categories)
        const available = categories.clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)
        return Math.max(0, categoriesContent.offsetHeight - available)
      }
      const workflowScroll = gsap.fromTo(categoriesContent, { y: 0 }, {
        y: () => -remainingHeight(),
        ease: 'none',
        scrollTrigger: {
          trigger: journey, start: () => `top top-=${categoriesStart()}`,
          end: () => `top top-=${workflowAt(0.86)}`,
          scrub: true, invalidateOnRefresh: true,
        },
      })
      const revealFocusedCategory = ({ target }: FocusEvent) => {
        if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return
        const bounds = target.getBoundingClientRect()
        const headerBottom = header?.getBoundingClientRect().bottom ?? 0
        if (bounds.top >= headerBottom && bounds.bottom <= window.innerHeight) return
        const trigger = workflowScroll.scrollTrigger
        if (!trigger) return
        const shift = (bounds.top + bounds.bottom - headerBottom - window.innerHeight) / 2
          - Number(gsap.getProperty(categoriesContent, 'y'))
        const progress = gsap.utils.clamp(0, 1, shift / Math.max(1, remainingHeight()))
        window.scrollTo({ top: gsap.utils.interpolate(trigger.start, trigger.end, progress), behavior: 'instant' })
      }
      categories.addEventListener('focusin', revealFocusedCategory)

      const copyExitDuration = 0.15
      const workflowLinks = workflow.querySelectorAll('.home-workflow__step-link')
      const workflowText = SplitText.create(categories.querySelectorAll('.home-workflow__copy'), {
        type: 'lines', mask: 'lines', tag: 'span', linesClass: 'home-workflow__line', aria: 'none', autoSplit: true,
        onSplit({ lines }) {
          const exitMotion = { yPercent: -110, ease: 'power1.inOut' }
          const detailSelector = '.home-workflow__stage'
          const introLines = lines.filter((line) => !line.closest(detailSelector))
          const detailLines = lines.filter((line) => line.closest(detailSelector))
          const exit = gsap.timeline({
            scrollTrigger: {
              trigger: journey, start: () => turnAt(0), end: () => turnAt(copyExitDuration), scrub: 0.28,
            },
          })
          exit.fromTo(introLines, { yPercent: 0 }, {
            ...exitMotion, duration: 0.14, stagger: { amount: 0.06 },
          }, 0)
          exit.fromTo(detailLines, { yPercent: 0 }, {
            ...exitMotion, duration: 0.21, stagger: { amount: 0.22 },
          }, 0.15)
          exit.fromTo(workflowLinks, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.22, ease: 'power1.inOut' }, 0.36)
          return exit
        },
      })

      const cubeFadeStart = 0.24
      const cubeFadeDuration = 0.31
      // The fade uses a quadratic ease; this is where its opacity reaches 25%.
      const cubeInteractionEnd = cubeFadeStart + cubeFadeDuration * (1 - Math.sqrt(0.125))
      let closingMotion: gsap.Context | undefined
      const closingText = SplitText.create('.home-final-cta__title', {
        type: 'lines', mask: 'lines', tag: 'span', linesClass: 'home-final-cta__line', autoSplit: true,
        onRevert: () => closingMotion?.revert(),
        onSplit({ lines }) {
          const revealLayers = wrapLineMotion(lines, 'home-final-cta__line-reveal')
          closingMotion = gsap.context(() => {
            const ringStart = 0.55
            const ringDuration = 0.62
            const copyStart = ringStart + ringDuration + 0.025
            const copyDuration = 0.165
            const lineDuration = copyDuration / Math.max(1, revealLayers.length)
            gsap.set(closing, { autoAlpha: 0 })
            const turn = gsap.timeline({
              defaults: { ease: smoothstep },
              onUpdate() {
                categories.inert = this.time() >= cubeInteractionEnd
              },
              scrollTrigger: {
                trigger: journey, start: () => turnAt(0), end: () => turnAt(1),
                scrub: 0.28, invalidateOnRefresh: true,
              },
            })
            // Move the cube and floor light after the workflow copy has left.
            const retreat = -66
            const retreatDuration = ringStart - copyExitDuration
            turn.fromTo(cubeTravel.current, { progress: 0 }, {
              progress: 1, duration: ringStart - cubeInteractionEnd,
            }, cubeInteractionEnd)
            turn.fromTo('.home-categories__panel', { x: 0, scale: 1 }, {
              x: () => categories.clientWidth * retreat / 100, scale: 0.56, duration: retreatDuration,
            }, copyExitDuration)
            turn.fromTo('.home-categories__panel', { autoAlpha: 1 }, {
              autoAlpha: 0, duration: cubeFadeDuration, ease: 'power1.inOut',
            }, cubeFadeStart)
            turn.fromTo('.category-die__light', { opacity: 1 }, {
              opacity: 0, duration: retreatDuration, ease: 'sine.inOut',
            }, copyExitDuration)
            turn.fromTo('.home-categories__surface', { opacity: 1 }, {
              opacity: 0, duration: retreatDuration, ease: 'sine.inOut',
            }, copyExitDuration)
            turn.fromTo(guides, { opacity: 0 }, { opacity: 1, duration: 0.06 }, ringStart)
            turn.fromTo(ring, {
              scale: () => Math.hypot(stage.clientWidth, stage.clientHeight) * 1.1 / ring.offsetWidth,
            }, { scale: 0, duration: ringDuration, ease: 'sine.inOut' }, ringStart)
            turn.set(closing, { autoAlpha: 1 }, copyStart)
            revealLayers.forEach((line, index) => {
              turn.fromTo(line, { yPercent: 110 }, {
                yPercent: 0, duration: lineDuration * 0.98, ease: 'power1.inOut',
              }, copyStart + index * lineDuration)
            })
          }, stage)
        },
      })

      return () => {
        categories.removeEventListener('focusin', revealFocusedCategory)
        intro.revert()
        workflowText.revert()
        closingText.revert()
        categories.inert = false
      }
    }, page)

    return () => context.revert()
  }, [])

  return (
    <div className="home-page" ref={pageRef}>
      <CategoryBackdrop />
      <HomeHero />
      <div className="home-intro-journey">
        <div className="home-intro-journey__stage">
          <section id="about-dive" className="home-about" aria-labelledby="dive-about-title" tabIndex={-1}>
            <div className="page-container home-about__inner">
              <h2 id="dive-about-title" className="home-about__lead home-about__copy">디자인부터 퍼블리싱까지<br />더 깊이 탐색하세요</h2>
              <p className="home-about__description home-about__copy">
                DIVE는 UI/UX 디자이너와 웹 퍼블리셔가 실무 자료를 쉽게 찾을 수 있도록 만든 가이드입니다.
                UI/UX 레퍼런스, AI 도구, 디자인 리소스, 반응형 웹, 웹 라이브러리와 퍼블리싱 가이드를
                목적에 맞게 탐색할 수 있습니다.
              </p>
            </div>
          </section>
          <HomeCategories travel={cubeTravel} />
          <div className="home-closing-guides" aria-hidden="true">
            <span className="home-closing-guides__ring" />
          </div>
          <HomeFinalCta />
        </div>
        <div className="home-workflow-anchor" />
        <div id="categories" className="home-categories-anchor" />
        <div className="home-workflow-end" />
      </div>
    </div>
  )
}
