import { BookOpen, Bone, Bot, Brain, ExternalLink, FileText, Github, Heart, Lock, Palmtree, Shirt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { useCardStack } from '../hooks/useCardStack'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import StackCard from './ui/StackCard'

type Project = {
  title: string
  subtitle: string
  description: string
  highlights: string[]
  tech: string[]
  icon: LucideIcon
  github: string
  live: string
  /** Pill shown beside the title — used to mark client work apart from personal projects. */
  badge?: string
  /** Client repos stay closed; say so rather than leaving an unexplained gap where Code sits. */
  sourcePrivate?: boolean
  /** Label for the live link when "Demo" is the wrong word. */
  liveLabel?: string
}

const projects: Project[] = [
  {
    title: 'Keystone Vacations',
    subtitle: 'Membership Platform — Cross-Platform App, Cloud Backend & Marketing Site',
    description:
      'An end-to-end platform for a vacation-membership club, digitising everything that follows an offline membership sale: field enrollment with KYC and signature capture, generated application PDFs, bookings drawn against a nights ledger, EMI and payment tracking, referrals and reporting. A single Flutter codebase serves iOS and Android across three roles, on a NestJS backend running on Google Cloud Run.',
    highlights: [
      'Shipped a Flutter app for iOS and Android serving three roles (SuperAdmin, Admin, Customer), including a 7-step field-enrollment flow with section-level autosave and resume',
      'Built the NestJS + Firestore backend on Cloud Run with server-side RBAC on every route, a nights ledger derived on read rather than stored as a counter, EMI schedules and seven CSV reports',
      'Designed KYC around data minimisation — only the last four digits of an ID number are ever stored, with documents held in a CMEK-encrypted bucket reachable only through short-lived, audit-logged tokens',
      'Designed and deployed the public marketing site in Next.js 16 and React 19, live in production on Firebase Hosting',
    ],
    tech: ['Flutter', 'Dart', 'NestJS', 'TypeScript', 'Firestore', 'Cloud Run', 'Cloud Storage', 'Next.js', 'React', 'Tailwind CSS', 'GitHub Actions'],
    icon: Palmtree,
    badge: 'Freelance',
    github: '#',
    sourcePrivate: true,
    live: 'https://thekeystonevacations.com/',
    liveLabel: 'Visit Site',
  },
  {
    title: 'SARTOR',
    subtitle: 'Real-Time Formal Attire Detection with YOLO26',
    description:
      'A computer-vision app that judges whether a person is dressed formally or casually — and explains why. A custom-trained YOLO26 model detects individual garments (shirt, tie, jacket, trousers, shoes), and a transparent rule layer turns those detections into an explainable verdict. Supports image upload, video, and live webcam.',
    highlights: [
      'Trained a YOLO26 object detector on a filtered Fashionpedia dataset to localize 8 garment classes',
      'Explainable rule-based formality engine that scores garments and justifies each verdict',
      'Three input modes (image, video, live webcam) served in-process via FastAPI, deployed on Hugging Face',
    ],
    tech: ['Python', 'YOLO26', 'Ultralytics', 'FastAPI', 'OpenCV', 'Docker', 'Hugging Face'],
    icon: Shirt,
    github: 'https://github.com/NabeelShaikh08/Formal-Detector',
    live: 'https://nabeelshk-formal-detector.hf.space',
  },
  {
    title: 'SCRIBE',
    subtitle: 'Autonomous AI Agent for Business Document Generation',
    description:
      'An autonomous AI agent that turns a single natural-language request into a polished Microsoft Word document. It plans its own task list, writes each section, self-reviews the content, and calls real tools for dates and budgets — all behind a FastAPI service with a custom web frontend.',
    highlights: [
      'Autonomous Plan → Execute → Reflect → Build loop with an LLM-generated task list',
      'Reflection self-check that scores each section and rewrites weak ones, backed by retry and model-fallback logic',
      'Native tool-calling for real dates and exact budget math, exporting a styled .docx via python-docx',
    ],
    tech: ['Python', 'FastAPI', 'Groq / Llama 3.3', 'Pydantic', 'python-docx', 'Docker', 'Hugging Face'],
    icon: FileText,
    github: 'https://github.com/NabeelShaikh08/Autonomus_Doc_Agent',
    live: 'https://huggingface.co/spaces/nabeelshk/Autonomus_Doc_Agent',
  },
  {
    title: 'BoneScan AI',
    subtitle: 'VGG16 Transfer Learning for X-ray Fracture Classification',
    description:
      'A deep-learning web app that classifies bone X-rays as oblique or spiral fractures using a VGG16 transfer-learning model. Containerized with Docker and deployed as a live, interactive demo on Hugging Face Spaces.',
    highlights: [
      'Applied transfer learning on a pre-trained VGG16 model for medical X-ray fracture classification',
      'Built a Flask web app with drag-and-drop upload, live preview, and animated confidence bars',
      'Containerized with Docker and deployed a live demo on Hugging Face Spaces',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'VGG16', 'Flask', 'Docker', 'Hugging Face'],
    icon: Bone,
    github: 'https://github.com/NabeelShaikh08/Image-Classification',
    live: 'https://huggingface.co/spaces/nabeelshk/bonescan-fracture-classifier',
  },
  {
    title: 'Ragnius',
    subtitle: 'Intelligent Chat Agent with Bedrock RAG Architecture',
    description:
      'A knowledge-grounded AI chatbot using Amazon Bedrock, combining Claude Sonnet for natural language generation and Titan Embeddings for semantic search to enable real-time, contextually rich conversations.',
    highlights: [
      'Built modular RAG system delivering accurate, domain-specific insights',
      'Supports future features like file uploads, multilingual support, and user personalization',
      'Real-time contextual conversations with semantic search capabilities',
    ],
    tech: ['Amazon Bedrock', 'Claude Sonnet', 'Titan Embeddings', 'RAG', 'Python'],
    icon: Bot,
    github: '#',
    live: '#',
  },
  {
    title: 'Life-Fit Healthcare',
    subtitle: 'Healthcare Services Platform',
    description:
      'A comprehensive healthcare platform designed to showcase medical services, company mission, and contact information in a visually engaging, user-friendly manner with modern UI/UX practices.',
    highlights: [
      'Unified visual design with parallax backgrounds and glassmorphism styling',
      'Responsive interface optimized for mobile and desktop devices',
      'Interactive service cards, mission statements, and impact metrics',
    ],
    tech: ['React.js', 'React Router', 'CSS Modules', 'CSS Variables', 'Responsive Design'],
    icon: Heart,
    github: 'https://github.com/NabeelShaikh08/Life-Fit-Healthcare',
    live: '#',
  },
  {
    title: 'CNN Image Classifier',
    subtitle: 'Custom Deep Learning Model for Produce Classification',
    description:
      'A custom Convolutional Neural Network (CNN) model built from scratch for image classification, trained to accurately distinguish between apples and tomatoes with high precision and recall.',
    highlights: [
      'Built custom CNN architecture optimized for produce classification',
      'Implemented data preprocessing, augmentation, and model training pipeline',
      'Achieved high accuracy in binary classification between apples and tomatoes',
    ],
    tech: ['Python', 'TensorFlow', 'CNN', 'Deep Learning', 'Image Classification'],
    icon: Brain,
    github: 'https://github.com/NabeelShaikh08/cnn-model',
    live: '#',
  },
  {
    title: 'BookHub',
    subtitle: 'Full-Stack Book Review Platform',
    description:
      'A secure and scalable book review platform with advanced search, post, and CRUD functionality. Features JWT authentication, role-based access control, and an intuitive user experience.',
    highlights: [
      'Integrated JWT authentication and role-based access control',
      'MongoDB for secure and scalable data management',
      'Cookie-based sessions, real-time alerts, and responsive interface',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'Express.js'],
    icon: BookOpen,
    github: 'https://github.com/NabeelShaikh08/BookHub',
    live: '#',
  },
]

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      {project.github !== '#' && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-ink-900"
        >
          <Github className="h-4 w-4" />
          Code
        </a>
      )}
      {project.sourcePrivate && (
        <span className="inline-flex items-center gap-2 py-2 text-sm font-medium text-ink-500">
          <Lock className="h-4 w-4" />
          Private repo — client work
        </span>
      )}
      {project.live !== '#' && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-600 hover:ring-primary-500/50 dark:ring-white/15 dark:hover:text-primary-400"
        >
          <ExternalLink className="h-4 w-4" />
          {project.liveLabel ?? 'Demo'}
        </a>
      )}
    </div>
  )
}

