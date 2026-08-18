import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type Props = {
  /** Position in the deck; drives how far this card pins from the top. */
  index: number
  /** When true the card is not pinned and simply flows. */
  reducedMotion: boolean
  /** Layout classes for the card's own surface. */
  surfaceClassName?: string
  children: ReactNode
}

/**
 * One card in a sticky deck.
 *
 * Shared by Experience and Featured Work so the deck exists in exactly one
 * place. Two separate bugs came out of this pattern while building it, both
 * from the same root cause — anything that lowers a card's alpha stops it
 * occluding the card behind, and the deck collapses into several projects
 * legible through one another. Keeping it in one component means that class
 * of mistake can only be made once.
 *
 * Pinning is plain CSS sticky. The scale and the scrim are set per frame by
 * useCardStack, which finds these elements by their data attributes.
 *
 * Below the stacking breakpoint the card fades and rises in instead. That is
 * not decoration for its own sake — it replaces an entrance that was lost.
 * Reveal had to come off these cards because a card fading in cannot occlude
 * the one behind it, but that reasoning only applies where cards actually
 * overlap, and removing it everywhere left phones with no entrance at all.
 * The two are mutually exclusive by construction: stacking is lg and up, this
 * runs below it, so a fading card can never sit in a deck.
 */
export default function StackCard({
  index,
  reducedMotion,
  surfaceClassName = '',
  children,
}: Props) {
  const stacks = useMediaQuery('(min-width: 1024px)') && !reducedMotion

  return (
    <li
      className={reducedMotion ? undefined : 'lg:sticky'}
      style={{
        // Each card pins a little lower than the one before, so the deck fans
        // and you can see there are cards beneath. Capped, or a long list
        // would leave the top card halfway down the screen.
        top: `calc(6.5rem + ${Math.min(index, 5) * 0.5}rem)`,
      }}
    >
      <motion.div
        data-stack-card
        style={{ transformOrigin: 'center top' }}
        className="pb-4 sm:pb-6"
        initial={stacks ? false : { opacity: 0, y: 26 }}
        whileInView={stacks ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`group relative rounded-2xl p-5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)] ring-1 ring-black/[0.06] sm:rounded-3xl sm:p-7 md:p-10 dark:ring-white/[0.08] ${surfaceClassName}`}
          // Opaque on purpose. A translucent card cannot hide the one behind
          // it, and the whole effect depends on that.
          style={{ background: 'rgb(var(--veil-strong))' }}
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-8 h-0 w-px bg-primary-500 transition-all duration-500 ease-smooth group-hover:h-[calc(100%-4rem)]"
          />
          {/* Fades up as this card is buried, dimming it toward the page
              background without ever reducing its alpha. */}
          <span
            aria-hidden="true"
            data-stack-scrim
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 sm:rounded-3xl"
            style={{ background: 'rgb(var(--veil))' }}
          />
          {children}
        </div>
      </motion.div>
    </li>
  )
}
