import { CatalogCard } from '../common/CatalogCard'
import type { ReferenceItem } from '../../data/references'
import './reference-card.css'

interface ReferenceCardProps {
  reference: ReferenceItem
}

export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <CatalogCard
      className="reference-card"
      item={{ ...reference, environment: reference.access, considerations: reference.tips }}
      considerationsLabel="탐색 팁"
      footerNote={{ label: '추천 작업 단계', value: reference.recommendedStage }}
    />
  )
}
