'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isPrivate = pathname?.startsWith('/admin') || 
                    pathname?.startsWith('/login') || 
                    pathname?.startsWith('/register') ||
                    pathname?.startsWith('/student') || 
                    pathname?.startsWith('/teacher');
  
  if (!mounted) return <div style={{ background: 'var(--background)', minHeight: '100vh' }}></div>;

  if (isPrivate) {
    return <>{children}</>;
  }

  return (
    <>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.25rem 4rem', 
        borderBottom: '1px solid var(--surface-border)', 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      }} className="main-nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo size="md" />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <div style={{ display: 'flex', gap: '2rem', fontWeight: 600, fontSize: '0.95rem' }}>
            <Link href="/" style={{ color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}>Accueil</Link>
            <Link href="/about" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}>À propos</Link>
            <Link href="/news" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}>Actualités</Link>
            <Link href="/contact" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}>Contact</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '1px solid var(--surface-border)', paddingLeft: '1.5rem' }}>
            <ThemeToggle />
            <Link href="/login" className="btn-premium btn-outline-custom" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}>
              Se connecter
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ minHeight: 'calc(100vh - 86px)', paddingTop: '86px' }}>
        {children}
      </main>

      <footer style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '5rem 4rem 3rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
              <Logo variant="color" size="md" />
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1rem', maxWidth: '350px' }}>
              L&apos;excellence académique au service de l&apos;épanouissement de chaque élève. GSEAB, préparer demain, aujourd&apos;hui.
            </p>
          </div>
          <div>
            <h4 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', color: 'white' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/" style={{ color: '#94a3b8', transition: 'color 0.2s', textDecoration: 'none' }}>Accueil</Link></li>
              <li><Link href="/about" style={{ color: '#94a3b8', transition: 'color 0.2s', textDecoration: 'none' }}>À propos</Link></li>
              <li><Link href="/news" style={{ color: '#94a3b8', transition: 'color 0.2s', textDecoration: 'none' }}>Actualités</Link></li>
              <li><Link href="/contact" style={{ color: '#94a3b8', transition: 'color 0.2s', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', color: 'white' }}>Contact Direct</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#94a3b8' }}>
              <p>📍 Conakry, Guinée</p>
              <p>📧 contact@gseab.gn</p>
              <p>📞 +224 000 00 00 00</p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem', color: '#64748b', borderTop: '1px solid #1e293b', paddingTop: '2.5rem', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Groupe Scolaire Elhadj Amadou Barry (GSEAB). Design Premium & Fonctionnel.
        </div>
      </footer>
    </>
  );
}
