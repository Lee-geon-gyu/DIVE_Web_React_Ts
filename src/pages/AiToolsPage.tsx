import { PageHero } from '../components/common/PageHero'
import { AiToolList } from '../sections/ai/AiToolList'

export function AiToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI TOOLS"
        title="실무의 흐름을 더 효율적으로 만드는 AI 도구"
        description="디자인, 기획, 퍼블리싱, 개발 과정에서 활용할 수 있는 AI 도구를 목적별로 정리합니다. 기능의 많고 적음보다 실제 업무에서 어떻게 활용할 수 있는지 파악하도록 돕습니다."
      />
      <AiToolList />
    </>
  )
}
