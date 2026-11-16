import { useEffect, useRef, type CSSProperties } from 'react'
import { createImmersiveWaveMotion } from '../../lib/animation/immersiveWaveMotion'
import './category-backdrop.css'

const twinkles = Array.from({ length: 32 }, (_, index) => {
  const band = Math.floor(index / 8)
  return {
    left: `${(index * 37.43 + 8.3) % 94 + 3}%`,
    top: `${band * 24 + (index * 13.71 + 5) % 22 + 2}%`,
    '--twinkle-delay': `${-8.8 + band * 2.15 + (index % 8) * 0.22}s`,
    '--twinkle-size': `${index % 4 === 0 ? 2.4 : 1.55}px`,
  } as CSSProperties
})

export function CategoryBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return

      const resolution = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * resolution)
      canvas.height = Math.round(height * resolution)
      context.setTransform(resolution, 0, 0, resolution, 0, 0)
      let seed = 1729
      const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
        return seed / 4294967296
      }

      const count = Math.round(Math.min(width * height / 2900, 580))
      for (let index = 0; index < count; index++) {
        const x = random() * width
        const y = random() * height
        const brightness = random()
        const radius = brightness > 0.95 ? 1.25 : 0.35 + brightness * 0.5
        context.fillStyle = `rgba(179, 225, 236, ${0.1 + brightness * 0.31})`
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      }
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const pointer = pointerRef.current
    const ambient = ambientRef.current
    if (!pointer || !ambient) return
    return createImmersiveWaveMotion({ ambient, pointer, mobileAmbient: true })
  }, [])

  return (
    <div className="category-backdrop" aria-hidden="true">
      <div className="category-backdrop__pointer" ref={pointerRef}>
        <div className="category-backdrop__ambient" ref={ambientRef}>
          <canvas ref={canvasRef} />
          {twinkles.map((style, index) => <span className="category-backdrop__star" style={style} key={index} />)}
        </div>
      </div>
    </div>
  )
}
