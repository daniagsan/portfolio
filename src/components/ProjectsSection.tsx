import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lock, Layers } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { projectsData, designProjectsData } from '../data/mockData';
import Loader from './Cube';
import Switch from './Switch';
import { ImageViewer } from '../components/pdf/Viewer';

const cEaDRaw = import.meta.glob<string>(
  '../assets/pdf/CEaD_ManualdeIdentidad/*.webp',
  { eager: true, query: '?url', import: 'default' }
);
const cEaDPages = Object.keys(cEaDRaw).sort().map(k => cEaDRaw[k]);

const dDIERaw = import.meta.glob<string>(
  '../assets/pdf/DDIE_ManualdeIDentidad/*.webp',
  { eager: true, query: '?url', import: 'default' }
);
const dDIEPages = Object.keys(dDIERaw).sort().map(k => dDIERaw[k]);

const DOCS = [
  { title: 'CEaD — Manual de Identidad', pages: cEaDPages },
  { title: 'DDIE — Manual de Identidad', pages: dDIEPages },
];

export function ProjectsSection() {
  const [isPinned, setIsPinned] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDesignMode, setIsDesignMode] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const handlePinChange = useCallback((pinned: boolean, index: number) => {
    setIsPinned(pinned);
    if (!pinned) setSelectedDoc(null);
    if (pinned) setActiveProjectIndex(index);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedDoc(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const currentData = isDesignMode ? designProjectsData : projectsData;
  const activeProject = currentData[activeProjectIndex];

  return (
    <section className="w-full h-full relative flex flex-col justify-center" id="projects">

      {selectedDoc !== null && (
        <motion.div
          key={selectedDoc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.6)' }}
        >
          <div className="relative w-full max-w-2xl h-[90vh] flex flex-col mx-6">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-black font-bold">
                {DOCS[selectedDoc].title}
              </span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="font-mono text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                ✕ Close
              </button>
            </div>
            <ImageViewer
              title={DOCS[selectedDoc].title}
              pages={DOCS[selectedDoc].pages}
            />
          </div>
        </motion.div>
      )}
      <SectionHeader
        label={isDesignMode ? 'portfolio.v2 / brand' : 'projects'}
        title={isDesignMode ? 'Brand Systems' : 'Systems Built'}
        className="mb-16 w-full flex-shrink-0"
      >
        <div className="flex items-center justify-between gap-4 mt-3">
          <p className="font-mono text-xs text-black flex items-center gap-2 uppercase tracking-wide font-bold">
            {isDesignMode ? (
              <>
                <Layers size={14} className="inline shrink-0" />
                <span className="font-mono text-[10px] border border-black/20 px-2 py-0.5 bg-white">[SYSTEM_IDENTITY]</span>
                Brand blueprints & identity systems.
              </>
            ) : (
              <>
                <Lock size={14} className="inline shrink-0" />
                Client confidentiality — presented as abstracted case studies.
              </>
            )}
          </p>
          <Switch
            checked={isDesignMode}
            onChange={setIsDesignMode}
          />
        </div>
      </SectionHeader>

      <div className="h-100 relative flex items-center justify-center -gap-2">
        <Loader onPinChange={handlePinChange} isDesignMode={isDesignMode} />
        <span
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isPinned ? 'opacity-100 left-[calc(15%+140px)]' : 'opacity-0 left-[calc(50%+140px)] pointer-events-none'
            }`}
        >
          <svg
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
            className="h-100 w-6"
          >
            <path
              d="M18,2 L5,2 L5,98 L18,98"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>

        {isPinned && activeProject && (
          <motion.div
            key={`${isDesignMode}-${activeProjectIndex}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="absolute left-[calc(15%+180px)] right-0 pr-12 flex flex-col gap-4"
          >
            <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-black flex items-center gap-3">
              {activeProject.title}
              {isDesignMode && (
                <span className="inline-block bg-black text-white font-mono text-[9px] border border-white/10 px-1.5 py-0.5 tracking-wider uppercase">
                  [BRAND_MANUAL]
                </span>
              )}
            </div>

            <div className="flex gap-4">
              {DOCS.map((doc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDoc(i)}
                  className="group flex flex-col gap-2 w-1/2 text-left"
                >
                  <div className="border-2 border-black/10 overflow-hidden group-hover:border-black transition-colors duration-200">
                    <img
                      src={doc.pages[0]}
                      alt={doc.title}
                      className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/50 group-hover:text-black transition-colors">
                    {doc.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
