import { BufferAttribute, BufferGeometry, Sphere, Vector3 } from 'three'

/**
 * Geometry for the neural field.
 *
 * Every node carries four candidate positions — one per formation — and the
 * vertex shader blends between them from a single scroll uniform. Doing the
 * morph on the GPU means scrolling never touches the CPU: no per-frame
 * position writes, no buffer re-uploads, one draw call for the whole field.
 */

/** Seeded PRNG. A fixed layout across reloads reads as designed, not random. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type Formations = {
  /** Four Float32Arrays of xyz triples, one per formation. */
  positions: Float32Array[]
  scales: Float32Array
  seeds: Float32Array
  count: number
}

const SPREAD = 26

/**
 * Formation 0 — raw embedding shell. Unstructured points on a thick sphere,
 * the state of a vector space before anything has been learned from it.
 */
function shell(rng: () => number, count: number) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Even angular distribution; without the acos the poles bunch up.
    const theta = rng() * Math.PI * 2
    const phi = Math.acos(2 * rng() - 1)
    const r = SPREAD * (0.55 + rng() * 0.45)
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75
    out[i * 3 + 2] = r * Math.cos(phi)
  }
  return out
}

/**
 * Formation 1 — semantic clusters. Points collapse onto a handful of
 * centroids with a gaussian falloff: the same space after embedding, where
 * related things have found each other.
 */
function clusters(rng: () => number, count: number, centroidCount = 7) {
  const out = new Float32Array(count * 3)
  const centroids: number[][] = []
  for (let c = 0; c < centroidCount; c++) {
    centroids.push([
      (rng() - 0.5) * SPREAD * 1.7,
      (rng() - 0.5) * SPREAD * 1.05,
      (rng() - 0.5) * SPREAD * 1.7,
    ])
  }

  // Box–Muller: uniform RNG alone gives cube-shaped blobs, not clusters.
  const gaussian = () => {
    const u = Math.max(rng(), 1e-6)
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng())
  }

  for (let i = 0; i < count; i++) {
    const c = centroids[i % centroidCount]
    const spread = 2.2 + rng() * 2.4
    out[i * 3] = c[0] + gaussian() * spread
    out[i * 3 + 1] = c[1] + gaussian() * spread
    out[i * 3 + 2] = c[2] + gaussian() * spread
  }
  return out
}

/** Formation 2 — lattice. Ordered structure; the system under architecture. */
function lattice(rng: () => number, count: number) {
  const out = new Float32Array(count * 3)
  const side = Math.ceil(Math.cbrt(count))
  const step = (SPREAD * 1.9) / side
  for (let i = 0; i < count; i++) {
    const x = i % side
    const y = Math.floor(i / side) % side
    const z = Math.floor(i / (side * side)) % side
    // A touch of jitter keeps the grid from moiréing into stripes on screen.
    out[i * 3] = (x - side / 2) * step + (rng() - 0.5) * step * 0.35
    out[i * 3 + 1] = (y - side / 2) * step * 0.62 + (rng() - 0.5) * step * 0.35
    out[i * 3 + 2] = (z - side / 2) * step + (rng() - 0.5) * step * 0.35
  }
  return out
}

/** Formation 3 — helix. A timeline: structure resolved into a direction. */
function helix(rng: () => number, count: number) {
  const out = new Float32Array(count * 3)
  const turns = 5
  for (let i = 0; i < count; i++) {
    const t = i / count
    const strand = i % 2 === 0 ? 0 : Math.PI
    const angle = t * Math.PI * 2 * turns + strand
    const radius = SPREAD * 0.55 * (0.85 + rng() * 0.3)
    out[i * 3] = Math.cos(angle) * radius
    out[i * 3 + 1] = (t - 0.5) * SPREAD * 2.1
    out[i * 3 + 2] = Math.sin(angle) * radius
  }
  return out
}

