import { useId } from 'react'
import { Link } from 'react-router-dom'
import { featuredGuides } from '../../data/featuredGuides'
import './home-featured-guides.css'

export function HomeFeaturedGuides() {
  const titleId = useId()

  return (
    <section className="home-featured-guides" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <div className="home-featured-guides__heading" data-aos="fade-up">
            <h2 id={titleId} className="home-featured-guides__title">
              추천 가이드
            </h2>
            <p className="home-featured-guides__description">
              디자인과 웹 제작 과정에서 바로 참고할 수 있는 실무 주제를
              살펴보세요.
            </p>
          </div>

          <ul className="home-featured-guides__list">
            {featuredGuides.map((guide, index) => (
              <li
                key={guide.id}
                className="home-featured-guides__item"
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 70, 280)}
              >
                <Link className="home-featured-guides__link" to={guide.to}>
                  <span className="home-featured-guides__badge">
                    {guide.category}
                  </span>
                  <h3 className="home-featured-guides__card-title">
                    {guide.title}
                  </h3>
                  <p className="home-featured-guides__card-description">
                    {guide.description}
                  </p>
                  <div className="home-featured-guides__meta">
                    <span>{guide.readingTime}</span>
                    <span className="home-featured-guides__link-label">
                      가이드 보기
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
