import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { ReferenceList } from '../sections/reference/ReferenceList'

export function ReferencePage() {
  return (
    <SubPageLayout>
      <PageHero eyebrow="REFERENCE" />
      <ReferenceList />
    </SubPageLayout>
  )
}
