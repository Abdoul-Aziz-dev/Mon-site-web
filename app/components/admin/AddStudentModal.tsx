'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddStudentModalProps {
  onClose: () => void;
}

export default function AddStudentModal({ onClose }: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: 'T-SM',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        alert('Erreur lors de l\'ajout de l\'élève');
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
        maxWidth: '500px', 
        padding: '3rem',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Nouvel Élève</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Nom complet</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Alpha Amadou Diallo"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Email institutionnel</label>
            <input 
              required
              type="email" 
              placeholder="alpha.diallo@gseab.com"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Classe</label>
            <select 
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', appearance: 'none' }}
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            >
              <option value="T-SM">Terminale SM</option>
              <option value="T-SS">Terminale SS</option>
              <option value="T-SE">Terminale SE</option>
              <option value="10ème">10ème Année</option>
            </select>
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="btn-premium btn-primary-custom" 
            style={{ marginTop: '1rem', padding: '1.25rem', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Enregistrement...' : 'Confirmer l\'inscription'}
          </button>
        </form>
      </div>
    </div>
  );
}