export function buildFormations(count: number): Formations {
  const rng = mulberry32(0x5eed)
  const positions = [
    shell(rng, count),
    clusters(rng, count),
    lattice(rng, count),
    helix(rng, count),
  ]

  const scales = new Float32Array(count)
  const seeds = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // Skewed toward small: a few large nodes carry the composition, the rest
    // are dust. A uniform distribution reads as noise.
    scales[i] = 0.35 + Math.pow(rng(), 2.2) * 1.9
    seeds[i] = rng()
  }

  return { positions, scales, seeds, count }
}

export function buildPointsGeometry(f: Formations) {
  const geometry = new BufferGeometry()
  // `position` is required by three even though the shader ignores it and
  // reconstructs the point from the formation attributes instead.
  geometry.setAttribute('position', new BufferAttribute(f.positions[0], 3))
  f.positions.forEach((arr, i) => {
    geometry.setAttribute(`aPos${i}`, new BufferAttribute(arr, 3))
  })
  geometry.setAttribute('aScale', new BufferAttribute(f.scales, 1))
  geometry.setAttribute('aSeed', new BufferAttribute(f.seeds, 1))
  geometry.boundingSphere = new Sphere(new Vector3(), SPREAD * 3)
  return geometry
}

/**
 * Link geometry.
 *
 * Neighbours are chosen in the *first* formation — the state the hero shows.
 * That is the one frame every visitor is guaranteed to see, so the network
 * must read as a network there; later formations stretch these same pairs,
 * which is the point. Each vertex also carries its
 * partner's four positions, which lets the vertex shader measure how far a
 * link has been stretched by the current morph and fade it out — links
 * dissolve mid-transition and re-form, rather than smearing across the scene.
 */
export function buildLinksGeometry(f: Formations, linkNodes: number, perNode: number) {
  const source = f.positions[0]
  const n = Math.min(linkNodes, f.count)
  const pairs: [number, number][] = []

  for (let i = 0; i < n; i++) {
    // Nearest neighbours by brute force over the candidate subset. n is a few
    // hundred and this runs once at mount, so a spatial index would be
    // machinery without a payoff.
    const best: { j: number; d: number }[] = []
    const ix = source[i * 3]
    const iy = source[i * 3 + 1]
    const iz = source[i * 3 + 2]

    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const dx = source[j * 3] - ix
      const dy = source[j * 3 + 1] - iy
      const dz = source[j * 3 + 2] - iz
      const d = dx * dx + dy * dy + dz * dz
      if (best.length < perNode) {
        best.push({ j, d })
        best.sort((a, b) => a.d - b.d)
      } else if (d < best[best.length - 1].d) {
        best[best.length - 1] = { j, d }
        best.sort((a, b) => a.d - b.d)
      }
    }
    // i < j dedupes the pair, so each link is drawn once rather than twice.
    for (const b of best) if (i < b.j) pairs.push([i, b.j])
  }

  const vertexCount = pairs.length * 2
  const own: Float32Array[] = [0, 1, 2, 3].map(() => new Float32Array(vertexCount * 3))
  const partner: Float32Array[] = [0, 1, 2, 3].map(() => new Float32Array(vertexCount * 3))

  pairs.forEach(([a, b], k) => {
    for (let form = 0; form < 4; form++) {
      const src = f.positions[form]
      for (let e = 0; e < 2; e++) {
        const self = e === 0 ? a : b
        const other = e === 0 ? b : a
        const v = (k * 2 + e) * 3
        own[form][v] = src[self * 3]
        own[form][v + 1] = src[self * 3 + 1]
        own[form][v + 2] = src[self * 3 + 2]
        partner[form][v] = src[other * 3]
        partner[form][v + 1] = src[other * 3 + 1]
        partner[form][v + 2] = src[other * 3 + 2]
      }
    }
  })

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(own[0], 3))
  own.forEach((arr, i) => geometry.setAttribute(`aPos${i}`, new BufferAttribute(arr, 3)))
  partner.forEach((arr, i) => geometry.setAttribute(`aLink${i}`, new BufferAttribute(arr, 3)))
  geometry.boundingSphere = new Sphere(new Vector3(), SPREAD * 3)
  return geometry
}
