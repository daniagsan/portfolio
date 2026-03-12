import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations';
import { SectionHeader } from './SectionHeader';
import { processSteps } from '../data/mockData';

export function ProcessSection() {
  return (
    <section className="w-full h-full relative" id="process">
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
              <div className="absolute -top-[52px] md:-top-[64px] left-[50%] transform -translate-x-[50%] bg-white border-2 border-black p-2 md:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                <step.icon size={28} strokeWidth={1.5} className="text-black" />
              </div>

              <div className="px-1 md:px-2 mt-4 md:mt-6 w-full flex items-start justify-center overflow-hidden">
                <span className="font-heading font-bold text-[8px] md:text-sm tracking-wide hidden sm:block bg-black text-white px-1 py-1 uppercase w-full">
                  {step.title}
                </span>
                <span className="font-heading font-bold text-[10px] transform -rotate-90 origin-center block sm:hidden whitespace-nowrap mt-12 bg-black text-white px-2 py-1 uppercase">
                  {step.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
