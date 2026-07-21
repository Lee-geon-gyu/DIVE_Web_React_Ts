import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import resourcesBackground from '../assets/images/sub/immersive/Immersive_bg_third.png'
import { ResourceList } from '../sections/resources/ResourceList'

export function DesignResourcesPage() {
  return (
    <SubPageLayout backgroundImage={resourcesBackground}>
      <PageHero
        eyebrow="RESOURCES"
        title="디자인과 웹 제작에 필요한 리소스를 목적별로 탐색하세요."
        description="UI 설계, 시각 디자인, 프로토타이핑, 퍼블리싱에 활용할 수 있는 리소스를 정리합니다. 단순한 링크 모음이 아니라 사용 목적과 적용 상황을 파악할 수 있도록 돕습니다."
      />
      <ResourceList />
    </SubPageLayout>
  )
}
