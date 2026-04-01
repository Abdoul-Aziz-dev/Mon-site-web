'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../components/ThemeToggle';
import Logo from '../components/Logo';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Etudiant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else if (data.user.role === 'teacher') {
          router.push('/teacher');
        } else {
          router.push('/student');
        }
      } else {
        setError(data.error || 'Identifiants incorrects');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, var(--background) 0%, var(--primary-light) 100%)', 
      position: 'relative',
      padding: '2rem'
    }}>
      
      <div style={{ position: 'absolute', top: '2.5rem', right: '2.5rem' }}>
         <ThemeToggle />
      </div>

      <div className="animate-fade-in card-premium" style={{ width: '100%', maxWidth: '500px', padding: '4rem', textAlign: 'center' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
           <Logo variant="color" size="lg" />
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Bienvenue</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Identifiez-vous pour accéder à votre espace.</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '14px', border: '1px solid var(--surface-border)' }}>
             <button type="button" onClick={() => setRole('Etudiant')} style={{ flex: 1, padding: '0.8rem 0.3rem', border: 'none', background: role === 'Etudiant' ? 'var(--surface)' : 'transparent', color: role === 'Etudiant' ? 'var(--text-main)' : 'var(--text-muted)', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: role === 'Etudiant' ? 'var(--shadow-sm)' : 'none' }}>👨🎓 Élève</button>
             <button type="button" onClick={() => setRole('Professeur')} style={{ flex: 1, padding: '0.8rem 0.3rem', border: 'none', background: role === 'Professeur' ? 'var(--surface)' : 'transparent', color: role === 'Professeur' ? 'var(--text-main)' : 'var(--text-muted)', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: role === 'Professeur' ? 'var(--shadow-sm)' : 'none' }}>🧑🏫 Prof.</button>
             <button type="button" onClick={() => setRole('Admin')} style={{ flex: 1, padding: '0.8rem 0.3rem', border: 'none', background: role === 'Admin' ? 'var(--surface)' : 'transparent', color: role === 'Admin' ? 'var(--primary)' : 'var(--text-muted)', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: role === 'Admin' ? 'var(--shadow-sm)' : 'none' }}>🛡️ Admin</button>
          </div>

          {error && <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

          <div>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>Adresse Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="exemple@email.com" disabled={loading} style={{ width: '100%', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--surface-border)', outline: 'none', background: 'var(--surface-hover)', fontSize: '1rem', color: 'var(--text-main)', transition: 'all 0.2s', opacity: loading ? 0.6 : 1 }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>Mot de passe</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" disabled={loading} style={{ width: '100%', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--surface-border)', outline: 'none', background: 'var(--surface-hover)', fontSize: '1rem', color: 'var(--text-main)', transition: 'all 0.2s', opacity: loading ? 0.6 : 1 }} />
          </div>
          
          <button type="submit" className="btn-premium btn-primary-custom" disabled={loading} style={{ padding: '1.25rem', fontSize: '1.1rem', justifyContent: 'center', marginTop: '1rem', borderRadius: '14px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Connexion...' : 'Se Connecter Maintenant'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.75rem' }}>Nouveau parmi nous ?</p>
          <a href="/register" className="btn-premium btn-outline-custom" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', borderRadius: '12px' }}>
            Créer un compte élève →
          </a>
        </div>
      </div>
    </div>
  );
}
