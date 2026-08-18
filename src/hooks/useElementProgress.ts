import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'
import type { RefObject } from 'react'
import { clamp } from '../lib/viewport'

/**
 * Progress of an element through the viewport, as a motion value from 0 to 1.
 *
 * Sampled on every animation frame rather than from scroll events, for two
 * measured reasons:
 *
 *  - Lenis drives scrolling from its own rAF loop and coalesces native scroll
 *    events down to roughly one per gesture. A single 500px wheel gesture on
 *    this page fires one `scroll` event, which is plenty for an on/off
 *    threshold like the navbar's but far too coarse for a value that has to
 *    track the scrollbar continuously.
 *  - framer-motion's `useScroll({ target })` resolves its scroll container by
 *    walking offset parents, and warns here that it cannot find a positioned
 *    one — the section wrappers use `backdrop-filter`, which turns an element
 *    into a containing block. Measuring the rect directly needs no container
 *    at all, so there is nothing to resolve and nothing to warn about.
 *
 * The cost is one `getBoundingClientRect` per frame for a single element.
 */
export function useElementProgress(
  ref: RefObject<HTMLElement | null>,
  startAt = 0.65,
  endAt = 0.6,
) {
  const progress = useMotionValue(0)

  useEffect(() => {
    let frame = 0

    const loop = () => {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight

        // Progress 0 when the top edge sits at `startAt`; progress 1 when the
        // bottom edge reaches `endAt`. The span between those two states is
        // the element's own height plus the gap between the thresholds.
        const span = rect.height + (startAt - endAt) * vh
        const travelled = startAt * vh - rect.top

        progress.set(clamp(travelled / Math.max(span, 1)))
      }
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [ref, startAt, endAt, progress])

  return progress
}
