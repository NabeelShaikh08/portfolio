import { motion } from 'framer-motion'

type Props = {
  children: string
  className?: string
  /** Seconds between each word. */
  stagger?: number
  delay?: number
  as?: 'h2' | 'h3' | 'p'
}

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const word = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

/**
 * Reveals a line word by word, each word rising out of its own clipping mask.
 *
 * The trigger deliberately lives on the unclipped wrapper rather than on the
 * words. Each word starts translated 110% down — which puts it fully outside
 * its `overflow-hidden` parent — so an observer attached to the word itself
 * would never see it intersect, and it would stay hidden forever waiting to
 * become visible. Observing the wrapper and letting the words inherit the
 * variant breaks that deadlock.
 */
export default function SplitText({
  children,
  className = '',
  stagger = 0.045,
  delay = 0,
  as: Tag = 'h2',
}: Props) {
  const words = children.split(' ')

  return (
    <Tag className={className}>
      {/* The line is exposed once as a plain string; the split spans are
          hidden from assistive tech so it is never read word by word. */}
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={container(stagger, delay)}
      >
        {words.map((w, index) => (
          <span key={`${w}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}
              {index < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
