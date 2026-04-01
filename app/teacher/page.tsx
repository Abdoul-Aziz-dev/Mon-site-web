import { prisma } from "@/lib/prisma";

export default async function TeacherDashboard() {
  const studentCount = await prisma.student.count();
  const courseCount = await prisma.course.count();

  const stats = [ 
    { label: 'Classes Assignées', value: '4 Classes', color: 'var(--secondary)', bg: '#f1f5f9', icon: '👥' },
    { label: 'Total Élèves', value: `${studentCount} Élèves`, color: '#059669', bg: '#ecfdf5', icon: '📝' },
    { label: 'Matières Gérées', value: `${courseCount} Matières`, color: '#d97706', bg: '#fef3c7', icon: '⏱️' },
    { label: 'Moyenne de Classe', value: '14.8 / 20', color: '#6366f1', bg: '#eef2ff', icon: '📊' },
  ];

  // Fetch courses managed by this teacher (Mock: Diallo Alpha)
  const teacherCourses = await prisma.course.findMany({
    where: { teacher: { contains: 'Diallo' } },
    take: 3
  });

  const schedule = teacherCourses.length > 0 ? teacherCourses.map((c, i) => ({
    time: i === 0 ? '08:00 - 10:00' : i === 1 ? '10:15 - 12:15' : '14:00 - 16:00',
    course: `${c.title} - ${c.level}`,
    room: `Salle ${100 + c.id}`,
    students: '35-45 Élèves'
  })) : [
    { time: '08:00 - 10:00', course: 'Aucun cours assigné', room: '-', students: '-' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3.5rem' }}>
         <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Espace Enseignant</h1>
         <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Suivez l'évolution de vos classes et gérez vos activités pédagogiques.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4.5rem' }}>
         {stats.map(stat => (
            <div key={stat.label} className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: stat.bg, color: stat.color, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{stat.icon}</div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95rem' }}>{stat.label}</p>
            </div>
         ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>
        {/* Faculty Schedule */}
        <div className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
           <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2.5rem' }}>Mes Prochains Cours</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {schedule.map((c, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  gap: '2.5rem', 
                  padding: '1.75rem', 
                  background: 'var(--surface-hover)', 
                  borderRadius: '18px', 
                  borderLeft: '5px solid var(--secondary)',
                  transition: 'transform 0.2s'
                }}>
                   <div style={{ fontWeight: 800, color: 'var(--text-main)', width: '120px', fontSize: '1rem' }}>{c.time}</div>
                   <div>
                     <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{c.course}</div>
                     <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}><span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{c.room}</span> • {c.students}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Action Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div className="card-premium" style={{ border: '1px solid var(--surface-border)', background: 'var(--surface)' }}>
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>Actions Rapides</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <button className="btn-premium btn-primary-custom" style={{ padding: '1.25rem', justifyContent: 'space-between', borderRadius: '14px' }}>
                   📝 Saisir des notes <span>→</span>
                 </button>
                 <button className="btn-premium btn-outline-custom" style={{ padding: '1.25rem', justifyContent: 'space-between', borderRadius: '14px', fontWeight: 700 }}>
                   📢 Envoyer une annonce <span>→</span>
                 </button>
                 <button className="btn-premium btn-outline-custom" style={{ padding: '1.25rem', justifyContent: 'space-between', borderRadius: '14px', fontWeight: 700 }}>
                   📊 Rapport d'assiduité <span>→</span>
                 </button>
              </div>
           </div>

           <div className="card-premium" style={{ border: '1px solid var(--surface-border)', background: 'rgba(99, 102, 241, 0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4f46e5', marginBottom: '1rem' }}>Conseil Pédagogique 💡</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>N'oubliez pas de valider les moyennes du 2ème trimestre avant Vendredi 17h.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
