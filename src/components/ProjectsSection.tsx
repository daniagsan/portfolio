import { motion } from 'framer-motion';
import { Loader as LucideLoader, Lock } from 'lucide-react';
import { containerVariants, itemVariants } from '../animations';
import { SectionHeader } from './SectionHeader';
import { projectsData } from '../data/mockData';
import Loader from './Cube';

export function ProjectsSection() {
  return (
    <section className="w-full h-full relative flex flex-col justify-center" id="projects">
      <SectionHeader label="projects" title="Systems Built" className="mb-16 w-full flex-shrink-0">
        <p className="font-mono text-xs text-black flex items-center gap-2 uppercase tracking-wide font-bold">
          <Lock size={14} className="inline shrink-0" />
          Client confidentiality — presented as abstracted case studies.
        </p>
      </SectionHeader>
      <div className="h-100 flex items-center justify-center">
        <Loader />
      </div>
    </section>
  );
}
