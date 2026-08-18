import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Hairline reading-progress bar across the top of the viewport. It doubles as
 * a legend for the field behind the page: the bar and the formation morph are
 * driven by the same scroll value, so the visitor can see that the two are
 * connected without being told.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-gradient-to-r from-primary-500 via-accent-400 to-primary-400"
    />
  )
}
