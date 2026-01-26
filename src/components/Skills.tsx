import { Code, Database, Cloud, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Code,
    skills: ['React.js', 'Node.js', 'Next.js', 'NestJS', 'Express.js', 'Hugging Face', 'TensorFlow'],
  },
  {
    title: 'Databases & Cloud',
    icon: Database,
    skills: [
      'MongoDB',
      'AWS S3',
      'AWS EC2',
      'AWS Bedrock',
      'AWS SQS',
      'AWS Amplify',
      'Secrets Manager',
      'ChromaDB',
      'FAISS',
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    skills: [
      'Git',
      'GitHub Actions',
      'CI/CD',
      'npm',
      'Webhooks',
      'Firebase',
      'OAuth',
      'Google Analytics',
      'Tableau',
    ],
  },
  {
    title: 'AI & ML',
    icon: Cloud,
    skills: [
      'RAG',
      'NLP',
      'CNN',
      'Model Fine-Tuning',
      'STT/TTS',
      'Semantic Search',
      'LLM Integration',
      'n8n Automation',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-container">
        <p className="section-title">Skills</p>
        <h2 className="section-heading">Technical Expertise</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="card group hover:shadow-lg hover:shadow-primary-500/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <category.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
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
          ))}
        </div>

        {/* Education & Certification */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="card">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white">
                  Bachelor of Engineering
                </h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  Artificial Intelligence and Data Science
                </p>
                <p className="text-neutral-500 text-sm">
                  Rizvi College of Engineering | 2021 - 2025
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                  CGPA: 8.1/10
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="card">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Certifications
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                <span>Honors/Minor in AI/ML</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
