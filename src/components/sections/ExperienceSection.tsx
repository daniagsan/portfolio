import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { experienceData } from '@/data/portfolio';

export function ExperienceSection() {
  return (
    <section className="w-full h-full relative flex flex-col justify-center" id="experience">
      <SectionHeader label="experience" title="Professional Experience" className="mb-3 w-full flex-shrink-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-10%' }}
        className="flex flex-col"
      >
        {experienceData.map((exp) => (
          <motion.div
            key={`${exp.organization}-${exp.timeframe}`}
            variants={itemVariants}
            className="py-3 border-b-2 border-black last:border-0 group"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 gap-2 md:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                <h3 className="font-heading font-bold text-lg text-black uppercase tracking-tight">
                  {exp.role}
                </h3>
                <span className="hidden sm:inline text-black font-bold">/</span>
                <span className="font-mono text-sm text-black font-bold uppercase tracking-wide">
                  {exp.organization}
                </span>
              </div>
              <span className="font-mono text-xs text-black tracking-wide border-2 border-black px-2 py-1 shrink-0">
                {exp.timeframe}
              </span>
            </div>
            <p className="font-body text-sm text-black leading-relaxed max-w-3xl">
              {exp.impact}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default ExperienceSection;
