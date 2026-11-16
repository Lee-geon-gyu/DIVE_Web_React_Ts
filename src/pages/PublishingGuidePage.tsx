import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { PublishingGuideList } from '../sections/publishing-guide/PublishingGuideList'

export function PublishingGuidePage() {
  return (
    <SubPageLayout>
      <PageHero eyebrow="PUBLISHING GUIDE" />
      <PublishingGuideList />
    </SubPageLayout>
  )
}
