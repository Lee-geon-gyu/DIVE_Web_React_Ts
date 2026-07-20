import { PageHero } from '../components/common/PageHero'
import { PublishingGuideList } from '../sections/publishing-guide/PublishingGuideList'

export function PublishingGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="PUBLISHING GUIDE"
        title="구조부터 검수까지, 안정적인 웹 퍼블리싱 흐름을 정리하세요."
        description="HTML 구조 설계부터 CSS 작성, 반응형 대응, 접근성 및 최종 검수까지 퍼블리싱 과정의 기준을 정리합니다. 단순히 화면을 동일하게 구현하는 것을 넘어 다양한 환경에서도 안정적으로 유지되는 결과물을 만드는 데 도움을 줍니다."
      />
      <PublishingGuideList />
    </>
  )
}
