import { Brain, Server, Workflow, Code2 } from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI Systems',
    description: 'RAG architectures, semantic search, and voice-based AI interactions',
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
];

export default function About() {
  return (
    <section id="about" className="bg-white dark:bg-neutral-900/50">
      <div className="section-container">
        <p className="section-title">About Me</p>
        <h2 className="section-heading">
          Crafting intelligent solutions at the intersection of AI and web development
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text content */}
          <div className="space-y-6">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I am an <span className="text-neutral-900 dark:text-white font-medium">AI Engineer</span> with
              strong experience building applied AI systems and automation pipelines, complemented by a
              solid full-stack background.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              My work focuses on designing <span className="text-primary-500 font-medium">RAG-based architectures</span>,
              integrating cloud-native AI services on AWS, and building intelligent workflows using n8n for
              data collection, research, and insights.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I have hands-on experience integrating AI features such as semantic search, voice-based
              interactions, and end-to-end automation into production systems. I work closely with APIs,
              authentication mechanisms, CI/CD pipelines, and scalable backend services.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I am a continuous learner who enjoys translating complex AI concepts into practical,
              user-facing solutions.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="card group hover:shadow-lg hover:shadow-primary-500/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
