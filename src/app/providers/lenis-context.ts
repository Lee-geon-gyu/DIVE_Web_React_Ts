import type Lenis from 'lenis'
import { createContext, useContext, type RefObject } from 'react'

export const LenisContext = createContext<RefObject<Lenis | null> | null>(null)

export function useLenisRef() {
  const context = useContext(LenisContext)

  if (!context) {
    throw new Error('useLenisRef must be used within LenisProvider.')
  }

  return context
}
