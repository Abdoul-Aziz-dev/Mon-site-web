import { prisma } from "@/lib/prisma";
import AddStudentButton from "@/app/components/admin/AddStudentButton";
import AddNewsButton from "@/app/components/admin/AddNewsButton";
import AddTeacherButton from "@/app/components/admin/AddTeacherButton";

export default async function AdminDashboard() {
  // Fetch real stats from database
  const [studentCount, adminCount, teacherCount, courseCount] = await Promise.all([
    prisma.student.count().catch(() => 0),
    prisma.admin.count().catch(() => 0), 
    prisma.teacher.count().catch(() => 0),
    prisma.course.count().catch(() => 0),
  ]);

  const recentStudents = await prisma.student.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  const recentNews = await prisma.news.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const stats = [
    { label: "Total Élèves", value: studentCount.toString(), icon: "🎓", color: "#6366f1", bg: "rgba(99, 102, 241, 0.1)" },
    { label: "Administration", value: adminCount.toString(), icon: "🧑‍💻", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
    { label: "Enseignants", value: teacherCount.toString(), icon: "🧑‍🏫", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" },
    { label: "Cours", value: courseCount.toString(), icon: "📋", color: "#ec4899", bg: "rgba(236, 72, 153, 0.1)" }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Vue d'ensemble</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Gérez les activités de l'établissement en toute simplicité.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95rem' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Recent Inscriptions */}
          <div className="card-premium">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>Nouvelles Inscriptions</h2>
                <a href="/admin/students" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>Voir tout →</a>
            </div>
            
            {recentStudents.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--surface-border)', textAlign: 'left' }}>
                      <th style={{ padding: '1rem 0', color: 'var(--text-muted)', fontWeight: 600 }}>Élève</th>
                      <th style={{ padding: '1rem 0', color: 'var(--text-muted)', fontWeight: 600 }}>Classe</th>
                      <th style={{ padding: '1rem 0', color: 'var(--text-muted)', fontWeight: 600 }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student: { id: number; name: string; class: string; createdAt: Date }) => (
                      <tr key={student.id} style={{ borderBottom: '1px solid var(--surface-hover)' }}>
                        <td style={{ padding: '1.25rem 0', fontWeight: 700, color: 'var(--text-main)' }}>{student.name}</td>
                        <td style={{ padding: '1.25rem 0', color: 'var(--text-muted)' }}>{student.class}</td>
                        <td style={{ padding: '1.25rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {new Date(student.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--surface-border)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontStyle: 'italic' }}>Aucune inscription récente détectée dans la base de données.</p>
              </div>
            )}
          </div>

          {/* Recent News */}
          <div className="card-premium">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>Dernières Actualités</h2>
                <a href="/admin/news" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>Gérer →</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {recentNews.length > 0 ? (
                recentNews.map((news: { id: number; title: string; content: string; createdAt: Date }) => (
                  <div key={news.id} style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{news.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      {news.content.substring(0, 100)}{news.content.length > 100 ? '...' : ''}
                    </p>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                      {new Date(news.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucune actualité publiée pour le moment.</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card-premium">
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2.5rem', color: 'var(--text-main)' }}>Actions Rapides</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AddStudentButton />
              <AddTeacherButton />
              <AddNewsButton />
            </div>
          </div>

          <div className="card-premium" style={{ background: 'var(--primary)', color: 'white' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Support Technique 🛠️</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.6 }}>Besoin d'aide pour configurer le système ? Contactez notre équipe support 24/7.</p>
            <button style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem', borderRadius: '10px', border: 'none', background: 'white', color: 'var(--primary)', fontWeight: 800, cursor: 'pointer' }}>
              Ouvrir un ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
