import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react'
import { useHeroProgress } from '../hooks/useHeroProgress'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

// The rig carries its own three.js import. Splitting it keeps the hero's text
// — which is the part that actually has to be read — painting before a byte of
// WebGL is fetched.
const HeroRig = lazy(() => import('../three/HeroRig'))

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/in/nabeelshaikh0808', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/NabeelShaikh08', label: 'GitHub' },
  { icon: Mail, href: 'mailto:nabeelshk0808@gmail.com', label: 'Email' },
]

const name = 'Nabeel Shaikh'

/** Entrance timing for the whole hero, so it resolves as one movement rather
 *  than as eight independent animations. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

export default function Hero({ isDark }: { isDark: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px)')
  const [webgl, setWebgl] = useState(false)

  useEffect(() => setWebgl(supportsWebGL()), [])

  // Three independent reasons not to ship the rig, and all of them are real:
  // a visitor who asked for less motion, a phone where forty parts flying
  // apart is both illegible and expensive, and a browser without WebGL.
  const rig = webgl && wide && !reducedMotion

  // Writes scroll progress through this section into the shared viewport
  // object, which is what the rig's render loop reads. Harmless when the rig
  // never mounts — it just goes unread.
  useHeroProgress(sectionRef)

  return (
    <section
      ref={sectionRef}
      // The runway. The rig needs scroll distance to assemble over, so the
      // section is taller than the screen and pins its contents; without the
      // rig that extra height would be a long empty scroll to nowhere, so it
      // collapses back to a single screen.
      className={rig ? 'relative h-[240vh]' : 'relative'}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
        {rig && (
          <Suspense fallback={null}>
            <HeroRig dark={isDark} className="pointer-events-none absolute inset-x-0 bottom-[-4%] top-[22%] -z-[4]" />
          </Suspense>
        )}

        {/* Centre-weighted scrim, and it is doing more work than it used to.
            The rig assembles directly behind this type, so the middle band has
            to stay dark enough to read against a lit machine — the periphery
            is left open so the parts still fly through open space. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-[3] bg-[radial-gradient(ellipse_62%_54%_at_50%_46%,rgb(var(--veil)/0.92),rgb(var(--veil)/0.55)_52%,transparent_78%)]"
        />

        <motion.div
          variants={container}
          // Never hide the copy behind an animation that might not run. Under
          // reduced motion there is no entrance to play, so there is no
          // from-state to apply either — the hero simply renders, readable.
          initial={reducedMotion ? false : 'hidden'}
          animate="show"
          className="relative flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400"
          >
            <span className="h-px w-8 bg-ink-700" />
            Hey there, I'm
            <span className="h-px w-8 bg-ink-700" />
          </motion.p>

          <h1 className="mb-6 font-display text-[clamp(3rem,11vw,7.5rem)] leading-[0.9] tracking-tightest text-ink-900 dark:text-ink-50">
            {/* Split per character so the name assembles rather than fading in
                as a block; words stay in their own spans so lines still break. */}
            {name.split(' ').map((word, wordIndex) => (
              <span key={word} className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    initial={reducedMotion ? false : { opacity: 0, y: '0.4em', rotateX: -55 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.3 + wordIndex * 0.18 + charIndex * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.h2
            variants={item}
            className="mb-6 text-xl font-medium text-ink-600 md:text-2xl dark:text-ink-300"
          >
            AI Engineer at <span className="text-ink-900 dark:text-ink-50">Naptick</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mb-8 max-w-2xl text-balance text-lg leading-relaxed text-ink-500 dark:text-ink-300"
          >
            I build AI-powered products and full-stack applications. Currently working on
            RAG systems, autonomous AI agents, voice AI, and workflow automation. Based in Mumbai.
          </motion.p>

          <motion.div
            variants={item}
            className="mb-9 flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em]"
          >
            {/* The signal green, and this is the only thing it marks. It is a
                dot and a text colour — never a fill, and never a second
                accent competing with the acid on the button below. */}
            <span className="inline-flex items-center gap-2.5 text-accent-600 dark:text-accent-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500 dark:bg-accent-300" />
                <span className="relative h-2 w-2 rounded-full bg-accent-500 dark:bg-accent-300" />
              </span>
              Open to opportunities
            </span>
            <span className="h-4 w-px bg-ink-300 dark:bg-ink-700" />
            <span className="text-ink-400">Mumbai, India</span>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {/* One acid CTA per viewport. "See My Work" and "Resume" are
                deliberately quiet — two saturated buttons side by side is how
                an accent stops meaning anything. */}
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
            <a href="#projects" className="btn-secondary">
              See My Work
            </a>
            <a
              href="/NabeelResume.pdf"
              download="Nabeel_Shaikh_Resume.pdf"
              className="group inline-flex items-center gap-2 px-4 py-3.5 font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center justify-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="tap-target group relative grid h-11 w-11 place-items-center rounded-full text-ink-500 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:text-ink-900 dark:hover:text-ink-50"
              >
                <span className="absolute inset-0 scale-75 rounded-full opacity-0 ring-1 ring-transparent transition-all duration-500 ease-smooth group-hover:scale-100 group-hover:bg-[rgb(var(--hairline)/0.06)] group-hover:opacity-100 group-hover:ring-ink-700" />
                <Icon className="relative h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 transition-colors hover:text-ink-900 md:flex dark:hover:text-ink-50"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            {rig ? 'Scroll to assemble' : 'Scroll'}
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  )
}
