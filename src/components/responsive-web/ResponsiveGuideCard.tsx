import { Link } from 'react-router-dom'
import type { ResponsiveGuideItem } from '../../data/responsiveGuides'
import './responsive-guide-card.css'

interface ResponsiveGuideCardProps {
  guide: ResponsiveGuideItem
}

export function ResponsiveGuideCard({ guide }: ResponsiveGuideCardProps) {
  return (
    <Link className="responsive-guide-card" to={guide.to}>
      <div className="responsive-guide-card__meta">
        <span className="responsive-guide-card__category">
          {guide.category}
        </span>
        <span className="responsive-guide-card__viewport">
          {guide.targetViewport}
        </span>
      </div>

      <h3 className="responsive-guide-card__title">{guide.title}</h3>
      <p className="responsive-guide-card__description">
        {guide.description}
      </p>

      <div className="responsive-guide-card__key-points">
        <p className="responsive-guide-card__label">핵심 포인트</p>
        <ul className="responsive-guide-card__key-point-list">
          {guide.keyPoints.map((keyPoint) => (
            <li key={keyPoint} className="responsive-guide-card__key-point">
              {keyPoint}
            </li>
          ))}
        </ul>
      </div>

      <div className="responsive-guide-card__footer">
        <dl className="responsive-guide-card__details">
          <div className="responsive-guide-card__detail">
            <dt>난이도</dt>
            <dd>{guide.difficulty}</dd>
          </div>
          <div className="responsive-guide-card__detail">
            <dt>자료 유형</dt>
            <dd>{guide.sourceType}</dd>
          </div>
        </dl>
        <span className="responsive-guide-card__link-label">살펴보기</span>
      </div>
    </Link>
  )
}
