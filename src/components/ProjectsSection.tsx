import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { projectsData } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export function ProjectsSection() {
  return (
    <section className="w-full h-full relative bg-white flex flex-col" id="projects">
      <div className="mb-16 md:mb-20 w-full flex-shrink-0">
        <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
          // projects
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          Systems Built
        </h2>
        <p className="font-mono text-xs text-black flex items-center gap-2 uppercase tracking-wide font-bold">
          <Lock size={14} className="inline shrink-0" />
          Client confidentiality — presented as abstracted case studies.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-50px' }}
        className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar min-h-0"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-3 border-2 border-black bg-white relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Lock size={64} />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-black border-2 border-black px-2 py-0.5 bg-white font-bold">
                Confidential
              </span>
            </div>

            <h3 className="font-heading font-bold text-lg text-black mb-2 uppercase tracking-tight relative z-10">
              {project.title}
            </h3>
            <p className="font-body text-sm text-black leading-relaxed max-w-3xl relative z-10">
              {project.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
