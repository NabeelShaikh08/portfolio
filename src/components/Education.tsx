import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="bg-white dark:bg-neutral-900/50">
      <div className="section-container">
        <p className="section-title">Education</p>
        <h2 className="section-heading">Academic Background</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Education
              </h3>
            </div>
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Certifications
              </h3>
            </div>
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
