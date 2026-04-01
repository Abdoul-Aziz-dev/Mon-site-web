'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  phone: string | null;
}

interface EditTeacherModalProps {
  teacher: Teacher;
  onClose: () => void;
}

export default function EditTeacherModal({ teacher, onClose }: EditTeacherModalProps) {
  const [formData, setFormData] = useState({
    name: teacher.name,
    email: teacher.email,
    subject: teacher.subject,
    phone: teacher.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/teachers/${teacher.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.refresh();
        onClose();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      alert('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = { width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontSize: '1rem' };
  const labelStyle = { display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="card-premium" style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Modifier l&apos;Enseignant</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Nom complet</label>
            <input required type="text" style={inputStyle} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input required type="email" style={inputStyle} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Matière</label>
            <input required type="text" style={inputStyle} value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Téléphone (Optionnel)</label>
            <input type="text" style={inputStyle} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn-premium btn-outline-custom" style={{ flex: 1, padding: '1rem', justifyContent: 'center' }}>Annuler</button>
            <button type="submit" disabled={isSubmitting} className="btn-premium btn-primary-custom" style={{ flex: 1, padding: '1rem', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Sauvegarde...' : '✓ Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
