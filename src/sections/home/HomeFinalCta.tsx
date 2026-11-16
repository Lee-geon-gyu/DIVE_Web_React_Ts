import { useId } from "react";
import "./home-final-cta.css";

export function HomeFinalCta() {
  const titleId = useId();

  return (
    <section className="home-final-cta" aria-labelledby={titleId}>
      <div className="page-container">
        <h2 id={titleId} className="content-container home-final-cta__title">
          필요한 기준과 도구를 찾고
          <br />더 나은 디지털 경험을 설계하세요
        </h2>
      </div>
    </section>
  );
}
