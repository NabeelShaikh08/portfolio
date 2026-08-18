import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight whichever section owns the middle of the viewport. A scroll
  // handler measuring offsets would do the same job but recompute layout on
  // every tick; the observer only fires on the crossings that matter.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ease-smooth md:px-6 ${
          isScrolled
            ? 'border border-black/5 bg-white/70 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/60'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <a href="#" className="block shrink-0" aria-label="Back to top">
          <img src="/header.png" alt="Nabeel Shaikh" className="h-14 w-auto md:h-16" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-ink-900 dark:text-white'
                    : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                }`}
              >
                {/* Shared layoutId lets the pill slide between items instead
                    of cross-fading, which is what makes the nav feel wired to
                    the scroll position. */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary-500/12 ring-1 ring-primary-500/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </a>
            )
          })}

          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="tap-target rounded-full p-2.5 text-ink-600 transition-colors hover:bg-black/5 dark:text-ink-300 dark:hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-black/5 bg-white/85 p-2 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-ink-950/80"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.3 }}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink-600 transition-colors hover:bg-primary-500/10 hover:text-primary-600 dark:text-ink-300 dark:hover:text-primary-300"
              >
                {link.name}
                <span className="font-mono text-xs text-ink-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ThemeToggle({ isDark, toggleTheme }: NavbarProps) {
  return (
    <button
      onClick={toggleTheme}
      className="tap-target relative ml-1 grid h-9 w-9 place-items-center overflow-hidden rounded-full text-ink-600 transition-colors hover:bg-black/5 dark:text-ink-300 dark:hover:bg-white/10"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? (
            <Sun className="h-[18px] w-[18px] text-accent-400" />
          ) : (
            <Moon className="h-[18px] w-[18px] text-primary-600" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
