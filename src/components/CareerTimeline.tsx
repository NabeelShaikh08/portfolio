import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Career timeline — a horizontal duration chart over a shared time axis.
 *
 * Form: the data's job is duration and overlap over time, which is a timeline
 * (Gantt), not a bar-by-category. Skill *counts* per category were the obvious
 * alternative and were rejected: "14 AI skills vs 4 embedded" is a vanity
 * number that says nothing true about depth.
 *
 * Colour: this is ONE series — every bar measures the same thing. Identity is
 * carried by the row label, so no categorical palette is used and none is
 * needed. The second colour marks *ongoing* roles, which is a state, not an
 * identity. Both marks were checked with the skill's validator against each
 * mode's real surface (lightness band, chroma floor, CVD separation,
 * normal-vision floor, contrast) rather than judged by eye — dark mode is its
 * own validated pair, not an automatic flip of the light one.
 */

type Role = {
  company: string
  role: string
  /** Inclusive start, as [year, month] with month 1-12. */
  start: [number, number]
  /** Exclusive end; null means the role is ongoing. */
  end: [number, number] | null
}

// Newest first, matching the order of the detailed cards directly below —
// a summary that reads in the opposite direction to the thing it summarises
// makes the reader do needless work.
const roles: Role[] = [
  { company: 'Keystone Vacations', role: 'Freelance Full-Stack & Mobile Developer', start: [2026, 7], end: null },
  { company: 'Naptick', role: 'AI Engineer', start: [2026, 1], end: null },
  { company: 'Naptick', role: 'AI Engineer Trainee', start: [2025, 7], end: [2025, 12] },
  { company: 'Aalishan Perfumes', role: 'Frontend Developer Intern', start: [2024, 7], end: [2024, 10] },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const toMonths = ([y, m]: [number, number]) => y * 12 + (m - 1)

const formatPoint = ([y, m]: [number, number]) => `${MONTHS[m - 1]} ${y}`

function formatSpan(months: number) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`)
  if (m) parts.push(`${m} mo`)
  return parts.join(' ') || '1 mo'
}

export default function CareerTimeline() {
  const [active, setActive] = useState<number | null>(null)

  const { rows, ticks, now } = useMemo(() => {
    // "Present" is resolved at render, so ongoing bars keep growing rather
    // than freezing at whatever date this was written.
    const today = new Date()
    const now: [number, number] = [today.getFullYear(), today.getMonth() + 1]

    const starts = roles.map((r) => toMonths(r.start))
    const ends = roles.map((r) => toMonths(r.end ?? now))
    // Three months of padding each side so the first and last bars are not
    // welded to the plot edges.
    const domainStart = Math.min(...starts) - 3
    const domainEnd = Math.max(...ends, toMonths(now)) + 3
    const domainSpan = domainEnd - domainStart

    const rows = roles.map((r) => {
      const s = toMonths(r.start)
      const e = toMonths(r.end ?? now)
      return {
        ...r,
        left: ((s - domainStart) / domainSpan) * 100,
        width: (Math.max(e - s, 1) / domainSpan) * 100,
        months: Math.max(e - s, 1),
        ongoing: r.end === null,
      }
    })

    // One tick per January in the domain — solid hairlines, never dashed.
    const ticks: { label: string; pos: number }[] = []
    const firstYear = Math.floor(domainStart / 12) + 1
    const lastYear = Math.floor(domainEnd / 12)
    for (let y = firstYear; y <= lastYear; y++) {
      const pos = ((y * 12 - domainStart) / domainSpan) * 100
      if (pos >= 0 && pos <= 100) ticks.push({ label: String(y), pos })
    }

    return { rows, ticks, now }
  }, [])

  return (
    <figure className="mb-16">
      <figcaption className="mb-6 text-center">
        <h3 className="font-display text-2xl text-ink-900 dark:text-white">Roles over time</h3>
        <p className="mt-1 text-sm text-ink-500">
          {formatPoint(roles[roles.length - 1].start)} — Present · overlapping bars are
          concurrent roles
        </p>
      </figcaption>

      <div className="card relative !p-6 md:!p-8">
        <div className="relative">
          {/* Gridlines sit behind the bars, one shade off the surface. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {ticks.map((t) => (
              <div
                key={t.label}
                className="absolute top-0 bottom-6 w-px bg-black/10 dark:bg-white/10"
                style={{ left: `${t.pos}%` }}
              />
            ))}
          </div>

          <ul className="relative space-y-3">
            {rows.map((row, i) => (
              <li
                key={`${row.company}-${row.role}`}
                className="group relative"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
              >
                <p className="mb-1.5 truncate text-sm font-medium text-ink-700 dark:text-ink-200">
                  {row.role}
                  <span className="ml-2 font-normal text-ink-500">{row.company}</span>
                </p>

                {/* Track. Hit target is the full-width row, not the bar. */}
                <div className="relative h-3.5 w-full rounded-full bg-black/[0.04] dark:bg-white/[0.05]">
                  <motion.div
                    className="absolute inset-y-0 rounded-[4px]"
                    style={{
                      left: `${row.left}%`,
                      background: row.ongoing
                        ? 'linear-gradient(90deg, var(--chart-bar), var(--chart-ongoing))'
                        : 'var(--chart-bar)',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.width}%` }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {row.ongoing && (
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full"
                      style={{
                        left: `calc(${row.left + row.width}% + 6px)`,
                        background: 'var(--chart-ongoing)',
                      }}
                    />
                  )}
                </div>

                {/* Tooltip. Bigger than the mark and clipped to the card. */}
                {active === i && (
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute -top-1 z-20 -translate-y-full rounded-xl px-3 py-2 text-xs shadow-lg ring-1 ring-black/10 dark:ring-white/15"
                    style={{
                      left: `clamp(0px, calc(${row.left + row.width / 2}% - 90px), calc(100% - 180px))`,
                      width: 180,
                      background: 'rgb(var(--veil-strong))',
                    }}
                  >
                    <p className="font-medium text-ink-900 dark:text-white">{row.company}</p>
                    <p className="mt-0.5 text-ink-500">
                      {formatPoint(row.start)} – {row.ongoing ? 'Present' : formatPoint(row.end!)}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-600 dark:text-primary-400">
                      {formatSpan(row.months)}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Axis */}
          <div className="relative mt-4 h-5">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
            {ticks.map((t) => (
              <span
                key={t.label}
                className="absolute top-1.5 -translate-x-1/2 font-mono text-[10px] tracking-wider text-ink-400"
                style={{ left: `${t.pos}%` }}
              >
                {t.label}
              </span>
            ))}
            <span className="absolute right-0 top-1.5 font-mono text-[10px] tracking-wider text-ink-400">
              {formatPoint(now)}
            </span>
          </div>
        </div>

        {/* Single series, so no legend — but the ongoing state is a second
            mark and must be named rather than left as colour alone. */}
        <p className="mt-5 flex items-center gap-2 text-xs text-ink-500">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{ background: 'var(--chart-ongoing)' }}
          />
          Still ongoing
        </p>
      </div>

      {/* Every chart gets a table equivalent; screen readers and anyone who
          cannot use the hover layer get the same numbers. */}
      <table className="sr-only">
        <caption>Roles over time</caption>
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Company</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.company}-${row.role}-data`}>
              <td>{row.role}</td>
              <td>{row.company}</td>
              <td>{formatPoint(row.start)}</td>
              <td>{row.ongoing ? 'Present' : formatPoint(row.end!)}</td>
              <td>{formatSpan(row.months)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
