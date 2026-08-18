import { Award, GraduationCap } from 'lucide-react'
import Counter from './ui/Counter'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import TiltCard from './ui/TiltCard'

export default function Education() {
  return (
    <section id="education" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">Education</p>
          </Reveal>
          <SplitText className="section-heading mx-auto">
            Academic Background
          </SplitText>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={2}>
            <TiltCard intensity={5}>
              <div className="card group h-full md:p-8">
                <div className="z-mid mb-6 flex items-center gap-3">
                  <div className="z-near grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-2xl text-ink-900 dark:text-white">Education</h3>
                </div>

                <h4 className="text-lg font-semibold text-ink-900 dark:text-white">
                  Bachelor of Engineering
                </h4>
                <p className="font-medium text-primary-600 dark:text-primary-400">
                  Artificial Intelligence and Data Science
                </p>
                <p className="mt-2 text-sm text-ink-500">Rizvi College of Engineering | 2021 - 2025</p>

                <div className="z-near mt-5 inline-flex items-baseline gap-2 rounded-xl bg-primary-500/10 px-4 py-2 ring-1 ring-primary-500/20">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    CGPA
                  </span>
                  <span className="font-display text-2xl text-ink-900 dark:text-white">
                    <Counter to={8.1} decimals={1} />
                  </span>
                  <span className="text-sm text-ink-500">/ 10</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={3}>
            <TiltCard intensity={5}>
              <div className="card group h-full md:p-8">
                <div className="z-mid mb-6 flex items-center gap-3">
                  <div className="z-near grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg shadow-accent-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-2xl text-ink-900 dark:text-white">
                    Certifications
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-ink-600 dark:text-ink-400">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                    <span>Honors/Minor in AI/ML</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
