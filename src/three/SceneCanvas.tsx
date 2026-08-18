import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralField from './NeuralField'

type Props = { dark: boolean }

/**
 * The WebGL canvas. Everything about it is budgeted:
 *
 *  - node count scales with the device, so phones draw a third of the field
 *  - DPR is capped at 1.75; a 3x retina buffer costs ~4x the fill rate and is
 *    indistinguishable on a soft particle field
 *  - antialiasing is off — points are already round and feathered by the
 *    fragment shader, so MSAA buys nothing but bandwidth
 *  - rendering stops entirely while the tab is hidden
 */
export default function SceneCanvas({ dark }: Props) {
  const [running, setRunning] = useState(true)

  const isCompact = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isCompact ? 1200 : 3400
  const linkNodes = isCompact ? 260 : 560

  useEffect(() => {
    const onVisibility = () => setRunning(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 46], fov: 55, near: 0.1, far: 200 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        // The field is drawn additively and never read back; skipping the
        // depth buffer saves memory and a clear every frame.
        depth: false,
        stencil: false,
      }}
      style={{ pointerEvents: 'none' }}
    >
      <NeuralField dark={dark} count={count} linkNodes={linkNodes} />
    </Canvas>
  )
}
