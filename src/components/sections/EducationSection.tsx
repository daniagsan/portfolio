import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { educationData } from '@/data/portfolio';

export function EducationSection() {
  return (
    <section className="w-full h-full relative flex flex-col justify-center align-center" id="education">
      <SectionHeader label="education" title="Education" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="font-heading font-bold text-base text-black mb-1 uppercase tracking-tight">
              {item.degree}
            </h3>
            <span className="font-mono text-xs text-black mb-4 block border-b-2 border-black pb-2 uppercase font-bold tracking-wide">
              {item.institution}
            </span>
            <p className="font-body text-sm text-black leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default EducationSection;
