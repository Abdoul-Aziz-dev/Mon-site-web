'use client';

import { useState } from 'react';

interface DeleteActionProps {
  id: number;
  type: 'students' | 'teachers' | 'news' | 'courses';
  onSuccess?: () => void;
}

export default function DeleteAction({ id, type, onSuccess }: DeleteActionProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        onSuccess?.();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      alert('Une erreur est survenue: ' + String(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      style={{ 
        background: 'transparent', 
        border: 'none', 
        color: '#ef4444', 
        fontWeight: 700, 
        cursor: 'pointer',
        opacity: isDeleting ? 0.5 : 1
      }}
    >
      {isDeleting ? '...' : 'Supprimer'}
    </button>
  );
}
