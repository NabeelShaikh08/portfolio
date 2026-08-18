import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  /** Peak rotation in degrees at the card's corners. */
  intensity?: number
}

/**
 * Card that tilts toward the pointer and carries a specular highlight that
 * tracks it.
 *
 * The tilt is deliberately small. Past about eight degrees the text inside
 * starts to keystone and the card reads as a gimmick; under it, the card just
 * feels like a physical object catching the light.
 */
export default function TiltCard({ children, className = '', intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glowOpacity = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 })

  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(224,138,58,0.16), transparent 62%)`

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Coarse pointers have no hover state; on touch this would fire once on
    // tap and leave the card stuck mid-tilt.
    if (event.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    rotateY.set((px - 0.5) * intensity * 2)
    rotateX.set(-(py - 0.5) * intensity * 2)
    glowX.set(px * 100)
    glowY.set(py * 100)
    glowOpacity.set(1)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glowOpacity.set(0)
  }

  return (
    <div className="perspective h-full">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        {/* Highlight rides above the card's own background but below its
            content, and never intercepts pointer events. */}
        <motion.span
          aria-hidden="true"
          style={{ background: glow, opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />
      </motion.div>
    </div>
  )
}
