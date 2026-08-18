import { useEffect } from 'react'
import { viewport } from '../lib/viewport'

/**
 * Feeds normalised pointer coordinates into the shared viewport object so the
 * scene camera can parallax against them. No-ops on touch devices, where
 * there is no hover position to track.
 */
export function usePointerTracking() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (event: PointerEvent) => {
      viewport.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      viewport.pointerY = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
