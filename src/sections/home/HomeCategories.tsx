import { useId } from 'react'
import { Link } from 'react-router-dom'
import { homeCategories } from '../../data/homeCategories'
import './home-categories.css'

export function HomeCategories() {
  const titleId = useId()

  return (
    <section className="home-categories" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <div className="home-categories__heading" data-aos="fade-up">
            <h2 id={titleId} className="home-categories__title">
              실무에 필요한 주제를 탐색해보세요
            </h2>
            <p className="home-categories__description">
              디자인 원칙부터 제작 도구와 퍼블리싱 기준까지, 필요한 내용을
              목적에 따라 찾아볼 수 있습니다.
            </p>
          </div>

          <ul className="home-categories__list">
            {homeCategories.map((category, index) => (
              <li
                key={category.to}
                className="home-categories__item"
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 70, 280)}
              >
                <Link className="home-categories__link" to={category.to}>
                  <h3 className="home-categories__card-title">
                    {category.title}
                  </h3>
                  <p className="home-categories__card-description">
                    {category.description}
                  </p>
                  <span className="home-categories__link-label">
                    살펴보기
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
