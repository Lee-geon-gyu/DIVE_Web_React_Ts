import { Link } from 'react-router-dom'
import './resource-card.css'

export interface ResourceCardData {
  id: string
  title: string
  description: string
  category: string
  resourceType: string
  to: string
}

interface ResourceCardProps {
  resource: ResourceCardData
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link className="resource-card" to={resource.to}>
      <span className="resource-card__category">{resource.category}</span>
      <h3 className="resource-card__title">{resource.title}</h3>
      <p className="resource-card__description">{resource.description}</p>
      <div className="resource-card__footer">
        <span className="resource-card__type">{resource.resourceType}</span>
        <span className="resource-card__link-label">살펴보기</span>
      </div>
    </Link>
  )
}
