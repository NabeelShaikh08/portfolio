import { motion } from 'framer-motion'
import { Brain, Code, Cpu, Database, Layers, Wrench } from 'lucide-react'
import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'

const skillGroups = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'Java', 'C/C++', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['React.js', 'Node.js', 'Next.js', 'NestJS', 'Express.js', 'Flutter', 'TensorFlow', 'Keras', 'FastAPI', 'Flask', 'Pydantic', 'OpenCV', 'Hugging Face'],
  },
  {
    title: 'Databases & Cloud',
    icon: Database,
    skills: ['MongoDB', 'Firestore', 'Redis', 'ChromaDB', 'FAISS', 'AWS S3', 'AWS EC2', 'AWS Bedrock', 'AWS SQS', 'AWS Amplify', 'Secrets Manager', 'Google Cloud Run', 'Cloud Storage'],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'npm (package author)', 'Webhooks', 'Firebase', 'OAuth', 'Google Analytics', 'Google File Search', 'Tableau'],
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

export default function Skills() {
  return (
    <section id="skills" className="section-veil">
      <div className="section-container">
        <Reveal>
          <p className="section-title">Skills</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-heading">Technologies I Work With</h2>
        </Reveal>

        <div className="relative">
          {/* Spine. The original layout drew literal connector lines between
              the two rows; this keeps that idea but reduces it to a single
              rail that draws itself in as the section enters. */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px origin-left bg-gradient-to-r from-transparent via-primary-500/40 to-transparent lg:block"
          />

          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index}>
                <TiltCard intensity={5}>
                  <div className="card group h-full">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25 transition-transform duration-500 ease-smooth group-hover:scale-110">
                        <group.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-ink-900 dark:text-white">{group.title}</h3>
                      <span className="ml-auto font-mono text-xs text-ink-400">
                        {String(group.skills.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
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
