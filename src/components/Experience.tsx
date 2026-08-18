import { useRef } from 'react'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useCardStack } from '../hooks/useCardStack'
import { useReducedMotion } from '../hooks/useReducedMotion'
import CareerTimeline from './CareerTimeline'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import StackCard from './ui/StackCard'

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
  const stackRef = useRef<HTMLOListElement>(null)
  const reducedMotion = useReducedMotion()

  useCardStack(stackRef, !reducedMotion)

  return (
    <section id="experience" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">Experience</p>
          </Reveal>
          <SplitText className="section-heading mx-auto">Where I've Worked</SplitText>
        </div>

        <Reveal>
          <CareerTimeline />
        </Reveal>

        {/*
          The roles are a deck, like Featured Work. The vertical spine and its
          scroll-fill that used to live here are gone deliberately: the chart
          directly above already states the chronology on a real time axis, so
          the spine was drawing a second, vaguer timeline immediately below a
          precise one. A spine cannot coexist with stacking anyway — pinned
          cards would slide over the line and its nodes.
        */}
        <ol ref={stackRef} className="mx-auto max-w-5xl">
          {experiences.map((exp, index) => (
            <StackCard
              key={`${exp.company}-${exp.role}`}
              index={index}
              reducedMotion={reducedMotion}
              surfaceClassName="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl leading-none text-ink-300 transition-colors duration-500 group-hover:text-primary-500/70 dark:text-ink-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110">
                    <Briefcase className="h-5 w-5 text-white" />
                  </span>
                </div>

                <div>
                  <div className="mb-2.5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-500/20 dark:text-primary-300">
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

                  <h3 className="font-display text-2xl leading-tight text-ink-900 md:text-3xl dark:text-white">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {exp.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="lg:pt-2">
                <h4 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  What I did
                </h4>
                <ul className="space-y-2.5">
                  {exp.description.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-sm text-ink-600 dark:text-ink-400"
                    >
                      <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StackCard>
          ))}
        </ol>
      </div>
    </section>
  )
}
