import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLenisRef } from '../../app/providers/lenis-context'
import { AiToolDetailCard } from '../../components/ai/AiToolDetailCard'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
  type ExplorerSortOption,
} from '../../components/common/explorer/ExplorerControls'
import { aiTools } from '../../data/aiTools'
import { gsap, ScrollTrigger } from '../../lib/animation/gsap'
import './ai-tool-list.css'

const ALL_CATEGORIES = '전체'
const aiCategories = [
  ALL_CATEGORIES,
  ...new Set(aiTools.map((tool) => tool.category)),
]
const aiCategoryOptions: ExplorerFilterOption[] = aiCategories.map(
  (category) => ({
    value: category,
    label: category,
  }),
)
const DEFAULT_SORT = 'default'
const NAME_SORT = 'name'
const aiSortOptions: ExplorerSortOption[] = [
  { value: DEFAULT_SORT, label: '추천순' },
  { value: NAME_SORT, label: '이름순' },
]
const DOWN_SCROLL_KEYS = new Set(['ArrowDown', 'PageDown', 'End'])
const UP_SCROLL_KEYS = new Set(['ArrowUp', 'PageUp', 'Home'])

type AiRevealState = 'hidden' | 'fading-in' | 'visible' | 'fading-out'
type AiGateMode = 'none' | 'waiting-for-enter' | 'waiting-for-exit'

interface AiToolListProps {
  enablePinnedScroll?: boolean
  theme?: 'default' | 'home-light'
}

