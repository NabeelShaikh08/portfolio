import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { clamp, viewport } from '../lib/viewport'

/**
 * The hero's workstation: sixty-odd parts that fly in and assemble themselves
 * as you scroll, then power on.
 *
 * ── Why it is built rather than downloaded ─────────────────────────────────
 * The alternative was a Spline scene, and it was rejected for the same reasons
 * it was rejected on the agency site: a second WebGL runtime on a page that
 * already runs one, a scene file served from someone else's CDN, and — the
 * reason that actually decides it — **a model built from parts can be taken
 * apart**. An imported mesh is one welded object. You cannot scatter its
 * keyboard without cutting the file up by hand first, so the single effect
 * this component exists to produce is the one an import cannot give.
 *
 * Primitives also cost nothing to download, carry no licence question, and can
 * be finished in this page's own palette rather than whatever palette the
 * original author picked.
 *
 * ── The assembly ───────────────────────────────────────────────────────────
 * Every mesh records where it belongs (`home`) and where it starts (`away`,
 * pushed out along its own direction from the centre, with a spin). Scroll
 * drives one progress value; each part interpolates between the two across its
 * own slice of that value, ordered so the thing builds the way a workstation
 * is actually set up — desk, tower, tower face, monitor stand, chassis,
 * screen, keys, peripherals, lamps. It reads as assembly rather than as a
 * swarm because the *order* is mechanical, not because the motion is.
 *
 * The scatter is hashed from each part's index, never `Math.random()`: the
 * explosion has to be identical on every load and after every resize, or
 * turning a phone sideways would reshuffle a half-built machine.
 *
 * ── It never animates on its own ───────────────────────────────────────────
 * Every frame here is a function of scroll position and pointer. At rest it is
 * a still image, which is also what makes it safe to leave on screen behind
 * live text.
 *
 * ── Decoration, and treated as such ────────────────────────────────────────
 * `aria-hidden`, `pointer-events: none`, and absent entirely under reduced
 * motion, without WebGL, or on a narrow screen — see `Hero.tsx`, which keeps
 * every word readable when this never mounts.
 */

