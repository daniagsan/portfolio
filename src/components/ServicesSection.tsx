import { motion } from 'framer-motion';
import { servicesData } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const ServiceCard = ({ service, className }: { service: any; className?: string }) => {
  const Icon = service.icon;
  return (
    <motion.div
      variants={itemVariants}
      className={`relative w-32 h-32 sm:w-44 sm:h-44 z-10 group hover:z-50 ${className}`}
    >
      <div className="
        relative w-full h-full
        border-2 border-black bg-white
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        transform rotate-45
        transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
        group-hover:rotate-0
        group-hover:scale-[1.6] sm:group-hover:scale-125
        group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
        group-hover:-translate-y-4
        cursor-pointer
        overflow-hidden
        flex flex-col items-center justify-center
      ">
        <div className="
          w-full h-full flex flex-col items-center justify-center p-2 sm:p-4
          transform -rotate-45
          group-hover:rotate-0
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
        ">
          <div className="
            flex flex-col items-center
            transform transition-all duration-500 ease-out
            group-hover:-translate-y-5 sm:group-hover:-translate-y-8
          ">
            <div className="bg-black text-white p-2 mb-2 sm:mb-3 border-2 border-black">
              <Icon size={20} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-heading font-bold text-[9px] sm:text-xs text-center uppercase text-black tracking-wide leading-tight px-1 group-hover:opacity-0 transition-opacity duration-300">
              {service.title}
            </h3>
          </div>

          <div className="
            absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4
            opacity-0 translate-y-8
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-500 delay-100 ease-out
            pointer-events-none group-hover:pointer-events-auto
          ">
            <h3 className="font-heading font-bold text-[8px] sm:text-[10px] text-center uppercase text-black tracking-wide leading-tight mb-1 sm:mb-2 mt-12 sm:mt-14 border-b-2 border-black pb-1">
              {service.title}
            </h3>
            <p className="font-body font-medium text-[7px] sm:text-[9px] text-center text-black leading-snug">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ServicesSection() {
  return (
    <section className="w-full relative bg-white flex flex-col h-full" id="services">
      <div className="mb-8 flex-shrink-0">
        <span className="font-mono text-sm text-black mb-2 block font-bold uppercase tracking-widest">
          // Services
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-black uppercase tracking-tight">
          What Do You Need?
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-4 w-full flex-1 mx-auto mt-24 md:px-8 justify-items-center"
      >
        {/* Element 1: Arriba */}
        <div className="flex items-start justify-center">
          <ServiceCard service={servicesData[0]} className="md:-translate-y-8" />
        </div>
        {/* Element 2: Abajo */}
        <div className="flex items-center justify-center">
          <ServiceCard service={servicesData[1]} className="md:translate-y-8" />
        </div>
        {/* Element 3: Arriba */}
        <div className="flex items-start justify-center">
          <ServiceCard service={servicesData[2]} className="md:-translate-y-8" />
        </div>
        {/* Element 4: Abajo */}
        <div className="flex items-center justify-center">
          <ServiceCard service={servicesData[3]} className="md:translate-y-8" />
        </div>
      </motion.div>
    </section>
  );
}