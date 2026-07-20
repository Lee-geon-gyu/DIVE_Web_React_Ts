import { useId, useMemo, useState } from 'react'
import { AiToolDetailCard } from '../../components/ai/AiToolDetailCard'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import {
  ExplorerControls,
  type ExplorerFilterOption,
} from '../../components/common/explorer/ExplorerControls'
import { aiTools } from '../../data/aiTools'
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

export function AiToolList() {
  const titleId = useId()
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const filteredAiTools = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

    return aiTools.filter((tool) => {
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
    <section className="ai-tool-list" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <SectionHeader
            titleId={titleId}
            title="목적별 AI 도구"
            description="작업 단계와 필요한 도움을 기준으로 각 도구의 활용 방법을 살펴보세요."
            status={
              filteredAiTools.length > 0
                ? `총 ${filteredAiTools.length}개의 AI 도구`
                : '검색 결과가 없습니다'
            }
            announceStatus
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
          />

          {filteredAiTools.length > 0 ? (
            <ul id="ai-tool-results" className="ai-tool-list__grid">
              {filteredAiTools.map((tool, index) => (
                <li
                  key={tool.id}
                  className="ai-tool-list__item"
                  data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                  data-aos-delay={
                    hasExplorerInteracted
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
    </section>
  )
}
