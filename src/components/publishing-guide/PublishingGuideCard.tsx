import { Link } from 'react-router-dom'
import type { PublishingGuideItem } from '../../data/publishingGuides'
import './publishing-guide-card.css'

interface PublishingGuideCardProps {
  guide: PublishingGuideItem
}

export function PublishingGuideCard({ guide }: PublishingGuideCardProps) {
  return (
    <Link className="publishing-guide-card" to={guide.to}>
      <div className="publishing-guide-card__meta">
        <span className="publishing-guide-card__category">
          {guide.category}
        </span>
        <span className="publishing-guide-card__work-stage">
          {guide.workStage}
        </span>
      </div>

      <h3 className="publishing-guide-card__title">{guide.title}</h3>
      <p className="publishing-guide-card__description">
        {guide.description}
      </p>

      <div className="publishing-guide-card__checks">
        <p className="publishing-guide-card__label">핵심 점검 항목</p>
        <ul className="publishing-guide-card__check-list">
          {guide.keyChecks.map((keyCheck) => (
            <li key={keyCheck}>{keyCheck}</li>
          ))}
        </ul>
      </div>

      <div className="publishing-guide-card__footer">
        <dl className="publishing-guide-card__details">
          <div className="publishing-guide-card__detail">
            <dt>난이도</dt>
            <dd>{guide.difficulty}</dd>
          </div>
          <div className="publishing-guide-card__detail">
            <dt>자료 유형</dt>
            <dd>{guide.sourceType}</dd>
          </div>
        </dl>
        <span className="publishing-guide-card__link-label">살펴보기</span>
      </div>
    </Link>
  )
}
