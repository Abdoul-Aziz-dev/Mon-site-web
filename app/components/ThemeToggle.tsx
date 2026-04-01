'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '50%' }}></div>
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      type="button"
      aria-label="Toggle Theme"
      style={{ 
        background: 'var(--surface-border)', 
        border: 'none', 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        cursor: 'pointer', 
        fontSize: '1.2rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
