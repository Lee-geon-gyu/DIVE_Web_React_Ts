import { useId } from 'react'
import { SectionHeader } from '../../components/common/SectionHeader'
import { PublishingGuideCard } from '../../components/publishing-guide/PublishingGuideCard'
import { publishingGuides } from '../../data/publishingGuides'
import './publishing-guide-list.css'

interface PublishingGuideListProps {
  theme?: 'default' | 'home-light'
}

export function PublishingGuideList({
  theme = 'default',
}: PublishingGuideListProps) {
  const titleId = useId()

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
              eyebrow="Publishing standards"
              title="Publishing Guide"
              description="작업 단계별 핵심 원칙과 점검 항목을 확인하고, 구현 중 발생하기 쉬운 문제를 예방하며 유지보수 가능한 구조를 설계하는 데 참고하세요."
              status={`총 ${publishingGuides.length}개의 가이드`}
            />
          </div>

          <div className="explorer-layout__results">
            <ul className="publishing-guide-list__grid">
              {publishingGuides.map((guide, index) => (
                <li
                  key={guide.id}
                  className="publishing-guide-list__item"
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index * 70, 280)}
                >
                  <PublishingGuideCard guide={guide} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
