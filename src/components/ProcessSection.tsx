import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations';
import { SectionHeader } from './SectionHeader';
import { processSteps } from '../data/mockData';

export function ProcessSection() {
  return (
    <section className="w-full relative flex flex-col" id="process">
      <SectionHeader label="Process" title="System Thinking" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-10%' }}
        className="w-full flex flex-row items-end h-[400px] md:h-[500px] border-b-4 border-l-4 border-black"
      >
        {processSteps.map((step, index) => (
          <motion.div
            key={step.id}
            variants={itemVariants}
            className="flex-1 flex flex-col justify-end relative h-full group"
          >
            <div
              className="w-full bg-white border-x-2 border-t-4 border-black flex flex-col items-center justify-start text-black text-center relative transition-colors shadow-none"
              style={{
                height: `${(index + 1) * 20}%`,
                borderLeftWidth: index === 0 ? '0px' : '2px'
              }}
            >
              {/* Floating Icon and Description Tooltip */}
              <div className="absolute -top-[52px] md:-top-[64px] left-[50%] transform -translate-x-[50%] z-30">
                {/* Description Bubble - Positioned relative to the anchor */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 bg-black text-white p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-32 md:w-48 pointer-events-none">
                  <p className="font-body text-[10px] md:text-xs leading-tight text-center">
                    {step.description}
                  </p>
                </div>

                {/* Icon Square - Stays at fixed original position */}
                <div className="bg-white border-2 border-black p-2 md:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                  <step.icon size={28} strokeWidth={1.5} className="text-black" />
                </div>
              </div>

              <div className="px-1 md:px-2 mt-4 md:mt-6 w-full flex items-start justify-center overflow-hidden">
                <span className="font-heading font-bold text-[8px] md:text-sm tracking-wide hidden sm:block bg-black text-white px-1 py-1 uppercase w-full">
                  {step.title}
                </span>
                <span className="font-heading font-bold text-[10px] transform -rotate-90 origin-center block sm:hidden whitespace-nowrap mt-12 bg-black text-white px-2 py-1 uppercase">
                  {step.title}
                </span>
              </div>
            </div>          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
