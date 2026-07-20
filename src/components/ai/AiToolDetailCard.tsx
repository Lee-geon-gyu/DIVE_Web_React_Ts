import { Link } from 'react-router-dom'
import type { AiToolItem } from '../../data/aiTools'
import './ai-tool-detail-card.css'

interface AiToolDetailCardProps {
  tool: AiToolItem
}

export function AiToolDetailCard({ tool }: AiToolDetailCardProps) {
  return (
    <Link className="ai-tool-detail-card" to={tool.to}>
      <div className="ai-tool-detail-card__meta">
        <span className="ai-tool-detail-card__category">{tool.category}</span>
        <span className="ai-tool-detail-card__access-type">
          {tool.accessType}
        </span>
      </div>

      <h3 className="ai-tool-detail-card__name">{tool.name}</h3>
      <p className="ai-tool-detail-card__purpose">{tool.purpose}</p>
      <p className="ai-tool-detail-card__summary">{tool.summary}</p>

      <div className="ai-tool-detail-card__use-cases">
        <p className="ai-tool-detail-card__label">활용 예시</p>
        <ul className="ai-tool-detail-card__use-case-list">
          {tool.useCases.map((useCase) => (
            <li key={useCase} className="ai-tool-detail-card__use-case">
              {useCase}
            </li>
          ))}
        </ul>
      </div>

      <div className="ai-tool-detail-card__footer">
        <div className="ai-tool-detail-card__recommended">
          <span className="ai-tool-detail-card__label">추천 대상</span>
          <span>{tool.recommendedFor}</span>
        </div>
        <span className="ai-tool-detail-card__link-label">자세히 보기</span>
      </div>
    </Link>
  )
}
