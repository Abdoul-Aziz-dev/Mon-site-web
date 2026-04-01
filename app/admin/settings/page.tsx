'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setFormData({
            siteName: data.siteName || '',
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            address: data.address || '',
          });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Paramètres enregistrés avec succès !' });
        router.refresh();
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Une erreur est survenue.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Paramètres du Site</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Configurez les informations générales de l'établissement.</p>
      </div>

      <div className="card-premium" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {message.text && (
            <div style={{ 
              padding: '1rem', 
              borderRadius: '12px', 
              background: message.type === 'success' ? '#ecfdf5' : '#fef2f2', 
              color: message.type === 'success' ? '#059669' : '#dc2626',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`
            }}>
              {message.text}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Nom de l'établissement</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500 }}
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Email de contact</label>
              <input 
                type="email" 
                style={{ width: '100%', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500 }}
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Téléphone</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500 }}
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Adresse physique</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500 }}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              className="btn-premium btn-primary-custom" 
              disabled={isSubmitting}
              style={{ minWidth: '200px' }}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
