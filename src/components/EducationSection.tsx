import { motion } from 'framer-motion';
import { educationData } from '../data/mockData';

export function EducationSection() {
  return (
    <section className="w-full h-full relative bg-white flex flex-col justify-center" id="education">
      <div className="mb-12">
        <span className="font-mono text-xs text-gray-400 mb-2 block">
          {' '}
          // education
        </span>
        <h2 className="font-heading text-2xl font-semibold text-black">
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
              once: true,
              margin: '-100px'
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