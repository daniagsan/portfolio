import { motion } from 'framer-motion';
import { MailIcon, Github, Linkedin } from 'lucide-react';
import profilePic from '../assets/img/84d89292-633c-46b6-8a54-aed1d0c98f62 (1).jpeg';

// Subcomponents
function HeroProfile() {
  return (
    <div className="flex flex-col items-center md:items-start shrink-0 relative z-20">
      <div className="relative w-40 h-40 md:w-56 md:h-56 border-2 border-black bg-white flex items-center justify-center p-2">
        <div className="absolute top-2 left-2 text-[10px] text-gray-400 font-mono font-bold uppercase z-10">
        </div>
        <img
          src={profilePic}
          alt="Profile"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <a
          href="mailto:jesusdanielaguilerasanchez@gmail.com"
          className="w-10 h-10 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Send email"
        >
          <MailIcon size={16} strokeWidth={1.5} />
        </a>
        <a
          href="https://github.com/daniagsan"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          aria-label="GitHub"
        >
          <Github size={16} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/daniagsan/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} strokeWidth={1.5} />
        </a>
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <>
      <div className="w-full border-b-2 border-black pb-2 mb-6 relative">
        <h1 className="font-heading font-bold text-4xl text-black tracking-tighter uppercase">
          Daniel Aguilera
        </h1>
      </div>

      <div className="w-full pb-4 mb-6">
        <h2 className="font-heading text-xl text-black font-bold uppercase tracking-wide">
          Software Engineer and
        </h2>
        <h3 className="font-heading text-xl text-black font-bold uppercase tracking-wide">
          Product / Brand Designer
        </h3>
      </div>

      <div className="w-full border-2 border-black p-6 mb-10 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h4 className="font-heading font-bold text-black uppercase text-xl md:text-2xl border-b-2 border-black pb-2 mb-4 inline-block">
          What do I do?
        </h4>
        <p className="font-body text-base md:text-lg text-black leading-relaxed">
          Bridging the gap between robust backend engineering and intuitive user experiences
          through distributed systems, AI automation, and high-performance development.
        </p>
      </div>
    </>
  );
}

function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <a
        href="#projects"
        className="px-8 py-4 text-sm font-bold border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 text-center uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0)] hover:translate-x-1 hover:translate-y-1"
      >
        What I Build
      </a>
      <a
        href="mailto:jesusdanielaguilerasanchez@gmail.com"
        className="px-8 py-4 text-sm font-bold border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors duration-200 text-center uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0)] hover:translate-x-1 hover:translate-y-1"
      >
        Contact
      </a>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="flex flex-col items-start relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full flex flex-col md:flex-row gap-12 md:gap-16 justify-start items-start relative z-10"
      >
        <HeroProfile />

        <div className="flex-1 flex flex-col items-start w-full relative">
          <HeroContent />
          <HeroActions />
        </div>
      </motion.div>


    </section>
  );
}