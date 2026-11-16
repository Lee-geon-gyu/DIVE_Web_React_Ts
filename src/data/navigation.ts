import { homeCategories } from './homeCategories'

export const primaryNavigationItems = homeCategories.map(({ label, to }) => ({ label, to }))
