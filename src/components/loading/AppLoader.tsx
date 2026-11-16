import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import letterD from '../../assets/images/logo/loader/dive-letter-d.png'
import letterI from '../../assets/images/logo/loader/dive-letter-i.png'
import letterV from '../../assets/images/logo/loader/dive-letter-v.png'
import letterE from '../../assets/images/logo/loader/dive-letter-e.png'
import tabletLogo from '../../assets/common/dive-logo-white.png'
import waveBackground from '../../assets/images/home/hero/Hero_Wave.png'
import './app-loader.css'

const words = [
  { initial: letterD, rest: 'rive', width: 563 },
  { initial: letterI, rest: 'nto', width: 138 },
  { initial: letterV, rest: 'erified', width: 533 },
  { initial: letterE, rest: 'xperiences.', width: 482 },
]

function decodeImage(source: string) {
  const image = new Image()
  image.src = source
  return image.decode()
}

export function AppLoader({ tabletReady, onComplete }: { tabletReady?: Promise<void>; onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const meterRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLProgressElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const meter = meterRef.current
    const progress = progressRef.current
    const percent = percentRef.current
    if (!root || !meter || !progress || !percent) return

    const documentRoot = document.documentElement
    const previousOverflow = documentRoot.style.overflow
    documentRoot.style.overflow = 'hidden'
    let active = true
    let exit: gsap.core.Tween | undefined

    const segments = meter.querySelectorAll<HTMLElement>('.app-loader__track span')
    const gauge = { value: 1 }
    let assetProgress = 0
    let phraseProgress = 0
    let previousPercent = 1

    const fillGauge = gsap.quickTo(gauge, 'value', {
      duration: 0.16, ease: 'power1.out',
      onUpdate() {
        const value = gauge.value
        progress.value = value
        const rounded = Math.floor(value)
        if (rounded !== previousPercent) {
          previousPercent = rounded
          percent.textContent = `${rounded}%`
        }
        meter.style.setProperty('--loader-fill', `${value}%`)
        segments.forEach((segment, index) => {
          const fill = Math.min(100, Math.max(0, (value * segments.length / 100 - index) * 100))
          segment.style.setProperty('--segment-fill', `${fill}%`)
        })
      },
    })
    function updateGauge() {
      fillGauge(1 + 99 * Math.min(assetProgress, phraseProgress))
    }

    const letters = root.querySelectorAll('.app-loader__glyph')
    const letterDelay = 0.042
    let finishPhrase = () => {}
    const phraseReady = new Promise<void>((resolve) => { finishPhrase = resolve })
    const reveal = gsap.timeline({
      onUpdate() {
        phraseProgress = this.progress()
        updateGauge()
      },
      onComplete: () => finishPhrase(),
    })
      .set(letters, { visibility: 'visible', stagger: letterDelay }, 0)
      .fromTo(letters, {
        y: (_index: number, letter: HTMLElement) => (letter.parentElement?.offsetHeight ?? letter.offsetHeight) + 4,
      }, { y: 0, duration: 0.6, ease: 'power2.out', stagger: letterDelay }, 0)

    const assets = [
      document.fonts.ready,
      decodeImage(waveBackground), decodeImage(tabletLogo),
      ...words.map(({ initial }) => decodeImage(initial)),
    ]
    if (tabletReady) assets.push(tabletReady)
    let settled = 0
    let readingTime: gsap.core.Tween | undefined
    const watchAssets = assets.map(async (asset) => {
      try { await asset } catch { /* Its fallback is free to render after a failed load. */ }
      if (!active) return
      assetProgress = ++settled / assets.length
      updateGauge()
    })
    void Promise.all([Promise.all(watchAssets), phraseReady]).then(() => {
      if (!active) return
      readingTime = gsap.delayedCall(0.24, () => {
        exit = gsap.to(root, { opacity: 0, duration: 0.42, ease: 'power2.inOut', onComplete })
      })
    })

    return () => {
      active = false
      readingTime?.kill()
      fillGauge.tween.kill()
      exit?.revert()
      reveal.revert()
      documentRoot.style.overflow = previousOverflow
    }
  }, [onComplete, tabletReady])

  return (
    <div className="app-loader" ref={rootRef}>
      <p className="app-loader__phrase" aria-label="Drive Into Verified Experiences.">
        {words.map(({ initial, rest, width }) => (
          <span className="app-loader__word" aria-hidden="true" key={rest}>
            <img className="app-loader__glyph app-loader__initial" src={initial} width={width} height="480" alt="" />
            {Array.from(rest, (letter, index) => (
              <span className="app-loader__glyph" key={index}>{letter}</span>
            ))}
          </span>
        ))}
      </p>
      <div className="app-loader__meter" ref={meterRef}>
        <progress aria-label="DIVE 로딩 진행률" max={100} value={1} ref={progressRef} />
        <div className="app-loader__track" aria-hidden="true">
          {Array.from({ length: 20 }, (_, index) => <span key={index} />)}
        </div>
        <span aria-hidden="true" ref={percentRef}>1%</span>
      </div>
    </div>
  )
}
