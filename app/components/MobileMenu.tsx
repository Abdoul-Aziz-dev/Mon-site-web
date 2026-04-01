'use client';
import { useState } from 'react';

interface MobileMenuProps {
  children: React.ReactNode;
}

export default function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      <div 
        className={`mobile-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      
      <aside className={isOpen ? 'mobile-open' : ''}>
        {children}
      </aside>
    </>
  );
}
