import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'
import type { RefObject } from 'react'
import { clamp, viewport } from '../lib/viewport'

/**
 * Scroll progress through a pinned hero, 0 to 1.
 *
 * The hero is taller than the viewport and its contents are sticky, so 0 is
 * the moment its top reaches the top of the screen and 1 is the moment it
 * releases. That span is the runway the workstation assembles over.
 *
 * Written to the shared viewport object as well as returned as a motion
 * value: the WebGL rig reads it in its own render loop without re-rendering,
 * while the DOM text drives its own motion from the returned value.
 *
 * Sampled per frame, for the same reason as everything else here — Lenis
 * coalesces native scroll events to roughly one per gesture.
 */
export function useHeroProgress(ref: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0)

  useEffect(() => {
    let frame = 0

    const loop = () => {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const runway = rect.height - window.innerHeight
        const value = runway > 0 ? clamp(-rect.top / runway) : 0
        progress.set(value)
        viewport.hero = value
      }
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [ref, progress])

  return progress
}
