import * as THREE from 'three'

export const portfolioScenePalette = {
  background: new THREE.Color('#051017'),
  accent: new THREE.Color('#2fe0c4'),
  overhead: new THREE.Color('#147d9d'),
}

const surfaceFinish = {
  metalness: .26,
  roughness: .22,
  clearcoat: .75,
  clearcoatRoughness: .16,
  envMapIntensity: .53,
  specularIntensity: .82,
};

function applyCategoryFinish(
  shader: Parameters<THREE.MeshPhysicalMaterial['onBeforeCompile']>[0],
  uniforms: Record<string, THREE.IUniform>,
) {
  Object.assign(shader.uniforms, uniforms);
  shader.vertexShader = shader.vertexShader.replace('#include <common>', `
    #include <common>
    varying vec3 vCategoryNormal;
    varying vec3 vCategoryPosition;
    varying vec3 vCategoryViewOffset;
  `).replace('#include <begin_vertex>', `
    #include <begin_vertex>
    vCategoryNormal = normal;
    vCategoryPosition = transformed;
    vCategoryViewOffset = mat3(modelViewMatrix) * transformed;
  `);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`
    #include <common>
    varying vec3 vCategoryNormal;
    varying vec3 vCategoryPosition;
    varying vec3 vCategoryViewOffset;
    uniform float categoryFloorStrength;
    uniform float categoryWaveTime;
    uniform int categoryPipCounts[6];
    uniform vec3 categoryAccent;

    float categoryPipDistance(vec2 point, int face) {
      int count = categoryPipCounts[face];
      float distanceToPip = 10.;
      if (count % 2 == 1) distanceToPip = length(point);
      if (count >= 2) {
        vec2 pair = point.x < 0. ? -point : point;
        distanceToPip = min(distanceToPip, length(pair - vec2(.48, .48)));
      }
      if (count >= 4) distanceToPip = min(distanceToPip, length(abs(point) - vec2(.48)));
      if (count == 6) distanceToPip = min(distanceToPip, length(vec2(abs(point.x) - .48, point.y)));
      return distanceToPip / .154;
    }

    float categoryRibbon(vec2 surface, float height, float phase, float width) {
      float x = surface.x;
      float rise = pow(clamp((x + .73) * .65, 0., 1.4), 2.65);
      float wave = .105 * sin(2.75 * x + phase) + .043 * sin(5.3 * x - .73 * phase);
      float distanceToWave = (surface.y - height - .40 * rise - wave) / width;
      float falloff = exp(-1.75 * (x - .38) * (x - .38));
      return falloff * exp(-distanceToWave * distanceToWave);
    }
  `).replace('#include <normal_fragment_maps>', `
    #include <normal_fragment_maps>
    vec3 objectNormal = normalize(vCategoryNormal);
    vec3 axes = abs(objectNormal);
    int face = objectNormal.z > 0. ? 0 : 2;
    vec2 localFace = vCategoryPosition.xy;
    if (axes.x > max(axes.z, axes.y)) {
      face = objectNormal.x > 0. ? 1 : 3;
      localFace = vCategoryPosition.zy;
    } else if (axes.y > max(axes.z, axes.x)) {
      face = objectNormal.y > 0. ? 4 : 5;
      localFace = vCategoryPosition.xz;
    }
    float pitDistance = categoryPipDistance(localFace, face);
    float pipVisibility = smoothstep(.97, 1., max(axes.x, max(axes.y, axes.z)));
    float lip = 1. - smoothstep(.83, 1.05, pitDistance);
    float recess = max(0., 1. - pitDistance * pitDistance);
    float pitDepth = -.085 * pipVisibility * recess * recess;
    float pitShadow = pipVisibility * lip;
    vec3 dx = dFdx(-vViewPosition);
    vec3 dy = dFdy(-vViewPosition);
    vec3 crossX = cross(dy, normal);
    vec3 crossY = cross(normal, dx);
    float determinant = dot(dx, crossX);
    vec3 gradient = dFdx(pitDepth) * crossX + dFdy(pitDepth) * crossY;
    vec3 outerNormal = normal;
    if (abs(determinant) > 1e-12) {
      normal = normalize(abs(determinant) * normal - sign(determinant) * gradient);
    }
    diffuseColor.rgb *= 1. - .73 * pitShadow;
  `).replace('#include <lights_physical_fragment>',`
    vec2 surface = vCategoryViewOffset.xy;
    float bevel = smoothstep(.012, .23, 1. - max(max(axes.x, axes.y), axes.z));
    float rim = pow(1. - max(0., dot(outerNormal, normalize(vViewPosition))), 2.);

    float phase = categoryWaveTime * .78;
    float front = smoothstep(.06, .84, outerNormal.z);
    float mainPulse = .76 + .24 * sin(phase * .91);
    float mainRibbon = mainPulse * (.43 * categoryRibbon(surface, -.79, phase, .061)
      + .22 * categoryRibbon(surface, -.77, phase, .225));
    float blueRibbon = (.115 + .084 * sin(phase * .73 + 2.)) * categoryRibbon(surface, -.56, -phase * .82 + 1.7, .12);
    float upperRibbon = (.10 + .086 * sin(phase * 1.22 - 2.)) * categoryRibbon(surface, -.35, phase * .61 - .8, .16);
    float lowerEdge = 1. - smoothstep(-1.16, -.60, surface.y);
    totalEmissiveRadiance += categoryAccent * categoryFloorStrength
      * (front * (mainRibbon + upperRibbon) + lowerEdge * (.055 + .13 * bevel));
    totalEmissiveRadiance += vec3(.035, .40, .73) * front * blueRibbon;

    vec2 corner = surface - vec2(-1.08, .89);
    float upperGlint = exp(-5.3 * dot(corner, corner));
    vec3 coolLight = vec3(.24, .58, .79);
    totalEmissiveRadiance += coolLight * (.24 * upperGlint * front + bevel * rim * (.22 + .52 * upperGlint));
    float pitEdge = smoothstep(.73, .93, pitDistance) * lip * pipVisibility;
    float innerGlint = clamp(1.9 * (normal.y - outerNormal.y), 0., 1.);
    totalEmissiveRadiance *= 1. - .80 * pitShadow;
    vec3 pipTint = vec3(.027, .34, .46);
    totalEmissiveRadiance += pipTint * (.25 + .45 * innerGlint) * pitEdge;
    // Catch the studio lights on the recessed surface using its perturbed normal.
    float pitInterior = pipVisibility * (1. - smoothstep(.72, .88, pitDistance));
    float wall = smoothstep(.18, .79, pitDistance);
    vec3 reflectionRay = reflect(-normalize(vViewPosition), normal);
    float topReflection = pow(max(0., dot(reflectionRay, normalize(vec3(-.49, .78, .36)))), 18.);
    float floorReflection = pow(max(0., dot(reflectionRay, normalize(vec3(.42, -.82, .39)))), 13.);
    vec3 pitShade = mix(vec3(.003, .005, .007), vec3(.008, .012, .016), wall);
    totalEmissiveRadiance += pitInterior * (pitShade
      + (.32 + .68 * wall) * (.48 * topReflection * coolLight + .29 * floorReflection * categoryAccent));
    roughnessFactor = mix(mix(roughnessFactor, .40, bevel * .45), .27, pitShadow);
    #include <lights_physical_fragment>
    #ifdef USE_CLEARCOAT
      material.clearcoatRoughness = mix(material.clearcoatRoughness, .27, bevel);
      material.clearcoat *= 1. - .52 * pitShadow;
    #endif
  `);
}

