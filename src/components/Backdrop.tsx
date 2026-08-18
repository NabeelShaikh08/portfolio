import { Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

// The three.js bundle is roughly three times the size of the rest of the app.
// Splitting it out lets the page render, paint and become readable before a
// byte of WebGL is fetched.
const SceneCanvas = lazy(() => import('../three/SceneCanvas'))

/** Cheap CSS stand-in shown before the scene loads, and instead of it when
 *  WebGL is unavailable or the visitor has asked for reduced motion. */
function StaticBackdrop() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(224,138,58,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(251,191,36,0.10),transparent_70%)]" />
    </div>
  )
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

export default function Backdrop({ dark }: { dark: boolean }) {
  const reducedMotion = useReducedMotion()
  const [webgl, setWebgl] = useState<boolean | null>(null)

  useEffect(() => setWebgl(supportsWebGL()), [])

  // Fixed rather than scrolling: one canvas serves the whole page, so the
  // field is a continuous space the content scrolls through.
  const shell = 'fixed inset-0 -z-10 pointer-events-none'

  if (reducedMotion || webgl === false) {
    return (
      <div className={shell} aria-hidden="true">
        <StaticBackdrop />
      </div>
    )
  }

  return (
    <div className={shell} aria-hidden="true">
      <Suspense fallback={<StaticBackdrop />}>{webgl && <SceneCanvas dark={dark} />}</Suspense>
    </div>
  )
}
