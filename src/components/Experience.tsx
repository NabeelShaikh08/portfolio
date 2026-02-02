import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'Naptick',
    role: 'AI Engineer',
    type: 'Full-time',
    duration: 'January 2026 - Present',
    location: 'Mumbai',
    description: [
      'Integrated CI/CD pipelines using GitHub Actions across all services for automated testing and deployment',
      'Implemented AWS Secrets Manager for secure credential management across all backend services',
      'Built automated routine generation system that creates personalized daily routines for users based on their preferences and sleep patterns',
    ],
    current: true,
  },
  {
    company: 'Naptick',
    role: 'AI Engineer Trainee',
    type: 'Full-time',
    duration: 'July 2025 - January 2026',
    location: 'Mumbai',
    description: [
      'Engineered and launched the company\'s primary website and a full-stack MERN waitlist platform with custom automated email system for personalized onboarding',
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
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-container">
        <p className="section-title">Experience</p>
        <h2 className="section-heading">Where I've Worked</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 transform md:-translate-x-1/2" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full transform -translate-x-1/2 border-4 border-white dark:border-neutral-950 z-10" />

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'
                  }`}
                >
                  <div className={`card hover:shadow-lg hover:shadow-primary-500/5 ${index % 2 === 0 ? 'bg-primary-50 dark:bg-primary-950/30' : ''}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                        <Briefcase className="w-3.5 h-3.5" />
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
