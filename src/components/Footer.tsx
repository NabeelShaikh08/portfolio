import { motion } from 'framer-motion'
import { Github, Heart, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/NabeelShaikh08', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/nabeelshaikh0808', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:nabeelshk0808@gmail.com', label: 'Email' },
]

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="section-veil border-t hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-10 md:grid-cols-3"
        >
          <div className="space-y-4">
            <a href="#" className="inline-block" aria-label="Back to top">
              <img src="/header.png" alt="Nabeel Shaikh" className="h-16 w-auto" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-ink-500">
              AI Engineer & Full-Stack Developer building intelligent systems and scalable applications.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-ink-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <span className="h-px w-0 bg-primary-500 transition-all duration-300 group-hover:w-4" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
              Connect
            </h4>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl text-ink-500 ring-1 ring-black/10 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:text-primary-600 hover:ring-primary-500/40 dark:ring-white/10 dark:hover:text-primary-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 hairline md:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-ink-500">
            {currentYear} Nabeel Shaikh. Built with{' '}
            <Heart className="h-4 w-4 fill-accent-500 text-accent-500" /> using React, Three.js & Tailwind.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400">Mumbai, India</p>
        </div>
      </div>
    </footer>
  )
}
