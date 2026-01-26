import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'nabeelshk0808@gmail.com',
    href: 'mailto:nabeelshk0808@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8291557008',
    href: 'tel:+918291557008',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, India',
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/nabeelshaikh0808',
    color: 'hover:text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/30',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/NabeelShaikh08',
    color: 'hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:nabeelshk0808@gmail.com',
    color: 'hover:text-accent-600 hover:bg-accent-100 dark:hover:bg-accent-900/30',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-neutral-50 dark:bg-neutral-900/50">
      <div className="section-container">
        <p className="section-title">Contact</p>
        <h2 className="section-heading">Let's Work Together</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Info */}
          <div className="space-y-8">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              I'm always interested in hearing about new opportunities, especially those
              centered on applied AI, intelligent systems, and full-stack development.
              Feel free to reach out!
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                Connect with me
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 transition-all duration-200 ${link.color}`}
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="card">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
              Send a Message
            </h3>
            <form
              action="https://formspree.io/f/xnjddany"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-neutral-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-neutral-900 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none text-neutral-900 dark:text-white"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary justify-center"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
