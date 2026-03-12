import { ReactNode } from 'react';
import { Brain, Settings, HardHat, Bot, Umbrella, Code, Cog, BrainCircuit, Smartphone } from 'lucide-react';

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
        degree: 'Bachelor of Science in Computer Science',
        description: 'Focus on software engineering, algorithms, and system design.',
        institution: 'University of Technology'
    },
    {
        degree: 'Certifications & Continuous Learning',
        description: 'Cloud architecture, AI/ML specializations, and modern development practices.',
        institution: 'Various Platforms'
    }
];

export const experienceData: ReadonlyArray<ExperienceItem> = [
    {
        role: 'Senior Product Engineer',
        organization: 'TechCorp',
        timeframe: '2022–Present',
        impact: 'Led development of automation platform serving 50K+ users, reducing manual processing time by 85% across core business units.'
    },
    {
        role: 'Software Architect',
        organization: 'DataFlow Inc',
        timeframe: '2020–2022',
        impact: 'Designed microservices architecture reducing system latency by 40% and enabling seamless scaling during peak operational hours.'
    },
    {
        role: 'Full Stack Developer',
        organization: 'StartupXYZ',
        timeframe: '2018–2020',
        impact: 'Built core product from MVP to production serving enterprise clients, establishing foundational CI/CD pipelines and testing protocols.'
    }
];

export const processSteps: ReadonlyArray<ProcessStep> = [
    { id: '01', title: 'Understand the problem', icon: Brain },
    { id: '02', title: 'Design the system', icon: Settings },
    { id: '03', title: 'Build the software', icon: HardHat },
    { id: '04', title: 'Automate & scale', icon: Bot },
    { id: '05', title: 'Enjoy the results', icon: Umbrella }
];

export const servicesData: ReadonlyArray<ServiceItem> = [
    {
        title: 'Custom Software Development',
        description: 'Tailored solutions designed for your specific business logic and workflows.',
        icon: Code
    },
    {
        title: 'Automation Systems',
        description: 'Streamline operations with intelligent automation that scales with your growth.',
        icon: Cog
    },
    {
        title: 'AI Integration',
        description: 'Embed AI capabilities into your existing systems for smarter decision-making.',
        icon: BrainCircuit
    },
    {
        title: 'Web & Mobile Applications',
        description: 'Cross-platform applications built with modern frameworks and best practices.',
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
    },
    {
        title: 'Operational Backend Architecture',
        description: 'Scalable backend system designed to handle high-throughput operational data with real-time processing capabilities.'
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
