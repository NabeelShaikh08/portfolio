import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react'
import heroImg from '../assets/images/hero-img.jpg'
import Orbit from './ui/Orbit'

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/in/nabeelshaikh0808', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/NabeelShaikh08', label: 'GitHub' },
  { icon: Mail, href: 'mailto:nabeelshk0808@gmail.com', label: 'Email' },
]

const name = 'Nabeel Shaikh'

/** Entrance timing for the whole hero. Children inherit the stagger, so the
 *  hero resolves as one movement instead of eight independent animations. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 md:pt-32">
      {/* The hero is the only section with no frosted veil — the field reads
          at full strength here. This vignette is the minimum needed to hold
          the type legible over moving particles. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_50%_52%_at_28%_50%,rgb(var(--veil)/0.9),transparent_76%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-primary-500 dark:text-primary-400"
          >
            <span className="h-px w-8 bg-primary-500/60" />
            Hey there, I'm
          </motion.p>

          <h1 className="mb-5 font-display text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.92] tracking-tightest text-ink-900 dark:text-ink-50">
            {/* Split per character so the name assembles rather than fading in
                as a block. Words are kept in their own spans so the line can
                still break naturally. */}
            {name.split(' ').map((word, wordIndex) => (
              <span key={word} className="mr-[0.25em] inline-block whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: '0.4em', rotateX: -55 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.25 + wordIndex * 0.18 + charIndex * 0.035,
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
            className="mb-7 text-xl font-medium text-ink-600 md:text-2xl dark:text-ink-300"
          >
            AI Engineer at{' '}
            <span className="text-primary-600 dark:text-primary-400">Naptick</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mb-9 max-w-xl text-balance text-lg leading-relaxed text-ink-500 dark:text-ink-400"
          >
            I build AI-powered products and full-stack applications. Currently working on
            RAG systems, autonomous AI agents, voice AI, and workflow automation. Based in Mumbai.
          </motion.p>

          <motion.div variants={item} className="mb-10 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2.5 text-accent-600 dark:text-accent-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500" />
                <span className="relative h-2 w-2 rounded-full bg-accent-500" />
              </span>
              Open to opportunities
            </span>
            <span className="h-4 w-px bg-ink-300 dark:bg-ink-700" />
            <span className="text-ink-500">Mumbai, India</span>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
            <a href="#projects" className="btn-secondary">
              See My Work
            </a>
            <a
              href="/NabeelResume.pdf"
              download="Nabeel_Shaikh_Resume.pdf"
              className="group inline-flex items-center gap-2 px-4 py-3.5 font-medium text-ink-500 transition-colors hover:text-primary-600 dark:text-ink-400 dark:hover:text-primary-400"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Resume
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-2 border-t pt-8 hairline"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative grid h-11 w-11 place-items-center rounded-full text-ink-500 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:text-primary-500"
              >
                <span className="absolute inset-0 scale-75 rounded-full bg-primary-500/0 opacity-0 ring-1 ring-primary-500/0 transition-all duration-500 ease-smooth group-hover:scale-100 group-hover:bg-primary-500/8 group-hover:opacity-100 group-hover:ring-primary-500/30" />
                <Icon className="relative h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          variants={item}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative animate-float">
            <Orbit
              size={520}
              className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-60 md:block"
            />
            {/* Verdigris bloom behind the portrait, tying it to the field. */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(var(--brand)/0.3),transparent_68%)] blur-2xl"
            />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] ring-1 ring-black/5 dark:ring-white/10">
              <img
                src={heroImg}
                alt="Nabeel Shaikh"
                className="h-full w-full object-cover"
              />
              {/* Warm grade so the photo shares the page's temperature. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 via-transparent to-accent-400/15 mix-blend-multiply dark:mix-blend-overlay"
              />
            </div>

            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-black/5 bg-white/80 px-4 py-2.5 backdrop-blur-md dark:border-white/10 dark:bg-ink-900/80">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                Currently
              </p>
              <p className="text-sm font-medium text-ink-900 dark:text-white">
                Building AI agents
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 transition-colors hover:text-primary-500 md:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
