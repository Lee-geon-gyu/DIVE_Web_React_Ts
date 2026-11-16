import { PageHero } from '../components/common/PageHero'
import { SubPageLayout } from '../components/layout/SubPageLayout'
import { LibraryList } from '../sections/libraries/LibraryList'

export function WebLibrariesPage() {
  return (
    <SubPageLayout>
      <PageHero eyebrow="LIBRARIES" />
      <LibraryList />
    </SubPageLayout>
  )
}
