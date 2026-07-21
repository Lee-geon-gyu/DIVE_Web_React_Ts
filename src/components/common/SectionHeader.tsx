import type { ReactNode } from 'react'
import './section-header.css'

interface SectionHeaderProps {
  titleId: string
  eyebrow?: string
  title: string
  description: string
  status?: ReactNode
  announceStatus?: boolean
  enableAos?: boolean
}

export function SectionHeader({
  titleId,
  eyebrow,
  title,
  description,
  status,
  announceStatus = false,
  enableAos = true,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header__heading">
        {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
        <h2
          id={titleId}
          className="section-header__title"
          data-aos={enableAos ? 'fade-up' : undefined}
        >
          {title}
        </h2>
        <p
          className="section-header__description"
          data-aos={enableAos ? 'fade-up' : undefined}
          data-aos-delay={enableAos ? '80' : undefined}
        >
          {description}
        </p>
      </div>
      {status !== undefined && (
        <p
          className="section-header__status"
          aria-live={announceStatus ? 'polite' : undefined}
          aria-atomic={announceStatus ? 'true' : undefined}
          data-aos={enableAos ? 'fade-up' : undefined}
          data-aos-delay={enableAos ? '160' : undefined}
        >
          {status}
        </p>
      )}
    </div>
  )
}
