import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useElementProgress } from '../hooks/useElementProgress'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import TiltCard from './ui/TiltCard'

const experiences = [
  {
    company: 'Keystone Vacations',
    role: 'Freelance Full-Stack & Mobile Developer',
    type: 'Freelance',
    duration: 'July 2026 - Present',
    location: 'Remote',
    description: [
      'Building an end-to-end membership, booking and customer-servicing platform — a single Flutter codebase shipping to both iOS and Android, serving SuperAdmin, Admin and Customer roles',
      'Architected the NestJS + Firestore backend on Google Cloud Run with server-side role-based access control, a nights ledger derived on every read, EMI and payment tracking, and seven CSV reports, deployed continuously through GitHub Actions',
      'Designed the KYC pipeline around data minimisation — storing only the last four digits of an ID number, with documents held in a CMEK-encrypted bucket behind short-lived, audit-logged access tokens',
      'Designed and shipped the public marketing site in Next.js and React, live in production on Firebase Hosting',
    ],
    current: true,
  },
  {
    company: 'Naptick',
    role: 'AI Engineer',
    type: 'Full-time',
    duration: 'January 2026 - Present',
    location: 'Mumbai',
    description: [
      'Developed Raspberry Pi firmware with boot scripts and GPIO controls and built a BullMQ push notification system for scheduled and real-time events, enhancing user engagement, and architected a shared tools layer for reusable logic across chat, voice, and device services',
      'Developed and maintained Flutter app features including chat experiences and architected GitHub Actions CI/CD pipelines with AWS Secrets Manager to automate deployments and enhance security',
    ],
    current: true,
  },
  {
    company: 'Naptick',
    role: 'AI Engineer Trainee',
    type: 'Full-time',
    duration: 'July 2025 - December 2025',
    location: 'Mumbai',
    description: [
      'Engineered and launched the company\'s primary website and a full-stack MERN waitlist platform, integrating Stripe and Razorpay payment systems alongside automated onboarding emails and referral links to streamline user acquisition',
      'Automated social media workflows using n8n and AI-driven pipelines, adding intelligent search, deep research, and voice interactions',
      'Built the app\'s authentication system (email/password, Google OAuth, Apple OAuth)',
      'Implemented fully automated social media content generation focused on sleep awareness and healthier habits',
    ],
    current: false,
  },
  {
    company: 'Aalishan Perfumes',
    role: 'Frontend Developer Intern',
    type: 'Internship',
    duration: 'July 2024 - October 2024',
    location: 'Mumbai',
    description: [
      'Engineered high-performance, responsive web interfaces using React.js and Tailwind CSS, resulting in 30% uplift in user engagement',
      'Redesigned UI themes to reflect evolving brand identity and design systems, enhancing user retention',
      'Delivered cohesive, modern user experience with extended session durations',
    ],
    current: false,
  },
]

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Fill the spine in step with how far the section has been read. Anchored
  // to the track itself, so it reaches full height exactly as the last card
  // clears the viewport regardless of how many entries there are.
  const trackProgress = useElementProgress(trackRef)
  const fill = useSpring(trackProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="experience" className="section-veil">
      <div className="section-container">
        <Reveal>
          <p className="section-title">Experience</p>
        </Reveal>
        <SplitText className="section-heading">Where I've Worked</SplitText>

        <div ref={trackRef} className="relative">
          {/* Unfilled track */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-200 md:left-1/2 md:-translate-x-1/2 dark:bg-ink-800"
          />
          {/* Filled portion. The wrapper carries the positioning because
              framer-motion writes `transform` inline on the motion element,
              which would otherwise clobber Tailwind's -translate-x-1/2. */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              style={{ scaleY: fill }}
              className="h-full w-full origin-top bg-gradient-to-b from-primary-500 via-accent-400 to-primary-500"
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            {experiences.map((exp, index) => {
              const onLeft = index % 2 === 0
              return (
                <div key={`${exp.company}-${exp.role}`} className="relative md:grid md:grid-cols-2 md:gap-12">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 z-10 grid h-[15px] w-[15px] place-items-center md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="absolute inset-0 rounded-full bg-primary-500 ring-4 ring-[rgb(var(--veil))]" />
                    {exp.current && (
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500" />
                    )}
                  </span>

                  <div
                    className={`ml-8 md:ml-0 ${
                      onLeft ? 'md:pr-4 md:text-left' : 'md:col-start-2 md:pl-4'
                    }`}
                  >
                    <motion.div
                      style={{ perspective: 1400 }}
                      initial={{ opacity: 0, rotateY: onLeft ? -22 : 22, y: 28 }}
                      whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                      viewport={{ once: true, margin: '-90px' }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <TiltCard intensity={4}>
                        <div className="card">
                          <div className="z-mid mb-4 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-500/20 dark:text-primary-300">
                              <Briefcase className="h-3.5 w-3.5" />
                              {exp.company}
                            </span>
                            <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-500 ring-1 ring-black/10 dark:text-ink-400 dark:ring-white/10">
                              {exp.type}
                            </span>
                            {exp.current && (
                              <span className="rounded-full bg-accent-500/15 px-3 py-1 text-sm font-medium text-accent-700 ring-1 ring-accent-500/25 dark:text-accent-300">
                                Current
                              </span>
                            )}
                          </div>

                          <h3 className="z-near mb-3 font-display text-2xl leading-tight text-ink-900 dark:text-white">
                            {exp.role}
                          </h3>

                          <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-ink-500">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {exp.duration}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </span>
                          </div>

                          <ul className="z-far space-y-2.5">
                            {exp.description.map((line) => (
                              <li
                                key={line}
                                className="flex items-start gap-3 text-ink-600 dark:text-ink-400"
                              >
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500/70" />
                                <span className="leading-relaxed">{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
