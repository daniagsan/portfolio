import { Suspense, lazy } from 'react';
import { HeroSection } from './components/HeroSection';

const ProcessSection = lazy(() => import('./components/ProcessSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const TechStackSection = lazy(() => import('./components/TechStackSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const EducationSection = lazy(() => import('./components/EducationSection'));

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[100dvh] w-full snap-start flex-shrink-0 flex flex-col overflow-y-hidden">
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full py-10">
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center font-mono text-sm text-gray-400 uppercase tracking-widest">// loading module</div>}>
        {children}
      </Suspense>
    </div>
  </div>
);

export function App() {
  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-white dot-grid relative flex flex-col">
      <SectionWrapper><HeroSection /></SectionWrapper>
      <SectionWrapper><ProcessSection /></SectionWrapper>
      <SectionWrapper><ServicesSection /></SectionWrapper>
      <SectionWrapper><TechStackSection /></SectionWrapper>
      <SectionWrapper><ExperienceSection /></SectionWrapper>
      <SectionWrapper><ProjectsSection /></SectionWrapper>
      <SectionWrapper><EducationSection /></SectionWrapper>
    </div>
  );
}