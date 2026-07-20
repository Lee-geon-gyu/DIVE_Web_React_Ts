import type { ReactNode } from 'react'
import './section-header.css'

interface SectionHeaderProps {
  titleId: string
  title: string
  description: string
  status?: ReactNode
  announceStatus?: boolean
}

export function SectionHeader({
  titleId,
  title,
  description,
  status,
  announceStatus = false,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header__heading">
        <h2 id={titleId} className="section-header__title" data-aos="fade-up">
          {title}
        </h2>
        <p className="section-header__description" data-aos="fade-up" data-aos-delay="80">
          {description}
        </p>
      </div>
      {status !== undefined && (
        <p
          className="section-header__status"
          aria-live={announceStatus ? 'polite' : undefined}
          aria-atomic={announceStatus ? 'true' : undefined}
          data-aos="fade-up"
          data-aos-delay="160"
        >
          {status}
        </p>
      )}
    </div>
  )
}
