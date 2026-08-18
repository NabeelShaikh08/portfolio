import { useEffect, useState } from 'react'

/**
 * Reactive media query. Needed where a breakpoint has to be known in JS rather
 * than in CSS — the card deck, for instance, has to decide whether to animate
 * a card in, and that decision cannot be expressed as a class.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
