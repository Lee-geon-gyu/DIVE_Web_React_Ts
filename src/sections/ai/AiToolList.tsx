import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
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

interface AiToolListProps {
  enablePinnedScroll?: boolean
}

export function AiToolList({ enablePinnedScroll = false }: AiToolListProps) {
  const titleId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
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
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!section || !pin || !viewport || !track) return

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        '(min-width: 1280px) and (prefers-reduced-motion: no-preference)',
        () => {
          ScrollTrigger.getById('home-ai-tools-track')?.kill()
          gsap.set(track, { y: 0 })

          const getDistance = () =>
            Math.max(0, track.scrollHeight - viewport.clientHeight)

          const trackTween = gsap.to(track, {
            y: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              id: 'home-ai-tools-track',
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.max(window.innerHeight, getDistance())}`,
              pin,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          const resizeObserver = new ResizeObserver(() => {
            ScrollTrigger.refresh()
          })
          resizeObserver.observe(viewport)
          resizeObserver.observe(track)

          const refreshFrame = window.requestAnimationFrame(() => {
            gsap.set(track, { y: 0 })
            ScrollTrigger.refresh()
          })

          return () => {
            window.cancelAnimationFrame(refreshFrame)
            resizeObserver.disconnect()
            trackTween.scrollTrigger?.kill()
            trackTween.kill()
            gsap.set(track, { clearProps: 'transform' })
          }
        },
      )
    }, section)

    return () => {
      media.revert()
      context.revert()
      ScrollTrigger.getById('home-ai-tools-track')?.kill()
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [enablePinnedScroll, filteredAiTools])

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
      }`}
      aria-labelledby={titleId}
    >
      <div ref={pinRef} className="page-container ai-tool-list__pin">
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
    </section>
  )
}
