'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddTeacherModalProps {
  onClose: () => void;
}

export default function AddTeacherModal({ onClose }: AddTeacherModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        alert('Erreur lors de l\'ajout de l\'enseignant');
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
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div className="card-premium" style={{ 
        width: '100%', 
        maxWidth: '500px', 
        padding: '3rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Nouvel Enseignant</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Nom complet</label>
            <input 
              required
              type="text" 
              placeholder="Ex: M. Jean Dupont"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Email</label>
            <input 
              required
              type="email" 
              placeholder="jean.dupont@gseab.gn"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Matière</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Mathématiques"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Téléphone (Optionnel)</label>
            <input 
              type="text" 
              placeholder="+224 ..."
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="btn-premium btn-primary-custom" 
            style={{ marginTop: '1rem', padding: '1.25rem', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Enregistrement...' : 'Confirmer l\'ajout'}
          </button>
        </form>
      </div>
    </div>
  );
}
