import { useCallback, useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import { AosManager } from '../components/animation/AosManager'
import { AppLayout } from '../components/layout/AppLayout'
import { AppLoader } from '../components/loading/AppLoader'
import { LenisProvider } from './providers/LenisProvider'
import { TabletReadyContext } from './providers/tablet-ready-context'

export function App() {
  const [intro, setIntro] = useState<'loading' | 'opening' | 'complete'>('loading')
  const [tablet] = useState(() => {
    let ready = () => {}
    const promise = new Promise<void>((resolve) => { ready = resolve })
    return { promise, ready }
  })
  const isHome = Boolean(useMatch({ path: '/', end: true }))
  const isLoading = intro === 'loading'
  const isOpening = intro === 'opening'
  const holdAtHero = isHome && isOpening && !window.location.hash

  const handleLoadingComplete = useCallback(() => {
    setIntro('opening')
  }, [])

  useEffect(() => {
    if (intro !== 'opening') return
    const timer = window.setTimeout(() => setIntro('complete'), 3000)
    return () => window.clearTimeout(timer)
  }, [intro])

  return (
    <TabletReadyContext.Provider value={tablet.ready}>
      <LenisProvider isPaused={isLoading || holdAtHero} holdAtHero={holdAtHero}>
        {isLoading ? <AppLoader tabletReady={isHome ? tablet.promise : undefined} onComplete={handleLoadingComplete} /> : null}
        {!isLoading ? <AosManager /> : null}
        <AppLayout isLoading={isLoading} isOpening={isOpening} />
      </LenisProvider>
    </TabletReadyContext.Provider>
  )
}
