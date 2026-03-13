import { ReactNode } from 'react';
import { Brain, Settings, HardHat, Bot, Umbrella, Code, Cog, BrainCircuit, Smartphone, TreePalm } from 'lucide-react';

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
        role: 'Human Resource & Data Entry Supervisor',
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
        title: 'Institutional Workflow Automation',
        description: 'End-to-end automation platform that digitized and streamlined complex institutional processes, reducing manual work by 70%.'
    },
    {
        title: 'AI-Powered Internal Assistant',
        description: 'Intelligent assistant leveraging LLM APIs to provide contextual support for internal operations and decision-making.'
    },
    {
        title: 'Operational Backend Architecture',
        description: 'Scalable backend system designed to handle high-throughput operational data with real-time processing capabilities.'
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
