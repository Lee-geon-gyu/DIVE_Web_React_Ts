import { useId, useMemo, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
  type ExplorerSortOption,
} from '../../components/common/explorer/ExplorerControls'
import { PublishingGuideCard } from '../../components/publishing-guide/PublishingGuideCard'
import { publishingGuides } from '../../data/publishingGuides'
import './publishing-guide-list.css'

const ALL_CATEGORIES = '전체'
const publishingGuideCategoryOptions: ExplorerFilterOption[] = [
  ALL_CATEGORIES,
  ...new Set(publishingGuides.map((guide) => guide.category)),
].map((category) => ({ value: category, label: category }))
const DEFAULT_SORT = 'default'
const NAME_SORT = 'name'
const publishingGuideSortOptions: ExplorerSortOption[] = [
  { value: DEFAULT_SORT, label: '학습 흐름순' },
  { value: NAME_SORT, label: '이름순' },
]

export function PublishingGuideList() {
  const titleId = useId()
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT)

  const filteredPublishingGuides = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    const filteredGuides = publishingGuides.filter((guide) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        guide.category === selectedCategory

      if (!matchesCategory) return false
      if (!normalizedQuery) return true

      return [
        guide.title,
        guide.category,
        guide.description,
        ...guide.keyChecks,
        guide.workStage,
        guide.difficulty,
        guide.sourceType,
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedQuery)
    })

    if (selectedSort === NAME_SORT) {
      return [...filteredGuides].sort((a, b) =>
        a.title.localeCompare(b.title, 'ko'),
      )
    }

    return filteredGuides
  }, [searchQuery, selectedCategory, selectedSort])

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
    <section className="publishing-guide-list" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container explorer-layout">
          <div className="explorer-layout__panel" data-aos="explorer-panel">
            <SectionHeader
              titleId={titleId}
              eyebrow="Publishing standards"
              title="Publishing Guide"
              description="작업 단계별 핵심 원칙과 점검 항목을 확인하고, 구현 중 발생하기 쉬운 문제를 예방하며 유지보수 가능한 구조를 설계하는 데 참고하세요."
              status={
                filteredPublishingGuides.length > 0
                  ? `총 ${filteredPublishingGuides.length}개의 가이드`
                  : '검색 결과가 없습니다'
              }
              announceStatus
            />

            <ExplorerControls
              searchInputId="publishing-guide-search"
              resultsId="publishing-guide-results"
              searchLabel="퍼블리싱 가이드 검색"
              searchPlaceholder="가이드 제목, 작업 단계, 점검 항목 검색"
              searchQuery={searchQuery}
              onSearchQueryChange={handleSearchQueryChange}
              filterLabel="카테고리"
              filterOptions={publishingGuideCategoryOptions}
              selectedFilter={selectedCategory}
              onSelectedFilterChange={handleCategoryChange}
              sortLabel="정렬"
              sortOptions={publishingGuideSortOptions}
              selectedSort={selectedSort}
              onSelectedSortChange={handleSortChange}
            />
          </div>

          <div className="explorer-layout__results">
          {filteredPublishingGuides.length > 0 ? (
            <ul
              id="publishing-guide-results"
              className="publishing-guide-list__grid"
            >
              {filteredPublishingGuides.map((guide, index) => (
                <li
                  key={guide.id}
                  className="publishing-guide-list__item"
                  data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                  data-aos-delay={
                    hasExplorerInteracted
                      ? undefined
                      : Math.min(index * 70, 280)
                  }
                >
                  <PublishingGuideCard guide={guide} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              id="publishing-guide-results"
              title="조건에 맞는 퍼블리싱 가이드를 찾지 못했습니다."
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
