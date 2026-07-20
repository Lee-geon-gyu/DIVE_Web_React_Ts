import { PageHero } from '../components/common/PageHero'
import { ReferenceList } from '../sections/reference/ReferenceList'

export function ReferencePage() {
  return (
    <>
      <PageHero
        eyebrow="REFERENCE"
        title="좋은 디지털 경험을 설계하기 위한 레퍼런스"
        description="UI/UX 디자인과 웹 제작 사례를 목적별로 정리해, 화면의 구성과 흐름, 인터랙션 관점에서 실무에 참고할 기준을 제공합니다."
        narrowDescription
      />
      <ReferenceList />
    </>
  )
}
