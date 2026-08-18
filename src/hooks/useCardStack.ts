import { useEffect } from 'react'
import type { RefObject } from 'react'
import { clamp } from '../lib/viewport'

/**
 * Drives the "buried card" look for a sticky stack.
 *
 * CSS `position: sticky` does the pinning on its own — this only supplies the
 * depth cue. For each card it measures how much of it the *next* card has
 * covered, then scales it down and fades up a scrim inside it, so a card
 * visibly settles back as the one after it slides over. Without it the stack
 * reads as flat sheets sliding past each other rather than a deck.
 *
 * The dimming is a scrim and deliberately NOT opacity. Lowering a card's
 * opacity makes it translucent, and a translucent card cannot hide the card
 * behind it — the deck showed three projects through one another. The scrim
 * blends a card toward the page background while it stays fully opaque.
 *
 * Measured per frame rather than from scroll events: Lenis coalesces those to
 * roughly one per gesture — a single 500px wheel gesture fires one scroll
 * event — which is far too coarse for a value that must track continuously.
 *
 * Writes straight to style rather than through React state; this runs at frame
 * rate and must never re-render the tree.
 */
export function useCardStack(containerRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-stack-card]'),
    )
    if (!cards.length) return

    const scrimOf = (card: HTMLElement) =>
      card.querySelector<HTMLElement>('[data-stack-scrim]')

    // When disabled, make sure nothing is left mid-transform from a previous
    // run — a stale scale would otherwise persist for the whole session.
    if (!enabled) {
      cards.forEach((card) => {
        card.style.transform = ''
        const scrim = scrimOf(card)
        if (scrim) scrim.style.opacity = '0'
      })
      return
    }

    let frame = 0

    const loop = () => {
      // Cheap gate before the expensive part. Reading every card's rect costs
      // a forced layout each, and with eight projects that is sixteen reads a
      // frame — paid even when the visitor is up in the hero or down in the
      // footer. One rect on the container answers "is any of this on screen?"
      // for a sixteenth of the cost.
      //
      // An IntersectionObserver would be the textbook gate here, and it is not
      // used on purpose: the section wrappers use backdrop-filter, and an
      // observer on content inside them never reported as intersecting when
      // this was tried elsewhere in the page.
      const bounds = container.getBoundingClientRect()
      const onScreen = bounds.bottom > 0 && bounds.top < window.innerHeight
      if (!onScreen) {
        frame = requestAnimationFrame(loop)
        return
      }

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const next = cards[i + 1]

        let covered = 0
        if (next) {
          const rect = card.getBoundingClientRect()
          const nextRect = next.getBoundingClientRect()
          // 0 while the next card is still below; 1 once it has ridden all
          // the way up over this one.
          covered = clamp((rect.bottom - nextRect.top) / Math.max(rect.height, 1))
        }

        // Deliberately small. Past a few percent the text inside starts to
        // visibly shrink and the effect turns into a distraction.
        card.style.transform = `scale(${1 - covered * 0.05})`
        const scrim = scrimOf(card)
        if (scrim) scrim.style.opacity = String(covered * 0.55)
      }
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      cards.forEach((card) => {
        card.style.transform = ''
        const scrim = scrimOf(card)
        if (scrim) scrim.style.opacity = '0'
      })
    }
  }, [containerRef, enabled])
}
