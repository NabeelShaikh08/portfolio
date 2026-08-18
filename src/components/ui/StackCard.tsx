import type { ReactNode } from 'react'

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
 */
export default function StackCard({
  index,
  reducedMotion,
  surfaceClassName = '',
  children,
}: Props) {
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
      <div data-stack-card style={{ transformOrigin: 'center top' }} className="pb-6">
        <div
          className={`group relative rounded-3xl p-8 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)] ring-1 ring-black/[0.06] md:p-10 dark:ring-white/[0.08] ${surfaceClassName}`}
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
            className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0"
            style={{ background: 'rgb(var(--veil))' }}
          />
          {children}
        </div>
      </div>
    </li>
  )
}
