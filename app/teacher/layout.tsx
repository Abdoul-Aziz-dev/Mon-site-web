'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'teacher') {
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
    router.push('/login');
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const links = [
    { name: "Tableau de bord", path: "/teacher", icon: "🏠" },
    { name: "Mes Classes", path: "/teacher/classes", icon: "👥" },
    { name: "Saisie des Notes", path: "/teacher/grading", icon: "📝" },
    { name: "Emploi du temps", path: "/teacher/schedule", icon: "📅" },
    { name: "Annonces Classes", path: "/teacher/announcements", icon: "📢" },
    { name: "Messages Parents", path: "/teacher/messages", icon: "✉️" }
  ];

  if (!user) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Chargement...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar - Faculty Specialty */}
      <aside style={{ 
        width: '300px', 
        backgroundColor: 'var(--secondary)', 
        color: 'white', 
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
           <div style={{ background: 'white', padding: '0.75rem', borderRadius: '14px', width: 'fit-content' }}>
              <Logo variant="color" size="sm" />
           </div>
           <div style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>ESPACE ENSEIGNANT</div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
           {links.map(link => {
             const isActive = pathname === link.path;
             return (
               <Link key={link.name} href={link.path} style={{ 
                 padding: '1.1rem 1.25rem', 
                 borderRadius: '16px', 
                 background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent', 
                 fontWeight: isActive ? 800 : 500, 
                 color: isActive ? 'white' : 'rgba(255,255,255,0.6)', 
                 transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                 textDecoration: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 fontSize: '0.95rem'
               }}
               className="sidebar-link-teacher"
               >
                 <span style={{ fontSize: '1.2rem', opacity: isActive ? 1 : 0.7 }}>{link.icon}</span>
                 {link.name}
               </Link>
             )
           })}
        </nav>
        
        <div style={{ marginTop: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
           <button onClick={handleLogout} style={{ 
             padding: '1.1rem', 
             borderRadius: '12px', 
             color: '#fca5a5', 
             fontWeight: 700, 
             border: '1px solid rgba(248, 113, 113, 0.25)', 
             textAlign: 'center', 
             transition: 'all 0.2s ease', 
             fontSize: '0.9rem',
             background: 'rgba(248, 113, 113, 0.05)',
             cursor: 'pointer'
           }}>
             🚪 Déconnexion
           </button>
           <Link href="/" style={{ 
             padding: '1.1rem', 
             borderRadius: '12px', 
             color: 'rgba(255,255,255,0.6)', 
             fontWeight: 700, 
             display: 'block', 
             border: '1px solid rgba(255,255,255,0.15)', 
             textAlign: 'center', 
             transition: 'all 0.2s ease', 
             textDecoration: 'none',
             fontSize: '0.9rem',
             background: 'rgba(255,255,255,0.05)'
           }}>
             ← Session Publique
           </Link>
        </div>
      </aside>
      
      {/* Main Area */}
      <main style={{ flex: 1, marginLeft: '300px', padding: '0', minHeight: '100vh' }}>
        {/* Top Header */}
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
          backdropFilter: 'blur(10px)'
        }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
             <ThemeToggle />
             <div style={{ 
               background: 'var(--surface-hover)', 
               padding: '0.6rem 1.25rem', 
               borderRadius: '999px', 
               border: '1px solid var(--surface-border)', 
               display: 'flex', 
               alignItems: 'center', 
               gap: '1rem',
               boxShadow: 'var(--shadow-sm)'
             }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Enseignant: <strong style={{ color: 'var(--text-main)' }}>{user.name}</strong></span>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--secondary)', 
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

        <div style={{ padding: '3.5rem 4rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
