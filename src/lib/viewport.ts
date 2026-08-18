/**
 * Mutable viewport state shared between the DOM and the WebGL scene.
 *
 * Scroll and pointer move at frame rate. Routing them through React state
 * would re-render the whole tree 60 times a second, so they live here as a
 * plain mutable object: the DOM listeners write to it, `useFrame` reads from
 * it, and React never learns anything happened.
 */
export const viewport = {
  /** Document scroll progress, 0 at the top to 1 at the bottom. */
  progress: 0,
  /** Pointer position in normalised device coords, -1..1 on both axes. */
  pointerX: 0,
  pointerY: 0,
  /** Set while the pointer is over an interactive element. */
  hovering: false,
}

/** Number of section formations the field morphs between. */
export const FORMATIONS = 4

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Frame-rate independent damping, so easing feels identical at 60 and 144Hz. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))
