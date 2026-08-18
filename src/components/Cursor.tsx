import { useEffect, useRef, useState } from 'react'

/**
 * Two-part cursor: a small dot pinned to the pointer, and a ring that lags
 * behind it and swells over interactive elements.
 *
 * Positioned imperatively in a rAF loop rather than through React state —
 * a cursor that re-renders the tree on every pointermove is worse than no
 * custom cursor at all. The native cursor is only hidden once this one is
 * confirmed active, so a device that never reaches this code keeps its own.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setActive(true)

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...pointer }
    let hovering = false
    let frame = 0

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY

      const target = event.target as HTMLElement | null
      hovering = Boolean(target?.closest('a, button, input, textarea, [data-cursor="hover"]'))
    }

    const render = () => {
      // Exponential follow gives the ring weight; the dot stays exact so
      // precision targeting never suffers.
      ring.x += (pointer.x - ring.x) * 0.16
      ring.y += (pointer.y - ring.y) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        const scale = hovering ? 1.9 : 1
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
        ringRef.current.style.opacity = hovering ? '0.9' : '0.45'
      }
      frame = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!active) return null

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-primary-400"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-primary-400/70 transition-[width,height] duration-300"
      />
    </>
  )
}
