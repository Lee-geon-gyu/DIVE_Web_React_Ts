import { Header } from '../navigation/Header'
import { PageTransition } from '../transition/PageTransition'
import { Footer } from './Footer'
import './app-layout.css'

interface AppLayoutProps {
  isLoading: boolean
}

export function AppLayout({ isLoading }: AppLayoutProps) {
  return (
    <div
      className={`app-layout${isLoading ? ' app-layout--loading' : ''}`}
      inert={isLoading}
      aria-hidden={isLoading || undefined}
    >
      <Header />

      <main id="main-content" className="app-layout__main" tabIndex={-1}>
        <PageTransition />
      </main>

      <Footer />
    </div>
  )
}
