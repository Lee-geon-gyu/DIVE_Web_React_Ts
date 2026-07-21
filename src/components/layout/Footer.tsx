import { Link, NavLink } from 'react-router-dom'
import { primaryNavigationItems } from '../../data/navigation'
import './footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="content-container site-footer__inner">
          <div className="site-footer__summary" data-aos="fade-up">
            <Link className="site-footer__logo" to="/" aria-label="DIVE 홈으로 이동">
              DIVE
            </Link>
            <p className="site-footer__description">
              UI/UX 디자인과 웹 퍼블리싱 입문자를 위한 정보 큐레이션 플랫폼
            </p>
          </div>

          <nav
            className="site-footer__navigation"
            aria-label="푸터 메뉴"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <ul className="site-footer__navigation-list">
              {primaryNavigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink className="site-footer__navigation-link" to={item.to}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__legal" data-aos="fade-up" data-aos-delay="160">
            <p>
              본 사이트는 학습과 정보 제공을 목적으로 외부 서비스를 소개하며,
              별도로 표시되지 않는 한 해당 서비스와 공식적인 제휴 관계가 없습니다.
            </p>
            <p>© {new Date().getFullYear()} DIVE.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
