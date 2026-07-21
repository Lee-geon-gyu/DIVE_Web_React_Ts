import { useCallback, useState } from 'react'
import { AosManager } from '../components/animation/AosManager'
import { AppLayout } from '../components/layout/AppLayout'
import { AppLoader } from '../components/loading/AppLoader'
import { LenisProvider } from './providers/LenisProvider'

export function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <LenisProvider isPaused={isLoading}>
      {isLoading ? <AppLoader onComplete={handleLoadingComplete} /> : null}
      {!isLoading ? <AosManager /> : null}
      <AppLayout isLoading={isLoading} />
    </LenisProvider>
  )
}
