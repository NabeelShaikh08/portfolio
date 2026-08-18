type Props = {
  className?: string
  /** Diameter in pixels. */
  size?: number
}

/**
 * A wireframe armillary — three rings on different axes, turning at different
 * speeds inside a shared perspective.
 *
 * Built from CSS 3D rather than WebGL on purpose: the page already carries one
 * WebGL context for the field behind it, and a second context per section
 * would be a real cost for a decorative object. Nested `preserve-3d` rings do
 * the same job for the price of three divs, and they inherit the palette.
 */
export default function Orbit({ className = '', size = 220 }: Props) {
  const rings = [
    { rotate: 'rotateX(72deg) rotateY(0deg)', duration: '18s', inset: '0%' },
    { rotate: 'rotateX(72deg) rotateY(60deg)', duration: '26s', inset: '9%' },
    { rotate: 'rotateX(20deg) rotateY(115deg)', duration: '34s', inset: '18%' },
  ]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, perspective: size * 3.5 }}
    >
      <div className="relative h-full w-full preserve-3d animate-spin-slow">
        {rings.map((ring, index) => (
          <div
            key={index}
            className="absolute rounded-full border border-primary-500/30 dark:border-primary-400/30"
            style={{
              inset: ring.inset,
              transform: ring.rotate,
              animation: `spin ${ring.duration} linear infinite`,
            }}
          />
        ))}
        {/* Brass core, so the object has a centre of mass to turn around. */}
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400 shadow-[0_0_24px_6px_rgb(var(--brass)/0.5)]" />
      </div>
    </div>
  )
}
