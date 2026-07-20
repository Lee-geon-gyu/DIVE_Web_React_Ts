import { useId, useMemo, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
} from '../../components/common/explorer/ExplorerControls'
import { ReferenceCard } from '../../components/reference/ReferenceCard'
import { references } from '../../data/references'
import './reference-list.css'

const ALL_CATEGORIES = '전체'
const referenceCategories = [
  ALL_CATEGORIES,
  ...new Set(references.map((reference) => reference.category)),
]
const referenceCategoryOptions: ExplorerFilterOption[] =
  referenceCategories.map((category) => ({
    value: category,
    label: category,
  }))

export function ReferenceList() {
  const titleId = useId()
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const filteredReferences = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    return references.filter((reference) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        reference.category === selectedCategory

      if (!matchesCategory) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchableContent = [
        reference.title,
        reference.description,
        reference.category,
        reference.sourceType,
        ...reference.tags,
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
    <section className="reference-list" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <SectionHeader
            titleId={titleId}
            title="목적별 레퍼런스"
            description="화면을 설계하고 구현할 때 검토할 수 있는 주제를 살펴보세요."
            status={
              filteredReferences.length > 0
                ? `총 ${filteredReferences.length}개의 레퍼런스`
                : '검색 결과가 없습니다'
            }
            announceStatus
          />

          <ExplorerControls
            searchInputId="reference-search"
            resultsId="reference-results"
            searchLabel="레퍼런스 검색"
            searchPlaceholder="제목, 태그, 카테고리 검색"
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            filterLabel="카테고리 필터"
            filterOptions={referenceCategoryOptions}
            selectedFilter={selectedCategory}
            onSelectedFilterChange={handleCategoryChange}
          />

          {filteredReferences.length > 0 ? (
            <ul id="reference-results" className="reference-list__grid">
              {filteredReferences.map((reference, index) => (
                <li
                  key={reference.id}
                  className="reference-list__item"
                  data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                  data-aos-delay={
                    hasExplorerInteracted
                      ? undefined
                      : Math.min(index * 70, 280)
                  }
                >
                  <ReferenceCard reference={reference} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              id="reference-results"
              title="조건에 맞는 레퍼런스를 찾지 못했습니다."
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
