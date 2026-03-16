import { ReactNode } from 'react';
import { Brain, Settings, HardHat, Bot, Code, Cog, BrainCircuit, Smartphone, TreePalm, Layers, Component, PenTool, Palette, BookOpen, Shapes } from 'lucide-react';

import reactIcon from '../assets/tech/react-svgrepo-com.svg';
import javaIcon from '../assets/tech/java-svgrepo-com.svg';
import pythonIcon from '../assets/tech/python-svgrepo-com.svg';
import djangoIcon from '../assets/tech/django-svgrepo-com.svg';
import postgresIcon from '../assets/tech/postgresql-svgrepo-com.svg';
import dockerIcon from '../assets/tech/docker-16-svgrepo-com.svg';
import tsIcon from '../assets/tech/typescript-svgrepo-com.svg';

// Common interfaces
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

// Data Exports
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
        impact: 'Designed and developed web interfaces bridging front-end and back-end for government systems. Managed data integration using Java Servlets and PostgreSQL, implementing dynamic filters and interactive maps.'
    },
    {
        role: 'Data Entry Supervisor',
        organization: 'Electoral State Institute (IEE)',
        timeframe: 'May 2024 – Jun 2024',
        impact: 'Supervised staff and executed system testing/QA protocols for electronic voting systems, ensuring data integrity during critical election periods.'
    },
    {
        role: 'Personal Interpreter Spanish to English (OPEP)',
        organization: 'UABCS',
        timeframe: 'Aug 2023 – Nov 2023',
        impact: 'Facilitated cross-cultural japanese/english/spanish communication and translated educational materials for the Overseas Practical Education Program students.'
    },
    {
        role: 'Website Administrator & Copywriter',
        organization: 'TV Baja / State Congress of B.C.S.',
        timeframe: 'Oct 2021 – Aug 2022',
        impact: 'Managed digital content, government institutional reporting, and web administration for legislative news and transparency.'
    }
];

export const processSteps: ReadonlyArray<ProcessStep> = [
    {
        id: '01',
        title: 'Semantic Discovery',
        description: 'Analyzing data flows and user requirements to extract structured meaning.',
        icon: Brain
    },
    {
        id: '02',
        title: 'Hardened Design',
        description: 'Architecting secure, containerized microservices with robust concurrency guards.',
        icon: Settings
    },
    {
        id: '03',
        title: 'Full-Stack Bridge',
        description: 'Building intuitive UIs backed by high-performance asynchronous logic.',
        icon: Code
    },
    {
        id: '04',
        title: 'AI Orchestration',
        description: 'Scaling intelligence by integrating LLMs into automated background workflows.',
        icon: BrainCircuit
    },
    {
        id: '05',
        title: 'Reliable Delivery',
        description: 'Ensuring operational integrity through atomic transactions and high availability.',
        icon: TreePalm
    }
];

export const servicesData: ReadonlyArray<ServiceItem> = [
    {
        title: 'High-Concurrency Backends',
        description: 'I\'ll transform your scaling bottlenecks into a high-availability fortress.',
        icon: Code
    },
    {
        title: 'Automation Systems',
        description: 'I\'ll turn your repetitive manual chaos into a self-running, high-efficiency automated machine.',
        icon: Cog
    },
    {
        title: 'Intelligent Data Pipelines',
        description: 'I can take your messy data and make it useful.',
        icon: BrainCircuit
    },
    {
        title: 'Strategic Product UX',
        description: 'I\'ll rescue your confusing user journeys and evolve them into seamless, high-converting experiences.',
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