/** Small caps label used above each block of specs. */
function SpecLabel({ children }: { children: string }) {
  return (
    <h4 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
      {children}
    </h4>
  )
}

export default function Projects() {
  const stackRef = useRef<HTMLOListElement>(null)
  const reducedMotion = useReducedMotion()

  // Stacking is desktop-only. On a phone the cards are nearly viewport-tall,
  // and pinning them there turns a simple scroll into a fight, so the sticky
  // class carries an lg: prefix and below that width they simply flow.
  //
  // The reduced-motion half is decided here rather than in CSS: an earlier
  // version gated it with :has(), which is not supported everywhere, and a
  // guard that silently fails on some browsers is not a guard.
  useCardStack(stackRef, !reducedMotion)

  return (
    <section id="projects" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">Projects</p>
          </Reveal>
          <SplitText className="section-heading mx-auto">Featured Work</SplitText>
        </div>

        {/*
          Eight bordered cards in a two-column grid put a box around a
          description, four bullets and eleven tags each — the content was all
          there but it read as a wall. Full-width rows divided by hairlines
          give every project the page width: the narrative on the left, the
          specs on the right, and an index number to scan by. Order carries
          the hierarchy, so the lead project needs no separate layout — only a
          larger title.
        */}
        <ol ref={stackRef} className="mx-auto max-w-5xl">
          {projects.map((project, index) => {
            const isLead = index === 0
            return (
              <StackCard
                key={project.title}
                index={index}
                reducedMotion={reducedMotion}
                surfaceClassName="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14"
              >

                    {/* Narrative */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-3xl leading-none text-ink-300 transition-colors duration-500 group-hover:text-primary-500/70 dark:text-ink-700">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110">
                          <project.icon className="h-5 w-5 text-white" />
                        </span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3
                            className={`font-display leading-tight text-ink-900 dark:text-white ${
                              isLead ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
                            }`}
                          >
                            {project.title}
                          </h3>
                          {project.badge && (
                            <span className="whitespace-nowrap rounded-full bg-accent-500/15 px-2.5 py-0.5 text-xs font-medium text-accent-700 ring-1 ring-accent-500/25 dark:text-accent-300">
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm font-medium text-primary-600 dark:text-primary-400">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="leading-relaxed text-ink-600 dark:text-ink-400">
                        {project.description}
                      </p>

                      <ProjectLinks project={project} />
                    </div>

                    {/* Specs */}
                    <div className="flex flex-col gap-7 lg:pt-2">
                      <div>
                        <SpecLabel>Key Features</SpecLabel>
                        <ul className="space-y-2.5">
                          {project.highlights.map((line) => (
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

                      <div>
                        <SpecLabel>Tech Stack</SpecLabel>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((item) => (
                            <span
                              key={item}
                              className="rounded-md px-2 py-1 text-xs font-medium text-ink-600 ring-1 ring-black/5 dark:text-ink-400 dark:ring-white/10"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
              </StackCard>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
