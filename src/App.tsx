import { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';

const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const TechStackSection = lazy(() => import('@/components/sections/TechStackSection'));
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection'));
const ProjectsSection = lazy(() => import('@/components/sections/projects/ProjectsSection'));
const EducationSection = lazy(() => import('@/components/sections/EducationSection'));

const Skeleton = () => (
  <div className="h-full w-full flex flex-col justify-center gap-8 animate-pulse">
    <div className="h-0.5 bg-black w-full" />
    <div className="flex flex-col gap-4">
      <div className="h-8 bg-black w-2/5" />
      <div className="h-5 bg-black/60 w-1/3 mt-1" />
      <div className="flex flex-col gap-2 mt-6">
        <div className="h-3 bg-black/10 w-4/5" />
        <div className="h-3 bg-black/10 w-3/5" />
        <div className="h-3 bg-black/10 w-2/3" />
      </div>
    </div>
  </div>
);

const SectionWrapper = ({ children, eager = false }: { children: React.ReactNode; eager?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={ref} className="h-[100dvh] w-full snap-start flex-shrink-0 flex flex-col overflow-y-hidden">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full py-10">
        {shouldRender ? (
          <Suspense fallback={<Skeleton />}>
            {children}
          </Suspense>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export function App() {
  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-white dot-grid relative flex flex-col">
      <SectionWrapper eager><HeroSection /></SectionWrapper>
      <SectionWrapper><ProcessSection /></SectionWrapper>
      <SectionWrapper><ServicesSection /></SectionWrapper>
      <SectionWrapper><TechStackSection /></SectionWrapper>
      <SectionWrapper><ExperienceSection /></SectionWrapper>
      <SectionWrapper><ProjectsSection /></SectionWrapper>
      <SectionWrapper><EducationSection /></SectionWrapper>
    </div>
  );
}
