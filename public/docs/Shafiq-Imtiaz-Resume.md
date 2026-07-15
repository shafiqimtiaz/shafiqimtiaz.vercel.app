**Shafiq Imtiaz**  
[**shafiqimtiaz.vercel.app**](https://shafiqimtiaz.vercel.app)  
shafiqimtiaz@gmail.com | [linkedin.com/in/shafiqimtiaz](http://linkedin.com/in/shafiqimtiaz) | [github.com/shafiqimtiaz](http://github.com/shafiqimtiaz) | Ottawa, ON

**PROFESSIONAL SUMMARY**  
Senior Software and AI Engineer with 5+ years shipping production AI features, full-stack microservices, and platform modernisations in JavaScript, TypeScript, Node.js, and React.js. I architect LLM integration layers and agentic frameworks — and own the end-to-end delivery of the services that run on them. Currently building AI platform infrastructure at Flexspring, serving 2,500+ client configurations.

**CORE SKILLS**

* **Languages & Runtime**: JavaScript, TypeScript, Node.js, Java 17, Python (Scikit-learn, Pandas, NumPy)  
* **Frontend**: React.js (React 18, React Router v7, Vite 7, @tanstack/react-query, React-Table), Chrome Extension Development (Manifest V3)  
* **Backend & API**: RESTful API Design, Node.js, Spring Boot 3, Spring Cloud Gateway, Quarkus, OpenAPI 3 / Swagger, CLI Development  
* **Testing & Quality**: Jest, ts-jest, JUnit, Test Automation, Code Review, SonarQube  
* **Cloud & DevOps**: Docker, Kubernetes, AWS (S3, SQS), Jenkins, CI/CD Pipelines, Release Management, Git, Sentry  
* **Data & Search**: PostgreSQL, MongoDB, MySQL, Redis / Redisson, ETL Pipeline Design  
* **AI & Emerging Tech**: LLM Integration, LiteLLM, Embeddings & Cosine Similarity, Multi-Provider AI Streaming, On-Device AI (Gemini Nano), RAG  
* **Architecture & Practices**: Microservices, Event-Driven Architecture, Distributed Systems, Agile, Domain-Driven Design, Mentorship

**PROFESSIONAL EXPERIENCE**

**Senior Software and AI Engineer | Flexspring | Ottawa, ON | May 2026 \- Present**  
*B2B content management and delivery platform serving 2,500+ client configurations*

* Built AI-driven field recommendation system for Data Mapping with embedding-based reranking, cosine similarity matching, Redisson caching, and LiteLLM fallback. React.js frontend with debounce/abort/retry logic, per-target suggestions, bulk recommendation, and role-based AI gating  
* Hardened platform-wide LLM integration by adding unit tests, resolving SonarQube findings, and replacing hardcoded API keys with a secure config layer reused across Monitor, Studio, and shared libraries  
* Added nested/compound field support with breadcrumb navigation in the Data Mapping Modeler  
* Built a PostgreSQL-to-MongoDB webhook template migration tool for the platform's data-layer consolidation

**Software Engineer | Flexspring | Ottawa, ON | May 2024 \- May 2026**

* Built flexspring-file-manager from scratch as sole engineer. Standalone Quarkus microservice with multi-region AWS S3 storage (US/EU), MongoDB metadata, per-item permissions, SQS event-driven reconciliation, Sentry observability, and OIDC auth via AWS Cognito. Containerized with Docker. Shipped service, API gateway, and React.js UI to production  
* Designed and implemented Monitor Lifecycle: Spring Boot REST API, JMS/ActiveMQ consumer for event-driven ingestion from Engine, PostgreSQL/MongoDB schema updates, and React.js UI for project and integration-level flows  
* Built Studio AI Analysis feature that generates analysis of integration configurations to surface issues and optimization opportunities using LLM capabilities  
* Shipped Webhook Templates across Engine, Studio, Webhook Core, Webhook Explorer, and Onboard API with Template ID propagation and integration-level filtering  
* Led Spring Boot 3 migration of Flexspring Studio. Updated framework dependencies, resolved breaking API changes, validated end-to-end, deployed to production with no regression. Refactored Jenkinsfile in Webhook Core to improve CI/CD pipeline reliability  
* Delivered Credentials Manager full-stack: Spring Boot REST API, ConnectorHub integration, React.js UI with connector-specific form rendering, client-side field encryption, and automated email dispatch  
* Upgraded Monitor UI to React 18.3, React Router v7, and Vite 7\. Migrated data-fetching from react-query to @tanstack/react-query (v5) and upgraded the shared React component library for cross-platform compatibility  

**Software Engineer Intern | Flexspring | Montreal, QC | May 2023 \- May 2024**

* Led Alcatraz Java 8 to 17 and Spring Boot 2 to 3.0.6 upgrades. Resolved JMS/ActiveMQ configuration and HealthChecker incompatibilities from the framework change. Deployed to production with no regression  
* Delivered Monitor Pilot UI redesign: template-based rebuild of authentication flows, navigation, responsive layouts, Dashboard Widgets, and Organization/Execution/Transaction list views with server-side pagination and filtering in React.js with react-table  
* Built Credentials Manager foundation: Spring Boot REST API with ConnectorHub integration and React.js UI for credential list and add/update forms with connector-specific field rendering

**Full Stack Software Developer | BSRM | Chittagong, Bangladesh | Apr 2019 \- Jun 2021**  
*One of Bangladesh's largest steel manufacturers*

* Built APS Dashboard X (React, Node.js, SQLite) for consumables procurement, stock management, and shipment scheduling. Increased Material Requirement Planning efficiency by 89%. Nominated for Young Supply Chain Talent of the Year at IPDC Supply Chain Awards 2019  
* Engineered ETL pipelines integrating 40+ supplier systems into PostgreSQL-based procurement analytics with 100% audit compliance. Developed Python (Scikit-learn, Pandas) ML forecasting module that reduced overstock by 15%

**PROJECTS**

**Clean Bookmarks | TypeScript, Node.js, Chrome MV3 | [github.com/shafiqimtiaz/clean-bookmarks](http://github.com/shafiqimtiaz/clean-bookmarks)**

* Published on Chrome Web Store (5 releases). AI-powered bookmark organizer using two-pass categorization for content discovery. Supports on-device Gemini Nano and multi-provider AI streaming with Zod validation. Non-destructive with snapshot-and-restore. Live demo: shafiqimtiaz.github.io/clean-bookmarks

**ctx-handoff | TypeScript, Node.js, Deno Deploy | [github.com/shafiqimtiaz/ctx-handoff](http://github.com/shafiqimtiaz/ctx-handoff)**

* Agent-agnostic CLI for relaying session context via encrypted, ephemeral edge links. Zero-knowledge transport with AES-256-GCM; blobs expire after 24 hours. Optional Gemini distillation. Serverless on Deno Deploy.

**EDUCATION**

* **MEng Software Engineering (Co-op)** | Concordia University | Montreal, QC | 2022 \- 2024  
* **BSc Electrical and Electronics Engineering** | Islamic University of Technology | Bangladesh | 2015 \- 2018

**CERTIFICATIONS**

* **AWS Certified AI Practitioner** | Amazon Web Services | Nov 2025

**VOLUNTEER EXPERIENCE**

* **Director of Sponsorship** | HackConcordia | Montreal, QC | Oct 2022 \- Apr 2023  
  * Organized ConUHacks VII, the largest hackathon in Quebec with 800+ participants from 97 universities