export function AiToolList({
  enablePinnedScroll = false,
  theme = 'default',
}: AiToolListProps) {
  const lenisRef = useLenisRef()
  const titleId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const revealStateRef = useRef<AiRevealState>('visible')
  const gateModeRef = useRef<AiGateMode>('none')
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT)

  const filteredAiTools = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    const filteredTools = aiTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        tool.category === selectedCategory

      if (!matchesCategory) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchableContent = [
        tool.name,
        tool.category,
        tool.purpose,
        tool.summary,
        ...tool.useCases,
        tool.recommendedFor,
        tool.accessType,
      ]
        .join(' ')
        .toLocaleLowerCase()

      return searchableContent.includes(normalizedQuery)
    })

    if (selectedSort === NAME_SORT) {
      return [...filteredTools].sort((a, b) =>
        a.name.localeCompare(b.name, 'ko'),
      )
    }

    return filteredTools
  }, [searchQuery, selectedCategory, selectedSort])

  useLayoutEffect(() => {
    if (!enablePinnedScroll) return

    const section = sectionRef.current
    const pin = pinRef.current
    const stage = stageRef.current
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!section || !pin || !stage || !viewport || !track) {
      return
    }

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      let revealTween: gsap.core.Tween | undefined
      let revealLocked = false
      let touchStartY: number | undefined
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const isEditableTarget = (target: EventTarget | null) =>
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

      const preventLockedInput = (event: Event) => event.preventDefault()
      const preventLockedKey = (event: KeyboardEvent) => {
        const isSpace = event.key === ' ' || event.key === 'Spacebar'
        const isScrollKey =
          isSpace ||
          DOWN_SCROLL_KEYS.has(event.key) ||
          UP_SCROLL_KEYS.has(event.key)

        if (!isEditableTarget(event.target) && isScrollKey) {
          event.preventDefault()
        }
      }
      const removeLockListeners = () => {
        window.removeEventListener('wheel', preventLockedInput, true)
        window.removeEventListener('touchmove', preventLockedInput, true)
        window.removeEventListener('keydown', preventLockedKey, true)
      }

      const lockRevealScroll = () => {
        if (revealLocked) return

        revealLocked = true
        lenisRef.current?.stop()
        window.addEventListener('wheel', preventLockedInput, {
          passive: false,
          capture: true,
        })
        window.addEventListener('touchmove', preventLockedInput, {
          passive: false,
          capture: true,
        })
        window.addEventListener('keydown', preventLockedKey, true)
      }

      const unlockRevealScroll = () => {
        if (!revealLocked) return
        revealLocked = false
        removeLockListeners()
        lenisRef.current?.start()
      }

      const ensureAiVisible = () => {
        revealTween?.kill()
        gsap.set(stage, { autoAlpha: 1, clearProps: 'transform' })
        revealStateRef.current = 'visible'
        gateModeRef.current = 'none'
        unlockRevealScroll()
      }

      const armAiReveal = () => {
        const pinProgress =
          ScrollTrigger.getById('ai-tools-pin')?.progress ?? 0

        if (pinProgress > 0.001) {
          ensureAiVisible()
          return
        }

        lockRevealScroll()
        revealStateRef.current = 'hidden'
        gateModeRef.current = 'waiting-for-enter'
        gsap.set(stage, { autoAlpha: 0, clearProps: 'transform' })
      }

      const prepareAiReveal = () => {
        const pinProgress =
          ScrollTrigger.getById('ai-tools-pin')?.progress ?? 0

        if (pinProgress > 0.001) return

        revealStateRef.current = 'hidden'
        gateModeRef.current = 'none'
        gsap.set(stage, { autoAlpha: 0, clearProps: 'transform' })
      }

      const armAiFadeOut = () => {
        lockRevealScroll()
        revealStateRef.current = 'visible'
        gateModeRef.current = 'waiting-for-exit'
        gsap.set(stage, { autoAlpha: 1, clearProps: 'transform' })
      }

      const startRevealFade = (targetState: 'visible' | 'hidden') => {
        const currentState = revealStateRef.current
        const canStart =
          (targetState === 'visible' && currentState === 'hidden') ||
          (targetState === 'hidden' && currentState === 'visible')

        if (!canStart) return

        revealStateRef.current =
          targetState === 'visible' ? 'fading-in' : 'fading-out'
        lockRevealScroll()

        revealTween = gsap.to(stage, {
          autoAlpha: targetState === 'visible' ? 1 : 0,
          duration: prefersReducedMotion ? 0.05 : 1.25,
          ease: 'power1.out',
          overwrite: true,
          onComplete: () => {
            revealStateRef.current = targetState
            gateModeRef.current = 'none'
            unlockRevealScroll()
          },
        })
      }

      const handleDirectionalInput = (
        direction: 'down' | 'up',
        event: Event,
      ) => {
        const state = revealStateRef.current

        if (state === 'fading-in' || state === 'fading-out') {
          event.preventDefault()
          return
        }

        const gateMode = gateModeRef.current

        if (
          direction === 'down' &&
          gateMode === 'waiting-for-enter' &&
          state === 'hidden'
        ) {
          event.preventDefault()
          startRevealFade('visible')
        } else if (
          direction === 'up' &&
          gateMode === 'waiting-for-exit' &&
          state === 'visible'
        ) {
          event.preventDefault()
          startRevealFade('hidden')
        }
      }

      function handleWheel(event: WheelEvent) {
        if (event.deltaY === 0) return
        handleDirectionalInput(event.deltaY > 0 ? 'down' : 'up', event)
      }

      function handleTouchStart(event: TouchEvent) {
        touchStartY = event.touches[0]?.clientY
      }

      function handleTouchMove(event: TouchEvent) {
        const currentY = event.touches[0]?.clientY
        if (touchStartY === undefined || currentY === undefined) return
        const deltaY = touchStartY - currentY

        if (Math.abs(deltaY) <= 8) return
        handleDirectionalInput(deltaY > 0 ? 'down' : 'up', event)
        touchStartY = currentY
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (isEditableTarget(event.target)) return

        if (event.key === ' ' || event.key === 'Spacebar') {
          handleDirectionalInput(event.shiftKey ? 'up' : 'down', event)
        } else if (DOWN_SCROLL_KEYS.has(event.key)) {
          handleDirectionalInput('down', event)
        } else if (UP_SCROLL_KEYS.has(event.key)) {
          handleDirectionalInput('up', event)
        }
      }

      ensureAiVisible()
      window.addEventListener('wheel', handleWheel, {
        passive: false,
        capture: true,
      })
      window.addEventListener('touchstart', handleTouchStart, {
        passive: true,
        capture: true,
      })
      window.addEventListener('touchmove', handleTouchMove, {
        passive: false,
        capture: true,
      })
      window.addEventListener('keydown', handleKeyDown, true)
      window.addEventListener('dive:transition-reveal-enter', prepareAiReveal)
      window.addEventListener('dive:transition-reveal-complete', armAiReveal)

      if (
        !prefersReducedMotion &&
        (ScrollTrigger.getById('transition-reveal-pin')?.progress ?? 0) >= 1
      ) {
        armAiReveal()
      }

      media.add(
        '(min-width: 1280px) and (prefers-reduced-motion: no-preference)',
        () => {
          ScrollTrigger.getById('ai-tools-pin')?.kill()
          gsap.set(track, { y: 0 })

          const getDistance = () =>
            Math.max(0, track.scrollHeight - viewport.clientHeight)
          const getHoldDistance = () => window.innerHeight * 0.25
          const pinTimeline = gsap
            .timeline({
              scrollTrigger: {
                id: 'ai-tools-pin',
                trigger: pin,
                start: 'top top',
                end: () => `+=${getDistance() + getHoldDistance()}`,
                pin,
                pinSpacing: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (
                    self.direction < 0 &&
                    self.progress <= 0.001 &&
                    revealStateRef.current === 'visible' &&
                    gateModeRef.current === 'none'
                  ) {
                    armAiFadeOut()
                    return
                  }

                  if (
                    self.progress > 0.001 &&
                    revealStateRef.current === 'hidden' &&
                    gateModeRef.current === 'none'
                  ) {
                    ensureAiVisible()
                  }
                },
              },
            })
            .to(track, {
              y: () => -getDistance(),
              duration: () => Math.max(1, getDistance()),
              ease: 'none',
            })
            .to({}, { duration: () => getHoldDistance() })

          return () => {
            pinTimeline.scrollTrigger?.kill()
            pinTimeline.kill()
            gsap.set(track, { clearProps: 'transform' })
          }
        },
      )

      return () => {
        window.removeEventListener('wheel', handleWheel, true)
        window.removeEventListener('touchstart', handleTouchStart, true)
        window.removeEventListener('touchmove', handleTouchMove, true)
        window.removeEventListener('keydown', handleKeyDown, true)
        window.removeEventListener(
          'dive:transition-reveal-enter',
          prepareAiReveal,
        )
        window.removeEventListener(
          'dive:transition-reveal-complete',
          armAiReveal,
        )
        removeLockListeners()
        unlockRevealScroll()
        revealTween?.kill()
        ensureAiVisible()
      }
    }, section)

    return () => {
      ScrollTrigger.getById('ai-tools-pin')?.kill()
      context.revert()
      media.revert()
      gsap.set(stage, {
        autoAlpha: 1,
        clearProps: 'opacity,visibility,transform',
      })
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [enablePinnedScroll, filteredAiTools, lenisRef])

  const resetFilters = () => {
    setHasExplorerInteracted(true)
    setSearchQuery('')
    setSelectedCategory(ALL_CATEGORIES)
    setSelectedSort(DEFAULT_SORT)
  }

  const handleSearchQueryChange = (value: string) => {
    setHasExplorerInteracted(true)
    setSearchQuery(value)
  }

  const handleCategoryChange = (value: string) => {
    setHasExplorerInteracted(true)
    setSelectedCategory(value)
  }

  const handleSortChange = (value: string) => {
    setHasExplorerInteracted(true)
    setSelectedSort(value)
  }

  return (
    <section
      ref={sectionRef}
      className={`ai-tool-list${
        enablePinnedScroll ? ' ai-tool-list--pinned' : ''
      }${theme === 'home-light' ? ' ai-tool-list--home-light' : ''}`}
      aria-labelledby={titleId}
    >
      <div ref={pinRef} className="ai-tool-list__pin">
        <div ref={stageRef} className="ai-tool-list__stage">
          <div className="page-container ai-tool-list__container">
            <div className="content-container explorer-layout">
              <div
                className="explorer-layout__panel ai-tool-list__sidebar"
                data-aos={enablePinnedScroll ? undefined : 'explorer-panel'}
              >
                <SectionHeader
                  titleId={titleId}
                  eyebrow="Explore tools"
                  title="AI Tools"
                  description="작업 단계와 필요한 도움을 기준으로 각 도구의 활용 방법을 살펴보세요."
                  status={
                    filteredAiTools.length > 0
                      ? `총 ${filteredAiTools.length}개의 AI 도구`
                      : '검색 결과가 없습니다'
                  }
                  announceStatus
                  enableAos={!enablePinnedScroll}
                />

                <ExplorerControls
                  searchInputId="ai-tool-search"
                  resultsId="ai-tool-results"
                  searchLabel="AI 도구 검색"
                  searchPlaceholder="도구 이름, 활용 목적, 카테고리 검색"
                  searchQuery={searchQuery}
                  onSearchQueryChange={handleSearchQueryChange}
                  filterLabel="카테고리"
                  filterOptions={aiCategoryOptions}
                  selectedFilter={selectedCategory}
                  onSelectedFilterChange={handleCategoryChange}
                  sortLabel="정렬"
                  sortOptions={aiSortOptions}
                  selectedSort={selectedSort}
                  onSelectedSortChange={handleSortChange}
                />
              </div>

              <div
                ref={viewportRef}
                className="explorer-layout__results ai-tool-list__viewport"
              >
                {filteredAiTools.length > 0 ? (
                  <ul
                    ref={trackRef}
                    id="ai-tool-results"
                    className="ai-tool-list__grid ai-tool-list__track"
                  >
                    {filteredAiTools.map((tool, index) => (
                      <li
                        key={tool.id}
                        className="ai-tool-list__item"
                        data-aos={
                          enablePinnedScroll || hasExplorerInteracted
                            ? undefined
                            : 'fade-up'
                        }
                        data-aos-delay={
                          enablePinnedScroll || hasExplorerInteracted
                            ? undefined
                            : Math.min(index * 70, 280)
                        }
                      >
                        <AiToolDetailCard tool={tool} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    id="ai-tool-results"
                    title="조건에 맞는 AI 도구를 찾지 못했습니다."
                    description="검색어나 카테고리를 변경해 다시 확인해보세요."
                    actionLabel="필터 초기화"
                    onAction={resetFilters}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ai-tool-list__exit-space" aria-hidden="true" />
    </section>
  )
}
