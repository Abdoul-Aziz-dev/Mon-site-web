'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  class?: string;
}

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [courseCount, setCourseCount] = useState(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Charger les cours
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => {
        const courses = Array.isArray(d) ? d : [];
        setCourseCount(courses.length);
        
        // Créer un emploi du temps fictif avec les 3 premiers cours
        const sched = courses.slice(0, 3).map((c: any, i: number) => ({
          time: i === 0 ? '08:00 - 10:00' : i === 1 ? '10:15 - 12:15' : '14:00 - 16:00',
          course: c.title,
          room: `Salle ${200 + c.id}`,
          teacher: c.teacher
        }));
        setSchedule(sched.length > 0 ? sched : [{ time: '08:00 - 10:00', course: 'Aucun cours prévu', room: '-', teacher: '-' }]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Moyenne Générale', value: '16.45 / 20', color: 'var(--primary)', bg: 'var(--primary-light)', icon: '📈' },
    { label: 'Assiduité', value: '98%', color: '#10b981', bg: '#ecfdf5', icon: '✅' },
    { label: 'Matières suivies', value: `${courseCount} Matières`, color: '#6366f1', bg: '#eef2ff', icon: '📚' },
    { label: 'Prochains Devoirs', value: '3 Devoirs', color: '#f59e0b', bg: '#fffbeb', icon: '📝' },
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>
          Tableau de bord de {user?.name || "l'Élève"}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
          {user?.class ? `Classe: ${user.class} • Suivez vos performances en temps réel.` : 'Suivez vos performances en temps réel.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {stats.map(stat => (
          <div key={stat.label} className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: stat.bg, color: stat.color, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{stat.icon}</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
          <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2.5rem' }}>Emploi du temps d'aujourd'hui</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {schedule.map((c, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '2.5rem',
                padding: '1.5rem',
                background: 'var(--surface-hover)',
                borderRadius: '16px',
                borderLeft: '5px solid var(--primary)',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--text-main)', width: '120px', fontSize: '1rem' }}>{c.time}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{c.course}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>{c.teacher} • <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{c.room}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium" style={{ border: '1px solid var(--surface-border)', height: 'fit-content' }}>
          <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2.5rem' }}>Tâches Prioritaires</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(192, 57, 43, 0.05)', border: '1px solid rgba(192, 57, 43, 0.1)', borderRadius: '14px' }}>
              <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>DEVOIR: MATHÉMATIQUES</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Chapitre: Suites et Limites. À rendre demain 08:00.</div>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '14px' }}>
              <div style={{ fontWeight: 800, color: '#4f46e5', marginBottom: '0.25rem', fontSize: '0.95rem' }}>FORUM: SCIENCES</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Participez à la discussion sur les énergies renouvelables.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
