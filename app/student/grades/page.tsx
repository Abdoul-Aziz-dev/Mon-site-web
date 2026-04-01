'use client';

export default function StudentGrades() {
  const semesters = [
    { name: '1er Semestre', average: '15.80', rank: '3ème / 42', status: 'Clôturé' },
    { name: '2ème Semestre (En cours)', average: '16.45', rank: '2ème / 42', status: 'Actif' },
  ];

  const grades = [
    { subject: 'Mathématiques', grade: '17.5', coeff: 5, date: '12/03/2026', type: 'Examen' },
    { subject: 'Physique', grade: '15.0', coeff: 4, date: '10/03/2026', type: 'Contrôle' },
    { subject: 'Français', grade: '14.5', coeff: 3, date: '05/03/2026', type: 'Oral' },
    { subject: 'Anglais', grade: '18.0', coeff: 3, date: '01/03/2026', type: 'TP' },
    { subject: 'Informatique', grade: '19.0', coeff: 2, date: '25/02/2026', type: 'Projet' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
         <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Mes Notes & Résultats</h1>
         <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Suivez vos performances académiques en temps réel.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
         {semesters.map(sem => (
           <div key={sem.name} className="card-premium" style={{ border: '1px solid var(--surface-border)', background: sem.status === 'Actif' ? 'rgba(192, 57, 43, 0.02)' : 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                 <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{sem.name}</h3>
                 <span style={{ fontSize: '0.75rem', fontWeight: 800, color: sem.status === 'Actif' ? 'var(--primary)' : 'var(--text-muted)' }}>{sem.status.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                 <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)' }}>{sem.average}</span>
                 <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 700 }}>/ 20</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Rang: <strong style={{ color: 'var(--primary)' }}>{sem.rank}</strong></p>
           </div>
         ))}
      </div>

      <div className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
         <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2.5rem' }}>Dernières Évaluations</h2>
         <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr style={{ borderBottom: '2px solid var(--surface-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                     <th style={{ padding: '1rem', fontWeight: 700 }}>Matière</th>
                     <th style={{ padding: '1rem', fontWeight: 700 }}>Note</th>
                     <th style={{ padding: '1rem', fontWeight: 700 }}>Type</th>
                     <th style={{ padding: '1rem', fontWeight: 700 }}>Coeff.</th>
                     <th style={{ padding: '1rem', fontWeight: 700 }}>Date</th>
                  </tr>
               </thead>
               <tbody>
                  {grades.map((g, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                       <td style={{ padding: '1.5rem 1rem', fontWeight: 800, color: 'var(--text-main)' }}>{g.subject}</td>
                       <td style={{ padding: '1.25rem 1rem' }}>
                          <span style={{ fontSize: '1.2rem', fontWeight: 900, color: parseFloat(g.grade) >= 15 ? '#10b981' : 'var(--primary)' }}>{g.grade}</span>
                       </td>
                       <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{g.type}</td>
                       <td style={{ padding: '1.25rem 1rem', fontWeight: 700 }}>{g.coeff}</td>
                       <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{g.date}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
