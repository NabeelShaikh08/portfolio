import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, Color, NormalBlending, ShaderMaterial } from 'three'
import type { Group } from 'three'
import { buildFormations, buildLinksGeometry, buildPointsGeometry } from './field'
import { linksFragment, linksVertex, pointsFragment, pointsVertex } from './shaders'
import { damp, viewport } from '../lib/viewport'

type Props = {
  dark: boolean
  /** Node count, scaled down on phones by the caller. */
  count: number
  linkNodes: number
}

/**
 * Light mode inverts more than the palette. On a bone background additive
 * blending drives everything to white, so the field switches to normal
 * blending with darker, denser nodes — same composition, legible ground.
 */
const PALETTE = {
  dark: {
    a: new Color('#2E8B7A'),
    b: new Color('#E3C77E'),
    link: new Color('#4FAF98'),
    blending: AdditiveBlending,
    pointOpacity: 1.55,
    linkOpacity: 0.62,
    coreBoost: 0.6,
  },
  // Light mode is a balancing act. Additive light on a near-black ground
  // compounds, so dark mode can carry a bright field; drawn normally over
  // cream the same nodes read as speckle sitting on top of the body copy.
  // Darker colours buy the contrast, and lower alpha keeps it behind the text
  // rather than in it.
  light: {
    a: new Color('#14584E'),
    b: new Color('#A8843A'),
    link: new Color('#1F6F63'),
    blending: NormalBlending,
    pointOpacity: 0.7,
    linkOpacity: 0.26,
    coreBoost: 0.0,
  },
}

export default function NeuralField({ dark, count, linkNodes }: Props) {
  const groupRef = useRef<Group>(null)
  const { camera, gl } = useThree()

  // Damped copies of the shared viewport values. Lenis already smooths
  // scrolling; this second pass adds the slight lag that makes the field feel
  // like it has mass rather than being welded to the scrollbar.
  const smoothed = useRef({ progress: 0, x: 0, y: 0 })

  const { pointsGeometry, linksGeometry, pointsMaterial, linksMaterial } = useMemo(() => {
    const formations = buildFormations(count)
    const pointsGeometry = buildPointsGeometry(formations)
    const linksGeometry = buildLinksGeometry(formations, linkNodes, 3)

    const pointsMaterial = new ShaderMaterial({
      vertexShader: pointsVertex,
      fragmentShader: pointsFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uSize: { value: 9.8 },
        uPixelRatio: { value: 1 },
        uColorA: { value: PALETTE.dark.a.clone() },
        uColorB: { value: PALETTE.dark.b.clone() },
        uOpacity: { value: 0 },
        uCoreBoost: { value: PALETTE.dark.coreBoost },
      },
    })

    const linksMaterial = new ShaderMaterial({
      vertexShader: linksVertex,
      fragmentShader: linksFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColor: { value: PALETTE.dark.link.clone() },
        uOpacity: { value: 0 },
      },
    })

    return { pointsGeometry, linksGeometry, pointsMaterial, linksMaterial }
  }, [count, linkNodes])

  // GPU memory is not garbage collected — geometries and materials have to be
  // released by hand when the canvas unmounts.
  useEffect(
    () => () => {
      pointsGeometry.dispose()
      linksGeometry.dispose()
      pointsMaterial.dispose()
      linksMaterial.dispose()
    },
    [pointsGeometry, linksGeometry, pointsMaterial, linksMaterial],
  )

  // Theme swap. Target opacities are stored separately from the live uniform
  // so the fade-in below can ramp toward them.
  const targetOpacity = useRef({ points: 0, links: 0 })

  useEffect(() => {
    const palette = dark ? PALETTE.dark : PALETTE.light
    pointsMaterial.uniforms.uColorA.value.copy(palette.a)
    pointsMaterial.uniforms.uColorB.value.copy(palette.b)
    pointsMaterial.uniforms.uCoreBoost.value = palette.coreBoost
    pointsMaterial.blending = palette.blending
    pointsMaterial.needsUpdate = true

    linksMaterial.uniforms.uColor.value.copy(palette.link)
    linksMaterial.blending = palette.blending
    linksMaterial.needsUpdate = true

    targetOpacity.current = { points: palette.pointOpacity, links: palette.linkOpacity }
  }, [dark, pointsMaterial, linksMaterial])

  useFrame((state, delta) => {
    // Tab-switch and long stalls hand back a huge delta; clamping stops the
    // field from lurching on the first frame back.
    const dt = Math.min(delta, 0.1)
    const time = state.clock.elapsedTime

    const s = smoothed.current
    s.progress = damp(s.progress, viewport.progress, 3.2, dt)
    s.x = damp(s.x, viewport.pointerX, 2.4, dt)
    s.y = damp(s.y, viewport.pointerY, 2.4, dt)

    // DPR can change mid-session when a window is dragged between a laptop
    // panel and an external display, so it is read per frame rather than once.
    pointsMaterial.uniforms.uPixelRatio.value = gl.getPixelRatio()
    pointsMaterial.uniforms.uTime.value = time
    pointsMaterial.uniforms.uProgress.value = s.progress
    linksMaterial.uniforms.uTime.value = time
    linksMaterial.uniforms.uProgress.value = s.progress

    // Ease both layers in over the first moments so the field arrives rather
    // than popping the instant the chunk finishes loading.
    pointsMaterial.uniforms.uOpacity.value = damp(
      pointsMaterial.uniforms.uOpacity.value,
      targetOpacity.current.points,
      1.6,
      dt,
    )
    linksMaterial.uniforms.uOpacity.value = damp(
      linksMaterial.uniforms.uOpacity.value,
      targetOpacity.current.links,
      1.6,
      dt,
    )

    if (groupRef.current) {
      // A slow constant yaw keeps the field alive when the page is still,
      // with pointer parallax layered on top.
      groupRef.current.rotation.y = time * 0.035 + s.x * 0.22
      groupRef.current.rotation.x = -s.y * 0.16 + Math.sin(time * 0.12) * 0.04
    }

    // Camera pulls back and rises through the scroll, so later formations are
    // read from further out as the composition gets larger.
    camera.position.z = 46 - s.progress * 6
    camera.position.y = s.progress * 5 + s.y * 1.4
    camera.position.x = s.x * 1.8
    camera.lookAt(0, s.progress * 2.2, 0)
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeometry} material={pointsMaterial} frustumCulled={false} />
      <lineSegments geometry={linksGeometry} material={linksMaterial} frustumCulled={false} />
    </group>
  )
}
