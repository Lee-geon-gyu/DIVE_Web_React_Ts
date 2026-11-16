import { Link } from 'react-router-dom'
import { homeCategories } from '../../data/homeCategories'
import './home-workflow.css'

const preparationRoutes = new Set(['/reference', '/ai', '/resources'])
const categoryDescriptions: Partial<Record<string, readonly [string, string]>> = {
  '/reference': ['디자인 사례와 UI 패턴', '화면 구조와 메뉴 구성'],
  '/ai': ['기획·시안에 맞는 AI 도구', '아이디어 정리와 문서 초안'],
  '/resources': ['폰트·이미지·아이콘 자료', '라이선스와 사용 조건'],
  '/responsive-web': ['화면 크기별 레이아웃', '모바일 그리드와 여백'],
  '/libraries': ['스크롤·슬라이더 라이브러리', '기능과 적용 환경 비교'],
  '/publishing-guide': ['마크업·접근성·성능 기준', '키보드 탐색과 로딩 점검'],
}
const workflowStages = [
  {
    title: '설계·준비',
    categories: homeCategories.filter(({ to }) => preparationRoutes.has(to)),
  },
  {
    title: '구현·점검',
    categories: homeCategories.filter(({ to }) => !preparationRoutes.has(to)),
  },
]

export function HomeWorkflow() {
  return (
    <div className="home-workflow">
      <h2 className="home-workflow__title home-workflow__copy" id="dive-workflow-title">작업 순서로 탐색하기</h2>
      <p className="home-workflow__intro home-workflow__copy">설계부터 배포까지 필요한 자료를 찾아보세요.</p>
      <div className="home-workflow__timeline">
        <ol role="list">
          {workflowStages.map((stage) => (
            <li className="home-workflow__stage" key={stage.title}>
              <div className="home-workflow__stage-content">
                <h3 className="home-workflow__stage-title home-workflow__copy">{stage.title}</h3>
                <ul className="home-workflow__steps" role="list">
                  {stage.categories.map(({ title, to, description }) => (
                    <li className="home-workflow__step" key={to}>
                      <Link className="home-workflow__step-link" to={to} viewTransition>
                        <span className="home-workflow__step-title home-workflow__copy">{title}</span>
                        <span className="home-workflow__step-descriptions">
                          {(categoryDescriptions[to] ?? [description]).map((line) => (
                            <span className="home-workflow__copy" key={line}>{line}</span>
                          ))}
                          <span className="home-workflow__step-arrow" aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

