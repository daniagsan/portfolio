import { ReactNode } from 'react';
import { Brain, Settings, HardHat, Bot, Code, Cog, BrainCircuit, Smartphone, TreePalm, Layers, Component, PenTool, Palette, BookOpen, Shapes } from 'lucide-react';

import reactIcon from '../assets/tech/react-svgrepo-com.svg';
import javaIcon from '../assets/tech/java-svgrepo-com.svg';
import pythonIcon from '../assets/tech/python-svgrepo-com.svg';
import djangoIcon from '../assets/tech/django-svgrepo-com.svg';
import postgresIcon from '../assets/tech/postgresql-svgrepo-com.svg';
import dockerIcon from '../assets/tech/docker-16-svgrepo-com.svg';
import tsIcon from '../assets/tech/typescript-svgrepo-com.svg';

export interface EducationItem {
    degree: string;
    description: string;
    institution: string;
}

export interface ExperienceItem {
    role: string;
    organization: string;
    timeframe: string;
    impact: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

export interface ServiceItem {
    title: string;
    description: string;
    icon: React.ElementType;
}

export interface ProjectItem {
    title: string;
    description: string;
    icon: React.ElementType;
    platform: string;
    type: string;
    techStack: string[];
}

export interface TechCategory {
    name: string;
    items: string[];
}

export interface TechStackItem {
    name: string;
    id: string;
    icon: string | ReactNode;
}

export const educationData: ReadonlyArray<EducationItem> = [
    {
        degree: 'Bachelor’s Degree in Software Development Engineering',
        description: 'Focus on Object-Oriented Programming, Web Development, Databases, Data Analysis, and Project Management.',
        institution: 'Universidad Autónoma de Baja California Sur'
    },
    {
        degree: 'Bachelor of Communication Science',
        description: 'Specialization in IT Administration & UI/UX. Focus on digital communication strategies, attractive interface design, and User Experience (UX).',
        institution: 'Universidad Autónoma de Baja California Sur'
    }
];

export const experienceData: ReadonlyArray<ExperienceItem> = [
    {
        role: 'Full Stack Web Developer (JSP-Servlet)',
        organization: 'General Directorate of IT (B.C.S. Government)',
        timeframe: 'Feb 2025 – Present',
        impact: 'Architecting mission-critical web interfaces for state-level systems. Streamlining data integration between Java Servlets and PostgreSQL to optimize complex filtering and real-time geographic data visualization for government oversight.'
    },
    {
        role: 'Data Entry Supervisor',
        organization: 'Electoral State Institute (IEE)',
        timeframe: 'May 2024 – Jun 2024',
        impact: 'Spearheaded QA protocols and staff supervision for electronic voting systems, ensuring absolute data integrity and zero-downtime availability during high-security electoral cycles.'
    },
    {
        role: 'Personal Interpreter Spanish to English (OPEP)',
        organization: 'UABCS',
        timeframe: 'Aug 2023 – Nov 2023',
        impact: 'Bridged cross-cultural communication gaps for the Overseas Practical Education Program, facilitating high-level technical and educational knowledge transfer between Japanese, English, and Spanish speaking stakeholders.'
    },
    {
        role: 'Website Administrator & Copywriter',
        organization: 'TV Baja / State Congress of B.C.S.',
        timeframe: 'Oct 2021 – Aug 2022',
        impact: 'Managed institutional digital infrastructure and transparency reporting. Developed high-impact content strategies for legislative communication, ensuring public accessibility to government proceedings.'
    }
];

export const processSteps: ReadonlyArray<ProcessStep> = [
    {
        id: '01',
        title: 'Requirement Mapping',
        description: 'Analyzing complex data flows and stakeholder requirements to engineer structured technical roadmaps.',
        icon: Brain
    },
    {
        id: '02',
        title: 'Enterprise Architecture',
        description: 'Architecting secure, containerized microservices with robust concurrency guards and high-availability protocols.',
        icon: Settings
    },
    {
        id: '03',
        title: 'Full-Stack Integration',
        description: 'Developing high-performance user interfaces backed by resilient, asynchronous backend logic.',
        icon: Code
    },
    {
        id: '04',
        title: 'Intelligent Automation',
        description: 'Scaling operational capacity by integrating advanced LLM orchestration into automated background workflows.',
        icon: BrainCircuit
    },
    {
        id: '05',
        title: 'Operational Integrity',
        description: 'Ensuring mission-critical reliability through atomic transactions, rigorous testing, and high-availability delivery.',
        icon: TreePalm
    }
];

export const servicesData: ReadonlyArray<ServiceItem> = [
    {
        title: 'High-Concurrency Systems',
        description: 'Transforming technical bottlenecks into high-availability architectures capable of handling enterprise-scale traffic.',
        icon: Code
    },
    {
        title: 'Process Orchestration',
        description: 'Eliminating operational friction by replacing manual complexity with autonomous, high-efficiency automation layers.',
        icon: Cog
    },
    {
        title: 'Business Intelligence Pipelines',
        description: 'Engineering robust data ETL pipelines to transform fragmented datasets into actionable strategic insights.',
        icon: BrainCircuit
    },
    {
        title: 'Data-Driven UX Strategy',
        description: 'Optimizing complex user journeys to align technical capabilities with seamless, high-conversion business goals.',
        icon: Smartphone
    }
];

export const projectsData: ReadonlyArray<ProjectItem> = [
    {
        title: 'CRM Mobile Core',
        description: 'High-performance mobile application for real estate professionals, featuring real-time inventory management and reactive UI.',
        icon: Smartphone,
        platform: 'iOS / Android (Expo)',
        type: 'Mobile CRM - Enterprise-grade property management and client relationship tool with offline-first capabilities.',
        techStack: ['React Native', 'Expo', 'TypeScript', 'React Navigation v7']
    },
    {
        title: 'AI Semantic Matcher',
        description: 'Intelligent module leveraging Generative AI to analyze client requirements and suggest optimal property pairings.',
        icon: Bot,
        platform: 'Cloud / Mobile API',
        type: 'AI Integration - Semantic analysis of unstructured data for automated lead-property scoring.',
        techStack: ['Gemini 1.5 Flash', 'Python', 'LangChain', 'REST API']
    },
    {
        title: 'Dynamic Filter Engine',
        description: 'Sophisticated search system with multi-parameter dynamic filters and optimized UX for large-scale databases.',
        icon: Settings,
        platform: 'Cross-platform Mobile',
        type: 'UX Optimization - High-speed data retrieval and advanced filtering algorithms for complex queries.',
        techStack: ['TypeScript', 'PostgreSQL', 'Search Logic', 'Redux']
    },
    {
        title: 'Real-time Data Pipeline',
        description: 'Asynchronous synchronization system ensuring mobile clients receive instant inventory and status updates.',
        icon: Cog,
        platform: 'Distributed Systems',
        type: 'Data Pipeline - Distributed microservices handling real-time event processing and webhooks.',
        techStack: ['Redis', 'Celery', 'Node.js', 'Docker']
    },
    {
        title: 'Operational Monitor',
        description: 'Real-time technical monitoring interface designed to manage complex backend processes directly from mobile devices.',
        icon: BrainCircuit,
        platform: 'iOS / Android',
        type: 'Monitoring Tool - High-availability dashboard for real-time process tracking and management.',
        techStack: ['React Native', 'Django REST', 'Redis', 'Webhooks']
    },
    {
        title: 'Hardened Infrastructure',
        description: 'Secure, containerized backend architecture designed to support high-concurrency mobile transactions.',
        icon: HardHat,
        platform: 'Cloud / Docker',
        type: 'Infrastructure - Scalable microservices with concurrency guards and atomic transaction integrity.',
        techStack: ['Django', 'Docker Compose', 'PostgreSQL', 'Redis']
    }
];

export const designProjectsData: ReadonlyArray<ProjectItem> = [
    {
        title: 'Corporate Identity System',
        description: 'Complete brand identity manual for a real estate corporation, including logo system, typography hierarchy, and color architecture.',
        icon: Layers,
        platform: 'Print / Digital',
        type: 'Brand Manual - Full identity system with usage guidelines and asset library.',
        techStack: ['Illustrator', 'InDesign', 'Figma', 'Brand Strategy']
    },
    {
        title: 'Product Brand Kit',
        description: 'Visual identity and packaging design system for a consumer product line with scalable brand elements.',
        icon: Component,
        platform: 'Multi-format',
        type: 'Product Identity - Cohesive visual language across packaging, digital, and print touchpoints.',
        techStack: ['Photoshop', 'Illustrator', 'Figma', 'Color Theory']
    },
    {
        title: 'Digital Experience Design',
        description: 'UI/UX design system and interactive prototypes for a fintech application with accessibility-first approach.',
        icon: PenTool,
        platform: 'Web / Mobile',
        type: 'UX System - Design tokens, component library, and interaction patterns.',
        techStack: ['Figma', 'Prototyping', 'Design Systems', 'A11y']
    },
    {
        title: 'Visual Language Guide',
        description: 'Comprehensive visual communication system including iconography, illustration style, and photography direction.',
        icon: Palette,
        platform: 'Cross-media',
        type: 'Visual System - Unified visual grammar for brand consistency across all channels.',
        techStack: ['Illustrator', 'Photography', 'Art Direction', 'Style Guide']
    },
    {
        title: 'Editorial Design System',
        description: 'Publication design framework with modular grid system, typographic scale, and content templates.',
        icon: BookOpen,
        platform: 'Print / Digital Publishing',
        type: 'Editorial - Systematic approach to content layout and typographic hierarchy.',
        techStack: ['InDesign', 'Typography', 'Grid Systems', 'Print Production']
    },
    {
        title: 'Brand Architecture',
        description: 'Multi-brand organizational structure defining relationships, naming conventions, and visual differentiation strategies.',
        icon: Shapes,
        platform: 'Strategic / All Media',
        type: 'Brand Strategy - Hierarchical brand framework for portfolio management.',
        techStack: ['Brand Strategy', 'Figma', 'Illustrator', 'Research']
    }
];

export const techStack: ReadonlyArray<TechStackItem> = [
    { name: 'React', id: 'react', icon: reactIcon },
    { name: 'TypeScript', id: 'typescript', icon: tsIcon },
    { name: 'Python', id: 'python', icon: pythonIcon },
    { name: 'Django', id: 'django', icon: djangoIcon },
    { name: 'Java', id: 'java', icon: javaIcon },
    { name: 'PostgreSQL', id: 'postgres', icon: postgresIcon },
    { name: 'Docker', id: 'docker', icon: dockerIcon }
];
export const techCategories: ReadonlyArray<TechCategory> = [
    {
        name: 'Frontend',
        items: ['React', 'React Native', 'TypeScript', 'Tailwind CSS']
    },
    {
        name: 'Backend',
        items: ['Python', 'Django', 'Java', 'Node.js']
    },
    {
        name: 'Systems',
        items: ['PostgreSQL', 'Redis', 'Docker', 'Celery']
    },
    {
        name: 'AI',
        items: ['Gemini API', 'Claude API', 'OpenAI API', 'LangChain']
    }
];
