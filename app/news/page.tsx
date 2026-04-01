'use client';

import { useEffect, useState } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => {
        setArticles(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 86px)' }}>
      <div style={{ maxWidth: '1450px', margin: '0 auto', padding: '6rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 className="font-heading" style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Actualités & Événements</h1>
          <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', fontWeight: 500 }}>Restez informé des dernières nouvelles et réalisations de notre établissement.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Chargement des actualités...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: '#ef4444', fontSize: '1.2rem' }}>
            Erreur de chargement. Veuillez réessayer plus tard.
          </div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Aucune actualité disponible pour le moment.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3.5rem' }}>
            {articles.map((article) => (
               <div key={article.id} className="card-premium" style={{ display: 'flex', flexDirection: 'column' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                   <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 800, border: '1px solid var(--surface-border)' }}>Actualité</span>
                   <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>{new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                 </div>
                 <h3 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.25 }}>{article.title}</h3>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.75, flexGrow: 1 }}>{article.content}</p>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
