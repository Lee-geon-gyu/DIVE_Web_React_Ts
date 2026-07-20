import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './aos-manager.css'

let isAosInitialized = false

export function AosManager() {
  const location = useLocation()
  const previousLocationKeyRef = useRef(location.key)

  useEffect(() => {
    if (isAosInitialized) return

    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      offset: 80,
      once: true,
      mirror: false,
      disableMutationObserver: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
    isAosInitialized = true
  }, [])

  useEffect(() => {
    if (
      !isAosInitialized ||
      previousLocationKeyRef.current === location.key
    ) {
      return
    }

    previousLocationKeyRef.current = location.key
    const frameId = window.requestAnimationFrame(() => AOS.refreshHard())

    return () => window.cancelAnimationFrame(frameId)
  }, [location.key])

  return null
}
