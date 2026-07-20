import { Link } from 'react-router-dom'
import type { ReferenceItem } from '../../data/references'
import './reference-card.css'

interface ReferenceCardProps {
  reference: ReferenceItem
}

export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <Link className="reference-card" to={reference.to}>
      <span className="reference-card__category">{reference.category}</span>
      <h3 className="reference-card__title">{reference.title}</h3>
      <p className="reference-card__description">{reference.description}</p>
      <ul className="reference-card__tags" aria-label="관련 태그">
        {reference.tags.map((tag) => (
          <li key={tag} className="reference-card__tag">
            {tag}
          </li>
        ))}
      </ul>
      <div className="reference-card__footer">
        <span className="reference-card__type">{reference.sourceType}</span>
        <span className="reference-card__link-label">살펴보기</span>
      </div>
    </Link>
  )
}
