'use client';

export default function About() {
  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--surface)', padding: '8rem 4rem', textAlign: 'center', borderBottom: '1px solid var(--surface-border)' }}>
        <h1 className="font-heading" style={{ fontSize: '4.50rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Notre Histoire</h1>
        <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '950px', margin: '0 auto', fontWeight: 500 }}>
          Depuis sa fondation, le <strong>Groupe Scolaire Elhadj Amadou Barry (GSEAB)</strong> s'est distingué par son engagement envers l'excellence académique et le développement holistique de ses élèves. Notre établissement combine tradition et modernité pour préparer les leaders de demain.
        </p>
      </div>
      
      {/* Values */}
      <div style={{ maxWidth: '1450px', margin: '0 auto', padding: '8rem 5rem' }}>
        <h2 className="font-heading" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '5rem', textAlign: 'center' }}>Pourquoi choisir GSEAB ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
          {[
            { title: "Infrastructures Modernes", text: "Des équipements technologiques de pointe et des locaux sécurisés par vidéo-surveillance 24h/24.", icon: "🏛️" },
            { title: "Enseignants Qualifiés", text: "Un corps professoral expérimenté, dévoué à la réussite académique et humaine de chaque élève.", icon: "🧑‍🏫" },
            { title: "Programmes Innovants", text: "Un cursus aligné sur les exigences internationales, axé sur les sciences et la technologie.", icon: "🚀" },
            { title: "Suivi Personnalisé", text: "Un encadrement de proximité pour assurer l'épanouissement individuel de chaque apprenant.", icon: "🎯" }
          ].map((item, i) => (
             <div key={i} className="card-premium" style={{ textAlign: 'center' }}>
               <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{item.icon}</div>
               <h3 className="font-heading" style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.25rem' }}>{item.title}</h3>
               <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>{item.text}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
