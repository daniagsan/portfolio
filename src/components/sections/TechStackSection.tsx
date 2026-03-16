import { useState, useRef, useCallback, memo } from 'react';
import type { RefObject } from 'react';
import { motion } from 'framer-motion';

import { techStack } from '@/data/portfolio';
import { useFloatingBot } from '@/hooks/useFloatingBot';
import { SectionHeader } from '@/components/ui/SectionHeader';

import jsIcon from '@/assets/tech/js-svgrepo-com.svg';
import playwrightIcon from '@/assets/tech/playwright.svg';
import redisIcon from '@/assets/tech/redis-svgrepo-com.svg';
import figmaIcon from '@/assets/tech/figma-svgrepo-com.svg';
import psIcon from '@/assets/tech/photoshop-svgrepo-com.svg';
import aiIcon from '@/assets/tech/brand-adobe-illustrator-svgrepo-com.svg';
import claudeIcon from '@/assets/tech/claude.svg';
import geminiIcon from '@/assets/tech/gemini.svg';

const ParticleBurst = memo(({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) => (
  <div className="absolute pointer-events-none" style={{ left: x, top: y, zIndex: 100 }}>
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45) * (Math.PI / 180);
      const distance = 40 + Math.random() * 20;
      return (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={i === 0 ? onComplete : undefined}
          className="absolute w-2 h-2 bg-black rounded-full"
        />
      );
    })}
  </div>
));

interface FloatingBotProps {
  name: string;
  icon: string;
  initialX: number;
  initialY: number;
  containerRef: RefObject<HTMLDivElement>;
  onCollide: (x: number, y: number) => void;
}

const FloatingBot = memo(({ name, icon, initialX, initialY, containerRef, onCollide }: Readonly<FloatingBotProps>) => {
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useFloatingBot({ domRef: divRef, initialX, initialY, containerRef, isHovered, onCollide });

  return (
    <div
      ref={divRef}
      className="absolute border-2 border-black bg-white px-4 py-2 font-heading font-bold uppercase z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer"
      style={{ left: 0, top: 0, transform: `translate(${initialX}px, ${initialY}px)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={icon} alt={name} className="w-5 h-5 animate-pulse object-contain" />
      <span className="text-sm">{name}</span>
    </div>
  );
});

export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const particleId = useRef(0);

  const handleCollide = useCallback((x: number, y: number) => {
    const id = particleId.current++;
    setParticles(prev => [...prev, { id, x, y }]);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <section className="w-full relative flex flex-col" id="stack" ref={containerRef}>
      <SectionHeader label="Tools" title="My Tools (Tech Stack)" className="mb-16 w-full flex-shrink-0" />

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] relative w-full gap-12">

        <div className="flex flex-col gap-14 sm:gap-2 w-max relative z-10">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.id}
              className="w-max flex relative items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-10%' }}
            >
              <motion.div
                variants={{
                  hidden: { y: -50, opacity: 0, scale: 0.5 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', damping: 15, stiffness: 150, mass: 1, delay: index * 0.1 }
                  }
                }}
                className="flex-1 w-16 h-16 bg-white border-2 border-black z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-2 min-h-0"
              >
                <img src={tech.icon as string} alt={tech.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </motion.div>

              <div className="overflow-visible">
                <motion.div
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.4, delay: (index * 0.1) + 0.3, ease: 'easeOut' }
                    }
                  }}
                  className="font-heading font-bold text-sm sm:text-base lg:text-lg uppercase whitespace-nowrap bg-black text-white px-3 py-1"
                >
                  {tech.name}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col h-full gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="w-full p-3 bg-white border-2 border-dashed border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <span className="font-mono text-xs uppercase block text-black font-bold mb-2">
              // Front End
            </span>
            <p className="font-body text-xs leading-relaxed text-black">
              I utilize React and modern frameworks for component-driven scalability and maintainability, but I also possess the fluency to build highly optimized layouts natively using raw <span className="font-bold">HTML, CSS, y JS</span>. Playwright enables robust E2E testing and scraping to ensure quality.
            </p>
            <div className="absolute -bottom-6 -right-2 flex gap-2 z-20">
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={jsIcon} alt="JavaScript" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="w-full p-3 bg-white border-2 border-dashed border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <span className="font-mono text-xs uppercase block text-black font-bold mb-2">
              // Back End
            </span>
            <p className="font-body text-xs leading-relaxed text-black">
              Python and Django form the core of my robust backend logic, supplemented by tools like <span className="font-bold">Celery y Redis</span> for distributed task queueing and caching. Java ensures enterprise readiness while Docker containers manage microservice isolation.
            </p>
            <div className="absolute -bottom-6 -right-2 flex gap-2 z-20">
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={playwrightIcon} alt="Playwright" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={redisIcon} alt="Redis" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
            className="w-full p-3 bg-white border-2 border-dashed border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <span className="font-mono text-xs uppercase block text-black font-bold mb-2">
              // Design & UX
            </span>
            <p className="font-body text-xs leading-relaxed text-black mb-6">
              I'll rescue your product's visual identity. Using <span className="font-bold">Figma, Illustrator, and Photoshop</span>, I translate complex technical requirements into high-converting, intuitive interfaces that resonate with your users.
            </p>
            <div className="absolute -bottom-6 -right-2 flex gap-2 z-20">
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={figmaIcon} alt="Figma" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={aiIcon} alt="Illustrator" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={psIcon} alt="Photoshop" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingBot name="Gemini" icon={geminiIcon} initialX={20} initialY={500} containerRef={containerRef} onCollide={handleCollide} />
          <FloatingBot name="Claude" icon={claudeIcon} initialX={250} initialY={600} containerRef={containerRef} onCollide={handleCollide} />
        </div>
        {particles.map(p => (
          <ParticleBurst key={p.id} x={p.x} y={p.y} onComplete={() => removeParticle(p.id)} />
        ))}
      </div>
    </section>
  );
}

export default TechStackSection;
