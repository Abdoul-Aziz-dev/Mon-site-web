'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  teacher: string;
  level: string;
  hours: string;
}

export default function CourseDetail() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then(r => r.json())
      .then(d => { setCourse(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [courseId]);

  const courseContent = [
    { week: 'Semaine 1', title: 'Chapitre 1: Introduction', type: 'PDF', size: '2.4 MB', date: '12/03/2026' },
    { week: 'Semaine 1', title: 'Vidéo de cours - Part 1', type: 'VIDEO', size: '125 MB', date: '12/03/2026' },
    { week: 'Semaine 2', title: 'Chapitre 2: Concepts fondamentaux', type: 'PDF', size: '3.1 MB', date: '19/03/2026' },
    { week: 'Semaine 2', title: 'Exercices pratiques', type: 'EXERCICE', size: '850 KB', date: '19/03/2026' },
    { week: 'Semaine 3', title: 'Quiz: Vérification des connaissances', type: 'QUIZ', size: '-', date: '26/03/2026' },
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement du cours...</div>;
  }

  if (!course) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Cours introuvable</div>;
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
         <Link href="/student/courses" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
           ← Retour aux cours
         </Link>
      </div>

      {/* Header */}
      <div className="card-premium" style={{ border: '1px solid var(--surface-border)', marginBottom: '3rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>{course.title}</h1>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
           <div>👨‍🏫 <strong>{course.teacher}</strong></div>
           <div>📚 Niveau <strong>{course.level}</strong></div>
           <div>⏱️ <strong>{course.hours}h</strong> de formation</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
         <div className="card-premium" style={{ border: '1px solid var(--surface-border)', textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>75%</div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Progression</p>
         </div>
         <div className="card-premium" style={{ border: '1px solid var(--surface-border)', textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>12/16</div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Contenus consultés</p>
         </div>
         <div className="card-premium" style={{ border: '1px solid var(--surface-border)', textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', marginBottom: '0.5rem' }}>42/50</div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Score moyen</p>
         </div>
      </div>

      {/* Content */}
      <div className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
         <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>Contenu du cours</h2>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {courseContent.map((item, idx) => (
               <div key={idx} style={{
                  padding: '1.5rem',
                  background: 'var(--surface-hover)',
                  borderRadius: '12px',
                  border: '1px solid var(--surface-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
               }}>
                  <div style={{ flex: 1 }}>
                     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '99px' }}>{item.week}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                           {item.type === 'PDF' && '📄'}
                           {item.type === 'VIDEO' && '🎥'}
                           {item.type === 'EXERCICE' && '✏️'}
                           {item.type === 'QUIZ' && '❓'}
                           {' ' + item.type}
                        </span>
                     </div>
                     <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.title}</h3>
                     <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {item.size !== '-' && `${item.size} • `}
                        {item.date}
                     </div>
                  </div>
                  <div style={{ padding: '0.8rem 1.2rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                     Accéder
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Resources */}
      <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
         <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>Ressources supplémentaires</h3>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <a href="#" style={{ padding: '1rem', background: 'white', border: '1px solid var(--surface-border)', borderRadius: '8px', textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, textAlign: 'center', transition: 'all 0.2s' }}>
               📚 Bibliographie
            </a>
            <a href="#" style={{ padding: '1rem', background: 'white', border: '1px solid var(--surface-border)', borderRadius: '8px', textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, textAlign: 'center', transition: 'all 0.2s' }}>
               🔗 Liens externes
            </a>
            <a href="#" style={{ padding: '1rem', background: 'white', border: '1px solid var(--surface-border)', borderRadius: '8px', textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, textAlign: 'center', transition: 'all 0.2s' }}>
               💬 Forum de discussion
            </a>
         </div>
      </div>
    </div>
  );
}
