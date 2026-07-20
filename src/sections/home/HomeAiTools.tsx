import { useId } from 'react'
import { Link } from 'react-router-dom'
import { AiToolCard } from '../../components/common/AiToolCard'
import { homeAiTools } from '../../data/homeAiTools'
import './home-ai-tools.css'

export function HomeAiTools() {
  const titleId = useId()

  return (
    <section className="home-ai-tools" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <div className="home-ai-tools__header" data-aos="fade-up">
            <div className="home-ai-tools__heading">
              <h2 id={titleId} className="home-ai-tools__title">
                작업 목적에 맞는 AI 도구 찾기
              </h2>
              <p className="home-ai-tools__description">
                디자인과 웹 제작 과정에서 어떤 작업을 보조할 수 있는지 살펴보고,
                활용 목적에 맞는 도구를 탐색해보세요.
              </p>
            </div>
            <Link className="home-ai-tools__all-link" to="/ai">
              전체 AI 도구 보기
            </Link>
          </div>

          <ul className="home-ai-tools__list">
            {homeAiTools.map((tool, index) => (
              <li
                key={tool.id}
                className="home-ai-tools__item"
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 70, 280)}
              >
                <AiToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
