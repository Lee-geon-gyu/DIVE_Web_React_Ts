import { Header } from '../navigation/Header'
import { PageTransition } from '../transition/PageTransition'
import { Footer } from './Footer'
import './app-layout.css'

export function AppLayout() {
  return (
    <div className="app-layout">
      <Header />

      <main id="main-content" className="app-layout__main" tabIndex={-1}>
        <PageTransition />
      </main>

      <Footer />
    </div>
  )
}
