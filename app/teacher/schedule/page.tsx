'use client';

import { useState, useEffect } from 'react';

interface Schedule {
  id: number;
  course: { title: string; };
  day: string;
  startTime: string;
  endTime: string;
  room: string | null;
}

export default function TeacherSchedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/schedule')
      .then(r => r.json())
      .then(d => { setSchedule(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const dayColor: { [key: string]: string } = {
    Lundi: '#6366f1',
    Mardi: '#ec4899',
    Mercredi: '#10b981',
    Jeudi: '#f59e0b',
    Vendredi: '#8b5cf6',
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Mon Emploi du Temps</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Vos cours programmés cette semaine.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {days.map(day => {
            const daySchedules = schedule.filter(s => s.day === day);
            return (
              <div key={day} className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: `2px solid ${dayColor[day] || 'var(--primary)'}` }}>
                  <div style={{ width: '10px', height: '40px', background: dayColor[day] || 'var(--primary)', borderRadius: '6px' }}></div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{day}</h3>
                </div>
                {daySchedules.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {daySchedules.map((s) => (
                      <div key={s.id} style={{ padding: '1.25rem', background: 'var(--surface-hover)', borderRadius: '12px', borderLeft: `4px solid ${dayColor[day] || 'var(--primary)'}` }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{s.startTime} - {s.endTime}</div>
                        <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{s.course.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>📍 {s.room || 'Salle TBD'}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pas de cours</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
