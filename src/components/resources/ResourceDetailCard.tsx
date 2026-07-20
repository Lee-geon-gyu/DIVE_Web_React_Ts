import { Link } from 'react-router-dom'
import type { ResourceItem } from '../../data/resources'
import './resource-detail-card.css'

interface ResourceDetailCardProps {
  resource: ResourceItem
}

export function ResourceDetailCard({ resource }: ResourceDetailCardProps) {
  return (
    <Link className="resource-detail-card" to={resource.to}>
      <div className="resource-detail-card__meta">
        <span className="resource-detail-card__category">
          {resource.category}
        </span>
        <span className="resource-detail-card__format">{resource.format}</span>
      </div>

      <h3 className="resource-detail-card__title">{resource.title}</h3>
      <p className="resource-detail-card__description">
        {resource.description}
      </p>

      <div className="resource-detail-card__use-cases">
        <p className="resource-detail-card__label">활용 예시</p>
        <ul className="resource-detail-card__use-case-list">
          {resource.useCases.map((useCase) => (
            <li key={useCase} className="resource-detail-card__use-case">
              {useCase}
            </li>
          ))}
        </ul>
      </div>

      <div className="resource-detail-card__footer">
        <dl className="resource-detail-card__details">
          <div className="resource-detail-card__detail">
            <dt>추천 대상</dt>
            <dd>{resource.recommendedFor}</dd>
          </div>
          <div className="resource-detail-card__detail">
            <dt>자료 유형</dt>
            <dd>{resource.sourceType}</dd>
          </div>
        </dl>
        <span className="resource-detail-card__link-label">살펴보기</span>
      </div>
    </Link>
  )
}
