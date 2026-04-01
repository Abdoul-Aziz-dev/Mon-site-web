'use client';

import { useState, useEffect } from 'react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  teacher: { name: string };
  createdAt: string;
}

interface Classroom { id: number; name: string; }

const TEACHER_ID = 2;

export default function TeacherAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    loadAnnouncements();
    fetch('/api/classrooms').then(r => r.json()).then(d => setClassrooms(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const loadAnnouncements = () => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(d => { setAnnouncements(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    setPosting(true);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          teacherId: TEACHER_ID,
          classroomId: selectedClassroom ? parseInt(selectedClassroom) : null,
        }),
      });
      if (res.ok) {
        loadAnnouncements();
        setNewTitle('');
        setNewContent('');
        setSelectedClassroom('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette annonce ?')) return;
    try {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Annonces Classes</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Publiez et gérez vos annonces pour les classes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Formulaire */}
        <div className="card-premium" style={{ border: '1px solid var(--surface-border)', height: 'fit-content' }}>
          <h2 className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Nouvelle Annonce</h2>
          <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>Classe (optionnel)</label>
              <select value={selectedClassroom} onChange={e => setSelectedClassroom(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', outline: 'none' }}>
                <option value="">Toutes les classes</option>
                {classrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>Titre</label>
              <input type="text" placeholder="Ex: Devoir à rendre" value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>Contenu</label>
              <textarea placeholder="Écrivez votre annonce..." value={newContent}
                onChange={e => setNewContent(e.target.value)} rows={5}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
            </div>
            <button className="btn-premium btn-primary-custom" style={{ padding: '0.75rem', borderRadius: '12px', opacity: posting ? 0.7 : 1 }} disabled={posting}>
              {posting ? 'Publication...' : '📢 Publier'}
            </button>
          </form>
        </div>

        {/* Liste */}
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
            Annonces Publiées <span style={{ color: 'var(--primary)' }}>({announcements.length})</span>
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Chargement...</div>
          ) : announcements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--surface-hover)', borderRadius: '16px', border: '2px dashed var(--surface-border)' }}>
              Aucune annonce publiée
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {announcements.map(ann => (
                <div key={ann.id} className="card-premium" style={{ border: '1px solid var(--surface-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{ann.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(ann.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <button onClick={() => handleDelete(ann.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{ann.content}</p>
                  {ann.teacher && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                      Par {ann.teacher.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
