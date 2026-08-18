import { useEffect, useRef, useState } from 'react'

type Props = {
  to: number
  decimals?: number
  /** Seconds the count takes once it starts. */
  duration?: number
}

/**
 * Counts up to a number the first time it scrolls into view.
 *
 * Driven by rAF against a timestamp rather than by a fixed per-frame
 * increment, so the run takes the same wall-clock time on a 60Hz and a 144Hz
 * display. Eased out, because a linear count reads like a loading spinner
 * while a decelerating one reads like a value settling.
 */
export default function Counter({ to, decimals = 0, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }

    let frame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / (duration * 1000), 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(to * eased)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, duration])

  return (
    <span ref={ref}>
      {/* tabular-nums stops the width jittering as digits change. */}
      <span className="tabular-nums">{value.toFixed(decimals)}</span>
    </span>
  )
}
