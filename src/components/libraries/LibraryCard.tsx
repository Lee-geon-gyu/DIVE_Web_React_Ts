import type { LibraryItem } from '../../data/libraries'
import { CatalogCard } from '../common/CatalogCard'

interface LibraryCardProps {
  library: LibraryItem
}

export function LibraryCard({ library }: LibraryCardProps) {
  return <CatalogCard item={library} to={library.to} />
}
