import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent dark:from-primary-900/20 dark:via-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Intro line */}
        <p className="text-neutral-500 dark:text-neutral-400 mb-4 font-mono text-sm">
          Hey there, I'm
        </p>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
          Nabeel Shaikh
        </h1>

        {/* Role with accent */}
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
          AI Engineer at{' '}
          <span className="text-primary-600 dark:text-primary-400">Naptick</span>
        </h2>

        {/* Description - more personal and specific */}
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mb-8 leading-relaxed">
          I build AI-powered products and full-stack applications. Currently working on
          RAG systems, voice AI, and workflow automation. Based in Mumbai.
        </p>

        {/* Status + Location inline */}
        <div className="flex flex-wrap items-center gap-4 mb-10 text-sm">
          <span className="inline-flex items-center gap-2 text-accent-600 dark:text-accent-400">
            <span className="w-2 h-2 bg-accent-500 rounded-full" />
            Open to opportunities
          </span>
          <span className="text-neutral-400">|</span>
          <span className="text-neutral-500 dark:text-neutral-500">
            Mumbai, India
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <a href="#contact" className="btn-primary">
            Get in Touch
          </a>
          <a href="#projects" className="btn-secondary">
            See My Work
          </a>
          <a
            href="/NabeelResume.pdf"
            download="Nabeel_Shaikh_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Social links - minimal */}
        <div className="flex items-center gap-5 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <a
            href="https://linkedin.com/in/nabeelshaikh0808"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/NabeelShaikh08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:nabeelshk0808@gmail.com"
            className="text-neutral-500 hover:text-accent-500 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
