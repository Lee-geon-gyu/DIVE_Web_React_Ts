import { useId, useMemo, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
} from '../../components/common/explorer/ExplorerControls'
import { ResponsiveGuideCard } from '../../components/responsive-web/ResponsiveGuideCard'
import { responsiveGuides } from '../../data/responsiveGuides'
import './responsive-guide-list.css'

const ALL_CATEGORIES = '전체'
const responsiveGuideCategories = [
  ALL_CATEGORIES,
  ...new Set(responsiveGuides.map((guide) => guide.category)),
]
const responsiveGuideCategoryOptions: ExplorerFilterOption[] =
  responsiveGuideCategories.map((category) => ({
    value: category,
    label: category,
  }))

export function ResponsiveGuideList() {
  const titleId = useId()
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const filteredResponsiveGuides = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    return responsiveGuides.filter((guide) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        guide.category === selectedCategory

      if (!matchesCategory) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchableContent = [
        guide.title,
        guide.category,
        guide.description,
        ...guide.keyPoints,
        guide.targetViewport,
        guide.difficulty,
        guide.sourceType,
      ]
        .join(' ')
        .toLocaleLowerCase()

      return searchableContent.includes(normalizedQuery)
    })
  }, [searchQuery, selectedCategory])

  const resetFilters = () => {
    setHasExplorerInteracted(true)
    setSearchQuery('')
    setSelectedCategory(ALL_CATEGORIES)
  }

  const handleSearchQueryChange = (value: string) => {
    setHasExplorerInteracted(true)
    setSearchQuery(value)
  }

  const handleCategoryChange = (value: string) => {
    setHasExplorerInteracted(true)
    setSelectedCategory(value)
  }

  return (
    <section className="responsive-guide-list" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <SectionHeader
            titleId={titleId}
            title="반응형 설계 가이드"
            description="레이아웃, 타이포그래피, 내비게이션, 이미지 처리 등 주요 주제를 확인하고, 화면 크기 변화에 따라 무엇을 유지하고 조정해야 하는지 살펴보세요."
            status={
              filteredResponsiveGuides.length > 0
                ? `총 ${filteredResponsiveGuides.length}개의 가이드`
                : '검색 결과가 없습니다'
            }
            announceStatus
          />

          <ExplorerControls
            searchInputId="responsive-guide-search"
            resultsId="responsive-guide-results"
            searchLabel="반응형 가이드 검색"
            searchPlaceholder="가이드 제목, 핵심 내용, 대응 화면 검색"
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            filterLabel="카테고리"
            filterOptions={responsiveGuideCategoryOptions}
            selectedFilter={selectedCategory}
            onSelectedFilterChange={handleCategoryChange}
          />

          {filteredResponsiveGuides.length > 0 ? (
            <ul
              id="responsive-guide-results"
              className="responsive-guide-list__grid"
            >
              {filteredResponsiveGuides.map((guide, index) => (
                <li
                  key={guide.id}
                  className="responsive-guide-list__item"
                  data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                  data-aos-delay={
                    hasExplorerInteracted
                      ? undefined
                      : Math.min(index * 70, 280)
                  }
                >
                  <ResponsiveGuideCard guide={guide} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              id="responsive-guide-results"
              title="조건에 맞는 반응형 가이드를 찾지 못했습니다."
              description="검색어나 카테고리를 변경해 다시 확인해보세요."
              actionLabel="필터 초기화"
              onAction={resetFilters}
            />
          )}
        </div>
      </div>
    </section>
  )
}
