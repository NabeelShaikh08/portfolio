import { motion } from 'framer-motion'
import { Brain, Code, Cpu, Database, Layers, Wrench } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'

const skillGroups = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'Java', 'C/C++', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['React.js', 'Node.js', 'Next.js', 'NestJS', 'Express.js', 'Flutter', 'Tailwind CSS', 'Three.js', 'GSAP', 'TensorFlow', 'Keras', 'FastAPI', 'Flask', 'Pydantic', 'OpenCV', 'Hugging Face'],
  },
  {
    title: 'Databases & Cloud',
    icon: Database,
    skills: ['MongoDB', 'Firestore', 'Redis', 'ChromaDB', 'FAISS', 'AWS S3', 'AWS EC2', 'AWS Bedrock', 'AWS SQS', 'AWS Amplify', 'Secrets Manager', 'Google Cloud Run', 'Cloud Storage'],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Puppeteer', 'npm (package author)', 'Webhooks', 'Firebase', 'OAuth', 'Google Analytics', 'Google File Search', 'Tableau'],
  },
  {
    title: 'AI & ML',
    icon: Brain,
    skills: ['RAG', 'AI Agents', 'Tool Calling', 'NLP', 'CNN', 'Computer Vision', 'YOLO', 'Object Detection', 'Transfer Learning', 'Model Fine-Tuning', 'STT/TTS', 'Semantic Search', 'LLM Integration', 'n8n'],
  },
  {
    title: 'Embedded Systems',
    icon: Cpu,
    skills: ['Raspberry Pi', 'ESP', 'GPIO Programming', 'Python Firmware'],
  },
]

const marqueeSkills = skillGroups.flatMap((group) => group.skills)

export default function Skills() {
  return (
    <section id="skills" className="section-veil">
      <div className="section-container">
        <div className="section-head">
          <Reveal>
            <p className="section-title">Skills</p>
          </Reveal>
          <SplitText className="section-heading mx-auto">
            Technologies I Work With
          </SplitText>
        </div>

        {/*
          Six boxed cards put a border around every group and made a long list
          of tags feel cramped. Rows divided by hairlines carry the same
          content with far less chrome: the category label holds a fixed
          column so the eye has one edge to scan down, and the tags get the
          rest of the width to breathe.
        */}
        <ul className="mx-auto max-w-5xl divide-y divide-black/[0.07] dark:divide-white/[0.08]">
          {skillGroups.map((group, index) => (
            <li key={group.title}>
              <Reveal delay={index}>
                <div className="group relative grid gap-4 py-6 sm:gap-5 sm:py-8 md:grid-cols-[minmax(190px,240px)_1fr] md:gap-10">
                  {/* Accent rail — grows out of the row's top edge on hover,
                      so the hover target reads as the whole row. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-8 h-0 w-px bg-primary-500 transition-all duration-500 ease-smooth group-hover:h-[calc(100%-4rem)]"
                  />

                  <div className="flex items-center gap-3.5">
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20 transition-all duration-500 ease-smooth group-hover:scale-110 group-hover:bg-primary-500/15">
                      <group.icon className="h-[18px] w-[18px] text-primary-600 dark:text-primary-400" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl leading-tight text-ink-900 dark:text-white">
                        {group.title}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        {String(group.skills.length).padStart(2, '0')} tools
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:pt-1">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.45, delay: i * 0.022, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Every technology in one moving band. The list is rendered twice so
            the -50% keyframe lands exactly on the seam and the loop is
            invisible; the copy is hidden from assistive tech. */}
        <div className="fade-x relative mt-12 overflow-hidden py-2">
          <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
            {[0, 1].map((pass) => (
              <div key={pass} className="flex gap-3" aria-hidden={pass === 1}>
                {marqueeSkills.map((skill) => (
                  <span
                    key={`${pass}-${skill}`}
                    className="whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-500 ring-1 ring-black/5 dark:text-ink-400 dark:ring-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
