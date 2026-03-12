import { motion } from 'framer-motion';
import { educationData } from '../data/mockData';

export function EducationSection() {
  return (
    <section className="w-full h-full relative bg-white flex flex-col justify-center" id="education">
      <div className="mb-16 md:mb-20">
        <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
          // education
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          Education
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((item, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: false,
              margin: '-50px'
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            className="flex flex-col">

            <h3 className="font-heading font-semibold text-base text-gray-900 mb-1">
              {item.degree}
            </h3>
            <span className="font-mono text-xs text-gray-400 mb-3 block">
              {item.institution}
            </span>
            <p className="font-body text-sm text-gray-600">
              {item.description}
            </p>
          </motion.div>
        )}
      </div>
    </section>);

}