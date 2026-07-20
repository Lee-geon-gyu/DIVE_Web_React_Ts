import { createBrowserRouter } from 'react-router-dom'
import { AiToolsPage } from '../pages/AiToolsPage'
import { DesignResourcesPage } from '../pages/DesignResourcesPage'
import { PublishingGuidePage } from '../pages/PublishingGuidePage'
import { ReferencePage } from '../pages/ReferencePage'
import { ResponsiveWebPage } from '../pages/ResponsiveWebPage'
import { WebLibrariesPage } from '../pages/WebLibrariesPage'
import { App } from './App'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { HomePage } = await import('../pages/HomePage')

            return { Component: HomePage }
          },
        },
        {
          path: 'reference',
          element: <ReferencePage />,
        },
        {
          path: 'ai',
          element: <AiToolsPage />,
        },
        {
          path: 'resources',
          element: <DesignResourcesPage />,
        },
        {
          path: 'responsive-web',
          element: <ResponsiveWebPage />,
        },
        {
          path: 'libraries',
          element: <WebLibrariesPage />,
        },
        {
          path: 'publishing-guide',
          element: <PublishingGuidePage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
