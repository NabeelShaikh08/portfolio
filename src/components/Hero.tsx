import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
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
      <div
        className={`sticky top-0 flex h-[100svh] justify-center overflow-hidden px-6 ${
          // With the copy gone the block is short, and centring it vertically
          // dropped the name straight onto the monitor. It belongs at the top:
          // the name reads first, the machine assembles underneath it, and the
          // two never occupy the same band.
          rig ? 'items-start pt-28' : 'items-center py-24'
        }`}
      >
        {rig && (
          <Suspense fallback={null}>
            <HeroRig dark={isDark} className="pointer-events-none absolute inset-x-0 bottom-[-4%] top-[22%] -z-[4]" />
          </Suspense>
        )}

        {/* A top band only. The left band that used to sit alongside it existed
            to carry the pitch copy over the tower, and it was what made the
            CPU almost invisible — it was covering the machine to keep words
            readable. With the copy gone there are no words down there to
            protect, so the veil stops at the name and the whole machine,
            tower included, is left to read. */}
        <div
          aria-hidden="true"
          className={
            rig
              ? 'absolute inset-0 -z-[3] bg-[linear-gradient(180deg,rgb(var(--veil))_0%,rgb(var(--veil)/0.92)_22%,rgb(var(--veil)/0.35)_38%,transparent_52%)]'
              : 'absolute inset-0 -z-[3] bg-[radial-gradient(ellipse_62%_54%_at_50%_46%,rgb(var(--veil)/0.92),rgb(var(--veil)/0.55)_52%,transparent_78%)]'
          }
        />

        <motion.div
          variants={container}
          // Never hide the copy behind an animation that might not run. Under
          // reduced motion there is no entrance to play, so there is no
          // from-state to apply either — the hero simply renders, readable.
          initial={reducedMotion ? false : 'hidden'}
          animate="show"
          className={
            rig
              ? 'relative flex w-full max-w-6xl flex-col items-start text-left'
              : 'relative flex w-full max-w-4xl flex-col items-center text-center'
          }
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400"
          >
            {!rig && <span className="h-px w-8 bg-ink-700" />}
            Hey there, I'm
            <span className="h-px w-8 bg-ink-700" />
          </motion.p>

          {/* Sized for Syne, and given its own measure. Syne is a noticeably
              wider design than the face it replaced, and at the old scale the
              name broke onto two lines and collided with the copy beneath it.
              Shrinking it to fit the 4xl column was the wrong fix — a name is
              not body text and does not belong in the body's measure. It gets
              the page width; the prose keeps its 4xl column, which is also
              what stops the hero reading as one undifferentiated centred
              stack. Measured against the real rendered width, not guessed:
              Syne sets "Nabeel Shaikh" at 9.17× its font size with this
              tracking, so 1180px is the widest line 7.75rem can hold. */}
          <h1 className="mb-5 w-full max-w-[1180px] font-display text-[clamp(2.25rem,9.5vw,7.75rem)] leading-[0.92] tracking-tightest text-ink-900 dark:text-ink-50">
            {/* Split per character so the name assembles rather than fading in
                as a block; words stay in their own spans so lines still break. */}
            {name.split(' ').map((word, wordIndex) => (
              <span key={word} className="mr-[0.3em] inline-block whitespace-nowrap last:mr-0">
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

          {/* The role line, the pitch paragraph, the availability row and the
              three buttons all used to live here, and all of them are gone.
              They were what forced the copy over the machine in the first
              place, and every one of them already exists further down the
              page: the role and the pitch open About, availability and the
              call to action are the whole of Contact, and the résumé now sits
              in the header where it is reachable from any section rather than
              only from the top. A hero that states a name over a machine
              assembling itself does not need to also be a summary. */}

          <motion.div variants={item} className={`flex items-center gap-2 ${rig ? 'mt-3 justify-start' : 'mt-9 justify-center'}`}>
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
          className={`absolute bottom-8 hidden flex-col gap-2 text-ink-400 transition-colors hover:text-ink-900 md:flex dark:hover:text-ink-50 ${
            rig ? 'left-6 items-start lg:left-[max(1.5rem,calc((100vw-72rem)/2))]' : 'left-1/2 -translate-x-1/2 items-center'
          }`}
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
