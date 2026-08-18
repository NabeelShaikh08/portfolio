import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger position within a group, in steps of 70ms. */
  delay?: number
  y?: number
  className?: string
}

/**
 * Scroll-triggered entrance. One component for every reveal on the site, so
 * distance, duration and easing stay identical section to section — the
 * consistency is what reads as choreography rather than as effects.
 *
 * `once` matters: re-animating on every scroll-past is the single most common
 * way a scroll-driven site becomes tiring to use.
 */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.85,
        delay: delay * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
