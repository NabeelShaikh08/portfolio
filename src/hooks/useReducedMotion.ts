import { useEffect, useState } from 'react'

/**
 * Tracks `prefers-reduced-motion`. Used to skip the WebGL field entirely
 * rather than merely slowing it down — a particle field is decoration, and
 * the honest response to the setting is to not ship it.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
