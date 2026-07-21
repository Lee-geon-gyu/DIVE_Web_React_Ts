import { useId } from "react";
import { Link } from "react-router-dom";
import "./home-hero.css";

export function HomeHero() {
  const titleId = useId();

  return (
    <section className="home-hero" aria-labelledby={titleId}>
      <div className="page-container">
        <div className="content-container home-hero__inner">
          <p className="home-hero__service-name">Dirve Into Verified Experiences.</p>
          <h1 id={titleId} className="home-hero__title">
            <span className="home-hero__title-mask">
              <span className="home-hero__title-line">
                디자인부터 퍼블리싱까지,
                <br />
                처음 시작하는 사람들을 위한
                <br />소셜 웹 가이드
              </span>
            </span>
          </h1>
          <p className="home-hero__description">
            UI/UX 레퍼런스, AI 도구, 디자인 리소스와 웹 라이브러리를 한곳에서
            탐색해보세요.
          </p>
          <Link className="home-hero__cta" to="/reference">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
