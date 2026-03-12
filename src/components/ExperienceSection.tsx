import { motion } from 'framer-motion';
import { experienceData } from '../data/mockData';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};
export function ExperienceSection() {
  return (
    <section className="w-full h-full relative bg-white flex flex-col justify-center" id="experience">
      <div className="mb-12">
        <span className="font-mono text-xs text-gray-400 mb-2 block">
          {' '}
          // experience
        </span>
        <h2 className="font-heading text-2xl font-semibold text-black">
          Professional Experience
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-100px'
        }}
        className="flex flex-col">

        {experienceData.map((exp, index) =>
          <motion.div
            key={index}
            variants={itemVariants}
            className="py-8 border-b border-gray-200 last:border-0 group">

            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 gap-2 md:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                <h3 className="font-heading font-semibold text-lg text-gray-900">
                  {exp.role}
                </h3>
                <span className="hidden sm:inline text-gray-300">/</span>
                <span className="font-body text-gray-600 font-medium">
                  {exp.organization}
                </span>
              </div>
              <span className="font-mono text-xs text-gray-400 tracking-wide">
                {exp.timeframe}
              </span>
            </div>
            <p className="font-body text-sm text-gray-600 leading-relaxed max-w-3xl">
              {exp.impact}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>);

}