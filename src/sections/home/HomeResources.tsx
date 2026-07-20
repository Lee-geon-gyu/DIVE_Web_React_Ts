import { useId } from 'react'
import { Link } from 'react-router-dom'
import { ResourceCard } from '../../components/common/ResourceCard'
import { homeResources } from '../../data/homeResources'
import './home-resources.css'

export function HomeResources() {
  const titleId = useId()

  return (
    <section className="home-resources" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <div className="home-resources__header" data-aos="fade-up">
            <div className="home-resources__heading">
              <h2 id={titleId} className="home-resources__title">
                목적에 맞는 실무 자료 탐색하기
              </h2>
              <p className="home-resources__description">
                디자인 리소스부터 반응형 설계와 퍼블리싱 지침까지, 작업에
                필요한 자료를 목적별로 살펴보세요.
              </p>
            </div>
            <Link className="home-resources__all-link" to="/resources">
              전체 리소스 보기
            </Link>
          </div>

          <ul className="home-resources__list">
            {homeResources.map((resource, index) => (
              <li
                key={resource.id}
                className="home-resources__item"
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 70, 280)}
              >
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
