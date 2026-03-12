import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { projectsData } from '../data/mockData';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
export function ProjectsSection() {
  return (
    <section className="w-full h-full relative bg-white flex flex-col justify-center" id="projects">
      <div className="mb-16 md:mb-20">
        <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
          // projects
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          Systems Built
        </h2>
        <p className="font-body text-sm text-gray-500 italic max-w-2xl flex items-center gap-2 mt-2">
          <Lock size={14} className="inline" />
          Due to client confidentiality, projects are presented as abstracted
          case studies.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          margin: '-50px'
        }}
        className="flex flex-col gap-6">

        {projectsData.map((project, index) =>
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 md:p-8 rounded-lg border border-gray-200 bg-gray-50/50 relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Lock size={64} />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-0.5 rounded bg-white">
                Confidential
              </span>
            </div>

            <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 relative z-10">
              {project.title}
            </h3>
            <p className="font-body text-sm text-gray-600 leading-relaxed max-w-3xl relative z-10">
              {project.description}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>);

}