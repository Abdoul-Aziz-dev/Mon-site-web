'use client';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'color', size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: { circle: '35px', font: '0.7rem' },
    md: { circle: '45px', font: '0.85rem' },
    lg: { circle: '60px', font: '1.2rem' }
  };

  const currentSize = sizeMap[size];
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ 
        background: variant === 'color' ? 'var(--primary)' : variant === 'light' ? 'white' : '#0f172a',
        color: variant === 'color' ? 'white' : variant === 'light' ? 'var(--primary)' : 'white',
        fontWeight: 900,
        borderRadius: '50%',
        width: currentSize.circle,
        height: currentSize.circle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: currentSize.font,
        letterSpacing: '-0.5px',
        boxShadow: variant === 'color' ? '0 4px 12px rgba(192, 57, 43, 0.2)' : 'none',
        flexShrink: 0
      }}>
        GSEAB
      </div>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: size === 'lg' ? '1.5rem' : '1.1rem', letterSpacing: '-0.02em' }}>
          Groupe Scolaire
        </div>
        <div style={{ fontSize: size === 'lg' ? '0.95rem' : '0.8rem', color: 'var(--primary)', fontWeight: 600, opacity: 0.9 }}>
          Elhadj Amadou Barry
        </div>
      </div>
    </div>
  );
}
