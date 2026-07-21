import { useLayoutEffect, useRef } from 'react'
import sharedHeroBackground from '../../assets/images/home/hero/Hero_Wave.png'
import { createImmersiveWaveMotion } from '../../lib/animation/immersiveWaveMotion'
import './shared-hero-background.css'

export function SharedHeroBackground() {
  const pointerRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const pointer = pointerRef.current
    const ambient = ambientRef.current

    if (!pointer || !ambient) return

    return createImmersiveWaveMotion({ ambient, pointer })
  }, [])

  return (
    <div className="shared-hero-background" aria-hidden="true">
      <div ref={pointerRef} className="shared-hero-background__pointer">
        <div ref={ambientRef} className="shared-hero-background__ambient">
          <img
            className="shared-hero-background__image"
            src={sharedHeroBackground}
            alt=""
            width="1920"
            height="1080"
            draggable={false}
          />
        </div>
      </div>
      <div className="shared-hero-background__readability" />
    </div>
  )
}
