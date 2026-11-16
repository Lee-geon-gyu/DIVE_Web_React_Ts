import { useContext, useLayoutEffect, useRef } from 'react'
import { TabletReadyContext } from '../../app/providers/tablet-ready-context'
import logo from '../../assets/common/dive-logo-white.png'
import { createPortfolioTabletScene } from './portfolioTabletScene'

export function HeroTablet({ titleId }: { titleId: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const onReady = useContext(TabletReadyContext)

  useLayoutEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const front = frontRef.current
    const label = labelRef.current
    const journey = host?.closest<HTMLElement>('.home-hero')
    if (!host || !canvas || !front || !label || !journey) return

    let dispose: (() => void) | undefined
    const frame = requestAnimationFrame(() => {
      try {
        dispose = createPortfolioTabletScene({ canvas, host, journey, front, label })
      } catch (error) {
        console.warn('Tablet scene could not start. Showing the CSS tablet.', error)
      } finally {
        onReady?.()
      }
    })
    return () => {
      cancelAnimationFrame(frame)
      dispose?.()
    }
  }, [onReady])

  return (
    <div className="hero-tablet" ref={hostRef}>
      <h1 id={titleId} className="dive-sr-only">DIVE</h1>
      <div className="hero-tablet__glass" ref={frontRef} aria-hidden="true" />
      <canvas className="hero-tablet__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero-tablet__wordmark" ref={labelRef} aria-hidden="true">
        <div className="hero-tablet__display">
          <div className="hero-tablet__signal">
            <div className="hero-tablet__orbit">
              <span className="hero-tablet__orbit-ring" />
              <span className="hero-tablet__orbit-ring" />
            </div>
            <img src={logo} width="1734" height="480" alt="" fetchPriority="high" />
            <p>Design &amp; Development Resources</p>
          </div>
        </div>
      </div>
    </div>
  )
}
