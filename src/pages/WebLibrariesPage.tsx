import { PageHero } from '../components/common/PageHero'
import { LibraryList } from '../sections/libraries/LibraryList'

export function WebLibrariesPage() {
  return (
    <>
      <PageHero
        eyebrow="LIBRARIES"
        title="구현 목적에 맞는 웹 라이브러리를 비교하고 선택하세요."
        description="인터랙션, 슬라이더, 스크롤, 애니메이션 등 웹 제작에 활용할 수 있는 라이브러리를 목적별로 정리합니다. 기능 수보다 프로젝트 환경, 유지보수, 접근성과 적용 범위를 함께 고려할 수 있도록 돕습니다."
      />
      <LibraryList />
    </>
  )
}
