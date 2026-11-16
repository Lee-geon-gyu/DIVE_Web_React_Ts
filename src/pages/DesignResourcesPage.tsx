import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { ResourceList } from '../sections/resources/ResourceList'

export function DesignResourcesPage() {
  return (
    <SubPageLayout>
      <PageHero eyebrow="RESOURCES" />
      <ResourceList />
    </SubPageLayout>
  )
}
