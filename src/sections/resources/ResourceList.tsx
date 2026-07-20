import { useId, useMemo, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
} from '../../components/common/explorer/ExplorerControls'
import { ResourceDetailCard } from '../../components/resources/ResourceDetailCard'
import { resources } from '../../data/resources'
import './resource-list.css'

const ALL_CATEGORIES = '전체'
const resourceCategories = [
  ALL_CATEGORIES,
  ...new Set(resources.map((resource) => resource.category)),
]
const resourceCategoryOptions: ExplorerFilterOption[] =
  resourceCategories.map((category) => ({
    value: category,
    label: category,
  }))

export function ResourceList() {
  const titleId = useId()
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const filteredResources = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    return resources.filter((resource) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        resource.category === selectedCategory

      if (!matchesCategory) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchableContent = [
        resource.title,
        resource.category,
        resource.description,
        ...resource.useCases,
        resource.format,
        resource.recommendedFor,
        resource.sourceType,
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
    <section className="resource-list" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <SectionHeader
            titleId={titleId}
            title="실무 리소스"
            description="작업 단계와 활용 목적을 기준으로 리소스를 확인하고, 필요한 자료를 비교해 선택할 수 있도록 핵심 정보를 제공합니다."
            status={
              filteredResources.length > 0
                ? `총 ${filteredResources.length}개의 리소스`
                : '검색 결과가 없습니다'
            }
            announceStatus
          />

          <ExplorerControls
            searchInputId="resource-search"
            resultsId="resource-results"
            searchLabel="리소스 검색"
            searchPlaceholder="리소스 이름, 활용 목적, 제공 형태 검색"
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            filterLabel="카테고리"
            filterOptions={resourceCategoryOptions}
            selectedFilter={selectedCategory}
            onSelectedFilterChange={handleCategoryChange}
          />

          {filteredResources.length > 0 ? (
            <ul id="resource-results" className="resource-list__grid">
              {filteredResources.map((resource, index) => (
                <li
                  key={resource.id}
                  className="resource-list__item"
                  data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                  data-aos-delay={
                    hasExplorerInteracted
                      ? undefined
                      : Math.min(index * 70, 280)
                  }
                >
                  <ResourceDetailCard resource={resource} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              id="resource-results"
              title="조건에 맞는 리소스를 찾지 못했습니다."
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
