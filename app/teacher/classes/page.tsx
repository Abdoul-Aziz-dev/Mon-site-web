'use client';

import { useState, useEffect } from 'react';

interface Classroom {
  id: number;
  name: string;
  level: string;
  enrollments: { studentId: number; student: { name: string } }[];
}

export default function TeacherClasses() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/classrooms')
      .then(r => r.json())
      .then(d => { setClassrooms(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Mes Classes</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Gérez les classes que vous enseignez.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement...</div>
      ) : classrooms.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Aucune classe assignée</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="card-premium" style={{ border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{classroom.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Niveau: <strong>{classroom.level}</strong></p>
              </div>

              <div style={{ padding: '1rem', background: 'var(--primary-light)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                  {classroom.enrollments.length}
                </div>
                <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Élèves inscrits</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button className="btn-premium btn-primary-custom" style={{ padding: '0.75rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                  Voir les élèves
                </button>
                <button className="btn-premium btn-outline-custom" style={{ padding: '0.75rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                  Gérer la classe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
