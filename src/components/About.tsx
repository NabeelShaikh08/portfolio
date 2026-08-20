import { Brain, Code2, Cpu, Server, Smartphone, Workflow } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import TiltCard from './ui/TiltCard'

const highlights = [
  {
    icon: Brain,
    title: 'AI Systems',
    description: 'RAG architectures, semantic search, and deep learning for computer vision',
  },
  {
    icon: Server,
    title: 'Cloud Native',
    description: 'AWS services including Bedrock, EC2, S3, and Amplify',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description: 'Intelligent workflows using n8n for data collection and insights',
  },
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'MERN stack applications with modern UI/UX practices',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    description: 'Cross-platform apps with Flutter, including in-app chat experiences',
  },
  {
    icon: Cpu,
    title: 'Embedded',
    description: 'Raspberry Pi & ESP firmware with GPIO controls and Python scripting',
  },
]

export default function About() {
  return (
    <section id="about" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">About Me</p>
          </Reveal>
          <SplitText className="section-heading max-w-4xl text-balance mx-auto">
            Crafting intelligent solutions at the intersection of AI and web development
          </SplitText>
        </div>

        <div className="relative mx-auto max-w-3xl space-y-6">
            {/* Lead paragraph is set larger than the rest — the eye needs one
                obvious place to start in a five-paragraph column. */}
            <Reveal delay={2}>
              <p className="text-xl leading-relaxed text-ink-700 dark:text-ink-200">
                I am an <span className="font-medium text-ink-900 dark:text-white">AI Engineer</span> and
                full-stack developer with experience building production-ready web, mobile, and embedded
                systems, from applied AI and automation pipelines to Flutter apps and Raspberry Pi firmware.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="text-lg leading-relaxed text-ink-500 dark:text-ink-400">
                My work focuses on designing <span className="font-medium text-primary-600 dark:text-primary-400">RAG-based architectures</span> and
                <span className="font-medium text-primary-600 dark:text-primary-400"> autonomous AI agents</span> that plan and execute multi-step tasks,
                integrating cloud-native AI services on AWS, and building intelligent workflows using n8n for
                data collection, research, and insights.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <p className="text-lg leading-relaxed text-ink-500 dark:text-ink-400">
                I also train and deploy <span className="font-medium text-primary-600 dark:text-primary-400">deep learning models</span> for
                computer vision, containerizing them with Docker and shipping interactive demos to platforms like
                Hugging Face Spaces.
              </p>
            </Reveal>
            <Reveal delay={5}>
              <p className="text-lg leading-relaxed text-ink-500 dark:text-ink-400">
                I have hands-on experience integrating AI features such as semantic search, voice-based
                interactions, and end-to-end automation into production systems. I work closely with APIs,
                authentication mechanisms, CI/CD pipelines, and scalable backend services.
              </p>
            </Reveal>
            <Reveal delay={6}>
              <p className="text-lg leading-relaxed text-ink-500 dark:text-ink-400">
                I am a continuous learner who enjoys translating complex AI concepts into practical,
                user-facing solutions.
              </p>
            </Reveal>
        </div>

        <div className="relative mt-14">
          <div className="relative mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index + 2}>
                <TiltCard>
                  <div className="card group h-full overflow-hidden">
                    {/* Glow anchored to the card's own plane, so it stays put
                        while the layers above it move. */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-500/20 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="z-near mb-4">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110">
                        <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <h3 className="z-mid mb-2 font-semibold text-ink-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="z-far text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
