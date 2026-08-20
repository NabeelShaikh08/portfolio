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
          <span key={`${w}-${index}`}>
            {/* The word-space lives *outside* the mask. Inside it, the trailing
                space was clipped but still measured: it occupied width at the
                end of every line, so a centred heading sat visibly off-centre
                and the rag was wrong by one space on every line.

                The vertical padding is the other half of it. A mask tight to
                the line box cuts descenders — the "g" in "intelligent" lost
                its tail — so the box is opened below and pulled back up by the
                same amount, which buys the room without moving the baseline. */}
            <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
              <motion.span className="inline-block" variants={word}>
                {w}
              </motion.span>
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