export function createCategoryBodyMaterial(palette: typeof portfolioScenePalette, pipCounts: readonly number[]) {
  const uniforms = {
    categoryFloorStrength: { value: 1 },
    categoryWaveTime: { value: 0 },
    categoryPipCounts: { value: Int32Array.from(pipCounts) },
    categoryAccent: { value: palette.accent },
  };
  const material=new THREE.MeshPhysicalMaterial({
    ...surfaceFinish,color:'#09202d',emissive:palette.background,emissiveIntensity:.57,
  });
  material.onBeforeCompile=shader=>applyCategoryFinish(shader,uniforms);
  material.customProgramCacheKey=()=> 'category-glass-die';
  return {
    material,
    setFloorBounce(value: number) { uniforms.categoryFloorStrength.value = value; },
    setWaveTime(value: number) { uniforms.categoryWaveTime.value = value; },
    dispose() { material.dispose(); },
  };
}

export function createCategoryEnvironment(renderer: THREE.WebGLRenderer, palette: typeof portfolioScenePalette) {
  const scene = new THREE.Scene();
  scene.background = palette.background;
  const owned: Array<THREE.PlaneGeometry | THREE.MeshBasicMaterial> = [];
  const panels: Array<[string | THREE.Color, number, number, number, [number, number, number], number?]> = [
    ['#f1f4e9', 2.4, 3, 6, [-4,4,4]],
    ['#ffffff', 1.5, 2, 5, [4,2,1]],
    [palette.accent, .12, 14, 14, [0,-4,0]],
    ['#81857b', .6, 5, 3, [0,1,-5]],
    ['#f0f3ec', 1.1, 4, 1.6, [-2,1.2,6], -.45],
    ['#eff2e8', 1.1, 4, .8, [-6,0,2], -.45],
    ['#d8ded1', .6, 4, .8, [6,.4,-2], .3],
  ];
  for (const [color,power,w,h,position,roll=0] of panels) {
    const geometry = new THREE.PlaneGeometry(w,h);
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
    material.color.multiplyScalar(power);
    const panel = new THREE.Mesh(geometry,material);
    panel.position.set(...position); panel.lookAt(0,0,0); panel.rotateZ(roll); scene.add(panel);
    owned.push(geometry,material);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene,.035,.1,30);
  owned.forEach(item => item.dispose()); pmrem.dispose();
  return target;
}
