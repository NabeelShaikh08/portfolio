import { useState } from 'react'
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import TiltCard from './ui/TiltCard'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'nabeelshk0808@gmail.com', href: 'mailto:nabeelshk0808@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 8291557008', href: 'tel:+918291557008' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India', href: null },
]

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/nabeelshaikh0808' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/NabeelShaikh08' },
  { icon: Mail, label: 'Email', href: 'mailto:nabeelshk0808@gmail.com' },
]

/** Shared input styling. Focus is signalled by a copper ring rather than the
 *  browser default, so it matches the rest of the page. */
const field =
  'w-full rounded-xl bg-black/[0.03] px-4 py-3.5 text-ink-900 outline-none ring-1 ring-black/10 transition-all duration-300 placeholder:text-ink-400 focus:bg-transparent focus:ring-2 focus:ring-primary-500 dark:bg-white/[0.04] dark:text-white dark:ring-white/10'

const FORM_ENDPOINT = 'https://formspree.io/f/xnjddany'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [state, setState] = useState<SubmitState>('idle')

  /**
   * Submits in place rather than letting the browser navigate to Formspree's
   * own thank-you page, which threw the visitor off the site at exactly the
   * moment they had decided to get in touch.
   *
   * The <form> keeps its action and method, so with JavaScript unavailable
   * this handler never runs and the plain HTML submit still works.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setState('submitting')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <section id="contact" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">Contact</p>
          </Reveal>
          <SplitText className="section-heading mx-auto">
            Let's Work Together
          </SplitText>
        </div>

        <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <div className="relative space-y-10">
            <Reveal delay={2}>
              <p className="max-w-lg text-xl leading-relaxed text-ink-600 dark:text-ink-300">
                I'm always interested in hearing about new opportunities, especially those
                centered on applied AI, intelligent systems, and full-stack development.
                Feel free to reach out!
              </p>
            </Reveal>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <Reveal key={item.label} delay={index + 3}>
                  <div className="group flex items-center gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]">
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20 transition-transform duration-500 ease-smooth group-hover:scale-110">
                      <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="tap-target break-all font-medium text-ink-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-ink-900 dark:text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={6}>
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
                  Connect with me
                </p>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="tap-target group relative grid h-12 w-12 place-items-center rounded-xl ring-1 ring-black/10 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:text-primary-600 hover:ring-primary-500/40 dark:ring-white/10 dark:hover:text-primary-400"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={3}>
            <TiltCard intensity={3}>
              <div className="card md:p-8">
                <h3 className="z-mid mb-6 font-display text-2xl text-ink-900 dark:text-white">
                  Send a Message
                </h3>
                <form
                  action={FORM_ENDPOINT}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400"
                    >
                      Name
                    </label>
                    <input type="text" id="name" name="name" required className={field} placeholder="Your name" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400"
                    >
                      Email
                    </label>
                    <input type="email" id="email" name="email" required className={field} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className={`${field} resize-none`}
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* aria-live so the outcome is announced, not just shown. */}
                  <div aria-live="polite" className="min-h-[1.25rem]">
                    {state === 'success' && (
                      <p className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                        Thanks — your message is on its way. I'll reply soon.
                      </p>
                    )}
                    {state === 'error' && (
                      <p className="flex items-start gap-2 text-sm text-accent-700 dark:text-accent-300">
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          That didn't send. Please try again, or email me directly at{' '}
                          <a href="mailto:nabeelshk0808@gmail.com" className="underline">
                            nabeelshk0808@gmail.com
                          </a>
                          .
                        </span>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
