import {
  Children,
  useLayoutEffect,
  useRef,
  type PropsWithChildren,
} from 'react'
import immersiveBackground from '../../assets/images/sub/immersive/Immersive_bg.png'
import { gsap } from '../../lib/animation/gsap'
import './sub-page-layout.css'

interface SubPageLayoutProps extends PropsWithChildren {
  backgroundImage?: string
}

export function SubPageLayout({
  children,
  backgroundImage = immersiveBackground,
}: SubPageLayoutProps) {
  const [hero, ...body] = Children.toArray(children)
  const rootRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const background = backgroundRef.current

    if (!root || !background) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 1280px) and (hover: hover) and (pointer: fine)',
        () => {
          const moveX = gsap.quickTo(background, 'x', {
            duration: 1.2,
            ease: 'power3.out',
          })
          const moveY = gsap.quickTo(background, 'y', {
            duration: 1.2,
            ease: 'power3.out',
          })

          const handlePointerMove = (event: PointerEvent) => {
            const normalizedX = event.clientX / window.innerWidth - 0.5
            const normalizedY = event.clientY / window.innerHeight - 0.5

            moveX(normalizedX * -16)
            moveY(normalizedY * -12)
          }

          const handlePointerOut = (event: PointerEvent) => {
            if (event.relatedTarget) return

            moveX(0)
            moveY(0)
          }

          window.addEventListener('pointermove', handlePointerMove, {
            passive: true,
          })
          window.addEventListener('pointerout', handlePointerOut)

          return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerout', handlePointerOut)
          }
        },
      )

      return () => media.revert()
    }, root)

    return () => context.revert()
  }, [])

  return (
    <div ref={rootRef} className="sub-page-layout">
      <div
        ref={backgroundRef}
        className="sub-page-layout__background"
        aria-hidden="true"
      >
        <img
          className="sub-page-layout__background-image"
          src={backgroundImage}
          alt=""
          width="1920"
          height="1080"
          draggable={false}
        />
      </div>
      <div className="sub-page-layout__readability" aria-hidden="true" />
      <div className="sub-page-layout__content">
        {hero}
        <div className="sub-page-layout__body">{body}</div>
      </div>
    </div>
  )
}
