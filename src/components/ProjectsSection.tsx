import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader as LucideLoader, Lock } from 'lucide-react';
import { containerVariants, itemVariants } from '../animations';
import { SectionHeader } from './SectionHeader';
import { projectsData } from '../data/mockData';
import Loader from './Cube';
import Switch from './Switch';

export function ProjectsSection() {
  const [isPinned, setIsPinned] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const handlePinChange = (pinned: boolean, index: number) => {
    setIsPinned(pinned);
    if (pinned) {
      setActiveProjectIndex(index);
    }
  };

  const activeProject = projectsData[activeProjectIndex];

  return (
    <section className="w-full h-full relative flex flex-col justify-center" id="projects">
      <SectionHeader label="projects" title="Systems Built" className="mb-8 w-full flex-shrink-0">
        <p className="font-mono text-xs text-black flex items-center gap-2 uppercase tracking-wide font-bold">
          <Lock size={14} className="inline shrink-0" />
          Client confidentiality — presented as abstracted case studies.
        </p>
      </SectionHeader><Switch />
      <div className="h-100 relative flex items-center justify-center -gap-2">
        <Loader onPinChange={handlePinChange} />
        <span
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isPinned ? 'opacity-100 left-[calc(15%+140px)]' : 'opacity-0 left-[calc(50%+140px)] pointer-events-none'
            }`}
        >
          <svg
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
            className="h-100 w-6" // Usa h-[px] para el alto exacto que quieras
          >
            <path
              d="M18,2 L5,2 L5,98 L18,98" // Forma de corchete recto [
              fill="none"
              stroke="black"
              strokeWidth="4" // Tu grosor solicitado
              strokeLinejoin="miter" // Mantiene las esquinas en ángulo recto
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>

        {isPinned && activeProject && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="absolute left-[calc(15%+180px)] right-0 pr-12 flex flex-col gap-8" // <--- 'flex-col' y 'gap' para separar secciones
          >
            {/* Título Principal */}
            <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-black">
              {activeProject.title}
            </div>

            {/* Contenedor de Detalles */}
            <div className="flex flex-col gap-10"> {/* Apilado vertical de los datos */}

              <div>
                <h3 className="font-mono text-10 font-bold uppercase text-black/40 tracking-widest mb-1.5">Platform</h3>
                <p className="font-mono text-[15px] text-black/80">{activeProject.platform}</p>
              </div>

              <div>
                <h3 className="font-mono text-10 font-bold uppercase text-black/40 tracking-widest mb-1.5">Type</h3>
                <p className="font-mono text-[15px] text-black/80">{activeProject.type}</p>
              </div>

              <div>
                <h3 className="font-mono text-10 font-bold uppercase text-black/40 tracking-widest mb-1.5">Stack</h3>
                <p className="font-mono text-[15px] text-black/80">
                  {activeProject.techStack.join(' / ')}
                </p>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
