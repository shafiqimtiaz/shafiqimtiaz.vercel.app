export const caseStudies = [
  {
    code: '001',
    label: 'MICROSERVICE_OWNERSHIP',
    highlights: 'FILE_MANAGER_SERVICE',
    details: [
      'Sole engineer: Quarkus microservice with AWS S3, MongoDB, full CRUD REST API, React UI',
      'Event-driven S3 ↔ MongoDB sync via AWS S3 event notifications',
      'EU-region S3 bucket support for data residency requirements',
    ],
    title: 'Flexspring_File_Manager',
    description:
      'Built flexspring-file-manager from scratch — a standalone Quarkus microservice with AWS S3 file storage, MongoDB metadata layer, full CRUD REST API, and Sentry observability. Served as sole engineer across service, API gateway, and React UI.',
    tags: ['QUARKUS', 'AWS_S3', 'MONGODB', 'SENTRY'],
    primary: { label: 'VIEW_RESUME_', href: '/docs/Shafiq-Imtiaz-Resume.pdf', external: true },
    secondary: { label: 'VIEW_RESUME_', to: '/contact' },
  },
  {
    code: '002',
    label: 'REVENUE_ENABLEMENT',
    highlights: 'MONITOR_PILOT',
    details: [
      'Accelerated onboarding by 50%',
      'Generated $200K+ in upsell revenue',
      'Modernized UI performance by 65%',
    ],
    title: 'Monitor_Pilot',
    description:
      'Built and deployed a React and TypeScript dashboard used to improve customer onboarding and visibility. The project combined stronger UX, faster load performance, and measurable commercial impact.',
    tags: ['REACT', 'TYPESCRIPT', 'BOOTSTRAP_5', 'REST_APIS'],
    primary: { label: 'VIEW_RESUME_', to: '/about' },
    secondary: { label: 'VIEW_RESUME_', to: '/contact' },
  },
  {
    code: '003',
    label: 'AI_INITIATIVE',
    highlights: 'RAG_CHATBOT',
    details: [
      'Runner-up + $1,000 team prize at Flexspring Hackathon',
      'Built with Crewdle AI and company data',
      'Foundation for future AI-powered features',
    ],
    title: 'AI_Chatbot_Initiative',
    description:
      "Won runners-up and $1,000 team prize at Flexspring internal hackathon, designing a RAG-powered chatbot using Crewdle AI and Flexspring data — which seeded the company's ongoing AI initiative.",
    tags: ['RAG', 'AI_CHATBOT', 'CREWDLE_AI', 'LLM'],
    primary: { label: 'VIEW_RESUME_', to: '/about' },
    secondary: { label: 'VIEW_RESUME_', to: '/contact' },
  },
  {
    code: '004',
    label: 'PLATFORM_MODERNISATION',
    highlights: 'SPRING_BOOT_3_MIGRATION',
    details: [
      'Led Spring Boot 3 migration for Flexspring Studio (Java 17), deployed to production without regression',
      'Upgraded Monitor UI to React 18.3, React Router v7, and Vite 7 — significantly improved HMR build speeds',
      'Refactored MongoDB aggregation queries for project loading, achieving measurable load time improvements',
    ],
    title: 'Platform_Modernisation',
    description:
      "Led Spring Boot 3 migrations for two production services and upgraded Monitor's full front-end stack (React 18.3, React Router v7, Vite 7). Modernised the platform's core runtime and build toolchain.",
    tags: ['JAVA_17', 'SPRING_BOOT_3', 'REACT_18', 'VITE_7'],
    primary: { label: 'VIEW_RESUME_', href: '/docs/Shafiq-Imtiaz-Resume.pdf', external: true },
    secondary: { label: 'VIEW_RESUME_', to: '/contact' },
  },
];

