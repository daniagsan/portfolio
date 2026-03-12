import { motion } from 'framer-motion';
import { educationData } from '../data/mockData';

export function EducationSection() {
  return (
    <section className="w-full h-full relative bg-white" id="education">
      <div className="mb-16 md:mb-20 w-full">
        <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
          // education
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          Education
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
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
      </div>
    </section>
  );
}
