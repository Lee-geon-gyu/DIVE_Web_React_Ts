import './empty-state.css'

interface EmptyStateProps {
  id?: string
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

export function EmptyState({
  id,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div id={id} className="empty-state">
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      <button className="empty-state__action" type="button" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  )
}
