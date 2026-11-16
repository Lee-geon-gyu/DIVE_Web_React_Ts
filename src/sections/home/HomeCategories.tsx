import { useRef, type KeyboardEvent, type PointerEvent, type RefObject } from 'react'
import { CategoryDie, type CubeControls } from './CategoryDie'
import { HomeWorkflow } from './HomeWorkflow'
import './home-categories.css'

const dragSensitivity = 0.008
const keyboardStep = Math.PI / 6
const keyboardTurns: Partial<Record<string, readonly [number, number]>> = {
  ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0],
}

export function HomeCategories({ travel }: { travel: RefObject<{ progress: number }> }) {
  const controls = useRef<CubeControls>({})
  const dragStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const fallbackRotation = useRef({ x: 0, y: 0 })

  function showFallbackRotation(element: HTMLDivElement, x: number, y: number) {
    element.style.setProperty('--die-fallback-pitch', `${fallbackRotation.current.x + x}rad`)
    element.style.setProperty('--die-fallback-yaw', `${fallbackRotation.current.y + y}rad`)
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return
    dragStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current
    if (start?.id !== event.pointerId) return
    const x = (event.clientY - start.y) * dragSensitivity
    const y = (event.clientX - start.x) * dragSensitivity
    if (!controls.current.drag && Math.hypot(x, y) < 4 * dragSensitivity) return
    controls.current.drag = { x, y }
    showFallbackRotation(event.currentTarget, x, y)
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current?.id !== event.pointerId) return
    const drag = controls.current.drag
    if (drag) {
      fallbackRotation.current.x += drag.x
      fallbackRotation.current.y += drag.y
    }
    dragStart.current = null
    controls.current.drag = undefined
  }

  function turnWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    const direction = keyboardTurns[event.key]
    if (!direction || dragStart.current) return
    event.preventDefault()
    const pitch = direction[0] * keyboardStep
    const yaw = direction[1] * keyboardStep
    const turn = controls.current.turn ??= { x: 0, y: 0 }
    turn.x += pitch
    turn.y += yaw
    fallbackRotation.current.x += pitch
    fallbackRotation.current.y += yaw
    showFallbackRotation(event.currentTarget, 0, 0)
  }

  return (
    <section className="home-categories" aria-labelledby="dive-workflow-title">
      <div className="home-categories__surface" aria-hidden="true" />
      <div className="page-container home-categories__content">
        <HomeWorkflow />
        <div className="home-categories__panel">
          <div className="home-categories__layout">
            <div
              className="home-categories__stage"
              role="group"
              aria-label="장식용 주사위. 드래그하거나 방향키를 눌러 돌리기"
              tabIndex={0}
              onKeyDown={turnWithKeyboard}
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onLostPointerCapture={endDrag}
            >
              <CategoryDie controls={controls} travel={travel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
