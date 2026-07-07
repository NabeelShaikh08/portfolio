import { ExternalLink, Github, Bot, BookOpen, Heart, Brain, Bone, FileText, Shirt } from 'lucide-react';

const projects = [
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
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#EADDCA] dark:bg-neutral-900/50">
      <div className="section-container">
        <p className="section-title">Projects</p>
        <h2 className="section-heading">Featured Work</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card group hover:shadow-xl hover:shadow-primary-500/5 overflow-hidden flex flex-col h-full"
            >
              {/* Header with icon and title */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0"
                >
                  <project.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mb-4 flex-grow">
                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-500 uppercase tracking-wider mb-2">
                  Key Features
                </h4>
                <ul className="space-y-1.5">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-500 uppercase tracking-wider mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 mt-auto border-t border-neutral-200 dark:border-neutral-800">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
                {project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
