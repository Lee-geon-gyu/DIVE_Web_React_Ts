import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { useLenisRef } from '../../app/providers/lenis-context'
import { homeCategories } from '../../data/homeCategories'
import './page-transition.css'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
const categoryPaths = new Set(homeCategories.map(({ to }) => to))

function getRoute(anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return
  const url = new URL(anchor.href)
  if (url.origin !== window.location.origin) return
  if (basename && url.pathname !== basename && !url.pathname.startsWith(`${basename}/`)) return

  const path = url.pathname.slice(basename.length).replace(/\/$/, '') || '/'
  if (path !== '/' && !categoryPaths.has(path)) return
  return { path, search: url.search, hash: url.hash }
}

export function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const previousPath = useRef(location.pathname)
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const lenisRef = useLenisRef()

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        !(event.target instanceof Element)
      ) return

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.getAttribute('href')?.startsWith('#')) return
      const route = getRoute(anchor)
      if (!route) return
      const samePath = route.path === (location.pathname.replace(/\/$/, '') || '/')
      if (samePath && route.hash) return

      event.preventDefault()
      if (samePath && anchor.hasAttribute('data-scroll-to-top')) {
        if (location.hash || route.search !== location.search) {
          void navigate(`${route.path}${route.search}`, { replace: true, preventScrollReset: true })
        }
        const lenis = lenisRef.current
        if (lenis && !lenis.isStopped) {
          // A native jump can arrive before Lenis has updated its scroll position.
          if (Math.abs(lenis.actualScroll - lenis.animatedScroll) > 1) {
            lenis.stop()
            lenis.start()
          }
          lenis.scrollTo(0)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }
      if (samePath && route.search === location.search) return

      void navigate(`${route.path}${route.search}${route.hash}`, { viewTransition: true })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [lenisRef, location.hash, location.pathname, location.search, navigate])

  useLayoutEffect(() => {
    const pathChanged = previousPath.current !== location.pathname
    previousPath.current = location.pathname
    if (!pathChanged) return

    document.getElementById('main-content')?.focus({ preventScroll: true })

    if (typeof document.startViewTransition === 'function' && navigationType !== 'POP') return
    const animation = containerRef.current?.animate(
      [{ opacity: 0.5, translate: '0 12px' }, { opacity: 1, translate: '0 0' }],
      { duration: 420, easing: 'cubic-bezier(.2, 0, 0, 1)' },
    )
    return () => animation?.cancel()
  }, [location.pathname, navigationType])

  return <div ref={containerRef} className="page-transition"><Outlet /></div>
}
