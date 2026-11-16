import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'
import { portfolioScenePalette } from './portfolioSceneMaterials'

// The tablet geometry, shaders and lighting come from the portfolio hero scene.
function makeStudio(renderer: THREE.WebGLRenderer, palette: typeof portfolioScenePalette) {
  const studio = new THREE.Scene();
  studio.background = palette.background;
  const geometries: THREE.PlaneGeometry[] = [];
  const materials: THREE.MeshBasicMaterial[] = [];
  function panel(color: string, intensity: number, width: number, height: number, position: [number, number, number], target: [number, number, number]) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
    material.color.multiplyScalar(intensity);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.lookAt(...target);
    studio.add(mesh); geometries.push(geometry); materials.push(material);
  }
  panel('#fffefa', 1.2, 2.0, 6, [-4, 4, -3], [0,0,0]);
  panel('#d7e1e6', 0.75, 1.0, 5, [-4, 2, 2], [0,0,0]);
  panel('#ffffff', 0.6, 6, 1.2, [0, 6, -1], [0,0,0]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.035, 0.1, 30);
  geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); pmrem.dispose();
  return environment;
}

function roundedTabletShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2, y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

interface TabletSceneElements {
  canvas: HTMLCanvasElement
  host: HTMLDivElement
  journey: HTMLElement
  front: HTMLDivElement
  label: HTMLDivElement
}

