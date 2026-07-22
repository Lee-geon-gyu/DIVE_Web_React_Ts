import { useId } from 'react'
import { Link } from 'react-router-dom'
import './home-final-cta.css'

export function HomeFinalCta() {
  const titleId = useId()

  return (
    <section className="home-final-cta" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container">
          <div className="home-final-cta__content">
            <p className="home-final-cta__eyebrow">Drive into better digital experiences.</p>
            <h2 id={titleId} className="home-final-cta__title">
              <span className="home-final-cta__title-mask">
                <span className="home-final-cta__title-line">
                  필요한 기준과 도구를 찾고,
                  <br />더 나은 디지털 경험을 설계하세요.
                </span>
              </span>
            </h2>
            <p className="home-final-cta__description">
              DIVE는 UI/UX 디자인과 웹 제작에 필요한 자료를 목적별로 정리해,
              다음 작업에 필요한 정보와 도구를 빠르게 탐색하도록 돕습니다.
            </p>
            <div className="home-final-cta__actions">
              <Link
                className="home-final-cta__link home-final-cta__link--primary"
                to="/reference"
              >
                추천 가이드 보기
              </Link>
              <Link
                className="home-final-cta__link home-final-cta__link--secondary"
                to="/ai"
              >
                AI 도구 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
