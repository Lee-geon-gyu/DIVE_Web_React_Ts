import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { ResponsiveGuideList } from '../sections/responsive-web/ResponsiveGuideList'

export function ResponsiveWebPage() {
  return (
    <SubPageLayout>
      <PageHero eyebrow="RESPONSIVE WEB" />
      <ResponsiveGuideList />
    </SubPageLayout>
  )
}
