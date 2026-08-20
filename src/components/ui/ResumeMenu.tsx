import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Download } from 'lucide-react'

/**
 * The résumé is two documents, not one — an India CV and a UAE one — so the
 * header button asks which before it downloads anything.
 *
 * It is a menu rather than two buttons side by side. Two equal buttons in the
 * header would read as two unrelated actions and would push the nav wider on
 * every viewport, when in truth this is one action with a parameter.
 *
 * The panel is fully opaque. A translucent menu is fine over body copy but
 * this one opens directly over a 124px headline, and at 95% the letterforms
 * read straight through the options.
 *
 * Closing is handled three ways because a menu that can only be dismissed by
 * choosing something is a trap: Escape, a click anywhere outside, and choosing
 * an option all close it. Focus returns to the trigger on Escape, or the
 * keyboard user is stranded at the end of the document.
 */

export type ResumeVariant = {
  label: string
  /** Shown under the label — which market this version is written for. */
  note: string
  href: string
  downloadAs: string
}

export const RESUMES: ResumeVariant[] = [
  {
    label: 'India',
    note: 'Mumbai-based roles',
    href: '/NabeelResumeIndia.pdf',
    downloadAs: 'Nabeel_Shaikh_Resume_India.pdf',
  },
  {
    label: 'Dubai / UAE',
    note: 'Gulf-based roles',
    href: '/NabeelResumeUAE.pdf',
    downloadAs: 'Nabeel_Shaikh_Resume_UAE.pdf',
  },
]

export default function ResumeMenu({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-600 ring-1 ring-black/10 transition-all duration-300 hover:text-ink-900 hover:ring-black/20 dark:text-ink-300 dark:ring-white/15 dark:hover:text-white dark:hover:ring-white/30"
      >
        <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        Resume
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-60 origin-top-right overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-ink-900"
          >
            <p className="px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
              Which version?
            </p>
            {RESUMES.map((r) => (
              <a
                key={r.label}
                role="menuitem"
                href={r.href}
                download={r.downloadAs}
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-primary-500/10"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-300 transition-colors group-hover:text-primary-600 dark:text-ink-600 dark:group-hover:text-primary-400" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink-900 dark:text-ink-50">
                    {r.label}
                  </span>
                  <span className="block text-xs text-ink-500 dark:text-ink-400">{r.note}</span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
