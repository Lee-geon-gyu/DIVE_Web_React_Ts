import { ContentCard } from './ContentCard'
import '../libraries/library-card.css'

interface CatalogCardProps {
  item: {
    id: string
    name: string
    category: string
    purpose: string
    description: string
    useCases: readonly string[]
    environment: string
    considerations: readonly string[]
    sourceType?: string
  }
  to?: string
  className?: string
  considerationsLabel?: string
  footerNote?: { label: string; value: string }
}

export function CatalogCard({ item, to, className, considerationsLabel = '도입 전 확인사항', footerNote }: CatalogCardProps) {
  const classes = className ? `library-card ${className}` : 'library-card'

  return (
    <ContentCard className={classes} to={to}>
      <div className="library-card__visual" data-library={item.id}>
        <h3 className="library-card__name">{item.name}</h3>
      </div>
      <div className="library-card__meta">
        <span className="d-badge library-card__category">{item.category}</span>
        <span className="library-card__environment">{item.environment}</span>
      </div>

      <p className="library-card__purpose">{item.purpose}</p>
      <p className="library-card__description">{item.description}</p>

      <div className="library-card__list-group">
        <div className="library-card__list-section">
          <p className="library-card__label">활용 예시</p>
          <ul className="library-card__use-cases">
            {item.useCases.map((useCase) => (
              <li key={useCase} className="library-card__use-case">{useCase}</li>
            ))}
          </ul>
        </div>

        <div className="library-card__list-section library-card__list-section--considerations">
          <p className="library-card__label">{considerationsLabel}</p>
          <ul className="library-card__considerations">
            {item.considerations.map((consideration) => (
              <li key={consideration}>{consideration}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="library-card__footer">
        {footerNote ? (
          <p className="catalog-card__note">
            <span>{footerNote.label}</span>
            <strong>{footerNote.value}</strong>
          </p>
        ) : (
          <>
            <span className="library-card__source-type">{item.sourceType}</span>
            <span className="library-card__link-label">살펴보기</span>
          </>
        )}
      </div>
    </ContentCard>
  )
}
