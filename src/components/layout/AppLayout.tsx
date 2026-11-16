import { ScrollRestoration } from 'react-router-dom'
import { Header } from '../navigation/Header'
import { ScrollProgress } from '../navigation/ScrollProgress'
import { PageTransition } from '../transition/PageTransition'
import { Footer } from './Footer'
import './app-layout.css'

interface AppLayoutProps {
  isLoading: boolean
  isOpening: boolean
}

export function AppLayout({ isLoading, isOpening }: AppLayoutProps) {
  const introClass = isLoading ? ' app-layout--loading' : isOpening ? ' app-layout--opening' : ''
  return (
    <div
      className={`app-layout${introClass}`}
      inert={isLoading}
      aria-hidden={isLoading || undefined}
    >
      <Header />
      <ScrollProgress />

      <main id="main-content" className="app-layout__main" tabIndex={-1}>
        <PageTransition />
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  )
}
