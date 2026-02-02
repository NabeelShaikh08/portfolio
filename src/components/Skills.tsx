import { Code, Database, Cloud, Wrench, Brain, Layers } from 'lucide-react';

const topSkills = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['React.js', 'Node.js', 'Next.js', 'NestJS', 'Express.js', 'Hugging Face', 'TensorFlow'],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MongoDB', 'ChromaDB', 'FAISS'],
  },
];

const bottomSkills = [
  {
    title: 'Cloud',
    icon: Cloud,
    skills: ['AWS S3', 'AWS EC2', 'AWS Bedrock', 'AWS SQS', 'AWS Amplify', 'Secrets Manager'],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub Actions', 'CI/CD', 'npm', 'Webhooks', 'Firebase', 'OAuth', 'Google Analytics', 'Tableau'],
  },
  {
    title: 'AI & ML',
    icon: Brain,
    skills: ['RAG', 'NLP', 'CNN', 'Model Fine-Tuning', 'STT/TTS', 'Semantic Search', 'LLM Integration', 'n8n'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-container">
        <p className="section-title">Skills</p>
        <h2 className="section-heading">Technologies I Work With</h2>

        <div className="relative">
          {/* Top row of cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-0">
            {topSkills.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`card group hover:shadow-lg hover:shadow-primary-500/5 w-full h-64 ${index % 2 === 0 ? 'bg-primary-50 dark:bg-primary-950/30' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Connector line down */}
                <div className="hidden md:block w-0.5 h-8 bg-primary-500" />
              </div>
            ))}
          </div>

          {/* Horizontal line */}
          <div className="hidden md:block w-full h-0.5 bg-primary-500 my-0" />

          {/* Bottom row of cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-0">
            {bottomSkills.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Connector line up */}
                <div className="hidden md:block w-0.5 h-8 bg-primary-500" />
                <div className={`card group hover:shadow-lg hover:shadow-primary-500/5 w-full h-64 ${index === 1 ? 'bg-primary-50 dark:bg-primary-950/30' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
