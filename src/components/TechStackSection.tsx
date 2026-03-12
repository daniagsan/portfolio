import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { techStack } from '../data/mockData';
import { useFloatingBot } from '../hooks/useFloatingBot';

import jsIcon from '../assets/tech/js-svgrepo-com.svg';
import playwrightIcon from '../assets/tech/playwright.svg';
import redisIcon from '../assets/tech/redis-svgrepo-com.svg';

// Helper: Basic Framer Motion particle burst
const ParticleBurst = ({ x, y, onComplete }: { x: number, y: number, onComplete: () => void }) => {
  return (
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={i === 0 ? onComplete : undefined}
            className="absolute w-2 h-2 bg-black rounded-full"
          />
        );
      })}
    </div>
  );
};

// Strict type read interface
interface FloatingBotProps {
  name: string;
  initialX: number;
  initialY: number;
  containerRef: React.RefObject<HTMLDivElement>;
  onCollide: (x: number, y: number) => void;
}

const FloatingBot = ({
  name,
  initialX,
  initialY,
  containerRef,
  onCollide
}: Readonly<FloatingBotProps>) => {
  const [isHovered, setIsHovered] = useState(false);
  const pos = useFloatingBot({ initialX, initialY, containerRef, isHovered, onCollide });

  return (
    <div
      className="absolute border-2 border-black bg-white px-4 py-2 font-heading font-bold uppercase z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer transition-transform"
      style={{ left: pos.x, top: pos.y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-4 h-4 rounded-full bg-black animate-pulse" />
      <span className="text-sm">{name}</span>
    </div>
  );
};


export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number }>>([]);
  const particleId = useRef(0);

  const handleCollide = (x: number, y: number) => {
    const id = particleId.current++;
    setParticles(prev => [...prev, { id, x, y }]);
  };

  const removeParticle = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section className="w-full relative bg-white flex flex-col" id="stack" ref={containerRef}>
      <div className="mb-16 w-full flex-shrink-0">
        <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
          // Tools
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          My Tools (Tech Stack)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 relative w-full gap-12">

        <div className="flex flex-col gap-14 sm:gap-2 w-max px-4 relative z-10">
          {techStack.map((tech, index) => {
            return (
              <motion.div
                key={tech.id}
                className="w-max flex relative items-center gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
              >

                {/* The springing icon */}
                <motion.div
                  variants={{
                    hidden: { y: -50, opacity: 0, scale: 0.5 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 150,
                        mass: 1,
                        delay: index * 0.1
                      }
                    }
                  }}
                  className="flex-1 w-16 h-16 bg-white border-2 border-black z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-2 min-h-0"
                >
                  <img src={tech.icon as string} alt={tech.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </motion.div>

                {/* The sliding out title */}
                <div className="overflow-visible">
                  <motion.div
                    variants={{
                      hidden: {
                        x: -20,
                        opacity: 0,
                      },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.4,
                          delay: (index * 0.1) + 0.3,
                          ease: "easeOut"
                        }
                      }
                    }}
                    className="font-heading font-bold text-sm sm:text-base lg:text-lg uppercase whitespace-nowrap bg-black text-white px-3 py-1"
                  >
                    {tech.name}
                  </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* COLUMN 2: Justification Boxes */}
        <div className="flex flex-col justify-around h-full gap-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            className="w-full p-6 bg-white border-2 border-dashed border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <span className="font-mono text-xs uppercase block text-black font-bold mb-2">
              // Front End
            </span>
            <p className="font-body text-xs leading-relaxed text-black mb-6">
              I utilize React and modern frameworks for component-driven scalability and maintainability, but I also possess the fluency to build highly optimized layouts natively using raw <span className="font-bold">HTML, CSS, y JS</span>. Playwright enables robust E2E testing and scraping to ensure quality.
            </p>

            {/* JS Icon appended to the bottom right boundary of the box */}
            <div className="absolute -bottom-6 -right-4 w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
              <img src={jsIcon} alt="JavaScript" className="w-full h-full object-contain" loading="lazy" decoding="async" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            className="w-full p-6 bg-white border-2 border-dashed border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <span className="font-mono text-xs uppercase block text-black font-bold mb-2">
              // Back End
            </span>
            <p className="font-body text-xs leading-relaxed text-black mb-6">
              Python and Django form the core of my robust backend logic, supplemented by tools like <span className="font-bold">Celery y Redis</span> for distributed task queueing and caching. Java ensures enterprise readiness while Docker containers manage microservice isolation.
            </p>

            {/* Back End additional tools placed at the bottom bounds */}
            <div className="absolute -bottom-6 -right-2 flex gap-2 z-20">
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={playwrightIcon} alt="Playwright" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={redisIcon} alt="Redis" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-heading font-black text-xs">CEL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Bots — clipped to section bounds without affecting grid content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingBot
            name="Gemini"
            initialX={20}
            initialY={500}
            containerRef={containerRef}
            onCollide={handleCollide}
          />
          <FloatingBot
            name="Claude"
            initialX={250}
            initialY={600}
            containerRef={containerRef}
            onCollide={handleCollide}
          />
        </div>

        {/* Burst Particles */}
        {particles.map(p => (
          <ParticleBurst key={p.id} x={p.x} y={p.y} onComplete={() => removeParticle(p.id)} />
        ))}
      </div>
    </section>
  );
}