import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { AiToolList } from '../sections/ai/AiToolList'

export function AiToolsPage() {
  return (
    <SubPageLayout>
      <PageHero eyebrow="AI TOOLS" />
      <AiToolList />
    </SubPageLayout>
  )
}
