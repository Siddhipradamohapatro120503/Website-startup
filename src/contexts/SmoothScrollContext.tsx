import React, { createContext, useContext, useEffect, useRef } from 'react';

interface ScrollContextType {
  scrollToSection: (sectionId: string) => void;
  scrollTo: (element: Element) => void;
}

const SmoothScrollContext = createContext<ScrollContextType>({
  scrollToSection: () => {},
  scrollTo: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<Props> = ({ children }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollTo = (element: Element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollToSection, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const ScrollSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`scroll-section ${className}`}
      id={id}
    >
      {children}
    </section>
  );
};
