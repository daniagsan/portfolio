import { motion } from 'framer-motion';
import { processSteps } from '../data/mockData';

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
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export function ProcessSection() {
  return (
    <section className="w-full h-full relative bg-white flex flex-col justify-center" id="process">

      <div className="mb-16 md:mb-20 w-full">
        <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
          // Process
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          System Thinking
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-50px' }}
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
                borderLeftWidth: index === 0 ? '0px' : '2px',
                borderRightWidth: index === processSteps.length - 1 ? '0px' : '2px'
              }}
            >
              {/* Icon placed vertically aligned on the step or on top of it */}
              <div className="absolute -top-[52px] md:-top-[64px] left-[50%] transform -translate-x-[50%] bg-white border-2 border-black p-2 md:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                <step.icon size={28} strokeWidth={1.5} className="text-black" />
              </div>

              {/* Text inside the step */}
              <div className="px-1 md:px-2 mt-4 md:mt-6 w-full flex items-start justify-center overflow-hidden">
                <span className="font-heading font-bold text-[8px] md:text-sm tracking-wide hidden sm:block bg-black text-white px-1 py-1 uppercase w-full">
                  {step.title}
                </span>
                {/* Fallback for ultra-small screens */}
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