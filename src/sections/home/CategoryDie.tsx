import { lazy, Suspense, useEffect, useRef, useState, type RefObject } from 'react'
import './category-die.css'

const DieScene = lazy(() => import('./DieScene'))

export interface CubeControls {
  drag?: { x: number; y: number }
  turn?: { x: number; y: number }
}

interface CategoryDieProps {
  controls: RefObject<CubeControls>
  travel: RefObject<{ progress: number }>
}

export function CategoryDie({ controls, travel }: CategoryDieProps) {
  const root = useRef<HTMLDivElement>(null)
  const [inRange, setInRange] = useState(false)

  useEffect(() => {
    if (!root.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setInRange(true)
      observer.disconnect()
    }, { rootMargin: '220px' })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="category-die" aria-hidden="true" ref={root}>
      <div className="category-die__light" />
      <div className="category-die__fallback" />
      {inRange && (
        <Suspense fallback={null}>
          <DieScene controls={controls} travel={travel} />
        </Suspense>
      )}
    </div>
  )
}
