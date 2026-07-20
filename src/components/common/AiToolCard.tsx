import { Link } from 'react-router-dom'
import './ai-tool-card.css'

export interface AiToolCardData {
  id: string
  name: string
  category: string
  purpose: string
  summary: string
  audience: string
  to: string
}

interface AiToolCardProps {
  tool: AiToolCardData
}

export function AiToolCard({ tool }: AiToolCardProps) {
  return (
    <Link className="ai-tool-card" to={tool.to}>
      <span className="ai-tool-card__category">{tool.category}</span>
      <h3 className="ai-tool-card__name">{tool.name}</h3>
      <div className="ai-tool-card__content">
        <p className="ai-tool-card__purpose">{tool.purpose}</p>
        <p className="ai-tool-card__summary">{tool.summary}</p>
      </div>
      <div className="ai-tool-card__footer">
        <span className="ai-tool-card__audience">{tool.audience}</span>
        <span className="ai-tool-card__link-label">자세히 보기</span>
      </div>
    </Link>
  )
}
