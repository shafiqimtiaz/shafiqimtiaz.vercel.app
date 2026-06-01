export const caseStudies = [
  {
    code: '001',
    label: 'AI Platform',
    highlights: 'Data Mapping',
    details: [
      'AI field recommendations: embedding reranking + cosine similarity',
      'Redisson caching with LiteLLM fallback',
      'Read-only governance enforced on Technical Review sign-off',
    ],
    title: 'Data Mapping',
    description:
      'A self-service specification tool powered by AI field recommendations — replacing manual, spreadsheet-based mapping workflows. Per-target suggestions, bulk recommendation, and role-based AI gating, with a debounced/abortable frontend hook.',
    tags: ['LiteLLM', 'Embeddings', 'Redisson', 'React'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '002',
    label: 'AI Infrastructure',
    highlights: 'flexspring-agent-core',
    details: [
      'Model-agnostic LLM orchestration via LiteLLM',
      'MCP server schemas + Spec-Driven access boundaries',
      'Reusable agent library adopted across services',
    ],
    title: 'Agent Core',
    description:
      "The platform's foundational TypeScript/Node.js agentic AI library — integrating LiteLLM for model-agnostic LLM orchestration so agents operate against defined API contracts, with MCP server schemas for safe, scalable tool use.",
    tags: ['TypeScript', 'LiteLLM', 'MCP', 'Spec-Driven'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '003',
    label: 'Microservice Ownership',
    highlights: 'File Manager Service',
    details: [
      'Sole engineer: Quarkus service + API gateway + React UI',
      'Multi-region AWS S3 (US/EU) + per-item READ/WRITE/DELETE permissions',
      'SQS event reconciliation; OIDC auth via AWS Cognito',
    ],
    title: 'File Manager',
    description:
      'Built flexspring-file-manager from scratch — a standalone Quarkus microservice with multi-region AWS S3 storage (US/EU), a MongoDB metadata layer, per-item permissions, SQS event reconciliation, and Sentry observability. Sole engineer across service, API gateway, and React UI.',
    tags: ['Quarkus', 'AWS S3', 'MongoDB', 'Sentry'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '004',
    label: 'Platform Modernisation',
    highlights: 'Migrations',
    details: [
      'Led Spring Boot 3 migration of Studio — zero regression',
      'Java 8 → 17 and Spring Boot 2 → 3 (Alcatraz)',
      'Monitor UI to React 18.3, React Router v7, Vite',
    ],
    title: 'Platform Modernisation',
    description:
      "Led Spring Boot 3 / Java 17 migrations for production services and modernised Monitor's front-end stack (React 18.3, React Router v7, Vite) — establishing the runtime foundation for platform-wide LLM integration.",
    tags: ['Java 17', 'Spring Boot 3', 'React 18', 'Vite'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
];

export const publicRepositories = [
  {
    title: 'RecycleVision',
    description:
      'Computer vision application that identifies and categorizes recyclable materials. Built image classification models to improve automated sorting efficiency.',
    repoUrl: 'https://github.com/shafiqimtiaz/RecycleVision',
    techStack: ['Python', 'TensorFlow', 'Computer Vision'],
  },
  {
    title: 'GenAI for Software Engineering',
    description:
      'Automated pipeline leveraging generative AI to assist with software engineering tasks. Investigated prompt engineering to optimize code generation and documentation workflows.',
    repoUrl: 'https://github.com/shafiqimtiaz/GenAI4SE',
    techStack: ['Generative AI', 'Python', 'LLMs', 'Prompt Engineering'],
  },
  {
    title: 'Retinal Vessel Extraction',
    description:
      'Medical image processing solution to extract continuous blood-vessel networks from retinal fundus images, aiding preliminary diagnosis of ocular diseases.',
    repoUrl: 'https://github.com/shafiqimtiaz/Retinal-Vessel-Extraction',
    techStack: ['Python', 'OpenCV', 'Image Processing', 'ML'],
  },
  {
    title: 'Medical Appointment System',
    description:
      'Full-stack healthcare platform streamlining scheduling, patient management, and clinic workflows with secure APIs and intuitive interfaces.',
    demoUrl: 'https://med-spm-app.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/Medical-Appointment-System',
    techStack: ['MERN', 'MongoDB', 'Express', 'React'],
  },
  {
    title: 'BSRM Warehouse Management',
    description:
      'Tracking system for industrial stock levels with real-time inventory analytics and RESTful APIs for accurate product and material management.',
    demoUrl: 'https://bsrm-warehouse-management.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/bsrm-warehouse-management',
    techStack: ['Full-Stack', 'REST APIs', 'Databases'],
  },
  {
    title: 'BSRM Trading E-Commerce',
    description:
      'B2B platform with dynamic product catalogs and secure transaction workflows for steel trading, with scalable state management for enterprise order volume.',
    demoUrl: 'https://bsrm-trading-ecommerce.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/bsrm-trading-ecommerce',
    techStack: ['React', 'Node.js', 'State Management'],
  },
  {
    title: 'GPS Location Fetcher',
    description:
      'Android utility that periodically fetches and tracks GPS coordinates for remote field workers, with GPX export and robust state tracking.',
    demoUrl: 'https://www.youtube.com/watch?v=fXOIVhYaTOk',
    repoUrl: 'https://github.com/shafiqimtiaz/GPS-Location-App',
    techStack: ['Java', 'Android SDK', 'Location Services'],
  },
  {
    title: 'MERN Exercise Tracker',
    description:
      'Fitness and health management tool to log daily exercises and track routines, with intuitive data models for user progress and history.',
    demoUrl: 'https://mern-ex-tracker.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/mern-exercise-tracker',
    techStack: ['MERN', 'REST API', 'React'],
  },
  {
    title: 'Movie Watchlist',
    description:
      'Front-end application to search, discover, and curate personalized movie watchlists, integrating TMDB/OMDb for rich, real-time data.',
    demoUrl: 'https://movie-watchlist-imdb.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/movie-watchlist',
    techStack: ['React', 'External APIs', 'Responsive'],
  },
  {
    title: 'Birdhaus',
    description:
      'Interactive web application focused on a responsive, content-rich experience with a clean, decoupled UI component structure.',
    demoUrl: 'https://birdhaus.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/birdhaus',
    techStack: ['Frontend', 'UI/UX', 'CSS'],
  },
  {
    title: 'Course Group Assistant',
    description:
      'Academic tool to streamline student collaboration and course-group logistics — team formation, task delegation, and centralized project management.',
    repoUrl: 'https://github.com/shafiqimtiaz/Course-Group-Assistant-CGA',
    techStack: ['Full-Stack', 'Real-time Sync', 'EdTech'],
  },
];
