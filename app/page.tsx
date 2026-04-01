import { prisma } from "@/lib/prisma";
import Logo from './components/Logo';

async function getLatestNews() {
  try {
    // Timeout de 3 secondes pour éviter le blocage
    const newsPromise = prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );

    const news = await Promise.race([newsPromise, timeoutPromise]);
    return news;
  } catch (error) {
    console.error('Erreur chargement actualités:', error);
    return []; // Retourner tableau vide en cas d'erreur
  }
}

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '8rem 5rem',
        maxWidth: '1450px',
        margin: '0 auto',
        gap: '5rem',
        minHeight: '80vh'
      }}>
        <div style={{ flex: 1, maxWidth: '700px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            background: 'var(--primary-light)', 
            color: 'var(--primary)', 
            padding: '0.6rem 1.25rem', 
            borderRadius: '999px', 
            fontWeight: 800,
            fontSize: '0.85rem',
            marginBottom: '2rem',
            letterSpacing: '0.02em',
            boxShadow: '0 2px 10px rgba(192, 57, 43, 0.1)'
          }}>
            <span>✨</span> BIENVENUE AU GSEAB
          </div>
          
          <h1 className="font-heading" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.05, color: '#222', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            Groupe Scolaire <span style={{ color: 'var(--primary)' }}>Elhadj Amadou Barry</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '600px', fontWeight: 500 }}>
            Une institution d&apos;excellence dédiée à la formation de générations de leaders, d&apos;innovateurs et de citoyens responsables.
          </p>
          
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <a href="/login" className="btn-premium btn-primary-custom" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem', borderRadius: '12px', textDecoration: 'none' }}>
              Accéder au tableau de bord <span style={{ marginLeft: '0.5rem' }}>→</span>
            </a>
            <a href="/about" className="btn-premium btn-outline-custom" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem', borderRadius: '12px', background: 'white', textDecoration: 'none' }}>
              En savoir plus
            </a>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '750px',
            borderRadius: '2rem',
            overflow: 'hidden',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.2)',
            border: '8px solid white',
            transform: 'rotate(2deg)'
          }}>
            <img 
              src="/school_building.png" 
              alt="Bâtiment principal GSEAB" 
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Nos Forces */}
      <section style={{ backgroundColor: 'white', padding: '8rem 5rem', borderTop: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1rem' }}>Nos forces</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>Découvrez ce qui fait de notre établissement un leader reconnu en éducation.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { title: "Enseignement de qualité", desc: "Un corps enseignant expérimenté et une pédagogie innovante tournée vers l'avenir.", icon: "🎓" },
              { title: "Communauté accueillante", desc: "Un environnement inclusif et bienveillant pour l'épanouissement de tous.", icon: "🤝" },
              { title: "Excellence académique", desc: "Des résultats exceptionnels aux examens et une reconnaissance internationale.", icon: "⭐" },
              { title: "Activités variées", desc: "Sports, arts, sciences et clubs de développement personnel.", icon: "🎨" }
            ].map(force => (
              <div key={force.title} className="card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--primary-light)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                  {force.icon}
                </div>
                <h3 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>{force.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>{force.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installations */}
      <section style={{ padding: '8rem 5rem', backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6rem', textAlign: 'center' }}>Un cadre d&apos;exception</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
            
            <div style={{ display: 'flex', gap: '6rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 500px' }}>
                <h3 className="font-heading" style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>Laboratoire Informatique Moderne</h3>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>Des équipements de pointe pour initier nos élèves aux technologies de demain. Les lycéens et collégiens s&apos;exercent régulièrement sur nos ordinateurs de dernière génération afin de maîtriser l&apos;informatique.</p>
              </div>
              <div style={{ flex: '1 1 500px', borderRadius: '3rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '12px solid white' }}>
                <img src="/computer_lab.png" alt="Salle Informatique" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6rem', alignItems: 'center', flexDirection: 'row-reverse', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 500px' }}>
                <h3 className="font-heading" style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>Excellence Scientifique (SM)</h3>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>L&apos;excellence scientifique au tableau : nos professeurs dispensent un enseignement rigoureux en Mathématiques. Pour sécuriser l&apos;environnement d&apos;apprentissage, nos classes de Terminale SM sont d&apos;ailleurs équipées de caméras de vidéosurveillance.</p>
              </div>
              <div style={{ flex: '1 1 500px', borderRadius: '3rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '12px solid white', transform: 'rotate(-1deg)' }}>
                <img src="/science_math_class.png" alt="Classe Terminale SM" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Actualités — dynamique (BDD) */}
      <section style={{ backgroundColor: 'white', padding: '8rem 5rem', borderTop: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '4rem', textAlign: 'center' }}>Actualités & Événements</h2>
          
          {latestNews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Aucune actualité disponible pour le moment.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
               {latestNews.map(news => (
                 <div key={news.id} className="card-premium">
                   <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem' }}>
                     {new Date(news.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                   </span>
                   <h3 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '1rem', marginBottom: '1rem' }}>{news.title}</h3>
                   <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '2rem' }}>
                     {news.content.substring(0, 120)}{news.content.length > 120 ? '...' : ''}
                   </p>
                   <a href="/news" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>Lire l&apos;article <span>→</span></a>
                 </div>
               ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
