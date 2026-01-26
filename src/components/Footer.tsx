import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/NabeelShaikh08',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/nabeelshaikh0808',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:nabeelshk0808@gmail.com',
    label: 'Email',
  },
];

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="inline-block">
              <img
                src="/header.png"
                alt="Nabeel Shaikh"
                className="h-16 w-auto"
              />
            </a>
            <p className="text-neutral-500 text-sm">
              AI Engineer & Full-Stack Developer building intelligent systems and scalable applications.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500 flex items-center gap-1">
              {currentYear} Nabeel Shaikh. Built with{' '}
              <Heart className="w-4 h-4 text-accent-500 fill-accent-500" /> using React & Tailwind.
            </p>
            <p className="text-sm text-neutral-500">
              Mumbai, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
