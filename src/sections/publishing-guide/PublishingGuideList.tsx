import { useId, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { SectionHeader } from '../../components/common/SectionHeader'
import { ExplorerControls } from '../../components/common/explorer/ExplorerControls'
import { PublishingGuideCard } from '../../components/publishing-guide/PublishingGuideCard'
import { publishingGuides } from '../../data/publishingGuides'
import './publishing-guide-list.css'

const ALL_CATEGORIES = '전체'
const guideCategories = [
  ALL_CATEGORIES,
  ...new Set(publishingGuides.map((guide) => guide.category)),
].map((category) => ({ value: category, label: category }))

interface PublishingGuideListProps {
  theme?: 'default' | 'home-light'
}

export function PublishingGuideList({
  theme = 'default',
}: PublishingGuideListProps) {
  const titleId = useId()
  const resultsId = `${titleId}-results`
  const [hasExplorerInteracted, setHasExplorerInteracted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const query = searchQuery.trim().toLocaleLowerCase()
  const visibleGuides = publishingGuides.filter((guide) => {
    if (selectedCategory !== ALL_CATEGORIES && guide.category !== selectedCategory) return false
    if (!query) return true

    return [
      guide.title, guide.category, guide.description, ...guide.keyChecks,
      guide.workStage, guide.difficulty, guide.sourceType,
    ].join(' ').toLocaleLowerCase().includes(query)
  })

  function resetFilters() {
    setSearchQuery('')
    setSelectedCategory(ALL_CATEGORIES)
  }

  return (
    <section
      className={`publishing-guide-list${
        theme === 'home-light'
          ? ' publishing-guide-list--home-light'
          : ''
      }`}
      aria-labelledby={titleId}
    >
      <div className="page-container">
        <div className="content-container explorer-layout">
          <div className="explorer-layout__panel" data-aos="explorer-panel">
            <SectionHeader
              titleId={titleId}
              eyebrow="웹 제작 기준"
              title="단계별 퍼블리싱 가이드"
              description="작업 단계별 핵심 원칙과 점검 항목을 확인하고 구현 중 발생하기 쉬운 문제를 예방하며 유지보수 가능한 구조를 설계하는 데 참고하세요."
              status={visibleGuides.length > 0 ? `총 ${visibleGuides.length}개의 가이드` : '검색 결과가 없습니다'}
              announceStatus
            />
            <ExplorerControls
              searchInputId={`${titleId}-search`}
              resultsId={resultsId}
              searchLabel="퍼블리싱 가이드 검색"
              searchPlaceholder="가이드 제목, 작업 단계, 점검 항목 검색"
              searchQuery={searchQuery}
              onSearchQueryChange={(value) => {
                setHasExplorerInteracted(true)
                setSearchQuery(value)
              }}
              filterLabel="카테고리"
              filterOptions={guideCategories}
              selectedFilter={selectedCategory}
              onSelectedFilterChange={(value) => {
                setHasExplorerInteracted(true)
                setSelectedCategory(value)
              }}
            />
          </div>

          <div className="explorer-layout__results">
            {visibleGuides.length > 0 ? (
              <ul id={resultsId} className="publishing-guide-list__grid">
                {visibleGuides.map((guide, index) => (
                  <li
                    key={guide.id}
                    className="publishing-guide-list__item"
                    data-aos={hasExplorerInteracted ? undefined : 'fade-up'}
                    data-aos-delay={hasExplorerInteracted ? undefined : Math.min(index * 70, 280)}
                  >
                    <PublishingGuideCard guide={guide} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                id={resultsId}
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
