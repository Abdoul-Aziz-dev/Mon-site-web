'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddNewsModalProps {
  onClose: () => void;
}

export default function AddNewsModal({ onClose }: AddNewsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        alert('Erreur lors de la publication');
      }
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div className="card-premium" style={{ 
        width: '100%', 
        maxWidth: '600px', 
        padding: '3rem',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Publier une Actualité</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Titre de l'annonce</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Réunion Parents-Profs"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Contenu du message</label>
            <textarea 
              required
              rows={5}
              placeholder="Détails de l'actualité..."
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', resize: 'none' }}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="btn-premium btn-primary-custom" 
            style={{ marginTop: '1rem', padding: '1.25rem', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Publication...' : 'Publier maintenant'}
          </button>
        </form>
      </div>
    </div>
  );
}
