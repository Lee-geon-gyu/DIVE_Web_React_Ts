import { createContext } from 'react'

export const TabletReadyContext = createContext<(() => void) | null>(null)
