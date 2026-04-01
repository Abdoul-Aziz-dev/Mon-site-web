'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddCourseModalProps {
  onClose: () => void;
}

export default function AddCourseModal({ onClose }: AddCourseModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    level: '10ème Année',
    hours: '4h / semaine',
    teacher: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        alert('Erreur lors de l\'ajout du cours');
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
          <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Nouveau Cours</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Titre du cours</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Mathématiques"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Professeur</label>
            <input 
              required
              type="text" 
              placeholder="Ex: M. Camara"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Niveau</label>
                <select 
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <option value="T-SM">Terminale SM</option>
                  <option value="T-SS">Terminale SS</option>
                  <option value="11ème">11ème Année</option>
                  <option value="10ème">10ème Année</option>
                </select>
             </div>
             <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Volume horaire</label>
                <input 
                  type="text" 
                  placeholder="Ex: 4h / semaine"
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                />
             </div>
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="btn-premium btn-primary-custom" 
            style={{ marginTop: '1rem', padding: '1.25rem', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Publication...' : 'Ajouter le cours'}
          </button>
        </form>
      </div>
    </div>
  );
}
