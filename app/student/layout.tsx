'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

interface User {
  id: number;
  name: string;
  email: string;
  class?: string;
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const links = [
    { name: "Tableau de bord", path: "/student", icon: "🏠" },
    { name: "Mes Cours", path: "/student/courses", icon: "📚" },
    { name: "Mes Notes", path: "/student/grades", icon: "📈" },
    { name: "Mon Planning", path: "/student/schedule", icon: "📅" },
    { name: "Messagerie", path: "/student/messages", icon: "✉️" }
  ];

  useEffect(() => {
    setMounted(true);
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'student') {
        setUser(parsedUser);
      } else {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!mounted || !user) {
    return <div style={{ background: 'var(--background)', minHeight: '100vh' }}></div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <aside style={{ 
        width: '280px', 
        backgroundColor: 'var(--surface)', 
        borderRight: '1px solid var(--surface-border)', 
        padding: '2.5rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 100 
      }}>
        <div style={{ padding: '0 1rem', marginBottom: '3.5rem' }}>
           <Logo variant="color" size="sm" />
           <div style={{ marginTop: '0.75rem', fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>ESPACE ÉLÈVE</div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
           {links.map(link => {
             const isActive = pathname === link.path;
             return (
               <Link key={link.name} href={link.path} style={{ 
                 padding: '1rem 1.25rem', 
                 borderRadius: '16px', 
                 background: isActive ? 'var(--primary-light)' : 'transparent', 
                 fontWeight: isActive ? 800 : 600, 
                 color: isActive ? 'var(--primary)' : 'var(--text-muted)', 
                 transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                 textDecoration: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 fontSize: '0.95rem'
               }}
               className="sidebar-link"
               >
                 <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                 {link.name}
               </Link>
             )
           })}
        </nav>
        
        <div style={{ marginTop: 'auto', padding: '1rem' }}>
           <button onClick={handleLogout} style={{ 
             padding: '1rem', 
             borderRadius: '12px', 
             color: '#ef4444', 
             fontWeight: 700, 
             display: 'block', 
             border: '1px solid rgba(239, 68, 68, 0.15)', 
             textAlign: 'center', 
             transition: 'all 0.2s ease', 
             fontSize: '0.9rem',
             background: 'rgba(239, 68, 68, 0.05)',
             width: '100%',
             cursor: 'pointer'
           }}>
             ← Déconnexion
           </button>
        </div>
      </aside>
      
      <main style={{ flex: 1, marginLeft: '280px', padding: '0', minHeight: '100vh' }}>
        <header style={{ 
          height: '80px', 
          background: 'var(--surface)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          padding: '0 4rem', 
          borderBottom: '1px solid var(--surface-border)',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          backdropFilter: 'blur(8px)'
        }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
             <ThemeToggle />
             <div style={{ 
               background: 'var(--surface-hover)', 
               padding: '0.6rem 1.25rem', 
               borderRadius: '999px', 
               border: '1px solid var(--surface-border)', 
               display: 'flex', 
               alignItems: 'center', 
               gap: '1rem' 
             }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Élève: <strong style={{ color: 'var(--text-main)' }}>{user.name}</strong>
                </span>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 800, 
                  fontSize: '0.85rem' 
                }}>{getInitials(user.name)}</div>
             </div>
           </div>
        </header>

        <div style={{ padding: '3rem 4rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
