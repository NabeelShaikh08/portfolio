import { useEffect } from 'react'
import Lenis from 'lenis'
import { viewport } from '../lib/viewport'

/**
 * Installs Lenis smooth scrolling and keeps `viewport.progress` in sync.
 *
 * Also takes over anchor navigation: with Lenis running, a native `#hash`
 * jump teleports past the eased scroll and looks broken, so links are
 * intercepted and handed to Lenis instead.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      // Still track progress so the scene and progress bar work without Lenis.
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        viewport.progress = max > 0 ? window.scrollY / max : 0
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ({ progress }: { progress: number }) => {
      viewport.progress = progress
    })

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      const href = anchor?.getAttribute('href')
      if (!href?.startsWith('#')) return

      event.preventDefault()
      if (href === '#') {
        lenis.scrollTo(0)
        return
      }
      const target = document.querySelector(href)
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
    }
  }, [enabled])
}
