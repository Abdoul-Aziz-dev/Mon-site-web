export default function Courses() {
  const courses = [
    { title: "Développement Web", duration: "6 mois", description: "Formation intensive en React, Node.js et bases de données." },
    { title: "Design UI/UX", duration: "4 mois", description: "Maîtrisez Figma et les principes fondamentaux de l'expérience utilisateur." },
    { title: "Intelligence Artificielle", duration: "1 an", description: "Comprenez le Machine Learning et construisez des modèles prédictifs." },
    { title: "Cyber­sécurité", duration: "8 mois", description: "Apprenez à sécuriser des systèmes et à réaliser des tests d'intrusion." }
  ];

  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Nos Formations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Des cursus conçus par des experts pour vous préparer aux métiers de demain.
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {courses.map(course => (
          <div key={course.title} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>{course.title}</h3>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary-hover)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, width: 'fit-content', marginBottom: '1rem' }}>
              Durée: {course.duration}
            </span>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>
              {course.description}
            </p>
            <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>Postuler Maintenant</button>
          </div>
        ))}
      </div>
    </div>
  );
}
