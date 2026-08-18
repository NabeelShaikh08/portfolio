import { BookOpen, Bone, Bot, Brain, ExternalLink, FileText, Github, Heart, Lock, Palmtree, Shirt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'

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
    <div className="mt-auto flex flex-wrap items-center gap-3 border-t pt-5 hairline">
      {project.github !== '#' && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-ink-900"
        >
          <Github className="h-4 w-4" />
          Code
        </a>
      )}
      {project.sourcePrivate && (
        <span className="inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-ink-500">
          <Lock className="h-4 w-4" />
          Private repo — client work
        </span>
      )}
      {project.live !== '#' && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-600 hover:ring-primary-500/50 dark:ring-white/15 dark:hover:text-primary-400"
        >
          <ExternalLink className="h-4 w-4" />
          {project.liveLabel ?? 'Demo'}
        </a>
      )}
    </div>
  )
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <div>
      <h4 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-md px-2 py-1 text-xs font-medium text-ink-600 ring-1 ring-black/5 dark:text-ink-400 dark:ring-white/10"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Highlights({ highlights }: { highlights: string[] }) {
  return (
    <div>
      <h4 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
        Key Features
      </h4>
      <ul className="space-y-2">
        {highlights.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-400">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500/70" />
            <span className="leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectHeader({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className="mb-5 flex items-start gap-4">
      <div
        className={`grid flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110 ${
          large ? 'h-16 w-16' : 'h-12 w-12'
        }`}
      >
        <project.icon className={large ? 'h-8 w-8 text-white' : 'h-6 w-6 text-white'} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-display leading-tight text-ink-900 dark:text-white ${
              large ? 'text-3xl md:text-4xl' : 'text-2xl'
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
        <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-400">
          {project.subtitle}
        </p>
      </div>
    </div>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="section-veil">
      <div className="section-container">
        <Reveal>
          <p className="section-title">Projects</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-heading">Featured Work</h2>
        </Reveal>

        {/* The flagship gets a full-width, two-column treatment. Giving every
            project identical weight is the fastest way to make none of them
            look important. */}
        <Reveal delay={2}>
          <TiltCard intensity={3}>
            <div className="card group mb-6 md:p-8">
              <ProjectHeader project={featured} large />
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <p className="leading-relaxed text-ink-600 dark:text-ink-400">
                    {featured.description}
                  </p>
                  <TechList tech={featured.tech} />
                  <ProjectLinks project={featured} />
                </div>
                <Highlights highlights={featured.highlights} />
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.title} delay={index % 2}>
              <TiltCard intensity={4}>
                <div className="card group flex h-full flex-col gap-5">
                  <ProjectHeader project={project} />
                  <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                    {project.description}
                  </p>
                  <Highlights highlights={project.highlights} />
                  <TechList tech={project.tech} />
                  <ProjectLinks project={project} />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
