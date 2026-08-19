import aiToolsBackground from '../assets/images/sub/immersive/Immersive_bg_fifth.png'
import librariesBackground from '../assets/images/sub/immersive/Immersive_bg.png'
import responsiveBackground from '../assets/images/sub/immersive/Immersive_bg_fourth.png'
import referenceBackground from '../assets/images/sub/immersive/Immersive_bg_second.png'
import publishingGuideBackground from '../assets/images/sub/immersive/Immersive_bg_sixth.png'
import resourcesBackground from '../assets/images/sub/immersive/Immersive_bg_third.png'

const backgroundByPath: Readonly<Record<string, string>> = {
  '/reference': referenceBackground,
  '/ai': aiToolsBackground,
  '/resources': resourcesBackground,
  '/responsive-web': responsiveBackground,
  '/libraries': librariesBackground,
  '/publishing-guide': publishingGuideBackground,
}

const preloadCache = new Map<string, Promise<void>>()

function loadAndDecodeImage(src: string) {
  const cachedRequest = preloadCache.get(src)

  if (cachedRequest) return cachedRequest

  const request = new Promise<void>((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.fetchPriority = 'high'

    const finish = () => resolve()

    image.addEventListener('load', () => {
      if (typeof image.decode === 'function') {
        void image.decode().then(finish, finish)
        return
      }

      finish()
    }, { once: true })
    image.addEventListener('error', finish, { once: true })
    image.src = src

    if (image.complete) {
      if (typeof image.decode === 'function') {
        void image.decode().then(finish, finish)
      } else {
        finish()
      }
    }
  })

  preloadCache.set(src, request)
  return request
}

export function preloadSubPageBackground(to: string) {
  const pathname = to.split(/[?#]/, 1)[0]
  const background = backgroundByPath[pathname]

  return background ? loadAndDecodeImage(background) : Promise.resolve()
}
