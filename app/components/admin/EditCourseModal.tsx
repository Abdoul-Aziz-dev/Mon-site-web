'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  title: string;
  level: string;
  teacher: string;
  hours: string;
}

interface EditCourseModalProps {
  course: Course;
  onClose: () => void;
}

export default function EditCourseModal({ course, onClose }: EditCourseModalProps) {
  const [formData, setFormData] = useState({
    title: course.title,
    level: course.level,
    teacher: course.teacher,
    hours: course.hours,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        alert('Erreur lors de la modification');
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
          <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Modifier le Cours</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Titre du cours</label>
            <input required type="text" style={inputStyle} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Niveau</label>
            <select required style={inputStyle} value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
              <option value="">Sélectionner un niveau</option>
              <option value="Terminale SM">Terminale SM</option>
              <option value="Terminale SE">Terminale SE</option>
              <option value="10ème Année">10ème Année</option>
              <option value="9ème Année">9ème Année</option>
              <option value="8ème Année">8ème Année</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Professeur</label>
            <input required type="text" style={inputStyle} value={formData.teacher} onChange={(e) => setFormData({ ...formData, teacher: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Volume horaire</label>
            <input required type="text" placeholder="Ex: 4h/semaine" style={inputStyle} value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} />
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