export function createPortfolioTabletScene({ canvas, host, journey, front, label }: TabletSceneElements) {
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'high-performance' })
  if (!context) return

  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, false)
  context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: 'high-performance' })
  } catch {
    return
  }

  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  const palette = portfolioScenePalette
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-8.8, 8.8, 5, -5, 0.1, 50)
  camera.position.set(0, 0, 12)
  const environment = makeStudio(renderer, palette)
  scene.environment = environment.texture

  const tablet = new THREE.Group();
  const w = 3.8, h = 2.3, r = .18;
  const shape = roundedTabletShape(w, h, r);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: .035, bevelEnabled: true, bevelThickness: .020, bevelSize: .022, bevelSegments: 5, steps: 1, curveSegments: 18 });
  geometry.translate(0,0,-.0175);
  const material = new THREE.MeshPhysicalMaterial({
    color: '#151619', metalness: 0.02, roughness: 0.23,
    transmission: 0.94, thickness: 0.14, ior: 1.48,
    transparent: true, opacity: .16, clearcoat: 1, clearcoatRoughness: 0.13,
    envMapIntensity: 0.4, attenuationColor: new THREE.Color('#c5cbd2'), attenuationDistance: 3,
    side: THREE.DoubleSide,
  });
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#aeb5bd', metalness: .92, roughness: .26, envMapIntensity: 1.6,
    transparent: true,
  });
  const glass = new THREE.Mesh(geometry, [material, frameMaterial]);
  tablet.add(glass);

  // The header light reflects into the upper glass, centered in the scene.
  const coatingMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      proximity: { value: .5 },
      overheadColor: { value: palette.overhead.clone().convertLinearToSRGB() },
      accent: { value: palette.accent.clone().convertLinearToSRGB() },
    },
    vertexShader: `varying vec2 vUv; varying vec3 vNormal; varying float vSceneX;
      void main() {
        vUv = position.xy / vec2(3.8, 2.3) + .5;
        vSceneX = (modelMatrix * vec4(position, 1.)).x;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `varying vec2 vUv; varying vec3 vNormal; varying float vSceneX; uniform float proximity; uniform vec3 overheadColor; uniform vec3 accent;
      void main() {
        vec3 mirror = reflect(vec3(0., 0., -1.), normalize(vNormal));
        vec2 header = vec2(vSceneX + mirror.x * .8, vUv.y - .97 + mirror.y * .09);
        vec2 spread = header / vec2(2.05, .28);
        vec2 core = header / vec2(1.12, .11);
        float sheen = (.28 * exp(-dot(spread, spread)) + .19 * exp(-dot(core, core)))
          * smoothstep(.08, .9, mirror.z);
        vec2 floor = (vUv - vec2(.5, .11)) / vec2(.39, .09);
        float bounce = .036 * exp(-dot(floor, floor)) * (.4 + .6 * proximity);
        float alpha = sheen + bounce;
        vec3 color = (overheadColor * sheen + accent * bounce) / max(alpha, .0001);
        gl_FragColor = vec4(color, alpha);
      }`,
    side: THREE.FrontSide,
  });
  const coating = new THREE.Mesh(geometry, coatingMaterial);
  coating.scale.set(1.001, 1.001, 1.025);
  tablet.add(coating);
  const rimWidth = .0145;
  const rimShape = shape.clone();
  rimShape.holes.push(roundedTabletShape(w - 2 * rimWidth, h - 2 * rimWidth, r - rimWidth));
  const outlineGeometry = new THREE.ShapeGeometry(rimShape, 32);
  const outlineMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      opacity: { value: 1 }, phase: { value: 0 },
      accent: { value: palette.accent.clone().convertLinearToSRGB() },
    },
    vertexShader: `varying vec2 rimUv;
      void main() {
        rimUv = position.xy / vec2(3.8, 2.3) + .5;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `varying vec2 rimUv; uniform float opacity; uniform float phase; uniform vec3 accent;
      void main() {
        float sweep = .10 * sin(phase);
        float diagonal = smoothstep(.1, .86, .43 + rimUv.y * .5 - rimUv.x * .32 + sweep);
        vec3 steel = mix(vec3(.22,.31,.39), vec3(.71,.80,.87), diagonal);
        float glint = exp(-pow(abs(rimUv.x - .49 - sweep) / .23, 2.)) * smoothstep(.68,.99,rimUv.y);
        float bounce = exp(-pow(abs(rimUv.x - .60 + sweep) / .24, 2.)) * (1. - smoothstep(.01,.23,rimUv.y));
        vec3 reflected = mix(mix(steel, vec3(.94,.99,1.), glint * .76), accent, bounce * .63);
        gl_FragColor = vec4(reflected, opacity);
      }`,
  });
  const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
  outline.position.z = .040;
  tablet.add(outline);
  const reverseOutline = new THREE.Mesh(outlineGeometry, outlineMaterial);
  reverseOutline.rotation.y = Math.PI;
  reverseOutline.position.z = -.040;
  tablet.add(reverseOutline);
  // The rear face belongs to the same physical object. It closes the viewport
  // before the profile content is revealed, and the whole sequence reverses.
  const backGeometry = new THREE.ShapeGeometry(shape, 32);
  const backMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide, transparent: true, depthWrite: true,
    uniforms: {
      cover: { value: 0 }, opacity: { value: 1 },
      sceneBackground: { value: palette.background.clone().convertLinearToSRGB() },
      overheadColor: { value: palette.overhead.clone().convertLinearToSRGB() },
      rearTint: { value: new THREE.Color('#174532').convertLinearToSRGB() },
    },
    vertexShader: `varying vec2 vUv; void main(){vUv=position.xy/vec2(3.8,2.3)+.5;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec2 vUv; uniform float cover; uniform float opacity; uniform vec3 sceneBackground; uniform vec3 overheadColor; uniform vec3 rearTint;
      void main() {
        float reflection = exp(-pow((vUv.x + vUv.y * .7 - 1.1) / .28, 2.));
        float wash = 1. - smoothstep(.05, .85, length((vUv - vec2(.88, .07)) * vec2(.8, 1.)));
        vec3 color = mix(sceneBackground, rearTint, wash * (.34 - cover * .19));
        color += overheadColor * .14 * reflection * (1. - cover);
        gl_FragColor = vec4(color, opacity);
      }`,
  });
  const back = new THREE.Mesh(backGeometry, backMaterial);
  back.position.z = -.039;
  tablet.add(back);
  scene.add(tablet);
  scene.add(new THREE.AmbientLight(0xffffff, 0.10));
  RectAreaLightUniformsLib.init();
  const topLight = new THREE.RectAreaLight(palette.overhead, 0.8, 2, 5);
  topLight.position.set(0, 4, 6); topLight.lookAt(0, -2, 0); scene.add(topLight);
  const floorLight = new THREE.PointLight(palette.accent, 14, 7, 2);
  floorLight.position.set(0, -3.6, 1.0); scene.add(floorLight);

  const layout = host.closest('.app-layout')
  const marquee = journey.querySelector<HTMLElement>('.home-hero__marquee')
  let width = 1
  let height = 1
  let baseScale = 1
  let coverScale = 1
  let journeyStart = 0
  let scrollRange = 1
  let progress = 0
  let targetProgress = 0
  let pointerX = 0
  let pointerY = 0
  let smoothX = 0
  let smoothY = 0
  let previousTime: number | undefined
  let entranceStart: number | undefined
  let hasEntered = false
  let elapsed = 0
  let signalActive = false
  let signalZone: number | 'dock' | undefined
  let signalStartedAt = 0
  let nextIdleSignalAt: number | undefined
  let playedIdleSignal = false
  const signalDuration = 260
  const firstIdleSignalDelay = 1000
  const idleSignalInterval = 6000
  const smooth = (from: number, to: number, value: number) => THREE.MathUtils.smoothstep(value, from, to)

  function onScroll() {
    targetProgress = THREE.MathUtils.clamp((window.scrollY - journeyStart) / scrollRange, 0, 1)
  }

  function resize() {
    width = Math.max(1, host.clientWidth)
    height = Math.max(1, host.clientHeight)
    const aspect = width / height
    camera.left = -5 * aspect
    camera.right = 5 * aspect
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setSize(width, height, false)
    baseScale = Math.min(2.32, 10 * aspect * 0.86 / w)
    coverScale = Math.max(10 * aspect / w, 10 / h) * 1.08
    journeyStart = journey.getBoundingClientRect().top + window.scrollY
    scrollRange = Math.max(1, journey.offsetHeight - host.offsetHeight)
    onScroll()
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch') return
    const bounds = host.getBoundingClientRect()
    pointerX = (event.clientX - bounds.left) / width - 0.5
    pointerY = (event.clientY - bounds.top) / height - 0.5
  }

  function onPointerLeave() {
    pointerX = 0
    pointerY = 0
  }

  function draw(now: number) {
    const delta = previousTime === undefined ? 1 / 60 : Math.min((now - previousTime) / 1000, 0.1)
    previousTime = now
    elapsed += delta
    progress += (targetProgress - progress) * (1 - Math.exp(-delta * 16))
    if (Math.abs(targetProgress - progress) < 0.00001) progress = targetProgress

    const phase = elapsed * Math.PI * 2 / 8
    const float = Math.sin(phase)
    const proximity = (1 - float) * 0.5
    smoothX += (pointerX - smoothX) * 0.025
    smoothY += (pointerY - smoothY) * 0.025
    const align = smooth(0.02, 0.61, progress)
    const turn = smooth(0.035, 0.72, progress)
    const zoom = smooth(0.53, 0.88, progress)
    const foreground = 1 - smooth(0.86, 1, progress)

    const loading = layout?.classList.contains('app-layout--loading')
    if (entranceStart === undefined && !loading) {
      const opening = layout?.classList.contains('app-layout--opening')
      if (opening && !window.location.hash) {
        progress = targetProgress = 0
        entranceStart = now + 1100
      } else {
        entranceStart = now
        hasEntered = targetProgress >= 0.01
      }
    }
    const entranceTime = hasEntered ? 1 : THREE.MathUtils.clamp((now - (entranceStart ?? now)) / 1450, 0, 1)
    if (entranceTime === 1) hasEntered = true
    const presence = loading ? 0 : 1 - (1 - entranceTime) ** 3

    tablet.position.set(0, (-0.16 + float * 0.13) * (1 - align) - (1 - presence) * 9, 0)
    tablet.rotation.set(
      (-0.20 + Math.sin(phase + 0.6) * 0.018 + smoothY * 0.045) * (1 - align),
      THREE.MathUtils.lerp(-0.28 + Math.cos(phase) * 0.018 + smoothX * 0.045, Math.PI * 3, turn),
      (-0.09 + Math.sin(phase) * 0.012) * (1 - align),
    )
    tablet.scale.setScalar(THREE.MathUtils.lerp(baseScale, coverScale, zoom))
    floorLight.intensity = (8 + proximity * 13) * (1 - smooth(0.25, 0.8, progress))
    const frameVisibility = 1 - smooth(0.78, 0.91, progress)
    frameMaterial.opacity = frameVisibility
    outlineMaterial.uniforms.opacity.value = frameVisibility * 0.9
    outlineMaterial.uniforms.phase.value = phase
    material.opacity = 0.16 * (1 - smooth(0.72, 0.9, progress))
    material.envMapIntensity = 0.10 + proximity * 0.04
    backMaterial.uniforms.cover.value = zoom
    backMaterial.uniforms.opacity.value = foreground
    coatingMaterial.uniforms.proximity.value = proximity

    if (marquee) marquee.style.opacity = String(1 - smooth(0.10, 0.46, progress))
    canvas.style.opacity = String(foreground * presence)
    canvas.dataset.rotationY = tablet.rotation.y.toFixed(4)
    canvas.dataset.scrollProgress = progress.toFixed(4)

    // Keep the rounded panel and signal effect aligned with the visible side.
    tablet.updateMatrixWorld()
    const world = tablet.matrixWorld.elements
    const side = world[10] >= 0 ? 1 : -1
    label.toggleAttribute('data-rear-facing', side < 0)
    const screenVisible = presence > 0 && foreground > 0 && Math.abs(world[10]) > 0.005 * tablet.scale.x
    front.style.visibility = screenVisible ? 'visible' : 'hidden'
    label.style.visibility = screenVisible ? 'visible' : 'hidden'
    const pixelsPerUnit = height / 10
    if (screenVisible) {
      const frontDepth = 0.039 * side
      const a = world[0] * side * w * pixelsPerUnit / 760
      const b = -world[1] * side * w * pixelsPerUnit / 760
      const c = -world[4] * h * pixelsPerUnit / 460
      const d = world[5] * h * pixelsPerUnit / 460
      const left = width / 2 + (world[12] + world[8] * frontDepth) * pixelsPerUnit - (a * 760 + c * 460) / 2
      const top = height / 2 - (world[13] + world[9] * frontDepth) * pixelsPerUnit - (b * 760 + d * 460) / 2
      const projection = `matrix(${a},${b},${c},${d},${left},${top})`
      front.style.transform = projection
      label.style.transform = projection
      front.style.setProperty('--glass-opacity', String(presence * (1 - smooth(0.57, 0.8, progress))))
      label.style.opacity = String(presence * foreground)
    }
    // Use the scroll rotation so the idle sway cannot retrigger a boundary.
    const scrollAngle = THREE.MathUtils.lerp(-0.28, Math.PI * 3, turn)
    const turnNumber = Math.round(scrollAngle / (2 * Math.PI))
    const nearFullTurn = turnNumber >= 1 && Math.abs(scrollAngle - turnNumber * 2 * Math.PI) < 0.42
    const nearDock = progress > 0.71 && progress < 0.841
    const nextSignalZone = nearDock ? 'dock' : nearFullTurn ? turnNumber : undefined
    if (nextSignalZone !== signalZone) {
      signalZone = nextSignalZone
      signalStartedAt = now
    }
    const atRest = screenVisible && hasEntered && progress < 0.002 && targetProgress < 0.002
    if (atRest) {
      nextIdleSignalAt ??= now + (playedIdleSignal ? idleSignalInterval : firstIdleSignalDelay)
    } else {
      nextIdleSignalAt = undefined
    }
    const idleTime = now - (nextIdleSignalAt ?? Infinity)
    const idlePulse = idleTime >= 0
    const signalAge = idlePulse ? idleTime % idleSignalInterval : now - signalStartedAt
    const signalTime = signalAge / signalDuration
    const noise = screenVisible && (signalZone !== undefined || idlePulse)
      ? smooth(0, 0.14, signalTime) * (1 - smooth(0.22, 1, signalTime))
      : 0
    if (noise > 0) {
      if (idlePulse) playedIdleSignal = true
      signalActive = true
      const signalElapsed = signalAge / 1000
      const pulse = Math.sin(signalElapsed * 30)
      label.style.setProperty('--signal-noise', String(noise * (0.32 + 0.18 * pulse)))
      label.style.setProperty('--signal-shift', `${noise * (pulse * 4 + Math.sin(signalElapsed * 47) * 2)}px`)
      label.style.setProperty('--signal-skew', `${noise * pulse * 0.8}deg`)
      label.style.setProperty('--signal-roll', `${noise * Math.sin(signalElapsed * 21) * 13}%`)
    } else if (signalActive) {
      signalActive = false
      for (const property of ['noise', 'shift', 'skew', 'roll']) label.style.removeProperty(`--signal-${property}`)
    }
    if (foreground > 0) renderer.render(scene, camera)
  }

  const resizeObserver = new ResizeObserver(resize)
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    previousTime = undefined
    renderer.setAnimationLoop(entry.isIntersecting ? draw : null)
  })
  function dispose() {
    renderer.setAnimationLoop(null)
    resizeObserver.disconnect()
    visibilityObserver.disconnect()
    window.removeEventListener('scroll', onScroll)
    host.removeEventListener('pointermove', onPointerMove)
    host.removeEventListener('pointerleave', onPointerLeave)
    delete host.dataset.rendered
    canvas.removeAttribute('style')
    front.removeAttribute('style')
    label.removeAttribute('style')
    label.removeAttribute('data-rear-facing')
    marquee?.style.removeProperty('opacity')
    geometry.dispose()
    material.dispose()
    frameMaterial.dispose()
    coatingMaterial.dispose()
    outlineGeometry.dispose()
    outlineMaterial.dispose()
    backGeometry.dispose()
    backMaterial.dispose()
    environment.dispose()
    renderer.dispose()
  }

  try {
    resize()
    progress = targetProgress
    renderer.compile(scene, camera)
    draw(performance.now())
    host.dataset.rendered = 'true'
    resizeObserver.observe(host)
    resizeObserver.observe(journey)
    visibilityObserver.observe(host)
    window.addEventListener('scroll', onScroll, { passive: true })
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave)
  } catch {
    dispose()
    return
  }

  return dispose
}
