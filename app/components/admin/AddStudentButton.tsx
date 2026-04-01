'use client';

import { useState } from 'react';
import AddStudentModal from './AddStudentModal';

export default function AddStudentButton({ onSuccess }: { onSuccess?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-premium btn-primary-custom" 
        style={{ padding: '1.25rem', justifyContent: 'space-between', width: '100%', display: 'flex', alignItems: 'center' }}
      >
        + Ajouter un nouvel élève <span>→</span>
      </button>

      {isModalOpen && <AddStudentModal onClose={handleClose} />}
    </>
  );
}