export const miniProjects = [
  {
    name: 'Task List',
    description:
      'Standalone task manager for adding, tracking, and clearing day-to-day work items.',
    href: '/projects/1%20Task%20List/index.html',
    tags: ['HTML', 'CSS', 'Vanilla JS'],
  },
  {
    name: 'Book List',
    description:
      'Small CRUD-style book tracker for capturing title, author, and ISBN entries in the browser.',
    href: '/projects/2%20Book%20List/index.html',
    tags: ['HTML', 'CSS', 'Vanilla JS'],
  },
  {
    name: 'Github Finder',
    description:
      'Search interface for looking up GitHub users and surfacing profile details quickly.',
    href: '/projects/3%20GitHub%20Finder/index.html',
    tags: ['HTML', 'CSS', 'Vanilla JS', 'API'],
  },
  {
    name: 'Shopping Cart',
    description: 'Client-side shopping flow for selecting items and reviewing a live cart summary.',
    href: '/projects/Ex1%20Shopping%20Cart/index.html',
    tags: ['HTML', 'CSS', 'Vanilla JS'],
  },
  {
    name: 'REG-EX Validator',
    description:
      'Interactive validator for testing form patterns and common regular-expression rules.',
    href: '/projects/Ex2%20REG-EX%20Validator/index.html',
    tags: ['HTML', 'CSS', 'Vanilla JS', 'Regex'],
  },
  {
    name: 'Number Guessing Game',
    description: 'Browser guessing game with input validation and simple game-state feedback.',
    href: '/projects/Ex3%20Number%20Game/index.html',
    tags: ['HTML', 'CSS', 'Vanilla JS'],
  },
  {
    name: 'Colorize',
    description:
      'Visual UI experiment showcasing Glass and Neo styling directions in a standalone demo.',
    href: '/projects/UI%20Colorize%20GlassNeo/index.html',
    tags: ['HTML', 'CSS', 'UI/UX'],
  },
];

