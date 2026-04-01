'use client';

import { useState, useEffect } from 'react';
import AddNewsButton from "@/app/components/admin/AddNewsButton";
import DeleteAction from "@/app/components/admin/DeleteAction";
import EditNewsModal from "@/app/components/admin/EditNewsModal";

interface News {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NewsAdmin() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const loadNews = () => {
    setLoading(true);
    fetch('/api/news')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setNewsList(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadNews(); }, []);

  const handleEditClose = () => {
    setEditingNews(null);
    loadNews();
  };

  return (
    <div className="animate-fade-in">
      {editingNews && (
        <EditNewsModal news={editingNews} onClose={handleEditClose} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
           <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Actualités & Blog</h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Gérez les communications, annonces et articles du GSEAB.</p>
        </div>
        <div style={{ width: '250px' }}>
          <AddNewsButton onSuccess={loadNews} />
        </div>
      </div>

      <div className="card-premium" style={{ overflow: 'hidden', padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
           <thead>
             <tr style={{ background: 'var(--surface-hover)', color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--surface-border)' }}>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Titre</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Contenu</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Date</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
             </tr>
           </thead>
           <tbody>
             {loading ? (
               <tr><td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</td></tr>
             ) : newsList.length === 0 ? (
               <tr><td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Aucune actualité publiée.</td></tr>
             ) : newsList.map((n) => (
               <tr key={n.id} style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-main)' }}>
                 <td style={{ padding: '1.75rem 2rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>{n.title}</td>
                 <td style={{ padding: '1.75rem 2rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {n.content.substring(0, 60)}{n.content.length > 60 ? '...' : ''}
                 </td>
                 <td style={{ padding: '1.75rem 2rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {new Date(n.createdAt).toLocaleDateString('fr-FR')}
                 </td>
                 <td style={{ padding: '1.75rem 2rem', textAlign: 'right' }}>
                    <button onClick={() => setEditingNews(n)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 800, cursor: 'pointer', marginRight: '1.5rem' }}>Éditer</button>
                    <DeleteAction id={n.id} type="news" onSuccess={loadNews} />
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}
