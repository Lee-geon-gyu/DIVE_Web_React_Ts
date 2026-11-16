import { useEffect, useRef, type RefObject } from 'react'
import {
  ACESFilmicToneMapping, AmbientLight, DirectionalLight, Euler, Group,
  Mesh, PerspectiveCamera, Quaternion, RectAreaLight, Scene, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'
import { homeCategories } from '../../data/homeCategories'
import type { CubeControls } from './CategoryDie'
import { createCategoryBodyMaterial, createCategoryEnvironment, portfolioScenePalette } from './portfolioSceneMaterials'

const studioFov = 35.5
const studioHeight = 0.05
const viewingAngle = new Quaternion().setFromEuler(new Euler(0.25, -0.35, 0))
const orbitAxis = new Vector3(0.2, 1, 0.14).normalize()

interface DieSceneProps {
  controls: RefObject<CubeControls>
  travel: RefObject<{ progress: number }>
}

export default function DieScene({ controls, travel }: DieSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reflectionRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const stage = canvas.parentElement
    if (!stage) return
    const reflection = reflectionRef.current
    const mirror = reflection?.getContext('2d')
    let reflectionSourceWidth = 0

    const context = canvas.getContext('webgl2', { alpha: true, antialias: true })
    if (!context) return

    // React may reuse the canvas after cleanup, including its texture upload state.
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, false)
    context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.95

    const scene = new Scene()
    const palette = portfolioScenePalette
    const reflections = createCategoryEnvironment(renderer, palette)
    scene.environment = reflections.texture

    const camera = new PerspectiveCamera(studioFov, 1, 0.1, 30)
    camera.position.set(0, 0, 6.3)
    camera.updateMatrixWorld()
    scene.add(new AmbientLight(0xffffff, 0.6))
    const key = new DirectionalLight(0xffffff, 1.7)
    key.position.set(-3, 5, 6)
    scene.add(key)
    RectAreaLightUniformsLib.init()
    const floorLight = new RectAreaLight(palette.accent, 0.15, 10, 8)
    floorLight.position.set(0, -3.2, 0)
    floorLight.lookAt(0, 0, 0)
    scene.add(floorLight)

    const die = new Group()
    const geometry = new RoundedBoxGeometry(2, 2, 2, 7, 0.065)
    const body = createCategoryBodyMaterial(palette, homeCategories.map((category) => category.pipCount))
    die.add(new Mesh(geometry, body.material))

    const input = controls.current
    die.quaternion.copy(viewingAngle)
    die.position.y = studioHeight
    scene.add(die)

    let frame = 0
    let lastTime = 0
    let elapsed = 0
    let waveTime = 0
    let wasDragging = false
    let rotationSpeed = 1
    let cameraProgress = 0
    const target = viewingAngle.clone()
    const idlePose = viewingAngle.clone()
    const idleStep = new Quaternion()
    const dragOrigin = new Quaternion()
    const pitch = new Quaternion()
    const yaw = new Quaternion()
    const roll = new Quaternion()
    const xAxis = new Vector3(1, 0, 0)
    const yAxis = new Vector3(0, 1, 0)
    const zAxis = new Vector3(0, 0, 1)

    function draw() {
      renderer.render(scene, camera)
      if (reflection && mirror && reflectionSourceWidth) {
        // Mirror the render about the floor line and compress the image into the floor's perspective.
        mirror.clearRect(0, 0, reflection.width, reflection.height)
        mirror.drawImage(renderer.domElement,
          (renderer.domElement.width - reflectionSourceWidth) / 2, renderer.domElement.height * 0.48,
          reflectionSourceWidth, renderer.domElement.height * 0.46,
          0, 0, reflection.width, reflection.height,
        )
      }
    }

    function updateCamera(progress: number) {
      if (cameraProgress === progress) return
      cameraProgress = progress
      camera.position.z = 6.3 + 0.65 * progress
      camera.rotation.set(-0.13 * progress, -0.67 * progress, 0, 'YXZ')
      camera.fov = studioFov + (48 - studioFov) * Math.sin(progress * Math.PI / 2)
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld()
    }

    function resize() {
      const { clientWidth, clientHeight } = canvas!
      if (!clientWidth || !clientHeight) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
      if (reflection && mirror) {
        reflection.width = Math.round(reflection.clientWidth * 0.65)
        reflection.height = Math.round(reflection.clientHeight * 0.65)
        reflectionSourceWidth = renderer.domElement.width * Math.min(1, reflection.clientWidth / clientWidth)
        mirror.setTransform(1, 0, 0, -1, 0, reflection.height)
      }
      draw()
    }

    function tick(now: number) {
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016
      lastTime = now
      waveTime += delta
      const progress = travel.current.progress
      updateCamera(progress)
      if (input.drag) {
        if (!wasDragging) dragOrigin.copy(die.quaternion)
        pitch.setFromAxisAngle(xAxis, input.drag.x)
        yaw.setFromAxisAngle(yAxis, input.drag.y)
        target.copy(dragOrigin).premultiply(yaw).premultiply(pitch)
      } else if (input.turn) {
        pitch.setFromAxisAngle(xAxis, input.turn.x)
        yaw.setFromAxisAngle(yAxis, input.turn.y)
        target.premultiply(yaw).premultiply(pitch).normalize()
        input.turn = undefined
        rotationSpeed = 0
      } else {
        if (wasDragging) {
          target.copy(die.quaternion)
          rotationSpeed = 0
        }
        rotationSpeed += (1 - rotationSpeed) * (1 - Math.exp(-4 * delta))
        elapsed += delta * rotationSpeed
        idleStep.copy(idlePose).invert()
        yaw.setFromAxisAngle(orbitAxis, elapsed * 0.49)
        pitch.setFromAxisAngle(xAxis, elapsed * 0.33)
        roll.setFromAxisAngle(zAxis, -0.12 + Math.sin(elapsed * 0.83) * 0.1)
        idlePose.copy(viewingAngle).premultiply(pitch).premultiply(yaw).premultiply(roll)
        target.multiply(idleStep.multiply(idlePose)).normalize()
      }
      wasDragging = Boolean(input.drag)
      const damping = 1 - Math.exp(-8 * delta)
      die.quaternion.slerp(target, damping)
      const float = Math.sin(elapsed * 1.25)
      die.position.y += (studioHeight + float * 0.065 - die.position.y) * damping
      floorLight.intensity = 0.15 * (1 - float * 0.1)
      body.setFloorBounce(1 - float * 0.1)
      body.setWaveTime(waveTime)
      draw()
      frame = requestAnimationFrame(tick)
    }

    const sizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame) {
        lastTime = 0
        frame = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    resize()
    canvas.dataset.rendered = 'true'
    sizeObserver.observe(canvas)
    visibilityObserver.observe(stage)

    function showFallback(event: Event) {
      event.preventDefault()
      delete canvas!.dataset.rendered
    }

    function showCanvas() {
      canvas!.dataset.rendered = 'true'
    }

    canvas.addEventListener('webglcontextlost', showFallback)
    canvas.addEventListener('webglcontextrestored', showCanvas)

    return () => {
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      cancelAnimationFrame(frame)
      canvas.removeEventListener('webglcontextlost', showFallback)
      canvas.removeEventListener('webglcontextrestored', showCanvas)
      delete canvas.dataset.rendered
      geometry.dispose()
      body.dispose()
      reflections.dispose()
      renderer.dispose()
    }
  }, [controls, travel])

  return (
    <>
      <canvas className="category-die__reflection" ref={reflectionRef} />
      <canvas className="category-die__canvas" ref={canvasRef} />
    </>
  )
}