export const publicRepositories = [
  {
    title: 'RecycleVision',
    description:
      'Engineered a computer vision application designed to identify and categorize recyclable materials. Built robust image classification models to improve automated sorting efficiency and sustainability efforts.',
    repoUrl: 'https://github.com/shafiqimtiaz/RecycleVision',
    techStack: ['Python', 'TensorFlow', 'Computer Vision'],
  },
  {
    title: 'GenAI for Software Engineering',
    description:
      'Developed an automated pipeline leveraging Generative AI models to assist with software engineering tasks. Investigated prompt engineering techniques to optimize code generation and automate documentation workflows.',
    repoUrl: 'https://github.com/shafiqimtiaz/GenAI4SE',
    techStack: ['Generative AI', 'Python', 'LLMs', 'Prompt Engineering'],
  },
  {
    title: 'Retinal Vessel Extraction',
    description:
      'Architected a medical image processing solution to extract continuous blood vessel networks from retinal fundus images. Implemented advanced segmentation algorithms to aid in the preliminary diagnosis of ocular diseases.',
    repoUrl: 'https://github.com/shafiqimtiaz/Retinal-Vessel-Extraction',
    techStack: ['Python', 'OpenCV', 'Image Processing', 'Machine Learning'],
  },
  {
    title: 'Medical Appointment System',
    description:
      'Developed a full-stack healthcare platform to streamline scheduling, patient management, and clinic workflows. Engineered secure APIs and intuitive interfaces to handle appointment lifecycles efficiently.',
    demoUrl: 'https://med-spm-app.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/Medical-Appointment-System',
    techStack: ['MERN Stack', 'MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    title: 'BSRM Warehouse Management',
    description:
      'Architected a comprehensive tracking system for monitoring industrial stock levels and generating real-time inventory analytics. Deployed robust RESTful APIs to ensure accurate, instantaneous product and material management.',
    demoUrl: 'https://bsrm-warehouse-management.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/bsrm-warehouse-management',
    techStack: ['Full-Stack', 'RESTful APIs', 'Database Management'],
  },
  {
    title: 'BSRM Trading E-Commerce',
    description:
      'Engineered a complete B2B online platform featuring dynamic product catalogs and secure transaction workflows for steel trading. Designed a scalable state management architecture to handle enterprise-level order volume.',
    demoUrl: 'https://bsrm-trading-ecommerce.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/bsrm-trading-ecommerce',
    techStack: ['React', 'Node.js', 'State Management', 'Enterprise UI'],
  },
  {
    title: 'GPS Location Fetcher',
    description:
      'Built an Android utility application that periodically fetches and tracks GPS coordinates for remote field workers. Implemented GPX file export functionality and robust state tracking using the native Android SDK.',
    demoUrl: 'https://www.youtube.com/watch?v=fXOIVhYaTOk',
    repoUrl: 'https://github.com/shafiqimtiaz/GPS-Location-App',
    techStack: ['Java', 'Android SDK', 'Location Services'],
  },
  {
    title: 'MERN Exercise Tracker',
    description:
      'Created a personal fitness and health management tool enabling users to log daily exercises and track workout routines. Designed intuitive data models to manage user progress and history seamlessly.',
    demoUrl: 'https://mern-ex-tracker.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/mern-exercise-tracker',
    techStack: ['MERN Stack', 'REST API', 'React'],
  },
  {
    title: 'Movie Watchlist',
    description:
      'Constructed a dynamic front-end application allowing users to search, discover, and curate personalized movie watchlists. Integrated external APIs (TMDB/OMDb) to deliver rich, real-time cinematic data.',
    demoUrl: 'https://movie-watchlist-imdb.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/movie-watchlist',
    techStack: ['React', 'External APIs', 'Responsive Design'],
  },
  {
    title: 'Birdhaus',
    description:
      'Developed an interactive web application with a focus on delivering a responsive, content-rich user experience. Architected a clean, decoupled UI component structure for enhanced maintainability and scalability.',
    demoUrl: 'https://birdhaus.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/birdhaus',
    techStack: ['Frontend Framework', 'UI/UX Design', 'CSS Framework'],
  },
  {
    title: 'Course Group Assistant (CGA)',
    description:
      'Deployed an academic tool designed to streamline student collaboration and manage course group logistics. Engineered features for team formation, task delegation, and centralized academic project management.',
    repoUrl: 'https://github.com/shafiqimtiaz/Course-Group-Assistant-CGA',
    techStack: ['Full-Stack', 'Real-time Sync', 'Education Tech'],
  },
];

export const historyCards = [
  {
    type: 'compact',
    accent: 'border-[var(--theme-primary)] text-[var(--theme-primary)]',
    icon: 'smart_toy',
    label: 'AI_INFRASTRUCTURE',
    title: 'flexspring-agent-core',
    description:
      "Architected and developed the platform's foundational TypeScript/Node.js AI agent library integrating LiteLLM for model-agnostic LLM access — enabling reusable, spec-driven LLM agent construction across services.",
    tags: ['#TYPESCRIPT', '#LITELLM', '#AI_AGENTS', '#SPEC_DRIVEN'],
  },
  {
    type: 'compact',
    accent: 'border-[var(--theme-primary)] text-[var(--theme-primary)]',
    icon: 'folder_open',
    label: 'MICROSERVICE_OWNERSHIP',
    title: 'Flexspring_File_Manager',
    description:
      'Sole engineer on flexspring-file-manager, delivering a production microservice with S3 storage, MongoDB metadata layer, full CRUD REST API, and React UI — end-to-end.',
    tags: ['#SPRING_BOOT', '#AWS_S3', '#MONGODB', '#SENTRY'],
  },
  {
    type: 'compact',
    accent: 'border-[var(--theme-secondary)] text-[var(--theme-secondary)]',
    icon: 'smart_toy',
    label: 'AI_INITIATIVE',
    title: 'RAG_Chatbot_Prototype',
    description:
      'Runner-up + $1,000 team prize at Flexspring Hackathon — built with Crewdle AI and retrieval-augmented generation, then evolved into a broader AI initiative for future product features.',
  },
  {
    type: 'compact',
    accent: 'border-[var(--theme-tertiary)] text-[var(--theme-tertiary)]',
    icon: 'upgrade',
    label: 'PLATFORM_MODERNISATION',
    title: 'Spring_Boot_3_Migration',
    description:
      "Led Spring Boot 3 migrations for two production services and upgraded Monitor's full front-end stack (React 18.3, React Router v7, Vite 7).",
    tags: ['#JAVA_17', '#SPRING_BOOT_3', '#REACT_18', '#VITE'],
  },
  {
    type: 'split',
    label: 'PRODUCTION_INCIDENT_RESOLUTION',
    title: 'Database_Correction_Scripts',
    metrics: [
      'Diagnosed production database incident',
      'Authored idempotent correction scripts',
      'Restored client integrations',
      'Cross-database: PostgreSQL + MongoDB',
    ],
    description:
      'Diagnosed and resolved corrupted database records blocking client integrations, authoring idempotent correction scripts across PostgreSQL and MongoDB under live production conditions.',
    tags: ['#POSTGRESQL', '#MONGODB', '#INCIDENT_RESOLUTION'],
  },
  {
    type: 'compact',
    accent: 'border-[var(--theme-tertiary)] text-[var(--theme-tertiary)]',
    icon: 'factory',
    label: 'ENTERPRISE_DELIVERY',
    title: 'BSRM_SCM_Applications',
    description:
      "Delivered SCM web applications for one of Bangladesh's largest steel manufacturers, replacing manual workflows with scalable, API-driven solutions. Built ETL pipelines connecting 40+ supplier systems.",
    tags: ['#REACT', '#SPRING_BOOT', '#POSTGRESQL', '#ETL'],
  },
];
