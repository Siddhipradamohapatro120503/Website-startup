import React from 'react';

interface Section {
  id: string;
  label: string;
}

interface ScrollIndicatorProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="scroll-indicator">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          className={`scroll-indicator-dot ${activeSection === id ? 'active' : ''}`}
          onClick={() => onSectionClick(id)}
          title={label}
        />
      ))}
    </div>
  );
};

export default ScrollIndicator;
