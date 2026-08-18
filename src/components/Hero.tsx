import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react'
import Orbit from './ui/Orbit'

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

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
      {/* Centre-weighted scrim. The field is meant to run edge to edge here,
          so this only darkens the middle band where the type sits and leaves
          the periphery of the screen fully open. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_66%_58%_at_50%_50%,rgb(var(--veil)/0.78),transparent_78%)]"
      />

      <Orbit
        size={720}
        className="absolute left-1/2 top-1/2 -z-[4] hidden -translate-x-1/2 -translate-y-1/2 opacity-40 md:block"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-[4] h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--brand)/0.14),transparent_65%)] blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-primary-500 dark:text-primary-400"
        >
          <span className="h-px w-8 bg-primary-500/60" />
          Hey there, I'm
          <span className="h-px w-8 bg-primary-500/60" />
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
                  initial={{ opacity: 0, y: '0.4em', rotateX: -55 }}
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
          AI Engineer at <span className="text-primary-600 dark:text-primary-400">Naptick</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mb-8 max-w-2xl text-balance text-lg leading-relaxed text-ink-500 dark:text-ink-400"
        >
          I build AI-powered products and full-stack applications. Currently working on
          RAG systems, autonomous AI agents, voice AI, and workflow automation. Based in Mumbai.
        </motion.p>

        <motion.div
          variants={item}
          className="mb-9 flex flex-wrap items-center justify-center gap-4 text-sm"
        >
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

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3"
        >
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

        <motion.div variants={item} className="mt-9 flex items-center justify-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative grid h-11 w-11 place-items-center rounded-full text-ink-500 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:text-primary-500"
            >
              <span className="absolute inset-0 scale-75 rounded-full opacity-0 ring-1 ring-primary-500/0 transition-all duration-500 ease-smooth group-hover:scale-100 group-hover:bg-primary-500/10 group-hover:opacity-100 group-hover:ring-primary-500/30" />
              <Icon className="relative h-[18px] w-[18px]" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 transition-colors hover:text-primary-500 md:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
