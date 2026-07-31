import React, { useState } from 'react';
import Translate from '@docusaurus/Translate';

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion'>
      <div
        className={`accordion-header ${!isOpen ? 'menu__list-item--collapsed' : ''}`}
        onClick={toggleAccordion}
      >
        <div className='accordion-title'>
          <span><Translate id="accordion.optional">Optional</Translate></span>
          {children[0]}
        </div>
        <span className='menu__caret'></span>
      </div>
      {isOpen && 
        <div className='accordion-body'>
          {children[1]}
        </div>
      }
    </div>
  );
};

export default Accordion;
