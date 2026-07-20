import { useId, useMemo, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
} from '../../components/common/explorer/ExplorerControls'
import { LibraryCard } from '../../components/libraries/LibraryCard'
import { libraries } from '../../data/libraries'
import './library-list.css'

const ALL_CATEGORIES = '전체'
const libraryCategoryOptions: ExplorerFilterOption[] = [
  ALL_CATEGORIES,
  ...new Set(libraries.map((library) => library.category)),
].map((category) => ({ value: category, label: category }))

export function LibraryList() {
  const titleId = useId()
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const filteredLibraries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    return libraries.filter((library) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        library.category === selectedCategory

      if (!matchesCategory) return false
      if (!normalizedQuery) return true

      return [
        library.name,
        library.category,
        library.purpose,
        library.description,
        ...library.useCases,
        library.environment,
        ...library.considerations,
        library.sourceType,
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedQuery)
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
    <section className="library-list" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <SectionHeader
            titleId={titleId}
            title="웹 제작 라이브러리"
            description="라이브러리별 주요 역할과 적용 상황을 확인하고, 프로젝트에 도입하기 전에 살펴봐야 할 기준을 함께 확인하세요."
            status={
              filteredLibraries.length > 0
                ? `총 ${filteredLibraries.length}개의 라이브러리`
                : '검색 결과가 없습니다'
            }
            announceStatus
          />

          <ExplorerControls
            searchInputId="library-search"
            resultsId="library-results"
            searchLabel="라이브러리 검색"
            searchPlaceholder="라이브러리 이름, 활용 목적, 적용 환경 검색"
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            filterLabel="카테고리"
            filterOptions={libraryCategoryOptions}
            selectedFilter={selectedCategory}
            onSelectedFilterChange={handleCategoryChange}
          />

          {filteredLibraries.length > 0 ? (
            <ul id="library-results" className="library-list__grid">
              {filteredLibraries.map((library, index) => (
                <li
                  key={library.id}
                  className="library-list__item"
                  data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                  data-aos-delay={
                    hasExplorerInteracted
                      ? undefined
                      : Math.min(index * 70, 280)
                  }
                >
                  <LibraryCard library={library} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              id="library-results"
              title="조건에 맞는 라이브러리를 찾지 못했습니다."
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