/** Deterministic pseudo-random in [0,1). Same input, same explosion, always. */
function hash(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

type Part = {
  mesh: THREE.Mesh
  home: THREE.Vector3
  away: THREE.Vector3
  homeQ: THREE.Quaternion
  awayQ: THREE.Quaternion
  /** Assembly group: lower builds first. */
  order: number
}

/**
 * Assembly groups, in the order a desk is actually put together. The names are
 * load-bearing: the sequence is what makes the effect read as setup rather
 * than as debris finding each other.
 */
const G = {
  DESK: 0,
  TOWER: 1,
  TOWER_FACE: 2,
  STAND: 3,
  CHASSIS: 4,
  SCREEN: 5,
  KEYS: 6,
  PERIPH: 7,
  LAMPS: 8,
} as const
const GROUPS = 9

function buildWorkstation(dark: boolean) {
  const rig = new THREE.Group()
  const parts: Part[] = []

  // Values are set *against the ground*, and the ground inverts with the
  // theme. On coal a dark machine disappears into the page, so every surface
  // is lifted and the rig reads as a lit object in a dark room. On chalk the
  // failure is the exact opposite — the same lifted greys wash out into the
  // paper — so the whole set drops instead. This is not a tint applied to one
  // palette; it is two, because the fix runs in opposite directions.
  const tone = dark
    ? { chassis: 0x66625b, panel: 0x514d47, machined: 0xaeaaa1, bezel: 0x35322e, keycap: 0x726e66, deck: 0x413d38, screen: 0x1c1a18 }
    : { chassis: 0x3a3733, panel: 0x2d2a27, machined: 0x7b776f, bezel: 0x1d1b19, keycap: 0x464340, deck: 0x252320, screen: 0x131110 }

  const chassis = new THREE.MeshStandardMaterial({ color: tone.chassis, roughness: 0.68, metalness: 0.28 })
  const panel = new THREE.MeshStandardMaterial({ color: tone.panel, roughness: 0.6, metalness: 0.36 })
  const machined = new THREE.MeshStandardMaterial({ color: tone.machined, roughness: 0.3, metalness: 0.76 })
  const bezel = new THREE.MeshStandardMaterial({ color: tone.bezel, roughness: 0.5, metalness: 0.45 })
  const keycap = new THREE.MeshStandardMaterial({ color: tone.keycap, roughness: 0.78, metalness: 0.1 })
  /** The desk. Cooler and rougher than the hardware, so the machine sits on
   *  something rather than being carved out of the same block. */
  const deck = new THREE.MeshStandardMaterial({ color: tone.deck, roughness: 0.85, metalness: 0.12 })
  /** Off-state screen, not glass — it has to take fill light or it reads as a
   *  hole cut in the monitor. */
  const screen = new THREE.MeshStandardMaterial({
    color: tone.screen,
    roughness: 0.52,
    metalness: 0.14,
    emissive: new THREE.Color(0xff7538),
    emissiveIntensity: 0,
  })
  /** Power lamps. Dark until the machine boots. */
  const lamp = new THREE.MeshStandardMaterial({
    color: 0x3a2113,
    roughness: 0.4,
    metalness: 0.2,
    emissive: new THREE.Color(0xff5a1f),
    emissiveIntensity: 0,
  })

  const add = (
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    pos: [number, number, number],
    rot: [number, number, number],
    order: number,
  ) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(...pos)
    m.rotation.set(...rot)
    rig.add(m)
    parts.push({
      mesh: m,
      home: m.position.clone(),
      away: new THREE.Vector3(),
      homeQ: m.quaternion.clone(),
      awayQ: new THREE.Quaternion(),
      order,
    })
    return m
  }

  /** Bevelled panel. The radius is what makes an edge catch light. */
  const box = (w: number, h: number, d: number, r = 0.04) =>
    new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2))

  const Z = Math.PI / 2
  const O: [number, number, number] = [0, 0, 0]

  // ── Desk ────────────────────────────────────────────────────────────────
  add(box(7.2, 0.16, 2.9, 0.05), deck, [0, -0.92, 0], O, G.DESK)
  add(box(0.14, 0.5, 2.7, 0.04), deck, [-3.4, -1.23, 0], O, G.DESK)
  add(box(0.14, 0.5, 2.7, 0.04), deck, [3.4, -1.23, 0], O, G.DESK)

  // ── Tower ───────────────────────────────────────────────────────────────
  add(box(1.16, 2.3, 2.1, 0.07), chassis, [-2.5, 0.32, -0.1], O, G.TOWER)
  add(box(1.04, 0.09, 1.98, 0.03), machined, [-2.5, 1.5, -0.1], O, G.TOWER)

  // ── Tower face: side window, drive bays, vent slots, I/O ────────────────
  add(box(0.05, 1.98, 1.86, 0.03), panel, [-1.9, 0.3, -0.1], O, G.TOWER_FACE)
  for (let i = 0; i < 3; i++) {
    add(box(0.06, 0.16, 1.3, 0.02), machined, [-1.87, 1.0 - i * 0.24, -0.1], O, G.TOWER_FACE)
  }
  for (let i = 0; i < 6; i++) {
    add(box(0.05, 0.05, 1.34, 0.02), bezel, [-1.87, -0.28 - i * 0.13, -0.1], O, G.TOWER_FACE)
  }
  add(box(0.07, 0.2, 0.5, 0.02), bezel, [-1.86, 0.34, 0.62], O, G.TOWER_FACE)

  // ── Monitor stand ───────────────────────────────────────────────────────
  add(box(1.7, 0.09, 1.0, 0.04), machined, [0.6, -0.79, -0.25], O, G.STAND)
  add(box(0.3, 1.05, 0.24, 0.06), machined, [0.6, -0.26, -0.35], O, G.STAND)
  add(box(0.5, 0.3, 0.16, 0.05), chassis, [0.6, 0.28, -0.34], O, G.STAND)

  // ── Monitor chassis: back shell, bezel frame ────────────────────────────
  add(box(3.9, 2.3, 0.16, 0.06), chassis, [0.6, 0.92, -0.32], O, G.CHASSIS)
  add(box(3.94, 2.34, 0.06, 0.04), bezel, [0.6, 0.92, -0.23], O, G.CHASSIS)

  // ── Screen ──────────────────────────────────────────────────────────────
  add(box(3.62, 2.02, 0.03, 0.02), screen, [0.6, 0.96, -0.19], O, G.SCREEN)

  // ── Keyboard: deck, then five rows of keys ──────────────────────────────
  const kbTilt = -0.05
  add(box(2.9, 0.12, 0.94, 0.04), panel, [0.5, -0.77, 1.02], [kbTilt, 0, 0], G.KEYS)
  for (let row = 0; row < 5; row++) {
    // Rows shorten toward the top, the way a real board's number row runs
    // wider than its function row.
    const cols = row === 0 ? 13 : 12 - Math.floor(row / 3)
    for (let col = 0; col < cols; col++) {
      const w = 2.6 / cols
      add(
        box(w * 0.82, 0.05, 0.13, 0.015),
        keycap,
        [0.5 - 1.3 + w * (col + 0.5), -0.69 + row * 0.008, 1.34 - row * 0.16],
        [kbTilt, 0, 0],
        G.KEYS,
      )
    }
  }
  // Spacebar.
  add(box(0.95, 0.05, 0.13, 0.015), keycap, [0.52, -0.685, 1.42], [kbTilt, 0, 0], G.KEYS)

  // ── Peripherals: mouse, mat, external drive ─────────────────────────────
  add(box(0.36, 0.14, 0.56, 0.07), panel, [2.42, -0.77, 1.06], O, G.PERIPH)
  add(box(1.1, 0.02, 0.8, 0.01), deck, [2.42, -0.83, 1.06], O, G.PERIPH)
  add(box(0.7, 0.16, 0.5, 0.04), chassis, [-0.9, -0.76, 1.06], O, G.PERIPH)
  add(new THREE.CylinderGeometry(0.18, 0.2, 0.5, 26), panel, [2.5, -0.59, -0.5], O, G.PERIPH)

  // ── Lamps: tower power, drive activity, monitor standby ─────────────────
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 20), lamp, [-1.86, 0.72, 0.4], [0, 0, Z], G.LAMPS)
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 16), lamp, [-1.86, 0.56, 0.4], [0, 0, Z], G.LAMPS)
  add(box(0.1, 0.04, 0.04, 0.015), lamp, [0.6, -0.2, -0.2], O, G.LAMPS)
  add(box(0.24, 0.05, 0.05, 0.02), lamp, [-0.9, -0.66, 1.28], O, G.LAMPS)

  // ── Centre the rig on its own bounds ────────────────────────────────────
  // Everything above is modelled around the desk surface, so the assembled rig
  // sits well above the origin. Framing it means framing its actual centre.
  const bounds = new THREE.Box3().setFromObject(rig)
  const centre = bounds.getCenter(new THREE.Vector3())
  for (const p of parts) {
    p.mesh.position.sub(centre)
    p.home.copy(p.mesh.position)
  }
  const size = bounds.getSize(new THREE.Vector3())

  // ── Scatter ─────────────────────────────────────────────────────────────
  // An exploded technical view, not a debris field. Two constraints do the
  // work:
  //
  //   **Spread in the picture plane.** Displacement is radial in X/Y and
  //   deliberately small in Z. A part pushed toward the viewer grows under
  //   perspective — the desk slab alone would fill a third of the screen and
  //   read as an abstract plane rather than as a piece of furniture.
  //
  //   **Scaled to the rig, not to fixed units.** Reach is a fraction of the
  //   machine's own size, so the explosion stays proportional to what it is
  //   exploding.
  const dir = new THREE.Vector3()
  const euler = new THREE.Euler()
  const spread = Math.max(size.x, size.y) * 0.2
  parts.forEach((p, i) => {
    dir.set(p.home.x, p.home.y, 0)
    if (dir.lengthSq() < 0.05) {
      dir.set(hash(i, 1) - 0.5, hash(i, 2) - 0.5, 0)
    }
    dir.normalize()
    // Rotate each part off its own radius, or the rig separates into two
    // clumps — everything left of centre goes left, everything right goes
    // right, and it stops looking like an exploded diagram.
    const spin = (hash(i, 9) - 0.5) * 1.9
    const dx = dir.x * Math.cos(spin) - dir.y * Math.sin(spin)
    const dy = dir.x * Math.sin(spin) + dir.y * Math.cos(spin)
    dir.set(dx, dy, 0)
    const reach = spread * (0.7 + hash(i, 4) * 0.9)
    // Anisotropic on purpose. This canvas is a wide band across the hero, so
    // an explosion as tall as it is wide forces the framing back to catch its
    // top and bottom and leaves the sides empty. Spreading along the band
    // instead lets the view sit far closer.
    p.away.set(
      p.home.x + dir.x * reach * 1.75,
      p.home.y + dir.y * reach * 0.6 + (hash(i, 5) - 0.5) * spread * 0.35,
      p.home.z + (hash(i, 3) - 0.5) * 1.4,
    )
    // Enough tumble to read as "come apart", not so much that a part loses
    // which way up it belongs and the silhouette stops being a desk.
    euler.set((hash(i, 6) - 0.5) * 2.1, (hash(i, 7) - 0.5) * 2.1, (hash(i, 8) - 0.5) * 2.1)
    p.awayQ.setFromEuler(euler).multiply(p.homeQ)
  })

  // How much frame the exploded state needs. Measured rather than guessed:
  // each part contributes its own bounding radius at its scattered position,
  // so `fit()` can pull the view back far enough that nothing leaves frame.
  let ex = 0
  let ey = 0
  for (const p of parts) {
    p.mesh.geometry.computeBoundingSphere()
    const r = p.mesh.geometry.boundingSphere?.radius ?? 0
    ex = Math.max(ex, Math.abs(p.away.x) + r)
    ey = Math.max(ey, Math.abs(p.away.y) + r)
  }
  const exploded = new THREE.Vector3(ex * 2, ey * 2, 0)

  return { rig, parts, size, exploded, materials: { screen, lamp } }
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function HeroRig({ className, dark }: { className?: string; dark: boolean }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = host.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      if (!renderer.getContext()) throw new Error('no context')
    } catch {
      return // No WebGL: Hero is written to be complete without this.
    }

    const scene = new THREE.Scene()
    // 32° is long enough that the hardware reads as machined objects rather
    // than a wide-angle caricature. The distance is not a constant — see
    // `fit()`, which recomputes it from the viewport on every resize.
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearAlpha(0)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'

    // Lighting is neutral-cool, matching the coal ground. It is deliberately
    // not tinted: the only saturated colour in this scene comes from the
    // screen and the lamps once the machine boots, and washing the rig in it
    // would
    // spend that moment before it arrives. Ambient stays low — on black the
    // risk is a flat, evenly-lit object with no modelling, and lighting a
    // subject in a dark room *is* the contrast.
    // Intensities are part of the two-palette split, not a constant. On coal
    // the lights are doing the modelling — nothing else separates the machine
    // from the page — so they run hot. On chalk that same rig blows the tower
    // out to paper white and the object dissolves into the background it is
    // supposed to sit on, so everything comes down and ambient comes up.
    // What matters is the *total*, not any one light: these are additive, and
    // a diffuse surface under ~4 units of illumination saturates regardless of
    // how dark its base colour is. The coal set sums to roughly eight, which
    // is what makes the machine read as lit in a dark room. The chalk set has
    // to come in under two, or the tower blows to paper white and the object
    // dissolves into the page — which is exactly what the first attempt did.
    const lit = dark
      ? { ambient: 0.38, hemi: 0.46, key: 3.2, fill: 1.2, rimA: 2.5, rimB: 0.85 }
      : { ambient: 0.2, hemi: 0.22, key: 0.72, fill: 0.26, rimA: 0.22, rimB: 0.12 }

    scene.add(new THREE.AmbientLight(0xeef0f2, lit.ambient))
    scene.add(new THREE.HemisphereLight(0xe8ecef, dark ? 0x14161a : 0xc9cbcd, lit.hemi))

    const key = new THREE.DirectionalLight(0xf6f8fa, lit.key)
    key.position.set(5, 6.5, 6)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x9aa4b2, lit.fill)
    fill.position.set(-6, 1, 4)
    scene.add(fill)

    // Rims carve the silhouette, and matter more here than anywhere else —
    // they are the only thing separating a dark edge from a dark page. The
    // lower rim carries a trace of the accent, which is the one place it is
    // allowed before the boot: it reads as bounce off the desk, not as a
    // second light source.
    const rimA = new THREE.DirectionalLight(0xffffff, lit.rimA)
    rimA.position.set(-4, 2.5, -6)
    scene.add(rimA)

    const rimB = new THREE.DirectionalLight(0xd9a184, lit.rimB)
    rimB.position.set(5, -2, -5)
    scene.add(rimB)

    const { rig, parts, size, exploded, materials } = buildWorkstation(dark)
    rig.position.set(0, -0.35, 0)
    scene.add(rig)

    // ── Framing ───────────────────────────────────────────────────────────
    // Distance is derived, not hard-coded: this canvas is 1024×420 on a small
    // laptop and 2000×900 on a studio display, and one fixed z that frames the
    // rig on one of those crops or strands it on the other.
    //
    // Two framings, not one. The exploded cloud is far wider than the
    // assembled desk, so a single distance either crops the explosion or
    // leaves the finished machine a speck. `tick` dollies between them as it
    // builds, which is also the shot: the view closes in as the thing becomes
    // a workstation.
    let nearZ = 10
    let farZ = 16

    const fit = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()

      const vFov = (camera.fov * Math.PI) / 180
      const dist = (bw: number, bh: number, margin: number) =>
        Math.max(
          (bh * margin) / 2 / Math.tan(vFov / 2),
          (bw * margin) / 2 / Math.tan(vFov / 2) / camera.aspect,
        )

      nearZ = Math.max(dist(size.x, size.y, 1.62), 3)
      farZ = Math.max(dist(exploded.x, exploded.y, 1.06), nearZ + 0.4)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(mount)

    // ── Input: scroll and pointer. Never a self-run loop. ─────────────────
    let shown = clamp(viewport.hero)
    let yaw = -0.3
    let pitch = 0.06

    // ── Test seam: pose the rig without scrolling ────────────────────────
    // Checking how the machine looks at 40% assembled means holding the page
    // at exactly 40%, and smooth scrolling makes that a fight — the scroller
    // eases toward a target, so a screenshot lands wherever the easing had
    // got to. This lets a checker set the pose directly. Pass null to hand
    // control back to the scroll position.
    let posed: number | null = null
    ;(mount as HTMLElement & { __poseRig?: (p: number | null) => void }).__poseRig = (p) => {
      posed = p === null ? null : clamp(p)
      // Snap rather than ease to it. The smoothing below exists to give scroll
      // input mass; a checker asking for "40% assembled" wants that pose in the
      // next frame, not forty frames later.
      if (posed !== null) shown = posed
    }

    const pos = new THREE.Vector3()
    const quat = new THREE.Quaternion()

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)

      // Smooth the scroll value rather than the scroll itself: stepping sixty
      // parts straight to a new pose stutters where lerping reads as mass.
      const target = posed ?? clamp(viewport.hero)
      shown += (target - shown) * 0.12
      if (Math.abs(target - shown) < 0.0004) shown = target
      // Test seam. "The rig is assembling" and "the rig is stuck at a
      // plausible pose" look identical in a screenshot, and a canvas answers
      // no DOM question. A property rather than a data attribute: this runs
      // every frame, and attribute writes would thrash layout for a test.
      ;(mount as HTMLElement & { __rig?: number }).__rig = shown

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        // Each group gets its own slice, so the build is sequential; the
        // slices overlap so it flows instead of ticking part by part. The
        // spans land the last part at ~0.92, leaving a beat at the end for the
        // machine to boot rather than finishing halfway down the runway.
        const start = (p.order / GROUPS) * 0.76
        const t = easeOut(clamp((shown - start) / 0.24))
        pos.lerpVectors(p.away, p.home, t)
        p.mesh.position.copy(pos)
        quat.slerpQuaternions(p.awayQ, p.homeQ, t)
        p.mesh.quaternion.copy(quat)
      }

      // Dolly in as it comes together.
      camera.position.z = farZ + (nearZ - farZ) * easeOut(clamp(shown))
      camera.lookAt(0, 0, 0)

      // ── It boots once it is whole ───────────────────────────────────────
      const live = easeOut(clamp((shown - 0.88) / 0.12))
      materials.lamp.emissiveIntensity = live * (dark ? 1.7 : 2.4)
      materials.screen.emissiveIntensity = live * (dark ? 0.22 : 0.34)

      // The rig turns to the pointer only once there is a machine to turn:
      // leaning a cloud of loose parts reads as drift, not as control.
      const targetYaw = -0.3 + viewport.pointerX * 0.28
      const targetPitch = 0.06 + viewport.pointerY * 0.14
      yaw += (targetYaw - yaw) * 0.06
      pitch += (targetPitch - pitch) * 0.06
      rig.rotation.y = yaw * live + (1 - live) * -0.18
      rig.rotation.x = pitch * live

      renderer.render(scene, camera)
    }
    tick()

    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
    }
    renderer.domElement.addEventListener('webglcontextlost', onLost)

    // Rendering stops entirely while the tab is hidden — the same budget the
    // background field is held to.
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) tick()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      renderer.domElement.removeEventListener('webglcontextlost', onLost)
      // GPU memory is not garbage collected — geometries and materials have to
      // be released by hand when the canvas unmounts.
      rig.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          ;(Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
    // Rebuilt on a theme change because the two material sets are genuinely
    // different values, not one set with a filter over it. `shown` starts from
    // the live scroll position rather than 0, so the machine does not fall
    // apart and rebuild itself when someone flips the toggle mid-page.
  }, [dark])

  return <div ref={host} aria-hidden="true" className={className} />
}
