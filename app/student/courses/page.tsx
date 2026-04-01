'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  teacher: string;
  level: string;
  hours: string;
}

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => { setCourses(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Calcul de progression fictif pour maintenant
  const getProgress = (id: number) => {
    const progressMap: { [key: number]: number } = { 1: 75, 2: 60, 3: 90, 4: 45 };
    return progressMap[id] || 50;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
         <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Mes Cours</h1>
         <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Consultez vos supports de cours et votre progression.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement des cours...</div>
      ) : courses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Aucun cours disponible.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
           {courses.map(course => {
             const progress = getProgress(course.id);
             return (
              <div key={course.id} className="card-premium" style={{ border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                       <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{course.title}</h3>
                       <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>{course.teacher}</p>
                    </div>
                    <span style={{ 
                       padding: '0.4rem 0.8rem', 
                       borderRadius: '99px', 
                       fontSize: '0.75rem', 
                       fontWeight: 800, 
                       background: progress > 85 ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary-light)', 
                       color: progress > 85 ? '#10b981' : 'var(--primary)' 
                    }}>{progress > 85 ? 'Bientôt fini' : 'En cours'}</span>
                 </div>

                 <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div>📚 <strong>{course.level}</strong></div>
                    <div>⏱️ <strong>{course.hours}h</strong></div>
                 </div>

                 <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                       <span>Progression</span>
                       <span>{progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--surface-hover)', borderRadius: '99px', overflow: 'hidden' }}>
                       <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '99px', transition: 'width 1s ease-out' }}></div>
                    </div>
                 </div>

                 <div style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    📅 Dernière mise à jour récemment
                 </div>

                 <Link href={`/student/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                   <button style={{ padding: '1rem', justifyContent: 'center', borderRadius: '12px', width: '100%', background: 'var(--primary)', color: 'white', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                      Accéder au contenu
                   </button>
                 </Link>
              </div>
            );
           })}
        </div>
      )}
    </div>
  );
}
