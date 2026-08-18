import { Award, GraduationCap } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'

/**
 * Two hairline rows rather than two boxed cards.
 *
 * The certifications entry is a single line; inside a full card it left a
 * large empty box that read as unfinished, and the card next to it was
 * padded out to match. A row carries one item as comfortably as ten, and it
 * puts this section on the same rhythm as Skills and Featured Work.
 */
export default function Education() {
  return (
    <section id="education" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">Education</p>
          </Reveal>
          <SplitText className="section-heading mx-auto">Academic Background</SplitText>
        </div>

        <ul className="mx-auto max-w-5xl divide-y divide-black/[0.07] dark:divide-white/[0.08]">
          <li>
            <Reveal>
              <div className="group relative grid gap-5 py-8 md:grid-cols-[minmax(190px,240px)_1fr] md:gap-10">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 top-8 h-0 w-px bg-primary-500 transition-all duration-500 ease-smooth group-hover:h-[calc(100%-4rem)]"
                />

                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20 transition-all duration-500 ease-smooth group-hover:scale-110 group-hover:bg-primary-500/15">
                    <GraduationCap className="h-[18px] w-[18px] text-primary-600 dark:text-primary-400" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight text-ink-900 dark:text-white">
                      Education
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                      2021 — 2025
                    </p>
                  </div>
                </div>

                <div className="md:pt-0.5">
                  <h4 className="text-lg font-semibold text-ink-900 dark:text-white">
                    Bachelor of Engineering
                  </h4>
                  <p className="font-medium text-primary-600 dark:text-primary-400">
                    Artificial Intelligence and Data Science
                  </p>
                  <p className="mt-1.5 text-sm text-ink-500">
                    Rizvi College of Engineering | 2021 - 2025
                  </p>

                  <div className="mt-4 inline-flex items-baseline gap-2 rounded-xl bg-primary-500/10 px-4 py-2 ring-1 ring-primary-500/20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                      CGPA
                    </span>
                    {/* Stated outright rather than counted up. It is an
                        academic result, and an animation that spends a second
                        showing a lower number than the real one is a poor
                        trade for a flourish. */}
                    <span className="font-display text-2xl text-ink-900 dark:text-white">8.1</span>
                    <span className="text-sm text-ink-500">/ 10</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>

          <li>
            <Reveal delay={1}>
              <div className="group relative grid gap-5 py-8 md:grid-cols-[minmax(190px,240px)_1fr] md:gap-10">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 top-8 h-0 w-px bg-accent-500 transition-all duration-500 ease-smooth group-hover:h-[calc(100%-4rem)]"
                />

                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-accent-500/10 ring-1 ring-accent-500/20 transition-all duration-500 ease-smooth group-hover:scale-110 group-hover:bg-accent-500/15">
                    <Award className="h-[18px] w-[18px] text-accent-600 dark:text-accent-400" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight text-ink-900 dark:text-white">
                      Certifications
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                      01 award
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 md:pt-1">
                  <li className="flex items-start gap-3 text-ink-600 dark:text-ink-400">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                    <span>Honors/Minor in AI/ML</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  )
}
