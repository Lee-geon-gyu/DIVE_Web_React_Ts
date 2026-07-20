import { Link } from 'react-router-dom'
import type { LibraryItem } from '../../data/libraries'
import './library-card.css'

interface LibraryCardProps {
  library: LibraryItem
}

export function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Link className="library-card" to={library.to}>
      <div className="library-card__meta">
        <span className="library-card__category">{library.category}</span>
        <span className="library-card__environment">
          {library.environment}
        </span>
      </div>

      <h3 className="library-card__name">{library.name}</h3>
      <p className="library-card__purpose">{library.purpose}</p>
      <p className="library-card__description">{library.description}</p>

      <div className="library-card__list-group">
        <div className="library-card__list-section">
          <p className="library-card__label">활용 예시</p>
          <ul className="library-card__use-cases">
            {library.useCases.map((useCase) => (
              <li key={useCase} className="library-card__use-case">
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        <div className="library-card__list-section library-card__list-section--considerations">
          <p className="library-card__label">도입 전 확인사항</p>
          <ul className="library-card__considerations">
            {library.considerations.map((consideration) => (
              <li key={consideration}>{consideration}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="library-card__footer">
        <span className="library-card__source-type">
          {library.sourceType}
        </span>
        <span className="library-card__link-label">살펴보기</span>
      </div>
    </Link>
  )
}
