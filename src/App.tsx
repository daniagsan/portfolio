import { HeroSection } from './components/HeroSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { TechStackSection } from './components/TechStackSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[100dvh] w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center overflow-hidden snap-start py-10">
    {children}
  </div>
);

export function App() {
  return (
    <div className="h-[100dvh] w-full overflow-y-auto snap-y snap-proximity bg-white dot-grid relative scroll-smooth flex flex-col">
      <main className="w-full mx-auto relative z-10">
        <SectionWrapper><HeroSection /></SectionWrapper>
        <SectionWrapper><ProcessSection /></SectionWrapper>
        <SectionWrapper><ServicesSection /></SectionWrapper>
        <SectionWrapper><TechStackSection /></SectionWrapper>
        <SectionWrapper><ExperienceSection /></SectionWrapper>
        <SectionWrapper><ProjectsSection /></SectionWrapper>
        <SectionWrapper><EducationSection /></SectionWrapper>
        <SectionWrapper><Footer /></SectionWrapper>
      </main>
    </div>
  );
}