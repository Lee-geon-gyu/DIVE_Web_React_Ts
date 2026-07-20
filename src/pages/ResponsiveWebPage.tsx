import { PageHero } from '../components/common/PageHero'
import { ResponsiveGuideList } from '../sections/responsive-web/ResponsiveGuideList'

export function ResponsiveWebPage() {
  return (
    <>
      <PageHero
        eyebrow="RESPONSIVE WEB"
        title="다양한 화면에서도 흐름이 유지되는 반응형 웹을 설계하세요."
        description="화면 크기별 배치 변화와 콘텐츠 우선순위를 설계하는 기준을 정리합니다. 단순한 미디어쿼리 예제가 아니라 구조, 가독성, 탐색 흐름을 함께 고려할 수 있도록 돕습니다."
      />
      <ResponsiveGuideList />
    </>
  )
}
