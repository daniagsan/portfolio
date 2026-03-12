import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { containerVariants } from '../animations';
import { SectionHeader } from './SectionHeader';
import type { ServiceItem } from '../data/mockData';
import { servicesData } from '../data/mockData';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const cardAnimations = {
  container: "transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:rotate-0 group-hover:scale-[1.6] sm:group-hover:scale-125 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-4",
  innerContainer: "group-hover:rotate-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
  iconWrapper: "transform transition-all duration-500 ease-out group-hover:-translate-y-5 sm:group-hover:-translate-y-8",
  hoverTextWrapper: "opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out pointer-events-none group-hover:pointer-events-auto"
};

const ServiceCard = ({ service, className }: { service: ServiceItem; className?: string }) => {
  const Icon = service.icon;
  return (
    <motion.article
      variants={itemVariants}
      className={`relative z-10 group cursor-pointer hover:z-50 w-32 h-32 sm:w-44 sm:h-44 ${className ?? ''}`}
    >
      <div className={`relative flex flex-col items-center justify-center overflow-hidden w-full h-full bg-white border-2 border-black transform rotate-45 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${cardAnimations.container}`}>
        <div className={`w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 transform -rotate-45 ${cardAnimations.innerContainer}`}>

          <div className={`flex flex-col items-center -translate-y-2 sm:-translate-y-4 ${cardAnimations.iconWrapper}`}>
            <div className="bg-black border-2 border-black p-2 mb-1 sm:mb-2 text-white">
              <Icon size={20} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-heading font-bold text-[9px] sm:text-xs text-center uppercase text-black tracking-wide leading-tight px-1 group-hover:opacity-0 transition-opacity duration-300">
              {service.title}
            </h3>
          </div>

          <div className={`absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 ${cardAnimations.hoverTextWrapper}`}>
            <h3 className="font-heading font-bold uppercase text-black text-center tracking-wide leading-tight text-[8px] sm:text-[10px] mb-1 sm:mb-2 mt-12 sm:mt-14 pb-1 border-b-2 border-black">
              {service.title}
            </h3>
            <p className="font-body font-medium text-black text-center leading-snug text-[7px] sm:text-[9px]">
              {service.description}
            </p>
          </div>

        </div>
      </div>
    </motion.article>
  );
};

export function ServicesSection() {
  return (
    <section className="w-full h-full relative bg-white" id="services">
      <SectionHeader label="Services" title="What Do You Need?" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-50px' }}
        className="flex w-full justify-center mt-[12%]"
      >
        <div>
          <ServiceCard service={servicesData[0]} className="md:translate-y-8" />
        </div>
        <div className="md:translate-y-44">
          <ServiceCard service={servicesData[1]} className="md:translate-y-10" />
        </div>
        <div>
          <ServiceCard service={servicesData[2]} className="md:-translate-y-8" />
        </div>
        <div className="md:translate-y-44">
          <ServiceCard service={servicesData[3]} className="md:translate-y-8" />
        </div>
      </motion.div>
    </section>
  );
}
